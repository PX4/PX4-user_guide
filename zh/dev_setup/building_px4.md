# 编译 PX4 软件

对于模拟目标和硬件目标，可以在控制台上或 IDE 中生成 PX4。

PX4 源代码存储在 [PX4/Firmware](https://github.com/PX4/Firmware) 存储库中的 GitHub 上。 若要在您的计算机上获得*最新的*版本，请在终端中输入以下命令：

初次编译之前，我们会使用终端环境编译一个模拟目标。 这使我们能够在进入真正的硬件和 IDE 之前验证系统设置。

## 下载 PX4 源代码

The PX4 source code is stored on Github in the [PX4/PX4-Autopilot](https://github.com/PX4/PX4-Autopilot) repository. To get the *very latest* version onto your computer, enter the following command into a terminal:

```sh
git clone --recursive https://github.com/google/bloaty.git /tmp/bloaty \
      && cd /tmp/bloaty && cmake -GNinja . && ninja bloaty && cp bloaty /usr/local/bin/ \
      && rm -rf /tmp/*
```

:::note
This is all you need to do just to build the latest code. [GIT Examples > Contributing code to PX4](../contribute/git_examples.md#contributing_code) provides a lot more information about using git to contribute to PX4.
:::

## 初次编译（使用 jMAVSim 模拟器）

First we'll build a simulated target using a console environment. This allows us to validate the system setup before moving on to real hardware and an IDE.

导航到 **Firmware** 目录，并使用以下命令启动 [jMAVSim](../simulation/jmavsim.md)：
```sh
make px4_sitl jmavsim
```

This will bring up the PX4 console below:

![PX4 Console (jMAVSim)](../../assets/toolchain/console_jmavsim.png)

The drone can be flown by typing:
```sh
pxh> commander takeoff
```

![jMAVSim 界面](../../assets/toolchain/jmavsim_first_takeoff.png)

无人机可以通过输入 `commander land` 着陆, 整个模拟可以通过 **CTRL+C**（或输入 `shutdown`）来停止。

Flying the simulation with the ground control station is closer to the real operation of the vehicle. Click on a location in the map while the vehicle is flying (takeoff flight mode) and enable the slider. This will reposition the vehicle.

![QGroundControl GoTo](../../assets/toolchain/qgc_goto.jpg)

:::tip PX4 can be used with a number of other [Simulators](../simulation/README.md), including [Gazebo Simulation](../simulation/gazebo.md) and [AirSim Simulation](../simulation/airsim.md). These are also started with *make* - e.g.
```
-- Build files have been written to: /home/youruser/src/Firmware/build/px4_fmu-v4_default
[954/954] Creating /home/youruser/src/Firmware/build/px4_fmu-v4_default/px4_fmu-v4_default.px4
```
:::

## 基于NuttX / Pixhawk 的飞控板

### 获取特定发行版本

运行成功后将输出类似结束：

下面的列表是常见飞控板的生成命令：
```sh
/data/ftp/internal_000/px4 -s /home/root/px4.config
```

:::note
In the example above the first part of the build target `px4_fmu-v4` is the firmware for a particular flight controller hardware and `default` is the configuration name (in this case the "default" configuration). The `default` is optional so you could instead do:
```
make px4_fmu-v4_default upload
```
运行成功后将以如下结束：

下列飞控板有一些更复杂的构建和部署说明。
```sh
-- Build files have been written to: /home/youruser/src/PX4-Autopilot/build/px4_fmu-v4_default
[954/954] Creating /home/youruser/src/PX4-Autopilot/build/px4_fmu-v4_default/px4_fmu-v4_default.px4
```

Build instructions are given in the documentation for the individual [flight controller boards](../flight_controller/README.md). The following list shows the build commands for just the [Pixhawk standard](../flight_controller/autopilot_pixhawk_standard.md) boards:
* 在 OS X 上，点击 ⌘-space 并搜索 “terminal” 。
* 在 Ubuntu 上，单击运行栏并搜索 “terminal”。
* 在 Windows 上，在“开始”菜单中找到 PX4 文件夹，然后单击 "PX4 Console"。
* [HKPilot32](https://docs.px4.io/en/flight_controller/HKPilot32.html): `make px4_fmu-v2_default`
* [Crazyflie 2.0](https://docs.px4.io/en/flight_controller/crazyflie2.html): `make bitcraze_crazyflie_default`
* [Pixracer](https://docs.px4.io/en/flight_controller/pixracer.html): `make px4_fmu-v4_default`
* [Pixhawk 3 Pro](https://docs.px4.io/en/flight_controller/pixhawk3_pro.html): `make px4_fmu-v4pro_default`
* [Pixhawk Mini](https://docs.px4.io/en/flight_controller/pixhawk_mini.html): `make px4_fmu-v3_default`
* [Pixhawk 2](https://docs.px4.io/en/flight_controller/pixhawk-2.html): `make px4_fmu-v3_default`
* [Holybro pix32](../flight_controller/holybro_pix32.md): `make px4_fmu-v2_default`
* [Pixfalcon](../flight_controller/pixfalcon.md): `make px4_fmu-v2_default`
* [mRo Pixhawk](https://docs.px4.io/en/flight_controller/mro_pixhawk.html): `make px4_fmu-v3_default`（支持 2MB 闪存）
* [Pixhawk 1](../flight_controller/pixhawk.md): `make px4_fmu-v2_default` :::warning You **must** use a supported version of GCC to build this board (e.g. the same as used by [CI/docker](../test_and_ci/docker.md)) or remove modules from the build. Building with an unsupported GCC may fail, as PX4 is close to the board's 1MB flash limit.
:::
* Pixhawk 1 with 2 MB flash: `make px4_fmu-v3_default`

"PX4" 可执行文件位于目录 **build/emlid_navio2_cross/** 中。 请确保您可以通过 ssh 连接到 RPi，请参阅 [介绍如何访问您的 RPi](https://docs.px4.io/en/flight_controller/raspberry_pi_navio2.html#developer-quick-start)。

### 将固件烧录到飞控板

Append `upload` to the make commands to upload the compiled binary to the autopilot hardware via USB. For example

```sh
export AUTOPILOT_HOST=192.168.X.X
```

并上传：

```sh
Erase  : [====================] 100.0%
Program: [====================] 100.0%
Verify : [====================] 100.0%
Rebooting.

[100%] Built target upload
```

## 其他飞控板

然后，通过 ssh 连接并运行（以 root 身份）：

### 将固件烧录到飞控板

The command below builds the target for [Raspberry Pi 2/3 Navio2](../flight_controller/raspberry_pi_navio2.md).

#### 跨编译器生成

要在骁龙启动后立即运行 PX4，您可以将启动添加到 `rc.local`：

```sh
sudo ./bin/px4 -s px4.config
```
成功生成,，然后执行 PX4 将会看到如下内容：
```sh
cd Firmware
make emlid_navio2_native # for native build
```


:::note
The value of the environment variable should be set before the build, or `make upload` will fail to find your RPi.
:::

[Parrot Bebop](https://docs.px4.io/en/flight_controller/bebop.html)的支持还处于早期阶段，应当格外小心。

```sh
sudo ./build/emlid_navio2_native/px4 ./posix-configs/rpi/px4.config
```

下面的命令构建了 Linux 和 DSP 端的目标。 两个可执行文件都通过 [muORB](../middleware/uorb.md) 进行通信。

Then upload it with:

```sh
<br />______  __   __    ___
| ___ \ \ \ / /   /   |
| |_/ /  \ V /   / /| |
|  __/   /   \  / /_| |
| |     / /^\ \ \___  |
\_|     \/   \/     |_/

px4 starting.


pxh&gt;
```

到上一个终端并上传：

```sh
cd /home/linaro
./px4 mainapp.config
```

#### 本机生成

If you're building *directly* on the Pi, you will want the native build target (emlid_navio2_native).

```sh
cd PX4-Autopilot
make emlid_navio2_native # for native build
```

The "px4" executable file is in the directory **build/emlid_navio2_native/**. Run it directly with:

```sh
cd /home/pi && ./bin/px4 -d -s px4.config > px4.log
```

运行 DSP 调试监控器：

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

#### 自动启动

注意：在 Mac 上可以使用 [nano-dm](https://github.com/kevinmehall/nano-dm)。
```sh
adb shell
```


### OcPoC-Zynq Mini

替换为：
* [Aerotenna OcPoC-Zynq Mini Flight Controller > Building PX4 for OcPoC-Zynq](../flight_controller/ocpoc_zynq.md#building-px4-for-ocpoc-zynq)
* [OcPoC PX4 Setup Page](https://aerotenna.readme.io/docs/px4-setup)  (aerotenna.readme.io)


### Parrot Bebop

This section shows how to build for the [Qualcomm Snapdragon Flight](../flight_controller/snapdragon_flight.md).

#### 编译

:::note
If you use the [Qualcomm ESC board](http://shop.intrinsyc.com/products/qualcomm-electronic-speed-control-board) (UART-based), then please follow their instructions [here](https://github.com/ATLFlight/ATLFlightDocs/blob/master/PX4.md). If you use normal PWM-based ESCs boards, then you may continue to follow the instructions on this page.
:::

The commands below build the targets for the Linux and the DSP side. Both executables communicate via [muORB](../middleware/uorb.md).

```sh
make atlflight_eagle_default upload
```

To load the SW on the device, connect via USB cable and make sure the device is booted. Run this in a new terminal window:

```sh
adb push ROMFS/px4fmu_common/mixers/quad_x.main.mix  /usr/share/data/adsp
```

同步后重启：

```sh
${HEXAGON_SDK_ROOT}/tools/debug/mini-dm/Linux_Debug/mini-dm
```

Note that this will also copy (and overwrite) the two config files [mainapp.config](https://github.com/PX4/PX4-Autopilot/blob/master/posix-configs/eagle/flight/mainapp.config) and [px4.config](https://github.com/PX4/PX4-Autopilot/blob/master/posix-configs/eagle/flight/px4.config) to the device. Those files are stored under /usr/share/data/adsp/px4.config and /home/linaro/mainapp.config respectively if you want to edit the startup scripts directly on your vehicle.

该部分介绍 [高通骁龙飞控](https://docs.px4.io/en/flight_controller/snapdragon_flight.html) 如何编译：

```sh
adb connect 192.168.42.1:9050
```

#### 运行

Run the DSP debug monitor:

```sh
adb shell
vim /etc/rc.local
```

{% youtube %}https://www.youtube.com/watch?v=Bkk8zttWxEI&rel=0&vq=hd720{% endyoutube %}

到上一个终端并上传：

```sh
adb pull /etc/rc.local
gedit rc.local
adb push rc.local /etc/rc.local
```

Note that the px4 will stop as soon as you disconnect the USB cable (or if you ssh session is disconnected). To fly, you should make the px4 auto-start after boot.

#### 自动启动

混频器现在需要手动复制:

运行 DSP 调试监控器：

```sh
adb shell sync
adb shell reboot
```

注意：在 Mac 上可以使用 [nano-dm](https://github.com/kevinmehall/nano-dm)。

```sh
adb shell
chmod +x /etc/rc.local
```

继续使用 ADB shell 运行 PX4：

```sh
adb reboot
```

Make sure that the `rc.local` is executable:

```sh
克隆固件存储库并导航到固件目录： 
     sh
     git clone https://github.com/PX4/Firmware.git
     cd Firmware
```

{% youtube %}https://www.youtube.com/watch?v=0pa0gS30zNw&rel=0&vq=hd720{% endyoutube %}

```sh
adb reboot
```

## 用图形界面 IDE 编译

前面的部分演示了如何调用 *make* 来构建多个不同的目标、启动模拟器、使用 IDE 等。 本节介绍如何构造 *make* 选项以及如何查找可用选项。

## Qt Creator 功能

The previous sections showed how you can call *make* to build a number of different targets, start simulators, use IDEs etc. This section shows how *make* options are constructed and how to find the available choices.

The full syntax to call *make* with a particular configuration and initialization file is:
```sh
make [VENDOR_][MODEL][_VARIANT] [VIEWER_MODEL_DEBUGGER]
```

**VENDOR_MODEL_VARIANT**: (also known as `CONFIGURATION_TARGET`)

- [Aerotenna OcPoC-Zynq Mini Flight Controller > Building PX4 for OcPoC-Zynq](https://docs.px4.io/en/flight_controller/ocpoc_zynq.html#building-px4-for-ocpoc-zynq)（PX4 用户手册）
- **MODEL：** *飞控板模型</1>"模型 "：`sitl`、`fmu-v2`、`fmu-v3`、`fmu-v4`、`fmu-v5`、`navio2` 等。
- **VARIANT:**特定配置：例如 `rtps`、`lpe`，其中包含 `默认` 配置中不存在的组件。 最常见的是 `default`，可以省略。

然后重新启动骁龙：
```sh
make list_config_targets
```
:::

**VIEWER_MODEL_DEBUGGER_WORLD:**

- **VIEWER:**这是启动和连接的模拟器（"查看器"）：`gazebo`, `jmavsim` <!-- , ?airsim -->

:::tip
`none` can be used if you want to launch PX4 and wait for a simulator (jmavsim, gazebo, or some other simulator). For example, `make px4_sitl none_iris` launches PX4 without a simulator (but with the iris airframe).
:::
- **MODEL:**要使用的 *载具* 模型（例如 `iris` (*default*)、`rover`、`tailsitter` 等），该模型将由模拟器加载。 环境变量 `PX4_SIM_MODEL` 将设置为所选模型。 然后在 [启动脚本 ](#scripts) 中使用该模型来选择适当的参数。
- **DEBUGGER:**要使用的调试器：`none` (*default*)、`ide`、`gdb`、`lldb`、`ddd`、`valgrind`、`callgrind`。 有关详细信息，请参阅 < 0>Simulation 调试 </0>。
- **WORLD:** (Gazebo only). Set a the world ([PX4/sitl_gazebo/worlds](https://github.com/PX4/sitl_gazebo/tree/master/worlds)) that is loaded. Default is [empty.world](https://github.com/PX4/sitl_gazebo/blob/master/worlds/empty.world). For more information see [Gazebo > Loading a Specific World](../simulation/gazebo.md#set_world).

:::tip
You can get a list of *all* available `VIEWER_MODEL_DEBUGGER_WORLD` options using the command below:
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
:::

Notes:
- `CONFIGURATION_TARGET` 和 `VIEWER_MODEL_DEBUGGER` 中的大多数值都有默认值, 因此是可选的。 比如，`gazebo` 相当于 `gazebo_iris` 或 `gazebo_iris_none` 。
- 如果要在其他两个设置之间指定默认值，可以使用三个下划线。 例如，`gazebo___gdb` 等效于 `gazebo_iris_gdb`。
- 您可以使用 `VIEWER_MODEL_DEBUGGER` 的 `none` 值启动 PX4 并等待模拟器。 例如，使用 `make px4_sitl_default none` 启动 PX4和使用 `./Tools/jmavsim_run.sh` 启动 jMAVSim 。


The `VENDOR_MODEL_VARIANT` options map to particular *cmake* configuration files in the PX4 source tree under the [/boards](https://github.com/PX4/PX4-Autopilot/tree/master/boards) directory. Specifically `VENDOR_MODEL_VARIANT` maps to a configuration file **boards/VENDOR/MODEL/VARIANT.cmake** (e.g. `px4_fmu-v5_default` corresponds to [boards/px4/fmu-v5/default.cmake](https://github.com/PX4/PX4-Autopilot/blob/master/boards/px4/fmu-v5/default.cmake)).

Additional make targets are discussed in the following sections (list is not exhaustive):


### Qt creator 提供符号跳转、自动补全和编译固件的功能。

The `bloaty_compare_master` build target allows you to get a better understanding of the impact of changes on code size. When it is used, the toolchain downloads the latest successful master build of a particular firmware and compares it to the local build (using the [bloaty](https://github.com/google/bloaty) size profiler for binaries).

:::tip
This can help analyse changes that (may) cause `px4_fmu-v2_default` to hit the 1MB flash limit.
:::

*Bloaty* must be in your path and found at *cmake* configure time. The PX4 [docker files](https://github.com/PX4/containers/blob/master/docker/Dockerfile_nuttx-bionic) install *bloaty* as shown:
```
git clone --recursive https://github.com/google/bloaty.git /tmp/bloaty \
    && cd /tmp/bloaty && cmake -GNinja . && ninja bloaty && cp bloaty /usr/local/bin/ \
    && rm -rf /tmp/*
```

The example below shows how you might see the impact of removing the *mpu9250* driver from `px4_fmu-v2_default`. First it locally sets up a build without the driver:
```sh
 (cd /home/linaro && ./px4 mainapp.config > mainapp.log)

exit 0
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
This shows that removing *mpu9250* from `px4_fmu-v2_default` would save 10.3 kB of flash. It also shows the sizes of different pieces of the *mpu9250* driver.


## PX4 创建生成目标

The *PX4 Firmware Version* and *Custom Firmware Version* are published using the MAVLink [AUTOPILOT_VERSION](https://mavlink.io/en/messages/common.html#AUTOPILOT_VERSION) message, and displayed in the *QGroundControl* **Setup > Summary** airframe panel:

![Firmware info](../../assets/gcs/qgc_setup_summary_airframe_firmware.jpg)

These are extracted at build time from the active *git tag* for your repo tree. The git tag should be formatted as `<PX4-version>-<vendor-version>` (e.g. the tag in the image above was set to `v1.8.1-2.22.1`).

:::warning
If you use a different git tag format, versions information may not be displayed properly.
:::


## 列出所有发行版本（标签） sh git tag -l

### 基于 QuRT / Snapdragon 的飞控板

Many build problems are caused by either mismatching submodules or an incompletely cleaned-up build environment. Updating the submodules and doing a `distclean` can fix these kinds of errors:
```
git submodule update --recursive
make distclean
```

### 在 Linux 上使用 Qt creator

The `region 'flash' overflowed by XXXX bytes` error indicates that the firmware is too large for the target hardware platform. This is common for `make px4_fmu-v2_default` builds, where the flash size is limited to 1MB.

If you're building the *vanilla* master branch, the most likely cause is using an unsupported version of GCC. In this case, install the version specified in the [Developer Toolchain](../dev_setup/dev_env.md) instructions.

If building your own branch, it is possibly you have increased the firmware size over the 1MB limit. In this case you will need to remove any drivers/modules that you don't need from the build.


### 在 Windows 上使用 Qt creator

MacOS allows a default maximum of 256 open files in all running processes. The PX4 build system opens a large number of files, so you may exceed this number.

The build toolchain will then report `Too many open files` for many files, as shown below:
```sh
/usr/local/Cellar/gcc-arm-none-eabi/20171218/bin/../lib/gcc/arm-none-eabi/7.2.1/../../../../arm-none-eabi/bin/ld: cannot find NuttX/nuttx/fs/libfs.a: Too many open files
```

The solution is to increase the maximum allowed number of open files (e.g. to 300). You can do this in the macOS *Terminal* for each session:
- Run this script [Tools/mac_set_ulimit.sh](https://github.com/PX4/PX4-Autopilot/blob/master/Tools/mac_set_ulimit.sh), or
- Enter this command:
  ```sh
  ulimit -S -n 300
  ```

### 在 Mac OS 上使用 Qt creator

As of macOS Catalina 10.15.1 there may be problems when trying to build the simulator with *cmake*. If you have build problems on this platform then try run the following command in your terminal:
```sh
cd ~/src/Firmware
mkdir -p build/creator
cd build/creator
cmake ../.. -G "CodeBlocks - Unix Makefiles"
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
