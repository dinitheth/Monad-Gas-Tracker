import { BlockData, BlockTransaction } from '../types';

let mockBlocks: BlockData[] = [];
let currentBlockNumber = 1000;

const generateMockTransaction = (txIndex: number): BlockTransaction => {
  const gasUsed = Math.floor(Math.random() * 100000) + 21000; // e.g., 21000 to 121000
  return {
    hash: `0xmocktx${currentBlockNumber}_${txIndex}_${Math.random().toString(16).slice(2)}`,
    gasUsed,
  };
};

const generateMockBlock = (): BlockData => {
  const blockNumber = currentBlockNumber++;
  const gasLimit = 30000000; // Example gas limit
  const numTransactions = Math.floor(Math.random() * 150) + 1; // 1 to 150 transactions

  const transactions: BlockTransaction[] = Array(numTransactions)
    .fill(null)
    .map((_, i) => generateMockTransaction(i));

  const gasUsed = transactions.reduce((sum, tx) => sum + tx.gasUsed, 0);
  const avgGasPerTx = numTransactions > 0 ? Math.round(gasUsed / numTransactions) : 0;

  return {
    blockNumber,
    timestamp: Math.floor(Date.now() / 1000) - (1000 - (blockNumber % 1000)) * 12, // simulate blocks every 12s
    gasUsed,
    gasLimit,
    transactions,
    avgGasPerTx,
  };
};

// Initialize with some blocks
for (let i = 0; i < 150; i++) {
  mockBlocks.push(generateMockBlock());
}

// Simulate new blocks being added periodically
setInterval(() => {
  const newBlock = generateMockBlock();
  mockBlocks.push(newBlock);
  if (mockBlocks.length > 200) { // Keep only the last 200 blocks
    mockBlocks.shift();
  }
  console.log(`Mocked new block: #${newBlock.blockNumber}, Gas Used: ${newBlock.gasUsed}`);
}, 5000); // Add a new block every 5 seconds

export const getLatestBlock = async (): Promise<BlockData | null> => {
  if (mockBlocks.length === 0) return null;
  return mockBlocks[mockBlocks.length - 1];
};

export const getBlockHistory = async (limit: number = 100): Promise<BlockData[]> => {
  const start = Math.max(0, mockBlocks.length - limit);
  return mockBlocks.slice(start);
};

// Mock RPC functions (not directly used by API in this step, but good for future)
export const eth_getBlockByNumber = async (blockNumber: number | 'latest'): Promise<BlockData | null> => {
  if (blockNumber === 'latest') {
    return getLatestBlock();
  }
  return mockBlocks.find(block => block.blockNumber === blockNumber) || null;
};
