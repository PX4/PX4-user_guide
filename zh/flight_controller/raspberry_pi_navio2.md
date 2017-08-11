---
translated_page: https://github.com/PX4/Devguide/blob/master/en/flight_controller/raspberry_pi.md
translated_sha: f3cb054e3c12e775bcd69e4c826ef70b18307bb5
---


# 树莓派2/3 Navio2自动驾驶仪

![](../../assets/hardware/hardware-rpi2.jpg)

## 开发者快速开始使用

### OS Image系统镜像

  使用[Emlid RT Raspbian image](http://docs.emlid.com/navio/Downloads/Real-time-Linux-RPi2/)这个前期配置好的有效的PX4树莓派镜像。这个镜像默认最大化的事先配置了程序。

> **Important**: 确保不要升级系统 （更确切的说是内核）。 升级后，一个缺少必要硬件支持的新内核将被安装。(你可以通过 `ls /sys/class/pwm`命令查看，这个目录不应当是空的)。

### 访问设置
此树莓派镜像已经事先设置好了SSH。用户名：pi 和密码：raspberry。你可以直接通过网络去连接你的树莓派2（以太网已经启动并且默认自动分配IP）和可以配置使用wifi。在这篇文档中，我们采取默认的用户名和密码登入树莓派系统。

设置你的树莓派加入你的本地wifi网络（使你的树莓派连接你的wifi），关于如何设置请参考这篇
 [指导文章](https://www.raspberrypi.org/documentation/configuration/wireless/wireless-cli.md)。找到树莓派在你网络中的IP地址，随后你可以开始通过SSH的方式连接Pi2。

<div class="host-code"></div>

```sh
ssh pi@<IP-ADDRESS>
```

### 扩展文件系统

安装好操作系统并连接上它后，确保进行 [扩展文件系统](https://www.raspberrypi.org/documentation/configuration/raspi-config.md)，来获得足够的SD卡可用空间。


### 禁用Navio RGB Overlay

The existing Navio RGB overlay claims GPIOs used by PX4 for RGB Led. Edit /boot/config.txt by commenting the line enabling the navio-rgb overlay.

现有的Navio RGB overlay声明了PX4用于RGB Led的GPIO。编辑` /boot/config.txt `并注释掉下列行已启用navio-rgb overlay。

```shell
#dtoverlay=navio-rgb
```


### 改变树莓派主机名
为了避免与同一网络上的其他树莓派有冲突，我们建议你改变默认主机名为明显的名字。我们使用px4autopilot作为我们的主机名。通过ssh连接pi并执行指令。

编辑主机名文件:

```sh
sudo nano /etc/hostname
```

更改主机名 ```raspberry```为你想要的任何主机名  (一个word字的有限字符)

下一步更改主机host文件:

```sh
sudo nano /etc/hosts
```

更改入口 ```127.0.1.1 raspberry``` 为 ```127.0.1.1 <YOURNEWHOSTNAME>```
做完这步重启电脑成功后允许他重新关联你的网络。

### 配置 Avahi (Zeroconf)
为了使你更容易的连接上你的树莓派，我们推荐设置Avahi（Zeroconf：零配置网络服务规范）来更简单的使用连接网络。
使连接到树莓派更容易，我们建议设立的avahi（zeroconf）允许方便地访问任何网络PI直接指定主机名。

```sh
sudo apt-get install avahi-daemon
sudo insserv avahi-daemon
```

接下来，设置Avahi配置文件

```sh
sudo nano /etc/avahi/services/multiple.service
```

把下面文字加入文件中：

```xml
<?xml version="1.0" standalone='no'?>
<!DOCTYPE service-group SYSTEM "avahi-service.dtd">
<service-group>
        <name replace-wildcards="yes">%h</name>
        <service>
                <type>_device-info._tcp</type>
                <port>0</port>
                <txt-record>model=RackMac</txt-record>
        </service>
        <service>
                <type>_ssh._tcp</type>
                <port>22</port>
        </service>
</service-group>
```

重新启动后台进程


```sh
sudo /etc/init.d/avahi-daemon restart
```

到此就结束了。你应该可以在同一网络上的任意一台电脑上通过树莓派的主机名访问你的树莓派。 

<aside class="tip">
为了能够通过主机名访问你的Pi，可能需要添加 .local 到主机名。
</aside>

### 配置SSH公钥

为了允许PX4开发环境自动的更新可执行文件到你的开发板子上，你需要配置无密码访问RPi。我们使用公钥的验证方法。

输入下面的命令来创建新的SSH密钥 (使用合理的主机名如 ```<YOURNANME>@<YOURDEVICE>```.  在这我们使用 ```pi@px4autopilot```)

这些命令需要运行在主机开发电脑上！


<div class="host-code"></div>

```sh
ssh-keygen -t rsa -C pi@px4autopilot
```

执行上面这条命令，将会询问你这个密钥存在哪个位置。我们建议你直接回车让它存储在默认位置($HOME/.ssh/id_rsa)。


现在你可以看到这些文件 ```id_rsa``` 和 ```id_rsa.pub``` 在你的 电脑主目录文件夹下的```.ssh``` 文件夹里:

<div class="host-code"></div>

```sh
ls ~/.ssh
authorized_keys  id_rsa  id_rsa.pub  known_hosts
```

这 ```id_rsa``` 文件是你的私人密钥. 让它保存在开发主机电脑上.
这 ```id_rsa.pub``` 文件是你的公共密钥. 这个文件应当被放在你想要连接到的设备上。

把你的公共密钥复制到你的树莓派上，使用下面的命令来将你的公共密钥添加到树莓派上的密钥授权文件里。通过SSH上传：

<div class="host-code"></div>

```sh
cat ~/.ssh/id_rsa.pub | ssh pi@px4autopilot 'cat >> .ssh/authorized_keys'
```

注意：这一次你将通过密码的方式进行身份验证(默认是"raspberry").

现在尝试使用 ```ssh pi@px4autopilot``` 连接时没有密码提示.

如果你看到这条信息"```Agent admitted failure to sign using the key.```" 然后加入你的RSA或者DSA认证身份到你的 ssh-agent（密钥管理器），并执行下面的命令：

<div class="host-code"></div>

```sh
ssh-add
```

如果它不工作, 使用 ```rm ~/.ssh/id*```这条命令删除你的密钥，然后按照上面的操作重新再做一遍。

### 测试文件传输

我们使用SCP命令通过网络（wifi或者以太网）从开发主机传输文件到目标板。

为了测试你的设置, 现在尝试通过网络从开发主机上推送到树莓派上。确保你的树莓派能正确访问网络，并且你可以使用ssh访问它。

<div class="host-code"></div>

```sh
echo "Hello" > hello.txt
scp hello.txt pi@px4autopilot:/home/pi/
rm hello.txt
```

这将拷贝一个"hello.txt"文件到你树莓派的用户目录下（/home/pi）。
确认这个文件是真的拷贝进去了，你就可以执行下一步了。

### 本地构建 (可选)

如果你希望，可以直接在树莓派上构建PX4。这是本地构建版本。另一种选择是在一台开发用电脑上交叉编译，再推送PX4可执行文件到树莓派上。这是交叉编译构建版本，因为可以快速应用并简单实用，推荐开发者们选择。

交叉编译配置时，可以跳过此步。

下面的步骤会配置PX4所必需的编译系统。在树莓派上执行这些命令！

```sh
sudo apt-get update
sudo apt-get install cmake python-empy
```

之后将Firmware直接克隆到树莓派上。

### 开始构建

继续我们的 [Linux开发环境](../setup/dev_env_linux.md).
