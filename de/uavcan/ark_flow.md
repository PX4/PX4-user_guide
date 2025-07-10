---
canonicalUrl: https://docs.px4.io/main/de/uavcan/ark_flow
---

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



### Wiring/Connecting

The ARK Flow is connected to the CAN bus using a Pixhawk standard 4 pin JST GH cable. Multiple sensors can be connected by plugging additional sensors into the ARK Flow's second CAN connector.

General instructions for UAVCAN wiring can also be found in [UAVCAN > Wiring](../uavcan/README.md#wiring).

<a id="mounting"></a>

### Mounting/Orientation

The recommended mounting orientation is with the connectors on the board pointing towards **back of vehicle**, as shown in the following picture.

![ARK Flow align with Pixhawk](../../assets/hardware/sensors/optical_flow/ark_flow_orientation.png)

This corresponds to the default value (`0`) of the parameter [SENS_FLOW_ROT](../advanced_config/parameter_reference.md#SENS_FLOW_ROT). Change the parameter appropriately if using a different orientation.

The sensor can be mounted anywhere on the frame, but you will need to specify the focal point position, relative to vehicle centre of gravity, during [PX4 configuration](#px4-configuration).


## PX4 Setup

### Enabling UAVCAN

In order to use the ARK Flow board, connect it to the Pixhawk CAN bus and enable the UAVCAN driver by setting parameter [UAVCAN_ENABLE](../advanced_config/parameter_reference.md#UAVCAN_ENABLE) to `2` for dynamic node allocation (or `3` if using [UAVCAN ESCs](../uavcan/escs.md)).

The steps are:
- In *QGroundControl* set the parameter [UAVCAN_ENABLE](../advanced_config/parameter_reference.md#UAVCAN_ENABLE) to `2` or `3` and reboot (see [Finding/Updating Parameters](../advanced_config/parameters.md)).
- Connect ARK Flow CAN to the Pixhawk CAN.

Once enabled, the module will be detected on boot. Flow data should arrive at 10Hz.

### PX4 Configuration

Set the EKF optical flow parameters in [Optical Flow > Estimators > EKF2](../sensor/optical_flow.md#ekf2) in order to:
- enable fusing optical flow measurements for velocity calculation.
- define offsets if the sensor is not centred within the vehicle.

In addition you may need to configure the following parameters.

| Parameter                                                                                                           | Description                                                               |
| ------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| <span id="SENS_FLOW_MAXHGT"></span>[SENS_FLOW_MAXHGT](../advanced_config/parameter_reference.md#SENS_FLOW_MAXHGT) | Maximum height above ground when reliant on optical flow.                 |
| <span id="SENS_FLOW_MINHGT"></span>[SENS_FLOW_MINHGT](../advanced_config/parameter_reference.md#SENS_FLOW_MINHGT) | Minimum height above ground when reliant on optical flow.                 |
| <span id="SENS_FLOW_MAXR"></span>[SENS_FLOW_MAXR](../advanced_config/parameter_reference.md#SENS_FLOW_MAXR)       | Maximum angular flow rate reliably measurable by the optical flow sensor. |
| <span id="SENS_FLOW_ROT"></span>[SENS_FLOW_ROT](../advanced_config/parameter_reference.md#SENS_FLOW_ROT)          | Yaw rotation of the board relative to the vehicle body frame.             |


## Building Ark Flow Firmware

Ark Flow is sold with a recent firmware build. Developers who want to update to the very latest version can build and install it themselves using the normal PX4 toolchain and sources.

The steps are:
1. Install the [PX4 toolchain](../dev_setup/dev_env.md).
1. Clone the PX4-Autopilot sources, including Ark Flow, using *git*:
   ```bash
   git clone https://github.com/PX4/PX4-Autopilot --recursive
   cd PX4-Autopilot
   ```
1. Build the *Ark Flow* firmware:
   ```
   make ark_can-flow
   ```
1. Follow instructions for [UAVCAN firmware updating](node_firmware.md) using the binary located in **build/ark_can-flow_default** named **XX-X.X.XXXXXXXX.uavcan.bin**.

## Video

@[youtube](https://youtu.be/aPQKgUof3Pc)
<!-- ARK Flow with PX4 Optical Flow Position Hold: 20210605 -->
*PX4 holding position using the ARK Flow sensor for velocity estimation (in [Position Mode](../flight_modes/position_mc.md)).* 