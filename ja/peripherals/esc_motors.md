# ESC & モータ

多くのPX4ドローンでは，Electronic Speed Controller (ESC) によって駆動される，ブラシレスモータを使用します。(ESCはフライトコントローラからの信号を受けて，モータへ供給する動力を適切に制御します)。

PX4 supports [ESCs that take a PWM input](../peripherals/pwm_escs_and_servo.md), ESCs that use the ESC *OneShot* standard, [DShot](../peripherals/dshot.md), [UAVCAN ESCs](../peripherals/uavcan_escs.md), PCA9685 ESC (via I2C), and some UART ESCs (from Yuneec).

For more information see:

* [PWM ESCs and Servos](../peripherals/pwm_escs_and_servo.md)
* [DShot](../peripherals/dshot.md)
* [UAVCAN ESCs](../peripherals/uavcan_escs.md)
* [ESC Calibration](../advanced_config/esc_calibration.md)
* [ESC Firmware and Protocols Overview](https://oscarliang.com/esc-firmware-protocols/) (oscarliang.com)