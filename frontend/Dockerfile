# Dockerfile
FROM node:18 as build

WORKDIR /usr/src/app

COPY ./frontend/package.json ./
RUN npm install

COPY ./frontend ./

RUN npm run build

FROM nginx:stable-alpine

EXPOSE 5173
#CMD ["npm", "run", "dev"]