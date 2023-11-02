# Flying at variable Weight and Altitude
Both the vehicle weight and the air density (depends on altitude and air temperature) can change and affect vehicle performance. For example, when a vehicle climbs to a higher altitude the air density decreases and usually the maximum climbrate reduces.
Similarly, the maximum climb rate of a vehicle will reduce with the weight of the vehicle.

If changes in weight and air density are not taken into account, altitude and airspeed tracking will likely detriorate in the case where the configuration (air density and weight) deviate a lot from the configuration at which the vehicle was tuned.

This section explains which parameters can be used to compensate for effects of changing weight and air density on flight performance.

## Specify base and gross weight
[WEIGHT_BASE](../advanced_config/parameter_reference.md#WEIGHT_BASE) speficies the base weight of the vehicle at which the [TECS tuning](position_tuning_guide_fixedwing.md#tecs-tuning-altitude-and-airspeed) was performed. The weight of the vehicle in the tuning configuration should be measured with a scale and the parameter should be set accordingly.

[WEIGHT_GROSS](../advanced_config/parameter_reference.md#WEIGHT_BASE) specifies the actual weight of the vehicle at any given time. This parameter can be set to reflect e.g. a payload attached to the vehicle which was not present during the tuning phase.

When both [WEIGHT_BASE](../advanced_config/parameter_reference.md#WEIGHT_BASE) and [WEIGHT_GROSS](../advanced_config/parameter_reference.md#WEIGHT_GROSS) are set to a number larger than 0 PX4 will use this information to:

- adjust the maximum climbrate [FW_T_CLMB_MAX](../advanced_config/parameter_reference.md#FW_T_CLMB_MAX) according to the weight ratio
- adjust the minimum sinkrate [FW_T_SINK_MIN](../advanced_config/parameter_reference.md#FW_T_SINK_MIN) according to the weight ratio

- adjust the trim throttle [FW_THR_TRIM](../advanced_config/parameter_reference.md#FW_THR_TRIM) according to the weight ratio
- adjust airspeed limits such as minimum airspeed [FW_AIRSPD_MIN](../advanced_config/parameter_reference.md#FW_AIRSPD_MIN) and trim airspeed [FW_AIRSPD_TRIM](../advanced_config/parameter_reference.md#FW_AIRSPD_TRIM) according to the weight ratio


## Specify Service Ceiling
In PX4 the service ceiling [FW_S_CEILING](../advanced_config/parameter_reference.md#FW_S_CEILING) specifies the altitude in standard atmospheric conditions at which the vehicle is still able to achieve a maximum climb rate of 0.5 m/s at maximum throttle and weight equal to [WEIGHT_BASE](../advanced_config/parameter_reference.md#WEIGHT_BASE).

Setting the service ceiling parameter will have the following effects:
- maximum climbrate [FW_T_CLMB_MAX](../advanced_config/parameter_reference.md#FW_T_CLMB_MAX) will be adjusted based on air density

The actual service ceiling of the vehicle has to be determined experimentally. When flying at the service ceiling at [WEIGHT_BASE](../advanced_config/parameter_reference.md#WEIGHT_BASE) the vehicle should be able to achieve a climb rate of 0.5 m/s at [FW_AIRSPD_TRIM](../advanced_config/parameter_reference.md#FW_AIRSPD_TRIM) and throttle close to the maximum.

:::warning
Setting the service ceiling too low is always safer than setting it too high. You can always adjust your service ceiling to higher values if you notice that TECS is limiting your climb performance too much.
:::







