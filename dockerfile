# Dockerfile
# Use the official Node.js 16 image as a parent image
FROM node:18-alpine

# Set the working directory in the Docker container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (or yarn.lock) to the container working directory
COPY package*.json yarn.lock ./

# Install project dependencies using npm
RUN yarn install

# Bundle the source code inside the Docker image
COPY . .

# Build the application for production
RUN yarn build

# Use a lightweight server to serve the production build
RUN yarn global add serve

# Open port 3000 to have it mapped by the docker daemon
EXPOSE 3000

# Define the command to run the app
CMD ["serve", "-s", "build", "-l", "3000"]
