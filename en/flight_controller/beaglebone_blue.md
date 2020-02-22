# BeagleBone Blue

[BeagleBone Blue](https://beagleboard.org/blue) is an all-in-one Linux-based computer.
Although it is optimized for robotics, this compact and inexpensive board has all necessary sensors and peripherals needed by a flight controller.
This topic shows how to set up the board to run PX4 with [librobotcontrol](https://github.com/StrawsonDesign/librobotcontrol) robotics package.

![BeagleBone - labelled diagram](../../assets/hardware/BeagleBone_Blue_balloons.jpg)


## OS Image

*BeagleBone Blue* images can be found here:
- [Latest stable OS image](https://beagleboard.org/latest-images).
- [Test OS images](https://rcn-ee.net/rootfs/bb.org/testing/) (updated frequently).

Information about flashing OS images can be found on [this page](https://github.com/beagleboard/beaglebone-blue/wiki/Flashing-firmware).
Other useful information can be found in the [FAQ](https://github.com/beagleboard/beaglebone-blue/wiki/Frequently-Asked-Questions-&lpar;FAQ&rpar;).


> **Tip** Optionally you can update to a realtime kernel, and if you do, re-check if *librobotcontrol* works properly with the realtime kernel.

The latest OS images at time of updating this document is [bone-debian-9.9-iot-armhf-2019-08-03-4gb.img.xz](https://debian.beagleboard.org/images/bone-debian-9.9-iot-armhf-2019-08-03-4gb.img.xz).


## Cross Compiler Build (Recommend)

The recommended way to build PX4 for *BeagleBone Blue* is to compile on a development computer and upload the PX4 executable binary directly to the BeagleBone Blue. 

> **Tip** This approach is recommended over [native build](#native_builds) due to speed of deployment and ease of use.

### Beaglebone Blue WIFI Setup

For easy access to your board, you can connect it to your home network via wifi.

The steps are:
```
sudo -su
connmanctl
connmanctl>scan wifi
connmanctl>services(at this point you should see your network appear along with other stuff, in my case it was "AR Crystal wifi_f45eab2f1ee1_6372797774616c_managed_psk")
connmanctl>agent on
connmanctl>connect wifi_f45eab2f1ee1_6372797774616c_managed_psk
connmanctl>quit
```
### SSH root Login on Beaglebone
With USB Serial connectet 
```
echo "PermitRootLogin yes" >>  /etc/ssh/sshd_config && systemctl restart sshd
```

### Cross Compiler Setup

1. First set up *rsync* (this is is used to transfer files from the development computer to the target board over a network - WiFi or Ethernet). 
   For *rsync* over SSH with key authentication, follow steps here:
   1. sudo su
   1. ssh-keygen -t rsa -C root@beaglebone
   1. ENTER //no passphrase
   1. ENTER
   1. ENTER
   1. ssh-copy-id root@beaglebone
   1. When promted if you trust - yes
   1. password root
   1. On the development computer, define the BeagleBone Blue board as `beaglebone` in **/etc/hosts**
1. Cross Compile Setup
   1. Toolchain download
      1. First install the toolchain into */opt/bbblue_toolchain/gcc-arm-linux-gnueabihf*.
         Here is an example of using soft link to select which version of the toolchain you want to use:
         ```
         mkdir -p /opt/bbblue_toolchain/gcc-arm-linux-gnueabihf
         chmod -R 777 /opt/bbblue_toolchain
         ```
         ARM Cross Compiler for *BeagleBone Blue* can be found at [Linaro Toolchain Binaries site](http://www.linaro.org/downloads/). 
  
   
         > **Tip** GCC in the toolchain should be compatible with kernel in *BeagleBone Blue*.
            General rule of thumb is to choose a toolchain where version of GCC is not higher than version of GCC which comes with the OS image on *BeagleBone Blue*. 
   
         Download and unpack [gcc-linaro-7.5.0-2019.12-x86_64_arm-linux-gnueabihf](https://releases.linaro.org/components/toolchain/binaries/latest-7/arm-linux-gnueabihf/gcc-linaro-7.5.0-2019.12-x86_64_arm-linux-gnueabihf.tar.xz) to the bbblue_toolchain folder
         ``` 
         sh
         ...@ubuntu:/opt/bbblue_toolchain$ ls -l
         lrwxrwxrwx 1 root root   51 Mar 22 16:10 gcc-arm-linux-gnueabihf -> gcc-linaro-6.3.1-2017.05-x86_64_arm-linux-gnueabihf
         drwxr-xr-x 8 root root 4096 May 17  2017 gcc-linaro-6.3.1-2017.05-x86_64_arm-linux-gnueabihf
         drwxr-xr-x 8 root root 4096 Nov 19 03:51 gcc-linaro-6.4.1-2017.11-x86_64_arm-linux-gnueabihf
         ```
         The following is an example setup on development host. 
      1. Add it to the PATH in ~/.profile as shown below
         ```sh
         export PATH=$PATH:/opt/bbblue_toolchain/gcc-arm-linux-gnueabihf/gcc-linaro-6.3.1-2017.05-x86_64_arm-linux-gnueabihf/bin
         export CrossCompiler=/opt/bbblue_toolchain/gcc-arm-linux-gnueabihf/gcc-linaro-6.3.1-2017.05-x86_64_arm-linux-gnueabihf/bin/arm-linux-    gnueabihf-
         ```
         ```
         sudo usermod -a -G dialout $USER
         ```
         > **Note** Logout and Login to make the change working
   
         Download script for Ubuntu and run it
         ```
         curl https://raw.githubusercontent.com/PX4/Devguide/v1.9.0/build_scripts/ubuntu_sim_ros_melodic.sh --output ubuntu_sim_ros_melodic.sh
         chmod 777 ubuntu_sim_ros_melodic.sh
         apt-get install git
         mkdir ~/src
         cd ~/src
         git clone https://github.com/PX4/Firmware.git
         cd Firmware
         apt install python3-pip
         pip3 install --user empy
         pip3 install --user toml
         pip3 install --user numpy
         pip3 install --user jinja2
         ./ubuntu_sim_ros_melodic.sh
         ```
         After sucessfull build:
         ```
         nano Firmware/boards/beaglebone/blue/cmake/upload.cmake
         
         in row 37 change debian@beaglebone.lan --> root@beaglebone
         ```
   
### Cross Compile and Upload

Compile and Upload
```
make beaglebone_blue_default upload
```

> **Note** Without upload, files stored local in build folder.

To test the uploaded files, run the following commands on the *BeagleBone Blue* board:
```sh
cd /home/debian/px4 
sudo ./bin/px4 -s px4.config 
```

> **Note** Currently *librobotcontrol* requires root access.


## Native Builds (optional) {#native_builds}

You can also natively build PX4 builds directly on the BeagleBone Blue.

After acquiring the pre-built library,

1. Select the *librobotcontrol* installation directory, and set it in the `LIBROBOTCONTROL_INSTALL_DIR` environment variable so that other unwanted headers will not be included
1. Install **robotcontrol.h** and __rc/\*__ into `$LIBROBOTCONTROL_INSTALL_DIR/include`
1. Install pre-built native (ARM) version of librobotcontrol.\* into `$LIBROBOTCONTROL_INSTALL_DIR/lib`

Run the following commands on the BeagleBone Blue (i.e. via SSH):
1. Install dependencies:
   ```sh
   sudo apt-get update
   sudo apt-get install cmake python-empy
   ```
2. Clone the PX4 Firmware directly onto the BeagleBone Blue.
3. Continue with the [standard build system installation](https://dev.px4.io/master/en/setup/dev_env_linux.html).

## Chnages in config

All changes can be made in de px4.config file on beaglebone direct.
For example, you can change the WIFI to wlan.

>**Note** If you wanna change permanent for build, you have to change Firmware/posix-configs/bbblue/px4.config on the Build Machine before build. 

you have to change the file 
## Autostart During Boot

Here is an example [/etc/rc.local]:

```sh
#!/bin/sh -e
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

# wait for services to start up
/bin/sleep 25

cd /home/debian/px4 

/home/debian/px4/bin/px4 -d -s /home/debian/px4/px4.config > /home/debian/px4/PX4.log & 

exit 0
```

Below is a *systemd* service example [/lib/systemd/system/px4-quad-copter.service]:

```sh
[Unit]
Description=PX4 Quadcopter Service
After=networking.service network-online.target 
StartLimitIntervalSec=0
Conflicts=px4-fixed-wing.service

[Service]
WorkingDirectory=/home/debian/px4
User=root
ExecStart=/home/debian/px4/bin/px4 -d -s /home/debian/px4/px4.config  

Restart=on-failure
RestartSec=1

[Install]
WantedBy=multi-user.target
```

### Miscellaneous

#### Power Servo Rail

When PX4 starts, it automatically applies power to servos.

#### Unique Features

BeagleBone Blue has some unique features such as multiple choices of WiFi interfaces and power sources.
Refer to comments in **/home/debian/px4/px4.config** for usage of these features.

#### SBUS Signal Converter

SBUS signal from receiver (e.g., FrSky X8R) is an inverted signal.
UARTs on BeagleBone Blue can only work with non-inverted 3.3V level signal.
[This tutorial](https://dev.px4.io/master/en/tutorials/linux_sbus.html) contains a SBUS signal inverter circuit.

#### Typical Connections

For a quadcopter with GPS and an SBUS receiver, here are typical connections:

1. Connect the ESC of motor 1, 2, 3 and 4 to channel 1, 2, 3 and 4 of servo outputs on BeagleBone Blue, respectively.
   If your ESC connector contains a power output pin, remove it and do not connect it to the power output pin of the servo channel on the BeagleBone Blue.

1. Connect the above mentioned converted SBUS signal to the dsm2 port if you have the matching connector for dsm2, otherwise connect it to any other available UART port and change the corresponding port in **/home/debian/px4/px4.config** accordingly.

1. Connect the signals of GPS module to GPS port on the BeagleBone Blue.
   Note that the signal pins of the GPS port on the BeagleBone Blue are only 3.3V tolerant, so choose your GPS module accordingly.
