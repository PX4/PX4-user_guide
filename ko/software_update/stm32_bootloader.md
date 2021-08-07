# STM32 부트로더

PX4 부트로더용 코드는 Github [Bootloader](https://github.com/px4/bootloader) 저장소에서 제공합니다.

## 지원 보드

* FMUv2 (픽스호크 1, STM32F4)
* FMUv3 (픽스호크 2, STM32F4)
* FMUv4 (픽스레이서 3와 픽스호크 3 프로, STM32F4)
* FMUv5 (픽스호크 4, STM32F7)
* TAPv1 (TBA, STM32F4)
* ASCv1 (TBA, STM32F4)

## 부트로더 빌드

```bash
git clone https://github.com/PX4/Bootloader.git
cd Bootloader
git submodule init
git submodule update
make
```

위 과정을 거치면 Bootloader 디렉터리에서 지원하는 보드의 elf 파일을 생성합니다.

## 부트로더 플래싱

:::warning
일부 보드에서는 올바른 전원 시퀀스는 JTAG/SWD 액세스 과정에서 필수적입니다. 설명된 대로 정확히 다음 단계를 따르십시오. 부트로더를 플래싱하는 개발자는 필요한 지식을 숙지해야 합니다.

아래 지침은 Blackmagic/Dronecode 프로브에 유효합니다. 다른 JTAG 프로브에는 유사한 단계가 필요합니다. 부트로더를 플래싱하는 개발자는 필요한 지식을 숙지하여야 합니다. If you do not know how to do this you probably should reconsider if you really need to change anything about the bootloader.

[J-Link GDB 서버](https://www.segger.com/jlink-gdb-server.html) 관련 절차입니다.
1. JTAG 케이블 연결 제거
1. USB 전원 케이블 연결
1. JTAG 케이블 연결

### 블랙 매직 / 드론코드 프로브

#### 올바른 시리얼 포트 사용

* LINUX: `/dev/serial/by-id/usb-Black_Sphere_XXX-if00`
* MAC OS: tty.xxx 포트가 아닌 cu.xxx 포트를 사용하는지 확인하십시오: `tar ext /dev/tty.usbmodemDDEasdf`

```bash
arm-none-eabi-gdb
  (gdb) tar ext /dev/serial/by-id/usb-Black_Sphere_XXX-if00
  (gdb) mon swdp_scan
  (gdb) attach 1
  (gdb) mon option erase
  (gdb) mon erase_mass
  (gdb) load tapv1_bl.elf
        ...
        Transfer rate: 17 KB/sec, 828 bytes/write.
  (gdb) kill
```

### J-Link

Segger 웹사이트의 [Download the J-Link software](https://www.segger.com/downloads/jlink)의 안내사항을 따라 다운로드 및 설치를 수행하십시오.

#### 준비 요건

다음 명령어는 STM32F427VI SoC 기반의 비행 제어 장치용 서버를 실행합니다:

#### JLink GDB 서버 실행

일반 대ㅇ의 `--device`/SoC 옵션은 다음과 같습니다:

```bash
JLinkGDBServer -select USB=0 -device STM32F427VI -if SWD-DP -speed 20000
```

The `--device`/SoC for common targets is:

* **FMUv2, FMUv3, FMUv4, aerofc-v1, mindpx-v2:** STM32F427VI
* **px4_fmu-v4pro:** STM32F469II
* **px4_fmu-v5:** STM32F765II
* **crazyflie:** STM32F405RG


#### GDB 연결

```bash
arm-none-eabi-gdb
  (gdb) tar ext :2331
  (gdb) load aerofcv1_bl.elf
```

### 문제 해결

If any of the commands above are not found, you are either not using a Blackmagic probe or its software is outdated. Upgrade the on-probe software first.

타겟의 연결을 끊고(JTAG 연결은 유지한 채로) 다음 명령을 실행하십시오:
```
Error erasing flash with vFlashErase packet
```

이 절차는 타겟의 전원을 끊고 플래싱 과정을 다시 시도합니다.

```bash
mon tpwr disable
swdp_scan
attach 1
load tapv1_bl.elf
```
This will disable target powering and attempt another flash cycle.
