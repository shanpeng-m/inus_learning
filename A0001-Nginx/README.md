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

## Nginx中的虚拟主机配置

先创建几个站点

```bash
cd /
mkdir www
cd www
mkdir www
mkdir vod
cd vod
vi index.html
```

在`index.html`中随便写点内容

```bash
cd ../www
vi index.html
```

在`index.html`中随便写点内容

```bash
cd /usr/local/nginx/conf
vi nginx.conf
```

打开之后在http模块下修改

```bash
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
    server {
   	  # 端口号
        listen       88;
   	  # 域名或者主机名
        server_name  localhost;
		  # 域名URI（不是URL）  域名后面的那些内容
        location / {
   			# 相对路径（相对nginx程序）
            root   /www/www;
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

```bash
systemctl reload nginx #重新加载
systemctl status nginx #查看状态
```

## ServerName匹配规则

一个Server里面可以配置多个server_name

从头到位匹配第一个符合规则的server。如果全部没有匹配，则进入第一个server。

```bash
	server {
   	  # 端口号
        listen       80;
   	  # 域名或者主机名
        server_name  vod.server.com vod1.server.com; #可配置多个域名，用空格隔开
        # server_name  *.server.com; #可配置通配符（前置匹配）
        # server_name  www.server.*; #可配置通配符（后置匹配）
        # server_name  ~^[0-9]+\.server\.com$; #正则匹配
		  # 域名URI（不是URL）  域名后面的那些内容
        location / {
   			# 相对路径（相对nginx程序）
            root   /www/www;
   			# html目录下的index.html index.htm
            index  index.html index.htm;
        }
		  # 遇到错误 展示的页面
        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }
    }
```

## 反向代理

### 网关、代理和反向代理

![image-20230201170125952](https://cdn.jsdelivr.net/gh/inusturbo/images@main/uPic/20230201-170126-HkUFFC.png)

正向代理是在客户端和服务器之间设置的代理服务器，用于代表客户端请求资源。客户端向代理发送请求，代理再向服务器发送请求，并返回服务器的响应。

反向代理则是在服务器和客户端之间设置的代理服务器，用于代表服务器处理客户端请求。客户端向服务器发送请求，服务器再向代理发送请求，代理再向客户端发送响应。

总之，正向代理主要用于隐藏客户端的身份，反向代理则用于负载均衡和提供安全防护。

### 反向代理在系统架构中的应用场景

Nginx使用隧道式代理可能会导致性能问题。LVS是一个更专业的负载均衡工具，支持DR模型的代理。请求由代理服务器处理，响应由服务器直接返回给用户。

QPS（Queries Per Second）表示每秒钟执行的查询数量，它代表了系统的并发量。QPS越高，说明系统的并发处理能力越强。

反向代理常见的应用场景包括：

1. 流量管理：通过分配请求以避免服务器超载，提高应用程序的可用性。
2. 安全：通过隐藏后端服务器的网络地址，防止攻击者直接攻击后端服务器。
3. 内容缓存：通过存储经常请求的内容，加速对这些内容的请求响应速度。
4. 内容分发：通过在多个服务器上存储内容的多份副本，提高内容的可用性。
5. 访问控制：通过验证用户身份，仅允许已经被授权的用户访问后端服务器。
6. 协议转换：通过将请求从一种协议转换为另一种协议，以便与后端服务器进行通信。

### 基于反向代理的负载均衡器

复制出一堆服务器，这些一样的服务器称为集群。

有很多算法，如：轮询，Retry，IP-Hash等等。

## 配置反向代理

```bash
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
          proxy_pass http://192.168.0.102; 
   			# 相对路径（相对nginx程序）
        #   root   html;
   			# html目录下的index.html index.htm
        #   index  index.html index.htm;
        }
		  # 遇到错误 展示的页面
        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }
    }
}
```

`proxy_pass`是Nginx中的一个指令，用于将请求转发到后端服务器。它表示在Nginx作为代理服务器时，当请求到达Nginx时，Nginx会将该请求转发到指定的后端服务器上，并将后端服务器的响应返回给客户端。

但是不支持转发到https的服务器上

## 配置负载均衡
```bash
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
    
		upstream httpds{
				server 192.168.0.1:80;
				server 192.168.0.2:80;
				server 192.168.0.3:80;
		}
    # vhost虚拟主机 一个server代表一个主机，通过端口号的开启不同主机
    server {
   	  # 端口号
        listen       80;
   	  # 域名或者主机名
        server_name  localhost;
		  # 域名URI（不是URL）  域名后面的那些内容
        location / {
          proxy_pass http://httpds; 
   			# 相对路径（相对nginx程序）
        #   root   html;
   			# html目录下的index.html index.htm
        #   index  index.html index.htm;
        }
		  # 遇到错误 展示的页面
        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }
    }
}
```

`upstream`配置负载均衡，简单的轮询算法。

## 负载均衡策略

### 权重

给不同的服务器设置不同的权重，分别给不同的服务器不同的负载。

配置方法如下：

```bash
		upstream httpds{
				server 192.168.0.1:80 weight=8;
				server 192.168.0.2:80 weight=2;
				server 192.168.0.3:80 weight=1;
		}
```

### down

表示当前主机不参与负载均衡

配置方法如下：

```bash
		upstream httpds{
				server 192.168.0.1:80 weight=8 down;
				server 192.168.0.2:80 weight=2;
				server 192.168.0.3:80 weight=1;
		}
```

### backup

备用服务器，正常情况下不用，只有当出现问题时才会负载到这台机器。
```bash
		upstream httpds{
				server 192.168.0.1:80 weight=8 down;
				server 192.168.0.2:80 weight=2;
				server 192.168.0.3:80 weight=1 backup;
		}
```

### ip_hash

轮询的方式无法保持会话，下面这几种方法可以在负载均衡的同时保持会话。

通过来源IP地址，定向转向到同一台服务器。只要客户端IP不变，就可以转向同一个服务器。

### least_conn

最少连接访问

### url_hash

根据用户访问的url定向转发请求

### fair

根据后端服务器响应时间转发请求



企业应用中，要么lua脚本自定义脚本，要么使用轮询方法。

## 动静分离

### 使用动静分离的场景

动静分离适合初创的企业。可以起到加速的作用。动静分离是让动态网站里的动态网页根据一定规则把不变的资源和经常变的资源区分开来，动静资源做好了拆分以后，我们就可以根据静态资源的特点将其做缓存操作，这就是网站静态化处理的核心思路。

### 动静分离原理



### Nginx动静分离的配置

```bash
    server {
   	  # 端口号
        listen       80;
   	  # 域名或者主机名
        server_name  localhost;
		  # 域名URI（不是URL）  域名后面的那些内容
        location / {
          proxy_pass http://192.168.0.102:8080; 
        }
        location /css {
          root html;
          index index.html index.htm
        }
        location /js {
          root html;
          index index.html index.htm
        }
        location /image {
          root html;
          index index.html index.htm
        }
		  # 遇到错误 展示的页面
        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }
    }
```

<img src="https://cdn.jsdelivr.net/gh/inusturbo/images@main/uPic/20230203-131116-O2pN1h.png" alt="image-20230203131115933" style="zoom:55%;" />

location / 将所有请求都默认匹配到默认路径下。

location /* 比默认优先级高

使用正则表达式匹配 location ~*/(js|img|css)

## URL Rewrite 伪静态

目的是将index.jsp隐藏，

比如用户访问http://192.168.0.1/2.html实际上访问的是http://192.168.0.1/index.jsp?pageNum=2

### 配置方法

```bash
    server {
   	  # 端口号
        listen       80;
   	  # 域名或者主机名
        server_name  localhost;
		  # 域名URI（不是URL）  域名后面的那些内容
        location / {
          # rewrite ^正则表达式$ 目标访问页面 访问方法flag标记
          # rewrite ^/2.html$ /index.jsp?pageNum=2 break;
          # rewrite ^/([0-9]+).html$ /index.jsp?pageNum=$1 break;
          proxy_pass http://192.168.0.102:8080; 
        }
        location /css {
          root html;
          index index.html index.htm
        }
        location /js {
          root html;
          index index.html index.htm
        }
        location /image {
          root html;
          index index.html index.htm
        }
		  # 遇到错误 展示的页面
        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }
    }
```
### 访问方法flag标记

last 本条规则匹配完成后，继续向下匹配新的location URI规则。

break 本条规则匹配完成后，不再匹配后面的任何规则

redirect 返回302临时重定向，浏览器地址栏显示跳转后的URL地址

permanent 返回301永久重定向，浏览器地址栏会显示跳转后的URL地址

## 防盗链与http的referer

盗链是指在自己的页面上展示一些并不在自己服务器上的一些内容， 获取别人的资源地址，绕过别人的资源展示页面，直接在自己的页面上向最终用户提供此内容。 一般被盗链的都是图片、 音乐、视频、软件等资源。通过盗链的手段可以减轻自己服务器的负担。

防盗链：服务器中的资源只能由本站访问，不能由其他网站访问。

**`Referer`** 请求头包含了当前请求页面的来源页面的地址，即表示当前页面是通过此来源页面里的链接进入的。服务端一般使用 `Referer` 请求头识别访问来源，可能会以此进行统计分析、日志记录以及缓存优化等。

### 防盗链的配置

```bash
server {
  # 端口号
    listen       80;
  # 域名或者主机名
    server_name  localhost;
	  # 域名URI（不是URL）  域名后面的那些内容
    location / {
      proxy_pass http://192.168.0.102:8080; 
    }
    location ~*/(js|img|css) {
    	# valid_referers 192.168.0.103;#来源的网址
    	# valid_referers none 192.168.0.103;#检测Referer头域不存在的情况
    	# valid_referers blocked 192.168.0.103;#检测Referer头域的值被防火墙或者代理服务器删除或伪装的情况，这种情况，该头域的值以http://或者https://开头
    	# valid_referers server_names 192.168.0.103;#折翼一个或多个URL，检测Referer头域的值是否是这些URL中的某一个
    	if ($invalid_referer){
    		retuen 403;
    	}
      root html;
      index index.html index.htm
    }
	  # 遇到错误 展示的页面
    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   html;
    }
}
```

### 使用curl测试防盗链

```bash
curl -I http://192.168.0.1
```

参数的说明：

- `-X`: 指定请求方法，如GET、POST、PUT等。
- `-H`: 添加请求头，如Content-Type、User-Agent等。
- `-d`: 添加请求体，通常用于POST请求，格式为key1=value1&key2=value2。
- `-F`: 上传文件，通常用于POST请求，格式为key1=@/path/to/file1&key2=@/path/to/file2。
- `-u`: 添加HTTP基本认证，格式为username:password。
- `-s`: 静默模式，不输出任何信息。
- `-o`: 将响应输出到文件，而不是标准输出。
- `-v`: 显示详细的调试信息，包括请求头、响应头、重定向等。
- `-L`: 自动跟随重定向。
- `-c`: 添加cookie，格式为name=value。
- `-b`: 添加cookie，从文件中读取cookie信息。
- `-k`: 允许不验证SSL证书。
- `-i`: 只显示响应头，不显示响应体。
- `--compressed`: 支持gzip压缩。

### 返回错误界面

在/usr/local/nginx/html文件夹下，创建一个新的错误页面，例如起名为401.html

在配置文件中：

```bash
server {
  # 端口号
    listen       80;
  # 域名或者主机名
    server_name  localhost;
	  # 域名URI（不是URL）  域名后面的那些内容
    location / {
      proxy_pass http://192.168.0.102:8080; 
    }
    location ~*/(js|img|css) {
    	# valid_referers 192.168.0.103;#来源的网址
    	# valid_referers none 192.168.0.103;#检测Referer头域不存在的情况
    	# valid_referers blocked 192.168.0.103;#检测Referer头域的值被防火墙或者代理服务器删除或伪装的情况，这种情况，该头域的值以http://或者https://开头
    	# valid_referers server_names 192.168.0.103;#折翼一个或多个URL，检测Referer头域的值是否是这些URL中的某一个
    	if ($invalid_referer){
    		retuen 401;
    	}
      root html;
      index index.html index.htm
    }
	  # 遇到错误 展示的页面
    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   html;
    }
    error_page   401  /401.html;
    location = /401.html {
        root   html;
    }
}
```

### 整合rewrite返回错误图片


```bash
server {
  # 端口号
    listen       80;
  # 域名或者主机名
    server_name  localhost;
	  # 域名URI（不是URL）  域名后面的那些内容
    location / {
      proxy_pass http://192.168.0.102:8080; 
    }
    location ~*/(js|img|css) {
    	# valid_referers 192.168.0.103;#来源的网址
    	# valid_referers none 192.168.0.103;#检测Referer头域不存在的情况
    	# valid_referers blocked 192.168.0.103;#检测Referer头域的值被防火墙或者代理服务器删除或伪装的情况，这种情况，该头域的值以http://或者https://开头
    	# valid_referers server_names 192.168.0.103;#折翼一个或多个URL，检测Referer头域的值是否是这些URL中的某一个
    	if ($invalid_referer){
    		rewrite ^/ /img/x.png break;
    	}
      root html;
      index index.html index.htm
    }
	  # 遇到错误 展示的页面
    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   html;
    }
    error_page   401  /401.html;
    location = /401.html {
        root   html;
    }
}
```

## 高可用场景及其解决方案

### KeepAlive

利用虚拟IP分配给相关的机器，而并不改变物理机的真实IP地址，因此不会发生IP地址冲突。

一个机器可以插多个网卡，一个网卡可以有多个IP

## HTTPS证书配置

### HTTP不安全

Socket的网络通信->TCP/IP->HTTP

一个HTTP数据请求包分为头header和体body。

公钥加密私钥可以解密，公钥加密公钥无法解密，私钥加密公钥可以解密。要保证私钥不在互联网中传递。

HTTPS使用对称加密和非对称加密两种加密方式。对称加密用于加密数据传输过程中的数据，以提高数据传输的速度，而非对称加密用于在通信双方建立安全连接时，对通信双方的身份进行验证和密钥协商。

HTTPS是一种基于HTTP协议的安全传输协议，主要通过加密和认证来保障数据传输的安全性。HTTPS使用了对称加密和非对称加密两种加密方式，下面具体介绍一下它们各自的作用：

1. 对称加密

对称加密使用相同的密钥对数据进行加密和解密，加密和解密的速度较快，因此在HTTPS中，对称加密被用来对数据进行加密，以提高数据传输的速度。但是，由于对称加密使用的是同一个密钥，密钥传输的过程容易受到中间人攻击，因此HTTPS中使用的对称加密方式一般会使用一种称为“会话密钥”的临时密钥，该密钥只在一次通信中使用，不会在多次通信中重复使用。

1. 非对称加密

非对称加密使用公钥和私钥两个密钥进行加密和解密。在HTTPS中，非对称加密主要用于在通信双方建立安全连接时，对通信双方的身份进行验证和密钥协商。具体来说，通信双方会交换自己的公钥，并使用对方的公钥对自己的身份信息进行加密，以确保自己的身份信息只能被对方解密。随后，通信双方会使用非对称加密的方式协商出一个会话密钥，该密钥将用于对数据进行加密和解密。

综上所述，HTTPS使用对称加密和非对称加密两种加密方式，它们各自的作用是对数据进行加密和解密，以及对通信双方的身份进行验证和密钥协商。这些加密方式的结合使得HTTPS在传输数据时更加安全和可靠。

### CA机构参与保证互联网安全

CA（Certificate Authority）机构是一种提供数字证书认证服务的机构，它可以对证书申请者进行身份验证，并为其颁发数字证书。数字证书是一种数字化的身份证明，它可以用于验证网站的身份，并保证网站传输的数据不被窃听或篡改。因此，CA机构参与可以在很大程度上保证互联网的安全性，具体包括以下几个方面：

1. 提供数字证书认证服务

CA机构可以对证书申请者进行身份验证，并为其颁发数字证书，数字证书包含了证书申请者的身份信息、公钥等关键信息，可以用于验证网站的身份和提供加密通信。通过这种方式，CA机构可以保证证书的真实性和有效性，从而确保网站的安全性。

2. 提高加密通信的安全性

HTTPS协议是一种基于SSL/TLS协议的安全传输协议，通过使用数字证书进行身份验证和加密通信，可以确保通信双方的数据传输过程中不被窃听、篡改或伪装。CA机构的数字证书是确保HTTPS协议安全的重要基础。

3. 防范钓鱼攻击

钓鱼攻击是一种通过伪造网站身份信息，欺骗用户输入个人信息、密码等敏感信息的攻击。通过使用数字证书，CA机构可以验证网站的身份，防范钓鱼攻击，保护用户的个人信息和财产安全。

总之，CA机构通过为证书申请者提供身份验证和数字证书认证服务，可以提高互联网通信的安全性，防范网络攻击，保护用户的信息安全。

### 自签名

自签名是指在没有CA（Certificate Authority）机构的情况下，使用自己的私钥对数字证书进行签名，用于证明数字证书的真实性。自签名的数字证书可以用于加密通信、身份验证等安全场景，但由于自签名证书没有得到第三方机构的认证和信任，因此使用时需要特别小心。

通常情况下，数字证书需要由第三方CA机构颁发并签名，这样才能保证证书的真实性和有效性，得到广泛的信任和应用。但在某些特殊情况下，比如在开发和测试环境中，为了方便和节省成本，可以使用自签名证书。

自签名证书可以使用工具生成，通常包括证书请求（CSR）、私钥、公钥等组成。在生成证书时，需要填写一些必要的信息，如证书的公用名称（Common Name）、组织单位名称、国家地区等。这些信息将被包含在数字证书中，并用于证明证书的真实性。

自签名是指在没有第三方CA机构的情况下，使用自己的私钥对数字证书进行签名，用于证明数字证书的真实性。虽然自签名证书可以用于一些特殊的应用场景，但在实际使用中需要特别小心，以避免安全风险。

自签名使用软件：OpenSSL，图形化工具XCA


from p49
