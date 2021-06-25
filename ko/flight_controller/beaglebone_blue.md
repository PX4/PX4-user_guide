# 비글본 블루

:::warning PX4에서는 이 제품을 제조하지 않습니다. 하드웨어 지원과 호환 문제는 [제조사](https://beagleboard.org/blue)에 문의하십시오.
:::

:::warning
이 비행 컨트롤러에 대한 PX4 지원은 [테스트 단계](../flight_controller/autopilot_experimental.md)입니다.
:::

[BeagleBone Blue](https://beagleboard.org/blue)는 올인원 리눅스 기반 컴퓨터입니다. 로봇 공학에 최적화되어 있지만, 이 작고 저렴한 보드에는 비행 콘트롤러에 필요한 모든 센서와 주변 장치가 있습니다. 이 항목에서는 [librobotcontrol](https://github.com/StrawsonDesign/librobotcontrol) 로봇 패키지로 PX4를 실행하기 위한 보드 설정 방법을 설명합니다.

![BeagleBone - labelled diagram](../../assets/hardware/BeagleBone_Blue_balloons.jpg)

## OS 이미지

*BeagleBone Blue* 이미지는 여기에서 다운로드할 수 있습니다.

- [가장 안정적인 OS 이미지](https://beagleboard.org/latest-images).
- [ 테스트 OS 이미지](https://rcn-ee.net/rootfs/bb.org/testing/)(자주 업데이트됨).

플래시 OS 이미지에 대한 정보는 [이 페이지](https://github.com/beagleboard/beaglebone-blue/wiki/Flashing-firmware)를 참고하십시오. 기타 유용한 정보는 [FAQ](https://github.com/beagleboard/beaglebone-blue/wiki/Frequently-Asked-Questions-&lpar;FAQ&rpar;)을 참고하십시오.

:::tip
실시간 커널로 업데이트 할 수 있으며, 업데이트 하는경우 *librobotcontrol*이 실시간 커널에서 제대로 작동하는지 다시 확인합니다.
:::

이 문서를 업데이트 시점의 최신 OS 이미지는 [bone-debian-9.9-iot-armhf-2019-08-03-4gb.img.xz](https://debian.beagleboard.org/images/bone-debian-9.9-iot-armhf-2019-08-03-4gb.img.xz)입니다.

## 크로스 컴파일러 빌드 (권장)

*BeagleBone Blue*에 대해 PX4를 구축 방법은 개발 컴퓨터에서 컴파일하여 PX4 실행 가능한 이진 파일을 BeagleBone Blue에 직접 업로드하는 것입니다.

:::tip
이 접근 방식은 배포 속도와 사용 편의성 때문에 [네이티브 빌드](#native_builds) 보다 권장됩니다.
:::

:::note PX4 빌드에는 빌드에 자동으로 포함되는 [librobotcontrol](http://strawsondesign.com/docs/librobotcontrol/)이 필요합니다. 그러나, 필요한 경우 독립적으로 설치하고 테스트할 수 있습니다.
:::

### Beaglebone Blue WIFI 설정

보드에 쉽게 액세스하려면 Wi-Fi를 통해 네트워크에 연결할 수 있습니다.

절차는 다음과 같습니다 (보드에서 실행).

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

### Beaglebone에서 SSH 루트 로그인

아래의 명령어로 보드에서 루트 로그인을 활성화 할 수 있습니다.

```sh
sudo su
echo "PermitRootLogin yes" >>  /etc/ssh/sshd_config && systemctl restart sshd
```

### 크로스 컴파일러 설정

1. 먼저 * rsync*를 설정합니다. WiFi 또는 이더넷과 같은 네트워크를 통해 개발 컴퓨터에서 대상 보드로 파일을 전송하는 데 사용됩니다. 키 인증을 사용하는 SSH를 통한 *rsync*의 경우 다음 단계를 따르세요 (개발 머신에서).
    
    1. 이전에 생성하지 않은 경우 SSH 키를 생성합니다.
        
            ssh-keygen -t rsa
            
        
        1. ENTER //no passphrase
        2. ENTER
        3. ENTER
    
    2. **/etc/hosts**에서 BeagleBone Blue 보드를 `beaglebone`으로 정의하고 암호없는 SSH 액세스를 위해 공개 SSH 키를 보드에 복사합니다.
        
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
            
:::tip GCC
in the toolchain should be compatible with kernel in *BeagleBone Blue*. General rule of thumb is to choose a toolchain where version of GCC is not higher than version of GCC which comes with the OS image on *BeagleBone Blue*.
:::
            
            Download and unpack [gcc-linaro-7.5.0-2019.12-x86_64_arm-linux-gnueabihf](https://releases.linaro.org/components/toolchain/binaries/latest-7/arm-linux-gnueabihf/gcc-linaro-7.5.0-2019.12-x86_64_arm-linux-gnueabihf.tar.xz) to the bbblue_toolchain folder.
            
            Different ARM Cross Compiler versions for *BeagleBone Blue* can be found at [Linaro Toolchain Binaries site](http://www.linaro.org/downloads/).
            
:::tip
The GCC version of the toolchain should be compatible with kernel in *BeagleBone Blue*.
:::
            
            General rule of thumb is to choose a toolchain where the version of GCC is not higher than the version of GCC which comes with the OS image on *BeagleBone Blue*.
        
        2. Add it to the PATH in ~/.profile as shown below
            
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
                

### Cross Compile and Upload

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

## Native Builds (optional)

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
3. Continue with the [standard build system installation](../dev_setup/dev_env_linux.md).

## Chnages in config

All changes can be made in de px4.config file directly on beaglebone. For example, you can change the WIFI to wlan.

:::note
If you want to change permanently, you have to change **PX4-Autopilot/posix-configs/bbblue/px4.config** on the Build Machine before build.
:::

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

SBUS signal from receiver (e.g., FrSky X8R) is an inverted signal. UARTs on BeagleBone Blue can only work with non-inverted 3.3V level signal. [This tutorial](../tutorials/linux_sbus.md) contains a SBUS signal inverter circuit.

#### 일반적인 연결

For a quadcopter with GPS and an SBUS receiver, here are typical connections:

1. Connect the ESC of motor 1, 2, 3 and 4 to channel 1, 2, 3 and 4 of servo outputs on BeagleBone Blue, respectively. If your ESC connector contains a power output pin, remove it and do not connect it to the power output pin of the servo channel on the BeagleBone Blue.

2. Connect the above mentioned converted SBUS signal to the dsm2 port if you have the matching connector for dsm2, otherwise connect it to any other available UART port and change the corresponding port in **/home/debian/px4/px4.config** accordingly.

3. Connect the signals of GPS module to GPS port on the BeagleBone Blue. Note that the signal pins of the GPS port on the BeagleBone Blue are only 3.3V tolerant, so choose your GPS module accordingly.