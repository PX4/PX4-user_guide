---
canonicalUrl: https://docs.px4.io/main/ko/uavcan/bootloader_installation
---

# UAVCAN 부트로더 설치

:::warning
UAVCAN 장치는 일반적으로 부트로더가 설치되어 판매됩니다.
UAVCAN 장치를 개발하지 않는다면, 이 섹션의 설명들을 참고하지 마십시오.
:::

## 개요

PX4에는 STM32 표준 UAVCAN 부트로더가 포함되어 있습니다.

부트로더는 플래시의 처음 8-16KB를 차지하며, 전원을 켤 때 실행되는 첫 번째 코드입니다. 일반적으로 부트로더는 저수준의 장치 초기화 수행, CAN 버스 전송 속도 결정, 그리고 UAVCAN 동적 노드 ID 클라이언트로 작동하여 고유한 노드 ID를 얻고, 응용 프로그램 부팅을 진행하기 전에 비행 콘트롤러의 확인을 기다립니다.

이 프로세스는 UAVCAN 장치가 사용자 개입 없이 유효하지 않거나 손상된 응용 프로그램 펌웨어에서 복구하고, 자동 펌웨어 업데이트도 허용합니다.

## 전제 조건

UAVCAN 부트로더 설치와 업데이트에는 다음 과정이 필요합니다:

* SWD 또는 JTAG 인터페이스(기기에 따라 다름)(예: [BlackMagic Probe](https://github.com/blacksphere/blackmagic/wiki) 또는 [ST-Link v2](http://www.st.com/internet/evalboard/product/251168.jsp))
* SWD 또는 JTAG 인터페이스를 UAVCAN 장치의 디버깅 포트에 연결하는 어댑터 케이블
* [호환 ARM 도구 모음](../dev_setup/dev_env.md).

## 장치 준비

아래 지침을 사용하여 장치에 연결할 수 없으면, 장치에 이미 있는 펌웨어가 MCU의 디버그 핀을 비활성화되어 있을 수 있습니다. 이를 복구하려면, 인터페이스의 NRST 또는 nSRST 핀(표준 ARM 20핀 커넥터의 핀 15)을 MCU의 NRST 핀에 연결하여야 합니다. 장치 회로도 및 PCB 레이아웃을 얻거나, 자세한 내용을 제조업체에 문의하십시오.

## 설치

장치의 부트로더 이미지를 컴파일하거나, 가져온 후(자세한 내용은 장치 설명서 참조) 부트로더를 장치의 플래시 메모리 시작 부분에 복사하여야 합니다.

이를 수행하는 프로세스는 사용된 SWD 또는 JTAG 인터페이스에 따라 차이가 납니다.

## BlackMagic Probe

BlackMagic Probe [펌웨어가 최신 버전](https://github.com/blacksphere/blackmagic/wiki/Hacking)인지 확인하십시오.

프로브를 UAVCAN 장치에 연결하고, 프로브를 컴퓨터에 연결합니다.

프루브 장치 이름을 확인하십시오. 장치명은 보통 `/dev/ttyACM<x>` 또는 `/dev/ttyUSB<x>`입니다.

UAVCAN 장치를 켜고, 다음 명령을 실행하십시오:

```sh
arm-none-eabi-gdb /path/to/your/bootloader/image.elf
```

`gdb` 프롬프트에서 다음을 실행합니다.

```sh
target extended /dev/ttyACM0
monitor connect_srst enable
monitor swdp_scan
attach 1
set mem inaccessible-by-default off
load
run
```

`monitor swdp_scan`이 오류를 반환하면, 배선이 올바르고 BlackMagic 펌웨어의 최신 버전이 있는 지 확인하십시오.

## ST-Link v2

[OpenOCD](http://openocd.org)의 최신 버전(최소 0.9.0)이 있는지 확인하십시오.

ST-Link를 UAVCAN 장치에 연결하고, ST-Link를 컴퓨터에 연결합니다.

UAVCAN 장치를 켜고, 다음 명령을 실행하십시오:

```sh
openocd -f /path/to/your/openocd.cfg &
arm-none-eabi-gdb /path/to/your/bootloader/image.elf
```

`gdb` 프롬프트에서 다음을 실행합니다.

```sh
target extended-remote localhost:3333
monitor reset halt
set mem inaccessible-by-default off
load
run
```

## Segger J-Link 디버거

JLink 디버거를 UAVCAN 장치에 연결하고, JLink 디버거를 컴퓨터에 연결합니다.

UAVCAN 장치를 켜고, 다음 명령을 실행하십시오:

```
JLinkGDBServer -select USB=0 -device STM32F446RE -if SWD-DP -speed 20000 -vd
```

두 번째 터미널을 열고, esc용 px4esc_1_6-bootloader.elf가 포함된 디렉토리로 이동하여 다음을 실행합니다.

```
arm-none-eabi-gdb px4esc_1_6-bootloader.elf
```

`gdb` 프롬프트에서 다음을 실행합니다.

```
tar ext :2331
load
```

## SEGGER JLink 디버거로 플래시 지우기

복구 방법으로 펌웨어가 기본 매개변수를 사용하도록 플래시를 공장 기본값으로 지우는 것이 간단한 방법입니다. SEGGER 설치 디렉터리로 이동하여 JLinkExe를 시작한 다음 다음을 실행합니다.

```
device <name-of-device>
erase
```

`<name-of-device>`을 STM32F446RE for the Pixhawk ESC 1.6 또는 STM32F302K8 for the SV2470VC ESC와 같은 마이크로컨트롤러 이름으로 변경하십시오.