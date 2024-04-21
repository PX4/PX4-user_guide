# Збірка DJI FlameWheel 450 + CUAV V5 nano

Ця тема надає повні інструкції для збирання комплекту та налаштування PX4 з використанням *QGroundControl*.

Основна Інформація

- **Каркас:** DJI F450
- **Контролер польоту:** [CUAV V5 nano](../flight_controller/cuav_v5_nano.md)
- **Час зборки (приблизно):** 90 хвилин (45 хвилин на раму, 45 хвилин на встановлення/налаштування автопілота)

![Finished setup](../../assets/airframes/multicopter/dji_f450_cuav_5nano/f450_cuav5_nano_complete.jpg)

## Специфікація матеріалів

Компоненти, необхідні для цієї збірки, є:
- Контролер польоту: [CUAV V5 nano](https://store.cuav.net/shop/v5-nano/):
  - GPS: [CUAV NEO V2 GPS](https://store.cuav.net/index.php?id_product=97&id_product_attribute=0&rewrite=cuav-new-ublox-neo-m8n-gps-module-with-shell-stand-holder-for-flight-controller-gps-compass-for-pixhack-v5-plus-rc-parts-px4&controller=product&id_lang=1)
  - Power Module
- Frame: [DJI F450](https://www.amazon.com/Flame-Wheel-Basic-Quadcopter-Drone/dp/B00HNMVQHY)
- Propellers: [DJI Phantom Built-in Nut Upgrade Propellers 9.4x5](https://www.masterairscrew.com/collections/all-products/products/dji-phantom-built-in-nut-upgrade-propellers-in-white-mr-9-4x5-prop-set-x4-phantom)
- Battery: [Turnigy High Capacity 5200mAh 3S 12C Lipo Pack w/XT60](https://hobbyking.com/en_us/turnigy-high-capacity-5200mah-3s-12c-multi-rotor-lipo-pack-w-xt60.html?___store=en_us)
- Telemetry: [Holybro Transceiver Telemetry Radio V3](../telemetry/holybro_sik_radio.md)
- RC Receiver: [FrSky D4R-II 2.4G 4CH ACCST Telemetry Receiver](https://www.banggood.com/FrSky-D4R-II-2_4G-4CH-ACCST-Telemetry-Receiver-for-RC-Drone-FPV-Racing-p-929069.html?cur_warehouse=GWTR)
- Motors: [DJI E305 2312E Motor (960kv,CW)](https://www.amazon.com/DJI-E305-2312E-Motor-960kv/dp/B072MBMCZN)
- ESC: Hobbywing XRotor 20A APAC Brushless ESC 3-4S For RC Multicopters


Крім того, ми використовували контролер FrSky Taranis. Вам також знадобляться хомутів, двостороння стрічка, паяльник.

На наведеному нижче зображенні показані як рама, так і електронні компоненти.

![All components used in this build](../../assets/airframes/multicopter/dji_f450_cuav_5nano/all_components.jpg)


## Обладнання

### Frame

Цей розділ містить усе обладнання для каркасів.

| Опис                                              | Quantity |
| ------------------------------------------------- | -------- |
| DJI F450 Bottom plate                             | 1        |
| DJI F450 Top plate                                | 1        |
| DJI F450 legs with landing gear                   | 4        |
| M3*8 screws                                       | 18       |
| M2 5*6 screws                                     | 24       |
| Velcro Battery Strap                              | 1        |
| DJI Phantom Built-in Nut Upgrade Propellers 9.4x5 | 1        |

![F450 frame components](../../assets/airframes/multicopter/dji_f450_cuav_5nano/f450_frame_components.png)


### CUAV v5 nano Package

This section lists the components in the CUAV v5 nano package.

| Description               | Quantity (Default Package) | Quantity (+GPS Package) |
| ------------------------- | -------------------------- | ----------------------- |
| V5 nano flight controller | 1                          | 1                       |
| DuPont Cable              | 2                          | 2                       |
| I2C/CAN Cable             | 2                          | 2                       |
| ADC 6.6 Cable             | 2                          | 2                       |
| SBUS Signal Cable         | 1                          | 1                       |
| IRSSI Cable               | 1                          | 1                       |
| DSM Signal Cable          | 1                          | 1                       |
| ADC 3.3 Cable             | 1                          | 1                       |
| Debug Cable               | 1                          | 1                       |
| Safety Switch Cable       | 1                          | 1                       |
| Voltage & Current Cable   | 1                          | 1                       |
| PW-Link Module Cable      | 1                          | 1                       |
| Power Module              | 1                          | 1                       |
| SanDisk 16GB Memory Card  | 1                          | 1                       |
| 12C Expansion Board       | 1                          | 1                       |
| TTL Plate                 | 1                          | 1                       |
| NEO GPS                   | -                          | 1                       |
| GPS Bracket               | -                          | 1                       |


### Electronics

| Description                                           | Quantity |
| ----------------------------------------------------- | -------- |
| CUAV V5 nano                                          | 1        |
| CUAV NEO V2 GPS                                       | 1        |
| Holibro Telemetry                                     | 1        |
| FrSky D4R-II 2.4G 4CH ACCST Telemetry Receiver        | 1        |
| DJI E305 2312E Motor (800kv,CW)                       | 4        |
| Hobbywing XRotor 20A APAC Brushless ESC               | 4        |
| Power Module(Included in the CUAV V5 nano package)    | 1        |
| Turnigy High Capacity 5200mAh 3S 12C Lipo Pack w/XT60 | 1        |


### Tools needed

The following tools are used in this assembly:

- 2.0mm Hex screwdriver
- 3mm Phillips screwdriver
- Wire cutters
- Precision tweezers
- Soldering iron


![Required tools](../../assets/airframes/multicopter/dji_f450_cuav_5nano/required_tools.jpg)

## Збірка

Приблизний час для збирання становить приблизно 90 хвилин (близько 45 хвилин на раму та 45 хвилин на встановлення автопілота та налаштування корпусу.

1. Прикріпіть 4 ніжки до нижньої пластини за допомогою наданих гвинтів.

   ![Arms to bottom plate](../../assets/airframes/multicopter/dji_f450_cuav_5nano/1_attach_arms_bottom_plate.jpg)

1. Припаяйте ЕСК (електронний регулятор швидкості) до плати, позитивний (червоний) та негативний (чорний).

   ![Solder ESCs](../../assets/airframes/multicopter/dji_f450_cuav_5nano/2_solder_esc.jpg)

1. Припаяйте модуль живлення, позитивний (червоний) та негативний (чорний).

   ![Solder power module](../../assets/airframes/multicopter/dji_f450_cuav_5nano/3_solder_power_module.jpg)

1. Підключіть двигуни до ESC відповідно до їхніх позицій.

   ![Plug in motors](../../assets/airframes/multicopter/dji_f450_cuav_5nano/4_plug_in_motors.jpg)

1. Прикріпіть двигуни до відповідних рук.

   ![Attach motors to arms (white)](../../assets/airframes/multicopter/dji_f450_cuav_5nano/5a_attach_motors_to_arms.jpg) ![Attach motors to arms (red)](../../assets/airframes/multicopter/dji_f450_cuav_5nano/5b_attach_motors_to_arms.jpg)

1. Додайте верхню дошку (прикрутіть до верхньої частини ніг).

   ![Add top board](../../assets/airframes/multicopter/dji_f450_cuav_5nano/6_add_top_board.jpg)

1. Додайте амортизаційну пінку до польотного контролера *CUAV V5 nano*.

   ![Damping foam](../../assets/airframes/multicopter/dji_f450_cuav_5nano/7a_attach_cuav5nano.jpg) ![Damping foam](../../assets/airframes/multicopter/dji_f450_cuav_5nano/7b_attach_cuav5nano.jpg)

1. Прикріпіть приймач FrSky до нижньої плати за допомогою двосторонньої стрічки.

   ![Attach FrSky receiver with double-sided tape](../../assets/airframes/multicopter/dji_f450_cuav_5nano/8_attach_frsky.jpg)

1. Прикріпіть телеметричний модуль до нижньої плати транспортного засобу за допомогою двосторонньої стрічки.

   ![Attach telemetry radio](../../assets/airframes/multicopter/dji_f450_cuav_5nano/9a_telemtry_radio.jpg) ![Attach telemetry radio](../../assets/airframes/multicopter/dji_f450_cuav_5nano/9b_telemtry_radio.jpg)

1. Поставте алюмінієві опори на платформу кнопок і прикріпіть GPS.

   ![Aluminium standoffs](../../assets/airframes/multicopter/dji_f450_cuav_5nano/10_aluminium_standoffs.jpg)

1. Підключіть телеметрію (`TELEM1`), модуль GPS (`GPS/SAFETY`), приймач RC (`RC`), всі 4 ESC (`M1-M4`), та модуль живлення (`Power1`) до контролера польоту. ![Attach peripherals to flight controller](../../assets/airframes/multicopter/dji_f450_cuav_5nano/12_fc_attach_periperhals.jpg)

   :::info Порядок мотора визначено в [Довідник з літальних апаратів > Квадрокоптер x](../airframes/airframe_reference.md#quadrotor-x)
:::

Ось і все! Останню збірку показано нижче:

![Finished Setup](../../assets/airframes/multicopter/dji_f450_cuav_5nano/f450_cuav5_nano_complete.jpg)


## Налаштування PX4

*QGroundControl* використовується для встановлення автопілота PX4 та його налаштування / налаштування для рами. [Завантажте та встановіть](http://qgroundcontrol.com/downloads/) *QGroundControl* для вашої платформи.

:::tip
Повні інструкції щодо встановлення та налаштування PX4 можна знайти в [Основна конфігурація](../config/index.md).
:::

Спочатку оновіть прошивку, конструкцію та виходи:

- [Прошивка](../config/firmware.md)
- [Airframe](../config/airframe.md)

  ::: info You will need to select the *Generic Quadcopter* airframe (**Quadrotor x > Generic Quadcopter**).

  ![QGroundControl - Select Generic Quadcopter](../../assets/airframes/multicopter/dji_f450_cuav_5nano/qgc_airframe_generic_quadx.png)
:::

- [Actuators](../config/actuators.md)
  - Update the vehicle geometry to match the frame.
  - Assign actuator functions to outputs to match your wiring.
  - Test the configuration using the sliders.


Then perform the mandatory setup/calibration:

- [Sensor Orientation](../config/flight_controller_orientation.md)
- [Compass](../config/compass.md)
- [Accelerometer](../config/accelerometer.md)
- [Level Horizon Calibration](../config/level_horizon_calibration.md)
- [Radio Setup](../config/radio.md)
- [Flight Modes](../config/flight_mode.md)

  ::: info For this build we set up modes *Stabilized*, *Altitude* and *Position* on a three-way switch on the receiver (mapped to a single channel - 5). This is the recommended minimal set of modes for beginners.
:::

Ideally you should also do:

- [ESC Calibration](../advanced_config/esc_calibration.md)
- [Battery Estimation Tuning](../config/battery.md)
- [Safety](../config/safety.md)


## Вдосконалення

Набори вибору конструкції встановлюють параметри автопілота *за замовчуванням* для рами. Ці можуть бути достатньо хороші для польоту, але вам слід налаштувати кожну конструкцію рами.

Для інструкцій щодо того, як розпочати, почніть з [Автоналаштування](../config/autotune.md).


## Відео

@[youtube](https://youtu.be/b0bKNdDqVHw)


## Подяки

Цей журнал збірки був наданий Командою тестового польоту Dronecode.
