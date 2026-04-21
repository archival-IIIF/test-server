# test-server

This a test server to test iiif clients. 

It contains test cases of Image API (v2 and v3), Presentation API (v2 and v3) abd Auth API (v1).

## Installation

1. Install [Node.js](https://nodejs.org/en/https://nodejs.org/en/)
2. Install [yarn](https://yarnpkg.com) or [npm](https://www.npmjs.com/)
3. Copy env.example to .env and set up the parameters
4. ```yarn install``` or ```npm install```
5. ```yarn run start``` or  ```npm run start```

## Docker

This project can also run in Docker.

1. Copy `env.example` to `.env` if you want to customize the port
2. Build and start the container:
   ```bash
   docker compose up --build
   ```
3. Open `http://localhost:3333`

To stop the container:

```bash
docker compose down
```

## Demo

https://iiif-testing.sozialarchiv.ch
