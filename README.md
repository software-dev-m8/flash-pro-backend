## Prerequisite

- docker
- mongodb compass
- bun (optional, faster runtime, use instead npm)

## Installation

```bash
$ npm install
```

## Development

```bash
$ cd docker/dev

$ docker compose up -d
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run dev

# production mode
$ npm run prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
