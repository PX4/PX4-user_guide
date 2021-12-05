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
    <img src="../../assets/peripherals/esc_usavcan_zubax_sadulli/sadulli_top.jpg" alt="Sadulli - 상단" /><br><a href="https://shop.zubax.com/collections/integrated-drives/products/sadulli-integrated-drive-open-hardware-reference-design-for-mitochondrik?variant=27740841181283">Zubax Sadulli 통합 드라이브</a>
  </div>
  
  <div class="image_column">
  <img src="../../assets/peripherals/esc_uavcan_zubax_orel20/orel20_top.jpg" alt="Orel20 - 상단"/><br><a href="https://zubax.com/products/orel_20">Zubax Orel 20</a>
  </div>

  <div class="image_column">
    <img src="../../assets/peripherals/esc_uavcan_holybro_kotleta20/kotleta20_top.jpg" alt="Holybro Kotleta20 상단" /><br><a href="https://shop.holybro.com/kotleta20_p1156.html">Holybro Kotleta20</a>
  </div>

</div>

## PX4 지원 ESC

PX4 is compatible with any/all UAVCAN v0 ESCs. At time of writing PX4 does not yet support UAVCAN v1.0.

:::note
작성 당시 PX4는 UAVCAN v0.x (v1.0 아님)를 지원합니다. The main difference between UAVCAN ESCs from a setup perspective is that the physical connectors and the software tools used to configure the motor order and direction may be different.

설정 관점에서 UAVCAN ESC의 유일한 차이점은 모터 순서와 방향을 구성하는  커넥터와 소프트웨어가 다를 수 있다는 것입니다.
- [Sapog](https://github.com/PX4/sapog#px4-sapog) 펌웨어; 전기 무인 기체의 추진 시스템에 사용하도록 설계된 고급 오픈 소스 센서리스 PMSM/BLDC 모터 컨트롤러 펌웨어입니다.
  - [Zubax Orel 20](https://zubax.com/products/orel_20)
  - [Holybro Kotleta20](https://shop.holybro.com/kotleta20_p1156.html)
- [Zubax Myxa](https://zubax.com/products/myxa) - High-end PMSM/BLDC motor controller (FOC ESC) for light unmanned aircraft and watercraft. :::note ESC based on the Zubax Telega sensorless FOC motor control technology (e.g., Zubax Myxa, Mitochondrik, Komar, etc.) require non-trivial tuning of the propulsion system in order to deliver adequate performance and ensure robust operation.

  Users who lack the necessary tuning expertise are advised to either [purchase pre-tuned UAV propulsion kits](https://zubax.com/products/uav_propulsion_kits) or to use Zubax Robotic's professional tuning service. Questions on this matter should be addressed to: [support@zubax.com](mailto:support@zubax.com).
:::
- [Zubax Mitochondrik](https://zubax.com/products/mitochondrik) - integrated sensorless PMSM/BLDC motor controller chip (used in ESCs and integrated drives)
  - [Zubax Sadulli Integrated Drive](https://shop.zubax.com/collections/integrated-drives/products/sadulli-integrated-drive-open-hardware-reference-design-for-mitochondrik?variant=27740841181283)
- [VESC 프로젝트 ESC](https://vesc-project.com/) ([Benjamin Vedder의 블로그](http://vedder.se) - 프로젝트 소유자 참조)
- [OlliW의 UC4H ESC - 액추에이터 노드](http://www.olliw.eu/2017/uavcan-for-hobbyists/#chapterescactuator)
- 그 외 다수가 [여기에 기술](https://forum.uavcan.org/t/uavcan-esc-options/452/3?u=pavel.kirienko)되어 있습니다.

:::note
This list is *not exhaustive/complete*. If you know of another ESC, please add it to the list!
:::

## 구매

Sapog-based ESCs:
- [Zubax Orel 20](https://zubax.com/products/orel_20)
- [Holybro Kotleta20](https://shop.holybro.com/kotleta20_p1156.html)

Sapog 기반 ESC:
- [Zubax Sadulli 통합 드라이브](https://shop.zubax.com/collections/integrated-drives/products/sadulli-integrated-drive-open-hardware-reference-design-for-mitochondrik?variant=27740841181283)

:::note
There are many other commercially available ESCs; please add new links as you find them!
:::


<!--
![Orel20 - Top](../../assets/peripherals/esc_uavcan_zubax_orel20/orel20_top.jpg)
![Kotleta20 - Top](../../assets/peripherals/esc_uavcan_holybro_kotleta20/kotleta20_top.jpg)
![Kotleta20 - Bottom](../../assets/peripherals/esc_uavcan_holybro_kotleta20/kotleta20_bottom.jpg)
![Sadulli - Top](../../assets/peripherals/esc_usavcan_zubax_sadulli/sadulli_top.jpg)
-->


## 배선

Connect all of the on-board UAVCAN devices into a chain and make sure the bus is terminated at the end nodes. The order in which the ESCs are connected/chained does not matter.

For more information see [UAVCAN > Wiring](../uavcan/README.md#wiring).

:::note
All UAVCAN ESCs share the same connection architecture/are wired the same way. Note however that the actual connectors differ (e.g. *Zubax Orel 20* and *Holybro Kotleta20* use Dronecode standard connectors (JST-GH 4 Pin) - while VESCs do not).
:::

## PX4 설정

In order to use a UAVCAN ESC with PX4 you will need to enable the UAVCAN driver:
1. 배터리에서 기체에 전원을 공급하고 (비행 콘트롤러뿐만 아니라 전체 기체에 전원을 공급하여야 함) *QGroundControl*을 연결합니다.
1. **기체 설정 > 매개 변수** 화면으로 이동합니다. :::note [매개변수](../advanced_config/parameters.md)에서 매개변수를 검색/설정 방법을 설명합니다.
:::
1. [UAVCAN_ENABLE](../advanced_config/parameter_reference.md#UAVCAN_ENABLE)을 *센서 및 모터* (3) 값으로 설정후, 비행 콘트롤러를 재부팅합니다. 이렇게 하면 [다음 섹션](#esc-setup)에 설명대로 모터(ESC)의 자동 열거가 가능합니다.
1. (선택 사항) [UAVCAN_ESC_IDLT](../advanced_config/parameter_reference.md#UAVCAN_ESC_IDLT)를 1로 설정하여 시스템이 준비된 동안 모터가 항상 최소한 유휴 스로틀에서 실행되도록 합니다. :::note 일부 시스템은이 동작의 장점을 사용하지 못합니다 (예: 글라이더 드론).
:::


## ESC 설정

PX4에서 UAVCAN ESC를 사용하려면 UAVCAN 드라이버를 활성화하여야 합니다.

:::note
The ESC index and direction must match/map to the [Airframe Reference](../airframes/airframe_reference.md) for the vehicle type. ESC indexes from 0-7 map to MAIN 1-8, while ESC indexes 8-15 map to AUX 1-8.
:::

:::note ESC
색인과 방향은 기체 유형에 대한 [기체 정의서](../airframes/airframe_reference.md)와 일치/매핑되어야 합니다. 0-7의 ESC 인덱스는 MAIN 1-8에 매핑되고, ESC 인덱스 8-15는 AUX 1-8에 매핑됩니다.


### QGroundControl을 사용한 Sapog ESC 열거

This section shows how to enumerate any [Sapog-based](https://github.com/PX4/sapog#px4-sapog)-based ESCs "automatically" using *QGroundControl*.

:::tip
You can skip this section if there is only one ESC in your setup, because the ESC index is already set to zero by default.
:::

To enumerate the ESC:
1. 배터리로 기체에 전원을 공급하고 *QGroundControl*에 연결합니다.
1. **기체 설정 > QGC 전력** 화면으로 이동합니다.
1. 아래 스크린 샷과 같이 **Start Assignment** 버튼을 눌러서, ESC 자동 열거 프로세스를 시작합니다.

   ![QGC-UAVCAN ESC 자동 열거](../../assets/peripherals/esc_qgc/qgc_uavcan_settings.jpg)

   비행 컨트롤러가 ESC 열거 모드에 진입한 소리가 들립니다.
1. 첫 번째 모터에서 시작하여 마지막 모터로 마무리하면서 각 모터를 올바른 회전 방향 ([Airframe Reference](../airframes/airframe_reference.md)에 지정된대로)으로 수동으로 돌립니다. 모터를 돌릴 때마다 확인음이 들려야합니다.

   :::note ESC가 자동으로 방향을 학습하고 기억하므로 각 모터를 올바른 방향으로 돌리십시오 (즉, 정상 작동 중에 시계 방향으로 회전하는 모터도 열거 중에 시계 방향으로 돌려야 함).
:::

1. 마지막 모터가 열거된 후에는 열거 절차가 완료되었음을 알리는 확인 소리가 변경되어야합니다.
1. PX4와 Sapog ESC를 재부팅하여 새 열거 ID를 적용합니다.

ESC를 열거하려면:

@다음 비디오는 프로세스를 보여줍니다.

### Sapog를 사용한 수동 ESC 열거

:::tip
We recommend automated [Sapog ESC Enumeration using QGroundControl](#sapog-esc-enumeration-using-qgroundcontrol) shown above rather than manual enumeration (as it is easier and safer).
:::

:::tip
수동 열거보다는 위에 표시된 자동화된 [Sapog ESC 열거](#sapog-esc-enumeration-using-qgroundcontrol)를 권장합니다 (더 쉽고 안전하기 때문입니다). This assigns the following Sapog configuration parameters for each enumerated ESC:
- `esc_index`
- `ctl_dir`

[UAVCAN GUI 도구](https://uavcan.org/GUI_Tool/Overview/)를 사용하여 ESC 색인과 방향을 수동으로 설정할 수 있습니다. 이렇게하면 열거된 각 ESC에 대하여, 다음 Sapog 설정 매개변수가 할당됩니다.

### Myxa ESC 설정

Motor enumeration for Myxa [Telega-based ESCs](https://zubax.com/products/telega) is usually performed using the [Kucher tool](https://files.zubax.com/products/com.zubax.kucher/) (or less "GUI-friendly" [UAVCAN GUI Tool](https://uavcan.org/GUI_Tool/Overview/)).

Myxa [Telega 기반 ESC](https://zubax.com/products/telega)에 대한 모터 열거는 일반적으로 [Kucher 도구](https://files.zubax.com/products/com.zubax.kucher/) (또는 덜 "GUI 친화적"인 [UAVCAN GUI 도구](https://uavcan.org/GUI_Tool/Overview/))를 사용합니다.


### VESC ESC 설정

For [VESC ESCs](https://vesc-project.com/) the preferred tool for motor enumeration is the [VESC tool](https://vesc-project.com/vesc_tool). In addition to the normal motor configuration that you will have to setup in the VESC tool, you will also need to properly setup the app configuration. The recommended app setup is as follows:

| 매개변수                    | 옵션                     |
| ----------------------- | ---------------------- |
| 사용할 앱                   | `No App`               |
| VESC ID                 | `1,2,...`              |
| Can Status Message Mode | `CAN_STATUS_1_2_3_4_5` |
| CAN Baud Rate           | `CAN_BAUD_500K`        |
| CAN Mode                | `UAVCAN`               |
| UAVCAN ESC Index        | `0,1,...`              |


[VESC ESC](https://vesc-project.com/)의 경우 모터 열거에 선호되는 도구는 [VESC 도구](https://vesc-project.com/vesc_tool)입니다. VESC 도구에서 설정하는 일반 모터 설정 외에도 앱 구성을 올바르게 설정하여야 합니다. 권장되는 앱 설정은 다음과 같습니다.

Finally the `CAN Baud Rate` must match the value set in [UAVCAN_BITRATE](../advanced_config/parameter_reference.md#UAVCAN_BITRATE).


## 문제 해결

#### 시동시 모터가 회전하지 않음

If the PX4 Firmware arms but the motors do not start to rotate, check that parameter `UAVCAN_ENABLE=3` to use UAVCAN ESCs. If the motors do not start spinning before thrust is increased, check `UAVCAN_ESC_IDLT=1`.

#### UAVCAN 장치가 노드 ID를 얻지 못함 / 펌웨어 업데이트 실패

PX4 펌웨어 암이 회전하지만 모터가 회전을 시작하지 않는 경우, UAVCAN ESC를 사용하려면 매개 변수 `UAVCAN_ENABLE=3`을 확인하십시오. 추력이 증가하기 전에 모터가 회전을 시작하지 않으면 `UAVCAN_ESC_IDLT=1`을 확인하십시오.


## 추가 정보

- [PX4/Sapog](https://github.com/PX4/sapog#px4-sapog) (Github)
- [Sapog v2 설명서](https://files.zubax.com/products/io.px4.sapog/Sapog_v2_Reference_Manual.pdf)
- [UAVCAN 장치 상호 연결](https://kb.zubax.com/display/MAINKB/UAVCAN+device+interconnection) (Zubax KB)
- [PX4와 함께 Sapog 기반 ESC 사용](https://kb.zubax.com/display/MAINKB/Using+Sapog-based+ESC+with+PX4) (Zubax KB)

