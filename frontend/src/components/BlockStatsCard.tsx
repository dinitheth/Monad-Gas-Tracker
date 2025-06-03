import React from 'react';
import { BlockData } from '../types';

interface BlockStatsCardProps {
  block: BlockData;
}

const BlockStatsCard: React.FC<BlockStatsCardProps> = ({ block }) => {
  if (!block) return null;

  return (
    <div className="bg-slate-800 p-4 sm:p-6 rounded-xl shadow-2xl text-gray-300 border border-slate-700 w-full max-w-2xl mx-auto">
      <h3 className="text-2xl font-bold mb-3 text-indigo-400">Block #{block.blockNumber}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-sm sm:text-base">
        <p><strong className="font-medium text-slate-400">Timestamp:</strong> {new Date(block.timestamp * 1000).toLocaleString()}</p>
        <p><strong className="font-medium text-slate-400">Transactions:</strong> {block.transactions.length}</p>
        <p><strong className="font-medium text-slate-400">Gas Used:</strong> <span className="text-orange-400">{block.gasUsed.toLocaleString()}</span></p>
        <p><strong className="font-medium text-slate-400">Gas Limit:</strong> {block.gasLimit.toLocaleString()}</p>
        <p><strong className="font-medium text-slate-400">Avg. Gas/Tx:</strong> {block.avgGasPerTx.toLocaleString()}</p>
        <p><strong className="font-medium text-slate-400">Usage:</strong> <span className="text-green-400">{((block.gasUsed / block.gasLimit) * 100).toFixed(2)}%</span></p>
      </div>
    </div>
  );
};

export default BlockStatsCard;
