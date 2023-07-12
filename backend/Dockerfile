FROM node

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

ENV MONGODB_HOST=mongodb
ENV MONGODB_PORT=27017
ENV MONGODB_DB=TestDB

EXPOSE 3000

CMD ["npm", "start"]