# 정압 축적

밀폐된 차량 위로 공기가 흐르면 캐노피/선체 내에서 *정압*이 변경될 수 있습니다. 선체의 구멍/누출 위치에 따라 저압 또는 과압 (날개와 유사)이 발생할 수 있습니다.

압력의 변화는 기압계 측정에 영향을 끼치므로, 고도 추정이 정확하지 않을 수 있습니다. 이것은 기체가 [고도](../flight_modes/altitude_mc.md), [위치](../flight_modes/position_mc.md) 또는 [미션](../flight_modes/mission.md) 모드에서 이동을 멈출 때 고도를 잃는 것으로 나타날 수 있습니다(기체가 움직이지 않으면 정압이 떨어집니다. 센서는 더 높은 고도를 보고하고 기체는 하강하여 보상합니다).

한 가지 해결책은 거품으로 채워진 환기 구멍을 사용하여 축적을 최소화한 다음 (가능한 한 많이) 동적 보정을 시도하여 나머지 효과를 제거하는 것입니다.

:::tip
문제를 "수정"하기 전에 먼저 Z 설정점이 예상 고도를 추적하는지 확인하여야 합니다 (컨트롤러 문제가 없는 지 확인하기 위해).
:::

:::note
While it is possible to remove the barometer from the altitude estimate (i.e. only use altitude from the GPS), this is not recommended. GPS is inaccurate in many environments, and particularly in urban environments where you have signal reflections off buildings.
:::

## Airflow Analysis

You can modify the hull by drilling holes or filling them with foam.

One way to analyse the effects of these changes is to mount the drone on a car and drive around (on a relatively level surface) with the hull exposed to air/wind. By looking at the ground station you can review the effects of movement-induced static pressure changes on the measured altitude (using the road as "ground truth).

This process allows rapid iteration without draining batteries: modify drone, drive/review, repeat!

:::tip
Aim for a barometer altitude drop of less than 2 metres at maximum horizontal speed before attempting software-based calibration below.
:::

## Dynamic Calibration

After modifying the hardware, you can then use the [EKF2*PCOEF**](../advanced_config/parameter_reference.md#EKF2_PCOEF_XN) parameters to tune for expected barometer variation based on relative air velocity. For more information see [ECL/EKF Overview & Tuning > Correction for Static Pressure Position Error](../advanced_config/tuning_the_ecl_ekf.md#correction-for-static-pressure-position-error).

:::note
The approach works well if the relationship between the error due to static pressure and the velocity varies linearly. If the vehicle has a more complex aerodynamic model it will be less effective.
:::