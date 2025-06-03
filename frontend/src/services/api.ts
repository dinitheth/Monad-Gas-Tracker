import { BlockData } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api';

export const fetchLatestBlock = async (): Promise<BlockData> => {
  const response = await fetch(`${API_BASE_URL}/gas/latest`);
  if (!response.ok) {
    throw new Error(`Failed to fetch latest block: ${response.statusText}`);
  }
  return response.json();
};

export const fetchBlockHistory = async (limit: number = 100): Promise<BlockData[]> => {
  const response = await fetch(`${API_BASE_URL}/gas/history?limit=${limit}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch block history: ${response.statusText}`);
  }
  return response.json();
};
