# Thermal Calibration and Compensation

PX4 містить функцію калібрування та компенсації акселерометра, гіроскопа, магнітометра та датчиків барометричного тиску для впливу зміни температури датчика на зміщення датчика.

This topic details the [test environment](#test_setup) and [calibration procedures](#calibration_procedures). At the end there is a description of the [implementation](#implementation).

:::note
After thermal calibration, the thermal calibration parameters (`TC_*`) are used for _all_ calibration/compensation of the respective sensors. Any subsequent standard calibration will therefore update `TC_*` parameters and not the "normal" `SYS_CAL_*` calibration parameters (and in some cases these parameters may be reset).
:::

:::note
Releases up to PX4 v1.14, do not support thermal calibration of the magnetometer.
:::

<a id="test_setup"></a>

## Test Setup/Best Practice

[Процедури калібрування](#calibration_procedures), описані в наступних розділах, ідеально виконувати в _камері для навколишнього середовища_ (середовищі з контрольованою температурою та вологістю), оскільки плата нагрівається від найнижчої до найвищої робочої/ температура калібрування. Перед початком калібрування плату спочатку _замочують_ (охолоджують до мінімальної температури та дають їй досягти рівноваги).

:::note
Active electric heating elements will affect the magnetometer calibration values.
Ensure that heating elements are either inactive or sufficiently far from the sensor to avoid injecting noise into the magnetometer calibration.
:::

For the cold soak you can use a regular home freezer to achieve -20C, and commercial freezers can achieve of the order of -40C. The board should be placed in a ziplock/anti-static bag containing a silica packet, with a power lead coming out through a sealed hole. After the cold soak the bag can be moved to the test environment and the test continued in the same bag.

:::note
The bag/silica is to prevent condensation from forming on the board.
:::

It possible to perform the calibration without a commercial-grade environment chamber. A simple environment container can be created using a styrofoam box with a very small internal volume of air. This allows the autopilot to self-heat the air relatively quickly (be sure that the box has a small hole to equalize to ambient room pressure, but still be able to heat up inside).

Using this sort of setup it is possible to heat a board to ~70C. Anecdotal evidence suggests that many common boards can be heated to this temperature without adverse side effects. If in doubt, check the safe operating range with your manufacturer.

:::tip
To check the status of the onboard thermal calibration use the MAVlink console (or NuttX console) to check the reported internal temp from the sensor.
:::

<a id="calibration_procedures"></a>

## Calibration Procedures

PX4 supports two calibration procedures:

- [onboard](#onboard_calibration) - calibration is run on the board itself. This method requires knowledge of the amount of temperature rise that is achievable with the test setup.
- [offboard](#offboard_calibration) - compensation parameters are calculated on a development computer based on log information collected during the calibration procedure. This method allows users to visually check the quality of the data and curve-fit.

The offboard approach is more complex and slower, but requires less knowledge of the test setup and is easier to validate.

<a id="onboard_calibration"></a>

### Onboard Calibration Procedure

Onboard calibration is run entirely on the device. It require knowledge of the amount of temperature rise that is achievable with the test setup.

To perform and onboard calibration:

1. Ensure the frame type is set before calibration, otherwise calibration parameters will be lost when the board is setup.
2. Power the board and set the `SYS_CAL_*` parameters to 1 to enable calibration of the required sensors at the next startup. [^1]
3. Set the [SYS_CAL_TDEL](../advanced_config/parameter_reference.md#SYS_CAL_TDEL) parameter to the number of degrees of temperature rise required for the onboard calibrator to complete. If this parameter is too small, then the calibration will complete early and the temperature range for the calibration will not be sufficient to compensate when the board is fully warmed up. If this parameter is set too large, then the onboard calibrator will never complete. allowance should be made for the rise in temperature due to the boards self heating when setting this parameter. If the amount of temperature rise at the sensors is unknown, then the off-board method should be used.
4. Set the [SYS_CAL_TMIN](../advanced_config/parameter_reference.md#SYS_CAL_TMIN) parameter to the lowest temperature data that you want the calibrator to use. This enables a lower cold soak ambient temperature to be used to reduce the cold soak time whilst maintaining control over the calibration minimum temperature. The data for a sensor will not be used by the calibrator if it is below the value set by this parameter.
5. Set the [SYS_CAL_TMAX](../advanced_config/parameter_reference.md#SYS_CAL_TMAX) parameter to the highest starting sensor temperature that should be accepted by the calibrator. If the starting temperature is higher than the value set by this parameter, the calibration will exit with an error. Note that if the variation in measured temperature between different sensors exceeds the gap between `SYS_CAL_TMAX` and `SYS_CAL_TMIN`, then it will be impossible for the calibration to start.
6. Remove power and cold soak the board to below the starting temperature specified by the `SYS_CAL_TMIN` parameter. Note that there is a 10 second delay on startup before calibration starts to allow any sensors to stabilise and the sensors will warm internally during this period.
7. Keeping the board stationary[^2], apply power and warm to a temperature high enough to achieve the temperature rise specified by the `SYS_CAL_TDEL` parameter. The completion percentage is printed to the system console during calibration. [^3]
8. When the calibration completes, remove power, allow the board to cool to a temperature that is within the calibration range before performing the next step.
9. Perform a 6-point accel calibration via the system console using `commander calibrate accel` or via _QGroundControl_. If the board is being set-up for the first time, the gyro and magnetometer calibration will also need to be performed.
10. The board should always be re-powered before flying after any sensor calibration, because sudden offset changes from calibration can upset the navigation estimator and some parameters are not loaded by the algorithms that use them until the next startup.

<a id="offboard_calibration"></a>

### Offboard Calibration Procedure

Виносне калібрування виконується на комп’ютері розробки з використанням даних, зібраних під час випробування калібрування. Виносне калібрування виконується на комп’ютері розробки з використанням даних, зібраних під час випробування калібрування.

To perform an offboard calibration:

1. Ensure the frame type is set before calibration, otherwise calibration parameters will be lost when the board is setup.
1. Power up the board and set the [TC_A_ENABLE](../advanced_config/parameter_reference.md#TC_A_ENABLE), [TC_B_ENABLE](../advanced_config/parameter_reference.md#TC_B_ENABLE), [TC_G_ENABLE](../advanced_config/parameter_reference.md#TC_G_ENABLE), and [TC_M_ENABLE](../advanced_config/parameter_reference.md#TC_M_ENABLE) parameters to `1`.
1. Set all [CAL_ACC\*](../advanced_config/parameter_reference.md#CAL_ACC0_ID), [CAL_GYRO\*](../advanced_config/parameter_reference.md#CAL_GYRO0_ID), [CAL_MAG\*](../advanced_config/parameter_reference.md#CAL_MAG0_ID), and [CAL_BARO\*](../advanced_config/parameter_reference.md#CAL_BARO0_ID) parameters to defaults.
1. Set the [SDLOG_MODE](../advanced_config/parameter_reference.md#SDLOG_MODE) parameter to 2 to enable logging of data from boot.
1. Set the [SDLOG_PROFILE](../advanced_config/parameter_reference.md#SDLOG_PROFILE) checkbox for _thermal calibration_ (bit 2) to log the raw sensor data required for calibration.
1. Cold soak the board to the minimum temperature it will be required to operate in.
1. Apply power and keeping the board still [^2], warm it slowly to the maximum required operating temperature. [^3]
1. Remove power and extract the .ulog file.
1. Open a terminal window in the **Firmware/Tools** directory and run the python calibration script:

   ```sh
   python process_sensor_caldata.py <full path name to .ulog file>
   ```

   This will generate a **.pdf** file showing the measured data and curve fits for each sensor, and a **.params** file containing the calibration parameters.

1. Power the board, connect _QGroundControl_ and load the parameter from the generated **.params** file onto the board using _QGroundControl_. Due to the number of parameters, loading them may take some time.
1. After parameters have finished loading, set `SDLOG_MODE` to 1 to re-enable normal logging and remove power.
1. Power the board and perform a normal accelerometer sensor calibration using _QGroundControl_. It is important that this step is performed when board is within the calibration temperature range. The board must be repowered after this step before flying as the sudden offset changes can upset the navigation estimator and some parameters are not loaded by the algorithms that use them until the next startup.

<a id="implementation"></a>

## Implementation Detail

Калібрування відноситься до процесу зміни датчиків через діапазон внутрішніх температур, і виконання полінома відповідно до даних для обчислення набору коефіцієнтів (збережених як параметри), що може бути використане для виправлення даних датчика. Компенсація відноситься до процесу використання внутрішньої температури для обчислення зсуву, яке віднімається від читача датчика для виправлення температури

Зміщення датчиків акселерометра, гірометра обчислюється, використовуючи многочлен третього порядку, тоді як зсув з барометричного тиску розраховується з використанням многочлена 5-го порядку. Приклад переходів відображається нижче:

![Thermal calibration accel](../../assets/calibration/thermal_calibration_accel.png)

![Thermal calibration gyro](../../assets/calibration/thermal_calibration_gyro.png)

![Thermal calibration mag](../../assets/calibration/thermal_calibration_mag.png)

![Thermal calibration barometer](../../assets/calibration/thermal_calibration_baro.png)

### Calibration Parameter Storage

With the existing parameter system implementation we are limited to storing each value in the struct as a separate entry. To work around this limitation the following logical naming convention is used for the [thermal compensation parameters](../advanced_config/parameter_reference.md#thermal-compensation):

```sh
TC_[type][instance]_[cal_name]_[axis]
```

Where:

- `type`: is a single character indicating the type of sensor where `A` = accelerometer, `G` = rate gyroscope, `M` = magnetometer, and `B` = barometer.
- `instance`: is an integer 0,1 or 2 allowing for calibration of up to three sensors of the same `type`.
- `cal_name`: is a string identifying the calibration value. It has the following possible values:

  - `Xn`: Polynomial coefficient where n is the order of the coefficient, e.g. `X3 * (temperature - reference temperature)**3`.
  - `SCL`: scale factor.
  - `TREF`: reference temperature (deg C).
  - `TMIN`: minimum valid temperature (deg C).
  - `TMAX`: maximum valid temperature (deg C).

- `axis`: is an integer 0,1 or 2 indicating that the calibration data is for X,Y or Z axis in the board frame of reference. For the barometric pressure sensor, the `axis` suffix is omitted.

Examples:

- [TC_A1_TREF](../advanced_config/parameter_reference.md#TC_A1_TREF) is the reference temperature for the second accelerometer.
- [TC_G0_X3_0](../advanced_config/parameter_reference.md#TC_G0_X3_0) is the `^3` coefficient for the first gyro x-axis.

### Calibration Parameter Usage

The correction for thermal offsets (using the calibration parameters) is performed in the [sensors module](../modules/modules_system.md#sensors). The reference temperature is subtracted from the measured temperature to obtain a delta temperature where:

```
delta = measured_temperature - reference_temperature
```

The delta temperature is then used to calculate a offset, where:

```
offset = X0 + X1*delta + X2*delta**2 + ... + Xn*delta**n
```

The offset and temperature scale factor are then used to correct the sensor measurement where:

```
corrected_measurement = (raw_measurement - offset) * scale_factor
```

If the temperature is above the test range set by the `*_TMIN` and `*_TMAX` parameters, then the measured temperature will be clipped to remain within the limits.

Correction of the accelerometer, gyroscope, magnetometer, or barometer data is enabled by setting [TC_A_ENABLE](../advanced_config/parameter_reference.md#TC_A_ENABLE), [TC_G_ENABLE](../advanced_config/parameter_reference.md#TC_G_ENABLE), [TC_M_ENABLE](../advanced_config/parameter_reference.md#TC_M_ENABLE), or [TC_B_ENABLE](../advanced_config/parameter_reference.md#TC_B_ENABLE) parameters to 1 respectively.

### Compatibility with legacy `CAL_*` parameters and commander controlled calibration

The legacy temperature-agnostic PX4 rate gyro and accelerometer sensor calibration is performed by the commander module and involves adjusting offset, and in the case of accelerometer calibration, scale factor calibration parameters. The offset and scale factor parameters are applied within the driver for each sensor. These parameters are found in the [CAL parameter group](../advanced_config/parameter_reference.md#sensor-calibration).

Onboard temperature calibration is controlled by the events module and the corrections are applied within the sensors module before the sensor combined uORB topic is published. This means that if thermal compensation is being used, all of the corresponding legacy offset and scale factor parameters must be set to defaults of zero and unity before a thermal calibration is performed. If an on-board temperature calibration is performed, this will be done automatically, however if an offboard calibration is being performed it is important that the legacy `CAL*OFF` and `CAL*SCALE` parameters be reset before calibration data is logged.

If accel thermal compensation has been enabled by setting the `TC_A_ENABLE` parameter to 1, then the commander controlled 6-point accel calibration can still be performed. However, instead of adjusting the `*OFF` and `*SCALE` parameters in the `CAL` parameter group, these parameters are set to defaults and the thermal compensation `X0` and `SCL` parameters are adjusted instead.

If gyro thermal compensation has been enabled by setting the `TC_G_ENABLE` parameter to 1, then the commander controlled gyro calibration can still be performed, however it will be used to shift the compensation curve up or down by the amount required to zero the angular rate offset. It achieves this by adjusting the X0 coefficients.

Якщо термокомпенсацію магнітометра було ввімкнено шляхом установлення параметра `TC_M_ENABLE` на 1, тоді контрольоване 6-точковим калібруванням прискорення все ще можна виконати. Однак замість налаштування параметрів `*OFF` і `*SCALE` у групі параметрів `CAL` ці параметри встановлюються за замовчуванням, а теплова компенсація < Натомість налаштовуються параметри 0>X0</code> та `SCL`.

### Обмеження

Припустимо, що масштабні фактори незмінні температури внаслідок труднощів, пов'язаних з вимірюванням їх за різних температур. Це обмежує корисність калібрування акселерометра в цих сенсорних моделях з факторами стабільного масштабу. Виносне калібрування виконується на комп’ютері розробки з використанням даних, зібраних під час випробування калібрування. Через складність інтеграції необхідного руху дошки з алгоритмом калібрування ця можливість не включена.

---

[^1]: Параметри [SYS_CAL_ACCEL](../advanced_config/parameter_reference.md#SYS_CAL_ACCEL), [SYS_CAL_BARO](../advanced_config/parameter_reference.md#SYS_CAL_BARO) та [SYS_CAL_GYRO](../advanced_config/parameter_reference.md#SYS_CAL_GYRO) скидаються до 0 після початку калібрування.&#160;
&#8617;< /3></p> </fn>
    
    
[^2]:    
        Для калібрування зсувів датчика барометричного тиску потрібен стабільний тиск повітря. Тиск повітря змінюватиметься повільно через погоду, а всередині будівель може швидко змінюватися через коливання зовнішнього вітру та роботу системи ОВК.&#8617;</1 ></p> </fn>
        
        
[^3]:    
            Слід бути обережним під час нагрівання холодної дошки, щоб уникнути утворення конденсату на дошці, який за певних обставин може спричинити її пошкодження.&#8617;< /1></p> </fn></footnotes>
