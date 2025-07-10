---
canonicalUrl: https://docs.px4.io/main/ko/uavcan/ark_flow
---

# ARK Flow

ARK Flow는 오픈 소스 [UAVCAN](README.md) [광류](../sensor/optical_flow.md), [거리 센서](../sensor/rangefinders.md) 및 IMU 모듈입니다.

![ARK Flow](../../assets/hardware/sensors/optical_flow/ark_flow.jpg)

## 구매처

이 모듈을 아래에서 주문하십시오.

* [ARK Electronics](https://arkelectron.com/product/ark-flow/) (미국)

## 사양

* [오픈 소스 회로도와 BOM](https://github.com/ARK-Electronics/ARK_Flow)
* [PX4 오픈 소스 펌웨어](https://github.com/PX4/PX4-Autopilot/tree/master/boards/ark/can-flow) 실행
* [UAVCAN](README.md) [펌웨어 업데이트](node_firmware.md) 지원
* 동적 [UAVCAN](README.md) 노드 열거
* 센서
  * PixArt PAW3902 Optical Flow Sensor
    * 9lux 이상의 매우 낮은 조명 조건에서 트랙
    * 80mm에서 30m까지 넓은 작업 범위
    * 최대 7.4 rad/s
  * 9lux 이상의 매우 낮은 조명 조건에서 트랙
  * Broadcom AFBR-S50LV85D 비행시간 거리 센서
    * 통합 850nm 레이저 광원
    * 12.4  x 6.2°의 시야각 (FoV), 32 픽셀
    * 최대 30m의 일반적인 거리 범위
    * 최대 200k Lux 주변 조명 작동
    * 모든 표면 조건에서 잘 작동
    * 1~3 픽셀 사이를 비추는 2° x 2°의 송신기 빔
  * 최대 7.4 rad/sPixArt PAW3902 광학식 유량 센서
* STM32F412CEU6 MCU
* Pixhawk 표준 CAN 커넥터 2 개
  * 4 핀 JST GH
* Pixhawk 표준 CAN 커넥터 2 개
  * 4 핀 JST GH
* 소형 폼 팩터
  * 3cm x 3cm x 1.4cm
* LED 표시기
* 미국에서 제작


### 배선

ARK Flow는 Pixhawk 표준 4 핀 JST GH 케이블을 사용하여 CAN 버스에 연결됩니다. 추가 센서를 ARK Flow의 두 번째 CAN 커넥터에 연결하여 여러 센서를 연결할 수 있습니다.

UAVCAN 배선 방법은 [UAVCAN > 배선](../uavcan/README.md#wiring)을 참고하십시오.

<a id="mounting"></a>

### 장착 및 방향

권장 장착 방향은 다음 그림과 같이 보드의 커넥터가 **차량 뒷면**을 향하는 것입니다.

![ARK Flow는 Pixhawk에 정렬](../../assets/hardware/sensors/optical_flow/ark_flow_orientation.png)

이는 매개변수 [SENS_FLOW_ROT](../advanced_config/parameter_reference.md#SENS_FLOW_ROT)의 기본값 (`0`)에 해당합니다. 다른 방향을 사용시에는 매개변수를 적절하게 변경하십시오.

센서는 프레임의 어느 곳에 나 장착할 수 있지만, [PX4 설정](#px4-configuration) 중에 차량 무게 중심을 기준으로 초점 위치를 지정하여야 합니다.


## PX4 설정

### UAVCAN 활성화

ARK Flow 보드를 사용하려면 Pixhawk CAN 버스에 연결하고 동적 노드 할당을 위해 매개변수 [UAVCAN_ENABLE](../advanced_config/parameter_reference.md#UAVCAN_ENABLE)을 `2`로 설정하여 UAVCAN 드라이버를 활성화합니다 (또는 `<a href="../uavcan/escs.md">UAVCAN ESC</a>를 사용하는 경우 3`).

단계는 아래와 같습니다:
- *QGroundControl*에서 매개변수 [UAVCAN_ENABLE](../advanced_config/parameter_reference.md#UAVCAN_ENABLE)을 `2` 또는 `3`로 설정하고 재부팅합니다 ([매개 변수 찾기 / 업데이트 ](../advanced_config/parameters.md)참조).
- ARK Flow CAN을 Pixhawk CAN에 연결합니다.

활성화되면 부팅시 모듈이 감지됩니다. 유량 데이터는 10Hz에 도달하여야 합니다.

### PX4 설정

[Optical Flow > 추정기 > EKF2 ](../sensor/optical_flow.md#ekf2) 에서 EKF 광류 매개변수를 설정합니다.

- In *QGroundControl* manually set the parameter [EKF2_AID_MASK](../advanced_config/parameter_reference.md#EKF2_AID_MASK) to `2` to use optical flow only or `3` to use GPS and optical flow. To manually set the value, select `Advanced Settings` and check `manual entry`, then enter the value at the top and save.
- Set [EKF2_RNG_A_HMAX](../advanced_config/parameter_reference.md#EKF2_RNG_A_HMAX) to `10`.
- [UAVCAN_RNG_MIN](../advanced_config/parameter_reference.md#UAVCAN_RNG_MAX)을 `0.08`로, [UAVCAN_RNG_MAX](../advanced_config/parameter_reference.md#UAVCAN_RNG_MAX)를 `30`으로 설정합니다.
- Set [UAVCAN_RNG_MIN](../advanced_config/parameter_reference.md#UAVCAN_RNG_MIN) to `0.08`.
- Set [UAVCAN_RNG_MAX](../advanced_config/parameter_reference.md#UAVCAN_RNG_MAX) to `30`.
- Set [SENS_FLOW_MINHGT](../advanced_config/parameter_reference.md#SENS_FLOW_MINHGT) to `0.08`.
- Set [SENS_FLOW_MAXHGT](../advanced_config/parameter_reference.md#SENS_FLOW_MAXHGT) to `25`.
- Set [SENS_FLOW_MAXR](../advanced_config/parameter_reference.md#SENS_FLOW_MAXR) to `7.4` to match the PAW3902 maximum angular flow rate.
- Enable [UAVCAN_SUB_FLOW](../advanced_config/parameter_reference.md#UAVCAN_SUB_FLOW).
- Enable [UAVCAN_SUB_RNG](../advanced_config/parameter_reference.md#UAVCAN_SUB_RNG).
- The parameters [EKF2_OF_POS_X](../advanced_config/parameter_reference.md#EKF2_OF_POS_X), [EKF2_OF_POS_Y](../advanced_config/parameter_reference.md#EKF2_OF_POS_Y) and [EKF2_OF_POS_Z](../advanced_config/parameter_reference.md#EKF2_OF_POS_Z) can be set to account for the offset of the Ark Flow from the vehicle centre of gravity.

또한 다음의 매개변수들을 설정할 수 있습니다.

| 매개변수                                                                                            | 설명                   |
| ----------------------------------------------------------------------------------------------- | -------------------- |
| <a id="CANNODE_TERM"></a>[CANNODE_TERM](../advanced_config/parameter_reference.md#CANNODE_TERM) | 광학 흐름에 의존시 지상 최소 높이. |


## Ark Flow 펌웨어 빌드

Ark Flow is sold with a recent firmware build. Developers who want to update to the very latest version can build and install it themselves using the normal PX4 toolchain and sources.

The steps are:
1. [PX4 도구 모음](../dev_setup/dev_env.md)을 설치합니다.
1. *git*을 사용하여 Ark Flow를 포함한 PX4-Autopilot 소스를 복제합니다.
   ```
   git clone https://github.com/PX4/PX4-Autopilot --recursive
   cd PX4-Autopilot
   ```
1. *Ark Flow* 펌웨어를 빌드합니다.
   ```
   make ark_can-flow
   ```
1. **build/ark_can-flow_default**에 **XX-X.X.XXXXXXXX.uavcan.bin**이라는 바이너리가 생성됩니다. 이 바이너리를 비행 컨트롤러 SD 카드의 루트 디렉터리에 저장하여 Ark Flow를 플래시합니다. 다음으로 SD 카드가 설치된 상태에서 비행 컨트롤러의 전원을 켜면 Ark Flow가 자동으로 깜박이고 바이너리가 더 이상 루트 디렉터리에 없고 이제  SD 카드의 ufw 디렉토리에 **80.bin**이라는 파일이 생깁니다.  :::note
전원을 켤 때 비행 컨트롤러에 SD 카드가 없으면, Ark Flow가 부팅되지 않습니다.

:::


## Ark Flow 부트로더 업데이트

The Ark Flow comes with the bootloader pre-installed. You can, however, rebuild and reflash it within the PX4-Autopilot environment.

The steps are:
1. Ark Flow 부트로더 펌웨어를 빌드합니다.
   ```
   make ark_can-flow_canbootloader
   ```
:::note VS
코드에서는 이렇게 하면, `launch.json` 파일이 설정됩니다. Black Magic Probe 및 VS 코드를 사용하는 경우 이 파일 내의 `BMPGDBSerialPort`를 디버거가 연결된 올바른 포트로 업데이트해야 합니다. MacOS에서 포트 이름은 `cu.usbmodemE4CCA0E11`과 같아야 합니다.
:::
1. Black Magic Probe와 같은 GNU 프로젝트 디버거(GDB) 사용을 지원하는 직렬 와이어 디버깅(SWD) 장치에 Ark Flow를 연결한 다음 CAN 포트 중 하나를 통해 Ark Flow에 전원을 연결합니다.
1. `ark_can-flow_canbootloader`로 Ark Flow를 플래시합니다. VS 코드에서 그렇게 하려면, VS 코드의 하단 표시줄에 `CMake: [ark_can-flow_canbootloader]: Ready`가 표시되어 깜박이고 있음을 나타냅니다. 그런 다음, VS 코드의 실행 및 디버그 창에서 `디버깅 시작`을 선택한 다음 첫 번째 중단점 이후에 `계속`을 선택하여 부트로더를 플래시합니다.
1. 부트로더가 플래시되면 위에서 설명한 대로 Ark Flow 펌웨어 `ark_can-flow_default`를 빌드하고 플래시할 준비가 된 것입니다.


## LED 신호의 의미

ARK Flow가 깜박일 때 빨간색과 파란색 LED가 모두 표시되고, 제대로 실행 중이면 파란색 LED가 계속 켜져 있습니다.

빨간색 LED가 계속 켜져 있으면, 오류가 있으므로 다음 사항들을 확인하여야 합니다.
- 비행 콘트롤러에 SD 카드가 설치되어 있는지 확인하십시오.
- `ark_can-flow_default`를 플래싱하기 전에 Ark Flow에 `ark_can-flow_canbootloader`가 설치되어 있는 지 확인하십시오.
- SD 카드의 루트 및 ufw 디렉토리에서 바이너리를 제거하고 빌드 및 플래시를 다시 시도하십시오.

## 비디오

@[youtube](https://www.youtube.com/watch?v=SAbRe1fi7bU&list=PLUepQApgwSozmwhOo-dXnN33i2nBEl1c0)
<!-- ARK Flow with PX4 Optical Flow Position Hold: 20210605 -->
[유튜브](https://www.youtube.com/watch?v=SAbRe1fi7bU&list=PLUepQApgwSozmwhOo-dXnN33i2nBEl1c0) *속도 추정을 위해 ARK Flow 센서를 사용한 PX4 고정 위치([위치 모드](../flight_modes/position_mc.md)에서)* 
