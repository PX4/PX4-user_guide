# 고정익 착륙

PX4는 [임수](../flying/missions.md), [착륙 모드](../flight_modes/land.md) 및 [복귀 모드](../flight_modes/return.md)에서 자동 조종 제어 고정익(FW) 착륙이 가능합니다.

랜딩 과정에는 아래와 같이 여러 단계가 있습니다. 첫 번째 단계에서 기체는 지면을 향해 고정된 궤적 ([FW_LND_ANG](#FW_LND_ANG))을 따라 비행합니다. 플레어 착륙 고도 ([FW_LND_FLALT](#FW_LND_FLALT))에서 기체는 플레어 경로를 따르기 시작합니다 (곡선은 [FW_LND_HVIRT](#FW_LND_HVIRT) 값을 기반으로 함).

![Fixed Wing - Landing Path](../../assets/flying/fw_landing_path.png)

플레어 착륙 고도는 고정익의 고도와 관련이 있습니다. In [Land mode](../flight_modes/land.md) the ground altitude is not known and the vehicle will use assume it is at 0m (sea level). Often the ground level will be much higher than sea level, so the vehicle will land in the first phase (it will land on the ground before it reaches the flare altitude).

In a mission, [Return mode](../flight_modes/return.md), or if the vehicle has a range sensor fitted then ground level can be accurately estimated and landing behaviour will be as shown in the preceding diagram.

Landing is further affected by the following parameters:

| Parameter                                                                                                 | Description                                                                                                                                                                                          |
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