---
canonicalUrl: https://docs.px4.io/main/zh/config/safety
---

# 安全配置（故障保护） 

PX4有许多安全功能，可以在发生故障时保护并恢复您的机体：

* *故障保护*允许您指定可以安全飞行的区域和条件，以及在触发故障保护时将执行的[操作](#failsafe_actions)（例如着陆、定点悬停或返回指定点）。 最重要的故障保护设置在 *QGroundControl* 的[安全设置](#qgc_safety_setup)页面中配置。 其他设置必须通过[参数](#failsafe_other)页面配置。
* 遥控器上的安全开关可用于在出现问题时立即制动电机或使机体返航。

<span id="failsafe_actions"></span>

## 故障保护动作

每种故障保护措施都定义有自己的一组动作。 部分较为常见的故障保护措施如下：

| 动作                                                                        | 描述                                                                                                                                                                                                                                                 |
| ------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <span id="action_none"></span>无/禁用                                             | 无动作 (故障保护将被忽略)。                                                                                                                                                                                                                                    |
| <span id="action_warning"></span>警告                                               | 警告信息将被发送至 *QGroundControl*。                                                                                                                                                                                                                        |
| <span id="action_hold"></span>[保持模式](../flight_modes/hold.md)                  | 机体将进入*保持模式*。 对于多旋翼飞行器，这意味着飞行器将悬停，而对于固定翼飞行器，飞行器将盘旋。                                                                                                                                                                                                 |
| <span id="action_return"></span>[返航模式](../flight_modes/return.md)                | 机体将进入*返航模式*。 返航行为可以在[返回原点设置](#return_settings)（如下文所示）中设置。                                                                                                                                                                                          |
| <span id="action_land"></span>[降落模式](../flight_modes/land.md)                  | 机体将进入降落模式，并立即执行着陆动作。                                                                                                                                                                                                                               |
| <span id="action_flight_termination"></span>[飞行终止](../advanced_config/flight_termination.md) | 关闭所有控制器并将所有 PWM 输出设置为其故障保护值（例如 [PWM_MAIN_FAILn](../advanced_config/parameter_reference.md#PWM_MAIN_FAIL1)，[PWM_AUX_FAILn](../advanced_config/parameter_reference.md#PWM_AUX_FAIL1) 等输出）。 故障保护输出可用于启动降落伞、起落架或执行其他操作。 对于固定翼飞行器，这可能允许您将机体滑翔至安全位置。 |
| <span id="action_lockdown"></span>锁定                                               | 制动发动机（使其上锁）。 这和使用[急停开关](#kill_switch)是一样的。                                                                                                                                                                                                         |

:::note
It is possible to recover from a failsafe action (if the cause is fixed) by switching modes. For example, in the case where RC Loss failsafe causes the vehicle to enter *Return mode*, if RC is recovered you can change to *Position mode* and continue flying.
:::

:::note
If a failsafe occurs while the vehicle is responding to another failsafe (e.g. Low battery while in Return mode due to RC Loss), the specified failsafe action for the second trigger is ignored. Instead the action is determined by separate system level and vehicle specific code. This might result in the vehicle being changed to a manual mode so the user can directly manage recovery.
:::

<span id="qgc_safety_setup"></span>

## QGroundControl 安全设置

The *QGroundControl* Safety Setup page is accessed by clicking the *QGroundControl* **Gear** icon (Vehicle Setup - top toolbar) and then **Safety** in the sidebar). This includes the most important failsafe settings (battery, RC loss etc.) and the settings for the return actions *Return* and *Land*.

![Safety Setup (QGC)](../../assets/qgc/setup/safety/safety_setup.png)

### 低电量故障保护

The low battery failsafe is triggered when the battery capacity drops below one (or more warning) level values.

![Safety - Battery (QGC)](../../assets/qgc/setup/safety/safety_battery.png)

The most common configuration is to set the values and action as above (with `Warn > Failsafe > Emergency`). With this configuration the failsafe will trigger warning, then return, and finally landing if capacity drops below the respective levels.

It is also possible to set the *Failsafe Action* to warn, return, or land when the [Battery Failsafe Level](#BAT_CRIT_THR) failsafe level is reached.

The settings and underlying parameters are shown below.

| 设置                                | 参数                                                                             | 描述                                               |
| --------------------------------- | ------------------------------------------------------------------------------ | ------------------------------------------------ |
| 故障保护动作                            | [COM_LOW_BAT_ACT](../advanced_config/parameter_reference.md#COM_LOW_BAT_ACT) | 当电池电量过低时，根据下面的每个水平值执行警告、返航、降落三者之一，或分别设置警告、返航或降落。 |
| 电池警告水平                            | [BAT_LOW_THR](../advanced_config/parameter_reference.md#BAT_LOW_THR)         | 需做出警告（或其他动作）的电量百分比。                              |
| <span id="BAT_CRIT_THR"></span>电池故障保护水平 | [BAT_CRIT_THR](../advanced_config/parameter_reference.md#BAT_CRIT_THR)       | 电量低于该百分比则返航（或者执行其他事前选择动作）。                       |
| 电量紧急水平                            | [BAT_EMERGEN_THR](../advanced_config/parameter_reference.md#BAT_EMERGEN_THR) | 电量低于该百分比则（立即）触发降落动作。                             |

<span id="rc_loss_failsafe"></span>

### 遥控信号丢失故障保护

The RC Loss failsafe is triggered if the RC transmitter link is lost *in manual modes* (RC loss does not trigger the failsafe in automatic modes - e.g. during missions).

![Safety - RC Loss (QGC)](../../assets/qgc/setup/safety/safety_rc_loss.png)

:::note PX4 and the receiver may also need to be configured in order to *detect RC loss*: [Radio Setup > RC Loss Detection](../config/radio.md#rc_loss_detection).
:::

The settings and underlying parameters are shown below.

| 设置       | 参数                                                                         | 描述                  |
| -------- | -------------------------------------------------------------------------- | ------------------- |
| 遥控信号丢失超时 | [COM_RC_LOSS_T](../advanced_config/parameter_reference.md#COM_RC_LOSS_T) | 遥控信号失联后到故障保险触发前的时间。 |
| 故障保护动作   | [NAV_RCL_ACT](../advanced_config/parameter_reference.md#NAV_RCL_ACT)     | 禁用，悬停，返航，降落，终止，锁定。  |

### 数据链路丢失故障保护

The Data Link Loss failsafe is triggered if a telemetry link (connection to ground station) is lost when flying a [mission](../flying/missions.md).

![Safety - Data Link Loss (QGC)](../../assets/qgc/setup/safety/safety_data_link_loss.png)

The settings and underlying parameters are shown below.

| 设置       | 参数                                                                         | 描述                   |
| -------- | -------------------------------------------------------------------------- | -------------------- |
| 数据链路丢失超时 | [COM_DL_LOSS_T](../advanced_config/parameter_reference.md#COM_DL_LOSS_T) | 数据连接断开后到故障保护触发之前的时间。 |
| 故障保护动作   | [NAV_DLL_ACT](../advanced_config/parameter_reference.md#NAV_DLL_ACT)     | 禁用，悬停，返航，降落，终止，锁定。   |

### 地理围栏故障保护

The *Geofence Failsafe* is a "virtual" cylinder centered around the home position. If the vehicle moves outside the radius or above the altitude the specified *Failsafe Action* will trigger.

![Safety - Geofence (QGC)](../../assets/qgc/setup/safety/safety_geofence.png)

:::tip PX4 separately supports more complicated GeoFence geometries with multiple arbitrary polygonal and circular inclusion and exclusion areas: [Flying > GeoFence](../flying/geofence.md).
:::

The settings and underlying [geofence parameters](../advanced_config/parameter_reference.md#geofence) are shown below.

| 设置         | 参数                                                                             | 描述                                                      |
| ---------- | ------------------------------------------------------------------------------ | ------------------------------------------------------- |
| 冲出围栏时的响应动作 | [GF_ACTION](../advanced_config/parameter_reference.md#GF_ACTION)               | None, Warning, Hold mode, Return mode, Terminate, Land. |
| 最大半径       | [GF_MAX_HOR_DIST](../advanced_config/parameter_reference.md#GF_MAX_HOR_DIST) | 地理围栏圆柱体的水平半径。 如果为 0，则禁用地理围栏。                            |
| 最大高度       | [GF_MAX_VER_DIST](../advanced_config/parameter_reference.md#GF_MAX_VER_DIST) | 地理围栏圆柱体的高度。 如果为 0，则禁用地理围栏。                              |

:::note
Setting `GF_ACTION` to terminate will kill the vehicle on violation of the fence. Due to the inherent danger of this, this function is disabled using [CBRK_FLIGHTTERM](#CBRK_FLIGHTTERM), which needs to be reset to 0 to really shut down the system.
:::

The following settings also apply, but are not displayed in the QGC UI.

| 设置                                | 参数                                                                           | 描述                               |
| --------------------------------- | ---------------------------------------------------------------------------- | -------------------------------- |
| 地理围栏定高模式                          | [GF_ALTMODE](../advanced_config/parameter_reference.md#GF_ALTMODE)           | 使用的高度参考值：0 = WGS84，1 = AMSL。     |
| 地理围栏计数限制                          | [GF_COUNT](../advanced_config/parameter_reference.md#GF_COUNT)               | 设定需要检测到多少次在围栏之外的位置才能触发违反地理围栏的事件。 |
| 地理围栏来源                            | [GF_SOURCE](../advanced_config/parameter_reference.md#GF_SOURCE)             | 设置定位是来自全局位置估计还是直接来自 GPS 设备。      |
| <span id="CBRK_FLIGHTTERM"></span>飞行终止断路器 | [CBRK_FLIGHTTERM](../advanced_config/parameter_reference.md#CBRK_FLIGHTTERM) | 启用/禁用飞行终止操作（默认禁用）。               |

<span id="return_settings"></span>

### 返航设置

*Return* is a common [failsafe action](#failsafe_actions) that engages [Return mode](../flight_modes/return.md) to return the vehicle to the home position. This section shows how to set the land/loiter behaviour after returning.

![Safety - Return Home Settings (QGC)](../../assets/qgc/setup/safety/safety_return_home.png)

The settings and underlying parameters are shown below:

| 设置   | 参数                                                                             | 描述                               |
| ---- | ------------------------------------------------------------------------------ | -------------------------------- |
| 爬升高度 | [RTL_RETURN_ALT](../advanced_config/parameter_reference.md#RTL_RETURN_ALT)   | 返航飞行时，机体上升到该最低高度（如果低于）。          |
| 返航行为 |                                                                                | *返航动作*的选择：降落，悬停且不降落，或一定时间后悬停并降落。 |
| 悬停高度 | [RTL_DESCEND_ALT](../advanced_config/parameter_reference.md#RTL_DESCEND_ALT) | 如果选择了返航并悬停，您还可以指定机体保持的高度。        |
| 悬停时间 | [RTL_LAND_DELAY](../advanced_config/parameter_reference.md#RTL_LAND_DELAY)   | 如果选择返航并悬停随后降落，您还可以指定机体将保持悬停多长时间。 |

:::note
The return behavour is defined by [RTL_LAND_DELAY](../advanced_config/parameter_reference.md#RTL_LAND_DELAY). If negative the vehicle will land immediately. Additional information can be found in [Return mode](../flight_modes/return.md).
:::

### 降落模式设置

*Land at the current position* is a common [failsafe action](#failsafe_actions) that engages [Land Mode](../flight_modes/land.md). This section shows how to control when and if the vehicle automatically disarms after landing. For Multicopters (only) you can additionally set the descent rate.

![Safety - Land Mode Settings (QGC)](../../assets/qgc/setup/safety/safety_land_mode.png)

The settings and underlying parameters are shown below:

| 设置    | 参数                                                                             | 描述                                      |
| ----- | ------------------------------------------------------------------------------ | --------------------------------------- |
| 几秒后锁定 | [COM_DISARM_LAND](../advanced_config/parameter_reference.md#COM_DISARM_LAND) | 选中复选框以指定机体在降落后上锁。 该值必须是非零的，但可以是小于一秒的小数。 |
| 降落速率  | [MPC_LAND_SPEED](../advanced_config/parameter_reference.md#MPC_LAND_SPEED)   | 下降速率（仅限多旋翼）。                            |

<span id="failsafe_other"></span>

## 其他故障保护设置

This section contains information about failsafe settings that cannot be configured through the *QGroundControl* [Safety Setup](#qgc_safety_setup) page.

### 位置（GPS）丢失故障保护

The *Position Loss Failsafe* is triggered if the quality of the PX4 position estimate falls below acceptable levels (this might be caused by GPS loss) while in a mode that requires an acceptable position estimate.

The failure action is controlled by [COM_POSCTL_NAVL](../advanced_config/parameter_reference.md#COM_POSCTL_NAVL), based on whether RC control is assumed to be available (and altitude information):

* `0`：遥控控制可用。 如果高度估计值可用，则切换到*定高模式*，否则为*自稳模式*。
* `1`：遥控控制*不*可用。 如果高度估计值可用，则切换到*降落模式*，否则进入飞行终止。

Fixed Wing vehicles additionally have a parameter ([NAV_GPSF_LT](../advanced_config/parameter_reference.md#NAV_GPSF_LT)) for defining how long they will loiter (circle) after losing position before attempting to land.

The relevant parameters for all vehicles shown below (also see [GPS Failure navigation parameters](../advanced_config/parameter_reference.md#gps-failure-navigation)):

| 参数                                                                               | 描述                                        |
| -------------------------------------------------------------------------------- | ----------------------------------------- |
| [COM_POS_FS_DELAY](../advanced_config/parameter_reference.md#COM_POS_FS_DELAY) | 失去位置后到触发故障保护前的延迟。                         |
| [COM_POSCTL_NAVL](../advanced_config/parameter_reference.md#COM_POSCTL_NAVL)   | 执行任务期间的位置控制导航丢失响应。 值：0——假设使用遥控，1——假设没有遥控。 |
| [CBRK_VELPOSERR](../advanced_config/parameter_reference.md#CBRK_VELPOSERR)       | 用于位置错误检查的断路器（在所有模式下禁用错误检查）。               |

Parameters that only affect Fixed Wing vehicles:

| 参数                                                                     | 描述                                 |
| ---------------------------------------------------------------------- | ---------------------------------- |
| [NAV_GPSF_LT](../advanced_config/parameter_reference.md#NAV_GPSF_LT) | 悬停时间（以在飞行终止前等待 GPS 恢复）。 设置为 0 以禁用。 |
| [NAV_GPSF_P](../advanced_config/parameter_reference.md#NAV_GPSF_P)   | 以一定的俯仰角盘旋。                         |
| [NAV_GPSF_R](../advanced_config/parameter_reference.md#NAV_GPSF_R)   | 以一定的横滚/侧倾角盘旋。                      |
| [NAV_GPSF_TR](../advanced_config/parameter_reference.md#NAV_GPSF_TR) | 盘旋时的油门量。                           |

### Offboard 中断故障保护

The *Offboard Loss Failsafe* is triggered if the offboard link is lost while under Offboard control. Different failsafe behaviour can be specified based on whether or not there is also an RC connection available.

The relevant parameters are shown below:

| 参数                                                                           | 描述                                            |
| ---------------------------------------------------------------------------- | --------------------------------------------- |
| [COM_OF_LOSS_T](../advanced_config/parameter_reference.md#COM_OF_LOSS_T)   | Offboard 连接中断后到触发故障保护前的延迟。                    |
| [COM_OBL_ACT](../advanced_config/parameter_reference.md#COM_OBL_ACT)       | 遥控不可用时的故障保护动作：降落模式、保持模式、返航模式。                 |
| [COM_OBL_RC_ACT](../advanced_config/parameter_reference.md#COM_OBL_RC_ACT) | 如果遥控可用，则故障保护动作：定点模式、定高模式、手动模式、返航模式、降落模式、保持模式。 |

### 任务故障保护

The Mission Failsafe checks prevent a previous mission being started at a new takeoff location or if it is too big (distance between waypoints is too great). The failsafe action is that the mission will not be run.

The relevant parameters are shown below:

| 参数                                                                       | 描述                                          |
| ------------------------------------------------------------------------ | ------------------------------------------- |
| [MIS_DIST_1WP](../advanced_config/parameter_reference.md#MIS_DIST_1WP) | 如果当前航点距离起飞点的距离大于该值，则任务不会启动。 如果值为 0 或小于，则禁用。 |
| [MIS_DIST_WPS](../advanced_config/parameter_reference.md#MIS_DIST_WPS) | 如果随后两个航点之间的任何距离大于这个数值，则不会开始执行任务。            |

### 交通规避故障保护

The Traffic Avoidance Failsafe allows PX4 to respond to transponder data (e.g. from [ADSB transponders](../advanced_features/traffic_avoidance_adsb.md)) during missions.

The relevant parameters are shown below:

| 参数                                                                             | 描述                        |
| ------------------------------------------------------------------------------ | ------------------------- |
| [NAV_TRAFF_AVOID](../advanced_config/parameter_reference.md#NAV_TRAFF_AVOID) | 设置故障保护动作：禁用、警告、返航模式、降落模式。 |

### 自适应 QuadChute 故障安全

Failsafe for when a pusher motor fails (or airspeed sensor) and a VTOL vehicle can no longer achieve a desired altitude setpoint in fixed-wing mode. If triggered, the vehicle will transition to multicopter mode and enter failsafe [Return mode](../flight_modes/return.md).

:::note
You can pause *Return mode* and transition back to fixed wing if desired. Note that if the condition that caused the failsafe still exists, it may trigger again!
:::

The relevant parameters are shown below:

| 参数                                                                         | 描述                                                              |
| -------------------------------------------------------------------------- | --------------------------------------------------------------- |
| [VT_FW_ALT_ERR](../advanced_config/parameter_reference.md#VT_FW_ALT_ERR) | 固定翼飞行的最大负高度误差。 如果下降的高度超过该值，使实际高度低于设定高度，则机体将切换回多旋翼模式并执行故障保护返航操作。 |

<span id="failure_detector"></span>

## 故障检测器

The failure detector allows a vehicle to take protective action(s) if it unexpectedly flips, or if it is notified by an external failure detection system.

During **flight**, the failure detector can be used to trigger [flight termination](../advanced_config/flight_termination.md) if failure conditions are met, which may then launch a [parachute](../peripherals/parachute.md) or perform some other action.

:::note
Failure detection during flight is deactivated by default (enable by setting the parameter: [CBRK_FLIGHTTERM=0](#CBRK_FLIGHTTERM)).
:::

During **takeoff** the failure detector [attitude trigger](#attitude_trigger) invokes the [lockdown action](#action_lockdown) if the vehicle flips (lockdown kills the motors but, unlike flight termination, will not launch a parachute or perform other failure actions). Note that this check is *always enabled on takeoff*, irrespective of the `CBRK_FLIGHTTERM` parameter.

The failure detector is active in all vehicle types and modes, except for those where the vehicle is *expected* to do flips (i.e. [Acro mode (MC)](../flight_modes/altitude_mc.md), [Acro mode (FW)](../flight_modes/altitude_fw.md), and [Manual (FW)](../flight_modes/manual_fw.md)).

<span id="attitude_trigger"></span>

### 姿态触发器

The failure detector can be configured to trigger if the vehicle attitude exceeds predefined pitch and roll values for longer than a specified time.

The relevant parameters are shown below:

| 参数                                                                                                     | 描述                                                    |
| ------------------------------------------------------------------------------------------------------ | ----------------------------------------------------- |
| <span id="CBRK_FLIGHTTERM"></span>[CBRK_FLIGHTTERM](../advanced_config/parameter_reference.md#CBRK_FLIGHTTERM) | 飞行终止断路器。 从 121212（默认）取消设置，以启用由于故障检测器或 FMU 丢失而导致的飞行终止。 |
| <span id="FD_FAIL_P"></span>[FD_FAIL_P](../advanced_config/parameter_reference.md#FD_FAIL_P)           | 最大允许俯仰角（角度制）。                                         |
| <span id="FD_FAIL_R"></span>[FD_FAIL_R](../advanced_config/parameter_reference.md#FD_FAIL_R)           | 最大允许横滚角（角度制）。                                         |
| <span id="FD_FAIL_P_TTRI"></span>[FD_FAIL_P_TTRI](../advanced_config/parameter_reference.md#FD_FAIL_P_TTRI) | 超过故障检测的 [FD_FAIL_P](#FD_FAIL_P) 时间（默认为 0.3s）。       |
| <span id="FD_FAIL_R_TTRI"></span>[FD_FAIL_R_TTRI](../advanced_config/parameter_reference.md#FD_FAIL_R_TTRI) | 超过故障检测的 [FD_FAIL_R](#FD_FAIL_R) 时间（默认为 0.3s）。       |

<span id="external_ats"></span>

### 外部自动触发系统（ATS）

The [failure detector](#failure_detector), if [enabled](#CBRK_FLIGHTTERM), can also be triggered by an external ATS system. The external trigger system must be connected to flight controller port AUX5 (or MAIN5 on boards that do not have AUX ports), and is configured using the parameters below.

:::note
External ATS is required by [ASTM F3322-18](https://webstore.ansi.org/Standards/ASTM/ASTMF332218). One example of an ATS device is the [FruityChutes Sentinel Automatic Trigger System](https://fruitychutes.com/uav_rpv_drone_recovery_parachutes/sentinel-automatic-trigger-system.htm).
:::

| 参数                                                                                                       | 描述                                                               |
| -------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| <span id="FD_EXT_ATS_EN"></span>[FD_EXT_ATS_EN](../advanced_config/parameter_reference.md#FD_EXT_ATS_EN)     | 启用 AUX5 或 MAIN5（取决于飞控板）上的 PWM 输入，以便从外部自动触发系统（ATS）启用故障保护。 默认值：禁用。 |
| <span id="FD_EXT_ATS_TRIG"></span>[FD_EXT_ATS_TRIG](../advanced_config/parameter_reference.md#FD_EXT_ATS_TRIG) | 来自外部自动触发系统的用于接通故障保护的 PWM 阈值。 默认值：1900m/s。                        |

<span id="safety_switch"></span>

## 应急开关

Remote control switches can be configured (as part of *QGroundControl* [Flight Mode Setup](../config/flight_mode.md)) to allow you to take rapid corrective action in the event of a problem or emergency; for example, to stop all motors, or activate [Return mode](#return_switch).

This section lists the available emergency switches.

<span id="kill_switch"></span>

### 急停开关

A kill switch immediately stops all motor outputs (and if flying, the vehicle will start to fall)! The motors will restart if the switch is reverted within 5 seconds. After 5 seconds the vehicle will automatically disarm; you will need to arm it again in order to start the motors.

<span id="arming_switch"></span>

### 解锁/上锁开关

The arm/disarm switch is a *direct replacement* for the default stick-based arming/disarming mechanism (and serves the same purpose: making sure there is an intentional step involved before the motors start/stop). It might be used in preference to the default mechanism because:

* 这种机制偏向于切换动作而不是持续运动。
* 这种机制可以避免因为某种意外误触而引发的飞行期间解锁/上锁。
* 这种机制没有延迟（立即作出反应）。

The arm/disarm switch immediately disarms (stop) motors for those [flight modes](../getting_started/flight_modes.md) that *support disarming in flight*. This includes:

* *手动模式*
* *特技模式*
* *自稳模式*

For modes that do not support disarming in flight, the switch is ignored during flight, but may be used after landing is detected. This includes *Position mode* and autonomous modes (e.g. *Mission*, *Land* etc.).

:::note
[Auto disarm timeouts](#auto-disarming-timeouts) (e.g. via [COM_DISARM_LAND](#COM_DISARM_LAND)) are independent of the arm/disarm switch - ie even if the switch is armed the timeouts will still work.
:::

<!--
**Note** This can also be done by [manually setting](../advanced_config/parameters.md) the [RC_MAP_ARM_SW](../advanced_config/parameter_reference.md#RC_MAP_ARM_SW) parameter to the corresponding switch RC channel.
  If the switch positions are reversed, change the sign of the parameter [RC_ARMSWITCH_TH](../advanced_config/parameter_reference.md#RC_ARMSWITCH_TH) (or also change its value to alter the threshold value).
-->

<span id="return_switch"></span>

### 返航开关

A return switch can be used to immediately engage [Return mode](../flight_modes/return.md).

## 其他安全设置

<span id="auto-disarming-timeouts"></span>

### 超时自动上锁

You can set timeouts to automatically disarm a vehicle if it is too slow to takeoff, and/or after landing (disarming the vehicle removes power to the motors, so the propellers won't spin).

The [relevant parameters](../advanced_config/parameters.md) are shown below:

| 参数                                                                                                         | 描述                |
| ---------------------------------------------------------------------------------------------------------- | ----------------- |
| <span id="COM_DISARM_LAND"></span>[COM_DISARM_LAND](../advanced_config/parameter_reference.md#COM_DISARM_LAND)   | 降落后自动上锁的超时时间。     |
| <span id="COM_DISARM_PRFLT"></span>[COM_DISARM_PRFLT](../advanced_config/parameter_reference.md#COM_DISARM_PRFLT) | 如果起飞速度太慢，将启动自动上锁。 |

## 更多信息

* [QGroundControl 用户手册 > 安全设置](https://docs.qgroundcontrol.com/en/SetupView/Safety.html)