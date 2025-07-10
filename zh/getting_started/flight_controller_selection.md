---
canonicalUrl: https://docs.px4.io/main/zh/getting_started/flight_controller_selection
---

# 选择飞控

在选择飞控板时你应当考虑飞机的物理尺寸限制、想要进行的活动以及必不可少的成本。

PX4 能够在很多飞控板上运行（见 [自驾仪硬件](../flight_controller/README.md)，或 [Github](https://github.com/PX4/PX4-Autopilot/#supported-hardware) 上的受支持的飞控板列表）。 下文列出了一部分可供选择的飞控。

## Pixhawk 系列

[Pixhawk系列](../flight_controller/pixhawk_series.md) - 在Nuttx OS上运行PX4的开放式硬件飞行控制器。 有许多外形，有针对许多用例和细分市场的版本。

以下 [Pixhawk 标准自动驾驶仪](../flight_controller/autopilot_pixhawk_standard.md) 由 PX4 维护及测试团队进行支持和测试（其他自动驾驶仪由制造商进行支持）。

专为 FPV 竞速而优化的超小／轻型自驾仪。 它适用于任何所需 PWM 输出不超过 6 个的小型机体。 <br>还可以考虑的飞控型号：Pixhawk 3 Pro，[MindRacer](../flight_controller/mindracer.md)。</td> </tr> 

</tbody> </table> 




## 用于计算密集型任务的无人机

这些飞行控制器（和开发平台）提供机载“协同计算”，以实现计算机视觉和其他计算密集型任务。

| 控制器                                                                        | 描述                     |
| -------------------------------------------------------------------------- | ---------------------- |
| [Raspberry Pi 2/3 Navio2](../flight_controller/raspberry_pi_navio2.md)     | 树莓派可以连接到自动驾驶仪并用作机载计算机。 |
| [Raspberry Pi 2/3/4 PilotPi](../flight_controller/raspberry_pi_pilotpi.md) | 让Pi飞起来 :)              |





## 可运行 PX4 的商业无人机

PX4 适用于许多流行的商用无人机产品，包括一些搭载 PX4 以及可以用 PX4 升级的产品（允许您将任务规划和其他 PX4 飞行模式添加至您的无人机）。

详情见 [Complete Vehicles](../complete_vehicles/README.md)。

