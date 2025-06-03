import { useState, useEffect } from 'react';
import Dashboard from './components/Dashboard';
import { BlockData } from './types';
import { fetchLatestBlock, fetchBlockHistory } from './services/api';
import './index.css';

const REFRESH_INTERVAL_MS = 5000; // Refresh every 5 seconds
const HISTORY_LIMIT = 100; // Fetch last 100 blocks for history

function App() {
  const [latestBlock, setLatestBlock] = useState<BlockData | null>(null);
  const [historicalData, setHistoricalData] = useState<BlockData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    // Don't set isLoading to true on subsequent fetches for smoother UI
    // setIsLoading(true); // Only set true on initial load or if explicitly needed
    setError(null);
    try {
      const [latest, history] = await Promise.all([
        fetchLatestBlock(),
        fetchBlockHistory(HISTORY_LIMIT)
      ]);
      setLatestBlock(latest);
      setHistoricalData(history.sort((a, b) => a.blockNumber - b.blockNumber)); // Ensure sorted by block number
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred.');
      }
      console.error("Failed to fetch data:", err);
    } finally {
      // Only set isLoading to false on the initial load
      if (isLoading) {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchData(); // Initial fetch
    const intervalId = setInterval(fetchData, REFRESH_INTERVAL_MS);
    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []); // Empty dependency array means this effect runs once on mount and cleanup on unmount

  return (
    <div className="min-h-screen bg-gray-900">
      <Dashboard
        latestBlock={latestBlock}
        historicalData={historicalData}
        isLoading={isLoading}
        error={error}
      />
    </div>
  );
}

export default App;
