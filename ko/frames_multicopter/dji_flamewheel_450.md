---
canonicalUrl: https://docs.px4.io/main/ko/frames_multicopter/dji_flamewheel_450
---

# 거리 센서 및 RTK GPS가 장착 된 DJI Flame Wheel 450 (Pixhawk 3 Pro)

*DJI<sup>&reg;</sup> Flame Wheel F450 * Quadcopter는 아마추어 항공 사진, 1 인칭 시점 애플리케이션 및 일반적인 비행 엔터테인먼트를 위해 설계되었습니다. 아래의 조립 방법은 Pixhawk 3 Pro 비행 컨트롤러와 함께 프레임을 사용하기위한 조립 방법과 설정 방법을 설명합니다. 정밀한 위치 지정을위한 RTK GPS와 거리 센서가 포함되어 있습니다.

주요 정보:

- **프레임:** DJI Flame Wheel 450
- **비행 컨트롤러:** [Pixhawk 3 Pro](../flight_controller/pixhawk3_pro.md)
- **위치정보: ** RTK GPS

![](../../assets/airframes/multicopter/dji_flamewheel_450/f450_setup_full.jpg)

![](../../assets/airframes/multicopter/dji_flamewheel_450/f450_setup_back.jpg)

## 부품 목록

* 비행 컨트롤러: [Pixhawk 3 Pro](../flight_controller/pixhawk3_pro.md)
* 프레임: [DJI Flamewheel 450](http://www.dji.com/flame-wheel-arf)
* 모토: 3DR Iris Plus 950kv rebranded T-Motors MN2213
* 전기변속기: Hobbywing XRotor 35A Micro 3-6S BLHeli
* 블레이드: Graupner 10"x5" (M6와 호환되도록 [이 어댑터](https://drive.google.com/file/d/0B2piootk_fIKMWhIVzVPWEFGLU0/view)를 인쇄해야합니다.) <!--TODO-->
* 거리 센서:  Lidar-Lite V3
* GPS: Here+ RTK GPS
* Telemetry:        [3DR Telemetry](../telemetry/sik_radio.md)
* 배터리: Roxxy LiPo - 4S, 4000mAh

또한, FrSky X4R-SB 3/16ch 2.4Ghz 수신기와 FrSky Taranis 컨트롤러를 사용합니다. 이번 조립에는 동일한 블레이드를 사용하는 경우 지퍼 타이, 양면 테이프, 납땜 인두 및 3D 프린터도 필요합니다. GPS 마스트는 Intel Aero에서 재사용되었습니다.

![F450 설정-열기](../../assets/airframes/multicopter/dji_flamewheel_450/f450_setup_open.jpg)

*Pixhawk 3 Pro*는 내부 IMU가 이미 축축되어 있기 때문에 양면 테이프를 사용하여 부착 할 수 있습니다.

이 설정에서는 자동 조종 장치가 180도 회전되어 SD 카드에 접근이 더욱 용이합니다. 그러나, 베이스 플레이트를 180도 돌리면, 비행 컨트롤러 보드를 전면에 장착할 수 있습니다. 두 방법 모두 가능하나, *QGroundControl*에서 보드 회전의 설정을 확인하여야 합니다.


## 배선

Pixhawk 3 Pro의 일반 핀아웃은 [여기](https://drotek.gitbook.io/pixhawk-3-pro/hardware/inputs-outputs)에서 조회할 수 있습니다.

### Telemetry Radio

:::note
The 3DR Telemetry radio used here is no longer available. Comparable alternatives can be found in [Telemetry Radios > SiK Radio](../telemetry/sik_radio.md).
:::

The 3DR Telemetry radio does not come with a JST GH connector which the *Pixhawk 3 Pro* uses. 핀아웃은 동일하게 유지되며 플러그만 변경하면됩니다. Use the `TELEM 1` port on the *Pixhawk 3 Pro*.

| 핀 | Pixhawk 3 Pro Telem 1 | 3DR 텔레메트리 |
| - | --------------------- | --------- |
| 1 | VCC                   | VCC       |
| 2 | TX                    | RX        |
| 3 | RX                    | TX        |
| 4 | CTS                   | CTS       |
| 5 | RTS                   | RTS       |
| 6 | GND                   | GND       |

### Lidar-Lite V3

The pinout for the [Lidar Lite V3](../sensor/lidar_lite.md) and the *Pixhawk 3 Pro* I2C 1 port is as follows.

| 핀 | Pixhawk 3 Pro I2C 1 | Lidar Lite V3    |
| - | ------------------- | ---------------- |
| 1 | VCC                 | VCC              |
| 2 | SCL                 | - (Power enable) |
| 3 | SDA                 | - (Mode control) |
| 4 | GND                 | SCL              |
| 5 | -                   | SDA              |
| 6 | -                   | GND              |


### Here+ RTK GPS

:::note
This RTK GPS has been discontinued. Alternatives can be found [here](../gps_compass/rtk_gps.md)
:::

The [Here+ RTK GPS](../gps_compass/rtk_gps_hex_hereplus.md) comes with an 8 pin connector suited for the Pixhawk 2. Here + GPS는 Pixhawk 2에 적합한 8 핀 커넥터와 함께 제공됩니다. 추가 핀은 안전 버튼용이며 필요한 경우 부착 할 수 있습니다.

핀아웃에 대한 상세한 내용은 17 페이지의 [이 문서](http://www.hex.aero/wp-content/uploads/2016/07/DRS_Pixhawk-2-17th-march-2016.pdf)에서 확인하십시오.

![GPS 설정하기](../../assets/airframes/multicopter/dji_flamewheel_450/f450_setup_gps.jpg)

| 핀 | Here+ GPS  | 핀 | Pixhawk 3 Pro GPS |
| - | ---------- | - | ----------------- |
| 1 | VCC_5V     | 1 | VCC               |
| 2 | GPS_RX     | 2 | GPS_TX            |
| 3 | GPS_TX     | 3 | GPS_RX            |
| 4 | SCL        | 4 | SCL               |
| 5 | SDA        | 5 | SDA               |
| 6 | BUTTON     | - | -                 |
| 7 | BUTTON_LED | - | -                 |
| 8 | GND        | 6 | GND               |


## PX4 Configuration

*QGroundControl*에서 쿼드콥터를 설정법에 대한 일반 문서는 [기본 구성](../config/README.md)을 참고하십시오. 특정한 설정에 관련된 지침이 아래에서 제공됩니다.

### 기체

In the [Airframe](../config/airframe.md) configuration, select the *Generic Quadcopter* airframe (**Quadrotor x > Generic Quadcopter**).

![QGroundControl - Select Generic Quadcopter](../../assets/airframes/multicopter/dji_f450_cuav_5nano/qgc_airframe_generic_quadx.png)

### Actuators

In the [Actuators](../config/actuators.md) configuration in *QGroundControl*

- Update the vehicle geometry to match the Flamewheel 450
- Assign actuators functions to outputs as wired.
- Test the configuration using the sliders.

### RTK GPS

RTK GPS는 플러그 앤 플레이입니다. For more instructions see [here](../gps_compass/rtk_gps.md).

### Lidar-Lite

*Lidar-Lite V3* (I2C를 통해 연결됨)를 활성화하려면 [SENS_EN_LL40LS](../advanced_config/parameter_reference.md#SENS_EN_LL40LS) 매개 변수를 `I2C`로 설정해야합니다.

This can be done in *QGroundControl* (see [Finding/Updating Parameters](../advanced_config/parameters.md)) as shown below:

![QGC에서 SENS_EN_LL40LS 매개 변수 설정](../../assets/airframes/multicopter/dji_flamewheel_450/f450_qgc_setup_i2c.png)

:::note
`SENS_EN_LL40LS`를 설정한 다음에는 비행 컨트롤러를 재부팅하여야 합니다.
:::

### 기타

아래의 매개 변수도 설정하십시오.

- `MAV_PROTO_VER = 2` : MAVLink 프로토콜 버전 2 사용
- `CBRK_IO_SAFETY = 22027` : 안전 버튼 비활성화
- `EKF2_GPS_POS_X`, `EKF2_GPS_POS_Y`, `EKF2_GPS_POS_Z` : 보드 (NED 좌표)를 기준으로 GPS 장치 오프셋을 설정합니다.

### Tuning

Airframe selection sets *default* autopilot parameters for the frame. These may be good enough to fly with, but you should tune each frame build.

For instructions on how, start from [Autotune](../config/autotune.md).


## 비디오

@[유투브](https://youtu.be/JovSwzoTepU)
