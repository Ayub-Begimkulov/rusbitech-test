FROM node:12-alpine as build
WORKDIR /app
COPY package.json /app/package.json
RUN npm install 
COPY . /app
RUN npm run build

FROM nginx:1.17-alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]