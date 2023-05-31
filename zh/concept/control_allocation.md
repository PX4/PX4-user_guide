# 控制分配 (混控)

:::note
控制分配取代了在 PX4 v1.13 中使用的旧的混控方法。 PX4 v1.13 文档见： [混控& 驱动器](https://docs.px4.io/v1.13/en/concept/mixing.html), [构型文件](https://docs.px4.io/v1.13/en/concept/geometry_files.html) 和 [添加一个新的机型配置](https://docs.px4.io/v1.13/en/dev_airframes/adding_a_new_frame.html)。
:::

PX4从核心控制器获取所需的扭矩和推力指令，并将它们转换为控制电机或作动器的驱动指令。

指令间的转换取决于飞行器的物理构型。 例如，给“向右转”需要给出一个扭矩指令：

- 对于每个副翼都有一个舵机的飞机来说，该指令将会控制一个舵机向高处偏转，另一个向低处偏转。
- 多旋翼将会通过改变所有电机的转速来向右偏航。

PX4 separates this translation logic, which is referred to as "mixing" from the attitude/rate controller. This ensures that the core controllers do not require special handling for each airframe geometry, and greatly improves reusability.

In addition, PX4 abstracts the mapping of output functions to specific hardware outputs. This means that any motor or servo can be assigned to almost any physical output. 

<!-- https://docs.google.com/drawings/d/1Li9YhTLc3yX6mGX0iSOfItHXvaUhevO2DRZwuxPQ1PI/edit -->
![Mixing Overview](../../assets/diagrams/mixing_overview.png)

## Actuator Control Pipeline

Overview of the mixing pipeline in terms of modules and uORB topics (press to show full-screen):
<!-- https://drive.google.com/file/d/1L2IoxsyB4GAWE-s82R_x42mVXW_IDlHP/view?usp=sharing -->
![Pipeline Overview](../../assets/concepts/control_allocation_pipeline.png)

Notes:
- The rate controller outputs torque and thrust setpoints
- the `control_allocator` module:
  - handles different geometries based on configuration parameters
  - does the mixing
  - handles motor failures
  - publishes the motor and servo control signals
  - publishes the servo trims separately so they can be added as an offset when [testing actuators](../config/actuators.md#actuator-testing) (using the test sliders).
- the output drivers:
  - handle the hardware initialization and update
  - use a shared library [src/libs/mixer_module](https://github.com/PX4/PX4-Autopilot/blob/main/src/lib/mixer_module/). The driver defines a parameter prefix, e.g. `PWM_MAIN` that the library then uses for configuration. Its main task is to select from the input topics and assign the right data to the outputs based on the user set `<param_prefix>_FUNCx` parameter values. For example if `PWM_MAIN_FUNC3` is set to **Motor 2**, the 3rd output is set to the 2nd motor from `actuator_motors`.
  - output functions are defined under [src/lib/mixer_module/output_functions.yaml](https://github.com/PX4/PX4-Autopilot/blob/main/src/lib/mixer_module/output_functions.yaml).
- if you want to control an output from MAVLink, set the relevant output function to **Offboard Actuator Set x**, and then send the [MAV_CMD_DO_SET_ACTUATOR](https://mavlink.io/en/messages/common.html#MAV_CMD_DO_SET_ACTUATOR) MAVLink command.

## Adding a new Geometry or Output Function

See [this commit](https://github.com/PX4/PX4-Autopilot/commit/5cdb6fbd8e1352dcb94bd58918da405f8ff930d7) for how to add a new geometry. The QGC UI will then automatically show the right configuration UI when [CA_AIRFRAME](../advanced_config/parameter_reference.md#CA_AIRFRAME) is set to the new geometry.

[This commit](https://github.com/PX4/PX4-Autopilot/commit/a65533b46986e32254b64b7c92469afb8178e370) shows how to add a new output function. Any uORB topic can be subscribed and assigned to a function.

Note that parameters for control allocation are defined in [src/modules/control_allocator/module.yaml](https://github.com/PX4/PX4-Autopilot/blob/main/src/modules/control_allocator/module.yaml) The schema for this file is [here](https://github.com/PX4/PX4-Autopilot/blob/main/validation/module_schema.yaml#L440=) (in particular, search for the key `mixer:`

## Setting the Default Frame Geometry

When [adding a new frame configuration](../dev_airframes/adding_a_new_frame.md), set the appropriate [CA_AIRFRAME](../advanced_config/parameter_reference.md#CA_AIRFRAME) and other default mixer values for the geometry.

You can see this, for example, in the airframe configuration file [13200_generic_vtol_tailsitter](https://github.com/PX4/PX4-Autopilot/blob/main/ROMFS/px4fmu_common/init.d/airframes/13200_generic_vtol_tailsitter)
```
...
param set-default CA_AIRFRAME 4
param set-default CA_ROTOR_COUNT 2
param set-default CA_ROTOR0_KM -0.05
param set-default CA_ROTOR0_PY 0.2
...
```

## Setting up Geometry and Outputs

The broad geometry and default parameters for a vehicle are set (from the frame configuration file) when selecting the airframe in QGroundControl: [Basic Configuration > Airframe](../config/airframe.md).

The geometry parameters and output mapping for the specific frame and flight controller hardware are then configured using the QGroundControl **Actuators** setup screen: [Basic Configuration > Actuator Configuration and Testing](../config/actuators.md).
