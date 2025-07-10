---
canonicalUrl: https://docs.px4.io/main/zh/advanced_config/parameters
---

# 查找/修改参数

通过配置和调整[参数](../advanced_config/parameter_reference.md)可以影响PX4的表现（例如: [多轴无人机的PID增益](../config_mc/pid_tuning_guide_multicopter.md)、校准信息等）。

你可以在*QGroundControl 参数* 界面查找和修改**任何**与载具相关的参数。 点击顶部菜单 *齿轮* 图标，然后点击侧边栏中的 *参数* 访问屏幕。

:::note
大多数常用的参数可以通过[基本设置](../config/README.md)中的专用配置界面更方便的设置。 在修改不太常用的修改参数时需要 *参数* 界面。例如，在调整新的载具时。
:::

:::warning
虽然又写参数可以在飞行中更改，但是不建议这样做（除非指南中又明确说明）。
:::

<span id="finding"></span>

## 查找参数

可以在*搜索*框中输入一个词来搜索参数。 和搜索字眼相关的所有参数名称和说明将会以列表形式显示 (按 ** 清除(Clear) ** 重置搜索)。

![参数搜索](../../assets/qgc/setup/parameters/parameters_search.jpg)

您也可以点击左边的按钮来浏览参数组（下图显示了*电池校准*参数组被选中）。

![参数界面](../../assets/qgc/setup/parameters/parameters_px4.jpg)

:::tip
如果找不到想要的参数，请参阅[下一节](#missing)。
:::

<span id="missing"></span>

## 找不到的参数

参数通常不可见，因为它们要么以其他参数为条件，要么不存在于固件中（见下文）。

### 条件参数

如果一个参数是以未启用的另一个参数为条件，则该参数不会被显示。

您通常可以通过搜索 [完整的参数参考](../advanced_config/parameter_reference.md) 和其他文档来找到条件参数。 尤其是[串口配置参数](../peripherals/serial_configuration.md)，它依赖于分配给串口的服务。

### 固件中没有的参数

参数可能不在固件中，因为您使用了不同版本的 PX4，或者因为您构建的固件中没有包含相关的模块。

每个PX4版本都添加了新参数，现有参数有时被删除或重命名。 您可以通过查阅对应版本的[全部参数参考](../advanced_config/parameter_reference.md)来检查一个参数是否*应该*存在。 您还可以在源代码和发布说明中查找参数。

参数可能不在固件中的另一个原因是如果其关联的模块没有被包含。 这个问题（特别是）对*FMUv2 固件*，该固件省略了许多模块，才能使 PX4 可以适用于 1MB的闪存。 解决此问题有两种方法：

- 检查你是否可以更新你的板来运行 FMUv3 固件，其中包括所有模块： [固件 > FMUv2 Bootloader 更新](../config/firmware.md#bootloader)
- 如果你的控制板只能运行 FMUv2 固件，你需要 [重新构建 PX4](../dev_setup/building_px4.md) 并启用缺失的模块。 在[boards/px4/fmu-v2/default.cmake](https://github.com/PX4/PX4-Autopilot/blob/master/boards/px4/fmu-v2/default.cmake)文件中看到注释掉的模块: 
        DRIVERS
            adc
            #barometer # 全部支持的气压计驱动
            barometer/ms5611
            #batt_smbus
            #camera_capture :::note 您可能还需要禁用其他模块才能将重新构建的固件适用于 1MB 的闪存。 找到可以移除的模块需要一些试错， 还取决于你要求载具达到哪些使用案例。
:::

<span id="changing"></span>

## 更改参数

要更改参数的值，请单击组或搜索列表中的参数行。 单击后屏幕侧边会显示一个对话框，您在其中更改参数的值（这个对话框还提供了该参数的额外细节信息——包括是否需要重启才能使参数生效）。

![更改参数值](../../assets/qgc/setup/parameters/parameters_changing.png)

:::note
当您点击 **保存** 时，参数会自动上传到所连接的载具。 根据参数，您可能需要重新启动飞控才能使更改生效。
:::

## 工具

您可以在屏幕右上角的**工具 (Tools)**菜单中选择更多的选项。

![工具菜单](../../assets/qgc/setup/parameters/parameters_tools_menu.png)

**刷新** <br />用从载具上重新请求的所有参数值刷新地面站上的参数值。

**重置所有参数为默认值** <br />将全部参数重置为原始默认值。

**从文件中载入/保存到文件** <br />从现有文件中载入参数或将当前参数设置保存到一个文件。

**清空遥控器参数** <br />清除全部与遥控器相关的参数。 更多信息请参见：[遥控器设置 > 通道参数调校 ](../config/radio.md#param-tuning-channels)。

**重启载具** <br />重新启动载具（更改一些参数后需要）。