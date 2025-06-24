# -------------------------------------------
# Stage 1: Build the application
# -------------------------------------------
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm ci

# Copy the rest of the project files
COPY . .

# Build the production version
RUN npm run build

# -------------------------------------------
# Stage 2: Serve the built app with a lightweight web server
# -------------------------------------------
FROM nginx:alpine

# Remove default nginx static files
RUN rm -rf /usr/share/nginx/html/*

# Copy built files from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Add custom nginx config to handle SPA fallback
# Use a HEREDOC to write nginx.conf inline in Dockerfile
RUN printf '%s\n' \
    'server {' \
    '  listen 80;' \
    '  server_name localhost;' \
    '' \
    '  root /usr/share/nginx/html;' \
    '  index index.html;' \
    '' \
    '  location / {' \
    '    try_files $uri $uri/ /index.html;' \
    '  }' \
    '}' \
    > /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
