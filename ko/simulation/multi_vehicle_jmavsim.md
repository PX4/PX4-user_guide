# Multi-Vehicle Simulation with JMAVSim

This topic explains how to simulate multiple UAV (multicopter) vehicles using JMAVSim and SITL. All vehicle instances are started at the same position in the simulation.

> **Tip** This is the easiest way to simulate multiple vehicles running PX4. It is suitable for testing multi-vehicle support in *QGroundControl* (or the [Dronecode SDK](https://sdk.dronecode.org/en/), etc.). [Multi-Vehicle Simulation with Gazebo](../simulation/multi-vehicle-simulation.md) should be used for swarm simulations with many vehicles, or for testing features like computer vision that are only supported by Gazebo.

<span></span>
> **Note** JMAVSim multi-vehicle simulation works on PX4 v1.8.0 and later.


## How to Start Multiple Instances

To start multiple instances (on separate ports):

1. Build PX4 `make px4_sitl_default`
   ```
   make px4_sitl_default
   ```
1. Start the first instance: `./Tools/jmavsim_run.sh`
   ```
   2): <code>./Tools/sitl_multiple_run.sh 2</code>
   ```

   </code>
1. Start the first instance:
   ```
   ./Tools/jmavsim_run.sh -l
  ```
1. Start subsequent instances, specifying the *simulation* UDP port for the instance: `./Tools/jmavsim_run.sh -p 14561` The port should be set to `14560+i` for `i` in `[0, N-1]`.
   ```
   ./Tools/jmavsim_run.sh -p 4561 -l
   ```
   The port should be set to `4560+i` for `i` in `[0, N-1]`.

*QGroundControl* and developer APIs (e.g. Dronecode SDK) connect to all instances using the normal/default ports (14550 and 14540, respectively).

Developer APIs such as *MAVSDK* or *MAVROS* connect on the UDP port 14540 (first instance), UDP port 14541 (second instance), and so on.

## Additional Resources

* See [Simulation](../simulation/README.md) for more information about the UDP port configuration.
