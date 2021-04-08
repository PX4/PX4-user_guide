# UAVCAN 소개

<img style="float:right; width: 200px ; padding: 10px;" src="../../assets/uavcan/uavcan_logo_transparent.png" alt="UAVCAN Logo" /> [UAVCAN](http://uavcan.org) is an onboard network which allows the autopilot to connect to avionics/peripherals. It uses rugged, differential signalling, and supports firmware upgrades over the bus and status feedback from peripherals.

[UAVCAN](http://uavcan.org)는 보드상에서 처리하는 네트워크로 자동 항법 장치를 항공 전자장비에 연결할 수 있게 합니다. 다음 하드웨어를 지원합니다:
:::

## 초기 설정

It supports hardware like:

- [ESC/Motor controllers](../uavcan/escs.html)
- 항속 센서
  - [Thiemar 항속 센서](https://github.com/thiemar/airspeed)
- GPS 및 GLONASS용 GNSS 리시버
  - [Zubax GNSS](https://zubax.com/products/gnss_2)
- 전력량계
  - [Pomegranate Systems 전원 모듈](../power_module/pomegranate_systems_pm.md)
  - [CUAV CAN PMU 전원 모듈](../power_module/cuav_can_pmu.md)
- Distance sensors
  - [Ark Flow](ark_flow.md)
  - [Avionics Anonymous Laser Altimeter UAVCAN Interface](../uavcan/avanon_laser_interface.md)
- Optical Flow
  - [Ark Flow](ark_flow.md)


다음 설명을 통해 쿼드콥터로의 ESC 장비와 GPS의 UAVCAN 연결 및 설정 방법을 단계별로 안내합니다. 선택한 하드웨어는  Pixhawk 2.1, Zubax Orel 20 ESCs, Zubax GNSS GPS 입니다.


## 노드 펌웨어 업그레이드

처음 단계에서 할 일은 UAVCAN을 활성화한 모든 장치와 비행 제어 장치의 연결입니다. 다음 그림은 모든 부품에 대한 결선 방법을 보여줍니다.

The following diagram shows this for a flight controller connected to [UAVCAN motor controllers (ESCs)](../uavcan/escs.html) and a UAVCAN GNSS.

![UAVCAN 결선](../../assets/uavcan/uavcan_wiring.png)

그 다음, [UAVCAN 설정](../uavcan/node_enumeration.md)의 지침에 따라 펌웨어에서 UAVCAN 기능을 켜십시오. 전원을 끊은 후 다시 연결하십시오.

For more information about proper bus connections see [UAVCAN Device Interconnection](https://kb.zubax.com/display/MAINKB/UAVCAN+device+interconnection) (Zubax KB).

:::note
- While the connections are the same, the _connectors_ may differ across devices.
- An second/redundant" CAN interface may be used, as shown above (CAN2). This is optional, but can increase the robustness of the connection.
:::


## 모터 컨트롤러 기수 부여 및 설정

In order to use UAVCAN components with PX4 you will first need to enable the UAVCAN driver:

1. Power the vehicle using the battery (you must power the whole vehicle, not just the flight controller) and connect *QGroundControl*.
1. Navigate to the **Vehicle Setup > Parameters** screen.
1. [UAVCAN_ENABLE](../advanced_config/parameter_reference.md#UAVCAN_ENABLE) must be [set](../advanced_config/parameters.md) to one of the non-zero values.

   The values are:
   - `0`: UAVCAN driver disabled.
   - `1`: Sensors Manual Config.
   - `2`: Sensors Automatic Config.
   - `3`: Sensors and Actuators (ESCs) Automatic Config

   Use `1` if _none_ of the connected UAVCAN devices support automatic configuration (check the manual!), `2` or `3` if _some_ of them support automatic configuration, and `3` if you're using UAVCAN ESCs (this assigns motor controls to the UAVCAN bus rather than PWM).

ID와 각 모터 컨트롤러의 회전 방향은 간단한 설치 루틴에서 설치 과정을 마친 후 할당할 수 있습니다: [UAVCAN 노드 기수 부여](../uavcan/node_enumeration.md). QGroundControl에서는 사용자가 과정을 시작할 수 있습니다.
:::

Most UAVCAN sensors require no further setup (they are plug'n'play, unless specifically noted in their documentation).

[UAVCAN motor controllers (ESCs)](../uavcan/escs.md) additionally require the motor order be set, and may require a few other parameters be set. Whether this can be done using the simple QGroundControl setup UI depends on the type of ESC (see link for information).


## 참고할만한 링크

### 결선

PX4 requires an SD card for UAVCAN node allocation and during firmware update (which happen during boot). Check that there is a (working) SD card present and reboot.

### 펌웨어 설치

If the PX4 Firmware arms but the motors do not start to rotate, check that parameter `UAVCAN_ENABLE=3` to use UAVCAN ESCs. If the motors do not start spinning before thrust is increased, check `UAVCAN_ESC_IDLT=1`.

## Developer Information

- [UAVCAN Development](../uavcan/developer.md): Topics related to development and integration of new UAVCAN hardware into PX4.
