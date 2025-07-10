---
canonicalUrl: https://docs.px4.io/main/ko/uavcan/node_firmware
---

# UAVCAN 펌웨어 업그레이드

PX4 will automatically upgrade firmware on UAVCAN nodes if the appropriate firmware is supplied. The firmware build process is manufacturer dependent (instructions for different firmware linked below).

:::warning
UAVCAN 장치는 일반적으로 적절한 펌웨어가 사전 설치된 상태로 판매됩니다. 
이러한 지침은 UAVCAN 장치를 개발할 때 주로 필요합니다.
:::

## Vectorcontrol ESC 코드 베이스 (Pixhawk ESC  1.6과 S2740VC)

ESC 코드를 다운로드합니다:

UAVCAN로 펌웨어를 업데이트하기 전에, Pixhawk ESC 1.6은 UAVCAN 부트로더를 플래시하여야 합니다. 부트로더를 빌드하가 위하여, 다음 명령어를 실행하십시오.

빌드 후 부트로더 이미지는 `firmware/px4esc_1_6-bootloader.bin`에 있으며 OpenOCD 구성은 `openocd_px4esc_1_6.cfg`에 있습니다. [이 지침](../uavcan/bootloader_installation.md)에 따라 ESC에 부트로더를 설치합니다.
:::

## Sapog 코드 베이스 (Pixhawk ESC 1.4와 Zubax Orel 20)

### UAVCAN 부트로더 플래싱

Please refer to the [Ark Flow documentation](./ark_flow.md) under **Building Ark Flow Firmware** to learn how to build and flash this firmware.

### 메인 바이너리 컴파일

Sapog 코드 베이스를 다운로드하십시오:

### UAVCAN 부트로더 플래싱

Please refer to the [project page](https://github.com/Zubax/zubax_gnss) to learn how to build and flash this firmware.

### 메인 바이너리 컴파일

Download the ESC code:

```sh
git clone https://github.com/thiemar/vectorcontrol
cd vectorcontrol
```

#### Flashing the UAVCAN Bootloader

GCC의 일부 최신 버전은 연결하는 동안 segfaults로 이어집니다. 이 문서 작성시에는 버전 4.9는 작동하였습니다.

```sh
make clean && BOARD=px4esc_1_6 make -j8
```

펌웨어 빌드 및 플래시 방법은 [프로젝트 페이지](https://github.com/Zubax/zubax_gnss)를 참조하세요. Zubax GNSS는 UAVCAN 지원 부트로더와 함께 제공되므로, 펌웨어는 아래 설명된 대로 UAVCAN을 통해 균일한 방식으로 업데이트할 수 있습니다.

#### Compiling the Main Binary

```sh
BOARD=s2740vc_1_0 make && BOARD=px4esc_1_6 make
```

UAVCAN 노드 파일 이름은 제조업체에 관계없이 Pixhawk가 네트워크의 모든 UAVCAN 장치를 업데이트를 위한 명명 규칙을 따릅니다. 따라서 위 단계에서 생성된 펌웨어 파일은 장치를 업데이트하려면 SD 카드 또는 PX4 ROMFS의 올바른 위치에 복사해야 합니다.
