FROM nginx
MAINTAINER liguohua@cloud-star.com.cn
#set enviroments
ENV RUN_USER nginx
ENV RUN_GROUP nginx
ENV DATA_DIR /data/dist
ENV LOG_DIR /data/log/nginx
#run instructions
RUN mkdir /data/log/nginx -p
RUN chown nginx.nginx -R /data/log/nginx
#add  files
ADD dist /data/dist
ADD docker/nginx.conf /etc/nginx/nginx.conf
ADD docker/default.conf /etc/nginx/conf.d/default.conf
#expose port
EXPOSE 80
#set ENTRYPOINT
ENTRYPOINT nginx -g "daemon off;"