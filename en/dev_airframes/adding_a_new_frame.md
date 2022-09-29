# Adding a Frame Configuration

PX4 [frame configuration files](#configuration-file-overview) are shell scripts that set up some (or all) of the parameters, controllers and apps needed for a particular vehicle frame, such as a quadcopter, ground vehicle, or boat.
These scripts are executed when the corresponding airframe is is selected and applied in QGroundControl during [AirFrame](../config/airframe.md) configuration.

The configuration files for NuttX targets are stored in the [ROMFS/px4fmu_common/init.d](https://github.com/PX4/PX4-Autopilot/tree/main/ROMFS/px4fmu_common/init.d) folder (configuration files for POSIX simulators are stored in [ROMFS/px4fmu_common/init.d-posix](https://github.com/PX4/PX4-Autopilot/tree/main/ROMFS/px4fmu_common/init.d-posix/airframes)).
The folder contains both complete and full configurations for specific vehicles, and partial "generic configurations" for different vehicle types.
The generic configurations are often used as the starting point for creating new configuration files.

In addition, a frame configuration file can also be loaded from an SD card, or you can _customize_ the current existing firmware configuration using text files on the SD card
Both cases are detailed on the [System Startup](../concept/system_startup.md) page.

## How to add a Frame Configuration

When developing a new frame it is usual to select an appropriate "generic configuration" in QGC, such as _Generic Quadcopter_, configure the geometry/outputs, tune the vehicle.
Once the vehicle is ready you can create a new configuration file that appends the additional parameters to the information in the original generic configuration.

:::note
The [`param show-for-airframe`](../modules/modules_command.md#param) console command can be used to list the parameter difference compared to the original generic airfame.
:::

To create a new frame configuration:

1. Create a new config file in the [init.d/airframes](https://github.com/PX4/PX4-Autopilot/tree/main/ROMFS/px4fmu_common/init.d/airframes) folder.
   Give it a short descriptive filename and prepend the filename with an unused autostart ID.

1. Add the name of the new frame config file to the [CMakeLists.txt](https://github.com/PX4/PX4-Autopilot/blob/main/ROMFS/px4fmu_common/init.d/airframes/CMakeLists.txt) in the relevant section for the type of vehicle, then [build and upload](../dev_setup/building_px4.md) the software.

:::note
To determine which parameters/values need to be set in the configuration file, you can first assign a generic airframe and tune the vehicle, and then use [`param show-for-airframe`](../modules/modules_command.md#param) to list the parameters that changed.
:::

## Configuration File Overview

The configuration file consists of several main blocks:

* Documentation (used in the [Airframes Reference](../airframes/airframe_reference.md) and *QGroundControl*).
* Airframe-specific parameter settings, including [tuning gains](#tuning-gains)
* The controllers and apps it should start, e.g. multicopter or fixed wing controllers, land detectors etc.
* The physical configuration of the system (e.g. a plane, wing or multicopter) and geometry using [control allocation](../concept/control_allocation.md) parameters.

These aspects are mostly independent, which means that many configurations share the same physical layout of the airframe, start the same applications and differ most in their tuning gains.

:::note
New frame configuration files are only automatically added to the build system after a clean build (run `make clean`).
:::

### Example - Generic Quadcopter Frame Config

```
#!/bin/sh
#
# @name Generic Quadcopter
#
# @type Quadrotor x
# @class Copter
#
# @maintainer Lorenz Meier <lorenz@px4.io>
#

. ${R}etc/init.d/rc.mc_defaults

param set-default CA_ROTOR_COUNT 4
param set-default CA_ROTOR0_PX 0.15
param set-default CA_ROTOR0_PY 0.15
param set-default CA_ROTOR1_PX -0.15
param set-default CA_ROTOR1_PY -0.15
param set-default CA_ROTOR2_PX 0.15
param set-default CA_ROTOR2_PY -0.15
param set-default CA_ROTOR2_KM -0.05
param set-default CA_ROTOR3_PX -0.15
param set-default CA_ROTOR3_PY 0.15
param set-default CA_ROTOR3_KM -0.05
```

### Example - Babyshark VTOL Complete Vehicle

A typical configuration file is shown below.
This is the configuration for the Baby Shark [Standard VTOL](../frames_vtol/standardvtol.md) ([original file here](https://github.com/PX4/PX4-Autopilot/blob/main/ROMFS/px4fmu_common/init.d/airframes/13014_vtol_babyshark)).

The first line is a shebang, which tells the NuttX operating system (on which PX4 runs) that the configuration file is an executable shell script.
This is followed by the frame documentation.

The shebang is followed by the frame documentation, which is used in the [Airframes Reference](../airframes/airframe_reference.md) and *QGroundControl*.

The name and 

`@name` is the name of the frame, `@class` are used to 
This is used in 




This is used in the [Airframes Reference](../airframes/airframe_reference.md) and *QGroundControl*.


```bash
#!/bin/sh
#
# @name BabyShark VTOL
#
# @type Standard VTOL
# @class VTOL
#
# @maintainer Silvan Fuhrer <silvan@auterion.com>
#
# @output Motor1 motor 1
# @output Motor2 motor 2
# @output Motor3 motor 3
# @output Motor4 motor 4
# @output Motor5 Pusher motor
# @output Servo1 Ailerons
# @output Servo2 A-tail left
# @output Servo3 A-tail right
#
# @board px4_fmu-v2 exclude
# @board bitcraze_crazyflie exclude
# @board holybro_kakutef7 exclude
#
```

The next section specifies vehicle-specific parameters, including [tuning gains](#tuning-gains):

```bash
. ${R}etc/init.d/rc.vtol_defaults

param set-default MAV_TYPE 22

param set-default BAT1_N_CELLS 6

param set-default FW_AIRSPD_MAX 30
param set-default FW_AIRSPD_MIN 19
param set-default FW_AIRSPD_TRIM 23
param set-default FW_L1_R_SLEW_MAX 40
param set-default FW_PSP_OFF 3
param set-default FW_P_LIM_MAX 18
param set-default FW_P_LIM_MIN -25
param set-default FW_RLL_TO_YAW_FF 0.1
param set-default FW_RR_P 0.08
param set-default FW_R_LIM 45
param set-default FW_R_RMAX 50
param set-default FW_THR_TRIM 0.65
param set-default FW_THR_MIN 0.3
param set-default FW_THR_SLEW_MAX 0.6
param set-default FW_T_HRATE_FF 0
param set-default FW_T_SINK_MAX 15
param set-default FW_T_SINK_MIN 3
param set-default FW_YR_P 0.15

param set-default IMU_DGYRO_CUTOFF 15
param set-default MC_PITCHRATE_MAX 60
param set-default MC_ROLLRATE_MAX 60
param set-default MC_YAWRATE_I 0.15
param set-default MC_YAWRATE_MAX 40
param set-default MC_YAWRATE_P 0.3

param set-default MPC_ACC_DOWN_MAX 2
param set-default MPC_ACC_HOR_MAX 2
param set-default MPC_ACC_UP_MAX 3
param set-default MC_AIRMODE 1
param set-default MPC_JERK_AUTO 4
param set-default MPC_LAND_SPEED 1
param set-default MPC_MAN_TILT_MAX 25
param set-default MPC_MAN_Y_MAX 40
param set-default COM_SPOOLUP_TIME 1.5
param set-default MPC_THR_HOVER 0.45
param set-default MPC_TILTMAX_AIR 25
param set-default MPC_TKO_RAMP_T 1.8
param set-default MPC_TKO_SPEED 1
param set-default MPC_VEL_MANUAL 3
param set-default MPC_XY_CRUISE 3
param set-default MPC_XY_VEL_MAX 3.5
param set-default MPC_YAWRAUTO_MAX 40
param set-default MPC_Z_VEL_MAX_UP 2

param set-default NAV_ACC_RAD 3

param set-default PWM_MAIN_DIS3 1000
param set-default PWM_MAIN_MIN3 1120

param set-default SENS_BOARD_ROT 4

param set-default VT_ARSP_BLEND 10
param set-default VT_ARSP_TRANS 21
param set-default VT_B_DEC_MSS 1.5
param set-default VT_B_TRANS_DUR 12
param set-default VT_ELEV_MC_LOCK 0
param set-default VT_FWD_THRUST_SC 1.2
param set-default VT_F_TR_OL_TM 8
param set-default VT_PSHER_RMP_DT 2
param set-default VT_TRANS_MIN_TM 4
param set-default VT_TYPE 2
```

```bash
param set-default CA_AIRFRAME 2
param set-default CA_ROTOR_COUNT 5
param set-default CA_ROTOR0_PX 1
param set-default CA_ROTOR0_PY 1
param set-default CA_ROTOR1_PX -1
param set-default CA_ROTOR1_PY -1
param set-default CA_ROTOR2_PX 1
param set-default CA_ROTOR2_PY -1
param set-default CA_ROTOR2_KM -0.05
param set-default CA_ROTOR3_PX -1
param set-default CA_ROTOR3_PY 1
param set-default CA_ROTOR3_KM -0.05
param set-default CA_ROTOR4_AX 1.0
param set-default CA_ROTOR4_AZ 0.0

param set-default CA_SV_CS_COUNT 3
param set-default CA_SV_CS0_TYPE 15
param set-default CA_SV_CS0_TRQ_R 1.0
param set-default CA_SV_CS1_TRQ_P 0.5000
param set-default CA_SV_CS1_TRQ_R 0.0000
param set-default CA_SV_CS1_TRQ_Y -0.5000
param set-default CA_SV_CS1_TYPE 13
param set-default CA_SV_CS2_TRQ_P 0.5000
param set-default CA_SV_CS2_TRQ_Y 0.5000
param set-default CA_SV_CS2_TYPE 14

param set-default PWM_MAIN_FUNC1 201
param set-default PWM_MAIN_FUNC2 202
param set-default PWM_MAIN_FUNC3 105
param set-default PWM_MAIN_FUNC4 203
param set-default PWM_MAIN_FUNC5 101
param set-default PWM_MAIN_FUNC6 102
param set-default PWM_MAIN_FUNC7 103
param set-default PWM_MAIN_FUNC8 104

param set-default PWM_MAIN_TIM0 50
param set-default PWM_MAIN_DIS1 1500
param set-default PWM_MAIN_DIS2 1500
param set-default PWM_MAIN_DIS4 1500
```

Set frame type ([MAV_TYPE](https://mavlink.io/en/messages/common.html#MAV_TYPE)):

```bash
# Configure this as plane
set MAV_TYPE 1
```

Set the [mixer](#mixer-file) to use (if [control allocation](../concept/control_allocation.md) is not enabled):
```bash
# Set mixer
set MIXER wingwing
```

Configure PWM outputs (specify the outputs to drive/activate, and the levels).
```bash
set PWM_OUT 4
```

:::warning
If you want to reverse a channel, never do this on your RC transmitter or with e.g `RC1_REV`.
The channels are only reversed when flying in manual mode, when you switch in an autopilot flight mode, the channels output will still be wrong (it only inverts your RC signal).
Thus for a correct channel assignment change either your PWM signals with `PWM_MAIN_REV1` (e.g. for channel one) or change the signs of the output scaling in the corresponding mixer (see below).
:::


### Mixer File



## Adding a New Airframe Group

Airframe "groups" are used to group similar airframes for selection in [QGroundControl](https://docs.qgroundcontrol.com/master/en/SetupView/Airframe.html) and in the [Airframe Reference](../airframes/airframe_reference.md).
Every group has a name, and an associated svg image which shows the common geometry, number of motors, and direction of motor rotation for the grouped airframes.

The airframe metadata files used by *QGroundControl* and the documentation source code are generated from the airframe description, via a script, using the build command: `make airframe_metadata`

For a new frame belonging to an existing group, you don't need to do anything more than provide documentation in the airframe description located at
[ROMFS/px4fmu_common/init.d](https://github.com/PX4/PX4-Autopilot/tree/main/ROMFS/px4fmu_common/init.d).

If the airframe is for a **new group** you additionally need to:
1. Add the svg image for the group into user guide documentation (if no image is provided a placeholder image is displayed): [assets/airframes/types](https://github.com/PX4/PX4-user_guide/tree/master/assets/airframes/types)
1. Add a mapping between the new group name and image filename in the [srcparser.py](https://github.com/PX4/PX4-Autopilot/blob/main/Tools/px4airframes/srcparser.py) method `GetImageName()` (follow the pattern below): 
   ```python
   def GetImageName(self):
       """
       Get parameter group image base name (w/o extension)
       """
       if (self.name == "Standard Plane"):
           return "Plane"
       elif (self.name == "Flying Wing"):
           return "FlyingWing"
        ...
    ...
       return "AirframeUnknown"
   ```
1. Update *QGroundControl*:
   * Add the svg image for the group into: [src/AutopilotPlugins/Common/images](https://github.com/mavlink/qgroundcontrol/tree/master/src/AutoPilotPlugins/Common/Images)
   * Add reference to the svg image into [qgcimages.qrc](https://github.com/mavlink/qgroundcontrol/blob/master/qgcimages.qrc), following the pattern below:
     ```
     <qresource prefix="/qmlimages">
        ...
        <file alias="Airframe/AirframeSimulation">src/AutoPilotPlugins/Common/Images/AirframeSimulation.svg</file>
        <file alias="Airframe/AirframeUnknown">src/AutoPilotPlugins/Common/Images/AirframeUnknown.svg</file>
        <file alias="Airframe/Boat">src/AutoPilotPlugins/Common/Images/Boat.svg</file>
        <file alias="Airframe/FlyingWing">src/AutoPilotPlugins/Common/Images/FlyingWing.svg</file>
        ...
     ```
   :::note
   The remaining airframe metadata should be automatically included in the firmware (once **srcparser.py** is updated).
   :::


## Tuning Gains

The following topics explain how to tune the parameters that will be specified in the config file:

* [Autotuning](../config/autotune.md)
* [Multicopter PID Tuning Guide](../config_mc/pid_tuning_guide_multicopter.md)
* [Fixed Wing PID Tuning Guide](../config_fw/pid_tuning_guide_fixedwing.md)
* [VTOL Configuration](../config_vtol/README.md)


## Add Frame to QGroundControl

To make a new airframe available for section in the *QGroundControl* [airframe configuration](../config/airframe.md):

1. Make a clean build (e.g. by running `make clean` and then `make px4_fmu-v5_default`)
1. Open QGC and select **Custom firmware file...** as shown below:

  ![QGC flash custom firmware](../../assets/gcs/qgc_flash_custom_firmware.png)
  
  You will be asked to choose the **.px4** firmware file to flash (this file is a zipped JSON file and contains the airframe metadata).
1. Navigate to the build folder and select the firmware file (e.g. **PX4-Autopilot/build/px4_fmu-v5_default/px4_fmu-v5_default.px4**).
1. Press **OK** to start flashing the firmware.
1. Restart *QGroundControl*.

The new frame will then be available for selection in *QGroundControl*.
