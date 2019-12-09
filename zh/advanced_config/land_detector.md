# 着陆探测器配置

The land detector is a dynamic vehicle model representing key vehicle states from ground contact through to landed. 这个话题介绍一些主要的参数，您通过调整这些参数来改善着陆。

## 自动加锁

当飞行器着陆时着陆检测器会自动加锁飞行器

You can set [COM_DISARM_LAND](../advanced_config/parameter_reference.md#COM_DISARM_LAND) to specify the number of seconds after landing that the system should disarm (or turn off auto-disarming by setting the parameter to -1).

## 多旋翼配置

完整的相关着陆检测器参数集在参数参考中列出，带有前缀 [LNDMC](../advanced_config/parameter_reference.md#land-detector) （可以通过参数[编辑器](../advanced_config/parameters.md)在QGroundControl中编辑这些参数）。

> **Tip**有关参数如何影响着陆的信息, 请参阅下面的 [Land 检测器状态](#states)。

为了改善特定机架上的着陆, 您可能需要调整的其他关键参数包括:

- [MPC_THR_HOVER](../advanced_config/parameter_reference.md#MPC_THR_HOVER)-系统的悬停油门 (默认值为 50%)。 正确设置这一点是很重要的, 因为它使高度控制更加准确, 并确保正确的地面检测。 没有安装有效载荷的穿越机或大型相机的无人机可能需要更低的悬停油门 (例如 35%)。
    
    > **Note**不正确地设置 `MPC_THR_HOVER` 可能会导致飞行器停留在地面或在空中时产生不正确的降落检测 (特别是飞行器在 [Position mode](../flight_modes/position_mc.md) 或 [Altitude mode](../flight_modes/altitude_mc.md) 下降时)。 这将导致载具 "抽搐" (关闭电机, 然后立即将其重新打开)。

- [MPC_THR_MIN](../advanced_config/parameter_reference.md#MPC_THR_MIN)-系统的全局最小油门。 这应被设置是飞行器能够被控制下降

## 固定翼配置

完整的相关参数集可在 [LNDFW](../advanced_config/parameter_reference.md#land-detector) 前缀下查阅。 这两个参数有时需要调整:

- [LNDFW_AIRSPD_MAX](../advanced_config/parameter_reference.md#LNDFW_AIRSPD_MAX)\----飞机降落时允许的最大空速。 默认值 8 m 时一个可靠的在空速传感器精度和足够快的触发速度之间的权衡。 越好的空速传感器允许此参数的值越低。
- [LNDFW_VEL_XY_MAX ](../advanced_config/parameter_reference.md#LNDFW_VEL_XY_MAX) - the maximum horizontal velocity for the system to be still be considered landed. 
- [LNDFW_VEL_Z_MAX](../advanced_config/parameter_reference.md#LNDFW_VEL_XY_MAX) - the maximum vertical velocity for the system to be still be considered landed. This parameter can be adjusted to ensure land detection triggers earlier or later on throwing the airframe for hand-launches.

## 地面探测器的状态 {#states}

### 多旋翼的地面检测

为了检测着陆，多旋翼飞行器首先必须经历三种不同的状态，其中每个状态包含来自先前状态的条件加上更严格的约束。 如果由于缺少传感器而无法达到条件，则默认情况下该条件为真。 例如，在[ Acro模式 ](../flight_modes/acro_mc.md)中并且除了陀螺仪传感器之外没有传感器处于活动状态，则检测仅依赖于推力输出和时间。

为了进入下一个状态，每个条件必须在某个预定义的时间内为真。 如果一个条件失败，则陆地探测器立即退出当前状态。

#### 地面接触

如果以下条件在 0.35 秒以内为真，则达到此状态：

- 没有垂直运动 ([LNDMC_Z_VEL_MAX](../advanced_config/parameter_reference.md#LNDMC_Z_VEL_MAX))
- 没有水平运动 ([LNDMC_XY_VEL_MAX](../advanced_config/parameter_reference.md#LNDMC_XY_VEL_MAX))
- lower thrust than [MPC_THR_MIN](../advanced_config/parameter_reference.md#MPC_THR_MIN) + ([MPC_THR_HOVER](../advanced_config/parameter_reference.md#MPC_THR_HOVER) - [MPC_THR_MIN](../advanced_config/parameter_reference.md#MPC_THR_MIN)) * [LNDMC_LOW_T_THR](../advanced_config/parameter_reference.md#LNDMC_LOW_T_THR), or velocity setpoint is 0.9 of land speed but vehicle has no vertical movement.

如果车辆处于位置或速度控制并且检测到地面接触， 位置控制器将沿主体x-y轴的推力矢量设置为零。

#### 可能性着陆

如果以下条件在 0.25 秒以内为真，则达到此状态：

- 地面接触的所有条件都是真
- 没有滚动运动 ([LNDMC_Z_VEL_MAX](../advanced_config/parameter_reference.md#LNDMC_ROT_MAX))
- 具有低推力 `MPC_THR_MIN + (MPC_THR_HOVER - MPC_THR_MIN) * 0.1`

If the vehicle only has knowledge of thrust and angular rate, in order to proceed to the next state the vehicle has to have low thrust and no rotation for 8.0 seconds.

如果载具处于位置或速度控制并且检测到地面接触， 位置控制器将沿主体x-y轴的推力矢量设置为零。

#### 降落完成

如果以下条件在 0.3 秒以内为真，则达到此状态：

- 可能降落的所有条件都是真