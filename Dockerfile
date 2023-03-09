FROM node:18.0.0-alpine3.13
WORKDIR /build
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3001
CMD [ "node", "build/startBot.js" ]
# i have no idea if this works or not right now