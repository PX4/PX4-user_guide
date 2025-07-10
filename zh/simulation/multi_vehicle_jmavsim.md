---
canonicalUrl: https://docs.px4.io/main/zh/simulation/multi_vehicle_jmavsim
---

# 使用 JMAVSim 进行多飞行器仿真

本主题介绍如何使用 JMAVSim和 SITL 模拟多架 (多旋翼) 无人机。 在仿真中所有无人机实例均在同一位置启动。

:::tip
This is the easiest way to simulate multiple vehicles running PX4. It is suitable for testing multi-vehicle support in *QGroundControl* (or the [MAVSDK](https://mavsdk.mavlink.io/), etc.). [Multi-Vehicle Simulation with Gazebo](../simulation/multi-vehicle-simulation.md) should be used for swarm simulations with many vehicles, or for testing features like computer vision that are only supported by Gazebo.
:::


## 如何启动多个飞行器实例

To start multiple instances (on separate ports):

1. 编译 PX4 `make px4_sitl_default`
   ```
   make px4_sitl_default
   ```
1. 运行 **sitl_multiple_run.sh**, 指定要启动的飞行器的实例数目 (例如 2): `./Tools/sitl_multiple_run.sh 2`
   ```
   ./Tools/sitl_multiple_run.sh 2
   ```
1. 启动第一个实例: `./Tools/jmavsim_run.sh`
   ```
   ./Tools/jmavsim_run.sh -l
   ```
1. 启动后续实例，并为该实例指定 *仿真* UDP 端口（所有命令应在同一行输入，以空格键隔开，完成输入后直接回车运行，此时由于所有实例的启动位置都相同所以无法分辨启动的实例个数，可通过查看端口号进行查询）： `./Tools/jmavsim_run.sh -p 14561` 端口号应设置为 `14560+i` for `i` in `[0, N-1]`。
   ```
   ./Tools/jmavsim_run.sh -p 4561 -l
   ```
   端口号应该被设置为 `4560+i` ， `i` 的范围为 `[0, N-1]` 。

像 *MAVSDK* 或者 *MAVROS* 开发者 APIs 接口就是通过连接 UDP 接口 14540 （第一个实例）， UDP 接口 14541（第二个实例），以此类推。

Developer APIs such as *MAVSDK* or *MAVROS* listen on sequentially allocated PX4 remote UDP ports from `14540` (first instance) to `14549`. Additional instances *all* connect to port `14549`.

## 额外资源

* 更多UDP端口配置请参考 [Simulation](../simulation/README.md)。
