# 热校准和补偿

px4 包含校准和补偿速率陀螺仪、加速度计和气压传感器的功能, 以纠正传感器温度对传感器偏差的影响。

本主题详细介绍了 [测试环境](#test_setup) 和 [校准过程](#calibration_procedures)。 最后是 [实施过程](#implementation) 的描述。

## 测试设置/最佳实践 {#test_setup}

以下部分中描述的 [校准程序](#calibration_procedures) 是在理想的 *环境室*（温度和湿度受控的环境）中进行的，因为电路板被从最低温度加热到最高运行/校准温度。 在开始校准之前，首先将电路板 *冷却*（冷却至最低温度并使其达到平衡）。

对于冷却，您可以使用普通的家用冰箱达到 -20C，商用冰箱可以达到 -40C 的量级。 电路板应放在带有硅胶干燥剂包的拉链/防静电袋中，电源线通过密封孔引出。 冷却后，可将袋子移至测试环境，并在同一袋中继续测试。

> **Note**硅胶干燥剂包是为了防止水蒸气在电路板上冷凝。

可以在没有商业级环境室的情况下执行校准。 可以使用具有非常小的内部空气体积的泡沫塑料盒来创造一个简单的环境容器。 这允许自驾仪将空气相对快速地自加热（确保盒子有一个小孔以平衡容器内外压力，但仍然能够在容器内加热）。

使用这种设置可以将电路板加热到约 70C 。 轶事证据表明，许多普通板可以加热到这个温度而没有不良副作用。 如有疑问，请与制造商核实安全操作的温度范围。

> **Tip**要检查板载热校准的状态，请使用 MAVlink console（或 NuttX console）检查传感器报告的内部温度。

## 校准过程 {#calibration_procedures}

PX4 支持两种校准过程：

* [板载校准](#onboard_calibration) - 校准在电路板上运行。 该方法需要知道测试设置中可实现的温升量。
* [板外校准](#offboard_calibration) - 基于在校准过程期间收集的日志信息在计算机上计算补偿参数。 该方法允许用户可视地检查数据和曲线拟合的质量。

板外校准更复杂，速度更慢，但需要更少的测试设置知识，更容易验证。

### 板载校准过程 {#onboard_calibration}

板载校准完全在设备上运行。 它需要知道测试设置中可达到的温升量。

执行板载校准：

1. 确保在校准前设置机架类型，否则在设置飞控板时校准参数将丢失。
2. 为电路板供电并将 ` SYS_CAL _ * `参数设置为 1，以便在下次启动时启用所需传感器的校准。 [^1]
3. 将[ SYS_CAL_TDEL ](../advanced_config/parameter_reference.md#SYS_CAL_TDEL) 参数设置为板载校准器完成所需的温升度数。 如果此参数太小，则校准将提前完成，并且校准的温度范围将不足以在电路板完全预热时进行补偿。 如果此参数设置得太大，则板载校准器将永远不会完成。 在设置此参数时，应考虑到电路板自加热导致的温度升高。 如果传感器的温升量未知，则应使用板外校准方法。
4. 将 [ SYS_CAL_TMIN ](../advanced_config/parameter_reference.md#SYS_CAL_TMIN) 参数设置为您希望校准器发挥作用的最低温度数据。 更低的冷却温度能够用于减少冷却时间，同时保持对校准最低温度的控制。 如果校准器温度低于此参数设置的值，则不会使用传感器的数据。
5. 将 [ SYS_CAL_TMAX ](../advanced_config/parameter_reference.md#SYS_CAL_TMAX) 参数设置为校准器起作用的最高起始传感器温度。 如果起始温度高于此参数设置的值，校准将退出并报告错误。 注意，如果不同传感器测量的温度的差异超过 `SYS_CAL_TMAX ` 和 ` SYS_CAL_TMIN `的差值 ，则校准将不可能启动。
6. 断开电源并将电路板冷却至低于` SYS_CAL_TMIN `参数指定的起始温度。 请注意，在校准开始之前启动过程有10秒的延迟，以允许所有传感器稳定，并且传感器在此期间会内部发热。
7. 保持电路板静止[^2]，接通电源并加热到足够高的温度，以达到由` SYS_CAL_TDEL `参数指定的温升。 校准期间，完成百分比将打印到系统控制台。 [^3]
8. 校准完成后，断开电源，让电路板冷却到校准范围内的温度，然后再执行下一步。
9. 通过系统控制台使用 `commander calibrate accel` 指令或通过* QGroundControl *，执行6点加速度校准。 如果首次设置电路板，则还需要执行陀螺仪和磁力计校准。
10. The board should always be re-powered before flying after any sensor calibration, because sudden offset changes from calibration can upset the navigation estimator and some parameters are not loaded by the algorithms that use them until the next startup. 

### Offboard Calibration Procedure {#offboard_calibration}

Offboard calibration is run on a development computer using data collected during the calibration test. This method provides a way to visually check the quality of data and curve fit.

To perform an offboard calibration:

1. Ensure the frame type is set before calibration, otherwise calibration parameters will be lost when the board is setup.
2. Power up the board and set the `TC_A_ENABLE`, `TC_B_ENABLE` and `TC_G_ENABLE` parameters to 1.
3. Set all [CAL_GYRO*](../advanced_config/parameter_reference.md#CAL_GYRO0_EN) and [CAL_ACC*](../advanced_config/parameter_reference.md#CAL_ACC0_EN) parameters to defaults.
4. Set the [SYS_LOGGER](../advanced_config/parameter_reference.md#SYS_LOGGER) parameter to 1 to use the new system logger.
5. Set the [SDLOG_MODE](../advanced_config/parameter_reference.md#SDLOG_MODE) parameter to 2 to enable logging of data from boot. 
6. Set the [SDLOG_PROFILE](../advanced_config/parameter_reference.md#SDLOG_PROFILE) checkbox for *thermal calibration* (bit 2) to log the raw sensor data required for calibration.
7. Cold soak the board to the minimum temperature it will be required to operate in.
8. Apply power and keeping the board still <sup id="fnref2:2"><a href="#fn:2" class="footnote-ref">2</a></sup>, warm it slowly to the maximum required operating temperature. <sup id="fnref2:3"><a href="#fn:3" class="footnote-ref">3</a></sup>
9. Remove power and extract the .ulog file.
10. Open a terminal window in the **Firmware/Tools** directory and run the python calibration script script file: 
        sh
        python process_sensor_caldata.py <full path name to .ulog file> This will generate a 
    
    **.pdf** file showing the measured data and curve fits for each sensor, and a **.params** file containing the calibration parameters.
11. Power the board, connect *QGroundControl* and load the parameter from the generated **.params** file onto the board using *QGroundControl*. Due to the number of parameters, loading them may take some time.
12. After parameters have finished loading, set `SDLOG_MODE` to 1 to re-enable normal logging and remove power.
13. Power the board and perform a normal accelerometer sensor calibration using *QGroundControl*. It is important that this step is performed when board is within the calibration temperature range. The board must be repowered after this step before flying as the sudden offset changes can upset the navigation estimator and some parameters are not loaded by the algorithms that use them until the next startup.

## Implementation Detail {#implementation}

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

示例:

* [TC_G0_X3_0](../advanced_config/parameter_reference.md#TC_G0_X3_0) is the `^3` coefficient for the first gyro x-axis.
* [TC_A1_TREF](../advanced_config/parameter_reference.md#TC_A1_TREF) is the reference temperature for the second accelerometer.

### Calibration Parameter Usage

The correction for thermal offsets (using the calibration parameters) is performed in the [sensors module](https://dev.px4.io/en/middleware/modules_system.html#sensors). The reference temperature is subtracted from the measured temperature to obtain a delta temperature where:

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