# Симуляція з апаратним забезпеченням в контурі (HITL)

:::warning HITL
[підтримується та утримується спільнотою](../simulation/community_supported_simulators.md). Це може працювати або не працювати з поточними версіями PX4.

Дивіться [Встановлення інструментарію](../dev_setup/dev_env.md) для інформації про середовища та інструменти, які підтримуються основною розробницькою командою.
:::

Апаратне забезпечення в контурі (HITL або HIL) режим симуляції в якому звичайна прошивка PX4 виконується на реальному пристрої польотного контролера. Цей підхід має перевагу у вигляді можливості тестування більшості коду для польоту на реальному апаратному забезпеченні.

PX4 підтримує HITL для мультикоптерів (за допомогою jMAVSim або Gazebo Classic) та ВЗІП (за допомогою Gazebo Classic).

<a id="compatible_airframe"></a>

## Планери сумісні з HITL

Поточний набір сумісних планерів проти симуляторів:

| Планер                                                                                                               | `SYS_AUTOSTART` | Gazebo Classic | jMAVSim |
| -------------------------------------------------------------------------------------------------------------------- | --------------- | -------------- | ------- |
| [HIL квадрокоптер у конфігурації X](../airframes/airframe_reference.md#copter_simulation_hil_quadcopter_x)           | 1001            | Y              | Y       |
| [HIL ВЗІП квадроплан стандартний](../airframes/airframe_reference.md#vtol_standard_vtol_hil_standard_vtol_quadplane) | 1002            | Y              |         |
| [Загальний квадрокоптер у конфігурації X](../airframes/airframe_reference.md#copter_quadrotor_x_generic_quadcopter)  | 4001            | Y              | Y       |

<a id="simulation_environment"></a>

## Середовище симуляції HITL

У симуляції з апаратним забезпеченням у контурі (HITL) звичайна прошивка PX4 виконується на реальному обладнані. JMAVSim або Gazebo Classic (які працюють на комп'ютері розробки) підключені до пристрою польотного контролера через USB/UART. Симулятор діє як шлюз для спільного використання даних MAVLink між PX4 та _QGroundControl_.

:::note
Симулятор також може бути підключений за допомогою UDP якщо політний контролер має підтримку мережі та використовує стабільне з'єднання з низькою затримкою (наприклад дротове Ethernet підключення, WiFi підключення зазвичай недостатньо надійне). Наприклад, ця конфігурація була перевірена з PX4, що виконується на Raspberry Pi який підключений через Ethernet до комп'ютера (налаштування запуску яке включає команди для запуску jMAVSim можна знайти [тут](https://github.com/PX4/PX4-Autopilot/blob/main/posix-configs/rpi/px4_hil.config)).
:::

Діаграма нижче показує середовище симуляції:

- Обрано конфігурацію HITL (у _QGroundControl_), яка не запускає ніяких реальних датчиків.
- _jMAVSim_ або _Gazebo Classic_ підключені до політного контролера через USB.
- Симулятор підключено до _QGroundControl_ через UDP і передає повідомлення MAVLink до PX4.
- _Gazebo Classic_ та _jMAVSim_ можуть також підключатися до зовнішнього API та передавати повідомлення MAVLink до PX4.
- (Необов'язково) Для підключення джойстика/геймпада через _QGroundControl_ може бути використано послідовне з'єднання.

![HITL Setup - jMAVSim and Gazebo Classic](../../assets/simulation/px4_hitl_overview_jmavsim_gazebo.svg)

## HITL у порівнянні з SITL

SITL працює на комп'ютері розробки в модельованому середовищі та використовує прошивку спеціально створену для цього середовища. Крім драйверів симуляції для забезпечення підроблених даних середовища від симулятора система поводиться як зазвичай.

На противагу, HITL виконує звичайну прошивку PX4 в "режимі HITL" на звичайному обладнані. Дані симуляції потрапляють в систему в іншій точці ніж для SITL. Основні модулі на кшталт командного або датчиків мають режими HITL, що оминають частину звичайної функціональності при старті.

Підсумовуючи, HITL виконує PX4 на реальному обладнанні за допомогою стандартної прошивки, а SITL фактично більше виконує стандартний системний код.

## Налаштування HITL

### Налаштування PX4

1. З'єднайте автопілот безпосередньо з _QGroundControl_ за допомогою USB.
1. Увімкніть режим HITL

   1. Відкрийте розділ **Налаштування > Безпека**.
   1. Увімкніть режим HITL обравши **Увімкнено** в переліку _HITL увімкнено_:

      ![QGroundControl HITL configuration](../../assets/gcs/qgc_hitl_config.png)

1. Оберіть планер

   1. Відкрийте **Налаштування > Планери**
   1. Оберіть [сумісний планер](#compatible_airframe) який потрібно перевірити. Потім натисніть **Застосувати та перезапустити** у верхній правій частині сторінки _Налаштування планера_.

      ![Select Airframe](../../assets/gcs/qgc_hil_config.png)

1. При необхідності відкалібруйте пульт РК або джойстик.
1. Setup UDP

   1. Under the _General_ tab of the settings menu, uncheck all _AutoConnect_ boxes except for **UDP**.

      ![QGC Auto-connect settings for HITL](../../assets/gcs/qgc_hitl_autoconnect.png)

1. (Optional) Configure Joystick and Failsafe. Set the following [parameters](../advanced_config/parameters.md) in order to use a joystick instead of an RC remote control transmitter:

   - [COM_RC_IN_MODE](../advanced_config/parameter_reference.md#COM_RC_IN_MODE) to "Joystick/No RC Checks". This allows joystick input and disables RC input checks.
   - [NAV_RCL_ACT](../advanced_config/parameter_reference.md#NAV_RCL_ACT) to "Disabled". This ensures that no RC failsafe actions interfere when not running HITL with a radio control.

:::tip
The _QGroundControl User Guide_ also has instructions on [Joystick](https://docs.qgroundcontrol.com/master/en/SetupView/Joystick.html) and [Virtual Joystick](https://docs.qgroundcontrol.com/master/en/SettingsView/VirtualJoystick.html) setup.
:::

Once configuration is complete, **close** _QGroundControl_ and disconnect the flight controller hardware from the computer.

### Simulator-Specific Setup

Follow the appropriate setup steps for the specific simulator in the following sections.

#### Gazebo Classic

:::note
Make sure _QGroundControl_ is not running!
:::

1. Build PX4 with [Gazebo Classic](../sim_gazebo_classic/README.md) (in order to build the Gazebo Classic plugins).

   ```sh
   cd <Firmware_clone>
   DONT_RUN=1 make px4_sitl_default gazebo-classic
   ```

1. Open the vehicle model's sdf file (e.g. **Tools/simulation/gazebo-classic/sitl_gazebo-classic/models/iris_hitl/iris_hitl.sdf**).
1. Replace the `serialDevice` parameter (`/dev/ttyACM0`) if necessary.

:::note
The serial device depends on what port is used to connect the vehicle to the computer (this is usually `/dev/ttyACM0`). An easy way to check on Ubuntu is to plug in the autopilot, open up a terminal, and type `dmesg | grep "tty"`. The correct device will be the last one shown.
:::

1. Set up the environment variables:

   ```sh
   source Tools/simulation/gazebo-classic/setup_gazebo.bash $(pwd) $(pwd)/build/px4_sitl_default
   ```

   and run Gazebo Classic in HITL mode:

   ```sh
   gazebo Tools/simulation/gazebo-classic/sitl_gazebo-classic/worlds/hitl_iris.world
   ```

1. Start _QGroundControl_. It should autoconnect to PX4 and Gazebo Classic.

#### jMAVSim (Quadrotor only)

:::note
Make sure _QGroundControl_ is not running!
:::

1. Connect the flight controller to the computer and wait for it to boot.
1. Run jMAVSim in HITL mode:

   ```sh
   ./Tools/simulation/jmavsim/jmavsim_run.sh -q -s -d /dev/ttyACM0 -b 921600 -r 250
   ```

:::note
Replace the serial port name `/dev/ttyACM0` as appropriate. On macOS this port would be `/dev/tty.usbmodem1`. On Windows (including Cygwin) it would be the COM1 or another port - check the connection in the Windows Device Manager.
:::

1. Start _QGroundControl_. It should autoconnect to PX4 and jMAVSim.

## Fly an Autonomous Mission in HITL

You should be able to use _QGroundControl_ to [run missions](https://docs.qgroundcontrol.com/master/en/FlyView/FlyView.html#missions) and otherwise control the vehicle.
