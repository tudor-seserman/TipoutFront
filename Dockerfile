FROM node:alpine3.18 as ts-compiler
WORKDIR /app
LABEL author="Tudor Seserman"
COPY package*.json ./
COPY tsconfig*.json ./
RUN npm install
COPY . .
EXPOSE 5173
CMD ["npm", "run", "dev"]
