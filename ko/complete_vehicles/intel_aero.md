# Intel Aero 즉시 비행 가능 드론

:::warning
이 비행 컨트롤러는 [단종](../flight_controller/autopilot_experimental.md)되었습니다.

PX4 v1.11에서 이 플랫폼을 마지막으로 지원합니다.
:::

*Intel Aero Ready to Fly Drone*®은 UAV 개발 플랫폼입니다. 이 중 일부는 쿼드 코어 CPU에서 리눅스 실행 *Intel Aero Compute Board*입니다. 다른 부분은 연결된 STM32 마이크로 컨트롤러이며, NuttX에서 PX4를 실행합니다. 이들은 비전 액세서리 키트도 포함하는 *Intel Aero Ready to Fly Drone* 패키지에 통합되어 있습니다.

![Intel Aero RTF](../../assets/hardware/intel_aero/intel-aero-rtf.jpg)

## 소개

[공식 위키](https://github.com/intel-aero/meta-intel-aero/wiki)에서는 보드 설정, 업데이트 및 연결 방법과 Linux 운영체제에서 개발 방법을 설명합니다. 이 문서에서는 개발 트리에서 마이크로 컨트롤러의 펌웨어를 업데이트 방법을 중점적으로 설명합니다.

릴리스에 따라 지침이 일부 변경되어지므로, 사용 가능한 최신 이미지로 업데이트하는 것이 중요합니다. 보드에 연결하고 다음 명령을 실행하여 BIOS와 배포판 버전을 확인할 수 있습니다.

    get_aero_version.py
    

이 문서의 지침은 다음 버전에서 테스트되었습니다.

    BIOS_VERSION = Aero-01.00.13
    OS_VERSION = Poky Aero (Intel Aero Linux Distro) 1.5.1-dev (pyro)"
    AIRMAP_VERSION = 1.8
    FPGA_VERSION = 0xc1
    

## Ubuntu를 사용하여 Intel Aero 설정

Intel Aero에 Ubuntu를 설치하려면 다음의 장비가 필요합니다.

1. 전원 공급 장치 (배터리 또는 네트워크 케이블)
2. 모니터를 연결용 마이크로 HDMI-HDMI 케이블
3. 마이크로 USB3-USB2 암 어댑터
4. 마우스와 키보드를 연결하는 USB 허브

[Intel Aero wiki &gt; Intel Aero에 Ubuntu 설치](https://github.com/intel-aero/meta-intel-aero/wiki/90-%28References%29-OS-user-Installation#installing-ubuntu-on-intel-aero) 지침을 따라 설치하십시오.

1. [먼저 Yocto 업그레이드](https://github.com/intel-aero/meta-intel-aero/wiki/90-%28References%29-OS-user-Installation#upgrade-yocto-first) (선택 사항)
2. [운영 체제](https://github.com/intel-aero/meta-intel-aero/wiki/90-%28References%29-OS-user-Installation#os)
3. [인텔 에어로 저장소](https://github.com/intel-aero/meta-intel-aero/wiki/90-%28References%29-OS-user-Installation#intel-aero-repository)

*Intel Aero Repository* (위)의 단계가 완료되면 Aero 커널이 설치됩니다. 이 시점부터는 항상 이 커널을 사용하여 부팅하십시오.

지침에 따라 BIOS, FPGA 및 비행 컨트롤러를 플래시합니다. MAVLink 라우터 구성 파일을 오픈합니다. **/etc/mavlink-router/main.conf**

구성 파일에 다음 줄을 추가하여 랩톱 IP를 UDP 끝점으로 포함합니다. IP 주소는 노트북중 하나로 설정되어야 합니다. `ifconfig`를 실행하여 랩탑의 IP 주소를 확인하십시오.

    [UdpEndpoint wifi]
    Mode = Normal
    Address = 192.168.8.255
    

이 단계가 완료되면 드론은 노트북에서 실행되는 *QGroundControl*에 자동으로 연결됩니다.

다음으로 [이 지침](https://github.com/intel-aero/meta-intel-aero/wiki/05-Autonomous-drone-programming-with-ROS)을 따라 ROS를 설치합니다.

### RealSense 카메라

1. RealSense SDK
    
    단계에 따라 [aero wiki](https://github.com/intel-aero/meta-intel-aero/wiki/90-%28References%29-OS-user-Installation#intel-realsense-sdk)에 나열된 RealSense SDK를 설치합니다. 저장소 복제시 R200 모델에 레거시 브랜치를 사용하여야합니다. D435 또는 D415를 사용하는 경우에는 마스터 분기를 복제하여야 합니다. 다른 모든 단계는 동일하며 카메라가 변경되면 분기를 앞뒤로 전환할 수 있습니다.
    
    RealSense R200을 사용하는 경우 다음을 사용하여 ROS 노드에서 이미 시작할 수 있습니다.
    
        roslaunch realsense_camera r200_nodelet_default.launch
        
    
    D400 시리즈 카메라를 사용하는 경우에는 다음 단계에서 다른 ROS 래퍼를 설치합니다.

2. D400 시리즈 RealSense용 ROS 래퍼
    
    [소스에서 Intel RealSense ROS 설치](https://github.com/intel-ros/realsense#step-3-install-intel-realsense-ros-from-sources) 지침에 따라 catkin 작업 공간을 설치하고 RealSense 소프트웨어를 복제합니다.
    
    다음 명령어를 실행하여 udev 규칙을 설치합니다.
    
        sudo cp config/99-realsense-libusb.rules /etc/udev/rules.d/
        sudo udevadm control --reload-rules && udevadm trigger
        
    
    이제 RealSense는 다음을 사용하여 ROS 노드에서 실행할 수 있습니다.
    
        roslaunch realsense2_camera rs_camera.launch
        

### 장애물 회피

PX4 장애물 회피 소프트웨어를 실행하기 위하여 catkin을 설치하십시오.

    apt install python-catkin-tools
    

Create a catkin workspace and initialize it. Then clone the avoidance repository into the source space, or use a symbolic link to the source space. Build the package and start the ROS node using:

    catkin build local_planner
    
    roslaunch local_planner local_planner_aero.launch
    

## Flashing PX4 software

After setting up the PX4 development environment, follow these steps update the PX4 software:

1. Do a full update of all software on the vehicle (https://github.com/intel-aero/meta-intel-aero/wiki/Upgrade-To-Latest-Software-Release)
2. Grab the [Firmware](https://github.com/PX4/PX4-Autopilot)
3. Compile with `make intel_aerofc-v1_default`
4. Configure the target hostname
    
    If your system resolves link local names you don't have to do anything and you can skip this step. You can test it by trying to ssh into `intel-aero.local` after connecting to it either via WiFi or USB:
    
        ssh root@intel-aero.local
        
    
    If it doesn't work you can try giving the IP that will be used by the upload script:
    
        # WiFi IP
        export AERO_HOSTNAME=192.168.8.1
        
        # Ethernet-over-USB IP
        export AERO_HOSTNAME=192.168.7.2
        

5. Upload with: `make intel_aerofc-v1_default upload`

## Connecting QGroundControl via Network

1. Make sure you are connected to the board with WiFi or USB Network
2. SSH to the board and make sure MAVLink forwarding runs. By default it automatically starts when booting. It can be started manually with: ```systemctl start mavlink-router```
3. Start *QGroundControl* and it should automatically connect.
4. Instead of starting *QGroundControl*, you can open a [MAVLink shell](../debug/mavlink_shell.md) using the script: ```./Tools/mavlink_shell.py 0.0.0.0:14550```

<span id="leddarone"></span>

## Connecting LeddarOne Range Finder

Connect the [LeddarOne](../sensor/leddar_one.md) to the Aero telemetry port. The pinout for the LeddarOne and Aero telemetry port (TELEM1) are as follows.

| Pin | Aerofc TELEMETRY | LeddarOne |
| --- | ---------------- | --------- |
| 1   | VCC              | GND       |
| 2   | TX               | -         |
| 3   | RX               | VCC       |
| 4   | SCL              | RX        |
| 5   | SDA              | TX        |
| 6   | GND              | -         |

To enable the rangefinder set the [SENS_LEDDAR1_CFG](../advanced_config/parameter_reference.md#SENS_LEDDAR1_CFG) parameter to TELEM1 and reboot the board (instructions for setting parameters [available here](../advanced_config/parameters.md)).

<span id="lidar_lite"></span>

## Connecting Lidar Lite Range Finder

:::warning
The Lidar Lite is not recommended for use with *Intel Aero Ready to Fly Drone*® due to measurements spikes.
:::

The following instructions are for a [Lidar Lite](../sensor/rangefinders.md#lidar-lite) V3 connected via I2C. The Intel® Aero Ready to Fly Drone has two ports with I2C: One labled COMPASS and the other TELEMETRY. The pinout for both of them can be found below. We recommend using the TELEMETRY port as it is not being used. If your TELEMETRY port is already occupied, a splitter can be used to share the I2C connection (works on any I2C port). Check the images below for the splitter setup.

In addition it is recommended to use a electrolytic capacitor for the Lidar Lite I2C connection to reduce spikes in the distance readings (see [here](https://static.garmin.com/pumac/LIDAR_Lite_v3_Operation_Manual_and_Technical_Specifications.pdf) on page 3).

The pinout for the Lidar Lite V3 and Aero telemetry port are as follows

| Pin | Aerofc TELEMETRY | Lidar Lite V3 |
| --- | ---------------- | ------------- |
| 1   | VCC              | VCC           |
| 2   | TX               | -             |
| 3   | RX               | -             |
| 4   | SCL              | SCL           |
| 5   | SDA              | SDA           |
| 6   | GND              | GND           |

| pin | Aerofc COMPASS | Lidar Lite V3 |
| --- | -------------- | ------------- |
| 1   | VCC            | VCC           |
| 2   | SCL            | -             |
| 3   | SDA            | -             |
| 4   | GND            | SCL           |
| 5   | -              | SDA           |
| 6   | -              | GND           |

![Aero I2C splitter](../../assets/hardware/intel_aero/aero_i2c_splitter.jpg)

![Aero LidarLite](../../assets/hardware/intel_aero/aero_lidarlite.jpg)

## Using Optical Flow on the Aero

The *Intel Aero Ready to Fly Drone*® comes with a preinstalled optical flow binary on the compute board (Linux OS version 1.6 or higher), which enables it to stably fly based on optical flow velocity estimation. In order to use optical flow, a range sensor has to be installed first (see above).

To use the optical flow, run the following command in a console on the vehicle's compute board:

    systemctl start aero-optical-flow
    

If you want to start the optical flow binary at boot, use

    systemctl enable aero-optical-flow #use disable to undo
    

In addition, the following parameter values should be set in the flight controller.

| Parameter                                                                  | Value |
| -------------------------------------------------------------------------- | ----- |
| [EKF2_AID_MASK](../advanced_config/parameter_reference.md#EKF2_AID_MASK) | 2     |
| [EKF2_HGT_MODE](../advanced_config/parameter_reference.md#EKF2_HGT_MODE) | 2     |