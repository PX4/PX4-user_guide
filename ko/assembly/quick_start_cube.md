# 큐브 배선 퀵 스타트

이 퀵 스타트 가이드는 [ 큐브 ](../flight_controller/pixhawk-2.md)<sup>&reg;</sup> 비행 컨트롤러에 전원을 공급하고 가장 중요한 주변 장치를 연결하는 방법을 설명합니다.

<img src="../../assets/flight_controller/cube/pixhawk2_cube_hero.png" width="400px" />

## 액세서리

큐브는 [구매 시](../flight_controller/pixhawk-2.md#stores)필요한 부속품의 대부분 (또는 전체)이 함께 제공됩니다.

![큐브 액세서리](../../assets/flight_controller/cube/cube_accessories.jpg)

예외적으로 GPS를 따로 구매해야 하는 GPS를 포함하지 않는 키트가 있습니다 ([아래를 참고하십시오](#gps)).

## 배선 개요

아래 그림은 중요한 센서와 주변기기를 연결하는 방법에 대해 설명합니다. 다음 섹션에서 각각의 장치에 대해 자세히 설명합니다.

![큐브 - 배선 개요](../../assets/flight_controller/cube/cube_wiring_overview.jpg)

1. [텔레메트리 시스템](#telemetry) — 실시간으로 기체를 제어/모니터링하고, 미션을 계획/실행할 수 있도록 합니다. 일반적으로, 텔레메트리 라디오, 태블릿/PC와 지상국 소프트웨어(예: QgroundControl)가 포함됩니다.
2. [버저](#buzzer) — 기체의 동작을 나타내는 오디오 신호를 제공합니다.
3. [원격 제어 수신기 시스템](#rc_control) — 조종사가 기체를 수동으로 조작하는 데 사용할 수 있는 휴대용 송신기에 연결합니다 (그림은 PWM->PPM 변환기를 장착한 PWM 수신기입니다).
4. (전용) [안전 스위치](#safety_switch) — 버튼을 눌러 모터를 잠금/잠금해제합니다. 내장 안전 스위치가 포함된 권장 [GPS](#gps)를 사용하지 않는 경우에만 필요합니다.
5. [GPS, 나침반, LED, 안전 스위치](#gps) — 권장 GPS 모듈은 GPS, 나침반, LED, 그리고 안전 스위치로 구성됩니다. 
6. [전원 시스템](#power) — Cube 및 모터 ESC에 전원을 공급합니다. LiPo 배터리,전원 모듈, 그리고 추가 배터리 경고 시스템 (배터리 전원이 설정된 전압보다 낮을 때 경고음)으로 구성됩니다. 

<span></span>

> **Tip** 사용 가능한 포트에 대한 자세한 내용은 여기에서 확인할 수 있습니다. [Cube > Ports ](../flight_controller/pixhawk-2.md#ports).

## 컨트롤러 장착 및 정렬

Cube를 가능한 (이상적으로는) 윗면이 위로 향하도록 하여 기체의 무게 중심에 가깝게, 그리고 화살표를 기체의 앞면을 가르키도록 장착하십시오 (큐브 윗면에 그려진 *화살표 마크*를 참고하십시오).

![튜브 마운트 - 전면 방향](../../assets/flight_controller/cube/cube_mount_front.jpg)

> **참고** 만약 컨트롤러를 권장된/기본 방향으로 장착할 수 없다면 (예: 물리적 제약), 비행 제어 소프트웨어 상 비행 제어기의 방향을 실제 [비행 제어기의 방향](../config/flight_controller_orientation.md)대로 설정해야 합니다.

Cube를 (키트에 포함된) 진동 감쇠 폼 패드 또는 장착 나사를 사용해 장착할 수 있습니다. Cube 액세서리에 포함된 장착 1.8mm 두께의 프레임보드 전용으로 설계되었습니다. 커스텀 나사는 나사산 길이가 6mm~7.55mm인 M2.5 나사여야 합니다.

![튜브 마운트 - 장착 플레이트](../../assets/flight_controller/cube/cube_mount_plate_screws.jpg)

## GPS + 나침반 + 안전 스위치 + LED {#gps}

권장되는 GPS모듈은 *Here*과 [Here+](../gps_compass/rtk_gps_hex_hereplus.md)입니다. 두 기기 모두 GPS 모듈, 나침반, 안전 스위치 그리고 [LEDs](../getting_started/led_meanings.md)를 통합한 모듈입니다.

> **참고** 두 모듈은 *Here+*는 [RTK](../advanced_features/rtk-gps.md)를 통한 센티미터 단위의 위치 제어를 제공하는 점이 다릅니다. RTK 지원을 제외하면, 두 모듈은 같은 방식으로 사용/연결됩니다.

모듈은 방향 마커가 기체 앞쪽으로 향하도록 가능한 프레임에서 멀리 장착해야 합니다 (다른 전자 장치와 나침반을 분리하면 간섭이 줄어듭니다). 제공된 8핀 케이블을 사용하여 `GPS1` 포트에 연결해야 합니다..

아래의 다이어그램은 모듈과 모듈 연결의 개요를 보여줍니다.

![여기에 + 커넥터 다이어그램](../../assets/flight_controller/cube/here_plus_connector.png)

> **참고 ** GPS 모듈의 통합 안전 스위치는 기본적으로 * *을(를) 활성화합니다(활성화된 경우 PX4는 차량에 무장을 허용하지 않습니다). 안전을 비활성화하려면 안전 스위치를 1초간 길게 누르십시오. 안전 스위치를 다시 눌러 안전을 활성화하고 차량을 해제할 수 있습니다(어떤 이유로든 리모컨이나 접지 스테이션에서 차량을 해제할 수 없는 경우 유용함).

<span></span>

> **Tip ** 구형 6핀 GPS 모듈을 사용하려면 GPS와 [ 안전 스위치 ](#safety_switch)를 모두 연결하는 데 사용할 수 있는 케이블이 키트에 함께 제공됩니다.

## 안전 스위치 {#safety_switch}

권장 GPS(내장 안전 스위치가 있는 경우)를 사용하지 않는 경우에만 큐브와 함께 제공되는 전용 안전 스위치가 필요합니다.

GPS 없이 비행하는 경우 차량을 장갑으로 고정하고 이동하기 위해(또는 기존의 6핀을 사용하는 경우) 스위치를 "0" GPS1 </code> 포트에 직접 연결해야 합니다.

## 버저

버저는 UAV 상태를 표시 하는 오디오 신호를 제공 합니다. 그림과 같이 USB 포트에 연결해야 합니다(추가 구성은 필요하지 않음).

![큐브 버저](../../assets/flight_controller/cube/cube_buzzer.jpg)

## Radio Control {#rc_control}

[ 리모트 컨트롤(RC) 라디오 시스템](../getting_started/rc_transmitter_receiver.md)은 차량을 수동으로 제어하려는 경우 필요합니다(PX4에는 자율 비행 모드를 위한 무선 시스템이 필요하지 않음).

You will need to [select a compatible transmitter/receiver](../getting_started/rc_transmitter_receiver.md) and then *bind* them so that they communicate (read the instructions that come with your specific transmitter/receiver).

아래 지침은 다양한 유형의 수신기를 연결하는 방법을 보여 줍니다.

### PPM-SUM / Futaba S.버스 수신기

제공된 3와이어 서보 케이블을 사용하여 접지(-), 전원(+) 및 신호(S) 와이어를 RC 핀에 연결합니다.

![큐브 - RCIN](../../assets/flight_controller/cube/cube_rc_in.jpg)

### 스펙트럼 위성 수신기

Spktrum DSM, DSM2 및 DSM-X Satellite RC 수신기는 SPKT/DSM 포트에 연결됩니다. 

![큐브 - 스픽트럼](../../assets/flight_controller/cube/cube_rc_spektrum.jpg)

### PWM 수신기

큐브는 각 채널 </em>에 대해 *개의 개별 와이어가 있는 PPM 또는 PWM 수신기에 직접 연결할 수 없습니다. 따라서 PWM 수신기는 hex.aero 또는 proficnc.com.에서 구매할 수 있는 PPM 인코더 모듈을 통해 RCIN 포트에 연결해야 합니다.</p> 

## Power {#power}

큐브는 일반적으로 **POWER1 ** 포트에 연결된 전원 모듈(키트와 함께 제공)을 통해 리튬 이온 폴리머(LiPo) 배터리로부터 전원을 공급받습니다. 전원 모듈은 보드에 안정적인 전원 공급 및 전압/전류 표시를 제공하며 멀티코터 차량의 모터를 구동하는 데 사용되는 ESC에 개별적으로 전원을 공급할 수 있습니다.

멀티콥터 차량의 일반적인 전원 설정은 다음과 같습니다.

![전원 설정 - MC](../../assets/flight_controller/cube/cube_wiring_power_mc.jpg)

<!-- HOw is the power rail powered for servos - power rail? Plane/Vtol would be cool to show here too -->

## 원격 측정 시스템(옵션) {#telemetry}

원격 측정 시스템을 사용하면 지상국에서 이동 중인 차량과 통신, 모니터링 및 제어할 수 있습니다(예: UAV를 특정 위치로 유도하거나 새 임무를 업로드할 수 있음).

통신 채널은 [Telecry Radios](../telemetry/README.md)을 통해 제공됩니다. 차량 기반 라디오를 ** TELEM1 ** 포트에 연결해야 합니다(이 포트에 연결된 경우 추가 구성이 필요하지 않음). 다른 라디오는 일반적으로 USB를 통해 지상국 컴퓨터 또는 모바일 장치에 연결됩니다.

![텔레메트릭 라디오](../../assets/flight_controller/cube/cube_schematic_telemetry.jpg)

## SD 카드(선택 사항)

SD 카드는 가장 일반적으로  로그에 사용되며 비행 세부 정보를 분석합니다. Micro-SD 카드를 그림과 같이 큐브에 삽입합니다(아직 없는 경우).</p> 

![큐브 - SDCard 마운트](../../assets/flight_controller/cube/cube_sdcard.jpg)

> **Tip ** SanDisk Extreme U3 32GB는  높게 권장됩니다(개발자 가이드).</p> </blockquote> 
> 
> ## Motors
> 
> 모터/servos [기체 참조](../airframes/airframe_reference.md)에 귀하의 차량에 대 한 지정 된 순서 대로 **메인** 및 **AUX** 포트에 연결 됩니다.
> 
> ![큐브 - 모터 연결](../../assets/flight_controller/cube/cube_main_aux_outputs.jpg)
> 
> > ** 노트 ** 이 참조는 지원되는 모든 공기 및 접지 프레임에 대한 모터/servo 매핑의 출력 포트를 나열합니다(기준에 프레임이 나열되지 않은 경우 올바른 유형의 "일반" 공기 프레임을 사용합니다).
> 
> 

<span></span>

> 
> > **주의** 프레임 간에 매핑이 일관되지 않습니다(예: 모든 평면 프레임에 대해 스로틀이 동일한 출력에 의존할 수 없음). 차량에 대 한 올바른 매핑을 사용할 수 있는지 확인 합니다.
> 
> ## Other Peripherals
> 
> 옵션/낮은 공통 구성요소의 배선 및 구성은 개별 [ 주변기기 ](../peripherals/README.md)의 항목에서 다룹니다.
> 
> ## Configuration
> 
> 구성은 [QGroundContro](http://qgroundcontrol.com/)을 사용 하 여 수행 됩니다.
> 
> 다운로드, 설치 하 고 *QGroundControl*를 실행, 후와 같이 컴퓨터에 보드를 연결 합니다.
> 
> ![큐브 - 컴퓨터에 대한 USB 연결](../../assets/flight_controller/cube/cube_usb_connection.jpg)
> 
> 기본/일반 구성 정보는 다음에서 다룹니다.
> 
> QuadPlane 특정 구성 여기 덮여 있다: [QuadPlane VTOL 구성](../config_vtol/vtol_quad_configuration.md)
> 
> <!-- what about config of other vtol types and plane. Do the instructions in these ones above apply for tailsitters etc? -->
> 
> ## Further information
> 
> - [큐브](../flight_controller/pixhawk-2.md) <!-- - [pixhawk2 user manual copy]()  // fold out insert shipped with doc /assets/flight_controller/cube/cube_mount_front/pixhawk2 user manual copy.pdf -->
>     
>     <!-- - [Cube Quickstart]() (HEX) -->