# Optical Flow

Optical Flow uses a downward facing camera and a downward facing distance sensor for position estimation. 
Optical Flow based navigation is supported by: EKF2 and LPE.

## Setup

An Optical Flow setup requires a downward facing camera and a [distance sensor](../sensor/rangefinders.md) (preferably a LiDAR).
These can be connected via MAVLink, I2C or any other bus that supports the peripheral.

> **Note** If connected to PX4 via MAVLink
  the Optical Flow device must publish to the [OPTICAL_FLOW_RAD](https://mavlink.io/en/messages/common.html#OPTICAL_FLOW_RAD) topic,
  and the distance sensor much publish to the [DISANCE_SENSOR](https://mavlink.io/en/messages/common.html#DISTANCE_SENSOR) topic.

The output of the flow when moving in different directions must be as follows:

| Vehicle movement | Integrated flow |
| -- | -- |
| Forwards | + Y |
| Backwards | - Y |
| Right | - X |
| Left | + X |

For pure rotations the `integraded_xgyro` and `integraded_x` (respectively `integraded_ygyro` and `integraded_y`) have to be the same.

An exemplary setup is the [PX4Flow](../sensor/px4flow.md) and [Lidar-Lite](../sensor/lidar_lite.md), as shown below.

![Optical flow lidar attached](../../assets/hardware/sensors/optical_flow/flow_lidar_attached.jpg)


### Cameras

#### PX4Flow

The easiest way to calculate the optical flow is to use the [PX4Flow](../sensor/px4flow.md) board (see link for setup information).

#### Other Cameras

It is also possible to use a board/quad that has an integrated camera (Bebop2, Snapdragon Flight). 
For this the [Optical Flow repo](https://github.com/PX4/OpticalFlow) can be used (see also [snap_cam](https://github.com/PX4/snap_cam)).

### Range Finder

You can use any supported [distance sensor](../sensor/rangefinders.md).
However we recommend using a LIDAR over a Sonar, because of robustness and accuracy. 

## Estimators

### Extended Kalman Filter (EKF2)
In order to use the EKF2 estimator, make sure the parameter [SYS_MC_EST_GROUP](../advanced_config/parameter_reference.md#SYS_MC_EST_GROUP) is set to `2` and reboot. 
For Optical Flow fusion, the parameter [EKF2_AID_MASK](../advanced_config/parameter_reference.md#EKF2_AID_MASK) has to be set accordingly.

### Local Position Estimator (LPE)

TODO

