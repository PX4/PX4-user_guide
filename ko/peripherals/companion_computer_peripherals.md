---
canonicalUrl: https://docs.px4.io/main/ko/peripherals/companion_computer_peripherals
---

# 보조 컴퓨터 주변 장치

이 섹션에는 보조 컴퓨터의 주변 장치에 대하여 설명합니다. 여기에는 보조 컴퓨터(PX4에 의해 트리거/액세스될 수 있음)에 장착 가능한 부품과 컴퓨터를 비행 컨트롤러에 연결용 부품들을 설명합니다.

## 보조 컴퓨터 / 픽스호크 통신

Pixhawk를 사용하는 일반적인 보조 컴퓨터에는 Pixhawk 하드웨어(예 : Intel NUC 및 Pixhawk 4)와 데이터를 송수신을 위한 링크가 필요합니다.

FTDI USB 모듈과 레벨 시프터(하단 참조)같은 통신 브릿징이 가능한 몇가지 장치가 있습니다.

:::note MAVLink를 통한 보조 컴퓨터와 통신 설정은 [MAVLink \(OSD / Telemetry\)](../peripherals/mavlink_peripherals.md#example)를 참고하십시오. 기타 관련 주제/섹션에서는 [Pixhawk 시리즈용 보조 컴퓨터](../companion_computer/pixhawk_companion.md), [로보틱스](../robotics/README.md) 및 [RTPS/DDS 인터페이스: PX4-Fast RTPS (DDS) 브리지](../middleware/micrortps.md)가 포함됩니다.
:::

### FTDI 장치

FTDI USB 어댑터는 일반적인 보조 컴퓨터와 픽스호크간의 통신 방법입니다. They are usually plug and play as long as the IO of the adapter is set to 3.3V. Pixhawk 하드웨어에서 제공되는 직렬 링크의 전체 기능와 신뢰성을 위하여 흐름 제어가 권장됩니다.

A few "turnkey" options are listed below:

| 장치                                                                                                                      | 3.3v 입출력 (기본) | 흐름 제어   | Tx/Rx LED | JST-GH |
| ----------------------------------------------------------------------------------------------------------------------- | ------------- | ------- | --------- | ------ |
| [mRo USB FTDI Serial to JST-GH (Basic)](https://store.mrobotics.io/USB-FTDI-Serial-to-JST-GH-p/mro-ftdi-jstgh01-mr.htm) | Capable       | Capable | No        | 예      |
| [SparkFun FTDI Basic Breakout](https://www.sparkfun.com/products/9873)                                                  | 예             | No      | 예         | No     |

You can also use an off-the-shelf FTDI cable [like this one](https://www.sparkfun.com/products/9717) and connect it to flight controller using the appropriate header adaptor (JST-GH connectors are specified in the Pixhawk standard, but you should confirm the connectors for your flight controller).


### 논리 레벨 시프터

On occasion a companion computer may expose hardware level IO that is often run at 1.8v or 5v, while the Pixhawk hardware operates at 3.3v IO. In order to resolve this, a level shifter can be implemented to safely convert the transmitting/receiving signal voltage.

Options include:
* [SparkFun Logic Level Converter - 양방향](https://www.sparkfun.com/products/12009)
* [4-channel I2C-safe Bi-directional Logic Level Converter - BSS138](https://www.adafruit.com/product/757)

## 카메라

Cameras are used image and video capture, and more generally to provide data for [computer vision](../computer_vision/README.md) applications (in this case the "cameras" may only provide processed data, not raw images)

### 스테레오 카메라

Stereo cameras are typically used for depth perception, path planning and SLAM. They are in no way guaranteed to be plug and play with your companion computer.

Popular stereo cameras include:

- [인텔® 리얼센스™ 뎁스 카메라 D435](https://www.intelrealsense.com/depth-camera-d435/)
- [인텔® 리얼센스™ 뎁스 카메라 D415](https://www.intelrealsense.com/depth-camera-d415/)
- [DUO MLX](https://duo3d.com/product/duo-minilx-lv1)

### 관성 주행 시각 측정 카메라/센서

The following sensors can be used for [Visual Inertial Odometry (VIO)](../computer_vision/visual_inertial_odometry.md):

- [T265 리얼센스 트래킹 카메라](../peripherals/camera_t265_vio.md)


<span id="data_telephony"></span>
## 데이터 통신(LTE)

An LTE USB module can be attached to a companion computer and used to route MAVLink traffic between the flight controller and the Internet.

There is no "standard method" for a ground station and companion to connect over the Internet. Generally you can't connect them directly because neither of them will have a public/static IP on the Internet.

:::note
Typically your router (or the mobile network) has a public IP address, and your GCS computer/vehicle are on a *local* network. The router uses network address translation (NAT) to map *outgoing* requests from your local network to the Internet, and can use the map to route the *responses* back to requesting system. However NAT has no way to know where to direct the traffic from an arbitrary external system, so there is no way to *initiate* a connection to a GCS or vehicle running in the local network.
:::

A common approach is to set up a virtual private network between the companion and GCS computer (i.e. install a VPN system like [zerotier](https://www.zerotier.com/) on both computers). The companion then uses [mavlink-router](https://github.com/intel/mavlink-router) to route traffic between the serial interface (flight controller) and GCS computer on the VPN network.

This method has the benefit that the GCS computer address can be static within the VPN, so the configuration of the *mavlink router* does not need to change over time. In addition, the communication link is secure because all VPN traffic is encrypted (MAVLink 2 itself does not support encryption).

:::note
You can also choose to route to the VPN broadcast address (i.e. `x.x.x.255:14550`, where 'x' depends on the VPN system). This approach means that you do not need to know the IP address of the GCS computer, but may result in more traffic than desired (since packets are broadcast to every computer on the VPN network).
:::

Some USB modules that are known to work include:
- [화웨이 E8372](https://consumer.huawei.com/en/mobile-broadband/e8372/) , [화웨이 E3372](https://consumer.huawei.com/en/mobile-broadband/e3372/)
  - *E8372*에는 SIM이 보조 컴퓨터에 연결중에는 SIM을 설정하는 WiFi가 포함되어 있습니다 (개발 절차가 조금 더 쉬워짐). *E3372*에는 WiFi가 없으므로, 스틱을 노트북에 연결하여 설정하여야 합니다.
