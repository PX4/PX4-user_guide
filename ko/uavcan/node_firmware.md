# UAVCAN 펌웨어 업그레이드

PX4는 UAVCAN 노드의 일치하는 펌웨어가 있으면, 펌웨어를 자동으로 업그레이드합니다.

:::warning UAVCAN
장치는 일반적으로 적절한 펌웨어가 사전 설치된 상태로 판매됩니다. 이러한 지침은 UAVCAN 장치를 개발할 때 주로 필요합니다.
:::

## Vectorcontrol ESC 코드 베이스 (Pixhawk ESC  1.6과 S2740VC)

ESC 코드를 다운로드합니다:

```sh
git clone https://github.com/thiemar/vectorcontrol
cd vectorcontrol
```

### UAVCAN 부트로더 플래싱

UAVCAN로 펌웨어를 업데이트하기 전에, Pixhawk ESC 1.6은 UAVCAN 부트로더를 플래시하여야 합니다. 부트로더를 빌드하가 위하여, 다음 명령어를 실행하십시오.

```sh
make clean && BOARD=px4esc_1_6 make -j8
```

빌드 후 부트로더 이미지는 `firmware/px4esc_1_6-bootloader.bin`에 있으며 OpenOCD 구성은 `openocd_px4esc_1_6.cfg`에 있습니다. [이 지침](../uavcan/bootloader_installation.md)에 따라 ESC에 부트로더를 설치합니다.

### 메인 바이너리 컴파일

```sh
BOARD=s2740vc_1_0 make && BOARD=px4esc_1_6 make
```

이렇게 하면 지원되는 두 ESC 모두에 대해 UAVCAN 노드 펌웨어가 빌드됩니다. 펌웨어 이미지는 `com.thiemar.s2740vc-v1-1.0-1.0.<git hash>.bin` 및 `org.pixhawk.px4esc-v1-1.6-1.0.<git hash>.binn`에 있습니다.

## Sapog 코드 베이스 (Pixhawk ESC 1.4와 Zubax Orel 20)

Sapog 코드 베이스를 다운로드하십시오:

```sh
git clone https://github.com/PX4/sapog
cd sapog
git submodule update --init --recursive
```

### UAVCAN 부트로더 플래싱

UAVCAN로 펌웨어를 업데이트하기 전에, ESC는 UAVCAN 부트로더를 플래시하여야 합니다. 부트로더는 다음과 같이 빌드할 수 있습니다.

```sh
cd bootloader
make clean && make -j8
cd ..
```

부트로더 이미지는 `bootloader/firmware/bootloader.bin`에 있으며 OpenOCD 구성은 `openocd.cfg`에 있습니다. [이 지침](../uavcan/bootloader_installation.md)에 따라 ESC에 부트로더를 설치합니다.

### 메인 바이너리 컴파일

```sh
cd firmware
make RELEASE=1 # RELEASE is optional; omit to build the debug version
```

GCC의 일부 최신 버전은 연결하는 동안 segfaults로 이어집니다. 이 문서 작성시에는 버전 4.9는 작동하였습니다. 펌웨어 이미지는 `firmware/build/io.px4.sapog-1.1-1.7.<xxxxxxxx>.application.bin`에 위치합니다. 여기서 `<xxxxxxxx>`는 임의의 숫자와 문자 시퀀스입니다. Zubax Orel 20의 두 가지 하드웨어 버전(1.0 및 1.1)이 있습니다. 다음 설명에서 바이너리를 올바른 폴더에 복사하였는지 확인하십시오. ESC 펌웨어는 하드웨어 버전을 확인하고 두 제품 모두에서 작동합니다.

## Zubax GNSS

펌웨어 빌드 및 플래시 방법은 [프로젝트 페이지](https://github.com/Zubax/zubax_gnss)를 참조하세요. Zubax GNSS는 UAVCAN 지원 부트로더와 함께 제공되므로, 펌웨어는 아래 설명된 대로 UAVCAN을 통해 균일한 방식으로 업데이트할 수 있습니다.

## 자동조종장치 펌웨어 설치

UAVCAN 노드 파일 이름은 제조업체에 관계없이 Pixhawk가 네트워크의 모든 UAVCAN 장치를 업데이트를 위한 명명 규칙을 따릅니다. 따라서 위 단계에서 생성된 펌웨어 파일은 장치를 업데이트하려면 SD 카드 또는 PX4 ROMFS의 올바른 위치에 복사해야 합니다.

펌웨어 이미지 명명 규칙은 다음과 같습니다.

```
<uavcan name>-<hw version major>.<hw version minor>-<sw version major>.<sw version minor>.<version hash>.bin
```

예: `com.thiemar.s2740vc-v1-1.0-1.0.68e34de6.bin`

그러나, 공간/성능 제약으로 인하여(이름은 28자를 초과할 수 없음) UAVCAN 펌웨어 업데이터는 이러한 파일 이름을 분할하여 다음과 같은 디렉토리 구조에 저장합니다.

```
/fs/microsd/fw/<node name>/<hw version major>.<hw version minor>/<hw name>-<sw version major>.<sw version minor>.<git hash>.bin
```

예:
```
s2740vc-v1-1.0.68e34de6.bin 
/fs/microsd/fw/io.px4.sapog/1.1/sapog-1.7.87c7bc0.bin
```

ROMFS 기반 업데이터는 해당 패턴을 따르지만 파일 이름 앞에 `_`을 추가하므로 다음 위치에 펌웨어를 추가합니다.

```
/etc/uavcan/fw/<device name>/<hw version major>.<hw version minor>/_<hw name>-<sw version major>.<sw version minor>.<git hash>.bin
```

## PX4 ROMFS 바이너리 복사

PX4 플라이트 스택을 활용할 경우, '전원 설정' 절의 UAVCAN 기능을 켜고, UAVCAN 펌웨어 업그레이드를 시도하기 전에 시스템을 다시 부팅하십시오.

* S2740VC 전동 변속기: `ROMFS/px4fmu_common/uavcan/fw/com.thiemar.s2740vc-v1/1.0/_s2740vc-v1-1.0.<git hash>.bin`
* 픽스호크 전동 변속기 1.6: `ROMFS/px4fmu_common/uavcan/fw/org.pixhawk.px4esc-v1/1.6/_px4esc-v1-1.6.<git hash>.bin`
* Pixhawk 전동 변속기 1.4: `ROMFS/px4fmu_common/uavcan/fw/org.pixhawk.sapog-v1/1.4/_px4esc-v1-1.4.<git hash>.bin`
* Zubax GNSS v1: `ROMFS/px4fmu_common/uavcan/fw/com.zubax.gnss/1.0/gnss-1.0.<git has>.bin`
* Zubax GNSS v2: `ROMFS/px4fmu_common/uavcan/fw/com.zubax.gnss/2.0/gnss-2.0.<git has>.bin`

대신, UAVCAN 펌웨어 업그레이드를 다음 명령으로 직접 시작할 수 있습니다:

### 펌웨어 업그레이드 과정 시작


When using the PX4 Flight Stack, enable UAVCAN in the 'Power Config' section and reboot the system before attempting an UAVCAN firmware upgrade.


Alternatively UAVCAN firmware upgrading can be started manually on NSH via:

```sh
uavcan start
uavcan start fw
```
