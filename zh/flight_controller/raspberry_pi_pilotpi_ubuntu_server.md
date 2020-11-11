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

Regain the accessibility through WiFi connection after the above operation.

```sh
ssh ubuntu@pi_hostname.local
```

#### Password-less Auth (Optional)

You may want to setup [passwordless auth](https://www.raspberrypi.org/documentation/remote-access/ssh/passwordless.md) as well.

### Setting up OS

#### config.txt

The corresponding file in Ubuntu is `/boot/firmware/usercfg.txt`.

```sh
sudo nano /boot/firmware/usercfg.txt
```

Replace the file with:

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

On Ubuntu Server 20.04:

```sh
sudo nano /boot/firmware/cmdline.txt
```

On Ubuntu Server 18.04 or earlier, `nobtcmd.txt` and `btcmd.txt` should both be modified.

```sh
sudo nano /boot/firmware/nobtcmd.txt
```

Find `console=/dev/ttyAMA0,115200` and remove that part to disable the login shell on serial interface.

Append `isolcpus=2` after the last word. The whole file will then look like:

```sh
net.ifnames=0 dwc_otg.lpm_enable=0 console=tty1 root=LABEL=writable rootfstype=ext4 elevator=deadline rootwait fixrtc isolcpus=2
```

The above line tells the Linux kernel do not schedule any process on CPU core 2. We will manually run PX4 onto that core later.

Reboot and SSH onto your Pi.

Check UART interface:

```sh
ls /dev/tty*
```

There should be `/dev/ttyAMA0`, `/dev/ttySC0` and `/dev/ttySC1`.

Check I2C interface:

```sh
ls /dev/i2c*
```

There should be `/dev/i2c-0` and `/dev/i2c-1`

Check SPI interface:

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

> **Note** Don' t forget to turn off the switch when it is not needed!

#### CSI camera

> **Warning** Enable CSI camera will stop anything works on I2C-0.

```sh
sudo nano /boot/firmware/usercfg.txt
```

Append the following line at the end of file:

```sh
start_x=1
```

### Building the code

To get the *very latest* version onto your computer, enter the following command into a terminal:

```sh
git clone https://github.com/PX4/PX4-Autopilot.git --recursive
```

> **Note** This is all you need to do just to build the latest code.

#### Set RPi upload target

Set the IP (or hostname) of your RPi using:

```sh
export AUTOPILOT_HOST=192.168.X.X
```

or

```sh
export AUTOPILOT_HOST=pi_hostname.local
```

Additionally, we need to set the username:

```sh
export AUTOPILOT_USER=ubuntu
```

#### Build for armhf target

Build the executable file:

```sh
cd Firmware
make scumaker_pilotpi_default
```

Then upload it with:

```sh
make scumaker_pilotpi_default upload
```

#### Alternative build method for armhf (using docker)

If you are compiling for the first time with docker, please refer to the [offical docs](https://dev.px4.io/master/en/test_and_ci/docker.html#prerequisites).

Execute the command in firmware folder:

```sh
./Tools/docker_run.sh "export AUTOPILOT_HOST=192.168.X.X; export AUTOPILOT_USER=ubuntu; export NO_NINJA_BUILD=1; make scumaker_pilotpi_default upload"
```
> **Note** mDNS is not supported within docker. You must specify the correct IP address every time when uploading.

<span></span>
> **Note** If your IDE doesn't support ninja build, `NO_NINJA_BUILD=1` option will help. You can compile without uploading too. Just remove `upload` target.

It is also possible to just compile the code with command:

```sh
./Tools/docker_run.sh "make scumaker_pilotpi_default"
```

#### Build for arm64 target

> **Note** This step requires `aarch64-linux-gnu` tool-chain to be installed.

Build the executable file:

```sh
cd PX4-Autopilot
make scumaker_pilotpi_arm64
```

Then upload it with:

```sh
make scumaker_pilotpi_arm64 upload
```

#### Alternative build method for arm64 (using docker)

If you are compiling for the first time with docker, please refer to the [offical docs](https://dev.px4.io/master/en/test_and_ci/docker.html#prerequisites).

Execute the command in `PX4-Autopilot` folder:

```sh
./Tools/docker_run.sh "export AUTOPILOT_HOST=192.168.X.X; export AUTOPILOT_USER=ubuntu; export NO_NINJA_BUILD=1; make scumaker_pilotpi_arm64 upload"
```
> **Note** mDNS is not supported within docker. You must specify the correct IP address everytime when uploading.

<span></span>
> **Note** If your IDE doesn't support ninja build, `NO_NINJA_BUILD=1` option will help. You can compile without uploading too - just remove the `upload` target.

It is also possible to just compile the code with command:

```sh
./Tools/docker_run.sh "make scumaker_pilotpi_arm64"
```

#### Manually run PX4

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

### Post-configuration

Please refer to the instructions [here](raspberry_pi_pilotpi_rpios.md)
