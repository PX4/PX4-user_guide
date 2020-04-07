# mRo Control Zero F7 Flight Controller

The *mRo Control Zero F7<sup>&reg;</sup>* is a new flight controller from mRo.

![mRo Control Zero F7](../../assets/flight_controller/mro_control_zero_f7/mro_control_zero_f7.jpg)

It is a no-compromise triple IMU commercial grade flight controller.
It includes 8x PWM outputs (DShot capable), 3x IMUs, 1x Magnetometer, 1x Barometric Pressure Sensor (Altimeter), 6x UART, and SD Card, all packed into a 32mm x 20mm PCB.
The PWMs are bidirectional, EMI protected, and level shifted to 5V logic levels. 
All accessed using front and rear 30pin Molex PicoClasp connectors.
A durable plastic case, conformal board coating, and optional temperature calibration included.




> **Note** This flight controller is [manufacturer supported](../flight_controller/autopilot_manufacturer_supported.md).


## Key Features

- Microprocessor:
  - 32-bit STM32F777 Cortex<sup>&reg;</sup> M4 core with FPU rev. 3
  - 216 MHz/512 KB RAM/2 MB Flash
  - F-RAM Cypress MF25V02-G 256-Kbit nonvolatile memory (Flash memory that performs as fast as RAM)
- Sensors:
  - [Bosch BMI088](https://www.bosch-sensortec.com/bst/products/all_products/bmi088_1) 3-axis accelerometer/gyroscope (internally vibration dampened)
  - [Invensense ICM-20602](https://www.invensense.com/products/motion-tracking/6-axis/icm-20602/) 3-axis accelerometer/gyroscope
  - [Invensense ICM-20948](https://www.invensense.com/products/motion-tracking/9-axis/icm-20948/) 3-axis accelerometer/gyroscope/magnetometer
  - [Infineon DPS310 barometer](https://www.infineon.com/cms/en/product/sensor/barometric-pressure-sensor-for-consumer-applications/dps310/) (So smooth and NO more light sensitivity)

- Interfaces:
  - 6x UART (serial ports total), 3x with HW flow control, 1x FRSky Telemetry (D or X types), 1x Console and 1x GPS+I2C
  - 8x PWM outputs (all DShot capable)
  - 1x CAN
  - 1x I2C
  - 1x SPI
  - Spektrum DSM / DSM2 / DSM-X® Satellite compatible input and binding
  - Futaba S.BUS® & S.BUS2® compatible input
  - FRSky Telemetry port output
  - Graupner SUMD
  - Yuneec ST24
  - PPM sum input signal
  - 1x JTAG (TC2030 Connector)
  - 1x RSSI (PWM or voltage) input
  - Tricolor LED

- Weight and Dimensions (Uncased):
  - Weight: 5.3g (0.19oz)
  - Width: 20mm (0.79")
  - Length: 32mm (1.26")

- Power System:
  - 3x Ultra low noise LDO voltage regulator



## Purchase

* [mRo Control Zero](https://store.mrobotics.io/mRo-Control-Zero-F7-p/mro-ctrl-zero-f7.htm)



<!--
## Building Firmware

> **Tip** Most users will not need to build this firmware!
  It is pre-built and automatically installed by *QGroundControl* when appropriate hardware is connected.

To [build PX4](https://dev.px4.io/master/en/setup/building_px4.html) for this target:
```

```

## Debug Ports

See [3DR Pixhawk 1 > Debug Ports](../flight_controller/pixhawk.md#debug-ports)

## Pinouts

See [3DR Pixhawk 1 > Pinouts](../flight_controller/pixhawk.md#pinouts)

## Serial Port Mapping

UART | Device | Port
--- | --- | ---
UART1 | /dev/ttyS0 | IO debug
USART2 | /dev/ttyS1 | TELEM1 (flow control)
USART3 | /dev/ttyS2 | TELEM2 (flow control)
UART4 | | 
UART7 | CONSOLE
UART8 | SERIAL4

-->

## Further Information

- [Introducing the new mRo Control Zero Autopilot](https://mrobotics.io/introducing-the-new-mro-control-zero-autopilot/) (blog)
- [Quick Start Guide](https://mrobotics.io/mrocontrolzero/)

