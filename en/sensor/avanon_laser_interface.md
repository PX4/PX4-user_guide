# Avionics Anonymous Laser Altimeter Interface

The Avionics Anonymous Laser Altimeter Interface allows several common rangefinders to be connected to the UAVCAN bus, a more robust interface than I2C.

## Where to Buy

* [AvAnon Laser Interface](https://www.tindie.com/products/avionicsanonymous/uavcan-laser-altimeter-interface/)


## Pinouts

### CAN Connector
Pin | Name | Description
--- | ---   | ---
1   | POWER_IN | Power Supply. 4.0-5.5V supported, but must also be compatible with connected laser.
2   | TX/SCL | TX for serial mode, Clock for I2C mode
3   | RX/SDA | RX for serial mode, Data for I2C mode
4   | GND | Signal/power ground.

### Laser Connector
Pin | Name | Description
--- | ---   | ---
1   | POWER_OUT | Filtered power at the supply voltage.
2   | CAN+ | TX for serial mode, Clock for I2C mode
3   | RX/SDA | RX for serial mode, Data for I2C mode
4   | GND | Signal/power ground.


## Wiring

Per the pinout above or using the included cables, your laser is connected to the AvAnon interface board which is connected to one of the CAN ports on your autopilot. The interface board provides a filtered power output for your laser, but does not provide its own regulation, so your laser must be compatible with whatever voltage is supplied to the board.

## Software Configuration

UAVCAN must be enabled, in any available mode. [UAVCAN_ENABLE](../advanced_config/parameter_reference.md#UAVCAN_ENABLE).

The minimum and maximum valid range for your laser must be set in the parameters [UAVCAN_RNG_MIN](../advanced_config/parameter_reference.md#UAVCAN_RNG_MIN) and [UAVCAN_RNG_MAX](../advanced_config/parameter_reference.md#UAVCAN_RNG_MAX).
