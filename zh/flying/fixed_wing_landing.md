---
canonicalUrl: https://docs.px4.io/main/zh/flying/fixed_wing_landing
---

# 固定翼着陆

PX4 允许自动驾驶控制固定翼 (FW) 在 [任务模式](../flying/missions.md)、[着陆模式](../flight_modes/land.md) 和 [返航模式](../flight_modes/return.md) 中着陆。

着陆逻辑有几个阶段，如下所示。 在第一阶段，飞行器将遵循固定的轨道 ([FW_LND_ANG](#FW_LND_ANG)) 朝向地面。 在 flare 着陆高度 ([FW_LND_FLALT](#FW_LND_FLALT)) ，飞行器将开始遵循 flare 路径(曲线基于 [FW_LND_HVIRT](#FW_LND_HVIRT) 的值)。

![Fixed Wing - Landing Path](../../assets/flying/fw_landing_path.png)

Flare 着陆高度是相对于固定翼“认为”的地平面高度而言的。 在 [着陆模式](../flight_modes/land.md) 地面高度是未知的，飞行器将假定地面高度在 0 米(海平面)。 通常情况下，地面高度将远远高于海平面，因此飞行器将在第一阶段着陆(在到达 flare 高度之前它将降落在地面上)。

在任务中，[返航模式](../flight_modes/return.md)，或者如果飞行器安装了距离传感器，则可以准确估计地平面高度，着陆行为将如上图所示。

着陆进一步受到下列参数的影响：

| 参数                                                                                                                  | 描述                                                                                                                                                                                                    |
| ------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <span id="FW_LND_ANG"></span>[FW_LND_ANG](../advanced_config/parameter_reference.md#FW_LND_ANG)                   | flaring 前降落坡度角                                                                                                                                                                                        |
| <span id="FW_LND_HVIRT"></span>[FW_LND_HVIRT](../advanced_config/parameter_reference.md#FW_LND_HVIRT)             | 用于计算 flare 轨迹的虚拟水平线/高度。这代表了 flare 路径曲线渐近接近的地下高度。                                                                                                                                                      |
| <span id="FW_LND_FLALT"></span>[FW_LND_FLALT](../advanced_config/parameter_reference.md#FW_LND_FLALT)             | 着陆 flare 高度 (相对于着陆高度)                                                                                                                                                                                 |
| <span id="FW_LND_TLALT"></span>[FW_LND_TLALT](../advanced_config/parameter_reference.md#FW_LND_TLALT)             | 着陆油门限制高度(相对着陆高度)。 默认值 -1.0 允许系统默认在 2/3 flare 高度施加油门限制。                                                                                                                                                |
| <span id="FW_LND_HHDIST"></span>[FW_LND_HHDIST](../advanced_config/parameter_reference.md#FW_LND_HHDIST)          | 着陆航向保持水平距离                                                                                                                                                                                            |
| <span id="FW_LND_USETER"></span>[FW_LND_USETER](../advanced_config/parameter_reference.md#FW_LND_USETER)          | 在着陆时使用地形估计(从 GPS 获得地面高度)。 默认情况下，这是关闭的，通常使用一个航点或返航高度(或海平面用于任意的着陆位置)。                                                                                                                                   |
| <span id="FW_LND_FL_PMIN"></span>[FW_LND_FL_PMIN](../advanced_config/parameter_reference.md#FW_LND_FL_PMIN)       | Minimum pitch during flare. A positive sign means nose up Applied once `FW_LND_TLALT` is reached                                                                                                      |
| <span id="FW_LND_FL_PMAX"></span>[FW_LND_FL_PMAX](../advanced_config/parameter_reference.md#FW_LND_FL_PMAX)       | Maximum pitch during flare. A positive sign means nose up Applied once `FW_LND_TLALT` is reached                                                                                                      |
| <span id="FW_LND_AIRSPD_SC"></span>[FW_LND_AIRSPD_SC](../advanced_config/parameter_reference.md#FW_LND_AIRSPD_SC) | 起飞时最小 airspeed scaling factor for landing. Comment: Multiplying this factor with the minimum airspeed of the plane gives the target airspeed the landing approach. `FW_AIRSPD_MIN x FW_LND_AIRSPD_SC` |
