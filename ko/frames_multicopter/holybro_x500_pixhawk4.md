# Holybro X500 + Pixhawk4 조립

키트 조립법과 *QGroundControl*의 PX4 설정법을 설명합니다.

## 주요 정보

- **프레임:** Holybro X500
- **비행 컨트롤러:** [Pixhawk 4](../flight_controller/pixhawk4.md)
- **조립 시간 (예상):** 2시간 (프레임 조립에 75분, 오토파일럿 설치 및 설정에 45분)
- **Assembly time (approx.):** 3.75 hours (180 minutes for frame, 45 minutes for autopilot installation/configuration)

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
* Wheelbase - 500 mm
* 치수 - 410 *410* 300mm
* 433 MHz Telemetry Radio/915 MHz Telemetry Radio
* 433 MHz Telemetry Radio/915 MHz Telemetry Radio

Additionally you will need a battery and receiver ([compatible radio system](../getting_started/rc_transmitter_receiver.md)) if you want to control the drone manually.

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

The following tools are used in this assembly:

- 수신기: FR SKY Taranis
- 배터리: [4S 1300 mAh](http://www.getfpv.com/lumenier-1300mah-4s-60c-lipo-battery-xt60.html)
- 2.5 mm Hex screwdriver
- 3mm Phillips screwdriver
- 5.5 mm socket wrench or small piler
- Wire cutters
- Precision tweezers


## 패키지

Estimate time to assemble is 3.75 hours (180 minutes for frame, 45 minutes for autopilot installation/configuration)

**Step 1:** We are going to start by assembling the landing gear to the vertical pole. Unscrew the landing gear screws and insert the vertical pole, see figures 1 and 2.

![X500  전체 패키지 내용](../../assets/airframes/multicopter/x500_holybro_pixhawk4/x500_step_1_fig1.jpg)

조립 예상 시간은 120 분, 프레임 조립의 경우 약 75 분, QGroundControl에서 자동조종장치 설정에 45 분입니다.

![Landing Figure 2](../../assets/airframes/multicopter/x500_holybro_pixhawk4/x500_step_1_fig2.jpg)

(Figure 2)

**Step 2:** We proceed to put the 4 arms through the 4 motor bases shown in figure 3. Make sure the rods protrude the base slightly and are consistent throughout all 4 arms, and be sure to have the motor wires facing outward.

![착륙 그림 2](../../assets/airframes/multicopter/x500_holybro_pixhawk4/x500_step_2_fig3.png)

(그림 2)

**2 단계 :** 그림 3과 같이 4 개의 U 자형 나일론 스트랩을 사용하여 홀더를 탄소 섬유 암에 부착하여 모터 홀더를 장착합니다.

![모터](../../assets/airframes/multicopter/x500_holybro_pixhawk4/power_module.jpg)

(그림 3)

**3 단계 :** 그림 4 및 5와 같이 전원 관리 PM02를 하단 플레이트에 부착합니다.

<img src="../../assets/airframes/multicopter/x500_holybro_pixhawk4/x500_fig17.jpg" width="250" />

(그림 4)

**Step 5:** Connect the ESCs power wires onto the power module PM07, black->black and red->red, ESC PWM signal wires goes to "FMU-PWM-Out". Make sure you connect the motor ESC PWM wires in the correct order. Refer to Figure 7 for airframe motor number and connect to the corrsponding number on the PM07 board.

The color on top of the motor indicate the spin direction (figure 7-1), black tip is clockwise, and white tip is counter-clockwise. Make sure the follow the px4 quadrotor x airframe reference for direction.

![pm07_pwm](../../assets/airframes/multicopter/x500_holybro_pixhawk4/pm07_pwm.jpg) (Figure 6)

<img src="../../assets/airframes/multicopter/x500_holybro_pixhawk4/quadx.png" width="240" />
<img src="../../assets/airframes/multicopter/x500_holybro_pixhawk4/motor_direction1.jpg" width="400" />

(그림 6)

**Step 6:** Connect the 10 pin cables to FMU-PWM-in, the 6 pin cables to the PWR1 on the PM07 power module.

![pm07_pwm](../../assets/airframes/multicopter/x500_holybro_pixhawk4/pm07_cable.jpg) (Figure 8)

(그림 7)

<img src="../../assets/airframes/multicopter/x500_holybro_pixhawk4/gpsmount.jpg" width="400" />

(Figure 9)

**Step 8:** Feed the PM07 cables through the top plate. Connect the top and bottom plate by using 4 U-shaped nylon straps, screws, and nuts on each side, ensure that the motor ESC cables are inside the U-shape nylon straps like Figure 10, keep the nut loose.

<img src="../../assets/airframes/multicopter/x500_holybro_pixhawk4/top_plate.jpg" width="300" />
<img src="../../assets/airframes/multicopter/x500_holybro_pixhawk4/ushape.jpg" width="355" />

배터리 홀더가 장착 된 상태에서 그림 10과 같이 이미지에 표시된 화살표 위치에 나사를 조입니다. GPS 모듈이 전방을 향하도록 설치하여야  합니다.

**Step 9:** Push the arm tubes a bit into the frame and make sure the amount of protrusion (red square from Figure 11) are consistent on all 4 arms. Ensure all the motors are pointed directly upward, then tighten all the nuts and screws.

![Arms 3](../../assets/airframes/multicopter/x500_holybro_pixhawk4/x500_fig16.jpg)

**6 단계 :** 8 * 3 2.54mm 피치 수평 핀을 전원 관리 보드의 10 ~ 10 핀 케이블 (PWM)에 조립합니다. 10 ~ 10 핀 케이블 (PWM)을 8 * 3 2.54mm 피치 수평 핀에 연결합니다 (그림 11 참조). It is recommended to tilt the drone sideway to make the installation easier.

<img src="../../assets/airframes/multicopter/x500_holybro_pixhawk4/x500_fig9.png" width="400" />

(그림 11)

![Battery Mount 4](../../assets/airframes/multicopter/x500_holybro_pixhawk4/x500_fig10.jpg)

(Figure 12)

**Step 11:** Insert the slide bars (Figure 13) to the hanger rings. Assemble the battery mount and platform board and mount them onto the slide bars as shown in Figure 14.

![전원 모듈 3](../../assets/airframes/multicopter/x500_holybro_pixhawk4/x500_fig8.png)

(그림 13)

<img src="../../assets/airframes/multicopter/x500_holybro_pixhawk4/battery_mount1.jpg" width="400" />

(Figure 14)

**Step 12** Mount the landing gear onto the bottom plate. It is recommended to tilt the drone sideway to make this installation process easier.

![팔 2](../../assets/airframes/multicopter/x500_holybro_pixhawk4/x500_fig5.jpg)

(그림 15)

**8 단계 :** 암을 본체에 조립합니다.

<img src="../../assets/airframes/multicopter/x500_holybro_pixhawk4/gps2.jpg" width="400" />


암 튜브를 약간 밀어 넣어 그림 16의 붉은 광장에 표시된 것처럼 제자리에 단단히 고정되도록하십시오.

**Step 14:** Mount the telemetry radio onto the top plate. Plug the telemetry cable into TELEM1 port and GPS module to GPS MODULE port on the flight controller. Plug the cable from PM07 FMU-PWM-in to FMU-PWM-out and PWR1 to POWER1 on the flight controller shown in Figure 17.

![Pixhawk 4 wiring 1](../../assets/airframes/multicopter/x500_holybro_pixhawk4/fc_connections.jpg)

**9 단계 :** 모터 케이블을 연결합니다.

4 개의 암이 본체에 장착 된 후 케이블 (빨간색, 파란색, 검은 색)을 연결하고 암 튜브에 밀어 넣습니다 (그림 17 참조).

![Assembled Kit](../../assets/airframes/multicopter/x500_holybro_pixhawk4/x500_assembled.png)

(Fully assembled X500 Kit)

<span id="configure"></span>
## 조립

*QGroundControl* is used to install the PX4 autopilot and configure/tune it for the X500 frame. [Download and install](http://qgroundcontrol.com/downloads/) *QGroundControl* for your platform.

**10 단계 :** 프레임에 GPS 장착. 이를 위해서는 Pixhawk 4 GPS와 마운팅 플레이트가 필요합니다.

GPS 마스트를 플레이트에 장착하고, 4 개의 나사를 사용하여 그림 18의 빨간색 원을 참조하고, 플레이트가 그림 18의 화살표로 표시된대로 배터리 홀더 튜브에 장착된다는 점을 유의하십시오.
* [Firmware](../config/firmware.md)
* [Airframe](../config/airframe.md)

:::note
You will need to select the *Holybro S500* airframe (**Quadrotor x > Holybro S500**).
:::

![QGroundControl - Select HolyBro S500 airframe](../../assets/airframes/multicopter/x500_holybro_pixhawk4/S500_airframe_use_for_X500.jpg)

테이프를 사용하고 GPS를 GPS 마스트 상단에 붙입니다 (그림 19 참조).
* [펌웨어](../config/flight_controller_orientation.md)
* [기체](../config/compass.md)
* [Accelerometer](../config/accelerometer.md)
* [Level Horizon Calibration](../config/level_horizon_calibration.md)
* [Radio Setup](../config/radio.md)
* [Flight Modes](../config/flight_mode.md)

Ideally you should also do:
* [센서 방향](../advanced_config/esc_calibration.md)
* [나침반](../config/battery.md)
* [가속도계](../config/safety.md)

## PX4 설치 및 설정

Airframe selection sets *default* autopilot parameters for the frame. These are good enough to fly with, but it is a good idea to tune the parameters for a specific frame build.

For general information on tuning see: [Multicopter PID Tuning Guide](../config_mc/pid_tuning_guide_multicopter.md).

## 튜닝

플러그인 원격 측정 및 GPS 모듈을 비행 컨트롤러에 연결합니다 (그림 20 참조). RC 수신기, 4 개의 ESC 모두를 비행 컨트롤러와 전원 모듈에 연결합니다 (그림 21 참조).
