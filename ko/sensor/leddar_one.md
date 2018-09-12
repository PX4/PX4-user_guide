# LeddarOne Lidar

[LeddarOne](https://leddartech.com/modules/leddarone/) is small-size Lidar module with a narrow, yet diffuse beam that offers excellent overall detection range and performance, in a robust, reliable, cost-effective package. It has a sensing range from 1cm to 40m and needs to be connected to a UART/serial bus.

<img src="../../assets/hardware/sensors/leddar_one.jpg" alt="LeddarOne Lidar rangefinder" width="200px" />

## Overview {#leddar_one_support}

PX4 supports LeddarOne "out of the box" for many flight controllers.

The driver is present in firmware by default on many [Pixhawk-series](../flight_controller/pixhawk_series.md) boards, including: px4fmu-v3, px4fmu-v4, px4fmu-v4pro, px4fmu-v5, aerofc-v1, aerocore2, auav-X21, mindpx-v2, nxphlite-v3.

> **Tip** You can use any other board but you will need to [add the driver to the firmware](#firmware).

The [SENS_EN_LEDDAR1](../advanced_config/parameter_reference.md#SENS_EN_LEDDAR1) can be used to start the driver on the following (board-specific) ports:

| Board          | Port           |
| -------------- | -------------- |
| PX4FMU_V2      | Serial 4/5     |
| PX4FMU_V4PRO   | Serial 4/5     |
| Intel Aero RTF | TELEMETRY port |
| Other boards   | TELEM2         |

<!-- above list from https://github.com/PX4/Firmware/blob/master/ROMFS/px4fmu_common/init.d/rc.sensors#L421 -->

> **Tip** You can connect to any other free serial port but you will need to [start the driver](#start_driver) on that port.

## Parameter Setup

To enable LeddarOne set the [SENS_EN_LEDDAR1](../advanced_config/parameter_reference.md#SENS_EN_LEDDAR1) parameter to 1 ([instructions here](../advanced_config/parameters.md)) and reboot the board.

> **Note** Your hardware must be connected to the board-specific port [listed above](#leddar_one_support) in order to enable it using this parameter.

<span></span>

> **Warning** If you are connecting the hardware to **TELEM2** then set the parameter [SYS_COMPANION](../advanced_config/parameter_reference.md#SYS_COMPANION) to 0. Otherwise the serial port may be used by another application and you will get unexpected behaviour.

## Hardware Setup

Build a cable following your board and pinout and LeddarOne pinout (shown below). You only will need to connect 5V, TX, RX and GND pins.

| Pin | LeddarOne |
| --- | --------- |
| 1   | GND       |
| 2   | -         |
| 3   | VCC       |
| 4   | RX        |
| 5   | TX        |
| 6   | -         |

> **Note** You can connect to any free port, but usually you'll use the board-specific port [listed above](#leddar_one_support).

## Additional Setup

This is only required if you want to use LeddarOne on a board that doesn't include it in firmware, or to connect to a different port.

### Add LeddarOne to Firmware {#firmware}

LeddarOne is present if the build configuration includes `drivers/distance_sensor` or `drivers/distance_sensor/leddar_one` (check using [this search](https://github.com/PX4/Firmware/search?utf8=%E2%9C%93&q=%22drivers%2Fdistance_sensor%22)).

If it isn't present you can include the driver in firmware by adding the following line to the [cmake config file](https://github.com/PX4/Firmware/tree/master/cmake/configs) that corresponds to the target you want to build for:

    drivers/distance_sensor/leddar_one
    

### Start the Driver {#start_driver}

If you want to use LeddarOne on a different port than [listed above](#leddar_one_support) you will need to manually start the driver during system startup.

The easiest way to do this is to add the following line to an [extras.txt](https://dev.px4.io/en/advanced/system_startup.html) file located on your SD card.

    leddar_one start -d /dev/serial_port
    

In the above command you will have to replace the last argument with the id of the serial port used to connect the hardware.

> **Warning** If you are connecting to **TELEM2** then set the parameter [SYS_COMPANION](../advanced_config/parameter_reference.md#SYS_COMPANION) to 0. Otherwise the serial port may be used by another application and you will get unexpected behaviour.

## Intel Aero {#aero}

The LeddarOne is the recommended rangefinder for the *Intel® Aero Ready to Fly Drone*. For more information on hardware setup and configuration see: [The Intel® Aero Ready to Fly Drone](../flight_controller/intel_aero.md#leddarone).

## Further Information

<!-- Would be good to add links to topics on adding drivers to firmware -->

* [PX4 Development Guide](https://dev.px4.io/en/)
* [System Startup > Customizing the System Startup](https://dev.px4.io/en/advanced/system_startup.html#customizing-the-system-startup) (PX4 Development Guide)
* [LeddarOne Spec sheet](https://leddartech.com/app/uploads/dlm_uploads/2017/05/Spec-Sheets-LeddarOne-27octobre2017-web.pdf)