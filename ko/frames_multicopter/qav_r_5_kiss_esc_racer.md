# QAV-R 5" KISS ESC Racer (Pixracer)

Lumenier QAV-R 5 "FPV Racing Quadcopter는 탈착식 암이 있는 견고하고 가벼우면서도 빠른 FPV 레이서입니다. *Pixracer* 비행 컨트롤러, *KISS 24A Race Edition* ESC와 기체를 이용한 조립 방법 및 설정 방법을 설명합니다. 또한 선택항목인 FPV 설정에 대한 정보를 제공합니다.

주요 정보:

- **기체:** Lumenier QAV-R 5"
- **비행 컨트롤러:** [Pixracer](../flight_controller/pixracer.md)

@[유투브](https://youtu.be/wMYgqvsNEwQ)

![QAV Racer complete](../../assets/airframes/multicopter/qav_r_5_kiss_esc_racer/preview.jpg) ![QAV Racer complete 2](../../assets/airframes/multicopter/qav_r_5_kiss_esc_racer/preview2.jpg)

## 부품 목록

### 기체(비행에 필요)

- Autopilot : ESP8266 WiFi 및 [ACSP5](https://store.mrobotics.io/product-p/auav-acsp5-mr.htm) 전원 모듈을 포함한 [AUAV](https://store.mrobotics.io/mRo-PixRacer-R14-Official-p/auav-pxrcr-r14-mr.htm)의 [ Pixracer](../flight_controller/pixracer.md)
- [기체:](http://www.getfpv.com/qav-r-fpv-racing-quadcopter-5.html) Lumenier QAV-R 5"
- 모터: [Lumenier RX2206 -11 2350KV](http://www.getfpv.com/lumenier-rx2206-11-2350kv-motor.html)
- ESCs: [KISS 24A Race Edition](http://www.getfpv.com/kiss-24a-esc-race-edition-32bit-brushless-motor-ctrl.html)
- 프로펠러: HQProp 5x4.5x3 [시계 방향](http://www.getfpv.com/hqprop-5x4-5x3rg-cw-propeller-3-blade-2-pack-green-nylon-glass-fiber.html) [반시계 방향](http://www.getfpv.com/hqprop-5x4-5x3g-ccw-propeller-3-blade-2-pack-green-nylon-glass-fiber.html)
- GPS / (외장) Mag .: [Pixhawk Mini (판매 중단)](../flight_controller/pixhawk_mini.md) 세트에서 가져온 M8N 및 재배선
- 배터리: [TATTU 1800mAh 4s 75c Lipo](http://www.getfpv.com/tattu-1800mah-4s-75c-lipo-battery.html)
- 무선 수신기: [FrSky X4R-SB](http://www.getfpv.com/frsky-x4r-sb-3-16-channel-receiver-w-sbus.html)
- 무선 송신기: [FrSky Taranis](http://www.getfpv.com/frsky-taranis-x9d-plus-2-4ghz-accst-radio-w-soft-case-mode-2.html)
- FC 감쇠 : [O-링](http://www.getfpv.com/multipurpose-o-ring-set-of-8.html)
- GPS 장착: [GPS mast](http://www.getfpv.com/folding-aluminum-gps-mast-for-dji.html)

### FPV(선택 사항)

- 카메라 : [RunCam Swift RR Edition](http://www.getfpv.com/fpv/cameras/runcam-swift-rotor-riot-special-edition-ir-block-black.html) **GoPro의 필수 고품질 광각 렌즈 포함! **
- 비디오 Tx: [ImmersionRC Tramp HV 5.8GHz 600mW](http://www.getfpv.com/fpv/video-transmitters/immersionrc-tramp-hv-5-8ghz-video-tx.html)
- Video 안테나: [TBS Triumph 5.8GHz CP](http://www.getfpv.com/fpv/antennas/tbs-triumph-5-8ghz-cp-fpv-antenna-3275.html) (SMA port fits ImmercionRC Tx)
- FPV 전압 소스 플러그: [Male JST Battery Pigtail](http://www.getfpv.com/male-jst-battery-pigtail-10cm-10pcs-bag.html) 

:::note
이 부분은 표준 FPV 5.8GHz 아날로그 FM 비디오 송신을 담당합니다. 라이브 비디오 스트림을 사용하려면 호환 수신기 및 디스플레이가 필요합니다.
:::

## 기본 프레임 조립

09:25에서 13:26 사이에이 비디오처럼 기본 센터 플레이트와 암을 조립했습니다.

<p align="center">
  <iframe width="560" height="315" src="https://www.youtube.com/embed/7SIpJccXZjM?start=565&end=806" frameborder="0" allowfullscreen></iframe>
</p>

네 개의 모터를 프레임 중앙을 향해 나오는 케이블과 함께 프레임에 장착했습니다. 각 모터에 프레임과 함께 제공되는 두 개의 긴 모터 나사를 사용하여 멀리 떨어져있는 두 개의 구멍에 삽입하였습니다.

## 동력 전달 장치 조립

KISS ESC는 성능이 우수하지만, 두 가지의 단점도 있습니다.

- BLHeli와 달리 사용하는 소프트웨어는 오픈 소스가 아닙니다 
- 미리 납땜된 전선 또는 플러그가 있는 하드웨어가 없습니다.

즉, 모든 ESC에 최소 6 개의 조인트를 납땜해야 하지만 그만한 가치는 충분합니다.

:::tip
실제로 납땜하기 전에 항상 납땜으로 연결하려는 양면에 주석을 추가하십시오. 이렇게하면 훨씬 편리하게 납땜 할 수 있고, 콜드 솔더링 조인트가 생길 가능성이 줄어 듭니다.
:::

:::tip
배터리에서 모터까지 고전류를 전달하는 전원 연결에 적절한 케이블 게이지를 사용하는지 확인하십시오. 모든 신호 케이블은 타 케이블에 비하여 매우 얇을 수 있습니다.
:::

:::tip
납땜을 시작하기 전에 케이블에 열 수축을 가하십시오! Heatshrinking the ESCs, the power module and the free floating uninsulated wire soldering joints after a successful function test will protect them from dirt, moisture and physical damage.
:::

### Motors

First I cut all three motor cables to directly fit when the ESCs are mounted on the arms shifted towards the center but still let enough slack to allow easy placement of the parts and not produce any tension on the cables. Then I soldered them in the order they come out of the motor to the output contacts of the ESCs which are oriented with the switching MOS-FETs facing upwards to get good air cooling during flight. Choosing this cable order resulted in all the motors spinning counter-clockwise in my tests and I switched where necessary the direction of rotation by bridging the dedicated [JP1 solder jumper](https://1.bp.blogspot.com/-JZoWC1LjLis/VtMP6XdU9AI/AAAAAAAAAiU/4dygNp0hpwc/s640/KISS-ESC-2-5S-24A-race-edition-32bit-brushless-motor-ctrl.jpg) to conform the [Quadrotor x configuration](../airframes/airframe_reference.md#quadrotor-x).

![Power motor connections](../../assets/airframes/multicopter/qav_r_5_kiss_esc_racer/power-motor-connections.jpg)

### Power Module

First I soldered the XT60 connector which comes with the frame to the labeled battery side of the *ACSP5 power module* that was shipped with the Pixracer and added the elco capacitor delivered with the power module with the correct polarity to the same side.

![ACSP5 power module](../../assets/airframes/multicopter/qav_r_5_kiss_esc_racer/acsp5_power_module.jpg)

Now comes the tricky part. I soldered all four ESC voltage source + and - ports to the corresponding pad on the labeled ESC output side of the power module. Make sure to not have any cold solder joint here because the quad will not end up well with a loose connection in flight. Using the additional power distribution board of the frame would make the job a lot easier but also takes too much space on such a small frame...

:::tip
If you are also including the FPV parts don't forget to also solder your JST male power plug to the output side of the power module. You'll need it for your [FPV setup](#fpv-setup) later on.
:::

![Power module](../../assets/airframes/multicopter/qav_r_5_kiss_esc_racer/power-module.jpg)

### Signal Cables

I used thin cables with a standardized pin header connector which were cut in half for the ESC signal because this will allow easy plugging on the Pixracer pins later on. Only the labeled `PWM` port on the [KISS ESCs](https://1.bp.blogspot.com/-0huvLXoOygM/VtMNAOGkE5I/AAAAAAAAAiA/eNNuuySFeRY/s640/KISS-ESC-2-5S-24A-race-edition-32bit-brushless-motor-ctrl.jpg) is necessary for flying. They will be connected to the correct motor signal output of the pixracer. The `TLM` port is for ESC telemetry and I soldered them on for future use as the needed protocol is not currently supported by PX4.

![Power ESC signals](../../assets/airframes/multicopter/qav_r_5_kiss_esc_racer/power-esc-signals.jpg)

I tested all ESC motor pairs and their rotation directions using a cheap PWM servo tester before proceeding further.

![Motor test](../../assets/airframes/multicopter/qav_r_5_kiss_esc_racer/motor-test.jpg)

<span id="mounting"></span>

## Connecting & Mounting Electronics

:::tip
Double check the pin assignment of every component you connect. Sadly not every hardware component out there is plug and play even if it may look like this at first glance.
:::

You'll need the [hardware documentation of the Pixracer](../flight_controller/pixracer.md) for this step to find all needed connectors. I tried to route all the cables under the Pixracer board to have a clean build and save space for FPV camera and transmitter in the future.

I mounted the Pixracer using the nylon spacers and screws that get shipped with the QAV-R frame but **put some small O-rings** between the board and the spacers to add a bit of vibration dampening. Make sure to **not tighten the screws too much or little**, do it such that the board clearly touches both sides but is not clamped with any tension. The board should not dangle in any way but be slightly movable if you apply force to it with your fingers.

:::warning
This can heavily influence the vibration noise level your gyroscope and accelerometer sensors measure during flight.
:::

![](../../assets/airframes/multicopter/qav_r_5_kiss_esc_racer/mount-oring.jpg)

![Center connections](../../assets/airframes/multicopter/qav_r_5_kiss_esc_racer/center-connections.jpg) ![Center overview](../../assets/airframes/multicopter/qav_r_5_kiss_esc_racer/center-overview.jpg)

### RC Receiver

I hooked up the FrSky S-BUS receiver using the cable shipped with the Pixracer but cut away the unnecessary cable branch.

For the smart telemetry port I used the cable shipping with the receiver. I removed all unnecessary pins from the connector using tweezers and switched the white loose end cable to the correct pin of the connector to have the "smart" signal connected. I then soldered the loose end to a cable fitting the FrSky port following this schematic:

![schematic](../../assets/flight_controller/pixracer/grau_b_pixracer_frskys.port_connection.jpg)

I also skipped the ground (GND) pin because like the voltage supply positive pin it is already connected through the RCin S-BUS cable.

![](../../assets/airframes/multicopter/qav_r_5_kiss_esc_racer/rc-receiver-connections.jpg)

### RC Antenna Mount

To have a good RC link while not risking to have the antenna in the props I employed a rugged mount method using heat shrinks and zip ties.

![](../../assets/airframes/multicopter/qav_r_5_kiss_esc_racer/rc-antenna-mount-material.jpg)

For this method you cut the big end with the hole off the zip tie, put the rest together with the antenna cable through a long heat shrink and mount this to your frame spacers using a bigger but shorter heat shrink.

![](../../assets/airframes/multicopter/qav_r_5_kiss_esc_racer/rc-antenna-mount.jpg)

### ESC Signal

For the ESC signals I followed the [hardware documentation of the Pixracer](../flight_controller/pixracer.md) and the [Quadrotor x configuration](../airframes/airframe_reference.md#quadrotor-x) motor numbering scheme. As we have no ground or positive BEC voltage connections we connect our `PWM` ESC signal cables each to its topmost pins of the corresponding output connector.

### GPS / External Magnetometer

I took the GPS cable which fits the connector of the used GPS and came with the Pixracer set. Sadly the pin assignment was completely wrong and I rewired the connector again using tweezers according to the [3DR Pixhawk Mini user manual](../flight_controller/pixhawk_mini.md#connector-pin-assignments-pin-outs) GPS port.

#### Pixracer GPS/I2C Port

| Pin | Assignment |
| --- | ---------- |
| 1   | GND        |
| 2   | SDA        |
| 3   | SCL        |
| 4   | RX         |
| 5   | TX         |
| 6   | +5V        |

#### M8N 3DR Pixhawk mini GPS Connector

| Pin     | Assignment | Connect to Pixracer Pin |
| ------- | ---------- | ----------------------- |
| 1 (red) | SCL        | 3                       |
| 2       | SDA        | 2                       |
| 3       | VCC 5V     | 6                       |
| 4       | RX         | 5                       |
| 5       | TX         | 4                       |
| 6       | GND        | 1                       |

I mounted the GPS module using the listed generic multicopter GPS mast because mounting it any closer to the main body made the magnetometer readings totally unusable. An experiment mounting the module directly to the far back of the top of the frame showed 6 times magnetometer magnitude noise most likely caused by the magnetic field of the ESC currents. Note that I shortened the mast by ~2cm to make it better fit the cable length and the frame dimensions. The GPS module is sticked with double sided tape to top plate of the mast.

## FPV Setup

This are instruction for the optional 5.8GHz FPV live video transmission. You'll need the additional FPV parts listed at the beginning. The FPV transmission described here is electronically independent of the flight controller, it only takes the battery voltage after the power module.

I first did a bench test to make sure everything is working correctly. For this connect the video signal cable that comes with your transmitter and plug it to the back of your FPV camera and to the matching plug of the transmitter. Screw the Then connect the JST power plug to your draft vehicle or to some other voltage source. The transmitter LED should light up. Use your 5.8GHz receiver device tuned in to the correct channel to check for the video. To configure the transmitter to an other channel and adjust the transmission power please refer to the [Tramp HV User Manual](https://www.immersionrc.com/?download=5016).

![FPV wiring](../../assets/airframes/multicopter/qav_r_5_kiss_esc_racer/fpv-wiring.jpg)

Like you can see I mounted the transmitter from the inside to the "roof" of the frame using a ziptie. Always put a self sticking piece of foam in between when mounting electronics like this to avoid physical damage during flight. Make sure to place the transmitter such that the antenna connector fits to the dedicated hole of the frame.

![Transmitter](../../assets/airframes/multicopter/qav_r_5_kiss_esc_racer/fpv-tx.jpg)

The magnificent FPV camera set in the part list comes not only with the best FPV lens I've seen so far but also includes multiple camera mounts one of which is very flexible for adjusting the camera angle and nicely fits into the QAV-R frame. I mounted it like you can see in the next picture. The two screws and nuts to lock the camera mount to the frame were taken from the spare ones remaining from the frame set.

![Camera](../../assets/airframes/multicopter/qav_r_5_kiss_esc_racer/fpv-cam.jpg)

## Software Configuration

:::warning
Always make sure to have either battery or propellers physically removed from your vehicle during any initial configuration. Better safe than sorry!
:::

For general configuration instruction please see [Basic Configuration](../config/README.md).

For this build I pulled the latest PX4 master because it supports the "FMU as task" improvements (included and enabled by default since PX4 v1.7) and flashed it to the Pixracer. I used [QGC](http://qgroundcontrol.com/) daily build to configure the following:

- Choose the [Generic 250 Racer configuration](../airframes/airframe_reference.md#copter_quadrotor_x_generic_250_racer) Airframe
- Calibrate the sensors
- Set the battery to 4S (4 cell LiPo) with charged cell voltage 4.15V and empty cell voltage 3.5V
- Calibrate the voltage devider through typing in the current accurate voltmeter measurement
- Calibrate the RC cannels with the Taranis already configured for two additional switch inputs. One switch in the top right corner of the Taranis front plate for the mode switch and the other switch in the top left corner of the front plate as arm switch.
- You can also set up an arming switch.

### Tuning

Here's the general [Tuning Guide](../config_mc/pid_tuning_guide_multicopter.md) with instructions on all the basics.

### Log Examples

[Log in FPV acro flight (maximum values: 108km/h speed, 85A total current draw)](https://logs.px4.io/plot_app?log=9c311942-bc7c-4b0c-8be8-eeb64fa8192c)

[Log in (mostly) manual LOS flight for the entire battery](https://logs.px4.io/plot_app?log=6de8b8cd-74f9-4eae-ad2f-76867e916f4f)