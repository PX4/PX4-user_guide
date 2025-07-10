---
canonicalUrl: https://docs.px4.io/main/ja/peripherals/esc_motors
---

# ESC & モータ

多くのPX4ドローンでは，Electronic Speed Controller (ESC) によって駆動される，ブラシレスモータを使用します。(ESCはフライトコントローラからの信号を受けて，モータへ供給する動力を適切に制御します)。

PX4は [PWM入力を受け付けるESC](../peripherals/pwm_escs_and_servo.md)をはじめ, *OneShot*, [DShot](../peripherals/dshot.md), [UAVCAN](../peripherals/uavcan_escs.md), PCA9685(I2C), UART(Yuneec社) などのESCに対応しています。

それぞれの詳細は以下を参照ください：

* [PWM ESC ・ サーボ](../peripherals/pwm_escs_and_servo.md)
* [DShot](../peripherals/dshot.md)
* [UAVCAN対応ESC](../peripherals/uavcan_escs.md)
* [ESCキャリブレーション](../advanced_config/esc_calibration.md)
* [ESC ファームウェアとプロトコルの概要](https://oscarliang.com/esc-firmware-protocols/) (oscarliang.com)