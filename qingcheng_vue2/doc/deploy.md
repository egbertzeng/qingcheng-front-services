##1.打包vue代码
```
打包命令：
  npm  run build
验证结果：
  如果执行成能看到如下提示，并生产dist目录，
  将此目录上传到服务器即可访问。

```

##2.nginx服务器配置
```
1.下载和解压
	wget http://nginx.org/download/nginx-1.12.0.tar.gz
	tar -zxvf nginx-1.12.0.tar.gz
2.编译和安装
	cd nginx-1.12.0/
	./configure
	make install
	whereis nginx
3.查看安装路径
	whereis nginx
	cd /usr/local/nginx
4.配置nginx
   vim ./conf/nginx.conf
    配置内容：
     server {
            listen       8090;
            server_name  localhost;
    
            #charset koi8-r;
    
            #access_log  logs/host.access.log  main;
    
            location / {
                root   /bigdata/software/dist;
                index  index.html index.htm;
                error_page  404  /index.html;
            }
            .....................
            .....................
            .....................
        }
    
    
       说明：
        //配置Nginx监听端口
        listen       8090;
    
        //配置vue打包后的目录路径
        root   /bigdata/software/dist;
      
        //配置默认的首页
        index  index.html index.htm;
      
        //配置错误页面，开启vue的history模式后要配置这个东西。
        error_page  404  /index.html;

5.启动Nginx
   ./sbin/nginx
   
   ./usr/local/nginx/sbin/nginx
6.端口验证
    netstat -luntp
7.浏览器验证
    http://qingcheng11:8090/
```

##3.ngnix高级配置
```
1.常用命令
  cd /usr/local/nginx/sbin/
  ./nginx 
  ./nginx -s stop
  ./nginx -s quit
  ./nginx -s reload
  ./nginx -s quit:此方式停止步骤是待nginx进程处理任务完毕进行停止。
  ./nginx -s stop:此方式相当于先查出nginx进程id再使用kill命令强制杀掉进程。

2.查询nginx进程：
  ps aux|grep nginx
  
3.开机自启动
  3.1即在rc.local增加启动代码就可以了。
    执行命令:vi /etc/rc.local
    增加一行:/usr/local/nginx/sbin/nginx
  3.2设置执行权限：
    chmod 755 /etc/rc.local
```
