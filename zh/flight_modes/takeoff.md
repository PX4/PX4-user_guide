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

> 除了上面讨论的行为之外，还有一个启动检测器可以阻止启动程序开始直到满足某些条件。 对于弹射器发射，这是一些加速度阈值。

*跑道起飞模式*具有以下阶段：

1. **油门斜坡**：飞机依附在跑道上（俯仰固定，无滚转，航向保持），直到达到起最小起飞空速（[ FW_AIRSPD_MIN ](#FW_AIRSPD_MIN) x [ RWTO_AIRSPD_SCL ](#RWTO_AIRSPD_SCL)） 
2. **起飞**：增加俯仰直到飞机高度>导航高度（[ RWTO_NAV_ALT ](#RWTO_NAV_ALT)）。
3. ** 爬出**：爬升至地面以上的高度> [ FW_CLMBOUT_DIFF ](#FW_CLMBOUT_DIFF)。 在此阶段中, 将移除滚转和航向限制。

起飞受以下参数影响：高于地平面（AGL）的高度，留有足够的离地间隙以允许一些滚转。 在达到` RWTO_NAV_ALT `之前，飞机保持水平，并且仅使用方向舵来保持航向（参见<span id="RWTO_HDG"> </ 1> <a href="../advanced_config/parameter_reference.md#RWTO_HDG"> RWTO_HDG </a>）。 如果<code> FW_CLMBOUT_DIFF </code>> 0，则应低于<code> FW_CLMBOUT_DIFF </code>。</td> </tr> </tbody> </table> 

<blockquote>
  <p>
    在起飞期间飞机总是遵守标准的固定翼最大/最小油门设置（<a href="../advanced_config/parameter_reference.md#FW_THR_MIN"> FW_THR_MIN </a>，<a href="../advanced_config/parameter_reference.md#FW_THR_MAX"> FW_THR_MAX </a>）。
  </p>
</blockquote>

<h2>
  垂直起降（VTOL）
</h2>

<p>
  A VTOL follows the TAKEOFF behavior and parameters of <a href="#fixed_wing">Fixed Wing</a> when in FW mode, and of <a href="#multi-copter-mc">Multicopter</a> when in MC mode.
</p>

<!-- this maps to AUTO_TAKEOFF in dev -->