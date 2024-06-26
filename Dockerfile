FROM node:latest

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .


EXPOSE 4330

CMD ["npm", "start"]
