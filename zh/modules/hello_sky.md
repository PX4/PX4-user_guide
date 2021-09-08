# 搭建你的第一个应用（Hello Shy）

本文主要说明如何创建并运行你的第一个板载应用程序。 它涵盖了 PX4 应用程序开发所需的所有基本概念和 API。

:::note
为简单起见，省略了更高级的功能，如启动/停止功能和命令行参数。 这些在[Application/Module Template](../modules/module_template.md) 中有介绍。
:::

## 系统必备组件

以下内容是您需要提前准备的：
* [PX4 SITL 模拟器](../simulation/README.md) *或者* 一个 [兼容 PX4 的飞行控制器](https://docs.px4.io/en/flight_controller/#documented-boards) 。
* 适用于期望平台的 [PX4 开发工具链](../setup/dev_env.md) 。
* 从 Github [下载 PX4 源代码](../setup/building_px4.md#get_px4_code) 。

源码[PX4-Autopilot/src/examples/px4_simple_app ](https://github.com/PX4/PX4-Autopilot/tree/master/src/examples/px4_simple_app)目录包含本教程的完整版本，如果遇到困难可以查看。
* 重命名 (或删除) **px4_simple_app** 目录。

## 最小的应用程序

在本节中，我们创建一个*很小的应用程序*，只是打印出来`Hello Sky!`。 这包括一个*C*文件和一个*cmake*定义（它告诉工具链如何构建应用程序）。</p>

1. 新建如下文件夹： **Firmware/src/examples/px4_simple_app**。
1. 在该目录中新建一个名为 **px4_simple_app.c** 的 C 文件：

   * 将下面的默认头部注释复制到文件页面的顶部， 该注释应出现在所有贡献的文件中！

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

   * 将下面的代码复制到头部注释的下方， 该注释应出现在所有贡献的文件中！

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

:::tip
函数必须以`<module_name>_main`格式命名并从模块中导出，如上图所示。
:::

:::tip
`PX4_INFO`相当于输出到PX4 shell的`printf`（包含在****px4_platform_common/log.h **中）。 这里有不同的日志级别：`PX4_INFO`、`PX4_WARN`、`PX4_ERR`、`PX4_DEBUG`。 警告和错误会额外添加到[ULog](../dev_log/ulog_file_format.md)并显示在[Flight Review](https://logs.px4.io/) 中。 :::</p></li> </ul>

1. 创建并打开一个名为**CMakeLists.txt**的新*cmake*定义文件。 复制下面的文本：
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
   `px4_add_module()` 方法根据模块描述生成静态库。
   - `MODULE`块是模块的唯一固件名称（按照惯例，模块名称的前缀是src之后的路径）。`</li>
<li><p spaces-before="0"><code>MAIN`块列出了模块的入口点，它将命令注册到 NuttX，以便可以从 PX4 shell 或 SITL 控制台调用它。</p>

:::tip
`px4_add_module()` 的格式可从 [PX4-Autopilot/cmake/px4_add_module.cmake](https://github.com/PX4/PX4-Autopilot/blob/master/cmake/px4_add_module.cmake)中查看. <!-- NEED px4_version -->

:::

:::note
如果您对`px4_add_module`指定`DYNAMIC`选项，则会在 POSIX 平台上创建一个动态库而不是静态库（这些可以在无需重新编译 PX4 的情况下加载，并作为二进制文件而不是源代码共享给其他人）。 您的应用程序不会成为内置命令，而是生成一个名为`examples__px4_simple_app.px4mod`的文件。 您可以通过在运行时使用以下`dyn`命令加载文件来运行您的命令：`dyn ./examples__px4_simple_app.px4mod`
:::

## 编译应用程序/固件

应用程序的编写至此完成。 为了运行它，您首先需要确保它是作为 PX4 的一部分构建的。 应用程序被将依据目标的适当板级*cmake*文件添加到编译/固件中：

* jMAVSim 仿真器：`make px4_sitl_default jmavsim`
* Pixhawk v1/2: [PX4-Autopilot/boards/px4/fmu-v2/default.cmake](https://github.com/PX4/PX4-Autopilot/blob/master/boards/px4/fmu-v2/default.cmake)
* Pixracer (px4/fmu-v4):

[PX4-Autopilot/boards/px4/fmu-v4/default.cmake](https://github.com/PX4/PX4-Autopilot/blob/master/boards/px4/fmu-v4/default.cmake)</li> 
  
  * 其他板的*cmake*文件可以在[PX4-Autopilot/boards/](https://github.com/PX4/PX4-Autopilot/tree/master/boards) 中找到</ul> 

要启用将应用程序编译到固件中，请在*cmake*文件中的某处为您的应用程序创建一个新行：



```
examples/px4_simple_app
```


:::note
The line will already be present for most files, because the examples are included in firmware by default.
:::

在你完成飞控板的重置之前应该会输出一些编译消息，并最终出现：

* Pixhawk v1/2：`make px4_fmu-v2_default upload`
* Pixhawk v3：`make px4_fmu-v4_default upload`
* Pixhawk v3：`make px4_fmu-v4_default`
* Other boards: [Building the Code](../dev_setup/building_px4.md#building-for-nuttx)




## 测试应用（硬件）



### 将固件上传至飞控板

一旦飞控板被重置并完成了固件的上传，命令行界面将输出：

* Pixhawk v1/2：`make px4_fmu-v2_default upload`
* Pixhawk v3：`make px4_fmu-v4_default upload`

It should print before you reset the board a number of compile messages and at the end:



```sh
Loaded firmware for X,X, waiting for the bootloader...
```


键入 "help" 并回车：



```sh
Erase  : [====================] 100.0%
Program: [====================] 100.0%
Verify : [====================] 100.0%
Rebooting.

[100%] Built target upload
```




### 连接至控制台

请注意，此时 `px4_simple_app` 已经是一个可用的命令了。 键入 `px4_simple_app` 并回车以运行该程序：



```sh
nsh>
```


该应用程序现在已经被正确地注册到了 Px4 系统中，并且可以通过对其进行扩展来执行更有用的任务了。



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


输入 `px4_simple_app` 以运行该最小的应用程序。



## 测试应用（SITL）

If you're using SITL the *PX4 console* is automatically started (see [Building the Code > First Build (Using the jMAVSim Simulator)](../dev_setup/building_px4.md#first-build-using-the-jmavsim-simulator)). As with the *nsh console* (see previous section) you can type `help` to see the list of built-in apps.

为了做一些更有用的事情，应用程序需要订阅一些输入量并发布输出指令（比如电机或者舵机指令）。



```sh
pxh> px4_simple_app
INFO  [px4_simple_app] Hello Sky!
```


The application can now be extended to actually perform useful tasks.




## 订阅传感器数据

订阅一个 topic 非常简单直接：

`sensor_sub_fd` 是一个 topic 句柄（handle），它可以高效地执行阻断以等待新数据。 待新数据抵达后调度程序会自动将当前进程从休眠中唤醒，线程在等待期间不会占用任何 CPU 周期。 为了实现这一功能，我们使用了 POSIX 系统调用函数 [poll()](http://pubs.opengroup.org/onlinepubs/007908799/xsh/poll.html) 。

Individual message channels between applications are called [topics](../middleware/uorb.md). For this tutorial, we are interested in the [sensor_combined](https://github.com/PX4/PX4-Autopilot/blob/master/msg/sensor_combined.msg) topic, which holds the synchronized sensor data of the complete system.

使用下面的命令重新编译 app ：



```cpp
#include <uORB/topics/sensor_combined.h>
..
int sensor_sub_fd = orb_subscribe(ORB_ID(sensor_combined));
```


The `sensor_sub_fd` is a topic handle and can be used to very efficiently perform a blocking wait for new data. The current thread goes to sleep and is woken up automatically by the scheduler once new data is available, not consuming any CPU cycles while waiting. To do this, we use the [poll()](http://pubs.opengroup.org/onlinepubs/007908799/xsh/poll.html) POSIX system call.

你的 app 会在控制台界面输出 5 组传感器数据然后退出：



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


Compile the app again by entering:



```sh
make
```




### 测试 uORB 消息订阅

数据的交互非常简单： 初始化想要发布的 topic 的 `结构体` 然后告诉这个 topic ：



```sh
px4_simple_app &
```


在主循环中完成了信息的处理之后就可以将其发布了：



```sh
[px4_simple_app] Accelerometer:   0.0483          0.0821          0.0332
[px4_simple_app] Accelerometer:   0.0486          0.0820          0.0336
[px4_simple_app] Accelerometer:   0.0487          0.0819          0.0327
[px4_simple_app] Accelerometer:   0.0482          0.0818          0.0323
[px4_simple_app] Accelerometer:   0.0482          0.0827          0.0331
[px4_simple_app] Accelerometer:   0.0489          0.0804          0.0328
```


:::tip
The [Module Template for Full Applications](../modules/module_template.md) can be used to write background process that can be controlled from the command line.
:::



## 发布数据

To use the calculated outputs, the next step is to *publish* the results. Below we show how to publish the attitude topic.

:::note
We've chosen `attitude` because we know that the *mavlink* app forwards it to the ground control station - providing an easy way to look at the results.
:::

The interface is pretty simple: initialize the `struct` of the topic to be published and advertise the topic:



```c
#include <uORB/topics/vehicle_attitude.h>
..
/* advertise attitude topic */
struct vehicle_attitude_s att;
memset(&att, 0, sizeof(att));
orb_advert_t att_pub_fd = orb_advertise(ORB_ID(vehicle_attitude), &att);
```


更多信息和故障排除 /常见的陷阱等可以在这里找到： [uORB](../middleware/uorb.md)。



```c
orb_publish(ORB_ID(vehicle_attitude), att_pub_fd, &att);
```




## 完整的示例代码

下一页提供了一个可用于编写具备启动和停止功能的完整应用程序的模版文件。



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

And finally run your app:



```sh
px4_simple_app
```


If you start *QGroundControl*, you can check the sensor values in the real time plot ([Analyze > MAVLink Inspector](https://docs.qgroundcontrol.com/en/analyze_view/mavlink_inspector.html)).



## 总结

This tutorial covered everything needed to develop a basic PX4 autopilot application. Keep in mind that the full list of uORB messages/topics is [available here](https://github.com/PX4/PX4-Autopilot/tree/master/msg/) and that the headers are well documented and serve as reference.

Further information and troubleshooting/common pitfalls can be found here: [uORB](../middleware/uorb.md).

The next page presents a template for writing a full application with start and stop functionality.
