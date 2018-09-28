# Benewake TFmini LiDAR

The [Benewake TFmini LiDAR](http://www.benewake.com/en/tfmini.html) is a tiny, low cost, and low power LIDAR with 12m range.
It must be connected to a UART/serial bus.

![TFmini LiDAR](../../assets/hardware/sensors/tfmini/tfmini_hero.jpg)


## Hardware Setup

TFmini can be connected to any unused *serial port* (UART), e.g.: TELEM2, TELEM3, GPS2 etc.


## Parameter Setup

[Configure the serial port](../peripherals/serial_configuration.md) on which the lidar will run using [SENS_TFMINI_CFG](../advanced_config/parameter_reference.md#SENS_TFMINI_CFG).

> **Note** If `SENS_TFMINI_CFG` is not available in *QGroundControl* then you will need to [add the driver to the firmware](#firmware).


## Firmware Setup {#firmware}

> **Note** PX4 firmware includes the TFmini driver by default on most [Pixhawk-series](../flight_controller/pixhawk_series.md) boards.
  This step is only required for the few boards that don't include it in firmware.

You can include the driver in firmware by adding the following line to the [cmake config file](https://github.com/PX4/Firmware/tree/master/cmake/configs) that corresponds to the target you want to build for:

```
drivers/distance_sensor/tfmini
```

You will then need to build the firmware for your platform, as described in [Building PX4 Software](https://dev.px4.io/en/setup/building_px4.html) (PX4 Development Guide).