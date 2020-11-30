# UAVCAN 펌웨어 업그레이드

## Vectorcontrol 전동 변속기 코드 베이스 (픽스호크 전동 변속기 1.6과 S2740VC)

전동 변속기 코드를 다운로드하십시오:

```sh
git clone https://github.com/thiemar/vectorcontrol
cd vectorcontrol
```

### UAVCAN 부트로더 플래싱

UAVCAN으로 펌웨어 업그레이드를 진행하기 전, 픽스호크 전동 변속기 1.6에 UAVCAN 부트로더를 플래싱해야합니다. 부트로더를 빌드하려면 다음 명령을 실행하십시오:

```sh
make clean && BOARD=px4esc_1_6 make -j8
```

빌드가 끝나면 부트로더 이미지는 `firmware/px4esc_1_6-bootloader.bin`에 들어가고, OpenOCD 설정은 `openocd_px4esc_1_6.cfg`에 들어갑니다. 전동 변속기 부트로더를 설치하려면 [이 절차](../uavcan/bootloader_installation.md)를 따르십시오.

### 주요 바이너리 컴파일

```sh
BOARD=s2740vc_1_0 make && BOARD=px4esc_1_6 make
```

이 명령은 지원하는 전동 변속기용 UAVCAN 노드 펌웨어를 빌드합니다. 펌웨어 이미지는 `com.thiemar.s2740vc-v1-1.0-1.0.<git hash>.bin`과 `org.pixhawk.px4esc-v1-1.6-1.0.<git hash>.bin`으로 들어갑니다.

## Sapog 코드 베이스 (픽스호크 전동 변속기 1.4와 Zubax Orel 20)

Sapog 코드 베이스를 다운로드하십시오:

```sh
git clone https://github.com/PX4/sapog
cd sapog
git submodule update --init --recursive
```

### UAVCAN 부트로더 플래싱

UAVCAN으로 펌웨어를 업데이트하기 전, 전동 변속기에 UAVCAN 부트로더를 플래싱해야합니다. 다음 명령어로 부트로더를 빌드할 수 있습니다:

```sh
cd bootloader
make clean && make -j8
cd ..
```

부트로더 이미지는 `bootloader/firmware/bootloader.bin`에 있고, OpenOCD 설정은 `openocd.cfg`에 있습니다. 전동 변속기에 부트로더를 설치하려면 [이 절차](../uavcan/bootloader_installation.md)를 따르십시오.

### 주요 바이너리 컴파일

```sh
cd firmware
make RELEASE=1 # RELEASE is optional; omit to build the debug version
```

일부 GCC 신 버전에서 심볼 링크를 진행할 때  segmentation fault 오류가 나타날 수 있음을 염두에 두십시오. 이 글을 작성할 때 버전 4.9는 동작합니다. 펌웨어 이미지는 `firmware/build/io.px4.sapog-1.1-1.7.<xxxxxxxx>.application.bin`에 들어가는데, `<xxxxxxxx>`는 임의 순서대로 나열한 문자 숫자입니다. Zubax Orel 20 하드웨어 버전은 두가지가 있습니다 (1.0과 1.1). 바이너리 파일을 다음 설명의 올바른 폴더 위치로 복사했는지 확인하십시오. 전동 변속기 펌웨어는 하드웨어 버전과 두 제품의 동작을 확인합니다.

## Zubax GNSS

펌웨어 빌드 및 플래싱 방법은 [프로젝트 페이지](https://github.com/Zubax/zubax_gnss)를 참고하십시오. Zubax GNSS는 UAVCAN 기능을 활용할 수 있는 부트로더가 딸려오기 때문에, 아래에서 설명하는대로 UAVCAN을 활용하는 단순 방식으로 펌웨어를 업데이트할 수 있습니다.

## 자동 항법 장치에 펌웨어 설치

UAVCAN 노드 파일 이름은 픽스호크에서 제조사에 관계없이 어떤 이름으로 네트워크의 모든 UAVCAN 장치를 업데이트하는지 결정하는 작명 규칙을 따릅니다. 이 단계에서 만든 펌웨어 파일은 장치를 업데이트하기 위해 SD카드나 PX4 ROMFS 의 올바른 위치에 복사해야합니다.

펌웨어 이미지 이름의 규칙은 다음과 같습니다:

```
<uavcan name>-<hw version major>.<hw version minor>-<sw version major>.<sw version minor>.<version hash>.bin
```

예: `com.thiemar.s2740vc-v1-1.0-1.0.68e34de6.bin`

그러나 용량과 성능의 제약 문제로 인해(이름 글자수는 28글자를 넘으면 안됨), UAVCAN 펌웨어 업데이터는 파일 이름을 다음과 같은 구조의 디렉터리에 쪼개어 저장합니다:

```
/fs/microsd/fw/<node name>/<hw version major>.<hw version minor>/<hw name>-<sw version major>.<sw version minor>.<git hash>.bin
```

예:
```
s2740vc-v1-1.0.68e34de6.bin 
/fs/microsd/fw/io.px4.sapog/1.1/sapog-1.7.87c7bc0.bin
```

ROMFS 기반 업데이터는 다음과 같은 규칙을 따르나, 파일 이름 앞에 ``_ 문자가 붙어 펌웨어파일이 다음 위치에 들어갑니다:

```
/etc/uavcan/fw/<device name>/<hw version major>.<hw version minor>/_<hw name>-<sw version major>.<sw version minor>.<git hash>.bin
```

## PX4 ROMFS에 바이너리 복사

최종 파일 위치는 다음과 같습니다.

* S2740VC 전동 변속기: `ROMFS/px4fmu_common/uavcan/fw/com.thiemar.s2740vc-v1/1.0/_s2740vc-v1-1.0.<git hash>.bin`
* 픽스호크 전동 변속기 1.6: `ROMFS/px4fmu_common/uavcan/fw/org.pixhawk.px4esc-v1/1.6/_px4esc-v1-1.6.<git hash>.bin`
* 픽스호크 전동 변속기 1.4: `ROMFS/px4fmu_common/uavcan/fw/org.pixhawk.sapog-v1/1.4/_sapog-v1-1.4.<git hash>.bin``
* Zubax GNSS v1: `ROMFS/px4fmu_common/uavcan/fw/com.zubax.gnss/1.0/gnss-1.0.<git has>.bin`
* Zubax GNSS v2: `ROMFS/px4fmu_common/uavcan/fw/com.zubax.gnss/2.0/gnss-2.0.<git has>.bin`

ROMFS/px4fmu_common 디렉터리는 픽스호크의 /etc 로 마운트합니다.

### 펌웨어 업그레이드 과정 시작


PX4 플라이트 스택을 활용할 경우, '전원 설정' 절의 UAVCAN 기능을 켜고, UAVCAN 펌웨어 업그레이드를 시도하기 전에 시스템을 다시 부팅하십시오.


대신, UAVCAN 펌웨어 업그레이드를 다음 명령으로 직접 시작할 수 있습니다:

```sh
uavcan start
uavcan start fw
```
