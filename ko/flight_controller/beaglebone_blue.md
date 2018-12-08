# 비글본 블루

[ BeagleBone Blue ](https://beagleboard.org/blue)은 일체형 Linux 기반 시스템입니다. 로봇 공학용으로 최적화되었지만, 작고 저렴한 이 보드에는 비행 조종사가 필요로 하는 모든 필요한 센서와 주변 장치가 있습니다. 이 항목에서는 [librobotcontrol ](https://github.com/StrawsonDesign/librobotcontrol) 로보틱 패키지로 PX4를 실행하도록 보드를 설정하는 방법을 설명합니다.

![비글본 - 라벨로 표시된 다이어그램](../../assets/hardware/BeagleBone_Blue_balloons.png)

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

(작성 시) *librobotcontrol *이 제대로 작동하는 최신 OS 이미지는 bone-deven-9.5-diphf-2018-07-22-4b입니다.</p> 

### 로봇 제어 라이브러리 설정

PX4를 빌드하려면 이 라이브러리에 대한 추가 설정 단계가 있습니다.

작성 시 크로스 컴파일 지원을 추가하기 위해 빌드 파일을 수정하지 않고, *librobotcontrol * disian 패키지는 BeagleBone Blue를 포함한 BeagleBoard 제품에서만 사용할 수 있습니다. 다음은 BeagleBone Blue에서 *librobotcontrol *을 얻는 방법입니다.

1. BeagleBoard 영상에 사전 설치된 하나를 사용합니다.
2. debian 패키지 또는 저장소에서 설치: 
        sh
        sudo 적합한 업데이트 및 sudo 적절한 설치 librobotcontrol

3. 원본에서 설치 
        sh
        Git 복제본 https://github.com/StrawsonDesign/librobotcontrol.git
        cd librobotcontrol
        수도를 설치하다

사전 작성된 라이브러리를 구입한 후

1. *librobot control * 설치 디렉토리를 선택한 후 원치 않는 다른 헤더가 되지 않도록 >LIBROBOTCONTALL_DIR </code> 환경 변수에 설정하십시오
2. **robotcontrol.h ** 및 **rc/\* **을 `$LIBROBOCONTAL_DIR/블록에 설치합니다.</li>
<li>ARM(사전 빌드 네이티브) 버전의 librobotcontrol을 설치합니다.\* <code>$LIBROBOTCONTONTROL_INSTALL_DIR/lib `

이 시점에서 BeagleBone Blue 목표는 크로스 컴파일 호스트 시스템과 네이티브 빌드 시스템 모두에 구축될 수 있습니다.

```sh
make beaglebone_blue_cross [upload]
```

## 교차 컴파일러 빌드

* BeagleBone Blue *에 대해 PX4를 구축하는 권장 방법은 개발 컴퓨터에서 컴파일하여 PX4 실행 가능한 이진 파일을 BeagleBone Blue에 직접 업로드하는 것입니다.

> **Tip ** 이 접근 방식은 구현 속도와 사용 편의성 때문에 [ 네이티브 빌드 ](#native_builds)보다 더 권장됩니다.

### 크로스 컴파일러 설정

* 비글본 블루 *용 ARM 크로스 컴파일러는 [ 리나로 툴체인 바이너리 사이트 ](http://www.linaro.org/downloads/)에서 찾을 수 있습니다. 다음은 개발 호스트에 대한 설정 예입니다.

1. 먼저 툴체인을 */opt/bblue_toolchain/gcc-arm-linux-gnuavihf *에 설치한다. 다음은 소프트 링크를 사용하여 사용할 툴체인의 버전을 선택하는 예입니다.
    
    ```sh
    
    ...@ubuntu:/opt/bblue_toolchain$ ls -l
     lrwxwxrwx 1 루트 51 Mal 22:10 gcc-arm-gnueabihf -> gcc-linaro-6.3.1-2017.05-x86
     drwxr-x-x 8 루트 4096 2017년 5월 17일 gcc-laro-6.3.1-2017.05-x86_64_arm-linux-gnueabihihf
     drwxr-x 8 루트 4096 11월 19일 03:51 gcc-laro-6.4.1-2017.11-x86_64_arm-linuauyhihf
    
    
    
    
    타겟 TTS
    
    
    
    
    복사하기
    
    
    
    
    
    
    
    번역 저장번역 저장
    
    
    ```

2. 아래와 같이 ~/.profile의 PATH에 추가합니다
    
    ```sh
    PATH=$PATH 내보내기:/opt/bblue_toolchain/gcc-arm-linux-gnueabihf/bin
    내보내기CrossCompiler=/opt/bblue_toolchain/gcc-arm-neguabihf/bin/arm-linlux-gnweabihihf
    ```

> 툴체인의 **Tip ** GCC는 * BeagleBone Blue *의 커널과 호환되어야 한다. 일반적으로 엄지의 규칙은 툴체인을 선택하는 것이다. 여기서 GCC의 버전이 * 비글본 블루 *의 OS 이미지와 함께 제공되는 GCC 버전보다 높지 않습니다.

### 교차 컴파일 및 업로드

1. 먼저 *rsync *을 설정합니다(이 설정은 네트워크 - WiFi 또는 이더넷을 통해 개발 컴퓨터에서 대상 보드로 파일을 전송하는 데 사용됩니다). 
    - 키 인증을 사용하는 SSH 상의 *rsync *의 경우 [ 래스베리 파이/나비오 ](../flight_controller/raspberry_pi_navio2.md)과 유사한 단계를 수행하십시오.
    - 개발 컴퓨터에서 BeagleBone Blue 보드를 **/etc/hosts **의 `BBBBluePX4 `으로 정의합니다.
2. 다음 명령을 실행하여 파일을 만들고 업로드합니다. 
        sh
        make beaglebone_blue_cross upload

업로드한 파일을 테스트하려면 * BeagleBone Blue * 보드에서 다음 명령을 실행합니다.

```sh
cd /home/dbian/px4 
sudo ./bin/px4 -s px4.config 
```

> ** 노트 ** 현재 *librobotcontrol *은(는) 루트 액세스 필요

## 기본 빌드(옵션) {#native_builds}

또한 기본적으로 BeagleBone Blue에 PX4 빌드를 직접 작성할 수도 있습니다.

BeagleBone Blue(즉, SSH를 통해)에서 다음 명령을 실행합니다.

1. 설치 종속성: 
        sh
        쉽게 얻을 수 있는 업데이트
        sudo file-get install cmake python-empy

2. PX4 펌웨어를 BeagleBone Blue에 직접 복제합니다.
3. [ 표준 빌드 시스템 설치 ](https://dev.px4.io/en/setup/dev_env_linux.html)로 계속하십시오.

## 부팅 중 자동 시작

다음은 [/etc/rc.local]의 예입니다.

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

다음은 *systemd * 서비스 예[/lib/systemd/system/px4-quad-copter.service]입니다.

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

PX4가 시작되면 자동으로 서보에 전원을 공급합니다.

#### 언닉 피어스

BeagleBone Blue는 WiFi 인터페이스의 여러 가지 고유한 기능을 가지고 있습니다. 다음에 대한 사용 방법은 **/home/debian/px4/px4.config **의 설명을 참조하십시오.

#### SBUS 신호 변환기

수신기의 SBUS 신호(예: FrSky X8R)는 반전된 신호입니다. BeagleBone Blue의 UART는 반전되지 않은 3.3V 레벨 신호에서만 작동할 수 있습니다. 본 자습서 </a>에는 SBUS 신호 인버터 회로

#### 일반적인 연결

GPS와 SBUS 수신기가 장착된 쿼드콥터의 경우, 다음은 일반적인 연결입니다

1. 모터 1, 2, 3 및 4의 ESC를 서보 출력의 채널 1, 2, 3 및 4에 연결합니다. 비글본 블루에서요 ESC 커넥터에 전원 출력이 포함되어 있는 경우 핀, 제거 및 서보 채널의 전원 출력 핀에 연결하지 마십시오. 비글본 블루에서요

2. 위에 언급한 변환된 SBUS 신호를 dsm2 포트에 연결합니다(있는 경우). dsm2용 일치 커넥터. 그렇지 않으면 사용 가능한 다른 커넥터에 연결합니다. UART 포트 및 해당 포트를 **/home/d//px4/px4.config **에서 변경합니다. 따라서 

3. GPS 모듈의 신호를 비글본 블루의 GPS 포트에 연결합니다 메모 BeagleBone Blue에 있는 GPS 포트의 신호 핀은 3.3밖에 되지 않습니다.v 따라서 GPS 모듈을 선택하십시오.