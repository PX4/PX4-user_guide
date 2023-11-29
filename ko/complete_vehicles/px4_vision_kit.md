# PX4 Vision Autonomy 개발 키트

The [_PX4 Vision Autonomy Development Kit_](https://holybro.com/collections/multicopter-kit/PX4-Vision) is a robust and inexpensive kit for enabling computer vision development on autonomous vehicles.

![개요](../../assets/hardware/px4_vision_devkit/px4_vision_v1.5_front.png)

The kit contains a near-ready-to-fly carbon-fiber quadcopter equipped with a _Pixhawk 4_ or _Pixhawk 6C_ (on V1.5) flight controller, a _UP Core_ companion computer (4GB memory & 64GB eMMC), and a Occipital _Structure Core_ depth camera sensor.

:::note
이 제품에는 사전 설치된 소프트웨어가 없습니다. A USB stick is included in the kit with an example of an [obstacle avoidance](../computer_vision/obstacle_avoidance.md) feature implementation, based on the [PX4 Avoidance](https://github.com/PX4/PX4-Avoidance) project. This example is intended as a reference only and serves to demonstrate the capabilities of the platform. The software is not compatible with the latest version of PX4, nor is it actively maintained or supported.
:::

이 가이드는 기체 비행 준비에 필요한 최소한의 추가 설정을 설명합니다(RC 시스템과 배터리 설치). 또한 처녀 비행과 컴퓨터 비전 코드 수정 방법을 설명합니다.

## Where to Buy

- [PX4 Vision Dev Kit v1.5](https://holybro.com/collections/multicopter-kit/products/px4-vision-dev-kit-v1-5)
- [PX4 Vision Dev Kit v1 (Discontinued)](https://holybro.com/collections/multicopter-kit/products/px4-vision)

## Px4 비전 가이드 콘텐츠

- [경고와 알림](#warnings-and-notifications)
- [내부 내용](#what-is-inside)
- [그 외 필요한 것](#what-else-do-you-need)
- [최초 설정](#first-time-setup)
- [드론 회피 비행](#fly-the-drone-with-avoidance)
- [키트 개발](#development-using-the-kit)
- [PX4 Vision Carrier Board Pinouts](#px4-vision-carrier-board-pinouts)
- [기타 개발 리소스](#other-development-resources)
- [기술 지원 방법](#how-to-get-technical-support)

## 경고와 알림

1. 이 키트는 전방 카메라를 사용하는 컴퓨터 비전 프로젝트용입니다. 하향 또는 후방 깊이 카메라가 없습니다. 따라서, 추가 수정없이는 [안전 착륙](../computer_vision/safe_landing.md) 또는 하방향 카메라가 필요한 다른 기능들을 테스트할 수 없습니다.
1. Obstacle avoidance in missions can only be tested when GPS is available (missions use GPS coordinates). 충돌 방지는 GPS와 광학 흐름에서 위치 잠금시에 위치 모드에서 테스트할 수 있습니다.
1. `USB1`로 표시된 포트는 *USB3* 주변 장치와  동시에 사용하는 경우에는 GPS를 방해할 수 있습니다(임무를 포함한 GPS 종속 기능 비활성화). 이로 인하여, 부팅 이미지가 *USB2.0* 메모리 스틱으로 제공됩니다.
1. PX4 Vision v1 with ECN 010 or above (carrier board RC05 and up), the _UP Core_ can be powered by either the DC plug or with battery.

   ![RC 번호](../../assets/hardware/px4_vision_devkit/rc.png) ![ECN 번호](../../assets/hardware/px4_vision_devkit/serial_number_update.jpg)

1. All PX4 Vision v1.5 _UP Core_ can be powered by either the DC plug or with battery.

:::warning
For PX4 Vision v1 with ECN below 010/carrier board below RC04, the _UP Core_ should only be powered using the battery (do not remove the _UP Core power_ socket safety cover). This does not apply to PX4 Vision v1.5

![경고 - 전원 포트를 연결하지 마십시오](../../assets/hardware/px4_vision_devkit/warning_power_port_update.png)
:::

## 내부 내용

:::note
Difference between the PX4 Vision V1 and V1.5 can be found [here](https://docs.holybro.com/drone-development-kit/px4-vision-dev-kit-v1.5/v1-and-v1.5-difference)
:::

![PV4 Vision v1.5](../../assets/hardware/px4_vision_devkit/px4_vision_v1.5_whats_inside.jpg)

What's inside the PX4 Vision V1 can be found here in the [PX4 v1.13 Docs here](https://docs.px4.io/v1.13/en/complete_vehicles/px4_vision_kit.html#what-is-inside).

PX4 Vision DevKit에는 아래의 내용물들이 포함되어 있습니다.

- 핵심 구성 요소:

  - 1x Pixhawk 4 or Pixhawk 6C (for v1.5) flight controller
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
  - Motors: T-MOTOR KV1750
  - ESC : BEHEli-S 20A ESC
  - GPS: M8N GPS module
  - 전원 모듈 : Holybro PM07
  - 축거 : 286mm
  - 중량 : 854g (배터리 또는 소품 제외)
  - 텔레메트리 : 비행 컨트롤러에 연결된 ESP8266 (외부 안테나 #2에 연결됨). 지상국에 대한 무선 연결을 활성화합니다.

- A USB2.0 stick with pre-flashed software that bundles:

  - Ubuntu 18.04 LTS
  - ROS Melodic
  - 후두 구조 코어 ROS 드라이버
  - MAVROS
  - [PX4 회피 기능](https://github.com/PX4/PX4-Avoidance)

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

- Laptop or tablet running [QGroundControl](https://docs.qgroundcontrol.com/master/en/getting_started/download_and_install.html) (QGC).

## 최초 설정

1. Attach a [compatible RC receiver](../getting_started/rc_transmitter_receiver.md#connecting-receivers) to the vehicle (not supplied with kit):

   - Remove/unscrew the top plate (where the battery goes) using an H2.0 hex key tool.
   - [Connect the receiver to the flight controller](../assembly/quick_start_pixhawk4.md#radio-control).
   - Re-attach the top plate.
   - Mount the RC receiver on the _UP Core_ carrier board plate at the back of the vehicle (use zipties or double-sided tape).
   - Ensure the antennas are clear of any obstructions and electrically isolated from the frame (e.g. secure them under the carrier board or to the vehicle arms or legs).

1. [Bind](../getting_started/rc_transmitter_receiver.md#binding) the RC ground and air units (if not already done). The binding procedure depends on the specific radio system used (read the receiver manual).
1. Raise the GPS mast to the vertical position and screw the cover onto the holder on the base plate. (Not required for v1.5)

   ![Raise GPS mast](../../assets/hardware/px4_vision_devkit/raise_gps_mast.jpg)

1. Insert the pre-imaged USB2.0 stick from the kit into the _UP Core_ port labeled `USB1` (highlighted below).

   ![UP Core: USB1 Port ](../../assets/hardware/px4_vision_devkit/upcore_port_usb1.png)

1. Power the vehicle with a fully charged battery. :::note
Ensure propellers are removed before connecting the battery.
:::
1. Connect the ground station to the vehicle WiFi network (after a few seconds) using the following default credentials:

   - **SSID:** pixhawk4
   - **Password:** pixhawk4

:::tip
WiFi network SSID, password, and other credentials may be changed after connecting (if desired), by using a web browser to open the URL: `http://192.168.4.1`. The baud rate must not be changed from 921600.
:::

1. Start _QGroundControl_ on the ground station.
1. [Configure/calibrate](../config/README.md) the vehicle:

   :::note
The vehicle should arrive pre-calibrated (e.g. with firmware, airframe, battery, and sensors all setup).
You will however need to calibrate the radio system (that you just connected) and it is often worth re-doing the compass calibration.
:::

   - [Calibrate the Radio System](../config/radio.md)
   - [Calibrate the Compass](../config/compass.md)

1. (Optional) Configure a [Flight Mode selector switch](../config/flight_mode.md) on the remote controller.

:::note
Modes can also be changed using _QGroundControl_
:::

   We recommend RC controller switches are define for:

   - [Position Mode](../flight_modes_mc/position.md) - a safe manual flight mode that can be used to test collision prevention.
   - [Mission Mode](../flight_modes_mc/mission.md) - run missions and test obstacle avoidance.
   - [Return Mode](../flight_modes/return.md) - return vehicle safely to its launch point and land.

1. Attach the propellers with the rotations as shown:

   ![Motor Order Diagram](../../assets/hardware/px4_vision_devkit/motor_order_diagram.png)

   - The propellers directions can be determined from the labels: _6045_ (normal, counter-clockwise) and _6045_**R** (reversed, clockwise).

     ![Propeller identification](../../assets/hardware/px4_vision_devkit/propeller_directions.jpg)

   - Screw down firmly using the provided propellor nuts:

     ![Propeller nuts](../../assets/hardware/px4_vision_devkit/propeller_nuts.png)

## 드론 회피 비행

위의  기체 설정이 완료되면 :

1. Connect the battery to power the vehicle.

1. Wait until the boot sequence completes and the avoidance system has started (the vehicle will reject arming commands during boot).

:::tip
The boot/startup process takes around 1 minute from the supplied USB stick (or 30 seconds from [internal memory](#install_image_mission_computer)).
:::

1. Check that the avoidance system has started properly:

   - The _QGroundControl_ notification log displays the message: **Avoidance system connected**.

     ![QGC Log showing avoidance system has started](../../assets/hardware/px4_vision_devkit/qgc_console_vision_system_started.jpg)

   - A red laser is visible on the front of the _Structure Core_ camera.

1. Wait for the GPS LED to turn green. This means that the vehicle has a GPS fix and is ready to fly!
1. Connect the ground station to the vehicle WiFi network.
1. Find a safe outdoor location for flying, ideally with a tree or some other convenient obstacle for testing PX4 Vision.

1. To test [collision prevention](../computer_vision/collision_prevention.md), enable [Position Mode](../flight_modes_mc/position.md) and fly manually towards an obstacle. The vehicle should slow down and then stop within 6m of the obstacle (the distance can be [changed](../advanced_config/parameters.md) using the [CP_DIST](../advanced_config/parameter_reference.md#CP_DIST) parameter).

1. To test [obstacle avoidance](../computer_vision/obstacle_avoidance.md), create a mission where the path is blocked by an obstacle. Then switch to [Mission Mode](../flight_modes_mc/mission.md) to run the mission, and observe the vehicle moving around the obstacle and then returning to the planned course.

## 키트를 사용한 개발

다음 섹션에서는 컴퓨터 비전 소프트웨어를 개발 키트를 사용하는 방법에 대하여 설명합니다.

### PX4 회피 개요

*PX4 회피* 시스템은 *비행 컨트롤러*에서 실행되는 PX4 비행 스택에 장애물과 경로 정보를 제공하는 보조 컴퓨터 (연결된 깊이 카메라 포함)에서 실행되는 컴퓨터 비전 소프트웨어로 구성됩니다.

Documentation about the companion computer vision/planning software can be found on github here: [PX4/PX4-Avoidance](https://github.com/PX4/PX4-Avoidance). 이 프로젝트는 다양한 플래너 구현 (ROS 노드로 패키징)을 제공합니다.

- The PX4 Vision Kit runs the _localplanner_ by default and this is the recommended starting point for your own software.
- The _globalplanner_ has not been tested with this kit.
- The _landing planner_ requires a downward facing camera, and cannot used without first modifying the camera mounting.

PX4와 보조 컴퓨터는 다음 인터페이스를 사용하여 [MAVLink](https://mavlink.io/en/)를 통하여 데이터를 교환합니다.

- [Path Planning Interface](../computer_vision/path_planning_interface.md) - API for implementing avoidance features in automatic modes.
- 새 펌웨어를 로드 한 후 *PX4 Vision DevKit* 기체를 선택합니다.

<a id="install_image_mission_computer"></a>

### 보조 컴퓨터에 이미지 설치

*UP Core*에 이미지를 설치하고 내부 메모리(USB 스틱 대신)에서 부팅할 수 있습니다.

내부 메모리 부팅이 훨씬 빠르며 USB 스틱보다 더 많은 메모리를 제공하며 USB 포트를 더 확보할 수 있습니다.

:::note
내장 메모리에서 부팅은 약 30 초가 걸리며, 제공된 USB2 스틱으로 부팅은 약 1분 정도 걸립니다(다른 카드는 더 오래 걸릴 수 있음).
:::

USB 이미지를 *UP Core*로 플래시하려면 :

1. Insert the pre-flashed USB drive into the _UP Core_ port labeled `USB1`.
1. [Login to the companion computer](#login_mission_computer) (as described above).
1. Open a terminal and run the following command to copy the image onto internal memory (eMMC). The terminal will prompt for a number of responses during the flashing process.

   ```sh
   cd ~/catkin_ws/src/px4vision_ros/tools
   sudo ./flash_emmc.sh
   ```

:::note
All information saved in the _UP Core_ computer will be removed when executing this script.
:::

1. Pull out the USB stick.
1. Restart the vehicle. The _UP Core_ computer will now boot from internal memory (eMMC).

### 보조 컴퓨터 부팅

먼저 제공된 USB2.0 스틱을 `USB1`이라고 표시된 *UP Core* 포트에 삽입한 다음 4S 배터리를 사용하여 기체에 전원을 공급합니다. 회피 시스템은 약 1 분 이내에 시작되어야 합니다(제공된 USB 스틱에 따라 다름).

:::tip
[Fly the Drone with avoidance](#fly-the-drone-with-avoidance)는 회피 시스템이 활성화 여부를 확인하는 방법을 추가로 설명합니다.
:::

이미 [보조  컴퓨터에 이미지를 설치](#install_image_mission_computer) 한 경우에는 기체에 전원을 공급하기만하면 됩니다(즉, USB 스틱이 필요하지 않음). 회피 시스템은 약 30 초 이내에 가동 및 실행되어야 합니다.

시작되면 보조 컴퓨터를 비전 개발 환경과 소프트웨어 실행 환경으로 사용할 수 있습니다.

<a id="login_mission_computer"></a>

### 보조 컴퓨터 로그인

보조 컴퓨터에 로그인하려면 :

1. Connect a keyboard and mouse to the _UP Core_ via port `USB2`:

   ![UP Core: USB2](../../assets/hardware/px4_vision_devkit/upcore_port_usb2.png)

   - Use the USB-JST cable from the kit to get a USB A connector

     ![USB to JST cable](../../assets/hardware/px4_vision_devkit/usb_jst_cable.jpg)

   - A USB hub can be attached to the cable if the keyboard and mouse have separate connectors.

1. Connect a monitor to the _UP Core_ HDMI port.

   ![UP Core: HDMI port](../../assets/hardware/px4_vision_devkit/upcore_port_hdmi.png)

   The Ubuntu login screen should then appear on the monitor.

1. Login to the _UP Core_ using the credentials:

   - **Username:** px4vision
   - **Password:** px4vision

### PX4 회피 기능 추가 개발

PX4 비전의 *UP Core* 컴퓨터는 PX4 회피 소프트웨어를 확장을 위한 최적의 개발 환경을 제공합니다 (일반적으로 ROS 2를 사용하여 새로운 컴퓨터 비전 알고리즘을 개발함). You should develop and test your software on the vehicle, sync it to your own git repository, and share any fixes and improvements with the wider PX4 community on the github [PX4/PX4-Avoidance](https://github.com/PX4/PX4-Avoidance) repo.

catkin 작업 공간은 `~/catkin_ws`에 있으며 PX4 회피 로컬 플래너를 실행하도록 사전에 설정되어 있습니다. 부팅에서 시작 파일(`avoidance.launch`)은 `px4vision_ros` 패키지에 있습니다. 실행되는 플래너를 변경하려면 이 파일을 수정하십시오.

회피 패키지는 부팅시 시작됩니다. 다른 플래너를 통합하려면이 기능을 비활성화하여야 합니다.

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

1. The source code of the obstacle avoidance package can be found in https://github.com/PX4/PX4-Avoidance which is located in `~/catkin_ws/src/avoidance`.

1. Make changes to the code! To get the latest code of avoidance pull the code from the avoidance repo:

   ```sh
   git pull origin
   git checkout origin/master
   ```

1. Build the package

   ```sh
   catkin build local_planner
   ```

ROS 작업 공간은 `~/catkin_ws`에 있습니다. ROS에서 개발하고 catkin 작업 공간을 사용하는 방법에 대한 참조는 [ROS catkin 튜토리얼](http://wiki.ros.org/catkin/Tutorials)을 참고하십시오.

### PX4 펌웨어 개발

이 키트는 보조 컴퓨터에서 실행되고 PX4의 유연한 경로 계획 및 충돌 방지 인터페이스와 통합되는 컴퓨터 비전 소프트웨어를 만들기 위하여 설계되었습니다.

PX4 자체를 수정하고 [사용자 지정 펌웨어로 설치](../config/firmware.md#custom) 할 수도 있습니다.

- You will need to connect _QGroundControl_ to the kit's _Pixhawk_ **via USB** in order to update firmware.
- Select the _PX4 Vision DevKit_ airframe after loading new firmware: ![Airframe Selection - PX4 Vision DevKit](../../assets/hardware/px4_vision_devkit/qgc_airframe_px4_vision_devkit_platform.jpg)

:::note
대부분의 컴퓨터 비전 사용 사례를 충족하기 위해 PX4 코드를 수정할 필요는 *없습니다 *. To discuss the interfaces or how to integrate other features join the [PX4 support channels](../contribute/support.md).
:::

## PX4 Vision Carrier Board Pinouts

Information for the PX4 Vision 1.15 can be found at [https://docs.holybro.com](https://docs.holybro.com/drone-development-kit/px4-vision-dev-kit-v1.5). The carrier board pinouts and other information are in the [downloads section](https://docs.holybro.com/drone-development-kit/px4-vision-dev-kit-v1.5/downloads).

## 기타 개발 리소스

- [_UP Core_ Wiki](https://github.com/up-board/up-community/wiki/Ubuntu) - _Up Core_ companion computer technical information
- [Occipital Developer Forum](https://structure.io/developers) - _Structure Core_ camera information
- [Pixhawk 4 Overview](../flight_controller/pixhawk4.md)
- [Pixhawk 6C Overview](../flight_controller/pixhawk6c.md)
- [PX4 Avoidance software/documentation](https://github.com/PX4/PX4-Avoidance)
- [Path Planning Interface](../computer_vision/path_planning_interface.md)

## 기술 지원 방법

하드웨어 문제는 Holybro([productservice@holybro.com](mailto:productservice@holybro.com))에 문의하십시오.

소프트웨어 문제는 아래의 커뮤니티 지원 채널을 사용하십시오.

- [Holybro PX4 Vision Wikifactory](https://wikifactory.com/+holybro/px4-vision)
- [PX4 Support channels](../contribute/support.md)
