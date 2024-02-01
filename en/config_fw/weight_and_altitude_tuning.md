# Advanced TECS Tuning (Weight and Altitude)

Before following the guidance provided by this section you should have completed the [basic TECS tuning](../config_fw/position_tuning_guide_fixedwing.md#tecs-tuning-altitude-and-airspeed) which established the key performance limitations of the vehicle that are very important for the altitude and airspeed controller to function properly.
While those limitations have been defined using constant parameters, in reality vehicle performance is not constant and is affected by various factors.
This section specifically looks at how vehicle weight and air density affect performance and what you can do do compensate for those effects.

Both the vehicle weight and the air density, which depends on altitude and air temperature, affect vehicle performance.
For example, when a vehicle climbs to a higher altitude the air density decreases, and usually the maximum climb rate reduces.
Similarly, the maximum climb rate of a vehicle will reduce with the weight of the vehicle.

If changes in weight and air density are not taken into account, altitude and airspeed tracking will likely deteriorate in the case where the configuration (air density and weight) deviate significantly from the configuration at which the vehicle was tuned.

In section [Specify the Weight of the Vehicle](../config_fw/weight_and_altitude_tuning.md#specify-the-weight-of-the-vehicle) and [Compensation for Air Density](../config_fw/weight_and_altitude_tuning.md#compensation-for-air-density) you will find the parameters you need to adjust for weight and density compensation to take place.
In the [Notes](../config_fw/weight_and_altitude_tuning.md#notes-to-the-derivation-of-weight-and-density-compensation) section the curious reader can find more details on theory of each compensation.

## Specify the Weight of the Vehicle

[WEIGHT_BASE](../advanced_config/parameter_reference.md#WEIGHT_BASE) specifies the base weight of the vehicle at which the [TECS tuning](position_tuning_guide_fixedwing.md#tecs-tuning-altitude-and-airspeed) was performed.
The weight of the vehicle in the tuning configuration should be measured with a scale and the parameter should be set accordingly.

[WEIGHT_GROSS](../advanced_config/parameter_reference.md#WEIGHT_BASE) specifies the actual weight of the vehicle at any given time.
This parameter can be set to reflect, for example, a payload attached to the vehicle that was not present during the tuning phase.

When both [WEIGHT_BASE](../advanced_config/parameter_reference.md#WEIGHT_BASE) and [WEIGHT_GROSS](../advanced_config/parameter_reference.md#WEIGHT_GROSS) are set to a number larger than `0`, PX4 will use this information to scale the maximum climb rate, minimum sink rate, and adjust airspeed limits according to the weight ratio.
The interested reader is referred to [the note section](../config_fw/weight_and_altitude_tuning.md#notes-to-the-derivation-of-weight-and-density-compensation) below for further details.

## Compensation for Air Density

### Specify a Service Ceiling
In PX4 the service ceiling [FW_SERVICE_CEIL](../advanced_config/parameter_reference.md#FW_SERVICE_CEIL) specifies the altitude in standard atmospheric conditions at which the vehicle is still able to achieve a maximum climb rate of 0.5 m/s at maximum throttle and weight equal to [WEIGHT_BASE](../advanced_config/parameter_reference.md#WEIGHT_BASE).
By default this parameter is disabled and no compensation will take place.
This parameter needs to be estimated experimentally. It is always better to set a conservative value (lower value) than an optimistic value.

### Apply Density Correction to Minimum Sink Rate
During the initial tuning the minimum sink rate is set using [FW_T_SINK_MIN](../advanced_config/parameter_reference.md#FW_T_SINK_MIN).

If the initial tuning is not done in standard sea level conditions then [FW_T_SINK_MIN](../advanced_config/parameter_reference.md#FW_T_SINK_MIN) needs to be multiplied with correction factor P:

$$P = \sqrt{\rho\over{\rho_{sealevel}}}$$

where $\rho$ is the air density during tuning.

### Apply Density Correction to Trim Throttle

If the tuning is not done in standard sealevel conditions then true value for [FW_THR_TRIM](../advanced_config/parameter_reference.md#FW_THR_TRIM) needs to be multiplied with correction factor P:
$$P = \sqrt{\rho\over{\rho_{sealevel}}}$$


## Notes to the Derivation of Weight and Density Compensation

### Notation

In the following sections we will use the notation $\hat X$ to specify that this value is a calibrated value of the variable $X$.
By calibrated we mean the value of that variable measured at sea level in standard atmospheric conditions, and when vehicle weight was equal to [WEIGHT_BASE](../advanced_config/parameter_reference.md#WEIGHT_BASE).

E.g. by $\hat{\dot{h}}_{max}$ we specify the maximum climb rate the vehicle can achieve at [WEIGHT_BASE](../advanced_config/parameter_reference.md#WEIGHT_BASE) at sea level in standard atmospheric conditions.


### Effect of Weight on Maximum Climb Rate

The maximum climb rate ([FW_T_CLMB_MAX](../advanced_config/parameter_reference.md#FW_T_CLMB_MAX)) must be scaled as a function of the weight ratio.

From the steady state equations of motions of an airplane we find that the maximum climb rate can be written as

$$\dot{h}_{max} = { V * ( Thrust - Drag ) \over{m*g}}$$

where `V` is the true airspeed and `m` is the vehicle mass.
It's easy to see from this equation that the maximum climb rates scales with vehicle mass.

### Effect of Weight on Minimum Sink Rate

The minimum sink rate ([FW_T_SINK_MIN](../advanced_config/parameter_reference.md#FW_T_SINK_MIN)) must be scaled as a function of weight ratio

The minimum sink rate can be written as:

$$\dot{h}_{min} = \sqrt{2mg\over{\rho F}} f(c_A, c_W)$$

where $\rho$ is the air density, F is the wing area and $f(c_A, c_W)$ is a function of the polars.
It's easy to see that the minimum sink rate scales with the square root of the weight ratio.

### Effect of Weight on Airspeed Limits

The minimum airspeed ([FW_AIRSPD_MIN](../advanced_config/parameter_reference.md#FW_AIRSPD_MIN)), the stall airspeed ([FW_AIRSPD_STALL](../advanced_config/parameter_reference.md#FW_AIRSPD_STALL)) and trim airspeed ([FW_AIRSPD_TRIM](../advanced_config/parameter_reference.md#FW_AIRSPD_TRIM)) are adjusted based on the weight ratio specified by [WEIGHT_BASE](../advanced_config/parameter_reference.md#WEIGHT_BASE) and [WEIGHT_GROSS](../advanced_config/parameter_reference.md#WEIGHT_GROSS).

In steady state flight we can demand that lift should equal weight of the vehicle:

$$Lift = mg = {1\over{2}} \rho c_A F V^2$$

rearranging this equation for airspeed gives:

$$V = \\sqrt{\\frac{2mg}{\\rho c_A F}}$$

From this equation we see that if we assume a constant angle of attack (which we generally desire), the vehicle weight affects airspeed with a square root relation.
Therefore, the airspeed limits mentioned above are all scaled using the square root of the weight ratio.

### Effect of Density on Maximum Climb Rate

The maximum climb rate is set using [FW_T_CLMB_MAX](../advanced_config/parameter_reference.md#FW_T_CLMB_MAX).

As we have seen previously, the maximum climb rate can be formulated as

$$\dot{h}_{max} = { V * ( Thrust - Drag ) \over{m*g}}$$

The air density affects the airspeed, the thrust and the drag and modelling this effects is not straight forward.
However, we can refer to literature and experience, which suggest that for a propeller airplane the maximum climb rate reduces approximately linear with the air density.
Therefore, we can write the maximum climb rate as

$$\dot{h}_{max} = \hat{\dot{h}} * {\rho_{sealevel} \over{\rho}} K$$

where $\rho_{sealevel}$ is the air density at sea level in the standard atmosphere and K is a scaling factor which determines the slope of the function.
Rather than trying to identify this constants, the usual practice in aviation is to specify a service ceiling altitude at which the vehicle is still able to achieve a minimum specified climb rate.

### Effect of Density on Minimum Sink Rate

The minimum sink rate is set using [FW_T_SINK_MIN](../advanced_config/parameter_reference.md#FW_T_SINK_MIN).

In previous sections we have seen the formula for the minimum sink rate:

$$\dot{h}_{min} = \sqrt{2mg\over{\rho F}} f(c_A, c_W)$$

It is easy to see that the minimum sink rate scales with the square root of the inverse air density.

### Effect of Density on Trim Throttle

TODO: Add derivation here.
