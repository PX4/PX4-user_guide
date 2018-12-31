# 起飞模式

[<img src="../../assets/site/position_fixed.svg" title="需要定位修复（例如GPS）" width="30px" />](../getting_started/flight_modes.md#key_position_fixed)

*起飞*飞行模式使飞机起飞到指定高度并等待进一步指令。

> **注** 该模式需要GPS。 *此模式为自动模式（[默认](../advanced_config/parameter_reference.md#COM_RC_OVERRIDE)情况下，RC控制被禁用，除了用于更改模式外）。 * 使用此模式前飞机必须先被激活。

下面描述每种类型飞机的具体行为。

## 多旋翼（MC）

多旋翼上升到` MIS_TAKEOFF_ALT `中定义的高度并保持位置。

起飞受以下参数影响：

| 参数                                                                             | 描述                     |
| ------------------------------------------------------------------------------ | ---------------------- |
| [MIS_TAKEOFF_ALT](../advanced_config/parameter_reference.md#MIS_TAKEOFF_ALT) | 起飞期间的目标高度 (默认值: 2.5 米) |
| [MPC_TKO_SPEED](../advanced_config/parameter_reference.md#MPC_TKO_SPEED)     | 上升速度 (默认值: 1.5 m/s)    |

## 固定翼（FW） {#fixed_wing}

飞机使用*弹射器/手动启动模式*或*跑道起飞模式*在当前方向上起飞。 模式默认为弹射/手动发射，但可以使用` RWTO_TKOFF `设置为跑道起飞。

在*弹射器/手动发射模式*中，飞机将执行全油门爬升（在大约2秒内上升到` RWTO_MAX_THR `）。 一旦高度错误[ FW_CLMBOUT_DIFF ](#FW_CLMBOUT_DIFF)，将继续常规导航。

> 除了上面讨论的行为之外，还有一个启动检测器可以阻止启动程序开始直到满足某些条件。 For catapult launch this is some acceleration threshold.

The *runway takeoff mode* has the following phases:

1. **Throttle ramp**: Clamped to the runway (pitch fixed, no roll, and heading hold) until reach the minimum airspeed for takeoff ([FW_AIRSPD_MIN](#FW_AIRSPD_MIN) x [RWTO_AIRSPD_SCL](#RWTO_AIRSPD_SCL)) 
2. **Takeoff**: Increase pitch and continue until vehicle altitude > navigation altitude ([RWTO_NAV_ALT](#RWTO_NAV_ALT)).
3. **Climbout**: Climb until altitude above ground level > [FW_CLMBOUT_DIFF](#FW_CLMBOUT_DIFF). In this phase roll and heading restrictions are removed.

Takeoff is affected by the following parameters:

| 参数                                                                                                      | 参数描述                                                                                                                                                                                                                                                                                                                                                                 |
| ------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <span id="RWTO_TKOFF"></span>[RWTO_TKOFF](../advanced_config/parameter_reference.md#RWTO_TKOFF)             | Runway takeoff with landing gear. Default: disabled.                                                                                                                                                                                                                                                                                                                 |
| <span id="RWTO_MAX_THR"></span>[RWTO_MAX_THR](../advanced_config/parameter_reference.md#RWTO_MAX_THR)       | Max throttle during runway takeoff.                                                                                                                                                                                                                                                                                                                                  |
| <span id="FW_CLMBOUT_DIFF"></span>[FW_CLMBOUT_DIFF](../advanced_config/parameter_reference.md#FW_CLMBOUT_DIFF) | Climbout Altitude difference.                                                                                                                                                                                                                                                                                                                                        |
| <span id="FW_AIRSPD_MIN"></span>[FW_AIRSPD_MIN](../advanced_config/parameter_reference.md#FW_AIRSPD_MIN)     | Minimum Airspeed, below which the TECS controller will try to increase airspeed more aggressively.                                                                                                                                                                                                                                                                   |
| <span id="RWTO_AIRSPD_SCL"></span>[RWTO_AIRSPD_SCL](../advanced_config/parameter_reference.md#RWTO_AIRSPD_SCL) | Min. airspeed scaling factor for takeoff. Pitch is increased when the airspeed reaches: `FW_AIRSPD_MIN` * `RWTO_AIRSPD_SCL`                                                                                                                                                                                                                                          |
| <span id="RWTO_NAV_ALT"></span>[RWTO_NAV_ALT](../advanced_config/parameter_reference.md#RWTO_NAV_ALT)       | Altitude above ground level (AGL) at which we have enough ground clearance to allow some roll. Until `RWTO_NAV_ALT` is reached the plane is held level and only rudder is used to keep the heading (see <span id="RWTO_HDG"></span>[RWTO_HDG](../advanced_config/parameter_reference.md#RWTO_HDG)). This should be below `FW_CLMBOUT_DIFF` if `FW_CLMBOUT_DIFF` > 0. |

> **Note** The vehicle always respects normal FW max/min throttle settings during takeoff ([FW_THR_MIN](../advanced_config/parameter_reference.md#FW_THR_MIN), [FW_THR_MAX](../advanced_config/parameter_reference.md#FW_THR_MAX)).

## 垂直起降（VTOL）

A VTOL follows the TAKEOFF behavior and parameters of [Fixed Wing](#fixed-wing-fw) when in FW mode, and of [Multicopter](#multi-copter-mc) when in MC mode.

<!-- this maps to AUTO_TAKEOFF in dev -->