---
canonicalUrl: https://docs.px4.io/main/zh/peripherals/esc_motors
---

# 电调 & 电机

Many PX4 drones use brushless motors that are driven by the flight controller via an Electronic Speed Controller (ESC) (the ESC converts a signal from the flight controller to an appropriate level of power delivered to the motor).

PX4 supports [ESCs that take a PWM input](../peripherals/pwm_escs_and_servo.md), ESCs that use the ESC *OneShot* standard, [DShot](../peripherals/dshot.md), [UAVCAN ESCs](../peripherals/uavcan_escs.md), PCA9685 ESC (via I2C), and some UART ESCs (from Yuneec).

有关详细信息，请参阅︰

* [PWM ESCs and Servos](../peripherals/pwm_escs_and_servo.md)
* [DShot](../peripherals/dshot.md)
* [UAVCAN 电调](../peripherals/uavcan_escs.md)
* [电调（ESC）校准](../advanced_config/esc_calibration.md)
* [电调固件和协议概述](https://oscarliang.com/esc-firmware-protocols/)（oscarliang.com）