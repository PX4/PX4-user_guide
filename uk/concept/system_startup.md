# Запуск системи

Запуск PX4 контрольований скриптами оболонки.
On NuttX they reside in the [ROMFS/px4fmu_common/init.d](https://github.com/PX4/PX4-Autopilot/tree/main/ROMFS/px4fmu_common/init.d) folder - some of these are also used on Posix (Linux/MacOS).
The scripts that are only used on Posix are located in [ROMFS/px4fmu_common/init.d-posix](https://github.com/PX4/PX4-Autopilot/tree/main/ROMFS/px4fmu_common/init.d-posix).

All files starting with a number and underscore (e.g. `10000_airplane`) are predefined airframe configurations.
They are exported at build-time into an `airframes.xml` file which is parsed by [QGroundControl](http://qgroundcontrol.com) for the airframe selection UI.
Adding a new configuration is covered [here](../dev_airframes/adding_a_new_frame.md).

Файли що залишилися є частиною загальної логіки запуску.
The first executed file is the [init.d/rcS](https://github.com/PX4/PX4-Autopilot/blob/main/ROMFS/px4fmu_common/init.d/rcS) script (or [init.d-posix/rcS](https://github.com/PX4/PX4-Autopilot/blob/main/ROMFS/px4fmu_common/init.d-posix/rcS) on Posix), which calls all other scripts.

Наступні секції розділені відповідно до операційної системи, на яких виконується PX4.

## Posix (Linux/MacOS)

На Posix системна оболонка використовується як інтерпретатор скриптів (наприклад, /bin/sh що є символьним посиланням на dash в Ubuntu).
Щоб це працювало потрібно кілька речей:

- Модулі PX4 повинні виглядати для системи як окремі виконувані файли.
  Це робиться за допомогою символьних посилань.
  For each module a symbolic link `px4-<module> -> px4` is created in the `bin` directory of the build folder.
  When executed, the binary path is checked (`argv[0]`), and if it is a module (starts with `px4-`), it sends the command to the main px4 instance (see below).

  :::tip
  The `px4-` prefix is used to avoid conflicts with system commands (e.g. `shutdown`), and it also allows for simple tab completion by typing `px4-<TAB>`.

:::

- Оболонка повинна знати, де шукати символьні посилання.
  For that the `bin` directory with the symbolic links is added to the `PATH` variable right before executing the startup scripts.

- Оболонка запускає кожен модуль як новий (клієнтський) процес.
  Кожен клієнтський процес повинен спілкуватися з головним екземпляром px4 (сервером), де справжні модулі працюють як потоки.
  This is done through a [UNIX socket](http://man7.org/linux/man-pages/man7/unix.7.html).
  Сервер прослуховує сокет, до якого клієнти можуть під'єднатися та надіслати команду.
  Сервер відправляє вихідні дані та код повернення назад до клієнта.

- The startup scripts call the module directly, e.g. `commander start`, rather than using the `px4-` prefix.
  This works via aliases: for each module an alias in the form of `alias <module>=px4-<module>` is created in the file `bin/px4-alias.sh`.

- The `rcS` script is executed from the main px4 instance.
  It does not start any modules, but first updates the `PATH` variable and then simply runs a shell with the `rcS` file as argument.

- Крім того, декілька екземплярів серверу можуть бути запущені для симуляції кількох засобів.
  A client selects the instance via `--instance`.
  The instance is available in the script via `$px4_instance` variable.

Модулі можна виконувати з будь-якого терміналу, коли PX4 вже запущено в системі.
Наприклад:

```sh
cd <PX4-Autopilot>/build/px4_sitl_default/bin
./px4-commander takeoff
./px4-listener sensor_accel
```

### Динамічні модулі

Зазвичай всі модулі компілюються в єдиний виконуваний файл PX4.
However, on Posix, there's the option of compiling a module into a separate file, which can be loaded into PX4 using the `dyn` command.

```sh
dyn ./test.px4mod
```

## NuttX

NuttX has an integrated shell interpreter ([NuttShell (NSH)](https://cwiki.apache.org/confluence/pages/viewpage.action?pageId=139629410)), and thus scripts can be executed directly.

### Налагодження завантаження системи

Відмова драйверу програмного компонента не призведе до перерваного завантаження.
This is controlled via `set +e` in the startup script.

The boot sequence can be debugged by connecting the [system console](../debug/system_console.md) and power-cycling the board.
Отриманий журнал завантаження містить детальну інформацію про послідовність завантажування і має містити підказки, чому завантаження переривалось.

#### Основні причини невдалого завантаження

- Для користувацьких додатків: у системі закінчилася оперативна пам'ять.
  Run the `free` command to see the amount of free RAM.
- Відмова програмного забезпечення або припущення яке призвело до трасування стеку.

### Заміна запуску системи

The whole boot can be replaced by creating a file `/etc/rc.txt` on the microSD card with a new configuration (nothing in the old configuration will be auto-started, and if the file is empty, nothing at all will be started).

Налаштування стандартного завантаження майже завжди є кращим підходом.
Це описано нижче.

### Налаштування запуску системи

The best way to customize the system startup is to introduce a [new frame configuration](../dev_airframes/adding_a_new_frame.md).
Файл конфігурації планеру може бути включений у прошивку або на SD карту.

If you only need to "tweak" the existing configuration, such as starting one more application or setting the value of a few parameters, you can specify these by creating two files in the `/etc/` directory of the SD Card:

- [/etc/config.txt](#customizing-the-configuration-config-txt): modify parameter values
- [/etc/extras.txt](#starting-additional-applications-extras-txt): start applications

Ці файли описані нижче.

:::warning
The system boot files are UNIX FILES which require UNIX LINE ENDINGS.
Якщо редагуєте їх на Windows - використовуйте відповідний редактор.
:::

:::info
These files are referenced in PX4 code as `/fs/microsd/etc/config.txt` and `/fs/microsd/etc/extras.txt`, where the root folder of the microsd card is identified by the path `/fs/microsd`.
:::

#### Налаштування конфігурації (config.txt)

The `config.txt` file can be used to modify parameters.
It is loaded after the main system has been configured and _before_ it is booted.

For example, you could create a file on the SD card, `etc/config.txt` with that sets parameter values as shown:

```sh
param set-default PWM_MAIN_DIS3 1000
param set-default PWM_MAIN_MIN3 1120
```

#### Запуск додаткових застосунків (extras.txt)

The `extras.txt` can be used to start additional applications after the main system boot.
Зазвичай це будуть контролери корисного навантаження або подібні необов'язкові користувацькі компоненти.

:::warning
Calling an unknown command in system boot files may result in boot failure.
Зазвичай система не транслює повідомлення mavlink після збою при завантаженні, в такій ситуації перевірте повідомлення про помилки, які виведено в системній консолі.
:::

Наступний приклад показує, як запускати користувацькі застосунки:

- Create a file on the SD card `etc/extras.txt` with this content:

  ```sh
  custom_app start
  ```

- A command can be made optional by gating it with the `set +e` and `set -e` commands:

  ```sh
  set +e
  optional_app start      # Will not result in boot failure if optional_app is unknown or fails
  set -e

  mandatory_app start     # Will abort boot if mandatory_app is unknown or fails
  ```
