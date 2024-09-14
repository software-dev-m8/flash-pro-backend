FROM node:18.17.0-alpine3.18 AS development

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

FROM node:18.17.0-alpine3.18 AS production

WORKDIR /usr/src/app/

COPY package*.json ./

ARG PORT=4000
ENV PORT=${PORT}

RUN npm install --only=production

COPY --from=development /usr/src/app/dist ./dist

EXPOSE 4000

CMD ["node", "dist/main"]
