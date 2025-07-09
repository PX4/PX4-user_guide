---
canonicalUrl: https://docs.px4.io/main/zh/advanced_config/sensor_thermal_calibration
---

# 热校准和补偿

PX4 contains functionality to calibrate and compensate accelerometer, gyro, magnetometer, and barometric pressure sensors for the effect of changing sensor temperature on sensor bias.

本主题详细介绍了 [测试环境](#test_setup) 和 [校准过程](#calibration_procedures)。 最后是 [实施过程](#implementation) 的描述。

:::note
After thermal calibration, the thermal calibration parameters (`TC_*`) are used for _all_ calibration/compensation of the respective sensors. Any subsequent standard calibration will therefore update `TC_*` parameters and not the "normal" `SYS_CAL_*` calibration parameters (and in some cases these parameters may be reset).
:::

:::note
Releases up to PX4 v1.14, do not support thermal calibration of the magnetometer.
:::

<a id="test_setup"></a>

## 测试设置/最佳实践

The [calibration procedures](#calibration_procedures) described in the following sections are ideally run in an _environmental chamber_ (a temperature and humidity controlled environment) as the board is heated from the lowest to the highest operating/calibration temperature. Before starting the calibration, the board is first _cold soaked_ (cooled to the minimum temperature and allowed to reach equilibrium).

:::note
Active electric heating elements will affect the magnetometer calibration values.
Ensure that heating elements are either inactive or sufficiently far from the sensor to avoid injecting noise into the magnetometer calibration.
:::

对于冷却，您可以使用普通的家用冰箱达到 -20C，商用冰箱可以达到 -40C 的量级。 The board should be placed in a ziplock/anti-static bag containing a silica packet, with a power lead coming out through a sealed hole. 冷却后，可将袋子移至测试环境，并在同一袋中继续测试。

:::note
防静电袋和硅胶干燥剂是为了防止水蒸气在电路板上冷凝。
:::

它可以在没有商业级环境房间的情况下进行校准。 可以使用内部空间很小的泡沫塑料盒来创造一个简单的环境容器。 这允许自驾仪将空气相对快速地自加热（确保盒子有一个小孔以平衡容器内外压力，但仍然能够在容器内加热）。

使用这种设置可以将电路板加热到约 70C 。 经验表明，许多普通电路板可以加热到这个温度不会产生不良副作用。 如有疑问，请与制造商核实安全操作的温度范围。

:::tip
要检查板上的热校准状态，请使用 MAVlink 控制台(或NuttX 控制台) 检查来自传感器的报告的内部温度。
:::

<a id="calibration_procedures"></a>

## 校准过程

PX4 支持两种校准过程：

- [板载校准](#onboard_calibration) - 校准在电路板上运行。 该方法需要知道测试设置中可实现的温升量。
- [板外校准](#offboard_calibration) - 基于在校准过程期间收集的日志信息在计算机上计算补偿参数。 该方法允许用户可视地检查数据和曲线拟合的质量。

The offboard approach is more complex and slower, but requires less knowledge of the test setup and is easier to validate.

<a id="onboard_calibration"></a>

### 板载校准过程

Onboard calibration is run entirely on the device. It require knowledge of the amount of temperature rise that is achievable with the test setup.

To perform and onboard calibration:

1. 确保在校准前设置机架类型，否则在设置飞控板时校准参数将丢失。
2. 为电路板供电并将 ` SYS_CAL _ * `参数设置为 1，以便在下次启动时启用所需传感器的校准。 [^1]
3. 将[ SYS_CAL_TDEL ](../advanced_config/parameter_reference.md#SYS_CAL_TDEL) 参数设置为板载校准器完成所需的温升度数。 如果此参数太小，则校准将提前完成，并且校准的温度范围将不足以在电路板完全预热时进行补偿。 如果此参数设置得太大，则板载校准器将永远不会完成。 在设置此参数时，应考虑到电路板自加热导致的温度升高。 如果传感器的温升量未知，则应使用板外校准方法。
4. 将 [ SYS_CAL_TMIN ](../advanced_config/parameter_reference.md#SYS_CAL_TMIN) 参数设置为您希望校准器发挥作用的最低温度数据。 更低的冷却温度能够用于减少冷却时间，同时保持对校准最低温度的控制。 如果校准器温度低于此参数设置的值，则不会使用传感器的数据。
5. 将 [ SYS_CAL_TMAX ](../advanced_config/parameter_reference.md#SYS_CAL_TMAX) 参数设置为校准器起作用的最高起始传感器温度。 如果起始温度高于此参数设置的值，校准将退出并报告错误。 注意，如果不同传感器测量的温度的差异超过 `SYS_CAL_TMAX ` 和 ` SYS_CAL_TMIN `的差值 ，则校准将不可能启动。
6. 断开电源并将电路板冷却至低于` SYS_CAL_TMIN `参数指定的起始温度。 请注意，在校准开始之前启动过程有10秒的延迟，以允许所有传感器稳定，并且传感器在此期间会内部发热。
7. 保持电路板静止[^2]，接通电源并加热到足够高的温度，以达到由` SYS_CAL_TDEL `参数指定的温升。 校准期间，完成百分比将打印到系统控制台。 [^3]
8. 校准完成后，断开电源，让电路板冷却到校准范围内的温度，然后再执行下一步。
9. Perform a 6-point accel calibration via the system console using `commander calibrate accel` or via _QGroundControl_. 如果首次设置电路板，则还需要执行陀螺仪和磁力计校准。
10. 在任何传感器校准之后的首次飞行之前，电路板必须重新上电，因为校准带来的突然的偏移变化可能会扰乱导航估计器，并且某些参数直到下次启动时才会被使用它们的算法加载。

<a id="offboard_calibration"></a>

### 板外校准过程

Offboard calibration is run on a development computer using data collected during the calibration test. This method provides a way to visually check the quality of data and curve fit.

To perform an offboard calibration:

1. 确保在校准前设置机架类型，否则在设置飞控板时校准参数将丢失。
1. Power up the board and set the [TC_A_ENABLE](../advanced_config/parameter_reference.md#TC_A_ENABLE), [TC_B_ENABLE](../advanced_config/parameter_reference.md#TC_B_ENABLE), [TC_G_ENABLE](../advanced_config/parameter_reference.md#TC_G_ENABLE), and [TC_M_ENABLE](../advanced_config/parameter_reference.md#TC_M_ENABLE) parameters to `1`.
1. Set all [CAL_ACC\*](../advanced_config/parameter_reference.md#CAL_ACC0_ID), [CAL_GYRO\*](../advanced_config/parameter_reference.md#CAL_GYRO0_ID), [CAL_MAG\*](../advanced_config/parameter_reference.md#CAL_MAG0_ID), and [CAL_BARO\*](../advanced_config/parameter_reference.md#CAL_BARO0_ID) parameters to defaults.
1. 将 [ SDLOG_MODE ](../advanced_config/parameter_reference.md#SDLOG_MODE) 参数设置为 2 以从系统启动时就开始记录日志。
1. Set the [SDLOG_PROFILE](../advanced_config/parameter_reference.md#SDLOG_PROFILE) checkbox for _thermal calibration_ (bit 2) to log the raw sensor data required for calibration.
1. 将电路板冷却到操作所需的最低温度。
1. 接通电源并保持电路板静止[^2]，将其缓慢加热至所需的最高工作温度。 [^3]
1. 断开电源并取出 .ulog 文件。
1. Open a terminal window in the **Firmware/Tools** directory and run the python calibration script:

   ```sh
   python process_sensor_caldata.py <full path name to .ulog file>
   ```

   This will generate a **.pdf** file showing the measured data and curve fits for each sensor, and a **.params** file containing the calibration parameters.

1. Power the board, connect _QGroundControl_ and load the parameter from the generated **.params** file onto the board using _QGroundControl_. 由于参数的数量，加载它们可能需要一些时间。
1. 参数完成加载后，将` SDLOG_MODE `设置为 1 以重新启用常规日志并断开电源。
1. Power the board and perform a normal accelerometer sensor calibration using _QGroundControl_. 重要的是，此步骤在飞控板处于校准温度范围内进行。 此步骤后的首次飞行之前，应重新启动电路板，因为突然的偏置变化会扰乱导航估计器，并且某些参数直到下次启动时才会被使用它们的算法加载。

<a id="implementation"></a>

## 实施细节

Calibration refers to the process of measuring the change in sensor value across a range of internal temperatures, and performing a polynomial fit on the data to calculate a set of coefficients (stored as parameters) that can be used to correct the sensor data. Compensation refers to the process of using the internal temperature to calculate an offset that is subtracted from the sensor reading to correct for changing offset with temperature

The accelerometer, gyro, and magnetometer sensor offsets are calculated using a 3rd order polynomial, whereas the barometric pressure sensor offset is calculated using a 5th order polynomial. Example fits are show below:

![Thermal calibration accel](../../assets/calibration/thermal_calibration_accel.png)

![Thermal calibration gyro](../../assets/calibration/thermal_calibration_gyro.png)

![Thermal calibration mag](../../assets/calibration/thermal_calibration_mag.png)

![Thermal calibration barometer](../../assets/calibration/thermal_calibration_baro.png)

### 校准参数存储

With the existing parameter system implementation we are limited to storing each value in the struct as a separate entry. To work around this limitation the following logical naming convention is used for the [thermal compensation parameters](../advanced_config/parameter_reference.md#thermal-compensation):

```sh
TC_[type][instance]_[cal_name]_[axis]
```

Where:

- `type`: is a single character indicating the type of sensor where `A` = accelerometer, `G` = rate gyroscope, `M` = magnetometer, and `B` = barometer.
- `instance`：是一个整数 0、1或2 ，允许至多校准三个相同 `type` 的传感器。
- `cal_name`：是标识校准值的字符串。 它具有可能的值如下：

  - `Xn`：多项式系数，其中n是系数的阶数，例如 `X3* (temperature - reference temperature)**3` 。
  - `SCL`：比例（缩放）系数
  - `TREF`：参考温度(deg C)。
  - `TMIN`：最低有效温度(deg C)。
  - `TMAX`：最高有效温度(deg C)。

- `axis`：是一个整数0，1或2，指示校准数据为飞控板参照系的 X，Y 或 Z 轴。 对于气压传感器，省略 `axis` 后缀。

Examples:

- [TC_A1_TREF](../advanced_config/parameter_reference.md#TC_A1_TREF) 是第二个加速度计的参考温度。
- [TC_G0_X3_0](../advanced_config/parameter_reference.md#TC_G0_X3_0) 是第一个陀螺 x 轴的 `^3` 系数。

### 校准参数使用

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

### 与遗留 `CAL*` 参数和 commander 控制校准的兼容性

The legacy temperature-agnostic PX4 rate gyro and accelerometer sensor calibration is performed by the commander module and involves adjusting offset, and in the case of accelerometer calibration, scale factor calibration parameters. The offset and scale factor parameters are applied within the driver for each sensor. These parameters are found in the [CAL parameter group](../advanced_config/parameter_reference.md#sensor-calibration).

Onboard temperature calibration is controlled by the events module and the corrections are applied within the sensors module before the sensor combined uORB topic is published. This means that if thermal compensation is being used, all of the corresponding legacy offset and scale factor parameters must be set to defaults of zero and unity before a thermal calibration is performed. If an on-board temperature calibration is performed, this will be done automatically, however if an offboard calibration is being performed it is important that the legacy `CAL*OFF` and `CAL*SCALE` parameters be reset before calibration data is logged.

If accel thermal compensation has been enabled by setting the `TC_A_ENABLE` parameter to 1, then the commander controlled 6-point accel calibration can still be performed. However, instead of adjusting the `*OFF` and `*SCALE` parameters in the `CAL` parameter group, these parameters are set to defaults and the thermal compensation `X0` and `SCL` parameters are adjusted instead.

If gyro thermal compensation has been enabled by setting the `TC_G_ENABLE` parameter to 1, then the commander controlled gyro calibration can still be performed, however it will be used to shift the compensation curve up or down by the amount required to zero the angular rate offset. It achieves this by adjusting the X0 coefficients.

If magnetometer thermal compensation has been enabled by setting the `TC_M_ENABLE` parameter to 1, then the commander controlled 6-point accel calibration can still be performed. However, instead of adjusting the `*OFF` and `*SCALE` parameters in the `CAL` parameter group, these parameters are set to defaults and the thermal compensation `X0` and `SCL` parameters are adjusted instead.

### 局限

Scale factors are assumed to be temperature invariant due to the difficulty associated with measuring these at different temperatures. This limits the usefulness of the accelerometer calibration to those sensor models with stable scale factors. In theory with a thermal chamber or IMU heater capable of controlling IMU internal temperature to within a degree, it would be possible to perform a series of 6 sided accelerometer calibrations and correct the accelerometers for both offset and scale factor. Due to the complexity of integrating the required board movement with the calibration algorithm, this capability has not been included.

---

[^1]: 当校准开始时，[SYS_CAL_Accel](../advanced_config/parameter_reference.md#SYS_CAL_ACCEL)、[SYS_CAL_Baro](../advanced_config/parameter_reference.md#SYS_CAL_BARO) 和 [SYS_CAL_GYRO](../advanced_config/parameter_reference.md#SYS_CAL_GYRO) 参数重置为 0。
[^2]: 气压传感器偏置的校准需要一个稳定的气压环境。 由于天气的原因，空气压力变化缓慢，建筑物内部的气压会因室外风的波动和暖通空调系统的运行而迅速变化。
[^3]: 在加热冷却板时必须小心，以避免在某些情况下在板上形成凝结物，导致电路板损坏。
