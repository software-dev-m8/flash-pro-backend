FROM node:18.17.0-alpine3.18 AS development

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:18.17.0-alpine3.18 AS production

WORKDIR /usr/src/app

ENV PORT=3000
ENV NODE_ENV=production

COPY --from=development /usr/src/app/dist ./dist
COPY --from=development /usr/src/app/node_modules ./node_modules

EXPOSE ${PORT}

CMD ["node", "dist/main"]
