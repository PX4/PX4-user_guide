# 비행 제어기(FC) 장착하기

## 방향

비행제어기에는 아래의 그림과 같이 전방을 나타내는 화살표가 있습니다. 제어기는 기체의 위쪽을 향하도록, 화살표가 전방을 향하도록 설치되어야 합니다(이는 고정익, 다중로터, 수직이착륙기, 지상 운송체에 상관없이 모든 비행체에 동일하게 적용됩니다.).

![FC Heading Mark](../../assets/qgc/setup/sensor/fc_heading_mark_1.png)

![FC Orientation](../../assets/qgc/setup/sensor/fc_orientation_1.png)

::주의 제어기가 물리적인 제약으로 인하여 추천하는 기본적인 위치에 장착할 수 없으면, autopilot software에서 실제 장착된 방향을 설정하여 합니다. [Flight Controller Orientation](../config/flight_controller_orientation.md).
:::

## 진동 방지

비행제어기의 보드에 장착된 가속 센서나 자이로 회전 센서는 진동에 매우 민감합니다. 일부의 보드는 진동 방지 창치가 내장되어 있을 수 있으나, *스티로폼 등* 을 사용하여 제어기의 진동을 방지할 수 있습니다.

![Pixhawk Mounting foam](../../assets/hardware/mounting/3dr_anti_vibration_mounting_foam.png) *Vibration damping foam*

You should use the mounting strategy recommended in your flight controller documentation.

:::tip
[Log Analysis using Flight Review > Vibration](../log/flight_review.md#vibration) explains how to test whether vibration levels are acceptable, and [Vibration Isolation](../assembly/vibration_isolation.md) suggests a number of possible solutions if there is a problem.
:::