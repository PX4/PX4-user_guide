# Аналіз журналу за допомогою огляду польоту

Діаграми [огляду польоту](http://logs.px4.io) для польоту можуть бути використані для аналізу загального стану транспортного засобу.

Сюжети мають бути зрозумілими самі по собі, але для того, щоб знати, які діапазони є прийнятними і як повинен виглядати сюжет, потрібен деякий досвід. Ця сторінка пояснює, як інтерпретувати графіки та визначити загальні проблеми.

## Загальне використання

Особливості, які є загальними для багатьох сюжетів:

- Колір фону сюжету використовується для позначення режиму польоту під час запису (де графіки залежать від режиму): ![Flight Modes](../../assets/flight_log_analysis/flight_review/flight_modes.png)
  - **Режим польоту:** Колір фону на тілі графіку вказує на режим польоту. Наведення курсору миші на діаграму показує мітки режиму польоту.
  - **Режим польоту VTOL:** Транспортні засоби VTOL додатково показують режим VTOL як фоновий колір у нижній частині графіку (синій для багатокоптерних, жовтий для фіксованих крил та червоний для переходу).
- Прокручування мишею на певній вісі графіка зумовлює збільшення цієї вісі (горизонтально або вертикально).
- Прокручування миші всередині графіка збільшує обидва вісі.

<a id="tracking"></a>

## Виконання відстеження PID

Залежно від режиму польоту, контролери транспортного засобу можуть намагатися відстежувати установочні точки положення, швидкості, висоти або швидкості (відстежувані установочні точки залежать від режиму, наприклад: в режимі стабілізації немає установочної точки швидкості).

Лінія **Оцінена** (червона) повинна бути якомога ближчою до **Установленої точки** (зелена). Якщо вони цього не роблять, у більшості випадків потрібно налаштувати коефіцієнти ПІД цього контролера.

[Посібник з налаштування PID для багатокоптерів](../config_mc/pid_tuning_guide_multicopter.md) містить приклади графіків та інформацію про аналіз результатів слідкування.

:::tip
Для контролера швидкості важливо увімкнути профіль високої швидкості журналювання ([SDLOG_PROFILE](../advanced_config/parameter_reference.md#SDLOG_PROFILE)), щоб отримати більше деталей при збільшенні масштабу.
:::

## Вібрація

Вібрація є однією з найпоширеніших проблем для багатороторних транспортних засобів. Високі рівні вібрації можуть призвести до:
- менш ефективний польот і скорочений час польоту
- двигуни можуть нагрітися
- збільшене зношування матеріалу
- неможливість налаштувати транспортний засіб тісно, що призводить до погіршення польотних характеристик.
- обрізання сенсора
- оцінка позиції провалилася, що потенційно призводить до збоїв.

Тому важливо слідкувати за рівнем вібрації та вдосконалювати налаштування у разі необхідності.

Є точка, де рівень вібрації однозначно занадто високий, і, як правило, нижчі рівні вібрації краще. Однак є широкий діапазон між 'все в порядку' та 'рівні занадто високі'. Цей діапазон залежить від кількох факторів, включаючи розмір транспортного засобу - оскільки більші транспортні засоби мають вищу інерцію, що дозволяє більше програмного фільтрування (у той ж час вібрації на більших транспортних засобах мають меншу частоту).

Наступні абзаци та розділи надають інформацію про те, які графіки використовувати для перевірки рівнів вібрації, та як їх аналізувати.

:::tip
Варто розглянути кілька графіків при аналізі вібрації (різні графіки можуть краще підкреслити деякі проблеми).
:::

### Керування приводами FFT

:::info Необхідно активувати профіль високочастотного ведення журналу ([SDLOG_PROFILE](../advanced_config/parameter_reference.md#SDLOG_PROFILE)), щоб побачити цей графік.
:::

Цей графік показує частотний графік для відвалу, крена та осі курсу на основі сигналу керування приводами (вихід PID від контролера швидкості). Це допомагає визначити частотні піки та налаштувати програмні фільтри. Повинен бути лише один пік на найнижчому кінці (нижче близько 20 Гц), решта повинна бути низькою та плоскою.

Зверніть увагу, що масштабування по осі Y відрізняється для різних транспортних засобів, але журнали з одного й того ж транспортного засобу можуть бути безпосередньо порівняні між собою.

#### Приклади: Хороша вібрація

[QAV-R 5" Гонщик](../frames_multicopter/qav_r_5_kiss_esc_racer.md) рамка (відмінна вібрація).

![Low vibration QAV-R 5 Racer - FFT plot](../../assets/flight_log_analysis/flight_review/vibrations_good_actuator_controls_fft.png)

:::info Відмінні вібраційні характеристики вищезазначеної рами означають, що ми можемо значно збільшити частоту відсічення [програмних фільтрів](../config_mc/filter_tuning.md) (зменшуючи затримку управління).
:::

Каркас DJI F450 (добре вібрує).

![Low vibration DJI F450 - FFT plot](../../assets/flight_log_analysis/flight_review/vibrations_f450_actuator_controls_fft.png)

Каркас S500:

![Low vibration S500 actuator controls - FFT plot](../../assets/flight_log_analysis/flight_review/vibrations_s500_actuator_controls_fft.png)

:::info Хоча графік вище виглядає добре, графік сирового прискорення для цього ж польоту показує, що рівні вібрації трохи високі для x та y. [Raw Acceleration graph for the same flight](#raw_acc_s500) Це хороший приклад того, чому варто перевіряти кілька графіків!
:::

#### Приклади: Погана вібрація

Цей приклад показує пік частоти близько 50 Гц (у цьому випадку через "вільне" шасі).

![Vibrations in landing gear - FFT plot](../../assets/flight_log_analysis/flight_review/vibrations_landing_gear_actuator_controls_fft.png)


### Спектральна густина потужності прискорення

Це двовимірний графік частот, що показує частотну відповідь сирих даних акселерометра з часом (він відображає суму для вісей x, y та z). Чим більше жовтий ділянка, тим вище частотна відповідь в цей час і частоту.

Ідеально лише найнижча частина до кількох Гц є жовтою, а решта в основному зелена або синя.


#### Приклади: Гарна вібрація

[QAV-R 5" Гонщик](../frames_multicopter/qav_r_5_kiss_esc_racer.md) рамка (відмінна вібрація).

![Low vibration QAV-R 5 Racer - spectral density plot](../../assets/flight_log_analysis/flight_review/vibrations_good_spectral.png)
<!-- https://logs.px4.io/plot_app?log=cd88b091-ec89-457c-85f6-e63e4fa0f51d -->

Каркас DJI F450 (добре вібрує). ![Low vibration DJI F450 - spectral density plot](../../assets/flight_log_analysis/flight_review/vibrations_f450_spectral.png)

:::info
Вище ви можете побачити частоту проходження лопатей гвинтів приблизно 100 Гц.
:::

Каркас S500: ![Vibration S500 - spectral density plot](../../assets/flight_log_analysis/flight_review/vibrations_s500_spectral.png)


#### Приклади: Погана вібрація

Міцні жовті лінії приблизно на 100 Гц вказують на можливу проблему, яка вимагає подальшого вивчення (починаючи з перегляду інших діаграм).

![High vibration in spectral density plot](../../assets/flight_log_analysis/flight_review/vibrations_too_high_spectral.png)

Цей графік нижче показує пік частоти близько 50 Гц (у цьому випадку через "вільне" шасі).

:::tip
Це вказує на можливу проблему тому, що це сильна низька частота, що близька до динаміки автомобіля.
Зі стандартними налаштуваннями фільтрації на частоті 80 Гц вібрації на частоті 50 Гц не будуть фільтруватися.
:::

![Vibrations in landing gear - spectral density plot](../../assets/flight_log_analysis/flight_review/vibrations_landing_gear_spectral.png)


Дуже висока (небезпечна) вібрація! Зверніть увагу, що графік майже повністю жовтий.

:::warning
Не слід літати з такими високими рівнями вібрації.
:::

![Exceedingly high vibration in spectral density plot](../../assets/flight_log_analysis/flight_review/vibrations_exceedingly_high_spectral.png)


### Raw Acceleration

Цей графік показує сирі вимірювання акселерометра для вісей x, y та z. Ідеально, якщо кожна лінія тонка і чітко показує прискорення транспортного засобу.

Зазвичай, якщо графік по осі z торкається графіка по осях x/y під час наведення або повільного польоту, рівні вібрації є занадто високими.

:::tip
Найкращий спосіб використання цього графіка - трохи збільшити масштаб, де транспортний засіб перебуває в повітрі.
:::

#### Приклади: Хороша вібрація

[QAV-R 5" Гонщик](../frames_multicopter/qav_r_5_kiss_esc_racer.md) рамка (відмінна вібрація).

![Low vibration QAV-R 5 Racer - raw accel. plot](../../assets/flight_log_analysis/flight_review/vibrations_good_accel.png)

DJI F450 кадр (добра вібрація). ![Low vibration DJI F450 - raw accel. plot](../../assets/flight_log_analysis/flight_review/vibrations_f450_accel.png)

<!-- https://logs.px4.io/plot_app?log=cd88b091-ec89-457c-85f6-e63e4fa0f51d -->


#### Приклади: Погана вібрація

<a id="raw_acc_s500"></a>
Каркас S500. Рівні вібрації на межі - трохи високі для x та y (що є типовим для конструкції S500). This is at the limit where it starts to negatively affect flight performance.

![Borderline vibration S500 x, y - raw accel. plot](../../assets/flight_log_analysis/flight_review/vibrations_s500_accel.png)


Vibration too high. Note how the graph of the z-axis overlaps with the x/y-axis graph:

![Vibrations in landing gear - raw accel. plot](../../assets/flight_log_analysis/flight_review/vibrations_landing_gear_accel.png)


Vibration levels are too high. Note how the graph of the z-axis overlaps with the x/y-axis graph:

![High vibration in raw accel. plot](../../assets/flight_log_analysis/flight_review/vibrations_too_high_accel.png)


Very high (unsafe) vibration levels.

:::warning
You should not fly with such high vibration levels.
:::

![Exceedingly high vibration in raw accel. plot](../../assets/flight_log_analysis/flight_review/vibrations_exceedingly_high_accel.png)


<a id="fifo_logging"></a>

### Raw High-rate IMU Data Plots

For an in-depth analysis there is an option to log the raw IMU data at full rate (several kHz, depending on the IMU). This allows inspection of much higher frequencies than with normal logging, which can help when selecting vibration mounts or configuring low-pass and notch filters appropriately.

To use it, some parameters need to be changed:
- Set [IMU_GYRO_RATEMAX](../advanced_config/parameter_reference.md#IMU_GYRO_RATEMAX) to 400. This ensures that the raw sensor data is more efficiently packed when sent from the sensor to the rest of the system, and reduces the log size (without reducing useful data). 
  <!-- Explanation in https://github.com/PX4/PX4-user_guide/pull/751/files#r440509688
  Data is sent in a fixed size array that will largely empty if sent at higher rate. The "empty data" is also logged.-->
- Use a good SD card, as the IMU data requires a high logging bandwidth (Flight Review will show dropouts if the logging rate gets too high).

:::tip
See [Logging > SD Cards](../dev_log/logging.md#sd-cards) for a comparison of popular SD card.
:::

- Enable either the gyro or accel high-rate FIFO profile in [SDLOG_PROFILE](../advanced_config/parameter_reference.md#SDLOG_PROFILE) and disable the rest of the entries. If you are using a really good SD card (seeing few/no dropouts), you can:
  - either enable both accel and gyro profiles
  - or enable accel/gyro plus the default logging profile

Example plot:

![high-rate accel power spectral density](../../assets/flight_log_analysis/flight_review/accel_spectral_density_fifo.png)

::: info
Data of the first IMU is logged, which is not necessarily the same as the one used for flying.
This is mostly only important in cases where IMU's are mounted differently (e.g. hard-mounted vs. soft-mounted).
:::

::: info
Do not forget to restore the parameters after testing.
:::

<a id="solutions"></a>

### Fixing Vibration Problems

Often a source of vibration (or combination of multiple sources) cannot be identified from logs alone.

In this case the vehicle should be inspected. [Vibration Isolation](../assembly/vibration_isolation.md) explains some basic things you can check (and do) to reduce vibration levels.



## Actuator Outputs

The *Actuator Outputs* graph shows the signals that are sent to the individual actuators (motors/servos). Generally it is in the range between the minimum and maximum configured PWM values (e.g. from 1000 to 2000).

This is an example for a quadrotor where everything is OK (all of the signals are within the range, approximately overlap each other, and are not too noisy): ![Good actuator outputs](../../assets/flight_log_analysis/flight_review/actuator_outputs_good.png)

The plot can help to identify different problems:
- If one or more of the signals is at the maximum over a longer time, it means the controller runs into **saturation**. It is not necessarily a problem, for example when flying at full throttle this is expected. But if it happens for example during a mission, it's an indication that the vehicle is overweight for the amount of thrust that it can provide.
- For a multicopter the plot can be a good indication if the vehicle is **imbalanced**. It shows in the plot that one or more neighboring motors (two in case of a quadrotor) need to run at higher thrust on average. Note that this can also be the case if some motors provide more thrust than others or the ESCs are not calibrated. An imbalanced vehicle is generally not a big problem as the autopilot will automatically account for it. However it reduces the maximum achievable thrust and puts more strain on some motors, so it is better to balance the vehicle.
- An imbalance can also come from the yaw axis. The plot will look similar as in the previous case, but opposite motors will run higher or lower respectively. The cause is likely that one or more motors are tilted.

  This is an example from a hexarotor: motors 1, 3 and 6 run at higher thrust: ![Hexrotor imbalanced actuator outputs](../../assets/flight_log_analysis/flight_review/actuator_outputs_hex_imbalanced.png)
  <!-- https://logs.px4.io/plot_app?log=9eca6934-b657-4976-a32f-b2e56535f05f -->
- If the signals look very **noisy** (with high amplitudes), it can have two causes: sensor noise or vibrations passing through the controller (this shows up in other plots as well, see previous section) or too high PID gains. This is an extreme example: ![Noisy actuator outputs - extreme case](../../assets/flight_log_analysis/flight_review/actuator_outputs_noisy.png)


## GPS Uncertainty

The *GPS Uncertainty* plot shows information from the GPS device:
- Number of used satellites (should be around 12 or higher)
- Horizontal position accuracy (should be below 1 meter)
- Vertical position accuracy (should be below 2 meters)
- GPS fix: this is 3 for a 3D GPS fix, 4 for GPS + Dead Reckoning, 5 for RTK float and 6 for RTK fixed type


## GPS Noise & Jamming

The GPS Noise & Jamming plot is useful to check for GPS signal interferences and jamming. The GPS signal is very weak and thus it can easily be disturbed/jammed by components transmitting (via cable) or radiating in a frequency used by the GPS.

:::tip USB
3 is [known to be](https://www.usb.org/sites/default/files/327216.pdf) an effective GPS jamming source.
:::

The **jamming indicator** should be around or below 40. Values around 80 or higher are too high and the setup must be inspected. Signal interference is also noticeable as reduced accuracy and lower number of satellites up to the point where no GPS fix is possible.

This is an example without any interference:

![GPS jamming - good plot](../../assets/flight_log_analysis/flight_review/gps_jamming_good.png)


## Thrust and Magnetic Field

The *Thrust and Magnetic Field* plot shows the thrust and the norm of the magnetic sensor measurement vector.

The norm should be constant over the whole flight and uncorrelated with the thrust. This is a good example where the norm is very close to constant: ![Thrust and mag close to constant](../../assets/flight_log_analysis/flight_review/thrust_and_mag_good.png)

*If it is correlated*, it means that the current drawn by the motors (or other consumers) is influencing the magnetic field. This must be avoided as it leads to incorrect yaw estimation. The following plot shows a strong correlation between the thrust and the norm of the magnetometer: ![Correlated thrust and mag](../../assets/flight_log_analysis/flight_review/thrust_and_mag_correlated.png)

Solutions to this are:
- Use an external magnetometer (avoid using the internal magnetometer)
- If using an external magnetometer, move it further away from strong currents (i.e. by using a (longer) GPS mast).

If the norm is uncorrelated but not constant, most likely it is not properly calibrated. However it could also be due to external disturbances (for example when flying close to metal constructs).

This example shows that the norm is non-constant, but it does not correlate with the thrust: ![Uncorrelated thrust and mag](../../assets/flight_log_analysis/flight_review/thrust_and_mag_uncorrelated_problem.png)


## Estimator Watchdog

The *Estimator Watchdog* plot shows the health report of the estimator. It should be constant zero.

This is what it should look like if there are no problems: ![Estimator watchdog - good](../../assets/flight_log_analysis/flight_review/estimator_watchdog_good.png)

If one of the flags is non-zero, the estimator detected a problem that needs to be further investigated. Most of the time it is an issue with a sensor, for example magnetometer interferences. It usually helps to look at the plots of the corresponding sensor.
<!-- TODO: separate page for estimator issues? -->

Here is an example with magnetometer problems: ![Estimator watchdog with magnetometer problems](../../assets/flight_log_analysis/flight_review/estimator_watchdog_mag_problem.png)


## Sampling Regularity of Sensor Data

The sampling regularity plot provides insights into problems with the logging system and scheduling.

The amount of **logging dropouts** start to increase if the log buffer is too small, the logging rate is too high or a low-quality SD card is used.

::: info
Occasional dropouts can be expected on medium quality cards.
:::

The **delta t** shows the time difference between two logged IMU samples. It should be close to 4 ms because the data publishing rate is 250Hz. If there are spikes that are a multiple of that (and the estimator time slip does not increase), it means the logger skipped some samples. Occasionally this can happen because the logger runs at lower priority. If there are spikes that are not a multiple, it indicates an irregular sensor driver scheduling, which needs to be investigated.

The **estimator timeslip** shows the difference between the current time and the time of the integrated sensor intervals up to that time. If it changes it means either the estimator missed sensor data or the driver publishes incorrect integration intervals. It should stay at zero, but it can increase slightly for in-flight parameter changes, which is generally not an issue.

This is a good example: ![Sampling regularity good](../../assets/flight_log_analysis/flight_review/sampling_regularity_good.png)

The following example contains too many dropouts, the quality of the used SD card was too low in that case (see [here](../dev_log/logging.md#sd-cards) for good SD cards):

![Many Dropouts](../../assets/flight_log_analysis/flight_review/sampling_regularity_many_drops.png)

## Logged Messages

This is a table with system error and warning messages. For example they show when a task becomes low on stack size.

The messages need to be examined individually, and not all of them indicate a problem. For example the following shows a kill-switch test: ![Logged Messages](../../assets/flight_log_analysis/flight_review/logged_messages.png)


## Flight/Frame Log Review Examples

It is often worth looking at multiple charts for a particular flight when analyzing vehicle condition (different charts can better highlight some issues). This is particularly important when reviewing for possible vibration problems.

The section below groups a few (previously presented) charts by flight/vehicle.

### QAV-R 5" Racer

These charts are all from the same flight of a [QAV-R 5" Racer](../frames_multicopter/qav_r_5_kiss_esc_racer.md).
<!-- https://logs.px4.io/plot_app?log=cd88b091-ec89-457c-85f6-e63e4fa0f51d -->

They show a vehicle that has very low vibration:
- Actuator Controls FFT shows only a single peak at the lowest end, with the rest low and flat.
- Spectral density is mostly green, with only a little yellow at the low frequencies.
- Raw Acceleration has z-axis trace well separated from the x/y-axis traces.

![Low vibration QAV-R 5 Racer - FFT plot](../../assets/flight_log_analysis/flight_review/vibrations_good_actuator_controls_fft.png)

![Low vibration QAV-R 5 Racer - spectral density plot](../../assets/flight_log_analysis/flight_review/vibrations_good_spectral.png)

![Low vibration QAV-R 5 Racer - raw accel. plot](../../assets/flight_log_analysis/flight_review/vibrations_good_accel.png)


### DJI F450

These charts are all from the same flight of a *DJI F450*.
<!-- https://logs.px4.io/plot_app?log=cd88b091-ec89-457c-85f6-e63e4fa0f51d -->

They show a vehicle that has low vibration (but not as low as the QAV-R above!):
- Actuator Controls FFT shows a peak at the lowest end. Most of the rest is flat, except for a bump at around 100Hz (this is the blade passing frequency of the propellers).
- Spectral density is mostly green. The blade passing frequency is again visible.
- Raw Acceleration has z-axis trace well separated from the x/y-axis traces.

![Low vibration DJI F450 - FFT plot](../../assets/flight_log_analysis/flight_review/vibrations_f450_actuator_controls_fft.png)

![Low vibration DJI F450 - spectral density plot](../../assets/flight_log_analysis/flight_review/vibrations_f450_spectral.png)

![Low vibration DJI F450 - raw accel. plot](../../assets/flight_log_analysis/flight_review/vibrations_f450_accel.png)


### S500

These charts are all from the same flight of an S500.

They show a vehicle that has borderline-acceptable vibration:
- Actuator Controls FFT shows a peak at the lowest end. Most of the rest is flat, except for a bump at around 100Hz.
- Spectral density is mostly green, but more yellow than for the DJI F450 at 100Hz.
- Raw Acceleration has z-axis trace fairly close to the x/y-axis traces. This is at the limit where it starts to negatively affect flight performance.

![Low vibration S500 actuator controls - FFT plot](../../assets/flight_log_analysis/flight_review/vibrations_s500_actuator_controls_fft.png)

![Vibration S500 - spectral density plot](../../assets/flight_log_analysis/flight_review/vibrations_s500_spectral.png)

![Borderline vibration S500 x, y - raw accel. plot](../../assets/flight_log_analysis/flight_review/vibrations_s500_accel.png)
