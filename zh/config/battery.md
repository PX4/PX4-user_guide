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

<span></span>

> **Tip** In addition to PX4 configuration discussed here, you should ensure that the ESC's low voltage cutoff is either disabled or set below the expected minimum voltage. This ensures that the battery failsafe behaviour is managed by PX4, and that ESCs will not cut out while the battery still has charge (according to the "empty-battery" setting that you have chosen).

<span></span>

> **Tip** [Battery-Type Comparison](#battery-type-comparison) below explains the difference between the main battery types, and how that impacts the battery settings.

<span id="basic_settings"></span>

## 基本电池设置(默认)

基本电池设置将PX4配置为使用默认方法进行容量估算。 该方法将测量的原始电池电压与“空”和“满”状态电池电压之间的范围进行比较（按电池数量换算）。

> **Note** This approach results in relatively coarse estimations due to fluctuations in the estimated charge as the measured voltage changes under load.

To configure the basic settings for battery 1:

1. 打开 *QGroundControl* 并连接上飞机。
2. 在上面的工具条中选择 **齿轮** 按钮，然后在左面的工具条中选择 **电源** 按钮。

You are presented with the basic settings that characterize the battery. 以下部分说明了为每个字段设置的值。

![地面站（QGC）电源设置](../../assets/qgc/setup/power/qgc_setup_power_px4.jpg)

> **Note** At time of writing *QGroundControl* only allows you to set values for battery 1 in this view. For vehicles with multiple batteries you'll need to directly [set the parameters](../advanced_config/parameters.md) for battery 2 (`BAT2_*`), as described in the following sections.

### 电池芯数（串联）

这设置了电池中串联的电池数量。 Typically this will be written on the battery as a number followed by "S" (e.g "3S", "5S").

> **注**单个原电池单元的电压取决于电池类型的化学特性。 Lithium-Polymer (LiPo) batteries and Lithium-Ion batteries both have the same *nominal* cell voltage of 3.7V. 为了实现更高的电压（其将更有效地为飞机提供动力），多个电池以*串联</ 0>连接。 然后，端子处的电池电压是单个电芯电压的倍数。</p> </blockquote> 
> 
> 如果未提供电池数量，您可以通过将电池电压除以单个电池的标称电压来计算它。 The table below shows the voltage-to-cell relationship for these batteries:
> 
> | Cells | LiPo (V) | LiIon (V) |
> | ----- | -------- | --------- |
> | 1S    | 3.7      | 3.7       |
> | 2S    | 7.4      | 7.4       |
> | 3S    | 11.1     | 11.1      |
> | 4S    | 14.8     | 14.8      |
> | 5S    | 18.5     | 18.5      |
> | 6S    | 22.2     | 22.2      |
> 
> > **Note** This setting corresponds to [parameters](../advanced_config/parameters.md): [BAT1_N_CELLS](../advanced_config/parameter_reference.md#BAT1_N_CELLS) and [BAT2_N_CELLS](../advanced_config/parameter_reference.md#BAT2_N_CELLS)
> 
> ### Full Voltage (per cell)
> 
> 这设置每个电池单元的*标称</ 0>最大电压（电池单元状态是“满”的最低电压）。</p> 
> 
> The value should be set slightly lower that the nominal maximum cell voltage for the battery, but not so low that the estimated capacity is still 100% after a few minutes of flight.
> 
> Appropriate values to use are:
> 
> - **LiPo:** 4.05V (default in *QGroundControl*)
> - **LiIon:** 4.05V
> 
> > **Note** The voltage of a full battery may drop a small amount over time after charging. 设置略低于最大值可以补偿此下降。
> 
> 

<span></span>

> 
> > **Note** This setting corresponds to [parameters](../advanced_config/parameters.md): [BAT1_V_CHARGED](../advanced_config/parameter_reference.md#BAT1_V_CHARGED) and [BAT2_V_CHARGED](../advanced_config/parameter_reference.md#BAT2_V_CHARGED).
> 
> ### 空电电压（每个电芯）
> 
> This sets the nominal minimum safe voltage of each cell (using below this voltage may damage the battery).
> 
> > **注**没有单个值表示电池是空的。 如果选择的值太低，电池可能会因深度放电而损坏（和/或飞机可能会坠毁）。 如果您选择的值太高，可能会不必要地限制您的飞行。
> 
> A rule of thumb for minimum per-cell voltages:
> 
> | Level                                           | LiPo (V) | LiIon (V) |
> | ----------------------------------------------- | -------- | --------- |
> | Conservative (voltage under no-load)            | 3.7      | 3         |
> | "Real" minimum (voltage under load/while flying | 3.5      | 2.7       |
> | Damage battery (voltage under load)             | 3.0      | 2.5       |
> 
> > **提示**低于保守范围，越早给电池充电越好 - 它会持续更长时间并且更慢地减少容量。
> 
> 

<span></span>

> 
> > **Note** This setting corresponds to [parameter](../advanced_config/parameters.md): [BAT1_V_EMPTY](../advanced_config/parameter_reference.md#BAT1_V_EMPTY) and [BAT2_V_EMPTY](../advanced_config/parameter_reference.md#BAT2_V_EMPTY).
> 
> ### Voltage Divider
> 
> 如果您通过电源模块或飞行控制器的模数转换器测量飞行器的电压，您应该每次检查并校准测量模块。 为了校准您需要一个万用表。
> 
> 校准分压器最简单的方法是使用*QGroundControl* 按照 [Setup > Power Setup](https://docs.qgroundcontrol.com/en/SetupView/Power.html) 一步步完成校准（QGroundControl User Guide）。
> 
> > **Note** This setting corresponds to parameters: [BAT1_V_DIV](../advanced_config/parameter_reference.md#BAT1_V_DIV) and [BAT2_V_DIV](../advanced_config/parameter_reference.md#BAT2_V_DIV).
> 
> 

<span id="current_divider"></span>

> 
> ### 安培/伏特
> 
> > **Tip** 如果您使用基本配置，此设置不需要（没有负载补偿等）。
> 
> 如果您使用 [ Current-based Load Compensation ](#current_based_load_compensation) 或 [ Current Integration ](#current_integration) 安培/伏特分压器必须校准。
> 
> 校准分压器最简单的方法是使用*QGroundControl* 按照 [Setup > Power Setup](https://docs.qgroundcontrol.com/en/SetupView/Power.html) 一步步完成校准（QGroundControl User Guide）。
> 
> > **Note** This setting corresponds to parameter(s): [BAT1_A_PER_V](../advanced_config/parameter_reference.md#BAT1_A_PER_V) and [BAT2_A_PER_V](../advanced_config/parameter_reference.md#BAT2_A_PER_V).
> 
> 

<span id="load_compensation"></span>

> 
> ## 基于电压估计的负载补偿
> 
> > **Note** 负载参数配置良好时，电池容量估计的电压更加稳定，在上升和下降过程中变化较小。
> 
> 负载补偿尝试抵消，使用 [basic configuration](#basic_settings) 时，负载中测量电压/估计容量的波动。 通过估计 *卸载* 电压，使用这一电压（而不是测量电压）估计剩余电量。
> 
> > **Note** 使用负载补偿，您仍然需要配置 [basic configuration](#basic_settings) 。 *空载电压* （[BAT_V_EMPTY](../advanced_config/parameter_reference.md#BAT_V_EMPTY)） 应该设置更高（高于没有补偿时）因为补偿电压被用来估计（通常低于空载时预期的休眠电池电压）。
> 
> PX4 supports two load compensation methods, which are enabled by [setting](../advanced_config/parameters.md) either of the two parameters below:
> 
> - [BAT1_R_INTERNAL](../advanced_config/parameter_reference.md#BAT1_R_INTERNAL) - [Current-based Load Compensation](#current_based_load_compensation) (recommended).
> - [BAT1_V_LOAD_DROP](../advanced_config/parameter_reference.md#BAT1_V_LOAD_DROP) - [Thrust-based Load Compensation](#thrust_based_load_compensation).
> 
> 

<span id="current_based_load_compensation"></span>

> 
> ### 基于电流的负载补偿（推荐）
> 
> 这种负载补偿方式基于电流测量来确定负载。 It is far more accurate than [Thrust-based Load Compensation](#thrust_based_load_compensation) but requires that you have a current sensor.
> 
> 要启用此功能：
> 
> 1. Set the parameter [BAT1_R_INTERNAL](../advanced_config/parameter_reference.md#BAT1_R_INTERNAL) to the internal resistance of battery 1 (and repeat for other batteries). > **提示** 某些锂电池充电器可以测量您电池的内阻。 典型的数值是每个电池单体5毫欧，但这可能随单体的放电速率、使用时间和健康状况而变化。
> 2. 您还应该在基本设置屏幕上校准</a> 安培每伏分压  。</li> </ol> 
>   
>   

<span id="thrust_based_load_compensation"></span>

>   
>   ### Thrust-based Load Compensation
>   
>   This load compensation method estimates the load based on the total thrust that gets commanded to the motors.
>   
>   > **Caution** This method is not particularly accurate because there's a delay between thrust command and current, and because the thrust in not linearly proportional to the current. Use [Current-based Load Compensation](#current_based_load_compensation) instead if your vehicle has a current sensor.
>   
>   要启用此功能：
>   
>   1. Set the parameter [BAT1_V_LOAD_DROP](../advanced_config/parameter_reference.md#BAT1_V_LOAD_DROP) to how much voltage drop a cell shows under the load of full throttle.
>   
>   

<span id="current_integration"></span>

>   
>   ## Voltage-based Estimation Fused with Current Integration
>   
>   > **Note** This is the most accurate way to measure relative battery consumption. If set up correctly with a healthy and fresh charged battery on every boot, then the estimation quality will be comparable to that from a smart battery (and theoretically allow for accurate remaining flight time estimation).
>   
>   This method evaluates the remaining battery capacity by *fusing* the voltage-based estimate for the available capacity with a current-based estimate of the charge that has been consumed. It requires hardware that can accurately measure current.
>   
>   要启用此功能：
>   
>   1. 首先使用 [当前负载补偿](#current_based_load_compensation) 精确校准电压估计。
>     
>     > **Tip** Including calibrating the [Amps per volt divider](#current_divider) setting.
>   
>   2. Set the parameter [BAT1_CAPACITY](../advanced_config/parameter_reference.md#BAT1_CAPACITY) to around 90% of the advertised battery capacity (usually printed on the battery label).
>     
>     > **Note** Do not set this value too high as this may result in a poor estimation or sudden drops in estimated capacity.
>   
>   * * *
>   
>   **更多信息**
>   
>   The estimate of the charge that has been consumed over time is produced by mathematically integrating the measured current (this approach provides very accurate energy consumption estimates).
>   
>   At system startup PX4 first uses a voltage-based estimate to determine the initial battery charge. This estimate is then fused with the value from current integration to provide a combined better estimate. The relative value placed on each estimate in the fused result depends on the battery state. The emptier the battery gets, the more of the voltage based estimate gets fused in. This prevents deep discharge (e.g. because it was configured with the wrong capacity or the start value was wrong).
>   
>   If you always start with a healthy full battery, this approach is similar to that used by a smart battery.
>   
>   > **Note** Current integration cannot be used on its own (without voltage-based estimation) because it has no way to determine the *initial* capacity. Voltage-estimation allows you to estimate the initial capacity and provides ongoing feedback of possible errors (e.g. if the battery is faulty, or if there is a mismatch between capacity calculated using different methods).
>   
>   ## Parameter Migration Notes
>   
>   Multiple battery support was added after PX4 v1.10, resulting in the creation of new parameters with prefix `BAT1_` corresponding to all the old parameters with prefix `BAT_`. Changes to `BAT_` and `BAT1_` are currently synchronised:
>   
>   - If either the old or new parameters is changed, the value is copied into the other parameter (they are kept in sync in both directions).
>   - If the old/new parameters are different at boot, then the value of the old `BAT_` parameter is copied into the new `BAT1_` parameter.
>   
>   ## Battery-Type Comparison
>   
>   This section provides a comparative overview of several different battery types (in particular LiPo and Li-Ion).
>   
>   ### 综述
>   
>   - Li-Ion batteries have a higher energy density than Lipo battery packs but that comes at the expense of lower discharge rates and increased battery cost.
>   - LiPo batteries are readily available and can withstand higher discharge rates that are common in multi-rotor aircraft.
>   - The choice needs to be made based on the vehicle and the mission being flown. If absolute endurance is the aim then there is more of a benefit to flying to a Li-Ion battery but similarly, more caution needs to be taken. As such, the decision should be made based on the factors surrounding the flight.
>   
>   ### 优势
>   
>   LiPo
>   
>   - Very common
>   - Wide range of sizes, capacities and voltages
>   - Inexpensive
>   - High discharge rates relative to capacity (high C ratings)
>   - Higher charge rates
>   
>   Li-Ion
>   
>   - Much higher energy density (up to 60% higher)
>   
>   ### 缺点:
>   
>   LiPo
>   
>   - Low (relative) energy density 
>   - Quality can vary given abundance of suppliers
>   
>   Li-Ion
>   
>   - Not as common
>   - Much more expensive
>   - Not as widely available in large sizes and configurations
>   - All cells are relatively small so larger packs are made up of many cells tied in series and parallel to create the required voltage and capacity
>   - Lower discharge rates relative to battery size (C rating)
>   - More difficult to adapt to vehicles that require high currents
>   - Lower charging rates (relative to capacity)
>   - Requires more stringent temperature monitoring during charge and discharge
>   - Requires settings changes on the ESC to utilize max capacity ("standard" ESC low voltage settings are too high).
>   - At close-to-empty the voltage of the battery is such that a ~3V difference is possible between a Lipo to Li-ion (while using a 6S battery). This could have implications on thrust expectations. 
>   
>   ### C Ratings
>   
>   - A C rating is simply a multiple of the stated capacity of any battery type.
>   - A C rating is relevant (and differs) for both charge and discharge rates. 
>     - For example, a 2000 mAh battery (irrespective of voltage) with a 10C discharge rate can safely and continuously discharge 20 amps of current (2000/1000=2Ah x 10C = 20 amps).
>   - C Ratings are always given by the manufacturer (often on the outside of the battery pack). While they can actually be calculated, you need several pieces of information, and to measure the internal resistance of the cells.
>   - LiPo batteries will always have a higher C rating than a Li-Ion battery. This is due to chemistry type but also to the internal resistance per cell (which is due to the chemistry type) leading to higher discharge rates for LiPo batteries.
>   - Following manufacturer guidelines for both charge and discharge C ratings is very important for the health of your battery and to operate your vehicle safely (i.e. reduce fires, “puffing” packs and other suboptimal states during charging and discharging).
>   
>   ### Energy Density
>   
>   - Energy density is how much energy is able to be stored relative to battery weight. It is generally measured and compared in Watt Hour per Kilogram (Wh/Kg). 
>     - Watt-hours are simply calculated by taking the nominal (i.e. not the fully charged voltage) multiplied by the capacity, e.g. 3.7v X 5 Ah = 18.5Wh. If you had a 3 cell battery pack your pack would be 18.5Wh X 3 = 55 Wh of stored energy.
>   - When you take battery weight into account you calculate energy density by taking the watt-hours and dividing them by weight. 
>     - E.g. 55 Wh divided by (battery weight in grams divided by 1000). Assuming this battery weighed 300 grams then 55/(300/1000)=185 Wh/Kg.
>   - This number 185 Wh/Kg would be on the very high-end for a LiPo battery. A Li-Ion battery on the other hand can reach 260 Wh/Kg, meaning per kilogram of battery onboard you can carry 75 more watt-hours. 
>     - If you know how many watts your vehicle takes to fly (which a battery current module can show you), you can equate this increased storage at no additional weight into increased flight time.