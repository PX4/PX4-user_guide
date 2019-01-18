# BeagleBone Blue

[BeagleBone Blue](https://beagleboard.org/blue) 是一台基于 Linux 的一体机。 它针对机器人技术进行了优化，这种紧凑且便宜的电路板具有飞行控制器所需的所有必要传感器和外围设备。 本主题说明如何设置电路板以使用 [librobotcontrol](https://github.com/StrawsonDesign/librobotcontrol) 机器人软件包运行 PX4。

![BeagleBone - labelled diagram](../../assets/hardware/BeagleBone_Blue_balloons.png)

## 操作系统映像

可以在这里找到 *BeagleBone Blue* 图像：

- [最新的稳定 OS 映像](https://beagleboard.org/latest-images)。
- [测试 OS 映像](https://rcn-ee.net/rootfs/bb.org/testing/)（经常更新）。

有关闪存操作系统映像的信息可以在 [this page](https://github.com/beagleboard/beaglebone-blue/wiki/Flashing-firmware) 上找到。 其他有用的信息可以在 [FAQ](https://github.com/beagleboard/beaglebone-blue/wiki/Frequently-Asked-Questions-&lpar;FAQ&rpar;) 中找到。

## 机器人控制库文件

在 [BeagleBone Blue](https://beagleboard.org/blue) 上，PX4 需要 [librobotcontrol](https://github.com/StrawsonDesign/librobotcontrol) 版本 1.0.0 或更高版本。

BeagleBoard 操作系统映像预装了 *librobotcontrol*，但在所有操作系统映像中可能无法正常工作。

检查 *librobotcontrol* 是否正常工作的一种方法是运行 *librobotcontrol* 附带的 *rc_test_drivers*。 如以下示例所示，所有测试都应通过。 可选择运行其他测试，例如 *rc_test_bmp*，*rc_test_mpu* 等。

```sh
debian@beaglebone:~$ rc_test_drivers

Kernel: 4.14.56-ti-rt-r64
BeagleBoard.org Debian Image 2018-07-22
Debian: 9.5

PASSED: gpio 0
PASSED: gpio 1
PASSED: gpio 2
PASSED: gpio 3
PASSED: pwm1
PASSED: pwm2
PASSED: eqep0
PASSED: eqep1
PASSED: eqep2
PASSED: pru-rproc
PASSED: uart1
PASSED: uart2
PASSED: uart4
PASSED: uart5
PASSED: i2c1
PASSED: i2c2
PASSED: spi
PASSED: LED
PASSED: ADC iio

Currently running on a:
MODEL_BB_BLUE
Robot Control library Version:
1.0.0
```

> **Tip**您可以选择更新到实时内核，如果这样做，请重新检查 *librobotcontrol* 是否与实时内核一起正常工作。

*librobotcontrol* 正常工作（编写时）的最新操作系统映像是 [bone-debian-9.5-iot-armhf-2018-07-22-4gb.img.xz](https://rcn-ee.net/rootfs/bb.org/testing/2018-07-22/stretch-iot/bone-debian-9.5-iot-armhf-2018-07-22-4gb.img.xz)。

### 设置机器人控制库

如果要构建 PX4，则此库还有其他设置步骤。

在编写本文时，无需修改其构建文件以添加交叉编译支持，*librobotcontrol* debian 软件包仅适用于 BeagleBoard 产品，包括 BeagleBone Blue。 以下是在 BeagleBone Blue 上获取 *librobotcontrol* 的方法：

1. 使用在 BeagleBoard 映像中预装的映像。
2. 从 debian 软件包或存储库安装： 
        sh
        sudo apt update && sudo apt install librobotcontrol

3. 从源代码安装 
        sh
        git clone https://github.com/StrawsonDesign/librobotcontrol.git
        cd librobotcontrol
        sudo make install

获得预建的库之后，

1. 选择 *librobotcontrol* 安装目录，并将其设置在 `LIBROBOTCONTROL_INSTALL_DIR` 环境变量中，以便不包含其他不需要的标头
2. 将 **robotcontrol.h** 和 **rc/\*** 安装到 `$LIBROBOTCONTROL_INSTALL_DIR/include`
3. 将预先构建的本机（ARM）版本的 librobotcontrol.\* 安装到 `$LIBROBOTCONTROL_INSTALL_DIR/lib` 中

此时，BeagleBone Blue 目标可以在交叉编译主机系统和本机构建系统上构建，即，

```sh
make beaglebone_blue_cross [upload]
```

## 交叉编译器构建

为 *BeagleBone Blue* 构建 PX4 的推荐方法是在开发计算机上进行编译，并将PX4可执行二进制文件直接上载到 BeagleBone Blue。

> 由于构建速度快和使用方便，建议在 [native build](#native_builds) 上使用此方法。

### 交叉编译器设置

可以在 [Linaro Toolchain Binaries site](http://www.linaro.org/downloads/) 中可以找到 *BeagleBone Blue* 的 ARM 交叉编译器。 以下是开发主机上的示例设置。

1. 首先将工具链安装到 */opt/bbblue_toolchain/gcc-arm-linux-gnueabihf* 中。 下面是一个使用软链接选择工具链的版本的例子：
    
    ```sh
    ...@ubuntu:/opt/bbblue_toolchain$ ls -l
        lrwxrwxrwx 1 root root   51 Mar 22 16:10 gcc-arm-linux-gnueabihf -> gcc-linaro-6.3.1-2017.05-x86_64_arm-linux-gnueabihf
        drwxr-xr-x 8 root root 4096 May 17  2017 gcc-linaro-6.3.1-2017.05-x86_64_arm-linux-gnueabihf
        drwxr-xr-x 8 root root 4096 Nov 19 03:51 gcc-linaro-6.4.1-2017.11-x86_64_arm-linux-gnueabihf
    ```

2. 将它添加到 〜/.profile 中的 PATH，如下所示
    
    ```sh
    export PATH=$PATH:/opt/bbblue_toolchain/gcc-arm-linux-gnueabihf/bin
    export CrossCompiler=/opt/bbblue_toolchain/gcc-arm-linux-gnueabihf/bin/arm-linux-gnueabihf-
    ```

> 工具链中的 GCC 应与 *BeagleBone Blue* 中的内核兼容。 一般的经验法则是选择工具链    其中 GCC 版本不高于 *BeagleBone Blue* 上的 OS 映像附带的 GCC 版本。

### 交叉编译和上传

1. 首先设置 *rsync*（这用于通过网络将文件从开发计算机传输到目标板 - WiFi 或以太网）。 
    - 对于带有密钥身份验证的 SSH 上的 *rsync*，请执行与 [Raspberry Pi/Navio](../flight_controller/raspberry_pi_navio2.md) 类似的步骤
    - 在开发计算机上，将 BeagleBone Blue 板定义为 **/etc/hosts** 中的 `BBBluePX4`
2. 运行以下命令以构建和上载文件： 
        sh
        make beaglebone_blue_cross upload

要测试上载的文件，请在 *BeagleBone Blue* 板上运行以下命令：

```sh
cd /home/debian/px4 
sudo ./bin/px4 -s px4.config 
```

> 目前，*librobotcontrol* 需要 root 访问权限。

## 本机构建（可选） {#native_builds}

您也可以直接在 BeagleBone Blue 上本地构建 PX4 版本。

在 BeagleBone Blue 上运行以下命令（即通过 SSH）：

1. 安装 dependencies： 
        sh
        sudo apt-get update
        sudo apt-get install cmake python-empy

2. 将 PX4 固件直接克隆到 BeagleBone Blue 上。
3. 继续 [标准构建系统安装](https://dev.px4.io/en/setup/dev_env_linux.html)。

## 引导期间自动启动

这是一个例子 [/etc/rc.local]：

```sh
#!/bin/sh -e
#
# rc.local
#
# This script is executed at the end of each multiuser runlevel.
# Make sure that the script will "exit 0" on success or any other
# value on error.
#
# In order to enable or disable this script just change the execution
# bits.
#
# By default this script does nothing.

# wait for services to start up
/bin/sleep 25

cd /home/debian/px4 

/home/debian/px4/bin/px4 -d -s /home/debian/px4/px4.config > /home/debian/px4/PX4.log & 

exit 0
```

下面是一个 *systemd* 服务示例 [/lib/systemd/system/px4-quad-copter.service]：

```sh
[Unit]
Description=PX4 Quadcopter Service
After=networking.service network-online.target 
StartLimitIntervalSec=0
Conflicts=px4-fixed-wing.service

[Service]
WorkingDirectory=/home/debian/px4
User=root
ExecStart=/home/debian/px4/bin/px4 -d -s /home/debian/px4/px4.config  

Restart=on-failure
RestartSec=1

[Install]
WantedBy=multi-user.target
```

### 其它选项

#### 动力伺服导轨

PX4 启动时，会自动为伺服电源供电。

#### 特殊功能

BeagleBone Blue has some unique features such as multiple choices of WiFi interfaces and power sources. Refer to comments in **/home/debian/px4/px4.config** for usage of these features.

#### SBUS Signal Converter

SBUS signal from receiver (e.g., FrSky X8R) is an inverted signal. UARTs on BeagleBone Blue can only work with non-inverted 3.3V level signal. [This tutorial](https://dev.px4.io/en/tutorials/linux_sbus.html) contains a SBUS signal inverter circuit.

#### Typical Connections

For a quadcopter with GPS and an SBUS receiver, here are typical connections:

1. Connect the ESC of motor 1, 2, 3 and 4 to channel 1, 2, 3 and 4 of servo outputs on BeagleBone Blue, respectively. If your ESC connector contains a power output pin, remove it and do not connect it to the power output pin of the servo channel on the BeagleBone Blue.

2. Connect the above mentioned converted SBUS signal to the dsm2 port if you have the matching connector for dsm2, otherwise connect it to any other available UART port and change the corresponding port in **/home/debian/px4/px4.config** accordingly.

3. Connect the signals of GPS module to GPS port on the BeagleBone Blue. Note that the signal pins of the GPS port on the BeagleBone Blue are only 3.3V tolerant, so choose your GPS module accordingly.