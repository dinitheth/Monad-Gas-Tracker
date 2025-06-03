import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors'; // Import cors
import { getLatestBlock, getBlockHistory } from './services/monadMock';
import { BlockData } from './types';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors()); // Enable CORS for all routes
app.use(express.json());

app.get('/api/gas/latest', async (req: Request, res: Response) => {
  try {
    const latestBlock = await getLatestBlock();
    if (latestBlock) {
      res.json(latestBlock);
    } else {
      res.status(404).json({ message: 'No blocks available.' });
    }
  } catch (error) {
    console.error('Error fetching latest block:', error);
    res.status(500).json({ message: 'Error fetching latest block data.' });
  }
});

app.get('/api/gas/history', async (req: Request, res: Response) => {
  try {
    const limit = parseInt(req.query.limit as string) || 100;
    const history = await getBlockHistory(limit);
    res.json(history);
  } catch (error) {
    console.error('Error fetching block history:', error);
    res.status(500).json({ message: 'Error fetching block history data.' });
  }
});

app.get('/', (req: Request, res: Response) => {
  res.send('Monad Gas Tracker Backend is running!');
});

app.listen(port, () => {
  console.log(`Backend server listening at http://localhost:${port}`);
  console.log('Available endpoints:');
  console.log(`  GET http://localhost:${port}/api/gas/latest`);
  console.log(`  GET http://localhost:${port}/api/gas/history?limit=100`);
});
