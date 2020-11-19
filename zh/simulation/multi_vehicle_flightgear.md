# Multi-Vehicle Simulation with FlightGear

This topic explains how to simulate multiple vehicles using FlightGear in SITL. All vehicle instances have parameters defined by their startup scripts.

> **Note** This is the most environmentally realistic way to simulate multiple vehicles running PX, and allows easy testing of multiple different types of vehicles. It is suitable for testing multi-vehicle support in *QGroundControl*, [MAVSDK](https://mavsdk.mavlink.io/), etc. [Multi-Vehicle Simulation with Gazebo](../simulation/multi-vehicle-simulation.md) should be used instead for: swarm simulations with many vehicles, and testing features like computer vision that are only supported by Gazebo.


## 如何启动多机实例

To start multiple instances (on separate ports and IDs):

1. Checkout the [PX4 branch that supports multiple vehicles](https://github.com/ThunderFly-aerospace/PX4Firmware/tree/flightgear-multi) (at ThunderFly-aerospace):
   ```bash
   git clone https://github.com/ThunderFly-aerospace/PX4Firmware.git
   cd PX4Firmware
   git checkout flightgear-multi  
   ```
1. Build the PX4 Firmware using the standard toolchain (with FlightGear installed).
1. Start the first instance using the [predefined scripts](https://github.com/ThunderFly-aerospace/PX4-FlightGear-Bridge/tree/master/scripts):
   ```bash
   cd ./Tools/flightgear_bridge/scripts
   ./vehicle1.sh
   ```
1. Start subsequent instances using another script:
   ```bash
   ./vehicle2.sh
   ```

Each instance should have its own startup script, which can represent a completely different vehicle type. For prepared scripts you should get the following view.

![Multi-vehicle simulation using PX4 SITL and FlightGear](../../assets/simulation/flightgear/flightgear-multi-vehicle-sitl.jpg)

*QGroundControl* 和开发者 APIs (比如 Dronecode SDK) 可以通过代码默认端口连接到所有实例（分别为14550 和 14540）。

The number of simultaneously running instances is limited mainly by computer resources. FlightGear is a single-thread application, but aerodynamics solvers consume a lot of memory. Therefore splitting to multiple computers and using a [multiplayer server](http://wiki.flightgear.org/index.php?title=Howto:Multiplayer) is probably required to run *many* vehicle instances.

## 额外资源

* 看 [仿真](../simulation/README.md) 接口配置的更多信息。
