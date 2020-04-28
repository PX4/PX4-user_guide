# Visual Intertial Odometry (VIO)

*Visual Inertial Odometry* (VIO) is a [computer vision](../computer_vision/README.md) technique used for estimating the 3D *pose* (local position and orientation) and *velocity* of a moving vehicle relative to a *local* starting position.
It is commonly used to navigate a vehicle in situations where GPS is absent or unreliable (e.g. indoors, or when flying under a bridge).

VIO uses [Visual Odometry](https://en.wikipedia.org/wiki/Visual_odometry) to estimate vehicle *pose* from camera images, combined with inertial measurements from the vehicle IMU (to correct for errors associated with rapid vehicle movement resulting in poor image capture).

<!-- video here -->



## Supported Sensors 

- [T265 Intel Realsense Tracking Camera](../peripherals/camera_t265_vio.md)


## Setup Instructions

You will need to attach your camera to the companion computer and set up ROS.
Generally the camera should be mounted facing down. 
If using the [T265 ](../peripherals/camera_t265_vio.md) it should also be soft-mounted.


> **Note** ROS is not required to for VIO, but is the supported method. 

These instructions explain how to set up VIO using ROS:
- On the companion computer, install and configure [MAVROS](https://dev.px4.io/master/en/ros/mavros_installation.html) and verify it is connected successfully to the flight controller.
- Get the Auterion [VIO bridge ROS node](https://github.com/Auterion/VIO_bridge) (this is installed as a normal ROS node).
- Configure the [VIO bridge launch file] to reflect your camera orientation.
  No configuration is required if thelenses face down (the default).
- Follow the instructions at [External position estimation](https://dev.px4.io/master/en/ros/external_position_estimation.html#ekf2-tuningconfiguration) for tuning the EKF2.


## Troubleshooting

First make sure MAVROS is able to connect successfully to the flight controller.

If it is connecting properly common problems/solutions are:

- **Problem:** I get drift / flyaways when the drone flies, but not when I carry it around with the props off.
  - If using the [T265](../peripheral/camera_t265_vio.md) try soft-mounting it (this camera is very sensitive to high frequency vibrations).

- **Problem:** I get toilet-bowling when VIO is enabled.
  - Make sure the orientation of the camera matches the transform in the launch file.
    Use the *QGroundControl* [MAVLink Inspector](https://docs.qgroundcontrol.com/en/analyze_view/mavlink_inspector.html) to verify that the velocities in the `ODOMETRY` message coming from MAVROS are aligned to the FRD coordinate system.

- **Problem:** I want to use vision position to do loop closing, and also want to run GPS.
  - This is really difficult, because when they disagree it will confuse the EKF.
    From testing it is more reliable to just use vision velocity (if you figure out a way to make this configuration reliable, let us know).


## Further Information

- [Using Vision or Motion Capture Systems for Position Estimation](https://dev.px4.io/master/en/ros/external_position_estimation.html) (PX4 Developer Guide)
- [EKF > External Vision System](../advanced_config/tuning_the_ecl_ekf.md#external-vision-system)
- [Snapdragon > Installation > Install Snap VIO](../flight_controller/snapdragon_flight_software_installation.md#install-snap-vio)