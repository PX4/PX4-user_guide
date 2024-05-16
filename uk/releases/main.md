# PX4-Autopilot Головна нотатка щодо релізу

Це містить зміни до PX4 з останнього основного релізу (v1.14).

## Прочитай перед оновленням

Уточнюється ...

## Основні зміни

- Уточнюється

## Інструкції для оновлення

## Інші зміни

### Підтримка апаратного забезпечення

- Уточнюється

### Загальні

- `SYS_MC_EST_GROUP` був видалений, і тепер є окремі параметри [EKF2_EN](../advanced_config/parameter_reference.md#EKF2_EN), [ATT_EN](../advanced_config/parameter_reference.md#ATT_EN), та [LPE_EN](../advanced_config/parameter_reference.md#LPE_EN) для [Перемикаючих станових оцінювачів](../advanced/switching_state_estimators.md). Більшість налаштувань повинні дозволяти [EKF2_EN](../advanced_config/parameter_reference.md#EKF2_EN) (значення за замовчуванням). Змінено в [PX4-Autopilot#22567](https://github.com/PX4/PX4-Autopilot/pull/22567).

### Управління

- [offboard][ros2 керування польотом](../flight_modes/offboard.md#ros-2-messages) дозволяє пряме керування двигунами та сервоприводами. Додано у [PX4-Autopilot#22222](https://github.com/PX4/PX4-Autopilot/pull/22222).

### Оцінки

- Уточнюється

### Сенсори

- Уточнюється

### Моделювання

- [Gazebo](../sim_gazebo_gz/index.md): Підтримка [Розширеного Літака](../sim_gazebo_gz/vehicles.md#advanced-plane), симульованого фіксованого крила, який забезпечує кращу аеродинамічну симуляцію, ніж звичайний літак. Додано до PX4 у [PX4-Autopilot#22167](https://github.com/PX4/PX4-Autopilot/pull/22167) та [gz-sim#2185](https://github.com/gazebosim/gz-sim/pull/2185) (плагін розштовхування та тяги).
- [Gazebo](../sim_gazebo_gz/index.md): Наразі змінна середовища `PX4_SIM_MODEL` може бути використана для вказання моделі симуляції. Це скасовує `PX4_GZ_MODEL`, яке тепер застаріло. Додано до PX4 у [PX4-Autopilot#22400](https://github.com/PX4/PX4-Autopilot/pull/22400).
- [Gazebo](../sim_gazebo_gz/index.md): Розділення між Gazebo та PX4 SITL. Дві частини симуляції зараз розділені. Вони можуть бути запущені незалежно в будь-якому порядку, і навіть працювати на різних хостах у мережі. Допомога Gazebo підтримує функцію перетягування за допомогою ресурсу ресурсу в Gazebo GUI. Додано у PX4 у [PX4-Autopilot#22467](https://github.com/PX4/PX4-Autopilot/pull/22467).

### uXRCE-DDS / ROS2

- [uXRCE-DDS](../middleware/uxrce_dds.md): [DDS Topics YAML](../middleware/uxrce_dds.md#dds-topics-yaml) тепер дозволяє використовувати `subscription_multi`, щоб вказати, що вказані теми ROS 2 надсилаються до окремого екземпляра теми uORB, зарезервованого для ROS 2. Це дозволяє PX4 розрізняти між оновленнями від ROS і тими, які надходять від видавців PX4 uORB. З цією зміною користувачі ROS2 тепер можуть вирішувати, чи повідомлення, які вони відправляють в PX4, будуть перекриватися з існуючими uORB або будуть збережені в окремих екземплярах. Додано в PX4 у [PX4-Autopilot#22266](https://github.com/PX4/PX4-Autopilot/pull/22266).

### MAVLink

- Уточнюється

### Мульти-Ротор

- [Запуск киданням](../flight_modes_mc/throw_launch.md)<Badge text="Experimental" type="warning"/>: Запустити багатокоптер, кидаючи його в повітря. Додано до PX4 у [PX4-Autopilot#21170](https://github.com/PX4/PX4-Autopilot/pull/21170).
- [Повільний Режим Позиції](../flight_modes_mc/position_slow.md): Повільна версія _Режиму Позиції_, де максимальні горизонтальна швидкість, вертикальна швидкість і швидкість повороту можуть бути налаштовані на менші значення (використовуючи параметри, ручки/перемикачі контролера RC або MAVLink). Додано до PX4 у [PX4-Autopilot#22102](https://github.com/PX4/PX4-Autopilot/pull/22102).

### VTOL

- Уточнюється

### Літак з фіксованим крилом

- [Спрощена конфігурація датчика швидкості повітря](../config_vtol/vtol_without_airspeed_sensor.md): Параметр `CBRK_AIRSPD_CHK` замінений на [SYS_HAS_NUM_ASPD](../advanced_config/parameter_reference.md#SYS_HAS_NUM_ASPD), а параметр `FW_ARSP_MODE` перейменовано на [FW_USE_AIRSPD](../advanced_config/parameter_reference.md#FW_USE_AIRSPD). Щоб мати можливість озброїти без датчика швидкості повітря, встановіть `SYS_HAS_NUM_ASPD` на 0. Щоб не використовувати дані датчика швидкості повітря в контролері, встановіть `FW_USE_AIRSPD` на 0. Додано до PX4 у [PX4-Autopilot#22510](https://github.com/PX4/PX4-Autopilot/pull/22510).

### Ровер

- [Aion R1](../frames_rover/aion_r1.md)<Badge text="Експериментальний" type="warning"/>: ESC драйвер для контролера руху Roboclaw. Це постачається разом із інструкціями зі збірки та підтримкою для Aion R1, нового рухомого ровера з диференційним приводом, разом із інформацією про інтеграцію контролера руху мотора Roboclaw.

### ROS 2

- [PX4 ROS 2 Interface бібліотека](../ros2/px4_ros2_interface_lib.md)<Badge text="Experimental" type="warning"/>: A new C++ library that simplifies controlling PX4 from ROS 2. Підтримує додавання режимів польоту в ROS 2, які є рівними режимів PX4, які працюють на керуванні польоту. Додано до PX4 у [PX4-Autopilot#20707](https://github.com/PX4/PX4-Autopilot/pull/20707) (початкова підтримка). Перейти до точки установки: https://github.com/PX4/PX4-Autopilot/pull/22375
