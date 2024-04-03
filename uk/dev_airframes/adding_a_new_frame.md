# Adding a Frame Configuration

PX4 [файли конфігурації фреймів](#configuration-file-overview) - це скрипти оболонки, які встановлюють деякі (або всі) з параметрів, контролери та додатки необхідні для певної системи транспортного засобу, наприклад, квадрокоптер, наземний транспорт або човен. Ці сценарії виконуються, коли відповідна [конфігурація рами обрана та застосована](../config/airframe.md) в _QGroundControl_.

Файли конфігурації, які компілюються в прошивку для цілей NuttX, розташовані в папці [ROMFS/px4fmu_common/init.d](https://github.com/PX4/PX4-Autopilot/tree/main/ROMFS/px4fmu_common/init.d) (файли конфігурації для POSIX симуляторів зберігаються в [ROMFS/px4fmu_common/init.d-posix](https://github.com/PX4/PX4-Autopilot/tree/main/ROMFS/px4fmu_common/init.d-posix/airframes)). Папка містить як повні конфігурації для конкретних транспортних засобів, так і часткові "загальні конфігурації" для різних типів транспортних засобів. Загальні конфігурації часто використовуються як вихідна точка для створення нових файлів конфігурації.

Додатково, файл конфігурації рами також може бути завантажений з SD-карти.

:::note
Ви також можете "налаштувати" поточну конфігурацію рами, використовуючи текстові файли на SD-карті. Це описано на сторінці [Початок роботи системи > Налаштування запуску системи](../concept/system_startup.md#customizing-the-system-startup).
:::

:::note
Щоб визначити, які параметри/значення потрібно встановити в конфігураційному файлі, спочатку визначте загальний тип літального апарату та налаштуйте транспортний засіб, а потім використовуйте [`param show-for-airframe`](../modules/modules_command.md#param) для переліку параметрів, які були змінені.
:::

## Developing a Frame Configuration

The recommended process for developing a new frame configuration is:

1. Start by selecting an appropriate "generic configuration" for the target vehicle type in QGC, such as _Generic Quadcopter_.
1. Configure the [geometry and actuator outputs](../config/actuators.md).
1. Perform other [basic configuration](../config/index.md).
1. Tune the vehicle.
1. Run the [`param show-for-airframe`](../modules/modules_command.md#param) console command to list the parameter difference compared to the original generic airfame.

Після того, як ви маєте параметри, ви можете створити новий файл конфігурації рами, скопіювавши файл конфігурації для загальної конфігурації та додавши нові параметри.

За іншою альтернативою, ви можете просто додати змінені параметри до файлів конфігурації запуску, описаних у [System Startup > Customizing the System Startup](../concept/system_startup.md#customizing-the-system-startup) ("налаштування загальної конфігурації").

## How to add a Configuration to Firmware

To add a frame configuration to firmware:

1. Create a new config file in the [init.d/airframes](https://github.com/PX4/PX4-Autopilot/tree/main/ROMFS/px4fmu_common/init.d/airframes) folder.
   - Give it a short descriptive filename and prepend the filename with an unused autostart ID (for example, `1033092_superfast_vtol`).
   - Update the file with configuration parameters and apps (see section above).
1. Add the name of the new frame config file to the [CMakeLists.txt](https://github.com/PX4/PX4-Autopilot/blob/main/ROMFS/px4fmu_common/init.d/airframes/CMakeLists.txt) in the relevant section for the type of vehicle
1. [Build and upload](../dev_setup/building_px4.md) the software.

## How to add a Configuration to an SD Card

A frame configuration file to be launched from SD card is the same as one stored in firmware.

To make PX4 launch with a frame configuration, renamed it to `rc.autostart` and copy it to the SD card at `/ext_autostart/rc.autostart`. PX4 will find any linked files in firmware.

## Configuration File Overview

The configuration file consists of several main blocks:

- Documentation (used in the [Airframes Reference](../airframes/airframe_reference.md) and _QGroundControl_). Airframe-specific parameter settings
  - The configuration and geometry using [control allocation](../concept/control_allocation.md) parameters
  - [Tuning gains](#tuning-gains)
- The controllers and apps it should start, such as multicopter or fixed-wing controllers, land detectors etc.

Ці аспекти в основному незалежні, що означає, що багато конфігурацій використовують ту саму фізичну конструкцію літального апарату, запускають ті ж самі додатки і відрізняються переважно у своїх налаштуваннях.

:::note
New frame configuration files are only automatically added to the build system after a clean build (run `make clean`).
:::

### Example - Generic Quadcopter Frame Config

The configuration file for a generic Quad X copter is shown below ([original file here](https://github.com/PX4/PX4-Autopilot/blob/main/ROMFS/px4fmu_common/init.d/airframes/4001_quad_x)). This is very simple, because it defines only the minimal setup common to all quadcopters.

The first line is a shebang, which tells the NuttX operating system (on which PX4 runs) that the configuration file is an executable shell script.

```c
#!/bin/sh
```

This is followed by the frame documentation. The `@name`, `@type` and `@class` are used to identify and group the frame in the [API Reference](../airframes/airframe_reference.md#copter_quadrotor_x_generic_quadcopter) and QGroundControl Airframe Selection.

```plain
# @name Generic Quadcopter
#
# @type Quadrotor x
# @class Copter
#
# @maintainer Lorenz Meier <lorenz@px4.io>
#
```

The next line imports generic parameters that are appropriate for all vehicles of the specified type (see [init.d/rc.mc_defaults](https://github.com/PX4/PX4-Autopilot/blob/main/ROMFS/px4fmu_common/init.d/rc.mc_defaults)).

```plain
. ${R}etc/init.d/rc.mc_defaults
```

Finally the file lists the control allocation parameters (starting with `CA_` that define the default geometry for the frame. These may be modified for your frame geometry in the [Actuators Configuration](../config/actuators.md), and output mappings may be added.

```sh
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

A more complicated configuration file for a complete vehicle is provided below. This is the configuration for the Baby Shark [Standard VTOL](../frames_vtol/standardvtol.md) ([original file here](https://github.com/PX4/PX4-Autopilot/blob/main/ROMFS/px4fmu_common/init.d/airframes/13014_vtol_babyshark)).

The shebang and documentation sections are similar to those for the generic frame, but here we also document what `outputs` are mapped to each motor and actuator. Note that these outputs are documentation only; the actual mapping is done using parameters.

```sh
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

Як і для загальної конструкції, ми додаємо типові значення VTOL за замовчуванням.

```sh
. ${R}etc/init.d/rc.vtol_defaults
```

Потім ми визначаємо параметри конфігурації та налаштування [tuning gains](#tuning-gains):

```sh
param set-default MAV_TYPE 22

param set-default BAT1_N_CELLS 6

param set-default FW_AIRSPD_MAX 30
param set-default FW_AIRSPD_MIN 19
param set-default FW_AIRSPD_TRIM 23
param set-default FW_PN_R_SLEW_MAX 40
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

param set-default SENS_BOARD_ROT 4

param set-default VT_ARSP_BLEND 10
param set-default VT_ARSP_TRANS 21
param set-default VT_B_DEC_MSS 1.5
param set-default VT_B_TRANS_DUR 12
param set-default VT_ELEV_MC_LOCK 0
param set-default VT_FWD_THRUST_SC 1.2
param set-default VT_F_TR_OL_TM 8
param set-default VT_PSHER_SLEW 0.5
param set-default VT_TRANS_MIN_TM 4
param set-default VT_TYPE 2
```

Нарешті, файл визначає параметри розподілу керування для геометрії та параметри, які встановлюють відповідність виходів різним двигунам та сервоприводам.

```sh
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
param set-default PWM_MAIN_DIS3 1000
param set-default PWM_MAIN_DIS4 1500
```

## Adding a New Airframe Group

Повітряні каркаси "групуються", щоб об'єднати схожі повітряні каркаси для вибору у програмі [QGroundControl](https://docs.qgroundcontrol.com/master/en/SetupView/Airframe.html) та в [Довіднику з повітряних каркасів](../airframes/airframe_reference.md). Every group has a name, and an associated svg image which shows the common geometry, number of motors, and direction of motor rotation for the grouped airframes.

Файли метаданих конструкції повітряного каркасу, які використовуються в _QGroundControl_ та вихідний код документації, генеруються з опису конструкції повітряного каркасу за допомогою скрипту за допомогою команди збірки: `make airframe_metadata`

Для нового каркасу, який належить до існуючої групи, вам не потрібно робити нічого більше, крім надання документації у описі каркасу, розташованому за шляхом [ROMFS/px4fmu_common/init.d](https://github.com/PX4/PX4-Autopilot/tree/main/ROMFS/px4fmu_common/init.d).

If the airframe is for a **new group** you additionally need to:

1. Додайте зображення svg для групи до документації посібника користувача (якщо не надано зображення, відображається зображення заповнювача): [assets/airframes/types](https://github.com/PX4/PX4-user_guide/tree/master/assets/airframes/types)
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

1. Оновіть _QGroundControl_:

   - Add the svg image for the group into: [src/AutopilotPlugins/Common/images](https://github.com/mavlink/qgroundcontrol/tree/master/src/AutoPilotPlugins/Common/Images)
   - Add reference to the svg image into [qgcimages.qrc](https://github.com/mavlink/qgroundcontrol/blob/master/qgcimages.qrc), following the pattern below:

     ```xml
     <qresource prefix="/qmlimages">
        ...
        <file alias="Airframe/AirframeSimulation">src/AutoPilotPlugins/Common/Images/AirframeSimulation.svg</file>
        <file alias="Airframe/AirframeUnknown">src/AutoPilotPlugins/Common/Images/AirframeUnknown.svg</file>
        <file alias="Airframe/Boat">src/AutoPilotPlugins/Common/Images/Boat.svg</file>
        <file alias="Airframe/FlyingWing">src/AutoPilotPlugins/Common/Images/FlyingWing.svg</file>
        ...
     ```

:::note
Залишена метадані про конфігурацію повинна автоматично включатися в прошивку (як тільки файл **srcparser.py** буде оновлено).
:::

## Tuning Gains

Наступні теми пояснюють, як налаштувати параметри, які будуть вказані у конфігураційному файлі:

- [Autotuning](../config/autotune.md)
- [Multicopter PID Tuning Guide](../config_mc/pid_tuning_guide_multicopter.md)
- [Fixed-wing PID Tuning Guide](../config_fw/pid_tuning_guide_fixedwing.md)
- [VTOL Configuration](../config_vtol/index.md)

## Add Frame to QGroundControl

Щоб зробити новий літальний апарат доступним для вибору в розділі _Конфігурація рами_ в [QGroundControl](../config/airframe.md):

1. Make a clean build (e.g. by running `make clean` and then `make px4_fmu-v5_default`)
1. Open QGC and select **Custom firmware file...** as shown below:

![QGC flash custom firmware](../../assets/gcs/qgc_flash_custom_firmware.png)

Вас буде запрошено вибрати файл прошивки **.px4** для прошивки (цей файл є стислим JSON файлом і містить метадані про конфігурацію повітряного каркасу).

1. Navigate to the build folder and select the firmware file (e.g. **PX4-Autopilot/build/px4_fmu-v5_default/px4_fmu-v5_default.px4**).
1. Press **OK** to start flashing the firmware.
1. Restart _QGroundControl_.

Після цього новий кадр стане доступним для вибору в _QGroundControl_.
