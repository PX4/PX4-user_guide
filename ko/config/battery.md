# 배터리 파워 모듈 설정

전원 설정 방법에 대하여 설명합니다.

:::info
These instructions require that the vehicle has a [Power Module (PM)](../power_module/index.md), or other hardware that can measure the battery voltage and (optionally) the current.

This tuning is not needed for [Smart/MAVLink Batteries](../smart_batteries/index.md).
:::

## 개요

Battery Estimation Tuning uses the measured voltage and current (if available) to estimate the remaining battery capacity.
This is important because it allows PX4 to take action when the vehicle is close to running out of power and crashing (and also to prevent battery damage due to deep-discharge).

PX4는 여러가지 효과적인 용량 추정 방법을 제공합니다.

1. [Basic Battery Settings](#basic_settings) (default): raw measured voltage is compared to the range between "empty" and "full" voltages.
   측정 전압 (및 해당 용량)은 부하시 변동으로 인하여 대략적인 추정치입니다.
2. [Voltage-based Estimation with Load Compensation](#load_compensation): Counteracts the effects of loading on the capacity calculation.
3. [Voltage-based Estimation with Current Integration](#current_integration): Fuses the load-compensated voltage-based estimate for the available capacity with a current-based estimate of the charge that has been consumed.
   그 결과 스마트 배터리와 비슷한 용량 추정치를 얻을 수 있습니다.

기타 다른 방법들은 이러한 방법들을 응용한 것입니다.
사용하는 접근 방식은 차량의 전원 모듈이 전류를 측정 가능 여부에 따라 다릅니다.

:::info
The instructions below refer to battery 1 calibration parameters: `BAT1_*`.
Other batteries use the `BATx_*` parameters, where `x` is the battery number.
All battery calibration parameters [are listed here](../advanced_config/parameter_reference.md#battery-calibration).
:::

:::tip
In addition to PX4 configuration discussed here, you should ensure that the ESC's low voltage cutoff is either disabled or set below the expected minimum voltage.
이렇게 하면 PX4에서 배터리 오류 안전 동작을 관리하고 배터리가 충전되어있는 동안 ESC가 차단되지 않도록합니다 (선택한 "빈 배터리"설정에 따라).
:::

:::tip
[Battery-Type Comparison](#battery-chemistry-comparison) below explains the difference between the main battery types, and how that impacts the battery settings.
:::

<a id="basic_settings"></a>

## 기본 배터리 설정 (기본값)

기본 배터리 설정은 용량 추정 기본 방법을 사용하도록 PX4를 설정합니다.
이 방법은 측정된 원시 배터리 전압을 "빈"셀과 "충전"셀 (셀 수에 따라 조정 됨)에 대한 셀 전압 범위와 비교합니다.

:::info
This approach results in relatively coarse estimations due to fluctuations in the estimated charge as the measured voltage changes under load.
:::

배터리 1의 기본 설정 방법

1. Start _QGroundControl_ and connect the vehicle.
2. Select **"Q" icon > Vehicle Setup > Power** (sidebar) to open _Power Setup_.

배터리 특성을 나타내는 기본 설정이 제공됩니다.
아래 섹션에서는 각 필드에 대해 설정할 값들을 설명합니다.

![QGC Power Setup](../../assets/qgc/setup/power/qgc_setup_power_px4.png)

:::info
At time of writing _QGroundControl_ only allows you to set values for battery 1 in this view.
For vehicles with multiple batteries you'll need to directly [set the parameters](../advanced_config/parameters.md) for battery 2 (`BAT2_*`), as described in the following sections.
:::

### 셀의 갯수(직렬 연결)

이것은 배터리에 직렬로 연결된 셀 수를 설정합니다.
일반적으로 배터리에 "S"앞에 숫자로 표시합니다 (예 : "3S", "5S").

:::info
The voltage across a single galvanic battery cell is dependent on the chemical properties of the battery type.
Lithium-Polymer (LiPo) batteries and Lithium-Ion batteries both have the same _nominal_ cell voltage of 3.7V.
In order to achieve higher voltages (which will more efficiently power a vehicle), multiple cells are connected in _series_.
터미널의 배터리 전압은 셀 전압의 배수입니다.
:::

셀 개수가 제공되지 않은 경우 배터리 전압을 단일 셀의 공칭 전압으로 나누어 계산할 수 있습니다.
아래의 표는 배터리의 전압-셀 관계를 나타냅니다.

| 셀  | LiPo (V) | LiIon (V) |
| -- | --------------------------- | ---------------------------- |
| 1S | 3.7         | 3.7          |
| 2S | 7.4         | 7.4          |
| 3S | 11.1        | 11.1         |
| 4S | 14.8        | 14.8         |
| 5S | 18.5        | 18.5         |
| 6S | 22.2        | 22.2         |

:::info
This setting corresponds to [parameters](../advanced_config/parameters.md): [BAT1_N_CELLS](../advanced_config/parameter_reference.md#BAT1_N_CELLS) and [BAT2_N_CELLS](../advanced_config/parameter_reference.md#BAT2_N_CELLS).
:::

### 충전 완료 전압 (셀당)

This sets the _nominal_ maximum voltage of each cell (the lowest voltage at which the cell will be considered "full").

이 값은 배터리의 공칭 최대 셀 전압보다 약간 낮게 설정하여야하지만, 몇 분간의 비행후에도 예상 용량이 100%가 될 정도로 낮지 않아야 합니다.

사용할 적절한 값은 다음과 같습니다.

- **LiPo:** 4.05V (default in _QGroundControl_)
- **LiIon:** 4.05V

:::info
The voltage of a full battery may drop a small amount over time after charging.
최대 값보다 약간 낮게 설정하여 이 하락값을 보정합니다.
:::

:::info
This setting corresponds to [parameters](../advanced_config/parameters.md): [BAT1_V_CHARGED](../advanced_config/parameter_reference.md#BAT1_V_CHARGED) and [BAT2_V_CHARGED](../advanced_config/parameter_reference.md#BAT2_V_CHARGED).
:::

### 방전 전압 (셀 당)

이는 각 셀의 공칭 최소 안전 전압을 설정합니다. 이 전압 미만을 사용하면 배터리가 손상될 수 있습니다.

:::info
There is no single value at which a battery is said to be empty.
너무 낮은 값을 선택하면 과방전으로 인해 배터리가 손상될 수 있습니다 (그리고, 기체 충돌이 발생할 수 있습니다).
너무 높은 값을 선택하면 비행 시간이 줄어듭니다.
:::

최소 셀당 전압에 대한 경험 규칙

| 단계                                                                  | LiPo (V) | LiIon (V) |
| ------------------------------------------------------------------- | --------------------------- | ---------------------------- |
| 보수적 (무부하 전압)                                     | 3.7         | 3                            |
| "Real" minimum (voltage under load/while flying) | 3.5         | 2.7          |
| 배터리 손상 (부하 전압)                                   | 3.0         | 2.5          |

:::tip
Below the conservative range, the sooner you recharge the battery the better - it will last longer and lose capacity slower.
:::

:::info
This setting corresponds to [parameter](../advanced_config/parameters.md): [BAT1_V_EMPTY](../advanced_config/parameter_reference.md#BAT1_V_EMPTY) and [BAT2_V_EMPTY](../advanced_config/parameter_reference.md#BAT2_V_EMPTY).
:::

### 전압 분배기

전원 모듈과 비행 컨트롤러의 ADC를 통해 전압을 측정하는 차량이 있는 경우 보드 당 한 번씩 측정을 확인하고 보정하여야 합니다. 보정 작업에는 멀티미터가 필요합니다.

The easiest way to calibrate the divider is by using _QGroundControl_ and following the step-by-step guide on [Setup > Power Setup](https://docs.qgroundcontrol.com/master/en/qgc-user-guide/setup_view/power.html) (QGroundControl User Guide).

:::info
This setting corresponds to parameters: [BAT1_V_DIV](../advanced_config/parameter_reference.md#BAT1_V_DIV) and [BAT2_V_DIV](../advanced_config/parameter_reference.md#BAT2_V_DIV).
:::

<a id="current_divider"></a>

### 볼트 당 암페어

:::tip
This setting is not needed if you are using the basic configuration (without load compensation etc.)
:::

If you are using [Load Compensation](#load_compensation) or [Current Integration](#current_integration) the amps per volt divider must be calibrated.

The easiest way to calibrate the dividers is by using _QGroundControl_ and following the step-by-step guide on [Setup > Power Setup](https://docs.qgroundcontrol.com/master/en/qgc-user-guide/setup_view/power.html) (QGroundControl User Guide).

:::info
This setting corresponds to parameter(s): [BAT1_A_PER_V](../advanced_config/parameter_reference.md#BAT1_A_PER_V) and [BAT2_A_PER_V](../advanced_config/parameter_reference.md#BAT2_A_PER_V).
:::

<a id="load_compensation"></a>

## 부하 보상을 통한 전압 기반 추정

With well configured load compensation, the voltage used for battery capacity estimation is much more stable, varying far less when flying up and down.

PX4 implements a current-based load compensation that uses a real-time estimate of the internal resistance of the battery.
When a current flows through a battery, the internal resistance causes a voltage drop, reducing the output voltage (measured voltage) of the battery compared to its open-circuit voltage (no-load voltage).
By estimating the internal resistance, the fluctuation in measured voltage under load that occurs when using the [basic configuration](#basic_settings) can be compensated.
This leads to a much more accurate estimation of the remaining capacity.

To use the load compensation you will still need to set the [basic configuration](#basic_settings).
The _Empty Voltage_ ([BATn_V_EMPTY](../advanced_config/parameter_reference.md#BAT1_V_EMPTY), where `n` is the battery number) should be set higher (than without compensation) because the compensated voltage gets used for the estimation (typically set a bit below the expected rest cell voltage when empty after use).
You should also calibrate the [Amps per volt divider](#current_divider) in the basic settings screen.

:::info
Alternatively, the value for the internal resistance can be [set manually](../advanced_config/parameters.md) using [BAT1_R_INTERNAL](../advanced_config/parameter_reference.md#BAT1_R_INTERNAL) (advanced).
A positive value in this parameter will be used for the internal resistance instead of the estimated value.
There are LiPo chargers that can measure the internal resistance of your battery.
A typical value for LiPo batteries is 5mΩ per cell but this can vary with discharge current rating, age and health of the cells.

By default `BAT1_R_INTERNAL` is set to `-1` which enables the estimation algorithm.
Setting it to `0` disables load compensation.
:::

<a id="current_integration"></a>

## 전류 통합과 융합된 전압 기반 추정

This method is the most accurate way to measure relative battery consumption.
부팅시마다 새로 충전한 배터리를 정확하게 설정하면, 추정 품질이 스마트 배터리의 품질과 비슷해질 것입니다 (이론적으로 정확한 잔여 비행 시간 추정이 가능합니다).

The method evaluates the remaining battery capacity by _fusing_ the voltage-based estimate for the available capacity with a current-based estimate of the charge that has been consumed.
전류를 정확하게 측정할 수있는 장치가 필요합니다.

이 기능을 활성화하려면:

1. First set up accurate voltage estimation using [load compensation](#load_compensation).

   :::tip
   Including calibrating the [Amps per volt divider](#current_divider) setting.

:::

2. Set the parameter [BAT1_CAPACITY](../advanced_config/parameter_reference.md#BAT1_CAPACITY) to around 90% of the advertised battery capacity (usually printed on the battery label).

   ::: info
   Do not set this value too high as this may result in a poor estimation or sudden drops in estimated capacity.

:::

---

**Additional information**

시간 경과에 따라 소비된 전하의 추정치는 측정된 전류를 수학적으로 통합하여 생성됩니다 (이 접근법은 매우 정확한 소비 에너지의 추정치를 제공합니다).

시스템 시작시 PX4는 먼저 전압 기반 추정치를 사용하여 초기 배터리 충전량을 결정합니다. 그런 다음이 추정치를 현재 통합의 값과 융합하여 더 나은 추정치를 제공합니다.
융합된 각 추정치에 배치된 상대값은 배터리 상태에 따라 달라집니다.
배터리가 비워 질수록 전압 기반 추정치가 더 많이 융합됩니다. 이는 과방전을 방지합니다 (예 : 잘못된 용량으로 구성되었거나, 초기치가 잘못 되었기 때문).

항상 정상적인 전체 배터리로 시작하는 경우이 방법은 스마트 배터리에서 사용하는 방법과 유사합니다.

:::info
Current integration cannot be used on its own (without voltage-based estimation) because it has no way to determine the _initial_ capacity.
전압 추정을 사용하면 초기 용량을 추정하고 가능한 오류에 대한 지속적인 피드백을 제공할 수 있습니다 (예 : 배터리에 결함이 있거나 다른 방법을 사용하여 계산된 용량간에 불일치가 있는 경우).
:::

## Battery-Chemistry Comparison

이 섹션에서는 여러가지 유형의 배터리(특히 LiPo 및 Li-Ion)를 개략적으로 비교합니다.

### 개요

- Li-Ion 배터리는 LiPo 배터리 팩보다 에너지 밀도가 높지만, 방전율이 낮고 가격이 비쌉니다.
- LiPo 배터리는 구매가 편리하며, 멀티콥터에서 자주 발생하는 높은 방전율을 견딜수 있습니다.
- 비행기의 종류와 임무에 따라 적절한 것을 선택하여야 합니다.
  리튬이온 배터리가 내구성에 이점이 많지만, 조심하여 사용하여야 합니다.
  따라서, 비행 목적과 상황에 따라 결정하여야 합니다.

### 장점

LiPo

- 보편적으로 사용됨.
- 다양한 크기, 용량 및 전압
- 저렴한 가격
- 용량 대비 높은 방전율 (높은 C 등급)
- 높은 충전율

Li-Ion

- 높은 에너지 밀도 (최대 60 % 더 높음)

### 단점:

LiPo

- 낮은 에너지 밀도(상대적임)
- 공급 업체가 많아지면 품질이 높아질 것 입니다.

Li-Ion

- 일반적으로 사용되지 않음.
- 가격이 비쌈.
- 대형 기체에서는 널리 사용되지 않음
- 모든 셀은 상대적으로 작기 때문에 더 큰 팩은 필요한 전압과 용량을 생성하기 위해 직렬 및 병렬로 연결된 많은 셀로 구성됩니다.
- 배터리 크기에 비해 낮은 방전율 (C 등급)
- 고전류가 필요한 차량에 적용하기 어렵습니다.
- 낮은 충전 속도 (용량 대비)
- 충전과 방전시에 면밀한 온도 모니터링이 필요합니다.
- 최대 용량을 사용하려면 ESC에서 설정을 변경하여야합니다 ( "표준"ESC 저전압 설정이 너무 높음).
- 거의 비었을 때 배터리의 전압은 Lipo와 Li-ion 사이에 약 3V 차이가 발생할 수 있습니다 (6S 배터리 사용시).
  추력 기대치에 영향을 미칠 수 있습니다.

### C 등급

- C 등급은 단순히 모든 배터리 유형의 명시된 용량의 배수입니다.
- C 등급은 충전 및 방전 속도에 모두 관련이 있습니다(그리고 다릅니다).
  - 예를 들어, 방전율이 10C 인 2000mAh 배터리 (전압에 관계없이)는 20A의 전류 (2000 / 1000 = 2Ah x 10C = 20A)를 안전하고 지속적으로 방전할 수 있습니다.
- C 등급은 항상 제조업체에서 제공합니다 (종종 배터리 팩 외부에 있음).
  정확한 값을 계산할 수 있지만 추가 정보가 필요하고 베터리 셀의 내부 저항을 측정하여야 합니다.
- LiPo 배터리는 항상 리튬이온 배터리보다 높은 C 등급을 갖습니다.
  이는 화학적 성질과 셀당 내부 저항으로 인하여 LiPo 배터리의 방전 속도가 더 높습니다.
- C 등급의 충전 및 방전에 대한 제조업체 지침을 준수하는 것은 배터리의 상태와 기체를 안전하게 작동하는 데 매우 중요합니다 (예 : 충전 및 방전 중 화재, "퍼핑"팩 및 기타 차선 상태).

### 에너지 밀도

- 에너지 밀도는 배터리 중량당 저장하는 에너지 양입니다.
  일반적으로 킬로그램 당 와트시(Wh/Kg)로 측정/비교 됩니다.
  - 와트시는 공칭(완전 충전 된 전압이 아님)에 용량을 곱한 값으로 간단히 계산됩니다. 3.7v X 5 Ah = 18.5Wh.
    3 셀 배터리 팩이있는 경우 팩은 18.5Wh X 3 = 55Wh의 저장 에너지가 됩니다.
- 배터리 무게를 고려하면 와트시를 무게로 나누어 에너지 밀도를 계산합니다.
  - 예: 55 Wh divided by (battery weight in grams divided by 1000).
    이 배터리의 무게가 300g이고 55/(300/1000)=185 Wh/Kg라고 가정합니다.
- 이 숫자 185 Wh/Kg는 최고급 LiPo 배터리의 수치입니다.
  반면에 리튬 이온 배터리는 260Wh/Kg에 달할 수 있습니다. 즉, 온보드 배터리 1kg 당 75 와트시를 더 사용할 수 있습니다.
  - 차량이 비행하는 데 걸리는 와트(배터리 전류 모듈이 표시 할 수 있음)를 알고 있다면, 이 증가된 저장 용량을 추가 중량없이 비행 시간 증가와 동일시 할 수 있습니다.
