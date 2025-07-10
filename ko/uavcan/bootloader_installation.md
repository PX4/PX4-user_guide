---
canonicalUrl: https://docs.px4.io/main/ko/uavcan/bootloader_installation
---

# UAVCAN 부트로더 설치

:::warning UAVCAN
장치는 보통 부트로더를 미리 심어넣은 상태로 나옵니다. UAVCAN 장치를 직접 개발할 의도가 아니라면 이 절의 절차는 따르지 마십시오.
:::

## 개요

PX4 프로젝트에서는 STM32 장치용 표준 UAVCAN 부트로더를 다룹니다.

부트로더는 처음 8~16KB 플래시 메모리 영역을 차지하며, 처음 코드는 전원을 켰을 때 실행합니다. 보통 부트로더는 저수준 장치 초기화, CAN 버스 전송률 자동 결정, 고유 노드 ID 획득을 위한 UAVCAN 동적 노드 ID 클라이언트 동작, 프로그램 부팅 진행 전 비행체 제어 장치 응답 확인 과정을 수행합니다.

이 과정에서는 사용자의 개입 없이 UAVCAN 장치를 잘못된, 프로그램이 손상된 펌웨어 상태로부터 복원할 수 있으며, 자동 펌웨어 업데이트를 수행합니다.

## 준비 요건

UAVCAN 부트로더 설치 및 업데이트는 다음 과정이 필요합니다:

* SWD 또는 JTAG 인터페이스(장치에 따라 다름). 예:[블랙매직 프루브](https://github.com/blacksphere/blackmagic/wiki) 또는 [ST-Link v2](http://www.st.com/internet/evalboard/product/251168.jsp).
* 어댑터 케이블로 SWD 또는 JTAG 인터페이스에서 UAVCAN 장치 디버깅 포트로 연결하십시오.
* [지원하는 ARM 툴체인 목록은 이와 같습니다](../dev_setup/dev_env.md).

## 장치 준비

아래 명령으로 장치에 연결할 수 없을 경우, 장치의 펌웨어에서 MCU의 디버깅 핀을 막아두었을 수 있습니다. 이 상황을 해결하려면, 인터페이스의 NRST핀 또는 nSRST핀(표준 ARM 20핀 커넥터의 15번째 핀)을 MCU의 NRST 핀에 연결해야합니다. 자세한 내용은 장치 구성도와 PCB 배치도를 확보하거나 제조사에 연락해보십시오.

## 설치

이 진행 과정은 SWE 또는 JTAG 사용 인터페이스에 따라 다릅니다.

블랙매직 프루브의 [펌웨어가 최신](https://github.com/blacksphere/blackmagic/wiki/Hacking)인지 확인하십시오.

## 블랙매직 프루브

BlackMagic Probe의 [펌웨어가 최신](https://github.com/blacksphere/blackmagic/wiki/Hacking)인지 확인하십시오.

프루브를 UAVCAN 장치에  연결하고, 컴퓨터에도 연결하십시오.

프루브 장치 이름을 확인하십시오. 보통 `/dev/ttyACM<x>` 또는 `/dev/ttyUSB<x>`입니다.

UAVCAN 장치의 전원을 켜고 다음 명령을 실행하십시오:

```sh
arm-none-eabi-gdb /path/to/your/bootloader/image.elf
```

`monitor swdp_scan` 명령에서 오류가 나타났을 경우 결선을 제대로 했는지, 블랙매직 펌웨어가 최신인지 확인하십시오.

```sh
target extended /dev/ttyACM0
monitor connect_srst enable
monitor swdp_scan
attach 1
set mem inaccessible-by-default off
load
run
```

[OpenOCD](http://openocd.org) 버전이 최소한 0.9.0의 최근 버전인지 확인하십시오.

## ST-Link v2

ST-Link 를 UAVCAN 장치에 연결하고, 컴퓨터에도 연결하십시오.

UAVCAN 장치의 전원을 켜고 다음 명령을 실행하십시오:

`gdb` 프롬프트에서 다음 명령을 실행하십시오:

```sh
openocd -f /path/to/your/openocd.cfg &
arm-none-eabi-gdb /path/to/your/bootloader/image.elf
```

JLink 디버거를 UAVCAN 장치에 연결하고 JLink 디버거를 컴퓨터에 연결하십시오.

```sh
target extended-remote localhost:3333
monitor reset halt
set mem inaccessible-by-default off
load
run
```

## Segger J-Link 디버거

UAVCAN 장치의 전원을 켜고 다음 명령을 실행하십시오:

두번째 터미널을 열어 px4esc_1_6-bootloader.elf 파일이 들어있는 디렉터리를 찾아 다음 명령을 실행하십시오:

```
JLinkGDBServer -select USB=0 -device STM32F446RE -if SWD-DP -speed 20000 -vd
```

`gdb` 프롬프트에서 다음 명령을 실행하십시오:

```
arm-none-eabi-gdb px4esc_1_6-bootloader.elf
```

`gdb` 프롬프트에서 다음 명령을 실행하십시오:

```
tar ext :2331
load
```

## SEGGER JLink 디버거로 플래시 소거

복구 방안으로 플래시를 공장 초기 상태로 소거할 쓸만한 방안이 있으며 이 경우 펌웨어는 기본 매개변수 값을 활용합니다. SEGGER 설치 디렉터리로 이동하고 JLinkExe 프로그램을 가동한 후 다음 명령을 실행하십시오:

```
device <name-of-device>
erase
```

`<name-of-device>`을 STM32F446RE for the Pixhawk ESC 1.6 또는 STM32F302K8 for the SV2470VC ESC와 같은 마이크로컨트롤러 이름으로 바꾸십시오.