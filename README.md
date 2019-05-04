##端口##
默认端口：3001

修改端口：bin/www文件中修改

##下载依赖模块##
在项目目录下执行：

	npm install --save-dev

##apiGo服务部署
一,系统所需环境
* 操作系统：Cent os 6.x
* Node:6.10.3
* Mysql 5.x

注：除了git的安装与pull项目代码可以用admin用的，其它的必须在root用户下执行

 

二，环境安装与部署

1. 安装NODE：

yum install -y gcc-c++ make
curl -sL https://rpm.nodesource.com/setup_6.x | sudo -E bash -
yum install nodejs //安装nodejs


2. 检查NODE版本号：
node -v

3. 更新npm到最新版本：

npm install npm -g

4. 安装Node服务部署工具pm2

npm install -g pm2
5. 安装git

yum install git-core


二，项目部署

1. 同步项目代码到服务器目录

git clone https://github.com/EHDFE/apiGo.git

2. 安装项目组件依赖，在项目根目录下执行：

npm install

3. 更改端口号,修改./bin/www中的

process.env.PORT = 8000;

4. 更改数据库连接，修改：./config/config.js的信息

5. 启动服务, 在项目根目录执行：

npm run pm2


----------

> **监控node服务的其他命令**
> 
> pm2 list //查看现在使用pm2管理的node进程
> 
> pm2 delete all //删除所有进程
> 
> pm2 reload 0 //重载id为0的进程
> 
> pm2 restart 0 //重启id为0的进程
> 
>更多关于pm2使用的方法可以参考[文档](http://pm2.keymetrics.io/)

> **修改文件内容**
> 
> 进入修改的文件：vi www 
> 
> 不保存修改: 1)Esc退出, 2)Shift : q!
> 
> 保存修改: 1)Esc退出, 2)Shift : wq
>

