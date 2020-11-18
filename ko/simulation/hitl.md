# Hardware in the Loop Simulation \(HITL\)

Hardware-in-the-Loop (HITL or HIL) is a simulation mode in which normal PX4 firmware is run on real flight controller hardware. This approach has the benefit of testing most of the actual flight code on the real hardware.

PX4 supports HITL for multicopters (using jMAVSim or Gazebo) and fixed wing (using Gazebo or X-Plane demo/full version).

<a id="compatible_airframe"></a>

## HITL-Compatible Airframes

The current set of compatible airframes vs Simulators is:

| Airframe                                                                                                | `SYS_AUTOSTART` | Gazebo | jMAVSim |
| ------------------------------------------------------------------------------------------------------- | --------------- | ------ | ------- |
| <a href="../airframes/airframe_reference.md#copter_simulation_(copter)_hil_quadcopter_x">HIL Quadcopter X</a>                                                                               | 1001            | Y      | Y       |
| <a href="../airframes/airframe_reference.md#vtol_standard_vtol_hil_standard_vtol_quadplane">HIL Standard VTOL QuadPlane</a>                                                                               | 1002            | Y      |         |
| [Generic Quadrotor x](../airframes/airframe_reference.md#copter_quadrotor_x_generic_quadrotor_x) copter | 4001            | Y      | Y       |
| [DJI Flame Wheel f450](../airframes/airframe_reference.md#copter_quadrotor_x_dji_flame_wheel_f450)      | 4011            | Y      | Y       |

<a id="simulation_environment"></a>

## HITL Simulation Environment

With Hardware-in-the-Loop (HITL) simulation the normal PX4 firmware is run on real hardware. JMAVSim or Gazebo (running on a development computer) are connected to the flight controller hardware via USB/UART. The simulator acts as gateway to share MAVLink data between PX4 and *QGroundControl*.

> **Note** The simulator can also be connected via UDP if the flight controller has networking support and uses a stable, low-latency connection (e.g. a wired Ethernet connection - WiFi is usually not sufficiently reliable). For example, this configuration has been tested with PX4 running on a Raspberry Pi connected via Ethernet to the computer (a startup configuration that includes the command for running jMAVSim can be found [here](https://github.com/PX4/Firmware/blob/master/posix-configs/rpi/px4_hil.config)).

The diagram below shows the simulation environment:
* A HITL configuration is selected (via *QGroundControl*) that doesn't start any real sensors.
* *jMAVSim* or *Gazebo* are connected to the flight controller via USB.
* The simulator is connected to *QGroundControl* via UDP and bridges its MAVLink messages to PX4.
* (Optional - Gazebo only) Gazebo can also connect to an offboard API and bridge MAVLink messages to PX4.
* (Optional) A serial connection can be used to connect Joystick/Gamepad hardware via *QGroundControl*.

![HITL Setup - jMAVSim and Gazebo](../../assets/simulation/px4_hitl_overview_jmavsim_gazebo.png)


## HITL vs SITL

SITL runs on a development computer in a simulated environment, and uses firmware specifically generated for that environment. Other than simulation drivers to provide fake environmental data from the simulator the system behaves normally.

By contrast, HITL runs normal PX4 firmware in "HITL mode", on normal hardware. The simulation data enters the system at a different point than for SITL. Core modules like commander and sensors have HIL modes at startup that bypass some of the normal functionality.

In summary, HITL runs PX4 on the actual hardware using standard firmware, but SITL actually executes more of the standard system code.


## Setting up HITL

### PX4 Configuration

1. Connect the autopilot directly to *QGroundControl* via USB.
1. Enable HITL Mode
   1. Open **Setup > Safety** section.
   1. Enable HITL mode by selecting **Enabled** from the *HITL Enabled* list:

      ![QGroundControl HITL configuration](../../assets/gcs/qgc_hitl_config.png)
1. Select Airframe
   1. Open **Setup > Airframes**
   1. Select a [compatible airframe](#compatible_airframe) you want to test. Then click "Apply and Restart" on top-right of the Airframe Setup page.

      ![Select Airframe](../../assets/gcs/qgc_hil_config.png)
1. Calibrate your RC or Joystick, if needed.
1. Setup UDP
   1. Under the *General* tab of the settings menu, uncheck all *AutoConnect* boxes except for **UDP**.

      ![QGC Auto-connect settings for HITL](../../assets/gcs/qgc_hitl_autoconnect.png)
1. (Optional) Configure Joystick and Failsafe. Set the following [parameters](https://docs.px4.io/en/advanced_config/parameters.html#finding-a-parameter) in order to use a joystick instead of an RC remote control transmitter:
   * [COM_RC_IN_MODE](../advanced/parameter_reference.md#COM_RC_IN_MODE) to "Joystick/No RC Checks". This allows joystick input and disables RC input checks.
   * [NAV_DLL_ACT](../advanced/parameter_reference.md#NAV_DLL_ACT) to "Disabled". This ensures that no RC failsafe actions interfere when not running HITL with a radio control.

   > **Tip** The *QGroundControl User Guide* also has instructions on [Joystick](https://docs.qgroundcontrol.com/en/SetupView/Joystick.html) and [Virtual Joystick](https://docs.qgroundcontrol.com/en/SettingsView/VirtualJoystick.html) setup.

Once configuration is complete, **close** *QGroundControl* and disconnect the flight controller hardware from the computer.

### X-Plane HITL Environment

Follow the appropriate setup steps for your simulator in the following sections.

#### Gazebo

> **Note** Make sure *QGroundControl* is not running!

1. Update the environment variables:
   ```sh
   cd <Firmware_clone>
    make px4_sitl_default gazebo
   ```
1. Open the vehicle model's sdf file (e.g. **Tools/sitl_gazebo/models/iris/iris.sdf**).
1. Under the `mavlink_interface plugin` section, change the `serialEnabled` and `hil_mode` parameters to `true`.

   ![HIL Parameters](../../assets/simulation/gazebo_sdf_model_hil_params.png)

   > **Note** The file iris.sdf is autogenerated. Therefore you need to either keep a copy of your changed file or re-edit it for every build.
1. Replace the `serialDevice` parameter (`/dev/ttyACM0`) if necessary.

   > **Note** The serial device depends on what port is used to connect the vehicle to the computer (this is usually `/dev/ttyACM0`). An easy way to check on Ubuntu is to plug in the autopilot, open up a terminal, and type `dmesg | grep "tty"`. The correct device will be the last one shown.

1. Set up the environment variables:
   ```sh
   source Tools/setup_gazebo.bash $(pwd) $(pwd)/build/px4_sitl_default
   ```
   Run Gazebo in HITL mode sh gazebo Tools/sitl_gazebo/worlds/iris.world
   ```sh
   gazebo Tools/sitl_gazebo/worlds/iris.world
   ```
1. Start *QGroundControl*. It should autoconnect to PX4 and Gazebo.

<a id="jmavsim_hitl_configuration"></a>

#### jMAVSim (Quadrotor only)

> **Note** Make sure *QGroundControl* is not running!

1. Connect the flight controller to the computer and wait for it to boot.
1. Run jMAVSim in HITL mode:
   ```sh
   ./Tools/jmavsim_run.sh -q -s -d /dev/ttyACM0 -b 921600 -r 250
   ```

   > Run jMAVSim in HITL mode (replace the serial port name `/dev/ttyACM0` if necessary - e.g. on Mac OS this would be `/dev/tty.usbmodem1`): sh ./Tools/jmavsim_run.sh -q -d /dev/ttyACM0 -b 921600 -r 250 On Windows (including Cygwin) it would be the COM1 or another port - check the connection in the Windows Device Manager.
1. Start *QGroundControl*. It should autoconnect to PX4 and jMAVSim.


## Fly an Autonomous Mission in HITL

You should be able to use *QGroundControl* to [run missions](../qgc/README.md#planning-missions) and otherwise control the vehicle.
