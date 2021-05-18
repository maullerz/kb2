FROM node:14-alpine as builder
# ENV NODE_ENV=production

COPY ["./package.json", "./package-lock.json", "./babel.config.js", "/build/"]
WORKDIR /build
RUN npm ci
COPY ./src /build/src
COPY ./public /build/public
# COPY ./config /build/config
COPY ["./config/webpack.prod.config.js", "./config/aliases.js", "./config/webpack.rules.js", "/build/config/"]

RUN npm run build


FROM nginx:alpine

COPY ["config/nginx.conf", "/etc/nginx/nginx.conf"]
COPY ["config/nginx.local.conf", "/etc/nginx/conf.d/kb2.conf"]
WORKDIR /app
COPY --from=builder /build/dist /app/dist
EXPOSE 4100

CMD ["nginx", "-g", "daemon off;"]
