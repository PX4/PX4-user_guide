# 비글본 블루

[ BeagleBone Blue ](https://beagleboard.org/blue)은 일체형 Linux 기반 시스템입니다. 로봇 공학용으로 최적화되었지만, 작고 저렴한 이 보드에는 비행 조종사가 필요로 하는 모든 필요한 센서와 주변 장치가 있습니다. 이 항목에서는 [librobotcontrol ](https://github.com/StrawsonDesign/librobotcontrol) 로보틱 패키지로 PX4를 실행하도록 보드를 설정하는 방법을 설명합니다.

![비글본 - 라벨로 표시된 다이어그램](../../assets/hardware/BeagleBone_Blue_balloons.jpg)

## OS Image

여기서 *BeagleBone Blue * 이미지를 찾을 수 있습니다.

- [가장 안정적인 OS 이미지 ](https://beagleboard.org/latest-images).
- [ 테스트 OS 이미지 ](https://rcn-ee.net/rootfs/bb.org/testing/)(자주 업데이트됨).

깜박이는 OS 이미지에 대한 정보는 [ 이 페이지 ](https://github.com/beagleboard/beaglebone-blue/wiki/Flashing-firmware)에서 확인할 수 있습니다. 기타 유용한 정보는 [FAQ ](https://github.com/beagleboard/beaglebone-blue/wiki/Frequently-Asked-Questions-&lpar;FAQ&rpar;)에서 확인할 수 있습니다.

## 로봇 제어 라이브러리

[ BeagleBone Blue ](https://beagleboard.org/blue)에서 PX4는 [librobot control ](https://github.com/StrawsonDesign/librobotcontrol) 버전 1.0.0 이상을 필요로 합니다.

BeagleBoard OS 이미지는 *librobotcontrol *이 미리 설치되어 있지만 모든 OS 이미지에서 제대로 작동하지 않을 수 있습니다.

*librobotcontrol *이 제대로 작동하는지 확인하는 한 가지 방법은 *librobot control *과 함께 제공되는 *rc_test_drivers*를 실행하는 것입니다. 다음 예와 같이 모든 테스트를 통과해야 합니다. 선택적으로 *rc_test_bmp*, *rc_test_mpu* 등과 같은 다른 테스트를 실행합니다.

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

```

> **Tip ** 선택적으로 실시간 커널로 업데이트할 수 있으며, 그럴 경우 *librobot controlled *이 실시간 커널과 제대로 작동하는지 다시 확인합니다.

The latest OS images at time of updating this document is [bone-debian-9.5-iot-armhf-2018-10-07-4gb.img.xz](https://debian.beagleboard.org/images/bone-debian-9.5-iot-armhf-2018-10-07-4gb.img.xz).

### 로봇 제어 라이브러리 설정

PX4를 빌드하려면 이 라이브러리에 대한 추가 설정 단계가 있습니다.

Here are steps to build the *librobotcontrol* with PX4 extensions natively on a BeagleBone board:

    sh
       git clone https://github.com/StrawsonDesign/librobotcontrol.git
       cd librobotcontrol
       make EXT_CFLAGS=-DRC_AUTOPILOT_EXT
       sudo make install

> **Tip** `EXT_CFLAGS` was added after version 1.0.4. If it's not in your version of **librobotcontrol/library/Makefile**, add it to `CLFAGS`, e.g., `CFLAGS := $(EXT_CFLAGS) -g -fPIC -I $(INCLUDEDIR)`

After acquiring the pre-built library,

1. Select the *librobotcontrol* installation directory, and set it in the `LIBROBOTCONTROL_INSTALL_DIR` environment variable so that other unwanted headers will not be included
2. Install **robotcontrol.h** and **rc/\*** into `$LIBROBOTCONTROL_INSTALL_DIR/include`
3. Install pre-built native (ARM) version of librobotcontrol.\* into `$LIBROBOTCONTROL_INSTALL_DIR/lib`

At this point the BeagleBone Blue target can be built on both cross compile host system and native build system, i.e.,

```sh
make posix_bbblue_cross [upload]
```

## 교차 컴파일러 빌드

The recommended way to build PX4 for *BeagleBone Blue* is to compile on a development computer and upload the PX4 executable binary directly to the BeagleBone Blue.

> **Tip** This approach is recommended over [native build](#native_builds) due to speed of deployment and ease of use.

### 크로스 컴파일러 설정

ARM Cross Compiler for *BeagleBone Blue* can be found at [Linaro Toolchain Binaries site](http://www.linaro.org/downloads/). The following is an example setup on development host.

1. First install the toolchain into */opt/bbblue_toolchain/gcc-arm-linux-gnueabihf*. Here is an example of using soft link to select which version of the toolchain you want to use:
    
    ```sh
    ...@ubuntu:/opt/bbblue_toolchain$ ls -l
        lrwxrwxrwx 1 root root   51 Mar 22 16:10 gcc-arm-linux-gnueabihf -> gcc-linaro-6.3.1-2017.05-x86_64_arm-linux-gnueabihf
        drwxr-xr-x 8 root root 4096 May 17  2017 gcc-linaro-6.3.1-2017.05-x86_64_arm-linux-gnueabihf
        drwxr-xr-x 8 root root 4096 Nov 19 03:51 gcc-linaro-6.4.1-2017.11-x86_64_arm-linux-gnueabihf
    ```

2. Add it to the PATH in ~/.profile as shown below
    
    ```sh
    export PATH=$PATH:/opt/bbblue_toolchain/gcc-arm-linux-gnueabihf/bin
    export CrossCompiler=/opt/bbblue_toolchain/gcc-arm-linux-gnueabihf/bin/arm-linux-gnueabihf-
    ```

> **Tip** GCC in the toolchain should be compatible with kernel in *BeagleBone Blue*. General rule of thumb is to choose a toolchain where version of GCC is not higher than version of GCC which comes with the OS image on *BeagleBone Blue*.

### 교차 컴파일 및 업로드

1. First set up *rsync* (this is is used to transfer files from the development computer to the target board over a network - WiFi or Ethernet). 
    - For *rsync* over SSH with key authentication, follow steps similar to those for [Raspberry Pi/Navio](../flight_controller/raspberry_pi_navio2.md)
    - On the development computer, define the BeagleBone Blue board as `BBBluePX4` in **/etc/hosts**
2. Run the following command to build and upload files: 
        sh
        make posix_bbblue_cross upload

To test the uploaded files, run the following commands on the *BeagleBone Blue* board:

```sh
cd /home/dbian/px4 
sudo ./bin/px4 -s px4.config 
```

> **Note** Currently *librobotcontrol* requires root access.

## 기본 빌드(옵션) {#native_builds}

You can also natively build PX4 builds directly on the BeagleBone Blue.

Run the following commands on the BeagleBone Blue (i.e. via SSH):

1. Install dependencies: 
        sh
        sudo apt-get update
        sudo apt-get install cmake python-empy

2. Clone the PX4 Firmware directly onto the BeagleBone Blue.
3. Continue with the [standard build system installation](https://dev.px4.io/master/en/setup/dev_env_linux.html).

## 부팅 중 자동 시작

Here is an example [/etc/rc.local]:

```sh
#!/bin/sh -e
#
# rc.local
#
# 이 스크립트는 각 Multiuser 런레벨 끝에서 실행됩니다
# Make sure that the script will "exit 0" on success or any other
# value on error.
#
# In order to enable or disable this script just change the execution
# bits.
#
# By default this script does nothing.

# 서비스가 시작될 때까지 대기
/bin/sleep 25

cd /home/dbian/px4 

/home/dbian/px4/bin/px4 -s /home/dbian/px4/px4/config > /home/debian/px4/PX4.log & 

0번 출구
```

Below is a *systemd* service example [/lib/systemd/system/px4-quad-copter.service]:

```sh
[단위]
설명=PX4 쿼드콥터 서비스
After=networking.service network-online.target 
시작 한계IntervalSec=0
Conflicts=px4-fixed-wing.service

[서비스]
WorkingDirectory=/홈/디비언/px4
사용자=루트
ExecStart=/home/dbian/px4/bin/px4 -s /home/dbian/px4/px4.config 

재시작=실패 시
RestartSec=1

[설치]
WantedBy=멀티 사용자.target
```

### 여러가지 종류의

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