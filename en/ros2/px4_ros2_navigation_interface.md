# PX4 ROS 2 Interface Library: Navigation

:::warning Experimental
At time of writing parts of the PX4 ROS 2 Interface Library is experimental, and hence subject to change.
:::

The PX4 ROS 2 Interface Library for navigation enables developers to send their position estimates to PX4 directly using ROS 2.
The interface provides a layer of abstraction from PX4 and the uORB messaging framework, and introduces a few sanity checks on the requested state estimation updates sent via the interface.
These estimates are then fused into the EKF as internal PX4 estimates would.

The library provides two classes `LocalNavigationInterface` and `GlobalNavigationInterface` which both expose a similar `update` method, to either provide a local position update or global position update to PX4, respectively.
The `update` method expects a position estimate `struct` (defined below) which developers can populate with their own generated position estimates.

## Example and First Test

The following steps are required to get started:

1. Make sure you have a working [ROS 2 setup](../ros/ros2_comm.md), with _px4_msgs_ in the ROS 2 workspace.
2. Clone the repository into the workspace:

   ```sh
   cd $ros_workspace/src
   git clone --recursive https://github.com/Auterion/px4-ros2-interface-lib
   ```

   :::note
   To ensure compatibility, use the latest _main_ branches for PX4, _px4_msgs_ and the library.
   See also [here](https://github.com/Auterion/px4-ros2-interface-lib#compatibility-with-px4).
   :::

3. Build the workspace:

   ```sh
   cd ..
   colcon build
   source install/setup.bash
   ```

4. In a different shell, start PX4 SITL:

   ```sh
   cd $px4-autopilot
   make px4_sitl gazebo-classic
   ```

   (here we use Gazebo-Classic, but you can use any model or simulator)

5. Run the micro XRCE agent in a new shell (you can keep it running afterward):

   ```sh
   MicroXRCEAgent udp4 -p 8888
   ```

6. Back in the ROS 2 terminal, run one of the examples which periodically sends dummy global position updates:

   ```shell
   ros2 run example_global_navigation_cpp example_global_navigation_cpp
   ```

   You should get an output like this showing that the global interface is successfully sending position updates:

   ```sh
    [INFO] [1701091243.724149715] [example_global_navigation_node]: example_global_navigation_node running!
    [DEBUG] [1701091244.724443329] [example_global_navigation_node]: Interface returned with: SUCCESS.
    [DEBUG] [1701091245.724394777] [example_global_navigation_node]: Interface returned with: SUCCESS.
   ```

7. On the PX4 shell, you can check that PX4 is receive global position updates:

   ```sh
   listener aux_global_position
   ```

   The output should look like:

   ```sh
   TOPIC: aux_global_position
   aux_global_position
      timestamp: 46916000 (0.528000 seconds ago)
      timestamp_sample: 46916000 (0 us before timestamp)
      lat: 12.343210
      lon: 23.454320
      alt: 12.40000
      alt_ellipsoid: 0.00000
      delta_alt: 0.00000
      eph: 0.31623
      epv: 0.44721
      terrain_alt: 0.00000
      lat_lon_reset_counter: 0
      alt_reset_counter: 0
      terrain_alt_valid: False
      dead_reckoning: False
   ```

8. Now you are ready to use the navigation interface to send your own position updates.

## How to Use the Library

When sending a position estimate, populate a struct with the fields you have estimated.
Then call the interface’s update function with that struct as the argument.
Note that while only the field `timestamp_sample` entry is mandatory, defining an estimate entry (e.g. `velocity_xy`) then requires defining its associated variance value (e.g. `velocity_xy_variance`).

:::note
Using multiple instances of the same interface (e.g. local and local) to send estimation updates will stream all update messages to the same topic and result in cross-talk.
This should not affect estimate fusion into the EKF, but different measurement sources will become indistinguishable.
:::

For a simple example using the interface, check out the [examples in the `Auterion/px4-ros2-interface-lib` repository](https://github.com/Auterion/px4-ros2-interface-lib/tree/main/examples/cpp/navigation), such as [examples/cpp/navigation/local_navigation](https://github.com/Auterion/px4-ros2-interface-lib/blob/main/examples/cpp/navigation/local_navigation/include/local_navigation.hpp) or [examples/cpp/navigation/global_navigation](https://github.com/Auterion/px4-ros2-interface-lib/blob/main/examples/cpp/navigation/local_navigation/include/global_navigation.hpp).

### Local Position Updates

To send a local position estimate populate the `LocalPositionEstimate` struct which is defined as follows:

```cpp
struct LocalPositionEstimate
{
  rclcpp::Time timestamp_sample {};

  // Position
  std::optional<Vector2f> position_xy {std::nullopt};
  std::optional<Vector2f> position_xy_variance {std::nullopt};
  std::optional<float> position_z {std::nullopt};
  std::optional<float> position_z_variance {std::nullopt};

  // Velocity
  std::optional<Vector2f> velocity_xy {std::nullopt};
  std::optional<Vector2f> velocity_xy_variance {std::nullopt};
  std::optional<float> velocity_z {std::nullopt};
  std::optional<float> velocity_z_variance {std::nullopt};

  // Attitude
  std::optional<Quaternionf> attitude_quaternion {std::nullopt};
  std::optional<Vector3f> attitude_variance {std::nullopt};
};
```

The following code snippet is an example of a ROS 2 node which uses the local navigation interface to send 3D pose updates in the North-East-Down reference frame to PX4:

```cpp
class MyLocalEstimateUpdateNode : public rclcpp::Node
{
public:
   MyLocalEstimateUpdateNode()
   : Node("my_node_name")
   {
      // Set pose estimate reference frame to north-east-down
      const uint8_t pose_frame = AuxLocalPosition::POSE_FRAME_NED;
      // We will only send pose estimates in this example
      // Set velocity estimate reference frame to unknown
      const uint8_t velocity_frame = AuxLocalPosition::VELOCITY_FRAME_UNKNOWN;
      // Initialize local navigation interface
      _local_navigation_interface =
         std::make_shared<px4_ros2::LocalNavigationInterface>(*this, pose_frame, velocity_frame);
   }

   void sendUpdate()
   {
      while (running) { // Potentially make method run as a callback or on a timer
         // Generate local position estimate
         timestamp_sample  = ...
         position_xy = ...
         position_xy_variance = ...
         position_z = ...
         position_z_variance = ...

         // Populate the local position estimate struct
         px4_ros2::LocalPositionEstimate local_position_estimate{};
         local_position_estimate.timestamp_sample = timestamp_sample;
         local_position_estimate.position_xy = position_xy;
         local_position_estimate.position_xy_variance = position_xy_variance;
         local_position_estimate.position_z = position_z;
         local_position_estimate.position_z_variance = position_z_variance;

         // Send estimate to PX4 using the interface
         auto retcode = _local_navigation_interface->update(local_position_estimate);

         // Log return code for debugging
         RCLCPP_DEBUG(get_logger(), "Interface returned with: %s.", px4_ros2::resultToString(retcode));
      }
   }

private:
   std::shared_ptr<px4_ros2::LocalNavigationInterface> _local_navigation_interface;
};
```

### Global Position Updates

To send a global position estimate populate the `GlobalPositionEstimate` struct which is defined as follows:

```cpp
struct GlobalPositionEstimate
{
  rclcpp::Time timestamp_sample {};

  // Lat lon
  std::optional<Vector2d> lat_lon {std::nullopt};
  // Variance of horizontal position error (metres)
  std::optional<float> horizontal_variance {std::nullopt};

  // Altitude (MSL frame)
  std::optional<float> altitude_msl {std::nullopt};
  // Variance of vertical position error (meters)
  std::optional<float> vertical_variance {std::nullopt};
};
```

The following code snippet is an example of a ROS 2 node which uses the global navigation interface to send a latitude, longitude and altitude estimate to PX4:

```cpp
class MyGlobalEstimateUpdateNode : public rclcpp::Node
{
public:
   MyGlobalEstimateUpdateNode()
   : Node("my_node_name")
   {
     // Initialize global navigation interface
     _global_navigation_interface =
      std::make_shared<px4_ros2::GlobalNavigationInterface>(*this);
   }

   void sendUpdate()
   {
      while (running) { // Potentially make method run as a callback or on a timer
         // Generate global position estimate
         timestamp_sample  = ...
         lat_lon = ...
         horizontal_variance = ...
         altitude_msl = ...
         vertical_variance = ...

         // Populate the global position estimate struct
         px4_ros2::GlobalPositionEstimate global_position_estimate{};
         global_position_estimate.timestamp_sample = timestamp_sample;
         global_position_estimate.lat_lon = lat_lon;
         global_position_estimate.horizontal_variance = horizontal_variance;
         global_position_estimate.altitude_msl = altitude_msl;
         global_position_estimate.vertical_variance = vertical_variance;

         // Send estimate to PX4 using the interface
         auto retcode = _global_navigation_interface->update(local_position_estimate);

         // Log return code for debugging
         RCLCPP_DEBUG(get_logger(), "Interface returned with: %s.", px4_ros2::resultToString(retcode));
      }
   }

private:
   std::shared_ptr<px4_ros2::GlobalNavigationInterface> _global_navigation_interface;
};
```
