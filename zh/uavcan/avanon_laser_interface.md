---
canonicalUrl: https://docs.px4.io/main/zh/uavcan/avanon_laser_interface
---

# Avionics Anonymous Laser Altimeter UAVCAN Interface

The [Avionics Anonymous Laser Altimeter Interface](https://www.tindie.com/products/avionicsanonymous/uavcan-laser-altimeter-interface/) allows a [number of common rangefinders](#supported_rangefinders) to be connected via the UAVCAN bus (this is a more robust interface than I2C).

![Avionics Anonymous Laser Altimeter UAVCAN Interface](../../assets/hardware/sensors/avionics_anon_uavcan_alt_interface/avionics_anon_altimeter_uavcan_interface.jpg)

## Where to Buy

* [AvAnon Laser Interface](https://www.tindie.com/products/avionicsanonymous/uavcan-laser-altimeter-interface/)

<span id="supported_rangefinders"></span>
## Supported Rangefinders

A full list supported rangefinders can be found on the link above.

At time of writing the following rangefinders are supported:

- Lightware SF30/D
- Lightware SF10/a
- Lightware SF10/b
- Lightware SF10/c
- Lightware SF11/c
- Lightware SF/LW20/b
- Lightware SF/LW20/c


## Pinouts

### CAN Connector
| Pin | Name     | Description                                                                         |
| --- | -------- | ----------------------------------------------------------------------------------- |
| 1   | POWER_IN | Power Supply. 4.0-5.5V supported, but must also be compatible with connected laser. |
| 2   | TX/SCL   | TX for serial mode, Clock for I2C mode                                              |
| 3   | RX/SDA   | RX for serial mode, Data for I2C mode                                               |
| 4   | GND      | Signal/power ground.                                                                |

### Laser Connector

| Pin | Name      | Description                            |
| --- | --------- | -------------------------------------- |
| 1   | POWER_OUT | Filtered power at the supply voltage.  |
| 2   | CAN+      | TX for serial mode, Clock for I2C mode |
| 3   | RX/SDA    | RX for serial mode, Data for I2C mode  |
| 4   | GND       | Signal/power ground.                   |


## Wiring

The rangefinder (laser) is connected to the AvAnon interface board, which is connected to one of the CAN ports on your autopilot. The wiring is as per the pinout above, or the necessary cables can be purchased to connect to your system right out of the box. These are available at the links [here](https://www.tindie.com/products/avionicsanonymous/uavcan-laser-altimeter-interface/).

The interface board provides a filtered power output for the laser, but does not provide its own regulation. Therefore the laser must be compatible with whatever voltage is supplied to the board.

## Software Configuration

UAVCAN must be enabled by setting [UAVCAN_ENABLE](../advanced_config/parameter_reference.md#UAVCAN_ENABLE) non zero.

The minimum and maximum valid range for the laser must be set in the parameters [UAVCAN_RNG_MIN](../advanced_config/parameter_reference.md#UAVCAN_RNG_MIN) and [UAVCAN_RNG_MAX](../advanced_config/parameter_reference.md#UAVCAN_RNG_MAX).
