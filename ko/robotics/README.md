---
canonicalUrl: https://docs.px4.io/main/ko/robotics/README
---

# 로봇공학

Drone APIs let you write code to control and integrate with PX4-powered vehicles, without having to understand intimate details of the vehicle and flight stack, or having to think about safety-critical behaviour.

PX4는 [MAVSDK](https://mavsdk.mavlink.io/) 및 [ROS](../ros/README.md)를 포함하는 로봇 공학 API와 함께 사용할 수 있습니다. [DroneKit](../robotics/dronekit.md) 도 사용 가능하지만, PX4에 최적화되지 않았습니다. Under the the hood the APIs communicate with PX4 using [MAVLink](../middleware/mavlink.md) or [RTPS](../middleware/micrortps.md).

PX4 supports the following SDKs/Robotics tools:
- [MAVSDK](https://mavsdk.mavlink.io/)
- [ROS2](../ros/README.md)
- [ROS1](../ros/README.md)

## What API should I use?

We recommend using MAVSDK where possible, primarily because it is far more intuitive and easier to learn. It can also run on more operating systems and less performant-hardware.

You may prefer ROS if you already know how to use it, or if you want to leverage pre-existing integrations (for example computer vision tasks). More generally, ROS is likely to be a better choice for tasks that require very low latency or a deeper integration with PX4 than is provided by MAVLink.

The main difference are:

- **MAVSDK:**
  - Intuitive and optimised for drones, with a small learning curve and easy setup.
  - You can write apps in C++, Python, Swift, Java, Go, and more.
  - Runs on resource-constrained hardware
  - Runs on broad range of OSs, including Android, Linux, Windows.
  - Communicates over MAVLink.
    - Stable and widely supported.
    - Limited to MAVLink services - needed information may not be exposed.
    - Latency may be too high for some use cases.
- **ROS:**
  - General-purpose robotics API that has been extended to support drone integration:
    - Conceptually not as well optimised for drones
    - Significant learning curve
  - Many pre-existing libraries: useful for code-reuse.
  - Supports C++ and Python libraries
  - Runs on Linux
  - ROS2 is the latest version, which connects via DDS.
    - DDS interface layer allows deep integration into any aspect of PX4 that is exposed as a UORB topic (almost everything).
    - Can provide much lower latency.
    - Still under development. At time of writing requires a deeper understanding of PX4 than ROS1
  - ROS1 is older version that can connect over MAVLink or via ROS2. Users are encouraged to update to ROS2 for new projects.

