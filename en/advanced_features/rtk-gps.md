# RTK GPS

[Real Time Kinematic (RTK)](https://en.wikipedia.org/wiki/Real_Time_Kinematic) increases the accuracy of GNSS/GPS systems to centimeter-level. RTK allows PX4 to be used in applications like precision surveying, where pinpoint accuracy is essential.

You will need:
- A pair of (supported) [RTK GPS devices](#supported-rtk-devices) (a "base" for the ground station and a "rover" for the vehicle)
- A *laptop/PC* with QGroundControl (QGroundControl for Android/iOS do not support RTK)
- A vehicle with a WiFi or Telemetry radio link to the laptop


## Supported RTK Devices

PX4 supports the [u-blox M8P](https://www.u-blox.com/en/product/neo-m8p) GPS and products that incorporate it. The following RTK-compatible devices have been tested.

* [Drotek XL RTK GPS](../peripherals/rtk_gps_drotek_xl.md)
* [Here+ RTK GPS](../peripherals/rtk_gps_hex_hereplus.md)

> **Note** Some RTK modules can only be used in a particular role (base or rover), while others can be used interchangeably.

## Hardware setup

### Rover RTK Module (Vehicle)

Connect the vehicle-based module to the flight controller's GPS port (in the same way as any other GPS module). 

The actual cables/connectors required will depend on the flight controller and selected RTK module (see [documentation for the selected device](#supported-rtk-devices) for more information).

### Base RTK Module (Ground)

Connect the base module to *QGroundControl* via USB. The base module must not be moved while it is being used.
  
> **Tip** Choose a position where it won't need to be moved, has a clear view of the sky, and is well separated from any buildings. Often it is helpful to elevate the base GPS, by using a tripod or mounting it on a roof. 

### Telemetry Radio/WiFi

The vehicle and ground control laptop must be connected via [wifi or a radio telemetry link](../assembly/quick_start_pixhawk.md#telemetry-radios-optional). <!-- this should be a link to a telemetry topic, but we don't have one yet -->
> **Caution** On lower-bandwidth telemetry modules (e.g. like 3DR Radios) [you must use the MAVLink2 protocol](#mavlink2).



## RTK Connection Process

The RTK GPS connection is essentially plug and play:

1. Start *QGroundControl* and attach the base RTK GPS via USB to the ground station. The device is recognized automatically. 
1. Start the vehicle and make sure it is connected to *QGroundControl*.
   
   > **Tip** An RTK GPS status icon is displayed in the top icon bar while an RTK GPS device is connected (in addition to the normal GPS status icon). The icon is red while RTK is being set up, and then changes to white once RTK GPS is active. You can click the icon to see the current state and RTK accuracy. 
1. *QGroundControl* then starts the RTK setup process (known as "Survey-In").

   Survey-In is a startup procedure to get an accurate position estimate of the base station. The process typically takes several minutes (it ends after reaching the minimum time and accuracy specified in the [RTK settings](#rtk-gps-settings)).
   
   You can track the progress by clicking the RTK GPS status icon.

   <img src="../../images/qgc_rtk_survey-in.png" width="200px" title="survey-in" /> 

1. Once Survey-in completes:

   - The RTK GPS icon changes to white and *QGroundControl* starts to stream position data to the vehicle:
   
     <img src="../../images/qgc_rtk_streaming.png" width="200px" title="RTK streaming" />
   - Vehicle GPS switches to RTK mode. The new mode is displayed in the *normal* GPS status icon (`3D RTK GPS Lock`):

     ![RTK GPS Status](../../images/qgc_rtk_gps_status.png)
   

## Optional PX4 Configuration

The following settings may need to be changed (using *QGroundControl*). 

### RTK GPS settings

The RTK GPS settings are specified in the *QGroundControl* [General Settings](https://docs.qgroundcontrol.com/en/SettingsView/General.html#rtk-gps) (**SettingsView > General Settings**). 

![](../../images/qgc/setup/settings_view_general_rtk_gps.jpg)

These settings define the minimum duration and minimum accuracy for completing the RTK GPS setup process (known as "Survey-In).


### MAVLink2

The MAVLink2 protocol is highly recommended because it makes more efficient use of the channel. 

> **Caution** On lower-bandwidth telemetry modules (e.g. like 3DR Telemetry Radios) you *must*) use MAVLink2, in order to avoid saturating the link.

To enable MAVLink2:

* Update the telemetry module firmware to the latest version (see [QGroundControl > Setup > Firmware](https://docs.qgroundcontrol.com/en/SetupView/Firmware.html)).
* Set [MAV_PROTO_VER](../advanced_config/parameter_reference.md#MAV_PROTO_VER) to 2 (see [QGroundControl Setup > Parameters](https://docs.qgroundcontrol.com/en/SetupView/Parameters.html))


### Tuning

You may also need to tune some parameters as the default parameters are tuned assuming a GPS accuracy in the order of meters, not centimeters. 
For example, you can decrease [EKF2_GPS_V_NOISE](../advanced_config/parameter_reference.md#EKF2_GPS_V_NOISE) and [EKF2_GPS_P_NOISE](../advanced_config/parameter_reference.md#EKF2_GPS_P_NOISE) to 0.2.

<!-- can we have a more complete list -->


<!-- Video demonstration would be nice, but this one isn't very educational or interesting 
- vehicle flies, lots of of computers, blah blah 
What would be better is something that shows positioning of base, connection of RTK rover, survey in process. Some sort of short precision survey. --> 
<!--
## Video Demonstration

The following videos show vehicles flying using RTK GPS.

u-blox & PX4 RTK integration on M8P (Video credits to Michael Ammann)
{% youtube %}
https://youtu.be/en_a5XBx2vU
{% endyoutube %}
-->


## Vehicle Setup Example

The airframe build topic [DJI Flamewheel 450 with distance sensor and RTK GPS](https://dev.px4.io/en/airframes_multicopter/dji_flamewheel_450.html) describes an airframe setup with the Here+ RTK GPS and a Pixhawk 3 Pro.




<!--
- RTK typically has base with multiple rovers. Does QGC support multiple rovers? How?
- What sorts of surveying are we thinking would require/use RTK?
- Is GPS mast "essential" or "recommended"
- Do we state that MAVLink2 is required? My understanding is that it is required for a telemetry radio because the bandwidth isn't high enough, but Wifi has higher bandwidth and is probably OK. Do we make the distinction in the user guide?
--> 

<!-- 

RTK uses measurements of the phase of the signal's carrier wave, rather than the information content of the signal, and relies on a 
single reference station to provide real-time corrections. 

An RTK system consists of a fixed-position "base" module connected to *QGroundControl*, and at least one vehicle-mounted "rover" module. *QGroundControl* and the vehicle must be connected via radio or wifi telemetry.
-->
