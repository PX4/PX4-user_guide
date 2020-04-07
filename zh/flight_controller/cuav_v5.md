# CUAV v5 (Discontinued)

> **Warning** This flight controller has been [discontinued](../flight_controller/autopilot_experimental.md) and is no longer commercially available.

*CUAV v5*<sup>&reg;</sup> (previously "Pixhack v5") is an advanced autopilot designed and made by CUAV<sup>&reg;</sup>. 该控制器基于[Pixhawk项目](https://pixhawk.org/)的**FMUv5** 开源硬件设计。 它在[NuttX](http://nuttx.org) OS操作系统上运行PX4，并与PX4固件完全兼容。 它主要面向学术和商业开发者。

![CUAV v5](../../assets/flight_controller/cuav_v5/pixhack_v5.jpg)

## 快速预览

* 主处理器：STM32F765 
  * 32 位 Arm® Cortex®-M7，216MHz，2MB 储存，512KB RAM
* IO 处理器：STM32F100 
  * 32 位 Arm® Cortex®-M3，24MHz，8KB SRAM

* 内置传感器：
  
  * 加速度计/陀螺仪：ICM-20689
  * 加速度计/陀螺仪：BMI055
  * 磁力计：IST8310
  * 气压计：MS5611

* 接口：
  
  * 14路PWM输出 (6路来自FMU, 8路来自 IO)
  * FMU上有3个专用PWM/Capture输入
  * CPPM专用的RC输入
  * Dedicated R/C input for PPM and S.Bus 
  * 电平/PWM RSSI输入
  * S.BUS伺服输出
  * 5个通用串行口
  * 4路I2C总线
  * 4路SPI总线
  * 2路CAN总线
  * 2个电池电流/电压模拟输入口
* 电源系统： 
  * 输入电压：4.3~5.4V
  * USB输入电压: 4.75~5.25V
  * 伺服导轨输入电压：0~36V
* 重量和尺寸: 
  * 重量：99g
  * 尺寸：44*84*12mm
* 其它特性: 
  * 工作温度：-20 ~ 80°C （实测值）

## 采购

从 [CUAV](https://cuav.taobao.com/index.htm?spm=2013.1.w5002-16371268426.2.411f26d9E18eAz) 官方淘宝店采购。

## 接口定义 {#connection}

![CUAV v5](../../assets/flight_controller/cuav_v5/pixhack_v5_connector.jpg)

> **Warning**The RCIN interface is limited to powering the rc receiver and cannot be connected to any power/load.

## 额定电压

*CUAV v5* can be triple-redundant on the power supply if three power sources are supplied. 三个电源口：**POWER1**, **POWER2** and **USB**。 

> **Note** The output power rails **FMU PWM OUT** and **I/O PWM OUT** (0V to 36V) do not power the flight controller board (and are not powered by it). You must supply power to one of **POWER1**, **POWER2** or **USB** or the board will be unpowered.

**正常运行最大额定值**

在这些条件下，所有电源将按此顺序用于为系统供电：

1. **POWER1** 和 **POWER2** 输入电压 (4.3 v 至 5.4 v)
2. **USB** 输入电压 (4.75 v 至 5.25 v)

## 编译固件

> **Tip** Most users will not need to build this firmware! It is pre-built and automatically installed by *QGroundControl* when appropriate hardware is connected.

To [build PX4](https://dev.px4.io/master/en/setup/building_px4.html) for this target:

    make px4_fmu-v5_default
    

## Debug调试端口

The [PX4 System Console](http://dev.px4.io/master/en/debug/system_console.html) and [SWD interface](http://dev.px4.io/master/en/debug/swd_debug.html) operate on the **FMU Debug** port. 只需将FTDI电缆连接到Debug & F7 SWD连接器。 To access the I/O Debug port, the user must remove the CUAV v5 shell. 这两个端口都有标准串行引脚, 可以连接到标准的FTDI电缆(3.3 v,但耐压5v )。

引脚排列如图所示

![CUAV v5 debug](../../assets/flight_controller/cuav_v5/pixhack_v5_debug.jpg)

| 针脚 | CUAV v5 debug |
| -- | ------------- |
| 1  | GND           |
| 2  | FMU-swclk     |
| 3  | FMU-SWDIO     |
| 4  | UART7_RX      |
| 5  | UART7_TX      |
| 6  | VCC           |

## Serial Port Mapping

| UART   | Device     | Port                                  |
| ------ | ---------- | ------------------------------------- |
| UART1  | /dev/ttyS0 | GPS                                   |
| USART2 | /dev/ttyS1 | TELEM1 (flow control)                 |
| USART3 | /dev/ttyS2 | TELEM2 (flow control)                 |
| UART4  | /dev/ttyS3 | TELEM4                                |
| USART6 | /dev/ttyS4 | TX is RC input from SBUS_RC connector |
| UART7  | /dev/ttyS5 | Debug Console                         |
| UART8  | /dev/ttyS6 | PX4IO                                 |

## Peripherals

* [数字空速传感器](https://item.taobao.com/item.htm?spm=a1z10.3-c-s.w4002-16371268452.37.6d9f48afsFgGZI&id=9512463037)
* [遥测无线电模块](https://cuav.taobao.com/category-158480951.htm?spm=2013.1.w5002-16371268426.4.410b7a821qYbBq&search=y&catName=%CA%FD%B4%AB%B5%E7%CC%A8)
* [距离传感器](../sensor/rangefinders.md)

## Supported Platforms / Airframes

任何可用普通RC伺服系统或Futaba S-Bus伺服系统控制的多旋翼、固定翼、无人机、无人船。 全部可支持的机型可见 [机型参考](../airframes/airframe_reference.md)。

## Further info

* FMUv5参考设计</0 >。 </li> 
  
  * [CUAV v5 docs](http://doc.cuav.net/flight-controller/v5-autopilot/en/v5.html) 
  * [CUAV Github库](https://github.com/cuav) </ul>