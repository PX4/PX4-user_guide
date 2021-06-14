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
  - 1x *UP Core* 컴퓨터 (4GB 메모리 및 64GB eMMC, Ubuntu 및 PX4 avoidance)
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
  - Occipital Structure Core ROS driver
  - MAVROS
  - [PX4 Avoidance](https://github.com/PX4/avoidance#obstacle-detection-and-avoidance)


- Assorted cables, 8x propellers, 2x battery straps (installed) and other accessories (these can be used to attach additional peripherals).

## What Else Do You Need

The kit contains all the essential drone hardware except a battery and a radio control system, which must be purchased separately:
- Battery:
  - 4S LiPo with XT60 female connector
  - Less than 115mm long (to fit between power connector and GPS mast)
- Radio control system
  - Any [PX4-compatible RC System](../getting_started/rc_transmitter_receiver.md) can be used.
  - An *FrSky Taranis* transmitter with R-XSR receiver is one of the more popular setups.
- An H2.0 Hex Key (to unscrew the top plate so that an RC receiver can be connected)

In addition, users will need ground station hardware/software:
- Laptop or tablet running [QGroundControl](https://docs.qgroundcontrol.com/en/getting_started/download_and_install.html) (QGC).

## First-time Setup

1. Attach a [compatible RC reciever](../getting_started/rc_transmitter_receiver.md#connecting-receivers) to the vehicle (not supplied with kit):
   - Remove/unscrew the top plate (where the battery goes) using an H2.0 hex key tool.
   - [Connect the receiver to the flight controller](../assembly/quick_start_pixhawk4.md#radio-control).
   - Re-attach the top plate.
   - Mount the RC receiver on the *UP Core* carrier board plate at the back of the vehicle (use zipties or double-sided tape).
   - Ensure the antennas are clear of any obstructions and electrically isolated from the frame (e.g. secure them under the carrier board or to the vehicle arms or legs).

1. [Bind](../getting_started/rc_transmitter_receiver.md#binding) the RC ground and air units (if not already done). The binding procedure depends on the specific radio system used (read the receiver manual).
1. Raise the GPS mast to the vertical position and screw the cover onto the holder on the base plate.

   ![Raise GPS mast](../../assets/hardware/px4_vision_devkit/raise_gps_mast.jpg)

1. Insert the pre-imaged USB2.0 stick from the kit into the *UP Core* port labeled `USB1` (highlighted below).

   ![UP Core: USB1 Port ](../../assets/hardware/px4_vision_devkit/upcore_port_usb1.png)
1. Power the vehicle with a fully charged battery. :::note Ensure propellers are removed before connecting the battery.
:::
1. Connect the ground station to the vehicle WiFi network (after a few seconds) using the following default credentials:
   - **SSID:** pixhawk4
   - **Password:** pixhawk4

:::tip
WiFi network SSID, password, and other credentials may be changed after connecting (if desired), by using a web browser to open the URL: `http://192.168.4.1`. The baud rate must not be changed from 921600.
:::

1. Start *QGroundControl* on the ground station.
1. [Configure/calibrate](../config/README.md) the vehicle:

:::note
The vehicle should arrive pre-calibrated (e.g. with firmware, airframe, battery, and sensors all setup). You will however need to calibrate the radio system (that you just connected) and it is often worth re-doing the compass calibration.
:::

   - [Calibrate the Radio System](../config/radio.md)
   - [Calibrate the Compass](../config/compass.md)


1. (Optional) Configure a [Flight Mode selector switch](../config/flight_mode.md) on the remote controller.

:::note
Modes can also be changed using *QGroundControl*
:::

   We recommend RC controller switches are define for:
   - [Position Mode](../flight_modes/position_mc.md) - a safe manual flight mode that can be used to test collision prevention.
   - [Mission Mode](../flight_modes/mission.md) - run missions and test obstacle avoidance.
   - [Return Mode](../flight_modes/return.md) - return vehicle safely to its launch point and land.


1. Attach the propellers with the rotations as shown:

   ![Motor Order Diagram](../../assets/hardware/px4_vision_devkit/motor_order_diagram.png)

   - The propellers directions can be determined from the labels: *6045* (normal, counter-clockwise) and _6045_**R** (reversed, clockwise).

     ![Propeller identification](../../assets/hardware/px4_vision_devkit/propeller_directions.jpg)

   - Screw down firmly using the provided propellor nuts:

     ![Propeller nuts](../../assets/hardware/px4_vision_devkit/propeller_nuts.jpg)


## Fly the Drone with Avoidance

When the vehicle setup described above is complete:

1. Connect the battery to power the vehicle.

1. Wait until the boot sequence completes and the avoidance system has started (the vehicle will reject arming commands during boot).

:::tip
The boot/startup process takes around 1 minute from the supplied USB stick (or 30 seconds from [internal memory](#install_image_mission_computer)).
:::

1. Check that the avoidance system has started properly:

   - The *QGroundControl* notification log displays the message: **Avoidance system connected**.

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
