# Control Allocation (Mixing)


The PX4 architecture ensures that the airframe layout does not require special case handling in the core controllers.

Mixing means to take force commands (e.g. `turn right`) and translate them to actuator commands which control motors or servos.
For a plane with one servo per aileron this means to command one of them high and the other low.
The same applies for multicopters: Pitching forward requires changing the speed of all motors.

Separating the mixer logic from the actual attitude/rate controller greatly improves reusability.

<!-- https://docs.google.com/drawings/d/1Li9YhTLc3yX6mGX0iSOfItHXvaUhevO2DRZwuxPQ1PI/edit -->
![Mixing Overview](../../assets/diagrams/mixing_overview.png)


:::note
How to setup mixing and outputs is documented [here](../config/actuators.md).
:::


## Actuator Control Pipeline

Overview of the mixing pipeline in terms of modules and uORB topics:
<!-- https://drive.google.com/file/d/1L2IoxsyB4GAWE-s82R_x42mVXW_IDlHP/view?usp=sharing -->
<img alt="Pipeline Overview" src="../../assets/concepts/control_allocation_pipeline.png" width="1200" style="text-align: center; margin-left: -230px; margin-right: -230px; max-width: 200%"></img>

Notes:
- The rate controller outputs torque and thrust setpoints
- the `control_allocator` module:
  - handles different geometries based on configuration
  - does the mixing
  - handles motor failures
  - publishes the motor and servo control signals
  - publishes the servo trims separately so they can be added to the actuator testing
- the output drivers:
  - handle the hardware initialization and update
  - use a shared library **src/libs/mixer_module**. The driver defines a parameter prefix, e.g. `PWM_MAIN` that the library then uses for configuration.
    Its main task is to select from the input topics and assign the right data to the outputs based on the user set `<param_prefix>_FUNCx` parameter values.
	For example if `PWM_MAIN_FUNC3` is set to **Motor 2**, the 3rd output is set to the 2nd motor from `actuator_motors`.
  - output functions are defined under **src/lib/mixer_module/output_functions.yaml**.
- if you want to control an output from MAVLink, set the relevant output function to **Offboard Actuator Set x**, and then send the **DO_SET_ACTUATOR** MAVLink command.


### Adding a new Geometry or Output Function

See [this commit](https://github.com/PX4/PX4-Autopilot/commit/5cdb6fbd8e1352dcb94bd58918da405f8ff930d7) for how to add a new geometry.
The QGC UI will then automatically show the right configuration UI when `CA_AIRFRAME` is set to the new geometry.

[This commit](https://github.com/PX4/PX4-Autopilot/commit/a65533b46986e32254b64b7c92469afb8178e370) shows how to add a new output function.
Any uORB topic can be subscribed and assigned to a function.




