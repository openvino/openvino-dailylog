import { Injectable } from '@angular/core';
import * as ethers from 'ethers';
import _gtcr from '@kleros/tcr/build/contracts/GeneralizedTCR.json';
import { environment } from "src/environments/environment";


@Injectable({
  providedIn: 'root',
})
export class KlerosService {
  private TCR_ADDRESS = environment.tcr_address
  private PROVIDER = environment.providerUrl
    
  constructor() {}

  async getMetadata() {
    let library = this.getLibrary();
    let contract = this.getGTCR(this.TCR_ADDRESS, library);

    let logs = await this.getLogs({
      ...(contract.filters as any).MetaEvidence(),
      fromBlock: 0,
    }).then((logs) => {
      return logs.map((log) => {
        return {
          value: contract.interface.parseLog(log),
          blockNumber: log.blockNumber,
        };
      });
    });

    let results = [];
    for (let log of logs) {
      const { value, blockNumber } = log;
      const { _evidence: metaEvidencePath } = value.args;

      const [response, block] = await Promise.all([
        fetch('https://ipfs.kleros.io' + metaEvidencePath),
        this.getLibrary().getBlock(blockNumber),
      ]);

      const file = await response.json();

      results.push({
        ...file,
        address: this.TCR_ADDRESS,
        timestamp: block.timestamp,
        blockNumber,
      });
    }

    return results;
  }

  public async getMetadataEvidence(tcrAddress: string) {
    let library = this.getLibrary();
    let contract = this.getGTCR(tcrAddress, library);

    let logs = await this.getLogs({
      ...(contract.filters as any).MetaEvidence(),
      fromBlock: 0,
    }).then((logs) => {
      return logs.map((log) => {
        return {
          value: contract.interface.parseLog(log),
          blockNumber: log.blockNumber,
        };
      });
    });

    const log = logs[logs.length - 2];

    const { _evidence: metaEvidencePath } = log.value.args;

    const [response, block] = await Promise.all([
      fetch('https://ipfs.kleros.io' + metaEvidencePath),
      this.getLibrary().getBlock(log.blockNumber),
    ]);

    const file = await response.json();

    return { ...file, address: tcrAddress };
  }

  private getGTCR(
    tcrAddress: string,
    library: ethers.providers.Provider
  ): ethers.Contract {
    return new ethers.Contract(tcrAddress, _gtcr.abi, library);
  }

  private async getLogs(query: any) {
    return await this.getLibrary().getLogs(query);
  }

  private getLibrary(): ethers.providers.Provider {
    return new ethers.providers.JsonRpcProvider(this.PROVIDER);
  }
}
