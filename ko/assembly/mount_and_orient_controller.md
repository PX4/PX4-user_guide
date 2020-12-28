# 비행 제어기(FC) 장착하기

## 방향

비행제어기에는 아래의 그림과 같이 전방을 나타내는 화살표가 있습니다. 제어기는 기체의 위쪽을 향하도록, 화살표가 전방을 향하도록 설치되어야 합니다(이는 고정익, 다중로터, 수직이착륙기, 지상 운송체에 상관없이 모든 비행체에 동일하게 적용됩니다.).

![FC Heading Mark](../../assets/qgc/setup/sensor/fc_heading_mark_1.png)

![FC Orientation](../../assets/qgc/setup/sensor/fc_orientation_1.png)

:::note
If the controller cannot be mounted in the recommended/default orientation (e.g. due to physical constraints) you will need to configure the autopilot software with the orientation that you actually used: [Flight Controller Orientation](../config/flight_controller_orientation.md).
:::

## Vibration Isolation

Flight Control boards with in-built accelerometers or gyros are sensitive to vibrations. Some boards include in-built vibration-isolation, while others come with *mounting foam* that you can use to isolate the controller from the vehicle.

![Pixhawk Mounting foam](../../assets/hardware/mounting/3dr_anti_vibration_mounting_foam.png) *Vibration damping foam*

You should use the mounting strategy recommended in your flight controller documentation.

:::tip
[Log Analysis using Flight Review > Vibration](../log/flight_review.md#vibration) explains how to test whether vibration levels are acceptable, and [Vibration Isolation](../assembly/vibration_isolation.md) suggests a number of possible solutions if there is a problem.
:::