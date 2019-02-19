# Parameter Configuration

A lot of PX4 behaviour can be configured/tuned using [parameters](../advanced_config/parameter_reference.md) (e.g. [Multicopter PID gains](../config_mc/pid_tuning_guide_multicopter.md), calibration information, etc.).

The *QGroundControl Parameters screen* allows you to find and modify **any** of the parameters associated with the vehicle. The screen is accessed by clicking the top menu *Gear* icon and then *Parameters* in the sidebar.

> **Note** The Parameters screen is needed when accessing less commonly modified parameters - for example while tuning a new vehicle. Most of the more commonly used parameters are more conveniently set using the dedicated setup screens described in the [Basic Configuration](../config/README.md) section.

<span></span>

> **Note** While some parameters can be changed in flight, this is not recommended (except where explicitly stated in the guide).

## Finding a Parameter

You can search for a parameter by entering a term in the *Search* field. This will show you a list of all parameter names and descriptions that contain the entered substring (press **Clear** to reset the search).

![Parameters Search](../../images/qgc/setup/parameters_search.jpg)

You can also browse the parameters by group by clicking on the buttons to the left (in the image below the *Battery Calibration* group is selected).

![Parameters Screen](../../images/qgc/setup/parameters_px4.jpg)

## Changing a Parameter

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