# Optical Flow

Optical Flow uses a downward facing camera and a downward facing distance sensor for position estimation.

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

For pure rotations the `integrated_xgyro` and `integrated_x` (respectively `integrated_ygyro` and `integrated_y`) have to be the same.

An exemplary setup is the [PX4Flow](../sensor/px4flow.md) and [Lidar-Lite](../sensor/lidar_lite.md), as shown below.

![Optical flow lidar attached](../../assets/hardware/sensors/optical_flow/flow_lidar_attached.jpg)


### Cameras

#### PX4Flow

Currently PX4 supports both the [PX4Flow](../sensor/px4flow.md) and the [Bitcraze Flow](../sensor/bitcraze_flow.md) (see link for setup information). 

#### Other Cameras

It is also possible to use a board/quad that has an integrated camera (Bebop2, Snapdragon Flight). 
For this the [Optical Flow repo](https://github.com/PX4/OpticalFlow) can be used (see also [snap_cam](https://github.com/PX4/snap_cam)).

### Range Finder

You can use any supported [distance sensor](../sensor/rangefinders.md).
However we recommend using a LIDAR over a Sonar, because of robustness and accuracy. 

## Estimators

### Extended Kalman Filter (EKF2)

For Optical Flow fusion using EKF2, the parameter [EKF2_AID_MASK](../advanced_config/parameter_reference.md#EKF2_AID_MASK) must be set to `1`.

### Local Position Estimator (LPE)

TODO

