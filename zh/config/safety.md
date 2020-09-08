# 安全配置（故障保护） 

PX4有许多安全功能，可以在发生故障时保护并恢复您的机体：

* *故障保护*允许您指定可以安全飞行的区域和条件，以及在触发故障保护时将执行的[操作](#failsafe_actions)（例如着陆、定点悬停或返回指定点）。 最重要的故障保护设置在 *QGroundControl* 的[安全设置](#qgc_safety_setup)页面中配置。 其他设置必须通过[参数](#failsafe_other)页面配置。
* 遥控器上的安全开关可用于在出现问题时立即制动电机或使机体返航。

## 故障保护动作 {#failsafe_actions}

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

> **Note** 可以通过切换模式从故障保护动作（如果原因已修复）中恢复。 例如，在遥控信号丢失且故障保护导致机体进入*返航模式*的情况下，如果遥控信号恢复，您可以切换到*定点模式*并继续飞行。

<span></span>

> **Note** 如果在机体响应一个故障保护时发生另一个故障保护（例如，由于遥控信号丢失而处于返航模式时，电池电量也提示不足），则忽略第二个故障保护的指定触发动作。 相反，此操作由单独的系统级别和机体的特定代码决定。 这可能会导致机体被更改为手动模式，以便用户能够直接管理并收回机体。

## QGroundControl 安全设置 {#qgc_safety_setup}

通过依次单击 *QGroundControl* **Gear** 图标（位于机体设置 - 顶部工具栏），然后单击侧栏中的**安全**来访问 *QGroundControl* 安全设置页面。 其中包括最重要的故障保护设置（电池故障，遥控信号丢失等）和返航动作的设置（*返航*和*降落*）。

![安全设置（QGC）](../../assets/qgc/setup/safety/safety_setup.png)

### 低电量故障保护

当电池电量低于一个（或多个警告）水平值时，会触发低电量故障保护。

![安全 - 电池（QGC）](../../assets/qgc/setup/safety/safety_battery.png)

最常见的配置是按上述方式设置参数的值和相应故障保护动作（ `警告 > 故障安全 > Emergency`)。 通过如此配置，故障保护将触发警告，随后返航，最后在电池电量过低时降落。

也可以在[电池故障保护等级](#BAT_CRIT_THR)达到指定水平时，将*故障保护动作*设置为警告、返航或降落。

设置和基本参数如下所示。

| 设置                                | 参数                                                                             | 描述                                               |
| --------------------------------- | ------------------------------------------------------------------------------ | ------------------------------------------------ |
| 故障保护动作                            | [COM_LOW_BAT_ACT](../advanced_config/parameter_reference.md#COM_LOW_BAT_ACT) | 当电池电量过低时，根据下面的每个水平值执行警告、返航、降落三者之一，或分别设置警告、返航或降落。 |
| 电池警告水平                            | [BAT_LOW_THR](../advanced_config/parameter_reference.md#BAT_LOW_THR)         | 需做出警告（或其他动作）的电量百分比。                              |
| <span id="BAT_CRIT_THR"></span>电池故障保护水平 | [BAT_CRIT_THR](../advanced_config/parameter_reference.md#BAT_CRIT_THR)       | 电量低于该百分比则返航（或者执行其他事前选择动作）。                       |
| 电量紧急水平                            | [BAT_EMERGEN_THR](../advanced_config/parameter_reference.md#BAT_EMERGEN_THR) | 电量低于该百分比则（立即）触发降落动作。                             |

### 遥控信号丢失故障保护 {#rc_loss_failsafe}

如果遥控传输的通信链路丢失，则触发遥控信号丢失故障保护。

![安全 - 遥控丢失（QGC）](../../assets/qgc/setup/safety/safety_rc_loss.png)

> **Note** 为了*检测遥控信号丢失情况*，可能还需要配置 PX4 和接收机：[无线电设置 > 遥控信号丢失检测](../config/radio.md#rc_loss_detection)。

设置和基本参数如下所示。

| 设置       | 参数                                                                         | 描述                  |
| -------- | -------------------------------------------------------------------------- | ------------------- |
| 遥控信号丢失超时 | [COM_RC_LOSS_T](../advanced_config/parameter_reference.md#COM_RC_LOSS_T) | 遥控信号失联后到故障保险触发前的时间。 |
| 故障保护动作   | [NAV_RCL_ACT](../advanced_config/parameter_reference.md#NAV_RCL_ACT)     | 禁用，悬停，返航，降落，终止，锁定。  |

### 数据链路丢失故障保护

如果在执行任务时数传链路（与地面站的连接）丢失，则会触发数据链路丢失故障保护。

![安全 - 数据链路丢失（QGC）](../../assets/qgc/setup/safety/safety_data_link_loss.png)

设置和基本参数如下所示。

| 设置       | 参数                                                                         | 描述                   |
| -------- | -------------------------------------------------------------------------- | -------------------- |
| 数据链路丢失超时 | [COM_DL_LOSS_T](../advanced_config/parameter_reference.md#COM_DL_LOSS_T) | 数据连接断开后到故障保护触发之前的时间。 |
| 故障保护动作   | [NAV_DLL_ACT](../advanced_config/parameter_reference.md#NAV_DLL_ACT)     | 禁用，悬停，返航，降落，终止，锁定。   |

### 地理围栏故障保护

地理围栏故障保护是一个以初始位置为中心“虚拟”圆柱体。 如果机体在圆柱体的半径以外或在高于圆柱体的高度移动，将触发特定的故障保护动作。

![安全 - 地理围栏（QGC）](../../assets/qgc/setup/safety/safety_geofence.png)

> **Tip** PX4 单独支持更复杂的地理围栏几何结构，如多个任意多边形和圆形内外的区域，设置操作为：[飞行 > 地理围栏](../flying/geofence.md)。

设置和基本[地理围栏参数](../advanced_config/parameter_reference.md#geofence)如下所示。

| 设置         | 参数                                                                             | 描述                                                      |
| ---------- | ------------------------------------------------------------------------------ | ------------------------------------------------------- |
| 冲出围栏时的响应动作 | [GF_ACTION](../advanced_config/parameter_reference.md#GF_ACTION)               | None, Warning, Hold mode, Return mode, Terminate, Land. |
| 最大半径       | [GF_MAX_HOR_DIST](../advanced_config/parameter_reference.md#GF_MAX_HOR_DIST) | 地理围栏圆柱体的水平半径。 如果为 0，则禁用地理围栏。                            |
| 最大高度       | [GF_MAX_VER_DIST](../advanced_config/parameter_reference.md#GF_MAX_VER_DIST) | 地理围栏圆柱体的高度。 如果为 0，则禁用地理围栏。                              |

> **Note** 通过设置 `GF_ACTION` 来终止飞行将导致机体因违反地理围栏而急停。 由于这种情况具有一定的危险性，可以利用 [CBRK_FLIGHTTERM](#CBRK_FLIGHTTERM) 禁用此功能（需要将其重置为0才能真正关闭系统）。

如下设置也适用，但不显示在 QGC 用户界面中。

| 设置                               | 参数                                                                           | 描述                               |
| -------------------------------- | ---------------------------------------------------------------------------- | -------------------------------- |
| 地理围栏定高模式                         | [GF_ALTMODE](../advanced_config/parameter_reference.md#GF_ALTMODE)           | 使用的高度参考值：0 = WGS84，1 = AMSL。     |
| 地理围栏计数限制                         | [GF_COUNT](../advanced_config/parameter_reference.md#GF_COUNT)               | 设定需要检测到多少次在围栏之外的位置才能触发违反地理围栏的事件。 |
| 地理围栏来源                           | [GF_SOURCE](../advanced_config/parameter_reference.md#GF_SOURCE)             | 设置定位是来自全局位置估计还是直接来自 GPS 设备。      |
| <span id="CBRK_FLIGHTTERM"></span>飞行终止断路器 | [CBRK_FLIGHTTERM](../advanced_config/parameter_reference.md#CBRK_FLIGHTTERM) | 启用/禁用飞行终止操作（默认禁用）。               |

### 返航设置 {#return_settings}

*返航*是一种常见的[故障保护动作](#failsafe_actions)，这将启动[返航模式](../flight_modes/return.md)，使机体返回起飞位置。 本节说明如何设置返航后的降落/悬停行为。

![安全 - 返航设置（QGC）](../../assets/qgc/setup/safety/safety_return_home.png)

设置和基本地参数如下所示。

| 设置   | 参数                                                                             | 描述                               |
| ---- | ------------------------------------------------------------------------------ | -------------------------------- |
| 爬升高度 | [RTL_RETURN_ALT](../advanced_config/parameter_reference.md#RTL_RETURN_ALT)   | 返航飞行时，机体上升到该最低高度（如果低于）。          |
| 返航行为 |                                                                                | *返航动作*的选择：降落，悬停且不降落，或一定时间后悬停并降落。 |
| 悬停高度 | [RTL_DESCEND_ALT](../advanced_config/parameter_reference.md#RTL_DESCEND_ALT) | 如果选择了返航并悬停，您还可以指定机体保持的高度。        |
| 悬停时间 | [RTL_LAND_DELAY](../advanced_config/parameter_reference.md#RTL_LAND_DELAY)   | 如果选择返航并悬停随后降落，您还可以指定机体将保持悬停多长时间。 |

> **Note** 返航行为由 [RTL_LAND_DELAY](../advanced_config/parameter_reference.md#RTL_LAND_DELAY) 定义。 如果该参数为负值，机体将立即着陆。 更多信息可参阅[返航模式](../flight_modes/return.md)。

### 降落模式设置

*在当前位置降落*是一种常见的[故障保护动作](#failsafe_actions)，采用降落模式启动。 本节介绍何时及是否使载具在降落后自动上锁的设置方式。 对于多旋翼飞机（仅限），您可以另外设置降落速度。

![安全 - 降落模式设置（QGC）](../../assets/qgc/setup/safety/safety_land_mode.png)

设置和基本参数如下所示。

| 设置    | 参数                                                                             | 描述                                      |
| ----- | ------------------------------------------------------------------------------ | --------------------------------------- |
| 几秒后锁定 | [COM_DISARM_LAND](../advanced_config/parameter_reference.md#COM_DISARM_LAND) | 选中复选框以指定机体在降落后上锁。 该值必须是非零的，但可以是小于一秒的小数。 |
| 降落速率  | [MPC_LAND_SPEED](../advanced_config/parameter_reference.md#MPC_LAND_SPEED)   | 下降速率（仅限多旋翼）。                            |

## 其他故障保护设置 {#failsafe_other}

本节包含无法通过 QGroundControl 安全设置页面配置的故障保护设置的信息。

### 位置（GPS）丢失故障保护

如果在对位置估计有要求的模式下，PX 4位置估计的精度低于要求（这可能是由 GPS 丢失引起的），则会触发位置丢失故障保护。

故障动作由 [COM_POSCTL_NAVL](../advanced_config/parameter_reference.md#COM_POSCTL_NAVL) 控制, 基于遥控控制（和高度信息）是否可用：

* `0`：遥控控制可用。 如果高度估计值可用，则切换到*定高模式*，否则为*自稳模式*。
* `1`：遥控控制*不*可用。 如果高度估计值可用，则切换到*降落模式*，否则进入飞行终止。

此外，固定翼机体还有一个参数（[NAV_GPSF_LT](../advanced_config/parameter_reference.md#NAV_GPSF_LT)），用于定义机体在丢失位置到试图降落这段时间内将悬停（盘旋）多长时间。

以下为所有机体的相关参数(另见 [GPS 故障导航参数](../advanced_config/parameter_reference.md#gps-failure-navigation))：

| 参数                                                                               | 描述                                        |
| -------------------------------------------------------------------------------- | ----------------------------------------- |
| [COM_POS_FS_DELAY](../advanced_config/parameter_reference.md#COM_POS_FS_DELAY) | 失去位置后到触发故障保护前的延迟。                         |
| [COM_POSCTL_NAVL](../advanced_config/parameter_reference.md#COM_POSCTL_NAVL)   | 执行任务期间的位置控制导航丢失响应。 值：0——假设使用遥控，1——假设没有遥控。 |
| [CBRK_VELPOSERR](../advanced_config/parameter_reference.md#CBRK_VELPOSERR)       | 用于位置错误检查的断路器（在所有模式下禁用错误检查）。               |

仅影响固定翼机体的参数：

| 参数                                                                     | 描述                                 |
| ---------------------------------------------------------------------- | ---------------------------------- |
| [NAV_GPSF_LT](../advanced_config/parameter_reference.md#NAV_GPSF_LT) | 悬停时间（以在飞行终止前等待 GPS 恢复）。 设置为 0 以禁用。 |
| [NAV_GPSF_P](../advanced_config/parameter_reference.md#NAV_GPSF_P)   | 以一定的俯仰角盘旋。                         |
| [NAV_GPSF_R](../advanced_config/parameter_reference.md#NAV_GPSF_R)   | 以一定的横滚/侧倾角盘旋。                      |
| [NAV_GPSF_TR](../advanced_config/parameter_reference.md#NAV_GPSF_TR) | 盘旋时的油门量。                           |

### Offboard 中断故障保护

如果在 Offboard 控制模式下发生 Offboard 通信链路中断，则会触发 *Offboard 中断故障保护*。 可以根据是否还有可用的遥控连接来指定不同的故障保护行为。

相关参数如下：

| 参数                                                                           | 描述                                            |
| ---------------------------------------------------------------------------- | --------------------------------------------- |
| [COM_OF_LOSS_T](../advanced_config/parameter_reference.md#COM_OF_LOSS_T)   | Offboard 连接中断后到触发故障保护前的延迟。                    |
| [COM_OBL_ACT](../advanced_config/parameter_reference.md#COM_OBL_ACT)       | 遥控不可用时的故障保护动作：降落模式、保持模式、返航模式。                 |
| [COM_OBL_RC_ACT](../advanced_config/parameter_reference.md#COM_OBL_RC_ACT) | 如果遥控可用，则故障保护动作：定点模式、定高模式、手动模式、返航模式、降落模式、保持模式。 |

### 任务故障保护

任务故障保护检查可防止上一个任务在新的位置起飞，也可防止任务规模超标（航点之间的距离太大）。 故障保护措施指的是任务不会运行。

相关参数如下：

| 参数                                                                       | 描述                                          |
| ------------------------------------------------------------------------ | ------------------------------------------- |
| [MIS_DIST_1WP](../advanced_config/parameter_reference.md#MIS_DIST_1WP) | 如果当前航点距离起飞点的距离大于该值，则任务不会启动。 如果值为 0 或小于，则禁用。 |
| [MIS_DIST_WPS](../advanced_config/parameter_reference.md#MIS_DIST_WPS) | 如果随后两个航点之间的任何距离大于这个数值，则不会开始执行任务。            |

### 交通规避故障保护

交通规避故障保护使 PX4 在执行任务期间可以响应转发器的数据（例如来自 [ADSB 转发器](../advanced_features/traffic_avoidance_adsb.md)）。

相关参数如下：

| 参数                                                                             | 描述                        |
| ------------------------------------------------------------------------------ | ------------------------- |
| [NAV_TRAFF_AVOID](../advanced_config/parameter_reference.md#NAV_TRAFF_AVOID) | 设置故障保护动作：禁用、警告、返航模式、降落模式。 |

### 自适应 QuadChute 故障安全

在固定翼模式下，当推力电机（或空速管）故障使垂直起降机体无法再上升到设定高度时的故障保护。 If triggered, the vehicle will transition to multicopter mode and enter failsafe [Return mode](../flight_modes/return.md).

> **Note** You can pause *Return mode* and transition back to fixed wing if desired. Note that if the condition that caused the failsafe still exists, it may trigger again!

相关参数如下：

| 参数                                                                         | 描述                                                              |
| -------------------------------------------------------------------------- | --------------------------------------------------------------- |
| [VT_FW_ALT_ERR](../advanced_config/parameter_reference.md#VT_FW_ALT_ERR) | 固定翼飞行的最大负高度误差。 如果下降的高度超过该值，使实际高度低于设定高度，则机体将切换回多旋翼模式并执行故障保护返航操作。 |

## 故障检测器 {#failure_detector}

故障检测器允许机体在意外翻转或收到外部故障检测系统通知时执行保护措施。

During **flight**, the failure detector can be used to trigger [flight termination](../advanced_config/flight_termination.md) if failure conditions are met, which may then launch a [parachute](../peripherals/parachute.md) or perform some other action.

> **Note** Failure detection during flight is deactivated by default (enable by setting the parameter: [CBRK_FLIGHTTERM=0](#CBRK_FLIGHTTERM)).

During **takeoff** the failure detector [attitude trigger](#attitude_trigger) invokes the [lockdown action](#action_lockdown) if the vehicle flips (lockdown kills the motors but, unlike flight termination, will not launch a parachute or perform other failure actions). Note that this check is *always enabled on takeoff*, irrespective of the `CBRK_FLIGHTTERM` parameter.

故障检测器在所有机体类型和飞行模式下均处于激活状态，但*预期*会翻转的机体类型除外（即 [Acro 特技模式（MC）](../flight_modes/altitude_mc.md)，[Acro 特技模式（FW）](../flight_modes/altitude_fw.md)，[Rattitude 半自稳模式](../flight_modes/rattitude_mc.md)和 Manual 手动模式（FW））。</p> 

### 姿态触发器 {#attitude_trigger}

如果机体姿态在超过规定时间的情况下超过预定的俯仰和横滚值，则故障检测器可以配置为触发器。

相关参数如下：

| 参数                                                                                                     | 描述                                                    |
| ------------------------------------------------------------------------------------------------------ | ----------------------------------------------------- |
| <span id="CBRK_FLIGHTTERM"></span>[CBRK_FLIGHTTERM](../advanced_config/parameter_reference.md#CBRK_FLIGHTTERM) | 飞行终止断路器。 从 121212（默认）取消设置，以启用由于故障检测器或 FMU 丢失而导致的飞行终止。 |
| <span id="FD_FAIL_P"></span>[FD_FAIL_P](../advanced_config/parameter_reference.md#FD_FAIL_P)           | 最大允许俯仰角（角度制）。                                         |
| <span id="FD_FAIL_R"></span>[FD_FAIL_R](../advanced_config/parameter_reference.md#FD_FAIL_R)           | 最大允许横滚角（角度制）。                                         |
| <span id="FD_FAIL_P_TTRI"></span>[FD_FAIL_P_TTRI](../advanced_config/parameter_reference.md#FD_FAIL_P_TTRI) | 超过故障检测的 [FD_FAIL_P](#FD_FAIL_P) 时间（默认为 0.3s）。       |
| <span id="FD_FAIL_R_TTRI"></span>[FD_FAIL_R_TTRI](../advanced_config/parameter_reference.md#FD_FAIL_R_TTRI) | 超过故障检测的 [FD_FAIL_R](#FD_FAIL_R) 时间（默认为 0.3s）。       |

### 外部自动触发系统（ATS） {#external_ats}

[故障检测器](#failure_detector)在[启用](#CBRK_FLIGHTTERM)的状态下也可以由外部自动触发系统 ATS 触发。 外部触发系统必须连接到飞行控制器的 AUX5 端口（或者是那些没有 AUX 端口的飞控板上的 MAIN5 端口），并使用以下参数进行配置。

> **Note** External ATS is required by [ASTM F3322-18](https://webstore.ansi.org/Standards/ASTM/ASTMF332218). One example of an ATS device is the [FruityChutes Sentinel Automatic Trigger System](https://fruitychutes.com/uav_rpv_drone_recovery_parachutes/sentinel-automatic-trigger-system.htm).

| 参数                                                                                                       | 描述                                                               |
| -------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| <span id="FD_EXT_ATS_EN"></span>[FD_EXT_ATS_EN](../advanced_config/parameter_reference.md#FD_EXT_ATS_EN)     | 启用 AUX5 或 MAIN5（取决于飞控板）上的 PWM 输入，以便从外部自动触发系统（ATS）启用故障保护。 默认值：禁用。 |
| <span id="FD_EXT_ATS_TRIG"></span>[FD_EXT_ATS_TRIG](../advanced_config/parameter_reference.md#FD_EXT_ATS_TRIG) | 来自外部自动触发系统的用于接通故障保护的 PWM 阈值。 默认值：1900m/s。                        |

## 应急开关 {#safety_switch}

可以配置遥控开关（*QGroundControl* [飞行模式设置](../config/flight_mode.md)的一部分），以便在出现问题或发生紧急情况时及时采取矫正措施；例如，制动所有电机或激活[返航模式](#return_switch)。

本节列出了可用的应急开关。

### 急停开关 {#kill_switch}

急停开关会立即终止所有电机的输出（如果正处于飞行状态，机体将开始降落）！ 如果开关在 5 秒内复位，电机将重启。 5 秒后，机体将自动上锁；您需要再次解锁才能启动电机。

### 解锁/上锁开关 {#arming_switch}

解锁/上锁开关是对默认杆状安全开关机制的*直接替换*（二者作用相同：确保在电机启动/停止之前有一个需要用户留意的步骤）。 它可能优先于默认机制使用，原因如下：

* 这种机制偏向于切换动作而不是持续运动。
* 这种机制可以避免因为某种意外误触而引发的飞行期间解锁/上锁。
* 这种机制没有延迟（立即作出反应）。

对于那些*支持在飞行期间上锁*的飞行模式<1>，解锁/上锁开关会立即上锁（制动）电机。 支持飞行期间上锁的模式如下：</p> 

* *手动模式*
* *特技模式*
* *自稳模式*
* *半自稳模式*

对于不支持在飞行期间上锁的模式，在飞行期间会忽略该开关信号，但在检测到着陆后可以使用该开关。 不支持飞行期间上锁的模式包括*定点模式*和自主模式（例如*任务模式*、*降落模式*等）。

> **Note** [Auto disarm timeouts](#auto-disarming-timeouts) (e.g. via [COM_DISARM_LAND](#COM_DISARM_LAND)) are independent of the arm/disarm switch - ie even if the switch is armed the timeouts will still work.

<!--
> **Note** This can also be done by [manually setting](../advanced_config/parameters.md) the [RC_MAP_ARM_SW](../advanced_config/parameter_reference.md#RC_MAP_ARM_SW) parameter to the corresponding switch RC channel.
  If the switch positions are reversed, change the sign of the parameter [RC_ARMSWITCH_TH](../advanced_config/parameter_reference.md#RC_ARMSWITCH_TH) (or also change its value to alter the threshold value).
-->

### 返航开关 {#return_switch}

返航开关可以立即启动[返航模式](../flight_modes/return.md)。

## 其他安全设置

### 超时自动上锁 {#auto-disarming-timeouts}

如果起飞，并且/或者着陆后的响应速度太慢，您可以设置超时自动上锁（上锁会断开电机的电源，导致螺旋桨不会旋转）。

[相关参数](../advanced_config/parameters.md)显示如下：

| 参数                                                                                                         | 描述                |
| ---------------------------------------------------------------------------------------------------------- | ----------------- |
| <span id="COM_DISARM_LAND"></span>[COM_DISARM_LAND](../advanced_config/parameter_reference.md#COM_DISARM_LAND)   | 降落后自动上锁的超时时间。     |
| <span id="COM_DISARM_PRFLT"></span>[COM_DISARM_PRFLT](../advanced_config/parameter_reference.md#COM_DISARM_PRFLT) | 如果起飞速度太慢，将启动自动上锁。 |

## 更多信息

* [QGroundControl 用户手册 > 安全设置](https://docs.qgroundcontrol.com/en/SetupView/Safety.html)