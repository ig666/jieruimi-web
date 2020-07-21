FROM nginx

ENV NODE_ENV=production

WORKDIR /www
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY 4202219_jieruimi.top.key /etc/nginx/4202219_jieruimi.top.key
COPY 4202219_jieruimi.top.pem /etc/nginx/4202219_jieruimi.top.pem
COPY dist .
