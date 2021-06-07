# 온도 교정과 보상

PX4에는 센서 바이어스에 대한 센서 온도 변화의 영향에 대해 속도 자이로, 가속도계와 기압 센서를 보정합니다.

[테스트 환경](#test_setup)과 [보정 절차](#calibration_procedures)에 대하여 자세히 설명합니다. 마지막에는 [구현](#implementation) 과정을 대하여 설명합니다.

:::note
열 교정 후 열 교정 매개변수(`TC_*`)는 각 센서의 *모든* 교정과 보상에 사용됩니다. 따라서, 모든 후속 표준 보정은 "정상"`SYS_CAL_*` 보정 매개변수가 아닌 `TC_*` 매개변수를 업데이트합니다 (일부 경우, 이러한 매개변수가 재설정될 수 있음).
:::

:::note
작성 시점에서 (PX4 v1.11) 자력계의 열 교정은 아직 지원되지 않습니다.
:::

<span id="test_setup"></span>

## 테스트 설정 / 모범 사례

다음 섹션에 설명된 [교정 절차](#calibration_procedures)는 보드가 최저 작동에서 최고 작동 / 최고 작동 상태로 가열되므로 *환경 챔버* (온도 및 습도 제어 환경)에서 이상적으로 실행됩니다. 보정을 시작전에 보드를 *냉각*합니다 (최소 온도로 냉각하고 평형에 도달하도록 허용).

냉기의 경우 일반 가정용 냉동고를 사용하여 -20C를 달성할 수 있으며, 상업용 냉동고는 -40C 정도를 달성할 수 있습니다. 보드는 밀봉된 구멍을 통해 나오는 전원 리드와 함께 실리카 패킷이 들어있는 지퍼/정전기 방지 백에 넣어야 합니다. 냉기 후 백을 테스트 환경으로 옮길 수 있으며 동일한 백에서 테스트를 계속할 수 있습니다.

:::note
백/실리카는 보드에 결로 현상을 방지하기 위하여 사용합니다.
:::

상업용 환경 챔버없이 교정을 수행할 수 있습니다. 내부 공기량이 매우 적은 스티로폼 상자를 사용하여 간단한 환경 용기를 만들 수 있습니다. 이렇게하면 자동조종장치가 비교적 빠르게 공기를 자체 가열할 수 있습니다 (상자에 주변 실내 압력과 동일하게 만들 수 있는 작은 구멍이 있지만 여전히 내부를 가열할 수 있어야 합니다).

이러한 종류의 설정을 사용하여 보드를 약 70C까지 가열할 수 있습니다. 일화적인 증거는 많은 일반적인 보드가 부작용 없이 이 온도로 가열될 수 있음을 시사합니다. 확실하지 않은 경우에는, 제조업체에 안전 작동 범위를 확인하십시오.

:::tip
온보드 열 보정 상태를 확인하려면 MAVlink 콘솔(또는 NuttX 콘솔)을 사용하여 센서에서 보고된 내부 온도를 확인하십시오.
:::

<span id="calibration_procedures"></span>

## 교정 절차

PX4는 두 가지 보정 절차를 지원합니다.

* [온보드](#onboard_calibration) - 보드 자체에서 보정합니다. 이 방법을 사용하려면 테스트 설정으로 달성할 수있는 온도 상승값에 대한 지식이 필요합니다.
* [오프 보드](#offboard_calibration) - 보정 매개변수는 보정중 수집된 로그 정보를 기반으로 개발 컴퓨터에서 계산합니다. 이 방법으로 사용자는 데이터의 품질과 곡선 맞춤을 시각적으로 확인할 수 있습니다.

오프 보드 접근 방식은 더 복잡하고 느리지만, 테스트 설정에 대한 지식이 덜 필요하고 검증하기가 용이합니다.

<span id="onboard_calibration"></span>

### 온보드 교정 절차

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
9. Perform a 6-point accel calibration via the system console using `commander calibrate accel` or via *QGroundControl*. If the board is being set-up for the first time, the gyro and magnetometer calibration will also need to be performed.
10. The board should always be re-powered before flying after any sensor calibration, because sudden offset changes from calibration can upset the navigation estimator and some parameters are not loaded by the algorithms that use them until the next startup. 

<span id="offboard_calibration"></span>

### Offboard Calibration Procedure

Offboard calibration is run on a development computer using data collected during the calibration test. This method provides a way to visually check the quality of data and curve fit.

To perform an offboard calibration:

1. Ensure the frame type is set before calibration, otherwise calibration parameters will be lost when the board is setup.
2. Power up the board and set the [TC_A_ENABLE](../advanced_config/parameter_reference.md#TC_A_ENABLE), [TC_B_ENABLE](../advanced_config/parameter_reference.md#TC_B_ENABLE) and [TC_G_ENABLE](../advanced_config/parameter_reference.md#TC_G_ENABLE) parameters to `1`.
3. Set all [CAL_GYRO*](../advanced_config/parameter_reference.md#CAL_GYRO0_ID) and [CAL_ACC*](../advanced_config/parameter_reference.md#CAL_ACC0_ID) parameters to defaults.
4. Set the [SDLOG_MODE](../advanced_config/parameter_reference.md#SDLOG_MODE) parameter to 2 to enable logging of data from boot. 
5. Set the [SDLOG_PROFILE](../advanced_config/parameter_reference.md#SDLOG_PROFILE) checkbox for *thermal calibration* (bit 2) to log the raw sensor data required for calibration.
6. Cold soak the board to the minimum temperature it will be required to operate in.
7. Apply power and keeping the board still <sup id="fnref2:2"><a href="#fn:2" class="footnote-ref">2</a></sup>, warm it slowly to the maximum required operating temperature. <sup id="fnref2:3"><a href="#fn:3" class="footnote-ref">3</a></sup>
8. Remove power and extract the .ulog file.
9. Open a terminal window in the **Firmware/Tools** directory and run the python calibration script: 
        sh
        python process_sensor_caldata.py <full path name to .ulog file> This will generate a 
    
    **.pdf** file showing the measured data and curve fits for each sensor, and a **.params** file containing the calibration parameters.
10. Power the board, connect *QGroundControl* and load the parameter from the generated **.params** file onto the board using *QGroundControl*. Due to the number of parameters, loading them may take some time.
11. After parameters have finished loading, set `SDLOG_MODE` to 1 to re-enable normal logging and remove power.
12. Power the board and perform a normal accelerometer sensor calibration using *QGroundControl*. It is important that this step is performed when board is within the calibration temperature range. The board must be repowered after this step before flying as the sudden offset changes can upset the navigation estimator and some parameters are not loaded by the algorithms that use them until the next startup.

<span id="implementation"></span>

## Implementation Detail

Calibration refers to the process of measuring the change in sensor value across a range of internal temperatures, and performing a polynomial fit on the data to calculate a set of coefficients (stored as parameters) that can be used to correct the sensor data. Compensation refers to the process of using the internal temperature to calculate an offset that is subtracted from the sensor reading to correct for changing offset with temperature

The inertial rate gyro and accelerometer sensor offsets are calculated using a 3rd order polynomial, whereas the barometric pressure sensor offset is calculated using a 5th order polynomial. Example fits are show below:

![Thermal calibration gyro](../../assets/calibration/thermal_calibration_gyro.png)

![Thermal calibration accel](../../assets/calibration/thermal_calibration_accel.png)

![Thermal calibration barometer](../../assets/calibration/thermal_calibration_baro.png)

### Calibration Parameter Storage

With the existing parameter system implementation we are limited to storing each value in the struct as a separate entry. To work around this limitation the following logical naming convention is used for the [thermal compensation parameters](../advanced_config/parameter_reference.md#thermal-compensation):

    TC_[type][instance]_[cal_name]_[axis]
    

Where:

* `type`: is a single character indicating the type of sensor where `G` = rate gyroscope, `A` = accelerometer and `B` = barometer.
* `instance`: is an integer 0,1 or 2 allowing for calibration of up to three sensors of the same `type`.
* `cal_name`: is a string identifying the calibration value. It has the following possible values:
    
    * `Xn`: Polynomial coefficient where n is the order of the coefficient, e.g. `X3 * (temperature - reference temperature)**3`.
    * `SCL`: scale factor.
    * `TREF`: reference temperature (deg C).
    * `TMIN`: minimum valid temperature (deg C).
    * `TMAX`: maximum valid temperature (deg C).

* `axis`: is an integer 0,1 or 2 indicating that the calibration data is for X,Y or Z axis in the board frame of reference. For the barometric pressure sensor, the `axis` suffix is omitted.

Examples:

* [TC_G0_X3_0](../advanced_config/parameter_reference.md#TC_G0_X3_0) is the `^3` coefficient for the first gyro x-axis.
* [TC_A1_TREF](../advanced_config/parameter_reference.md#TC_A1_TREF) is the reference temperature for the second accelerometer.

### Calibration Parameter Usage

The correction for thermal offsets (using the calibration parameters) is performed in the [sensors module](../modules/modules_system.md#sensors). The reference temperature is subtracted from the measured temperature to obtain a delta temperature where:

    delta = measured_temperature - reference_temperature
    

The delta temperature is then used to calculate a offset, where:

    offset = X0 + X1*delta + X2*delta**2 + ... + Xn*delta**n
    

The offset and temperature scale factor are then used to correct the sensor measurement where:

    corrected_measurement = (raw_measurement - offset) * scale_factor
    

If the temperature is above the test range set by the `*_TMIN` and `*_TMAX` parameters, then the measured temperature will be clipped to remain within the limits.

Correction of the accelerometer, barometers or rate gyroscope data is enabled by setting [TC_A_ENABLE](../advanced_config/parameter_reference.md#TC_A_ENABLE), [TC_B_ENABLE](../advanced_config/parameter_reference.md#TC_B_ENABLE) or [TC_G_ENABLE](../advanced_config/parameter_reference.md#TC_G_ENABLE) parameters to 1 respectively.

### Compatibility with legacy `CAL_*` parameters and commander controlled calibration

The legacy temperature-agnostic PX4 rate gyro and accelerometer sensor calibration is performed by the commander module and involves adjusting offset, and in the case of accelerometer calibration, scale factor calibration parameters. The offset and scale factor parameters are applied within the driver for each sensor. These parameters are found in the [CAL parameter group](../advanced_config/parameter_reference.md#sensor-calibration).

Onboard temperature calibration is controlled by the events module and the corrections are applied within the sensors module before the sensor combined uORB topic is published. This means that if thermal compensation is being used, all of the corresponding legacy offset and scale factor parameters must be set to defaults of zero and unity before a thermal calibration is performed. If an on-board temperature calibration is performed, this will be done automatically, however if an offboard calibration is being performed it is important that the legacy `CAL*OFF` and `CAL*SCALE` parameters be reset before calibration data is logged.

If gyro thermal compensation has been enabled by setting the `TC_G_ENABLE` parameter to 1, then the commander controlled gyro calibration can still be performed, however it will be used to shift the compensation curve up or down by the amount required to zero the angular rate offset. It achieves this by adjusting the X0 coefficients.

If accel thermal compensation has been enabled by setting the `TC_A_ENABLE` parameter to 1, then the commander controlled 6-point accel calibration can still be performed, however instead of adjusting the `*OFF` and `*SCALE` parameters in the `CAL` parameter group, these parameters are set to defaults and the thermal compensation `X0` and `SCL` parameters are adjusted instead.

### Limitations

Scale factors are assumed to be temperature invariant due to the difficulty associated with measuring these at different temperatures. This limits the usefulness of the accelerometer calibration to those sensor models with stable scale factors. In theory with a thermal chamber or IMU heater capable of controlling IMU internal temperature to within a degree, it would be possible to perform a series of 6 sided accelerometer calibrations and correct the accelerometers for both offset and scale factor. Due to the complexity of integrating the required board movement with the calibration algorithm, this capability has not been included.

* * *

[^1]: The [SYS_CAL_ACCEL](../advanced_config/parameter_reference.md#SYS_CAL_ACCEL), [SYS_CAL_BARO](../advanced_config/parameter_reference.md#SYS_CAL_BARO) and [SYS_CAL_GYRO](../advanced_config/parameter_reference.md#SYS_CAL_GYRO) parameters are reset to 0 when the calibration is started.

[^2]: Calibration of the barometric pressure sensor offsets requires a stable air pressure environment. The air pressure will change slowly due to weather and inside buildings can change rapidly due to external wind fluctuations and HVAC system operation.[&#8617;](#fnref2:2){.footnote-backref}

[^3]: Care must be taken when warming a cold soaked board to avoid formation of condensation on the board that can cause board damage under some circumstances.[&#8617;](#fnref2:3){.footnote-backref}