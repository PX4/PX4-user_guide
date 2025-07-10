---
canonicalUrl: https://docs.px4.io/main/ja/getting_started/tunes
---

# Tune Meanings (Pixhawk Series)

[Pixhawk-series flight controllers](../flight_controller/pixhawk_series.md) use audible tones/tunes and [LEDs](../getting_started/led_meanings.md) to indicate vehicle state and events (e.g. arming success and failure, low battery warnings).

The set of standard sounds are listed below.

:::note
**Developers:** Tunes are defined in [/lib/tunes/tune_definition.desc](https://github.com/PX4/PX4-Autopilot/blob/master/src/lib/tunes/tune_definition.desc) and can be tested using the [tune-control](../modules/modules_system.md#tune-control) module.
:::

## Boot/Startup

These tunes are played during the boot sequence. <!-- https://github.com/PX4/PX4-Autopilot/blob/master/ROMFS/px4fmu_common/init.d/rcS -->

#### Startup Tone<audio controls> <source src="../../assets/tunes/1_startup_tone.mp3" type="audio/mpeg"> Your browser does not support the audio element. </audio> 

- microSD card successfully mounted (during boot).

#### Error Tune<audio controls> <source src="../../assets/tunes/2_error_tune.mp3" type="audio/mpeg"> Your browser does not support the audio element. </audio> 

- Hard fault has caused a system reboot.
- System set to use PX4IO but no IO present.
- UAVCAN is enabled but driver can't start.
- SITL/HITL enabled but *pwm_out_sim* driver can't start.
- FMU startup failed.

#### Make File System<audio controls> <source src="../../assets/tunes/16_make_fs.mp3" type="audio/mpeg"> Your browser does not support the audio element. </audio> 

- Formatting microSD card. 
- Mounting failed (if formatting succeeds boot sequence will try to mount again).
- No microSD card.

#### Format Failed<audio controls> <source src="../../assets/tunes/17_format_failed.mp3" type="audio/mpeg"> Your browser does not support the audio element. </audio> 

- Formatting microSD card failed (following previous attempt to mount card).

#### Program PX4IO<audio controls> <source src="../../assets/tunes/18_program_px4io.mp3" type="audio/mpeg"> Your browser does not support the audio element. </audio> 

- Starting to program PX4IO.

#### Program PX4IO Success<audio controls> <source src="../../assets/tunes/19_program_px4io_success.mp3" type="audio/mpeg"> Your browser does not support the audio element. </audio> 

- PX4IO programming succeeded.

#### Program PX4IO Fail<audio controls> <source src="../../assets/tunes/20_program_px4io_fail.mp3" type="audio/mpeg"> Your browser does not support the audio element. </audio> 

- PX4IO programming failed.
- PX4IO couldn't start.
- AUX Mixer not found.

## Operational

These tones/tunes are emitted during normal operation.

<span id="error_tune_operational"></span>

#### Error Tune<audio controls> <source src="../../assets/tunes/2_error_tune.mp3" type="audio/mpeg"> Your browser does not support the audio element. </audio> 

- RC Loss

#### Notify Positive Tone<audio controls> <source src="../../assets/tunes/3_notify_positive_tone.mp3" type="audio/mpeg"> Your browser does not support the audio element. </audio> 

- Calibration succeeded.
- Successful mode change.
- Command accepted (e.g. from MAVLink command protocol).
- Safety switch off (vehicle can be armed).

#### Notify Neutral Tone<audio controls> <source src="../../assets/tunes/4_notify_neutral_tone.mp3" type="audio/mpeg"> Your browser does not support the audio element. </audio> 

- Mission is valid and has no warnings.
- Airspeed calibration: supply more air pressure, or calibration complete.
- Safety switch turned on/disarmed (safe to approach vehicle).

#### Notify Negative Tone<audio controls> <source src="../../assets/tunes/5_notify_negative_tone.mp3" type="audio/mpeg"> Your browser does not support the audio element. </audio> 

- Calibration failed.
- Calibration already completed.
- Mission is invalid.
- Command denied, failed, temporarily rejected (e.g. from MAVLink command protocol).
- Arming/disarming transition denied (e.g. pre-flight checks failed, safety not disabled, system not in manual mode).
- Reject mode transition.

#### Arming Warning<audio controls> <source src="../../assets/tunes/6_arming_warning.mp3" type="audio/mpeg"> Your browser does not support the audio element. </audio> 

- Vehicle is now armed.

#### Arming Failure Tune<audio controls> <source src="../../assets/tunes/10_arming_failure_tune.mp3" type="audio/mpeg"> Your browser does not support the audio element. </audio> 

#### Battery Warning Slow<audio controls> <source src="../../assets/tunes/7_battery_warning_slow.mp3" type="audio/mpeg"> Your browser does not support the audio element. </audio> 

- Low battery warning ([failsafe](../config/safety.md#low-battery-failsafe)).

#### Battery Warning Fast<audio controls> <source src="../../assets/tunes/8_battery_warning_fast.mp3" type="audio/mpeg"> Your browser does not support the audio element. </audio> 

- Critical low battery warning ([failsafe](../config/safety.md#low-battery-failsafe)).

#### GPS Warning Slow<audio controls> <source src="../../assets/tunes/9_gps_warning_slow.mp3" type="audio/mpeg"> Your browser does not support the audio element. </audio> 

#### Parachute Release<audio controls> <source src="../../assets/tunes/11_parachute_release.mp3" type="audio/mpeg"> Your browser does not support the audio element. </audio> 

<!-- Does not appear to be used: TONE_PARACHUTE_RELEASE_TUNE -->

#### EKF Warning<audio controls> <source src="../../assets/tunes/12_ekf_warning.mp3" type="audio/mpeg"> Your browser does not support the audio element. </audio> 

<!-- Does not appear to be used: TONE_EKF_WARNING_TUNE -->

#### Baro Warning<audio controls> <source src="../../assets/tunes/13_baro_warning.mp3" type="audio/mpeg"> Your browser does not support the audio element. </audio> 

<!-- Does not appear to be used: TONE_BARO_WARNING_TUNE -->

#### Single Beep<audio controls> <source src="../../assets/tunes/14_single_beep.mp3" type="audio/mpeg"> Your browser does not support the audio element. </audio> 

- Magnetometer/Compass calibration: Notify user to start rotating vehicle.

#### Home Set Tune<audio controls> <source src="../../assets/tunes/15_home_set_tune.mp3" type="audio/mpeg"> Your browser does not support the audio element. </audio> 

- Home position initialised (first time only).