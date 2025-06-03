# Stage 1: Build the React application
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
# VITE_API_BASE_URL will be passed as a build arg or set in environment by docker-compose
ARG VITE_API_BASE_URL=/api
RUN npm run build -- --mode production

# Stage 2: Serve the static files with a lightweight server (nginx)
FROM nginx:stable-alpine
COPY --from=builder /app/dist /usr/share/nginx/html

# Optional: Add a custom nginx config for SPA routing and API proxying if not handled by VITE_API_BASE_URL directly
# COPY nginx.conf /etc/nginx/conf.d/default.conf
# (For simplicity, we'll assume VITE_API_BASE_URL is set correctly for now, or a reverse proxy is used in front of docker-compose)

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
