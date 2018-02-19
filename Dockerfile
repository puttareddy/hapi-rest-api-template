FROM smebberson/alpine-consul-nodejs

RUN apk add --no-cache openssh-client bash bash-doc bash-completion

RUN npm install -g \
    grunt-cli

EXPOSE 8080

RUN mkdir /app
WORKDIR /app
ADD package.json /app/package.json
RUN npm install
ADD . /app

ADD consul/example_service.json /etc/consul/conf.d/example_service.json
ADD consul/run /etc/services.d/consul/run

RUN grunt build
