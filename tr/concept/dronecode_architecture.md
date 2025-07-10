---
canonicalUrl: https://docs.px4.io/main/tr/concept/dronecode_architecture
---

# PX4 Platform Hardware/Software Architecture

The diagram below provides a forward-looking high level overview of a full PX4 onboard and offboard stack. The left hand side shows one possible hardware configuration with a *flight controller* (light blue) connected to a *perception computer* (dark blue) via [RTPS](../middleware/micrortps.md). The perception computer provides vision control and object avoidance using a camera sensor array, and has a separate payload camera.

The right hand side of the diagram shows the end-to-end software stack. The stack "approximately" aligns horizontally with the hardware parts of the diagram, and is colour-coded to show which software is running on the flight controller and which on the companion computer.

:::note
The [PX4 Architectural Overview](../concept/architecture.md) provides information about the flight stack and middleware. Offboard APIs are covered in [ROS](../ros/README.md) and [MAVSDK](https://mavsdk.mavlink.io/develop/en/index.html).
:::

![PX4 Platform architecture](../../assets/diagrams/dronecode_platform_architecture.jpg)

<!-- The drawing is on draw.io: https://drive.google.com/file/d/14sgSpcs7NcBatW-qn0dLtyMHvwNMSSlm/view?usp=sharing. Request access from dev team. -->
