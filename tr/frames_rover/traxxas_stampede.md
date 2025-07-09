---
canonicalUrl: https://docs.px4.io/main/tr/frames_rover/traxxas_stampede
---

# Traxxas Stampede VXL

This vehicle was chosen to understand how a Pixhawk could be used for wheeled platforms. We chose to use a Traxxas vehicle as they are very popular and it is a very strong brand in the RC community. The idea was to develop a platform that allows for easy control of wheeled UGVs with an autopilot.

![Traxxas Stampede VXL](../../assets/airframes/rover/traxxas_stampede_vxl/stampede.jpg)

## Parts List

* [Traxxas Stampede](https://traxxas.com/products/models/electric/stampede-vxl-tsm) All of this is used except for the top plastic cover.
* [Pixhawk Mini (Discontinued)](../flight_controller/pixhawk_mini.md)
  * 3DR 10S Power Module
  * 3DR 433MHz Telemetry Module (EU)
* [Spektrum Dxe Controller](http://www.spektrumrc.com/Products/Default.aspx?ProdId=SPM1000) or other PX4-compatible remotes
* [Spektrum Quad Race Serial Receiver w/Diversity](http://www.spektrumrc.com/Products/Default.aspx?ProdID=SPM4648)
* [PX4Flow](../sensor/px4flow.md) (Deprecated)


## Assembly

The assembly consists of a wooden frame on which all the autopilot parts were attached. Tests showed that a better vibration insulation should be used, especially for the Pixhawk and the Flow module.

![Stampede Chassis](../../assets/airframes/rover/traxxas_stampede_vxl/stampede_chassis.jpg)

![Wooden Panel Top](../../assets/airframes/rover/traxxas_stampede_vxl/panel_top.jpg)

![Wooden Panel Bottom](../../assets/airframes/rover/traxxas_stampede_vxl/panel_bottom.jpg)

![Traxxas Stampede Final Assembly](../../assets/airframes/rover/traxxas_stampede_vxl/final_assembly.jpg)

![Side View Final Assembly](../../assets/airframes/rover/traxxas_stampede_vxl/final_side.jpg)

![Wodden panel fixture](../../assets/airframes/rover/traxxas_stampede_vxl/mounting_detail.jpg)

For this particular mounting we chose to use the clip supplied with the rover to attach the upper plate. For this, two supports were 3D printed. The CAD files are provided [here](https://github.com/PX4/PX4-user_guide/raw/v1.14/assets/airframes/rover/traxxas_stampede_vxl/plane_holders.zip).

:::warning
It is **HIGHLY RECOMMENDED** to set the ESC in training mode (see Traxxas Stampede Manual), which reduces power to 50%.
:::

## Output Connections

| PWM Output | Actuator             |
| ---------- | -------------------- |
| MAIN2      | Steering servo       |
| MAIN4      | Throttle (ESC input) |

:::note
As documented in the Airframe Reference: [Generic ground vehicle (Ackermann)](../airframes/airframe_reference.md#rover_rover_generic_ground_vehicle_(ackermann)).
:::

## Configuration

Rovers are configured using *QGroundControl* in the same way as any other vehicle.

The main rover-specific configuration is setting the correct frame:
1. Switch to the [Basic Configuration](../config/README.md) section in *QGroundControl*
1. Select the [Airframe](../config/airframe.md) tab.
1. Scroll down the list to find the **Rover** icon.
1. Choose **Traxxas stampede vxl 2wd** from the drop down list.

![Select Airframe](../../assets/airframes/rover/traxxas_stampede_vxl/airframe_px4_rover_traxxas_stampede_vxl_2wd.jpg)


## Usage

At the current time, PX4 only supports [MISSION](../flight_modes/mission.md) and MANUAL modes when a RC remote is connected. To use the mission mode, first upload a new mission to the vehicle with QGC. Then, BEFORE ARMING, select `MISSION` and then arm.

:::warning
It is very important to do a mission composed *only** of normal waypoints (i.e. no takeoff waypoints etc.) and it is crucial to set the waypoint height of **every** waypoint to 0 for correct execution. Failing to do so will cause the rover to continuously spin around a waypoint.
:::

A correct mission setup looks as follows:

![mission](../../assets/airframes/rover/traxxas_stampede_vxl/correct_mission.jpg)


## Video

<iframe width="740" height="416" src="https://www.youtube.com/embed/N3HvSKS3nCw" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
