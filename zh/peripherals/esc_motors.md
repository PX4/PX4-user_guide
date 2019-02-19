# ESCs & Motors

Many PX4 drones use brushless motors that are driven by the flight controller via an Electronic Speed Controller (ESC) (the ESC converts a signal from the flight controller to an appropriate level of power delivered to the motor).

PX4 supports [ESCs that take a PWM input](../peripherals/pwm_escs_and_servo.md), ESCs that use the ESC *OneShot* standard, UAVCAN ESCs, PCA9685 ESC (via I2C), and some UART ESCs (from Yuneec). At time of writing PX4 does not support the *DShot* protocol.

有关详细信息，请参阅︰

* [PWM ESCs and Servos](../peripherals/pwm_escs_and_servo.md)
* [电调（ESC）校准](../advanced_config/esc_calibration.md)
* [ESC Firmware and Protocols Overview](https://oscarliang.com/esc-firmware-protocols/) (oscarliang.com)