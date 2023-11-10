# Flying at variable Weight and Altitude
Both the vehicle weight and the air density (depends on altitude and air temperature) affect vehicle performance. For example, when a vehicle climbs to a higher altitude the air density decreases and usually the maximum climb rate reduces.
Similarly, the maximum climb rate of a vehicle will reduce with the weight of the vehicle.

If changes in weight and air density are not taken into account, altitude and airspeed tracking will likely deteriorate in the case where the configuration (air density and weight) deviate a lot from the configuration at which the vehicle was tuned.

This section explains which parameters can be used to compensate for effects of changing weight and air density on flight performance.

## Specify base and gross weight
[WEIGHT_BASE](../advanced_config/parameter_reference.md#WEIGHT_BASE) specifies the base weight of the vehicle at which the [TECS tuning](position_tuning_guide_fixedwing.md#tecs-tuning-altitude-and-airspeed) was performed. The weight of the vehicle in the tuning configuration should be measured with a scale and the parameter should be set accordingly.

[WEIGHT_GROSS](../advanced_config/parameter_reference.md#WEIGHT_BASE) specifies the actual weight of the vehicle at any given time. This parameter can be set to reflect e.g. a payload attached to the vehicle which was not present during the tuning phase.

When both [WEIGHT_BASE](../advanced_config/parameter_reference.md#WEIGHT_BASE) and [WEIGHT_GROSS](../advanced_config/parameter_reference.md#WEIGHT_GROSS) are set to a number larger than 0 PX4 will use this information to:

1. Scale the maximum climb rate [FW_T_CLMB_MAX](../advanced_config/parameter_reference.md#FW_T_CLMB_MAX) as a function of the weight ratio and the air density.
From the steady state equations of motions of an airplane we find that the maximum climb rate can be written as

$$ \dot{h}_{max} = V * ( Thrust - Drag ) \over{m  g}  $$

where V is the true airspeed and m is the vehicle mass. As the vehicle weight appears linearly in the denominator we scaling is straightforward. The air density affects the airspeed, the thrust and the drag and modelling this effects is not straight forward. However, we can refer to literature and experience, which suggest that for a propeller airplane the maximum climb rate reduces approximately linear with the air density. Therefore, we can write the maximum climb rate as


$$ \dot{h}_{max} = \dot{h}_{base} {m_{base}\over{m_{gross}}} {\rho_{sealevel} \over{\rho}} $$

where $\rho_{sealevel}$ is the air density at sea level in the standard atmosphere.


2. Scale the minimum sink rate [FW_T_SINK_MIN](../advanced_config/parameter_reference.md#FW_T_SINK_MIN) as a function of weight ratio and air density.
The minimum sink rate can be written as

$$ \dot{h}_{min} = \sqrt{2mg\over{\rho F}} f(c_A, c_W)  $$

where $\rho$ is the air density, F is the wing area and f(c_A, c_W) is a function of the polars.
Therefore, we can compute the minimum sink rate as

$$ \dot{h}_{min} = \dot{h}_{base}  \sqrt{\rho_{sealevel} * m_{gross}\over{\rho*m_{base}}}  $$

3. Scale the trim throttle [FW_THR_TRIM](../advanced_config/parameter_reference.md#FW_THR_TRIM) as a function of weight ratio, air density and airspeed setpoint.


4. Adjust airspeed limits such as minimum airspeed [FW_AIRSPD_MIN](../advanced_config/parameter_reference.md#FW_AIRSPD_MIN) and trim airspeed [FW_AIRSPD_TRIM](../advanced_config/parameter_reference.md#FW_AIRSPD_TRIM) according to the weight ratio.

The stall speed on an airplane increases with the load factor and the weight ration. In level flight we can write

$$ Lift = mg = {1\over{2}} \rho c_A F V^2 $$

rearranging this equation for airspeed gives

$$ V = \sqrt{{2mg}\over{\rho c_A F}}  $$

From this equation we see that if we assume a constant angle of attack (which we generally desire), the vehicle weight affects airspeed with a square root relation.
Therefore, we scale the vehicle minimum airspeed and trim airspeed as follows

$$ V_{min} = V_{min}{base} * \sqrt{m_{gross} \over{m_{base}}}  $$

$$ V_{trim} = V_{trim}{base} * \sqrt{m_{gross} \over{m_{base}}}  $$


## Specify Service Ceiling
In PX4 the service ceiling [FW_S_CEILING](../advanced_config/parameter_reference.md#FW_S_CEILING) specifies the altitude in standard atmospheric conditions at which the vehicle is still able to achieve a maximum climb rate of 0.5 m/s at maximum throttle and weight equal to [WEIGHT_BASE](../advanced_config/parameter_reference.md#WEIGHT_BASE).

Setting the service ceiling parameter will have the following effects:
- maximum climb rate [FW_T_CLMB_MAX](../advanced_config/parameter_reference.md#FW_T_CLMB_MAX) will be adjusted based on air density

The actual service ceiling of the vehicle has to be determined experimentally. When flying at the service ceiling at [WEIGHT_BASE](../advanced_config/parameter_reference.md#WEIGHT_BASE) the vehicle should be able to achieve a climb rate of 0.5 m/s at [FW_AIRSPD_TRIM](../advanced_config/parameter_reference.md#FW_AIRSPD_TRIM) and throttle close to the maximum.

:::warning
Setting the service ceiling too low is always safer than setting it too high. You can always adjust your service ceiling to higher values if you notice that TECS is limiting your climb performance too much.
:::







