# Стандартні налаштування

У цьому розділі описано загальну конфігурацію програмного забезпечення та калібрування, необхідні для більшості пристроїв PX4.

Спочатку потрібно [ завантажити прошивку і вибрати каркас/тип вашого апарату](#firmware-vehicle-selection). Більшість інших кроків можна виконувати у довільному порядку, за винятком [налаштування](#tuning), яке має бути виконано в кінці.

## Попередні вимоги

Перед початком роботи вам слід [завантажити QGroundControl](http://qgroundcontrol.com/downloads/) і встановити його на ваш **робочий** комп'ютер. Потім відкрийте меню програми QGC (піктограма "Q" у верхньому лівому куті) і виберіть **Vehicle Setup** у спливаючому вікні _Select Tool_:

![QGC Main Menu Popup: highlighting Vehicle Setup](../../assets/qgc/setup/menu_setup.png)

## Етапи конфігурації

### Вибір прошивки/апарату

- [Завантаження прошивки](../config/firmware.md)
- [Вибір апарату (каркасу)](../config/airframe.md)

### Налаштування двигуна/приводу

- [Калібрування ESC (плати контролю двигунів)](../advanced_config/esc_calibration.md)
- [Конфігурація та тестування приводу](../config/actuators.md)

### Калібрування датчика

- [Орієнтація сенсорів](../config/flight_controller_orientation.md)
- [Компас](../config/compass.md)
- [Гіроскоп](../config/gyroscope.md)
- [Акселерометр](../config/accelerometer.md)
- [Level Horizon](../config/level_horizon_calibration.md)
- [Airspeed](../config/airspeed.md) (Fixed-wing/VTOL only)

> **Note:** Setup for optional sensors and specific hardware is provided in [Flight Controller Peripherals](../peripherals/README.md).

### Manual Control Setup

Radio Control:

- [Radio Controller (RC) Setup](../config/radio.md)
- [Flight Mode Configuration](../config/flight_mode.md)

Joystick/GamePad:

- [Joystick Setup](../config/joystick.md)

### Safety Configuration

- [Battery/Power Module Setup](../config/battery.md)
- [Safety Configuration (Failsafes)](../config/safety.md)

### Tuning

- [Autotune](../config/autotune.md) (Recommended on vehicles and frames that support it)

## Video Guide

The video below shows most of the calibration process (it uses an older version of _QGroundControl_, but most of the process is unchanged).

@[youtube](https://youtu.be/91VGmdSlbo4)

## Support

If you need help with the configuration you can ask for help on the [QGroundControl Support forum](https://discuss.px4.io//c/qgroundcontrol/qgroundcontrol-usage).

## See Also

- [QGroundControl > Setup](https://docs.qgroundcontrol.com/master/en/SetupView/SetupView.html)
- [Flight Controller Peripherals](../peripherals/README.md) - Setup specific sensors, optional sensors, actuators, and so on.
- [Advanced Configuration](../advanced_config/README.md) - Factory/OEM calibration, configuring advanced features, less-common configuration.
- Vehicle-Centric Config/Tuning:

  - [Multicopter Config/Tuning](../config_mc/README.md)
  - [Helicopter Config/Tuning](../config_heli/README.md)
  - [Fixed-wing Config/Tuning](../config_fw/README.md)
  - [VTOL Config/Tuning](../config_vtol/README.md)
