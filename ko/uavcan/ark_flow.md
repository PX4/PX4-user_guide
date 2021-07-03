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
    * PixArt PMW3901 광류 센서
    * 9lux 이상의 매우 낮은 조명 조건에서 트랙
    * 80mm에서 무한대까지 넓은 작업 범위
    * 최대 7.4 rad/s
    * 저조도 작동 개선을 위해 40mW IR LED 내장
  * Broadcom AFBR-S50LV85D 비행시간 거리 센서
    * 통합 850nm 레이저 광원
    * 12.4  x 6.2°의 시야각 (FoV), 32 픽셀
    * 최대 30m의 일반적인 거리 범위
    * 최대 200k Lux 주변 조명 작동
    * 모든 표면 조건에서 잘 작동
    * 1~3 픽셀 사이를 비추는 2° x 2°의 송신기 빔
* Bosch BMI088 6축 IMU
* STM32F412CEU6 MCU
* Pixhawk 표준 CAN 커넥터 2 개
  * 4 핀 JST GH
* Pixhawk 표준 디버그 포트
  * 6 핀 JST SH
* 소형 폼 팩터
  * 3cm x 3cm x 1.4cm
* LED 표시기
* 미국에서 제작



### 배선

ARK Flow는 Pixhawk 표준 4 핀 JST GH 케이블을 사용하여 CAN 버스에 연결됩니다. 추가 센서를 ARK Flow의 두 번째 CAN 커넥터에 연결하여 여러 센서를 연결할 수 있습니다.

UAVCAN 배선 방법은 [UAVCAN > 배선](../uavcan/README.md#wiring)을 참고하십시오.

<a id="mounting"></a>

### 장착 및 방향

The recommended mounting orientation is with the connectors on the board pointing towards **back of vehicle**, as shown in the following picture.

![ARK Flow align with Pixhawk](../../assets/hardware/sensors/optical_flow/ark_flow_orientation.png)

This corresponds to the default value (`0`) of the parameter [SENS_FLOW_ROT](../advanced_config/parameter_reference.md#SENS_FLOW_ROT). Change the parameter appropriately if using a different orientation.

The sensor can be mounted anywhere on the frame, but you will need to specify the focal point position, relative to vehicle centre of gravity, during [PX4 configuration](#px4-configuration).


## PX4 Setup

### Enabling UAVCAN

In order to use the ARK Flow board, connect it to the Pixhawk CAN bus and enable the UAVCAN driver by setting parameter [UAVCAN_ENABLE](../advanced_config/parameter_reference.md#UAVCAN_ENABLE) to `2` for dynamic node allocation (or `3` if using [UAVCAN ESCs](../uavcan/escs.md)).

The steps are:
- In *QGroundControl* set the parameter [UAVCAN_ENABLE](../advanced_config/parameter_reference.md#UAVCAN_ENABLE) to `2` or `3` and reboot (see [Finding/Updating Parameters](../advanced_config/parameters.md)).
- Connect ARK Flow CAN to the Pixhawk CAN.

Once enabled, the module will be detected on boot. Flow data should arrive at 10Hz.

### PX4 Configuration

Set the EKF optical flow parameters in [Optical Flow > Estimators > EKF2](../sensor/optical_flow.md#ekf2) in order to:
- enable fusing optical flow measurements for velocity calculation.
- define offsets if the sensor is not centred within the vehicle.

In addition you may need to configure the following parameters.

| Parameter                                                                                                           | Description                                                               |
| ------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| <span id="SENS_FLOW_MAXHGT"></span>[SENS_FLOW_MAXHGT](../advanced_config/parameter_reference.md#SENS_FLOW_MAXHGT) | Maximum height above ground when reliant on optical flow.                 |
| <span id="SENS_FLOW_MINHGT"></span>[SENS_FLOW_MINHGT](../advanced_config/parameter_reference.md#SENS_FLOW_MINHGT) | Minimum height above ground when reliant on optical flow.                 |
| <span id="SENS_FLOW_MAXR"></span>[SENS_FLOW_MAXR](../advanced_config/parameter_reference.md#SENS_FLOW_MAXR)       | Maximum angular flow rate reliably measurable by the optical flow sensor. |
| <span id="SENS_FLOW_ROT"></span>[SENS_FLOW_ROT](../advanced_config/parameter_reference.md#SENS_FLOW_ROT)          | Yaw rotation of the board relative to the vehicle body frame.             |


## Building Ark Flow Firmware

Ark Flow is sold with a recent firmware build. Developers who want to update to the very latest version can build and install it themselves using the normal PX4 toolchain and sources.

The steps are:
1. Install the [PX4 toolchain](../dev_setup/dev_env.md).
1. Clone the PX4-Autopilot sources, including Ark Flow, using *git*:
   ```bash
   git clone https://github.com/PX4/PX4-Autopilot --recursive
   cd PX4-Autopilot
   ```
1. Build the *Ark Flow* firmware:
   ```
   make ark_can-flow
   ```
1. Follow instructions for [UAVCAN firmware updating](node_firmware.md) using the binary located in **build/ark_can-flow_default** named **XX-X.X.XXXXXXXX.uavcan.bin**.

## Video

@[youtube](https://youtu.be/aPQKgUof3Pc)
<!-- ARK Flow with PX4 Optical Flow Position Hold: 20210605 -->
*PX4 holding position using the ARK Flow sensor for velocity estimation (in [Position Mode](../flight_modes/position_mc.md)).* 