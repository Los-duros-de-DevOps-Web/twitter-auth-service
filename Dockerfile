FROM node:17-alpine

# Create app directory
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install
RUN npx prisma generate
COPY . . 
EXPOSE 3002

RUN npx prisma generate
CMD [ "npm", "run","start" ]
