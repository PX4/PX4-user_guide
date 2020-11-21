# JMAVSim 进行多机仿真

本节介绍如何在SITL中使用 FlightGear 进行多机仿真 所有车辆实例都有其启动脚本定义的参数。

> **注意** 这是运行PX代码进行多机仿真最真实的方式， 并且能够方便地测试多种不同类型的无人机。 它适合使用 *QGroundControl*, [MAVSDK](https://mavsdk.mavlink.io/)等工具进行多机测试。 [Gazebo进行多机仿真](../simulation/multi-vehicle-simulation.md) 应改为用于使用许多车辆的种群模拟，并测试只有Gazebo支持的计算机视图等功能。


## 如何启动多机实例

启动多个实例 (使用单独的端口和 ID)：

1. 确定 [支持多机的PX4 分支](https://github.com/ThunderFly-aerospace/PX4Firmware/tree/flightgear-multi) (查阅ThunderFly-aerospace)：
   ```bash
   git clone https://github.com/ThunderFly-aerospace/PX4Firmware.git
   cd PX4Firmware
   git checkout flightgear-multi  
   ```
1. 使用标准工具链构建PX4固件(已安装 FlightGear )。
1. 使用 [预定义脚本](https://github.com/ThunderFly-aerospace/PX4-FlightGear-Bridge/tree/master/scripts) 启动第一个实例：
   ```bash
   cd ./Tools/flightgear_bridge/scripts
   ./vehicle1.sh
   ```
1. 使用另一个脚本开始后续实例：
   ```bash
   ./vehicle2.sh
   ```

每个实例都应该有自己的启动脚本，可以代表完全不同的载具类型。 对于准备好的脚本，你应该看到以下视图。

![Multi-vehicle simulation using PX4 SITL and FlightGear](../../assets/simulation/flightgear/flightgear-multi-vehicle-sitl.jpg)

*QGroundControl* 和开发者 APIs (比如 Dronecode SDK) 可以通过代码默认端口连接到所有实例（分别为14550 和 14540）。

The number of simultaneously running instances is limited mainly by computer resources. FlightGear is a single-thread application, but aerodynamics solvers consume a lot of memory. Therefore splitting to multiple computers and using a [multiplayer server](http://wiki.flightgear.org/index.php?title=Howto:Multiplayer) is probably required to run *many* vehicle instances.

## 额外资源

* 看 [仿真](../simulation/README.md) 接口配置的更多信息。
