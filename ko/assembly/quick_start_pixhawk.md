---
canonicalUrl: https://docs.px4.io/main/ko/assembly/quick_start_pixhawk
---

# Pixhawk  배선 개요

:::warning PX4에서는 이 자동 항법 장치를 제조하지 않습니다. 하드웨어 지원이나 호환 문제는 [제조사](https://store.mrobotics.io/)에 문의하십시오. :::

*3DR Pixhawk* 비행 콘트롤러 전원 공급방법과 주변 장치 연결방법을 설명합니다.

![Pixhawk4 이미지](../../assets/flight_controller/pixhawk1/pixhawk_logo_view.jpg)

:::note
[3DR Pixhawk](../flight_controller/pixhawk.md)는 더 이상 3DR에서 제공하지 않습니다. :::note [3DR Pixhawk](../flight_controller/pixhawk.md)는 더 이상 3DR에서 제공하지 않습니다. :::

## 배선 개요

아래 이미지는 표준 Pixhawk 연결을 나타냅니다 (모터 및 서보 출력 제외). 다음 섹션에서 각 장치에 대해 자세히 설명합니다.

![Pixhawk  배선 개요](../../assets/flight_controller/pixhawk1/pixhawk_wiring_overview.jpg)

:::note
자세한 배선 정보는 [아래](#detailed-wiring-infographic-copter)에서 설명합니다. :::

## 콘트롤러 장착 및 장착 방향

*Pixhawk*는 키트에 포함된 진동 방지 패드를 프레임에 장착하여야 합니다. 차량의 무게 중심에 최대한 가까운 위치에 장착하여야하며, 화살표가 차량의 전방과 상향을 향하도록 합니다.

![Pixhawk 장착 및 방향](../../assets/flight_controller/pixhawk1/pixhawk_3dr_mounting_and_foam.jpg)

:::note
콘트롤러를 권장 기본 방향으로 장착 할 수 없는 경우(예 : 공간 제약으로 인해) 실제 장착 방향을 자동항법장치 프로그램에서 설정하여야합니다. [비행 콘트롤러 방향](../config/flight_controller_orientation.md) :::

## 부저와 안전 스위치

포함된 부저와 안전 스위치를 아래의 그림과 같이 연결하십시오 (필수).

![Pixhawk 장착 및 방향](../../assets/flight_controller/pixhawk1/pixhawk_3dr_buzzer_and_safety_switch.jpg)


## GPS와 나침반

키트에 제공된 6선 케이블을 사용하여 GPS (필수)를 GPS 포트에 연결합니다. 다른 방법으로는, 4선 케이블을 사용하여 I2C 포트에 나침반을 연결합니다 (Pixhawk에는 필요한 경우 사용할 수있는 내부 나침반이 있음).

:::note
아래 다이어그램은 결합된 GPS와 나침반을 나타냅니다.
GPS/나침반은 차량 전방 표식를 사용하여 가능하면 전자 장치들에서 멀리 떨어진 프레임에 장착하는 것이 좋습니다. 나침반은 다른 전자 장치와 떨어지면 간섭이 줄어듦니다.
:::

![나침반/GPS를 Pixhawk에 연결](../../assets/flight_controller/pixhawk1/pixhawk_3dr_compass_gps.jpg)


## 전원

그림과 같이 6선 케이블을 사용하여 *전원 모듈*(PM)의 출력을 **POWER** 포트에 연결합니다. 전원 모듈의 입력은 LiPo 배터리에 연결하여  배전판을 통하여 메인 출력은 차량 ESC/모터에 전원을 공급합니다.

전원 모듈은 비행 콘트롤러에 전원을 공급하고 모듈을 통해 공급되는 아날로그 전류 및 전압에 대한 정보를 전송합니다 (비행 콘트롤러 및 모터에 대한 전원 포함).

![Pixhawk - 전원 모듈](../../assets/flight_controller/pixhawk1/pixhawk_3dr_power_module.jpg)

:::warning
전원 모듈은 비행 콘트롤러 자체에 전원을 공급하지만, 콘트롤러의 출력 포트 (레일)에 연결된 서보 및 기타 하드웨어에 전원을 공급하지 않습니다. 멀티콥터의 경우 모터에 별도로 전원이 공급되기 때문에 이것은 중요하지 않습니다. 
:::

비행기 및 VTOL의 경우 방향타, 엘레 본 등의 서보를 구동하기 위하여 출력 레일에 별도의 전원을 공급하여야 합니다. 종종 메인 푸셔/풀러 모터는 Pixhawk 출력 레일에 연결할 수있는 통합 [BEC](https://en.wikipedia.org/wiki/Battery_eliminator_circuit)가 내장된 ESC를 사용합니다. BEC가 없으면, Pixhawk 포트에 연결하기 위해 5V BEC를 장찫하여야합니다. 전원이 없으면 서보가 작동하지 않습니다.

<!-- It would be good to have real example of this powering --> 

## 무선 조종

라디오 리모트 컨트롤(RC)은 기체를 *수동*으로 조작합니다. PX4 자율 비행 모드에는 RC는 필수 요구 사항은 아닙니다.

[호환되는 송신기/수신기를 선택](../getting_started/rc_transmitter_receiver.md)후 *바인딩*을 하여야 통신이 가능합니다. 송신기/수신기의 매뉴얼을 참고하십시오.

아래 지침은 여러 종류의 수신기를 Pixhawk에 연결한는 방법을 설명합니다.

- Spektrum 및 DSM 수신기는 **SPKT/DSM** 포트에 연결합니다. ![Pixhawk  - Spektrum 수신기용 라디오 포트](../../assets/flight_controller/pixhawk1/pixhawk_3dr_receiver_spektrum.jpg)

- PPM-SUM 및 S.BUS 수신기는 그림과 같이 **RC** 접지, 전원 및 신호 핀에 연결합니다. ![Pixhawk  - PPM/S.BUS 수신기용 라디오 포트](../../assets/flight_controller/pixhawk1/pixhawk_3dr_receiver_ppm_sbus.jpg)

- *각각의 채널이 독립적으로 배선된* PPM/PWM 수신기는 반드시 **PPM RC**포트에 *PPM 인코더를 통해* [아래와 같이](http://www.getfpv.com/radios/radio-accessories/holybro-ppm-encoder-module.html)연결합니다. PPM-Sum 수신기는 모든 채널에 하나의 케이블만 사용합니다.

무선 시스템 선택, 수신기 호환성 및 송신기/수신기 바인딩에 대한 자세한 내용은 [원격 제어 송신기 & 수신기](../getting_started/rc_transmitter_receiver.md)를 참고하십시오.


## 무선 텔레메트리(선택 사항)

무선 텔레메트리는 지상국 프로그램의 비행 차량 통신 제어용입니다(예 : UAV를 특정 위치로 지시하거나 새 임무를 업로드 할 수 있음). 아래 그림과 같이 하나의 RC 수신기를 차량에 연결하여야 합니다. 다른 RC 송신기는 지상국 컴퓨터 또는 모바일 장치에 USB를 통하여 연결합니다.

![Pixhawk/무선 텔레메트리](../../assets/flight_controller/pixhawk1/pixhawk_3dr_telemetry_radio.jpg)

<!-- what configuration is required once you've set up a radio) -->


## 모터

지원되는 모든 기체의 MAIN/AUX 출력 포트와 모터/서보 간의 매핑은 [기체 정의서](../airframes/airframe_reference.md)에 기술되어 있습니다.

:::warning
매핑이 프레임별로 일정하지지 않습니다 (예 : 모든 평면 프레임에 대해 동일한 출력의 스로틀에 의존할 수 없음).
해당 기체의 프레임의  정확한 모터 연결 여부를 확인하십시오.
:::

:::tip
프레임이 기체 참조 정의서에 없으면, 적절한 유형의 "일반"기체를 사용하십시오.
:::

:::note
출력 레일은 위의 [전원](#power) 섹션에 설명한 것과 같이 별도의 전원이 공급되어야합니다. :::
 
<!-- INSERT image of the motor AUX/MAIN ports? -->


## 기타 주변 장치

선택사항인 주변 장치들의 배선과 설정 방법은 개별 [주변 장치](../peripherals/README.md)를 참고하십시오.


## 설정

더 자세한 일반 설정 방법은 [자동항법장치 설정](../config/README.md)을 참고하십시오.

QuadPlane에 대한 자세한 설정은 [QuadPlane VTOL 설정](../config_vtol/vtol_quad_configuration.md)을 참고하십시오.

<!-- what about config of other vtol types and plane. Do the instructions in these ones above apply for tailsitters etc? -->

## 자세한 배선 정보 (헬기)

![QuadCopter Pixhawk 배선 인포 그래픽](../../assets/flight_controller/pixhawk1/pixhawk_infographic2.jpg)

## 추가 정보

- [Pixhawk 시리즈](../flight_controller/pixhawk_series.md)
- [3DR Pixhawk](../flight_controller/pixhawk.md) 
