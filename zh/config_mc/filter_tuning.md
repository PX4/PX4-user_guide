# MC 过滤器调节 & 控制延迟

过滤器可用来平衡影响飞行性能的 [控制延迟](#control-latency)，和同时影响飞行性能和电机健康的噪音过滤。

This topic provides an overview of control latency and PX4 filter tuning.

::: info Before filter tuning you should do a first pass at [Basic MC PID tuning](../config_mc/pid_tuning_guide_multicopter_basic.md). The vehicle needs to be undertuned (the **P** and **D** gains should be set too low), such that there are no oscillations from the controller that could be interpreted as noise (the default gains might be good enough).
:::

## Control Latency

_控制延迟_ 是从飞机受到物理干扰出到电机做出相应反应的延迟。

:::tip
Lowering latency allows you to increase the rate **P** gains, which results in better flight performance. Even one millisecond difference in the latency can have a significant impact.
:::

The following factors affect control latency:

- A soft airframe or soft vibration mounting increases latency (they act as a filter).
- Low-pass filters in software and on the sensor chip trade off increased latency for improved noise filtering.
- PX4 software internals: the sensor signals need to be read in the driver and then pass through the controller to the output driver.
- The maximum gyro publication rate (configured with [IMU_GYRO_RATEMAX](../advanced_config/parameter_reference.md#IMU_GYRO_RATEMAX)). A higher rate reduces latency but is computationally intensive/can starve other processes. 4 kHz or higher is only recommended for controllers with STM32H7 processor or newer (2 kHz value is near the limit for less capable processors).
- The IO chip (MAIN pins) adds about 5.4 ms latency compared to using the AUX pins (this does not apply to a _Pixracer_ or _Omnibus F4_, but does apply to a Pixhawk). To avoid the IO delay attach the motors to the AUX pins instead.
- PWM output signal: enable [Dshot](../peripherals/dshot.md) by preference to reduce latency (or One-Shot if DShot is not supported). The protocol is selected for a group of outputs during [Actuator Configuration](../config/actuators.md).

Below we look at the impact of the low pass filters.

## Filters

This is the filtering pipeline for the controllers in PX4:

- On-chip DLPF for the gyro sensor. This is disabled on all chips where it can be disabled (if not, the cutoff frequency is set to the highest level of the chip).
- A notch filter on the gyro sensor data that is used to filter out narrow band noise, for example harmonics at the rotor blade pass frequency. 此过滤器可以使用 [IMU_GYRO_NF0_BW](../advanced_config/parameter_reference.md#IMU_GYRO_NF0_BW) 和 [IMU_GYRO_NF0_FRQ](../advanced_config/parameter_reference.md#IMU_GYRO_NF0_FRQ) 进行配置。
- Low-pass filter on the gyro sensor data. It can be configured with the [IMU_GYRO_CUTOFF](../advanced_config/parameter_reference.md#IMU_GYRO_CUTOFF) parameter.

  ::: info
Sampling and filtering is always performed at the full raw sensor rate (commonly 8kHz, depending on the IMU).
:::

- A separate low-pass filter on the D-term. The D-term is most susceptible to noise while slightly increased latency does not negatively affect performance. For this reason the D-term has a separately-configurable low-pass filter, [IMU_DGYRO_CUTOFF](../advanced_config/parameter_reference.md#IMU_DGYRO_CUTOFF).
- A slewrate filter on the motor outputs ([MOT_SLEW_MAX](../advanced_config/parameter_reference.md#MOT_SLEW_MAX)). Generally not used.

To reduce the control latency, we want to increase the cutoff frequency for the low-pass filters. The effect on latency of increasing `IMU_GYRO_CUTOFF` is approximated below.

| Cuttoff (Hz) | Delay approx. (ms) |
| ------------ | ------------------ |
| 30           | 8                  |
| 60           | 3.8                |
| 120          | 1.9                |

However this is a trade-off as increasing `IMU_GYRO_CUTOFF` will also increase the noise of the signal that is fed to the motors. Noise on the motors has the following consequences:

- Motors and ESCs can get hot, to the point where they get damaged.
- Reduced flight time because the motors continuously change their speed.
- Visible random small twitches.

Setups that have a significant lower-frequency noise spike (e.g. due to harmonics at the rotor blade pass frequency) can benefit from using the notch filter to clean the signal before it is passed to the low pass filter (these harmonics have a similar detrimental impact on motors as other sources of noise). Without the notch filter you'd have to set the low pass filter cuttoff much lower (increasing the latency) in order to avoid passing this noise to the motors.

::: info
Only one notch filter is provided.
Airframes with more than one low frequency noise spike typically clean the first spike with the notch filter, and subsequent spikes using the low pass filter.
:::

The best filter settings depend on the vehicle. The defaults are set conservatively — such that they work on lower-quality setups as well.

## Filter Tuning

First make sure to have the high-rate logging profile activated ([SDLOG_PROFILE](../advanced_config/parameter_reference.md#SDLOG_PROFILE) parameter). [Flight Review](../getting_started/flight_reporting.md) will then show an FFT plot for the roll, pitch and yaw controls.

:::warning

- Do not try to fix a vehicle that suffers from high vibrations with filter tuning! Instead fix the vehicle hardware setup.
- Confirm that PID gains, in particular D, are not set too high as this can show up as vibrations.
:::

Filter tuning is best done by reviewing flight logs. You can do multiple flights right after each other with different parameters and then inspect all logs, but make sure to disarm in between so that separate log files are created.

The performed flight maneuver can simply be hovering in [Manual/Stabilized mode](../flight_modes_mc/manual_stabilized.md) with some rolling and pitching to all directions and some increased throttle periods. The total duration does not need to be more than 30 seconds. In order to better compare, the maneuver should be similar in all tests.

First tune the gyro filter [IMU_GYRO_CUTOFF](../advanced_config/parameter_reference.md#IMU_GYRO_CUTOFF) by increasing it in steps of 10 Hz while using a low D-term filter value ([IMU_DGYRO_CUTOFF](../advanced_config/parameter_reference.md#IMU_DGYRO_CUTOFF) = 30). Upload the logs to [Flight Review](https://logs.px4.io) and compare the _Actuator Controls FFT_ plot. Set the cutoff frequency to a value before the noise starts to increase noticeably (for frequencies around and above 60 Hz).

Then tune the D-term filter (`IMU_DGYRO_CUTOFF`) in the same way. 请注意，如果 `IMU_GYRO_CUTOFF` 和 `IMU_DGYRO_CUTOFF` 设置太远(差别必须是重要的，尽管-e)。 . D=15, gyro=80。

Below is an example for three different `IMU_DGYRO_CUTOFF` filter values (40Hz, 70Hz, 90Hz). At 90 Hz the general noise level starts to increase (especially for roll), and thus a cutoff frequency of 70 Hz is a safe setting. ![IMU_DGYRO_CUTOFF=40](../../assets/config/mc/filter_tuning/actuator_controls_fft_dgyrocutoff_40.png) ![IMU_DGYRO_CUTOFF=70](../../assets/config/mc/filter_tuning/actuator_controls_fft_dgyrocutoff_70.png) ![IMU_DGYRO_CUTOFF=90](../../assets/config/mc/filter_tuning/actuator_controls_fft_dgyrocutoff_90.png)

::: info
The plot cannot be compared between different vehicles, as the y axis scale can be different.
On the same vehicle it is consistent and independent of the flight duration.
:::

If the flight plots shows significant low frequency spikes, like the one shown in the diagram below, you can remove it using a notch filter. In this case you might use the settings: [IMU_GYRO_NF0_FRQ=32](../advanced_config/parameter_reference.md#IMU_GYRO_NF0_FRQ) and [IMU_GYRO_NF0_BW=5](../advanced_config/parameter_reference.md#IMU_GYRO_NF0_BW) (note, this spike is narrower than usual). The low pass filters and the notch filter can be tuned independently (i.e. you don't need to set the notch filter before collecting the data for tuning the low pass filter).

![IMU_GYRO_NF0_FRQ=32 IMU_GYRO_NF0_BW=5](../../assets/config/mc/filter_tuning/actuator_controls_fft_gyro_notch_32.png)

## Additional Tips

1. Acceptable latency depends on vehicle size and expectations. FPV racers typically tune for the absolute minimal latency (as a ballpark `IMU_GYRO_CUTOFF` around 120, `IMU_DGYRO_CUTOFF` of 50 to 80). For bigger vehicles latency is less critical and `IMU_GYRO_CUTOFF` of around 80 might be acceptable.

1. You can start tuning at higher `IMU_GYRO_CUTOFF` values (e.g. 100Hz), which might be desirable because the default tuning of `IMU_GYRO_CUTOFF` is set very low (30Hz). The only caveat is that you must be aware of the risks:
   - Don't fly for more than 20-30 seconds
   - Check that the motors are not getting to hot
   - Listen for odd sounds and symptoms of excessive noise, as discussed above.
