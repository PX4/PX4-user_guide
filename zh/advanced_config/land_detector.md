---
canonicalUrl: https://docs.px4.io/main/zh/advanced_config/land_detector
---

# 着陆探测器配置

着陆探测器是一个动态飞行器模型，代表了从接触地面到着陆的关键飞行器状态。 本节主题说明您可能希望调整的主要参数，以改善飞行器着陆行为。

## 自动上锁

当飞行器着陆时着陆探测器会为飞行器自动加锁。

您可以设置[ COM_DISARM_LAND ](../advanced_config/parameter_reference.md#COM_DISARM_LAND)来指定着陆后系统上锁前的秒数（或通过将参数设置为 -1 关闭自动上锁）。

## 多旋翼配置

所有的关于着陆探测器的参数集在参数索引中列出，带有前缀 [LNDMC](../advanced_config/parameter_reference.md#land-detector) （可以通过[参数编辑器](../advanced_config/parameters.md)在 QGroundControl 中编辑这些参数）。

:::tip
关于参数如何影响着着陆的信息可以在下面的 [Land Detor States](#states) 中找到。
:::

为了改善特定机架上的着陆，您可能需要调整的其他关键参数包括:

* [MPC_THR_HOVER](../advanced_config/parameter_reference.md#MPC_THR_HOVER)-系统的悬停油门 (默认值为 50%)。 正确设置这一点是很重要的, 因为它使高度控制更加准确, 并确保正确的地面检测。 没有安装有效载荷的穿越机或大型相机的无人机可能需要更低的悬停油门 (例如 35%)。

:::note
错误地设置 `MPC-THR_HOVER` 可能会导致在空中检测到地面接触或可能着陆检测（特别是在 [位置模式](../flight_modes/position_mc.md) 或 [高度模式](../flight_modes/altitude_mc.md) 下降时）。 这将导致载具 "抽搐" （关闭电机，然后立即将其重新打开）。
:::

* [MPC_THR_MIN](../advanced_config/parameter_reference.md#MPC_THR_MIN)-系统的全局最小油门。 应该将其设置为可控的下降


## 固定翼配置

完整的相关参数集可在 [LNDFW](../advanced_config/parameter_reference.md#land-detector) 前缀下查阅。 这两个参数有时需要调整:

* [LNDFW_AIRSPD_MAX](../advanced_config/parameter_reference.md#LNDFW_AIRSPD_MAX)----飞机降落时允许的最大空速。 默认值 8 m 是，在空速传感器精度和足够快的触发速度之间权衡后，一个合适的设定值。 越好的空速传感器允许此参数的值越低。
* [ LNDFW_VEL_XY_MAX ](../advanced_config/parameter_reference.md#LNDFW_VEL_XY_MAX)-是着陆时系统的最大水平速度，这应当被考虑，从而选择一个合适的值。
* [ LNDFW_VEL_Z_MAX](../advanced_config/parameter_reference.md#LNDFW_VEL_XY_MAX)-是着陆时系统的最大垂直速度，这应当被考虑，从而选择一个合适的值。 可以调整此参数，以确保着陆探测器触发早于或者晚于将飞机手动投掷。


<span id="states"></span>
## 着陆探测器状态

### 多旋翼着陆检测

为了探测着陆，多旋翼首先必须经历三个不同的状态，其中每个状态都包含来自先前状态的条件以及更严格的约束。 如果由于缺少传感器而无法达到条件，则默认情况下认为该条件为真。 例如，在[ 特技模式 ](../flight_modes/acro_mc.md)中并且除了陀螺仪传感器之外没有传感器处于活动状态，则检测仅依赖于推力输出和时间。

为了进入下一个状态，每个条件必须在某个预定义的时间内为真。 如果一个条件失败，则陆地探测器立即退出当前状态。

#### 地面接触

如果满足以下条件达到 0.35 秒，则进入此状态：

- 没有垂直运动 ([LNDMC_Z_VEL_MAX](../advanced_config/parameter_reference.md#LNDMC_Z_VEL_MAX))
- 没有水平运动 ([LNDMC_XY_VEL_MAX](../advanced_config/parameter_reference.md#LNDMC_XY_VEL_MAX))
- 推力低于 [MPC_THR_MIN](../advanced_config/parameter_reference.md#MPC_THR_MIN) + ([MPPC_THR_HOVER](../advanced_config/parameter_reference.md#MPC_THR_HOVER) - [MPPC_THR_MIN](../advanced_config/parameter_reference.md#MPC_THR_MIN)) * (0.3 除非有悬停推理估计，否则 0.6）， 或速度设定点是着陆速度的 0.9， 但车辆没有垂直移动。

如果飞行器处于位置控制或速度控制并且检测到地面接触，位置控制器会将沿飞行器 x-y 轴的推力矢量设置为零。


#### 可能着陆

如果满足以下条件达到 0.25 秒，则进入此状态：

- 所有的地面接触条件都是真
- 没有滚动运动 ([LNDMC_Z_VEL_MAX](../advanced_config/parameter_reference.md#LNDMC_ROT_MAX))
- 具有低推力 `MPC_THR_MIN + (MPC_THR_HOVER - MPC_THR_MIN) * 0.1`

如果飞行器只知道推力和角速度，为了进入下一个状态，飞行器必须具有较低的推力（油门）和非旋转状态达到 8.0 秒。

如果飞行器处于位置控制或速度控制并且可能已检测到着陆，位置控制器会将推力矢量设置为零。


#### 降落完成

如果满足以下条件达到 0.3 秒，则进入此状态：
- 所有的可能着陆条件均为真
