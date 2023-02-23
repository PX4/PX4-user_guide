# 着陆探测器配置

着陆探测器是一个动态飞行器模型，代表了从接触地面到着陆的关键飞行器状态。 本节主题说明您可能希望调整的主要参数，以改善飞行器着陆行为。

## 自动上锁

当飞行器着陆时着陆探测器会为飞行器自动加锁。

您可以设置[ COM_DISARM_LAND ](../advanced_config/parameter_reference.md#COM_DISARM_LAND)来指定着陆后系统上锁前的秒数（或通过将参数设置为 -1 关闭自动上锁）。

## 多旋翼配置

所有的关于着陆探测器的参数集在参数索引中列出，带有前缀 [LNDMC](../advanced_config/parameter_reference.md#land-detector) （可以通过[参数编辑器](../advanced_config/parameters.md)在 QGroundControl 中编辑这些参数）。

:::tip
Information about how the parameters affect landing can be found below in [Land Detector States](#mc-land-detector-states).
:::

为了改善特定机架上的着陆，您可能需要调整的其他关键参数包括:

* [MPC_THR_HOVER](../advanced_config/parameter_reference.md#MPC_THR_HOVER)-系统的悬停油门 (默认值为 50%)。 正确设置这一点是很重要的, 因为它使高度控制更加准确, 并确保正确的地面检测。 没有安装有效载荷的穿越机或大型相机的无人机可能需要更低的悬停油门 (例如 35%)。

:::note
错误地设置 `MPC-THR_HOVER` 可能会导致在空中检测到地面接触或可能着陆检测（特别是在 [位置模式](../flight_modes/position_mc.md) 或 [高度模式](../flight_modes/altitude_mc.md) 下降时）。 这将导致载具 "抽搐" （关闭电机，然后立即将其重新打开）。
:::

* [MPC_THR_MIN](../advanced_config/parameter_reference.md#MPC_THR_MIN)-系统的全局最小油门。 应该将其设置为可控的下降
* [MPC_LAND_CRWL](../advanced_config/parameter_reference.md#MPC_LAND_CRWL) - the vertical speed applied in the last stage of autonomous landing if the system has a distance sensor and it is present and working. Has to be set larger than LNDMC_Z_VEL_MAX.


### MC Land Detector States

为了探测着陆，多旋翼首先必须经历三个不同的状态，其中每个状态都包含来自先前状态的条件以及更严格的约束。 如果由于缺少传感器而无法达到条件，则默认情况下认为该条件为真。 例如，在[ 特技模式 ](../flight_modes/acro_mc.md)中并且除了陀螺仪传感器之外没有传感器处于活动状态，则检测仅依赖于推力输出和时间。

In order to proceed to the next state, each condition has to be true for a third of the configured total land detector trigger time [LNDMC_TRIG_TIME](../advanced_config/parameter_reference.md#LNDMC_TRIG_TIME). If the vehicle is equipped with a distance sensor, but the distance to ground is currently not measurable (usually because it is too large), the trigger time is increased by a factor of 3.

如果一个条件失败，则陆地探测器立即退出当前状态。

#### 地面接触

Conditions for this state:

- 没有垂直运动 ([LNDMC_Z_VEL_MAX](../advanced_config/parameter_reference.md#LNDMC_Z_VEL_MAX))
- 没有水平运动 ([LNDMC_XY_VEL_MAX](../advanced_config/parameter_reference.md#LNDMC_XY_VEL_MAX))
- lower thrust than [MPC_THR_MIN](../advanced_config/parameter_reference.md#MPC_THR_MIN) + (hover throttle - [MPC_THR_MIN](../advanced_config/parameter_reference.md#MPC_THR_MIN)) * (0.3, unless a hover thrust estimate is available, then 0.6),
- additional check if vehicle is currently in a height-rate controlled flight mode: the vehicle has to have the intent to descend (vertical velocity setpoint above LNDMC_Z_VEL_MAX).
- additional check for vehicles with a distance sensor: current distance to ground is below 1m.

如果飞行器处于位置控制或速度控制并且检测到地面接触，位置控制器会将沿飞行器 x-y 轴的推力矢量设置为零。


#### 可能着陆

Conditions for this state:

- all conditions of the [ground contact](#ground-contact) state are true
- 没有滚动运动 ([LNDMC_Z_VEL_MAX](../advanced_config/parameter_reference.md#LNDMC_ROT_MAX))
- 具有低推力 `MPC_THR_MIN + (MPC_THR_HOVER - MPC_THR_MIN) * 0.1`
- no freefall detected

如果飞行器只知道推力和角速度，为了进入下一个状态，飞行器必须具有较低的推力（油门）和非旋转状态达到 8.0 秒。

如果飞行器处于位置控制或速度控制并且可能已检测到着陆，位置控制器会将推力矢量设置为零。


#### 降落完成

Conditions for this state:
- all conditions of the [maybe landed](#maybe-landed) state are true


## Fixed-wing Configuration

Tuning parameters for fixed-wing land detection:

* [LNDFW_AIRSPD_MAX](../advanced_config/parameter_reference.md#LNDFW_AIRSPD_MAX)----飞机降落时允许的最大空速。 Has to be a tradeoff between airspeed sensing accuracy and triggering fast enough. 越好的空速传感器允许此参数的值越低。
* [ LNDFW_VEL_XY_MAX ](../advanced_config/parameter_reference.md#LNDFW_VEL_XY_MAX)-是着陆时系统的最大水平速度，这应当被考虑，从而选择一个合适的值。
* [ LNDFW_VEL_Z_MAX](../advanced_config/parameter_reference.md#LNDFW_VEL_XY_MAX)-是着陆时系统的最大垂直速度，这应当被考虑，从而选择一个合适的值。
* [LNDFW_XYACC_MAX](../advanced_config/parameter_reference.md#LNDFW_XYACC_MAX) - the maximal horizontal acceleration for the system to still be considered landed.
* [LNDFW_TRIG_TIME](../advanced_config/parameter_reference.md#LNDFW_TRIG_TIME) - Trigger time during which the conditions above have to be fulfilled to declare a landing.

:::note
When FW launch detection is enabled ([FW_LAUN_DETCN_ON](../advanced_config/parameter_reference.md#FW_LAUN_DETCN_ON)), the vehicle will stay in "landed" state until takeoff is detected (which is purely based on acceleration and not velocity).
:::


## VTOL Land Detector

The VTOL land detector is 1:1 the same as the MC land detector if the system is in hover mode. In FW mode, land detection is disabled.
