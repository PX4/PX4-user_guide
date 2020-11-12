# 搭建你的第一个应用（Hello Shy）

This topic explains how to create and run your first onboard application. It covers all the basic concepts and APIs required for app development on PX4.

> **Note** For simplicity, more advanced features like start/stop functionality and command-line arguments are omitted. These are covered in [Application/Module Template](../apps/module_template.md).


## 系统必备组件

你需要具备如下组件：
* [PX4 SITL 模拟器](../simulation/README.md) *或者* 一个 [兼容 PX4 的飞行控制器](https://docs.px4.io/en/flight_controller/#documented-boards) 。
* 适用于期望平台的 [PX4 开发工具链](../setup/dev_env.md) 。
* 从 Github [下载 PX4 源代码](../setup/building_px4.md#get_px4_code) 。

源代码 [Firmware/src/examples/px4_simple_app](https://github.com/PX4/Firmware/tree/master/src/examples/px4_simple_app) 文件夹下包含了本教程的完整版代码，如果你卡住了可以前去查看该文件夹下的内容。
* 重命名 (或删除) **px4_simple_app** 目录。

## 最小的应用程序

In this section we create a *minimal application* that just prints out `Hello Sky!`. This consists of a single *C* file and a *cmake* definition (which tells the toolchain how to build the application).

1. 新建如下文件夹： **Firmware/src/examples/px4_simple_app**。
1. 在该目录中新建一个名为 **px4_simple_app.c** 的 C 文件：

   * Copy in the default header to the top of the page. This should be present in all contributed files!

     ```c
     /****************************************************************************
      *
      *   Copyright (c) 2012-2019 PX4 Development Team. All rights reserved.
      *
      * Redistribution and use in source and binary forms, with or without
      * modification, are permitted provided that the following conditions
      * are met:
      *
      * 1. Redistributions of source code must retain the above copyright
      *    notice, this list of conditions and the following disclaimer.
      * 2. Redistributions in binary form must reproduce the above copyright
      *    notice, this list of conditions and the following disclaimer in
      *    the documentation and/or other materials provided with the
      *    distribution.
      * 3. Neither the name PX4 nor the names of its contributors may be
      *    used to endorse or promote products derived from this software
      *    without specific prior written permission.
      *
      * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
      * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
      * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS
      * FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
      * COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
      * INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING,
      * BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS
      * OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED
      * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT
      * LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN
      * ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
      * POSSIBILITY OF SUCH DAMAGE.
      *
      ****************************************************************************/
     ```

   * Copy the following code below the default header. This should be present in all contributed files!

     ```c
     /**
      * @file px4_simple_app.c
      * Minimal application example for PX4 autopilot
      *
      * @author Example User <mail@example.com>
      */

     #include <px4_platform_common/log.h>

     __EXPORT int px4_simple_app_main(int argc, char *argv[]);

     int px4_simple_app_main(int argc, char *argv[])
     {
        PX4_INFO("Hello Sky!");
        return OK;
     }
     ```

     > **Tip** The main function must be named `<module_name>_main` and exported from the module as shown.

<span></span>

     > **Tip** `PX4_INFO` is the equivalent of `printf` for the PX4 shell (included from **px4_platform_common/log.h**). There are different log levels: `PX4_INFO`, `PX4_WARN`, `PX4_ERR`, `PX4_DEBUG`. Warnings and errors are additionally added to the [ULog](../log/ulog_file_format.md) and shown on [Flight Review](https://logs.px4.io/).

1. Create and open a new *cmake* definition file named **CMakeLists.txt**. Copy in the text below:
   ```cmake
   ############################################################################
   #
   #   Copyright (c) 2015 PX4 Development Team. All rights reserved.
   #
   # Redistribution and use in source and binary forms, with or without
   # modification, are permitted provided that the following conditions
   # are met:
   #
   # 1. Redistributions of source code must retain the above copyright
   #    notice, this list of conditions and the following disclaimer.
   # 2. Redistributions in binary form must reproduce the above copyright
   #    notice, this list of conditions and the following disclaimer in
   #    the documentation and/or other materials provided with the
   #    distribution.
   # 3. Neither the name PX4 nor the names of its contributors may be
   #    used to endorse or promote products derived from this software
   #    without specific prior written permission.
   #
   # THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
   # "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
   # LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS
   # FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
   # COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
   # INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING,
   # BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS
   # OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED
   # AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT
   # LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN
   # ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
   # POSSIBILITY OF SUCH DAMAGE.
   #
   ############################################################################
   px4_add_module(
    MODULE examples__px4_simple_app
    MAIN px4_simple_app
    STACK_MAIN 2000
    SRCS
        px4_simple_app.c
    DEPENDS
    )
   ```
   The `px4_add_module()` method builds a static library from a module description.
   - PX4 SITL (模拟器): [Firmware/boards/px4/sitl/default.cmake](https://github.com/PX4/Firmware/blob/master/boards/px4/sitl/default.cmake)
   - The `MAIN` block lists the entry point of the module, which registers the command with NuttX so that it can be called from the PX4 shell or SITL console.

   > **Tip** The `px4_add_module()` format is documented in [PX4-Autopilot/cmake/px4_add_module.cmake](https://github.com/PX4/PX4-Autopilot/blob/{{ book.px4_version }}/cmake/px4_add_module.cmake).

<span></span>

   > **Note** If you specify `DYNAMIC` as an option to `px4_add_module`, a *shared library* is created instead of a static library on POSIX platforms (these can be loaded without having to recompile PX4, and shared to others as binaries rather than source code). Your app will not become a builtin command, but ends up in a separate file called `examples__px4_simple_app.px4mod`. You can then run your command by loading the file at runtime using the `dyn` command: `dyn ./examples__px4_simple_app.px4mod`

## 编译应用程序/固件

The application is now complete. In order to run it you first need to make sure that it is built as part of PX4. Applications are added to the build/firmware in the appropriate board-level *cmake* file for your target:

* jMAVSim 仿真器：`make px4_sitl_default jmavsim`
* Pixhawk v1/2：`make px4_fmu-v2_default`（或只用 `make px4_fmu-v2`）
* Pixhawk v3：`make px4_fmu-v4_default`
* 其他飞控板：[构建代码](../setup/building_px4.md#building_nuttx)

要启用将应用程序编译到固件中, 请在 *cmake* 文件中的某个位置为应用程序创建新行：

```
examples/px4_simple_app
```

> **Tip** 编写可使用命令行直接进行控制的后台进程请参阅： [Module Template for Full Applications](../apps/module_template.md) 。

针对不同的平台使用相应的代码进行示例程序的编译：

* Pixhawk v1/2：`make px4_fmu-v2_default upload`
* Pixhawk v3：`make px4_fmu-v4_default upload`
* Pixhawk v3: `make px4_fmu-v4_default`
* Other boards: [Building the Code](../setup/building_px4.md#building_nuttx)


## 测试应用（硬件）

### 将固件上传至飞控板

启用固件上传程序, 然后重置飞控板：

* Pixhawk v1/2: `make px4_fmu-v2_default upload`
* Pixhawk v3: `make px4_fmu-v4_default upload`

在你完成飞控板的重置之前应该会输出一些编译消息，并最终出现：

```sh
Loaded firmware for X,X, waiting for the bootloader...
```

一旦飞控板被重置并完成了固件的上传，命令行界面将输出：

```sh
Erase  : [====================] 100.0%
Program: [====================] 100.0%
Verify : [====================] 100.0%
Rebooting.

[100%] Built target upload
```

### 连接至控制台

Now connect to the [system console](../debug/system_console.md) either via serial or USB. Hitting **ENTER** will bring up the shell prompt:

```sh
nsh>
```

键入 "help" 并回车：

```sh
nsh> help
  help usage:  help [-v] [<cmd>]

  [           df          kill        mkfifo      ps          sleep       
  ?           echo        losetup     mkrd        pwd         test        
  cat         exec        ls          mh          rm          umount      
  cd          exit        mb          mount       rmdir       unset       
  cp          free        mkdir       mv          set         usleep      
  dd          help        mkfatfs     mw          sh          xd          

Builtin Apps:
  reboot
  perf
  top
  ..
  px4_simple_app
  ..
  sercon
  serdis
```

Note that `px4_simple_app` is now part of the available commands. Start it by typing `px4_simple_app` and ENTER:

```sh
nsh> px4_simple_app
Hello Sky!
```

该应用程序现在已经被正确地注册到了 Px4 系统中，并且可以通过对其进行扩展来执行更有用的任务了。

## 测试应用（SITL）

If you're using SITL the *PX4 console* is automatically started (see [Building the Code > First Build (Using the jMAVSim Simulator)](../setup/building_px4.md#jmavsim_build)). As with the *nsh console* (see previous section) you can type `help` to see the list of built-in apps.

输入 `px4_simple_app` 以运行该最小的应用程序。

```sh
pxh> px4_simple_app
INFO  [px4_simple_app] Hello Sky!
```

现在可以扩展应用程序以实际执行有用的任务。


## 订阅传感器数据

为了做一些更有用的事情，应用程序需要订阅一些输入量并发布输出指令（比如电机或者舵机指令）。

> **Tip** The benefits of the PX4 hardware abstraction comes into play here! There is no need to interact in any way with sensor drivers and no need to update your app if the board or sensors are updated.

Individual message channels between applications are called [topics](../middleware/uorb.md). For this tutorial, we are interested in the [sensor_combined](https://github.com/PX4/PX4-Autopilot/blob/master/msg/sensor_combined.msg) topic, which holds the synchronized sensor data of the complete system.

订阅一个 topic 非常简单直接：

```cpp
#include <uORB/topics/sensor_combined.h>
..
int sensor_sub_fd = orb_subscribe(ORB_ID(sensor_combined));
```

The `sensor_sub_fd` is a topic handle and can be used to very efficiently perform a blocking wait for new data. The current thread goes to sleep and is woken up automatically by the scheduler once new data is available, not consuming any CPU cycles while waiting. To do this, we use the [poll()](http://pubs.opengroup.org/onlinepubs/007908799/xsh/poll.html) POSIX system call.

将 `poll()` 加入消息订阅的实现过程如下 (*伪代码实现，完整的代码实现见下文*) ：

```cpp
#include <poll.h>
#include <uORB/topics/sensor_combined.h>
..
int sensor_sub_fd = orb_subscribe(ORB_ID(sensor_combined));

/* one could wait for multiple topics with this technique, just using one here */
px4_pollfd_struct_t fds[] = {
    { .fd = sensor_sub_fd,   .events = POLLIN },
};

while (true) {
    /* wait for sensor update of 1 file descriptor for 1000 ms (1 second) */
    int poll_ret = px4_poll(fds, 1, 1000);
    ..
    if (fds[0].revents & POLLIN) {
        /* obtained data for the first file descriptor */
        struct sensor_combined_s raw;
        /* copy sensors raw data into local buffer */
        orb_copy(ORB_ID(sensor_combined), sensor_sub_fd, &raw);
        PX4_INFO("Accelerometer:\t%8.4f\t%8.4f\t%8.4f",
                    (double)raw.accelerometer_m_s2[0],
                    (double)raw.accelerometer_m_s2[1],
                    (double)raw.accelerometer_m_s2[2]);
    }
}
```

使用下面的命令重新编译 app ：

```sh
make
```

### 测试 uORB 消息订阅

最后一步就是将你的应用程序作为后台进程/任务进行启动，在 nsh shell 界面输入：

```sh
px4_simple_app &
```

你的 app 会在控制台界面输出 5 组传感器数据然后退出：

```sh
[px4_simple_app] Accelerometer:   0.0483          0.0821          0.0332
[px4_simple_app] Accelerometer:   0.0486          0.0820          0.0336
[px4_simple_app] Accelerometer:   0.0487          0.0819          0.0327
[px4_simple_app] Accelerometer:   0.0482          0.0818          0.0323
[px4_simple_app] Accelerometer:   0.0482          0.0827          0.0331
[px4_simple_app] Accelerometer:   0.0489          0.0804          0.0328
```

> **Tip** The [Module Template for Full Applications](../apps/module_template.md) can be used to write background process that can be controlled from the command line.

## 发布数据

To use the calculated outputs, the next step is to *publish* the results. Below we show how to publish the attitude topic.

> **Note** We've chosen `attitude` because we know that the *mavlink* app forwards it to the ground control station - providing an easy way to look at the results.

数据的交互非常简单： 初始化想要发布的 topic 的 `结构体` 然后告诉这个 topic ：

```c
#include <uORB/topics/vehicle_attitude.h>
..
/* advertise attitude topic */
struct vehicle_attitude_s att;
memset(&att, 0, sizeof(att));
orb_advert_t att_pub_fd = orb_advertise(ORB_ID(vehicle_attitude), &att);
```

在主循环中完成了信息的处理之后就可以将其发布了：

```c
orb_publish(ORB_ID(vehicle_attitude), att_pub_fd, &att);
```

## 完整的示例代码

[完整的示例代码](https://github.com/PX4/Firmware/blob/master/src/examples/px4_simple_app/px4_simple_app.c) 现在如下：

```c
/****************************************************************************
 *
 *   Copyright (c) 2012-2019 PX4 Development Team. All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions
 * are met:
 *
 * 1. Redistributions of source code must retain the above copyright
 *    notice, this list of conditions and the following disclaimer.
 * 2. Redistributions in binary form must reproduce the above copyright
 *    notice, this list of conditions and the following disclaimer in
 *    the documentation and/or other materials provided with the
 *    distribution.
 * 3. Neither the name PX4 nor the names of its contributors may be
 *    used to endorse or promote products derived from this software
 *    without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS
 * FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 * COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
 * INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING,
 * BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS
 * OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT
 * LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN
 * ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 * POSSIBILITY OF SUCH DAMAGE.
 *
 ****************************************************************************/

/**
 * @file px4_simple_app.c
 * Minimal application example for PX4 autopilot
 *
 * @author Example User <mail@example.com>
 */

#include <px4_platform_common/px4_config.h>
#include <px4_platform_common/tasks.h>
#include <px4_platform_common/posix.h>
#include <unistd.h>
#include <stdio.h>
#include <poll.h>
#include <string.h>
#include <math.h>

#include <uORB/uORB.h>
#include <uORB/topics/sensor_combined.h>
#include <uORB/topics/vehicle_attitude.h>

__EXPORT int px4_simple_app_main(int argc, char *argv[]);

int px4_simple_app_main(int argc, char *argv[])
{
    PX4_INFO("Hello Sky!");

    /* subscribe to sensor_combined topic */
    int sensor_sub_fd = orb_subscribe(ORB_ID(sensor_combined));
    /* limit the update rate to 5 Hz */
    orb_set_interval(sensor_sub_fd, 200);

    /* advertise attitude topic */
    struct vehicle_attitude_s att;
    memset(&att, 0, sizeof(att));
    orb_advert_t att_pub = orb_advertise(ORB_ID(vehicle_attitude), &att);

    /* one could wait for multiple topics with this technique, just using one here */
    px4_pollfd_struct_t fds[] = {
        { .fd = sensor_sub_fd,   .events = POLLIN },
        /* there could be more file descriptors here, in the form like:
         * { .fd = other_sub_fd,   .events = POLLIN },
         */
    };

    int error_counter = 0;

    for (int i = 0; i < 5; i++) {
        /* wait for sensor update of 1 file descriptor for 1000 ms (1 second) */
        int poll_ret = px4_poll(fds, 1, 1000);

        /* handle the poll result */
        if (poll_ret == 0) {
            /* this means none of our providers is giving us data */
            PX4_ERR("Got no data within a second");

        } else if (poll_ret < 0) {
            /* this is seriously bad - should be an emergency */
            if (error_counter < 10 || error_counter % 50 == 0) {
                /* use a counter to prevent flooding (and slowing us down) */
                PX4_ERR("ERROR return value from poll(): %d", poll_ret);
            }

            error_counter++;

        } else {

            if (fds[0].revents & POLLIN) {
                /* obtained data for the first file descriptor */
                struct sensor_combined_s raw;
                /* copy sensors raw data into local buffer */
                orb_copy(ORB_ID(sensor_combined), sensor_sub_fd, &raw);
                PX4_INFO("Accelerometer:\t%8.4f\t%8.4f\t%8.4f",
                     (double)raw.accelerometer_m_s2[0],
                     (double)raw.accelerometer_m_s2[1],
                     (double)raw.accelerometer_m_s2[2]);

                /* set att and publish this information for other apps
                 the following does not have any meaning, it's just an example
                */
                att.q[0] = raw.accelerometer_m_s2[0];
                att.q[1] = raw.accelerometer_m_s2[1];
                att.q[2] = raw.accelerometer_m_s2[2];

                orb_publish(ORB_ID(vehicle_attitude), att_pub, &att);
            }

            /* there could be more file descriptors here, in the form like:
             * if (fds[1..n].revents & POLLIN) {}
             */
        }
    }

    PX4_INFO("exiting");

    return 0;
}
```

## 运行完整的示例

最后运行你的 app ：

```sh
px4_simple_app
```

如果启动了 *QGroundControl* ，你还可以在实时曲线图中检查传感器数据 （**Widgets > Analyze**）。

## 总结

This tutorial covered everything needed to develop a basic PX4 autopilot application. Keep in mind that the full list of uORB messages/topics is [available here](https://github.com/PX4/PX4-Autopilot/tree/master/msg/) and that the headers are well documented and serve as reference.

更多信息和故障排除 /常见的陷阱等可以在这里找到： [uORB](../middleware/uorb.md)。

下一页提供了一个可用于编写具备启动和停止功能的完整应用程序的模版文件。
