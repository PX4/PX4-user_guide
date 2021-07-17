# 안전장치 시뮬레이션

[안전장치](../config/safety.md)는 PX4를 안전하게 사용할 수 있는 한계/조건과 안전 장치가 트리거시 수행 작업(예: 착륙, 위치 유지 또는 지정 지점 복귀)을 정의합니다.

SITL에서는 시뮬레이션 편리성을 위하여, 일부 안전 장치가 기본적으로 비활성화되어 있습니다. 실환경 테스트 이전에 SITL 시뮬레이션에서 안전에 중요한 기능을 테스트하는 방법을 설명합니다.

:::note
[HITL 시뮬레이션](../simulation/hitl.md)을 사용하여 안전장치를 테스트할 수도 있습니다. HITL은 비행 컨트롤러의 일반 설정 매개변수를 사용합니다.
:::


## 데이터 링크 손실

*데이터 링크 손실* 안전 장치(MAVLink를 통한 외부 데이터 사용 불가)는 기본적으로 활성화되어 있습니다. 따라서 연결된 GCS, SDK 또는 기타 MAVLink 애플리케이션에서만 시뮬레이션 가능합니다.

[NAV_DLL_ACT](../advanced_config/parameter_reference.md#NAV_DLL_ACT) 매개변수를 사용할 안전장치로 설정하여 동작을 변경하십시오. 비활성화하려면 `0`으로 설정합니다.

:::note
이 매개변수를 포함한 SITL의 모든 매개변수는 `make clean`하면 재설정됩니다. 예를 들면 `0` 값은 안전 장치 동작을 끕니다.

## RC 링크 손실

*RC 링크 손실* 안전 장치(리모컨에서 데이터를 사용할 수 없음)는 기본적으로 활성화되어 있습니다. 다른 시험을 가로막는 배터리 용량 부족 상태를 유발하지 않고 지상 통제 장치의 배터리 표시를 시험해볼 수 있습니다.

[NAV_RCL_ACT](../advanced_config/parameter_reference.md#NAV_RCL_ACT) 매개변수를 사용할 안전장치로 설정하여 동작을 변경하십시오. 비활성화하려면 `0`으로 설정합니다.

:::note
이 매개변수를 포함한 SITL의 모든 매개변수는 `make clean`하면 재설정됩니다.
:::

## 배터리 부족

시뮬레이션된 배터리는 에너지가 고갈되지 않도록 구현되며, 기본적으로 용량의 50%까지만 소모되므로 보고된 전압이 표시됩니다. *pxh shell*의 SITL 인스턴스에서 `param set SIM_GPS_BLOCK 1` 명령과 `param set SIM_GPS_BLOCK 0` 명령을 실행하여 GPS 메시지를 차단하고 해제하는 방식으로 시험해볼 수 있습니다.

To change this minimal battery percentage value use the parameter [SIM_BAT_MIN_PCT](../advanced_config/parameter_reference.md#SIM_BAT_MIN_PCT).

To control how fast the battery depletes to the minimal value use the parameter [SIM_BAT_DRAIN](../advanced_config/parameter_reference.md#SIM_BAT_DRAIN).

:::tip
By changing [SIM_BAT_MIN_PCT](../advanced_config/parameter_reference.md#SIM_BAT_MIN_PCT) in flight, you can also test regaining capacity to simulate inaccurate battery state estimation or in-air charging technology.
:::

## GPS 신호 유실

[Failure injection](../debug/failure_injection.md) can be used to simulate different types of failures in many sensors and systems. For example, this can be used to simulate absent or intermittent GPS, RC signal that has stopped or got stuck on a particular value, failure of the avoidance system, and much more.

For example, to simulate GPS failure:
1. Enable the parameter [SYS_FAILURE_EN](../advanced_config/parameter_reference.md#SYS_FAILURE_EN).
1. Enter the following commands on the SITL instance *pxh shell*:
   ```bash
   # Turn (all) GPS off
   failure gps off

   # Turn (all) GPS on
   failure gps ok
   ```

See [System Failure Injection](../debug/failure_injection.md) for a list of supported target sensors and failure modes.