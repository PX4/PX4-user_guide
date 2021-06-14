# PX4 Vision Autonomy 개발 키트

[*PX4 Vision Autonomy 개발 키트*](http://www.holybro.com/product/px4-vision/)는 자율 비행 차량용 컴퓨터 비전 개발을 위한 견고하고 저렴한 키트입니다.

![Overview](../../assets/hardware/px4_vision_devkit/px4_vision_kit_hero.jpg)

이 키트에는 *Pixhawk 4* 비행 컨트롤러, *UP Core* 보조 컴퓨터(4GB 메모리와 64GB eMMC), 후두부 *구조 코어* 깊이 카메라 센서가 장착된 거의 즉시 비행 가능한 탄소 섬유 쿼드 콥터가 포함되어 있습니다.

:::note
이 제품에는 사전 설치된 소프트웨어가 없습니다. [PX4/Avoidance](../computer_vision/obstacle_avoidance.md) 로컬 플래너 소프트웨어의 참조 구현이 포함된 사전 이미지화 된 USB 스틱은 *Auterion*에서 제공합니다. 이 소프트웨어는 PX4 Vision Autonomy Kit로 수행 가능 작업에 대한 매우 기본적인 예제들을 제공합니다. 개발자는이 키트를 사용하여 [PX4 회피](https://github.com/PX4/avoidance#obstacle-detection-and-avoidance) 프로젝트에서 제공하는 다른 기능을 시험해보고, 기존 코드를 수정하거나, 새로운 컴퓨터 비전 기능을 실험할 수 있습니다.
:::

이 가이드는 기체 비행 준비에 필요한 최소한의 추가 설정을 설명합니다(RC 시스템과 배터리 설치). 또한 처녀 비행과 컴퓨터 비전 코드 수정 방법을 설명합니다.

## 구매처

- [Holybro 웹사이트](https://shop.holybro.com/px4-vision_p1225.html?)

## Px4 비전 가이드 콘텐츠
- [경고와 알림](#warnings-and-notifications)
- [내부 내용](#what-is-inside)
- [그 외 필요한 것](#what-else-do-you-need)
- [최초 설정](#first-time-setup)
- [드론 회피 비행](#fly-the-drone-with-avoidance)
- [키트 개발](#development-using-the-kit)
- [Px4 비전 캐리어 보드 핀아웃](#px4-vision-carrier-board-pinouts)
- [기타 개발 리소스](#other-development-resources)
- [기술 지원 방법](#how-to-get-technical-support)

## 경고와 알림

1. 이 키트는 전방 카메라를 사용하는 컴퓨터 비전 프로젝트용입니다. 하향 또는 후방 깊이 카메라가 없습니다. 따라서, 추가 수정없이는 [안전 착륙](../computer_vision/safe_landing.md) 또는 하방향 카메라가 필요한 다른 기능들을 테스트할 수 없습니다.
1. 임무에서 장애물 회피는 GPS를 사용시에 테스트 가능합니다. 임무 수행시에는 GPS 좌표를 사용합니다. 충돌 방지는 GPS와 광학 흐름에서 위치 잠금시에 위치 모드에서 테스트할 수 있습니다.
1. `USB1`로 표시된 포트는 *USB3* 주변 장치와  동시에 사용하는 경우에는 GPS를 방해할 수 있습니다(임무를 포함한 GPS 종속 기능 비활성화). 이로 인하여, 부팅 이미지가 *USB2.0* 메모리 스틱으로 제공됩니다.
1. ECN 010 이상의 PX4 Vision(캐리어 보드 RC05 이상), *UP Core*는 DC 플러그 또는 배터리로 전원을 공급할 수 있습니다. ![RC Number](../../assets/hardware/px4_vision_devkit/rc.png) ![ECN Number](../../assets/hardware/px4_vision_devkit/Serial_Number_Update.jpg)

:::warning ECN이 RC04 아래 010/캐리어 보드 미만인 PX4 Vision의 경우 *UP Core*는 배터리로 전원을 공급하여야합니다. *UP Core 전원* 소켓 안전 커버를 제거하지 마십시오.

![Warning - do not connect power port](../../assets/hardware/px4_vision_devkit/warning_power_port_update.png)
:::

## 내부 내용
![Whats inside](../../assets/hardware/px4_vision_devkit/holybro_px4_vision_whats_inside_top.jpg)

![Whats inside](../../assets/hardware/px4_vision_devkit/holybro_px4_vision_whats_inside.jpg)

<img src="../../assets/hardware/px4_vision_devkit/Explode-view.png" width="500px" title="Pixhawk4 Upright Image" />

PX4 Vision DevKit에는 아래의 내용물들이 포함되어 있습니다.
- 핵심 구성 요소:
  - 1x Pixhawk 4 비행 컨트롤러(사용자 지정 PX4 펌웨어 포함)
  - 1x PMW3901 광학 유량 센서
  - 1x TOF 적외선 거리 센서 (PSK‐CM8JL65‐CC5)
  - 1x 구조 코어 깊이 카메라
    - 160도 와이드 비전 카메라
    - 스테레오 적외선 카메라
    - 온보드 IMU
    - 강력한 NU3000 멀티 코어 깊이 프로세서
  - 1x *UP Core* 컴퓨터 (4GB 메모리 및 64GB eMMC, Ubuntu 및 PX4 회피 기능)
    - Intel® Atom ™ x5-z8350 (최대 1.92GHz)
    - 호환 OS : Microsoft Windows 10 정식 버전, Linux (ubilinux, Ubuntu, Yocto), Android
    - 비행 컨트롤러에 연결된 FTDI UART
    - `USB1` : USB3.0 USB2.0 스틱에서 PX4 회피 환경을 부팅용 포트입니다(USB3.0 주변 장치를 연결하면 GPS 장애 발생할 수 있음).
    - `USB2` : JST-GH 커넥터의 USB2.0 포트. 두 번째 카메라, LTE 등에 사용할 수 있습니다. (또는 개발용 키보드 / 마우스).
    - `USB3` : 깊이 카메라에 연결된 USB2.0 JST-GH 포트
    - `HDMI` : HDMI 출력
    - SD 카드 슬롯
    - WiFi 802.11 b/g/n @ 2.4GHz (외부 안테나 #1에 연결됨). 컴퓨터 인터넷 액세스와 업데이트를 위하여 홈 WiFi 네트워크에 액세스할 수 있습니다.


- 기계적 사양 :
  - 프레임 : 전체 5mm 3k 탄소 섬유 능직
  - 모터 : T-MOTOR F60 PROⅢ KV1750
  - ESC : BEHEli-S 20A ESC
  - 프로펠러 : T6045
  - GPS : Pixhawk4 GPS 모듈
  - 전원 모듈 : Holybro PM07
  - 축거 : 286mm
  - 중량 : 854g (배터리 또는 소품 제외)
  - 텔레메트리 : 비행 컨트롤러에 연결된 ESP8266 (외부 안테나 #2에 연결됨). 지상국에 대한 무선 연결을 활성화합니다.


- Auterion에서 제공하는 아래의 번들들이 사전 플래시된 소프트웨어가 포함된 USB2.0 스틱 :
  - Ubuntu 18.04 LTS
  - ROS Melodic
  - 후두 구조 코어 ROS 드라이버
  - MAVROS
  - [PX4 회피 기능](https://github.com/PX4/avoidance#obstacle-detection-and-avoidance)


- 다양한 케이블, 8x 프로펠러, 2x 배터리 스트랩 (설치됨) 및 기타 액세서리 (추가 주변 장치 연결용으로 사용할 수 있음).

## 그 외 필요한 것

이 키트에는 별도로 구매하여야 하는 배터리와 무선 제어 시스템을 제외한 필수적인 드론 하드웨어들이 포함되어 있습니다.
- 배터리:
  - XT60 암 커넥터가있는 4S LiPo
  - 길이 115mm 미만 (전원 커넥터와 GPS 마스트 사이에 맞음)
- 무선 제어 시스템
  - 모든 [PX4 호환 RC 시스템](../getting_started/rc_transmitter_receiver.md)을 사용할 수 있습니다.
  - R-XSR 수신기가 있는 *FrSky Taranis* 송신기는 많이 사용되는 설정입니다.
- H2.0 Hex 키 (RC 수신기를 연결할 수 있도록 상단 플레이트 나사를 푸는 용도)

또한, 사용자는 지상국 하드웨어와 소프트웨어가 필요합니다.
- [QGroundControl](https://docs.qgroundcontrol.com/en/getting_started/download_and_install.html)(QGC)을 실행 노트북 또는 태블릿.

## 최초 설정

1. 기체에 [RC 호환 수신기](../getting_started/rc_transmitter_receiver.md#connecting-receivers)를 부착합니다 (키트와 함께 제공되지 않음).
   - H2.0 육각 도구를 사용하여 상단 플레이트 (배터리가가는 곳)를 분리합니다.
   - [수신기를 비행 컨트롤러에 연결합니다](../assembly/quick_start_pixhawk4.md#radio-control).
   - 상단 플레이트를 다시 부착합니다.
   - RC 수신기를 기체 후면의 *UP Core* 캐리어 보드 플레이트에 장착합니다 (지퍼 또는 양면 테이프 사용).
   - 안테나에 장애물이 없는 지, 프레임에서 전기적으로 절연되어 있는지 확인합니다 (예 : 캐리어 보드 아래 또는 기체 팔 또는 다리에 고정).

1. RC 지상 및 공중 유닛을 [바인딩](../getting_started/rc_transmitter_receiver.md#binding)합니다 (아직 수행하지 않은 경우). 바인딩 절차는 사용된 무선 시스템에 따라 다릅니다 (수신기 설명서 참조).
1. GPS 마스트를 수직 위치로 올리고 덮개를 베이스 플레이트의 홀더에 조입니다.

   ![Raise GPS mast](../../assets/hardware/px4_vision_devkit/raise_gps_mast.jpg)

1. 키트에서 사전 이미징된 USB2.0 스틱을 `USB1` (아래 강조 표시됨)이라고 표시된 *UP Core* 포트에 삽입합니다.

   ![UP Core: USB1 Port ](../../assets/hardware/px4_vision_devkit/upcore_port_usb1.png)
1. 완전히 충전된 배터리로 기체의 전원을 공급하십시오. :::note 배터리를 연결하기 전에 프로펠러가 제거되었는 지 확인하십시오.
:::
1. 아래의 로그인 정보를 사용하여 지상국을 기체 WiFi에 연결합니다 (몇 초 후).
   - **SSID:** pixhawk4
   - **비밀번호:** pixhawk4

:::tip
연결 후(원하는 경우), 웹 브라우저에서 URL `http://192.168.4.1`을 열어 WiFi 네트워크 SSID, 암호 및 기타 로그인 정보를 변경할 수 있습니다. 전송 속도 921600을 변경하지 마십시오.
:::

1. 지상국에서 *QGroundControl*을 시작합니다.
1. 차량 [설정 및 보정](../config/README.md) :

:::note
기체는 사전 보정된 상태로 수령하여야합니다 (예 : 펌웨어, 기체, 배터리 및 센서가 모두 설정됨). 그러나, 방금 연결한 무선 시스템을 보정하여야 하며, 나침반 보정을 다시 수행하여야 하는 경우가 많습니다.
:::

   - [라디오 시스템 보정](../config/radio.md)
   - [나침반 보정](../config/compass.md)


1. (선택 사항) 조종기에서 [비행 모드 선택 스위치](../config/flight_mode.md)를 설정합니다.

:::note
모드는 *QGroundControl*을 사용하여 변경할 수 있습니다.
:::

   RC 컨트롤러 스위치는 다음에 대해 정의하는 것이 좋습니다.
   - [위치 모드](../flight_modes/position_mc.md)-충돌 방지를 테스트하는 데 사용할 수 있는 안전한 수동 비행 모드입니다.
   - [임무 모드](../flight_modes/mission.md) - 임무를 실행하고 장애물 회피를 테스트합니다.
   - [귀환 모드](../flight_modes/return.md) - 기체를 출발 지점으로 안전하게 복귀하여 착륙합니다.


1. 그림과 같이 프로펠러를 부착합니다.

   ![Motor Order Diagram](../../assets/hardware/px4_vision_devkit/motor_order_diagram.png)

   - 프로펠러 방향(*6045* (정상, 시계 반대 방향), _6045_ **R** (반전, 시계 방향)을 레이블에서 확인할 수 있습니다.

     ![Propeller identification](../../assets/hardware/px4_vision_devkit/propeller_directions.jpg)

   - 제공된 프로펠러 너트를 사용하여 단단히 조입니다.

     ![Propeller nuts](../../assets/hardware/px4_vision_devkit/propeller_nuts.jpg)


## 드론 회피 비행

위의  기체 설정이 완료되면 :

1. 기체에 전원 공급 배터리를 연결하십시오.

1. 부팅 순서가 완료되고 회피 시스템이 시작될 때까지 기다리십시오 (부팅중에는 기체는은 무장 명령을 거부합니다).

:::tip
부팅/시작 프로세스는 제공된 USB 스틱에서 약 1 분 (또는 [내부 메모리](#install_image_mission_computer)에서 30 초) 정도 소요됩니다.
:::

1. 회피 시스템이 제대로 시작되었는 지 확인하십시오.

   - *QGroundControl* 알림 로그에 **Avoidance system connected** 메시지가 표시됩니다.

     ![QGC Log showing avoidance system has started](../../assets/hardware/px4_vision_devkit/qgc_console_vision_system_started.jpg)
   - A red laser is visible on the front of the *Structure Core* camera.
1. Wait for the GPS LED to turn green. This means that the vehicle has a GPS fix and is ready to fly!
1. Connect the ground station to the vehicle WiFi network.
1. Find a safe outdoor location for flying, ideally with a tree or some other convenient obstacle for testing PX4 Vision.

1. To test [collision prevention](../computer_vision/collision_prevention.md), enable [Position Mode](../flight_modes/position_mc.md) and fly manually towards an obstacle. The vehicle should slow down and then stop within 6m of the obstacle (the distance can be [changed](../advanced_config/parameters.md) using the [CP_DIST](../advanced_config/parameter_reference.md#CP_DIST) parameter).

1. To test [obstacle avoidance](../computer_vision/obstacle_avoidance.md), create a mission where the path is blocked by an obstacle. Then switch to [Mission Mode](../flight_modes/mission.md) to run the mission, and observe the vehicle moving around the obstacle and then returning to the planned course.


## Development using the Kit

The following sections explain how to use the kit as an environment for developing computer vision software.

### PX4 Avoidance Overview

The *PX4 Avoidance* system consists of computer vision software running on a companion computer (with attached depth camera) that provides obstacle and/or route information to the PX4 flight stack running on a *flight controller*.

Documentation about the companion computer vision/planning software can be found on github here: [PX4/avoidance](https://github.com/PX4/avoidance#obstacle-detection-and-avoidance). The project provides a number of different planner implementations (packaged as ROS nodes):
- The PX4 Vision Kit runs the *localplanner* by default and this is the recommended starting point for your own software.
- The *globalplanner* has not been tested with this kit.
- The *landing planner* requires a downward facing camera, and cannot used without first modifying the camera mounting.

PX4 and the companion computer exchange data over [MAVLink](https://mavlink.io/en/) using these interfaces:
- [Path Planning Interface](../computer_vision/path_planning_interface.md) - API for implementing avoidance features in automatic modes.
- [Collision Prevention Interface](../computer_vision/collision_prevention.md) - API for vehicle based avoidance in manual position mode based on an obstacle map (currently used for collision prevention).

<span id="install_image_mission_computer"></span>
### Installing the image on the Companion Computer

You can install the image on the *UP Core* and boot from internal memory (instead of the USB stick).

This is recommended because booting from internal memory is much faster, frees up a USB port, and may well provide more memory than your USB stick.

:::note
Booting from internal memory takes around 30 seconds while booting from the supplied USB2 stick boots in about a minute (other cards may take several times longer).
:::

To flash the USB image to the *UP Core*:

1. Insert the pre-flashed USB drive into the *UP Core* port labeled `USB1`.
1. [Login to the companion computer](#login_mission_computer) (as described above).
1. Open a terminal and run the following command to copy the image onto internal memory (eMMC). The terminal will prompt for a number of responses during the flashing process.
   ```sh
   cd ~/catkin_ws/src/px4vision_ros
   sudo ./flash_emmc.sh
   ```

:::note
All information saved in the *UP Core* computer will be removed when executing this script.
:::

1. Pull out the USB stick.
1. Restart the vehicle. The *UP Core* computer will now boot from internal memory (eMMC).

### Boot the Companion Computer

First insert the provided USB2.0 stick into the *UP Core* port labeled `USB1`, and then power the vehicle using a 4S battery. The avoidance system should start within about 1 minute (though this does depend on the USB stick supplied).

:::tip
[Fly the Drone with Avoidance](#fly-the-drone-with-avoidance) additionally explains how to verify that the avoidance system is active.
:::

If you've already [installed the image on the companion computer](#install_image_mission_computer) you can just power the vehicle (i.e. no USB stick is needed). The avoidance system should be up and running within around 30 seconds.

Once started the companion computer can be used both as a computer vision development environment and for running the software.

<a id="login_mission_computer"></a>

### Login to the Companion Computer

To login to the companion computer:
1. Connect a keyboard and mouse to the *UP Core* via port `USB2`:

   ![UP Core: USB2](../../assets/hardware/px4_vision_devkit/upcore_port_usb2.png)
   - Use the USB-JST cable from the kit to get a USB A connector

     ![USB to JST cable](../../assets/hardware/px4_vision_devkit/usb_jst_cable.jpg)
   - A USB hub can be attached to the cable if the keyboard and mouse have separate connectors.
1. Connect a monitor to the *UP Core* HDMI port.

   ![UP Core: HDMI port](../../assets/hardware/px4_vision_devkit/upcore_port_hdmi.png)

   The Ubuntu login screen should then appear on the monitor.
1. Login to the *UP Core* using the credentials:
   - **Username:** px4vision
   - **Password:** px4vision



### Developing/Extending PX4 Avoidance

The PX4 Vision’s *UP Core* computer provides a complete and fully configured environment for extending PX4 Avoidance software (and more generally, for developing new computer vision algorithms using ROS 2). You should develop and test your software on the vehicle, sync it to your own git repository, and share any fixes and improvements with the wider PX4 community on the github [PX4/Avoidance](https://github.com/PX4/avoidance) repo.

The catkin workspace is at `~/catkin_ws`, and is preconfigured for running the PX4 avoidance local planner. The launch-from-boot file (`avoidance.launch`) is in the `px4vision_ros` package (modify this file to change what planner is launched).

The avoidance package is started on boot. To integrate a different planner, this needs to be disabled.

1. Disable the avoidance process using the following command:
   ```sh
   systemctl stop avoidance.service
   ```
   You can simply reboot the machine to restart the service.

   Other useful commands are:
   ```sh
   # restart service
   systemctl start avoidance.service

   # disable service (stop service and do not restart after boot)
   systemctl disable avoidance.service

   # enable service (start service and enable restart after boot)
   systemctl enable avoidance.service  
   ```

1. The source code of the obstacle avoidance package can be found in https://github.com/PX4/avoidance which is located in `~/catkin_ws/src/avoidance`.

1. Make changes to the code! To get the latest code of avoidance pull the code from the avoidance repo:
   ```sh
   git pull origin
   git checkout origin/master
   ```
1. Build the package
   ```
   catkin build local_planner
   ```

The ROS workspace is placed in `~/catkin_ws`. For reference on developing in ROS and using the catkin workspace, see the [ROS catkin tutorials](http://wiki.ros.org/catkin/Tutorials).


### Developing PX4 Firmware

The kit is designed for creating computer vision software that runs on the companion computer, and which integrates with PX4’s flexible path planning and collision prevention interfaces.

You can also modify PX4 itself, and [install it as custom firmware](../config/firmware.md#custom):
- You will need to connect *QGroundControl* to the kit's *Pixhawk 4* **via USB** in order to update firmware.
- Select the *PX4 Vision DevKit* airframe after loading new firmware: ![Airframe Selection - PX4 Vision DevKit](../../assets/hardware/px4_vision_devkit/qgc_airframe_px4_vision_devkit_platform.jpg)

:::note
Modification of PX4 code is not *needed* to meet most computer vision use cases. To discuss the interfaces or how to integrate other features join the PX4 slack channel: #computer-vision.
:::

## Px4 Vision Carrier Board Pinouts

The Carrier board pinouts can be download from [Holybro's website](http://www.holybro.com/manual/PX4_Vision_carrier_board_pinouts_v1.1.pdf).

## Other Development Resources

- [*UP Core* Wiki](https://wiki.up-community.org/Ubuntu) - *Up Core* companion computer technical information
- [Occipital Developer Forum](https://structure.io/developers) - *Structure Core* camera information
- [Pixhawk 4 Overview](../flight_controller/pixhawk4.md)
- [PX4 Avoidance software/documentation](https://github.com/PX4/avoidance)
- [Path Planning Interface](../computer_vision/path_planning_interface.md)
- [Px4 Vision Carrier Board Pinouts](http://www.holybro.com/manual/PX4_Vision_carrier_board_pinouts_v1.1.pdf)

## How to get Technical Support

For hardware issues, please contact Holybro at: [productservice@holybro.com](mailto:productservice@holybro.com).

For software issues, use the following community support channels:
- [PX4 discuss: Computer Vision category.](https://discuss.px4.io/c/Vision-based-navigation-and-obstacle-avoidance)
- [PX4 slack](https://slack.px4.io/) channel: #avoidance
- [Holybro PX4 Vision Wikifactory](https://wikifactory.com/+holybro/px4-vision)
