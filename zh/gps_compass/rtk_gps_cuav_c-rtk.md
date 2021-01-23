# CUAV C-RTK

The [CUAV C-RTK GPS receiver](http://doc.cuav.net/gps/c-rtk/en/) is an [RTK GPS module](../gps_compass/rtk_gps.md) for the mass market. 一个完整的RTK 系统由至少两个 c-rtk 模块 组成(一个用于基站, 另外一个作为移动站用于飞机上)。 使用RTK，PX4控制器可以获取到它的位置，并且这个位置的精度可以达到厘米级的精度，这比普通GPS提供的位置更加精确。

<img src="../../assets/hardware/gps/rtk_c-rtk.jpg" width="500px" title="C-RTK" />

## 购买

* [cuav淘宝店铺](https://item.taobao.com/item.htm?id=565380634341&spm=2014.21600712.0.0)
* [cuav aliexpress](https://www.aliexpress.com/store/product/CUAV-NEW-Flight-Controller-GPS-C-RTK-differential-positioning-navigation-module-GPS-for-PIX4-Pixhawk-pixhack/3257035_32853894248.html?spm=2114.12010608.0.0.75592fadQKPPEn
 
Context)

## 配置

RTK设置和使用在px4上通过 *QGroundControl* 很大程度上可以即插即用 \ (请参阅[RTK GPS](../advanced_features/rtk-gps.md) 更多信息)。

## 接线和连接

C-RTK GPS comes with a cable that terminates in a 6-pin connector and 4-pin connector that are compatible with [Pixhack v3](http://doc.cuav.net/gps/c-rtk/en/c-rtk/hardware-connection.html). 6针连接器提供 rtk gps 的接口, 并应连接到飞行控制器的 gps 接口。 4针连接器是一个 m8n (标准) gps 接口, 可作为第二个 gps(可选)。

:::tip
At time of writing PX4 does not yet fully support a second GPS. The 4-pin port need not be connected.
:::

<img src="../../assets/hardware/gps/rtk_cuav_c-rtk_to_6pin_connector.jpg" width="500px" title="C-RTK_6PIN" />

The cables/connectors may need to be modified in order to connect to other flight controller boards. The pin mappings for *Pixhawk 3 Pro* and *Pixracer* are shown below.

### 针脚定义

The C-RTK GPS pinout is provided below. This can be used to help modify the connector for other autopilot boards.

| 引脚 | C-RTK GPS 6P | 引脚 | Pixhawk 3 Pro GPS | C-RTK GPS 4P |
| -- | ------------ | -- | ----------------- | ------------ |
| 1  | SDA          | 1  | VCC               |              |
| 2  | SCL          | 2  | GPS_TX            |              |
| 3  | GPS_RX       | 3  | GPS_RX            | GPS_RX       |
| 4  | GPS_TX       | 4  | SCL               | GPS_TX       |
| 5  | VCC_5V       | 5  | SDA               | VCC_5V       |
| 6  | GND          | 6  | GND               | GND          |