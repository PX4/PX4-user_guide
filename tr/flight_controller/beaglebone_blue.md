# BeagleBone Blue

[BeagleBone Blue](https://beagleboard.org/blue) is an all-in-one Linux-based computer. Although it is optimized for robotics, this compact and inexpensive board has all necessary sensors and peripherals needed by a flight controller. This topic shows how to set up the board to run PX4 with [librobotcontrol](https://github.com/StrawsonDesign/librobotcontrol) robotics package.

![BeagleBone - labelled diagram](../../assets/hardware/BeagleBone_Blue_balloons.jpg)

## OS Image

*BeagleBone Blue* images can be found here:

- [Latest stable OS image](https://beagleboard.org/latest-images).
- [Test OS images](https://rcn-ee.net/rootfs/bb.org/testing/) (updated frequently).

Information about flashing OS images can be found on [this page](https://github.com/beagleboard/beaglebone-blue/wiki/Flashing-firmware). Other useful information can be found in the [FAQ](https://github.com/beagleboard/beaglebone-blue/wiki/Frequently-Asked-Questions-&lpar;FAQ&rpar;).

## Robot Control Library

On [BeagleBone Blue](https://beagleboard.org/blue), PX4 requires [librobotcontrol](https://github.com/StrawsonDesign/librobotcontrol) version 1.0.0 or higher.

BeagleBoard OS images come with *librobotcontrol* preinstalled, but it may not work properly in all OS images.

One way to check if *librobotcontrol* works properly is to run *rc_test_drivers* which comes with *librobotcontrol*. As shown in the following example, all tests should pass. Optionally run other tests such as *rc_test_bmp*, *rc_test_mpu*, etc.

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

The latest OS images at time of updating this document is [bone-debian-9.5-iot-armhf-2018-10-07-4gb.img.xz](https://debian.beagleboard.org/images/bone-debian-9.5-iot-armhf-2018-10-07-4gb.img.xz).

### Setup Robot Control Library

If you want to build PX4, there are additional setup steps for this library.

Here are steps to build the *librobotcontrol* with PX4 extensions natively on a BeagleBone board:

    sh
       git clone https://github.com/StrawsonDesign/librobotcontrol.git
       cd librobotcontrol
       make EXT_CFLAGS=-DRC_AUTOPILOT_EXT
       sudo make install

> **Tip** `EXT_CFLAGS` was added after version 1.0.4. If it's not in your version of **librobotcontrol/library/Makefile**, add it to `CLFAGS`, e.g., `CFLAGS := $(EXT_CFLAGS) -g -fPIC -I $(INCLUDEDIR)`

After acquiring the pre-built library,

1. Select the *librobotcontrol* installation directory, and set it in the `LIBROBOTCONTROL_INSTALL_DIR` environment variable so that other unwanted headers will not be included
2. Install **robotcontrol.h** and **rc/\*** into `$LIBROBOTCONTROL_INSTALL_DIR/include`
3. Install pre-built native (ARM) version of librobotcontrol.\* into `$LIBROBOTCONTROL_INSTALL_DIR/lib`

At this point the BeagleBone Blue target can be built on both cross compile host system and native build system, i.e.,

```sh
make posix_bbblue_cross [upload]
```

## Cross Compiler Build

The recommended way to build PX4 for *BeagleBone Blue* is to compile on a development computer and upload the PX4 executable binary directly to the BeagleBone Blue.

> **Tip** This approach is recommended over [native build](#native_builds) due to speed of deployment and ease of use.

### Cross Compiler Setup

ARM Cross Compiler for *BeagleBone Blue* can be found at [Linaro Toolchain Binaries site](http://www.linaro.org/downloads/). The following is an example setup on development host.

1. First install the toolchain into */opt/bbblue_toolchain/gcc-arm-linux-gnueabihf*. Here is an example of using soft link to select which version of the toolchain you want to use:
    
    ```sh
    ...@ubuntu:/opt/bbblue_toolchain$ ls -l
        lrwxrwxrwx 1 root root   51 Mar 22 16:10 gcc-arm-linux-gnueabihf -> gcc-linaro-6.3.1-2017.05-x86_64_arm-linux-gnueabihf
        drwxr-xr-x 8 root root 4096 May 17  2017 gcc-linaro-6.3.1-2017.05-x86_64_arm-linux-gnueabihf
        drwxr-xr-x 8 root root 4096 Nov 19 03:51 gcc-linaro-6.4.1-2017.11-x86_64_arm-linux-gnueabihf
    ```

2. Add it to the PATH in ~/.profile as shown below
    
    ```sh
    export PATH=$PATH:/opt/bbblue_toolchain/gcc-arm-linux-gnueabihf/bin
    export CrossCompiler=/opt/bbblue_toolchain/gcc-arm-linux-gnueabihf/bin/arm-linux-gnueabihf-
    ```

> **Tip** GCC in the toolchain should be compatible with kernel in *BeagleBone Blue*. General rule of thumb is to choose a toolchain where version of GCC is not higher than version of GCC which comes with the OS image on *BeagleBone Blue*.

### Cross Compile and Upload

1. First set up *rsync* (this is is used to transfer files from the development computer to the target board over a network - WiFi or Ethernet). 
    - For *rsync* over SSH with key authentication, follow steps similar to those for [Raspberry Pi/Navio](../flight_controller/raspberry_pi_navio2.md)
    - On the development computer, define the BeagleBone Blue board as `BBBluePX4` in **/etc/hosts**
2. Run the following command to build and upload files: 
        sh
        make posix_bbblue_cross upload

To test the uploaded files, run the following commands on the *BeagleBone Blue* board:

```sh
cd /home/debian/px4 
sudo ./bin/px4 -s px4.config 
```

> **Note** Currently *librobotcontrol* requires root access.

## Native Builds (optional) {#native_builds}

You can also natively build PX4 builds directly on the BeagleBone Blue.

Run the following commands on the BeagleBone Blue (i.e. via SSH):

1. Install dependencies: 
        sh
        sudo apt-get update
        sudo apt-get install cmake python-empy

2. Clone the PX4 Firmware directly onto the BeagleBone Blue.
3. Continue with the [standard build system installation](https://dev.px4.io/en/setup/dev_env_linux.html).

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

BeagleBone Blue has some unique features such as multiple choices of WiFi interfaces and power sources. Refer to comments in **/home/debian/px4/px4.config** for usage of these features.

#### SBUS Signal Converter

SBUS signal from receiver (e.g., FrSky X8R) is an inverted signal. UARTs on BeagleBone Blue can only work with non-inverted 3.3V level signal. [This tutorial](https://dev.px4.io/en/tutorials/linux_sbus.html) contains a SBUS signal inverter circuit.

#### Typical Connections

For a quadcopter with GPS and an SBUS receiver, here are typical connections:

1. Connect the ESC of motor 1, 2, 3 and 4 to channel 1, 2, 3 and 4 of servo outputs on BeagleBone Blue, respectively. If your ESC connector contains a power output pin, remove it and do not connect it to the power output pin of the servo channel on the BeagleBone Blue.

2. Connect the above mentioned converted SBUS signal to the dsm2 port if you have the matching connector for dsm2, otherwise connect it to any other available UART port and change the corresponding port in **/home/debian/px4/px4.config** accordingly.

3. Connect the signals of GPS module to GPS port on the BeagleBone Blue. Note that the signal pins of the GPS port on the BeagleBone Blue are only 3.3V tolerant, so choose your GPS module accordingly.