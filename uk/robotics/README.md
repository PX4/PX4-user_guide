# Drone додатки & API

API дронів дозволяють вам писати код для керування та інтеграції з транспортними засобами на базі PX4, не потребуючи ретельного розуміння деталей транспортного засобу та стеку польоту, або думати про критичну безпекову поведінку.

Наприклад, ви можете створити нові "розумні" режими польоту, або власні режими геозон, або інтегрувати нове обладнання. API дронів дозволяють вам робити це, використовуючи високорівневі інструкції у вашій обраній мові програмування, і код може потім виконуватися на транспортному засобі у [компаньйонному комп'ютері](../companion_computer/README.md) або зі станції на землі. В основі API здійснюється спілкування з PX4 за допомогою [MAVLink](../middleware/mavlink.md) або [uXRCE-DDS](../middleware/uxrce_dds.md).

PX4 підтримує наступні інструменти SDK/робототехніки:
- [MAVSDK](https://mavsdk.mavlink.io/)
- [ROS 2](../ros/README.md)
- [ROS 1](../ros/README.md)

## Який API мені слід використовувати?

We recommend using MAVSDK where possible, primarily because it is far more intuitive and easier to learn. It can also run on more operating systems and less performant-hardware.

You may prefer ROS if you already know how to use it, or if you want to leverage pre-existing integrations (for example computer vision tasks). More generally, ROS is likely to be a better choice for tasks that require very low latency or a deeper integration with PX4 than is provided by MAVLink.

Основна різниця:

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
  - ROS 2 is the latest version, which connects via DDS.
    - DDS interface layer allows deep integration into any aspect of PX4 that is exposed as a UORB topic (almost everything).
    - Can provide much lower latency.
    - Still under development. At time of writing requires a deeper understanding of PX4 than ROS 1
  - ROS 1 is the older version that can connect over MAVLink or via ROS 2. Users are encouraged to update to ROS 2 for new projects.

