# Use an official Node.js runtime as a base image
FROM node:20
# Install utilities
RUN apt-get -yqq update && \
  apt-get -yqq install curl gnupg libglib2.0-0 libnss3 libdbus-1-3 libatk1.0-0 libatk-bridge2.0-0 libcups2 libdrm2 libxkbcommon0 libxcomposite1 libxdamage1 libxfixes3 libxrandr2 libgbm1 libpango1.0-0 libasound2 && \
  useradd -ms /bin/bash runner

WORKDIR /app
ADD . /app

COPY . /app

RUN npm install

CMD npx wdio