# 预解锁，解锁，锁定配置

机体是有可移动的部件的，其中一些在通电后会有潜在的危险性（特别是电机和螺旋桨）！

为了减少发生事故的可能性， PX4 有明确的载具部件供电状态：

- **锁定：** 电机或执行器不供电。
- **预解锁：** 电机/螺旋桨被锁定，但是没有危险的电子设备被供电（例如副翼，襟翼等）。
- **解锁：** 载具全部供电。 电机/螺旋桨可能转动（危险！）

:::note
对于预解锁的载具，地面站可能显示*锁定*状态。 虽然技术上不适合预解锁的载具，但它是“安全的”。
:::

用户可以控制进度，即使这些状态在载具上使用 [安全开关](../getting_started/px4_basic_concepts.md#safety_switch) (可选) *和* 一个 [解锁开关/按钮](#arm_disarm_switch) [解锁手法](#arm_disarm_gestures), 或 *MAVLink 命令* 在地面控制器：

- *安全开关* 是载具上的控制 ** 必须使用它才能解锁载具， 而且也可防止预解锁（视配置而定）。 通常，安全开关被集成到 GPS 单元中，但也可能是一个单独的物理组件。
  
:::warning
解锁后的载具有潜在危险。 安全开关是防止意外解锁发生的一个附加机制。
:::

- *解锁开关*是*在遥控器上*的一个开关或按钮，可以用来解锁载具和启动电机（安全开关不能阻止解锁）。

- *解锁手法*是一个*在遥控器上的*摇杆运动，可以用来替代解锁开关。
- 也可以通过地面站发送 MAVLink 命令来解锁/锁定载具。

如果在解锁后的一段时间内没有起飞，和如果着陆后没有手动锁定， PX4 会自动锁定载具。 这减少了解锁的载具在地面上的时间。

PX4 允许您通过参数配置预解锁，解锁和锁定的方式。（参数可以通过*QGroundControl*地面站上的[参数编辑器](../advanced_config/parameters.md)编辑），详见下文各节。

:::tip
解锁/锁定参数可以在[Parameter Reference > Commander](../advanced_config/parameter_reference.md#commander)中找到（搜索`COM_ARM_*` 和 `COM_DISARM_*`）。
:::

<span id="arm_disarm_gestures"></span>

## 解锁手法

默认情况下，载具可以通过移动遥控器的油门/偏航摇杆到特定的位置，并保持 1 秒来解锁和锁定。

- **解锁：** 油门最小，偏航最大
- **锁定：** 油门最小，偏航最小

RC controllers will have different gestures [based on their mode](../getting_started/rc_transmitter_receiver.md#types-of-remote-controls) (as controller mode affects the sticks used for throttle and yaw):

- **Mode 2**: 
  - *Arm:* Left stick to bottom right. 
  - *Disarm:* Left stick to the bottom left.
- **Mode 1**: 
  - *Arm:* Left-stick to right, right-stick to bottom.
  - *Disarm:* Left-stick to left, right-stick to the bottom.

The required hold time can be configured using [COM_RC_ARM_HYST](#COM_RC_ARM_HYST).

| 参数                                                                                                      | 描述                                                                                                         |
| ------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| <span id="COM_RC_ARM_HYST"></span>[COM_RC_ARM_HYST](../advanced_config/parameter_reference.md#COM_RC_ARM_HYST) | Time that RC stick must be held in arm/disarm position before arming/disarming occurs (default: 1 second). |

<span id="arm_disarm_switch"></span>

## 解锁按钮/开关

An *arming button* or "momentary switch" can be configured to trigger arm/disarm *instead* of [gesture-based arming](#arm_disarm_gestures) (setting an arming switch disables arming gestures). The button should be held down for ([nominally](#COM_RC_ARM_HYST)) one second to arm (when disarmed) or disarm (when armed).

A two-position switch can also be used for arming/disarming, where the respective arm/disarm commands are sent on switch *transitions*.

:::tip
Two-position arming switches are primarily used in/recommended for racing drones.
:::

The switch or button is assigned (and enabled) using [RC_MAP_ARM_SW](#RC_MAP_ARM_SW), and the switch "type" is configured using [COM_ARM_SWISBTN](#COM_ARM_SWISBTN).

| 参数                                                                                                      | 描述                                                                                                                                                                                                                                                                                                                                              |
| ------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <span id="RC_MAP_ARM_SW"></span>[RC_MAP_ARM_SW](../advanced_config/parameter_reference.md#RC_MAP_ARM_SW)     | RC arm switch channel (default: 0 - unassigned). If defined, the specified RC channel (button/switch) is used for arming instead of a stick gesture.   
**Note:**  
- This setting *disables the stick gesture*!  
- This setting applies to RC controllers. It does not apply to Joystick controllers that are connected via *QGroundControl*. |
| <span id="COM_ARM_SWISBTN"></span>[COM_ARM_SWISBTN](../advanced_config/parameter_reference.md#COM_ARM_SWISBTN) | Arm switch is a momentary button.   
- `0`: Arm switch is a 2-position switch where arm/disarm commands are sent on switch transitions.  
-`1`: Arm switch is a button or momentary button where the arm/disarm command ae sent after holding down button for set time ([COM_RC_ARM_HYST](#COM_RC_ARM_HYST)).                                 |


:::note
The switch can also be set as part of *QGroundControl* [Flight Mode](../config/flight_mode.md) configuration.
:::

## 自动上锁

By default vehicles will automatically disarm on landing, or if you take too long to take off after arming. The feature is configured using the following timeouts.

| 参数                                                                                                        | 描述                                                                              |
| --------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| <span id="COM_DISARM_LAND"></span>[COM_DISARM_LAND](../advanced_config/parameter_reference.md#COM_DISARM_LAND)   | 降落后自动锁定超时时间. Default: 2s (-1 to disable).                                       |
| <span id="COM_DISARM_PRFLT"></span>[COM_DISARM_PRFLT](../advanced_config/parameter_reference.md#COM_DISARM_PRFLT) | Time-out for auto disarm if too slow to takeoff. Default: 10s (<=0 to disable). |


## 解锁顺序：预解锁模式 & 安全按钮

The arming sequence depends on whether or not there is a *safety switch*, and is controlled by the parameters [COM_PREARM_MODE](#COM_PREARM_MODE) (Prearm mode) and [CBRK_IO_SAFETY](#CBRK_IO_SAFETY) (I/O safety circuit breaker).

The [COM_PREARM_MODE](#COM_PREARM_MODE) parameter defines when/if pre-arm mode is enabled ("safe"/non-throttling actuators are able to move):

- *Disabled*: Pre-arm mode disabled (there is no stage where only "safe"/non-throttling actuators are enabled).
- *Safety Switch* (Default): The pre-arm mode is enabled by the safety switch. If there is no safety switch then pre-arm mode will not be enabled.
- *Always*: Prearm mode is enabled from power up. 

If there is a safety switch then this will be a precondition for arming. If there is no safety switch the I/O safety circuit breaker must be engaged ([CBRK_IO_SAFETY](#CBRK_IO_SAFETY)), and arming will depend only on the arm command.

The sections below detail the startup sequences for the different configurations

### 默认：COM_PREARM_MODE=Safety and Safety Switch

The default configuration uses safety switch to prearm. From prearm you can then arm to engage all motors/actuators. It corresponds to: [COM_PREARM_MODE=1](#COM_PREARM_MODE) (safety switch) and [CBRK_IO_SAFETY=0](#CBRK_IO_SAFETY) (I/O safety circuit breaker disabled).

The default startup sequence is:

1. Power-up. 
   - All actuators locked into disarmed position
   - Not possible to arm.
2. Safety switch is pressed. 
   - System now prearmed: non-throttling actuators can move (e.g. ailerons).
   - System safety is off: Arming possible.
3. Arm command is issued. 
   - The system is armed.
   - All motors and actuators can move.

### COM_PREARM_MODE=Disabled and Safety Switch

When prearm mode is *Disabled*, engaging the safety switch does not unlock the "safe" actuators, though it does allow you to then arm the vehicle. This corresponds to [COM_PREARM_MODE=0](#COM_PREARM_MODE) (Disabled) and [CBRK_IO_SAFETY=0](#CBRK_IO_SAFETY) (I/O safety circuit breaker disabled).

The startup sequence is:

1. Power-up. 
   - All actuators locked into disarmed position
   - Not possible to arm.
2. Safety switch is pressed. 
   - *All actuators stay locked into disarmed position (same as disarmed).*
   - System safety is off: Arming possible.
3. Arm command is issued. 
   - The system is armed.
   - All motors and actuators can move.

### COM_PREARM_MODE=Always and Safety Switch

When prearm mode is *Always*, prearm mode is enabled from power up. To arm, you still need the safety switch. This corresponds to [COM_PREARM_MODE=2](#COM_PREARM_MODE) (Always) and [CBRK_IO_SAFETY=0](#CBRK_IO_SAFETY) (I/O safety circuit breaker disabled).

The startup sequence is:

1. Power-up. 
   - System now prearmed: non-throttling actuators can move (e.g. ailerons).
   - Not possible to arm.
2. Safety switch is pressed. 
   - System safety is off: Arming possible.
3. Arm command is issued. 
   - The system is armed.
   - All motors and actuators can move.

### COM_PREARM_MODE=Safety or Disabled and No Safety Switch

With no safety switch, when `COM_PREARM_MODE` is set to *Safety* or *Disabled* prearm mode cannot be enabled (same as disarmed). This corresponds to [COM_PREARM_MODE=0 or 1](#COM_PREARM_MODE) (Disabled/Safety Switch) and [CBRK_IO_SAFETY=22027](#CBRK_IO_SAFETY) (I/O safety circuit breaker engaged).

The startup sequence is:

1. Power-up. 
   - All actuators locked into disarmed position
   - System safety is off: Arming possible.
2. Arm command is issued. 
   - The system is armed.
   - All motors and actuators can move.

### COM_PREARM_MODE=Always and No Safety Switch

When prearm mode is *Always*, prearm mode is enabled from power up. This corresponds to [COM_PREARM_MODE=2](#COM_PREARM_MODE) (Always) and [CBRK_IO_SAFETY=22027](#CBRK_IO_SAFETY) (I/O safety circuit breaker engaged).

The startup sequence is:

1. Power-up. 
   - System now prearmed: non-throttling actuators can move (e.g. ailerons).
   - System safety is off: Arming possible.
2. Arm command is issued. 
   - The system is armed.
   - All motors and actuators can move.

### 参数

| 参数                                                                                                      | 参数描述                                                                                                                                                                                                                               |
| ------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <span id="COM_PREARM_MODE"></span>[COM_PREARM_MODE](../advanced_config/parameter_reference.md#COM_PREARM_MODE) | Condition to enter prearmed mode. `0`: Disabled, `1`: Safety switch (prearm mode enabled by safety switch; if no switch present cannot be enabled), `2`: Always (prearm mode enabled from power up). Default: `1` (safety button). |
| <span id="CBRK_IO_SAFETY"></span>[CBRK_IO_SAFETY](../advanced_config/parameter_reference.md#CBRK_IO_SAFETY)   | Circuit breaker for IO safety.                                                                                                                                                                                                     |


<!-- Discussion:
https://github.com/PX4/PX4-Autopilot/pull/12806#discussion_r318337567 
https://github.com/PX4/px4_user_guide/issues/567#issue-486653048
-->