# Actuator Configuration and Testing

The _Actuators Setup_ view is used to customize the specific geometry of the vehicle, assign actuators and motors to flight controller outputs, and test the actuator and motor response.

The displayed elements depend on the [selected frame](../config/airframe.md), with outputs mapped by default as shown in the [Airframe Reference](../airframes/airframe_reference.md).

:::note
The *Actuators* view is only displayed if _dynamic control allocation_ is enabled, which replaces geometry and mixer configuration files with parameters.
This is expected to be enabled by default in PX4 v1.13 (currently disabled in `master`).

To enable this feature, set the parameter [SYS_CTRL_ALLOC=1](../advanced_config/parameter_reference.md#SYS_CTRL_ALLOC) and make sure the correct frame type is set in [CA_AIRFRAME](../advanced_config/parameter_reference.md#CA_AIRFRAME).
You may need to restart *QGroundControl*. <!-- https://github.com/PX4/PX4-Autopilot/blob/master/src/lib/systemlib/system_params.c#L298 -->

The easiest way to try this out in simulation is to use any of the following gazebo `make` targets, which have control allocation pre-enabled:
```
make px4_sitl gazebo_iris_ctrlalloc
make px4_sitl gazebo_typhoon_h480_ctrlalloc
```
:::

Open the view in *QGroundControl* here: **"Q" (app menu) > Vehicle Setup > Actuators** (tab).

## Overview

The view has three sections:
- [Geometry](#geometry): Configure the geometry for the [selected airframe](../config/airframe.md).
  This includes number, position and properties of [motors](#motor-geometry) and also the number and properties of [control surfaces](#control-surfaces-geometry) and [motor tilt servos](#motor-tilt-servo-geometry).
- [Actuator Outputs](#actuator-outputs): Assign motors, control surfaces, and other actuators to specific output.
- [Actuator Testing](#actuator-testing): Test that motors and actuators are mapped to the correct outputs, and move as expected.

A quadcopter might have an setup screen similar to the one shown below.
This defines a 4 motor copter with X-geometry, and maps each of the motors to DShot ESC.
It also maps PWM400 AUX outputs for controlling a parachute and landing gear.

![Actuators MC (QGC)](../../assets/config/actuators/qgc_actuators_mc_aux.png)

Note that only the most common settings are displayed by default.
Select the **Advanced** checkbox in the top right corner to display all settings.


## Geometry

The geometry section is used to set any configurable geometry-related parameters for the selected [airframe](../config/airframe.md).
This includes the number and position of [motors](#motor-geometry), and the number, function, and properties of [control surfaces](#control-surfaces-geometry).
For VTOL tiltrotor vehicles, it will also include the number and properties of [tilt servos](#motor-tilt-servo-geometry)

:::note
The UI is customised for the selected airframe.
Only the motors and/or control surface options that are configurable for the airframe type are displayed.
:::

### Motor Geometry

The motor geometry section lets you set the number of motors, the relative position, and other properties of each motor.

Most motor properties apply to all frames.
A few properties apply to specific frames.
For example, as `Tilted-by` and `axis` are only relevant for [Tiltrotor VTOL](#motor-geometry-vtol-tiltrotor) and [Standard VTOL](#motor-geometry-standard-vtol) vehicles, respectively.

Multicopter airframe provides a diagram in QGC showing the X, Y positions, which is useful for checking whether the motors configuration is correct. To get a feeling for the motor layout for VTOL and other vehicles see the [Airframe Reference](../airframes/airframe_reference.md).

Core geometry concepts and the configuration for a number of different frames are provided in the following sections.


#### Motor Position Coordinate System

The coordinate system for motor positions is FRD (in body frame), where the X axis points forward, the Y axis to the right and the Z axis down.

The **origin is the vehicle's centre-of-gravity (COG)**, and **NOT** the autopilot location).

![Actuators CG reference diagram](../../assets/config/actuators/quadcopter_actuators_cg_reference.png)


#### Motor Geometry: Multicopter

The image below shows the geometry setup for a multicopter frame with and without advanced settings.
Multicopters don't have any control surfaces, so none are shown.

:::note
Specifically this is the motor geometry for a [Quadrotor Wide](../airframes/airframe_reference.md#quadrotor-wide) muticopter.
Other multicopters frames are configured similarly.
:::

![Geometry MC (QGC)](../../assets/config/actuators/qgc_actuators_mc_geometry_marked.png)

First, the **Motors** drop-down setting lets you choose the number of motors (4 for the example above).

For each motor you can then set:
- `Position X`: [X-position](#motor-position-coordinate-system), in metres.
- `Position Y`: [Y-position](#motor-position-coordinate-system), in metres.
- `Position Z`: [Z-position](#motor-position-coordinate-system), in metres.
- (Advanced) `Direction CCW`: Checkbox to indicate motor spins counter-clockwise (uncheck for clockwise).
- (Advanced) `Bidirectional`: Checkbox to indicate motor is [bidirectional](#bidirectional-motors) 
- (Advanced) `Slew Rate`: ?

The X, Y, Z positions are in [FRD coordinate frame, relative to the centre of gravity](#motor-position-coordinate-system).


#### Motor Geometry: VTOL Quadrotor Tailsitter

The motor geometry for a [VTOL Quad Tailsitter](../airframes/airframe_reference.md#vtol-quad-tailsitter) is shown below (the approach for configuring other tailsitter VTOL vehicles will be similar).

Motors have the same configuration fields as for the [multicopter geometry](#motor-geometry-multicopter).

![Geometry motor: tailsitter vtol](../../assets/config/actuators/qgc_geometry_tailsitter_motors.png)


#### Motor Geometry: VTOL Tiltrotor

The motor geometry for a [Generic Quadplane VTOL Tiltrotor](../airframes/airframe_reference.md#vtol_vtol_tiltrotor_generic_quadplane_vtol_tiltrotor) is shown below (the approach for configuring other [VTOL tiltrotors](../airframes/airframe_reference.md#vtol_vtol_tiltrotor_generic_quadplane_vtol_tiltrotor) will be similar).

![Geometry motor: tiltrotor vtol](../../assets/config/actuators/qgc_geometry_tiltrotor_motors.png)

- `Tilted by`: The associated servo used for tilting the motor.
  The properties of this servo are defined in the [Motor Tilt Servo Geometry](#motor-tilt-servo-geometry).


#### Motor Geometry: Standard VTOL

The motor geometry for a [Generic Standard Quadplane VTOL Tiltrotor](../airframes/airframe_reference.md#vtol_standard_vtol_generic_quadplane_vtol) is shown below (the approach for configuring other "Standard VTOL" will be similar).

![Geometry motor: standard vtol](../../assets/config/actuators/qgc_geometry_standard_vtol_motors.png)

Motors have most of the same configuration fields as for the [multicopter geometry](#motor-geometry-multicopter).
There is an additional field to indicate the direction in which the motor moves the vehicle (for a standard VTOL, the hover motors are usually set "upwards" and the pusher motor is set to "forwards").

- `Axis`: One of `Upwards`, `Downwards`, `Forwards`, `Backwards`, `Leftwards`, `Rightwards`, `Custom`
  - If `Custom` is selected, then the UI displays three additional fields for setting the motor orientation.

#### Motor Geometry: Other Vehicles

Other vehicle types will define an appropriate motor geometry for their frame type.
Once again these motors will generally have the same kinds of properties as shown above.

For example, a fixed-wing vehicle may just have a single pusher moter, while a rover with differential steering will have a motor for throttle and for steering.

#### Bidirectional Motors

Some vehicles may use bidirectional motors (i.e. motor supports spinning in both directions)
For example, ground vehicles that want to move forwards and backwards, or VTOL vehicles that have pusher motors that go in either direction.

If bidiectional motors are used, make sure to select the **Reversible** checkbox for those motors (the checkbox is displayed as an "advanced" option).

![Reversible](../../assets/config/actuators/qgc_geometry_reversible_marked.png)

Note that you will need to also ensure that the ESC associated with bidirectional motors is configured appropriately (e.g. 3D mode enabled for DShot ESCs, which can be achieved via [DShot commands](../peripherals/dshot.md#commands)).


### Control Surfaces Geometry

The control surfaces section of the geometry panel lets you set the number of control surfaces that are present on the vehicle.
You can then specify the type of each individual surface, and configure the appropriate scaling values for the Roll scale, Yaw scale, Pitch scale, Trim and Slew rate (advanced).

An "example" control surface section for a vehicle with two ailerons is shown below.
Note that ailerons only affect roll, so the pitch and yaw fields are disabled.

![Control Surface Setup Example](../../assets/config/actuators/control_surfaces_geometry.png)

The fields are:

- `Control Surfaces`: The number of control surfaces (set this first!)
- `Type`: The type of each control surface: `LeftAileron`, `RightAileron`, `Elevator`, `Rudder`, `Left Elevon`, `Right Elevon`, `Left V-Tail`, `Right V-Tail`, `Left Flap`, `Right Flap`, `Airbrakes`, `Custom`.
- `Roll scale`: Roll scale (normalised: -1 to 1)
- `Pitch scale`: Pitch scale (normalised: -1 to 1)
- `Yaw scale`: Yaw scale (normalised: -1 to 1)
- `Trim`: ?
- `Skew`: ?
- `Lock control surfaces in hover`: `Enabled` or `Disabled`.

The scaling values are normalised (-1 to 1), decoupling the outputs of PX4 controllers from the physical servo control signals.


#### Control Surface Deflection Convention

The diagram below shows the convention for deflections:

![Control Surface Deflections](../../assets/config/actuators/plane_control_surface_convention.png)

In summary:
- **Horizontal Control Surfaces:** Upwards movement equals positive deflection.
  Includes Ailerons, ...
- **Vertical Control Surfaces:** Rightwards movement is positive deflection
  Includes rudders etc.
- **Mixed Control Surfaces:** Upwards/rightwards movement is positive (as above)
  Includes V-Tail etc.


### Motor Tilt Servo Geometry

[VTOL tiltrotor vehicles](../frames_vtol/tiltrotor.md) can tilt their motors to transition between hover and forward flight.
This section defines the properties of the tilting servos.
These are mapped to specific motors in the [motor geometry for a tiltrotor](../config/actuators.md#motor-geometry-vtol-tiltrotor).

The example below shows the tilt servo setup for the [tiltrotor motor geometry shown above](../config/actuators.md#motor-geometry-vtol-tiltrotor).

![Tilt Servo Geometry Setup Example](../../assets/config/actuators/tilt_servo_geometry_config.png)

The values that can be set are:
- `Tilt servos`: The number of servos (tiltable motors).
- `Angle at min tilt`: [Maximum tilt angle](#tilt-servo-coordinate-system), relative to the z axis (degrees).
- `Angle at max tilt`: [Minimum tilt angle](#tilt-servo-coordinate-system), relative to the z-axis (degrees).
- `Tilt direction`: `Towards front` (Positive X direction) or `Towards right` (Positive Y direction).
- `Use for control`: [Tilt server used for yaw/pitch](#tilt-servos-for-yaw-pitch-control)
  - `None`: Torque control is not used.
  - `Yaw`: Tilt servos used to control yaw.
  - `Pitch`: Tilt servos used to control pitch.
  - `Both Yaw and Pitch`: Tilt servos are used to control both yaw and pitch.


#### Tilt Servo Coordinate System

The coordinate system for tilt rotor angles is shown below:

![Tilt Axis](../../assets/config/actuators/tilt_axis.png)

The reference direction is upwards.
For example:
- a servo pointing upwards has an angle of zero
- a servo pointing forwards or right would have an angle of 90 degrees.
- A servo pointing backwards or left would have an angle of -90 degrees.

The `Angle at min tilt` and `Angle at max tilt` indicate the ranges of movement for the tilt server.
The minimum is the smaller _numerical value_ (not absolute)  of the two angles.
For example:
- A servo that moves between the upright and forward postions would have `min=0` and `max=90`. 
- A servo that moves symmetrically around the upright position might have `min=-45` and `max=45`
- A servo that moves between the upright and backward positions would have `min=-90` and `max=0`.

The `Tilt direction` indicates whether the servo tilts in the plane towards the `Front` or `Right` of the vehicle of the vehicle (at the moment the assumption is that it can only tilt in these directions).

#### Tilt Servos for Yaw/Pitch Control

Tilt servos can provide torque on one or more axes, which may be used to yaw or pitch the vehicle:
- Yaw is commonly set in this way, though motors are often used instead on vehicles with four or more motors.
- Pitch is more commonly controlled using differential motors thrust.
  Control using tilt servos is useful on airframes that can't use differential thrust, such as a [Bicopter](https://www.youtube.com/watch?v=hfss7nCN40A).

Whether this feature is used is configured in the `Use for control` setting.

## Actuator Outputs

The actuators and any other output function can be assigned to any of the physical outputs.
Each output has its own tab, e.g. the PWM MAIN or AUX output pins, or UAVCAN.

PWM outputs are grouped according to the hardware groups of the autopilot.
Each group allows to configure the PWM rate or DShot/Oneshot (if supported).

:::note
For boards with MAIN and AUX, prefer the AUX pins over the MAIN pins for motors, as they have lower latency.
:::

The AUX pins have additional configuration options for camera capture/triggering.
Selecting these requires a reboot before they are applied.


## Actuator Testing

### Identify & Assign Motors

![Identify motor button](../../assets/config/actuators/identify_motors_button.png)

QGC Supports a feature of identifying the motors by sending the motor command to different outputs and letting you click on the motor to map the Motor to each Output ports.

To use this mode:
1. Setup the Motors Geometry correctly to include all the motors in your vehicle you want to configure
1. Select the Output tab where you want to assign the motors (if not assigned already)
2. Click the 'Identify & Assign Motors' Button
3. Each motor will start spinning. Select the motor that spun up in the GUI.
![](../../assets/config/actuators/identify_motors_in_progress.png)
   * Click 'Spin Motor Again' if you want to check which motor spun again
4. After assigning all motors, it will automatically exit and set the Actuator Outputs settings to map correct motors to different outputs.

:::note
This is only supported for multirotors currently, as it requires a GUI interface that shows where each motor is located.
:::

### Actuator Setup Using Slider

![Actuator Testing Slider](../../assets/config/actuators/vtol_tiltrotor_sliders_example.png)

> Slider testing example with a VTOL Tiltrotor setup

Sliders can be used to verify the following:

1. Motors spin at the **minimum command**
2. Motors give **positive thrust** in the expected direction
3. **Control Surface** moves in the direction as defined in the [Control Surface Convention](#control-surface-direction-conceptual)
4. **Motor Tilt Servos** move in the direction as defined in the [Tilt Servo Convention](#motor-tilt-servos-conceptual)

:::note
The Slider has a safety feature built in so that even after you toggle the _Enable sliders_ switch, if you don't move the slider, it won't send actuator control commands.
This is to prevent unwanted action from happening just after enabling the sliders.
:::

More detailed setup directions are described below.

#### Motor Setup & Testing

:::warning
Always remove the propellers from the motor before you do the actuator testing for safety!
:::

1. Pull the Motor slider down, and it will snap in lower end, where it will command **disarmed** value to the motors, verify that it doesn't spin
   1. For PWM output, adjust the Disarmed value in case the motor spins at the disarmed command
2. Slowly move the Motor slider up, and it will snap in at the '**minimum** command'. Verify that the motor is spinning at the minimum speed.
   1. For **PWM output, adjust the minimum output** value in the 'Actuator Outputs' tab on the right such that the motors barely spin
    ![PWM Minimum Output](../../assets/config/actuators/pwm_minimum_output.png)
   :::note
   For DShot output, this is not required
   :::
3. Move the slider up even more, and verify that the Motor is spinning in the correct direction and that it would give a positive thrust in the expected direction
   1. The expected thrust direction can vary by vehicle type, for example in multicopters the thrust should always point upwards
   2. For Fixed Wings, the thrust should point to forward direction
   3. For VTOL, thrust should point upwards when the Tilt Servo is at 0 degrees as defined the [Tilt Servo Convention](#motor-tilt-servos-conceptual). Testing of the [Tilt Servo](#tilt-servo-testing) is covered below as well.

#### Control Surface Setup

![Control Surface Disarmed 1500 Setting](../../assets/config/actuators/control_surface_disarmed_1500.png)

1. **Set the 'Disarmed' value for Control Surface outputs to '1500'** in case of using a PWM output
   * Unlike Motors, when **disarmed** we want the control surface to be in the middle commanded value, which correlates to 1500 in PWM
2. **Set the Output mode to 'PWM 50Hz'**, instead of default PWM 400 Hz when using a PWM output for Control Surfaces using Servos
   * If your Servo is creating weird noise, it is most likely because of the "PWM 400Hz" output, which is usually not accepted by commercial Servos.
   * In case your Servo supports 100, 200 or 400 Hz command, you can of course set the output mode to the maximum PWM frequency it supports!
3. Move Control Surface slider upwards (positive command) and verify that it moves in the direction defined in the [Control Surface Convention](#control-surface-direction-conceptual).
   1. If the control surface moves in the opposite direction, click on the 'Rev Range' checkbox to reverse the range
4. Move the slider to the middle and check if the Control Surfaces are aligned in the neutral position of the wing
    ![Control Surface Trimming](../../assets/config/actuators/control_surface_trim.png)
   1. If it is not aligned, you can set the **Trim** value for each Control Surface.
   2. After setting a new trim, manually click and place the slider for the control surface you are testing in the middle position, to check if it is in the neutral position.
   3. Note that as mentioned above as a safety feature of slider, unless you actually touch the slider, the actuator command doesn't get sent. Therefore **you must manually click and put the slider in the middle position to test the trim**
   4. Or, an easier way to test without using the slider would be to set the [`COM_PREARM_MODE`](../advanced_config/parameter_reference.md#COM_PREARM_MODE) parameter to `Always`.
      1. Which will enable the control of Servos even when the vehicle is disarmed, and will constantly be applying the Trim setting to the Control Surfaces
      2. Here you can try setting different values for the Trim and check the alignment, and then settle on the value you are happy with.

#### Tilt Servo Setup

![Tilt Servo Setup](../../assets/config/actuators/tilt_servo_setup.png)

> Setup of Tilt Servo is similar to Control Surface, as both of them uses the Servo hardware (in most cases)

1. **Set the 'Disarmed' value for Control Surface outputs to '1500'** in case of using a PWM output
   * Unlike Motors, when **disarmed** we want the control surface to be in the middle commanded value, which correlates to 1500 in PWM
2. **Set the Output mode to 'PWM 50Hz'**, instead of default PWM 400 Hz when using a PWM output for Control Surfaces using Servos
   * If your Servo is creating weird noise, it is most likely because of the "PWM 400Hz" output, which is usually not accepted by commercial Servos.
   * In case your Servo supports 100, 200 or 400 Hz command, you can of course set the output mode to the maximum PWM frequency it supports!
3. Position the Slider of the Tilt Servo in the lowest position, and **verify that the angle of the motor thrust direction matches the 'Angle at Min Tilt' angle** set in Geometry section.
   ![Tilt Servo Geometry Setup](../../assets/config/actuators/tilt_servo_geometry_config.png)
4. Position the Slider of the Tilt Servo in the highest position and **verify that the angle of motor thrust position matches the 'Angle at Max Tilt' angle set in Geometry.**

#### Other Notes

- If a safety button is used, it must be pressed before actuator testing is allowed.
- The kill-switch can still be used to stop motors immediately.
- Servos do not actually move until the corresponding slider is changed.
- The parameter [COM_MOT_TEST_EN](../advanced_config/parameter_reference.md#COM_MOT_TEST_EN) can be used to completely disable actuator testing.
- On the shell, [actuator_test](../modules/modules_command.md#actuator-test) can be used as well for actuator testing.
- VTOLs will automatically turn off motors pointing upwards during **fixed-wing flight**:
  - Standard VTOL : Motors defined as multicopter motors will be turned off
  - Tiltrotors : Motors that have no associated tilt servo will turn off
  - Tailsitters do not turn off any motors in fixed-wing flight

### Reversing Motors

The motors must turn in the direction defined in configured geometry ("**Direction CCW**" checkboxes).
If any motors do not turn in the correct direction they must be reversed.

There are several options:
- If the ESCs are configured as [DShot](../peripherals/dshot.md) you can reverse the direction via UI (**Set Spin Direction** buttons).
  Note that the current direction cannot be queried, so you might have to try both options.
- Swap 2 of the 3 motor cables (it does not matter which ones).

  :::note
  If motors are not connected via bullet-connectors, re-soldering is required (this is a reason, among others, to prefer DShot ESCs).
  :::
