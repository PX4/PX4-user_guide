# Installing Software on the Snapdragon
To get the platform running with the complete VIO system running, multiple pieces are required. The following is an overview of the different versions used.

| Software	| Tested version			| Link/commit ID				|
|---------------|---------------------------------------|-----------------------------------------------|
| ROS		| indigo				|[here](http://wiki.ros.org/indigo)		|
| MAVROS	| 0.19.0				|[399a04e](https://github.com/nicovanduijn/mavros/commit/399a04ef5739bd93fe1c596b63d6bdbfba7d84ef)|
| MAVLink	| release/kinetic/mavlink/2017.5.5-0 	|[2ec76d2](https://github.com/mavlink/mavlink-gbp-release/commit/2ec76d25c6b7e6fac1f6b0d08765d07aa0f4f69d)|
| PX4		| 1.7.3 + additions			|[087f0f8](https://github.com/ChristophTobler/Firmware/commit/087f0f8bf014a6b073c12408f35cb9fb2e588af9)|
| Snap VIO	| mv-1.0.2/mavros-integration		|[eecc3c2](https://github.com/nicovanduijn/snap-vislam-ros/commit/eecc3c24cb2dc4451df1e97f699fffdaac04f266)|
| Snapdragon-Linux| 3.1.3.1				|[here](https://support.intrinsyc.com/projects/snapdragon-flight/files)|
| DSP Firmware	| 3.1.3.1				|[here](https://support.intrinsyc.com/projects/snapdragon-flight/files)|
| Qualcomm MV	| 1.0.2					|[here](https://developer.qualcomm.com/sdflight-tools)|


## Prevent Bricking
To prevent the system from hanging on boot because of anything wrong with the ADSP firmware, do the following changes before going any further.
Plug your snapdragon into your computer via USB and open the android debug shell:
`adb shell`

Edit the file `/usr/local/qr-linux/q6-admin.sh`:
```
vim /usr/local/qr-linux/q6-admin.sh
```

Comment out the following lines:
```
# Wait for adsp.mdt to show up
	#while [ ! -s /lib/firmware/adsp.mdt ]; do
	#  sleep 0.1
	#done
```


And:
```
# Don't leave until ADSP is up
	#while [ "`cat /sys/kernel/debug/msm_subsys/adsp`" != "2" ]; do
	#  sleep 0.1
	#done
```

## Update Linux Image
> **Warning** Updating the Linux Image on your snapdragon will erase everything.

Get the latest `Flight_x.x_JFlash.zip` from [here](https://support.intrinsyc.com/projects/snapdragon-flight/files) and unzip it. In the unzipped folder is a script that has to be used to update the Linux image. Power your Snapdragon Flight, connect it using a micro USB cable and run

`sudo ./jflash.sh`


## Update DSP Processor Firmware
Get the latest `Flight_x.x_qcom_flight_controller_hexagon_sdk_add_on.zip` from [here](https://support.intrinsyc.com/projects/snapdragon-flight/files) and unzip it. In the unzipped folder, run
```
./installfcaddon.sh
adb shell
sudo reboot
```

## Clone PX4 Firmware & Build
On your PC, clone the PX4 firmware repo and build it like so:

If you haven't yet cloned the Firmware repo:
```
cd ~
mkdir src
cd src
git clone git@github.com:ChristophTobler/Firmware.git
cd Firmware
```

Once you're in your local copy of the Firmware:
```
git checkout pr-raw_imu_snappy
git submodule update --init --recursive
export FC_ADDON=<location-of-extracted-flight-controller-addon>
make clean
make eagle_default
make eagle_default upload
adb push ROMFS/px4fmu_common/mixers/quad_x.main.mix  /usr/share/data/adsp
```

## Install ROS
Set up your Snapdragon Flight to connect to your local Wi-Fi network. To do so, open an *adb* shell and edit the file `/etc/wpa_supplicant/wpa_supplicant.conf` and add your local network settings:
```
adb shell
vim /etc/wpa_supplicant/wpa_supplicant.conf
```

There, add your Wi-Fi settings:
```
network={
	    ssid="my existing network ssid"
	    psk="my existing password"
	}
```


Finally, set the system to station mode. Also, editing the station network interface config file will keep your ssh terminal from lagging: (all inside adb shell)
```
/usr/local/qr-linux/wificonfig.sh -s station
echo 'wireless-power off' |sudo tee -a /etc/network/interfaces.d/.qca6234.cfg.station
sudo reboot
```

Now, to install ROS, start by setting your locale, sources.list and keys (in *adb* or ssh shell)
```
export LANGUAGE=en_US.UTF-8
export LANG=en_US.UTF-8
sudo  locale-gen en_US.UTF-8
sudo dpkg-reconfigure locales
sudo update-locale LANG=C LANGUAGE=C LC_ALL=C LC_MESSAGES=POSIX
sudo sh -c 'echo "deb http://packages.ros.org/ros/ubuntu trusty main" > /etc/apt/sources.list.d/ros-latest.list'
sudo apt-key adv --keyserver hkp://ha.pool.sks-keyservers.net:80 --recv-key 421C365BD9FF1F717815A3895523BAEEB01FA116
sudo apt-get update
sudo apt-get install ros-indigo-ros-base #(yields error)
sudo apt-get -f -o Dpkg::Options::="--force-overwrite" install
```

Edit your `~/.bashrc` to source the ros environment:
```
sudo chown -R linaro /home/linaro
echo "source /opt/ros/indigo/setup.bash" >> /home/linaro/.bashrc
source .bashrc
```

## Install some Extra Packages:

Before you can use ROS, you will need to initialize rosdep. Rosdep enables you to easily install system dependencies for source you want to compile and is required to run some core components in ROS:
```
sudo rosdep init
rosdep update
```

After installing ROS, the OpenCL library gets installed by ROS as well which causes a conflict with camera pipeline. To fix this, do the following:
```
sudo dpkg -r libhwloc-plugins
sudo dpkg -r ocl-icd-libopencl1:armhf
``` 		

Now, set up your workspace:
```
source .bashrc
mkdir -p /home/linaro/ros_ws/src
cd ros_ws/src
catkin_init_workspace
cd ..
```



## Create a Swap Directory on the Snapdragon
In order not to run out of memory during compilation of mavros, you need to create a swap file:
```
sudo fallocate -l 1G /mnt/1GB.swap
sudo mkswap /mnt/1GB.swap
sudo swapon /mnt/1GB.swap
echo '/mnt/1GB.swap  none  swap  sw 0  0' |sudo tee -a /etc/fstab
```

## Install MAVROS & MAVLink
In order to get MAVROS and MAVLink running, you need to install some python tools and then clone the code and check out the proper commits for compatibility.
```
sudo apt-get install python-pip
sudo apt-get install python-rosinstall
sudo apt-get update
sudo apt-get install python-rosinstall-generator
sudo apt-get install python-catkin-tools
rosinstall_generator --rosdistro kinetic mavlink | tee /tmp/mavros.rosinstall
rosinstall_generator --rosdistro kinetic --upstream mavros | tee -a /tmp/mavros.rosinstall
wstool init src
wstool merge -t src /tmp/mavros.rosinstall
wstool update -t src -j4
rosdep update
sudo rosdep install --rosdistro indigo --from-paths src --ignore-src -y
cd src/mavros
git checkout 0.19.0
cd ../mavlink
git checkout release/kinetic/mavlink/2017.5.5-0
cd ../..
catkin build
echo 'source /home/linaro/ros_ws/devel/setup.sh' >> /home/linaro/.bashrc
source ../bashrc
```
"catkin build" is necessary as it creates the `/home/linaro/ros_ws/devel` directory. This is where the generated libraries and the executables will be generated. It also generates a new bash setup script which includes the appropriate environment variables for using the "ros_ws" workspace.

## Install Snap VIO
First, download (to your PC) version 1.0.2 Snapdragon Machine Vision SDK from [here](https://developer.qualcomm.com/sdflight-tools). The package name will be mv<version>.deb. Push the deb package to the snapdragon and install it.
```
adb push mv<version>.deb /home/linaro
adb shell sync
adb shell
dpkg -i /home/linaro/mv<version>.deb
mkdir /opt/qcom-licenses
```

The Machine Vision SDK will need a license file to run. Obtain a research and development license file from [here](https://developer.qualcomm.com/sdflight-key-req). The license file needs to be placed in the following folder on target: `/opt/qcom-licenses/`

Push the license file to the target using the following command:
```
adb push snapdragon-flight-license.bin /opt/qcom-licenses/
adb shell sync
```

Now, we are ready to clone the snap vislam node:
```
adb shell
cd ~/ros_ws/src
git clone https://github.com/nicovanduijn/snap-vislam-ros.git
cd snap-vislam-ros
git checkout mv-1.0.2/mavros-integration
cd ..
catkin build
```
