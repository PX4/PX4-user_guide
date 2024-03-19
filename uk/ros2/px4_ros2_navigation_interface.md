# PX4 ROS 2 Navigation Interface

<Badge type="warning" text="main (PX4 v1.15)" /> <Badge type="warning" text="Experimental" />

:::warning
Experimental
At the time of writing, parts of the PX4 ROS 2 Interface Library are experimental, and hence subject to change.
:::

The [PX4 ROS 2 Interface Library](../ros2/px4_ros2_interface_lib.md) navigation interface enables developers to send their position measurements to PX4 directly from ROS 2 applications, such as a VIO system or a map matching system.
The interface provides a layer of abstraction from PX4 and the uORB messaging framework, and introduces a few sanity checks on the requested state estimation updates sent via the interface.
These measurements are then fused into the EKF just as though they were internal PX4 measurements.

The library provides two classes, [`LocalPositionMeasurementInterface`](https://auterion.github.io/px4-ros2-interface-lib/classpx4__ros2_1_1LocalPositionMeasurementInterface.html) and [`GlobalPositionMeasurementInterface`](https://auterion.github.io/px4-ros2-interface-lib/classpx4__ros2_1_1GlobalPositionMeasurementInterface.html), which both expose a similar `update` method to provide either a local position or global position update to PX4, respectively.
The `update` method expects a position measurement `struct` ([`LocalPositionMeasurement`](https://auterion.github.io/px4-ros2-interface-lib/structpx4__ros2_1_1LocalPositionMeasurement.html) or [`GlobalPositionMeasurement`](https://auterion.github.io/px4-ros2-interface-lib/structpx4__ros2_1_1GlobalPositionMeasurement.html)) which developers can populate with their own generated position measurements.

## Installation and First Test

The following steps are required to get started:

1. Make sure you have a working [ROS 2 setup](../ros/ros2_comm.md), with [`px4_msgs`](https://github.com/PX4/px4_msgs) in the ROS 2 workspace.

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
   ```

4. In a different shell, start PX4 SITL:

   ```sh
   ```

   (here we use Gazebo-Classic, but you can use any model or simulator)

5. In yet a different shell, run the micro XRCE agent (you can keep it running afterward):

   ```sh
   ```

6. Back in the ROS 2 terminal, source the workspace you just built (in step 3) and run the [global_navigation](https://github.com/Auterion/px4-ros2-interface-lib/tree/main/examples/cpp/navigation/global_navigation) example, which periodically sends dummy global position updates:

   ```sh
   ```

   You should get an output like this showing that the global interface is successfully sending position updates:

   ```sh
   [INFO] [1702030701.836897756] [example_global_navigation_node]: example_global_navigation_node running!
   [DEBUG] [1702030702.837279784] [example_global_navigation_node]: Successfully sent position update to navigation interface.
   [DEBUG] [1702030703.837223884] [example_global_navigation_node]: Successfully sent position update to navigation interface.
   ```

7. In the PX4 shell, you can check that PX4 receives global position updates:

   ```sh
   listener aux_global_position
   ```

   The output should look like:

   ```sh
   ```

8. Now you are ready to use the navigation interface to send your own position updates.

## How to use the Library

To send a position measurement, you populate the position struct with the values you have measured.
Then call the interface's update function with that struct as the argument.

For a basic example of how to use this interface, check out the [examples](https://github.com/Auterion/px4-ros2-interface-lib/tree/main/examples/cpp/navigation) in the `Auterion/px4-ros2-interface-lib` repository, such as [examples/cpp/navigation/local_navigation](https://github.com/Auterion/px4-ros2-interface-lib/blob/main/examples/cpp/navigation/local_navigation/include/local_navigation.hpp) or [examples/cpp/navigation/global_navigation](https://github.com/Auterion/px4-ros2-interface-lib/blob/main/examples/cpp/navigation/local_navigation/include/global_navigation.hpp).

### Local Position Updates

First ensure that the PX4 parameter [`EKF2_EV_CTRL`](../advanced_config/parameter_reference.md#EKF2_EV_CTRL) is properly configured to fuse external local measurements, by setting the appropriate bits to `true`:

- `0`: Horizontal position data
- `1`: Vertical position data
- `2`: Velocity data
- `3`: Yaw data

To send a local position measurement to PX4:

1. Create a [`LocalPositionMeasurementInterface`](https://auterion.github.io/px4-ros2-interface-lib/classpx4__ros2_1_1LocalPositionMeasurementInterface.html) instance by providing it with: a ROS node, and the pose and velocity reference frames of your measurements.
2. Populate a [`LocalPositionMeasurement`](https://auterion.github.io/px4-ros2-interface-lib/structpx4__ros2_1_1LocalPositionMeasurement.html) `struct` with your measurements.
3. Pass the `struct` to the `LocalPositionMeasurementInterface` [`update()`](https://auterion.github.io/px4-ros2-interface-lib/classpx4__ros2_1_1LocalPositionMeasurementInterface.html#a6fd180b944710716d418b2cfe1c0c8e3) method.

The available pose and velocity reference frames for your measurements are defined by the following `enum`:

```cpp
```

The `LocalPositionMeasurement` struct is defined as follows:

```cpp
```

The `update()` method of the local interface expects the following conditions to hold for `LocalPositionMeasurement`:

- The sample timestamp is defined.
- Values do not have a \`NAN\`\`.
- If a measurement value is provided, its associated variance value is well defined (e.g. if `position_xy` is defined, then `position_xy_variance` must be defined).
- If a measurement value is provided, its associated reference frame is not unknown (e.g. if `position_xy` is defined, then the interface was initialised with a pose frame different from `PoseFrame::Unknown`).

The following code snippet is an example of a ROS 2 node which uses the local navigation interface to send 3D pose updates in the North-East-Down (NED) reference frame to PX4:

```cpp
```

###

First ensure that the PX4 parameter [`EKF2_AGP_CTRL`](../advanced_config/parameter_reference.md#EKF2_AGP_CTRL) is properly configured to fuse external global measurements, by setting the appropriate bits to `true`:

- `0`: Horizontal position data
- `1`: Vertical position data

To send a global position measurement to PX4:

1. Create a [`GlobalPositionMeasurementInterface`](https://auterion.github.io/px4-ros2-interface-lib/classpx4__ros2_1_1GlobalPositionMeasurementInterface.html) instance by providing it with a ROS node.
2. Populate a [`GlobalPositionMeasurement`](https://auterion.github.io/px4-ros2-interface-lib/structpx4__ros2_1_1GlobalPositionMeasurement.html) `struct` with your measurements.
3. Pass the struct to the `GlobalPositionMeasurementInterface` [update()](https://auterion.github.io/px4-ros2-interface-lib/classpx4__ros2_1_1GlobalPositionMeasurementInterface.html#a1a183b595ef7f6a22f3a83ba543fe86d) method.

The `GlobalPositionMeasurement` struct is defined as follows:

```cpp
```

The `update()` method of the global interface expects the following conditions to hold for `GlobalPositionMeasurement`:

- The sample `timestamp_sample` is defined.
- Values do not have a NAN.
- If a measurement value is provided, its associated variance value is well defined (e.g. if `lat_lon` is defined, then `horizontal_variance` must be defined).

The following code snippet is an example of a ROS 2 node which uses the global navigation interface to send a measurement with latitude, longitude and altitude to PX4:

```cpp
```

## Multiple Instances of an Interface

Using multiple instances of the same interface (e.g. local and local) to send estimation updates will stream all update messages to the same topic and result in cross-talk.
This should not affect measurement fusion into the EKF, but different measurement sources will become indistinguishable.
