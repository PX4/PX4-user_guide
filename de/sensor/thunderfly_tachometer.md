# ThunderFly TFRPM01 Revolution Counter

The [TFRPM01](https://github.com/ThunderFly-aerospace/TFRPM01) tachometer is a small, and low system demanding revolution-counter.

The board itself does not include the actual sensor, but can be used with a number of different sensors/probe types for revolution counting. It has an I²C connector for connecting to PX4, and is connected to the actual sensor via a 3-pin connector. It also has an LED that offers basic diagnostic information.

![TFRPM01A](../../assets/hardware/sensors/tfrpm/tfrpm01_electronics.jpg)

> **Note** The TFRPM01 sensor is open-source hardware commercially available from [ThunderFly s.r.o.](https://www.thunderfly.cz/) (manufacturing data is [available on GitHub](https://github.com/ThunderFly-aerospace/TFRPM01)). It is based on the [PCF8583 counter](https://www.nxp.com/docs/en/data-sheet/PCF8583.pdf).


## Hardware Setup

The board is equipped with a (two troughpass) I²C connectors for connecting to PX4 and has a 3-pin connector that can be used to connect to various sensors:
- TFRPM01 may be connected to any I²C port.
- TFRPM01 has 3pin pin-header connector (with pull-up equipped input) that can be connected to different probe types.
  - The sensor/probe hardware needs an pulse signal. The signal input accepts +5V TTL logic or [open collector](https://en.wikipedia.org/wiki/Open_collector) outputs. Maximum pulse frequency is 20 kHz with 50% duty cycle.
  - The probe connector provide +5V power supply from I²C bus, the maximum power which could be used is limited by RC filter (see schematics for details).

TFRPM01A electronics is equipped with a signaling LED that can be used to check that the probe is connected properly. The LED lights up when the pulse input is grounded or exposed to logical 0, so you can check the probe is working correctly just by manually spinning a rotor.

### Hall-Effect Sensor Probe

Hall-Effect sensors (magnetically operated) are ideal for harsh environments, where dirt, dust and water can contact the sensed rotor.

Many different hall effect sensors are commercially available. For example a [5100 Miniature Flange Mounting Proximity Sensor](https://m.littelfuse.com/~/media/electronics/datasheets/hall_effect_sensors/littelfuse_hall_effect_sensors_55100_datasheet.pdf.pdf) is good choice.

![Example of Hall effect probe](../../assets/hardware/sensors/tfrpm/hall_probe.jpg)


### Optical Sensor Probe

Optical sensor can also be used (and may be a better fit, depending on the measurement requirements). Both transmissive and reflective sensor types may be used for pulse generation.

![Example of optical transmissive probe](../../assets/hardware/sensors/tfrpm/transmissive_probe.jpg)


## Parameter Setup

Usually sensors can be used without configuration.

If needed, the following parameters may be used:

* [PCF8583_POOL](../advanced_config/parameter_reference.md#PCF8583_POOL) — pooling interval between readout the counted number
* [PCF8583_ADDR](../advanced_config/parameter_reference.md#PCF8583_ADDR) — I2C sensor address
* [PCF8583_RESET](../advanced_config/parameter_reference.md#PCF8583_RESET) — Counter value where the counted number should be reset to zero.
* [PCF8583_MAGNET](../advanced_config/parameter_reference.md#PCF8583_MAGNET) — Number of pulses per revolution e.g. number of magnets at a rotor disc.


> **Note** If the configuration parameters is not available in *QGroundControl* then you may need to [add the driver to the firmware](../peripherals/serial_configuration.md#parameter_not_in_firmware): 
> 
>
  ```
  drivers/rpm/pcf8583
  ```
