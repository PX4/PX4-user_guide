# VTOL后转换调参

> **Note** 以下的某些特性只在PX4的1.7版本可用，并且现在只在实验性的开发分支上有。

当一个VTOL飞机进行后转换时（从固定翼模式转换到多旋翼模式），多旋翼需要先减速才能取得比较好的控制效果。 在PX4的1.7版本以及现在的开发者分支上，当飞行器的水平速度达到多旋翼巡航速度（[MPC_XY_CRUISE](../advanced_config/parameter_reference.md#MPC_XY_CRUISE)）或者后转换时间到达设定值（[VT_B_TRANS_DUR](../advanced_config/parameter_reference.md#VT_B_TRANS_DUR)）的时候，飞行器的动力将完全切换到四旋翼模式。

## 后转换持续时间

把后转换持续时间设长一点 ([VT_B_TRANS_DUR](../advanced_config/parameter_reference.md#VT_B_TRANS_DUR)) 可以给飞行器更长的时间来减速。 在这期间VTOL将会关掉它的固定翼电机并且在滑翔时逐渐打开四个旋翼电机。 这个时间设的越大，飞行器尝试通过滑翔来减速的时间就会越长。 要注意的是，这段时间飞行器会只控高度，不控位置，所以可能有会漂移现象。

## 设置期望的减速加速度

在用任务模式飞航点的时候，自驾仪会试着计算启动后转换的适当距离。 它通过当前速度（取自地速）和期望减速加速度来计算这个距离。 要让飞行器在后转换时更加接近降落点，你可以调整期望减速加速度（[VT_B_DEC_MSS](../advanced_config/parameter_reference.md#VT_B_DEC_MSS)）参数 确保你的后转换持续时间足够长，可以让飞行器在超时前达到预期的位置。

## 应用空气制动

If your vehicle is equipped with airbrakes, and your selected airframe supports them (in code), you can set the airbrake position during back-transition in [VT_B_REV_OUT](../advanced_config/parameter_reference.md#VT_B_REV_OUT). The values scale from 0 to 1, so a value of 0.7 equals 70% output.

## Applying reverse thrust on your fixed wing motor

To get the shortest possible back-transition, PX4 supports active breaking by reversing the fixed wing motor direction. To use this feature you will require an ESC that supports motor rotation reversing.

> **Note** A typical fixed wing propeller is not optimized to spin in reverse, when the throttle during reverse thrust is set too high the propeller can stall.

Generally there are 2 ways a reverse-capable ESC can implement reverse thrust.

### Using throttle scaling (3D)

Normally the throttle stick is used purely for forward thrust.

3D ESCs assume 0 thrust at 50% throttle, positive (forward) thrust above 50% and negative thrust (reverse) below 50%. The airframe can be modified to implement this behaviour *only* during back transition, allowing reverse thrust to be applied during the transition.

> **Warning** Support for 3D throttle scaling during back-transition requires *code support* in the airframe.

The amount of negative thrust during back transition can then be configured using the [VT_B_TRANS_THR](../advanced_config/parameter_reference.md#VT_B_TRANS_THR) parameter (set to a negative value between 0 and -1).

### On a control channel

ESCs that use a separate control channel to control the motor direction (e.g. [Hobbywing Platinum series](http://www.hobbywing.com/category.php?id=44&filter_attr=6345.6346)) can use the airbrakes channel to apply reverse thrust during back-transition.

Airframes that have been configured to support this behavior (like the DeltaQuad airframe) can be configured to do so by setting both [VT_B_REV_OUT](../advanced_config/parameter_reference.md#VT_B_REV_OUT) to 1 and [VT_B_TRANS_THR](../advanced_config/parameter_reference.md#VT_B_TRANS_THR) to the desired throttle level to apply for active breaking. The values scale from 0 to 1, so a value of 0.7 equals 70% throttle.

## Typical setup

An example of a setup that employs most features listed above would be the following:

- Airframe: Any VTOL supporting reverse thrust (e.g. DeltaQuad)
- ESC: A fixed wing ESC that supports motor reversing (e.g. Hobbywing Platinum Pro 60A)
- Estimated deceleration value in m/s/s `VT_B_DEC_MSS`: 2.5
- Back-transition duration timeout in seconds `VT_B_TRANS_DUR`: 10
- Set reverse channel high during back-transition `VT_B_REV_OUT`: 1.0
- Apply 70% thrust during back-transition `VT_B_TRANS_THR`: 0.7