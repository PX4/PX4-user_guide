# Структура файлів на SD картках для PX4

SD картка у PX4 використовуються для зберігання файлів налаштування, журналів польотів, інформації щодо польотного завдання тощо.

:::tip
The SD card should be FAT32 formatted for use with PX4 (this is the default for SD cards).
Рекомендуємо відформатувати картки, які використовують іншу файлову систему.
:::

Структуру директорій/розкладку показано нижче.

| Директорія/Файл(и) | Опис                                                                                               |
| ------------------------------------- | -------------------------------------------------------------------------------------------------- |
| `/etc/`                               | Додаткові налаштування. See [System Startup > Replacing the System Startup][replace system start]. |
| `/log/`                               | Full [flight logs](../dev_log/logging.md)                                                          |
| `/mission_log/`                       | Скорочені журнали польоту                                                                          |
| `/fw/`                                | [DroneCAN](../dronecan/index.md) firmware                                                          |
| `/uavcan.db/`                         | Сервер DB DroneCAN DNA + журнали                                                                   |
| `/params`                             | Параметри (якщо вони не в FRAM/FLASH)                                           |
| `/dataman`                            | Файл сховища польотних завдань                                                                     |
| `/fault_<datetime>.txt`               | Файли журналу апаратних відмов                                                                     |
| `/bootlog.txt`                        | Журнал завантаження                                                                                |

[replace system start]: ../concept/system_startup.md#replacing-the-system-startup
