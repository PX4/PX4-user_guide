# UAVCAN 부트로더 설치

:::warning
UAVCAN devices typically ship with a bootloader pre-installed. Do not follow the instructions in this section unless you are developing UAVCAN devices.
:::

## 개요

The PX4 project includes a standard UAVCAN bootloader for STM32 devices.

The bootloader occupies the first 8–16 KB of flash, and is the first code executed on power-up. Typically, the bootloader performs low-level device initialization, automatically determines the CAN bus baud rate, acts as a UAVCAN dynamic node ID client to obtain a unique node ID, and waits for confirmation from the flight controller before proceeding with application boot.

UAVCAN 부트로더 설치 및 업데이트는 다음 과정이 필요합니다:

## 준비사항

Installing or updating the UAVCAN bootloader requires:

* SWD 또는 JTAG 인터페이스(장치에 따라 다름). 예:[블랙매직 프루브](https://github.com/blacksphere/blackmagic/wiki) 또는 [ST-Link v2](http://www.st.com/internet/evalboard/product/251168.jsp).
* 어댑터 케이블로 SWD 또는 JTAG 인터페이스에서 UAVCAN 장치 디버깅 포트로 연결하십시오.
* [지원하는 ARM 툴체인 목록은 이와 같습니다](../dev_setup/dev_env.md).

## 장치 준비

If you are unable to connect to your device using the instructions below, it's possible that firmware already on the device has disabled the MCU's debug pins. To recover from this, you will need to connect your interface's NRST or nSRST pin (pin 15 on the standard ARM 20-pin connector) to your MCU's NRST pin. Obtain your device schematics and PCB layout or contact the manufacturer for details.

## 설치

이 진행 과정은 SWE 또는 JTAG 사용 인터페이스에 따라 다릅니다.

블랙매직 프루브의 [펌웨어가 최신](https://github.com/blacksphere/blackmagic/wiki/Hacking)인지 확인하십시오.

## 블랙매직 프루브

프루브를 UAVCAN 장치에  연결하고, 컴퓨터에도 연결하십시오.

Connect the probe to your UAVCAN device, and connect the probe to your computer.

Identify the probe's device name. This will typically be `/dev/ttyACM<x>` or `/dev/ttyUSB<x>`.

`gdb` 프롬프트에서 다음 명령을 실행하십시오:

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

At the `gdb` prompt, run:

```
tar ext :2331
load
```

## SEGGER JLink 디버거로 플래시 소거

As a recovery method it may be useful to erase flash to factory defaults such that the firmware is using the default parameters. Go to the directory of your SEGGER installation and launch JLinkExe, then run:

```
device <name-of-device>
erase
```

Replace `<name-of-device>` with the name of the microcontroller, e.g. STM32F446RE for the Pixhawk ESC 1.6 or STM32F302K8 for the SV2470VC ESC.