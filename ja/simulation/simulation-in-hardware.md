---
canonicalUrl: https://docs.px4.io/main/ja/simulation/simulation-in-hardware
---

# Simulation-In-Hardware (SIH)

Simulation-In-Hardware (SIH) is an alternative to [Hardware In The Loop simulation (HITL)](../simulation/hitl.md) for a quadrotor. In this setup, everything is running on embedded hardware - the controller, the state estimator, and the simulator. The Desktop computer is only used to display the virtual vehicle.

![Simulator MAVLink API](../../assets/diagrams/SIH_diagram.png)

The SIH provides two benefits over the HITL:
- It ensures synchronous timing by avoiding the bidirectional connection to the computer. As a result the user does not need such a powerful desktop computer.

- The whole simulation remains inside the PX4 environment. Developers who are familiar with PX4 can more easily incorporate their own mathematical model into the simulator. They can, for instance, modify the aerodynamic model, or noise level of the sensors, or even add a sensor to be simulated.

The SIH can be used by new PX4 users to get familiar with PX4 and the different modes and features, and of course to learn to fly a quadrotor with the real RC controller.

The dynamic model is described in this [pdf report](https://github.com/PX4/Devguide/raw/master/assets/simulation/SIH_dynamic_model.pdf).

Furthermore, the physical parameters representing the vehicle (such as mass, inertia, and maximum thrust force) can easily be modified from the [SIH parameters](../advanced_config/parameter_reference.md#simulation-in-hardware).

## Requirements

To run the SIH, you will need a [flight controller hardware](../flight_controller/README.md) (e.g. a Pixhawk-series board). If you are planning to use a [radio control transmitter and receiver pair](../getting_started/rc_transmitter_receiver.md) you should have that too. Alternatively, using *QGroundControl*, a [joystick](https://docs.qgroundcontrol.com/en/SetupView/Joystick.html) can be used to emulate a radio control system.

The SIH is compatible with all Pixhawk-series boards except those based on FMUv2. It is available on the PX4-Autopilot master branch and release versions v1.9.0 and above.

## Setting up SIH

Running the SIH is as easy as selecting an airframe. Plug the autopilot to the desktop computer with a USB cable, let it boot, then using a ground control station select the [SIH airframe](../airframes/airframe_reference.md#simulation-copter). The autopilot will then reboot.

When the SIH airframe is selected, the SIH module starts by itself, the vehicle should be displayed on the ground control station map.

## Setting up the Display

The simulated quadrotor can be displayed in jMAVSim from PX4 v1.11.

1. Close *QGroundControl* (if opened).
1. Unplug and replug the hardware autopilot (allow a few seconds for it to boot).
1. Start jMAVSim by calling the script **jmavsim_run.sh** from a terminal:
   ```
   ./Tools/jmavsim_run.sh -q -d /dev/ttyACM0 -b 2000000 -r 250 -o
   ```
   where the flags are
   - `-q` to allow the communication to *QGroundControl* (optional).
   - `-d` to start the serial device `/dev/ttyACM0` on Linux. On macOS this would be `/dev/tty.usbmodem1`.
   - `-b` to set the serial baud rate to `2000000`.
   - `-r` to set the refresh rate to `250` Hz (optional).
   - `-o` to start jMAVSim in *display Only* mode (i.e. the physical engine is turned off and jMAVSim only displays the trajectory given by the SIH in real-time).
1. After few seconds, *QGroundControl* can be opened again.

At this point, the system can be armed and flown. The vehicle can be observed moving in jMAVSim, and on the QGC __Fly__ view.


## Credits

The SIH was developed by Coriolis g Corporation, a Canadian company developing a new type of Vertical Takeoff and Landing (VTOL) Unmanned Aerial Vehicles (UAV) based on passive coupling systems.

Specialized in dynamics, control, and real-time simulation, they provide the SIH as a simple simulator for quadrotors released for free under BSD license.

Discover their current platform at [www.vogi-vtol.com](http://www.vogi-vtol.com/).
