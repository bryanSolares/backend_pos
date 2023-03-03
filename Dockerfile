# FROM node:16-alpine3.12

# WORKDIR /app
# COPY . .
# RUN  npm install -g pnpm
# RUN pnpm install --prod

# EXPOSE 3999

# CMD [ "npm", "run", "start" ]

FROM node:18.14.2-alpine as dev
WORKDIR /app
COPY package.json ./
RUN yarn install
CMD [ "yarn", "start:dev" ]

FROM node:18.14.2-alpine as dev-dependencies
WORKDIR /app
COPY package.json package.json
RUN yarn install --frozen-lockfile

FROM node:18.14.2-alpine as builder
WORKDIR /app
COPY --from=dev-dependencies /app/node_modules ./node_modules
COPY . .
RUN yarn test

FROM node:18.14.2-alpine as prod-dependencies
WORKDIR /app
COPY package.json package.json
RUN yarn install --prod --frozen-lockfile

FROM node:18.14.2-alpine as prod
EXPOSE 3000
WORKDIR /app
ENV APP_VERSION=1.0.0
COPY --from=prod-dependencies /app/node_modules ./node_modules
COPY --from=builder . /app
CMD [ "npm", "run", "start" ]
