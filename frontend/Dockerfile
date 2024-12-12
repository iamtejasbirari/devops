# Stage 1: Build the React app
FROM node:18 as build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the source code
COPY . .

# Build the React app
RUN npm run build

# Stage 2: Serve the React app using Nginx
FROM nginx:1.25

# Copy built React files from the first stage
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
