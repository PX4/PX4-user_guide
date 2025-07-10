---
canonicalUrl: https://docs.px4.io/main/zh/modules/modules_controller
---

# 模块参考：控制器

## ODULE_NAM
Source: [modules/control_allocator](https://github.com/PX4/PX4-Autopilot/tree/master/src/modules/control_allocator)


### 描述
This implements control allocation. It takes torque and thrust setpoints as inputs and outputs actuator setpoint messages.

<a id="ODULE_NAM_usage"></a>

### 实现
```
ODULE_NAM <command> [arguments...]
 wind_estimator &lt;command&gt; [arguments...]
 Commands:
   start

   stop

   status        打印状态信息
```
## fw_att_control
This implements the multicopter attitude and rate controller. It takes attitude setpoints (`vehicle_attitude_setpoint`) or rate setpoints (in acro mode via `manual_control_setpoint` topic) as inputs and outputs actuator control messages.


### 描述
This implements the airship attitude and rate controller. Ideally it would take attitude setpoints (`vehicle_attitude_setpoint`) or rate setpoints (in acro mode via `manual_control_setpoint` topic) as inputs and outputs actuator control messages.

源码：[modules/fw_att_control](https://github.com/PX4/Firmware/tree/master/src/modules/fw_att_control)

### 参数描述
To reduce control latency, the module directly polls on the gyro topic published by the IMU driver.

<a id="airship_att_control_usage"></a>

### 描述
```
airship_att_control <command> [arguments...]
 Commands:
   start

   stop

   status        print status info
```
## fw_pos_control_l1
源码：[modules/fw_pos_control_l1](https://github.com/PX4/Firmware/tree/master/src/modules/fw_pos_control_l1)


### 参数描述
This implements the setpoint generation for all modes. It takes the current mode state of the vehicle as input and outputs setpoints for controllers.

<a id="flight_mode_manager_usage"></a>

### 用法
```
fw_pos_control_l1 <command> [arguments...]
 Commands:
   start

   stop

   status        打印状态信息
 Commands:
   start

   stop

   status        print status info
```
## mc_att_control
源码：[modules/mc_att_control](https://github.com/PX4/Firmware/tree/master/src/modules/mc_att_control)


### 描述
fw_att_control is the fixed wing attitude controller.

<a id="fw_att_control_usage"></a>

### 用法
```
fw_att_control <command> [arguments...]
 Commands:
   start
     [vtol]      VTOL mode

   stop

   status        print status info
```
## mc_pos_control
The controller has two loops: a P loop for angular error and a PID loop for angular rate error.


### 描述
fw_pos_control_l1 is the fixed wing position controller.

<a id="fw_pos_control_l1_usage"></a>

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
## mc_att_control
https://www.research-collection.ethz.ch/bitstream/handle/20.500.11850/154099/eth-7387-01.pdf


### 参数描述
This implements the multicopter attitude controller. It takes attitude setpoints (`vehicle_attitude_setpoint`) as inputs and outputs a rate setpoint.

The controller has a P loop for angular error

The different internal modes are implemented as separate classes that inherit from a common base class `NavigatorMode`. The member `_navigation_mode` contains the current active mode.

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
## navigator
Source: [modules/mc_pos_control](https://github.com/PX4/PX4-Autopilot/tree/master/src/modules/mc_pos_control)


### 参数描述
The controller has two loops: a P loop for position error and a PID loop for velocity error. Output of the velocity controller is thrust vector that is split to thrust direction (i.e. rotation matrix for multicopter orientation) and thrust scalar (i.e. multicopter thrust itself).

The controller doesn't use Euler angles for its work, they are generated only for more human-friendly control and logging.

<a id="mc_pos_control_usage"></a>

### 实现
```
mc_pos_control <command> [arguments...]
 navigator <command> [arguments...]
 Commands:
   start

   fencefile     load a geofence file from SD card, stored at etc/geofence.txt

   fake_traffic  publishes 3 fake transponder_report_s uORB messages

   stop

   status        print status info
```
## mc_rate_control
Source: [modules/mc_rate_control](https://github.com/PX4/PX4-Autopilot/tree/master/src/modules/mc_rate_control)


### 用法
This implements the multicopter rate controller. It takes rate setpoints (in acro mode via `manual_control_setpoint` topic) as inputs and outputs actuator control messages.

The controller has a PID loop for angular rate error.

<a id="mc_rate_control_usage"></a>

### 参数描述
```
mc_rate_control <command> [arguments...]
 Commands:
   start
     [vtol]      VTOL mode

   stop

   status        print status info
```
## navigator
Source: [modules/navigator](https://github.com/PX4/PX4-Autopilot/tree/master/src/modules/navigator)


### 实现
Module that is responsible for autonomous flight modes. This includes missions (read from dataman), takeoff and RTL. It is also responsible for geofence violation checking.

### 示例
The different internal modes are implemented as separate classes that inherit from a common base class `NavigatorMode`. The member `_navigation_mode` contains the current active mode.

Navigator publishes position setpoint triplets (`position_setpoint_triplet_s`), which are then used by the position controller.

<a id="navigator_usage"></a>

### 用法
```
navigator <command> [arguments...]
 Commands:
   start

   fencefile     load a geofence file from SD card, stored at etc/geofence.txt

   fake_traffic  publishes 4 fake transponder_report_s uORB messages

   stop

   status        print status info
```
## rover_pos_control
CLI 命令行用法示例：


### 参数描述
Controls the position of a ground rover using an L1 controller.

Publishes `actuator_controls_0` messages at IMU_GYRO_RATEMAX.

### 实现
Currently, this implementation supports only a few modes:

 * Full manual: Throttle and yaw controls are passed directly through to the actuators
 * Auto mission: The rover runs missions
 * Loiter: The rover will navigate to within the loiter radius, then stop the motors

### 示例
CLI usage example:
```
rover_pos_control start
rover_pos_control status
rover_pos_control stop
```

<a id="rover_pos_control_usage"></a>

### 用法
```
rover_pos_control <command> [arguments...]
 Commands:
   start

   stop

   status        print status info
```
## uuv_att_control
CLI 命令行用法示例：


### 参数描述
Controls the attitude of an unmanned underwater vehicle (UUV).

fw_att_control 是固定翼姿态控制器。

### 用法
Currently, this implementation supports only a few modes:

 * Full manual: Roll, pitch, yaw, and throttle controls are passed directly through to the actuators
 * Auto mission: The uuv runs missions

### Examples
CLI usage example:
```
uuv_att_control start
uuv_att_control status
uuv_att_control stop
```

<a id="uuv_att_control_usage"></a>

### Usage
```
uuv_att_control <command> [arguments...]
 Commands:
   start

   stop

   status        print status info
```
## uuv_pos_control
Source: [modules/uuv_pos_control](https://github.com/PX4/PX4-Autopilot/tree/master/src/modules/uuv_pos_control)


### Description
Controls the attitude of an unmanned underwater vehicle (UUV). Publishes `actuator_controls_0` messages at a constant 250Hz.
### Implementation
Currently, this implementation supports only a few modes:
 * Full manual: Roll, pitch, yaw, and throttle controls are passed directly through to the actuators
 * Auto mission: The uuv runs missions
### Examples
CLI usage example:
```
uuv_pos_control start
uuv_pos_control status
uuv_pos_control stop
```

<a id="uuv_pos_control_usage"></a>

### Usage
```
uuv_pos_control <command> [arguments...]
 Commands:
   start

   stop

   status        print status info
```
## vtol_att_control
Source: [modules/vtol_att_control](https://github.com/PX4/PX4-Autopilot/tree/master/src/modules/vtol_att_control)


### Description
fw_att_control is the fixed wing attitude controller.

<a id="vtol_att_control_usage"></a>

### Usage
```
vtol_att_control <command> [arguments...]
 Commands:

   stop

   status        print status info
```
