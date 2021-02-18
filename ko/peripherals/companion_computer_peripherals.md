# 보조 컴퓨터 주변 장치

This section contains information about companion computer peripherals. These include both components that might be connected to a companion computer (potentially triggered/accessed by PX4), and for connecting the computer to the flight controller.

## 보조 컴퓨터/픽스호크 통신

보통 픽스호크와 함께 동작하는 보조 컴퓨터는 보조 컴퓨터와 픽스호크 하드웨어와 통신(예: 인텔 누크와 픽스호크 4)하는 보조 연결이 필요합니다.

FTDI USB 모듈과 레벨 시프터(하단 참조)같은 통신 브릿징이 가능한 몇가지 장치가 있습니다.

:::note PX4 configuration for communicating with a companion computer over MAVLink configuration is covered in [MAVLink \(OSD / Telemetry\)](../peripherals/mavlink_peripherals.md#example). Other relevant topics/sections include: [Companion Computer for Pixhawk Series](../companion_computer/pixhawk_companion.md), [Robotics](../robotics/README.md) and [RTPS/DDS Interface: PX4-Fast RTPS(DDS) Bridge](../middleware/micrortps.md).
:::

### FTDI 장치

FTDI USB 어댑터는 보조 컴퓨터와 픽스호크간 통신하는 일반적인 방편입니다. 보통 꼽으면 동작하며 입출력 어댑터는 3.3v로 설정합니다. 픽스호크 하드웨어에서 제공하는 직렬 링크의 완전한 기능성과 신뢰성을 확보하려면 흐름제어 설정을 추천합니다.

옵션은 다음과 같습니다:

| 장치                                                                                                                      | 3.3v 입출력 (기본) | 흐름 제어 | Tx/Rx LED | JST-GH |
| ----------------------------------------------------------------------------------------------------------------------- | ------------- | ----- | --------- | ------ |
| [PixDev FTDI JST-GH Breakout](https://pixdev.myshopify.com/products/ftdi-breakout-jst-gh)                               | 예             | 예     | 예         | 예      |
| [mRo USB FTDI Serial to JST-GH (Basic)](https://store.mrobotics.io/USB-FTDI-Serial-to-JST-GH-p/mro-ftdi-jstgh01-mr.htm) | 가능            | 가능    | 아니요       | 예      |
| [SparkFun FTDI Basic Breakout](https://www.sparkfun.com/products/9873)                                                  | 예             | 아니요   | 예         | 아니요    |

### 논리 레벨 시프터

픽스호크 하드웨어는 3.3v 입출력 레벨에서 동작하나, 보조 컴퓨터의 경우 1.8v 또는 5v 레벨에서 하드웨어 수준 입출력을 보일 수 있습니다. 이 문제를 해결하려면 송수신 신호 전압 안전하게 변환할 레벨 시프터를 제작할 수 있습니다.

선택지는 다음과 같습니다:

- [SparkFun Logic Level Converter - 양방향](https://www.sparkfun.com/products/12009)
- [4-channel I2C-safe Bi-directional Logic Level Converter - BSS138](https://www.adafruit.com/product/757)

## 카메라

카메라는 정지 화상과 동영상을 잡아낼 때 활용하며 더 일반적으로는 [컴퓨터 시각 정보 처리](../computer_vision/README.md) 프로그램에 데이터를 제공하려는 목적입니다(이 경우 "카메라"는 원래 이미지가 아닌 처리한 데이터를 넘겨줍니다).

### 스테레오 카메라

스테레오 카메라는 보통 깊이 인식, 경로 계획, SLAM 용도로 활용합니다. 보조 컴퓨터에 붙어서 동작한다는 보장은 없습니다.

잘 알려진 스테레오 카메라는 다음과 같습니다:

- [인텔® 리얼센스™ 뎁스 카메라 D435](https://click.intel.com/intelr-realsensetm-depth-camera-d435.html)
- [인텔® 리얼센스™ 뎁스 카메라 D415](https://click.intel.com/intelr-realsensetm-depth-camera-d415.html)
- [아이언사이드](https://www.perceptin.io/products)
- [DUO MLX](https://duo3d.com/product/duo-minilx-lv1) <!-- note, timeout on link 18Nov2019 -->

### 관성 주행 시각 측정 카메라/센서

다음 센서는 [관성 주행 시각 측정(VIO)](../computer_vision/visual_inertial_odometry.md)에 활용할 수 있습니다:

- [T265 리얼센스 트래킹 카메라](../peripherals/camera_t265_vio.md)

<span id="data_telephony"></span>

## 데이터 통신 (LTE)

LTE USB 모듈은 보조 컴퓨터에 붙일 수 있으며 MAVLink 트래픽을 비행 제어 장치와 인터넷 간에전달하는 용도로 활용할 수 있습니다.

지상 통제 장치와 보조 컴퓨터를 인터넷을 통해 연결하는 "표준 방식"은 없습니다. 보통 인터넷에 공용/정적 IP를 할당할 수 없기 때문에 이들 장치에 연결할 수 없습니다.

:::note
Typically your router (or the mobile network) has a public IP address, and your GCS computer/vehicle are on a *local* network. 라우터에서는 네트워크 주소 변환(NAT)을 통해 *외부로 내보내는* 요청에 대해 로컬 네트워크와 인터넷을 '1:1 대응' 하며, 이 대응관계를 요청 시스템의 *응답*을 전달하려는 용도로 활용할 수 있습니다. 그러나 NAT에는 임의의 외부 시스템에서 오는 데이터를 내부의 어떤 컴퓨터로 직접 전달할 수 있는 방법이 없기 때문에, 로컬 네트워크에서는 지상 통제 장치 또는 기체의 연결을 *수립*할 방법이 없습니다.
:::

일반적인 접근 방식은 보조 컴퓨터와 지상 통제 장치 컴퓨터를 가상 개인 네트워크에 묶어 설정하는 방식입니다(예: [zerotier](https://www.zerotier.com/) 같은 VPN 시스템을 두 컴퓨터에 설치). 그런 후, 보조 컴퓨터에서 [mavlink-router](https://github.com/intel/mavlink-router) 를 사용하여 가상 개인 네트워크의 직렬 인터페이스(비행 제어 장치)와 지상 통제 장치 컴퓨터 사이에서 MAVLink 패킷을 전달하면 됩니다.

이 방식으로 VPN 내부에 있는 지상 통제 장치 컴퓨터의 주소를 고정할 수 있는 이득이 생기므로, *mavlink router* 설정을 나중에 바꿀 필요가 없습니다. 게다가, 모든 VPN 트래픽을 암호화하기 때문에 통신 링크는 안전합니다(MAVLink 2 자체는 암호화를 지원하지 않음).

:::note
You can also choose to route to the VPN broadcast address (i.e. `x.x.x.255:14550`, where 'x' depends on the VPN system). 이 방식은 지상 통제 장치 컴퓨터의 IP 주소를 굳이 알 필요가 없지만, 예상보다 더 많은 트래픽을 소요할 수 있습니다(패킷을 VPN 네트워크의 모든 컴퓨터에 뿌리기 때문).
:::

동작하기로 알려진 일부 USB 모듈은 다음과 같습니다:

- [화웨이 E8372](https://consumer.huawei.com/en/mobile-broadband/e8372/) 과 [화웨이 E3372](https://consumer.huawei.com/en/mobile-broadband/e3372/) 
  - *E8372*에는 보조 컴퓨터에 연결했을 때 SIM을 설정할 수 있도록 WiFi 기능이 들어있습니다 (개발 단계를 좀 더 쉽게 해줌). *E3372*에는 WiFi 기능이 빠져있어, 랩톱에 직접 연결하여 설정해야합니다.