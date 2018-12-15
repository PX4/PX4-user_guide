# Pixhawk 4 Mini

The *Pixhawk<sup>&reg;</sup> 4 Mini* autopilot is designed for engineers and hobbyists who are looking to tap into the power of *Pixhawk 4* but are working with smaller drones. *Pixhawk 4 Mini* takes the FMU processor and memory resources from the *Pixhawk 4* while eliminating interfaces that are normally unused. This allows the *Pixhawk 4 Mini* to be small enough to fit in a 250mm racer drone.

*Pixhawk 4 Mini* was designed and developed in collaboration with Holybro<sup>&reg;</sup> and Auterion<sup>&reg;</sup>. It is based on the [Pixhawk](https://pixhawk.org/) **FMUv5** design standard and is optimized to run PX4 flight control software.

<img src="../../assets/flight_controller/pixhawk4mini/pixhawk4mini_iso_1.png" width="350px" title="Pixhawk 4 Mini Iso" />

## Quick Summary

* 主处理器：STM32F765 
  * 32 位 Arm® Cortex®-M7，216MHz，2MB 储存，512KB RAM
* 内置传感器： 
  * Accel/Gyro: ICM-20689
  * Accel/Gyro: BMI055
  * 磁力计：IST8310
  * 气压计：MS5611
* GPS: ublox Neo-M8N GPS/GLONASS receiver; integrated magnetometer IST8310
* Interfaces: 
  * 8 PWM outputs
  * 4 dedicated PWM/Capture inputs on FMU
  * CPPM专用的RC输入
  * Dedicated R/C input for Spektrum / DSM and S.Bus with analog / PWM RSSI input
  * 3 general purpose serial ports
  * 2 I2C ports
  * 3 SPI buses
  * 1 CANBuses for CAN ESC
  * Analog inputs for voltage / current of battery
  * 2 additional analog input
* Power System: 
  * Power Brick Input: 4.75~5.5V
  * USB Power Input: 4.75~5.25V
  * Servo Rail Input: 0~24V
  * Max current sensing: 120A
* Weight and Dimensions: 
  * Dimensions: 38x55x15.5mm
* 其它特性: 
  * Operating temperature: -40 ~ 85°c

Additional information can be found in the [*Pixhawk 4 Mini* Technical Data Sheet](https://github.com/PX4/px4_user_guide/raw/master/assets/flight_controller/pixhawk4mini/pixhawk4mini_technical_data_sheet.pdf).

## 采购

Order from [Holybro](https://shop.holybro.com/pixhawk4-mini_p1120.html).

## Interfaces

![Pixhawk 4 Mini interfaces](../../assets/flight_controller/pixhawk4mini/pixhawk4mini_interfaces.png)

> **Warning** The **RC IN** and **PPM** ports are for RC receivers only. These are powered! NEVER connect any servos, power supplies or batteries (or to any connected receiver).

## Pinouts

Download *Pixhawk 4 Mini* pinouts from [here](https://github.com/PX4/px4_user_guide/raw/master/assets/flight_controller/pixhawk4mini/pixhawk4mini_pinouts.pdf).

## Dimensions

![Pixhawk 4 Mini Dimensions](../../assets/flight_controller/pixhawk4mini/pixhawk4mini_dimensions.png)

## 额定电压

*Pixhawk 4 Mini* can have power supply redundancy — if two power sources are supplied. The power rails are: **POWER** and **USB**.

> **Note** The output power rail of **MAIN OUT** does not power the flight controller board (and is not powered by it). You must [supply power](../assembly/quick_start_pixhawk4_mini.md#voltageratings) to one of **POWER** or **USB** or the board will be unpowered.

**正常运行最大额定值**

在这些条件下，所有电源将按此顺序用于为系统供电：

1. **POWER** (4.75V to 5.5V)
2. **USB** 输入电压 (4.75 v 至 5.25 v)

**Absolute Maximum Ratings**

Under these conditions the system will remain intact.

1. **POWER** input (0V to 6V undamaged)
2. **USB** input (0V to 6V undamaged)
3. Servo input: VDD_SERVO pin of **MAIN OUT** (0V to 24V undamaged)

## Assembly/Setup

The [*Pixhawk 4 Mini* Wiring Quick Start](../assembly/quick_start_pixhawk4_mini.md) provides instructions on how to assemble required/important peripherals including GPS, Power Management Board, etc.

## 编译固件

> **Tip** Most users will not need to build this firmware! It is pre-built and automatically installed by *QGroundControl* when appropriate hardware is connected.

To [build PX4](https://dev.px4.io/en/setup/building_px4.html) for this target:

    make make px4_fmu-v5_default
    

## Debug调试端口

The system's serial console and SWD interface run on the **FMU Debug** port. In order to access these ports, the user must remove the *Pixhawk 4 Mini* casing.

![Pixhawk 4 Mini FMU Debug](../../assets/flight_controller/pixhawk4mini/pixhawk4mini_fmu_debug.png)

The port has a standard serial pinout and can be connected to a standard FTDI cable (3.3V, but it's 5V tolerant) or a [Dronecode probe](https://kb.zubax.com/display/MAINKB/Dronecode+Probe+documentation). The pinout uses the standard Dronecode debug connector pinout. Please refer to the [wiring](https://dev.px4.io/en/debug/system_console.html) page for details of how to wire up this port.

## 外部设备

* [Digital Airspeed Sensor](https://drotek.com/shop/en/home/848-sdp3x-airspeed-sensor-kit-sdp33.html)
* [遥测无线电模块](../telemetry/README.md)
* [距离传感器](../sensor/rangefinders.md)

## Supported Platforms

Motors and servos are connected to the **MAIN OUT** ports in the order specified for your vehicle in the [Airframe Reference](../airframes/airframe_reference.md). This reference lists the output port to motor/servo mapping for all supported air and ground frames (if your frame is not listed in the reference then use a "generic" airframe of the correct type).

> **Warning** *Pixhawk 4 Mini* does not have AUX ports. The board cannot be used with frames that require more than 8 ports or which use AUX ports for motors or control surfaces. It can be used for airframes that use AUX for non-essential peripherals (e.g. "feed-through of RC AUX1 channel").

## 更多信息

* [*Pixhawk 4 Mini* Technical Data Sheet](https://github.com/PX4/px4_user_guide/raw/master/assets/flight_controller/pixhawk4mini/pixhawk4mini_technical_data_sheet.pdf)
* FMUv5 参考设计</0 >。</li> </ul>