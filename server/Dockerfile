FROM node:12-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY /src /app/src
EXPOSE 3000
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.7.3/wait /wait
RUN chmod +x /wait
CMD /wait && node src/index.js