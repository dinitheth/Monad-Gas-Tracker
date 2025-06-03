import React from 'react';
import GasChart from './GasChart';
import BlockStatsCard from './BlockStatsCard';
import { BlockData } from '../types';

interface DashboardProps {
  latestBlock: BlockData | null;
  historicalData: BlockData[];
  isLoading: boolean;
  error: string | null;
}

const Dashboard: React.FC<DashboardProps> = ({ latestBlock, historicalData, isLoading, error }) => {
  if (isLoading) {
    return <div className="flex justify-center items-center h-screen"><p className="text-center text-xl text-gray-300">Loading block data...</p></div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen"><p className="text-center text-xl text-red-400 p-4 bg-red-900 bg-opacity-50 rounded-md">Error: {error}</p></div>;
  }

  return (
    <div className="container mx-auto p-2 sm:p-4">
      <header className="my-6 md:my-8">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 py-2">Monad Gas Tracker</h1>
      </header>

      <section className="mb-8">
        <GasChart data={historicalData} />
      </section>

      <section>
        <h2 className="text-2xl sm:text-3xl font-semibold text-gray-200 mb-4 px-2">Latest Block</h2>
        {latestBlock ? (
          <BlockStatsCard block={latestBlock} />
        ) : (
          <p className="text-gray-500 text-center">No latest block data available.</p>
        )}
      </section>

      {/* Optional: Display more historical blocks as cards
      <section className="mt-8">
        <h2 className="text-2xl font-semibold text-white mb-4">Recent Blocks</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {historicalData.slice(0, 6).map(block => ( // Display last 6 blocks as example
            <BlockStatsCard key={block.blockNumber} block={block} />
          ))}
        </div>
      </section>
      */}
    </div>
  );
};

export default Dashboard;
