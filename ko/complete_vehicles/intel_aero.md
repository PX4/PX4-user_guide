---
canonicalUrl: https://docs.px4.io/main/ko/complete_vehicles/intel_aero
---

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
    

catkin 작업 공간을 만들고 초기화합니다. 그런 다음 회피 저장소를 소스 공간에 복제하거나 소스 공간에 대한 심볼릭 링크를 사용합니다. 패키지를 빌드하고 다음 명령어로 ROS 노드를 시작합니다.

    catkin build local_planner
    roslaunch local_planner local_planner_aero.launch
    

## PX4 소프트웨어 플래싱

PX4 개발 환경을 설정후, 다음 단계에서 PX4 소프트웨어를 업데이트합니다.

1. 기체의 모든 소프트웨어의 전체 업데이트를 수행합니다 (https://github.com/intel-aero/meta-intel-aero/wiki/Upgrade-To-Latest-Software-Release).
2. [펌웨어](https://github.com/PX4/PX4-Autopilot)를 확보합니다.
3. `make intel_aerofc-v1_default`로 컴파일합니다.
4. 대상 호스트명을 설정합니다.
    
    시스템이 링크 로컬 이름을 확인하는 경우에는, 이 단계를 건너뛸 수 있습니다. WiFi 또는 USB로 연결하여 `intel-aero.local`에 ssh로 연결하여 테스트할 수 있습니다.
    
        ssh root@intel-aero.local
        
    
    작동하지 않는 경우에는 업로드 스크립트에서 사용할 IP를 지정하십시오.
    
        # WiFi IP
        export AERO_HOSTNAME=192.168.8.1
        
        # Ethernet-over-USB IP
        export AERO_HOSTNAME=192.168.7.2
        

5. 다음 명령어로 업로드합니다. ` make intel_aerofc-v1_default upload`

## 네트워크를 통한 QGroundControl 연결

1. WiFi 또는 USB 네트워크로 보드에 연결되어 있는 지 확인하십시오.
2. SSH를 보드에 연결하고 MAVLink 전달이 실행되는 지 확인합니다. 기본적으로 부팅시 자동으로 실행됩니다. 다음 명령어로 수동으로 실행할 수 있습니다. ```systemctl start mavlink-router```
3. *QGroundControl*을 시작시 자동으로 연결됩니다.
4. *QGroundControl*을 시작하는 대신 스크립트를 사용하여 [MAVLink 셸](../debug/mavlink_shell.md)을 오픈할 수 있습니다. ```./Tools/mavlink_shell.py 0.0.0.0:14550```

<span id="leddarone"></span>

## LeddarOne 거리 측정기 연결

[LeddarOne](../sensor/leddar_one.md)을 Aero 원격 측정 포트에 연결합니다. LeddarOne와 Aero 원격 측정 포트 (TELEM1)의 핀배열은 아래와 같습니다.

| 핀 | Aerofc 텔레메트리 | LeddarOne |
| - | ------------ | --------- |
| 1 | VCC          | GND       |
| 2 | TX           | -         |
| 3 | RX           | VCC       |
| 4 | SCL          | RX        |
| 5 | SDA          | TX        |
| 6 | GND          | -         |

거리계를 활성화하려면 [SENS_LEDDAR1_CFG](../advanced_config/parameter_reference.md#SENS_LEDDAR1_CFG) 매개 변수를 TELEM1로 설정하고 보드를 재부팅합니다 (매개변수 설정 지침은 [여기](../advanced_config/parameters.md)에서 확인 가능).

<span id="lidar_lite"></span>

## Lidar Lite 거리 측정기 연결

:::warning
Lidar Lite는 측정 스파이크로 인하여 *Intel Aero Ready to Fly Drone*®과 함께 사용하지 않는 것이 좋습니다.
:::

다음 지침은 I2C를 통해 연결된 [Lidar Lite](../sensor/rangefinders.md#lidar-lite) V3를 설명합니다. Intel® Aero Ready to Fly Drone에는 I2C가있는 두 개의 포트가 있습니다. 하나는 COMPASS로 표시되고 다른 하나는 TELEMETRY입니다. 두 개의 핀배열은 아래에서 찾을 수 있습니다. 텔레메트리 포트는 사용하는 것을 추천합니다. TELEMETRY 포트가 이미 사용중인 경우 스플리터를 사용하여 I2C 연결을 공유할 수 있습니다 (모든 I2C 포트에서 작동). 스플리터 설정은 아래 이미지를 확인하십시오.

또한 Lidar Lite I2C 연결용 전해 커패시터를 사용하여 거리 판독 값의 스파이크를 줄이는 것이 좋습니다 ([3 페이지](https://static.garmin.com/pumac/LIDAR_Lite_v3_Operation_Manual_and_Technical_Specifications.pdf) 참조).

Lidar Lite V3와 Aero 텔레메트리 포트의 핀배열은 다음과 같습니다.

| 핀 | Aerofc 텔레메트리 | Lidar Lite V3 |
| - | ------------ | ------------- |
| 1 | VCC          | VCC           |
| 2 | TX           | -             |
| 3 | RX           | -             |
| 4 | SCL          | SCL           |
| 5 | SDA          | SDA           |
| 6 | GND          | GND           |

| 핀 | Aerofc 나침반 | Lidar Lite V3 |
| - | ---------- | ------------- |
| 1 | VCC        | VCC           |
| 2 | SCL        | -             |
| 3 | SDA        | -             |
| 4 | GND        | SCL           |
| 5 | -          | SDA           |
| 6 | -          | GND           |

![Aero I2C 스플리터](../../assets/hardware/intel_aero/aero_i2c_splitter.jpg)

![Aero Lidar Lite](../../assets/hardware/intel_aero/aero_lidarlite.jpg)

## Aero에서 광류 센서 사용

*Intel Aero Ready to Fly Drone*®은 컴퓨팅 보드 (Linux OS 버전 1.6 이상)에 사전 설치된 광류 실행 파일과 함께 제공되어 광류 속도 추정을 이용하여 안정적으로 비행할 수 있습니다. 광류 센서를 사용하려면, 먼저 범위 센서를 설치하여야합니다 (위 참조).

광류 센서를 사용하려면, 차량 컴퓨팅 보드의 콘솔에서 다음 명령을 실행하십시오.

    systemctl start aero-optical-flow
    

부팅시 광류 실행 파일을 시작하는 명령어는 다음과 같습니다.

    systemctl enable aero-optical-flow #use disable to undo
    

또한, 비행 콘트롤러에서 다음 매개변수를 설정하여야 합니다.

| 매개변수                                                                       | 값 |
| -------------------------------------------------------------------------- | - |
| [EKF2_AID_MASK](../advanced_config/parameter_reference.md#EKF2_AID_MASK) | 2 |
| [EKF2_HGT_MODE](../advanced_config/parameter_reference.md#EKF2_HGT_MODE) | 2 |