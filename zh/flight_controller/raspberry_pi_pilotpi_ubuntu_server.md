---
canonicalUrl: https://docs.px4.io/main/zh/flight_controller/raspberry_pi_pilotpi_ubuntu_server
---

# PilotPi 使用 Ubuntu Server 操作系统

:::warning
Ubuntu Server on RPi 4B consumes a lot of current and generates a lot of heat.
Design for better heat dissipation and high power consumption when using this hardware.
:::

## 开发者快速指南

### 操作系统镜像

请从官方 [cdimage](https://cdimage.ubuntu.com/releases/) 页面获取最新更新的操作系统。

#### armhf

- [Ubuntu Server 18.04.5 for RPi2](https://cdimage.ubuntu.com/releases/18.04.5/release/ubuntu-18.04.5-preinstalled-server-armhf+raspi2.img.xz)
- [Ubuntu Server 18.04.5 for RPi3](https://cdimage.ubuntu.com/releases/18.04.5/release/ubuntu-18.04.5-preinstalled-server-armhf+raspi3.img.xz)
- [Ubuntu Server 18.04.5 for RPi4](https://cdimage.ubuntu.com/releases/18.04.5/release/ubuntu-18.04.5-preinstalled-server-armhf+raspi4.img.xz)
- [Ubuntu Server 20.04.1 for RPi 2/3/4](https://cdimage.ubuntu.com/releases/20.04.1/release/ubuntu-20.04.1-preinstalled-server-armhf+raspi.img.xz)

#### arm64

- [Ubuntu Server 18.04.5 for RPi3](https://cdimage.ubuntu.com/releases/18.04.5/release/ubuntu-18.04.5-preinstalled-server-arm64+raspi3.img.xz)
- [Ubuntu Server 18.04.5 for RPi4](https://cdimage.ubuntu.com/releases/18.04.5/release/ubuntu-18.04.5-preinstalled-server-arm64+raspi4.img.xz)
- [Ubuntu Server 20.04.1 for RPi 3/4](https://cdimage.ubuntu.com/releases/20.04.1/release/ubuntu-20.04.1-preinstalled-server-arm64+raspi.img.xz)

#### 最新操作系统

当首次设置树莓派的 WiFi 时，我们建议先使用有线网络连接你的路由器与树莓派，并使用显示器和键盘。

### 首次启动

When setting up RaPi's WiFi for the first time we recommended using a wired Ethernet connection between your home router and RPi, and a monitor and keyboard.

#### 启动前

现在将 SD 卡插入您的 Pi 并首次开机。 请确认您可以获得树莓派的 shell —— 通过有线以太网连接 SSH ，或直接通过键盘和显示器。

Now plug the SD card onto your Pi and boot for the first time. Make sure you have shell access to the RPi - either SSH connection over wired Ethernet, or direct accessing with keyboard and monitor.

#### WiFi 区域

First install required package:

```sh
sudo apt-get install crda
```

Edit the file `/etc/default/crda` to change the correct WiFi region. [Reference List](https://www.arubanetworks.com/techdocs/InstantWenger_Mobile/Advanced/Content/Instant%20User%20Guide%20-%20volumes/Country_Codes_List.htm)

```sh
sudo nano /etc/default/crda
```

让我们先设置主机名。

#### 主机名和 mDNS

Let's set up hostname at first.

```sh
sudo nano /etc/hostname
```

Change the hostname to whatever you like. Then install the package required by mDNS:

```sh
sudo apt-get update
sudo apt-get install avahi-daemon
```

在上述操作后通过无线网络重新连回树莓派。

```sh
sudo reboot
```

您也可能想要设置 [无密码认证](https://www.raspberrypi.org/documentation/remote-access/ssh/passwordless.md)。

```sh
ssh ubuntu@pi_hostname.local
```

#### 无密码认证(可选)

在 Ubuntu 中的相应文件是 `/boot/firmware/usercfg.txt`。

### 配置操作系统

#### config.txt

将文件内容替换为：

```sh
sudo nano /boot/firmware/usercfg.txt
```

Ubuntu Server 20.04：

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

在Ubuntu Server 18.04 或更早版本，`nobtcmd.txt` 和 `btcmd.txt` 都需要修改。

```sh
sudo nano /boot/firmware/cmdline.txt
```

找到 `console=/dev/ttyAMA0,115200` 并删除该部分以禁用串口上的登录shell。

```sh
sudo nano /boot/firmware/nobtcmd.txt
```

Find `console=/dev/ttyAMA0,115200` and remove that part to disable the login shell on serial interface.

这告诉Linux内核不要在 CPU 核心2 上调度任何进程。 我们将在稍后手动在该核心运行PX4。

```sh
net.ifnames=0 dwc_otg.lpm_enable=0 console=tty1 root=LABEL=writable rootfstype=ext4 elevator=deadline rootwait fixrtc isolcpus=2
```

The above line tells the Linux kernel do not schedule any process on CPU core 2. We will manually run PX4 onto that core later.

检查串口：

应该有 `/dev/ttyAMA0`, `/dev/ttySC0` 和 `/dev/ttySC1`。

```sh
ls /dev/tty*
```

检查 I2C：

应该有 `/dev/i2c-0` 和 `/dev/i2c-1`

```sh
ls /dev/i2c*
```

检查SPI：:

应该有 `/dev/spidev0.0`。

```sh
ls /dev/spidev*
```

There should be `/dev/spidev0.0`.

#### rc.local

In this section we will configure the auto-start script in **rc.local**. Note that we need to create this file, as it is not present on a fresh Ubuntu OS.

```sh
sudo nano /etc/rc.local
```

Append the content below to the file:

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

Save and exit. Then set the correct permissions:

```sh
sudo chmod +x /etc/rc.local
```

:::note
Don't forget to turn off the switch when it is not needed!
:::

#### CSI 相机

:::warning
Enable CSI camera will stop anything works on I2C-0.
:::

```sh
sudo nano /boot/firmware/usercfg.txt
```

或

```sh
start_x=1
```

### 构建代码

To get the _very latest_ version onto your computer, enter the following command into a terminal:

```sh
git clone https://github.com/PX4/PX4-Autopilot.git --recursive
```

:::note
This is all you need to do just to build the latest code.
:::

#### 配置上传

然后上传：

```sh
export AUTOPILOT_HOST=192.168.X.X
```

如果您是首次使用 Docker 进行编译，请参考[官方说明](https://dev.px4.io/master/en/test_and_ci/docker.html#prerequisites)。

```sh
export AUTOPILOT_HOST=pi_hostname.local
```

在 PX4-Autopilot 文件夹下执行：

```sh
export AUTOPILOT_USER=ubuntu
```

#### 为 armhf 目标交叉编译

只是为了编译代码，则可以执行：

```sh
cd Firmware
make scumaker_pilotpi_default
```

构建可执行程序：

```sh
make scumaker_pilotpi_default upload
```

#### 备选armhf构建方法 (使用 docker)

If you are compiling for the first time with docker, please refer to the [official docs](../test_and_ci/docker.md#prerequisites).

如果您是首次使用 Docker 进行编译，请参考[官方说明](https://dev.px4.io/master/en/test_and_ci/docker.html#prerequisites)。

```sh
./Tools/docker_run.sh "export AUTOPILOT_HOST=192.168.X.X; export AUTOPILOT_USER=ubuntu; export NO_NINJA_BUILD=1; make scumaker_pilotpi_default upload"
```

:::note
mDNS is not supported within docker. You must specify the correct IP address every time when uploading.
:::

:::note
If your IDE doesn't support ninja build, `NO_NINJA_BUILD=1` option will help. You can compile without uploading too. Just remove `upload` target.
:::

通过 ssh 连接并运行它：

```sh
./Tools/docker_run.sh "make scumaker_pilotpi_default"
```

#### 为arm64交叉编译

:::note
This step requires `aarch64-linux-gnu` tool-chain to be installed.
:::

如果在树莓派上运行PX4时遇到了以下问题：

```sh
cd PX4-Autopilot
make scumaker_pilotpi_arm64
```

这时应当使用基于 Docker 的编译。

```sh
make scumaker_pilotpi_arm64 upload
```

#### 备选 arm64 构建方法 (使用 docker)

If you are compiling for the first time with docker, please refer to the [official docs](../test_and_ci/docker.md#prerequisites).

然后回到上面相应的章节。

```sh
./Tools/docker_run.sh "export AUTOPILOT_HOST=192.168.X.X; export AUTOPILOT_USER=ubuntu; export NO_NINJA_BUILD=1; make scumaker_pilotpi_arm64 upload"
```

:::note
mDNS is not supported within docker. You must specify the correct IP address every time when uploading.
:::

:::note
If your IDE doesn't support ninja build, `NO_NINJA_BUILD=1` option will help. You can compile without uploading too - just remove the `upload` target.
:::

It is also possible to just compile the code with command:

```sh
./Tools/docker_run.sh "make scumaker_pilotpi_arm64"
```

#### 手动运行 PX4

Connect over SSH and run it with:

```sh
cd px4
sudo taskset -c 2 ./bin/px4 -s pilotpi_mc.config
```

Now PX4 is started with multi-rotor configuration.

If you encountered the similar problem executing `bin/px4` on your Pi as following:

```
bin/px4: /lib/xxxx/xxxx: version `GLIBC_2.29' not found (required by bin/px4)
```

Then you should compile with docker instead.

Before proceeding to next step, clear the existing building at first:

```sh
rm -rf build/scumaker_pilotpi_*
```

Then go back to the corresponding chapter above.

### 后期配置

Please refer to the instructions [here](raspberry_pi_pilotpi_rpios.md)
