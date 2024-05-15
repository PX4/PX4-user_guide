# Зіставлення послідовних портів

Ця тема показує, як визначити відповідність між іменами пристроїв серійного порту USART/UART (наприклад, "ttyS0") та пов'язаними портами на контролері польоту, такими як `TELEM1`, `TELEM2`, `GPS1`, `RC SBUS`, `Debug console(Консоль відладки)`.

Інструкції використовуються для генерації таблиць відповідності портів серійного зв'язку у документації контролера польоту. Наприклад: [Pixhawk 4 > Serial Port mapping](../flight_controller/pixhawk4.md#serial-port-mapping).

:::info Функція, призначена для кожного порту, не обов'язково _повинна_ відповідати його імені (у більшості випадків), і встановлюється за допомогою [Конфігурації Серійного Порту](../peripherals/serial_configuration.md). Зазвичай функція порту налаштована так, щоб відповідати імені, тому порт, позначений як `GPS1`, буде працювати з GPS без будь-яких додаткових налаштувань.
:::

## NuttX на STMxxyyy

<!-- instructions from DavidS here: https://github.com/PX4/PX4-user_guide/pull/672#issuecomment-598198434 -->

У цьому розділі показано, як отримати зіставлення для збірок NuttX на архітектурах STMxxyyy, перевіряючи файли конфігурації плати. Інструкції використовують FMUv5, але можуть бути аналогічно розширені для інших версій FMU або плат NuttX.

### default.px4board

Файл **default.px4board** містить список зіставлень номерів портів UART з функціями (шукайте текст "SERIAL_PORTS").

З [/boards/px4/fmu-v5/default.px4board](https://github.com/PX4/PX4-Autopilot/blob/main/boards/px4/fmu-v5/default.px4board):

```
CONFIG_BOARD_SERIAL_GPS1="/dev/ttyS0"
CONFIG_BOARD_SERIAL_TEL1="/dev/ttyS1"
CONFIG_BOARD_SERIAL_TEL2="/dev/ttyS2"
CONFIG_BOARD_SERIAL_TEL4="/dev/ttyS3"
```

Крім того, ви можете запустити boardconfig за допомогою `make px4_fmu-v5 boardconfig` і отримати доступ до меню послідовного порту

```
    Serial ports  --->
        (/dev/ttyS0) GPS1 tty port
        ()  GPS2 tty port
        ()  GPS3 tty port
        ()  GPS4 tty port
        ()  GPS5 tty port
        (/dev/ttyS1) TEL1 tty port
        (/dev/ttyS2) TEL2 tty port
        ()  TEL3 tty port
        (/dev/ttyS3) TEL4 tty port
        ()  TEL5 tty port
```

### nsh/defconfig

Файл _nsh/defconfig_ дозволяє визначити, які порти визначені, чи вони є UART або USART, і відображення між USART/UART та пристроєм. Ви також можете визначити, який порт використовується для [serial/debug console](../debug/system_console.md).

Відкрийте файл defconfig плати, наприклад: [/boards/px4/fmu-v5/nuttx-config/nsh/defconfig](https://github.com/PX4/PX4-Autopilot/blob/main/boards/px4/fmu-v5/nuttx-config/nsh/defconfig#L215-L221)

Шукайте текст "ART" до тих пір, поки ви не знайдете розділ з записами у форматі `CONFIG_STM32xx_USARTn=y` (де `xx` - це тип процесора, а `n` - номер порту). Наприклад:

```
CONFIG_STM32F7_UART4=y
CONFIG_STM32F7_UART7=y
CONFIG_STM32F7_UART8=y
CONFIG_STM32F7_USART1=y
CONFIG_STM32F7_USART2=y
CONFIG_STM32F7_USART3=y
CONFIG_STM32F7_USART6=y
```

Записи показують, які порти визначено, і чи вони є UART або USART.

Скопіюйте вищенаведений розділ і перегрупуйте його числово за "n". Збільшуйте номер пристрою _ttyS**n**_ поруч (із нуля), щоб отримати відображення пристрою на послідовний порт.

```
ttyS0 CONFIG_STM32F7_USART1=y
ttyS1 CONFIG_STM32F7_USART2=y
ttyS2 CONFIG_STM32F7_USART3=y
ttyS3 CONFIG_STM32F7_UART4=y
ttyS4 CONFIG_STM32F7_USART6=y
ttyS5 CONFIG_STM32F7_UART7=y
ttyS6 CONFIG_STM32F7_UART8=y
```

Для отримання зв'язку DEBUG консолі шукаємо файл конфігурації за замовчуванням [defconfig](https://github.com/PX4/PX4-Autopilot/blob/main/boards/px4/fmu-v5/nuttx-config/nsh/defconfig#L212) і шукаємо <0>SERIAL_CONSOLE</0>. Нижче ми бачимо, що консоль знаходиться на UART7:

```
CONFIG_UART7_SERIAL_CONSOLE=y
```

### board_config.h

Для контролерів польоту, що мають IO плату, визначте з'єднання PX4IO з файлу **board_config.h**, шляхом пошуку `PX4IO_SERIAL_DEVICE`.

Наприклад, [/boards/px4/fmu-v5/src/board_config.h](https://github.com/PX4/PX4-Autopilot/blob/main/boards/px4/fmu-v5/src/board_config.h#L59):

```
#define PX4IO_SERIAL_DEVICE            "/dev/ttyS6"
#define PX4IO_SERIAL_TX_GPIO           GPIO_UART8_TX
#define PX4IO_SERIAL_RX_GPIO           GPIO_UART8_RX
#define PX4IO_SERIAL_BASE              STM32_UART8_BASE
```

Отже, PX4IO знаходиться на `ttyS6` (ми також бачимо, що це відповідає UART8, що ми вже знали з попереднього розділу).

### Підсумовуючи все це разом,

Остаточне відображення таке:

```
ttyS0 CONFIG_STM32F7_USART1=y GPS1
ttyS1 CONFIG_STM32F7_USART2=y TEL1
ttyS2 CONFIG_STM32F7_USART3=y TEL2
ttyS3 CONFIG_STM32F7_UART4=y TEL4
ttyS4 CONFIG_STM32F7_USART6=y
ttyS5 CONFIG_STM32F7_UART7=y DEBUG
ttyS6 CONFIG_STM32F7_UART8=y PX4IO
```

У [flight controller docs](../flight_controller/pixhawk4.md#serial-port-mapping) результуюча таблиця виглядає так:

| UART   | Пристрій   | Порт                       |
| ------ | ---------- | -------------------------- |
| UART1  | /dev/ttyS0 | GPS                        |
| USART2 | /dev/ttyS1 | TELEM1 (керування потоком) |
| USART3 | /dev/ttyS2 | TELEM2 (керування потоком) |
| UART4  | /dev/ttyS3 | TELEM4                     |
| USART6 | /dev/ttyS4 | RC SBUS                    |
| UART7  | /dev/ttyS5 | Debug Console              |
| UART8  | /dev/ttyS6 | PX4IO                      |

## Інші архітектури

:::info
Внески від контрибюторів вітаються!
:::

## Дивіться також

- [Налаштування послідовних портів](../peripherals/serial_configuration.md)
- [Телеметрія MAVLink (OSD/GCS)](../peripherals/mavlink_peripherals.md)
