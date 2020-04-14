# Configure Snapdragon

> **Note** The *Qualcomm Snapdragon Flight* is discontinued (it has been superseded but PX4 does not yet support the newer version).
  This documentation is provided for existing users, but will be removed in a future release.

This topic explains how to configure the *Qualcomm Snapdragon Flight*.

## Autostart PX4 and Snap VIO

In order to boot both the ROS node and PX4 automatically on bootup, edit the **/etc/rc.local** file on the Snapdragon Flight to look like this (note that the first line must change too!):

```
#!/bin/bash -e
#
# rc.local
#
# This script is executed at the end of each multiuser runlevel.
# Make sure that the script will "exit 0" on success or any other
# value on error.
#
# In order to enable or disable this script just change the execution
# bits.
#
# By default this script does nothing.

# Generate the SSH keys if non-existent
test -f /etc/ssh/ssh_host_dsa_key || dpkg-reconfigure openssh-server

# Prepare the ROS environment
cd /home/linaro
source /opt/ros/indigo/setup.bash
source /home/linaro/ros_ws/devel/setup.bash

# Launch the mavros vislam node but add some delay otherwise startup is not reliable
sleep 5
roslaunch snapdragon_mavros_vislam mavros_vislam.launch > /dev/null &

# Launch PX4 autopilot in VIO configuration but add some delay otherwise startup is not reliable
sleep 5
./px4 /home/linaro/ros_ws/src/ros-examples/px4_configs/ekf2/mainapp.conf > /dev/null &

exit 0
```

## Put Snapdragon back into Access Point Mode

The Snapdragon Flight was set to station mode in the [ROS Setup](snapdragon_flight_software_installation.md#install-ros). 
This could be a problem if you want to fly it outdoors where your home Wi-Fi is no longer available, so we recommend putting it back into access point mode.
```
/usr/local/qr-linux/wificonfig.sh -s softap
sudo reboot
```

## Adjust Parameters

| Parameter Name    | Recommended Value           |
|-------------------|-----------------------------|
| EKF2_HEIGHT_MODE  | 3   VISION                  |
| EKF2_AID_MASK     | 24 (VISION POS, VISION YAW) |
| MPC_THR_HOVER     | 25 %                        |
| MC_PITCHRATE_P    | 0.03                        |
| MC_PITCHRATE_D    | 0.001                       |
| MC_ROLLRATE_P     | 0.03                        |
| MC_ROLLRATE_D     | 0.001                       |
| MC_RAWRATE_P      | 0.08                        |
| EKF2_IMU_POS_Z    | 0.030m                      |
| EKF2_EV_POS_Z     | 0.03m                       |
| PWM_MIN           | 1150us                      |
