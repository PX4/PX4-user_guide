---
canonicalUrl: https://docs.px4.io/main/zh/simulation/multi_vehicle_flightgear
---

# 用 FlightGear 进行多机仿真

本节介绍如何在SITL中使用 FlightGear 进行多机仿真 所有车辆实例都有其启动脚本定义的参数。

:::note
This is the most environmentally realistic way to simulate multiple vehicles running PX4, and allows easy testing of multiple different types of vehicles. It is suitable for testing multi-vehicle support in *QGroundControl*, [MAVSDK](https://mavsdk.mavlink.io/), etc.

每个实例都应该有自己的启动脚本，可以代表完全不同的载具类型。 对于准备好的脚本，你应该看到以下视图。

## 如何启动多机实例

To start multiple instances (on separate ports and IDs):

1. 确定 [支持多机的 PX4 分支](https://github.com/ThunderFly-aerospace/PX4Firmware/tree/flightgear-multi)（查阅ThunderFly-aerospace）：
   ```bash
   git clone https://github.com/ThunderFly-aerospace/PX4Firmware.git
   cd PX4Firmware
   git checkout flightgear-multi  
   ```
1. 使用标准工具链构建PX4固件（并已安装 FlightGear）。
1. 使用 [预定义脚本](https://github.com/ThunderFly-aerospace/PX4-FlightGear-Bridge/tree/master/scripts) 启动第一个实例：
   ```bash
   cd ./Tools/flightgear_bridge/scripts
   ./vehicle1.sh
   ```
1. 使用另一个脚本开始后续实例：
   ```bash
   ./vehicle2.sh
   ```

Each instance should have its own startup script, which can represent a completely different vehicle type. For prepared scripts you should get the following view.

![Multi-vehicle simulation using PX4 SITL and FlightGear](../../assets/simulation/flightgear/flightgear-multi-vehicle-sitl.jpg)

Ground stations such as *QGroundControl* connect to all instances using the normal UDP port 14550 (all traffic goes to the same port).

The number of simultaneously running instances is limited mainly by computer resources. FlightGear is a single-thread application, but aerodynamics solvers consume a lot of memory. Therefore splitting to multiple computers and using a [multiplayer server](https://wiki.flightgear.org/Howto:Multiplayer) is probably required to run *many* vehicle instances.

## 额外资源

* 查看 [仿真](../simulation/README.md) 章节查看端口配置的更多信息。
