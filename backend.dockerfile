FROM node:16-alpine3.12

WORKDIR /app
COPY . .
RUN  npm install -g pnpm
RUN pnpm install

EXPOSE 3999

CMD [ "npm", "run", "start" ]
