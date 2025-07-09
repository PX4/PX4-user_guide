---
canonicalUrl: https://docs.px4.io/main/zh/config/battery
---

# 电池和电源模块设置

该主题解释了如何进行电源设置

PX4 的电池监控功能只有在您拥有支持的硬件时才能使用。 在大多数情况下，指的是一个电源模块，它可以测量电池电压，也可以测量电池和机体之间的电流。
:::

## 概述

电源设置的目标是提供对剩余电池百分比（和容量）的良好估计，以便机体不会使用到电量耗尽和碰撞（或电池因深度放电而损坏）的程度）。

PX4 提供了许多（逐渐变得更有效）可用于估计容量的方法：

1. [基本电池设置](#basic_settings)（默认）：原始测量电压与“空”和“满”电压之间的范围进行比较。 这样的估计较为粗略，因为测量的电压（及其相应的容量）将在负载下产生波动。
1. [负载补偿的基于电压的估计](#load_compensation)：抵消负载对电池容量计算的影响。
1. [带电流积分的基于电压的估计](#current_integration)：将带负载补偿的基于电压的剩余容量估算值与基于电流的已消耗电量估算值融合。 这样的容量估计相当于智能电池的容量估计。

后面的方法建立在前面的方法之上。 您使用的方法将取决于机体的电源模块是否可以测量电流。

:::note
以下说明涉及电池1的校准参数：`BAT1_*`。 其他电池使用`BATx_*`参数，这里`x`是电池序号。 [此处列出了](../advanced_config/parameter_reference.md#battery-calibration)所有电池校准参数。
:::

:::tip
除了此处讨论的 PX4 配置之外，您还应确保电调的低电压截止是被禁用还是设置为低于预期的最低电压。
这确保了电池故障保护行为由 PX4 管理，并且当电池仍有电量时，ESC 不会断电（根据您选择的“空电池”设置）。
:::

:::tip
下面的[电池类型比较](#battery-type-comparison)解释了主要电池类型之间的差异，以及它如何影响电池设置。
:::

<a id="basic_settings"></a>

## 基本电池设置(默认)

基本电池设置将PX4配置为使用默认方法进行容量估算。 此方法将测得的原始电池电压与“空”和“满”电芯的电池电压范围进行比较（按芯数量缩放）。

:::note
由于带载下，估计电荷波动带来测得的电压发生变化，因此这种方法会得到相对粗略的估计。
:::

配置电池1的基本参数：

1. Start *QGroundControl* and connect the vehicle.
1. Select the **Gear** icon (Vehicle Setup) in the top toolbar and then **Power** in the sidebar.

You are presented with the basic settings that characterize the battery. The sections below explain what values to set for each field.

![QGC Power Setup](../../assets/qgc/setup/power/qgc_setup_power_px4.jpg)

:::note
At time of writing *QGroundControl* only allows you to set values for battery 1 in this view. For vehicles with multiple batteries you'll need to directly [set the parameters](../advanced_config/parameters.md) for battery 2 (`BAT2_*`), as described in the following sections.
:::

### 电池芯数（串联）

This sets the number of cells connected in series in the battery. Typically this will be written on the battery as a number followed by "S" (e.g "3S", "5S").

:::note
The voltage across a single galvanic battery cell is dependent on the chemical properties of the battery type. Lithium-Polymer (LiPo) batteries and Lithium-Ion batteries both have the same *nominal* cell voltage of 3.7V. In order to achieve higher voltages (which will more efficiently power a vehicle), multiple cells are connected in *series*. The battery voltage at the terminals is then a multiple of the cell voltage.
:::

If the number of cells is not supplied you can calculate it by dividing the battery voltage by the nominal voltage for a single cell. The table below shows the voltage-to-cell relationship for these batteries:

| Cells | LiPo (V) | LiIon (V) |
| ----- | -------- | --------- |
| 1S    | 3.7      | 3.7       |
| 2S    | 7.4      | 7.4       |
| 3S    | 11.1     | 11.1      |
| 4S    | 14.8     | 14.8      |
| 5S    | 18.5     | 18.5      |
| 6S    | 22.2     | 22.2      |

:::note
This setting corresponds to [parameters](../advanced_config/parameters.md): [BAT1_N_CELLS](../advanced_config/parameter_reference.md#BAT1_N_CELLS) and [BAT2_N_CELLS](../advanced_config/parameter_reference.md#BAT2_N_CELLS).
:::

### Full Voltage (per cell)

This sets the *nominal* maximum voltage of each cell (the lowest voltage at which the cell will be considered "full").

The value should be set slightly lower that the nominal maximum cell voltage for the battery, but not so low that the estimated capacity is still 100% after a few minutes of flight.

Appropriate values to use are:
- **LiPo:** 4.05V (default in *QGroundControl*)
- **LiIon:** 4.05V

:::note
The voltage of a full battery may drop a small amount over time after charging.
Setting a slightly-lower than maximum value compensates for this drop.
:::

:::note
This setting corresponds to [parameters](../advanced_config/parameters.md): [BAT1_V_CHARGED](../advanced_config/parameter_reference.md#BAT1_V_CHARGED) and [BAT2_V_CHARGED](../advanced_config/parameter_reference.md#BAT2_V_CHARGED).
:::

### 空电电压（每个电芯）

This sets the nominal minimum safe voltage of each cell (using below this voltage may damage the battery).

:::note
There is no single value at which a battery is said to be empty.
If you choose a value that is too low the battery may be damaged due to deep discharge (and/or the vehicle may crash).
If you choose a value that is too high you may unnecessarily curtail your flight.
:::

A rule of thumb for minimum per-cell voltages:

| Level                                           | LiPo (V) | LiIon (V) |
| ----------------------------------------------- | -------- | --------- |
| Conservative (voltage under no-load)            | 3.7      | 3         |
| "Real" minimum (voltage under load/while flying | 3.5      | 2.7       |
| Damage battery (voltage under load)             | 3.0      | 2.5       |

:::tip
Below the conservative range, the sooner you recharge the battery the better - it will last longer and lose capacity slower.
:::

:::note
This setting corresponds to [parameter](../advanced_config/parameters.md): [BAT1_V_EMPTY](../advanced_config/parameter_reference.md#BAT1_V_EMPTY) and [BAT2_V_EMPTY](../advanced_config/parameter_reference.md#BAT2_V_EMPTY).
:::


### Voltage Divider

If you have a vehicle that measures voltage through a power module and the ADC of the flight controller then you should check and calibrate the measurements once per board. To calibrate you'll need a multimeter.

The easiest way to calibrate the divider is by using *QGroundControl* and following the step-by-step guide on [Setup > Power Setup](https://docs.qgroundcontrol.com/master/en/SetupView/Power.html) (QGroundControl User Guide).

:::note
This setting corresponds to parameters: [BAT1_V_DIV](../advanced_config/parameter_reference.md#BAT1_V_DIV) and [BAT2_V_DIV](../advanced_config/parameter_reference.md#BAT2_V_DIV).
:::

<a id="current_divider"></a>

### 安培/伏特

:::tip
This setting is not needed if you are using the basic configuration (without load compensation etc.)
:::

If you are using [Current-based Load Compensation](#current_based_load_compensation) or [Current Integration](#current_integration) the amps per volt divider must be calibrated.

The easiest way to calibrate the dividers is by using *QGroundControl* and following the step-by-step guide on [Setup > Power Setup](https://docs.qgroundcontrol.com/master/en/SetupView/Power.html) (QGroundControl User Guide).

:::note
This setting corresponds to parameter(s): [BAT1_A_PER_V](../advanced_config/parameter_reference.md#BAT1_A_PER_V) and [BAT2_A_PER_V](../advanced_config/parameter_reference.md#BAT2_A_PER_V).
:::

<a id="load_compensation"></a>

## 基于电压估计的负载补偿

:::note
With well configured load compensation the voltage used for battery capacity estimation is much more stable, varying far less when flying up and down.
:::

Load compensation attempts to counteract the fluctuation in measured voltage/estimated capacity under load that occur when using the [basic configuration](#basic_settings). This works by estimating what the voltage would be for the *unloaded* battery, and using that voltage (instead of the measured voltage) for estimating the remaining capacity.

:::note
To use the load compensation you will still need to set the [basic configuration](#basic_settings). The *Empty Voltage* ([BAT_V_EMPTY](../advanced_config/parameter_reference.md#BAT_V_EMPTY)) should be set higher (than without compensation) because the compensated voltage gets used for the estimation (typically set a bit below the expected rest cell voltage when empty after use).
:::

PX4 supports two load compensation methods, which are enabled by [setting](../advanced_config/parameters.md) either of the two parameters below:
* [BAT1_R_INTERNAL](../advanced_config/parameter_reference.md#BAT1_R_INTERNAL) - [Current-based Load Compensation](#current_based_load_compensation) (recommended).
* [BAT1_V_LOAD_DROP](../advanced_config/parameter_reference.md#BAT1_V_LOAD_DROP) - [Thrust-based Load Compensation](#thrust_based_load_compensation).

<a id="current_based_load_compensation"></a>

### 基于电流的负载补偿（推荐）

This load compensation method relies on current measurement to determine load. It is far more accurate than [Thrust-based Load Compensation](#thrust_based_load_compensation) but requires that you have a current sensor.

To enable this feature:

1. Set the parameter [BAT1_R_INTERNAL](../advanced_config/parameter_reference.md#BAT1_R_INTERNAL) to the internal resistance of  battery 1 (and repeat for other batteries).

   :::tip
There are LiPo chargers out there which can measure the internal resistance of your battery.
A typical value is 5mΩ per cell but this can vary with discharge current rating, age and health of the cells.
:::
1. You should also calibrate the [Amps per volt divider](#current_divider) in the basic settings screen.

<a id="thrust_based_load_compensation"></a>

### Thrust-based Load Compensation

This load compensation method estimates the load based on the total thrust that gets commanded to the motors.

:::warning
This method is not particularly accurate because there's a delay between thrust command and current, and because the thrust in not linearly proportional to the current. Use [Current-based Load Compensation](#current_based_load_compensation) instead if your vehicle has a current sensor.
:::

To enable this feature:

1. Set the parameter [BAT1_V_LOAD_DROP](../advanced_config/parameter_reference.md#BAT1_V_LOAD_DROP) to how much voltage drop a cell shows under the load of full throttle.


<a id="current_integration"></a>

## Voltage-based Estimation Fused with Current Integration

:::note
This is the most accurate way to measure relative battery consumption.
If set up correctly with a healthy and fresh charged battery on every boot, then the estimation quality will be comparable to that from a smart battery (and theoretically allow for accurate remaining flight time estimation).
:::

This method evaluates the remaining battery capacity by *fusing* the voltage-based estimate for the available capacity with a current-based estimate of the charge that has been consumed. It requires hardware that can accurately measure current.

To enable this feature:

1. 首先使用 [当前负载补偿](#current_based_load_compensation) 精确校准电压估计。

:::tip
Including calibrating the [Amps per volt divider](#current_divider) setting.
:::

1. Set the parameter [BAT1_CAPACITY](../advanced_config/parameter_reference.md#BAT1_CAPACITY) to around 90% of the advertised battery capacity (usually printed on the battery label).

   :::note
Do not set this value too high as this may result in a poor estimation or sudden drops in estimated capacity.
:::

---

**Additional information**

The estimate of the charge that has been consumed over time is produced by mathematically integrating the measured current (this approach provides very accurate energy consumption estimates).

At system startup PX4 first uses a voltage-based estimate to determine the initial battery charge. This estimate is then fused with the value from current integration to provide a combined better estimate. The relative value placed on each estimate in the fused result depends on the battery state. The emptier the battery gets, the more of the voltage based estimate gets fused in. This prevents deep discharge (e.g. because it was configured with the wrong capacity or the start value was wrong).

If you always start with a healthy full battery, this approach is similar to that used by a smart battery.

:::note
Current integration cannot be used on its own (without voltage-based estimation) because it has no way to determine the *initial* capacity. Voltage-estimation allows you to estimate the initial capacity and provides ongoing feedback of possible errors (e.g. if the battery is faulty, or if there is a mismatch between capacity calculated using different methods).
:::


## Parameter Migration Notes

Multiple battery support was added after PX4 v1.10, resulting in the creation of new parameters with prefix `BAT1_` corresponding to all the old parameters with prefix `BAT_`. Changes to `BAT_` and `BAT1_` are currently synchronised:
- If either the old or new parameters is changed, the value is copied into the other parameter (they are kept in sync in both directions).
- If the old/new parameters are different at boot, then the value of the old `BAT_` parameter is copied into the new `BAT1_` parameter.


## Battery-Type Comparison

This section provides a comparative overview of several different battery types (in particular LiPo and Li-Ion).

### 概述

- Li-Ion batteries have a higher energy density than Lipo battery packs but that comes at the expense of lower discharge rates and increased battery cost.
- LiPo batteries are readily available and can withstand higher discharge rates that are common in multi-rotor aircraft.
- The choice needs to be made based on the vehicle and the mission being flown. If absolute endurance is the aim then there is more of a benefit to flying to a Li-Ion battery but similarly, more caution needs to be taken. As such, the decision should be made based on the factors surrounding the flight.


### 优势

LiPo
- Very common
- Wide range of sizes, capacities and voltages
- Inexpensive
- High discharge rates relative to capacity (high C ratings)
- Higher charge rates

Li-Ion
- Much higher energy density (up to 60% higher)


### 缺点:

LiPo
- Low (relative) energy density
- Quality can vary given abundance of suppliers

Li-Ion
- Not as common
- Much more expensive
- Not as widely available in large sizes and configurations
- All cells are relatively small so larger packs are made up of many cells tied in series and parallel to create the required voltage and capacity
- Lower discharge rates relative to battery size (C rating)
- More difficult to adapt to vehicles that require high currents
- Lower charging rates (relative to capacity)
- Requires more stringent temperature monitoring during charge and discharge
- Requires settings changes on the ESC to utilize max capacity ("standard" ESC low voltage settings are too high).
- At close-to-empty the voltage of the battery is such that a ~3V difference is possible between a Lipo to Li-ion (while using a 6S battery). This could have implications on thrust expectations.


### C Ratings

- A C rating is simply a multiple of the stated capacity of any battery type.
- A C rating is relevant (and differs) for both charge and discharge rates.
  - For example, a 2000 mAh battery (irrespective of voltage) with a 10C discharge rate can safely and continuously discharge 20 amps of current (2000/1000=2Ah x 10C = 20 amps).
- C Ratings are always given by the manufacturer (often on the outside of the battery pack). While they can actually be calculated, you need several pieces of information, and to measure the internal resistance of the cells.
- LiPo batteries will always have a higher C rating than a Li-Ion battery. This is due to chemistry type but also to the internal resistance per cell (which is due to the chemistry type) leading to higher discharge rates for LiPo batteries.
- Following manufacturer guidelines for both charge and discharge C ratings is very important for the health of your battery and to operate your vehicle safely (i.e. reduce fires, “puffing” packs and other suboptimal states during charging and discharging).


### Energy Density

- Energy density is how much energy is able to be stored relative to battery weight. It is generally measured and compared in Watt Hour per Kilogram (Wh/Kg).
  - Watt-hours are simply calculated by taking the nominal (i.e. not the fully charged voltage) multiplied by the capacity, e.g. 3.7v X 5 Ah = 18.5Wh. If you had a 3 cell battery pack your pack would be 18.5Wh X 3 = 55 Wh of stored energy.
- When you take battery weight into account you calculate energy density by taking the watt-hours and dividing them by weight.
  - E.g. 55 Wh divided by (battery weight in grams divided by 1000). Assuming this battery weighed 300 grams then 55/(300/1000)=185 Wh/Kg.
- This number 185 Wh/Kg would be on the very high-end for a LiPo battery. A Li-Ion battery on the other hand can reach 260 Wh/Kg, meaning per kilogram of battery onboard you can carry 75 more watt-hours.
  - If you know how many watts your vehicle takes to fly (which a battery current module can show you), you can equate this increased storage at no additional weight into increased flight time.
