# 查找/修改参数

通过配置和调整[参数](../advanced_config/parameter_reference.md)可以影响PX4的表现（例如: [多轴无人机的PID增益](../config_mc/pid_tuning_guide_multicopter.md)、校准信息等）。

你可以在*QGroundControl 参数* 界面查找和修改**任何**与载具相关的参数。 点击顶部菜单 *齿轮* 图标，然后点击侧边栏中的 *参数* 访问屏幕。

:::note
Most of the more commonly used parameters are more conveniently set using the dedicated setup screens described in the [Basic Configuration](../config/README.md) section. The *Parameters* screen is needed when modifying less commonly modified parameters - for example while tuning a new vehicle.
:::

:::warning
While some parameters can be changed in flight, this is not recommended (except where explicitly stated in the guide).
:::

<span id="finding"></span>

## 查找参数

You can search for a parameter by entering a term in the *Search* field. This will show you a list of all parameter names and descriptions that contain the entered substring (press **Clear** to reset the search).

![Parameters Search](../../assets/qgc/setup/parameters/parameters_search.jpg)

You can also browse the parameters by group by clicking on the buttons to the left (in the image below the *Battery Calibration* group is selected).

![Parameters Screen](../../assets/qgc/setup/parameters/parameters_px4.jpg)

:::tip
If you can't find an expected parameter, see the [next section](#missing).
:::

<span id="missing"></span>

## 找不到的参数

Parameters are usually not visible because either they are conditional on other parameters, or they are not present in the firmware (see below).

### 受条件限制的参数

A parameter may not be displayed if it is conditional on another parameter that is not enabled.

You can usually find out what parameters are conditional by searching the [full parameter reference](../advanced_config/parameter_reference.md) and other documentation. In particular [serial port configuration parameters](../peripherals/serial_configuration.md) depend on what service is assigned to a serial port.

### 固件中没有的参数

A parameter may not be present in the firmware because you're using a different version of PX4 or because you're using a build in which the associated module is not included.

New parameters are added in each PX4 version, and existing parameters are sometimes removed or renamed. You can check whether a parameter *should* be present by reviewing the [full parameter reference](../advanced_config/parameter_reference.md) for the version you're targeting. You can also search for the parameter in the source tree and in the release notes.

The other reason that a parameter might not be in firmware is if its associated module has not been included. This is a problem (in particular) for *FMUv2 firmware*, which omits many modules so that PX4 can fit into the 1MB of available flash. There are two options to solve this problem:

- 检查你的控制板是否可以升级到包含了所有模块的FMUv3固件：[固件 > FMUv2 Bootloader 升级](../config/firmware.md#bootloader)
- 如果你的控制板只能运行FMUv2固件，你就要引入确实的模块后[重生成PX4](../dev_setup/building_px4.md)。 在[boards/px4/fmu-v2/default.cmake](https://github.com/PX4/PX4-Autopilot/blob/master/boards/px4/fmu-v2/default.cmake)文件中看到注释掉的模块: 
        DRIVERS
            adc
            #barometer # 全部支持的气压计驱动
            barometer/ms5611
            #batt_smbus
            #camera_capture :::note You may also need to disable other modules in order to fit the rebuilt firmware into 1MB flash. 找到可以移除的模块需要一些试错， 还取决于你要求载具达到哪些使用案例。
:::

<span id="changing"></span>

## 更改参数

To change the value of a parameter click on the parameter row in a group or search list. This will open a side dialog in which you can update the value (this dialog also provides additional detailed information about the parameter - including whether a reboot is required for the change to take effect).

![Changing a parameter value](../../assets/qgc/setup/parameters/parameters_changing.png)

:::note
When you click **Save** the parameter is automatically and silently uploaded to the connected vehicle. Depending on the parameter, you may then need to reboot the flight controller for the change to take effect.
:::

## 工具（Tools）菜单

You can select additional options from the **Tools** menu on the top right hand side of the screen.

![Tools menu](../../assets/qgc/setup/parameters/parameters_tools_menu.png)

**Refresh** <br />Refresh the parameter values by re-requesting all of them from the vehicle.

**Reset all to defaults** <br />Reset all parameters to their original default values.

**Load from file / Save to file** <br />Load parameters from an existing file or save your current parameter settings to a file.

**Clear RC to Param** <br />This clears all associations between RC transmitter controls and parameters. For more information see: [Radio Setup > Param Tuning Channels](../config/radio.md#param-tuning-channels).

**Reboot Vehicle** <br />Reboot the vehicle (required after changing some parameters).