# Запуск системи

Запуск PX4 контрольований скриптами оболонки. На NuttX вони знаходяться у директорії [ROMFS/px4fmu_common/init.d](https://github.com/PX4/PX4-Autopilot/tree/main/ROMFS/px4fmu_common/init.d), деякі з них також використовуються на Posix системах (Linux/MacOS). Скрипти які використовуються тільки на Posix системах знаходяться у [ROMFS/px4fmu_common/init.d-posix](https://github.com/PX4/PX4-Autopilot/tree/main/ROMFS/px4fmu_common/init.d-posix).

Усі файли, які починаються з числа і підкреслення (наприклад, `10000_airaipl`) є попередньо визначеними конфігураціями планерів. Вони експортуються під час збірки в файл `airframes.xml` який потім аналізується  [QGroundControl](http://qgroundcontrol.com) для користувацького інтерфейсу вибору планера. Як додати нову конфігурацію описано [тут](../dev_airframes/adding_a_new_frame.md).

Файли що залишилися є частиною загальної логіки запуску. Перший файл що виконується є скрипт [init.d/rcS](https://github.com/PX4/PX4-Autopilot/blob/main/ROMFS/px4fmu_common/init.d/rcS) (або [init.d-posix/rcS](https://github.com/PX4/PX4-Autopilot/blob/main/ROMFS/px4fmu_common/init.d-posix/rcS) на Posix), який викликає інші скрипти.

Наступні секції розділені відповідно до операційної системи, на яких виконується PX4.

## Posix (Linux/MacOS)

На Posix системна оболонка використовується як інтерпретатор скриптів (наприклад, /bin/sh що є символьним посиланням на dash в Ubuntu). Щоб це працювало потрібно кілька речей:

- Модулі PX4 повинні виглядати для системи як окремі виконувані файли. Це робиться за допомогою символьних посилань. Для кожного модуля створюється символьне посилання `px4-<module> -> px4` в каталозі збірки `bin`. При виконанні двійкового файлу перевіряється його шлях (`argv[0]`) і якщо це модуль (починається з `px4-`) він відправляє команду на основний екземпляр px4 (див. нижче).

:::tip
Префікс `px4-` використовується для уникнення конфліктів з системними командами (наприклад `shutdown`), також це дозволяє просте автодоповнення за допомогою клавіші `Tab` при вводі <0>px4-&lt;TAB&gt;</0>.
:::

- Оболонка повинна знати, де шукати символьні посилання. Для цього директорія `bin` із символьними посиланнями додається до змінної `PATH` одразу перед виконанням скриптів запуску.
- Оболонка запускає кожен модуль як новий (клієнтський) процес. Кожен клієнтський процес повинен спілкуватися з головним екземпляром px4 (сервером), де справжні модулі працюють як потоки. Це зроблено через [сокет UNIX](http://man7.org/linux/man-pages/man7/unix.7.html). Сервер прослуховує сокет, до якого клієнти можуть під'єднатися та надіслати команду. Сервер відправляє вихідні дані та код повернення назад до клієнта.
- Стартові скрипти викликають модулі безпосередньо, наприклад `commander start`, замість використання префікса `px4-`. Це працює через псевдоніми: для кожного модуля створюється псевдонім у формі `alias <module>=px4-<module>` файлом `bin/px4-alias.sh`.
- Скрипт `rcS` виконується з основного екземпляра px4. Він не запускає жодних модулів, але спочатку оновлює змінну `PATH`, а потім просто запускає оболонку з файлом `rcS` як аргумент.
- Крім того, декілька екземплярів серверу можуть бути запущені для симуляції кількох засобів. Клієнт обирає екземпляр через параметр `--instance`. В скрипті екземпляр доступний за допомогою змінної `$px4_instance`.

Модулі можна виконувати з будь-якого терміналу, коли PX4 вже запущено в системі. Наприклад:

```sh
cd <PX4-Autopilot>/build/px4_sitl_default/bin
./px4-commander takeoff
./px4-listener sensor_accel
```

### Динамічні модулі

Зазвичай всі модулі компілюються в єдиний виконуваний файл PX4. Однак, на Posix системах, є можливість компіляції модуля в окремий файл, який можна завантажити в PX4 використовуючи команду `dyn`.

```sh
dyn ./test.px4mod
```

## NuttX

NuttX має інтегрований інтерпретатор оболонки ([NuttShell (NSH)](https://cwiki.apache.org/confluence/pages/viewpage.action?pageId=139629410)), тому скрипти можуть бути виконані безпосередньо.

### Налагодження завантаження системи

Відмова драйверу програмного компонента не призведе до перерваного завантаження. Це контролюється директивою `set +e` в скрипті запуску.

Послідовність завантаження можна налагодити під'єднавши [системну консоль](../debug/system_console.md) та перезавантажити плату за живленням. Отриманий журнал завантаження містить детальну інформацію про послідовність завантажування і має містити підказки, чому завантаження переривалось.

#### Основні причини невдалого завантаження

- Для користувацьких додатків: у системі закінчилася оперативна пам'ять. Виконайте команду `free` , щоб побачити кількість вільної оперативної пам'яті.
- Відмова програмного забезпечення або припущення яке призвело до трасування стеку.

### Заміна запуску системи

Весь процес завантаження може бути замінений шляхом створення файлу з новою конфігурацією `/etc/rc.txt` на картці microSD (ніщо в старій конфігурації не буде автоматично запущено, і якщо файл порожній, зовсім нічого не буде запущено).

Налаштування стандартного завантаження майже завжди є кращим підходом. Це описано нижче.

### Налаштування запуску системи

Найкращий спосіб змінити запуск системи - це ввести [нову конфігурацію планера](../dev_airframes/adding_a_new_frame.md). Файл конфігурації планеру може бути включений у прошивку або на SD карту.

If you only need to "tweak" the existing configuration, such as starting one more application or setting the value of a few parameters, you can specify these by creating two files in the `/etc/` directory of the SD Card:

- [/etc/config.txt](#customizing-the-configuration-config-txt): modify parameter values
- [/etc/extras.txt](#starting-additional-applications-extras-txt): start applications

The files are described below.

:::warning
The system boot files are UNIX FILES which require UNIX LINE ENDINGS.
If editing on Windows use a suitable editor.
:::

:::note
These files are referenced in PX4 code as `/fs/microsd/etc/config.txt` and `/fs/microsd/etc/extras.txt`, where the root folder of the microsd card is identified by the path `/fs/microsd`.
:::

#### Customizing the Configuration (config.txt)

The `config.txt` file can be used to modify parameters. It is loaded after the main system has been configured and _before_ it is booted.

For example, you could create a file on the SD card, `etc/config.txt` with that sets parameter values as shown:

```sh
param set-default PWM_MAIN_DIS3 1000
param set-default PWM_MAIN_MIN3 1120
```

#### Starting Additional Applications (extras.txt)

The `extras.txt` can be used to start additional applications after the main system boot. Typically these would be payload controllers or similar optional custom components.

:::warning
Calling an unknown command in system boot files may result in boot failure.
Typically the system does not stream mavlink messages after boot failure, in this case check the error messages that are printed on the system console.
:::

The following example shows how to start custom applications:

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
