# AirSim 시뮬레이션

[AirSim](https://microsoft.github.io/AirSim/)은 _Unreal Engine_을 기반 드론용 오픈 소스 크로스 플랫폼 시뮬레이터입니다. HITL(Hardware-In-The-Loop)과 SITL(Software-In-The-Loop)을 사용하여 Pixhawk와 PX4의 물리적 시각적으로 사실적인 시뮬레이션을 제공합니다.

@[유투브](https://youtu.be/-WfTr1-OBGQ) <!-- datestamp:video:youtube:20170216:AirSim Demo -->


## PX4 설정

PX4로 작업하는 경우에는 [PX4 Setup for AirSim](https://github.com/Microsoft/AirSim/blob/master/docs/px4_setup.md)이 주요 시작 문서입니다 (HITL 및 SITL 모두 해당).


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
