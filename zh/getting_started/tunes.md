# 蜂鸣器含义（Pixhawk系列）

[Pixhawk系列飞控](../flight_controller/pixhawk_series.md) 使用蜂鸣器 [LED](../getting_started/led_meanings.md) 来显示飞机的飞行状态和飞行事件（比如，解锁是否成功，低电量警告）。

下面列出一组标准蜂鸣器声音。

> **开发者备注：** 声音被定义在 [/lib/tunes/tune_definition.desc](https://github.com/PX4/Firmware/blob/master/src/lib/tunes/tune_definition.desc)使用 [tunecontrol](https://dev.px4.io/en/middleware/modules_system.html#tunecontrol) 模块可以进行测试。

## 启动

在启动场景播放如下音乐。 <!-- https://github.com/PX4/Firmware/blob/master/ROMFS/px4fmu_common/init.d/rcS -->

#### 启动声音<audio controls> <source src="../../assets/tunes/1_startup_tone.mp3" type="audio/mpeg"> Your browser does not support the audio element. </audio> 

- SD卡成功挂载（启动过程）。

#### 错误声音<audio controls> <source src="../../assets/tunes/2_error_tune.mp3" type="audio/mpeg"> Your browser does not support the audio element. </audio> 

- 硬件错误导致系统重启。
- 系统设置使用PX4IO但IO不存在。
- UAVCAN已启用，但驱动无法启动。
- SITL/HITL已启用，但是 *pwm仿真输出* 驱动无法启动。
- FMU启动失败。

#### 创建文件系统<audio controls> <source src="../../assets/tunes/16_make_fs.mp3" type="audio/mpeg"> Your browser does not support the audio element. </audio> 

- 格式化SD卡。 
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

#### Error Tune {#error_tune_operational}<audio controls> <source src="../../assets/tunes/2_error_tune.mp3" type="audio/mpeg"> Your browser does not support the audio element. </audio> 

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