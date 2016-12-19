FROM alpine:latest

RUN apk update && \
        apk --no-cache add ca-certificates &&\
        update-ca-certificates && \
        apk add openssl && \
        apk add --update curl gnupg tzdata && \
    wget -q -O /etc/apk/keys/sgerrand.rsa.pub https://raw.githubusercontent.com/sgerrand/alpine-pkg-glibc/master/sgerrand.rsa.pub &&\
    wget https://github.com/sgerrand/alpine-pkg-glibc/releases/download/2.23-r3/glibc-2.23-r3.apk && apk add glibc-2.23-r3.apk

RUN mkdir -p /opt/fakt-ui

COPY ./.build /opt/fakt-ui
COPY ./ui/dist/ /opt/fakt-ui/dist
COPY ./docker-entrypoint.sh /opt/fakt-ui

RUN mkdir -p /var/log/fakt-ui

EXPOSE 8081
ENTRYPOINT ["/opt/fakt-ui/docker-entrypoint.sh"]
CMD ["fakt-ui"]