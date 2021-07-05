# UAVCAN ESC (모터 컨트롤러)

PX4는 [UAVCAN](../uavcan/README.md) ESC를 지원합니다. [PWM ESC](../peripherals/pwm_escs_and_servo.md)와 비교하여 다음과 같은 장점들이 있습니다.
- UAVCAN은 비교적 장거리에도 강력하고 안정적인 연결을 제공하도록 설계되었습니다. 더 큰 기체에서 ESC를 안전하게 사용하고, 통신 이중화가 가능합니다.
- 버스는 양방향이므로, 상태 모니터링과 진단이 가능합니다.
- 모든 ESC 및 기타 UAVCAN 주변 장치를 연결하기 위한 단일 버스를 가질 수 있으므로, 배선이 비교적 간단합니다.
- (대부분의 UAVCAN ESC 유형의 경우) 각 모터를 수동으로 회전하여 ESC 번호 지정을 구성하면 설정이 더 용이합니다.

<style>
#image_container {
  height: 100%;
  width: 100%;
  display: flex;
}
.image_column {
  width: 33%;
  text-align: center;
}

</style>

<div id="image_container">

  <div class="image_column">
    <img src="../../assets/peripherals/esc_usavcan_zubax_sadulli/sadulli_top.jpg" alt="Sadulli - Top" /><br><a href="https://shop.zubax.com/collections/integrated-drives/products/sadulli-integrated-drive-open-hardware-reference-design-for-mitochondrik?variant=27740841181283">Zubax Sadulli 통합 드라이브</a>
  </div>
  
  <div class="image_column">
  <img src="../../assets/peripherals/esc_uavcan_zubax_orel20/orel20_top.jpg" alt="Orel20 - Top"/><br><a href="https://zubax.com/products/orel_20">Zubax Orel 20</a>
  </div>

  <div class="image_column">
    <img src="../../assets/peripherals/esc_uavcan_holybro_kotleta20/kotleta20_top.jpg" alt="Holybro Kotleta20 top" /><br><a href="https://shop.holybro.com/kotleta20_p1156.html">Holybro Kotleta20</a>
  </div>

</div>

## PX4 지원 ESC

PX4는 모든 UAVCAN ESC와 호환됩니다 (UAVCAN은 일반적으로 플러그 앤 플레이 프로토콜을 의미합니다).

:::note
작성 당시 PX4는 UAVCAN v0.x (v1.0 아님)를 지원합니다.
:::

설정 관점에서 UAVCAN ESC의 유일한 차이점은 모터 순서와 방향을 구성하는  커넥터와 소프트웨어가 다를 수 있다는 것입니다.


널리 사용되는 UAVCAN ESC 펌웨어/제품은 다음과 같습니다.
- [Sapog](https://github.com/PX4/sapog#px4-sapog) 펌웨어; 전기 무인 기체의 추진 시스템에 사용하도록 설계된 고급 오픈 소스 센서리스 PMSM/BLDC 모터 컨트롤러 펌웨어입니다.
  - [Zubax Orel 20](https://zubax.com/products/orel_20)
  - [Holybro Kotleta20](https://shop.holybro.com/kotleta20_p1156.html)
- [Mitochondrik](https://zubax.com/products/mitochondrik) - 통합 센서리스 PMSM/BLDC 모터 컨트롤러 칩 (ESC 및 통합 드라이브에 사용)
  - [Zubax Sadulli 통합 드라이브](https://shop.zubax.com/collections/integrated-drives/products/sadulli-integrated-drive-open-hardware-reference-design-for-mitochondrik?variant=27740841181283)
- [Myxa](https://zubax.com/products/myxa) - 경량 무인 항공기 및 선박용 고급 PMSM/BLDC 모터 컨트롤러 (FOC ESC).
- [VESC 프로젝트 ESC](https://vesc-project.com/) ([Benjamin Vedder의 블로그](http://vedder.se) - 프로젝트 소유자 참조)
- [OlliW의 UC4H ESC - 액추에이터 노드](http://www.olliw.eu/2017/uavcan-for-hobbyists/#chapterescactuator)
- 그 외 다수가 [여기에 기술](https://forum.uavcan.org/t/uavcan-esc-options/452/3?u=pavel.kirienko)되어 있습니다.

:::note
이 목록은 *완전하지 않습니다*. 다른 ESC를 알고 있으시면, 목록에 추가하십시오!
:::

## 구매

Sapog 기반 ESC:
- [Zubax Orel 20](https://zubax.com/products/orel_20)
- [Holybro Kotleta20](https://shop.holybro.com/kotleta20_p1156.html)

Mitochondrik 기반 드라이브 및 ESC:
- [Zubax Sadulli 통합 드라이브](https://shop.zubax.com/collections/integrated-drives/products/sadulli-integrated-drive-open-hardware-reference-design-for-mitochondrik?variant=27740841181283)

:::note
다른 상용 ESC가 많이 있습니다. 새 링크를 찾으면 추가하십시오!
:::


<!--
![Orel20 - Top](../../assets/peripherals/esc_uavcan_zubax_orel20/orel20_top.jpg)
![Kotleta20 - Top](../../assets/peripherals/esc_uavcan_holybro_kotleta20/kotleta20_top.jpg)
![Kotleta20 - Bottom](../../assets/peripherals/esc_uavcan_holybro_kotleta20/kotleta20_bottom.jpg)
![Sadulli - Top](../../assets/peripherals/esc_usavcan_zubax_sadulli/sadulli_top.jpg)
-->


## 배선

모든 온보드 UAVCAN 장치를 체인에 연결하고, 버스가 끝 노드에서 종료되었는 지 확인합니다. ESC가 연결/체인 순서는 중요하지 않습니다.

자세한 정보는 [UAVCAN > 배선](../uavcan/README.md#wiring)을 참고하십시오.

:::note
모든 UAVCAN ESC는 동일한 연결 아키텍처를 공유하며 동일한 방식으로 연결됩니다. 그러나, 실제 커넥터는 다릅니다 (예 : *Zubax Orel 20* 및 *Holybro Kotleta20*은 Dronecode 표준 커넥터 (JST-GH 4 핀)를 사용하지만 VESC는 사용하지 않음).
:::


## PX4 설정

PX4에서 UAVCAN ESC를 사용하려면 UAVCAN 드라이버를 활성화하여야 합니다.
1. Power the vehicle using the battery (you must power the whole vehicle, not just the flight controller) and connect *QGroundControl*.
1. Navigate to the **Vehicle Setup > Parameters** screen. :::note [Parameters](../advanced_config/parameters.md) explains how to find and set parameters.
:::
1. Set [UAVCAN_ENABLE](../advanced_config/parameter_reference.md#UAVCAN_ENABLE) to the value *Sensors and Motors* (3) and then reboot the flight controller. This enables automatic enumeration of the motors (ESC) as described in the [next section](#esc-setup).
1. (Optional) Set [UAVCAN_ESC_IDLT](../advanced_config/parameter_reference.md#UAVCAN_ESC_IDLT) to 1 in order to ensure that the motors are always running at least at the idle throttle while the system is armed. :::note Some systems will not benefit from this behavior, e.g. glider drones).
:::


## ESC Setup

While UAVCAN devices are generally *plug'n'play* you will still need to enumerate (number) each of the ESC used in your system and set their direction so that they can be identified/controlled by PX4.

:::note
The ESC index and direction must match/map to the [Airframe Reference](../airframes/airframe_reference.md) for the vehicle type. ESC indexes from 0-7 map to MAIN 1-8, while ESC indexes 8-15 map to AUX 1-8.
:::

The mechanism for enumerating each type of UAVCAN ESC is different (look up the instructions in your ESC's manual). Setup information for some UAVCAN ESCs is provided below.


### Sapog ESC Enumeration using QGroundControl

This section shows how to enumerate any [Sapog-based](https://github.com/PX4/sapog#px4-sapog)-based ESCs "automatically" using *QGroundControl*.

:::tip
You can skip this section if there is only one ESC in your setup, because the ESC index is already set to zero by default.
:::

To enumerate the ESC:
1. Power the vehicle with a battery and connect to *QGroundControl*
1. Navigate to **Vehicle Setup > Power** in QGC.
1. Start the process of ESC auto-enumeration by pressing the **Start Assignment** button, as shown on the screenshot below.

   ![QGC - UAVCAN ESC auto-enumeration](../../assets/peripherals/esc_qgc/qgc_uavcan_settings.jpg)

   You will hear a sound indicating that the flight controller has entered the ESC enumeration mode.
1. Manually turn each motor in the correct direction of its rotation (as specified in the [Airframe Reference](../airframes/airframe_reference.md)), starting from the first motor and finishing with the last motor. Each time you turn a motor, you should hear a confirmation beep.

:::note
Make sure to turn each of the motors in the correct direction, as the ESC will automatically learn and remember the direction (i.e. motors that spin clockwise during normal operation must also be turned clockwise during enumeration).
:::

1. After the last motor is enumerated, the confirmation sound should change to indicate that the enumeration procedure is complete.
1. Reboot PX4 and the Sapog ESCs to apply the new enumeration IDs.

The following video demonstrates the process:

@[youtube](https://www.youtube.com/watch?v=4nSa8tvpbgQ)

### Manual ESC Enumeration using Sapog

:::tip
We recommend automated [Sapog ESC Enumeration using QGroundControl](#sapog-esc-enumeration-using-qgroundcontrol) shown above rather than manual enumeration (as it is easier and safer).
:::

You can manually configure the ESC index and direction using the [UAVCAN GUI Tool](https://uavcan.org/GUI_Tool/Overview/). This assigns the following Sapog configuration parameters for each enumerated ESC:
- `esc_index`
- `ctl_dir`

:::note
See [Sapog reference manual](https://files.zubax.com/products/io.px4.sapog/Sapog_v2_Reference_Manual.pdf) for more information about the parameters.
:::

### Myxa ESC Setup

Motor enumeration for Myxa [Telega-based ESCs](https://zubax.com/products/telega) is usually performed using the [Kucher tool](https://files.zubax.com/products/com.zubax.kucher/) (or less "GUI-friendly" [UAVCAN GUI Tool](https://uavcan.org/GUI_Tool/Overview/)).

There is some guidance here: [Quick start guide for Myxa v0.1](https://forum.zubax.com/t/quick-start-guide-for-myxa-v0-1/911) (Zubax blog).


### VESC ESC Setup

For [VESC ESCs](https://vesc-project.com/) the preferred tool for motor enumeration is the [VESC tool](https://vesc-project.com/vesc_tool). In addition to the normal motor configuration that you will have to setup in the VESC tool, you will also need to properly setup the app configuration. The recommended app setup is as follows:

| Parameter               | Option                 |
| ----------------------- | ---------------------- |
| App to use              | `No App`               |
| VESC ID                 | `1,2,...`              |
| Can Status Message Mode | `CAN_STATUS_1_2_3_4_5` |
| CAN Baud Rate           | `CAN_BAUD_500K`        |
| CAN Mode                | `UAVCAN`               |
| UAVCAN ESC Index        | `0,1,...`              |


VESC ID should have the same motor numbering as in PX4 convention, starting at `1` for top-right motor, `2` for bottom-left motor etc. However the `UAVCAN ESC Index` starts from `0`, and as such it is always one index lower than the `VESC ID`. For example, in a quadcopter the bottom left motor will have `VESC ID = 2` and `UAVCAN ESC Index = 1`.

Finally the `CAN Baud Rate` must match the value set in [UAVCAN_BITRATE](../advanced_config/parameter_reference.md#UAVCAN_BITRATE).


## Troubleshooting

#### Motors not spinning when armed

If the PX4 Firmware arms but the motors do not start to rotate, check that parameter `UAVCAN_ENABLE=3` to use UAVCAN ESCs. If the motors do not start spinning before thrust is increased, check `UAVCAN_ESC_IDLT=1`.

#### UAVCAN devices dont get node ID/Firmware Update Fails

PX4 requires an SD card for UAVCAN node allocation and during firmware update (which happen during boot). Check that there is a (working) SD card present and reboot.


## Further Information

- [PX4/Sapog](https://github.com/PX4/sapog#px4-sapog) (Github)
- [Sapog v2 Reference Manual](https://files.zubax.com/products/io.px4.sapog/Sapog_v2_Reference_Manual.pdf)
- [UAVCAN Device Interconnection](https://kb.zubax.com/display/MAINKB/UAVCAN+device+interconnection) (Zubax KB)
- [Using Sapog based ESC with PX4](https://kb.zubax.com/display/MAINKB/Using+Sapog-based+ESC+with+PX4) (Zubax KB)

