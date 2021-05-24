# 대기속도 센서 미장착 VTOL 

:::warning
대기 속도 센서를 사용하는 것이 좋습니다. 대기속도 센서없이 VTOL에 대한 지원은 실험적인 것으로 간주되며, 숙련된 조종사만 시도해야합니다.
:::

고정익은 대기속도 센서를 사용하여 비행기가 공중을 통과하는 속도를 측정합니다. 바람의 영향에 따라 지면 속도와 차이가 발생합니다. 모든 비행기는 정지하는 최저 속도가 있습니다. 온난한 기상 조건에서 실속 속도보다 훨씬 높은 설정으로 VTOL은 대기속도 센서를 사용하지 않고도 작동할 수 있습니다. 설정은 비 VTOL 고정익에도 적용할 수 있지만, 테스트되지 않았습니다.

이 가이드는 VTOL의 대기속도 센서를 우회에 필요한 매개변수 설정 방법을 설명합니다.

## 준비

대기속도 센서를 제거하기 전에 먼저 안전한 스로틀 수준을 결정해야합니다. 또한, 순방향 전환 기간을 알아야합니다. 이를 위해 대기속도 센서로 기준 비행을 수행하거나 기체를 수동으로 비행할 수 있습니다. 두 경우 모두 매우 낮은 바람에서 기준 비행을 수행하여야 합니다.

비행은 강풍 조건에서 비행하기에 충분한 속도로 수행되어야 하며 아래와 같이 설정되어야 합니다.

- 성공적인 순방향 전환
- 직선 및 수평 비행
- 적극적인 회전
- 높은 고도로 고속 상승

## 로그 검사

After the reference flight download the log and use [FlightPlot](../dev_log/flight_log_analysis.md#flightplot) (or another analysis tool) to examine the log. Plot the altitude (`GPOS.Alt`), thrust (`ATC1.Thrust`), groundspeed (Expression: `sqrt(GPS.VelN\^2 + GPS.VelE\^2)`), pitch (`ATT.Pitch`) and roll (`AT.Roll`).

Examine the throttle level (thrust) when the vehicle is level (no or little pitch and roll), during the ascend (increasing altitude) and when the vehicle is banking (more roll). The initial value to use as cruise speed should be the highest thrust applied during a roll or ascend, the thrust during level flight should be considered the minimum value if you decide to further tune down your speed.

Also take note of the time it took for a front transition to complete. This will be used to set the minimum transition time. For safety reasons you should add +- 30% to this time.

Finally take note of the groundspeed during cruise flight. This can be used to tune your throttle setting after the first flight without an airspeed sensor.

## Setting the Parameters

To bypass the flight checks you need to set the circuit breaker for the airspeed sensor ([CBRK_AIRSPD_CHK](../advanced_config/parameter_reference.md#CBRK_AIRSPD_CHK)) to 162128.

:::note
Enabling `CBRK_AIRSPD_CHK` will prevent the sensor driver from starting and prevent calibrarion (i.e. it does more than just bypassing flight checks).
:::

To tell the flight controller that it is fling without an airspeed sensor you need to set the airspeed mode to 'Airspeed disabled' ([FW_ARSP_MODE=1](../advanced_config/parameter_reference.md#FW_ARSP_MODE)).

Set the cruise throttle ([FW_THR_CRUISE](../advanced_config/parameter_reference.md#FW_THR_CRUISE)) to the percentage as determined from the log of the reference flight. Note that QGC scales this from 1..100 and the thrust value from the log is scaled from 0..1. So a thrust of 0.65 should be entered as 65. For safety reasons it is recommended to add +- 10% throttle to the determined value for testing a first flight.

Set the minimum front transition time ([VT_TRANS_MIN_TM](../advanced_config/parameter_reference.md#VT_TRANS_MIN_TM)) to the number of seconds determined from the reference flight and add +- 30% for safety.

### Optional Recommended Parameters

Because the risk of stalling is real, it is recommended to set the 'fixed wing minimum altitude' aka 'QuadChute' ([VT_FW_MIN_ALT](../advanced_config/parameter_reference.md#VT_FW_MIN_ALT)). This will cause the VTOL to transition back to multicopter mode and initiate the [Return mode](../flight_modes/return.md) below a certain altitude. You could set this to 15 or 20 meters to give the multicopter time to recover from a stall.

The position estimator tested for this mode is EKF2, you can set this by changing the [SYS_MC_EST_GROUP](../advanced_config/parameter_reference.md#SYS_MC_EST_GROUP).

## First Flight Without Airspeed Sensor

The values apply to a position controlled flight (like [Hold mode](../flight_modes/hold.md) or [Mission mode](../flight_modes/mission.md) or Mission mode). It is therefor recommended that a mission is configured at a safe altitude, approximately 10m above the QuadChute threshold. Like for the reference flight, this flight should be performed in very low wind conditions. For the first flight the following is recommended:

- 한 고도에 머물러 라.
- Set the waypoints wide enough and in such a fashion that no sharp turns are required
- Keep the mission small enough that it remains in sight should a manual override be required.
- If the airspeed is very high, consider performing a manual back transition by switching to Altitude mode.

If the mission finished successfully you should proceed to examine the log for the following:

- The groundspeed should be considerably above the groundspeed from the reference flight.
- The altitude should not have been significantly lower than the reference flight.
- The pitch angle should not have consistently been different from the reference flight.

If all these conditions have been met you can start to tune down the cruise throttle in small steps until the groundspeed matches that of the reference flight.

## 관련 매개 변수의 간략한 개요

- [FW_ARSP_MODE](../advanced_config/parameter_reference.md#FW_ARSP_MODE): Declare invalid (2)
- [CBRK_AIRSPD_CHK](../advanced_config/parameter_reference.md#CBRK_AIRSPD_CHK): 162128
- [SYS_MC_EST_GROUP](../advanced_config/parameter_reference.md#SYS_MC_EST_GROUP): EKF2 (2)
- [FW_THR_CRUISE](../advanced_config/parameter_reference.md#FW_THR_CRUISE): determined (e.g. 70%)
- [VT_TRANS_MIN_TM](../advanced_config/parameter_reference.md#VT_TRANS_MIN_TM): determined (e.g. 10 seconds)
- [VT_FW_MIN_ALT](../advanced_config/parameter_reference.md#VT_FW_MIN_ALT): 15