FROM node:14

WORKDIR /app

COPY . /app

RUN npm install

EXPOSE 3002

CMD ["node", "app.js"]
