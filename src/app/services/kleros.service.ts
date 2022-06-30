import { Injectable } from "@angular/core";
import * as ethers from "ethers";
import { environment } from "src/environments/environment";
import { Apollo } from "apollo-angular";
import gql from "graphql-tag";
import { map, mergeMap, lastValueFrom } from "rxjs";
import _GTCRView from "../../assets/abis/LightGeneralizedTCRView.json";
import _gtcr from "@kleros/tcr/build/contracts/GeneralizedTCR.json";
import _arbitrator from "@kleros/erc-792/build/contracts/IArbitrator.json";

import {
  STATUS_CODE,
  STATUS_COLOR,
  STATUS_TEXT,
  SUBGRAPH_STATUS_TO_CODE,
} from "../utils/kleros-item-status";
import { formatEth } from "../utils/eth-amount";
import ipfsPublish from "../utils/ipfs-publish";
import { sanitize } from "../utils/string";

@Injectable({
  providedIn: "root",
})
export class KlerosService {
  constructor(private apollo: Apollo) {}

  getItemList() {
    let result = this.apollo
      .query({
        query: gql`
          query lightItemsQuery(
            $skip: Int
            $first: Int
            $orderDirection: OrderDirection
            $where: LItem_filter
          ) {
            litems(
              skip: $skip
              first: $first
              orderDirection: $orderDirection
              orderBy: latestRequestSubmissionTime
              where: $where
            ) {
              itemID
              status
              data
              props {
                value
                type
                label
                description
                isIdentifier
              }
              requests(
                first: 1
                orderBy: submissionTime
                orderDirection: desc
              ) {
                disputed
                disputeID
                submissionTime
                resolved
                requester
                challenger
                resolutionTime
                rounds(first: 1, orderBy: creationTime, orderDirection: desc) {
                  appealPeriodStart
                  appealPeriodEnd
                  ruling
                  hasPaidRequester
                  hasPaidChallenger
                  amountPaidRequester
                  amountPaidChallenger
                }
              }
            }
          }
        `,
        variables: {
          skip: (Number(1) - 1) * 100,
          first: 100,
          orderDirection: "desc",
          where: {
            registry: environment.listAddress.toLowerCase(),
          },
        },
      })
      .pipe(
        map((res) => (res.data as any).litems),
        mergeMap(async (data: any[]) => {
          let baseDeposits = await this.getBaseDeposits();

          return {
            data,
            deposit: {
              ...baseDeposits,
            },
          };
        }),
        map(({ data, deposit }) => {
          return data.map(({ data, itemID, props, requests, status }) => {
            console.log(props);
            let titleProp = props.find((prop) => {
              return prop.label == "Name" && prop.type == "text";
            });
            let title = titleProp ? titleProp.value : "Item";

            let linkProp = props.find((prop) => {
              return prop.label == "Link" && prop.type == "link";
            });
            let link = linkProp ? linkProp.value : "";

            let addressProp = props.find((prop) => {
              return prop.label == "Address" && prop.type == "address";
            });
            let address = addressProp ? addressProp.value : "";

            let statusCode: any = (SUBGRAPH_STATUS_TO_CODE as any)[status];
            let bounty;
            if (statusCode) {
              if (statusCode === STATUS_CODE.SUBMITTED)
                bounty = deposit.submissionBaseDeposit.div(
                  ethers.BigNumber.from(10).pow(18)
                );
              else if (statusCode === STATUS_CODE.REMOVAL_REQUESTED)
                bounty = deposit.removalBaseDeposit.div(
                  ethers.BigNumber.from(10).pow(18)
                );
            }

            console.log(deposit);

            return {
              itemID: itemID,
              title,
              link,
              address,
              createdAt: new Date(requests[0].submissionTime * 1000),
              endDate: new Date(requests[0].resolutionTime * 1000),
              status,
              statusLabel: STATUS_TEXT[statusCode],
              statusColor: STATUS_COLOR[statusCode],
              bounty: bounty,
              requester: requests[0].requester,
              props,
              tagHistory: [],
              requestsFromSubgraph: requests,
              submissionChallengeDeposit: deposit.submissionChallengeDeposit,
              submissionChallengeDepositLabel: formatEth(
                deposit.submissionChallengeDeposit
              ),
              removalChallengeDeposit: deposit.removalChallengeDeposit,
              removalChallengeDepositLabel: formatEth(
                deposit.removalChallengeDeposit
              ),
            };
          });
        }),
        mergeMap(async (items) => {
          let promises = [];
          let i = 0;
          for (let item of items) {
            if (i == 0) {
              promises.push(this.getItemRequests(item));
            }
            ++i;
          }

          let results = await Promise.all(promises);
          return items.map((item, i) => {
            return {
              ...item,
              requests: results[i],
            };
          });
        })
      );
    return lastValueFrom(result);
  }

  public async getItemRequests(item: any) {
    try {
      let contract: any = this.getGTCRView();

      const requestStructs = await contract.getItemRequests(
        environment.listAddress,
        item.itemID
      );

      const { requestsFromSubgraph: requests } = item;

      return requestStructs.map((request: any, i: number) => ({
        ...request,
        requestType: (SUBGRAPH_STATUS_TO_CODE as any)[requests[i].requestType],
        evidenceGroupID: requests[i].evidenceGroupID,
        creationTx: requests[i].creationTx,
        resolutionTx: requests[i].resolutionTx,
        resolutionTime: requests[i].resolutionTime,
        submissionTime: requests[i].submissionTime,
      }));
    } catch (err) {
      console.error("Error fetching item requests", err);
    }
  }

  public async getBaseDeposits() {
    let contract: any = this.getGTCRView();
    let arbitrableTcrData = await contract.fetchArbitrable(
      environment.listAddress
    );

    const {
      arbitrator: arbitratorAddress,
      arbitratorExtraData,
      submissionChallengeBaseDeposit,
      removalChallengeBaseDeposit,
    } = arbitrableTcrData;

    const newArbitrationCost = await this.getArbitrator(
      arbitratorAddress
    ).arbitrationCost(arbitratorExtraData);

    const newSubmissionChallengeDeposit =
      submissionChallengeBaseDeposit.add(newArbitrationCost);

    // Challenge deposit = removal challenge base deposit + arbitration cost
    const newRemovalChallengeDeposit =
      removalChallengeBaseDeposit.add(newArbitrationCost);

    return {
      ...arbitrableTcrData,
      submissionChallengeDeposit: newSubmissionChallengeDeposit,
      removalChallengeDeposit: newRemovalChallengeDeposit,
    };
  }

  public async publishIPFS(file: File) {
    try {
      const fileTypeExtension = file.name.split(".")[1];
      const data = await new Response(new Blob([file])).arrayBuffer();
      const ipfsFileObj = await ipfsPublish(sanitize(file.name), data);
      const fileURI = `/ipfs/${ipfsFileObj[1].hash}${ipfsFileObj[0].path}`;

      return {
        fileURI,
        fileTypeExtension,
        type: file.type,
      };
    } catch (err) {
      console.error(err);
      return {};
    }
  }

  public async submitChallenge(
    tag: any,
    title: string,
    description: string,
    attachment: any,
    deposit: any
  ) {
    let { signer } = await this.getBrowserProvider();
    const gtcr = new ethers.Contract(
      environment.listAddress,
      _gtcr.abi,
      signer
    );
    const evidenceJSON = {
      title: title || "Challenge Justification",
      description,
      ...attachment,
    };

    const enc = new TextEncoder();
    const fileData = enc.encode(JSON.stringify(evidenceJSON));
    /* eslint-enable prettier/prettier */
    const ipfsEvidenceObject = await ipfsPublish("evidence.json", fileData);
    const ipfsEvidencePath = `/ipfs/${
      ipfsEvidenceObject[1].hash + ipfsEvidenceObject[0].path
    }`;

    // Request signature and submit.
    const tx = await gtcr.challengeRequest(tag.itemID, ipfsEvidencePath, {
      value: deposit,
    });

    return {
      tx,
    };
  }

  public getGTCRView() {
    return new ethers.Contract(
      environment.lgtcrViewAddress,
      _GTCRView,
      this.getLibrary()
    );
  }

  public getGTCR() {
    return new ethers.Contract(
      environment.listAddress,
      _gtcr.abi,
      this.getLibrary()
    );
  }

  public getArbitrator(address: string) {
    return new ethers.Contract(address, _arbitrator.abi, this.getLibrary());
  }

  private async getLogs(query: any) {
    return await this.getLibrary().getLogs(query);
  }

  private getLibrary(): ethers.providers.Provider {
    return new ethers.providers.JsonRpcProvider(environment.provider);
  }

  private async getBrowserProvider() {
    const provider = new ethers.providers.Web3Provider(
      (window as any).ethereum
    );

    await provider.send("eth_requestAccounts", []);

    const signer = provider.getSigner();

    return {
      provider,
      signer,
    };
  }
}
