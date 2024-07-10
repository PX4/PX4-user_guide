# Simulation-In-Hardware (SIH)

<Badge type="tip" text="PX4 v1.9 (MC)" /><Badge type="tip" text="PX4 v1.13 (MC, VTOL, FW)" />

:::warning
This simulator is [community supported and maintained](../simulation/community_supported_simulators.md). It may or may not work with current versions of PX4 (known to work in PX4 v1.14).

See [Toolchain Installation](../dev_setup/dev_env.md) for information about the environments and tools supported by the core development team.
:::

Simulation-In-Hardware (SIH) is an alternative to [Hardware In The Loop simulation (HITL)](../simulation/hitl.md) for quadrotors, fixed-wing vehicles (airplane), and VTOL tailsitters.

SIH can be used by new PX4 users to get familiar with PX4 and the different modes and features, and of course to learn to fly a vehicle using an RC controller in simulation, which is not possible using SITL.

## Overview

With SIH the whole simulation is running on embedded hardware: the controller, the state estimator, and the simulator. The Desktop computer is only used to display the virtual vehicle.

![Simulator MAVLink API](../../assets/diagrams/SIH_diagram.png)

### Compatibility

- SIH is compatible with all PX4 supported boards except those based on FMUv2.
- SIH for quadrotor is supported from PX4 v1.9.
- SIH for fixed-wing (airplane) and VTOL tailsitter are supported from PX4 v1.13.
- SIH as SITL (without hardware) from PX4 v1.14.

### Benefits

SIH provides several benefits over HITL:

- It ensures synchronous timing by avoiding the bidirectional connection to the computer. As a result the user does not need such a powerful desktop computer.
- The whole simulation remains inside the PX4 environment. Developers who are familiar with PX4 can more easily incorporate their own mathematical model into the simulator. They can, for instance, modify the aerodynamic model, or noise level of the sensors, or even add a sensor to be simulated.
- The physical parameters representing the vehicle (such as mass, inertia, and maximum thrust force) can easily be modified from the [SIH parameters](../advanced_config/parameter_reference.md#simulation-in-hardware).

## Requirements

To run the SIH, you will need a:

- [Flight controller](../flight_controller/index.md), such as a Pixhawk-series board
- [Manual controller](../getting_started/px4_basic_concepts.md#manual-control): either a [radio control system](../getting_started/rc_transmitter_receiver.md) or a [joystick](../config/joystick.md).
- QGroundControl for flying the vehicle via GCS.
- Development computer for visualizing the virtual vehicle (optional).

From PX4 v1.14 you can run SIH "as SITL", in which case a flight controller is not required.

## Starting SIH

To set up/start SIH:

1. Connect the flight controller to the desktop computer with a USB cable.
1. Open QGroundControl and wait for the flight controller too boot and connect.
1. Open [Vehicle Setup > Airframe](../config/airframe.md) then select the desired frame:
   - [SIH Quadcopter X](../airframes/airframe_reference.md#copter_simulation_sih_quadcopter_x)
   - [SIH plane AERT](../airframes/airframe_reference.md#plane_simulation_sih_plane_aert)
   - [SIH Tailsitter Duo](../airframes/airframe_reference.md#vtol_simulation_sih_tailsitter_duo)

The autopilot will then reboot. The `sih` module is started on reboot, and the vehicle should be displayed on the ground control station map.

:::warning
The airplane needs to takeoff in manual mode at full throttle.
Also, if the airplane crashes the state estimator might lose its fix.
:::

## Display/Visualisation (optional)

The SIH-simulated vehicle can be displayed using [jMAVSim](../sim_jmavsim/index.md) as a visualiser.

::: tip SIH
does not _need_ a visualiser — you can connect with QGroundControl and fly the vehicle without one.
:::

To display the simulated vehicle:

1. Close _QGroundControl_ (if open).
1. Unplug and replug the flight controller (allow a few seconds for it to boot).
1. Start jMAVSim by calling the script **jmavsim_run.sh** from a terminal:

   ```sh
   ./Tools/simulation/jmavsim/jmavsim_run.sh -q -d /dev/ttyACM0 -b 2000000 -o
   ```

   where the flags are:

   - `-q` to allow the communication to _QGroundControl_ (optional).
   - `-d` to start the serial device `/dev/ttyACM0` on Linux. On macOS this would be `/dev/tty.usbmodem1`.
   - `-b` to set the serial baud rate to `2000000`.
   - `-o` to start jMAVSim in _display Only_ mode (i.e. the physical engine is turned off and jMAVSim only displays the trajectory given by the SIH in real-time).
   - add a flag `-a` to display an aircraft or `-t` to display a tailsitter. If this flag is not present a quadrotor will be displayed by default.

1. After few seconds, _QGroundControl_ can be opened again.

At this point, the system can be armed and flown. The vehicle can be observed moving in jMAVSim, and on the QGC _Fly_ view.

## SIH as SITL (no FC)

SIH can be run as SITL (Software-In-The-Loop) from v1.14. What this means is that the simulation code is executed on the laptop/computer instead of a flight controller, similar to Gazebo or jMAVSim. In this case you don't need the flight controller hardware.

To run SIH as SITL:

1. Install the [PX4 Development toolchain](../dev_setup/dev_env.md).
1. Run the appropriate make command for each vehicle type (at the root of the PX4-Autopilot repository):

   - quadrotor:

     ```sh
     make px4_sitl sihsim_quadx
     ```

   - Fixed-wing (plane):

     ```sh
     make px4_sitl sihsim_airplane
     ```

   - XVert VTOL tailsitter:

     ```sh
     make px4_sitl sihsim_xvert
     ```

### Change Simulation Speed

SITL allows the simulation to be run faster than real time. To run the airplane simulation 10 times faster than real time, run the command:

```sh
PX4_SIM_SPEED_FACTOR=10 make px4_sitl sihsim_airplane
```

To display the vehicle in jMAVSim during SITL mode, enter the following command in another terminal:

```sh
./Tools/simulation/jmavsim/jmavsim_run.sh -p 19410 -u -q -o
```

- add a flag `-a` to display an aircraft or `-t` to display a tailsitter. If this flag is not present a quadrotor will be displayed by default.

### Set Custom Takeoff Location

The takeoff location in SIH on SITL can be set using environment variables. This will override the default takeoff location.

The variables to set are: `PX4_HOME_LAT`, `PX4_HOME_LON`, and `PX4_HOME_ALT`.

For example:

```sh
export PX4_HOME_LAT=28.452386
export PX4_HOME_LON=-13.867138
export PX4_HOME_ALT=28.5
make px4_sitl sihsim_quadx
```

## Dynamic Models

The dynamic models for the various vehicles are:

- Quadrotor: [pdf report](https://github.com/PX4/PX4-user_guide/raw/main/assets/simulation/SIH_dynamic_model.pdf).
- Fixed-wing: Inspired by the PhD thesis: "Dynamics modeling of agile fixed-wing unmanned aerial vehicles." Khan, Waqas, supervised by Nahon, Meyer, McGill University, PhD thesis, 2016.
- Tailsitter: Inspired by the master's thesis: "Modeling and control of a flying wing tailsitter unmanned aerial vehicle." Chiappinelli, Romain, supervised by Nahon, Meyer, McGill University, Masters thesis, 2018.

## Video

@[youtube](https://youtu.be/PzIpSCRD8Jo)

## Credits

SIH was originally developed by Coriolis g Corporation. The airplane model and tailsitter models were added by Altitude R&D inc. Both are Canadian companies:

- Coriolis g developped a new type of Vertical Takeoff and Landing (VTOL) vehicles based on passive coupling systems;
- [Altitude R&D](https://www.altitude-rd.com/) is specialized in dynamics, control, and real-time simulation (today relocated in Zurich).

The simulator is released for free under BSD license.
