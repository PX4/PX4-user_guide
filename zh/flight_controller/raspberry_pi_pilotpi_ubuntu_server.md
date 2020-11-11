# PilotPi with Ubuntu Server

> **Warning** 在树莓派4B运行 Ubuntu Server 需要较大电流并产生大量热量。 在使用此硬件时考虑高功耗并设计更好的散热。

## 开发者快速指南

### 操作系统镜像

armhf 与 arm64 都具有支持。

#### armhf

- [Ubuntu Server 18.04.5 for RPi2](https://cdimage.ubuntu.com/releases/18.04.5/release/ubuntu-18.04.5-preinstalled-server-armhf+raspi2.img.xz)
- [Ubuntu Server 18.04.5 for RPi3](https://cdimage.ubuntu.com/releases/18.04.5/release/ubuntu-18.04.5-preinstalled-server-armhf+raspi3.img.xz.zsync)
- [Ubuntu Server 18.04.5 for RPi4](https://cdimage.ubuntu.com/releases/18.04.5/release/ubuntu-18.04.5-preinstalled-server-armhf+raspi4.img.xz)
- [Ubuntu Server 20.04.1 for RPi 2/3/4](https://cdimage.ubuntu.com/releases/20.04.1/release/ubuntu-20.04.1-preinstalled-server-armhf+raspi.img.xz)

#### arm64

- [Ubuntu Server 18.04.5 for RPi3](https://cdimage.ubuntu.com/releases/18.04.5/release/ubuntu-18.04.5-preinstalled-server-arm64+raspi3.img.xz)
- [Ubuntu Server 18.04.5 for RPi4](https://cdimage.ubuntu.com/releases/18.04.5/release/ubuntu-18.04.5-preinstalled-server-arm64+raspi4.img.xz)
- [Ubuntu Server 20.04.1 for RPi 3/4](https://cdimage.ubuntu.com/releases/20.04.1/release/ubuntu-20.04.1-preinstalled-server-arm64+raspi.img.xz)

#### 最新操作系统

请从官方 [cdimage](https://cdimage.ubuntu.com/releases/) 页面获取最新的操作系统更新。

### 首次启动

当首次设置树莓派的 WiFi 时，我们建议先使用有线网络连接你的路由器与树莓派，并使用显示器和键盘。

#### 启动前

把SD卡挂载到您的电脑上并修改网络设置。 请遵循官方 [指南](https://ubuntu.com/tutorials/how-to-install-ubuntu-on-your-raspberry-pi#3-wifi-or-ethernet)。

现在将 SD 卡插入您的 Pi 并首次开机。 请确认您可以获得树莓派的 shell —— 通过有线以太网连接 SSH ，或直接通过键盘和显示器。

#### WiFi区域

首先安装必需的软件包：

```sh
sudo apt-get install crda
```

编辑文件 `/etc/default/crda` 以设置正确的 WiFi 区域。 [参考列表](https://www.arubanetworks.com/techdocs/InstantWenger_Mobile/Advanced/Content/Instant%20User%20Guide%20-%20volumes/Country_Codes_List.htm)

```sh
sudo nano /etc/default/crda
```

之后您的 Pi 将能够在重启后加入您的 WiFi 网络。

#### 主机名和 mDNS

让我们先设置主机名。

```sh
sudo nano /etc/hostname
```

按需更改主机名。 然后安装 mDNS 所需的软件包：

```sh
sudo apt-get update
sudo apt-get install avahi-daemon
```

执行重启。

```sh
sudo reboot
```

在上述操作后通过无线网络重新连回树莓派。

```sh
ssh ubuntu@pi_hostname.local
```

#### 无密码认证(可选)

您也可能想要设置 [无密码认证](https://www.raspberrypi.org/documentation/remote-access/ssh/passwordless.md)。

### 配置操作系统

#### config.txt

在 Ubuntu 中的相应文件是 `/boot/firmware/usercfg.txt`。

```sh
sudo nano /boot/firmware/usercfg.txt
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

Ubuntu Server 20.04：

```sh
sudo nano /boot/firmware/cmdline.txt
```

在Ubuntu Server 18.04 或更早版本，`nobtcmd.txt` 和 `btcmd.txt` 都需要修改。

```sh
sudo nano /boot/firmware/nobtcmd.txt
```

找到 `console=/dev/ttyAMA0,115200` 并删除该部分以禁用串口上的登录shell。

在最后添加 `isolcpus=2` 然后整个文件将看起来像：

```sh
net.ifnames=0 dwc_otg.lpm_enable=0 console=tty1 root=LABEL=writable rootfstype=ext4 elevator=deadline rootwait fixrtc isolcpus=2
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

检查SPI：:

```sh
ls /dev/spidev*
```

应该有 `/dev/spidev0.0`。

#### rc.local

在本节中，我们将在 **rc.local** 中配置自动启动脚本。 请注意，我们需要创建此文件，因为它不存在于新的 Ubuntu OS 上。

```sh
sudo nano /etc/rc.local
```

将下面的内容写入到文件：

```sh
#!/bin/sh

echo "25" > /sys/class/gpio/export
echo "in" > /sys/class/gpio/gpio25/direction
if [ $(cat /sys/class/gpio/gpio25/value) -eq 1 ] ; then
        echo "Launching PX4"
        cd /home/ubuntu/px4 ; nohup taskset -c 2 ./bin/px4 -d -s pilotpi_mc.config 2 &> 1 > /home/ubuntu/px4/px4.log &
fi
echo "25" > /sys/class/gpio/unexport

exit 0
```

保存并退出。 然后设置正确的权限：

```sh
sudo chmod +x /etc/rc.local
```

> **Note** 在不需要自启动的时候关闭开关。

#### CSI 相机

> **Warning** 启用 CSI 摄像头将停止在 I2C-0 上工作的任何设备。

```sh
sudo nano /boot/firmware/usercfg.txt
```

在文件末尾追加以下行：

```sh
start_x=1
```

### 构建代码

若要在您的计算机上获得*最新的*版本，请在终端中输入以下命令：

```sh
git clone https://github.com/PX4/PX4-Autopilot.git --recursive
```

> **Note** 你只需要执行它就能够得到最新的代码。

#### 配置上传

设定您的树莓派的 IP (或主机名)：

```sh
export AUTOPILOT_HOST=192.168.X.X
```

或

```sh
export AUTOPILOT_HOST=pi_hostname.local
```

此外，我们需要设置用户名：

```sh
export AUTOPILOT_USER=ubuntu
```

#### 为armhf交叉编译

构建可执行程序：

```sh
cd Firmware
make scumaker_pilotpi_default
```

然后上传：

```sh
make scumaker_pilotpi_default upload
```

#### 备选armhf构建方法 (使用 docker)

如果您是首次使用 Docker 进行编译，请参考[官方说明](https://dev.px4.io/master/en/test_and_ci/docker.html#prerequisites)。

在 PX4-Autopilot 文件夹下执行：

```sh
./Tools/docker_run.sh "export AUTOPILOT_HOST=192.168.X.X; export AUTOPILOT_USER=ubuntu; export NO_NINJA_BUILD=1; make scumaker_pilotpi_default upload"
```
> **Note** Docker 暂不支持 mDNS。 每次上传时，您必须指定正确的IP地址。

<span></span>
> **Note** 如果你的 IDE 不支持 ninja 构建，可以设置`NO_NINJA_BUILD=1`变量。 您也可以编译而不上传。 只需要删除 `upload` 字段。

只是为了编译代码，则可以执行：

```sh
./Tools/docker_run.sh "make scumaker_pilotpi_default"
```

#### 为arm64交叉编译

> **注意** 此步骤需要安装 `aarch64-linux-gnu` 工具链。

构建可执行程序：

```sh
cd PX4-Autopilot
make scumaker_pilotpi_arm64
```

然后上传：

```sh
make scumaker_pilotpi_arm64 upload
```

#### 备选arm64构建方法 (使用 docker)

如果您是首次使用 Docker 进行编译，请参考[官方说明](https://dev.px4.io/master/en/test_and_ci/docker.html#prerequisites)。

在 PX4-Autopilot 文件夹下执行：

```sh
./Tools/docker_run.sh "export AUTOPILOT_HOST=192.168.X.X; export AUTOPILOT_USER=ubuntu; export NO_NINJA_BUILD=1; make scumaker_pilotpi_arm64 upload"
```
> **Note** Docker 暂不支持 mDNS。 每次上传时，您必须指定正确的IP地址。

<span></span>
> **Note** 如果你的 IDE 不支持 ninja 构建，可以设置`NO_NINJA_BUILD=1`变量。 您可以只编译而无需上传 - 只需删除 `upload` 字段。

只是为了编译代码，则可以执行：

```sh
./Tools/docker_run.sh "make scumaker_pilotpi_arm64"
```

#### 手动运行 PX4

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
rm -rf build/scumaker_pilotpi_*
```

然后回到上面相应的章节。

### 后期配置

请参阅 [这里的说明](raspberry_pi_pilotpi_rpios.md)
