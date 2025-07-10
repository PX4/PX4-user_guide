---
canonicalUrl: https://docs.px4.io/main/zh/simulation/failsafes
---

# 模拟故障保护

[ Failsafes ](../config/safety.md) 为了您可以安全地使用 PX4，定义安全限制/条件，以及触发故障安全时将执行的操作（例如，着陆，保持或返回指定点）。

在 SITL 中，默认情况下会禁用某一些故障，以便方便模拟使用。 本主题说明如何在实际世界中尝试 SITL 仿真之前测试安全关键行为。

默认情况下启用 *数据链路丢失* 故障保护（无法通过 MAVLink 获取外部数据）。 这使得模拟仅适用于连接的 GCS，SDK 或其他 MAVLink 应用程序。
:::


## 数据链路丢失

The *Data Link Loss* failsafe (unavailability of external data via MAVLink) is enabled by default. This makes the simulation only usable with a connected GCS, SDK, or other MAVLink application.

*RC 链接损失* failslafe （来自远程控制的数据不可用） 被默认启用。 这使得模拟仿真只能使用 MAVLink 或远程控制连接。

将参数 [NAV_RCL_ACT](../advanced_config/parameter_reference.md#NAV_RCL_ACT) 设置为所需的故障保护操作，以更改行为。 例如，设置为 `0` 禁用它。

## RC 链接损失

模拟仿真的电池永远不会耗尽电量，并且默认情况下仅耗尽其容量的 50％ 会发送电压报告。 这可以在 GCS UI 中测试电池指示，而不会触发可能中断其他测试的低电池反应。

Set the parameter [NAV_RCL_ACT](../advanced_config/parameter_reference.md#NAV_RCL_ACT) to the desired failsafe action to change the behavior. For example, set to `0` to disable it.

:::note
All parameters in SITL including this one get reset when you do `make clean`.
:::

## 低电量

为了模拟丢失和重新获取 GPS 全球定位系统信息，您可以停止/重新启动 GPS 驱动程序。 This enables testing of battery indication in GCS UIs without triggering low battery reactions that might interrupt other testing.

To change this minimal battery percentage value use the parameter [SIM_BAT_MIN_PCT](../advanced_config/parameter_reference.md#SIM_BAT_MIN_PCT).

To control how fast the battery depletes to the minimal value use the parameter [SIM_BAT_DRAIN](../advanced_config/parameter_reference.md#SIM_BAT_DRAIN).

:::tip
By changing [SIM_BAT_MIN_PCT](../advanced_config/parameter_reference.md#SIM_BAT_MIN_PCT) in flight, you can also test regaining capacity to simulate inaccurate battery state estimation or in-air charging technology.
:::

## GPS 损失

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