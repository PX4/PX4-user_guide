# 파라미터 찾기/업데이트하기

PX4의 동작은 [파라미터](../advanced_config/parameter_reference.md)를 사용하여 설정/조정될 수 있습니다(예. [멀티콥터 PID 계수](../config_mc/pid_tuning_guide_multicopter.md), 캘리브레이션 정보, 등.).

*QGroundControl 파라미터* 화면은 기체와 관련된 **어떤 **파라미터든지 찾고 수정할 수 있도록 허용합니다. 상단 메뉴의 톱니 바퀴 아이콘을 클릭한 다음 좌측 메뉴의 파라미터를 클릭하여 파라미터 화면에 진입합니다.

> **참고** 일반적으로 사용되는 대부분의 파라미터는 [기본 설정](../config/README.md) 에서 설명한 설정 전용 화면을 이용하면 더 편하게 설정할 수 있습니다. *파라미터* 화면은 새 기체를 튜닝한다거나 하는 덜 일반적인 파라미터를 수정할 때 사용됩니다.

<span></span>

> **경고** 일부 파라미터는 비행중에 변경할 수 있지만 추천하는 방법은 아닙니다(가이드에 명시된 경우를 제외하고).

## 파라미터 찾기 {#finding}

*검색* 필드에 용어를 입력하여 파라미터를 검색 할 수 있습니다. 검색은 입력된 하위 문자열을 포함하는 모든 파라미터 이름 및 설명을 나열합니다 (검색을 초기화하려면 **지우기**를 누릅니다).

![파라미터 검색](../../assets/qgc/setup/parameters/parameters_search.jpg)

왼쪽 버튼을 클릭하여 그룹별로 파라미터를 탐색할 수 있습니다 (*Battery Calibration* 그룹 아래의 이미지가 선택됨).

![파라미터 화면](../../assets/qgc/setup/parameters/parameters_px4.jpg)

> **Tip** If you can't find an expected parameter, see the [next section](#missing).

## Missing Parameters {#missing}

Parameters are usually not visible because either they are conditional on other parameters, or they are not present in the firmware (see below).

### Conditional Parameters

A parameter may not be displayed if it is conditional on another parameter that is not enabled.

You can usually find out what parameters are conditional by searching the [full parameter reference](../advanced_config/parameter_reference.md) and other documentation. In particular [serial port configuration parameters](../peripherals/serial_configuration.md) depend on what service is assigned to a serial port.

### Parameter Not In Firmware

A parameter may not be present in the firmware because you're using a different version of PX4 or because you're using a build in which the associated module is not included.

New parameters are added in each PX4 version, and existing parameters are sometimes removed or renamed. You can check whether a parameter *should* be present by reviewing the [full parameter reference](../advanced_config/parameter_reference.md) for the version you're targeting. You can also search for the parameter in the source tree and in the release notes.

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

![Changing a parameter value](../../assets/qgc/setup/parameters_changing/parameters_changing.png)

> **Note** When you click **Save** the parameter is automatically and silently uploaded to the connected vehicle. Depending on the parameter, you may then need to reboot the flight controller for the change to take effect.

## Tools

You can select additional options from the **Tools** menu on the top right hand side of the screen.

![Tools menu](../../assets/qgc/setup/parameters/parameters_tools_menu.png)

**Refresh** <br />Refresh the parameter values by re-requesting all of them from the vehicle.

**Reset all to defaults** <br />Reset all parameters to their original default values.

**Load from file / Save to file** <br />Load parameters from an existing file or save your current parameter settings to a file.

**Clear RC to Param** <br />This clears all associations between RC transmitter controls and parameters. For more information see: [Radio Setup > Param Tuning Channels](../config/radio.md#param-tuning-channels).

**Reboot Vehicle** <br />Reboot the vehicle (required after changing some parameters).