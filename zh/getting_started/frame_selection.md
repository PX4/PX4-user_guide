# 机架选择

## 空中飞行器

如果您计划使用 PX4 来飞行飞机，您应该回答的最重要的问题是，应用将会是什么。 是为了娱乐还是工作，计划的飞行时间和覆盖范围是多少。

- 如果你需要精确的悬停，并不介意更短的飞行时间，那么请关注 **多旋翼飞行器**。
- 对于更长的飞行和更大的覆盖区域，您将需要固定翼飞机，即**固定翼飞行器 **。
- 甚至还有混合型飞机，称为**VTOL** - 垂直起降飞行器。 它可以像多旋翼一样在垂直模式下起飞，然后在向前飞行时切换为固定翼飞机。

您可以看到我们不断增长的[机架](http://px4.io/technology/airframes/) 列表。列表中是经过我们调整以使用 PX4 自驾仪完美飞行的机架。

选择并购买或组装您的机架后，您必须在 [初始设置过程 ](../config/README.md)期间使用 QGroundControl 中相应机架模板预设机架类型。

![机架选择](../../images/frame_selection.png)

<!-- 
### Types of VTOL

Depending on the way the VTOL flies in copter mode or how it makes the transition there are three main types of VTOL aircraft.

**Multicopter - Airplane** - Generic airplane with pusher/puller motor and separate motors for vertical thrust. The VTOL hovers with its vertical motors. The transition is done when the forward motors are enabled and after the plane reaches cruising speed the hover motors are disabled in horizontal flight.

**Tail-sitter** - Airplane with two or more motors that sits on its tail while landed, then in vertical flight it balances in vertical frame orientation. The transition is made when the whole airplane changes its orientation from vertical to horizontal.

**Tilt-rotor** - Airplane with two or more motors that mechanical swing around an Y axis. The transition is done when gradually the motors change the thrust vector from vertical to horizontal.

-->

## 地面车辆

## 海洋船只