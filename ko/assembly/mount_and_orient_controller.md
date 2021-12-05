# 비행 컨트롤러(FC) 장착 

## 방향

비행 콘트롤러에는 아래의 그림과 같이 전방을 나타내는 화살표가 있습니다. 기체의 상향으로 콘트롤러의 화살표가 전방을 향하도록 장착합니다. 고정익, 멀티콥터, VTOL, 지상 운송체 등의 차량에 동일하게 적용됩니다.

![콘트롤러 전방 표식 ](../../assets/qgc/setup/sensor/fc_heading_mark_1.png)

![콘트롤러 방향 ](../../assets/qgc/setup/sensor/fc_orientation_1.png)

:::note
콘트롤러가 물리적인 제약으로 기본적인 위치에 장착할 수 없는 경우에는 자율비행 프로그램에서 실제 장착된 [비행 콘트롤러의 방향](../config/flight_controller_orientation.md)을 설정하여 합니다.
:::

## 진동 방지

비행 콘트롤러에 장착된 가속 센서나 자이로 회전 센서는 진동에 매우 민감합니다. 일부 보드는 진동 방지 창치가 내장되어 있으나, *스폰지*와 같은 것을 사용하여 콘트롤러의 진동을 감소시킬 수 있습니다.

![픽스호크에 장착된 스폰지](../../assets/hardware/mounting/3dr_anti_vibration_mounting_foam.png) 진동 감소 스폰지

콘트롤러 문서에서 추천 방법으로 장착하는 것이 제일 좋습니다.

:::tip
[비행 리뷰 로그 분석 &gt; 진동](../log/flight_review.md#vibration) 은 적절 진동 범위 분석 방법을 설명합니다. [진동 차단](../assembly/vibration_isolation.md)에서는 진동 문제 해결 방법을 제시합니다.
:::