# 着陆探测器配置

The land detector is a dynamic vehicle model representing key vehicle states from ground contact through to landed. 这个话题介绍一些主要的参数，您通过调整这些参数来改善着陆。

## 自动加锁

着陆探测器在着陆时不会自动锁定电机。

您可以将 [COM_DISARM_LAND](../advanced_config/parameter_reference.md#COM_DISARM_LAND) 设置为指定着陆后系统自动加锁的秒数 (设置为0以禁用自动加锁)。

## 多旋翼配置

完整的相关着陆检测器参数集在参数参考中列出，带有前缀 [LNDMC](../advanced_config/parameter_reference.md#land-detector) （可以通过参数[编辑器](../advanced_config/parameters.md)在QGroundControl中编辑这些参数）。

> **Tip**有关参数如何影响着陆的信息, 请参阅下面的 [Land 检测器状态](#states)。

为了改善特定机架上的着陆, 您可能需要调整的其他关键参数包括:

- [MPC_THR_HOVER](../advanced_config/parameter_reference.md#MPC_THR_HOVER)-系统的悬停油门 (默认值为 50%)。 正确设置这一点是很重要的, 因为它使高度控制更加准确, 并确保正确的地面检测。 没有安装有效载荷的穿越机或大型相机的无人机可能需要更低的悬停油门 (例如 35%)。
    
    > **Note**不正确地设置 `MPC_THR_HOVER` 可能会导致飞行器停留在地面或在空中时产生不正确的降落检测 (特别是飞行器在 [Position mode](../flight_modes/position_mc.md) 或 [Altitude mode](../flight_modes/altitude_mc.md) 下降时)。 这将导致载具 "抽搐" (关闭电机, 然后立即将其重新打开)。

- [MPC_THR_MIN](../advanced_config/parameter_reference.md#MPC_THR_MIN) - the overall minimum throttle of the system. This should be set to enable a controlled descent.

## 固定翼配置

The complete set of relevant parameters is available under the [LNDFW](../advanced_config/parameter_reference.md#land-detector) prefix. These two parameters are sometimes worth tuning:

- [LNDFW_AIRSPD_MAX](../advanced_config/parameter_reference.md#LNDFW_AIRSPD_MAX) - the maximum airspeed allowed for the system still to be considered landed. The default of 8 m/s is a reliable tradeoff between airspeed sensing accuracy and triggering fast enough. Better airspeed sensors should allow lower values of this parameter.
- [LNDFW_VELI_MAX](../advanced_config/parameter_reference.md#LNDFW_VELI_MAX) - the maximum velocity for the system to be still considered landed. This parameter can be adjusted to ensure a sooner or later land detection on throwing the airframe for hand-launches.

## Land Detector States {#states}

### Multicopter Land Detection

In order to detect landing, the multicopter first has to go through three different states, where each state contains the conditions from the previous states plus tighter constraints. If a condition cannot be reached because of missing sensors, then the condition is true by default. For instance, in [Acro mode](../flight_modes/acro_mc.md) and no sensor is active except for the gyro sensor, then the detection solely relies on thrust output and time.

In order to proceed to the next state, each condition has to be true for some predefined time. If one condition fails, the land detector drops out of the current state immediately.

#### 地面接触

This state is reached if following conditions are true for 0.35 seconds:

- no vertical movement ([LNDMC_Z_VEL_MAX](../advanced_config/parameter_reference.md#LNDMC_Z_VEL_MAX))
- no horizontal movement ([LNDMC_XY_VEL_MAX](../advanced_config/parameter_reference.md#LNDMC_XY_VEL_MAX))
- low thrust `MPC_THR_MIN + (MPC_THR_HOVER - MPC_THR_MIN) * 0.3` or velocity setpoint is 0.9 of land speed but vehicle has no vertical movement.

If the vehicle is in position- or velocity-control and ground contact was detected, the position controller will set the thrust vector along the body x-y-axis to zero.

#### Maybe Landed

This state is reached if following conditions are true for 0.25 seconds:

- all conditions of ground contact are true
- is not rotating ([LNDMC_ROT_MAX](../advanced_config/parameter_reference.md#LNDMC_ROT_MAX))
- has low thrust `MPC_THR_MIN + (MPC_THR_HOVER - MPC_THR_MIN) * 0.1`

If the vehicle only has knowledge of thrust and angular rate, in order to proceed to the next state the vehicle has to have low thrust and no rotation for 8.0 seconds.

If the vehicle is in position or velocity control and maybe landed was detected, the position controller will set the thrust vector to zero.

#### Landed

This state is reached if following conditions are true for 0.3 seconds:

- all conditions of maybe landed are true