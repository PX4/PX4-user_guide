---
canonicalUrl: https://docs.px4.io/main/ko/flight_controller/beaglebone_blue
---

# 비글본 블루

:::warning PX4에서는 이 제품을 제조하지 않습니다. 하드웨어 지원과 호환 문제는 [제조사](https://beagleboard.org/blue)에 문의하십시오.
:::

:::warning
이 비행 컨트롤러에 대한 PX4 지원은 [테스트 단계](../flight_controller/autopilot_experimental.md)입니다.
:::

[BeagleBone Blue](https://beagleboard.org/blue)는 올인원 리눅스 기반 컴퓨터입니다. 로봇 공학에 최적화되어 있지만, 이 작고 저렴한 보드에는 비행 콘트롤러에 필요한 모든 센서와 주변 장치가 있습니다. 이 항목에서는 [librobotcontrol](https://github.com/StrawsonDesign/librobotcontrol) 로봇 패키지로 PX4를 실행하기 위한 보드 설정 방법을 설명합니다.

![BeagleBone - 레이블이 있는 다이어그램](../../assets/hardware/BeagleBone_Blue_balloons.jpg)

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
            
    
    3. 또는 beaglebone의 IP를 직접 사용할 수 있습니다. ```ssh-copy-id root@<IP>```
    4. 확인 메시지가 표시되면 : yes
    5. 루트 비밀번호 입력

2. 크로스 컴파일러 설정
    
    1. 툴체인 다운로드
        
        1. 먼저 툴체인을 */opt/bbblue_toolchain/gcc-arm-linux-gnueabihf*에 설치합니다. 다음은 소프트 링크를 사용하여 사용할 도구 모음 버전을 선택하는 예입니다.
            
                mkdir -p /opt/bbblue_toolchain/gcc-arm-linux-gnueabihf
                chmod -R 777 /opt/bbblue_toolchain
                
            
            *BeagleBone Blue* 용 ARM 크로스 컴파일러는 [Linaro Toolchain Binaries 사이트](http://www.linaro.org/downloads/)에서 찾을 수 있습니다.
            
:::tip
툴체인의 GCC는 *BeagleBone Blue*의 커널과 호환되어야 합니다. 경험상 일반적으로 GCC 버전이 *BeagleBone Blue*의 OS 이미지와 함께 제공되는 GCC 버전보다 높지 않은 도구 모음을 선택합니다.
:::
            
            [gcc-linaro-7.5.0-2019.12-x86_64_arm-linux-gnueabihf](https://releases.linaro.org/components/toolchain/binaries/latest-7/arm-linux-gnueabihf/gcc-linaro-7.5.0-2019.12-x86_64_arm-linux-gnueabihf.tar.xz)를 bbblue_toolchain 폴더에 다운로드하고 압축을 해제합니다.
            
            *BeagleBone Blue*를위한 다양한 ARM 크로스 컴파일러 버전은 [Linaro Toolchain Binaries 사이트](http://www.linaro.org/downloads/)에서 찾을 수 있습니다.
            
:::tip
도구 모음의 GCC 버전은 *BeagleBone Blue* 커널과 호환되어야 합니다.
:::
            
            경험상 일반적으로 GCC 버전이 *BeagleBone Blue*의 OS 이미지와 함께 제공되는 GCC 버전보다 높지 않은 도구 모음을 선택합니다.
        
        2. 아래와 같이 ~/.profile의 PATH에 추가합니다
            
            ```sh
            export PATH=$PATH:/opt/bbblue_toolchain/gcc-arm-linux-gnueabihf/gcc-linaro-6.3.1-2017.05-x86_64_arm-linux-gnueabihf/bin
            ```
            
:::note
로그 아웃후 다시 로그인하여 변경 사항을 적용하거나 현재 셸에서 동일한 줄을 실행합니다.
:::
            
            [개발 환경 설정](../dev_setup/dev_env_linux_ubuntu.md) 지침을 따릅니다.
            
            설정과 일치하도록 업로드 대상을 편집해야 할 수 있습니다.
            
                nano PX4-Autopilot/boards/beaglebone/blue/cmake/upload.cmake
                
                #in row 37 change debian@beaglebone.lan --> root@beaglebone (or root@<IP>)
                

### 교차 컴파일 및 업로드

컴파일 및 업로드

    make beaglebone_blue_default upload
    

:::note
업로드하지 않으면, 파일이 로컬 빌드 폴더에 저장됩니다.
:::

업로드한 파일을 테스트하려면 *BeagleBone Blue* 보드에서 다음 명령을 실행합니다.

```sh
cd /home/debian/px4 
sudo ./bin/px4 -s px4.config 
```

:::note
현재 *librobotcontrol*에는 루트 권한이 필요합니다.
:::

<span id="native_builds"></span>

## 네이티브 빌드(선택 사항)

BeagleBone Blue에서 직접 PX4를 빌드할 수 있습니다.

사전 구축된 라이브러리를 설치후

1. *librobotcontrol* 설치 디렉터리를 선택하고, 원하지 않는 다른 헤더가 포함되지 않도록 `LIBROBOTCONTROL_INSTALL_DIR` 환경변수를 설정합니다.
2. **robotcontrol.h** 및 **rc/\***를 `$LIBROBOTCONTROL_INSTALL_DIR/include` 폴더에 설치합니다.
3. 사전 빌드된 기본 (ARM) 버전의 librobotcontrol.\ *을 `$LIBROBOTCONTROL_INSTALL_DIR/lib` 폴더에 설치합니다.

BeagleBone Blue에서 다음 명령을 실행합니다 (예 : SSH를 통해).

1. 종속성 설치: 
        sh
        sudo apt-get update
        sudo apt-get install cmake python-empy

2. PX4 펌웨어를 BeagleBone Blue에 복제합니다.
3. [표준 빌드 시스템 설치](../dev_setup/dev_env_linux.md)를 계속 진행합니다.

## 설정 변경

모든 변경은 beaglebone의 px4.config 파일에서 직접 수행할 수 있습니다. 예를 들어 WIFI를 wlan으로 변경할 수 있습니다.

:::note
영구적으로 변경하려면, 빌드전에 빌드 머신에서 **PX4-Autopilot/posix-configs/bbblue/px4.config**를 변경하여야 합니다.
:::

## 부팅 중 자동 시작

다음은 [/etc/rc.local] 예제입니다.

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

다음은 *systemd* 서비스 예제입니다. [/lib/systemd/system/px4-quad-copter.service] :

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

### 기타

#### 파워 서보 레일

PX4가 시작되면 자동으로 서보에 전원을 공급합니다.

#### 독특한 기능

BeagleBone Blue에는 다양한 WiFi 인터페이스와 전원 소스와 같은 몇 가지 고유한 기능이 있습니다. 이러한 기능을 사용하려면 **/home/debian/px4/px4.config**의 주석을 참고하십시오.

#### SBUS 신호 변환기

수신기의 SBUS 신호(예: FrSky X8R)는 반전된 신호입니다. BeagleBone Blue의 UART는 반전되지 않은 3.3V 레벨 신호에서만 작동할 수 있습니다. 이 [자습서](../tutorials/linux_sbus.md)에는 SBUS 신호 인버터 회로가 포함되어 있습니다.

#### 일반적인 연결

GPS와 SBUS 수신기가 있는 쿼드콥터의 경우의 일반적인 연결은 다음과 같습니다.

1. 비글본 블루에서 모터 1, 2, 3 및 4의 ESC를 서보 출력의 채널 1, 2, 3 및 4에 연결합니다. 비글본 블루에서 ESC 커넥터에 전원 출력이 포함되어 있는 경우 핀, 제거 및 서보 채널의 전원 출력 핀에 연결하지 마십시오. 

2. dsm2와 일치하는 커넥터가있는 경우 위에서 언급한 변환된 SBUS 신호를 dsm2 포트에 연결하고, 그렇지 않으면 사용 가능한 다른 UART 포트에 연결하고 **/home/debian/px4/px4.config**에서 해당 포트를 변경합니다.

3. GPS 모듈의 신호를 비글본 블루의 GPS 포트에 연결합니다 BeagleBone Blue에있는 GPS 포트의 신호 핀은 3.3V만 허용하므로 이에 적합한 GPS 모듈을 선택하십시오.