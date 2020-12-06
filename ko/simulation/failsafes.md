# 안전 장치 모의 시험

[안전장치](../config/safety.md)는 PX4를 안전하게 활용할 수 있는 안전 한계와 조건, 그리고 안전장치 가동을 개시했을 때 취할 수 있는 동작을 정의합니다(예: 착륙, 자세 유지 위치, 지정 지점으로의 복귀 등).

SITL에서는 모의 시험 활용의 용이성을 위해 기본적으로 안전 장치를 끕니다. 이 주제에서는 실제로 안전 장치를 가동해보기 전에 SITL 모의시험 환경에서 안전 위해 동작을 시험해볼 수 있는 방법을 설명합니다.

*데이터 연결 유실*(MAVLink 외부 데이터 사용 불가) 안전 장치는 기본 활성 설정한 상태입니다. 지상 통제 장치, SDK 또는 기타 MAVLink 프로그램에 연결한 상태로만 모의 시험을 진행할 수 있습니다.
:::

:::tip
The [SITL parameters](../advanced_config/parameter_reference.md#sitl) allow you to simulate other common sensor failure cases that are not covered here, including: loss of barometer, gyro and accelerometer, increased GPS noise etc.
:::

## 데이터 연결 유실

*원격 조종 연결 유실*(원격 조종 데이터 사용 불가) 안전 장치는 기본 활성 설정한 상태입니다. 활성 MAVLink 또는 원격 조종 연결만 사용할 수 있게 해둔 상태로 모의 시험을 진행할 수 있습니다.

[NAV_RCL_ACT](../advanced_config/parameter_reference.md#NAV_RCL_ACT) 매개변수 값을 원하는 안전 장치 동작 값으로 바꿔보십시오. 예를 들면 `0` 값은 안전 장치 동작을 끕니다.

동작을 재현하는 배터리는 절대로 바닥나지 않는 배터리 구현체이며, 기본적으로 50% 방전 상태로 전압을 보고합니다. 다른 시험을 가로막는 배터리 용량 부족 상태를 유발하지 않고 지상 통제 장치의 배터리 표시를 시험해볼 수 있습니다.

## 원격 조종 연결 유실

The *RC Link Loss* failsafe (unavailability of data from a remote control) is enabled by default. This makes the simulation only usable with either an active MAVLink or remote control connection.

Set the parameter [NAV_RCL_ACT](../advanced_config/parameter_reference.md#NAV_RCL_ACT) to the desired failsafe action to change the behavior. For example, set to `0` to disable it.

GPS 정보의 유실 및 복원을 모의 시험하기 위해 GPS 메시지 방출을 멈춰볼 수 있습니다. *pxh shell*의 SITL 인스턴스에서 `param set SIM_GPS_BLOCK 1` 명령과 `param set SIM_GPS_BLOCK 0` 명령을 실행하여 GPS 메시지를 차단하고 해제하는 방식으로 시험해볼 수 있습니다.

## 배터리 부족

The simulated battery is implemented to never run out of energy, and by default only depletes to 50% of its capacity and hence reported voltage. This enables testing of battery indication in GCS UIs without triggering low battery reactions that might interrupt other testing.

To change this minimal battery percentage value use the parameter [SIM_BAT_MIN_PCT](../advanced_config/parameter_reference.md#SIM_BAT_MIN_PCT).

To control how fast the battery depletes to the minimal value use the parameter [SIM_BAT_DRAIN](../advanced_config/parameter_reference.md#SIM_BAT_DRAIN).

:::tip
By changing [SIM_BAT_MIN_PCT](../advanced_config/parameter_reference.md#SIM_BAT_MIN_PCT) in flight, you can also test regaining capacity to simulate inaccurate battery state estimation or in-air charging technology.
:::

## GPS 신호 유실

To simulate losing and regaining GPS information you can just stop the publication of GPS messages. This is done by running the `param set SIM_GPS_BLOCK 1` and `param set SIM_GPS_BLOCK 0` commands on your SITL instance *pxh shell* to block and unblock messages respectively.
