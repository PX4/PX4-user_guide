---
canonicalUrl: https://docs.px4.io/main/zh/ros/mavros_offboard_python
---

# MAVROS *Offboard* 控制示例 (Python)

本教程使用 [Gazebo Classic](../sim_gazebo_classic/README.md) 模拟的Iris四旋翼无人机，用MAVROS Python来展示 *OFFBOARD* 控制的基础知识。 该教程提供分步指示，说明如何开始开发控制无人机以及在仿真环境中运行代码。

在教程结束时, 你应该看到与下面的视频相同的行为, 即缓慢起飞到2米的高度。

:::warning
*OFFBOARD* 控制模式是危险的。 如果你是在一个真正的无人机平台上进行试验，请保证你已经设置了切换回手动的开关来防止紧急情况的发生。
:::

:::tip
该例程使用Python。 其他Python示例可以在这里找到： [integrationtests/python_src/px4_it/mavros](https://github.com/PX4/PX4-Autopilot/tree/release/1.14/integrationtests/python_src/px4_it/mavros)。
:::

<a id="offb_video"></a>
<video width="100%" autoplay="true" controls="true">
 <source src="../../assets/simulation/gazebo_classic/gazebo_offboard.webm" type="video/webm">
</video>

## 创建ROS包

1. 打开终端到 `~/catkin_ws/src` 目录

    ```sh
    roscd  # Should cd into ~/catkin_ws/devel
    cd ..
    cd src
    ```

2. 在 `~/catkin_ws/src 中` 目录创建一个新包，名为 `offboard_py` (在这种情况下) 依赖 `rospy` ：

    ```sh
    catalkin_create_pkg offboard_py rospy
    ```

3. 在 `~/catkin_ws/` 目录中构建新的软件包：

    ```sh
    cd .. # Assuming previous directory to be ~/catkin_ws/src
    catkin build
    source devel/setup.bash
    ```

4. 您现在应该能够通过使用以下方法切换至包目录：

    ```sh
    roscd offboard_py
    ```

5. 在包目录下创建一个新的文件夹 `/scripts`来存储Python文件：

    ```sh
    mkdir scripts
    cd scripts
    ```

## 代码

创建ROS包和scripts文件夹后，可以开始编写Python脚本了。 在scripts文件夹中创建 `offb_node.py` 文件，并赋予它可执行权限：

```sh
touch offb_node.py
chmod +x offb_node.py
```

然后，打开 `offb_node.py` 文件并粘贴以下代码：

```py
"""
 * File: offb_node.py
 * Stack and tested in Gazebo Classic 9 SITL
"""

#! /usr/bin/env python

import rospy
from geometry_msgs.msg import PoseStamped
from mavros_msgs.msg import State
from mavros_msgs.srv import CommandBool, CommandBoolRequest, SetMode, SetModeRequest

current_state = State()

def state_cb(msg):
    global current_state
    current_state = msg


if __name__ == "__main__":
    rospy.init_node("offb_node_py")

    state_sub = rospy.Subscriber("mavros/state", State, callback = state_cb)

    local_pos_pub = rospy.Publisher("mavros/setpoint_position/local", PoseStamped, queue_size=10)

    rospy.wait_for_service("/mavros/cmd/arming")
    arming_client = rospy.ServiceProxy("mavros/cmd/arming", CommandBool)

    rospy.wait_for_service("/mavros/set_mode")
    set_mode_client = rospy.ServiceProxy("mavros/set_mode", SetMode)


    # Setpoint publishing MUST be faster than 2Hz
    rate = rospy.Rate(20)

    # Wait for Flight Controller connection
    while(not rospy.is_shutdown() and not current_state.connected):
        rate.sleep()

    pose = PoseStamped()

    pose.pose.position.x = 0
    pose.pose.position.y = 0
    pose.pose.position.z = 2

    # Send a few setpoints before starting
    for i in range(100):
        if(rospy.is_shutdown()):
            break

        local_pos_pub.publish(pose)
        rate.sleep()

    offb_set_mode = SetModeRequest()
    offb_set_mode.custom_mode = 'OFFBOARD'

    arm_cmd = CommandBoolRequest()
    arm_cmd.value = True

    last_req = rospy.Time.now()

    while(not rospy.is_shutdown()):
        if(current_state.mode != "OFFBOARD" and (rospy.Time.now() - last_req) > rospy.Duration(5.0)):
            if(set_mode_client.call(offb_set_mode).mode_sent == True):
                rospy.loginfo("OFFBOARD enabled")

            last_req = rospy.Time.now()
        else:
            if(not current_state.armed and (rospy.Time.now() - last_req) > rospy.Duration(5.0)):
                if(arming_client.call(arm_cmd).success == True):
                    rospy.loginfo("Vehicle armed")

                last_req = rospy.Time.now()

        local_pos_pub.publish(pose)

        rate.sleep()

```

## 代码解释

` mavros_msgs ` 功能包中包含操作 mavros 包中服务和主题所需的全部自定义消息文件。 所有服务和主题及其相应的消息类型都可以在 [ mavros wiki ](http://wiki.ros.org/mavros) 中找到。

```py
import rospy
from geometry_msgs.msg import PoseStamped
from mavros_msgs.msg import State
from mavros_msgs.srv import CommandBool, CommandBoolRequest, SetMode, SetModeRequest
```

我们创建了一个简单的回调函数来储存飞控当前的状态。 这将使得我们可以检查连接状态，加解锁状态以及*OFFBOARD* 标志位。

```py
current_state = State()

def state_cb(msg):
    global current_state
    current_state = msg
```

我们构建了一个发布者来发布本地位置指令并请求客户端进行加解锁状态及控制模式的切换。 请注意，对于您自己的系统，"mavros" 前缀可能不同，取决于节点启动文件中指定的名称。

```py
state_sub = rospy.Subscriber("mavros/state", State, callback = state_cb)

local_pos_pub = rospy.Publisher("mavros/setpoint_position/local", PoseStamped, queue_size=10)

rospy.wait_for_service("/mavros/cmd/arming")
arming_client = rospy.ServiceProxy("mavros/cmd/arming", CommandBool)

rospy.wait_for_service("/mavros/set_mode")
set_mode_client = rospy.ServiceProxy("mavros/set_mode", SetMode)
```

PX4 在两个 *OFFBOARD* 命令之间设置了500毫秒的超时检查。 一但发生超时，飞控组件中的commander模块会立即切换回进入 *OFFBOARD* 模式之前的飞行模式。 这也是为什么发布频率 **必须** 大于2Hz的原因。 这也是我们**推荐从 *Position* 模式进入 *OFFBOARD* 模式的原因，因为在这种情况下如果无人机退出 *OFFBOARD* 模式**，它将会悬停于当前位置。

我们在这里设置发布速率：

```py
# Setpoint publishing MUST be faster than 2Hz
rate = rospy.Rate(20)
```

在发布任何消息之前，我们需要等待飞控和MAVROS建立连接。 在收到心跳包之后，代码便会跳出这个循环。

```py
# Wait for Flight Controller connection
while(not rospy.is_shutdown() and not current_state.connected):
    rate.sleep()
```

尽管PX4在航空航天常用的NED坐标系下操控飞机，但MAVROS将自动将该坐标系切换至常规的ENU坐标系下，反之亦然。 这也就是为什么我们设置`z`为+2。

```py
pose = PoseStamped()

pose.pose.position.x = 0
pose.pose.position.y = 0
pose.pose.position.z = 2
```

在切换到*OFFBOARD*模式之前，你必须先发送一些设定值信息到飞控中。 否则，模式切换将被拒绝。 这里的` 100 ` 可以被设置为任意数。

```py
# Send a few setpoints before starting
for i in range(100):
    if(rospy.is_shutdown()):
        break

    local_pos_pub.publish(pose)
    rate.sleep()
```

创建一个消息请求以用于将自定义模式设置为 `OFFBOARD` 。 [支持模式](http://wiki.ros.org/mavros/CustomModes#PX4_native_flight_stack) 列表可供参考。

```py
offb_set_mode = SetModeRequest()
offb_set_mode.custom_mode = 'OFFBOARD'
```

该代码的其余部分完全是自解释性的。 我们尝试切换到 *Offboard* 模式，然后解锁四旋翼飞行器以允许其飞行。 我们每隔五秒去调用一次该服务，避免飞控被大量的请求阻塞。 在同一个循环中，我们按照前面定义的频率持续发送期望点设定值信息给飞控。

```py
arm_cmd = CommandBoolRequest()
arm_cmd.value = True

last_req = rospy.Time.now()

while(not rospy.is_shutdown()):
    if(current_state.mode != "OFFBOARD" and (rospy.Time.now() - last_req) > rospy.Duration(5.0)):
        if(set_mode_client.call(offb_set_mode).mode_sent == True):
            rospy.loginfo("OFFBOARD enabled")

        last_req = rospy.Time.now()
    else:
        if(not current_state.armed and (rospy.Time.now() - last_req) > rospy.Duration(5.0)):
            if(arming_client.call(arm_cmd).success == True):
                rospy.loginfo("Vehicle armed")

            last_req = rospy.Time.now()

    local_pos_pub.publish(pose)

    rate.sleep()
```

:::tip
该示例代码非常简单仅为了说明使用方法。
在一个复杂的系统中，通常需要创建新的进程来负责周期性的发送位置期望值给飞控。
:::

## 创建ROS启动文件

在您的 `offboard_py` 软件包中，在 `~/catkin_ws/src/offboard_py/src` 目录下创建名为 `launch` 的文件夹。 包的启动文件将存储在这里。 然后创建您的第一个启动文件，在这种情况下我们以 `start_offb.launch`命名。

```sh
roscd offboard_py
mkdir launch
cd launch
touch start_offb.launch
```

将以下代码复制到 `start_offb.launch` 中：

```xml
<?xml version="1.0"?>
<launch>
    <!-- Include the MAVROS node with SITL and Gazebo -->
    <include file="$(find px4)/launch/mavros_posix_sitl.launch">
    </include>

    <!-- Our node to control the drone -->
    <node pkg="offboard_py" type="offb_node.py" name="offb_node_py" required="true" output="screen" />
</launch>
```

如你所见， `mavros_posix_sitl.launch` 文件已被包含。 此文件负责启动 MAVROS、PX4 SITL、 Gazebo Classic 环境并在给定的世界中放置一架无人机(更多信息见文件 [这里](https://github.com/PX4/PX4-Autopilot/blob/release/1.14/launch/mavros_posix_sitl.launch))。

:::tip
`mavros_posix_sitl.launch` 文件拥有几个可以配置参数，如生成或Gazebo Classic 世界的无人机(参见 [这里](https://github.com/PX4/PX4-Autopilot/blob/release/1.14/launch/mavros_posix_sitl.launch)以获取完整的列表)。

你可以通过在 *include*标签中声明这些参数以覆盖在 `mavros_posix_sitl.launch`定义的默认值。 例如，如果你想要在 `warehouse.world`放置无人机，你可以按如下方式声明：

```xml
<!-- Include the MAVROS node with SITL and Gazebo -->
<include file="$(find px4)/launch/mavros_posix_sitl.launch">
    <arg name="world" default="$(find mavlink_sitl_gazebo)/worlds/warehouse.world"/>
</include>
```
:::

## 启动您的脚本

如果完成了一切，你现在应该能够启动和测试你的脚本。

在终端中输入：

```sh
roslaunched offboard_py start_offb.launch
```

您现在应该看到PX4固件启动和 Gazebo Classic 应用程序运行。 在 *OFFBOARD* 模式设置后, 无人机将解锁, 无人机动作状态将如[视频](#offb_video) 中所示。

:::warning
运行脚本时可能出现错误:

> Resource not found: px4 ROS path [0] = ... ...

这意味着PX4 SITL未包括在路径中。 若要解决这个问题，请在 `.bashrc` 文件末尾添加这些行：

```sh
source ~/PX4-Autopilot/Tools/simulation/gazebo/setup_gazebo.bash ~/PX4-Autopilot ~/PX4-Autopilot/build/px4_sitl_default
export ROS_PACKAGE_PATH=$ROS_PACKAGE_PATH:~/PX4-Autopilot
export ROS_PACKAGE_PATH=$ROS_PACKAGE_PATH:~/PX4-Autopilot/Tools/simulation/gazebo-classic/sitl_gazebo-classic
export GAZEBO_PLUGIN_PATH=$GAZEBO_PLUGIN_PATH:/usr/lib/x86_64-linux-gnu/gazebo-9/plugins
```

在终端中切换至home目录，运行下面的命令将上面的更改应用到当前终端：

```sh
source .bashrc
```

在这个步骤之后，每次您打开一个新的终端窗口，您都不应该再担心这个错误。 如果再次出现，通过 `source .bashrc` 修复。 这个解决方案在这个 [issue](https://github.com/mzahana/px4_fast_planner/issues/4) 提出，在这里你可以获得更多关于这个问题的信息。
:::
