FROM node:12-alpine as builder

COPY ["./package.json", "./package-lock.json", "./babel.config.js", "/build/"]
WORKDIR /build
RUN npm ci --quiet
COPY ./config /build/config
COPY ./public /build/public
COPY ./src /build/src

RUN npm run build


FROM nginx:latest

COPY ["config/nginx.conf", "/etc/nginx/nginx.conf"]
COPY ["config/nginx.local.conf", "/etc/nginx/conf.d/kb-spa.conf"]
WORKDIR /app
COPY --from=builder /build/dist /app/dist
EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"]
