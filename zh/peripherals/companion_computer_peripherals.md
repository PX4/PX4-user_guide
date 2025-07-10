---
canonicalUrl: https://docs.px4.io/main/zh/peripherals/companion_computer_peripherals
---

# 机载计算机外设

This section contains information about companion computer peripherals. These include both components that might be connected to a companion computer (potentially triggered/accessed by PX4), and for connecting the computer to the flight controller.

## Companion/Pixhawk Communication

Typical companion computer work with Pixhawk requires a companion link to transmit/receive the data between the companion computer and Pixhawk hardware (e.g. Intel NUC and Pixhawk 4).

有一些构建这种通信桥的设备，如 FTDI USB 接口和电平移位器(见下文)。

:::note PX4 configuration for communicating with a companion computer over MAVLink configuration is covered in [MAVLink \(OSD / Telemetry\)](../peripherals/mavlink_peripherals.md#example). Other relevant topics/sections include: [Companion Computer for Pixhawk Series](../companion_computer/pixhawk_companion.md), [Robotics](../robotics/README.md) and [RTPS/DDS Interface: PX4-Fast RTPS(DDS) Bridge](../middleware/micrortps.md).
:::

### FTDI 设备

The FTDI USB adapters are the most common way of communicating between companion computer and Pixhawk. They are usually plug and play as long as the IO of the adapter is set to 3.3V. In order to utilize the full capability/reliability of the serial link offered on the Pixhawk hardware, flow control is recommended.

A few "turnkey" options are listed below:

| 设备                                                                                                                      | 3.3v IO (默认) | 流控      | Tx/Rx LEDs | JST-GH接插件 |
| ----------------------------------------------------------------------------------------------------------------------- | ------------ | ------- | ---------- | --------- |
| [mRo USB FTDI Serial to JST-GH (Basic)](https://store.mrobotics.io/USB-FTDI-Serial-to-JST-GH-p/mro-ftdi-jstgh01-mr.htm) | Capable      | Capable | No         | Yes       |
| [SparkFun FTDI Basic Breakout](https://www.sparkfun.com/products/9873)                                                  | Yes          | No      | Yes        | No        |

You can also use an off-the-shelf FTDI cable [like this one](https://www.sparkfun.com/products/9717) and connect it to flight controller using the appropriate header adaptor (JST-GH connectors are specified in the Pixhawk standard, but you should confirm the connectors for your flight controller).


### 逻辑电平移位器

On occasion a companion computer may expose hardware level IO that is often run at 1.8v or 5v, while the Pixhawk hardware operates at 3.3v IO. In order to resolve this, a level shifter can be implemented to safely convert the transmitting/receiving signal voltage.

Options include:
* [SparkFun 逻辑电平转换器 - 双向](https://www.sparkfun.com/products/12009)
* [4通道 I2C -安全双向逻辑电平转换器 - BSS 138](https://www.adafruit.com/product/757)

## 相机

Cameras are used image and video capture, and more generally to provide data for [computer vision](../computer_vision/README.md) applications (in this case the "cameras" may only provide processed data, not raw images)

### 立体摄像机

Stereo cameras are typically used for depth perception, path planning and SLAM. They are in no way guaranteed to be plug and play with your companion computer.

Popular stereo cameras include:

- [Intel® RealSense™ Depth Camera D435](https://www.intelrealsense.com/depth-camera-d435/)
- [Intel® RealSense™ Depth Camera D415](https://www.intelrealsense.com/depth-camera-d415/)
- [DUO MLX](https://duo3d.com/product/duo-minilx-lv1)

### VIO Cameras/Sensors

The following sensors can be used for [Visual Inertial Odometry (VIO)](../computer_vision/visual_inertial_odometry.md):

- [T265 Realsense Tracking Camera](../peripherals/camera_t265_vio.md)


<span id="data_telephony"></span>
## Data Telephony (LTE)

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
- [Huawei E8372](https://consumer.huawei.com/en/mobile-broadband/e8372/) and [Huawei E3372](https://consumer.huawei.com/en/mobile-broadband/e3372/)
  - The *E8372* includes WiFi which you can use to configure the SIM while it is plugged into the companion (making the development workflow a little easier). The *E3372* lacks WiFi, so you have to configure it by plugging the stick into a laptop.
