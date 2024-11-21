# MC Filter Tuning & Control Latency

Filters can be used to trade off [control latency](#control-latency), which affects flight performance, and noise filtering, which impacts both flight performance and motor health.

Ця тема надає огляд затримки управління та настройки фільтрів в PX4.

:::info
Before filter tuning you should do a first pass at [Basic MC PID tuning](../config_mc/pid_tuning_guide_multicopter_basic.md).
The vehicle needs to be undertuned (the **P** and **D** gains should be set too low), such that there are no oscillations from the controller that could be interpreted as noise (the default gains might be good enough).
:::

## Затримка керування

The _control latency_ is the delay from a physical disturbance of the vehicle until the motors react to the change.

:::tip
Lowering latency allows you to increase the rate **P** gains, which results in better flight performance.
Навіть різниця в один мілісекунд може мати значний вплив.
:::

Наступні фактори впливають на затримку керування:

- М'яка конструкція або м'яка амортизація вібрацій збільшує затримку (вони діють як фільтр).
- Нижні фільтри у програмному забезпеченні та на мікросхемі датчика вимірювання компенсують збільшену затримку для покращеного фільтрування шуму.
- Внутрішні складові програмного забезпечення PX4: сигнали датчиків потрібно зчитати у драйвері, а потім пройти через контролер до виходного драйвера.
- The maximum gyro publication rate (configured with [IMU_GYRO_RATEMAX](../advanced_config/parameter_reference.md#IMU_GYRO_RATEMAX)).
  Вища частота знижує затримку, але вимагає більше обчислювальних ресурсів / може викликати голодування інших процесів.
  Частота 4 кГц або вище рекомендується лише для контролерів з процесором STM32H7 або новіше (значення 2 кГц близьке до межі для менш потужних процесорів).
- The IO chip (MAIN pins) adds about 5.4 ms latency compared to using the AUX pins (this does not apply to a _Pixracer_ or _Omnibus F4_, but does apply to a Pixhawk).
  Щоб уникнути затримки введення-виведення, підключіть мотори до додаткових контактів замість головних.
- PWM output signal: enable [Dshot](../peripherals/dshot.md) by preference to reduce latency (or One-Shot if DShot is not supported).
  The protocol is selected for a group of outputs during [Actuator Configuration](../config/actuators.md).

Нижче ми розглянемо вплив нижніх фільтрів.

## Фільтри

Це конвеєр фільтрації для контролерів у PX4:

- Вбудований фільтр нижніх частот (DLPF) для гіроскопа.
  Це вимикається на всіх чіпах, де це можливо (якщо ні, частота відсічки встановлюється на найвищому рівні чіпа).

- Фільтр вирівнювання на даних гіроскопа, який використовується для фільтрації вузькосмугового шуму, наприклад, гармоніки на частоті проходження лопаток ротора.
  This filter can be configured using [IMU_GYRO_NF0_BW](../advanced_config/parameter_reference.md#IMU_GYRO_NF0_BW) and [IMU_GYRO_NF0_FRQ](../advanced_config/parameter_reference.md#IMU_GYRO_NF0_FRQ).

- Фільтр нижніх частот на даних гіроскопа.
  It can be configured with the [IMU_GYRO_CUTOFF](../advanced_config/parameter_reference.md#IMU_GYRO_CUTOFF) parameter.

  ::: info
  Sampling and filtering is always performed at the full raw sensor rate (commonly 8kHz, depending on the IMU).

:::

- Окремий фільтр нижніх частот для терміну D.
  Термін D найбільш схильний до шуму, при цьому незначне збільшення затримки не негативно впливає на продуктивність.
  For this reason the D-term has a separately-configurable low-pass filter, [IMU_DGYRO_CUTOFF](../advanced_config/parameter_reference.md#IMU_DGYRO_CUTOFF).

- A optional slew-rate filter on the motor outputs.
  This rate may be configured as part of the [Multicopter Geometry](../config/actuators.md#motor-geometry-multicopter) when configuring actuators (which in turn modifies the [CA_Rn_SLEW](../advanced_config/parameter_reference.md#CA_R0_SLEW) parameters for each motor `n`).

Для зменшення затримки керування ми хочемо збільшити частоту відсічки для фільтрів нижніх частот.
The effect on latency of increasing `IMU_GYRO_CUTOFF` is approximated below.

| Частота відсічки (Гц) | Затримка (мс) |
| ---------------------------------------- | -------------------------------- |
| 30                                       | 8                                |
| 60                                       | 3.8              |
| 120                                      | 1.9              |

However this is a trade-off as increasing `IMU_GYRO_CUTOFF` will also increase the noise of the signal that is fed to the motors.
Шум на двигунах має наступні наслідки:

- Двигуни та регулятори обертання можуть нагріватися до такого рівня, коли вони пошкоджуються.
- Зменшення часу польоту, оскільки двигуни постійно змінюють свою швидкість.
- Видимі випадкові невеликі дрібні подергування.

Настройки, які мають значний спад нижньочастотного шуму (наприклад, через гармоніки на частоті проходження лопаток ротора), можуть вигідно використовувати фільтр вирівнювання, щоб очистити сигнал перед його подачею на фільтр нижніх частот (ці гармоніки мають схожий шкідливий вплив на двигуни, як і інші джерела шуму).
Без фільтра вирівнювання вам доведеться встановити частоту відсічки фільтра нижніх частот набагато нижче (збільшуючи затримку), щоб уникнути передачі цього шуму на двигуни.

:::info
Only one notch filter is provided.
Авіаструктури з більш ніж одним спадом шуму низької частоти, зазвичай очищають перший спад за допомогою фільтра вирівнювання, а наступні спади - за допомогою фільтра нижніх частот.
:::

Найкращі налаштування фільтра залежать від транспортного засобу.
За замовчуванням вони налаштовані консервативно - так, щоб вони працювали і на менш якісних налаштуваннях.

## Налаштування фільтра

First make sure to have the high-rate logging profile activated ([SDLOG_PROFILE](../advanced_config/parameter_reference.md#SDLOG_PROFILE) parameter).
[Flight Review](../getting_started/flight_reporting.md) will then show an FFT plot for the roll, pitch and yaw controls.

:::warning

- Не намагайтеся виправити транспортний засіб, який страждає від високих вібрацій, за допомогою налаштування фільтра!
  Замість цього виправте налаштування апаратного забезпечення транспортного засобу.
- Переконайтеся, що коефіцієнти PID, зокрема D, не встановлені занадто високо, оскільки це може виявитися як вібрації.

:::

Налаштування фільтрування найкраще виконувати, переглядаючи журнали польотів.
Ви можете зробити кілька польотів один за одним з різними параметрами, а потім перевірити всі журнали, але переконайтеся, що роззброїлись між ними, щоб створювалися окремі файли журналів.

The performed flight maneuver can simply be hovering in [Stabilized mode](../flight_modes_mc/manual_stabilized.md) with some rolling and pitching to all directions and some increased throttle periods.
Загальна тривалість не повинна перевищувати 30 секунд.
Щоб краще порівняти, маневр має бути схожим у всіх тестах.

First tune the gyro filter [IMU_GYRO_CUTOFF](../advanced_config/parameter_reference.md#IMU_GYRO_CUTOFF) by increasing it in steps of 10 Hz while using a low D-term filter value ([IMU_DGYRO_CUTOFF](../advanced_config/parameter_reference.md#IMU_DGYRO_CUTOFF) = 30).
Upload the logs to [Flight Review](https://logs.px4.io) and compare the _Actuator Controls FFT_ plot.
Встановіть частоту відсічки на значення, перше, ніж шум стане помітно зростати (для частот приблизно 60 Гц і вище).

Then tune the D-term filter (`IMU_DGYRO_CUTOFF`) in the same way.
Note that there can be negative impacts on performance if `IMU_GYRO_CUTOFF` and `IMU_DGYRO_CUTOFF` are set too far apart (the differences have to be significant though - e.g. D=15, gyro=80).

Below is an example for three different `IMU_DGYRO_CUTOFF` filter values (40Hz, 70Hz, 90Hz).
При 90 Гц загальний рівень шуму починає збільшуватися (особливо для крену), тому частота відсічки 70 Гц є безпечним налаштуванням.
![IMU\_DGYRO\_CUTOFF=40](../../assets/config/mc/filter_tuning/actuator_controls_fft_dgyrocutoff_40.png)
![IMU\_DGYRO\_CUTOFF=70](../../assets/config/mc/filter_tuning/actuator_controls_fft_dgyrocutoff_70.png)
![IMU\_DGYRO\_CUTOFF=90](../../assets/config/mc/filter_tuning/actuator_controls_fft_dgyrocutoff_90.png)

:::info
The plot cannot be compared between different vehicles, as the y axis scale can be different.
На тому ж транспортному засобі вона є послідовною і незалежною від тривалості польоту.
:::

Якщо графіки польоту показують значні піки низької частоти, подібні до показаного на діаграмі нижче, ви можете видалити їх за допомогою фільтра позбавлення.
In this case you might use the settings: [IMU_GYRO_NF0_FRQ=32](../advanced_config/parameter_reference.md#IMU_GYRO_NF0_FRQ) and [IMU_GYRO_NF0_BW=5](../advanced_config/parameter_reference.md#IMU_GYRO_NF0_BW) (note, this spike is narrower than usual).
Низкочастотні фільтри та фільтр позбавлення можна налаштовувати незалежно (тобто вам не потрібно встановлювати фільтр позбавлення перед збором даних для налаштування низкочастотного фільтра).

![IMU\_GYRO\_NF0\_FRQ=32 IMU\_GYRO\_NF0\_BW=5](../../assets/config/mc/filter_tuning/actuator_controls_fft_gyro_notch_32.png)

## Додаткові поради

1. Прийнятна затримка залежить від розміру транспортного засобу та очікувань.
   FPV racers typically tune for the absolute minimal latency (as a ballpark `IMU_GYRO_CUTOFF` around 120, `IMU_DGYRO_CUTOFF` of 50 to 80).
   For bigger vehicles latency is less critical and `IMU_GYRO_CUTOFF` of around 80 might be acceptable.

2. You can start tuning at higher `IMU_GYRO_CUTOFF` values (e.g. 100Hz), which might be desirable because the default tuning of `IMU_GYRO_CUTOFF` is set very low (30Hz).
   Однак вам потрібно бути обізнаними з ризиками:
   - Не літайте більше 20-30 секунд
   - Перевірте, що двигуни не нагріваються занадто сильно
   - Слухайте дивні звуки та симптоми надмірного шуму, як обговорено вище.
