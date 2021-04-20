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

- [MPC_THR_HOVER](../advanced_config/parameter_reference.md#MPC_THR_HOVER)-系统的悬停油门 (默认值为 50%)。 正确设置这一点是很重要的, 因为它使高度控制更加准确, 并确保正确的地面检测。 没有安装有效载荷的穿越机或大型相机的无人机可能需要更低的悬停油门 (例如 35%)。
    
:::note
错误地设置 `MPC-THR_HOVER` 可能会导致在空中检测到地面接触或可能着陆检测（特别是在 [位置模式](../flight_modes/position_mc.md) 或 [高度模式](../flight_modes/altitude_mc.md) 下降时）。 这将导致载具 "抽搐" （关闭电机，然后立即将其重新打开）。
:::

- [MPC_THR_MIN](../advanced_config/parameter_reference.md#MPC_THR_MIN)-系统的全局最小油门。 应该将其设置为可控的下降

## 固定翼配置

完整的相关参数集可在 [LNDFW](../advanced_config/parameter_reference.md#land-detector) 前缀下查阅。 这两个参数有时需要调整:

- [LNDFW_AIRSPD_MAX](../advanced_config/parameter_reference.md#LNDFW_AIRSPD_MAX)\----飞机降落时允许的最大空速。 默认值 8 m 是，在空速传感器精度和足够快的触发速度之间权衡后，一个合适的设定值。 越好的空速传感器允许此参数的值越低。
- [ LNDFW_VEL_XY_MAX ](../advanced_config/parameter_reference.md#LNDFW_VEL_XY_MAX)-是着陆时系统的最大水平速度，这应当被考虑，从而选择一个合适的值。 
- [ LNDFW_VEL_Z_MAX](../advanced_config/parameter_reference.md#LNDFW_VEL_XY_MAX)-是着陆时系统的最大垂直速度，这应当被考虑，从而选择一个合适的值。 可以调整此参数，以确保着陆探测器触发早于或者晚于将飞机手动投掷。 

<span id="states"></span>

## 着陆探测器状态

### 多旋翼着陆探测

In order to detect landing, the multicopter first has to go through three different states, where each state contains the conditions from the previous states plus tighter constraints. If a condition cannot be reached because of missing sensors, then the condition is true by default. For instance, in [Acro mode](../flight_modes/acro_mc.md) and no sensor is active except for the gyro sensor, then the detection solely relies on thrust output and time.

In order to proceed to the next state, each condition has to be true for some predefined time. If one condition fails, the land detector drops out of the current state immediately.

#### 地面接触

This state is reached if following conditions are true for 0.35 seconds:

- 没有垂直运动 ([LNDMC_Z_VEL_MAX](../advanced_config/parameter_reference.md#LNDMC_Z_VEL_MAX))
- 没有水平运动 ([LNDMC_XY_VEL_MAX](../advanced_config/parameter_reference.md#LNDMC_XY_VEL_MAX))
- lower thrust than [MPC_THR_MIN](../advanced_config/parameter_reference.md#MPC_THR_MIN) + ([MPC_THR_HOVER](../advanced_config/parameter_reference.md#MPC_THR_HOVER) - [MPC_THR_MIN](../advanced_config/parameter_reference.md#MPC_THR_MIN)) * (0.3, unless a hover thrust estimate is available, then 0.6), or velocity setpoint is 0.9 of land speed but vehicle has no vertical movement.

If the vehicle is in position- or velocity-control and ground contact was detected, the position controller will set the thrust vector along the body x-y-axis to zero.

#### 可能着陆

This state is reached if following conditions are true for 0.25 seconds:

- 所有的地面接触条件都是真
- 没有旋转（[ LNDMC_ROT_MAX ](../advanced_config/parameter_reference.md#LNDMC_ROT_MAX)），即 俯仰、滚转、偏航为零的状态。
- 具有低油门 ，即油门低于`MPC_THR_MIN + (MPC_THR_HOVER - MPC_THR_MIN) * 0.1`

If the vehicle only has knowledge of thrust and angular rate, in order to proceed to the next state the vehicle has to have low thrust and no rotation for 8.0 seconds.

If the vehicle is in position or velocity control and maybe landed was detected, the position controller will set the thrust vector to zero.

#### 降落完成

This state is reached if following conditions are true for 0.3 seconds:

- 所有的可能着陆条件均为真