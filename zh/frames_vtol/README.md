# 垂直起降机体

PX4 uses the term VTOL to refer to vehicles that support both forward flight like a fixed-wing aircraft ("airplane") and vertical take off and landing like a helicopter or multicopter.

![Vertical Technologies: Deltaquad QuadPlane VTOL](../../assets/airframes/vtol/vertical_technologies_deltaquad/hero.jpg)

VTOL vehicles offer the benefits of both multicopter and fixed-wing flight:

- **Vertical takeoff and landing:** Even inexperienced pilots can take off and land virtually anywhere.
- **Fast and efficient fixed wing flight:** Faster, further, and longer missions, carrying heavier payloads.
- **Hovering:** Steady platform for photography, structure scans etc.

This section describes the VTOL types and configurations supported by PX4, and provides high-level directions for assembly, configuration, and flight.

## VTOL Types

PX4 supports the three most important/main VTOL types.

<div class="grid_wrapper three_column">
  <div class="grid_item">
    <div class="grid_item_heading"><a href="tailsitter.html" title="Tailsitter"><big>Tailsitter</big></a></div>
    <div class="grid_text">
    Rotors permanently in fixed wing-position.
    Takes off and lands on tail. Whole vehicle tilts forward to enter forward flight.
    <img src="../../assets/airframes/vtol/wingtraone/hero.jpg" title="wingtraone" />
    <ul>
      <li>Simple and robust</li>
      <li>Minimal set of actuators</li>
      <li>Can be hard to control, particularly in wind</li>
      <li>Tradeoff between efficiency in hover and forward flight, as same actuators are used</li>
    </ul>
    </div>
  </div>
<div class="grid_item">
  <div class="grid_item_heading"><a href="tiltrotor.html" title="Tiltrotor"><big>Tiltrotor</big></a></div>
  Rotors swivel 90 degrees to transition from multicopter to forward flight orientation.
  Takes off and lands on belly.
  <div class="grid_text">
  <img src="../../assets/airframes/vtol/eflite_convergence_pixfalcon/hero.jpg" title="Eflight Confvergence" />
  <ul>
    <li>Additional actuators for motor tilts</li>
    <li>Mechanically complex tilting mechanism</li>
    <li>Easier to control in hover than tailsitters due to more control authority</li>
  </ul>
  </div>
</div>
<div class="grid_item">
  <div class="grid_item_heading"><a href="standardvtol.html" title="Standard VTOL"><big>Standard VTOL</big></a></div>
  <div class="grid_text">
  Separate rotors/flight controls for multicopter and forward flight. Takes off and lands on belly.
  <img src="../../assets/airframes/vtol/vertical_technologies_deltaquad/hero_small.png" title="Vertical Technologies: Deltaquad" />
  <ul>
    <li>Additional weight from separate hover/forward flight propulsion systems</li>
    <li>Easiest to control due to dedicated hover/forward flight actuators</li>
    <li>Can hover</li>
    <li>Fuel engines for forward flight propulsion can be used</li>
  </ul>
  </div>
 </div>
</div>

In general, as mechanical complexity increases the vehicles are easier to fly, but the cost and weight increase. Each type has advantages and disadvantages, and there are successful commercial ventures based on all of them.

Within each of the main "types" above, there are many possible variations—for example, the number of motors, motor geometry, flight surfaces, etc. PX4 provides *airframe configurations* for many of the more common vehicle setups. The supported set is listed in [Airframes Reference > VTOL](../airframes/airframe_reference.md#vtol).

:::note

- If the vehicle setup you need is not supported you may need to [Add an Airframe](../dev_airframes/adding_a_new_frame.md) (requires some [PX4 Development](../development/development.md) expertise).
- The VTOL codebase is the same codebase as for all other airframes and just adds additional control logic, in particular for transitions.
:::

## Flying and Flight Modes

A VTOL aircraft can fly as either a multicopter or as fixed-wing vehicle. Multicopter mode is mainly used for take off and landing while the fixed wing mode is used for efficient travel and/or mission execution.

The flight modes for VTOL vehicles are the same as for [multicopter](../getting_started/flight_modes.md#mc_flight_modes) when flying in MC mode and [fixed-wing](../getting_started/flight_modes.md#fw_flight_modes) when flying in FW mode.

The transition between modes is initiated either by the pilot using an RC switch or automatically by PX4 when needed in missions or other auto modes.

## Assembly

:::note
For information about commercial and kit VTOL vehicles see: [Complete Vehicles](../complete_vehicles/README.md)
:::

PX4 controlled vehicles generally share the same core components: a flight controller connected to a power system, GPS, external compass (highly recommended), radio control system (optional) and/or telemetry radio system (optional), and airspeed sensor (highly recommended for VTOL vehicles).

The flight controller outputs are connected to the vehicle motor ESCs and/or flight control servos and actuators, which are separately powered.

The mapping between flight controller outputs and specific controls/motors depends on the vehicle frame used, and is specified in the [Airframes Reference > VTOL](../airframes/airframe_reference.md#vtol).

Assembly information is covered in several sections:

- [Basic Assembly](../assembly/README.md) contains topics shows the setup of core components for a number of popular [flight controllers](../flight_controller/README.md). Flight controllers for which we do not have guides are usually set up in much the same way (and almost always include similar setup guides).
- [Peripherals](../peripherals/README.md) contains information about other peripherals, including [Airspeed Sensors](../sensor/airspeed.md).
- [Airframes Reference > VTOL](../airframes/airframe_reference.md#vtol) explains which flight controller outputs must be connected to different flight controls for each airframe configuration: 
  - Select the configuration for your vehicle if one exists, as this will have been pre-tuned well enough to fly (may only require fine tuning).
  - Otherwise select a "Generic Airframe" that matches your vehicle.

In addition, build logs showing how others have set up different types of vehicles are provided as sub topics. For example see [FunCub QuadPlane](../frames_vtol/vtol_quadplane_fun_cub_vtol_pixhawk.md).

## Configuration

VTOL configuration is covered in a number of sections:

- [Basic Configuration](../config/README.md) - Configuration that is common to all vehicle types (sensors, safety systems, batteries etc).
- [VTOL Specific Configuration](../config_vtol/README.md)
- [Peripheral Hardware](../peripherals/README.md) - Configuration for optional hardware and sensors.
- [Advanced Configuration](../advanced_config/README.md): Additional configuration covering factory tuning and advanced and optional configuration.

## Videos

### Educational

VTOL Control & Airspeed Fault Detection (PX4 Developer Summit 2019)

@[youtube](https://youtu.be/37BIBAzD6fE) <!-- 20190704 -->

### Tailsitter

[UAV Works VALAQ Patrol Tailsitter](https://www.valaqpatrol.com/tech-data/)

@[youtube](https://youtu.be/pWt6uoqpPIw)

[TBS Caipiroshka](../frames_vtol/vtol_tailsitter_caipiroshka_pixracer.md)

@[youtube](https://www.youtube.com/watch?v=acG0aTuf3f8&vq=hd720)

### Tiltrotor

[Convergence Tiltrotor](../frames_vtol/vtol_tiltrotor_eflite_convergence_pixfalcon.md)

@[youtube](https://youtu.be/E61P2f2WPNU)

### QuadPlane VTOL

[FunCub QuadPlane](../frames_vtol/vtol_quadplane_fun_cub_vtol_pixhawk.md)

@[youtube](https://www.youtube.com/watch?v=4K8yaa6A0ks&vq=hd720)

[Falcon Vertigo QuadPlane](../frames_vtol/vtol_quadplane_falcon_vertigo_hybrid_rtf_dropix.md)

@[youtube](https://youtu.be/h7OHTigtU0s)

[Ranger QuadPlane](../frames_vtol/vtol_quadplane_volantex_ranger_ex_pixhawk.md)

@[youtube](https://www.youtube.com/watch?v=7tGXkW6d3sA&vq=hd720)