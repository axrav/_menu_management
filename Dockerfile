FROM node:latest

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

COPY .env .env

EXPOSE 4330

CMD ["npm", "start"]
