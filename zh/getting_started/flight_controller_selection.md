---
canonicalUrl: https://docs.px4.io/main/zh/getting_started/flight_controller_selection
---

# 选择飞控

Flight controllers are the "brains" of an unmanned vehicle. PX4 can run on [many flight controller boards](../flight_controller/README.md).

在选择飞控板时你应当考虑飞机的物理尺寸限制、想要进行的活动以及必不可少的成本。

<img src="../../assets/flight_controller/pixhawk6x/pixhawk6x_hero_upright.png" width="130px" title="Holybro Pixhawk6X" /> <img src="../../assets/flight_controller/cuav_pixhawk_v6x/pixhawk_v6x.jpg" width="230px" title="CUAV Pixhawk 6X"  /> <img src="../../assets/flight_controller/cube/orange/cube_orange_hero.jpg" width="300px" title="CubePilot Cube Orange" />


## Pixhawk 系列

[Pixhawk系列](../flight_controller/pixhawk_series.md) - 在Nuttx OS上运行PX4的开放式硬件飞行控制器。 有许多外形，有针对许多用例和细分市场的版本。

[Pixhawk Standard Autopilots](../flight_controller/autopilot_pixhawk_standard.md) are used as the PX4 reference platform. They are supported and tested by the PX4 development team, and are highly recommended.

## Manufacturer-supported Controllers

Other flight controllers are [manufacturer-supported](../flight_controller/autopilot_manufacturer_supported.md). This includes FCs that are heavily based on the Pixhawk standard (but which are not fully compliant), and many others.

Note that manufacturer-supported controllers can be just as "good" (or better) than those which are Pixhawk-standard.

## 用于计算密集型任务的无人机

Dedicated flight controllers like Pixhawk are not usually well-suited for general purpose computing or running computationally intensive tasks. For more computing power, the most common approach is to run those applications on a separate onboard [Companion Computer](../companion_computer/README.md).

Integrated companion computer/flight controller solutions include:

- [Holybro Pixhawk RPI CM4 Baseboard](../companion_computer/holybro_pixhawk_rpi_cm4_baseboard.md)
- Other options in [Companion Computer > Integrated Companion/Flight Controller Boards](../companion_computer/README.md#integrated-companion-flight-controller-boards)


PX4 can also run natively on Raspberry Pi (this approach is not generally considered as "robust" as having a separate companion):

- [Raspberry Pi 2/3 Navio2](../flight_controller/raspberry_pi_navio2.md)
- [Raspberry Pi 2/3/4 PilotPi Shield](../flight_controller/raspberry_pi_pilotpi.md)


## 可运行 PX4 的商业无人机

PX4 适用于许多流行的商用无人机产品，包括一些搭载 PX4 以及可以用 PX4 升级的产品（允许您将任务规划和其他 PX4 飞行模式添加至您的无人机）。

详情见 [Complete Vehicles](../complete_vehicles/README.md)。

