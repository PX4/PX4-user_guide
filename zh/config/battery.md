# 电池电源模块设置

该主题解释了如何进行电源设置

> **注**只有兼容的硬件才能使用PX4的电池监控功能。 在大多数情况下，这意味着测量电池电压的电源模块，并且还可以测量电池和飞机之间的电流。

## 概述

电源设置的目标是提供对剩余电池百分比（和容量）的良好估计，以便飞机不会电力耗尽和坠毁（或电池因深度放电而损坏）。

PX4提供了许多（逐步更有效）的方法，可用于估计容量：

1. [基本电池设置](#basic_settings)（默认值）：将原始测量电压与“空”和“满”电压之间的范围进行比较。 这样的估计较为粗略，因为测量的电压（及其相应的容量）将在负载下产生波动。
2. [基于电压的负载补偿估计](#load_compensation)：抵消负载对电池容量计算的影响。
3. [基于电流积分的电压估计](#current_integration)：通过基于电流的已消耗电荷估计，对基于负载补偿电压的估计出的可用容量进行补充。 这样的容量估计相当于智能电池的容量估计。

后来的方法建立在前面的方法上。 您使用的方法取决于飞机的电源模块是否可以测量电流。

> **Note** The instructions below refer to battery 1 calibration parameters: `BAT1_*`. Other batteries use the `BATx_*` parameters, where `x` is the battery number. All battery calibration parameters [are listed here](../advanced_config/parameter_reference.md#battery-calibration).

## 基本电池设置(默认) {#basic_settings}

基本电池设置将PX4配置为使用默认方法进行容量估算。 该方法将测量的原始电池电压与“空”和“满”状态电池电压之间的范围进行比较（按电池数量换算）。

> **Note** This approach results in relatively coarse estimations due to fluctuations in the estimated charge as the measured voltage changes under load.

To configure the basic settings for battery 1:

1. 打开 *QGroundControl* 并连接上飞机。
2. 在上面的工具条中选择 **齿轮** 按钮，然后在左面的工具条中选择 **电源** 按钮。

You are presented with the basic settings that characterize the battery. 以下部分说明了为每个字段设置的值。

![QGC Power Setup](../../assets/qgc/qgc_setup_power_px4.jpg)

> **Note** At time of writing *QGroundControl* only allows you to set values for battery 1 in this view. For vehicles with multiple batteries you'll need to directly [set the parameters](../advanced_config/parameters.md) for battery 2 (`BAT2_*`), as described in the following sections.

### 电池芯数（串联）

这设置了电池中串联的电池数量。 通常，这将作为数字写在电池上，后跟“S”（例如“3S”，“5s”）。

> **Note** The voltage across a single galvanic battery cell is dependent on the chemical properties of the battery type. The most common drone battery type (Lithium-Polymer - LiPo) has a nominal cell voltage of 3.7V. In order to achieve higher voltages (which will more efficiently power a vehicle), multiple cells are connected in *series*. The battery voltage at the terminals is then a multiple of the cell voltage.

如果未提供电池数量，您可以通过将电池电压除以单个电池的标称电压来计算它。 下表显示了LiPo电池的电压 - 电池关系：

- 1S - 3.7V
- 2S - 7.4V
- 3S - 11.1V
- 4S - 14.8V
- 5S - 18.5V
- 6S - 22.2V

> **Note** This setting corresponds to [parameters](../advanced_config/parameters.md): [BAT1_N_CELLS](../advanced_config/parameter_reference.md#BAT1_N_CELLS) and [BAT2_N_CELLS](../advanced_config/parameter_reference.md#BAT2_N_CELLS)

### Full Voltage (per cell)

这设置每个电池单元的*标称</ 0>最大电压（电池单元状态是“满”的最低电压）。</p> 

该值应设置为略低于电池的标称最大电压（LiPo为4.2V），但不能太低，以至于飞行几分钟后估计的容量仍为100％。 默认值通常适用于LiPo电池。

> **Note** The voltage of a full battery may drop a small amount over time after charging. Setting a slightly-lower than maximum value compensates for this drop.

<span></span>

> **Note** This setting corresponds to [parameters](../advanced_config/parameters.md): [BAT1_V_CHARGED](../advanced_config/parameter_reference.md#BAT1_V_CHARGED) and [BAT2_V_CHARGED](../advanced_config/parameter_reference.md#BAT2_V_CHARGED).

### 空电电压（每个电芯）

This sets the nominal minimum safe voltage of each cell (use below this voltage may damage the battery).

> **Note** There is no single value at which a battery is said to be empty. If you choose a value that is too low the battery may be damaged due to deep discharge (and/or the vehicle may crash). If you choose a value that is too high you may unnecessarily curtail your flight.

A rule of thumb for LiPo batteries:

- 无负载3.7V是保守的最小值。
- 负载下3.5 V（飞行时）接近真实最小值。 在这个电压下, 你应该立即降落。 
- 负载下3.2V将对电池造成损坏。 

> **Tip** Below the conservative range, the sooner you recharge the battery the better - it will last longer and lose capacity slower.

<span></span>

> **Note** This setting corresponds to [parameter](../advanced_config/parameters.md): [BAT1_V_EMPTY](../advanced_config/parameter_reference.md#BAT1_V_EMPTY) and [BAT2_V_EMPTY](../advanced_config/parameter_reference.md#BAT2_V_EMPTY).

### Voltage Divider

If you have a vehicle that measures voltage through a power module and the ADC of the flight controller then you should check and calibrate the measurements once per board. To calibrate you'll need a multimeter.

The easiest way to calibrate the divider is by using *QGroundControl* and following the step-by-step guide on [Setup > Power Setup](https://docs.qgroundcontrol.com/en/SetupView/Power.html) (QGroundControl User Guide).

> **Note** This setting corresponds to parameters: [BAT1_V_DIV](../advanced_config/parameter_reference.md#BAT1_V_DIV) and [BAT2_V_DIV](../advanced_config/parameter_reference.md#BAT2_V_DIV).

### 安培/伏特 {#current_divider}

> **Tip** This setting is not needed if you are using the basic configuration (without load compensation etc.)

If you are using [Current-based Load Compensation](#current_based_load_compensation) or [Current Integration](#current_integration) the amps per volt divider must be calibrated.

The easiest way to calibrate the dividers is by using *QGroundControl* and following the step-by-step guide on [Setup > Power Setup](https://docs.qgroundcontrol.com/en/SetupView/Power.html) (QGroundControl User Guide).

> **Note** This setting corresponds to parameter(s): [BAT1_A_PER_V](../advanced_config/parameter_reference.md#BAT1_A_PER_V) and [BAT2_A_PER_V](../advanced_config/parameter_reference.md#BAT2_A_PER_V).

## 基于电压估计的负载补偿 {#load_compensation}

> **Note** With well configured load compensation the voltage used for battery capacity estimation is much more stable, varying far less when flying up and down.

Load compensation attempts to counteract the fluctuation in measured voltage/estimated capacity under load that occur when using the [basic configuration](#basic_settings). This works by estimating what the voltage would be for the *unloaded* battery, and using that voltage (instead of the measured voltage) for estimating the remaining capacity.

> **Note** To use the load compensation you will still need to set the [basic configuration](#basic_settings). The *Empty Voltage* ([BAT_V_EMPTY](../advanced_config/parameter_reference.md#BAT_V_EMPTY)) should be set higher (than without compensation) because the compensated voltage gets used for the estimation (typically set a bit below the expected rest cell voltage when empty after use).

PX4 supports two load compensation methods, which are enabled by [setting](../advanced_config/parameters.md) either of the two parameters below:

- [BAT1_R_INTERNAL](../advanced_config/parameter_reference.md#BAT1_R_INTERNAL) - [Current-based Load Compensation](#current_based_load_compensation) (recommended).
- [BAT1_V_LOAD_DROP](../advanced_config/parameter_reference.md#BAT1_V_LOAD_DROP) - [Thrust-based Load Compensation](#thrust_based_load_compensation).

### 基于电流的负载补偿（推荐） {#current_based_load_compensation}

This load compensation method relies on current measurement to determine load. It is far more accurate than [Thrust-based Load Compensation](#thrust_based_load_compensation) but requires that you have a current sensor.

To enable this feature:

1. Set the parameter [BAT1_R_INTERNAL](../advanced_config/parameter_reference.md#BAT1_R_INTERNAL) to the internal resistance of battery 1 (and repeat for other batteries). > **Tip** There are LiPo chargers out there which can measure the internal resistance of your battery. A typical value is 5mΩ per cell but this can vary with discharge current rating, age and health of the cells.
2. You should also calibrate the [Amps per volt divider](#current_divider) in the basic settings screen.

### Thrust-based Load Compensation {#thrust_based_load_compensation}

This load compensation method estimates the load based on the total thrust that gets commanded to the motors.

> **Caution** This method is not particularly accurate because there's a delay between thrust command and current, and because the thrust in not linearly proportional to the current. Use [Current-based Load Compensation](#current_based_load_compensation) instead if your vehicle has a current sensor.

To enable this feature:

1. Set the parameter [BAT1_V_LOAD_DROP](../advanced_config/parameter_reference.md#BAT1_V_LOAD_DROP) to how much voltage drop a cell shows under the load of full throttle.

## Voltage-based Estimation Fused with Current Integration {#current_integration}

> **Note** This is the most accurate way to measure relative battery consumption. If set up correctly with a healthy and fresh charged battery on every boot, then the estimation quality will be comparable to that from a smart battery (and theoretically allow for accurate remaining flight time estimation).

This method evaluates the remaining battery capacity by *fusing* the voltage-based estimate for the available capacity with a current-based estimate of the charge that has been consumed. It requires hardware that can accurately measure current.

To enable this feature:

1. First set up accurate voltage estimation using [current-based load compensation](#current_based_load_compensation).
    
    > **Tip** Including calibrating the [Amps per volt divider](#current_divider) setting.

2. Set the parameter [BAT1_CAPACITY](../advanced_config/parameter_reference.md#BAT1_CAPACITY) to around 90% of the advertised battery capacity (usually printed on the battery label).
    
    > **Note** Do not set this value too high as this may result in a poor estimation or sudden drops in estimated capacity.

* * *

**Additional information**

The estimate of the charge that has been consumed over time is produced by mathematically integrating the measured current (this approach provides very accurate energy consumption estimates).

At system startup PX4 first uses a voltage-based estimate to determine the initial battery charge. This estimate is then fused with the value from current integration to provide a combined better estimate. The relative value placed on each estimate in the fused result depends on the battery state. The emptier the battery gets, the more of the voltage based estimate gets fused in. This prevents deep discharge (e.g. because it was configured with the wrong capacity or the start value was wrong).

If you always start with a healthy full battery, this approach is similar to that used by a smart battery.

> **Note** Current integration cannot be used on its own (without voltage-based estimation) because it has no way to determine the *initial* capacity. Voltage-estimation allows you to estimate the initial capacity and provides ongoing feedback of possible errors (e.g. if the battery is faulty, or if there is a mismatch between capacity calculated using different methods).

## Parameter Migration Notes

Multiple battery support was added after PX4 v1.10, resulting in the creation of new parameters with prefix `BAT1_` corresponding to all the old parameters with prefix `BAT_`. Changes to `BAT_` and `BAT1_` are currently synchronised:

- If either the old or new parameters is changed, the value is copied into the other parameter (they are kept in sync in both directions).
- If the old/new parameters are different at boot, then the value of the old `BAT_` parameter is copied into the new `BAT1_` parameter.