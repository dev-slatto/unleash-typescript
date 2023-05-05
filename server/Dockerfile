FROM node:16-alpine

ADD . /unleash
WORKDIR /unleash

RUN npm config set loglevel "error"
RUN npm install
RUN npm run build
RUN npm cache clean -f

EXPOSE 8080

ENTRYPOINT ["npm", "run", "start"]
