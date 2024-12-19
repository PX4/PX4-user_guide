# PX4 ROS 2 Message Translation Node

<Badge type="tip" text="main (PX4 v1.16+)" /> <Badge type="warning" text="Experimental" />

The message translation node allows ROS 2 applications that were compiled against different versions of the PX4 messages to interwork with newer versions of PX4, and vice versa, without having to change either the application or the PX4 side.

Specifically for this to work, topic publication/subscription/service names contain a message version in the form of `<topic_name>_v<version>`.

Specifically, the translation node knows about all message versions previously defined by PX4, and dynamically monitors the publications, subscriptions and services, translating them into the current versions expected by the application and PX4 as needed.

## Installation

1. Create a ROS 2 workspace in which to build the message translation node and its dependencies.

   ```sh
   mkdir -p /path/to/ros_ws/src
   ```

2. Run the following helper script to copy the message definitions and translation node into your ROS workspace directory.

   ```sh
   cd /path/to/ros_ws
   /path/to/PX4-Autopilot/Tools/copy_to_ros_ws.sh .
   ```

3. Build and source the workspace.

   ```sh
   colcon build
   source /path/to/ros_ws/install/setup.bash
   ```
4. Finally, run the translation node.

   ```sh
   ros2 run translation_node translation_node_bin
   ```

    You should see an output similar to:

   ```sh
   [INFO] [1734525720.729530513] [translation_node]: Registered pub/sub topics and versions:
   [INFO] [1734525720.729594413] [translation_node]: Registered services and versions:
   ```

## Updating a Message

When changing a message, a new version needs to be added.

The steps are:

- Increment `MESSAGE_VERSION` in the current message definition (the one in `msg/versioned/`).
  Make the other changes to message fields that prompted the version change.
  For example `msg/versioned/VehicleAttitude.msg` becomes `px4_msgs_old/msg/VehicleAttitudeV3.msg`.
  Update the existing translations that use the current topic version to the now old version.
  For example `px4_msgs::msg::VehicleAttitude` becomes `px4_msgs_old::msg::VehicleAttitudeV3`.
- Increment `MESSAGE_VERSION` and update the message fields as desired.
- Add a version translation by adding a new translation header. Examples: (TODO: update GitHub urls)
  - [`translations/example_translation_direct_v1.h`](https://github.com/PX4/PX4-Autopilot/blob/message_versioning_and_translation/msg/translation_node/translations/example_translation_direct_v1.h)
  - [`translations/example_translation_multi_v2.h`](https://github.com/PX4/PX4-Autopilot/blob/message_versioning_and_translation/msg/translation_node/translations/example_translation_multi_v2.h)
  - [`translations/example_translation_service_v1.h`](https://github.com/PX4/PX4-Autopilot/blob/message_versioning_and_translation/msg/translation_node/translations/example_translation_service_v1.h)
- Include the added header in [`translations/all_translations.h`](https://github.com/PX4/PX4-Autopilot/blob/message_versioning_and_translation/msg/translation_node/translations/all_translations.h).

For the second last step and for topics, there are two options:

1. Direct translations: these translate a single topic between two different versions.
  This is the simpler case and should be preferred if possible.
2. Generic case: this allows a translation between N input topics and M output topics.
  This can be used for merging or splitting a message.
  Or for example when moving a field from one message to another, a single translation should be added with the two older message versions as input and the two newer versions as output.
  This way there is no information lost when translating forward or backward.

::: warning
If a nested message definition changes, all messages including that message also require a version update.
This is primarily important for services.
:::

## Usage in ROS

The message version can be added generically to a topic like this:

```c++
topic_name + "_v" + std::to_string(T::MESSAGE_VERSION)
```

Where `T` is the message type, e.g. `px4_msgs::msg::VehicleAttitude`.

The DDS client in PX4 automatically adds the version suffix if a message contains the field `uint32 MESSAGE_VERSION = x`.

::: info
Version 0 of a topic means that no `_v<version>` suffix should be added.
:::

## Implementation Details

The translation node dynamically monitors the topics and services.
It then instantiates the countersides of the publications and subscribers as required.
For example if there is an external publisher for version 1 of a topic and subscriber for version 2.

Internally, it maintains a graph of all known topic and version tuples (which are the graph nodes).
The graph is connected by the message translations.
As arbitrary message translations can be registered, the graph can have cycles and multiple paths from one node to another.
Therefore on a topic update, the graph is traversed using a shortest path algorithm.
When moving from one node to the next, the message translation method is called with the current topic data.
If a node contains an instantiated publisher (because it previously detected an external subscriber), the data is published.
Thus, multiple subscribers of any version of the topic can be updated with the correct version of the data.

For translations with multiple input topics, the translation continues once all input messages are available.

## Limitations

- The current implementation depends on a service API that is not yet available in ROS Humble, and therefore does not support services when built for ROS Humble.
- Services only support a linear history, i.e. no message splitting or merging
- Having both publishers and subscribers for two different versions of a topic is currently not handled by the translation node and would trigger infinite circular publications.
  This could be extended if required.

Original document with requirements: https://docs.google.com/document/d/18_RxV1eEjt4haaa5QkFZAlIAJNv9w5HED2aUEiG7PVQ/edit?usp=sharing
