---
canonicalUrl: https://docs.px4.io/main/ko/assembly/mount_gps_compass
---

# GPS/나침반 장착

GPS/나침반은 전자 장치들과 가능한 멀리 떨어진 곳에 방향 표시가 기체의 전면을 향하도록 장착하는 것이 좋습니다. 아래 다이어그램은 Pixhawk 4와 나침반의 전방 마커를 나타냅니다.

![Pixhawk 4 -- 나침반/GPS 연결 ](../../assets/flight_controller/pixhawk4/pixhawk4_compass_gps.jpg)

## 나침반 방향

나침반은 _지원되는_ 방향중에서 택일하여 장착할 수 있습니다. 지원되는 방향은 [CAL_MAGn_ROT](../advanced_config/parameter_reference.md#CAL_MAG1_ROT)에서 볼 수 있으며, 비행 컨트롤러의 방향을 지정하는 데 사용되는 것과 동일한 방식입니다.

일반적인 [나침반 보정](../config/compass.md) 프로세스를 사용하는 경우 매개변수 [CAL_MAG_ROT_AUTO](../advanced_config/parameter_reference.md#CAL_MAG_ROT_AUTO)가 활성화되고 방향이 자동으로 감지되어야 합니다.

:::warning
지원되는 방향으로 나침반을 장착하여야 합니다!

지원되지 않는 방향(예: `Yaw 30`)에 나침반을 장착하면 PX4는 지원되는 가장 근사치를 감지합니다. 보정이 성공한 것처럼 보이더라도, 오류/경고가 표시될 수 있습니다.
:::
