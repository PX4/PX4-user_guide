# Configure Snapdragon
## Autostart PX4 and Snap VIO
In order to boot both the ROS node and PX4 automatically on bootup, create a file called `start.sh` in your home directory (on the snapdragon:)
```
vim /home/linaro/start.sh
```

With the following contents:
```
#!/bin/bash
cd /home/linaro
source /opt/ros/indigo/setup.bash
source /home/linaro/ros_ws/devel/setup.bash
sleep 5
roslaunch snapdragon_mavros_vislam mavros_vislam.launch
```
	
Now, add execution to that file and edit `/etc/rc.local`:
```
chmod +x start.sh
vim /etc/rc.local
```

And append to the file, just before “exit 0”
```
/home/linaro/start.sh&
sleep 10
(cd /home/linaro && ./px4 mainapp_vislam.conf > mainapp_vislam.log)
```

## Put Snapdragon back into Access Point Mode
```
/usr/local/qr-linux/wificonfig.sh -s softap
sudo reboot
```

## ROS topic routing, RAW_IMU, etc.
For everything to work properly with the specified commits, the following files need to be edited/created:
```
vim /home/linaro/mainapp_vislam.conf
```

To look like: 
```
uorb start
muorb start
logger start -t -b 200
# Wait 1s before setting parameters for muorb to initialize
sleep 1
param set MAV_BROADCAST 1
param set SDLOG_PRIO_BOOST 3
# EKF2L Switch from barometer to vision as main source for height estimation
param set EKF2_EVP_NOISE 0.08
param set EKF2_EVA_NOISE 0.08
param set EKF2_EV_DELAY 40
param set EKF2_EV_GATE 20
dataman start
navigator start
mavlink start -u 14556 -r 1000000
sleep 1
mavlink stream -u 14556 -s HIGHRES_IMU -r 10
mavlink stream -u 14556 -s ATTITUDE -r 10
mavlink stream -u 14556 -s RC_CHANNELS -r 10
mavlink stream -u 14556 -s LOCAL_POSITION_NED -r 10
mavlink stream -u 14556 -s VISION_POSITION_ESTIMATE -r 10
#
# mavlink instance for vislam
#
mavlink start -u 14555 -r 100000 -m magic
sleep 1
mavlink stream -u 14555 -s RAW_IMU -r 250
mavlink stream -u 14555 -s LOCAL_POSITION_NED -r 50
mavlink stream -u 14555 -s ATTITUDE -r 50
mavlink stream -u 14555 -s ATTITUDE_QUATERNION -r 50
mavlink boot_complete
```

Divide the raw IMU message by 1000 inside the vislam node:
```
vim ros_ws/src/snap-vislam-ros/src/vislam/SnapdragonVislamManager.cpp
```

And change the line after "// Convert ENU to NED coordinates" like so:
```
// Convert RAW IMU to correct scale
lin_acc[0] = msg->linear_acceleration.x/1000.0;
lin_acc[1] = msg->linear_acceleration.y/1000.0;
lin_acc[2] = msg->linear_acceleration.z/1000.0;
```

Remap the vislam pose to the correct ROS topic:
```
vim ros_ws/src/snap-vislam-ros/launch/mavros_vislam.launch
```
And add the following line before the last </node>
```
<remap from="vislam/pose" to="mavros/vision_pose/pose"/>
```

## Adjust Parameters

| Parameter Name    | Recommended Value           |
|-------------------|-----------------------------|
| EKF2_HEIGHT_MODE  | 3   VISION                  |
| EKF2_AID_MASK     | 24 (VISION POS, VISION YAW) |
| MPC_THR_HOWVER    | 25 %               	  |
| MC_PITCHRATE_P    | 0.03                 	  |
| MC_PITCHRATE_D    | 0.001                 	  |
| MC_ROLLRATE_P     | 0.03                 	  |
| MC_ROLLRATE_D     | 0.001              	  |
| MC_RAWRATE_P      | 0.08                        |
| EKF2_IMU_POS_Z    | 0.030m    		  |
| EKF2_EV_POS_Z     | 0.03m			  |
| PWM_MIN	    | 1150us			  |
| CAL_MAG0_ROT	    | No rotation		  |
| CAL_MAG1_ROT	    | Yaw 90°			  |








