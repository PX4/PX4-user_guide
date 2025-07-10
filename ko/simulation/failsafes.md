---
canonicalUrl: https://docs.px4.io/main/ko/simulation/failsafes
---

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

이 최소 배터리 백분율은 매개변수 [SIM_BAT_MIN_PCT](../advanced_config/parameter_reference.md#SIM_BAT_MIN_PCT)에서 설정합니다.

배터리가 최소값으로 소모되는 속도는 매개변수 [SIM_BAT_DRAIN](../advanced_config/parameter_reference.md#SIM_BAT_DRAIN)에서 설정하십시오.

:::tip
비행 중에 [SIM_BAT_MIN_PCT](../advanced_config/parameter_reference.md#SIM_BAT_MIN_PCT)를 변경하여 용량 회복을 테스트하여 부정확한 배터리 상태 추정 또는 기내 충전 기술을 시뮬레이션할 수 있습니다.
:::

## 센서/시스템 장애

[고장 주입](../debug/failure_injection.md)은 많은 센서와 시스템의 여러가지 오류를 시뮬레이션합니다. GPS가 없거나 간헐적으로 발생하는 경우, 특정 값에서 멈추거나 멈추는 RC 신호, 회피 시스템의 오류 등을 시뮬레이션 할 수 있습니다.

GPS 오류를 시뮬레이션하려면 다음을 수행합니다.
1. 매개변수 [SYS_FAILURE_EN](../advanced_config/parameter_reference.md#SYS_FAILURE_EN)을 활성화합니다.
1. SITL 인스턴스 *pxh 셸*에서 다음 명령어를 실행합니다.
   ```bash
   # Turn (all) GPS off
   failure gps off

   # Turn (all) GPS on
   failure gps ok
   ```

지원되는 센서와 오류 목록은 [시스템 오류 주입](../debug/failure_injection.md)을 참고하십시오.