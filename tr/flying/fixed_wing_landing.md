---
canonicalUrl: https://docs.px4.io/main/tr/flying/fixed_wing_landing
---

# Fixed Wing Landing

PX4 enables autopilot-controlled fixed-wing (FW) landing in [Missions](../flying/missions.md), [Land mode](../flight_modes/land.md), and [Return mode](../flight_modes/return.md).

The landing logic has several phases, as shown below. In the first phase the vehicle will follow a fixed trajectory ([FW_LND_ANG](#FW_LND_ANG)) towards the ground. At the flare landing altitude ([FW_LND_FLALT](#FW_LND_FLALT)) the vehicle will start to follow a flare path (the curve is based on the value of [FW_LND_HVIRT](#FW_LND_HVIRT)).

![Fixed Wing - Landing Path](../../assets/flying/fw_landing_path.png)

The flare landing altitude is relative to the altitude that the FW vehicle "thinks" is ground level. In [Land mode](../flight_modes/land.md) the ground altitude is not known and the vehicle will use assume it is at 0m (sea level). Often the ground level will be much higher than sea level, so the vehicle will land in the first phase (it will land on the ground before it reaches the flare altitude).

In a mission, [Return mode](../flight_modes/return.md), or if the vehicle has a range sensor fitted then ground level can be accurately estimated and landing behaviour will be as shown in the preceding diagram.

Landing is further affected by the following parameters:

| Parameter                                                                                                           | Description                                                                                                                                                                                          |
| ------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <span id="FW_LND_ANG"></span>[FW_LND_ANG](../advanced_config/parameter_reference.md#FW_LND_ANG)                   | Landing slope angle prior to flaring                                                                                                                                                                 |
| <span id="FW_LND_HVIRT"></span>[FW_LND_HVIRT](../advanced_config/parameter_reference.md#FW_LND_HVIRT)             | Virtual horizontal line/altitude used to calculate the flare trajectory.<br>This represents the sub-ground altitude that the flare-path curve asymptotically approaches.                       |
| <span id="FW_LND_FLALT"></span>[FW_LND_FLALT](../advanced_config/parameter_reference.md#FW_LND_FLALT)             | Landing flare altitude (relative to landing altitude)                                                                                                                                                |
| <span id="FW_LND_TLALT"></span>[FW_LND_TLALT](../advanced_config/parameter_reference.md#FW_LND_TLALT)             | Landing throttle limit altitude (relative landing altitude). The default value of -1.0 lets the system default to applying throttle limiting at 2/3 of the flare altitude.                           |
| <span id="FW_LND_HHDIST"></span>[FW_LND_HHDIST](../advanced_config/parameter_reference.md#FW_LND_HHDIST)          | Landing heading hold horizontal distance                                                                                                                                                             |
| <span id="FW_LND_USETER"></span>[FW_LND_USETER](../advanced_config/parameter_reference.md#FW_LND_USETER)          | Use terrain estimate (ground altitude from GPS) during landing. This is turned off by default and a waypoint or return altitude is normally used (or sea level for an arbitrary land position).      |
| <span id="FW_LND_FL_PMIN"></span>[FW_LND_FL_PMIN](../advanced_config/parameter_reference.md#FW_LND_FL_PMIN)       | Minimum pitch during flare. A positive sign means nose up Applied once `FW_LND_TLALT` is reached                                                                                                     |
| <span id="FW_LND_FL_PMAX"></span>[FW_LND_FL_PMAX](../advanced_config/parameter_reference.md#FW_LND_FL_PMAX)       | Maximum pitch during flare. A positive sign means nose up Applied once `FW_LND_TLALT` is reached                                                                                                     |
| <span id="FW_LND_AIRSPD_SC"></span>[FW_LND_AIRSPD_SC](../advanced_config/parameter_reference.md#FW_LND_AIRSPD_SC) | Min. airspeed scaling factor for landing. Comment: Multiplying this factor with the minimum airspeed of the plane gives the target airspeed the landing approach. `FW_AIRSPD_MIN x FW_LND_AIRSPD_SC` |
