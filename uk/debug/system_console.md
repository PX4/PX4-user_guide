# Системна консоль PX4

_Системна консоль_ PX4 забезпечує низькорівневий доступ до системи, виводу налагодження та аналізу процесу завантаження системи.

:::tip
Консоль слід використовувати для налагодження, якщо система не запускається. [MAVLink Shell](../debug/mavlink_shell.md) може бути більш підходящим, оскільки встановлювати його набагато простіше і його можна використовувати для [багатьох тих самих завдань](../debug/consoles.md#console_vs_shell).
:::

## Підключення консолі

Консоль стає доступною через (специфічний для плати) UART, який може бути підключений до порту USB комп'ютера за допомогою кабелю [3.3V FTDI](https://www.digikey.com/en/products/detail/TTL-232R-3V3/768-1015-ND/1836393). Це дозволяє доступ до консолі за допомогою термінальної програми.

Виробники контролера Pixhawk повинні розкрити інтерфейси консолі UART та SWD (JTAG) через спеціальний _порт для налагодження_, який відповідає стандарту підключення [Pixhawk Connector](#pixhawk_debug_port). На жаль, деякі дошки попередні цьому стандарту або не відповідають йому.

:::info Розробники, які спрямовуються на різні плати, можуть бажати використовувати [адаптер відлагодження](../debug/swd_debug.md#debug-adapters) для спрощення підключення плат до кабелів FTDI та [відлагоджувальні зонди](../debug/swd_debug.md#debug-probes-for-px4-hardware).
:::

Розділи нижче наводять посилання на інформацію про проводку та консоль системи для багатьох загальних дошок.

### Проводка, специфічна для плати

Звичайно, роз'єми UART консолі системи/порти налагодження зазвичай документуються на сторінках [огляду автопілота](../flight_controller/index.md) (деякі з них перераховані нижче):

- [Політний контролер 3DR Pixhawk v1](../flight_controller/pixhawk.md#console-port) (також застосовується до [mRo Pixhawk](../flight_controller/mro_pixhawk.md#debug-ports), [Holybro pix32](../flight_controller/holybro_pix32.md#debug-port))
- [Pixhawk 3](../flight_controller/pixhawk3_pro.md#debug-port)
- [Pixracer](../flight_controller/pixracer.md#debug-port)

<a id="pixhawk_debug_port"></a>

### Порти відладки Pixhawk

Пульт управління Pixhawk зазвичай постачається з [Стандартним роз'ємом для налагодження Pixhawk](../debug/swd_debug.md#pixhawk-connector-standard-debug-ports), який може бути або 10-контактним [Повним налагодженням Pixhawk](../debug/swd_debug.md#pixhawk-debug-full), або 6-контактним [Міні налагодженням Pixhawk](../debug/swd_debug.md#pixhawk-debug-mini).

Ці порти мають контакти для консольного TX та RX, які можуть бути підключені до кабелю FTDI. Співвідношення для [Pixhawk Debug Mini](../debug/swd_debug.md#pixhawk-debug-mini) до FTDI показано нижче.

| Порт для налагодження Pixhawk | -                        | FTDI | -                                                |
| ----------------------------- | ------------------------ | ---- | ------------------------------------------------ |
| 1 (red)                       | TARGET PROCESSOR VOLTAGE |      | N/C (використовується для налагодження SWD/JTAG) |
| 2 (blk)                       | CONSOLE TX (OUT)         | 5    | FTDI RX (yellow)                                 |
| 3 (blk)                       | CONSOLE RX (IN)          | 4    | FTDI TX (orange)                                 |
| 4 (blk)                       | SWDIO                    |      | N/C (використовується для налагодження SWD/JTAG) |
| 5 (blk)                       | SWCLK                    |      | N/C (використовується для налагодження SWD/JTAG) |
| 6 (blk)                       | GND                      | 1    | FTDI GND (black)                                 |

Сторінка [Порт налагодження SWD](../debug/swd_debug.md) та окремі сторінки контролера польоту містять більше інформації про виводи порту налагодження.

## Відкриття консолі

Після підключення консолі використовуйте інструмент вибору або типові порти з'єднання, описані нижче:

### Linux / Mac OS: Screen

Встановіть screen на Ubuntu (Mac OS вже має його встановленим):

```sh
sudo apt-get install screen
```

- Серійний підключення: Pixhawk v1 / Pixracer використовує швидкість передачі 57600 бод

Підключіть екран при швидкості BAUDRATE бод, 8 біт даних, 1 стоп-біт до правого послідовного порту (використовуйте `ls /dev/tty*` та спостерігайте, що змінюється при відключенні / підключенні пристрою USB). Загальні назви - `/dev/ttyUSB0` та `/dev/ttyACM0` для Linux та `/dev/tty.usbserial-ABCBD` для Mac OS.

```sh
screen /dev/ttyXXX BAUDRATE 8N1
```

### Windows: PuTTY

Завантажте [PuTTY](http://www.chiark.greenend.org.uk/~sgtatham/putty/download.html) та запустіть його.

Потім виберіть 'серійне підключення' і встановіть параметри порту:

- 57600 baud
- 8 data bits
- 1 stop bit
