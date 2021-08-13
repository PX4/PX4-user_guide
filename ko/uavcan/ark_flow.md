# ARK Flow

ARK Flow는 오픈 소스 [UAVCAN](README.md) [광류](../sensor/optical_flow.md), [거리 센서](../sensor/rangefinders.md) 및 IMU 모듈입니다.

![ARK Flow
](../../assets/hardware/sensors/optical_flow/ark_flow.jpg)

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
  * 최대 7.4 rad/s
* Bosch BMI088 6축 IMU
* Two Pixhawk Standard CAN Connectors
  * 4 Pin JST GH
* Pixhawk 표준 CAN 커넥터 2 개
  * 4 핀 JST GH
* Pixhawk 표준 디버그 포트
  * 6 핀 JST SH
* LED Indicators
* LED 표시기


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
- 센서가 차량 중앙에 있지 않은 경우 오프셋을 정의합니다.
- Set [UAVCAN_RNG_MIN](../advanced_config/parameter_reference.md#UAVCAN_RNG_MAX) to `0.08` and [UAVCAN_RNG_MAX](../advanced_config/parameter_reference.md#UAVCAN_RNG_MAX) to `30`.

또한 다음의 매개변수들을 설정할 수 있습니다.

| 매개변수                                                                                                      | 설명                           |
| --------------------------------------------------------------------------------------------------------- | ---------------------------- |
| <a id="SENS_FLOW_MAXHGT"></a>[SENS_FLOW_MAXHGT](../advanced_config/parameter_reference.md#SENS_FLOW_MAXHGT) | 광학 흐름에 의존시 지상 최대 높이.         |
| <a id="SENS_FLOW_MINHGT"></a>[SENS_FLOW_MINHGT](../advanced_config/parameter_reference.md#SENS_FLOW_MINHGT) | 광학 흐름에 의존시 지상 최소 높이.         |
| <a id="SENS_FLOW_MAXR"></a>[SENS_FLOW_MAXR](../advanced_config/parameter_reference.md#SENS_FLOW_MAXR)     | 광류 센서로 안정적으로 측정 기능한 최대 각 유량. |
| <a id="SENS_FLOW_ROT"></a>[SENS_FLOW_ROT](../advanced_config/parameter_reference.md#SENS_FLOW_ROT)       | 차체 프레임을 기준으로 한 보드의 요 회전.     |


## Ark Flow 펌웨어 빌드

Ark Flow는 최신 펌웨어로 빌드되어 판매됩니다. 최신 버전으로 업데이트하는 개발자는 일반 PX4 도구 모음 및 소스를 사용하여 직접 빌드하고 설치할 수 있습니다.

단계는 아래와 같습니다:
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
1. That will have created a binary in **build/ark_can-flow_default** named **XX-X.X.XXXXXXXX.uavcan.bin**. Put this binary on the root directory of the flight controller’s SD card to flash the Ark Flow. Next time you power your flight controller with the SD card installed, Ark Flow will automatically be flashed and you should notice the binary is no longer in the root directory and there is now a file named **80.bin** in the ufw directory of the SD card. :::note The Ark Flow will not boot if there is no SD card in the flight controller when powered on.
:::


## 비디오

The Ark Flow comes with the bootloader pre-installed. You can, however, rebuild and reflash it within the PX4-Autopilot environment.

The steps are:
1. Build the Ark Flow bootloader firmware:
   ```
   make ark_can-flow_canbootloader
   ```
:::note
This will setup your `launch.json` file if you are in VS code. If using the Black Magic Probe and VS code, make sure to update `BMPGDBSerialPort` within this file to the correct port that your debugger is connected to. On MacOS, the port name should look something like `cu.usbmodemE4CCA0E11`.
:::
1. Connect to your Ark Flow to any Serial Wire Debugging (SWD) device that supports use of GNU Project Debugger (GDB), such as the Black Magic Probe and then connect power to your Ark Flow via one of the CAN ports.
1. Flash the Ark Flow with `ark_can-flow_canbootloader`. To do so in VS code, you should see `CMake: [ark_can-flow_canbootloader]: Ready` on the bottom bar of VS code, indicating what you are flashing. You then flash the bootloader by selecting `Start Debugging` in the Run and Debug window of VS code and then selecting `Continue` after the first breakpoint.
1. With the bootloader flashed, you are ready to build and flash the Ark Flow firmware `ark_can-flow_default` as outlined above.


## LED Meanings

You will see both red and blue LEDs on the ARK Flow when it is being flashed, and a solid blue LED if it is running properly.

If you see a solid red LED there is an error and you should check the following:
- Make sure the flight controller has an SD card installed.
- Make sure the Ark Flow has `ark_can-flow_canbootloader` installed prior to flashing `ark_can-flow_default`.
- Remove binaries from the root and ufw directories of the SD card and try to build and flash again.

## Video

@[youtube](https://www.youtube.com/watch?v=SAbRe1fi7bU&list=PLUepQApgwSozmwhOo-dXnN33i2nBEl1c0)
<!-- ARK Flow with PX4 Optical Flow Position Hold: 20210605 -->
*PX4 holding position using the ARK Flow sensor for velocity estimation (in [Position Mode](../flight_modes/position_mc.md)).* 