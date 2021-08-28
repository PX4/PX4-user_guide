# VTOL 기체

PX4는 고정익의 전방 비행과 멀티콥터의 수직 이착륙을 기능을 모두 지원하는 차량을 지칭하는 VTOL이라는 용어를 사용합니다.

![Vertical Technologies: Deltaquad QuadPlane VTOL](../../assets/airframes/vtol/vertical_technologies_deltaquad/hero.jpg)

VTOL은 멀티콥터와 고정익의 장점을 모두 가지고 있습니다.

- **수직 이착륙:** 능숙한 조종사 아니어도 웬만한 장소에서 이착륙이 어렵지 않습니다.
- **빠르고 효율적인 고정익 비행:** 더 빠르고, 더 멀리, 더 긴 임무를 수행하고 더 무거운 화물들을 운반합니다.
- **호버링:** 사진, 구조 스캔 등을 위한 안정적인 플랫폼

PX4가 지원하는 VTOL 유형, 조립, 구성 및 비행 방법에 대하여 설명합니다.

## VTOL 유형

PX4는 세 가지 중요한 VTOL 유형을 지원합니다.

<div class="grid_wrapper three_column">
  <div class="grid_item">
    <div class="grid_item_heading"><a href="tailsitter.html" title="Tailsitter"><big>테일시터</big></a></div>
    <div class="grid_text">
    고정익 위치에 로터가 고정됩니다.
    이륙하고 꼬리로 착륙합니다. 전체 차량이 앞으로 기울어져 전진 비행으로 전환합니다.
    <img src="../../assets/airframes/vtol/wingtraone/hero.jpg" title="wingtraone" />
    <ul>
      <li>간단하고 견고함.</li>
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
- [Peripheral Hardware](/peripherals/README.md) - Configuration for optional hardware and sensors.
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