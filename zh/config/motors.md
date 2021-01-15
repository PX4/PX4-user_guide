# 电机检查

在机架设置并配置完毕后，您应该检查电机分配和旋转方向以及servo响应。 这些可以在QGroundControl中完成，其选项是Vehicle Setup > Motors tab.

注意这些PX4特有的操作：
- 如果使用了安全按钮，在允许电机测试之前必须按下，保证其开启。
- 急停开关仍然可以立即停止电机。
- 使用参数 [COM_MOT_TEST_EN](../advanced_config/parameter_reference.md#COM_MOT_TEST_EN) ，可以禁用电机测试。
- On boards with an IO, only the MAIN pins can be tested.
- On the shell, [motor_test](../modules/modules_command.md#motortest) can be used as well, which has additional options.

If one or more of the motors do not turn in the correct direction according to the configured [airframe](../airframes/airframe_reference.md), they must be reversed. There are several options:
- If using ESCs that support [DShot](../peripherals/dshot.md) you can reverse the direction via [DShot commands](../peripherals/dshot.md#commands).
- Swap 2 of the 3 motor cables (it does not matter which ones). :::note If motors are not connected via bullet-connectors, re-soldering is required (this is a reason, among others, to prefer DShot ESCs).
:::

The following additional checks should be performed to validate that the vehicle is setup correctly:
1. With propellers still removed, switch to [Stabilised mode](../flight_modes/manual_stabilized_mc.md) (Multicopter) or [Manual mode](../flight_modes/manual_fw.md) (Fixed Wing) and arm the vehicle.
1. Increase the throttle a little (so the vehicle does not automatically disarm) and check that the motors respond to throttle changes.
1. Check that all motors spin at minimum throttle.
1. If the vehicle has ailerons, check if they are responding in the right directions when giving roll/pitch stick input commands.

