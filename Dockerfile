FROM node:22

WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./
COPY src ./src

RUN npm install --omit=dev

RUN npm run build

EXPOSE 3000

CMD ["node", "dist/src/main.js"]
