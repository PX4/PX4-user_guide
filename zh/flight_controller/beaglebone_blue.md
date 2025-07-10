---
canonicalUrl: https://docs.px4.io/main/zh/flight_controller/beaglebone_blue
---

# BeagleBone Blue

:::warning PX4 does not manufacture this (or any) autopilot. Contact the [manufacturer](https://beagleboard.org/blue) for hardware support or compliance issues.
:::

:::warning PX4 support for this flight controller is [experimental](../flight_controller/autopilot_experimental.md).
:::

[BeagleBone Blue](https://beagleboard.org/blue) is an all-in-one Linux-based computer. Although it is optimized for robotics, this compact and inexpensive board has all necessary sensors and peripherals needed by a flight controller. This topic shows how to set up the board to run PX4 with [librobotcontrol](https://github.com/StrawsonDesign/librobotcontrol) robotics package.

![BeagleBone - labelled diagram](../../assets/hardware/BeagleBone_Blue_balloons.jpg)

## 操作系统映像

*BeagleBone Blue* images can be found here:

- [最新的稳定 OS 映像](https://beagleboard.org/latest-images)。
- [测试 OS 映像](https://rcn-ee.net/rootfs/bb.org/testing/)（经常更新）。

Information about flashing OS images can be found on [this page](https://github.com/beagleboard/beaglebone-blue/wiki/Flashing-firmware). Other useful information can be found in the [FAQ](https://github.com/beagleboard/beaglebone-blue/wiki/Frequently-Asked-Questions-&lpar;FAQ&rpar;).

:::tip
Optionally you can update to a realtime kernel, and if you do, re-check if *librobotcontrol* works properly with the realtime kernel.
:::

The latest OS images at time of updating this document is [bone-debian-9.9-iot-armhf-2019-08-03-4gb.img.xz](https://debian.beagleboard.org/images/bone-debian-9.9-iot-armhf-2019-08-03-4gb.img.xz).

## Cross Compiler Build (Recommend)

The recommended way to build PX4 for *BeagleBone Blue* is to compile on a development computer and upload the PX4 executable binary directly to the BeagleBone Blue.

:::tip
This approach is recommended over [native build](#native_builds) due to speed of deployment and ease of use.
:::

:::note
The PX4 build requires [librobotcontrol](http://strawsondesign.com/docs/librobotcontrol/) which is automatically included in the build (but it can be installed and tested independently if required).
:::

### Beaglebone Blue WIFI Setup

For easy access to your board, you can connect it to your home network via wifi.

The steps are (execute on the board):

```sh
sudo su
connmanctl
connmanctl>scan wifi
connmanctl>services
#(at this point you should see your network SSID appear.)
connmanctl>agent on
connmanctl>connect <SSID>
connmanctl>quit
```

### SSH root Login on Beaglebone

Root login can be enabled on the board with:

```sh
sudo su
echo "PermitRootLogin yes" >>  /etc/ssh/sshd_config && systemctl restart sshd
```

### 交叉编译器设置

1. First set up *rsync* (this is used to transfer files from the development computer to the target board over a network - WiFi or Ethernet). For *rsync* over SSH with key authentication, follow the steps here (on the development machine):
    
    1. Generate an SSH key if you have not previously done so:
        
            ssh-keygen -t rsa
            
        
        1. ENTER //no passphrase
        2. ENTER
        3. ENTER
    
    2. Define the BeagleBone Blue board as `beaglebone` in **/etc/hosts** and copy the public SSH key to the board for password-less SSH access:
        
            ssh-copy-id root@beaglebone
            
    
    3. Alternatively you can use the beaglebone's IP directly: ```ssh-copy-id root@<IP>```
    4. When prompted if you trust: yes
    5. Enter root password

2. Cross Compile Setup
    
    1. Toolchain download
        
        1. 首先将工具链安装到 */opt/bbblue_toolchain/gcc-arm-linux-gnueabihf* 中。 下面是一个使用软链接选择工具链的版本的例子：
            
                mkdir -p /opt/bbblue_toolchain/gcc-arm-linux-gnueabihf
                chmod -R 777 /opt/bbblue_toolchain
                
            
            可以在 [Linaro Toolchain Binaries site](http://www.linaro.org/downloads/) 中可以找到 *BeagleBone Blue* 的 ARM 交叉编译器。
            
:::tip GCC
in the toolchain should be compatible with kernel in *BeagleBone Blue*. General rule of thumb is to choose a toolchain where version of GCC is not higher than version of GCC which comes with the OS image on *BeagleBone Blue*.
:::
            
            Download and unpack [gcc-linaro-7.5.0-2019.12-x86_64_arm-linux-gnueabihf](https://releases.linaro.org/components/toolchain/binaries/latest-7/arm-linux-gnueabihf/gcc-linaro-7.5.0-2019.12-x86_64_arm-linux-gnueabihf.tar.xz) to the bbblue_toolchain folder.
            
            Different ARM Cross Compiler versions for *BeagleBone Blue* can be found at [Linaro Toolchain Binaries site](http://www.linaro.org/downloads/).
            
:::tip
The GCC version of the toolchain should be compatible with kernel in *BeagleBone Blue*.
:::
            
            General rule of thumb is to choose a toolchain where the version of GCC is not higher than the version of GCC which comes with the OS image on *BeagleBone Blue*.
        
        2. 将它添加到 〜/.profile 中的 PATH，如下所示
            
            ```sh
            export PATH=$PATH:/opt/bbblue_toolchain/gcc-arm-linux-gnueabihf/gcc-linaro-6.3.1-2017.05-x86_64_arm-linux-gnueabihf/bin
            ```
            
:::note
Logout and Login to apply the change, or execute the same line on your current shell.
:::
            
            Follow the [Development Environment Setup](../dev_setup/dev_env_linux_ubuntu.md) instructions.
            
            You may have to edit the upload target to match with your setup:
            
                nano PX4-Autopilot/boards/beaglebone/blue/cmake/upload.cmake
                
                #in row 37 change debian@beaglebone.lan --> root@beaglebone (or root@<IP>)
                

### 交叉编译和上传

Compile and Upload

    make beaglebone_blue_default upload
    

:::note
Without upload, files stored local in build folder.
:::

To test the uploaded files, run the following commands on the *BeagleBone Blue* board:

```sh
cd /home/debian/px4 
sudo ./bin/px4 -s px4.config 
```

:::note
Currently *librobotcontrol* requires root access.
:::

<span id="native_builds"></span>

## 本机构建（可选）

You can also natively build PX4 builds directly on the BeagleBone Blue.

After acquiring the pre-built library,

1. 选择 *librobotcontrol* 安装目录，并将其设置在 `LIBROBOTCONTROL_INSTALL_DIR` 环境变量中，以便不包含其他不需要的标头
2. 将 **robotcontrol.h** 和 **rc/\*** 安装到 `$LIBROBOTCONTROL_INSTALL_DIR/include`
3. 将预先构建的本机（ARM）版本的 librobotcontrol.\* 安装到 `$LIBROBOTCONTROL_INSTALL_DIR/lib` 中

Run the following commands on the BeagleBone Blue (i.e. via SSH):

1. 安装依赖项 
        sh
        sudo apt-get update
        sudo apt-get install cmake python-empy

2. 将 PX4 固件直接克隆到 BeagleBone Blue 上。
3. 继续 [标准构建系统安装](../dev_setup/dev_env_linux.md)。

## Chnages in config

All changes can be made in de px4.config file directly on beaglebone. For example, you can change the WIFI to wlan.

:::note
If you want to change permanently, you have to change **PX4-Autopilot/posix-configs/bbblue/px4.config** on the Build Machine before build.
:::

## 引导期间自动启动

Here is an example [/etc/rc.local]:

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

Below is a *systemd* service example [/lib/systemd/system/px4-quad-copter.service]:

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

When PX4 starts, it automatically applies power to servos.

#### 特殊功能

BeagleBone Blue has some unique features such as multiple choices of WiFi interfaces and power sources. Refer to comments in **/home/debian/px4/px4.config** for usage of these features.

#### SBUS 信号转换器

SBUS signal from receiver (e.g., FrSky X8R) is an inverted signal. UARTs on BeagleBone Blue can only work with non-inverted 3.3V level signal. [This tutorial](../tutorials/linux_sbus.md) contains a SBUS signal inverter circuit.

#### 典型连接

For a quadcopter with GPS and an SBUS receiver, here are typical connections:

1. 将电机 1,2,3 和 4 的电调连接到伺服输出的通道 1,2,3和4 分别在 BeagleBone Blue 上。 如果您的电调连接器包含电源输出引脚，将其移除，不要将其连接到伺服通道的电源输出引脚在 BeagleBone Blue 上。

2. Connect the above mentioned converted SBUS signal to the dsm2 port if you have the matching connector for dsm2, otherwise connect it to any other available UART port and change the corresponding port in **/home/debian/px4/px4.config** accordingly.

3. 将 GPS 模块的信号连接到 BeagleBone Blue 上的 GPS 端口。 Note that the signal pins of the GPS port on the BeagleBone Blue are only 3.3V tolerant, so choose your GPS module accordingly.