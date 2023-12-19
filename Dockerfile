# Use an official Node.js runtime as a base image
FROM node:20

# Set the working directory
WORKDIR /usr/src/app

# Install git
RUN apt-get update && apt-get install -y git

# Clone the GitHub repository
RUN git clone https://github.com/telmessos/beyonnex.git .

# Install project dependencies
RUN npm install

# Expose the port if your tests use a specific port
# EXPOSE 4444

# Run the tests
CMD ["npm", "test"]