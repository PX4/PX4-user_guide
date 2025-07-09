---
canonicalUrl: https://docs.px4.io/main/zh/hardware/reference_design
---

# PX4 参考飞行控制器设计

PX4 参考设计是飞行控制器的 [Pixhawk 系列 ](../flight_controller/pixhawk_series.md)。 该设计于2011年首次发布，现已进入第5 [代](#reference_design_generations)（第六代电路板设计正在进行中）。

## 二进制兼容性

所有按照特定设计制造的主板预计与二进制兼容（即可以运行相同的固件）。 从2018年起，我们将提供一个二进制兼容性测试套件，使我们能够验证兼容性。

第1-3代 FMU 设计用于开源硬件，但到了第4-5代只提供 pin 输出引脚和供电规格（原理图由个人开发者生成）。 为了可以更好的确保兼容性，FMUv6 及更新的版本重新提供完整的设计模型。

<a id="reference_design_generations"></a>

## 参考设计迭代：

* FMUv1：开发板 \（STM32F407, 128 KB RAM, 1MB flash, [原理图](https://github.com/PX4/Hardware/tree/master/FMUv1)\）（PX4 不再支持）
* FMUv2：Pixhawk \（STM32F427, 168 MHz, 192 KB RAM, 1MB flash, [原理图](https://github.com/PX4/Hardware/tree/master/FMUv2)\）
* FMUv3：2MB Flash 的 Pixhawk 变种 \（3DR Pixhawk 2 \（Solo\）， Hex Pixhawk 2.1，Holybro Pixfalcon，3DR Pixhawk Mini，STM32F427，168 MHz，256 KB RAM，2 MB flash，[原理图](https://github.com/PX4/Hardware/tree/master/FMUv3_REV_D)\）
* FMUv4：Pixracer \（STM32F427, 168 MHz, 256 KB RAM, 2MB flash, [原理图](https://docs.google.com/spreadsheets/d/1raRRouNsveQz8cj-EneWG6iW0dqGfRAifI91I2Sr5E0/edit#gid=1585075739)\）
* FMUv4 PRO: Drotek Pixhawk 3 PRO \(STM32F469, 180 MHz, 384 KB RAM, 2 MB flash, [输出引脚](https://docs.google.com/spreadsheets/d/1raRRouNsveQz8cj-EneWG6iW0dqGfRAifI91I2Sr5E0/edit#gid=1585075739)\)
* FMUv5: Holybro Pixhawk 4 \(STM32F765, 216 MHz, 512 KB RAM, 2 MB flash, [输出引脚](https://docs.google.com/spreadsheets/d/1-n0__BYDedQrc_2NHqBenG1DNepAgnHpSGglke-QQwY/edit#gid=912976165)\)
* FMUv6：尚未完成，最终命名为 TBD，变种 6s \(STM32H7, 400 MHz, 2 MB RAM,  2 MB flash\) 和变种 6i \(i.MX RT1050, 600 MHz, 512 KB RAM, 外部 flash\)


## Main/IO 功能分解

下图展示了在Pixhawk系列飞行控制器（这些板被合并进一个单独的物理模块中）中 FMU 和 I/O 板之间总线和功能的职能划分。

![PX4 Main/IO Functional Breakdown](../../assets/diagrams/px4_fmu_io_functions.png)

<!-- Draw.io version of file can be found here: https://drive.google.com/file/d/1H0nK7Ufo979BE9EBjJ_ccVx3fcsilPS3/view?usp=sharing -->

一些Pixhawk系列控制器为了减少空间或复杂性，或者更好解决使用问题，没有通过I/O板构建。 In this case [SYS_USE_IO](../advanced_config/parameter_reference.md#SYS_USE_IO) is set to `0` so that the I/O driver is not started. You can also set `SYS_USE_IO` to `0` to disable the I/O on a flight controller where it is present but not needed (in order to slightly reduce the CPU load).

:::note
Manufacturer flight controller variants without an I/O board are often named as a "diminutive" of a version that includes the I/O board: e.g. _Pixhawk 4_ **Mini**_, _CUAV v5 **nano**_.
:::

Build targets that must run on flight controllers with an I/O board map the FMU outputs to `AUX` and the I/0 outputs to `MAIN` (see diagram above). If the target is run on hardware where I/O board is not present or has been disabled, the PWM MAIN outputs will not be present. You might see this, for example, by running  `px4_fmu-v5_default` on [Pixhawk 4](../flight_controller/pixhawk4.md) (with IO) and [Pixhawk 4 Mini](../flight_controller/pixhawk4_mini.md) (without I/O).

:::warning
On [Pixhawk 4 Mini](../flight_controller/pixhawk4_mini.md) this results in a mismatch between the `MAIN` label screenprinted on the flight controller and the  `AUX` bus shown during [Actuator Configuration](../config/actuators.md).
:::

Note that if a build target is only ever intended to run on a flight controller that does not have an I/0 board, then the FMU outputs are mapped to `MAIN` (for example, the `px4_fmu-v4_default` target for [Pixracer](../flight_controller/pixracer.md)).

PX4 PWM outputs are mapped to either `MAIN` or `AUX` ports in [Actuator Configuration](../config/actuators.md).
