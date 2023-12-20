# Use an official Node.js runtime as a parent image
FROM node:14-alpine

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./
COPY index*.js ./

# Install app dependencies
RUN npm install

# Bundle app source
COPY . .

# Expose port 8080 to the outside world
EXPOSE 8080

# Define the command to run on container start
CMD ["node", "index.js"]
