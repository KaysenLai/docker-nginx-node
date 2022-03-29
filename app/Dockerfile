FROM node:14-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --silent

COPY . .

CMD ["node", "app.js"]
