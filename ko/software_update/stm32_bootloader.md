---
canonicalUrl: https://docs.px4.io/main/ko/software_update/stm32_bootloader
---

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

아래 지침은 Blackmagic/Dronecode 프로브에 유효합니다. 다른 JTAG 프로브에는 유사한 단계가 필요합니다. 부트로더를 플래싱하는 개발자는 필요한 지식을 숙지하여야 합니다. 이 작업을 수행하는 방법을 모르는 경우에는 부트로더에 변경해야 할 사항이 있는지를 다 시 살펴보십시오.

순서는 다음과 같습니다.
1. JTAG 케이블 연결 제거
1. USB 전원 케이블 연결
1. JTAG 케이블 연결

### 블랙 매직 / 드론코드 프로브

#### 올바른 직렬 포트 사용

* 리눅스: `/dev/serial/by-id/usb-Black_Sphere_XXX-if00`
* MAC OS: tty.xxx 포트가 아닌 cu.xxx 포트를 사용합니다. `tar ext /dev/tty.usbmodemDDEasdf`

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

이 지침은 [J-Link GDB 서버](https://www.segger.com/jlink-gdb-server.html)에 관한 것입니다.

#### 준비 사항

Segger 웹사이트에서 [J-Link 소프트웨어를 다운로드](https://www.segger.com/downloads/jlink)하고, 지침에 따라 설치합니다.

#### JLink GDB 서버 실행

아래 명령어는 STM32F427VI SoC를 사용하는 비행 콘트롤러용 서버를 실행합니다.

```bash
JLinkGDBServer -select USB=0 -device STM32F427VI -if SWD-DP -speed 20000
```

공통 대상에 대한 `--device`/SoC는 다음과 같습니다.

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

위의 명령 중 하나라도 찾을 수 없다면, Blackmagic 프로브를 사용하지 않거나 소프트웨어가 오래된 것입니다. 온 프로브 소프트웨어를 먼저 업그레이드하십시오.

이 오류 메시지가 발생하는 경우:
```
Error erasing flash with vFlashErase packet
```

대상을 분리하고(JTAG가 연결된 상태에서), 다음 명령어를 실행합니다.

```bash
mon tpwr disable
swdp_scan
attach 1
load tapv1_bl.elf
```
이렇게 하면 대상 전원이 비활성화되고, 플래시를 재시도 할 수 있습니다.
