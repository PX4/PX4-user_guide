# GPS&罗盘

PX4支持全球导航卫星系统(GNSS)(包括GPS、GLONASS、Galileo,、北斗、QZSS和SBAS),使用接收器通过UBlox、MTK或Ashtech协议或通过UAVCAN进行通信。 It also supports [Real Time Kinematic (RTK) GPS Receivers](../gps_compass/rtk_gps.md), which extend GPS systems to centimetre-level precision.

PX4可用于以下指南针部件(磁强计): 博世BMM 150 MEMS(通过I2C总线)、HMC5883/HMC5983(I2C或SPI)、IST8310(I2C)和 LIS3MDL(I2C或SPI)。

最多可以连接4个内部或外部磁强计, 但实际上只有一个磁强计可用作标题源。 系统根据其内部优先级自动选择可用的最佳罗盘(外部磁强计具有更高的优先级)。 如果主指南针在飞行中失败, 它将跳转到下一个指南针。 如果它在飞行前失败, 将无法起飞。

![GPS + Compass](../../images/gps_compass.jpg)

> **Tip**在使用[Pixhawk-series](../flight_controller/pixhawk_series.md)飞行控制器时, 我们建议使用安装在远离飞机/esc电源线的地方的*整合GPS和罗盘*-通常安装在基座或机翼上(适用于固定翼飞机)。 内部指南针*可能*在较大的机型(如VTOL)上有用, 在这些车辆上, 通过安装Pixhawk距离电源线很远, 可以减少电磁干扰。 On small vehicles an external compass is almost always required.

## 组合GPS/罗盘选项

一些流行的GSP/指南针选项包括:

- [Ublox Neo-M8N GPS with Compass](https://hobbyking.com/en_us/ublox-neo-m8n-gps-with-compass.html?gclid=Cj0KCQjwqM3VBRCwARIsAKcekb3ojv1ZhLz1-GuvCsUuGT8ZZuw8meMIV_I6pgUCj6DJRzHBY9OApekaAgI5EALw_wcB&gclsrc=aw.ds&___store=en_us) (Hobbyking)
- [mRo GPS u-Blox Neo-M8N Dual Compass LIS3MDL+ IST8310](https://store.mrobotics.io/ProductDetails.asp?ProductCode=mro-gps003-mr) (mRo store)
- [Drotek uBlox GPS/Compasses](https://drotek.com/shop/en/184-u-blox) (drotek)
- [Holybro Micro M8N GPS Module](https://www.getfpv.com/holybro-micro-m8n-gps-module.html) (getfpv)
- [Holybro Ublox NEO-M8N GPS Module](https://www.getfpv.com/holybro-ublox-neo-m8n-gps-module.html) (getfpv)
- [Holybro Pixhawk 4 GPS Module](https://shop.holybro.com/pixhawk-4-gps-module_p1094.html) (UBLOX 8MN GPS + IST8310 compass + LED + Safety switch).
- [Here GNSS GPS (M8N)](https://www.getfpv.com/here-gnss-gps-m8n.html) (getfpv) 
- [Zubax GNSS 2](https://zubax.com/products/gnss_2) (zubax.com)
- [3DR uBlox GPS with Compass kit](https://www.getfpv.com/3dr-ublox-gps-with-compass-kit.html) (getfpv) - *Discontinued*

GPS与罗盘的连接说明通常由厂家(至少支持更通用的[自驾仪](../flight_controller/README.md))提供

> **Note**[Pixhawk series](../flight_controller/pixhawk_series.md)控制器通常有一个标记明确的端口用于连接gps, 指南针连接到i2c或spi portp总线 (取决于设备)。 [Zubax gnss 2](https://zubax.com/products/gnss_2)也可以通过[UAVCAN](https://dev.px4.io/en/uavcan/)连接。

<span></span>

> **Tip**连接gps模块时, 请注意引脚。 虽然这些都是软件兼容, 有几个不同的引脚。

## RTK-GPS设备

有关支持的设备和setup/配置的信息, 请参阅边栏下的[RTK gps](../gps_compass/rtk_gps.md)。

## Configuration

### GPS

gps配置为用户透明地处理(前提是模块gps连接器连接正确)。

### Compass

指南针校准内容包括在: [罗盘配置](../config/compass.md)中。 该过程非常简单, 将校准所有连接的磁强计。

可以使用[CAL*MAGx*](../advanced_config/parameter_reference.md#CAL_MAG0_EN)parameters(`x=0-3`)[performed](../advanced_config/parameters.md)其他配置。 通常, 您不需要*修改*这些, 因为罗盘是自动检测的, 优先排序, 并且都是同时校准的(可能的例外是[CAL\_MAGx\_EN](../advanced_config/parameter_reference.md#CAL_MAG0_EN)可能用于禁用内部指南针)。 但是, 您可能希望阅读它们, 因为它们会让您知道哪些磁强计是内部或外部([CAL\_MAGx\_EN](../advanced_config/parameter_reference.md#CAL_MAG0_EN)), 哪些是用作主要标题源 ([CAL_MAG_PRIME](../advanced_config/parameter_reference.md#CAL_MAG_PRIME))。

## Developer Information

- GPS/RTK-GPS 
  - [RTK-GPS](https://dev.px4.io/en/advanced/rtk_gps.html) 
  - [GPS驱动程序](https://dev.px4.io/en/middleware/modules_driver.html#gps)
  - [UAVCAN示例](https://dev.px4.io/en/uavcan/)
- [Magnetometer驱动](https://github.com/PX4/Firmware/tree/master/src/drivers/magnetometer)(源代码)