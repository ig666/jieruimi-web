FROM nginx

ENV NODE_ENV=production

WORKDIR /www
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY 4202219_jieruimi.top.key /etc/nginx/conf.d/default.conf
COPY 4202219_jieruimi.top.pem /etc/nginx/conf.d/default.conf
COPY dist .
