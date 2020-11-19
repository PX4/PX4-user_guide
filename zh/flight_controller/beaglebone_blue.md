# BeagleBone Blue

> **Warning** PX4 不生产这款且也不生产任何自动驾驶仪。 若需要硬件支持或咨询合规问题，请联系 [制造商](https://beagleboard.org/blue)。

<span></span>

> **Warning** PX4 [实验性地](../flight_controller/autopilot_experimental.md) 支持此飞行控制器。

[BeagleBone Blue](https://beagleboard.org/blue) 是一台基于 Linux 的一体机。 它针对机器人技术进行了优化，这种紧凑且便宜的电路板具有飞行控制器所需的所有必要传感器和外围设备。 本主题说明如何设置电路板以使用 [librobotcontrol](https://github.com/StrawsonDesign/librobotcontrol) 机器人软件包运行 PX4。

![BeagleBone - 标记图](../../assets/hardware/BeagleBone_Blue_balloons.jpg)

## 操作系统映像

可以在这里找到 *BeagleBone Blue* 图像：

- [最新的稳定 OS 映像](https://beagleboard.org/latest-images)。
- [测试 OS 映像](https://rcn-ee.net/rootfs/bb.org/testing/)（经常更新）。

有关闪存操作系统映像的信息可以在 [this page](https://github.com/beagleboard/beaglebone-blue/wiki/Flashing-firmware) 上找到。 其他有用的信息可以在 [FAQ](https://github.com/beagleboard/beaglebone-blue/wiki/Frequently-Asked-Questions-&lpar;FAQ&rpar;) 中找到。

> **Tip**您可以选择更新到实时内核，如果这样做，请重新检查 *librobotcontrol* 是否与实时内核一起正常工作。

The latest OS images at time of updating this document is [bone-debian-9.9-iot-armhf-2019-08-03-4gb.img.xz](https://debian.beagleboard.org/images/bone-debian-9.9-iot-armhf-2019-08-03-4gb.img.xz).

## Cross Compiler Build (Recommend)

为 *BeagleBone Blue* 构建 PX4 的推荐方法是在开发计算机上进行编译，并将PX4可执行二进制文件直接上载到 BeagleBone Blue。

> 由于构建速度快和使用方便，建议在 [native build](#native_builds) 上使用此方法。

<span></span>

> **Note** The PX4 build requires [librobotcontrol](http://strawsondesign.com/docs/librobotcontrol/) which is automatically included in the build (but it can be installed and tested independently if required).

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

1. 首先设置 *rsync*（这用于通过网络将文件从开发计算机传输到目标板 - WiFi 或以太网）。 For *rsync* over SSH with key authentication, follow the steps here (on the development machine):
    
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
            
            > 工具链中的 GCC 应与 *BeagleBone Blue* 中的内核兼容。 General rule of thumb is to choose a toolchain where version of GCC is not higher than version of GCC which comes with the OS image on *BeagleBone Blue*.
            
            Download and unpack [gcc-linaro-7.5.0-2019.12-x86_64_arm-linux-gnueabihf](https://releases.linaro.org/components/toolchain/binaries/latest-7/arm-linux-gnueabihf/gcc-linaro-7.5.0-2019.12-x86_64_arm-linux-gnueabihf.tar.xz) to the bbblue_toolchain folder.
            
            Different ARM Cross Compiler versions for *BeagleBone Blue* can be found at [Linaro Toolchain Binaries site](http://www.linaro.org/downloads/).
            
            > **Tip** The GCC version of the toolchain should be compatible with kernel in *BeagleBone Blue*.
            
            General rule of thumb is to choose a toolchain where the version of GCC is not higher than the version of GCC which comes with the OS image on *BeagleBone Blue*.
        
        2. 将它添加到 〜/.profile 中的 PATH，如下所示
            
            ```sh
            export PATH=$PATH:/opt/bbblue_toolchain/gcc-arm-linux-gnueabihf/gcc-linaro-6.3.1-2017.05-x86_64_arm-linux-gnueabihf/bin
            ```
            
            > **Note** Logout and Login to apply the change, or execute the same line on your current shell.
            
            Follow the [Development Environment Setup](../dev)setup/dev_env_linux_ubuntu.md) instructions.
            
            You may have to edit the upload target to match with your setup:
            
                nano PX4-Autopilot/boards/beaglebone/blue/cmake/upload.cmake
                
                #in row 37 change debian@beaglebone.lan --> root@beaglebone (or root@<IP>)
                

### 交叉编译和上传

Compile and Upload

    make beaglebone_blue_default upload
    

> **Note** Without upload, files stored local in build folder.

要测试上载的文件，请在 *BeagleBone Blue* 板上运行以下命令：

```sh
cd /home/debian/px4 
sudo ./bin/px4 -s px4.config 
```

> 目前，*librobotcontrol* 需要 root 访问权限。

<span id="native_builds"></span>

## 本机构建（可选）

您也可以直接在 BeagleBone Blue 上本地构建 PX4 版本。

获得预建的库之后，

1. 选择 *librobotcontrol* 安装目录，并将其设置在 `LIBROBOTCONTROL_INSTALL_DIR` 环境变量中，以便不包含其他不需要的标头
2. 将 **robotcontrol.h** 和 **rc/\*** 安装到 `$LIBROBOTCONTROL_INSTALL_DIR/include`
3. 将预先构建的本机（ARM）版本的 librobotcontrol.\* 安装到 `$LIBROBOTCONTROL_INSTALL_DIR/lib` 中

在 BeagleBone Blue 上运行以下命令（即通过 SSH）：

1. 安装依赖项 
        sh
        sudo apt-get update
        sudo apt-get install cmake python-empy

2. 将 PX4 固件直接克隆到 BeagleBone Blue 上。
3. 继续 [标准构建系统安装](../dev_setup/dev_env_linux.md)。

## Chnages in config

All changes can be made in de px4.config file directly on beaglebone. For example, you can change the WIFI to wlan.

> **Note** If you want to change permanently, you have to change **PX4-Autopilot/posix-configs/bbblue/px4.config** on the Build Machine before build.

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

BeagleBone Blue has some unique features such as multiple choices of WiFi interfaces and power sources. 请参阅 **/home/debian/px4/px4.config** 中的注释以供使用这些功能。

#### SBUS 信号转换器

来自接收器（例如，FrSky X8R）的 SBUS 信号是反相信号。 BeagleBone Blue 上的 UART 只能使用非反相 3.3V 电平信号。 [This tutorial](../tutorials/linux_sbus.md) 包含一个SBUS 信号逆变电路。

#### 典型连接

对于带 GPS 和 SBUS 接收器的四轴飞行器，以下是典型连接：

1. 将电机 1,2,3 和 4 的电调连接到伺服输出的通道 1,2,3和4 分别在 BeagleBone Blue 上。 如果您的电调连接器包含电源输出引脚，将其移除，不要将其连接到伺服通道的电源输出引脚在 BeagleBone Blue 上。

2. Connect the above mentioned converted SBUS signal to the dsm2 port if you have the matching connector for dsm2, otherwise connect it to any other available UART port and change the corresponding port in **/home/debian/px4/px4.config** accordingly.

3. 将 GPS 模块的信号连接到 BeagleBone Blue 上的 GPS 端口。 Note that the signal pins of the GPS port on the BeagleBone Blue are only 3.3V tolerant, so choose your GPS module accordingly.