# Standard Configuration

This section covers the common software configuration and calibration needed for most PX4 vehicles, irrespective of their type or particular configuration.

The linked topics cover each of the steps in detail.
You must first [load firmware and select your vehicle frame/type](#firmware-vehicle-selection).
Most other steps can be done out of order, except for [tuning](#tuning), which must be done last.

:::tip
For vehicle-specific configuration topics see [multicopters](../config_mc/README.md), [helicopter](../config_heli/README.md), [planes](../config_fw/README.md), or [VTOL](../config_vtol/README.md).
:::

## Preconditions

Before starting this section you should [Download QGroundControl](http://qgroundcontrol.com/downloads/) and install it on your **desktop** computer.
Then open the QGC application menu ("Q" icon in the top-left corner) and choose **Vehicle Setup** in the _Select Tool_ popup:

![QGC Main Menu Popup: highlighting Vehicle Setup](../../assets/qgc/setup/menu_setup.png)

## Setup

### Firmware/Vehicle selection

- [Loading Firmware](../config/firmware.md)
- [Vehicle (Frame) Selection](../config/airframe.md)

### Motor/actuator setup

- [ESC Calibration](../advanced_config/esc_calibration.md)
- [Actuator Configuration and Testing](../config/actuators.md)

### Sensor calibration

- [Sensor Orientation](../config/flight_controller_orientation.md)
- [Compass](../config/compass.md)
- [Gyroscope](../config/gyroscope.md)
- [Accelerometer](../config/accelerometer.md)
- [Level Horizon](../config/level_horizon_calibration.md)
- [Airspeed](../config/airspeed.md) (Fixed-wing/VTOL only)

### Manual control setup

- [Radio Controller (RC) Setup](../config/radio.md)
- [Joystick Setup](../config/joystick.md)
- [Flight Mode Configuration](../config/flight_mode.md)

### Safety configuration

- [Battery and Power Module Setup](../config/battery.md) (optional)
- [Safety Configuration (Failsafes)](../config/safety.md) (optional)

### Tuning

- [Autotune](../config/autotune.md) (Recommended on vehicles and frames that support it)

## Video Guide

The video below shows the calibration process in detail (this uses an older version of _QGroundControl_, but most of the process is unchanged).

@[youtube](https://youtu.be/91VGmdSlbo4)

## Support

If you need help with the configuration you can ask for help on the [QGroundControl Support forum](https://discuss.px4.io//c/qgroundcontrol/qgroundcontrol-usage).

## See Also

- [QGroundControl > Setup](https://docs.qgroundcontrol.com/master/en/SetupView/SetupView.html)
- Vehicle-Centric Config/Tuning:

  - [Multicopter Config/Tuning](../config_mc/README.md)
  - [Helicopter Config/Tuning](../config_heli/README.md)
  - [Fixed Wing Config/Tuning](../config_fw/README.md)
  - [VTOL Config/Tuning](../config_vtol/README.md)

- [Flight Controller Peripherals](../peripherals/README.md) - Setup related to specific sensors, actuators, and so on.
- [Advanced Configuration](../advanced_config/README.md) - Factory/OEM calibration, configuring advanced features, less-common configuration.
