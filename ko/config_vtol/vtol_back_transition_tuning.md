# VTL 역전환 튜닝

:::note
다음 기능 중 일부는 PX4 버전 1.7에서 사용할 수 있으며, 현재 실험 개발 브랜치에서만 사용할 수 있습니다.
:::

VTOL이 역전환 (고정익 모드에서 멀티콥터 모드로 전환)을 수행시 멀티콥터가 적절한 제어를 할 수 있으려면 속도를 낮추어야 합니다. PX4 버전 1.7부터 현재 개발자 브랜치에서 기체는 수평 속도가 멀티 콥터 순항 속도 ([MPC_XY_CRUISE](../advanced_config/parameter_reference.md#MPC_XY_CRUISE))에 도달하거나 역전환 시간([VT_B_TRANS_DUR](../advanced_config/parameter_reference.md#VT_B_TRANS_DUR))이 초과 되면 (둘 중 먼저 오는 쪽) 역전환이 완료된 것으로 간주합니다.

## 역전환 시간

역전환 시간([VT_B_TRANS_DUR](../advanced_config/parameter_reference.md#VT_B_TRANS_DUR))을 길게 설정하면 기체가 감속할 시간이 더 늘어납니다. 이 기간 동안 VTOL은 고정익 모터를 차단하고 활공하는 동안 멀티콥터모터를 천천히 올립니다. 이 시간이 길 수록 기체는 감속하는 동안 더 오래 미끄러집니다. 이 동작의 주의 사항은 기체가 이 시간 동안 위치가 아닌 고도만 제어하므로 일부 드리프트가 발생할 수 있는 것입니다.

## 예상 감속 설정

[VTOL_LAND](https://mavlink.io/en/messages/common.html#MAV_CMD_NAV_VTOL_LAND) 웨이포인트를 사용하는 비행 임무를 수행시 자동조종장치는 역 전환을 시작할 적절한 거리를 계산을 시도합니다. 이는 현재 속도(지상 속도와 비교)와 예상 감속을 확인하여 수행합니다. 차량이 착지 지점에 매우 가까운 역 전환이 일어나도록 예상 감속 ([VT_B_DEC_MSS](../advanced_config/parameter_reference.md#VT_B_DEC_MSS)) 매개변수를 조정할 수 있습니다. 이 타임 아웃이 시작되기 전에 기체가 의도한 위치에 도달할 수 있도록 충분한 역전환 시간이 있는지 확인하십시오.

## 에어브레이크 적용

기체에 에어브레이크가 장착되어 있고 선택한 기체가 이를 지원하는 경우 (코드에서) [VT_B_REV_OUT](../advanced_config/parameter_reference.md#VT_B_REV_OUT)에서 역 전환 중 에어브레이크 위치를 설정할 수 있습니다. 값은 0에서 1까지 확장되므로, 0.7 값은 70% 출력과 같습니다.

## 고정익 모터에 역 추력 적용

To get the shortest possible back-transition, PX4 supports active breaking by reversing the fixed wing motor direction. To use this feature you will require an ESC that supports motor rotation reversing.

:::note
A typical fixed wing propeller is not optimized to spin in reverse, when the throttle during reverse thrust is set too high the propeller can stall.
:::

Generally there are 2 ways a reverse-capable ESC can implement reverse thrust.

### Using throttle scaling (3D)

Normally the throttle stick is used purely for forward thrust.

3D ESCs assume 0 thrust at 50% throttle, positive (forward) thrust above 50% and negative thrust (reverse) below 50%. The airframe can be modified to implement this behaviour *only* during back transition, allowing reverse thrust to be applied during the transition.

:::warning
Support for 3D throttle scaling during back-transition requires *code support* in the airframe.
:::

The amount of negative thrust during back transition can then be configured using the [VT_B_TRANS_THR](../advanced_config/parameter_reference.md#VT_B_TRANS_THR) parameter (set to a negative value between 0 and -1).

### On a control channel

ESCs that use a separate control channel to control the motor direction (e.g. [Hobbywing Platinum series](http://a.hobbywing.com/category.php?id=44&filter_attr=6345.6346)) can use the airbrakes channel to apply reverse thrust during back-transition.

Airframes that have been configured to support this behavior (like the DeltaQuad airframe) can be configured to do so by setting both [VT_B_REV_OUT](../advanced_config/parameter_reference.md#VT_B_REV_OUT) to 1 and [VT_B_TRANS_THR](../advanced_config/parameter_reference.md#VT_B_TRANS_THR) to the desired throttle level to apply for active breaking. The values scale from 0 to 1, so a value of 0.7 equals 70% throttle.

## Typical setup

An example of a setup that employs most features listed above would be the following:

- Airframe: Any VTOL supporting reverse thrust (e.g. DeltaQuad)
- ESC: A fixed wing ESC that supports motor reversing (e.g. Hobbywing Platinum Pro 60A)
- Estimated deceleration value in m/s/s `VT_B_DEC_MSS`: 2.5
- Back-transition duration timeout in seconds `VT_B_TRANS_DUR`: 10
- Set reverse channel high during back-transition `VT_B_REV_OUT`: 1.0
- Apply 70% thrust during back-transition `VT_B_TRANS_THR`: 0.7