# Консоль MAVLink

Консоль MAVLink є _NSH console_, до якої можна отримати доступ через MAVLink через послідовний (USB/Telemetry) або WiFi (UDP/TCP) зв'язки (зокрема на системах на основі NuttX, таких як: Pixhawk, Pixracer, тощо).

Консоль можна використовувати для виконання команд та модулів та відображення їх виводу. Хоча оболонка не може _безпосередньо_ відображати вивід модулів, які вона не запускає, вона може це робити опосередковано за допомогою команди `dmesg` (можна використовувати `dmesg -f &` для відображення виводу інших модулів та завдань, що виконуються у черзі роботи).

:::tip
Найлегший спосіб отримати доступ до консолі [QGroundControl MAVLink](#qgroundcontrol) - це консоль QGroundControl MAVLink. Якщо система не запускається належним чином, вам слід замість цього використовувати [System Console](../debug/system_console.md).
:::

## Відкриття консолі

<a id="qgroundcontrol"></a>

### Консоль QGroundControl MAVLink

Найлегший спосіб доступу до оболонки - це використання [QGroundControl MAVLink Console](https://docs.qgroundcontrol.com/master/en/qgc-user-guide/analyze_view/mavlink_console.html) (див. **Analyze View > Mavlink Console**).

### mavlink_shell.py

Ви також можете отримати доступ до оболонки в терміналі за допомогою скрипту **mavlink_shell.py**:

1. Вимкніть _QGroundControl_.
1. Встановіть залежності:

   ```sh
   pip3 install --user pymavlink pyserial
   ```

1. Відкрийте термінал (у каталозі PX4-Autopilot) та запустіть оболонку:

   ```sh
   # Для послідовного порту
   ./Tools/mavlink_shell.py /dev/ttyACM0
   ```

   ```sh
   # Для підключення Wifi
   ./Tools/mavlink_shell.py 0.0.0.0:14550
   ```

Використовуйте `mavlink_shell.py -h`, щоб отримати опис усіх доступних аргументів.

## Використання консолі MAVLink

Для отримання інформації див.: [PX4 Consoles/Shells > Using Consoles/Shells](../debug/consoles.md#using_the_console).
