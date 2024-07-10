# Modules Reference: Controller

## airship_att_control
Джерело: [modules/airship_att_control](https://github.com/PX4/PX4-Autopilot/tree/main/src/modules/airship_att_control)


### Опис
Це реалізує регулятор положення аеростата і швидкості. В ідеалі це має приймати задані значення положення (`vehicle_attitude_setpoint`) або задані значення швидкості (у режимі acro через тему `manual_control_setpoint`) як вхідні та вихідні повідомлення керування приводом.

Наразі він передає тему `manual_control_setpoint_setpoint` безпосередньо до актуаторів.

### Реалізація
Щоб зменшити затримку керування, модуль безпосередньо опитує тему гіроскопа, опубліковану драйвером IMU.


<a id="airship_att_control_usage"></a>

### Використання
```
airship_att_control <command> [arguments...]
 Commands:
   start

   stop

   status        print status info
```
## control_allocator
Джерело: [modules/control_allocator](https://github.com/PX4/PX4-Autopilot/tree/main/src/modules/control_allocator)


### Опис
Це реалізує розподіл управління. Він приймає задані значення крутного моменту та тяги як вхідні та вихідні повідомлення про задані значення привода.

<a id="control_allocator_usage"></a>

### Використання
```
control_allocator <command> [arguments...]
 Commands:
   start

   stop

   status        print status info
```
## differential_drive
Джерело: [modules/differential_drive](https://github.com/PX4/PX4-Autopilot/tree/main/src/modules/differential_drive)


### Опис
Rover Differential Drive контроллер.

<a id="differential_drive_usage"></a>

### Використання
```
differential_drive <command> [arguments...]
 Commands:
   start

   stop

   status        print status info
```
## flight_mode_manager
Джерело: [modules/flight_mode_manager](https://github.com/PX4/PX4-Autopilot/tree/main/src/modules/flight_mode_manager)


### Опис
Це реалізує генерацію заданого значення для всіх режимів. Він приймає поточний стан режиму транспортного засобу як вхідні дані і виводить задані значення для контролерів.


<a id="flight_mode_manager_usage"></a>

### Використання
```
flight_mode_manager <command> [arguments...]
 Commands:
   start

   stop

   status        print status info
```
## fw_att_control
Джерело: [modules/fw_att_control](https://github.com/PX4/PX4-Autopilot/tree/main/src/modules/fw_att_control)


### Опис
fw_att_control - регулятор положення фіксованого крила.


<a id="fw_att_control_usage"></a>

### Використання
```
fw_att_control <command> [arguments...]
 Commands:
   start
     [vtol]      VTOL mode

   stop

   status        print status info
```
## fw_pos_control
Джерело: [modules/fw_pos_control](https://github.com/PX4/PX4-Autopilot/tree/main/src/modules/fw_pos_control)


### Опис
fw_pos_control - контролер положення фіксованого крила.


<a id="fw_pos_control_usage"></a>

### Використання
```
fw_pos_control <command> [arguments...]
 Commands:
   start
     [vtol]      VTOL mode

   stop

   status        print status info
```
## fw_rate_control
Джерело: [modules/fw_rate_control](https://github.com/PX4/PX4-Autopilot/tree/main/src/modules/fw_rate_control)


### Опис
fw_rate_control - регулятор швидкості фіксованого крила.


<a id="fw_rate_control_usage"></a>

### Використання
```
fw_rate_control <command> [arguments...]
 Commands:
   start
     [vtol]      VTOL mode

   stop

   status        print status info
```
## mc_att_control
Джерело: [modules/mc_att_control](https://github.com/PX4/PX4-Autopilot/tree/main/src/modules/mc_att_control)


### Опис
Це реалізує контролер положення мультикоптера. Він приймає значення кута нахилу (`vehicle_attitude_setpoint`) як вхідні дані, а на виході отримує значення швидкості.

Контролер має P цикл для кутової похибки

Публікація, що документує реалізоване кватерніонне керування положенням: Nonlinear Quadrocopter Attitude Control (2013) by Dario Brescianini, Markus Hehn and Raffaello D'Andrea Institute for Dynamic Systems and Control (IDSC), ETH Zurich

https://www.research-collection.ethz.ch/bitstream/handle/20.500.11850/154099/eth-7387-01.pdf


<a id="mc_att_control_usage"></a>

### Використання
```
mc_att_control <command> [arguments...]
 Commands:
   start
     [vtol]      VTOL mode

   stop

   status        print status info
```
## mc_pos_control
Джерело: [modules/mc_pos_control](https://github.com/PX4/PX4-Autopilot/tree/main/src/modules/mc_pos_control)


### Опис
Контролер має два контури: P цикл для помилки положення і PID цикл для помилки швидкості. Виходом контролера швидкості є вектор тяги, який розділяється на напрямок тяги (тобто матрицю обертання для орієнтації мультикоптера) та скаляр тяги (тобто саму тягу мультикоптера).

Контролер не використовує кути Ейлера для своєї роботи, вони генеруються лише для більш зручного керування та логування.

<a id="mc_pos_control_usage"></a>

### Використання
```
mc_pos_control <command> [arguments...]
 Commands:
   start
     [vtol]      VTOL mode

   stop

   status        print status info
```
## mc_rate_control
Джерело: [modules/mc_rate_control](https://github.com/PX4/PX4-Autopilot/tree/main/src/modules/mc_rate_control)


### Опис
Це реалізує мультикоптерний регулятор швидкості. Він приймає значення швидкості (у режимі acro через тему `manual_control_setpoint_setpoint`) як вхідні та вихідні повідомлення керування актуатором.

Контролер має PID-цикл для компенсації похибки кутової швидкості.


<a id="mc_rate_control_usage"></a>

### Використання
```
mc_rate_control <command> [arguments...]
 Commands:
   start
     [vtol]      VTOL mode

   stop

   status        print status info
```
## navigator
Джерело: [modules/navigator](https://github.com/PX4/PX4-Autopilot/tree/main/src/modules/navigator)


### Опис
Модуль відповідає за автономні режими польоту. Це включає місії (читайте з dataman), взліт та RTL. Він також відповідає за перевірку порушень геозони.

### Реалізація
Різні внутрішні режими реалізовано у вигляді окремих класів, які успадковуються від загального базового класу `NavigatorMode`. Елемент `_navigation_mode` містить поточний активний режим.

Навігатор публікує триплети заданих значень позиції (`position_setpoint_triplet_s`), які потім використовуються контролером положення.


<a id="navigator_usage"></a>

### Використання
```
navigator <command> [arguments...]
 Commands:
   start

   fencefile     load a geofence file from SD card, stored at etc/geofence.txt

   fake_traffic  publishes 24 fake transponder_report_s uORB messages

   stop

   status        print status info
```
## rover_ackermann
Source: [modules/rover_ackermann](https://github.com/PX4/PX4-Autopilot/tree/main/src/modules/rover_ackermann)


### Опис
Rover ackermann module.

<a id="rover_ackermann_usage"></a>

### Використання
```
rover_ackermann <command> [arguments...]
 Commands:
   start

   stop

   status        print status info
```
## rover_pos_control
Джерело: [modules/rover_pos_control](https://github.com/PX4/PX4-Autopilot/tree/main/src/modules/rover_pos_control)


### Опис
Контролює положення ровера за допомогою L1 контролера.

Публікує `vehicle_thrust_setpoint (тільки по x) і vehicle_torque_setpoint (тільки по yaw)` повідомлення на IMU_GYRO_RATEMAX.

### Реалізація
Наразі ця реалізація підтримує лише декілька режимів:

 * Повна ручна: Throttle та yaw контроль передається безпосередньо на актуатори
 * Автоматична місія: Ровер виконує місії
 * Loiter: Ровер буде рухатися в межах радіусу очікування, а потім вимкне двигуни

### Приклади
Приклад використання CLI:
```
rover_pos_control start
rover_pos_control status
rover_pos_control stop
```


<a id="rover_pos_control_usage"></a>

### Використання
```
rover_pos_control <command> [arguments...]
 Commands:
   start

   stop

   status        print status info
```
## uuv_att_control
Джерело: [modules/uuv_att_control](https://github.com/PX4/PX4-Autopilot/tree/main/src/modules/uuv_att_control)


### Опис
Контролює положення безпілотного підводного апарату (UUV).

Публікує повідомлення `vehicle_thrust_setpont` та `vehicle_torque_setpoint` зі сталою частотою 250 Гц.

### Реалізація
Наразі ця реалізація підтримує лише декілька режимів:

 * Повна ручна: Roll, pitch, yaw, та throttle контроль передається безпосередньо до актуаторів
 * Автоматична місія: UUV виконує місії

### Приклади
Приклад використання CLI:
```
uuv_att_control start
uuv_att_control status
uuv_att_control stop
```


<a id="uuv_att_control_usage"></a>

### Використання
```
uuv_att_control <command> [arguments...]
 Commands:
   start

   stop

   status        print status info
```
## uuv_pos_control
Джерело: [modules/uuv_pos_control](https://github.com/PX4/PX4-Autopilot/tree/main/src/modules/uuv_pos_control)


### Опис
Контролює положення безпілотного підводного апарату (UUV). Публікує повідомлення `attitude_setpoint`.
### Реалізація
Наразі ця реалізація підтримує лише декілька режимів:
 * Повна ручна: Roll, pitch, yaw, та throttle контроль передається безпосередньо до актуаторів
 * Автоматична місія: UUV виконує місії
### Приклади
Приклад використання CLI:
```
uuv_pos_control start
uuv_pos_control status
uuv_pos_control stop
```

<a id="uuv_pos_control_usage"></a>

### Використання
```
uuv_pos_control <command> [arguments...]
 Commands:
   start

   stop

   status        print status info
```
## vtol_att_control
Джерело: [modules/vtol_att_control](https://github.com/PX4/PX4-Autopilot/tree/main/src/modules/vtol_att_control)


### Description
fw_att_control - регулятор положення фіксованого крила.

<a id="vtol_att_control_usage"></a>

### Usage
```
vtol_att_control <command> [arguments...]
 Commands:

   stop

   status        print status info
```
