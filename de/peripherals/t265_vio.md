# T265 VIO Camera Setup Guide

The [Intel Realsense Tracking Camera T265](https://www.intelrealsense.com/tracking-camera-t265/) is a [VIO](https://dev.px4.io/master/en/advanced/computer_vision.html) (or V-SLAM) camera produced by Intel. It provides odometry information which can be used to augment or replace other positioning systems on PX4.

## Setup Instructions

These instructions explain how to set up VIO using ROS (the supported method):

- On the companion computer, install and configure [MAVROS](https://dev.px4.io/master/en/ros/mavros_installation.html) and verify it is connected successfully to the flight controller
- Get the [VIO bridge ROS node from Auterion](https://github.com/Auterion/VIO_bridge)
- Configure the VIO bridge launch file to reflect your camera orientation. Default is with the lenses downwards facing.
- Follow the instructions at [External position estimation](https://dev.px4.io/master/en/ros/external_position_estimation.html#ekf2-tuningconfiguration) for tuning the EKF2.

## Troubleshooting

First make sure MAVROS is able to connect successfully to the flight controller.

If you're certain it is connecting properly here are some things to try:

- Problem: I get drift / flyaways when the drone flies, but not when I carry it around with the props off.
  - Try soft-mounting the T265. It is very sensitive to high frequency vibrations.

- Problem: I get toilet-bowling when the VIO is enabled
  - Make sure the orientation of the camera matches the transform in the launch file. Use the *QGroundControl* [MAVLink Inspector](https://docs.qgroundcontrol.com/en/analyze_view/mavlink_inspector.html) to verify that the velocities in the `ODOMETRY` message coming from MAVROS are aligned to the FRD coordinate system.

- Problem: I want to use vision position to do loop closing, and also want to run GPS.
  - This is really difficult, because when they disagree it will confuse the EKF. From testing it is more reliable to just use vision velocity. (If you figure out a way to make it reliable, let us know)
