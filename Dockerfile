FROM node:17
RUN mkdir -p /app
WORKDIR /app
COPY . /app
RUN npm install
EXPOSE 3002
CMD ["node", "app.js"]
