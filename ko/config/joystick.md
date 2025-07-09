---
canonicalUrl: https://docs.px4.io/main/ko/config/joystick
---

# 조이스틱 설정

*QGroundControl*에 연결된 [조이스틱](https://en.wikipedia.org/wiki/Joystick) 또는 게임 패드를 사용하여 [RC 송신기](../config/radio.md)를 *대체*하여 기체를 수동으로 제어할 수 있습니다.

This approach may be used by manual control units that have an integrated ground control station (like the *UAVComponents* [MicroNav](https://uxvtechnologies.com/ground-control-stations/micronav/) shown below). 조이스틱은 일반적으로 비행 시뮬레이션용으로 많이 사용합니다.

![Joystick MicroNav](../../assets/peripherals/joystick/micronav.jpg)

:::tip
[Radio Setup](../config/radio.md) is not required if using only a joystick (because a joystick is not an RC controller)!
:::

:::note
*QGroundControl*은 크로스 플랫폼 [SDL2](http://www.libsdl.org/index.php) 라이브러리를 사용하여 조이스틱 움직임을 MAVLink [MANUAL_CONTROL](https://mavlink.io/en/messages/common.html#MANUAL_CONTROL) 메시지로 변환하여 텔레메트리를 통하여 PX4로 전송합니다. 결과적으로 조이스틱 기반 제어 시스템은 차량이 조이스틱 움직임에 반응하기 위해 안정적인 고대역폭 원격 채널이 필요합니다.
:::

## PX4 조이스틱 지원 활성화

Information about how to set up a joystick is covered in: [QGroundControl > Joystick Setup](https://docs.qgroundcontrol.com/master/en/SetupView/Joystick.html).

요약:
* *QGroundControl*을 시작합니다.
* Set the parameter [COM_RC_IN_MODE=1](../advanced_config/parameter_reference.md#COM_RC_IN_MODE) - `Joystick`
  - See [Parameters](https://docs.qgroundcontrol.com/master/en/SetupView/Parameters.html) for information about setting parameters
  - Setting the parameter to `2` or `3` also enables Joystick under some circumstances.
* 조이스틱을 연결합니다.
* 연결된 조이스틱(**기체 설정 > 조이스틱**)을 설정하세요.
