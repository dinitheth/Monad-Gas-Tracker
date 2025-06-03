export interface BlockTransaction {
  hash: string;
  gasUsed: number;
}

export interface BlockData {
  blockNumber: number;
  timestamp: number;
  gasUsed: number;
  gasLimit: number;
  transactions: BlockTransaction[];
  avgGasPerTx: number;
}
