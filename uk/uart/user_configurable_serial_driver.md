# Готуємо драйвер Послідовного Порту до користувацьких налаштувань

Ця тема пояснює, як підготувати драйвер послідовного порту для того, щоб користувач міг налаштувати його (через параметри) для роботи на послідовних портах будь-якого політного контролера.

## Попередні вимоги

Очікується, що драйвер вже існує і запускається в командному рядку, використовуючи синтаксис команди:

```sh

```

де

- `-d`: ім'я послідовного порту.
- `-b`: швидкість бодів \[baud rate\] (необов'язково), якщо драйвер підтримує декілька варіантів швидкості бодів. Якщо підтримується, драйвер мусить дозволити вказати швидкість бодів і як просто число, і як параметр, з синтаксисом `-b p:<param_name>` (що може бути передане через `px4_get_parameter_value()`) :::tip Дивіться [gps driver](https://github.com/PX4/PX4-Autopilot/blob/main/src/drivers/gps/gps.cpp#L1023) як приклад.
:::

## Робимо драйвер налаштовуваним

Аби зробити драйвер налаштовуваним:

1. Створіть конфігураційний файл модуля YAML:

   - Додайте новий файл з іменем **module.yaml** у директорію з сорс кодом драйверу
   - Вставте наступний текст і підлаштуйте за потреби:

     ```cmake
     module_name: uLanding Radar
     serial_config:
         - command: ulanding_radar start -d ${SERIAL_DEV} -b p:${BAUD_PARAM}
           port_config_param:
             name: SENS_ULAND_CFG
             group: Sensors
     ```

     ::: info The full documentation of the module configuration file can be found in the [validation/module_schema.yaml](https://github.com/PX4/PX4-Autopilot/blob/main/validation/module_schema.yaml) file. Це також використовується для перевірки всіх файлів конфігурації в CI.
:::

1. Додайте конфігурацію модулів в **CMakeLists.txt** файл драйвера модуль:

   ```cmake
   px4_add_module(
    MODULE drivers__ulanding
    MAIN ulanding_radar
    SRCS
        ulanding.cpp
    MODULE_CONFIG
        module.yaml
    )
   ```
