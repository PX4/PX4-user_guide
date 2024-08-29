# Realtime uORB Debugging

This topic shows how you can monitor [uORB messages](../msg_docs/index.md) in realtime using [PlotJuggler](../log/flight_log_analysis.md#plotjuggler) and the [uXRCE-DDS Agent](../middleware/uxrce_dds.md).

This uses the PX4 uXRCE-DDS middleware to export uORB topics as ROS2 topics, which can then be read in by PlotJuggler as they change.

The video below demonstrates this for a simulated vehicle.

<video src="../../assets/debug/realtime_debugging/realtime_debugging.mp4" width="720" controls></video>

## Prerequisites

Follow the [ROS 2 Installation & Setup](../ros2/user_guide.md#installation-setup) instructions in the _ROS2 user guide_ to install:

- ROS 2
- [Micro XRCE-DDS Agent](../ros2/user_guide.md#setup-micro-xrce-dds-agent-client)
- [PX4/px4_msgs](https://github.com/PX4/px4_msgs): ROS2 Message definitions.
- PX4. Note that PX4 source code is only needed if you're using the simulator, or if you want to monitor messages that aren't streamed by default.

You will also need to install:

- [PlotJuggler for ROS2](https://github.com/facontidavide/PlotJuggler)

  ::: tip
  Use the Debian packages (the snap files are not supported).
  :::

## Usage

First we have to make sure that our _px4_msgs_ package is built and sourced.
```sh
cd ~/ros2_ws/
colcon build
source install/setup.bash
```

Then run PlotJuggler by entering the following commands in a terminal:

```sh
ros2 run plotjuggler plotjuggler
```

To start sending ROS 2 topics from PX4 the uXRCE-DDS **client** has to be running on PX4, and the `MicroXRCEAgent` has to be running on the same computer as PlotJuggler.
If you're using the Simulator then the client is started automatically but you will have to start the `MicroXRCEAgent`.

Start the `MicroXRCEAgent` in a separate terminal (connecting to the Simulator):

```sh
MicroXRCEAgent udp4 -p 8888; exec bash
```

That's all that should be needed for connecting to the simulator.

If you're working with hardware you'll need to start the client on PX4 and your connection command will be slightly different.
[Using flight controller hardware](../ros2/user_guide.md#using-flight-controller-hardware) in the _ROS 2 User Guide_ provides links to setup information.

## Unavailable/New Messages

All PX4 message definitions from `main` are exported to the [PX4/px4_msgs](https://github.com/PX4/px4_msgs) repository.
These must be imported into your ROS 2 workspace, allowing PlotJuggler to interpret messages from PX4.

::: info
Exporting the messages allows ROS 2 and the uXRCE-DDS agent to be independent of PX4, which is why you only need the PX4 source code if you need to build the simulator.
:::

While `px4_msgs` has messages for all uORB topics in PX4, not all messages in `px4_msgs` are available to ROS 2/PlotJuggler by default.
The set that are available must be built into the client running on PX4.
These are defined in [dds_topics.yaml](https://github.com/PX4/PX4-Autopilot/blob/main/src/modules/uxrce_dds_client/dds_topics.yaml).

The instructions below explain the changes needed to monitor topics that are not available by default.

### Missing Topics

If a normal uORB topic is not available in PlotJuggler you will need to modify the [dds_topics.yaml](https://github.com/PX4/PX4-Autopilot/blob/main/src/modules/uxrce_dds_client/dds_topics.yaml) to include the topic and rebuild PX4.

If working with real hardware you will need to build and [install](../config/firmware.md#installing-px4-main-beta-or-custom-firmware) custom firmware after changing the YAML file.

### Modified Messages

If you have modified any uORB messages you must update the ROS2 messages used by PlotJuggler.

You will need to rebuild PX4 with your new messages, and replace the `px4_msgs` (from the repository) in your workspace with the new ones.

Assuming that you have already built PX4 in the directory `~/PX4-Autopilot/`, and that `~/ros2_ws` is your ROS2 workspace, enter the following commands to copy the messages across and rebuild your workspace:

```sh
rm -f ~/ros2_ws/src/px4_msgs/msg/*.msg
cp ~/PX4-Autopilot/msg/*.msg ~/ros2_ws/src/px4_msgs/msg/
cd ~/ros2_ws/ && colcon build
```

### Custom Topics

After defining the topic, follow the instructions above to add the topic to [dds_topics.yaml](https://github.com/PX4/PX4-Autopilot/blob/main/src/modules/uxrce_dds_client/dds_topics.yaml), and export the new message into your ROS 2 workspace.

## See also

[ROS 2 User Guide](../ros2/user_guide.md)
