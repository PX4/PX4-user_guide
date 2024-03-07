# Global Navigation Satellite Systems (GNSS)

PX4 supports Global Navigation Satellite Systems (GNSS) such as GPS, GLONASS, Galileo, Beidou, QZSS and SBAS, etc. using receivers that communicate via the u-blox, MTK Ashtech or Emlid protocols, or via UAVCAN.
A GNSS system is needed for missions, and some other automatic and manual/assisted modes.

Most GNSS modules also contain a [compass/magnetometer](../gps_compass/magnetometer.md) part (see link for calibration/setup information).
Because of this the GNSS module should be mounted as far away from the motor/ESC power supply lines as possible - typically on a pedestal or wing (for fixed-wing).

![GPS + Compass](../../assets/hardware/gps/gps_compass.jpg)

:::note
PX4 also supports [Real Time Kinematic (RTK)](../gps_compass/rtk_gps.md) and **Post-Processing Kinematic (PPK)** GNSS Receivers, which extend GNSS systems to centimetre-level precision.
:::

## Supported GNSS

PX4 should work with any unit that communicates via the u-blox, MTK Ashtech or Emlid protocols, or via UAVCAN.

This table contains non-RTK GNSS units (most of which also have a compass).
These have been tested by the PX4 dev team, or which are popular within the PX4 community.

Device | GPS | Compass | Notes
:--- | :---: | :---:  | :---
[ARK GPS](https://arkelectron.com/product/ark-gps/) | M9N  | ICM42688p | 
[Avionics Anonymous UAVCAN GNSS/Mag][avionics_anon_can_gnss] | SAM-M8Q | MMC5983MA | 
[CUAV NEO 3 GPS](../gps_compass/gps_cuav_neo_3.md) | M9N | IST8310 |
[CUAV NEO 3 Pro GPS](../gps_compass/gps_cuav_neo_3pro.md) |  M9N | RM3100 | 
[CUAV NEO 3X GPS](../gps_compass/gps_cuav_neo_3x.md) |  M9N| RM3100 | 
[CubePilot Here2 GNSS GPS (M8N)](../gps_compass/gps_hex_here2.md) | M8N | ICM20948 | 
[Drotek DP0804](https://store-drotek.com/920-DP0804.html)  | M9N | LIS3MDL | Also see other [Drotek u-blox GPS/Compasses](https://store-drotek.com/index.php?controller=search&s=ublox+compass)
[Emlid Reach M+](https://emlid.com/reach/)  | &check; | &cross; | Supports PPK. RTK expected.
[Holybro DroneCAN M8N GPS](../dronecan/holybro_m8n_gps.md) | M8N | BMM150 | 
[Holybro Micro M8N GPS](https://holybro.com/products/micro-m8n-gps) | M8N | IST8310 |
[Holybro Nano Ublox M8 5883 GPS][hb_nano_m8_5883] | UBX-M8030 | QMC5883 |
[Holybro M8N GPS](../gps_compass/gps_holybro_m8n_m9n.md) | M8N | IST8310 | 
[Holybro M9N GPS](../gps_compass/gps_holybro_m8n_m9n.md) | M9N | IST8310 |
[Holybro DroneCAN M9N GPS](https://holybro.com/products/dronecan-m9n-gps) | M9N | BMM150 |
[Hobbyking u-blox Neo-M8N GPS with Compass][hk_ublox_neo_8mn] | M8N | &check; |
[LOCOSYS Hawk A1 GNSS receiver](../gps_compass/gps_locosys_hawk_a1.md) | MC-1612-V2b | optional | 
[LOCOSYS Hawk R1](../gps_compass/rtk_gps_locosys_r1.md) | MC-1612-V2b |  |
[LOCOSYS Hawk R2](../gps_compass/rtk_gps_locosys_r2.md) | MC-1612-V2b | IST8310 | 
[mRo GPS u-blox Neo-M8N Dual Compass][mro_neo8mn_dual_mag] | M8N | LIS3MDL, IST8308 | 
[Sky-Drones SmartAP GPS](../gps_compass/gps_smartap.md) | M8N | HMC5983, IST8310, LIS3MDL |
[Zubax GNSS 2](https://zubax.com/products/gnss_2) | MAX-M8Q | LIS3MDL | 

<!-- links to improve layout of table for editing -->
[avionics_anon_can_gnss]: https://www.tindie.com/products/avionicsanonymous/uavcan-gps-magnetometer/
[hk_ublox_neo_8mn]: https://hobbyking.com/en_us/ublox-neo-m8n-gps-with-compass.html
[mro_neo8mn_dual_mag]: https://store.mrobotics.io/product-p/m10034-8308.htm
[hb_nano_m8_5883]: https://holybro.com/products/nano-m8-5883-gps-module

Notes:

- &check; or a specific part number indicate that a features is supported, while &cross; or empty show that the feature is not supported.
  "?" indicates "unknown".
- Where possible and relevant the part name is used (i.e. &check; in the GPS column indicates that a GPS module is present but the part is not known).
- The list may omit some discontinued hardware that is still supported.
  The original _Here_ has already been removed.
  Check earlier versions if a discontinued module is not mentioned here.

## Mounting the GNSS/Compass

[Mounting the Compass](../assembly/mount_gps_compass.md) explains how to mount a GNSS module that has a compass (it is the compass part that is affected by electromagnetic radiation).

## Hardware Setup

Instructions for connecting the GPS (and compass, if present) are usually provided by the manufacturer (at least for more common [Autopilot Hardware](../flight_controller/README.md)).

[Pixhawk Series](../flight_controller/pixhawk_series.md) controllers typically have a clearly labeled port for connecting the GPS, and the compass is connected to either the I2C or SPI port/bus (depending on the device).

The [ARK GPS](../dronecan/ark_gps.md), [ARK RTK GPS](../dronecan/ark_rtk_gps.md), [Zubax GNSS 2](https://zubax.com/products/gnss_2), [CUAV C-RTK2](../gps_compass/rtk_gps_cuav_c-rtk.md), [CubePilot Here3 CAN GNSS GPS (M8N)](https://www.cubepilot.org/#/here/here3), and [Avionics Anonymous GNSS/Mag](https://www.tindie.com/products/avionicsanonymous/uavcan-gps-magnetometer/) can also be connected via [DroneCAN](../dronecan/README.md).

:::warning
Pay attention to pinout when connecting the GPS module.
While these are all software-compatible, there are several different pin orderings.
:::

## GNSS Configuration

The "standard" GPS configuration is provided below.
Additional device-specific configuration may be provided in PX4 or manufacturer device documentation (e.g. [Trimble MB-Two > Configuration](../gps_compass/rtk_gps_trimble_mb_two.md#configuration)).

:::warning
The GPS protocol expected by PX4 defaults to u-blox (by default other GPS types like Trimble, Emlid, MTK, will not be detected)
The protocol can be configured with [GPS_x_PROTOCOL](../advanced_config/parameter_reference.md#GPS_1_PROTOCOL).
:::

### Configuring the Primary GPS

GPS configuration on Pixhawk is handled transparently for the user - simply connect the GPS module to the port labeled **GPS** and everything should work.

:::note
The default [Serial Port Configuration](../peripherals/serial_configuration.md#default_port_mapping) works for most devices.
If you are using the _Trimble MB-Two_ you will need to modify the configuration to explicitly set the rate to 115200 baud.
:::

<a id="dual_gps"></a>

### Configuring a Secondary GPS (Dual GPS System)

To use a secondary GPS, attach it to any free port, and then perform a [Serial Port Configuration](../peripherals/serial_configuration.md) to assign [GPS_2_CONFIG](../advanced_config/parameter_reference.md#GPS_2_CONFIG) to the selected port.

The following steps show how to configure a secondary GPS on the `TELEM 2` port in _QGroundControl_:

1. [Find and set](../advanced_config/parameters.md) the parameter [GPS_2_CONFIG](../advanced_config/parameter_reference.md#GPS_2_CONFIG) to **TELEM 2**.
   - Open _QGroundControl_ and navigate to the **Vehicle Setup > Parameters** section.
   - Select the **GPS** tab (1), then open the [GPS_2_CONFIG](../advanced_config/parameter_reference.md#GPS_2_CONFIG) parameter (2) and select _TELEM 2_ from the dropdown list (3).
     ![QGC Serial Example](../../assets/peripherals/qgc_serial_config_example.png)
1. Reboot the vehicle in order to make the other parameters visible.
1. Select the **Serial** tab, and open the [SER_TEL2_BAUD](../advanced_config/parameter_reference.md#SER_TEL2_BAUD) parameter (`TELEM 2` port baud rate): set it to _Auto_.
   ![QGC Serial Baudrate Example](../../assets/peripherals/qgc_serial_baudrate_example.png)

After setting up the second GPS port:

1. Configure the ECL/EKF2 estimator to blend data from both GPS systems.
   For detailed instructions see: [Using the ECL EKF > Dual Receivers](../advanced_config/tuning_the_ecl_ekf.md#dual-receivers).

### Configuring GPS as Yaw/Heading Source

GPS can be used as a source for yaw fusion when using modules where _yaw output is supported by the device_ (e.g. [Trimble MB-Two](../gps_compass/rtk_gps_trimble_mb_two.md)) or when using some [RTK GPS Setups with Dual u-blox F9P](../gps_compass/u-blox_f9p_heading.md).

When using GPS for yaw fusion you will need to configure the following parameters:

Parameter | Setting
--- | ---
[GPS_YAW_OFFSET](../advanced_config/parameter_reference.md#GPS_YAW_OFFSET) |  The angle made by the *baseline* (the line between the two GPS antennas) relative to the vehicle x-axis (front/back axis, as shown [here](../config/flight_controller_orientation.md#calculating-orientation)).
[EKF2_GPS_CTRL](../advanced_config/parameter_reference.md#EKF2_GPS_CTRL) | Set bit position 3 "Dual antenna heading" to `1` (i.e. add 8 to the parameter value).                                                                                                                        |

:::tip
If using this feature, all other configuration should be setup up as normal (e.g. [RTK Positioning](../gps_compass/rtk_gps.md#positioning-setup-configuration)).
:::

## Compass Configuration

Compass calibration is covered in: [Compass Configuration](../config/compass.md).
The process is straightforward and will autodetect, [set default rotations](../advanced_config/parameter_reference.md#SENS_MAG_AUTOROT), calibrate, and prioritise, all connected magnetometers.

## Developer Information

- GPS/RTK-GPS
  - [RTK-GPS](../advanced/rtk_gps.md)
  - [GPS driver](../modules/modules_driver.md#gps)
  - [DroneCAN Example](../dronecan/README.md)
- Compass
  - [Driver source code](https://github.com/PX4/PX4-Autopilot/tree/main/src/drivers/magnetometer) (Compasses)
