# Термальне калібрування та компенсація

PX4 містить функцію калібрування та компенсації акселерометра, гіроскопа, магнітометра та датчиків барометричного тиску для впливу зміни температури датчика на зміщення датчика.

This topic details the [test environment](#test_setup) and [calibration procedures](#calibration_procedures).
At the end there is a description of the [implementation](#implementation).

:::info
After thermal calibration, the thermal calibration parameters (`TC_*`) are used for _all_ calibration/compensation of the respective sensors.
Any subsequent standard calibration will therefore update `TC_*` parameters and not the "normal" `SYS_CAL_*` calibration parameters (and in some cases these parameters may be reset).
:::

:::info
Releases up to PX4 v1.14, do not support thermal calibration of the magnetometer.
:::

<a id="test_setup"></a>

## Тестування налаштувань та найкращі практики

The [calibration procedures](#calibration_procedures) described in the following sections are ideally run in an _environmental chamber_ (a temperature and humidity controlled environment) as the board is heated from the lowest to the highest operating/calibration temperature.
Before starting the calibration, the board is first _cold soaked_ (cooled to the minimum temperature and allowed to reach equilibrium).

:::info
Active electric heating elements will affect the magnetometer calibration values.
Переконайтеся, що нагрівальні елементи або неактивні, або достатньо далеко від датчика, щоб уникнути введення шуму в калібрування магнітометра.
:::

Для заморожування можна використовувати звичайну домашню морозильну камеру для досягнення температури -20°C, а комерційні морозильні камери можуть досягати температури приблизно -40°C.
Дошку слід помістити в пакет з антистатичної плівки або замкнуту у спеціальну сумку з силікагелем, з проводом живлення, який виходить через герметично закриту отвір.
Після заморожування пакет можна перемістити до тестового середовища, і тест можна продовжити в тому ж пакеті.

:::info
The bag/silica is to prevent condensation from forming on the board.
:::

Так, можливо провести калібрування без камери комерційного класу.
Можна створити простий контейнер для середовища, використовуючи пінопластову коробку з дуже малим внутрішнім об'ємом повітря.
Це дозволяє автопілоту самостійно нагрівати повітря досить швидко (переконайтеся, що коробка має невелике отвірчик, щоб вирівняти тиск з оточуючим повітрям, але все ж може нагрітися всередині).

За допомогою такого типу установки можна нагріти плату приблизно до 70 °C.
Анекдотичні дані свідчать, що багато поширених плат можна нагріти до цієї температури без негативних побічних ефектів.
Якщо у вас є сумніви, перевірте безпечний діапазон роботи у виробника.

:::tip
To check the status of the onboard thermal calibration use the MAVlink console (or NuttX console) to check the reported internal temp from the sensor.
:::

<a id="calibration_procedures"></a>

## Принципи калібрування

PX4 підтримує два процедури калібрування:

- [onboard](#onboard_calibration) - calibration is run on the board itself. Цей метод вимагає знань про те, наскільки можливе підвищення температури з використанням тестового устаткування.
- [offboard](#offboard_calibration) - compensation parameters are calculated on a development computer based on log information collected during the calibration procedure. Цей метод дозволяє користувачам візуально перевіряти якість даних та підгонку кривої.

Підхід offboard є складнішим і повільнішим, але вимагає менше знань про тестове обладнання і є легше перевірити.

<a id="onboard_calibration"></a>

### Процедура калібрування на борті

Онбордне калібрування виконується повністю на пристрої. Для цього потрібно мати уявлення про те, наскільки можна підвищити температуру за допомогою тестового обладнання.

Для проведення калібрування на борту виконайте такі кроки:

1. Переконайтеся, що тип рами встановлено перед калібруванням, інакше параметри калібрування будуть втрачені, коли плата буде налаштована.
2. Power the board and set the `SYS_CAL_*` parameters to 1 to enable calibration of the required sensors at the next startup. [^1]
3. Set the [SYS_CAL_TDEL](../advanced_config/parameter_reference.md#SYS_CAL_TDEL) parameter to the number of degrees of temperature rise required for the onboard calibrator to complete. Якщо цей параметр встановлено занадто великим, вбудований калібратор ніколи не завершиться. При встановленні цього параметра слід враховувати підвищення температури через самонагрівання плати. Якщо кількість підвищення температури на датчиках невідома, то слід використовувати метод калібрування поза межами плати. Якщо цей параметр встановлено занадто великим, вбудований калібратор ніколи не завершиться. при встановленні цього параметра слід враховувати підвищення температури через самонагрівання плати. Якщо кількість підвищення температури на датчиках невідома, то слід використовувати метод калібрування поза межами плати.
4. Set the [SYS_CAL_TMIN](../advanced_config/parameter_reference.md#SYS_CAL_TMIN) parameter to the lowest temperature data that you want the calibrator to use. Це дозволяє використовувати більш низьку початкову амбієнтну температуру для зменшення часу охолодження, зберігаючи при цьому контроль над мінімальною температурою калібрування. Дані для датчика не будуть використані калібратором, якщо вони будуть нижчими, ніж значення, встановлене цим параметром.
5. Set the [SYS_CAL_TMAX](../advanced_config/parameter_reference.md#SYS_CAL_TMAX) parameter to the highest starting sensor temperature that should be accepted by the calibrator. Якщо початкова температура вища, ніж значення, встановлене цим параметром, калібрування завершиться з помилкою. Note that if the variation in measured temperature between different sensors exceeds the gap between `SYS_CAL_TMAX` and `SYS_CAL_TMIN`, then it will be impossible for the calibration to start.
6. Remove power and cold soak the board to below the starting temperature specified by the `SYS_CAL_TMIN` parameter. Зауважте, що перед початком калібрування існує 10-секундна затримка під час запуску, щоб дозволити будь-яким датчикам стабілізуватися, і датчики будуть нагріватися всередині протягом цього періоду.
7. Keeping the board stationary[^2], apply power and warm to a temperature high enough to achieve the temperature rise specified by the `SYS_CAL_TDEL` parameter. Відсоток виконання друкується на системній консолі під час калібрування. [^3]
8. Вимкніть живлення та залиште плату для охолодження до температури, яка знаходиться в межах діапазону калібрування, перш ніж виконати наступний крок.
9. Perform a 6-point accel calibration via the system console using `commander calibrate accel` or via _QGroundControl_. Якщо плата встановлюється вперше, також потрібно виконати калібрування гіроскопа та магнітомера.
10. Після калібрування датчиків до політів завжди потрібно перезавантажити плату, оскільки раптові зміни зміщень від калібрування можуть спотворити навігаційний оцінювач, і деякі параметри не завантажуються алгоритмами, які використовують їх, до наступного запуску.

<a id="offboard_calibration"></a>

### Процедура позабортового калібрування

Виносне калібрування виконується на комп’ютері розробки з використанням даних, зібраних під час випробування калібрування. Виносне калібрування виконується на комп’ютері розробки з використанням даних, зібраних під час випробування калібрування.

Щоб виконати автономне калібрування:

1. Переконайтеся, що тип рами встановлено перед калібруванням, інакше параметри калібрування будуть втрачені, коли плата буде налаштована.

2. Power up the board and set the [TC_A_ENABLE](../advanced_config/parameter_reference.md#TC_A_ENABLE), [TC_B_ENABLE](../advanced_config/parameter_reference.md#TC_B_ENABLE), [TC_G_ENABLE](../advanced_config/parameter_reference.md#TC_G_ENABLE), and [TC_M_ENABLE](../advanced_config/parameter_reference.md#TC_M_ENABLE) parameters to `1`.

3. Set all [CAL_ACC\*](../advanced_config/parameter_reference.md#CAL_ACC0_ID), [CAL_GYRO\*](../advanced_config/parameter_reference.md#CAL_GYRO0_ID), [CAL_MAG\*](../advanced_config/parameter_reference.md#CAL_MAG0_ID), and [CAL_BARO\*](../advanced_config/parameter_reference.md#CAL_BARO0_ID) parameters to defaults.

4. Set the [SDLOG_MODE](../advanced_config/parameter_reference.md#SDLOG_MODE) parameter to 2 to enable logging of data from boot.

5. Set the [SDLOG_PROFILE](../advanced_config/parameter_reference.md#SDLOG_PROFILE) checkbox for _thermal calibration_ (bit 2) to log the raw sensor data required for calibration.

6. Охолодіть дошку до мінімальної температури, при якій вона буде потрібна для роботи.

7. Apply power and keeping the board still [^2], warm it slowly to the maximum required operating temperature. [^3]

8. Вимкніть живлення та розпакуйте файл .ulog.

9. Open a terminal window in the **Firmware/Tools** directory and run the python calibration script:

   ```sh
   python process_sensor_caldata.py <full path name to .ulog file>
   ```

   This will generate a **.pdf** file showing the measured data and curve fits for each sensor, and a **.params** file containing the calibration parameters.

10. Power the board, connect _QGroundControl_ and load the parameter from the generated **.params** file onto the board using _QGroundControl_. Відсоток виконання друкується на системній консолі під час калібрування.

11. After parameters have finished loading, set `SDLOG_MODE` to 1 to re-enable normal logging and remove power.

12. Power the board and perform a normal accelerometer sensor calibration using _QGroundControl_. Важливо, щоб цей крок було виконано, коли плата знаходиться в межах діапазону температури калібрування. Після цього кроку плата повинна бути знову увімкнена перед польотом, оскільки раптові зміни зміщення можуть налякати оцінювач навігації, і деякі параметри не завантажуються алгоритмами, що використовують їх, до наступного запуску.

<a id="implementation"></a>

## Деталі реалізації

Калібрування відноситься до процесу зміни датчиків через діапазон внутрішніх температур, і виконання полінома відповідно до даних для обчислення набору коефіцієнтів (збережених як параметри), що може бути використане для виправлення даних датчика. Компенсація відноситься до процесу використання внутрішньої температури для обчислення зсуву, яке віднімається від читача датчика для виправлення температури

Зміщення датчиків акселерометра, гірометра обчислюється, використовуючи многочлен третього порядку, тоді як зсув з барометричного тиску розраховується з використанням многочлена 5-го порядку. Приклад переходів відображається нижче:

![Thermal calibration accel](../../assets/calibration/thermal_calibration_accel.png)

![Thermal calibration gyro](../../assets/calibration/thermal_calibration_gyro.png)

![Thermal calibration mag](../../assets/calibration/thermal_calibration_mag.png)

![Thermal calibration barometer](../../assets/calibration/thermal_calibration_baro.png)

### Зберігання параметрів калібрування

З існуючою реалізацією системи параметрів ми обмежені збереженням кожного значення в структурі як окремого запису. To work around this limitation the following logical naming convention is used for the [thermal compensation parameters](../advanced_config/parameter_reference.md#thermal-compensation):

```sh
TC_[type][instance]_[cal_name]_[axis]
```

Де:

- `type`: is a single character indicating the type of sensor where `A` = accelerometer, `G` = rate gyroscope, `M` = magnetometer, and `B` = barometer.

- `instance`: is an integer 0,1 or 2 allowing for calibration of up to three sensors of the same `type`.

- `cal_name`: is a string identifying the calibration value. Він має такі можливі значення:

  - `Xn`: Polynomial coefficient where n is the order of the coefficient, e.g. `X3 * (temperature - reference temperature)**3`.
  - `SCL`: scale factor.
  - `TREF`: reference temperature (deg C).
  - `TMIN`: minimum valid temperature (deg C).
  - `TMAX`: maximum valid temperature (deg C).

- `axis`: is an integer 0,1 or 2 indicating that the calibration data is for X,Y or Z axis in the board frame of reference. For the barometric pressure sensor, the `axis` suffix is omitted.

Приклади:

- [TC_A1_TREF](../advanced_config/parameter_reference.md#TC_A1_TREF) is the reference temperature for the second accelerometer.
- [TC_G0_X3_0](../advanced_config/parameter_reference.md#TC_G0_X3_0) is the `^3` coefficient for the first gyro x-axis.

### Використання параметрів калібрування

The correction for thermal offsets (using the calibration parameters) is performed in the [sensors module](../modules/modules_system.md#sensors).
Еталонна температура віднімається від виміряної температури, щоб отримати дельта-температуру, де:

```
delta = measured_temperature - reference_temperature
```

Потім дельта-температура використовується для розрахунку зсуву, де:

```
offset = X0 + X1*delta + X2*delta**2 + ... + Xn*delta**n
```

Зсув і температурний масштабний коефіцієнт потім використовуються для корекції вимірювання датчика, де:

```
corrected_measurement = (raw_measurement - offset) * scale_factor
```

If the temperature is above the test range set by the `*_TMIN` and `*_TMAX` parameters, then the measured temperature will be clipped to remain within the limits.

Correction of the accelerometer, gyroscope, magnetometer, or barometer data is enabled by setting [TC_A_ENABLE](../advanced_config/parameter_reference.md#TC_A_ENABLE), [TC_G_ENABLE](../advanced_config/parameter_reference.md#TC_G_ENABLE), [TC_M_ENABLE](../advanced_config/parameter_reference.md#TC_M_ENABLE), or [TC_B_ENABLE](../advanced_config/parameter_reference.md#TC_B_ENABLE) parameters to 1 respectively.

### Compatibility with legacy `CAL_*` parameters and commander controlled calibration

Застаріле калібрування гіроскопа й датчика акселерометра PX4 із температурним агностиком виконується модулем керування та передбачає налаштування зміщення, а у випадку калібрування акселерометра — параметрів калібрування масштабного коефіцієнта. Параметри зсуву та масштабного коефіцієнта застосовуються в драйвері для кожного датчика. These parameters are found in the [CAL parameter group](../advanced_config/parameter_reference.md#sensor-calibration).

Калібрування бортової температури контролюється модулем подій, а виправлення застосовуються в модулі датчиків перед тим, як буде опубліковано тему комбінованого датчика uORB. Це означає, що якщо використовується термокомпенсація, для всіх відповідних попередніх параметрів зміщення та масштабного коефіцієнта потрібно встановити значення за замовчуванням нуль і одиницю перед виконанням теплового калібрування. If an on-board temperature calibration is performed, this will be done automatically, however if an offboard calibration is being performed it is important that the legacy `CAL*OFF` and `CAL*SCALE` parameters be reset before calibration data is logged.

If accel thermal compensation has been enabled by setting the `TC_A_ENABLE` parameter to 1, then the commander controlled 6-point accel calibration can still be performed.
However, instead of adjusting the `*OFF` and `*SCALE` parameters in the `CAL` parameter group, these parameters are set to defaults and the thermal compensation `X0` and `SCL` parameters are adjusted instead.

If gyro thermal compensation has been enabled by setting the `TC_G_ENABLE` parameter to 1, then the commander controlled gyro calibration can still be performed, however it will be used to shift the compensation curve up or down by the amount required to zero the angular rate offset. Це досягається шляхом регулювання коефіцієнтів X0.

If magnetometer thermal compensation has been enabled by setting the `TC_M_ENABLE` parameter to 1, then the commander controlled 6-point accel calibration can still be performed.
However, instead of adjusting the `*OFF` and `*SCALE` parameters in the `CAL` parameter group, these parameters are set to defaults and the thermal compensation `X0` and `SCL` parameters are adjusted instead.

### Обмеження

Припустимо, що масштабні фактори незмінні температури внаслідок труднощів, пов'язаних з вимірюванням їх за різних температур. Це обмежує корисність калібрування акселерометра в цих сенсорних моделях з факторами стабільного масштабу. Виносне калібрування виконується на комп’ютері розробки з використанням даних, зібраних під час випробування калібрування. Через складність інтеграції необхідного руху дошки з алгоритмом калібрування ця можливість не включена.

---

[^1]: The [SYS_CAL_ACCEL](../advanced_config/parameter_reference.md#SYS_CAL_ACCEL), [SYS_CAL_BARO](../advanced_config/parameter_reference.md#SYS_CAL_BARO) and [SYS_CAL_GYRO](../advanced_config/parameter_reference.md#SYS_CAL_GYRO) parameters are reset to 0 when the calibration is started.

[^2]: Для калібрування зсувів датчика барометричного тиску потрібен стабільний тиск повітря. The air pressure will change slowly due to weather and inside buildings can change rapidly due to external wind fluctuations and HVAC system operation.

[^3]: Care must be taken when warming a cold soaked board to avoid formation of condensation on the board that can cause board damage under some circumstances.
