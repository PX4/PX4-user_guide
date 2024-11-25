# 시험 MC_03 - 자동 / 수동 혼합

## 임무 수립 및 업로드

❏ 임무 규정

&nbsp;&nbsp;&nbsp;&nbsp;❏ Changes in Altitude throughout the mission

&nbsp;&nbsp;&nbsp;&nbsp;❏ Mission should end in the air and NOT Land/RTL

&nbsp;&nbsp;&nbsp;&nbsp;❏ Duration of 3 to 4 minutes

❏ Upload mission to vehicle using _QGroundControl_

## 비행

❏ 위치 제어 모드에서 시동 및 이륙

❏ 자동 모드 인가

❏ 경로 추적, 선회 관찰

❏ 임무 완료 후 위치 제어 모드로 복귀

&nbsp;&nbsp;&nbsp;&nbsp;❏ Horizontal position should hold current value with stick centered

&nbsp;&nbsp;&nbsp;&nbsp;❏ Vertical position should hold current value with stick centered

&nbsp;&nbsp;&nbsp;&nbsp;❏ Throttle response set to Climbs/Descend rate

&nbsp;&nbsp;&nbsp;&nbsp;❏ Pitch/Roll/Yaw response set to Pitch/Roll/Yaw rates

❏ 회귀 지점 착륙 인가

❏ Upon touching ground, copter should disarm automatically within 2 seconds (disarm time set by parameter: [COM_DISARM_LAND](../advanced_config/parameter_reference.md#COM_DISARM_LAND))

## 예상 결과

- 추력을 올릴 때 서서히 이륙한다
- 위에 언급한 어떤 비행 모드에서도 떨림이 나타나서는 안됨
- 지면에 착륙시, 콥터가 지면에서 튀면 안됨
