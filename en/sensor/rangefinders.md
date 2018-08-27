# Distance Sensors (Rangefinders)

Distance sensors provide distance measurement that can be used for terrain following, precision hovering (e.g. for photography), warning of regulatory height limits, collision avoidance etc.

The sensors can usually be connected to either a serial (PWM) or I2C port (depending on the device driver), and is enabled on the port by setting a particular parameter.

This section lists the distance sensors supported by PX4 and the generic configuration information. More detailed documentation is linked for some rangefinders.

> **Tip** The drivers for less common sensors may not be present by default in all firmware. In this case you may need to add the driver into your *cmake* configuration file and build the firmware yourself. For more information see the [PX4 Development Guide](https://dev.px4.io/en/setup/building_px4.html).


<img src="../../assets/hardware/sensors/lidar_lite/lidar_lite_v3.jpg" alt="Lidar Lite V3" width="200px" /><img src="../../assets/hardware/sensors/sf11c_120_m.jpg" alt="LightWare SF11/C Lidar" width="200px" /><img src="../../assets/hardware/sensors/uLanding_lite_1.jpg" alt="Aerotenna uLanding" width="200px" />

## Supported Rangefinders

### Lidar-Lite

LIDAR-Lite is a compact, high-performance optical distant measurement rangefinder. 
It has a sensor range from (5cm - 40m) and can be connected to either PWM or I2C ports.

For setup/usage information see: [Lidar-Lite](../sensor/lidar_lite.md).


### MaxBotix I2CXL-MaxSonar-EZ

The MaxBotix [I2CXL-MaxSonar-EZ](https://www.maxbotix.com/product-category/i2cxl-maxsonar-ez-products) range has a number of relatively short-ranged sonar based rangefinders that are suitable for assisted takeoff/landing and collision avoidance. These can be connected using an I2C port.

The rangefinders are enabled using the parameter [SENS_EN_MB12XX](../advanced_config/parameter_reference.md#SENS_EN_MB12XX).

### Lightware LIDARs

[Lightware](http://lightware.co.za/shop2017/) provide a range of lightweight "laser altimeters" that are suitable for many drone applications:
* [SF02](http://lightware.co.za/shop2017/proximity-sensors/1-sf02f.html)
* [SF10/A](http://lightware.co.za/shop2017/drone-altimeters/26-sf10a-25-m.html) (25 m)
* [SF10/B](http://lightware.co.za/shop2017/drone-altimeters/25-sf10b-50-m.html) (50 m)
* SF10/C (100m) (Discontinued)
* [SF11/C](http://lightware.co.za/shop2017/drone-altimeters/44-sf11c-120-m.html) (120 m)
* [SF/LW20](http://lightware.co.za/shop2017/drone-altimeters/51-lw20-100-m.html) (100 m) - Waterproofed (IP67) with servo for sense-and-avoid applications

Drivers exist for both I2C and serial ports, which can be configured using the parameters [SENS_EN_SF0X](../advanced_config/parameter_reference.md#SENS_EN_SF0X) and [SENS_EN_SF1XX](../advanced_config/parameter_reference.md#SENS_EN_SF1XX) (respectively).

Wiring and other information for the I2C variants can be found in the topic [Lightware SFxx Lidar](../sensor/sfxx_lidar.md).

> **Tip** Not all devices are supported for both serial and I2C; check the parameters for more information and supported models.


### TeraRanger Rangefinders

TeraRanger provide a number of lightweight distance measurement sensor based on infrared Time-of-Flight (ToF) technology. They are typically faster and have greater range than sonar, and smaller and lighter than laser-based systems. PX4 supports:
* [TeraRanger One](http://www.teraranger.com/products/teraranger-one/) (0.2 - 14 m) (Requires an [I2C adapter](http://www.teraranger.com/product/teraranger-i2c-adapter/))
* [TeraRanger Evo 60m](https://www.terabee.com/portfolio-item/teraranger-evo-infrared-distance-sensor/) (0.5 – 60 m)
* TeraRanger Evo 600Hz (0.75 - 8 m)

All TeraRanger sensors must be connected via the I2C bus. While TeraRanger One requires an [I2C adapter](http://www.teraranger.com/product/teraranger-i2c-adapter/) any sensor from TeraRanger Evo series can be connected directly to the autopilot. 

The sensors are enabled using the parameter [SENS_EN_TRANGER](../advanced_config/parameter_reference.md#SENS_EN_TRANGER) (you can set the type of sensor or that PX4 should auto-detect the type).

> **Note** If using auto-detect for Evo sensors the minimum and maximum values for the range are set to the lowest and highest possible readings across the Evo family (currently 0.5 - 60 m). In order to use the correct max/min values the appropriate model of the Evo sensor should be set in the parameter (instead of using autodetect).

<span></span>
> **Info** The *Terranger One* is used in the [Qualcomm Snapdragon Flight](../flight_controller/snapdragon_flight.md).

### uLanding Radar

The *Aerotenna* [uLanding](https://aerotenna.com/sensors/#ulanding) altimeter is compact microwave rangefinder that has been optimised for use on UAVs. It has a sensing range of 45m. A particular advantages of this product are that it can operate effectively in all weather conditions and over all terrain types (including water).

The uLanding Radar is not present in "most" firmware by default and must be started by updating a configuration file (rather than by a parameter). More information can be found here: [uLanding Radar](../sensor/ulanding_radar.md).

### LeddarOne

[LeddarOne](https://leddartech.com/modules/leddarone/) is small-size Lidar module with a narrow, yet diffuse beam that offers excellent overall detection range and performance, in a robust, reliable, cost-effective package. It has a sensing range from 1cm to 40m and needs to be connected to a UART/serial bus.

For setup/usage information see: [LeddarOne](../sensor/leddar_one.md).


### TFmini

The [Benewake TFmini LiDAR](http://www.benewake.com/en/tfmini.html) is a tiny, low cost, and low power LIDAR with 12m range.

> **Note** This lidar is currently in master, and should appear in releases from PX4 v1.8.

In general the *TFmini* can be used by setting the parameter [SENS_EN_TFMINI](../advanced_config/parameter_reference.md#SENS_EN_TFMINI) > 0 and connecting the sensor to the correct (board-specific) port:

Board | Port
---|---
[Intel Aero](../flight_controller/intel_aero.md) | TELEMETRY
Pixhawk [PX4FMU_V3](../flight_controller/pixhawk_series.md#fmu-versions) | SERIAL 4/5
Other Pixhawk based boards | TELEM2. The [SYS_COMPANION](../advanced_config/parameter_reference.md#SYS_COMPANION) must be set to 0.

To use the TFmini on other ports/boards, the driver can be started by using the following line in a [shell](https://dev.px4.io/en/debug/system_console.html#mavlink-shell) or the [extras.txt](https://dev.px4.io/en/advanced/system_startup.html) (startup) file located on your SD card (where `<serial port>` is the port id):
```
tfmini start -d <serial port>
```

> **Tip** Most boards will already include the driver in firmware. If not, add the following line to the *cmake* [config file](https://github.com/PX4/Firmware/tree/master/cmake/configs) that corresponds to the target board:
   ```
   drivers/tfmini
   ```


### Other

PX4 also supports the Bebop rangefinder.


## Rangefinder Configuration

### Setup

The rangefinder is configured using [EKF2\_RNG\_*](../advanced_config/parameter_reference.md#EKF2_RNG_POS_X) parameters. These configure information about the offset of the rangefinder from the centre of the vehicle body, the approximate delay of data reaching the estimator from the sensor, etc.

### Enable/Use

The rangefinder can be enabled in two ways:
1. Set [EKF2_HGT_MODE](../advanced_config/parameter_reference.md#EKF2_HGT_MODE) to *Range finder* (`2`). This makes the rangefinder the primary source of height estimation (the default altitude sensor is the barometer).
1. Set [EKF2_RNG_AID](../advanced_config/parameter_reference.md#EKF2_RNG_AID) to `1`. This makes the vehicle use the rangefinder as the primary source when it is safe to use, but will otherwise use the sensor specified in `EKF2_HGT_MODE`.
   * Specifically, the rangefinder is enabled when:
     * velocity < [EKF2_RNG_A_VMAX](../advanced_config/parameter_reference.md#EKF2_RNG_A_VMAX)
     * distance to ground < [EKF2_RNG_A_HMAX](../advanced_config/parameter_reference.md#EKF2_RNG_A_HMAX)
   * Other parameters affecting "Range aid" are prefixed with `EKF2\_RNG\_A\_`.

## Testing

The easiest way to test the rangefinder is to vary the range and compare to the values detected by PX4. The sections below show some approaches to getting the measured range.

### QGroundControl Analyze Tool

The *QGroundControl Analyze Tool* tool and *QGroundControl MAVLink Inspector* let you view messages sent from the vehicle, including `DISTANCE_SENSOR` information from the rangefinder. The main difference between the tools is that the *Analyze* tool can plot values in a graph.

> **Note** The messages that are sent depend on the vehicle configuration. You will only get `DISTANCE_SENSOR` messages if the connected vehicle has a rangefinder installed and is publishing sensor values.

To view the rangefinder output:

1. Open the menu **Widgets > Analyze**:

   ![Menu for QGC Analyze Tool](../../assets/qgc/menu_analyze_tool.png)
1. Select the message `DISTANCE_SENSOR.current_value`. The tool will then plot the result:
   ![QGC Analyze DISTANCE_SENSOR value](../../assets/qgc/qgc_analyze_tool_distance_sensor.png)


### QGroundControl MAVLink Console

You can also use the *QGroundControl MAVLink Console* to observe the `distance_sensor` uORB topic:
```sh
listener distance_sensor 5
```

> **Note** The *QGroundControl MAVLink Console* works when connected to Pixhawk or other NuttX targets, but not the Simulator. On the Simulator you can run the commands directly in the terminal.

For more information see: [Sensor/Topic Debugging using the Listener Command](https://dev.px4.io/en/debug/sensor_uorb_topic_debugging.html) (PX4 Development Guide).


## Simulation

Lidar and sonar rangefinders can be used in the [Gazebo Simulator](https://dev.px4.io/en/simulation/gazebo.html) (PX4 Development Guide).
To do this you must start the simulator using a vehicle model that includes the rangefinder.

The iris optical flow model includes a Lidar rangefinder:
```sh
make posix_sitl_default gazebo_iris_opt_flow
```

The typhoon_h480 includes a sonar rangefinder:
```sh
make posix_sitl_default gazebo_typhoon_h480
```

If you need to use a different vehicle you can include the model in its configuration file. You can see how in the respective Iris and Typhoon configuration files:
- [iris_opt_flow.sdf](https://github.com/PX4/sitl_gazebo/blob/master/models/iris_opt_flow/iris_opt_flow.sdf)
  ```xml
    <include>
      <uri>model://sonar</uri>
    </include>
    <joint name="sonar_joint" type="revolute">
      <child>sonar_model::link</child>
      <parent>typhoon_h480::base_link</parent>
      <axis>
        <xyz>0 0 1</xyz>
        <limit>
          <upper>0</upper>
          <lower>0</lower>
        </limit>
      </axis>
    </joint>
   ```
- [typhoon_h480.sdf](
https://github.com/PX4/sitl_gazebo/blob/master/models/typhoon_h480/typhoon_h480.sdf#L1144)
  ```xml
    <include>
      <uri>model://lidar</uri>
      <pose>-0.12 0 0 0 3.1415 0</pose>
    </include>
    <joint name="lidar_joint" type="revolute">
      <child>lidar::link</child>
      <parent>iris::base_link</parent>
      <axis>
        <xyz>0 0 1</xyz>
        <limit>
          <upper>0</upper>
          <lower>0</lower>
        </limit>
      </axis>
    </joint>
  ```


## Further Information

* [Rangefinder](https://pixhawk.org/peripherals/rangefinder) (Pixhawk.org) - Rangefinders supported by Pixhawk
