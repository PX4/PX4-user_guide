# Barometers

Barometers measure atmospheric pressure, and are used in drones as altitude sensors.

Most flight controller hardware on which PX4 incudes a barometer.
By default PX4 will select the barometer with the highest priority (if any are present), and configure it as a data source for [Height estimation](../advanced_config/tuning_the_ecl_ekf.md#height).
If a sensor fault is detected, PX4 will fall back to the next highest priority sensor.

Generally barometers require no user configuration (or thought)!

## Hardware Options

[Pixhawk standard](../flight_controller/autopilot_pixhawk_standard.html) flight controllers include a barometer, as do [many others](../flight_controller/README.md).

They are also present in other hardware:

- [CUAV NEO 3 Pro GNSS module](https://doc.cuav.net/gps/neo-series-gnss/en/neo-3-pro.html#key-data) ([MS5611](../modules/modules_driver_baro.md#ms5611))

The supported baro part numbers can be inferred from the driver names, which are listed in [PX4-Autopilot/src/drivers/barometer](https://github.com/PX4/PX4-Autopilot/tree/main/src/drivers/barometer) and from the [Modules Reference: Baro (Driver)](../modules/modules_driver_baro.md) documentation.
At time of writing, drivers/parts include: bmp280, bmp388 (and BMP380), dps310, goertek (spl06), invensense (icp10100, icp10111, icp101xx, icp201xx), lps22hb, lps25h, lps33hw, maiertek (mpc2520), mpl3115a2, ms5611, ms5837, tcbp001ta


## PX4 Configuration

Generally barometers require no user configuration.
If needed, you can:

- Enable/Disable barometers as data source for [Height estimation](../advanced_config/tuning_the_ecl_ekf.md#height) using the [EKF2_BARO_CTRL](../advanced_config/parameter_reference.md#EKF2_BARO_CTRL) parameter.
- Change the selection order of barometers using the [CAL_BAROx_PRIO](../advanced_config/parameter_reference.md#CAL_BARO0_PRIO) parameters for each baro.
- Disable a baro by setting its [CAL_BAROx_PRIO](../advanced_config/parameter_reference.md#CAL_BARO0_PRIO) value to `0`.

## Calibration

Barometer parts are generally pre-calibrated.


## Developer Information

- [Baro driver source code](https://github.com/PX4/PX4-Autopilot/tree/main/src/drivers/barometer)
- [Modules Reference: Baro (Driver)](../modules/modules_driver_baro.md) documentation.
