---
canonicalUrl: https://docs.px4.io/main/ru/simulation/multi_vehicle_jmavsim
---

# Multi-Vehicle Simulation with JMAVSim

This topic explains how to simulate multiple UAV (multicopter) vehicles using JMAVSim and SITL. All vehicle instances are started at the same position in the simulation.

:::tip
This is the easiest way to simulate multiple vehicles running PX4. It is suitable for testing multi-vehicle support in *QGroundControl* (or the [MAVSDK](https://mavsdk.mavlink.io/), etc.). [Multi-Vehicle Simulation with Gazebo](../simulation/multi-vehicle-simulation.md) should be used for swarm simulations with many vehicles, or for testing features like computer vision that are only supported by Gazebo.
:::


## How to Start Multiple Instances

To start multiple instances (on separate ports):

1. Build PX4
   ```
   make px4_sitl_default
   ```
1. Run **sitl_multiple_run.sh**, specifying the number of instances to start (e.g. 2):
   ```
   ./Tools/sitl_multiple_run.sh 2
   ```
1. Start the first instance:
   ```
   ./Tools/jmavsim_run.sh -l
   ```
1. Start subsequent instances, specifying the *simulation* TCP port for the instance:
   ```
   ./Tools/jmavsim_run.sh -p 4561 -l
   ```
   The port should be set to `4560+i` for `i` in `[0, N-1]`.

Ground stations such as *QGroundControl* listen for all vehicle instances on the PX4's remote UDP port: `14550` (all GCS traffic is sent to the *same* remote port).

Developer APIs such as *MAVSDK* or *MAVROS* listen on sequentially allocated PX4 remote UDP ports from `14540` (first instance) to `14549`. Additional instances *all* connect to port `14549`.

## Additional Resources

* See [Simulation](../simulation/README.md) for more information about the port configuration.
