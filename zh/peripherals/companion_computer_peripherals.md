# 机载计算机外设

本节包含有关用于连接 Pixhawk(PX4) 到机载计算机的外设的信息，以及可能连接到此类机载计算机(并可能由 PX4 触发/访问) 的外设的信息。

## Companion/Pixhawk Communication

Typical companion computer work with Pixhawk requires a companion link to transmit/receive the data between the companion computer and Pixhawk hardware (e.g. Intel NUC and Pixhawk 4).

有一些构建这种通信桥的设备，如 FTDI USB 接口和电平移位器(见下文)。

> **Note** PX4 configuration for communicating with a companion computer over MAVLink configuration is covered in [MAVLink \(OSD / Telemetry\)](../peripherals/mavlink_peripherals.md#example). Relevant topics/sections in the developer guide include: [Companion Computer for Pixhawk Series](http://dev.px4.io/en/companion_computer/pixhawk_companion.html), [Robotics](http://dev.px4.io/en/robotics/) and [RTPS/ROS2 Interface: PX4-FastRTPS Bridge](http://dev.px4.io/en/middleware/micrortps.html).

### FTDI 设备

FTDI USB 适配器是机载计算机和 Pixhawk 之间最常用的通信方式。 只要适配器的 IO 设置为 3.3V，它们通常是即插即用的。 为了充分利用 Pixhawk 硬件上提供的串行链路的全部性能/可靠性，建议采取流量控制。

#### 购买地点及特性

| 设备                                                                                                                      | 3.3v IO (默认) | 流控      | Tx/Rx LEDs | JST-GH接插件 |
| ----------------------------------------------------------------------------------------------------------------------- | ------------ | ------- | ---------- | --------- |
| [PixDev FTDI JST-GH Breakout](https://pixdev.myshopify.com/products/ftdi-breakout-jst-gh)                               | Yes          | Yes     | Yes        | Yes       |
| [mRo USB FTDI Serial to JST-GH (Basic)](https://store.mrobotics.io/USB-FTDI-Serial-to-JST-GH-p/mro-ftdi-jstgh01-mr.htm) | Capable      | Capable | No         | Yes       |
| [SparkFun FTDI Basic Breakout](https://www.sparkfun.com/products/9873)                                                  | Yes          | No      | Yes        | No        |

### 逻辑电平移位器

有时，机载计算机可能通常会引出运行在 1.8V 或 5V 的硬件级 IO，而 Pixhawk 硬件则以 3.3V IO 运行。 为了解决这一问题，可以实现电平移位器来安全地转换发送/接收信号电压。

#### 购买地点

- [SparkFun 逻辑电平转换器 - 双向](https://www.sparkfun.com/products/12009)
- [4通道 I2C -安全双向逻辑电平转换器 - BSS 138](https://www.adafruit.com/product/757)

## 相机

相机是无人机上最常见的数据采集方式之一，无论是爱好者、教育还是工业用途。

### 立体摄像机

立体摄像机通常用于深度感知、路径规划和 SLAM 。 他们在任何方面都不能保证与你的机载计算机即插即用。

#### 购买地点

- [Intel® RealSense™ Depth Camera D435](https://click.intel.com/intelr-realsensetm-depth-camera-d435.html)
- [Intel® RealSense™ Depth Camera D415](https://click.intel.com/intelr-realsensetm-depth-camera-d415.html)
- [Ironsides](https://www.perceptin.io/products)
- [DUO MLX](https://duo3d.com/product/duo-minilx-lv1) <!-- note, timeout on link 18Nov2019 -->

## Data Telephony (LTE) {#data_telephony}

An LTE USB module can be attached to a companion computer and used to route MAVLink traffic between the flight controller and the Internet.

There is no "standard method" for a ground station and companion to connect over the Internet. Generally you can't connect them directly because neither of them will have a public/static IP on the Internet.

> **Note** Typically your router (or the mobile network) has a public IP address, and your GCS computer/vehicle are on a *local* network. The router uses network address translation (NAT) to map *outgoing* requests from your local network to the Internet, and can use the map to route the *responses* back to requesting system. However NAT has no way to know where to direct the traffic from an arbitrary external system, so there is no way to *initiate* a connection to a GCS or vehicle running in the local network.

A common approach is to set up a virtual private network between the companion and GCS computer (i.e. install a VPN system like [zerotier](https://www.zerotier.com/) on both computers). The companion then uses [mavlink-router](https://github.com/intel/mavlink-router) to route traffic between the serial interface (flight controller) and GCS computer on the VPN network.

This method has the benefit that the GCS computer address can be static within the VPN, so the configuration of the *mavlink router* does not need to change over time. In addition, the communication link is secure because all VPN traffic is encrypted (MAVLink 2 itself does not support encryption).

> **Note** You can also choose to route to the VPN broadcast address (i.e. `x.x.x.255:14550`, where 'x' depends on the VPN system). This approach means that you do not need to know the IP address of the GCS computer, but may result in more traffic than desired (since packets are broadcast to every computer on the VPN network).

Some USB modules that are known to work include:

- [Huawei E8372](https://consumer.huawei.com/en/mobile-broadband/e8372/) and [Huawei E3372](https://consumer.huawei.com/en/mobile-broadband/e3372/) 
  - The *E8372* includes WiFi which you can use to configure the SIM while it is plugged into the companion (making the development workflow a little easier). The *E3372* lacks WiFi, so you have to configure it by plugging the stick into a laptop.