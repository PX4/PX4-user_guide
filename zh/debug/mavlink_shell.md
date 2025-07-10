---
canonicalUrl: https://docs.px4.io/main/zh/debug/mavlink_shell
---

# MAVLink Shell

MAVLink Shell 是一个可以通过串口（USB、数传或基于WIFI的UDP/TCP链路）使用MAVLink协议访问的 *NSH 控制台* 。只适用于基于NuttX的系统，如：Pixhawk、Pixracer等。

它可用于启动系统指令与模块，并得到输出信息。 尽管它不能*直接*显示那些不是由它启动的模块的输出，但是可以间接的使用 `dmesg` 命令来查询。执行 `dmesg -f &` 可以打印出工作队列中其它模块和任务的输出信息。

:::tip
The [QGroundControl MAVLink Console](#qgroundcontrol) is the easiest way to access the console. If the system does not start properly you should instead use the [System Console](../debug/system_console.md).
:::

## 启用 Shell

<a id="qgroundcontrol"></a>

### QGroundControl MAVLink Console

您也可以使用 **mavlink_shell.py** 脚本从终端访问shell：

### mavlink_shell.py

执行 `mavlink_shell.py -h` 获取所有可用参数的描述。
1. 关闭 *QGroundControl*.
1. 安装依赖项
   ```sh
   sudo pip3 install pymavlink pyserial
   ```
1. Open terminal (in PX4-Autopilot directory) and start the shell:
   ```sh
   # 通过串口
   ./Tools/mavlink_shell.py /dev/ttyACM0
   ```
    ```sh
   # 通过 WiFi 连接
   ./Tools/mavlink_shell.py 0.0.0.0:14550
   ```

详情见：[PX4 控制台/Shells > 使用控制台/Shells](../debug/consoles.md#using_the_console)。

## 使用 MAVLink Shell

For information see: [PX4 Consoles/Shells > Using Consoles/Shells](../debug/consoles.md#using_the_console).
