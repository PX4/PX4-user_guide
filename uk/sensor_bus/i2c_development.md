# Шина I2C (Огляд розробки)

I2C - це протокол послідовного обміну даними у вигляді пакетів, який дозволяє підключати кілька головних пристроїв до кількох підчинених пристроїв, використовуючи лише 2 провідника для кожного з'єднання. Цей протокол призначений для підключення периферійних ІС з низькою швидкістю до процесорів та мікроконтролерів у короткій дистанційній, внутрішньоплатній комунікації.

Pixhawk/PX4 підтримує її для:
* Підключення зовнішніх компонентів, які вимагають вищих швидкостей передачі даних, ніж ті, що надає строгий послідовний UART, такі як далекоміри.
* Сумісність з периферійними пристроями, які підтримують лише I2C.
* Дозвіл декількох пристроїв приєднатися до одного шини (корисно для збереження портів). Наприклад, світлодіоди, компас, дальномери і т. д.

::: info Сторінка [Апаратне > Периферійні пристрої I2C](../sensor_bus/i2c_general.md) містить інформацію про те, як _використовувати_ (а не інтегрувати) периферійні пристрої I2C та вирішувати типові проблеми налаштування.
:::

:::tip IMUs (акселерометри/гіроскопи) не повинні бути підключені через I2C (зазвичай використовується шина [SPI](https://en.wikipedia.org/wiki/Serial_Peripheral_Interface_Bus)). Шина недостатньо швидка навіть з одним приєднаним пристроєм для виконання фільтрації вібрації (наприклад), і продуктивність погіршується ще більше з кожним додатковим пристроєм на шині.
:::

## Інтеграція пристроїв I2C

Драйвери повинні `#include <drivers/device/i2c.h>` та потім надати реалізацію абстрактного базового класу `I2C`, визначеного в **I2C.hpp** для цільового обладнання (тобто для NuttX [тут](https://github.com/PX4/PX4-Autopilot/blob/release/1.15/src/lib/drivers/device/nuttx/I2C.hpp)).

Невелика кількість водіїв також повинні включати заголовки для свого типу пристрою (**drv_*.h**) в [/src/drivers/](https://github.com/PX4/PX4-Autopilot/tree/main/src/drivers) - наприклад, [drv_led.h](https://github.com/PX4/PX4-Autopilot/blob/release/1.15/src/drivers/drv_led.h).

Для включення драйвера в прошивку потрібно додати драйвер до файлу cmake, специфічного для плати, який відповідає цілі, для якої ви хочете збудувати. Ви можете це зробити для одного драйвера:
```
CONFIG_DRIVERS_DISTANCE_SENSOR_LIGHTWARE_LASER_I2C=y
```

Ви також можете включити всі драйвери певного типу.
```
CONFIG_COMMON_DISTANCE_SENSOR=y
```

:::tip
Наприклад, ви можете побачити / знайти `CONFIG_DRIVERS_DISTANCE_SENSOR_LIGHTWARE_LASER_I2C` в конфігурації [px4_fmu-v4_default](https://github.com/PX4/PX4-Autopilot/blob/release/1.15/boards/px4/fmu-v4/default.px4board).
:::

## Приклади драйвера I2C

Щоб знайти приклади драйверів I2C, шукайте **i2c.h** за посиланням [/src/drivers/](https://github.com/PX4/PX4-Autopilot/tree/main/src/drivers).

Ось декілька прикладів:
* [drivers/distance_sensor/lightware_laser_i2c](https://github.com/PX4/PX4-Autopilot/tree/main/src/drivers/distance_sensor/lightware_laser_i2c) - Драйвер I2C для [Lightware SF1XX LIDAR](../sensor/sfxx_lidar.md).
* [drivers/distance_sensor/lightware_laser_serial](https://github.com/PX4/PX4-Autopilot/tree/main/src/drivers/distance_sensor/lightware_laser_serial) - Серійний драйвер для [Lightware SF1XX LIDAR](../sensor/sfxx_lidar.md).
* [drivers/ms5611](https://github.com/PX4/PX4-Autopilot/tree/main/src/drivers/barometer/ms5611) - Драйвер I2C для барометричного датчика тиску MS5611 та MS6507, підключеного через I2C (або SPI).

## Детальна інформація

* [I2C](https://en.wikipedia.org/wiki/I%C2%B2C) (Вікіпедія)
* [Порівняльний огляд I2C](https://learn.sparkfun.com/tutorials/i2c) (learn.sparkfun.com)
* [Фреймворк драйвера](../middleware/drivers.md)
