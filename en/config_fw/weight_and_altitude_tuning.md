# Advanced TECS Tuning (Weight and Altitude)

Before following the guidance provided by this section you should have completed the [basic TECS tuning](../config_fw/position_tuning_guide_fixedwing.md#tecs-tuning-altitude-and-airspeed) which established the key performance limitations of the vehicle that are very important for the altitude and airspeed controller to function properly.
While those limitations have been defined using constant parameters, in reality vehicle performance is not constant and is affected by various factors.
This section specifically looks at how vehicle weight and air density affect performance and what you can do do compensate for those effects.

Both the vehicle weight and the air density (depends on altitude and air temperature) affect vehicle performance.
For example, when a vehicle climbs to a higher altitude the air density decreases and usually the maximum climb rate reduces.
Similarly, the maximum climb rate of a vehicle will reduce with the weight of the vehicle.

If changes in weight and air density are not taken into account, altitude and airspeed tracking will likely deteriorate in the case where the configuration (air density and weight) deviate significantly from the configuration at which the vehicle was tuned.

In the following we will use the notation $\hat X$ to specify that this value is a calibrated value of the variable $X$.
By calibrated we mean the value of that variable measured at sea level in standard atmospheric conditions and when vehicle weight was equal to [WEIGHT_BASE](../advanced_config/parameter_reference.md#WEIGHT_BASE).

E.g. by $\hat{\dot{h}}_{max}$ we specify the maximum climb rate the vehicle can achieve at [WEIGHT_BASE](../advanced_config/parameter_reference.md#WEIGHT_BASE) at sea level in standard atmospheric conditions.

## Compensating for Weight

[WEIGHT_BASE](../advanced_config/parameter_reference.md#WEIGHT_BASE) specifies the base weight of the vehicle at which the [TECS tuning](position_tuning_guide_fixedwing.md#tecs-tuning-altitude-and-airspeed) was performed.
The weight of the vehicle in the tuning configuration should be measured with a scale and the parameter should be set accordingly.

[WEIGHT_GROSS](../advanced_config/parameter_reference.md#WEIGHT_BASE) specifies the actual weight of the vehicle at any given time.
This parameter can be set to reflect e.g. a payload attached to the vehicle which was not present during the tuning phase.

When both [WEIGHT_BASE](../advanced_config/parameter_reference.md#WEIGHT_BASE) and [WEIGHT_GROSS](../advanced_config/parameter_reference.md#WEIGHT_GROSS) are set to a number larger than 0 PX4 will use this information to:

### Scale the Maximum Climb Rate

The maximum climb rate ([FW_T_CLMB_MAX](../advanced_config/parameter_reference.md#FW_T_CLMB_MAX)) must be scaled as a function of the weight ratio.

From the steady state equations of motions of an airplane we find that the maximum climb rate can be written as

$$ \dot{h}_{max} = { V * ( Thrust - Drag ) \over{m*g}}  $$

where V is the true airspeed and m is the vehicle mass.
Therefore, we can write the maximum climb rate as

$$ \\dot{h}_{max} = \\hat{\\dot{h}}_{max} * {m_{base} \\frac{m_{gross}}} $$

### Scale the Minimum Sink Rate

The minimum sink rate ([FW_T_SINK_MIN](../advanced_config/parameter_reference.md#FW_T_SINK_MIN)) must be scaled as a function of weight ratio

The minimum sink rate can be written as:

$$ \dot{h}_{min} = \sqrt{2mg\over{\rho F}} f(c_A, c_W) $$

where $\rho$ is the air density, F is the wing area and f(c_A, c_W) is a function of the polars.
Therefore, we can compute the minimum sink rate as:

$$ \dot{h}_{min} = \hat{\dot{h}}_{min}  \sqrt{m_{gross}\over{m_{base}}} $$

### Adjust Minimum, Stall, and Trim Airspeed Limits According to the Weight Ratio

Next adjust airspeed limits such as minimum airspeed ([FW_AIRSPD_MIN](../advanced_config/parameter_reference.md#FW_AIRSPD_MIN)), the stall airspeed ([FW_AIRSPD_STALL](../advanced_config/parameter_reference.md#FW_AIRSPD_STALL)) and trim airspeed ([FW_AIRSPD_TRIM](../advanced_config/parameter_reference.md#FW_AIRSPD_TRIM)) according to the weight ratio.

In steady state flight we can demand that lift should equal weight of the vehicle:

$$ Lift = mg = {1\over{2}} \rho c_A F V^2 $$

rearranging this equation for airspeed gives:

$$ V = \\sqrt{\\frac{2mg}{\\rho c_A F}} $$

From this equation we see that if we assume a constant angle of attack (which we generally desire), the vehicle weight affects airspeed with a square root relation.
Therefore, we scale the vehicle stall airspeed, minimum airspeed and trim airspeed as follows:

$$ V_{stall} = \hat{V}_{stall} * \sqrt{m_{gross} \over{m_{base}}}  $$

$$ V_{min} = \hat{V}_{min} * \sqrt{m_{gross} \over{m_{base}}}  $$

$$ V_{trim} = \hat{V}_{trim} * \sqrt{m_{gross} \over{m_{base}}}  $$

## Compensating for Air Density

PX4 automatically compensates various parameters such as trim throttle or minimum sink rate for changing air density.
However, it's important to understand that when the [basic TECS tuning](../config_fw/position_tuning_guide_fixedwing.md#tecs-tuning-altitude-and-airspeed) has been done at non-standard sea level conditions, some of the parameters needs to be back-calculated to calibrated values.
In the following we will list each parameter which is compensated based on air density and how you can calculate the calibrated value.

### Maximum Climb Rate

The maximum climb rate is set using [FW_T_CLMB_MAX](../advanced_config/parameter_reference.md#FW_T_CLMB_MAX).

As we have seen previously, the maximum climb rate can be formulated as

$$ \dot{h}_{max} = { V * ( Thrust - Drag ) \over{m*g}}  $$

The air density affects the airspeed, the thrust and the drag and modelling this effects is not straight forward.
However, we can refer to literature and experience, which suggest that for a propeller airplane the maximum climb rate reduces approximately linear with the air density.
Therefore, we can write the maximum climb rate as

$$ \dot{h}_{max} = \hat{\dot{h}} * {\rho_{sealevel} \over{\rho}} K$$

where $\rho_{sealevel}$ is the air density at sea level in the standard atmosphere and K is a scaling factor which determines the slope of the function.
Rather than trying to identify this constants, the usual practice in aviation is to specify a service ceiling altitude at which the vehicle is still able to achieve a minimum specified climb rate.

In PX4 the service ceiling [FW_S_CEILING](../advanced_config/parameter_reference.md#FW_S_CEILING) specifies the altitude in standard atmospheric conditions at which the vehicle is still able to achieve a maximum climb rate of 0.5 m/s at maximum throttle and weight equal to [WEIGHT_BASE](../advanced_config/parameter_reference.md#WEIGHT_BASE).
By default this parameter is disabled and no compensation will take place.

### Minimum Sink Rate

The minimum sink rate is set using [FW_T_SINK_MIN](../advanced_config/parameter_reference.md#FW_T_SINK_MIN).

In previous sections we have seen the formula for the minimum sink rate:

$$ \dot{h}_{min} = \sqrt{2mg\over{\rho F}} f(c_A, c_W)  $$

which we can write as follows in terms of air density

$$ \dot{h}_{min} = \hat{\dot{h}}  \sqrt{\rho_{sealevel}\over{\rho}}$$

If the tuning is not done in standard sea level conditions then the calibrated value for [FW_T_SINK_MIN](../advanced_config/parameter_reference.md#FW_T_SINK_MIN) needs to be calculated as follows:

$$ \hat{\dot{h}} = \dot{h} * \sqrt{\rho\over{\rho_{sealevel}}}  $$

where $\rho$ is the air density during tuning, $\dot{h}$ is the minimum sink rate derived during flying and $\hat{\dot{h}}$ is the calibrated value for [FW_T_SINK_MIN](../advanced_config/parameter_reference.md#FW_T_SINK_MIN).

### Trim Throttle

Trim throttle ([FW_THR_TRIM](../advanced_config/parameter_reference.md#FW_THR_TRIM)) varies with air density and can be written as:

$$ \delta_{trim} = \hat\delta_{trim} * \sqrt{\rho_{sealevel}\over{\rho}}$$

If the tuning is not done in standard sealevel conditions then true value for [FW_THR_TRIM](../advanced_config/parameter_reference.md#FW_THR_TRIM) needs to be calculated as follows:

$$ \hat\delta_{trim} = \delta_{trim} *  \sqrt{\rho\over{\rho_{sealevel}}}$$
