# 参数设置

很多PX4的功能和基本参数都能在 [ 参数 (Parameters)](../advanced_config/parameter_reference.md)里进行设置 (例如 [ 多轴PID增益(Multicopter PID gains) ](../config_mc/pid_tuning_guide_multicopter.md)、校准信息等).

* QGroundControl Parameter 页面 * 允许您查找和修改与该无人机机型关联的** 任何 **参数 。 通过单击边栏中的顶部菜单 * 齿轮 * 图标, 然后 * 参数(Parameters) *, 就可以访问参数设置的页面。

> ** 注意 **如若遇到一些不常用的修改参数时, 需要访问参数(Parameters) 页面 (例如, 在调整新无人机时)。 除此之外，大多数常用的参数可以在设置(Setup) 页面进行修改，更多细节可以参阅[基本设置](../config/README.md) 章节.

<span></span>

> ** 注意 **虽然某些参数可以在飞行中更改, 但不建议这样做 (除非在指南中有明确说明)。

## 查找参数

可以通过在 * 搜索(Search) * 框中输入一个相关字眼来搜索参数。 和搜索字眼相关的所有参数名称和说明将会以列表形式显示 (按 ** 清除(Clear) ** 重置搜索)。

![Parameters Search](../../images/qgc/setup/parameters_search.jpg)

你也可以按组浏览参数, 方法是单击左侧的按钮 (在选中 * 电池校准(Battery Calibration) * 下的图像中)。

![Parameters Screen](../../images/qgc/setup/parameters_px4.jpg)

## 更改参数

To change the value of a parameter click on the parameter row in a group or search list. This will open a side dialog in which you can update the value (this dialog also provides additional detailed information about the parameter - including whether a reboot is required for the change to take effect).

![Changing a parameter value](../../images/qgc/setup/parameters_changing.png)

> **Note** When you click **Save** the parameter is automatically and silently uploaded to the connected vehicle. Depending on the parameter, you may then need to reboot the flight controller for the change to take effect.

## 工具

You can select additional options from the **Tools** menu on the top right hand side of the screen.

![Tools menu](../../images/qgc/setup/parameters_tools_menu.png)

**Refresh** <br />Refresh the parameter values by re-requesting all of them from the vehicle.

**Reset all to defaults** <br />Reset all parameters to their original default values.

**Load from file / Save to file** <br />Load parameters from an existing file or save your current parameter settings to a file.

**Clear RC to Param** <br />This clears all associations between RC transmitter controls and parameters. For more information see: [Radio Setup > Param Tuning Channels](../config/radio.md#param-tuning-channels).

**Reboot Vehicle** <br />Reboot the vehicle (required after changing some parameters).