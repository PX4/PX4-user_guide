# 배터리 파워 모듈 설정

전원 설정 방법에 대하여 설명합니다.

:::note PX4의 배터리 모니터링은 호환되는 하드웨어에서 사용할 수 있습니다. 대부분의 경우 배터리 전압을 측정하는 전원 모듈을 의미하며, 배터리와 차량 사이의 전류도 측정 할 수 있습니다.
:::

## 개요

전원 설정의 목표는 배터리 잔량 비율 및 용량을 정확하게 추정하여 기체의 전원이 부족하여 충돌 사고가 발생하지 않도록 하는 것입니다 (또는 배터리가 과방 전으로 인해 손상되는 경우).

PX4는 여러가지 효과적인 용량 추정 방법을 제공합니다.

1. [기본 배터리 설정](#basic_settings) (기본값) : 측정 원시 전압이 "최저" 전압과 "최고"전압의 범위와 비교됩니다. 측정 전압 (및 해당 용량)은 부하시 변동으로 인하여 대략적인 추정치입니다.
2. [부하 보상을 통한 전압 기반 추정](#load_compensation) : 부하가 용량 계산에 미치는 영향을 고려합니다.
3. [전류 통합을 사용한 전압 기반 추정](#current_integration) : 사용 가능한 용량에 대한 부하 보상 전압 기반 추정값을 소비된 충전의 전류 기반 추정과 융합합니다. 그 결과 스마트 배터리와 비슷한 용량 추정치를 얻을 수 있습니다.

기타 다른 방법들은 이 방법들을 응용한 것입니다. 사용하는 접근 방식은 차량의 전원 모듈이 전류를 측정 가능 여부에 따라 다릅니다.

:::note
아래 지침은 배터리 1 보정 매개 변수를 참조합니다 : `BAT1 _*`. 다른 배터리는 `BATx_*` 매개 변수를 사용합니다. 여기서 `x`는 배터리 번호입니다. 모든 배터리 보정 매개 변수가 [여기에](../advanced_config/parameter_reference.md#battery-calibration) 나열됩니다.
:::

:::tip
여기에서 설명하는 PX4 구성 외에도 ESC의 저전압 차단이 비활성화되거나 예상 최소 전압 아래로 설정되어 있는지 확인하여야 합니다. 이렇게하면 PX4에서 배터리 오류 안전 동작을 관리하고 배터리가 충전되어있는 동안 ESC가 차단되지 않도록합니다 (선택한 "빈 배터리"설정에 따라).
:::

:::tip
아래의 [배터리 유형 비교](#battery-type-comparison)는 기본 배터리 유형 간의 차이점과 배터리 설정에 미치는 영향을 설명합니다.
:::

<span id="basic_settings"></span>

## 기본 배터리 설정 (기본값)

기본 배터리 설정은 용량 추정 기본 방법을 사용하도록 PX4를 구성합니다. 이 방법은 측정 된 원시 배터리 전압을 "빈"셀과 "충전"셀 (셀 수에 따라 조정 됨)에 대한 셀 전압 범위와 비교합니다.

:::note
이 접근 방식은 측정 전압이 부하 상태에서 변함에 따라 추정된 전하의 변동으로 인하여 상대적으로 대략적인 추정치를 계산합니다.
:::

배터리 1의 기본 설정 방법

1. *QGroundControl*을 시작하고 기체를 연결합니다.
2. 상단 도구 모음에서 **톱니 바퀴** 아이콘(기체 설정)을 선택한 다음 가장자리 표시줄에서 **파워**를 선택하십시오.

배터리 특성을 나타내는 기본 설정이 제공됩니다. 아래 섹션에서는 각 필드에 대해 설정할 값들을 설명합니다.

![QGC Power Setup](../../assets/qgc/setup/power/qgc_setup_power_px4.jpg)

:::note
*QGroundControl*을 설정시에 이 보기에서 배터리 1에 대한 값만을 설정할 수 있습니다. 배터리가 여러 개인 경우에는 다음 섹션에 설명 된대로 배터리 2 (`BAT2_*`)에 대한 [매개 변수를 직접 설정](../advanced_config/parameters.md) 하여야 합니다.
:::

### 셀의 갯수(직렬 연결)

이것은 배터리에 직렬로 연결된 셀 수를 설정합니다. 일반적으로 배터리에 "S"앞에 숫자로 표시합니다 (예 : "3S", "5S").

:::note
단일 갈바닉 배터리 셀의 전압은 배터리 유형의 화학적 특성에 따라 달라집니다. 리튬 폴리머(LiPo) 배터리와 리튬 이온 배터리는 모두 3.7V의 동일한 *이름의* 셀 전압을 갖습니다. 더 높은 전압(기체에 효율적인 전력을 공급함)을 공급하기 위하여 여러개의 셀이 *직렬로*로 연결됩니다. 터미널의 배터리 전압은 셀 전압의 배수입니다.
:::

셀 개수가 제공되지 않은 경우 배터리 전압을 단일 셀의 공칭 전압으로 나누어 계산할 수 있습니다. 아래의 표는 배터리의 전압-셀 관계를 나타냅니다.

| 셀  | LiPo (V) | LiIon (V) |
| -- | -------- | --------- |
| 1S | 3.7      | 3.7       |
| 2S | 7.4      | 7.4       |
| 3S | 11.1     | 11.1      |
| 4S | 14.8     | 14.8      |
| 5S | 18.5     | 18.5      |
| 6S | 22.2     | 22.2      |

:::note
이 설정은 [매개 변수](../advanced_config/parameters.md) : [BAT1_N_CELLS](../advanced_config/parameter_reference.md#BAT1_N_CELLS) 및 [BAT2_N_CELLS](../advanced_config/parameter_reference.md#BAT2_N_CELLS)에 해당합니다.
:::

### 충전 완료 전압 (셀당)

이렇게하면 각 셀의 *공칭* 최대 전압(셀이 "최대"로 간주되는 최저 전압)이 설정됩니다.

이 값은 배터리의 공칭 최대 셀 전압보다 약간 낮게 설정해야하지만, 비행 몇 분 후에도 예상 용량이 100 %가 될 정도로 낮지 않아야 합니다.

사용할 적절한 값은 다음과 같습니다.

- **LiPo:** 4.05V (*QGroundControl*의 기본값)
- **LiIon:** 4.05V

:::note
전체 배터리의 전압은 충전 후 시간이 지남에 따라 약간 떨어질 수 있습니다. 최대 값보다 약간 낮게 설정하여 이 하락값을 보정합니다.
:::

:::note
이 설정은 [매개 변수](../advanced_config/parameters.md) : [BAT1_V_CHARGED](../advanced_config/parameter_reference.md#BAT1_V_CHARGED) 및 [BAT2_V_CHARGED](../advanced_config/parameter_reference.md#BAT2_V_CHARGED)에 해당합니다.
:::

### 방전 전압 (셀 당)

이는 각 셀의 공칭 최소 안전 전압을 설정합니다(이 전압 미만을 사용하면 배터리가 손상 될 수 있음).

:::note
배터리가 비어있을을 설정하는 단일 값은 없습니다. 너무 낮은 값을 선택하면 과방전으로 인해 배터리가 손상될 수 있습니다 (그리고, 기체 충돌이 발생할 수 있습니다). 너무 높은 값을 선택하면 비행 시간이 줄어들게 됩니다.
:::

최소 셀당 전압에 대한 경험 규칙

| 단계                   | LiPo (V) | LiIon (V) |
| -------------------- | -------- | --------- |
| 보수적 (무부하 전압)         | 3.7      | 3         |
| "실제"최소값 (부하/비행 중 전압) | 3.5      | 2.7       |
| 배터리 손상 (부하 전압)       | 3.0      | 2.5       |

:::tip
안전을 위하여 배터리를 빨리 재충전할수록 더 좋습니다. 배터리를 오랜 기간 사용할 수 있습니다.
:::

:::note
이 설정은 [매개 변수](../advanced_config/parameters.md) : [BAT1_V_EMPTY](../advanced_config/parameter_reference.md#BAT1_V_EMPTY) 및 [BAT2_V_EMPTY](../advanced_config/parameter_reference.md#BAT2_V_EMPTY)에 해당합니다.
:::

### 전압 분배기

전원 모듈과 비행 컨트롤러의 ADC를 통해 전압을 측정하는 차량이있는 경우 보드 당 한 번씩 측정을 확인하고 보정하여야 합니다. 보정 작업에는 멀티 미터가 필요합니다.

분배기를 보정하는 가장 쉬운 방법은 *QGroundControl*을 사용하고 [설정 > 전원 설정](https://docs.qgroundcontrol.com/en/SetupView/Power.html) (QGroundControl 사용 설명서)에 대한 단계별 가이드를 따르는 것입니다.

:::note
이 설정은 [BAT1_V_DIV](../advanced_config/parameter_reference.md#BAT1_V_DIV) 및 [BAT2_V_DIV](../advanced_config/parameter_reference.md#BAT2_V_DIV) 매개 변수에 해당합니다.
:::

<span id="current_divider"></span>

### 볼트 당 암페어

:::tip
기본 구성 (부하 보상 없음 등)을 사용하는 경우에는이 설정이 필요하지 않습니다.
:::

[전류 기반 부하 보상](#current_based_load_compensation) 또는 [전류 통합](#current_integration)을 사용하는 경우 전압 분배기 당 암페어를 보정하여야 합니다.

분배기를 보정하는 가장 쉬운 방법은 *QGroundControl*을 사용하고 [설정 > 전원 설정](https://docs.qgroundcontrol.com/en/SetupView/Power.html) (QGroundControl 사용 설명서)에 대한 단계별 가이드를 따르는 것입니다.

:::note
이 설정은 [BAT1_A_PER_V](../advanced_config/parameter_reference.md#BAT1_A_PER_V) 및 [BAT2_A_PER_V](../advanced_config/parameter_reference.md#BAT2_A_PER_V) 매개 변수에 해당합니다.
:::

<span id="load_compensation"></span>

## 부하 보상을 통한 전압 기반 추정

:::note
부하 보상값을 적절하게 설정하면 배터리 용량 추정의 전압이 훨씬 더 안정적이며 상하강 비행시 값의 변화가 적습니다.
:::

부하 보상은 [기본 구성](#basic_settings)을 사용할 때 발생하는 부하시 측정 된 전압/예상 용량의 변동에 대응하려고 합니다. 이는 *무부하* 배터리의 전압을 추정하고 남은 용량을 추정하기 위해 해당 전압 (측정 된 전압 대신)을 사용하여 작동합니다.

:::note
부하 보상을 사용하려면 [기본 구성](#basic_settings)을 설정하여야 합니다. *빈 전압* ([BAT_V_EMPTY](../advanced_config/parameter_reference.md#BAT_V_EMPTY))은 보상 된 전압이 추정에 사용되기 때문에 (보상없는 경우보다) 더 높게 설정해야합니다 (일반적으로 다음 경우에 예상되는 나머지 셀 전압보다 약간 낮은 값으로 설정).
:::

PX4는 아래 두 매개 변수 중 하나를 [설정](../advanced_config/parameters.md)하여 활성화되는 두 가지 부하 보상 방법을 지원합니다.

- [BAT1_R_INTERNAL](../advanced_config/parameter_reference.md#BAT1_R_INTERNAL) - [Current-based Load Compensation](#current_based_load_compensation) (recommended).
- [BAT1_V_LOAD_DROP](../advanced_config/parameter_reference.md#BAT1_V_LOAD_DROP) - [Thrust-based Load Compensation](#thrust_based_load_compensation).

<span id="current_based_load_compensation"></span>

### Current-based Load Compensation (recommended)

This load compensation method relies on current measurement to determine load. It is far more accurate than [Thrust-based Load Compensation](#thrust_based_load_compensation) but requires that you have a current sensor.

To enable this feature:

1. Set the parameter [BAT1_R_INTERNAL](../advanced_config/parameter_reference.md#BAT1_R_INTERNAL) to the internal resistance of battery 1 (and repeat for other batteries).
  
:::tip
There are LiPo chargers out there which can measure the internal resistance of your battery. A typical value is 5mΩ per cell but this can vary with discharge current rating, age and health of the cells.
:::

2. You should also calibrate the [Amps per volt divider](#current_divider) in the basic settings screen.

<span id="thrust_based_load_compensation"></span>

### Thrust-based Load Compensation

This load compensation method estimates the load based on the total thrust that gets commanded to the motors.

:::caution
This method is not particularly accurate because there's a delay between thrust command and current, and because the thrust in not linearly proportional to the current. Use [Current-based Load Compensation](#current_based_load_compensation) instead if your vehicle has a current sensor.
:::

To enable this feature:

1. Set the parameter [BAT1_V_LOAD_DROP](../advanced_config/parameter_reference.md#BAT1_V_LOAD_DROP) to how much voltage drop a cell shows under the load of full throttle.

<span id="current_integration"></span>

## Voltage-based Estimation Fused with Current Integration

:::note
This is the most accurate way to measure relative battery consumption. If set up correctly with a healthy and fresh charged battery on every boot, then the estimation quality will be comparable to that from a smart battery (and theoretically allow for accurate remaining flight time estimation).
:::

This method evaluates the remaining battery capacity by *fusing* the voltage-based estimate for the available capacity with a current-based estimate of the charge that has been consumed. It requires hardware that can accurately measure current.

To enable this feature:

1. First set up accurate voltage estimation using [current-based load compensation](#current_based_load_compensation).
  
:::tip
Including calibrating the [Amps per volt divider](#current_divider) setting.
:::

2. Set the parameter [BAT1_CAPACITY](../advanced_config/parameter_reference.md#BAT1_CAPACITY) to around 90% of the advertised battery capacity (usually printed on the battery label).
  
:::note
Do not set this value too high as this may result in a poor estimation or sudden drops in estimated capacity.
:::

* * *

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

### Overview

- Li-Ion batteries have a higher energy density than Lipo battery packs but that comes at the expense of lower discharge rates and increased battery cost.
- LiPo batteries are readily available and can withstand higher discharge rates that are common in multi-rotor aircraft.
- The choice needs to be made based on the vehicle and the mission being flown. If absolute endurance is the aim then there is more of a benefit to flying to a Li-Ion battery but similarly, more caution needs to be taken. As such, the decision should be made based on the factors surrounding the flight.

### Advantages

LiPo

- Very common
- Wide range of sizes, capacities and voltages
- Inexpensive
- High discharge rates relative to capacity (high C ratings)
- Higher charge rates

Li-Ion

- Much higher energy density (up to 60% higher)

### Disadvantages:

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