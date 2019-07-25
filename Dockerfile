# Build container
FROM node:12-slim as build

WORKDIR /opt/app

ADD package.json .
ADD package-lock.json .
RUN npm ci

ADD index.js .

RUN echo "=========================\n Done =========================\n"

# Deploy container
FROM node:12-slim

WORKDIR /opt/app

COPY --from=build /opt/app/ .

EXPOSE 3000

CMD npm run start

