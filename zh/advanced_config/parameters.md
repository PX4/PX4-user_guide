# 查找/修改参数

通过配置和调整[参数](../advanced_config/parameter_reference.md)可以影响PX4的表现（例如: [多轴无人机的PID增益](../config_mc/pid_tuning_guide_multicopter.md)、校准信息等）。

你可以在*QGroundControl 参数* 界面查找和修改任何与载具相关的参数。在屏幕上方的工具条中点击 齿轮 图标，然后在侧边栏中选择 参数(parameter)。 通过单击边栏中的顶部菜单 * 齿轮 * 图标, 然后 * 参数(Parameters) *, 就可以访问参数设置的页面。

> **Note**大部分常用参数都可以通过[基本设置](../config/README.md)章节中描述的专用配置界面更方便地设置。 对于不太常用的参数，比如调试全新的载具，就需要用到 *参数(Parameters)* 界面了。

<span></span>

> **Waring**虽然某些参数可以在飞行中更改，但不建议这样做 (除非在本指南中有明确说明)。

## 查找参数 {#finding}

可以通过在 * 搜索(Search) * 框中输入一个相关字眼来搜索参数。 和搜索字眼相关的所有参数名称和说明将会以列表形式显示 (按 ** 清除(Clear) ** 重置搜索)。

![Parameters Search](../../images/qgc/setup/parameters_search.jpg)

你也可以按组浏览参数, 方法是单击左侧的按钮 (在选中 * 电池校准(Battery Calibration) * 下的图像中)。

![Parameters Screen](../../images/qgc/setup/parameters_px4.jpg)

> **Tip** 如果找不到期望的参数，请参阅[下一节](#missing)。

## 找不到的参数 {#missing}

一般情况下，与以其他参数为先决条件，或者固件中没有该参数，是部分参数不可见的原因（参见下文）。

### 受条件限制的参数

如果一个参数所依赖的参数没有激活，则该参数不会被显示。

您可以通过检索[全部参数参考 (full parameter reference)](../advanced_config/parameter_reference.md)和其他文档来找到哪些参数是受条件限制的。 特别是[串行端口配置参数 (serial port configuration parameters)](../peripherals/serial_configuration.md)，它取决于分配给串行端口的服务。

### 固件中没有的参数

如果使用了不同版本的PX4或者你的固件版本中没有包含相关的模块都会导致固件中没有该参数。

每一版PX4都会增加一些新的参数，原有的参数有时也会被删除或改名。 You can check whether a parameter *should* be present by reviewing the [full parameter reference](../advanced_config/parameter_reference.md) for the version you're targeting. You can also search for the parameter in the source tree and in the release notes.

The other reason that a parameter might not be in firmware is if its associated module has not been included. This is a problem (in particular) for *FMUv2 firmware*, which omits many modules so that PX4 can fit into the 1MB of available flash. There are two options to solve this problem:

- Check if you can update your board to run FMUv3 firmware, which includes all modules: [Firmware > FMUv2 Bootloader Update](../config/firmware.md#bootloader)
- If your board can only run FMUv2 firmware you will need to [rebuild PX4](https://dev.px4.io/master/en/setup/building_px4.html) with the missing modules enabled. You can see these commented out in [boards/px4/fmu-v2/default.cmake](https://github.com/PX4/Firmware/blob/master/boards/px4/fmu-v2/default.cmake): 
        DRIVERS
            adc
            #barometer # all available barometer drivers
            barometer/ms5611
            #batt_smbus
            #camera_capture > 
    
    **Note** You may also need to disable other modules in order to fit the rebuilt firmware into 1MB flash. Finding modules to remove requires some trial/error and depends on what use cases you need the vehicle to meet.

## Changing a Parameter {#changing}

To change the value of a parameter click on the parameter row in a group or search list. This will open a side dialog in which you can update the value (this dialog also provides additional detailed information about the parameter - including whether a reboot is required for the change to take effect).

![Changing a parameter value](../../images/qgc/setup/parameters_changing.png)

> **Note** When you click **Save** the parameter is automatically and silently uploaded to the connected vehicle. Depending on the parameter, you may then need to reboot the flight controller for the change to take effect.

## Tools

You can select additional options from the **Tools** menu on the top right hand side of the screen.

![Tools menu](../../images/qgc/setup/parameters_tools_menu.png)

**Refresh** <br />Refresh the parameter values by re-requesting all of them from the vehicle.

**Reset all to defaults** <br />Reset all parameters to their original default values.

**Load from file / Save to file** <br />Load parameters from an existing file or save your current parameter settings to a file.

**Clear RC to Param** <br />This clears all associations between RC transmitter controls and parameters. For more information see: [Radio Setup > Param Tuning Channels](../config/radio.md#param-tuning-channels).

**Reboot Vehicle** <br />Reboot the vehicle (required after changing some parameters).