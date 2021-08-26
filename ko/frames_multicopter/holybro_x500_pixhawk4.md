# Holybro X500 + Pixhawk4 조립

키트 조립법과 *QGroundControl*의 PX4 설정법에 대하여 설명합니다.

## 주요 정보

- **프레임:** Holybro X500
- **비행 컨트롤러:** [Pixhawk 4](../flight_controller/pixhawk4.md)
- **조립 시간 (예상):** 2시간 (프레임 조립에 75분, 오토파일럿 설치 및 설정에 45분)
- **조립 시간 (예상):** 3.75시간 (프레임 조립에 180분, 오토파일럿 설치 및 설정에 45분)

![전체 X500 키트](../../assets/airframes/multicopter/x500_holybro_pixhawk4/x500_hero.png)

## 부품 명세서

Holybro [X500 키드](https://shop.holybro.com/x500-kit_p1180.html)에는 필수 구성 요소가 포함되어 있습니다.

* [Pixhawk 4 autopilot](../flight_controller/pixhawk4.md)
* [Pixhawk 4 GPS](https://shop.holybro.com/pixhawk-4-gps-module_p1094.html)
* [Power Management - PM07](https://shop.holybro.com/pixhawk-4-power-module-pm07_p1095.html)
* [Holybro Motors - 2216 KV880 x4](https://shop.holybro.com/motor2216-880kv-1pc_p1154.html)
* [Holybro BLHeli S ESC 20A x4](https://shop.holybro.com/blheli-s-esc-20a_p1143.html)
* [Propellers - 1045 x4](https://shop.holybro.com/propeller10452pair_p1155.html)
* 전원 관리 - PM07
* 전원 및 무선 조종기 케이블
* 휠베이스 - 500 mm
* 433 MHz Telemetry Radio/915 MHz Telemetry Radio
* 433 MHz Telemetry Radio/915 MHz Telemetry Radio

드론을 수동 제어에는 배터리와 수신기([호환 무선 시스템](../getting_started/rc_transmitter_receiver.md))가 필요합니다.

## 하드웨어

프레임과 자율비행프로그램 설치를 위한 하드웨어들 입니다.

| 항목              | 설명                           | 수량 |
| --------------- | ---------------------------- | -- |
| 소켓 캡 나사         | 모터 고정에 사용, 스테인레스 스틸 나사 M3*5  | 16 |
| 탄소 섬유 튜브-암      | 직경 : 16mm, 길이 : 200mm        | 4  |
| 모터 베이스          | 6 개의 부품과 4 개의 나사로 구성 4 개의 너트 | 4  |
| 슬라이드 바          | 직경 : 10mm, 길이 : 250mm        | 2  |
| 배터리 장착 보드       | 두께: 2mm                      | 1  |
| 배터리 패드          | 3mm 실리콘 시트 검정                | 1  |
| 철탑              | 구리 너트가 내장된 엔지니어링 플라스틱        | 2  |
| 십자 접시 머리 나사     | 스테인리스  M2.5*5mm              | 12 |
| PAN/TILT 플랫폼 보드 | 두께: 2mm                      | 1  |
| 행거 고무링 개스킷      | 내부 구멍 직경 : 10mm 검정           | 8  |
| 헹거              | 구리 너트가 내장된 엔지니어링 플라스틱        | 8  |

![X500 프레임 부품](../../assets/airframes/multicopter/x500_holybro_pixhawk4/whats_inside_x500_labeled.jpg)

### 전자부품

| 항목                | 패키지 |
| ----------------- | --- |
| Pixhawk 4         | 1   |
| Pixhawk4 GPS 모듈   | 1   |
| I2C 스플리터 보드       | 2   |
| 6 ~ 6 핀 케이블 (전원)  | 3   |
| 4 ~ 4 핀 케이블 (CAN) | 2   |
| 6 ~ 4 핀 케이블 (데이터) | 1   |

### 필요 공구

조립시에 필요한 공구들입니다.

- 수신기: FR SKY Taranis
- 배터리: [4S 1300 mAh](http://www.getfpv.com/lumenier-1300mah-4s-60c-lipo-battery-xt60.html)
- 2.5 mm 육각 스크류드라이버
- 3mm 필립스 스크류드라이버
- 5.5mm 소켓 렌치 또는 작은 파일러
- 전선 커터
- 정밀 트위저


## 조립

예상 조립 시간은 3.75시간(프레임은 180분, 자동 조종 장치 설치/설정은 45분)입니다.

1. 랜딩기어 조립부터 시작합니다. 랜딩 기어 나사를 풀고 수직 기둥을 삽입합니다(그림 1 및 2).

   ![Landing Figure 1: Components](../../assets/airframes/multicopter/x500_holybro_pixhawk4/x500_step_1_fig1.jpg)

   _그림 2_: 착륙 장치 구성 요소

   ![Landing Figure 2: Assembled](../../assets/airframes/multicopter/x500_holybro_pixhawk4/x500_step_1_fig2.jpg)

   _그림 2_: 랜딩 기어 조립

1. 그런 다음, 그림 3에 표시된 4개의 모터 베이스를 통해 4개의 암을 넣습니다. 로드가 베이스를 약간 돌출시키고 4개의 암 전체에서 일관성이 있는 지 확인하고 모터 와이어가 바깥쪽을 향하도록 합니다.

   ![Attach arms to motor bases](../../assets/airframes/multicopter/x500_holybro_pixhawk4/x500_step_2_fig3.png)

   _그림 3_: 모터 베이스에 암 부착

1. 4개의 나일론 나사와 나일론 스탠드오프를 삽입하고, 그림 4와 같이 4개의 나일론 너트를 사용하여 전원 모듈 PM07을 하단 플레이트에 부착합니다.

   ![Attach power module](../../assets/airframes/multicopter/x500_holybro_pixhawk4/power_module.jpg)

   _그림 4_: 전원 모듈 연결

1. 각 암을 통해 4개의 모터 ESC를 공급하고, 그림 5에 표시된 모터에 3선 끝을 연결합니다.

   <img src="../../assets/airframes/multicopter/x500_holybro_pixhawk4/x500_fig17.jpg" width="250" title="Connect motors" />

   _그림 5_: 모터 연결

1. ESC 전원선을 전원 모듈 PM07에 연결하고, 검정-검정 및 빨강-빨간색, ESC PWM 신호선을 "FMU-PWM-Out"으로 연결합니다. 모터 ESC PWM 와이어를 올바른 순서로 연결하였는 지 확인하십시오. 기체 모터 번호는 그림 7을 참조하고 PM07 보드의 해당 번호에 연결합니다.

   ![ESC power module and signal wiring](../../assets/airframes/multicopter/x500_holybro_pixhawk4/pm07_pwm.jpg) _그림 7_: ESC 전원 모듈 및 신호 배선

   모터 상단의 색상은 회전 방향(그림 7-1)을 나타내며, 검은색 끝은 시계 방향, 흰색 끝은 반시계 방향입니다. 모터 방향은 px4 quadrotor x 기체 정의서를 따라야 합니다(그림 7-2).

   <img src="../../assets/airframes/multicopter/x500_holybro_pixhawk4/quadx.png" width="240" />

   _그림 7_: 모터 순서/방향 다이어그램

   <img src="../../assets/airframes/multicopter/x500_holybro_pixhawk4/motor_direction1.jpg" width="400" />

   _Figure 7-1_: Motor direction

1. Connect the 10 pin cables to FMU-PWM-in, the 6 pin cables to the PWR1 on the PM07 power module.

   ![Flight controller/Power module PWM and Power connections](../../assets/airframes/multicopter/x500_holybro_pixhawk4/pm07_cable.jpg)

   _Figure 8_: Power module PWM and power wiring

1. If you want to mount the GPS on the top plate, you can now secure the GPS mount onto the top plate using 4 screws and nuts.

   <img src="../../assets/airframes/multicopter/x500_holybro_pixhawk4/gpsmount.jpg" width="400" title="Secure GPS mount onto top plate" />

   _Figure 9_: Secure GPS mount onto top plate

1. Feed the PM07 cables through the top plate. Connect the top and bottom plate by using 4 U-shaped nylon straps, screws, and nuts on each side, ensure that the motor ESC cables are inside the U-shape nylon straps like Figure 10, keep the nut loose.

   <img src="../../assets/airframes/multicopter/x500_holybro_pixhawk4/top_plate.jpg" width="300" />

   _Figure 10-1_: Feed power module cables through top plate

   <img src="../../assets/airframes/multicopter/x500_holybro_pixhawk4/ushape.jpg" width="355" title="Connecting top and bottom plate" />

   _Figure 10-2_: Connecting top and bottom plate

1. Push the arm tubes a bit into the frame and make sure the amount of protrusion (red square from Figure 11) are consistent on all 4 arms. Ensure all the motors are pointed directly upward, then tighten all the nuts and screws.

   ![Arms 3](../../assets/airframes/multicopter/x500_holybro_pixhawk4/x500_fig16.jpg)

1. Put the hanger gaskets into the 4 hangers and mount them onto the bottom plate using 8 hex screws (Figure 11). The screw holes are noted by the white arrow in Figure 12. We recommend tilting the drone sideway to make the installation easier.

   <img src="../../assets/airframes/multicopter/x500_holybro_pixhawk4/x500_fig9.png" width="400" title="Hanger gaskets" />

   _Figure 11_: Hanger gaskets

   ![Battery Mount 4](../../assets/airframes/multicopter/x500_holybro_pixhawk4/x500_fig10.jpg)

   _Figure 12_: Screw holes

1. Insert the slide bars onto the hanger rings (Figure 13). Assemble the battery mount and platform board and mount them onto the slide bars as shown in Figure 14.

   ![Battery Mount 2: Slide bars](../../assets/airframes/multicopter/x500_holybro_pixhawk4/x500_fig8.png)

   _Figure 13_: Slide bars

   <img src="../../assets/airframes/multicopter/x500_holybro_pixhawk4/battery_mount1.jpg" width="400" title="Battery mount on slide bars" />

   _Figure 14_: Battery mount on slide bars

1. Mount the landing gear onto the bottom plate. We recommend tilting the drone sideway to make this installation process easier.

   ![Landing Gear](../../assets/airframes/multicopter/x500_holybro_pixhawk4/x500_fig5.jpg)

   _Figure 15_: Landing Gear


1. Use the tape and stick the GPS to the top of the GPS mast and mount the GPS mast. Make sure the arrow on the gps is pointing forward (Figure 16).

   <img src="../../assets/airframes/multicopter/x500_holybro_pixhawk4/gps2.jpg" width="400" title="Figure 16: GPS and mast" />

   _Figure 16_: GPS and mast


1. Mount the telemetry radio onto the top plate. Plug the telemetry cable into `TELEM1` port and GPS module to `GPS MODULE` port on the flight controller. Plug the cable from PM07 `FMU-PWM-in` to `I/O-PWM-out`on the FC and PM07 `PWR1` to `POWER1` on the FC, as shown in Figure 17.

   ![Pixhawk 4 wiring 1](../../assets/airframes/multicopter/x500_holybro_pixhawk4/fc_connections.jpg)

   _Figure 17_: Mount telemetry radio/plug in PWM and Power cables to Flight controller.

Please refer to [Pixhawk 4 Quick Start](../assembly/quick_start_pixhawk4.md) for more information.

That's it. The fully assembled kit is shown below:

![Assembled Kit](../../assets/airframes/multicopter/x500_holybro_pixhawk4/X500_assembled_frame.jpg)

<a id="configure"></a>

## 조립

:::tip
Full instructions for installing and configuring PX4 can be found in [Basic Configuration](../config/README.md).
:::

*QGroundControl* is used to install the PX4 autopilot and configure/tune it for the X500 frame. [Download and install](http://qgroundcontrol.com/downloads/) *QGroundControl* for your platform.

First update the firmware and airframe:
* [Firmware](../config/firmware.md)
* [Airframe](../config/airframe.md) - You will need to select the *Holybro S500* airframe (**Quadrotor x > Holybro S500**) ![QGroundControl - Select HolyBro S500 airframe](../../assets/airframes/multicopter/x500_holybro_pixhawk4/S500_airframe_use_for_X500.jpg)

Then perform the mandatory setup/calibration:
* [펌웨어](../config/flight_controller_orientation.md)
* [기체](../config/compass.md)
* [Accelerometer](../config/accelerometer.md)
* [Level Horizon Calibration](../config/level_horizon_calibration.md)
* [Radio Setup](../config/radio.md)
* [Flight Modes](../config/flight_mode.md)

(그림 2)
* [센서 방향](../advanced_config/esc_calibration.md)
* [나침반](../config/battery.md)
* [가속도계](../config/safety.md)


## PX4 설치 및 설정

Airframe selection sets *default* autopilot parameters for the frame. These are good enough to fly with, but it is a good idea to tune the parameters for a specific frame build. For instructions on how, see: [Multicopter Basic PID Tuning](../config_mc/pid_tuning_guide_multicopter_basic.md).

## 튜닝

This build log was provided by the Dronecode Test Flight Team.
