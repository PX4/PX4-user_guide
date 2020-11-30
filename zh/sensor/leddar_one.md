# LeddarOne Lidar

[LeddarOne](https://leddartech.com/modules/leddarone/) is small Lidar module with a narrow, yet diffuse beam that offers excellent overall detection range and performance, in a robust, reliable, cost-effective package. It has a sensing range from 1cm to 40m and needs to be connected to a UART/serial bus.

<img src="../../assets/hardware/sensors/leddar_one.jpg" alt="LeddarOne Lidar rangefinder" width="200px" />

## 硬件安装

LeddarOne can be connected to any unused *serial port* (UART), e.g.: TELEM2, TELEM3, GPS2 etc.

Build a cable following your board and pinout and LeddarOne pinout (shown below). You only will need to connect 5V, TX, RX and GND pins.

| 针脚 | LeddarOne |
| -- | --------- |
| 1  | GND       |
| 2  | -         |
| 3  | VCC       |
| 4  | RX        |
| 5  | TX        |
| 6  | -         |

## Parameter Setup

[Configure the serial port](../peripherals/serial_configuration.md) on which the lidar will run using [SENS_LEDDAR1_CFG](../advanced_config/parameter_reference.md#SENS_LEDDAR1_CFG). 无需设置端口的波特率, 因为这是由驱动程序配置的。

> **Note** 如果配置参数在 *QGroundControl* 中不可用, 则可能需要 添加驱动程序到固件 </1 >: ```drivers/distance_sensor/leddar_one```</p> </blockquote> 
> 
> ## 更多信息
> 
> * [LeddarOne Spec sheet](https://leddartech.com/app/uploads/dlm_uploads/2017/05/Spec-Sheets-LeddarOne-27octobre2017-web.pdf)