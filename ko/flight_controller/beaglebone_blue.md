# 비글본 블루

> **Warning** PX4 support for this flight controller is [experimental](../flight_controller/autopilot_experimental.md).

[ BeagleBone Blue ](https://beagleboard.org/blue)은 일체형 Linux 기반 시스템입니다. 로봇 공학용으로 최적화되었지만, 작고 저렴한 이 보드에는 비행 조종사가 필요로 하는 모든 필요한 센서와 주변 장치가 있습니다. 이 항목에서는 [librobotcontrol ](https://github.com/StrawsonDesign/librobotcontrol) 로보틱 패키지로 PX4를 실행하도록 보드를 설정하는 방법을 설명합니다.

![비글본 - 라벨로 표시된 다이어그램](../../assets/hardware/BeagleBone_Blue_balloons.jpg)

## OS Image

여기서 *BeagleBone Blue * 이미지를 찾을 수 있습니다.

- [가장 안정적인 OS 이미지 ](https://beagleboard.org/latest-images).
- [ 테스트 OS 이미지 ](https://rcn-ee.net/rootfs/bb.org/testing/)(자주 업데이트됨).

깜박이는 OS 이미지에 대한 정보는 [ 이 페이지 ](https://github.com/beagleboard/beaglebone-blue/wiki/Flashing-firmware)에서 확인할 수 있습니다. 기타 유용한 정보는 [FAQ ](https://github.com/beagleboard/beaglebone-blue/wiki/Frequently-Asked-Questions-&lpar;FAQ&rpar;)에서 확인할 수 있습니다.

> **Tip** Optionally you can update to a realtime kernel, and if you do, re-check if *librobotcontrol* works properly with the realtime kernel.

The latest OS images at time of updating this document is [bone-debian-9.9-iot-armhf-2019-08-03-4gb.img.xz](https://debian.beagleboard.org/images/bone-debian-9.9-iot-armhf-2019-08-03-4gb.img.xz).

## Cross Compiler Build (Recommend)

The recommended way to build PX4 for *BeagleBone Blue* is to compile on a development computer and upload the PX4 executable binary directly to the BeagleBone Blue.

> **Tip** This approach is recommended over [native build](#native_builds) due to speed of deployment and ease of use.

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

### Cross Compiler Setup

1. First set up *rsync* (this is is used to transfer files from the development computer to the target board over a network - WiFi or Ethernet). For *rsync* over SSH with key authentication, follow the steps here (on the development machine):
    
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
        
        1. First install the toolchain into */opt/bbblue_toolchain/gcc-arm-linux-gnueabihf*. Here is an example of using soft link to select which version of the toolchain you want to use:
            
                mkdir -p /opt/bbblue_toolchain/gcc-arm-linux-gnueabihf
                chmod -R 777 /opt/bbblue_toolchain
                
            
            ARM Cross Compiler for *BeagleBone Blue* can be found at [Linaro Toolchain Binaries site](http://www.linaro.org/downloads/).
            
            > **Tip** GCC in the toolchain should be compatible with kernel in *BeagleBone Blue*. General rule of thumb is to choose a toolchain where version of GCC is not higher than version of GCC which comes with the OS image on *BeagleBone Blue*.
            
            Download and unpack [gcc-linaro-7.5.0-2019.12-x86_64_arm-linux-gnueabihf](https://releases.linaro.org/components/toolchain/binaries/latest-7/arm-linux-gnueabihf/gcc-linaro-7.5.0-2019.12-x86_64_arm-linux-gnueabihf.tar.xz) to the bbblue_toolchain folder.
            
            Different ARM Cross Compiler versions for *BeagleBone Blue* can be found at [Linaro Toolchain Binaries site](http://www.linaro.org/downloads/).
            
            > **Tip** The GCC version of the toolchain should be compatible with kernel in *BeagleBone Blue*.
            
            General rule of thumb is to choose a toolchain where the version of GCC is not higher than the version of GCC which comes with the OS image on *BeagleBone Blue*.
        
        2. Add it to the PATH in ~/.profile as shown below
            
            ```sh
            export PATH=$PATH:/opt/bbblue_toolchain/gcc-arm-linux-gnueabihf/gcc-linaro-6.3.1-2017.05-x86_64_arm-linux-gnueabihf/bin
            ```
            
            > **Note** Logout and Login to apply the change, or execute the same line on your current shell.
            
            Follow the [Development Environment Setup](https://dev.px4.io/master/en/setup/dev_env_linux_ubuntu.html) instructions.
            
            You may have to edit the upload target to match with your setup:
            
                nano Firmware/boards/beaglebone/blue/cmake/upload.cmake
                
                #in row 37 change debian@beaglebone.lan --> root@beaglebone (or root@<IP>)
                

### Cross Compile and Upload

Compile and Upload

    make beaglebone_blue_default upload
    

> **Note** Without upload, files stored local in build folder.

To test the uploaded files, run the following commands on the *BeagleBone Blue* board:

```sh
cd /home/debian/px4 
sudo ./bin/px4 -s px4.config 
```

> **Note** Currently *librobotcontrol* requires root access.

## Native Builds (optional) {#native_builds}

You can also natively build PX4 builds directly on the BeagleBone Blue.

After acquiring the pre-built library,

1. Select the *librobotcontrol* installation directory, and set it in the `LIBROBOTCONTROL_INSTALL_DIR` environment variable so that other unwanted headers will not be included
2. Install **robotcontrol.h** and **rc/\*** into `$LIBROBOTCONTROL_INSTALL_DIR/include`
3. Install pre-built native (ARM) version of librobotcontrol.\* into `$LIBROBOTCONTROL_INSTALL_DIR/lib`

Run the following commands on the BeagleBone Blue (i.e. via SSH):

1. Install dependencies: 
        sh
        sudo apt-get update
        sudo apt-get install cmake python-empy

2. Clone the PX4 Firmware directly onto the BeagleBone Blue.
3. Continue with the [standard build system installation](https://dev.px4.io/master/en/setup/dev_env_linux.html).

## Chnages in config

All changes can be made in de px4.config file directly on beaglebone. For example, you can change the WIFI to wlan.

> **Note** If you want to change permanently, you have to change **Firmware/posix-configs/bbblue/px4.config** on the Build Machine before build.

## 부팅 중 자동 시작

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

### Miscellaneous

#### 파워 서보 레일

When PX4 starts, it automatically applies power to servos.

#### 언닉 피어스

BeagleBone Blue has some unique features such as multiple choices of WiFi interfaces and power sources. Refer to comments in **/home/debian/px4/px4.config** for usage of these features.

#### SBUS 신호 변환기

SBUS signal from receiver (e.g., FrSky X8R) is an inverted signal. UARTs on BeagleBone Blue can only work with non-inverted 3.3V level signal. [This tutorial](https://dev.px4.io/master/en/tutorials/linux_sbus.html) contains a SBUS signal inverter circuit.

#### 일반적인 연결

For a quadcopter with GPS and an SBUS receiver, here are typical connections:

1. Connect the ESC of motor 1, 2, 3 and 4 to channel 1, 2, 3 and 4 of servo outputs on BeagleBone Blue, respectively. If your ESC connector contains a power output pin, remove it and do not connect it to the power output pin of the servo channel on the BeagleBone Blue.

2. Connect the above mentioned converted SBUS signal to the dsm2 port if you have the matching connector for dsm2, otherwise connect it to any other available UART port and change the corresponding port in **/home/debian/px4/px4.config** accordingly.

3. Connect the signals of GPS module to GPS port on the BeagleBone Blue. Note that the signal pins of the GPS port on the BeagleBone Blue are only 3.3V tolerant, so choose your GPS module accordingly.