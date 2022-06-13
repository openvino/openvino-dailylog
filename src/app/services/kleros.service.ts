import { Injectable } from "@angular/core";
import * as ethers from "ethers";
import { environment } from "src/environments/environment";
import { Apollo } from "apollo-angular";
import gql from "graphql-tag";
import { map, mergeMap, lastValueFrom } from "rxjs";
import _GTCRView from "../../assets/abis/LightGeneralizedTCRView.json";
import _gtcr from "@kleros/tcr/build/contracts/GeneralizedTCR.json";
import {
  STATUS_CODE,
  STATUS_COLOR,
  STATUS_TEXT,
  SUBGRAPH_STATUS_TO_CODE,
} from "../utils/kleros-item-status";

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
            let address = props.find(
              (prop: any) => prop.type == "address"
            ).value;

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

            return {
              itemID: itemID,
              createdAt: new Date(requests[0].submissionTime * 1000),
              endDate: new Date(requests[0].resolutionTime * 1000),
              status,
              statusLabel: STATUS_TEXT[statusCode],
              statusColor: STATUS_COLOR[statusCode],
              address: address,
              bounty: bounty,
              requester: requests[0].requester,
              props,
              tagHistory: [],
              requestsFromSubgraph: requests,
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
    return {
      ...arbitrableTcrData,
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

  private async getLogs(query: any) {
    return await this.getLibrary().getLogs(query);
  }

  private getLibrary(): ethers.providers.Provider {
    return new ethers.providers.JsonRpcProvider(environment.provider);
  }
}
