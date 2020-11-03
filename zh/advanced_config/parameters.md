# 查找/修改参数

通过配置和调整[参数](../advanced_config/parameter_reference.md)可以影响PX4的表现（例如: [多轴无人机的PID增益](../config_mc/pid_tuning_guide_multicopter.md)、校准信息等）。

你可以在*QGroundControl 参数* 界面查找和修改任何与载具相关的参数。在屏幕上方的工具条中点击 齿轮 图标，然后在侧边栏中选择 参数(parameter)。 通过单击边栏中的顶部菜单 * 齿轮 * 图标, 然后 * 参数(Parameters) *, 就可以访问参数设置的页面。

> **Note**大部分常用参数都可以通过[基本设置](../config/README.md)章节中描述的专用配置界面更方便地设置。 对于不太常用的参数，比如调试全新的载具，就需要用到 *参数(Parameters)* 界面了。

<span></span>

> **Waring**虽然某些参数可以在飞行中更改，但不建议这样做 (除非在本指南中有明确说明)。

<span id="finding"></span>

## Finding a Parameter

You can search for a parameter by entering a term in the *Search* field. This will show you a list of all parameter names and descriptions that contain the entered substring (press **Clear** to reset the search).

![Parameters Search](../../assets/qgc/setup/parameters/parameters_search.jpg)

You can also browse the parameters by group by clicking on the buttons to the left (in the image below the *Battery Calibration* group is selected).

![Parameters Screen](../../assets/qgc/setup/parameters/parameters_px4.jpg)

> **Tip** 如果找不到期望的参数，请参阅[下一节](#missing)。

<span id="missing"></span>

## Missing Parameters

Parameters are usually not visible because either they are conditional on other parameters, or they are not present in the firmware (see below).

### 受条件限制的参数

A parameter may not be displayed if it is conditional on another parameter that is not enabled.

You can usually find out what parameters are conditional by searching the [full parameter reference](../advanced_config/parameter_reference.md) and other documentation. In particular [serial port configuration parameters](../peripherals/serial_configuration.md) depend on what service is assigned to a serial port.

### 固件中没有的参数

A parameter may not be present in the firmware because you're using a different version of PX4 or because you're using a build in which the associated module is not included.

New parameters are added in each PX4 version, and existing parameters are sometimes removed or renamed. You can check whether a parameter *should* be present by reviewing the [full parameter reference](../advanced_config/parameter_reference.md) for the version you're targeting. You can also search for the parameter in the source tree and in the release notes.

The other reason that a parameter might not be in firmware is if its associated module has not been included. This is a problem (in particular) for *FMUv2 firmware*, which omits many modules so that PX4 can fit into the 1MB of available flash. There are two options to solve this problem:

- 检查你的控制板是否可以升级到包含了所有模块的FMUv3固件：[固件 > FMUv2 Bootloader 升级](../config/firmware.md#bootloader)
- 如果你的控制板只能运行FMUv2固件，你就要引入确实的模块后[重生成PX4](https://dev.px4.io/master/en/setup/building_px4.html)。 You can see these commented out in [boards/px4/fmu-v2/default.cmake](https://github.com/PX4/PX4-Autopilot/blob/master/boards/px4/fmu-v2/default.cmake): 
        DRIVERS
            adc
            #barometer # 全部支持的气压计驱动
            barometer/ms5611
            #batt_smbus
            #camera_capture > 
    
    **Note** 您可能还需要禁用其他的模块才能使重生成的固件适于1MB的闪存. 找到可以移除的模块需要一些试错， 还取决于你要求载具达到哪些使用案例。

<span id="changing"></span>

## Changing a Parameter

To change the value of a parameter click on the parameter row in a group or search list. This will open a side dialog in which you can update the value (this dialog also provides additional detailed information about the parameter - including whether a reboot is required for the change to take effect).

![Changing a parameter value](../../assets/qgc/setup/parameters/parameters_changing.png)

> **Note** 当单击**保存(Save)**按钮后，参数会自动且静默地上传到连接的载具。 对于不同的参数，你可能需要重启飞控才能使改变的参数生效。

## 工具（Tools）菜单

You can select additional options from the **Tools** menu on the top right hand side of the screen.

![Tools menu](../../assets/qgc/setup/parameters/parameters_tools_menu.png)

**Refresh** <br />Refresh the parameter values by re-requesting all of them from the vehicle.

**Reset all to defaults** <br />Reset all parameters to their original default values.

**Load from file / Save to file** <br />Load parameters from an existing file or save your current parameter settings to a file.

**Clear RC to Param** <br />This clears all associations between RC transmitter controls and parameters. For more information see: [Radio Setup > Param Tuning Channels](../config/radio.md#param-tuning-channels).

**Reboot Vehicle** <br />Reboot the vehicle (required after changing some parameters).