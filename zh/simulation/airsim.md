---
canonicalUrl: https://docs.px4.io/main/zh/simulation/airsim
---

# AirSim 仿真

AirSim 是一款开源、跨平台的无人机仿真器，基于虚幻引擎开发。 它提供物理上和视觉上都非常逼真的Pixhawk/PX4仿真，无论是硬件在环（HITL）或是软件在环（SITL）。

@文档的主要切入点是 [Github AirSim README](https://github.com/Microsoft/AirSim/blob/master/README.md)。 <!-- datestamp:video:youtube:20170216:AirSim Demo -->


## 更多信息

使用 PX4 的文档主要切入点为 [PX4 Setup for AirSim](https://github.com/Microsoft/AirSim/blob/master/docs/px4_setup.md)（涵盖 HITL 与 SITL）。


## Videos

#### AirSim with PX4 on WSL 2

@[youtube](https://youtu.be/DiqgsWIOoW4) <!-- datestamp:video:youtube:20210401:AirSim with PX4 on WSL 2 -->

:::note WSL
2 is not a supported [PX4 Windows development environment](../dev_setup/dev_env_windows_cygwin.md), mainly because it is non-trivial to display simulator UIs running within WSL 2 in the normal Windows environment. This limitation does not apply for AirSim because its UI is run natively in Windows.
:::


#### Microsoft AirSim: Applications to Research and Industry (PX4 Developer Summit Virtual 2020)

@[youtube](https://youtu.be/-YMiKaJYl44) <!-- datestamp:video:youtube:20200716:Microsoft AirSim: Applications to Research and Industry — PX4 Developer Summit Virtual 2020 -->

#### Autonomous Drone Inspections using AirSim and PX4 (PX4 Developer Summit Virtual 2020)

@[youtube](https://youtu.be/JDx0MPTlhrg) <!-- datestamp:video:youtube:20200716:Autonomous Drone Inspections using AirSim and PX4 — PX4 Developer Summit Virtual 2020 -->


## Further Information

* [AirSim Documentation](https://microsoft.github.io/AirSim/)
* [Using AirSim to Simulate Aircraft Inspection by Autonomous Drones](https://github.com/generalized-intelligence/GAAS/tree/master/demo/case_study_1?fbclid=IwAR2JO0LPesA5z313sA2QGm1t01bb4wn0Xpz_JkD7Z1s3nombJWHyTZdLuMA) (Case Study from Generalized Autonomy Aviation System (GAAS) project).
