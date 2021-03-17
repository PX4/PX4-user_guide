# ARK Flow

ARK Flow is an open source [UAVCAN](README.md) [optical flow](../sensor/optical_flow.md), [distance sensor](../sensor/rangefinders.md), and IMU module.

![ARK Flow](../../assets/hardware/sensors/optical_flow/ark_flow.jpg)

## Where to Buy

Order this module from:

* [ARK Electronics](https://arkelectron.com/product/ark-flow/) (US)

## Specifications

* [Open Source Schematic and BOM](https://github.com/ARK-Electronics/ARK_Flow)
* Runs [PX4 Open Source Firmware](https://github.com/PX4/PX4-Autopilot/tree/master/boards/ark/can-flow)
* Supports [UAVCAN](README.md) [Firmware Updating](node_firmware.md)
* Dynamic [UAVCAN](README.md) node enumeration
* Sensors
    * PixArt PAW3902 Optical Flow Sensor
    * Tracks under super low light condition of >9 lux
    * Wide working range from 80mm up to infinity
    * Up to 7.4 rad/s
    * 40mW IR LED built onto board for improved low light operation
  * Broadcom AFBR-S50LV85D Time-of-Flight Distance Sensor
    * Integrated 850 nm laser light source
    * Field-of-View (FoV) of 12.4° x 6.2° with 32 pixels
    * Typical distance range up to 30m
    * Operation of up to 200k Lux ambient light
    * Works well on all surface conditions
    * Transmitter beam of 2° x 2° to illuminate between 1 and 3 pixels
* Bosch BMI088 6-Axis IMU
* STM32F412CEU6 MCU
* Two Pixhawk Standard CAN Connectors
  * 4 Pin JST GH
* Pixhawk Standard Debug Connector
  * 6 Pin JST SH
* Small Form Factor
  * 3cm x 3cm x 1.4cm
* LED Indicators
* USA Built

## Pixhawk Setup

In order to use the ARK Flow board, connect it to the CAN bus (on any Pixhawk series controller) and enable the UAVCAN driver using [UAVCAN_ENABLE](../advanced_config/parameter_reference.md#UAVCAN_ENABLE) set to 2 or 3.

The steps are:
- In *QGroundControl*:
  - Set the parameter [UAVCAN_ENABLE](../advanced_config/parameter_reference.md#UAVCAN_ENABLE) and reboot (see [Parameters](../advanced_config/parameters.md) for information on finding and setting parameters).
- Connect ARK Flow CAN to the Pixhawk CAN

Once enabled, the module will be detected on boot.
Flow data should be coming through at 10Hz.

<span id="mounting"></span>
### Mounting/Orientation

The recommended mounting orientation is defined connectors on the board pointing towards **back of vehicle**, as shown in the following picture.

![ARK Flow align with Pixhawk](../../assets/hardware/sensors/optical_flow/ark_flow_orientation.png)

On **PX4**, the orientation should be set using the parameter [SENS_FLOW_ROT](../advanced_config/parameter_reference.md#SENS_FLOW_ROT).

<span id="px4_configuration"></span>
## PX4 Configuration

The parameters that you may need to configure are listed below.

Parameter | Description
--- | ---
<span id="SENS_FLOW_MAXHGT"></span>[SENS_FLOW_MAXHGT](../advanced_config/parameter_reference.md#SENS_FLOW_MAXHGT) | Maximum height above ground when reliant on optical flow.
<span id="SENS_FLOW_MINHGT"></span>[SENS_FLOW_MINHGT](../advanced_config/parameter_reference.md#SENS_FLOW_MINHGT) | Minimum height above ground when reliant on optical flow.
<span id="SENS_FLOW_MAXR"></span>[SENS_FLOW_MAXR](../advanced_config/parameter_reference.md#SENS_FLOW_MAXR) | Maximum angular flow rate reliably measurable by the optical flow sensor.
<span id="SENS_FLOW_ROT"></span>[SENS_FLOW_ROT](../advanced_config/parameter_reference.md#SENS_FLOW_ROT) | Yaw rotation of the board relative to the vehicle body frame.

If you're using flow with the ECL/EFK2 estimator you will also need to set the [Optical Flow > Estimators > EKF2](../sensor/optical_flow.md#ekf2) parameters.
These enable fusing optical flow measurements for velocity calculation and also allow you to define offsets if the sensor is not centred within the vehicle.

### Connecting

The ARK Flow is connected to the CAN bus using a Pixhawk standard 4 pin JST GH cable.
Multiple sensors can be connected by plugging additional sensors into the ARK Flow's second CAN connector.

## Software / Build Source

* PX4 Firmware (Firmware source code on Github: [PX4/PX4-Autopilot](https://github.com/PX4/PX4-Autopilot))

## Building Firmware for Development

Install the [PX4 toolchain](../dev_setup/dev_env.md). 
Then and clone the sources from https://github.com/PX4/PX4-Autopilot using *git*.

```bash
cd PX4-Autopilot
make ark_can-flow
```
Then follow instructions for [UAVCAN firmware updating](node_firmware.md) instructions using the binary located in build/ark_can-flow_default named XX-X.X.XXXXXXXX.uavcan.bin