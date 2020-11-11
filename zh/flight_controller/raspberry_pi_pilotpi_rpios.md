# 在Raspberry Pi OS上使用PilotPi

## 开发者快速指南

### 操作系统镜像

总是推荐最新官方的 [Raspberry Pi OS Lite](https://downloads.raspberrypi.org/raspios_lite_armhf_latest) 镜像。

默认你已经通过ssh连接到了树莓派。

### 设置快速访问(可选)

#### 主机名和多播DNS

mDNS 帮助您使用主机名替代IP地址连接到您的树莓派。

```sh
sudo raspi-config
```

导航到 **Network Options > Hostname**。 设置并退出。 您也可能想要设置 [无密码认证](https://www.raspberrypi.org/documentation/remote-access/ssh/passwordless.md)。

### 配置操作系统

#### config.txt

```sh
sudo nano /boot/config.txt
```

将文件内容替换为：

```sh
# enable sc16is752 overlay
dtoverlay=sc16is752-spi1
# enable I2C-1 and set the frequency to 400KHz
dtparam=i2c_arm=on,i2c_arm_baudrate=400000
# enable spidev0.0
dtparam=spi=on
# enable RC input
enable_uart=1
# enable I2C-0
dtparam=i2c_vc=on
# switch Bluetooth to miniuart
dtoverlay=miniuart-bt
```

#### cmdline.txt

```sh
sudo raspi-config
```

**Interfacing Options > Serial > login shell = No > hardware = Yes**. 启用 UART 但禁用登陆shell。

```sh
sudo nano /boot/cmdline.txt
```

在最后添加 `isolcpus=2` 整个文件将是：

```sh
console=tty1 root=PARTUUID=xxxxxxxx-xx rootfstype=ext4 elevator=deadline fsck.repair=yes rootwait isolcpus=2
```

这告诉Linux内核不要在 CPU 核心2 上调度任何进程。 我们将在稍后手动在该核心运行PX4。

重启并SSH登陆到您的树莓派。

检查串口：

```sh
ls /dev/tty*
```

应该有 `/dev/ttyAMA0`, `/dev/ttySC0` 和 `/dev/ttySC1`。

检查 I2C：

```sh
ls /dev/i2c*
```

应该有 `/dev/i2c-0` 和 `/dev/i2c-1`

检查SPI：

```sh
ls /dev/spidev*
```

应该有 `/dev/spidev0.0`。

#### rc.local

在本节中，我们将在 **rc.local** 中配置自动启动脚本。

```sh
sudo nano /etc/rc.local
```

把下面内容添加到文件中，且放在 `exit 0` 之上：

```sh
echo "25" > /sys/class/gpio/export
echo "in" > /sys/class/gpio/gpio25/direction
if [ $(cat /sys/class/gpio/gpio25/value) -eq 1 ] ; then
        echo "Launching PX4"
        cd /home/pi/px4 ; nohup taskset -c 2 ./bin/px4 -d -s pilotpi_mc.config 2 &> 1 > /home/pi/px4/px4.log &
fi
echo "25" > /sys/class/gpio/unexport
```

保存并退出。

> **Note** 在不需要自启动的时候关闭开关。

#### CSI 相机

> **Warning** 启用 CSI 摄像头将停止在 I2C-0 上工作的任何设备。

```sh
sudo raspi-config
```

**Interfacing Options > Camera**

### 构建代码

若要在您的计算机上获得*最新的*版本，请在终端中输入以下命令：

```sh
git clone https://github.com/PX4/PX4-Autopilot.git --recursive
```

> **Note** 你只需要执行它就能够得到最新的代码。

#### 为 Raspberry Pi OS 交叉编译

设定您的树莓派的 IP (或主机名)：

```sh
export AUTOPILOT_HOST=192.168.X.X
```

或

```sh
export AUTOPILOT_HOST=pi_hostname.local
```

构建可执行程序：

```sh
cd PX4-Autopilot
make scumaker_pilotpi_default
```

然后上传：

```sh
make scumaker_pilotpi_default upload
```

通过 ssh 连接并运行它：

```sh
cd px4
sudo taskset -c 2 ./bin/px4 -s pilotpi_mc.config
```

PX4 已配置使用多旋翼模型启动。

如果在树莓派上运行PX4时遇到了以下问题：

```
bin/px4: /lib/xxxx/xxxx: version `GLIBC_2.29' not found (required by bin/px4)
```

这时应当使用基于 Docker 的编译。

在执行下一步之前，先清除现有构建目录：

```sh
rm -rf build/scumaker_pilotpi_default
```

### 备选构建方法 (使用 docker)

以下方法可以获得与CI相同的编译工具与环境。

如果您是首次使用 Docker 进行编译，请参考[官方说明](https://dev.px4.io/master/en/test_and_ci/docker.html#prerequisites)。

在 PX4-Autopilot 文件夹下执行：

```sh
./Tools/docker_run.sh "export AUTOPILOT_HOST=192.168.X.X; export NO_NINJA_BUILD=1; make scumaker_pilotpi_default upload"
```
> **Note** Docker 暂不支持 mDNS。 每次上传时，您必须指定正确的IP地址。

<span></span>

> **Note** 如果你的 IDE 不支持 ninja 构建，可以设置`NO_NINJA_BUILD=1`变量。 您也可以编译而不上传。 只需要删除 `upload` 字段。

只是为了编译代码，则可以执行：

```sh
./Tools/docker_run.sh "make scumaker_pilotpi_default"
```

### 后期配置

您需要检查这些额外项目才能使您机体正常工作。

#### 混控器文件

混控器在 `pilotpi_xx.conf` 文件中启用：

```sh
mixer load /dev/pwm_output0 etc/mixers/quad_x.main.mix
```

所有可用的混控配置都存储在 `etc/mixers` 中。 您也可以自己创建一个。

#### 外部罗盘

在启动脚本中(`*.conf`), 你会找到

```sh
# external GPS & compass
gps start -d /dev/ttySC0 -i uart -p ubx -s
#hmc5883 start -X
#ist8310 start -X
```

按需去掉对应的注释。 不确定您的 GPS 模块附带哪一款罗盘？ 执行以下命令并查看输出：

```sh
sudo apt-get update
sudo apt-get install i2c-tools
i2cdetect -y 0
```

示例输出

```
     0  1  2  3  4  5  6  7  8  9  a  b  c  d  e  f
00:          -- -- -- -- -- -- -- -- -- -- -- 0e -- 
10: -- -- -- -- -- -- -- -- -- -- -- -- -- -- 1e -- 
20: -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- 
30: -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- 
40: -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- 
50: -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- 
60: -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- 
70: -- -- -- -- -- -- -- --
```

`1e` 表示基于 HMC5883 的罗盘接在外部I2C总线上。 相似的，IST8310的值为 `0e`。

> **Note** 通常你只拥有其中一个。 其他连接到外部 I2C 总线(`/dev/i2c-0` ) 的设备也会显示在此处。
