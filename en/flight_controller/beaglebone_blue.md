# BeagleBone Blue

[BeagleBone Blue](https://beagleboard.org/blue) is an all-in-one Linux-based computer. 
Although it is optimized for robotics, this compact and inexpensive board has all necessary sensors and peripherals needed by a flight controller. 
This topic shows how to set up the board to run PX4 with [librobotcontrol](https://github.com/StrawsonDesign/librobotcontrol) robotics package.

![BeagleBone - labelled diagram](../../assets/hardware/BeagleBone_Blue_balloons.png)


## OS Image

*BeagleBone Blue* images can be found here:
- [Latest stable OS image](https://beagleboard.org/latest-images).
- [Test OS images](https://rcn-ee.net/rootfs/bb.org/testing/) (updated frequently).

Information about flashing OS images can be found on [this page](https://github.com/beagleboard/beaglebone-blue/wiki/Flashing-firmware).
Other useful information can be found in the [FAQ](https://github.com/beagleboard/beaglebone-blue/wiki/Frequently-Asked-Questions-&lpar;FAQ&rpar;).


## Robot Control Library

On [BeagleBone Blue](https://beagleboard.org/blue), PX4 uses [librobotcontrol](https://github.com/StrawsonDesign/librobotcontrol) version 1.0.0 or higher.

BeagleBoard OS images come with *librobotcontrol* preinstalled, but it may not work properly in all OS images.

One way to check if *librobotcontrol* works properly is to run *rc_test_drivers* which comes with *librobotcontrol*. 
As shown in the following example, all tests should pass. 
Optionally run other tests such as *rc_test_bmp*, *rc_test_mpu*, etc.

```sh
debian@beaglebone:~$ rc_test_drivers

Kernel: 4.14.56-ti-rt-r64
BeagleBoard.org Debian Image 2018-07-22
Debian: 9.5

PASSED: gpio 0
PASSED: gpio 1
PASSED: gpio 2
PASSED: gpio 3
PASSED: pwm1
PASSED: pwm2
PASSED: eqep0
PASSED: eqep1
PASSED: eqep2
PASSED: pru-rproc
PASSED: uart1
PASSED: uart2
PASSED: uart4
PASSED: uart5
PASSED: i2c1
PASSED: i2c2
PASSED: spi
PASSED: LED
PASSED: ADC iio

Currently running on a:
MODEL_BB_BLUE
Robot Control library Version:
1.0.0
```

> **Tip** Optionally you can update to a realtime kernel, and if you do, re-check if *librobotcontrol* works properly with the realtime kernel.

The latest OS images in which *librobotcontrol* works properly (at time of writing) is [bone-debian-9.5-iot-armhf-2018-07-22-4gb.img.xz](https://rcn-ee.net/rootfs/bb.org/testing/2018-07-22/stretch-iot/bone-debian-9.5-iot-armhf-2018-07-22-4gb.img.xz).


### Setup Robot Control Library

If you want to build PX4, there are additional setup steps for this library.

At time of writing the *librobotcontrol* debian package is only available on BeagleBoard products (not BeagleBone Blue). 
Here are the ways to obtain the *librobotcontrol* on BeagleBone Blue:

1. Use the one pre-installed in BeagleBoard images.
1. Install from debian package or repository:
   ```sh
   sudo apt update && sudo apt install librobotcontrol
   ```
1. Install from source
   ```sh
   git clone https://github.com/StrawsonDesign/librobotcontrol.git
   cd librobotcontrol
   sudo make install
   ```

After acquiring the pre-built library,

1. Select the *librobotcontrol* installation directory, and set it in the `LIBROBOTCONTROL_INSTALL_DIR` environment variable so that other unwanted headers will not be included
1. Install **robotcontrol.h** and __rc/*__ into `$LIBROBOTCONTROL_INSTALL_DIR/include`
1. Install pre-built native (ARM) version of librobotcontrol.* into `$LIBROBOTCONTROL_INSTALL_DIR/lib`

At this point the BeagleBone Blue target can be built on both cross compile host system and native build system, i.e., 
```sh
make posix_bbblue_cross [upload]
```

## Cross Compiler Build

The recommended way to build PX4 for *BeagleBone Blue* is to compile on a development computer and upload the PX4 executable binary directly to the BeagleBone Blue. 

> **Tip** This approach is recommended over [native build](#native_builds) due to speed of deployment and ease of use.


1. First set up *rsync* (this is is used to transfer files from the development computer to the target board over a network - WiFi or Ethernet). 
   - For *rsync* over SSH with key authentication, follow steps similar to those for [Raspberry Pi/Navio](../flight_controller/raspberry_pi_navio2.md)
   - On the development computer, define the BeagleBone Blue board as `BBBluePX4` in **/etc/hosts**
1. Run the following command to build and upload files:
   ```sh
   make posix_bbblue_cross upload
   ```

To test the uploaded files, run the following commands on the *BeagleBone Blue* board:
```sh
cd /home/debian/px4 
sudo ./bin/px4 -s px4.config 
```

> **Note** Currently *librobotcontrol* requires root access.

<span></span>
> **Note** If you use a PX4 version before [Posix Shell](https://github.com/PX4/Firmware/pull/10173) is available, run the following commands instead:
   ```sh
   cd /home/debian/px4 
   sudo px4 posix-configs/px4.config 
  ```

## Native Builds (optional) {#native_builds}

You can also natively build PX4 builds directly on the BeagleBone Blue.

Run the following commands on the BeagleBone Blue (i.e. via SSH):
1. Install dependencies:
   ```sh
   sudo apt-get update
   sudo apt-get install cmake python-empy
   ```
1. Clone the PX4 Firmware directly onto the BeagleBone Blue.
1. Continue with the [standard build system installation](https://dev.px4.io/en/setup/dev_env_linux.html).


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

#For PX4 version before Posix Shell (pull request https://github.com/PX4/Firmware/pull/10173) is available
#/home/debian/px4/px4 -d /home/debian/px4  /home/debian/px4/posix-configs/px4.config > /home/debian/px4/PX4.log & 
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

BeagleBone Blue has some unique features such as multiple choices of WiFi interfaces. 
Refer to comments in **/home/debian/px4/px4.config** for usage of 
these features.

#### SBUS Signal Converter

SBUS signal from receiver (e.g., FrSky X8R) is an inverted signal. 
UARTs on BeagleBone Blue only can work with non-inverted 3.3V level signal. 
The following circuit is an example of signal converter which converts the inverted input signal to a non-inverted 3.3V level output signal. 
The resistor values shown in the diagram reflect resistors that the author had on hand back then, and you can choose resistor values as you see fit.

![SBUS signal converter](../../assets/hardware/sbus_signal_converter.jpg)