# 返航模式

[<img src="../../assets/site/position_fixed.svg" title="需要定位修复（例如GPS）" width="30px" />](../getting_started/flight_modes.md#key_position_fixed)

*返回</ 0>飞行模式使飞机返回其原始位置，然后它可以等待（悬停或循环）或降落。</p> 

> 此模式也称为*返回启动*（RTL）和*返回起点*（RTH）

<span></span>

> **注** 该模式需要GPS。 *此模式为自动模式（[默认](../advanced_config/parameter_reference.md#COM_RC_OVERRIDE)情况下，RC控制被禁用，除了用于更改模式外）。

下面描述每种类型飞机的具体行为。

## 多旋翼（MC）

直升机/多旋翼将首先上升到` RTL_RETURN_ALT `高度，然后以直线飞到原点位置（如果已经高于` RTL_RETURN_ALT `，它将以当前高度返回）。

当它到达起点/起飞位置时，它将迅速下降到[ RTL_DESCEND_ALT ](#RTL_DESCEND_ALT)高度。 然后它会在着陆前悬停，悬停时间在 RTL_LAND_DELAY </ 0>中定义。</p> 

> **注**提供` RTL_LAND_DELAY `以允许部署起落架（这是自动触发的）。 默认情况下，这段时间很短，因此飞机会减速然后立即降落。 也可以设置该参数，以使飞机无限期地悬停。

可以使用以下参数配置RTL行为。

| 参数                                                                                                      | 描述                                                                                                |
| ------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| <span id="RTL_RETURN_ALT"></span>[RTL_RETURN_ALT](../advanced_config/parameter_reference.md#RTL_RETURN_ALT)   | 最小RTL返回高度 (默认值: 60 米)。 飞机将上升到这个高度, 然后返回。 如果已经超过这个值, 飞机将返回当前的高度。                                   |
| <span id="RTL_DESCEND_ALT"></span>[RTL_DESCEND_ALT](../advanced_config/parameter_reference.md#RTL_DESCEND_ALT) | 飞机减速或停止初始下降的高度 (默认值: 30 米)                                                                        |
| <span id="RTL_LAND_DELAY"></span>[RTL_LAND_DELAY](../advanced_config/parameter_reference.md#RTL_LAND_DELAY)   | 着陆前在 `RTL_DESCEND_ALT` 悬停的时间 (默认值: 0.5 s)。 如果设置为-1, 系统将在 `RTL_DESCEND_ALT` 徘徊, 而不是降落。             |
| <span id="RTL_MIN_DIST"></span>[RTL_MIN_DIST](../advanced_config/parameter_reference.md#RTL_MIN_DIST)       | 从起始位置到触发上升到安全高度的最小水平距离 (RTL_RETURN_ALT)。 如果飞机离起点的水平距离比这个更近，它将以当前高度返回（而不是首先上升到RTL_RETURN_ALT）。 |

## 固定翼（FW）

固定翼飞机往返行程的行为与多旋翼飞行器相同（遵循相同的参数）。 唯一的区别是，在到达时，飞机默认情况下会绕起点旋转而不是悬停/着陆。 如果 [RTL_LAND_DELAY](#RTL_LAND_DELAY) 设置为-1, 飞机将降落, 如主题 "降落 (固定翼)</1 > 中所述。</p> 

以下附加参数会影响固定翼的返回模式:

| 参数                                                                                                    | 参数描述    |
| ----------------------------------------------------------------------------------------------------- | ------- |
| <span id="NAV_LOITER_RAD"></span>[NAV_LOITER_RAD](../advanced_config/parameter_reference.md#NAV_LOITER_RAD) | 留待圈的半径。 |

## 垂直起降（VTOL）

当处于FW模式时，VTOL遵循返回行为和[固定翼](#fixed-wing-fw)的参数，而当处于MC模式时，VTOL遵循[多旋翼](#multi-copter-mc)的参数。 FW模式下的VTOL将在着陆之前*始终*转换回MC（忽略[ NAV_FORCE_VT ](../advanced_config/parameter_reference.md#NAV_FORCE_VT)）。