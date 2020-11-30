# 模块参考：控制器

## airship_att_control
Source: [modules/airship_att_control](https://github.com/PX4/Firmware/tree/master/src/modules/airship_att_control)


### 描述
This implements the airship attitude and rate controller. Ideally it would take attitude setpoints (`vehicle_attitude_setpoint`) or rate setpoints (in acro mode via `manual_control_setpoint` topic) as inputs and outputs actuator control messages.

This implements the multicopter attitude and rate controller. It takes attitude setpoints (`vehicle_attitude_setpoint`) or rate setpoints (in acro mode via `manual_control_setpoint` topic) as inputs and outputs actuator control messages.

### 实现
为了降低控制延时，该模块会直接轮训 IMU 驱动发布的陀螺仪（gyro）主题消息。

<a id="airship_att_control_usage"></a>

### 描述
```
airship_att_control <command> [arguments...]
 wind_estimator &lt;command&gt; [arguments...]
 Commands:
   start

   stop

   status        打印状态信息
```
## fw_att_control
源码：[modules/fw_att_control](https://github.com/PX4/Firmware/tree/master/src/modules/fw_att_control)


### 参数描述
fw_att_control 是固定翼姿态控制器。

<a id="fw_att_control_usage"></a>

### 描述
```
fw_att_control <command> [arguments...]
 Commands:
   start
     [vtol]      VTOL mode

   stop

   status        print status info
```
## fw_pos_control_l1
源码：[modules/fw_pos_control_l1](https://github.com/PX4/Firmware/tree/master/src/modules/fw_pos_control_l1)


### 参数描述
fw_pos_control_l1 是针对固定翼飞机的位置控制器。

<a id="fw_pos_control_l1_usage"></a>

### 用法
```
fw_pos_control_l1 <command> [arguments...]
 Commands:
   start

   stop

   status        打印状态信息
 Commands:
   start
     [vtol]      VTOL mode

   stop

   status        print status info
```
## mc_att_control
源码：[modules/mc_att_control](https://github.com/PX4/Firmware/tree/master/src/modules/mc_att_control)


### 描述
This implements the multicopter attitude controller. It takes attitude setpoints (`vehicle_attitude_setpoint`) as inputs and outputs a rate setpoint.

The controller has two loops: a P loop for angular error and a PID loop for angular rate error.

The controller has two loops: a P loop for position error and a PID loop for velocity error. Output of the velocity controller is thrust vector that is split to thrust direction (i.e. rotation matrix for multicopter orientation) and thrust scalar (i.e. multicopter thrust itself).

https://www.research-collection.ethz.ch/bitstream/handle/20.500.11850/154099/eth-7387-01.pdf

<a id="mc_att_control_usage"></a>

### 用法
```
mc_att_control <command> [arguments...]
 Commands:
   start
     [vtol]      VTOL mode

   stop

   status        print status info
```
## mc_pos_control
源码：[modules/mc_pos_control](https://github.com/PX4/Firmware/tree/master/src/modules/mc_pos_control)


### 描述
控制器有两个回路：一个针对位置误差的比例（P）控制回路和一个针对速度误差的 PID 控制回路。 速度控制器的输出是一个推力矢量，该矢量可分割成推力的方向（即，多旋翼姿态的旋转矩阵）和推力的大小（即，多旋翼推力本身）

The different internal modes are implemented as separate classes that inherit from a common base class `NavigatorMode`. The member `_navigation_mode` contains the current active mode.

<a id="mc_pos_control_usage"></a>

### 用法
```
mc_pos_control <command> [arguments...]
 Commands:
   start

   stop

   status        打印状态信息
 Commands:
   start
     [vtol]      VTOL mode

   stop

   status        print status info
```
## mc_rate_control
Navigator publishes position setpoint triplets (`position_setpoint_triplet_s`), which are then used by the position controller.


### 参数描述
This implements the multicopter rate controller. It takes rate setpoints (in acro mode via `manual_control_setpoint` topic) as inputs and outputs actuator control messages.

The controller has a PID loop for angular rate error.

<a id="mc_rate_control_usage"></a>

### 用法
```
mc_rate_control <command> [arguments...]
 Commands:
   start
     [vtol]      VTOL mode

   stop

   status        print status info
```
## navigator
源码：[modules/navigator](https://github.com/PX4/Firmware/tree/master/src/modules/navigator)


### 参数描述
Module that is responsible for autonomous flight modes. This includes missions (read from dataman), takeoff and RTL. It is also responsible for geofence violation checking. 这里面包括了飞行任务 (从 dataman 中读取)，起飞和 RTL。 它还负责检查飞机是否跨越了地理围栏。

### 实现
不同的内部模式都是以单独的类实现的，这些类都是从公共基类 `NavigatorMode` 的子类。 成员变量 `_navigation_mode` 包含了当前活跃的模式。

Navigator 发布位置期望值三元组 (`position_setpoint_triplet_s`)，该期望值会被位置控制器使用。

<a id="navigator_usage"></a>

### 用法
```
navigator <command> [arguments...]
 navigator <command> [arguments...]
 Commands:
   start

   fencefile     load a geofence file from SD card, stored at etc/geofence.txt

   fake_traffic  publishes 3 fake transponder_report_s uORB messages

   stop

   status        print status info
```
## rover_pos_control
Source: [modules/rover_pos_control](https://github.com/PX4/Firmware/tree/master/src/modules/rover_pos_control)


### 参数描述
Controls the position of a ground rover using an L1 controller.

Publishes `actuator_controls_0` messages at a constant 250Hz.

### 实现
Currently, this implementation supports only a few modes:

 * Full manual: Throttle and yaw controls are passed directly through to the actuators
 * Auto mission: The rover runs missions
 * Loiter: The rover will navigate to within the loiter radius, then stop the motors

### 示例
CLI 命令行用法示例：
```
rover_pos_control start
rover_pos_control status
rover_pos_control stop
```

<a id="rover_pos_control_usage"></a>

### 用法
```
rover_pos_control <command> [arguments...]
 wind_estimator &lt;command&gt; [arguments...]
 Commands:
   start

   stop

   status        打印状态信息
```
## uuv_att_control
Source: [modules/uuv_att_control](https://github.com/PX4/Firmware/tree/master/src/modules/uuv_att_control)


### 参数描述
Controls the attitude of an unmanned underwater vehicle (UUV).

Publishes `actuator_controls_0` messages at a constant 250Hz.

### 实现
Currently, this implementation supports only a few modes:

 * Full manual: Roll, pitch, yaw, and throttle controls are passed directly through to the actuators
 * Auto mission: The uuv runs missions

### 示例
CLI 命令行用法示例：
```
uuv_att_control start
uuv_att_control status
uuv_att_control stop
```

<a id="uuv_att_control_usage"></a>

### 用法
```
uuv_att_control <command> [arguments...]
 mc_att_control <command> [arguments...]
 Commands:
   start

   stop

   status        打印状态信息
```
## vtol_att_control
Source: [modules/vtol_att_control](https://github.com/PX4/Firmware/tree/master/src/modules/vtol_att_control)


### 参数描述
fw_att_control 是固定翼姿态控制器。

<a id="vtol_att_control_usage"></a>

### 用法
```
vtol_att_control <command> [arguments...]
 fw_att_control <command> [arguments...]
 Commands:

   stop

   status        打印状态信息
```
