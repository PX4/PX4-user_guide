---
canonicalUrl: https://docs.px4.io/main/zh/getting_started/tunes
---

# 蜂鸣器含义（Pixhawk系列）

[Pixhawk系列飞控](../flight_controller/pixhawk_series.md) 使用蜂鸣器 [LED](../getting_started/led_meanings.md) 来显示飞机的飞行状态和飞行事件（比如，解锁是否成功，低电量警告）。

下面列出一组标准蜂鸣器声音。

:::note
**Developers:** Tunes are defined in [/lib/tunes/tune_definition.desc](https://github.com/PX4/PX4-Autopilot/blob/release/1.13/src/lib/tunes/tune_definition.desc) and can be tested using the [tune-control](../modules/modules_system.md#tune-control) module. You can search for tune use using the string `TUNE_ID_name`(e.g. `TUNE_ID_PARACHUTE_RELEASE)
:::


## 启动

These tunes are played during the boot sequence.
<!-- https://github.com/PX4/PX4-Autopilot/blob/release/1.13/ROMFS/px4fmu_common/init.d/rcS --> 


#### 启动声音

<audio controls>
  <source src="../../assets/tunes/1_startup_tone.mp3" type="audio/mpeg">
Your browser does not support the audio element.
</audio>
<!-- tune: 1, STARTUP -->

- SD卡成功挂载（启动过程）。

#### 错误声音

<audio controls>
  <source src="../../assets/tunes/2_error_tune.mp3" type="audio/mpeg">
Your browser does not support the audio element.
</audio>
<!-- tune 2, ERROR_TUNE -->

- 硬件错误导致系统重启。
- 系统设置使用PX4IO但IO不存在。
- UAVCAN已启用，但驱动无法启动。
- SITL/HITL enabled but *pwm_out_sim* driver can't start.
- FMU启动失败。


#### 创建文件系统

<audio controls>
  <source src="../../assets/tunes/16_make_fs.mp3" type="audio/mpeg">
Your browser does not support the audio element.
</audio>
<!-- 14, SD_INIT (previously tune 16) -->

- 格式化SD卡。
- 挂载失败（如果格式化成功，启动程序将尝试再次挂载）。
- 未安装SD卡。


#### 格式化失败

<audio controls>
  <source src="../../assets/tunes/17_format_failed.mp3" type="audio/mpeg">
Your browser does not support the audio element.
</audio>
<!-- 15, SD_ERROR (previously 17) -->

- 格式化SD卡失败（曾经试图挂载SD卡）。


#### 执行PX4IO

<audio controls>
  <source src="../../assets/tunes/18_program_px4io.mp3" type="audio/mpeg">
Your browser does not support the audio element.
</audio>
<!-- 16, PROG_PX4IO (previously id 18) -->

- 开始执行PX4IO程序。

#### PX4IO执行成功

<audio controls>
  <source src="../../assets/tunes/19_program_px4io_success.mp3" type="audio/mpeg">
Your browser does not support the audio element.
</audio>
<!-- 17, PROG_PX4IO_OK (previously tune 19) -->

- PX4IO程序执行成功。

#### PX4IO程序执行失败

<audio controls>
  <source src="../../assets/tunes/20_program_px4io_fail.mp3" type="audio/mpeg">
Your browser does not support the audio element.
</audio>
<!-- 18, PROG_PX4IO_ERR (previously tune 20) -->

- PX4IO程序执行失败。
- PX4IO无法执行。
- 未找到AUX混控器。


## 操作过程中

These tones/tunes are emitted during normal operation.

<a id="error_tune_operational"></a>

#### 错误声音

<audio controls>
  <source src="../../assets/tunes/2_error_tune.mp3" type="audio/mpeg">
Your browser does not support the audio element.
</audio>
<!-- 2, ERROR_TUNE -->

- 遥控丢失

#### 正常通知声音

<audio controls>
  <source src="../../assets/tunes/3_notify_positive_tone.mp3" type="audio/mpeg">
Your browser does not support the audio element.
</audio>
<!-- 3, NOTIFY_POSITIVE -->

- 校准成功。
- 飞行模式成功改变。
- 指令接收（例如，接收MAVlink命令协议）。
- 安全开关关闭（飞行器已经解锁）。

#### 中立通知声音

<audio controls>
  <source src="../../assets/tunes/4_notify_neutral_tone.mp3" type="audio/mpeg">
Your browser does not support the audio element.
</audio>
<!-- 4, NOTIFY_NEUTRAL -->

- 任务有效，没有警告。
- 空速校准：提供更多气压或校准完成。
- 安全开关打开/未解锁（可以安全靠近飞行器）。

#### 负面通知声音

<audio controls>
  <source src="../../assets/tunes/5_notify_negative_tone.mp3" type="audio/mpeg">
Your browser does not support the audio element.
</audio>
<!-- 5, NOTIFY_NEGATIVE -->

- 校准失败。
- 校准已经完成。
- 任务无效。
- 指令拒绝，失败，暂时拒绝（例如，来自MAVLink命令协议）。
- 解锁/加锁过程被拒绝（例如，起飞前检查失败，安全未禁用，系统不在手动模式）。
- 拒绝模式过渡。

#### 加锁警告

<audio controls>
  <source src="../../assets/tunes/6_arming_warning.mp3" type="audio/mpeg">
Your browser does not support the audio element.
</audio>
<!-- 6, ARMING_WARNING -->

- 飞行器正在加锁。

#### 加锁失败声音

<audio controls>
  <source src="../../assets/tunes/10_arming_failure_tune.mp3" type="audio/mpeg">
Your browser does not support the audio element.
</audio>
<!-- 10, ARMING_FAILURE -->

- Arming failed

#### 电池低电量警告

<audio controls>
  <source src="../../assets/tunes/7_battery_warning_slow.mp3" type="audio/mpeg">
Your browser does not support the audio element.
</audio>
<!-- 7,  BATTERY_WARNING_SLOW -->

- Low battery warning ([failsafe](../config/safety.md#low-battery-failsafe)).

#### 电量消耗过快警告

<audio controls>
  <source src="../../assets/tunes/8_battery_warning_fast.mp3" type="audio/mpeg">
Your browser does not support the audio element.
</audio>
<!-- 8, BATTERY_WARNING_FAST -->

- Critical low battery warning ([failsafe](../config/safety.md#low-battery-failsafe)).


#### GPS信号弱警告

<audio controls>
  <source src="../../assets/tunes/9_gps_warning_slow.mp3" type="audio/mpeg">
Your browser does not support the audio element.
</audio>
<!-- 9,  GPS_WARNING -->

#### 降落伞释放

<audio controls>
  <source src="../../assets/tunes/11_parachute_release.mp3" type="audio/mpeg">
Your browser does not support the audio element.
</audio>
<!-- 11, PARACHUTE_RELEASE -->

- Parachute release triggered.


#### Single Beep

<audio controls>
  <source src="../../assets/tunes/14_single_beep.mp3" type="audio/mpeg">
Your browser does not support the audio element.
</audio>
<!-- 12, SINGLE_BEEP (previously was id 14 -->

- Magnetometer/Compass calibration: Notify user to start rotating vehicle.

#### Home Set Tune

<audio controls>
  <source src="../../assets/tunes/15_home_set_tune.mp3" type="audio/mpeg">
Your browser does not support the audio element.
</audio>
<!-- 13, HOME_SET (previously id 15) -->

- Home position initialised (first time only).

#### Power Off Tune

<audio controls>
  <source src="../../assets/tunes/power_off_tune.mp3" type="audio/mpeg">
Your browser does not support the audio element.
</audio>

- Vehicle powering off.

<!--19, POWER_OFF -->
