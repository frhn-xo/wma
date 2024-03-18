FROM node:21-alpine

RUN apk update && apk add --no-cache \
    wget \
    gnupg \
    ca-certificates \
    chromium

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080

CMD ["npm", "start"]
