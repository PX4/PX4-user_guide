# Building PX4 Software

PX4 can be built on the console or in an IDE, for both simulated and hardware targets.

:::note
Before following these instructions you must first install the [Developer Toolchain](../dev_setup/dev_env.md) for your host operating system and target hardware.
:::

:::tip
For solutions to common build problems see [Troubleshooting](#troubleshooting) below.
:::

## Download the PX4 Source Code

The PX4 source code is stored on Github in the [PX4/PX4-Autopilot](https://github.com/PX4/PX4-Autopilot) repository.
To get the *very latest* version onto your computer, enter the following command into a terminal:

```sh
git clone https://github.com/PX4/PX4-Autopilot.git --recursive
```

:::note
This is all you need to do just to build the latest code. 
[GIT Examples > Contributing code to PX4](../contribute/git_examples.md#contributing_code) provides a lot more information about using git to contribute to PX4. 
:::

## First Build (Using the jMAVSim Simulator)

First we'll build a simulated target using a console environment.
This allows us to validate the system setup before moving on to real hardware and an IDE.

Navigate into the **PX4-Autopilot** directory and start [jMAVSim](../simulation/jmavsim.md) using the following command:
```sh
make px4_sitl jmavsim
```

This will bring up the PX4 console below:

![PX4 Console (jMAVSim)](../../assets/toolchain/console_jmavsim.png)

The drone can be flown by typing:
```sh
pxh> commander takeoff
```

![jMAVSim UI](../../assets/toolchain/jmavsim_first_takeoff.png)

The drone can be landed by typing `commander land` and the whole simulation can be stopped by doing **CTRL+C** (or by entering `shutdown`).

Flying the simulation with the ground control station is closer to the real operation of the vehicle.
Click on a location in the map while the vehicle is flying (takeoff flight mode) and enable the slider. 
This will reposition the vehicle.

![QGroundControl GoTo](../../assets/toolchain/qgc_goto.jpg)

:::tip
PX4 can be used with a number of other [Simulators](../simulation/README.md), including [Gazebo Simulation](../simulation/gazebo.md) and [AirSim Simulation](../simulation/airsim.md). 
These are also started with *make* - e.g.
```
make px4_sitl gazebo
```
:::

## NuttX / Pixhawk Based Boards

### Building for NuttX

To build for NuttX- or Pixhawk- based boards, navigate into the **PX4-Autopilot** directory and then call `make` with the build target for your board.

For example, to build for *Pixracer* you would use the following command:
```sh
cd PX4-Autopilot
make px4_fmu-v4_default
```

:::note
In the example above the first part of the build target `px4_fmu-v4` is the firmware for a particular flight controller hardware and `default` is the configuration name (in this case the "default" configuration).
The `default` is optional so you could instead do: 
```
make px4_fmu-v4
```
:::

A successful run will end with similar output to:
```sh
-- Build files have been written to: /home/youruser/src/PX4-Autopilot/build/px4_fmu-v4_default
[954/954] Creating /home/youruser/src/PX4-Autopilot/build/px4_fmu-v4_default/px4_fmu-v4_default.px4
```

Build instructions are given in the documentation for the individual [flight controller boards](../flight_controller/README.md).
The following list shows the build commands for just the [Pixhawk standard](../flight_controller/autopilot_pixhawk_standard.md) boards:
* [Pixhawk 4](../flight_controller/pixhawk4.md): `make px4_fmu-v5_default`
* [Pixhawk 4 Mini](../flight_controller/pixhawk4_mini.md): `make px4_fmu-v5_default`
* [CUAV V5+](../flight_controller/cuav_v5_plus.md): `make px4_fmu-v5_default`
* [CUAV V5 nano](../flight_controller/cuav_v5_nano.md): `make px4_fmu-v5_default`
* [Pixracer](../flight_controller/pixracer.md): `make px4_fmu-v4_default`
* [Pixhawk 3 Pro](../flight_controller/pixhawk3_pro.md): `make px4_fmu-v4pro_default`
* [Pixhawk Mini](../flight_controller/pixhawk_mini.md): `make px4_fmu-v3_default`
* [Pixhawk 2 (Cube Black)](../flight_controller/pixhawk-2.md): `make px4_fmu-v3_default`
* [mRo Pixhawk](../flight_controller/mro_pixhawk.md): `make px4_fmu-v3_default` (supports 2MB Flash)
* [Holybro pix32](../flight_controller/holybro_pix32.md): `make px4_fmu-v2_default`
* [Pixfalcon](../flight_controller/pixfalcon.md): `make px4_fmu-v2_default`
* [Dropix](../flight_controller/dropix.md): `make px4_fmu-v2_default`
* [Pixhawk 1](../flight_controller/pixhawk.md): `make px4_fmu-v2_default`
  :::warning
  You **must** use a supported version of GCC to build this board (e.g. the same as used by [CI/docker](../test_and_ci/docker.md)) or remove modules from the build. Building with an unsupported GCC may fail, as PX4 is close to the board's 1MB flash limit.
  :::
* Pixhawk 1 with 2 MB flash: `make px4_fmu-v3_default`

:::note
Generally the `_default` suffix is optional (i.e. you can also build using `make px4_fmu-v4`, `make bitcraze_crazyflie`, etc.).
:::

### Uploading Firmware (Flashing the board)

Append `upload` to the make commands to upload the compiled binary to the autopilot hardware via USB.
For example

```sh
make px4_fmu-v4_default upload
```

A successful run will end with this output:

```sh
Erase  : [====================] 100.0%
Program: [====================] 100.0%
Verify : [====================] 100.0%
Rebooting.

[100%] Built target upload
```

## Other Boards

The following boards have more complicated build and/or deployment instructions.

### Raspberry Pi 2/3 Boards

The command below builds the target for [Raspberry Pi 2/3 Navio2](../flight_controller/raspberry_pi_navio2.md).

#### Cross-compiler Build

Set the IP (or hostname) of your RPi using:

```sh
export AUTOPILOT_HOST=192.168.X.X
```
or
```sh
export AUTOPILOT_HOST=pi_hostname.domain
```


:::note
The value of the environment variable should be set before the build, or `make upload` will fail to find your RPi.
:::

Build the executable file:

```sh
cd PX4-Autopilot
make emlid_navio2 # for cross-compiler build
```

The "px4" executable file is in the directory **build/emlid_navio2_default/**.
Make sure you can connect to your RPi over ssh, see [instructions how to access your RPi](../flight_controller/raspberry_pi_navio2.md#developer-quick-start).

Then upload it with:

```sh
cd PX4-Autopilot
make emlid_navio2 upload # for cross-compiler build
```

Then, connect over ssh and run it with (as root):

```sh
cd ~/px4
sudo ./bin/px4 -s px4.config
```

#### Native Build

If you're building *directly* on the Pi, you will want the native build target (emlid_navio2_native).

```sh
cd PX4-Autopilot
make emlid_navio2_native # for native build
```

The "px4" executable file is in the directory **build/emlid_navio2_native/**.
Run it directly with:

```sh
sudo ./build/emlid_navio2_native/px4 build/emlid_navio2_native/etc -s ./posix-configs/rpi/px4.config
```

A successful build followed by executing px4 will give you something like this:

```sh

______  __   __    ___
| ___ \ \ \ / /   /   |
| |_/ /  \ V /   / /| |
|  __/   /   \  / /_| |
| |     / /^\ \ \___  |
\_|     \/   \/     |_/

px4 starting.


pxh>
```

#### Autostart

To autostart px4, add the following to the file **/etc/rc.local** (adjust it
accordingly if you use native build), right before the `exit 0` line:
```sh
cd /home/pi && ./bin/px4 -d -s px4.config > px4.log
```


### OcPoC-Zynq Mini

Build instructions for the [OcPoC-Zynq Mini](../flight_controller/ocpoc_zynq.md) are covered in:
* [Aerotenna OcPoC-Zynq Mini Flight Controller > Building PX4 for OcPoC-Zynq](../flight_controller/ocpoc_zynq.md#building-px4-for-ocpoc-zynq)
* [OcPoC PX4 Setup Page](https://aerotenna.readme.io/docs/px4-setup)  (aerotenna.readme.io)


### QuRT / Snapdragon Based Boards

This section shows how to build for the [Qualcomm Snapdragon Flight](../flight_controller/snapdragon_flight.md).

#### Build

:::note
If you use the [Qualcomm ESC board](http://shop.intrinsyc.com/products/qualcomm-electronic-speed-control-board) (UART-based), then please follow their instructions [here](https://github.com/ATLFlight/ATLFlightDocs/blob/master/PX4.md). 
If you use normal PWM-based ESCs boards, then you may continue to follow the instructions on this page.
:::

The commands below build the targets for the Linux and the DSP side. Both executables communicate via [muORB](../middleware/uorb.md).

```sh
cd PX4-Autopilot
make atlflight_eagle_default
```

To load the SW on the device, connect via USB cable and make sure the device is booted.
Run this in a new terminal window:

```sh
adb shell
```

Go back to previous terminal and upload:

```sh
make atlflight_eagle_default upload
```

Note that this will also copy (and overwrite) the two config files [mainapp.config](https://github.com/PX4/PX4-Autopilot/blob/master/posix-configs/eagle/flight/mainapp.config) and [px4.config](https://github.com/PX4/PX4-Autopilot/blob/master/posix-configs/eagle/flight/px4.config) to the device.
Those files are stored under /usr/share/data/adsp/px4.config and /home/linaro/mainapp.config respectively if you want to edit the startup scripts directly on your vehicle.

The mixer currently needs to be copied manually:

```sh
adb push ROMFS/px4fmu_common/mixers/quad_x.main.mix  /usr/share/data/adsp
```

#### Run

Run the DSP debug monitor:

```sh
${HEXAGON_SDK_ROOT}/tools/debug/mini-dm/Linux_Debug/mini-dm
```

Note: alternatively, especially on Mac, you can also use [nano-dm](https://github.com/kevinmehall/nano-dm).

Go back to ADB shell and run px4:

```sh
cd /home/linaro
./px4 -s mainapp.config
```

Note that the px4 will stop as soon as you disconnect the USB cable (or if you ssh session is disconnected). 
To fly, you should make the px4 auto-start after boot.

#### Autostart

To run the px4 as soon as the Snapdragon has booted, you can add the startup to `rc.local`:

Either edit the file `/etc/rc.local` directly on the Snapdragon:

```sh
adb shell
vim /etc/rc.local
```

Or copy the file to your computer, edit it locally, and copy it back:

```sh
adb pull /etc/rc.local
gedit rc.local
adb push rc.local /etc/rc.local
```

For the auto-start, add the following line before `exit 0`:

```sh
(cd /home/linaro && ./px4 -s mainapp.config > mainapp.log)

exit 0
```

Make sure that the `rc.local` is executable:

```sh
adb shell
chmod +x /etc/rc.local
```

Then reboot the Snapdragon:

```sh
adb reboot
```

## Compiling in a Graphical IDE

[VSCode](../dev_setup/vscode.md) is the officially supported (and recommended) IDE for PX4 development.
It is easy to set up and can be used to compile PX4 for both simulation and hardware environments.

## PX4 Make Build Targets

The previous sections showed how you can call *make* to build a number of different targets, start simulators, use IDEs etc.
This section shows how *make* options are constructed and how to find the available choices.

The full syntax to call *make* with a particular configuration and initialization file is:
```sh
make [VENDOR_][MODEL][_VARIANT] [VIEWER_MODEL_DEBUGGER_WORLD]
```

**VENDOR_MODEL_VARIANT**: (also known as `CONFIGURATION_TARGET`)

- **VENDOR:** The manufacturer of the board: `px4`, `aerotenna`, `airmind`, `atlflight`, `auav`, `beaglebone`, `intel`, `nxp`, etc.
    The vendor name for Pixhawk series boards is `px4`.
- **MODEL:** The *board model* "model": `sitl`, `fmu-v2`, `fmu-v3`, `fmu-v4`, `fmu-v5`, `navio2`, etc.
- **VARIANT:** Indicates particular configurations: e.g. `rtps`, `lpe`, which contain components that are not present in the `default` configuration. Most commonly this is `default`, and may be omitted.

:::tip
You can get a list of *all* available `CONFIGURATION_TARGET` options using the command below:
```sh
make list_config_targets
```
:::

**VIEWER_MODEL_DEBUGGER_WORLD:**
  
- **VIEWER:** This is the simulator ("viewer") to launch and connect: `gazebo`, `jmavsim`, `none` <!-- , ?airsim -->

  :::tip
  `none` can be used if you want to launch PX4 and wait for a simulator (jmavsim, gazebo, or some other simulator).
  For example, `make px4_sitl none_iris` launches PX4 without a simulator (but with the iris airframe).
  :::
- **MODEL:** The *vehicle* model to use (e.g. `iris` (*default*), `rover`, `tailsitter`, etc), which will be loaded by the simulator.
  The environment variable `PX4_SIM_MODEL` will be set to the selected model, which is then used in the [startup script](../simulation/README.md#startup-scripts) to select appropriate parameters. 
- **DEBUGGER:** Debugger to use: `none` (*default*), `ide`, `gdb`, `lldb`, `ddd`, `valgrind`, `callgrind`. 
  For more information see [Simulation Debugging](../debug/simulation_debugging.md).
- **WORLD:** (Gazebo only). Set a the world ([PX4/sitl_gazebo/worlds](https://github.com/PX4/sitl_gazebo/tree/master/worlds)) that is loaded.
  Default is [empty.world](https://github.com/PX4/sitl_gazebo/blob/master/worlds/empty.world).
  For more information see [Gazebo > Loading a Specific World](../simulation/gazebo.md#set_world).

:::tip
You can get a list of *all* available `VIEWER_MODEL_DEBUGGER_WORLD` options using the command below:
```sh
make px4_sitl list_vmd_make_targets
```
:::

Notes:
- Most of the values in the `CONFIGURATION_TARGET` and `VIEWER_MODEL_DEBUGGER` have defaults, and are hence optional.
  For example, `gazebo` is equivalent to `gazebo_iris` or `gazebo_iris_none`.
- You can use three underscores if you want to specify a default value between two other settings.
  For example, `gazebo___gdb` is equivalent to `gazebo_iris_gdb`.
- You can use a `none` value for `VIEWER_MODEL_DEBUGGER` to start PX4 and wait for a simulator.
  For example start PX4 using `make px4_sitl_default none` and jMAVSim using `./Tools/jmavsim_run.sh -l`.


The `VENDOR_MODEL_VARIANT` options map to particular *cmake* configuration files in the PX4 source tree under the [/boards](https://github.com/PX4/PX4-Autopilot/tree/master/boards) directory.
Specifically `VENDOR_MODEL_VARIANT` maps to a configuration file **boards/VENDOR/MODEL/VARIANT.cmake**
(e.g. `px4_fmu-v5_default` corresponds to [boards/px4/fmu-v5/default.cmake](https://github.com/PX4/PX4-Autopilot/blob/master/boards/px4/fmu-v5/default.cmake)).

Additional make targets are discussed in the following sections (list is not exhaustive):


### Binary Size Profiling

The `bloaty_compare_master` build target allows you to get a better understanding of the impact of changes on code size.
When it is used, the toolchain downloads the latest successful master build of a particular firmware and compares it to the local build (using the [bloaty](https://github.com/google/bloaty) size profiler for binaries).

:::tip
This can help analyse changes that (may) cause `px4_fmu-v2_default` to hit the 1MB flash limit.
:::

*Bloaty* must be in your path and found at *cmake* configure time.
The PX4 [docker files](https://github.com/PX4/containers/blob/master/docker/Dockerfile_nuttx-bionic) install *bloaty* as shown:
```
git clone --recursive https://github.com/google/bloaty.git /tmp/bloaty \
	&& cd /tmp/bloaty && cmake -GNinja . && ninja bloaty && cp bloaty /usr/local/bin/ \
	&& rm -rf /tmp/*
```

The example below shows how you might see the impact of removing the *mpu9250* driver from `px4_fmu-v2_default`.
First it locally sets up a build without the driver:
```sh
 % git diff
diff --git a/boards/px4/fmu-v2/default.cmake b/boards/px4/fmu-v2/default.cmake
index 40d7778..2ce7972 100644
--- a/boards/px4/fmu-v2/default.cmake
+++ b/boards/px4/fmu-v2/default.cmake
@@ -36,7 +36,7 @@ px4_add_board(
                imu/l3gd20
                imu/lsm303d
                imu/mpu6000
-               imu/mpu9250
+               #imu/mpu9250
                #iridiumsbd
                #irlock
                #magnetometer # all available magnetometer drivers
```
Then use the make target, specifying the target build to compare (`px4_fmu-v2_default` in this case):
```sh
% make px4_fmu-v2_default bloaty_compare_master
...
...
...
     VM SIZE                                                                                        FILE SIZE
 --------------                                                                                  --------------
  [DEL]     -52 MPU9250::check_null_data(unsigned int*, unsigned char)                               -52  [DEL]
  [DEL]     -52 MPU9250::test_error()                                                                -52  [DEL]
  [DEL]     -52 MPU9250_gyro::MPU9250_gyro(MPU9250*, char const*)                                    -52  [DEL]
  [DEL]     -56 mpu9250::info(MPU9250_BUS)                                                           -56  [DEL]
  [DEL]     -56 mpu9250::regdump(MPU9250_BUS)                                                        -56  [DEL]
...                                        -336  [DEL]
  [DEL]    -344 MPU9250_mag::_measure(ak8963_regs)                                                  -344  [DEL]
  [DEL]    -684 MPU9250::MPU9250(device::Device*, device::Device*, char const*, char const*, cha    -684  [DEL]
  [DEL]    -684 MPU9250::init()                                                                     -684  [DEL]
  [DEL]   -1000 MPU9250::measure()                                                                 -1000  [DEL]
 -41.3%   -1011 [43 Others]                                                                        -1011 -41.3%
  -1.0% -1.05Ki [Unmapped]                                                                       +24.2Ki  +0.2%
  -1.0% -10.3Ki TOTAL                                                                            +14.9Ki  +0.1%
```
This shows that removing *mpu9250* from `px4_fmu-v2_default` would save 10.3 kB of flash.
It also shows the sizes of different pieces of the *mpu9250* driver.


## Firmware Version & Git Tags

The *PX4 Firmware Version* and *Custom Firmware Version* are published using the MAVLink [AUTOPILOT_VERSION](https://mavlink.io/en/messages/common.html#AUTOPILOT_VERSION) message, and displayed in the *QGroundControl* **Setup > Summary** airframe panel:

![Firmware info](../../assets/gcs/qgc_setup_summary_airframe_firmware.jpg)

These are extracted at build time from the active *git tag* for your repo tree.
The git tag should be formatted as `<PX4-version>-<vendor-version>` (e.g. the tag in the image above was set to `v1.8.1-2.22.1`).

:::warning
If you use a different git tag format, versions information may not be displayed properly.
:::


## Troubleshooting

### General Build Errors

Many build problems are caused by either mismatching submodules or an incompletely cleaned-up build environment.
Updating the submodules and doing a `distclean` can fix these kinds of errors:
```
git submodule update --recursive
make distclean
```

### Flash overflowed by XXX bytes

The `region 'flash' overflowed by XXXX bytes` error indicates that the firmware is too large for the target hardware platform.
This is common for `make px4_fmu-v2_default` builds, where the flash size is limited to 1MB.

If you're building the *vanilla* master branch, the most likely cause is using an unsupported version of GCC.
In this case, install the version specified in the [Developer Toolchain](../dev_setup/dev_env.md) instructions.

If building your own branch, it is possibly you have increased the firmware size over the 1MB limit. 
In this case you will need to remove any drivers/modules that you don't need from the build. 


### macOS: Too many open files error

MacOS allows a default maximum of 256 open files in all running processes.
The PX4 build system opens a large number of files, so you may exceed this number.

The build toolchain will then report `Too many open files` for many files, as shown below:
```sh
/usr/local/Cellar/gcc-arm-none-eabi/20171218/bin/../lib/gcc/arm-none-eabi/7.2.1/../../../../arm-none-eabi/bin/ld: cannot find NuttX/nuttx/fs/libfs.a: Too many open files
```

The solution is to increase the maximum allowed number of open files (e.g. to 300). 
You can do this in the macOS *Terminal* for each session:
- Run this script [Tools/mac_set_ulimit.sh](https://github.com/PX4/PX4-Autopilot/blob/master/Tools/mac_set_ulimit.sh), or
- Enter this command:
  ```sh
  ulimit -S -n 300
  ```

### macOS Catalina: Problem running cmake

As of macOS Catalina 10.15.1 there may be problems when trying to build the simulator with *cmake*.
If you have build problems on this platform then try run the following command in your terminal:
```sh
xcode-select --install
sudo ln -s /Library/Developer/CommandLineTools/SDKs/MacOSX.sdk/usr/include/* /usr/local/include/
```

### Failed to import Python packages

"Failed to import" errors when running the `make px4_sitl jmavsim` command indicates that some Python packages are not installed (where expected).
```
Failed to import jinja2: No module named 'jinja2'
You may need to install it using:
    pip3 install --user jinja2
```
If you have already installed these dependencies this may be because there is more than one Python version on the computer (e.g. Python 2.7.16 Python 3.8.3), and the module is not present in the version used by the build toolchain.

You should be able to fix this by explicitly installing the dependencies as shown:
```
pip3 install --user pyserial empy toml numpy pandas jinja2 pyyaml pyros-genmsg packaging
```
