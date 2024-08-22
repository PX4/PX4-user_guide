# Realtime Debugging
There is the option to monitor UORB messages in realtime using plotjuggler and MicroXRCEAgent greatly simplifying the debugging possibility for development.

This works by using uXRCE-DDS to translate UORB topics to ROS2 Topics, which can be read in realtime by PlotJuggler.

Below we can see how the ROS topics in Plotjuggler get updated based on the simulated vehicle on the left.
<video src="../../assets/debug/realtime_debugging/realtime_debugging.mp4" width="720" controls></video>

## Prerequisites:
For this you need:
- ROS2 (for installation follow the [ROS2 user guide](../ros2/user_guide.md))
- The ROS2 Message definitions. ([px4_msgs](https://github.com/PX4/px4_msgs))
- [Micro XRCE-DDS Agent](../ros2/user_guide.md#setup-micro-xrce-dds-agent-client)
- [Plotjuggler for ROS2](https://github.com/facontidavide/PlotJuggler) (not the snap)



## Usage

To stream the UORB Topics to ROS2 and visuaize it in Plotjuggler, you just have to run those two commands in two seperate terminals:

`ros2 run plotjuggler plotjuggler`

`MicroXRCEAgent udp4 -p 8888; exec bash`

### Custom Topics
the topics used by uXRCE-DDS are defined in the [dds_topics.yaml](https://github.com/PX4/PX4-Autopilot/blob/main/src/modules/uxrce_dds_client/dds_topics.yaml) File.
if you want to add custom topics or expand on existing ones you have to add them to this file.
### Modified Messages
if you modified UORB messages you have to make sure to update the ROS2 messages in px4_msgs. 
for this first remove the existing message definitions, then build the px4_msgs package.

::: info
The code below is assuming `~/ros2_ws` is your ROS2 workspace

```
rm -f ~/ros2_ws/src/px4_msgs/msg/*.msg
cp ~/PX4-Autopilot/msg/*.msg ~/ros2_ws/src/px4_msgs/msg/ 
cd ~/ros2_ws/ && colcon build
```
