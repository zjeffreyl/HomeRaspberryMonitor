### STAGE 1: Build ###
FROM arm32v7/node:12.19.0-alpine3.9 AS build

ARG REACT_APP_HOST_IP_ADDRESS

WORKDIR /usr/src/app

COPY package.json .
COPY ./package-lock.json .

RUN npm install
COPY ./public ./public/
COPY ./src ./src/

RUN REACT_APP_HOST_IP_ADDRESS=${REACT_APP_HOST_IP_ADDRESS}

RUN npm run build

### STAGE 2: Run ###
FROM arm32v7/nginx:1.18-alpine
COPY default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /usr/src/app/build /usr/share/nginx/html
EXPOSE 80