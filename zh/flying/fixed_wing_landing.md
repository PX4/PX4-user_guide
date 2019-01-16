# 固定翼着陆

PX4 允许自动驾驶控制固定翼 (FW) 在 [任务模式](../flying/missions.md)、[着陆模式](../flight_modes/land.md) 和 [返航模式](../flight_modes/return.md) 中着陆。

着陆逻辑有几个阶段，如下所示。 在第一阶段，飞行器将遵循固定的轨道 ([FW_LND_ANG](#FW_LND_ANG)) 朝向地面。 在 flare 着陆高度 ([FW_LND_FLALT](#FW_LND_FLALT)) ，飞行器将开始遵循 flare 路径(曲线基于 [FW_LND_HVIRT](#FW_LND_HVIRT) 的值)。

![Fixed Wing - Landing Path](../../assets/flying/fw_landing_path.png)

Flare 着陆高度是相对于固定翼“认为”的地平面高度而言的。 在 [着陆模式](../flight_modes/land.md) 地面高度是未知的，飞行器将假定地面高度在 0 米(海平面)。 通常情况下，地面高度将远远高于海平面，因此飞行器将在第一阶段着陆(在到达 flare 高度之前它将降落在地面上)。

In a mission, [Return mode](../flight_modes/return.md), or if the vehicle has a range sensor fitted then ground level can be accurately estimated and landing behaviour will be as shown in the preceding diagram.

Landing is further affected by the following parameters:

| 参数                                                                                                        | 描述                                                                                                                                                                                                   |
| --------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <span id="FW_LND_ANG"></span>[FW_LND_ANG](../advanced_config/parameter_reference.md#FW_LND_ANG)             | Landing slope angle prior to flaring                                                                                                                                                                 |
| <span id="FW_LND_HVIRT"></span>[FW_LND_HVIRT](../advanced_config/parameter_reference.md#FW_LND_HVIRT)         | Virtual horizontal line/altitude used to calculate the flare trajectory.  
This represents the sub-ground altitude that the flare-path curve asymptotically approaches.                              |
| <span id="FW_LND_FLALT"></span>[FW_LND_FLALT](../advanced_config/parameter_reference.md#FW_LND_FLALT)         | Landing flare altitude (relative to landing altitude)                                                                                                                                                |
| <span id="FW_LND_TLALT"></span>[FW_LND_TLALT](../advanced_config/parameter_reference.md#FW_LND_TLALT)         | Landing throttle limit altitude (relative landing altitude). The default value of -1.0 lets the system default to applying throttle limiting at 2/3 of the flare altitude.                           |
| <span id="FW_LND_HHDIST"></span>[FW_LND_HHDIST](../advanced_config/parameter_reference.md#FW_LND_HHDIST)       | Landing heading hold horizontal distance                                                                                                                                                             |
| <span id="FW_LND_USETER"></span>[FW_LND_USETER](../advanced_config/parameter_reference.md#FW_LND_USETER)       | Use terrain estimate (ground altitude from GPS) during landing. This is turned off by default and a waypoint or return altitude is normally used (or sea level for an arbitrary land position).      |
| <span id="FW_LND_FL_PMIN"></span>[FW_LND_FL_PMIN](../advanced_config/parameter_reference.md#FW_LND_FL_PMIN)     | Minimum pitch during flare. A positive sign means nose up Applied once `FW_LND_TLALT` is reached                                                                                                     |
| <span id="FW_LND_FL_PMAX"></span>[FW_LND_FL_PMAX](../advanced_config/parameter_reference.md#FW_LND_FL_PMAX)     | Maximum pitch during flare. A positive sign means nose up Applied once `FW_LND_TLALT` is reached                                                                                                     |
| <span id="FW_LND_AIRSPD_SC"></span>[FW_LND_AIRSPD_SC](../advanced_config/parameter_reference.md#FW_LND_AIRSPD_SC) | Min. airspeed scaling factor for landing. Comment: Multiplying this factor with the minimum airspeed of the plane gives the target airspeed the landing approach. `FW_AIRSPD_MIN x FW_LND_AIRSPD_SC` |