# Actuator Configuration and Testing

:::note
The *Actuators* view is only displayed if dynamic control allocation is enabled using the [SYS_CTRL_ALLOC](../advanced_config/parameter_reference.md#SYS_CTRL_ALLOC) parameter.
This replaces geometry and mixer configuration files with configuration using parameters.
You should also ensure that the appropriate airframe type is selected using [CA_AIRFRAME](../advanced_config/parameter_reference.md#CA_AIRFRAME).

The easiest way to try this out in simulation is to use the following make target, which has control allocation pre-enabled:
```
make px4_sitl gazebo_iris_ctrlalloc
```
:::

After selecting an [airframe](../config/airframe.md) you will generally need to configure the specific geometry, assign actuators to outputs, and test the actuator response.
This can be done in *QGroundControl*, under the **Vehicle Setup > Actuators** tab.

The multicopter configuration screen looks like this.

![Actuators MC (QGC)](../../assets/config/actuators/qgc_actuators_mc_aux.png)

Note that some settings are hidden unless you select the **Advanced** checkbox in the top right corner.

## Geometry

The geometry section is used to configure any additional geometry-related settings for the selected [airframe](../config/airframe.md).
The UI displays a customised view for the selected type; if there are no configurable options this may display a static image of the frame geometry, or nothing at all.

The screenshot below shows the geometry screen for a multicopter frame, which allows you to select the number of motors, their relative positions on the frame, and their expected spin directions (select "**Direction CCW**" for counter-clockwise motors).
This particular frame also includes an image showing the motor positions, which dynamically updates as the motors settings are changed.

![Geometry MC (QGC)](../../assets/config/actuators/qgc_actuators_mc_geometry.png)

A fixed wing airframe would instead display the parameters that define control surfaces, while a VTOL airframe could display both motors and control surfaces.


### Position Coordinate system

The coordinate system is FRD (in body frame), where the X axis points forward, the Y axis to the right and the Z axis down.

:::note
**Positions are relative to the Center of Gravity of the vehicle, and NOT the Autopilot location!**
:::

![Actuators CG reference diagram](/assets/config/actuators/Quadcopter_Actuators_CG_Reference.png)

### Control Surface direction (Conceptual)

![Control Surface Setup Example](../../assets/config/actuators/control_surfaces_geometry.png)

> Example Control Surface Geometry setup for a Tiltrotor VTOL

:::note
It is extremely important that we decouple the concept of Control Surface, Servo and Motor Tilt directions in Control Allocation from the actual Servo output / connections in the physical vehicle.

That means that the Control Allocation Control Surface & Servo settings are physical vehicle independent. Therefore when we think about the Surface Movements, we imagine the ideal vehicle as shown below that moves actuators in the given direction!
:::

![Control Surface Deflections](../../assets/config/actuators/plane_control_surface_convention.png)

Control surfaces use the following deflection direction convention:

#### Horizontal Control Surface (e.g. Aileron)
> Upwards movement equals Positive deflection

'Pitch UP' control input should command positive deflection to both ailerons

* Example : To pitch in positive direction (pitching skywards), 'Both Ailerons (Right & Left)' need a positive deflection.

'Roll RIGHT' control input should command positive deflection to right aileron and negative deflection to left aileron

* Example : To roll in positive direction (banking to the right), the 'Right Aileron' needs a positive deflection.

#### Vertical Control Surface (e.g. Rudder)
> Rightwards movement equals Positive Deflection

'Yaw RIGHT' control input should command positive deflection.

* Example : To yaw in positive direction (clockwise rotation), conventional rudder airplane needs a positive deflection.

#### Mixed Control Surface (e.g. V-Tail)
> Upwards movement equals Positive deflection

'Pitch UP' control input should command positive deflection to both V-tails

* Example : To pitch in positive direction (pitching upwards),  'Both V-tail surfaces' need a positive deflection.

> Rightwards movement equals Positive Deflection
'Yaw RIGHT' control input should command positive deflection to both V-tails.

* Example : Having a V or A shaped tail in the back, positive deflection in Rightwards direction will Yaw the vehicle to the right.


### Motor Tilt Servos (Conceptual)
![Tilt Servo Geometry Setup Example](../../assets/config/actuators/tilt_servo_geometry_config.png)

> Example Tilt Servo Geometry setup for a Tiltrotor VTOL

Similar to the Control Surfaces, Servos can also rotate the motors themselves! This is often the case in a VTOL like [Tiltrotors](/en/frames_vtol/tiltrotor.md). 

![Tilt Axis](../../assets/config/actuators/tilt_axis.png)

* The reference direction is upwards, indicating that a positive commanded motor thrust will point upwards (negative Z direction).
* Tilting **Front** means the servo tilts towards Front (Positive X direction).
* Tilting **Right** means the servo tilts towards Right (Positive Y direction).
* **Minimum and maximum tilt angles** specify the physical limits in degrees of the tilt at minimum & maximum control.
  :::note
  Negative angles are possible. For example tiltable multirotors have symmetrical limits and one could specify -30 as minimum and 30 degrees as maximum.
  :::
  :::note
  If a motor/tilt points downwards and tilts towards the back it is logically equivalent to a motor pointing upwards and tilting towards the front.
  :::
* **Tilt servos can be used to control torque** on one or more axis (it's possible to only use a subset of the available tilts for a certain torque control):
  * Yaw: the tilts are used to control yaw (generally desired).
    If four or more motors are used, the motors can be used instead.
  * Pitch: typically differential motor thrust is used to control pitch, but some airframes require pitch to be controlled by the tilt servos (Example: [Bicopter](https://www.youtube.com/watch?v=hfss7nCN40A))
* Tiltable motors get assigned to one of the tilt servos in the setup screen.


### Bidirectional Motors

Some vehicles may use bidirectional motors (i.e. motor spins in direction 1 for lower output range and in direction 2 for the upper half).
For example, ground vehicles that want to move forwards and backwards, or VTOL vehicles that have pusher motors that go in either direction.

If bidiectional motors are used, make sure to select the **Reversible** checkbox for those motors (the checkbox is displayed as an "advanced" option).

![Reversible](../../assets/config/actuators/qgc_geometry_reversible.png)

Note that you will need to also ensure that the ESC associated with bidirectional motors is configured appropriately (e.g. 3D mode enabled for DShot ESCs, which can be achieved via [DShot commands](../peripherals/dshot.md#commands)).


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

![](../../assets/config/actuators/identify_motors_button.png)

QGC Supports a feature of identifying the motors by sending the motor command to different output pins and letting you click on the motor to map the Motor to each Output ports.

To use this mode:
1. Setup the Motors Geometry correctly to include all the motors in your vehicle you want to configure
2. Click the 'Identify & Assign Motors' Button
3. Each motor will start spinning. Select the motor that spun up in the GUI.
![](../../assets/config/actuators/identify_motors_in_progress.png)
   * Click 'Spin Motor Again' if you want to check which motor spun again
4. After assigning all motors, it will automatically exit and set the Actuator Outputs settings to map correct motors to different outputs.

:::note
This is only supported for Multirotors currently, as it requires a GUI interface that shows where each motor is located at
:::

### Actuator setup using Slider
![Actuator Testing Slider](../../assets/config/actuators/vtol_tiltrotor_sliders_example.png)

> Slider testing example with a VTOL Tiltrotor setup

Sliders can be used to verify the following:

1. Motors spin at the **minimum command**
2. Motors give **positive thrust** in the expected direction
3. **Control Surface** moves in the direction as defined in the [Control Surface Convention](#control-surface-direction-conceptual)
4. **Motor Tilt Servos** move in the direction as defined in the [Tilt Servo Convention](#motor-tilt-servos-conceptual)

:::note
The Slider has a Safety Feature built in so that even after you toggle the "Enable sliders" switch, if you don't move the slider, it won't send actuator control commands. This is to prevent unwanted action from happening just after enabling the sliders.
:::

More detailed setup directions are described below.

#### Motor setup & testing
:::note
Always remove the propellers from the motor before you do the Actuator testing for Safety!!
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

#### Control Surface setup

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

#### Tilt Servo setup
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
