# 机载计算机外设

本节包含有关用于连接 Pixhawk(PX4) 到机载计算机的外设的信息，以及可能连接到此类机载计算机(并可能由 PX4 触发/访问) 的外设的信息。

## 通信

典型的机载计算机与 Pixhawk 一起工作，这需要有一个连接来传输/接收机载计算机和 Pixhawk 硬件之间的数据（如， Intel NUC 和 Pixhawk 4)。

有一些构建这种通信桥的设备，如 FTDI USB 接口和电平移位器(见下文)。

> **Note** [MAVLink\(OSD/Telemetry\)](../peripherals/mavlink_peripherals.md#TELEM2) 介绍了用于通过 MAVLink 配置与机载计算机通信的 PX4 配置。 开发人员指南中的相关主题/部分包括：[Pixhawk 系列的机载计算机](http://dev.px4.io/en/companion_computer/pixhawk_companion.html)、[Robotics](http://dev.px4.io/en/robotics/)和[RTPS/ROS2 接口：PX4-FastRTPS 桥](http://dev.px4.io/en/middleware/micrortps.html)。

### FTDI 设备

FTDI USB 适配器是机载计算机和 Pixhawk 之间最常用的通信方式。 只要适配器的 IO 设置为 3.3V，它们通常是即插即用的。 为了充分利用 Pixhawk 硬件上提供的串行链路的全部性能/可靠性，建议采取流量控制。

#### 购买地点及特性

| 设备                                                                                                                      | 3.3v IO (默认) | 流控      | Tx/Rx LEDs | JST-GH接插件 |
| ----------------------------------------------------------------------------------------------------------------------- | ------------ | ------- | ---------- | --------- |
| [PixDev FTDI JST-GH Breakout](https://pixdev.myshopify.com/products/ftdi-breakout-jst-gh)                               | Yes          | Yes     | Yes        | Yes       |
| [mRo USB FTDI Serial to JST-GH (Basic)](https://store.mrobotics.io/USB-FTDI-Serial-to-JST-GH-p/mro-ftdi-jstgh01-mr.htm) | Capable      | Capable | No         | Yes       |
| [SparkFun FTDI Basic Breakout](https://www.sparkfun.com/products/9873)                                                  | Yes          | No      | Yes        | No        |
| [Hyperion Adapter USB-FTDI](https://www.brack.ch/hyperion-adapter-usb-ftdi-510688)                                      | Yes          | No      | Yes        | No        |

### 逻辑电平移位器

有时，机载计算机可能通常会引出运行在 1.8V 或 5V 的硬件级 IO，而 Pixhawk 硬件则以 3.3V IO 运行。 为了解决这一问题，可以实现电平移位器来安全地转换发送/接收信号电压。

#### 购买地点

* [SparkFun 逻辑电平转换器 - 双向](https://www.sparkfun.com/products/12009)
* [4通道 I2C -安全双向逻辑电平转换器 - BSS 138](https://www.adafruit.com/product/757)

## 相机

相机是无人机上最常见的数据采集方式之一，无论是爱好者、教育还是工业用途。

### 立体摄像机

立体摄像机通常用于深度感知、路径规划和 SLAM 。 他们在任何方面都不能保证与你的机载计算机即插即用。

#### 购买地点

* [Intel® RealSense™ Depth Camera D435](https://click.intel.com/intelr-realsensetm-depth-camera-d435.html)
* [Intel® RealSense™ Depth Camera D415](https://click.intel.com/intelr-realsensetm-depth-camera-d415.html)
* [DUO MLX ](https://duo3d.com/product/duo-minilx-lv1)
* [Ironsides](https://www.perceptin.io/products)