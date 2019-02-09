FROM nginx:mainline 
WORKDIR /usr/share/nginx/html
COPY ./build/ .