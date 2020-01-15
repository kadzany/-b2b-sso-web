FROM telkomindonesia/alpine:nodejs-12 as nodejs-builder

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm i -g npm \
    && npm i -g gulp-cli \
    && npm i

COPY . .

RUN gulp



FROM telkomindonesia/alpine:apache-2.4-novol

COPY --from=nodejs-builder /usr/src/app/dist/ /var/www/data/html/
