# Nginx学习笔记

## 什么是Nginx

Nginx(读作engine X)是一个性能突出的服务器/反向代理服务器软件，由于它的内存占用少，启动极快，**高并发能力强**，在互联网项目中广泛应用。Nginx专为性能优化开发，能经受高负载的考验，有报告表明，支持高达50，000个并发连接数。

Nginx支持热部署，启动容易，可以做到7*24小时不间断运行。可以在不间断服务的情况下对软件进行升级。

## 基本概念

### 反向代理

- 正向代理：如果把局域网外的Internet想像成一个巨大的资源库，则局域网中的客户端要访问Internet，则需要通过代理服务器来访问，这种代理服务就是正向代理。
- 反向代理：客户端对代理无感知，因为客户端无需任何配置就可以访问，我们只需要将请求发送给反向代理服务器中，由反向代理服务器去选择目标服务器获取数据后，再返回给客户端，此时反向代理服务器和目标服务器对外就是一个服务器，暴露的是代理服务器的地址，隐藏了真实的服务器IP地址。

个人理解：正向代理对服务器隐藏客户端，反向代理对客户端隐藏服务器。

### 负载均衡

客户端发送多个请求到服务器，服务器处理请求，有一些可能要与数据库进行交互，服务器处理完毕后，再将结果返回给客户端。但是这种架构当并发量特别大的时候，容易造成服务器崩溃，这是由于服务器性能瓶颈造成的问题。单个服务器解决不了，我们将请求分发到多个服务器上，将负载分发到不同的服务器上，也就是负载均衡。

### 动静分离

为了加快网页解析速度，可以把动态页面和静态页面由不同的服务器来解析，加快解析速度，降低单个服务器压力。

## 下载安装虚拟机和操作系统

我们使用CentOS 7.4 Minimal 版本 [下载地址](https://vault.centos.org/7.4.1708/isos/x86_64/CentOS-7-x86_64-Minimal-1708.iso)，这样没有其他软件，比较轻巧。安装虚拟机和操作系统请参考其他资料。

安装后发现无法上网，使用`ip addr`命令查看，发现有本地回环127.0.0.1

输入`vi /ect/sysconfig/network-scripts/ifcfg-ens33`

将`ONBOOT=no`改成 `ONBOOT=yes`

保存该文件，然后重启网络服务`systemctl restart network`

这时虚拟机已经可以正常的上网了

使用`ip addr`命令查看ip

输入`vi /ect/sysconfig/network-scripts/ifcfg-ens33`

将`BOOTPROTO=dhcp` 改成 `BOOTPROTO=static`

增加`IPADDR=刚刚的ip`，`NETMASK=255.255.255.0`，`GATEWAY=刚刚的ip最后一组变成.1`(Mac 使用vmware的情况下是.2)，`DNS1=8.8.8.8` 

保存该文件，然后重启网络服务`systemctl restart network`

## 常用版本分为四大阵营

Nginx开源版，Nginx plus商业版，OpenResty（开源），Tengine（淘宝网公布，开源）

## 下载与安装

[下载1.22.1版本](http://nginx.org/download/nginx-1.22.1.tar.gz)上传至服务器root根目录

执行命令解压缩：`tar zxvf nginx-1.22.1.tar.gz `

安装依赖并安装：

```bash
yum install -y gcc
yum install -y perl
yum install -y pcre pcre-devel
yum install -y zlib zlib-devel
cd nginx-1.22.1
./configure --prefix=/usr/local/nginx
make
make install
# 启动nginx
cd /usr/local/nginx/sbin
./nginx
# 关闭防火墙
systemctl stop firewalld.service
# 禁止防火墙开机启动
systemctl disable firewalld.service
```

在物理机输入虚拟机IP，出现nginx字样即成功。

其他命令：

```bash
cd /usr/local/nginx/sbin
# 启动
./nginx
# 快速停止
./nginx -s stop
# 在推出前完成已经接受的连接请求
./nginx -s quit
# 重新加载配置
./nginx -s reload
```

## 安装成系统服务

```bash
vi /usr/lib/systemd/system/nginx.service
```

```bash
[Unit]
Description=nginx - high performance web server
Documentation=http://nginx.org/en/docs/
After=network.target remote-fs.target nss-lookup.target
 
[Service]
Type=forking
PIDFile=/usr/local/nginx/logs/nginx.pid
ExecStartPre=/usr/local/nginx/sbin/nginx -t -c /usr/local/nginx/conf/nginx.conf
ExecStart=/usr/local/nginx/sbin/nginx -c /usr/local/nginx/conf/nginx.conf
ExecReload=/usr/local/nginx/sbin/nginx -s reload
ExecStop=/usr/local/nginx/sbin/nginx -s stop
ExecQuit=/usr/local/nginx/sbin/nginx -s quit
PrivateTmp=true
 
[Install]
WantedBy=multi-user.target
```

```bash
# 重新加载服务
systemctl daemon-reload
# 启动nginx服务
systemctl start nginx.service
# 开机启动nginx
systemctl enable nginx.service
```

## 运行原理

![image-20221227223419050](https://cdn.jsdelivr.net/gh/inusturbo/images@main/uPic/20221227-223419-J618UP.png)

## Nginx 基础配置

### 最小配置文件/conf/nginx.conf

```json
# 工作进程个数（主进程成为master，工作进程成为worker） 最好对应当前计算机物理CPU核数
worker_processes  1;

# 事件驱动模块
events {
   
    # 一个worker可以创建的连接数
    worker_connections  1024;
}

http {
    # 可以用include命令将其他配置文件引入本配置文件
	 # mime是响应头 表明返回的类型 不同的类型有不同的后缀名 告诉浏览器这个文件是什么类型
    include       mime.types;
    # 如果不在上面的类型中则使用application/octet-stream类型
    default_type  application/octet-stream;
   
	 # 数据零拷贝 免除了拷贝的过程 直接将文件通过网络发送 nginx不进行读取和拷贝
    sendfile        on;
   
    #保持连接 超时的时间
    keepalive_timeout  65;

    # vhost虚拟主机 一个server代表一个主机，通过端口号的开启不同主机
    server {
   	  # 端口号
        listen       80;
   	  # 域名或者主机名
        server_name  localhost;
		  # 域名URI（不是URL）  域名后面的那些内容
        location / {
   			# 相对路径（相对nginx程序）
            root   html;
   			# html目录下的index.html index.htm
            index  index.html index.htm;
        }
		  # 遇到错误 展示的页面
        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }
    }
}
```

## 虚拟主机与域名解析

### 域名、DNS、IP地址之间的关系

![image-20230104084238649](https://cdn.jsdelivr.net/gh/inusturbo/images@main/uPic/20230104-084239-jEh1qI.png)

HTTP协议是高级协议（应用层），TCP/IP协议是底层协议（应用层、传输层、网络层和数据链路层）

HTTPS协议：由HTTP 加上TLS/SSL 协议构建的可进行加密传输、身份认证的网络协议

### 虚拟主机原理

多个域名对应到同一个IP地址上，由服务器端来判断究竟访问的哪个域名，然后访问不同的目录。

### 配置主机的域名解析
在Windows下有一个hosts文件。按照文件中的例子进行配置即可。可以在本地设置域名的解析。该设置仅在本地有效。

### 域名解析的记录区别

A记录：所对应域名匹配一个IP地址。泛解析：用*代表通配符，可以匹配任何二级域名。

CNAME记录：将本域名转向另外一个域名

AAAA：IPV6地址

MX：指向邮件服务器

### 域名解析与泛域名解析实战

本机域名解析 Windows下打开Hosts文件增加一行虚拟机地址 s.com，如果出现拒绝访问，要用管理员权限打开。p14

域名解析相关企业项目实战技术架构

​	多用户二级域名

​	短网址

​	httpdns

Nginx中的虚拟主机配置
