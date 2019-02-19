# HEX/ProfiCNC Here+ RTK GPS

The [Here+ RTK GPS receiver](http://www.proficnc.com/content/12-here) is a small, light and energy efficient [RTK GPS module](../gps_compass/rtk_gps.md), based on the u-blox M8P. 使用RTK，PX4控制器可以获取到它的位置，并且这个位置的精度可以达到厘米级的精度，这比普通GPS提供的位置更加精确。

![](../../assets/hardware/gps/rtk_here_plus.jpg)

## 购买

* [ProfiCNC](http://www.proficnc.com/gps/77-gps-module.html)
* [Hex - China](http://www.hex.aero/shop/all/here-rtk-gnss-set/) (China)
* [Other resellers](http://www.proficnc.com/stores)

## 配置

RTK setup and use on PX4 via *QGroundControl* is largely plug and play (see [RTK GPS](../advanced_features/rtk-gps.md) for more information).

## 接线和连接

The Here+ GPS comes with an 8 pin connector that can be inserted directly into the [Pixhawk 2](http://www.hex.aero/wp-content/uploads/2016/07/DRS_Pixhawk-2-17th-march-2016.pdf) GPS UART port.

The Pixhawk 3 Pro and Pixracer have a 6 pin GPS port connector. For these controllers you can modify the GPS cable (as shown below) to remove pin 6 and 7.

<img src="../../assets/hardware/gps/rtk_here_plug_gps_to_6pin_connector.jpg" width="500px" />

Pin 6 and 7 are for the safety button - these can be attached as well if needed.

### 针脚定义

The Here+ GPS pinout is provided below. 这可用于帮助用户修改接口线序以适配其它自动驾驶仪板的连接器。

| 引脚 | Here+ GPS  | 引脚 | Pixhawk 3 Pro GPS |
| -- | ---------- | -- | ----------------- |
| 1  | VCC_5V     | 1  | VCC               |
| 2  | GPS_RX     | 2  | GPS_TX            |
| 3  | GPS_TX     | 3  | GPS_RX            |
| 4  | SCL        | 4  | SCL               |
| 5  | SDA        | 5  | SDA               |
| 6  | BUTTON     | -  | -                 |
| 7  | BUTTON_LED | -  | -                 |
| 8  | GND        | 6  | GND               |