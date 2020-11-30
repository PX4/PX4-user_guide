# 보조 컴퓨터 주변 장치

이 절에서는 픽스호트(PX4)를 보조 컴퓨터에 연결하고 여러 주변 장치를 보조 컴퓨터로 연결(하고 PX4에서 잠재적으로 실행/접근)하는 내용을 다룹니다.

## 보조 컴퓨터/픽스호크 통신

보통 픽스호크와 함께 동작하는 보조 컴퓨터는 보조 컴퓨터와 픽스호크 하드웨어와 통신(예: 인텔 누크와 픽스호크 4)하는 보조 연결이 필요합니다.

FTDI USB 모듈과 레벨 시프터(하단 참조)같은 통신 브릿징이 가능한 몇가지 장치가 있습니다.

:::tip
Note 보조 컴퓨터와 통신할 때 필요한 PX4 MAVLink 설정은 [MAVLink \(OSD / 텔레메트리\)](../peripherals/mavlink_peripherals.md#example) 편에서 다룹니다. 기타 관련 주제/절은 [픽스호크 시리즈용 보조 컴퓨터](../companion_computer/pixhawk_companion.md), [로보틱스](../robotics/README.md), [RTPS/ROS2 인터페이스: PX4-FastRTPS 브릿지](../middleware/micrortps.md)가 있습니다.
:::

### FTDI Devices

The FTDI USB adapters are the most common way of communicating between companion computer and Pixhawk. They are usually plug and play as long as the IO of the adapter is set to 3.3v. In order to utilize the full capability/reliability of the serial link offered on the Pixhawk hardware, flow control is recommended.

Options are listed below:

| 장치                                                                                                                      | 3.3v 입출력 (기본) | Flow Control | Tx/Rx LEDs | JST-GH |
| ----------------------------------------------------------------------------------------------------------------------- | ------------- | ------------ | ---------- | ------ |
| [PixDev FTDI JST-GH Breakout](https://pixdev.myshopify.com/products/ftdi-breakout-jst-gh)                               | Yes           | Yes          | Yes        | Yes    |
| [mRo USB FTDI Serial to JST-GH (Basic)](https://store.mrobotics.io/USB-FTDI-Serial-to-JST-GH-p/mro-ftdi-jstgh01-mr.htm) | Capable       | Capable      | No         | Yes    |
| [SparkFun FTDI Basic Breakout](https://www.sparkfun.com/products/9873)                                                  | Yes           | No           | Yes        | No     |

### Logic Level Shifters

On occasion a companion computer may expose hardware level IO that is often run at 1.8v or 5v, while the Pixhawk hardware operates at 3.3v IO. In order to resolve this, a level shifter can be implemented to safely convert the transmitting/receiving signal voltage.

Options include:

- [SparkFun Logic Level Converter - Bi-Directional](https://www.sparkfun.com/products/12009)
- [4-channel I2C-safe Bi-directional Logic Level Converter - BSS138](https://www.adafruit.com/product/757)

## Cameras

Cameras are used image and video capture, and more generally to provide data for [computer vision](../computer_vision/README.md) applications (in this case the "cameras" may only provide processed data, not raw images)

### Stereo Cameras

Stereo cameras are typically used for depth perception, path planning and SLAM. They are in no way guaranteed to be plug and play with your companion computer.

Popular stereo cameras include:

- [Intel® RealSense™ Depth Camera D435](https://click.intel.com/intelr-realsensetm-depth-camera-d435.html)
- [Intel® RealSense™ Depth Camera D415](https://click.intel.com/intelr-realsensetm-depth-camera-d415.html)
- [Ironsides](https://www.perceptin.io/products)
- [DUO MLX](https://duo3d.com/product/duo-minilx-lv1) <!-- note, timeout on link 18Nov2019 -->

### VIO Cameras/Sensors

The following sensors can be used for [Visual Inertial Odometry (VIO)](../computer_vision/visual_inertial_odometry.md):

- [T265 Realsense Tracking Camera](../peripherals/camera_t265_vio.md)

<span id="data_telephony"></span>

## Data Telephony (LTE)

An LTE USB module can be attached to a companion computer and used to route MAVLink traffic between the flight controller and the Internet.

There is no "standard method" for a ground station and companion to connect over the Internet. Generally you can't connect them directly because neither of them will have a public/static IP on the Internet.

:::tip
Note Typically your router (or the mobile network) has a public IP address, and your GCS computer/vehicle are on a *local* network. The router uses network address translation (NAT) to map *outgoing* requests from your local network to the Internet, and can use the map to route the *responses* back to requesting system. However NAT has no way to know where to direct the traffic from an arbitrary external system, so there is no way to *initiate* a connection to a GCS or vehicle running in the local network.
:::

A common approach is to set up a virtual private network between the companion and GCS computer (i.e. install a VPN system like [zerotier](https://www.zerotier.com/) on both computers). The companion then uses [mavlink-router](https://github.com/intel/mavlink-router) to route traffic between the serial interface (flight controller) and GCS computer on the VPN network.

This method has the benefit that the GCS computer address can be static within the VPN, so the configuration of the *mavlink router* does not need to change over time. In addition, the communication link is secure because all VPN traffic is encrypted (MAVLink 2 itself does not support encryption).

:::tip
Note You can also choose to route to the VPN broadcast address (i.e. `x.x.x.255:14550`, where 'x' depends on the VPN system). This approach means that you do not need to know the IP address of the GCS computer, but may result in more traffic than desired (since packets are broadcast to every computer on the VPN network).
:::

Some USB modules that are known to work include:

- [Huawei E8372](https://consumer.huawei.com/en/mobile-broadband/e8372/) and [Huawei E3372](https://consumer.huawei.com/en/mobile-broadband/e3372/) 
  - The *E8372* includes WiFi which you can use to configure the SIM while it is plugged into the companion (making the development workflow a little easier). The *E3372* lacks WiFi, so you have to configure it by plugging the stick into a laptop.