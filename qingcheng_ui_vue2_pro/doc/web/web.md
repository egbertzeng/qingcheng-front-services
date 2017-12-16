
一、下载解压
wget https://nodejs.org/dist/v6.10.0/node-v6.10.0-linux-x64.tar.xz
xz -d node-v6.10.0-linux-x64.tar.xz
tar -xvf node-v6.10.0-linux-x64.tar

二、配置环境变量
1.环境变量配置方法
vim ~/.bashrc
scp ~/.bashrc  qingcheng12:~/.bashrc
scp ~/.bashrc  qingcheng13:~/.bashrc
source   ~/.bashrc

2.检查环境是否配置成功
node -version
npm -version

三、安装淘宝镜像
npm install -g cnpm --registry=https://registry.npm.taobao.org

四、上传文件

五、	安装并启动
1.安装
cnpm install
npm install
2.启动
cnpm start
npm start




