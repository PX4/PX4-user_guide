# GPS & Compass

PX4 supports global navigation satellite systems (GNSS) (including GPS, GLONASS, Galileo, BeiDou, QZSS and SBAS) using receivers that communicate via the u-blox, MTK Ashtech or Emlid protocols, or via UAVCAN.
It also supports [Real Time Kinematic (RTK) GPS Receivers](../gps_compass/rtk_gps.md), which extend GPS systems to centimetre-level precision.

PX4 can be used with the following compass parts (magnetometers): Bosch BMM 150 MEMS (via I2C bus), HMC5883 / HMC5983 (I2C or SPI), IST8310 (I2C) and LIS3MDL (I2C or SPI).
Up to 4 internal or external magnetometers can be connected, though only one will actually be used as a heading source.
The system automatically chooses the best available compass based on their internal priority (external magnetometers have a higher priority).
If the primary compass fails in-flight, it will failover to the next one.
If it fails before flight, arming will be denied.

![GPS + Compass](../../assets/hardware/gps/gps_compass.jpg)

:::tip
When using [Pixhawk-series](../flight_controller/pixhawk_series.md) flight controllers, we recommend using a *combined GPS + Compass* mounted as far away from the motor/ESC power supply lines as possible - typically on a pedestal or wing (for fixed-wing).
The internal compass *may* be useful on larger vehicles (e.g. VTOL) where it is possible to reduce electromagnetic interference by mounting the Pixhawk a long way from power supply lines.
On small vehicles an external compass is almost always required.
:::

## Supported GPS and/or Compass

Device | GPS | Compass | [RTK](../gps_compass/rtk_gps.md) | [GPS Yaw Output](#configuring-gps-as-yaw-heading-source) | [Dual FP9 GPS Heading](../gps_compass/u-blox_f9p_heading.md)
:--- | :---: | :---:  | :---:  | :---:  | :---: | :---:
[Hobbyking u-blox Neo-M8N GPS with Compass](https://hobbyking.com/en_us/ublox-neo-m8n-gps-with-compass.html?gclid=Cj0KCQjwqM3VBRCwARIsAKcekb3ojv1ZhLz1-GuvCsUuGT8ZZuw8meMIV_I6pgUCj6DJRzHBY9OApekaAgI5EALw_wcB&gclsrc=aw.ds&___store=en_us) | M8N | &check; | | |
[mRo GPS u-blox Neo-M8N Dual Compass](https://store.mrobotics.io/ProductDetails.asp?ProductCode=mro-gps003-mr) | M8N | LIS3MDL, IST8310 | | |
[Drotek DP0804](https://store-drotek.com/920-DP0804.html) (and other [Drotek u-blox GPS/Compasses](https://store-drotek.com/index.php?controller=search&s=ublox+compass)) | M9N | LIS3MDL | | |
[Emlid Reach M+](https://emlid.com/reach/)  - PX4 only supports "ordinary" GPS with this module. RTK support is expected in the near future. | &check; | &cross; | | |
[Holybro Pix32 M8N GPS Module](https://shop.holybro.com/pix32-gps-module_p1099.html) | M8N | IST8310 | | |
[Holybro Micro M8N GPS Module](https://shop.holybro.com/micro-m8n-gps_p1009.html) | M8N | &check; | | |
[Holybro Pixhawk 4 GPS Module (10 pin)](https://shop.holybro.com/pixhawk-4-gps-module_p1094.html) | M8N | IST8310 | | |
[Holybro Pixhawk 4 2nd GPS Module (6 pin)](https://shop.holybro.com/pixhawk4-2nd-gps-module_p1145.html) | M8N | IST8310 | | |
Hex Here GNSS GPS (M8N) (discontinued) | M8N | HMC5983, LIS3MDL | | |
[Hex Here2 GNSS GPS (M8N)](../gps_compass/gps_hex_here2.md) | M8N | ICM20948 | | |
[Zubax GNSS 2](https://zubax.com/products/gnss_2) | MAX-M8Q | LIS3MDL | | |
[Avionics Anonymous UAVCAN GNSS/Mag](https://www.tindie.com/products/avionicsanonymous/uavcan-gps-magnetometer/) | SAM-M8Q | MMC5983MA | | |
3DR u-blox GPS with Compass kit (discontinued) | LEA-6H | &check; | | | 
[CUAV C-RTK GPS](../gps_compass/rtk_gps_cuav_c-rtk.md) | M8P/M8N | &check; | &check; | |
[Drotek XL RTK GPS](../gps_compass/rtk_gps_drotek_xl.md) | M8U | LIS3MDL | &check; | | 
[Femtones MINI2 Receiver](../gps_compass/rtk_gps_fem_mini2.md) | FB672, FB6A0 | &check; | &check; | | 
[Freefly RTK GPS](../gps_compass/rtk_gps_freefly.md) | F9P | IST8310 | &check; | 
[Here+ RTK GPS](../gps_compass/rtk_gps_hex_hereplus.md) | M8P | HMC5983 | &check; | | 
[Holybro H-RTK F9P GNSS](../gps_compass/rtk_gps_holybro_h-rtk-f9p.md) | F9P | IST8310 | &check; | | 
[Holybro H-RTK M8P GNSS](../gps_compass/rtk_gps_holybro_h-rtk-m8p.md) | M8P | IST8310 | &check; | | 
[SparkFun GPS-RTK2 Board - ZED-F9P](https://www.sparkfun.com/products/15136) | F9P |  &cross; | &check; | | &check;
[Drotek SIRIUS RTK GNSS ROVER (F9P)](https://store-drotek.com/911-1010-sirius-rtk-gnss-rover-f9p.html#/158-sensor-no_magnetometer) | F9P | RM3100 | &check; | | &check;
[mRo u-blox ZED-F9 RTK L1/L2 GPS](https://store.mrobotics.io/product-p/mr-m10020-a.htm) | F9P | &cross; | &check; | | &check;
[Trimble MB-Two](../gps_compass/rtk_gps_trimble_mb_two.md) | F9P | &cross; | &check; | &check; | |  
[Avionics Anonymous UAVCAN Magnetometer](https://www.tindie.com/products/avionicsanonymous/uavcan-magnetometer/) | &cross; | &check; | | | | 


:::note
- &check; or a specific part number indicate that a features is supported, while &cross; or empty show that the feature is not supported.
  "?" indicates "unknown".
- Where possible and relevant the part name is used (i.e. &check; in the GPS column indicates that a GPS module is present but the part is not known).
- [Avionics Anonymous UAVCAN Magnetometer](https://www.tindie.com/products/avionicsanonymous/uavcan-magnetometer/) is a compass (not a GPS).
- Some RTK modules can only be used in a particular role (base or rover), while others can be used interchangeably.
:::

## Hardware Setup

Instructions for connecting the GPS (and compass, if present) are usually provided by the manufacturer (at least for more common [Autopilot Hardware](../flight_controller/README.md)).

[Pixhawk Series](../flight_controller/pixhawk_series.md) controllers typicaly have a clearly labeled port for connecting the GPS, and the compass is connected to either the I2C or SPI port/bus (depending on the device). 

The [Zubax GNSS 2](https://zubax.com/products/gnss_2) and [Avionics Anonymous GNSS/Mag](https://www.tindie.com/products/avionicsanonymous/uavcan-gps-magnetometer/) can also be connected via [UAVCAN](../uavcan/README.md).


:::warning
Pay attention to pinout when connecting the GPS module.
While these are all software-compatible, there are several different pin orderings.
:::


## Configuration

The "standard" GPS/compass configuration is provided below.
Additional device-specific configuration may be provided in PX4 or manufacturer device documentation (e.g. [Trimble MB-Two > Configuration](../gps_compass/rtk_gps_trimble_mb_two.md#configuration)).

### Configuring the Primary GPS

GPS configuration on Pixhawk is handled transparently for the user - simply connect the GPS module to the port labeled **GPS** and everything should work.

:::note
The default [Serial Port Configuration](../peripherals/serial_configuration.md#default_port_mapping) works for most devices.
If you are using the *Trimble MB-Two* you will need to modify the configuration to explicitly set the rate to 115200 baud.
:::

<span id="dual_gps"></span>
### Configuring a Secondary GPS (Dual GPS System)

To use a secondary GPS, attach it to any free port, and then perform a [Serial Port Configuration](../peripherals/serial_configuration.md) to assign [GPS_2_CONFIG](../advanced_config/parameter_reference.md#GPS_2_CONFIG) to the selected port.

The following steps show how to configure a secondary GPS on the `TELEM 2` port in *QGroundControl*:

1. [Find and set](../advanced_config/parameters.md) the parameter [GPS_2_CONFIG](../advanced_config/parameter_reference.md#GPS_2_CONFIG) to **TELEM 2**.
   - Open *QGroundControl* and navigate to the **Vehicle Setup > Parameters** section.
   - Select the **GPS** tab (1), then open the [GPS_2_CONFIG](../advanced_config/parameter_reference.md#GPS_2_CONFIG) parameter (2) and select *TELEM 2* from the dropdown list (3).
     ![QGC Serial Example](../../assets/peripherals/qgc_serial_config_example.png)
1. Reboot the vehicle in order to make the other parameters visible.
1. Select the **Serial** tab, and open the [SER_TEL2_BAUD](../advanced_config/parameter_reference.md#SER_TEL2_BAUD) parameter (`TELEM 2` port baud rate): set it to *Auto*.
  ![QGC Serial Baudrate Example](../../assets/peripherals/qgc_serial_baudrate_example.png)

After setting up the second GPS port:
1. Configure the ECL/EKF2 estimator to blend data from both GPS systems.
   For detailed instructions see: [Using the ECL EKF > Dual Receivers](../advanced_config/tuning_the_ecl_ekf.md#dual-receivers).
   
### Configuring GPS as Yaw/Heading Source

GPS can be used as a source for yaw fusion when using modules where *yaw output is supported by the device* (e.g. [Trimble MB-Two](../gps_compass/rtk_gps_trimble_mb_two.md)) or when using some [RTK GPS Setups with Dual u-blox F9P](../gps_compass/u-blox_f9p_heading.md).

When using GPS for yaw fusion you will need to configure the following parameters:

Parameter | Setting
--- | ---
[GPS_YAW_OFFSET](../advanced_config/parameter_reference.md#GPS_YAW_OFFSET) |  The angle made by the *baseline* (the line between the two GPS antennas) relative to the vehicle x-axis (front/back axis, as shown [here](../config/flight_controller_orientation.md#calculating-orientation)).
[EKF2_AID_MASK](../advanced_config/parameter_reference.md#EKF2_AID_MASK) | Set bit position 7 "GPS yaw fusion" to `1` (i.e. add 128 to the parameter value).


:::tip
- If using this feature, all other configuration should be setup up as normal (e.g. [RTK Positioning](#positioning-setup-configuration)).
:::


### Compass Configuration

Compass calibration is covered in: [Compass Configuration](../config/compass.md).
The process is straightforward and will calibrate all connected magnetometers.

Additional configuration can be [performed](../advanced_config/parameters.md) using the [CAL\_MAGx\_](../advanced_config/parameter_reference.md#CAL_MAG0_EN) parameters (where `x=0-3`).
Generally you will not need to *modify* these as compasses are autodetected, prioritised and are all calibrated at the same time (a possible exception is [CAL\_MAGx\_EN](../advanced_config/parameter_reference.md#CAL_MAG0_EN) which might be used to disable an internal compass).
You may however wish to read them, as they will let you know which magnetometers are internal or external ([CAL\_MAGx\_EN](../advanced_config/parameter_reference.md#CAL_MAG0_EN)) and which is being uses as the main heading source ([CAL_MAG_PRIME](../advanced_config/parameter_reference.md#CAL_MAG_PRIME)).


## Developer Information

- GPS/RTK-GPS
  - [RTK-GPS](../advanced/rtk_gps.md)
  - [GPS driver](../modules/modules_driver.md#gps)
  - [UAVCAN Example](../uavcan/README.md)
- Compass
  - [Driver source code](https://github.com/PX4/PX4-Autopilot/tree/master/src/drivers/magnetometer) (Compasses)
