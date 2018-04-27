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
sudo vim /etc/rc.local
```

And append to the file, just before “exit 0”
```
/home/linaro/start.sh&
sleep 10
(cd /home/linaro && ./px4 ros_ws/src/snap-vislam-ros/px4_configs/ekf2/mainapp.conf > mainapp_vislam.log)
```

## Put Snapdragon back into Access Point Mode
```
/usr/local/qr-linux/wificonfig.sh -s softap
sudo reboot
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








