# Симуляція Flightgear

:::warning
Цей симулятор [підтримується та підтримується спільнотою](../simulation/community_supported_simulators.md). Це може працювати або не працювати з поточними версіями PX4.

Дивіться [Встановлення інструментарію](../dev_setup/dev_env.md) для інформації про середовища та інструменти, які підтримуються основною розробницькою командою.
:::

[FlightGear](https://www.flightgear.org/) - це симулятор польоту з потужними [моторами FDM](http://wiki.flightgear.org/Flight_Dynamics_Model). Це дозволяє FlightGear моделювати вертольоти в різних метеорологічних умовах (тому спочатку міст між ними був розроблений компанією [ThunderFly s.r.o.](https://www.thunderfly.cz/)).

Ця сторінка описує використання FlightGear з одним транспортним засобом у реальному часі на віртуальному полігоні (SITL). Для отримання інформації про багатокористувацьке використання дивіться: [Багатокористувацька симуляція з FlightGear](../sim_flightgear/multi_vehicle.md).

**Підтримувані Транспортні Засоби:** Автожир, Літак, Рухомий об'єкт.

@[youtube](https://youtu.be/iqdcN5Gj4wI)

[![Mermaid Graph ](https://mermaid.ink/img/eyJjb2RlIjoiZ3JhcGggTFI7XG4gIEZsaWdodEdlYXIgLS0-IEZsaWdodEdlYXItQnJpZGdlO1xuICBGbGlnaHRHZWFyLUJyaWRnZSAtLT4gTUFWTGluaztcbiAgTUFWTGluayAtLT4gUFg0X1NJVEw7XG5cdCIsIm1lcm1haWQiOnsidGhlbWUiOiJkZWZhdWx0In0sInVwZGF0ZUVkaXRvciI6ZmFsc2V9)](https://mermaid-js.github.io/mermaid-live-editor/#/edit/eyJjb2RlIjoiZ3JhcGggTFI7XG4gIEZsaWdodEdlYXIgLS0-IEZsaWdodEdlYXItQnJpZGdlO1xuICBGbGlnaHRHZWFyLUJyaWRnZSAtLT4gTUFWTGluaztcbiAgTUFWTGluayAtLT4gUFg0X1NJVEw7XG5cdCIsIm1lcm1haWQiOnsidGhlbWUiOiJkZWZhdWx0In0sInVwZGF0ZUVkaXRvciI6ZmFsc2V9)


<!-- Original mermaid graph
graph LR;
  FlightGear-- >FlightGear-Bridge;
  FlightGear-Bridge-- >MAVLink;
  MAVLink-- >PX4_SITL;
-->

::: info See [Simulation](../simulation/index.md) for general information about simulators, the simulation environment, and simulation configuration (e.g. supported vehicles).
:::

## Встановлення (Ubuntu Linux)

::: info
These instructions were tested on Ubuntu 18.04
:::

1. Установіть звичайне [Середовище розробки на Ubuntu LTS / Debian Linux](../dev_setup/dev_env_linux_ubuntu.md).
1. Встановити FlightGear:

   ```sh
   sudo add-apt-repository ppa:saiarcot895/flightgear
   sudo apt update
   sudo apt install flightgear
   ```

   Це встановить останню стабільну версію FlightGear зі сховища PAA разом із пакетом FGdata.

:::tip
For some models (e.g. those with electric engines) the daily build with the newest features may be necessary. Встановіть це за допомогою [щоденної збірки PPA](https://launchpad.net/~saiarcot895/+archive/ubuntu/flightgear-edge).
:::

1. Перевірте, що ви можете запустити FlightGear:

   ```sh
   fgfs --launcher
   ```

1. Установіть дозволи на запис до папки **Protocols** у каталозі встановлення FlightGear:

   ```sh
   sudo chmod a+w /usr/share/games/flightgear/Protocol
   ```

   Налаштування дозволів потрібне, оскільки PX4-FlightGear-Bridge розміщує тут файл визначення зв’язку.

Додаткові інструкції для встановлення можна знайти на [FlightGear wiki](http://wiki.flightgear.org/Howto:Install_Flightgear_from_a_PPA).

## Running the Simulation

Запустіть симуляцію, запустивши PX4 SITL та вказавши конфігурацію повітряного каркасу на ваш вибір.

Найпростіший спосіб зробити це - відкрити термінал у кореневій директорії репозиторію PX4 _PX4-Autopilot_ і викликати `make` для потрібної цілі. Наприклад, для запуску симуляції літака:

```sh
cd /path/to/PX4-Autopilot
make px4_sitl_nolockstep flightgear_rascal
```

Нижче перелічено підтримувані транспортні засоби та команди `make` (клацніть по посиланнях, щоб побачити зображення транспортного засобу).

| Транспортний засіб                                                                        | Команда                                      |
| ----------------------------------------------------------------------------------------- | -------------------------------------------- |
| [Standard Plane](../sim_flightgear/vehicles.md#standard-plane)                            | `make px4_sitl_nolockstep flightgear_rascal` |
| [Ackermann vehicle (UGV/Rover)](../sim_flightgear/vehicles.md#ackerman-vehicle-ugv-rover) | `make px4_sitl_nolockstep flightgear_tf-r1`  |
| [Autogyro](../sim_flightgear/vehicles.md#autogyro)                                        | `make px4_sitl_nolockstep flightgear_tf-g1`  |

The commands above launch a single vehicle with the full UI. _QGroundControl_ повинна автоматично підключатися до симульованого транспортного засобу.

::: info For the full list of FlightGear build targets (highlighted) run:

```sh
make px4_sitl_nolockstep list_vmd_make_targets | grep flightgear_
```

For additional information see: [FlightGear Vehicles](../sim_flightgear/vehicles.md) (this includes information about "unsupported" vehicles, and adding new vehicles).
:::

::: info The [Installing Files and Code](../dev_setup/dev_env.md) guide is a useful reference if there are build errors.
:::

## Taking it to the Sky

Згадані вище команди `make` спочатку створюють PX4, а потім запускають його разом із симулятором FlightGear.

Після запуску PX4 запуститься оболонка PX4, як показано нижче. Ви повинні вибрати enter, щоб відкрити командний рядок.

```sh
______  __   __    ___
| ___ \ \ \ / /   /   |
| |_/ /  \ V /   / /| |
|  __/   /   \  / /_| |
| |     / /^\ \ \___  |
\_|     \/   \/     |_/

px4 starting.

INFO  [px4] Calling startup script: /bin/sh etc/init.d-posix/rcS 0
INFO  [param] selected parameter default file eeprom/parameters_1034
I'm Mavlink to FlightGear Bridge
Target Bridge Freq: 200, send data every step: 1
4
  5   -1
  7   -1
  2   1
  4   1
[param] Loaded: eeprom/parameters_1034
INFO  [dataman] Unknown restart, data manager file './dataman' size is 11798680 bytes
INFO  [simulator] Waiting for simulator to accept connection on TCP port 4560
INFO  [simulator] Simulator connected on TCP port 4560.
INFO  [commander] LED: open /dev/led0 failed (22)
INFO  [commander] Mission #3 loaded, 9 WPs, curr: 8
INFO  [mavlink] mode: Normal, data rate: 4000000 B/s on udp port 18570 remote port 14550
INFO  [airspeed_selector] No airspeed sensor detected. Switch to non-airspeed mode.
INFO  [mavlink] mode: Onboard, data rate: 4000000 B/s on udp port 14580 remote port 14540
INFO  [mavlink] mode: Onboard, data rate: 4000 B/s on udp port 14280 remote port 14030
INFO  [logger] logger started (mode=all)
INFO  [logger] Start file log (type: full)
INFO  [logger] Opened full log file: ./log/2020-04-28/22_03_36.ulg
INFO  [mavlink] MAVLink only on localhost (set param MAV_{i}_BROADCAST = 1 to enable network)
INFO  [px4] Startup script returned successfully
pxh> StatsHandler::StatsHandler() Setting up GL2 compatible shaders
Now checking for plug-in osgPlugins-3.4.1/osgdb_nvtt.so
PX4 Communicator: PX4 Connected.

pxh>
```

The console will print out status as PX4 loads the airframe-specific initialization and parameter files, wait for (and connect to) the simulator. Once there is an INFO print that [ecl/EKF] is `commencing GPS fusion` the vehicle is ready to arm. At this point, you should see a FlightGear window with some view of aircraft.

::: info You can change the view by pressing **Ctrl+V**.
:::

![FlightGear UI](../../assets/simulation/flightgear/flightgearUI.jpg)

You can bring it into the air by typing:

```sh
pxh> commander takeoff
```

## Використання/Налаштування

You can tune your FG installation/settings by the following environment variables:

- `FG\_BINARY` - absolute path to FG binary to run. (It can be an AppImage)
- `FG\_MODELS\_DIR` - absolute path to the folder containing the manually-downloaded aircraft models which should be used for simulation.
- `FG\_ARGS\_EX` - any additional FG parameters.

<a id="frame_rate"></a>

### Відображення частоти кадрів

In FlightGear you can display the frame rate by enabling it in: **View > View Options > Show frame rate**.

### Встановлення власного місця зльоту

Takeoff location in SITL FlightGear can be set using additional variables. Setting the variable will override the default takeoff location.

The variables which can be set are as follows: `--airport`, `--runway`, and `--offset-distance`. Other options can be found on [FlightGear wiki](http://wiki.flightgear.org/Command_line_options#Initial_Position_and_Orientation)

For example:

```sh
FG_ARGS_EX="--airport=PHNL"  make px4_sitl_nolockstep flightgear_rascal
```

Як приклад вище запускає моделювання на [Міжнародний аеропорт Honolulu](http://wiki.flightgear.org/Suggested_airports)

### Використання джойстика

Джойстики та пальцевий джойстик підтримуються через _QGroundControl_ ([інструкції з налаштування тут](../simulation/README.md#joystick-gamepad-integration)).

Вхід джойстика в FlightGear слід вимкнути, в іншому випадку виникне "конфлікт умов" між введенням джойстика FG та командами PX4.

## Розширення та персоналізація

To extend or customize the simulation interface, edit the files in the **Tools/simulation/flightgear/flightgear_bridge** folder. The code is available in the [PX4-FlightGear-Bridge repository](https://github.com/ThunderFly-aerospace/PX4-FlightGear-Bridge) on Github.

## Подальша інформація

- [PX4-FlightGear-Bridge readme](https://github.com/ThunderFly-aerospace/PX4-FlightGear-Bridge)
