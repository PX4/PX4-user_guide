# 파라미터 검색 및 수정

PX4에서는 [매개변수](../advanced_config/parameter_reference.md)를 설정하여 [멀티콥터 PID 계수](../config_mc/pid_tuning_guide_multicopter.md), 캘리브레이션 정보 등의 기능을 수정할 수 있습니다.

*QGroundControl 매개변수* 화면은 기체와 관련된 **매개변수 **를 검색하고 수정합니다. 상단 메뉴의 *톱니 바퀴* 아이콘을 클릭한 다음 좌측 메뉴의 *매개변수*를 클릭합니다.

:::note
일반적으로 사용되는 매개변수들은 [기본 설정](../config/README.md) 설정 화면을 사용하여 수정합니다. *매개변수* 화면은 신규 기체를 튜닝하거나 일반적이지 않은 매개변수를 수정시에 사용합니다.
:::

:::warning
일부 매개 변수는 비행중에 변경할 수 있지만 권장되지 않습니다 (가이드에 명시적으로 언급된 경우는 제외).
:::

<span id="finding"></span>

## 매개변수 검색

*검색* 필드에 이름을 입력하여 매개변수를 검색합니다. 검색은 입력된 문자열을 포함하는 모든 매개변수의 이름과 설명을 나열합니다(검색을 초기화하려면 **지우기** 버튼를 클릭합니다).

![Parameters Search](../../assets/qgc/setup/parameters/parameters_search.jpg)

왼쪽 버튼을 클릭하여 그룹별로 매개변수를 검색할 수 있습니다 (*배터리 보정* 그룹 아래의 이미지가 선택됨).

![Parameters Screen](../../assets/qgc/setup/parameters/parameters_px4.jpg)

:::tip
매개 변수를 찾을 수없는 경우에는 [다음 섹션](#missing)을 참조하십시오.
:::

<span id="missing"></span>

## Missing Parameters

Parameters are usually not visible because either they are conditional on other parameters, or they are not present in the firmware (see below).

### Conditional Parameters

A parameter may not be displayed if it is conditional on another parameter that is not enabled.

You can usually find out what parameters are conditional by searching the [full parameter reference](../advanced_config/parameter_reference.md) and other documentation. In particular [serial port configuration parameters](../peripherals/serial_configuration.md) depend on what service is assigned to a serial port.

### Parameter Not In Firmware

A parameter may not be present in the firmware because you're using a different version of PX4 or because you're using a build in which the associated module is not included.

New parameters are added in each PX4 version, and existing parameters are sometimes removed or renamed. You can check whether a parameter *should* be present by reviewing the [full parameter reference](../advanced_config/parameter_reference.md) for the version you're targeting. You can also search for the parameter in the source tree and in the release notes.

The other reason that a parameter might not be in firmware is if its associated module has not been included. This is a problem (in particular) for *FMUv2 firmware*, which omits many modules so that PX4 can fit into the 1MB of available flash. There are two options to solve this problem:

- Check if you can update your board to run FMUv3 firmware, which includes all modules: [Firmware > FMUv2 Bootloader Update](../config/firmware.md#bootloader)
- If your board can only run FMUv2 firmware you will need to [rebuild PX4](../dev_setup/building_px4.md) with the missing modules enabled. You can see these commented out in [boards/px4/fmu-v2/default.cmake](https://github.com/PX4/PX4-Autopilot/blob/master/boards/px4/fmu-v2/default.cmake): 
        DRIVERS
            adc
            #barometer # all available barometer drivers
            barometer/ms5611
            #batt_smbus
            #camera_capture :::note You may also need to disable other modules in order to fit the rebuilt firmware into 1MB flash. Finding modules to remove requires some trial/error and depends on what use cases you need the vehicle to meet.
:::

<span id="changing"></span>

## Changing a Parameter

To change the value of a parameter click on the parameter row in a group or search list. This will open a side dialog in which you can update the value (this dialog also provides additional detailed information about the parameter - including whether a reboot is required for the change to take effect).

![Changing a parameter value](../../assets/qgc/setup/parameters/parameters_changing.png)

:::note
When you click **Save** the parameter is automatically and silently uploaded to the connected vehicle. Depending on the parameter, you may then need to reboot the flight controller for the change to take effect.
:::

## Tools

You can select additional options from the **Tools** menu on the top right hand side of the screen.

![Tools menu](../../assets/qgc/setup/parameters/parameters_tools_menu.png)

**Refresh** <br />Refresh the parameter values by re-requesting all of them from the vehicle.

**Reset all to defaults** <br />Reset all parameters to their original default values.

**Load from file / Save to file** <br />Load parameters from an existing file or save your current parameter settings to a file.

**Clear RC to Param** <br />This clears all associations between RC transmitter controls and parameters. For more information see: [Radio Setup > Param Tuning Channels](../config/radio.md#param-tuning-channels).

**Reboot Vehicle** <br />Reboot the vehicle (required after changing some parameters).