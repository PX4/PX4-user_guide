# 큐브 배선 개요

:::warning PX4에서는 이런 종류의 자동 항법 장치를 제조하지는 않습니다. 하드웨어 지원 또는 호환 문제는 [제조사](https://cubepilot.org/#/home)와 상담하십시오.

[Cube Black](../flight_controller/pixhawk-2.md)은 [PX4](../flight_controller/autopilot_pixhawk_standard.md)에서 완전히 지원되지만, [Cube Yellow](../flight_controller/cubepilot_cube_yellow.md) 및 [Cube Orange ](../flight_controller/cubepilot_cube_orange.md)에 대한 지원은 [테스트](../flight_controller/autopilot_experimental.md) 단계입니다.
:::

이 퀵 스타트 설명서는 *Cube*<sup>&reg;</sup> 비행 컨트롤러에 전원을 공급하고 가장 중요한 주변 장치를 연결하는 방법을 설명합니다.

<img src="../../assets/flight_controller/cube/orange/cube_orange_hero.jpg" width="350px" /> <img src="../../assets/flight_controller/cube/cube_black_hero.png" width="350px" /> <img src="../../assets/flight_controller/cube/yellow/cube_yellow_hero.jpg" width="150px" />

:::tip
지침은 [큐브 블랙](../flight_controller/pixhawk-2.md), [큐브 옐로우](../flight_controller/cubepilot_cube_yellow.md) 및 [큐브 오렌지](../flight_controller/cubepilot_cube_orange.md)를 포함한 모든 큐브 변형에 적용됩니다. 추가 업데이트 정보는 [Cube 사용 설명서](https://docs.cubepilot.org/user-guides/autopilot/the-cube-user-manual) (Cube 문서)에서 확인할 수 있습니다.
:::

## 액세서리

큐브는 [구매 시](../flight_controller/pixhawk-2.md#stores)필요한 부속품의 대부분 (또는 전체)이 함께 제공됩니다.

![큐브 액세서리](../../assets/flight_controller/cube/cube_accessories.jpg)

예외적으로 GPS를 따로 구매해야 하는 GPS를 포함하지 않는 키트가 있습니다 ([아래를 참고하십시오](#gps)).

## 배선 개요

아래 그림은 중요한 센서와 주변기기를 연결하는 방법에 대해 설명합니다. 다음 섹션에서 각 장치에 대해 자세히 설명합니다.

![큐브 - 배선 개요](../../assets/flight_controller/cube/cube_wiring_overview.jpg)

1. [텔레메트리 시스템](#telemetry) — 실시간으로 기체를 제어/모니터링하고, 미션을 계획/실행할 수 있도록 합니다. 일반적으로 텔레메트리 라디오, 태블릿/PC와 지상 통제 장치 프로그램이 해당합니다.
2. [버저](#buzzer) — 기체의 동작을 나타내는 오디오 신호를 제공합니다.
3. [원격 제어 수신기 시스템](#rc_control) — 조종사가 기체를 수동으로 조작하는 데 사용할 수 있는 휴대용 송신기에 연결합니다 (그림은 PWM->PPM 변환기를 장착한 PWM 수신기입니다).
4. (전용) [안전 스위치](#safety_switch) — 버튼을 눌러 모터를 잠금/잠금해제합니다. 내장 안전 스위치가 포함된 권장 [GPS](#gps)를 사용하지 않는 경우에만 필요합니다.
5. [GPS, 나침반, LED, 안전 스위치](#gps) — 권장 GPS 모듈은 GPS, 나침반, LED, 그리고 안전 스위치로 구성됩니다. 
6. [전원 시스템](#power) — Cube 및 모터 ESC에 전원을 공급합니다. LiPo 배터리,전원 모듈, 그리고 추가 배터리 경고 시스템 (배터리 전원이 설정된 전압보다 낮을 때 경고음)으로 구성됩니다. 

:::note
`GPS2`로 표시된 포트는 PX4에서 `TEL4 `에 매핑됩니다 (즉, `GPS2`로 표시된 포트에 연결하는 경우, ` TEL4 `에 연결된 [직렬 포트 구성 매개 변수](../peripherals/serial_configuration.md)를 설정하여야합니다).
:::

:::tip
사용 가능한 포트에 대한 자세한 내용은 [Cube>Ports](../flight_controller/pixhawk-2.md#ports)에서 찾을 수 있습니다.
:::

## 콘트롤러 장착 및 장착 방향

Cube를 가능한 (이상적으로는) 윗면이 위로 향하도록 하여 기체의 무게 중심에 가깝게, 그리고 화살표를 기체의 앞면을 가르키도록 장착하십시오 (큐브 윗면에 그려진 *화살표 마크*를 참고하십시오).

![Cube 장착 - 전면 방향](../../assets/flight_controller/cube/cube_mount_front.jpg)

:::note
컨트롤러를 권장/기본 방향으로 장착하기 어려운 경우에는 (예 : 공간 제약으로 인해) 실제 장착한 방향을 소프트웨어에 설정하여야 합니다 ( [기체 콘트롤러 방향 ](../config/flight_controller_orientation.md) 참고).
:::

Cube를 (키트에 포함된) 진동 감쇠 폼 패드 또는 장착 나사를 사용해 장착할 수 있습니다. Cube 액세서리에 포함된 장착 1.8mm 두께의 프레임보드 전용으로 설계되었습니다. 커스텀 나사는 나사산 길이가 6mm~7.55mm인 M2.5 나사여야 합니다.

![Cube 마운트 - 장착 플레이트](../../assets/flight_controller/cube/cube_mount_plate_screws.jpg)

<span id="gps"></span>

## GPS + 나침반 + 안전 스위치 + LED

권장되는 GPS모듈은 *Here*과 [Here+](../gps_compass/rtk_gps_hex_hereplus.md)입니다. 두 기기 모두 GPS 모듈, 나침반, 안전 스위치 그리고 [LEDs](../getting_started/led_meanings.md)를 통합한 모듈입니다.

:::note
두 모듈은 *Here+*는 [RTK](../advanced_features/rtk-gps.md)를 통한 센티미터 단위의 위치 제어를 제공하는 점이 다릅니다. RTK 지원을 제외하면, 두 모듈은 같은 방식으로 연결됩니다.
:::

모듈은 방향 마커가 기체 앞쪽으로 향하도록 가능한 프레임에서 멀리 장착해야 합니다 (다른 전자 장치와 나침반을 분리하면 간섭이 줄어듭니다). 제공된 8핀 케이블을 사용하여 `GPS1` 포트에 연결해야 합니다..

아래의 다이어그램은 모듈과 모듈 연결의 개요를 보여줍니다.

![Here+ 연결 다이어그램](../../assets/flight_controller/cube/here_plus_connector.png)

:::note GPS
모듈에 내장된 안전 스위치는 *기본적으로* 활성화되어 있습니다 (활성화되면 PX4는 차량 시동을 걸 수 없습니다). 비활성화하려면 안전 스위치를 1초간 길게 누르십시오. 안전 스위치를 다시 눌러 안전 장치를 활성화하고 기체 시동을 끌 수 있습니다 (어떤 이유로든 조종기나 지상국 프로그램이 기체 시동을 끌 수 없을 때 유용합니다).
:::

:::tip
구형 6핀 GPS 모듈을 사용하려면, GPS와 [안전 스위치](#safety_switch)를 모두 연결하는 데 사용할 수 있는 케이블이 키트에 함께 제공됩니다.
:::

<span id="safety_switch"></span>

## 안전 스위치

Cube와 함께 구성된 *전용* 안전 스위치는 (내장 안전 스위치를 포함한) 권장 [GPS](#gps)를 사용하지 않을 경우에만 필요합니다.

GPS 없이 비행하는 경우, 기체에 시동을 걸고 비행하기 위해 안전 스위치는 반드시 `GPS1` 포트(또는 구형 6핀 케이블 사용시 제공된 케이블을 통해)에 장착되어어야 합니다.

## 버저

버저는 UAV 상태를 나타내는 소리로 나타냅니다. 버저는 아래와 같이 USB포트에 연결됩니다. (추가 설정은 필요없습니다)

![Cube 버저](../../assets/flight_controller/cube/cube_buzzer.jpg)

<span id="rc_control"></span>

## 무선 조종

무선 조종기는 기체 *수동*제어시에 사용합니다 (PX4에는 자율 비행 모드에서는 무선 조종기가 필수는 아닙니다).

기체와 조종자가 서로 통신하기 위해 호환되는 송신기/수신기를 선택하고, 송신기와 수신기를 바인드해야 합니다 (송신기와 수신기에 포함된 지시사항을 읽으십시오).

아래 지침은 다양한 유형의 수신기 연결법을 설명합니다.

### PPM-SUM / Futaba S.Bus 수신기

제공된 3-와이어 서보 케이블로 접지(-), 전원(+) 및 신호(S) 와이어를 RC 핀에 연결합니다.

![Cube - RCIN](../../assets/flight_controller/cube/cube_rc_in.jpg)

### Spektrum 위성 수신기

Spktrum DSM, DSM2 및 DSM-X Satellite RC 수신기는 **SPKT/DSM** 포트에 연결합니다.

![Cube - Spektrum](../../assets/flight_controller/cube/cube_rc_spektrum.jpg)

### PWM 수신기

Cube는 *각각의 채널이 개별적으로 배선된* PPM 또는 PWM 수신기에 바로 연결할 수 없습니다. PWM 수신기는 hex.aero 또는 proficnc.com에서 구매할 수 있는 *PPM 인코더 모듈*을 통해 **RCIN**포트에 연결해야 합니다.

## 전원

Cube는 일반적으로 **POWER1** 포트에 연결된 전원 모듈(키트와 함께 제공)을 통해 리튬 이온 폴리머(LiPo) 배터리에서 전원을 공급받습니다. 전원 모듈은 보드에 안정적인 전원 공급 및 전압/전류 표시를 제공하며 멀티콥터 기체의 모터를 구동하는 데 사용되는 ESC에 개별적으로 전원을 공급할 수 있습니다.

멀티콥터 기체의 일반적인 전원 설정은 다음과 같습니다.

![전원 설정 - MC](../../assets/flight_controller/cube/cube_wiring_power_mc.jpg)

<!-- HOw is the power rail powered for servos - power rail? Plane/Vtol would be cool to show here too -->

<span id="telemetry"></span>

## 텔레메트리 시스템 (선택 사항)

텔레메트리는 지상국 프로그램에서 비행중인 차량의 통신/제어에 사용할 수 있습니다 (예 : UAV를 특정 위치로 지시하거나 새 임무를 업로드 할 수 있음).

통신 채널은 [무선 텔레메트리](../telemetry/README.md)를 사용합니다. 기체의 텔레메트리를 **TELEM1** 포트에 연결해야 합니다 (이 포트에 연결된 경우 추가 구성이 필요하지 않음). 다른 무선 장치들은 일반적으로 지상국 컴퓨터나 모바일 장치에 (USB를 통해) 연결됩니다.

![무선 텔레메트리](../../assets/flight_controller/cube/cube_schematic_telemetry.jpg)

## SD 카드 (선택 사항)

SD 카드는 [비행 세부 정보를 기록 및 분석](../getting_started/flight_reporting.md)하고, 임무를 수행하고, UAVCAN 버스 하드웨어를 사용하는 데 필요하므로 가능하면 사용하는 것이 좋습니다. Micro-SD 카드를 그림과 같이 큐브에 삽입합니다.

![Cube - SDCard 장착](../../assets/flight_controller/cube/cube_sdcard.jpg)

:::tip
자세한 내용은 [기본 개념> SD 카드 (휴대용 메모리)](../getting_started/px4_basic_concepts.md#sd_cards)를 참조하십시오.
:::

## 모터

모터/서보는 [Airframe Reference](../airframes/airframe_reference.md)에서 차량에 지정된 순서대로 **MAIN** 및 **AUX** 포트에 연결됩니다.

![Cube - 모터 연결](../../assets/flight_controller/cube/cube_main_aux_outputs.jpg)

:::note
이 참고사항은 모든 지원되는 기체/기기 프레임의 출력 포트의 모터/서보 연결 리스트입니다 (만약 프레임이 참고사항에 기재되어 있지 않다면, 올바른 유형의 "일반" 프레임을 사용하십시오).
:::

:::caution
매핑이 프레임간에 일관 되지 않습니다 (예 : 모든 평면 프레임에 대해 동일한 출력에있는 스로틀에 의존 할 수 없음). 가지고 있는 기체의 프레임에 대해 올바르게 모터를 제대로 연결하였는지 다시 한 번 확인하십시오.
:::

## 기타 주변 장치

많이 사용하지 않는 옵션 부품들의 배선 및 조립법은 개별 [주변 장치](../peripherals/README.md)에서 설명합니다.

:::note
주변 장치를 `GPS2`로 표시된 포트에 연결하는 경우 하드웨어의 PX4 [직렬 포트 구성 매개 변수](../peripherals/serial_configuration.md)를 `TEL4` (GPS2 아님)에 할당합니다.
:::

## 설정

설정은 [QgroundControl](http://qgroundcontrol.com/)을 사용해 이뤄집니다.

*QGroundControl*를 다운로드/설치/실행한 후, 아래와 같이 비행 제어 장치를 컴퓨터에 연결합니다.

![Cube - 컴퓨터 USB 연결](../../assets/flight_controller/cube/cube_usb_connection.jpg)

더 자세한 일반 구성 정보는 [Autopilot 구성](../config/README.md)에서 다룹니다.

QuadPlane에 대한 자세한 설정은 [QuadPlane VTOL 설정](../config_vtol/vtol_quad_configuration.md)에서 다룹니다.

<!-- what about config of other vtol types and plane. Do the instructions in these ones above apply for tailsitters etc? -->

## 추가적인 정보

- [Cube Black](../flight_controller/pixhawk-2.md) 
- [Cube Yellow](../flight_controller/cubepilot_cube_yellow.md)
- [Cube Orange](../flight_controller/cubepilot_cube_orange.md)
- Cube 문서 (제조사) : 
  - [큐브 모듈 개요](https://docs.cubepilot.org/user-guides/autopilot/the-cube-module-overview)
  - [큐브 사용 설명서](https://docs.cubepilot.org/user-guides/autopilot/the-cube-user-manual)
  - [미니 캐리어 보드](https://docs.cubepilot.org/user-guides/carrier-boards/mini-carrier-board)