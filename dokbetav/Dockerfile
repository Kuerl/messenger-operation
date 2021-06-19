FROM node:alpine
WORKDIR /app
COPY . .
VOLUME /src 
RUN npm i 
ENTRYPOINT yarn start
EXPOSE 3000