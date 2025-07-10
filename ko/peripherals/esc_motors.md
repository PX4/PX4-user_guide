---
canonicalUrl: https://docs.px4.io/main/ko/peripherals/esc_motors
---

# ESC와 모터

대대수의 PX4 드론의 비행 제어장치는 전자변속기(ESC)로 제어하는 브러시리스 모터를 사용합니다(전자변속기는 비행제어장치의 신호를 모터에 적절한 전력으로 변환합니다).

PX4는 [PWM 입력을받는 ESC](../peripherals/pwm_escs_and_servo.md), ESC *OneShot* 표준을 사용하는 ESC, [DShot](../peripherals/dshot.md), [UAVCAN ESC](../peripherals/uavcan_escs.md), PCA9685 ESC (I2C를 통해) 및 일부 UART ESC (Yuneec에서 제공) 지원합니다.

더 자세한 정보는 다음을 참고하십시오.

* [PWM ESC와 서보](../peripherals/pwm_escs_and_servo.md)
* [DShot](../peripherals/dshot.md)
* [UAVCAN ESC](../peripherals/uavcan_escs.md)
* [ESC 보정](../advanced_config/esc_calibration.md)
* [ESC 펌웨어와 프로토콜 개요](https://oscarliang.com/esc-firmware-protocols/) (oscarliang.com)