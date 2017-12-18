# Pixhack V3

The [Pixhack V3] autopilot is a flexible autopilot intended primarily for manufacturers of commercial systems.  
It is a variant of the hardware based on PH2 (SOLO pixhawk2), but it is fully compatible with APM OR PX4 code.
It is based on the [Pixhawk-project](https://pixhawk.org/) **FMUv3** open hardware design and runs PX4 on the [NuttX](http://nuttx.org) OS.

<img src="http://doc.cuav.net/PixHack/assets/pixhackv31.png" width="600px" />

The controller is designed to be used with a domain-specific carrier board in order to reduce the wiring, improve reliability, and ease of assembly. For example, a carrier board for a commercial inspection vehicle might include connections for a companion computer, while a carrier board for a racer could includes ESCs form the frame of the vehicle.

## Quick Summary

| **Hardware parameters** | |
| :--- | :--- |
| Processor | STM32F427 |
| Failsafe co-processor | STM32F100 |
| **Sensor parameters** | |
| Accelerometer 3 | LS303D\MPU6000\MPU9250 |
| Gyro 3 | L3GD20\MPU6000\MPU9250 |
| Compass 2 | LS303D\MPU9250 |
| Barometer 2 | MS5611 X2 |
| **interface** | |
| Mavlink UART | 2 |
| GPS UART | 2 |
| DEBUG UART | 1 |
| RC IN | PPM/SBUS/DSM/DSM2 |
| RSSI IN | PWM OR 3.3ADC |
| I2C | 2 |
| CAN BUS | 1 |
| ADC IN | 3.3V X1 , 6.6V X1 |
| PWM OUT | 8 PWM IO + 4个IO |
| | |
| **工作环境及物理参数** | |
| PM POWER IN | 4.5 ~ 5.5 V |
| USB POWER IN | 5.0 V +- 0.25v |
| Operating temperature | -20 ~ 60°c |
| **Size** | |
| Length X width X height | 68\*44\*17 |
| weight | 63g |



# Open hardware files

https://github.com/cuav/CUAV_Hardware

# Interface definition

http://doc.cuav.net/PixHack/pixhack-v3.html

You can buy from here

http://store.cuav.net
https://leixun.aliexpress.com/store
