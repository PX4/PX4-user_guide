---
canonicalUrl: https://docs.px4.io/main/de/peripherals/esc_motors
---

# ESCs & Motors

Many PX4 drones use brushless motors that are driven by the flight controller via an Electronic Speed Controller (ESC) (the ESC converts a signal from the flight controller to an appropriate level of power delivered to the motor).

PX4 supports [ESCs that take a PWM input](../peripherals/pwm_escs_and_servo.md), ESCs that use the ESC *OneShot* standard, [DShot](../peripherals/dshot.md), [UAVCAN ESCs](../peripherals/uavcan_escs.md), PCA9685 ESC (via I2C), and some UART ESCs (from Yuneec).

For more information see:

* [PWM ESCs and Servos](../peripherals/pwm_escs_and_servo.md)
* [DShot](../peripherals/dshot.md)
* [UAVCAN ESCs](../peripherals/uavcan_escs.md)
* [ESC Calibration](../advanced_config/esc_calibration.md)
* [ESC Firmware and Protocols Overview](https://oscarliang.com/esc-firmware-protocols/) (oscarliang.com)