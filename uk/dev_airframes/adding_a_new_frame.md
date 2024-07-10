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

## Налаштування кадру в розробці

Рекомендований процес розробки нової конфігурації кадру:

1. Почніть із вибору відповідної "загальної конфігурації" для цільового типу транспортного засобу в QGC, наприклад _Загальний квадрокоптер_.
1. Налаштуйте [виходи геометрії та приводу](../config/actuators.md).
1. Виконайте інші [основні налаштування](../config/index.md).
1. Налаштуйте транспортний засіб.
1. Виконайте наступну консольну команду: `[`param show-for-airframe`](../modules/modules_command.md#param)`. Вона відобразить різницю параметрів порівняно з оригінальною загальною конфігурацією платформи.

Після того, як ви маєте параметри, ви можете створити новий файл конфігурації рами, скопіювавши файл конфігурації для загальної конфігурації та додавши нові параметри.

За іншою альтернативою, ви можете просто додати змінені параметри до файлів конфігурації запуску, описаних у [System Startup > Customizing the System Startup](../concept/system_startup.md#customizing-the-system-startup) ("налаштування загальної конфігурації").

## Як додати конфігурацію до прошивки

Як додати конфігурацію до прошивки:

1. Створіть новий файл конфігурації в папці [init.d/airframes](https://github.com/PX4/PX4-Autopilot/tree/main/ROMFS/px4fmu_common/init.d/airframes).
   - Дайте йому коротке описове ім'я файлу і перед ім'ям файла додайте не використаний ID для автозапуску (наприклад, `1033092_superfast_vtol`).
   - Оновіть файл з параметрами конфігурації та програмами (див. вище).
1. Додайте назву нового файлу конфігурації к [CMakeLists.txt](https://github.com/PX4/PX4-Autopilot/blob/main/ROMFS/px4fmu_common/init.d/airframes/CMakeLists.txt) в відповідний розділ для типу транспортного засобу
1. [Збудуйте та завантажте](../dev_setup/building_px4.md) програмне забезпечення.

## Як додати конфігурацію на SD-карту

Файл конфігурації рами, що буде запущений з SD-карти, такий самий, як той, що зберігається в прошивці.

Щоб запустити PX4 із конфігурацією кадру, перейменуйте його на `rc.autostart` і скопіюйте на SD-карту за адресою `/ext_autostart/rc.autostart`. PX4 знайде будь-які пов’язані файли у мікропрограмі.

## Огляд файлу конфігурації

Файл конфігурації складається з кількох основних блоків:

- Документація (використовується в [довіднику з конфігурацій](../airframes/airframe_reference.md) апаратури та _QGroundControl_). Специфічні налаштування параметрів планера
  - Конфігурація та геометрія за допомогою параметрів[ розподілу керування](../concept/control_allocation.md)
  - [Налаштування коефіцієнтів](#tuning-gains)
- Контролери та програми, які мають запускатися, такі як контролери багатороторників або фіксованих крил, детектори посадки та інше.

Ці аспекти в основному незалежні, що означає, що багато конфігурацій використовують ту саму фізичну конструкцію літального апарату, запускають ті ж самі додатки і відрізняються переважно у своїх налаштуваннях.

::: info
Нові файли конфігурації фрейму автоматично додаються до системи збирання лише після чистого збирання (запустіть `make clean`).
:::

### Приклад - загальна конфігурація рами квадрокоптера

Файл конфігурації для типового коптера Quad X показано нижче ([оригінальний файл тут](https://github.com/PX4/PX4-Autopilot/blob/main/ROMFS/px4fmu_common/init.d/airframes/4001_quad_x)). Це дуже просто, оскільки воно визначає лише мінімальні налаштування, загальні для всіх квадрокоптерів.

Перший рядок — це shebang, який повідомляє операційній системі NuttX (на якій працює PX4), що файл конфігурації є виконуваним сценарієм оболонки.

```c
#!/bin/sh
```

Далі йде кадрова документація. `@name`, `@type` і `@class` використовуються для ідентифікації та групування кадру в [довіднику API](../airframes/airframe_reference.md#copter_quadrotor_x_generic_quadcopter) та Вибір планера QGroundControl.

```plain
# @name Generic Quadcopter
#
# @type Quadrotor x
# @class Copter
#
# @maintainer Lorenz Meier <lorenz@px4.io>
#
```

Наступний рядок імпортує загальні параметри, які підходять для всіх транспортних засобів зазначеного типу (див. [init.d/rc.mc_defaults](https://github.com/PX4/PX4-Autopilot/blob/main/ROMFS/px4fmu_common/init.d/rc.mc_defaults)).

```plain
. ${R}etc/init.d/rc.mc_defaults
```

Нарешті, у файлі перераховано параметри розподілу керування (починаючи з `CA_`, які визначають типову геометрію для рами. Їх можна змінити відповідно до геометрії вашої рами в [Конфігурації приводів](../config/actuators.md), а також можна додати відображення вихідних даних.

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

### Приклад – Повний транспортний засіб Babyshark VTOL

Нижче наведено більш складний файл конфігурації для повного транспортного засобу. Це конфігурація для Baby Shark [Standard VTOL](../frames_vtol/standardvtol.md) ([оригінальний файл тут](https://github.com/PX4/PX4-Autopilot/blob/main/ROMFS/px4fmu_common/init.d/airframes/13014_vtol_babyshark)).

Розділи shebang і документація подібні до розділів загальної рами, але тут ми також документуємо, які `виходи` відображаються для кожного двигуна та приводу. Зверніть увагу, що ці результати є лише документацією; фактичне відображення виконується за допомогою параметрів.

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

## Додавання нової групи планера

Повітряні каркаси "групуються", щоб об'єднати схожі повітряні каркаси для вибору у програмі [QGroundControl](https://docs.qgroundcontrol.com/master/en/SetupView/Airframe.html) та в [Довіднику з повітряних каркасів](../airframes/airframe_reference.md). Кожна група має назву та пов'язаний з нею зображення у форматі Svg, яке показує загальну геометрію, кількість двигунів та напрямок обертання двигунів для повітряних каркасів, що належать до цієї групи.

Файли метаданих конструкції повітряного каркасу, які використовуються в _QGroundControl_ та вихідний код документації, генеруються з опису конструкції повітряного каркасу за допомогою скрипту за допомогою команди збірки: `make airframe_metadata`

Для нового каркасу, який належить до існуючої групи, вам не потрібно робити нічого більше, крім надання документації у описі каркасу, розташованому за шляхом [ROMFS/px4fmu_common/init.d](https://github.com/PX4/PX4-Autopilot/tree/main/ROMFS/px4fmu_common/init.d).

Якщо планер призначено для **нової групи**, додатково потрібно:

1. Додайте зображення svg для групи до документації посібника користувача (якщо не надано зображення, відображається зображення заповнювача): [assets/airframes/types](https://github.com/PX4/PX4-user_guide/tree/master/assets/airframes/types)
1. Додайте зіставлення між новою назвою групи та назвою файлу зображення в методі [srcparser.py](https://github.com/PX4/PX4-Autopilot/blob/main/Tools/px4airframes/srcparser.py) `GetImageName()` (дотримуйтесь шаблону нижче):

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

   - Додайте зображення svg для групи в: [src/AutopilotPlugins/Common/images](https://github.com/mavlink/qgroundcontrol/tree/master/src/AutoPilotPlugins/Common/Images)
   - Додайте посилання на зображення svg у [qgcimages.qrc](https://github.com/mavlink/qgroundcontrol/blob/master/qgcimages.qrc), дотримуючись шаблону нижче:

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

## Підвищення налаштування

Наступні теми пояснюють, як налаштувати параметри, які будуть вказані у конфігураційному файлі:

- [Autotuning (Multicopter)](../config/autotune_mc.md) (or [Multicopter PID Tuning Guide](../config_mc/pid_tuning_guide_multicopter.md))
- [Autotuning (Fixed-wing)](../config/autotune_fw.md) (or [Fixed-wing PID Tuning Guide](../config_fw/pid_tuning_guide_fixedwing.md))
- [Autotuning (VTOL)](../config/autotune_vtol.md) ([VTOL Configuration](../config_vtol/index.md))

## Додайте фрейм до QGroundControl

Щоб зробити новий літальний апарат доступним для вибору в розділі _Конфігурація рами_ в [QGroundControl](../config/airframe.md):

1. Зробіть чисту збірку (наприклад, запустивши `make clean`, а потім `make px4_fmu-v5_default`)
1. Відкрийте QGC і виберіть **Custom firmware file...** як показано нижче:

![QGC flash custom firmware](../../assets/gcs/qgc_flash_custom_firmware.png)

Вас буде запрошено вибрати файл прошивки **.px4** для прошивки (цей файл є стислим JSON файлом і містить метадані про конфігурацію повітряного каркасу).

1. Перейдіть до папки збірки та виберіть файл прошивки (наприклад, **PX4-Autopilot/build/px4_fmu-v5_default/px4_fmu-v5_default.px4**).
1. Натисніть **OK**, щоб розпочати перезавантаження мікропрограми.
1. Перезапустіть _QGroundControl_.

Після цього новий кадр стане доступним для вибору в _QGroundControl_.
