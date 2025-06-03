# Monad Gas Tracker

A real-time dashboard to visualize gas trends block-by-block on the Monad blockchain.
This project provides a frontend built with React/Tailwind CSS/Recharts and a backend with Node.js/Express.

## Features

- **Real-time Gas Chart**: Displays gas used per block for the last 100 blocks.
- **Block Stats**: Shows per-block details: block number, gas used, gas limit, number of transactions, and average gas per transaction.
- **Auto-refresh**: Frontend automatically fetches new block data every few seconds.
- **Mock Data Mode**: Backend runs with mock data by default, simulating Monad blockchain activity.
- **Responsive UI**: Designed to be mobile-friendly.

## Project Structure

-   `/frontend`: Contains the React (Vite + TypeScript) frontend application.
-   `/backend`: Contains the Node.js (Express + TypeScript) backend server.
-   `/docs`: (Placeholder) For additional documentation.
-   `/scripts`: (Placeholder) For utility scripts.

## Prerequisites

-   Node.js (v16 or later recommended)
-   npm (or yarn)

## Setup and Running Locally

The application consists of two main parts: the backend server and the frontend client. You'll need to run them in separate terminal sessions.

### 1. Backend Setup

The backend server provides API endpoints for block data. By default, it uses mock data.

1.  **Navigate to the backend directory:**
    ```bash
    cd backend
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Configure Environment Variables:**
    Create a `.env` file in the `backend` directory by copying the example:
    ```bash
    cp .env.example .env
    ```
    The default `.env.example` is set up for mock data and default port:
    ```
    PORT=3001
    # MONAD_RPC_URL=YOUR_MONAD_RPC_ENDPOINT_HERE (Uncomment to connect to a real Monad node)
    ```
    -   `PORT`: The port on which the backend server will run.
    -   `MONAD_RPC_URL`: (Optional) If you want to connect to a live Monad node, uncomment this line and replace `YOUR_MONAD_RPC_ENDPOINT_HERE` with your Monad RPC endpoint. The current backend code primarily uses mock data; integration with a live RPC is a future enhancement.

4.  **Run the backend server (development mode):**
    ```bash
    npm run dev
    ```
    This will start the server using `nodemon`, which automatically restarts on file changes.
    The server will be available at `http://localhost:3001` (or the port you specified).
    You should see console output indicating the server is running and mock blocks are being generated.

### 2. Frontend Setup

The frontend is a React application that consumes data from the backend.

1.  **Navigate to the frontend directory (from the project root):**
    ```bash
    cd frontend
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Configure Environment Variables (Optional):**
    The frontend is pre-configured to connect to the backend at `http://localhost:3001/api`.
    If your backend is running on a different URL, create a `.env.development` file in the `frontend` directory:
    ```
    VITE_API_BASE_URL=http://your-backend-api-url
    ```
    Vite automatically picks up environment variables prefixed with `VITE_`.

4.  **Run the frontend development server:**
    ```bash
    npm run dev
    ```
    This will start the Vite development server, typically at `http://localhost:5173` (Vite will indicate the actual port in the console).
    Open your browser to this address to see the Monad Gas Tracker dashboard.

## Using the Application

Once both backend and frontend are running:

1.  Open the frontend URL (e.g., `http://localhost:5173`) in your browser.
2.  The dashboard will display:
    -   A line chart showing gas used for the latest blocks.
    -   A card displaying detailed statistics for the most recent block.
3.  The data will auto-refresh every 5 seconds, pulling new mock data from the backend.

## Future Enhancements (Connecting to Monad)

To connect the backend to a real Monad network node (testnet or mainnet):

1.  **Update Backend RPC URL**: In `backend/.env`, set `MONAD_RPC_URL` to your Monad node's HTTP RPC endpoint.
2.  **Implement RPC Calls**: Modify `backend/src/services/monadService.ts` (or a similar file) to replace mock data functions with actual `web3.js` or `ethers.js` calls to `eth_getBlockByNumber`, `eth_getTransactionReceipt`, etc., using the `MONAD_RPC_URL`.
    - You would need to install `web3` or `ethers`: `npm install web3` or `npm install ethers` in the `backend` directory.
3.  **Data Handling**: Adjust data transformation to match the structure expected by the frontend.
4.  **Error Handling**: Implement robust error handling for RPC communication issues.

## Available API Endpoints (Backend)

-   `GET /api/gas/latest`: Returns the latest block stats.
-   `GET /api/gas/history?limit=N`: Returns the last N blocks (default N=100).

## Running with Docker (Optional)

This project includes `Dockerfile`s for both the frontend and backend, and a `docker-compose.yml` file to orchestrate them. This is an easy way to run the application in a containerized environment.

**Prerequisites for Docker:**
-   Docker Desktop (or Docker Engine + Docker Compose) installed.

**Steps:**

1.  **Ensure `.env` file for backend exists:**
    Make sure you have a `backend/.env` file. You can copy it from `backend/.env.example` if you haven't already. This file will be used by the backend container.
    ```bash
    cp backend/.env.example backend/.env
    ```
    *(Modify `backend/.env` if you need to change the `PORT` or add `MONAD_RPC_URL`)*

2.  **Build and run the application using Docker Compose:**
    From the project root directory (where `docker-compose.yml` is located):
    ```bash
    docker-compose up --build
    ```
    This command will:
    -   Build the Docker images for both the frontend and backend services if they don't exist or if their build context has changed.
    -   Start containers for both services.
    -   The `-d` flag can be added (`docker-compose up --build -d`) to run in detached mode (in the background).

3.  **Accessing the application:**
    -   **Frontend**: Open your browser to `http://localhost:8080`. (Mapped from container port 80)
    -   **Backend API**: The API will be available at `http://localhost:3001`.

4.  **Frontend API Configuration for Docker:**
    The `frontend/Dockerfile` and `docker-compose.yml` are set up so that the `VITE_API_BASE_URL` build argument defaults to `/api`. This means for the frontend running in Docker (served by Nginx on port 80, mapped to host 8080) to reach the backend API, you would typically:
    *   Access the frontend at `http://localhost:8080`.
    *   The frontend makes API calls to `/api/...`.
    *   **You would need a reverse proxy** (like Nginx running on your host, or another Docker container configured as a reverse proxy) in front of this Docker Compose setup to route requests:
        *   `http://your-domain/` (or `http://localhost/`) to the frontend service (e.g., `http://localhost:8080`).
        *   `http://your-domain/api/` (or `http://localhost/api/`) to the backend service (e.g., `http://localhost:3001/api/`).

    **Alternative for simpler Docker setup (no external reverse proxy):**
    If you don't want to set up an external reverse proxy, you can modify the `VITE_API_BASE_URL` in `docker-compose.yml` for the `frontend` service's build arguments to be the direct backend URL:
    ```yaml
    # In docker-compose.yml, under frontend > build > args:
    # VITE_API_BASE_URL=http://localhost:3001/api
    ```
    This way, the frontend (served on `http://localhost:8080`) will make API calls directly to `http://localhost:3001/api`. This is simpler for local Docker development when not using a dedicated reverse proxy. Remember to rebuild the frontend container if you change this build argument (`docker-compose up --build`).


5.  **Stopping the application:**
    Press `Ctrl+C` in the terminal where `docker-compose up` is running. If running in detached mode, use:
    ```bash
    docker-compose down
    ```

This setup provides a consistent environment for running the application.

## Technologies Used

-   **Frontend**: React, TypeScript, Vite, Tailwind CSS, Recharts
-   **Backend**: Node.js, Express, TypeScript
-   **Linting/Formatting**: (Assumed ESLint/Prettier, though not explicitly set up in this plan)

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request.
(Further contribution guidelines can be added here).
