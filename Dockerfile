FROM node:latest

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json .
RUN npm install

COPY . /usr/src/app

ENV TZ Europe/Moscow

CMD ["npm", "start"]
