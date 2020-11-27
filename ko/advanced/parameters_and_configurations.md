# 매개변수와 구성

PX4는 설정 값을 저장하는 수단으로 *매개변수 하위 체계* (`float`형과 `int32_t`형 값의 단순 집합)와 텍스트 파일(믹서, 시작 스크립트용)을 사용합니다.

이 장에서는 *매개변수* 하위 시스템을 자세하게 다루도록 하겠습니다. 매개변수를 살펴보고, 저장하고, 불러오고, 지정하는 방법의 내용을 다룹니다.

> **Note** [시스템 시작](../concept/system_startup.md)과 [에어프레임 설정](../dev_airframes/adding_a_new_frame.md) 작업 방법은 다른 페이지에서 자세하게 언급합니다.


## 명령행 사용법

The PX4 [system console](../debug/system_console.md) offers the [param](../modules/modules_command.md#param) tool, which can be used to set parameters, read their value, save them, and export and restore to/from files.

### 매개변수 값 가져오고 설정하기

`param show` 명령은 전체 시스템 매개변수 값 목록을 보여줍니다:
```sh
param show
```

To be more selective, a partial parameter name with wildcard "*" can be used:
```sh
nsh> param show RC_MAP_A*
Symbols: x = used, + = saved, * = unsaved
x   RC_MAP_AUX1 [359,498] : 0
x   RC_MAP_AUX2 [360,499] : 0
x   RC_MAP_AUX3 [361,500] : 0
x   RC_MAP_ACRO_SW [375,514] : 0

 723 parameters total, 532 used.
```

You can use the `-c` flag to show all parameters that have changed (from their defaults):
```sh
param show -c
```

You can save any parameters that have been *touched* since all parameters were last reset to their firmware-defined defaults (this includes any parameters that have changed been changed, even if they have been changed back to their default).


### 매개변수 값 불러오고 내보내기

You can save any parameters that have been *touched* since all parameters were last reset to their firmware-defined defaults (this includes any parameters that have been changed, even if they have been changed back to their default).

The standard `param save` command will store the parameters in the current default file:
```sh
param save
```

If provided with an argument, it will store the parameters instead to this new location:
```sh
param save /fs/microsd/vtol_param_backup
```

There are two different commands to *load* parameters:
- `param load` first does a full reset of all parameters to their defaults, and then overwrites parameter values with any values stored in the file.
- `param import` just overwrites parameter values with the values from the file and then saves the result (i.e. effectively calls `param save`).

The `load` effectively resets the parameters to the state when the parameters were saved (we say "effectively" because any parameters saved in the file will be updated, but other parameters may have different firmware-defined default values than when the parameters file was created).

By contrast, `import` merges the parameters in the file with the current state of the vehicle. This can be used, for example, to just import a parameter file containing calibration data, without overwriting the rest of the system configuration.

Examples for both cases are shown below:

```sh
# Reset the parameters to when file was saved
param load /fs/microsd/vtol_param_backup
# Optionally save params (not done automatically with load)
param save
```
```sh
# Merge the saved parameters with current parameters
param import /fs/microsd/vtol_param_backup  
```


## 매개변수 이름

매개변수 이름은 ASCII 문자 16개를 넘어서는 안됩니다.

관례에 따르면, 그룹의 모든 매개변수는 밑줄 문자가 뒤따라오는 동일한(의미를 가진) 문자열을 공유하며, 다중 프로펠러 항공기 또는 고정익 항공기의 여부에 따라 `MC_`와 `FW_`를 매개변수 이름에 활용합니다. 이 관례는 강제 사항이 아닙니다.

이름은 매개변수와 (펌웨어 기본값이 들어있는) 메타데이터가 올바르게 붙도록 코드와 [매개변수 메타데이터](#parameter_metadata)에 일치해야합니다.


## C / C++ API

PX4 모듈과 드라이버에서 매개변수 값에 접근하는 용도로 C와 C++언어로 활용할 수 있는 개별 API가 있습니다.

API간 중요한 차이점이 있다면, C++ 버전은 매개변수 값을 바꿀 때 동기화하는 표준 매커니즘이 더욱 효율적입니다(예: GCS에서 업데이트).

매개변수 값이 다른 값으로 언제든 바뀔 수 있으므로 동기화는 중요합니다. 코드는 매개변수 저장소에 *항상* 현재 값을 사용해야합니다. 최근 버전을 가져올 수 없다면, 매개변수 값을 바꾼 후 다시 부팅해야 합니다(`@reboot_required` 메타데이터로 필수 여부 설정).

게다가, C++ 버전은 자료형 관리에 있어 더욱 안전하며 RAM 사용 부하량이 적습니다. 문제점이 있다면, C API는 동적으로 문자열로 만든 이름을 취할 수 있지만, C++ API에서는 컴파일 시간에 매개변수 이름을 밝혀야합니다.


### C++ API

C++ API에서는 *클래스 속성*으로 매개변수를 선언하는 매크로를 제공합니다. *임의의*  매개변수 업데이트와 관련된 [uORB 토픽](../middleware/uorb.md)의 변경을 주기적으로 확인하는 "상용구" 코드를 추가합니다. 이렇게 하면 프레임워크 코드는 매개변수 속성 값에 영향을 주는 uORB 메시지를 (감쪽같이) 추적하고 동기화 과정을 통해 매개변수 속성 값을 유지합니다. 나머지 코드에서 지정한 매개변수 속성을 활용하고 항상 최신으로 유지할 수 있습니다!

First include **px4_module_params.h** in the class header for your module or driver (to get the `DEFINE_PARAMETERS` macro):
```cpp
#include <px4_module_params.h>
```

`ModuleParams` 클래스를 상속하고 매개변수 목록과 관련 매개변수 속성을 정의할 때 `DEFINE_PARAMETERS`를 활용하십시오. 매개변수 이름은 매개변수 메타데이터 정의와 정확히 일치해야합니다.
```cpp
class MyModule : ..., public ModuleParams
{
public:
    ...

private:

    /**
     * Check for parameter changes and update them if needed.
     * @param parameter_update_sub uorb subscription to parameter_update
     */
    void parameters_update(int parameter_update_sub, bool force = false);

    DEFINE_PARAMETERS(
        (ParamInt<px4::params::SYS_AUTOSTART>) _sys_autostart,   /**< example parameter */
        (ParamFloat<px4::params::ATT_BIAS_MAX>) _att_bias_max  /**< another parameter */
    )
};
```

Update the cpp file with boilerplate to check for the uORB message related to parameter updates.

First include the header to access the uORB parameter_update message:
```cpp
#include <uORB/topics/parameter_update.h>
```
Subscribe to the update message when the module/driver starts and un-subscribe when it is stopped. `parameter_update_sub` returned by `orb_subscribe()` is a handle we can use to refer to this particular subscription.
```cpp
# Subscribe to parameter_update message
int parameter_update_sub = orb_subscribe(ORB_ID(parameter_update));
...
# Unsubscribe to parameter_update messages
orb_unsubscribe(parameter_update_sub);
```

`parameters_update(parameter_update_sub);`를 주기적으로 호출하여 업데이트한 매개변수가 있는지 확인하십시오:
```cpp
void Module::parameters_update(int parameter_update_sub, bool force)
{
    bool updated;
    struct parameter_update_s param_upd;

    // Check if any parameter updated
    orb_check(parameter_update_sub, &updated);

    // If any parameter updated copy it to: param_upd
    if (updated) {
        orb_copy(ORB_ID(parameter_update), parameter_update_sub, &param_upd);
    }

    if (force || updated) {
        // If any parameter updated, call updateParams() to check if
        // this class attributes need updating (and do so). 
        updateParams();
    }
}
```
In the above method:
- `orb_check()` tells us if there is *any* update to the `param_update` uORB message (but not what parameter is affected) and sets the `updated` bool.
- If there has been "some" parameter updated, we copy the update into a `parameter_update_s` (`param_upd`)
- Then we call `ModuleParams::updateParams()`. This "under the hood" checks if the specific parameter attributes listed in our `DEFINE_PARAMETERS` list need updating, and then does so if needed.
- This example doesn't call `Module::parameters_update()` with `force=True`. If you had other values that needed to be set up a common pattern is to include them in the function, and call it once with `force=True` during initialisation.

The parameter attributes (`_sys_autostart` and `_att_bias_max` in this case) can then be used to represent the parameters, and will be updated whenever the parameter value changes.

> **Tip** The [Application/Module Template](../apps/module_template.md) uses the new-style C++ API but does not include [parameter metadata](#parameter_metadata).


### C API

The C API can be used within both modules and drivers.

First include the parameter API:
```C
#include <parameters/param.h>
```

Then retrieve the parameter and assign it to a variable (here `my_param`), as shown below for `PARAM_NAME`. The variable `my_param` can then be used in your module code.
```C
int32_t my_param = 0;
param_get(param_find("PARAM_NAME"), &my_param);
```

> **Note** If `PARAM_NAME` was declared in parameter metadata then its default value will be set, and the above call to find the parameter should always succeed.

`param_find()` is an "expensive" operation, which returns a handle that can be used by `param_get()`. If you're going to read the parameter multiple times, you may cache the handle and use it in `param_get()` when needed
```cpp
In the above method:
```

<a id="parameter_metadata"></a>

## Parameter Meta Data

PX4 uses an extensive parameter metadata system to drive the user-facing presentation of parameters, and to set the default value for each parameter in firmware.

> **Tip** Correct meta data is critical for good user experience in a ground station.

Parameter metadata can be stored anywhere in the source tree, in a file with extension **.c**. Typically it is stored alongside its associated module.

The build system extracts the metadata (using `make parameters_metadata`) to build the [parameter reference](../advanced/parameter_reference.md) and the parameter information used by ground stations.

> **Warning** After adding a *new* parameter file you should call `make clean` before building to generate the new parameters (parameter files are added as part of the *cmake* configure step, which happens for clean builds and if a cmake file is modified).

<a id="c_metadata"></a>

### c Parameter Metadata

The legacy approach for defining parameter metadata is in a file with extension **.c** (at time of writing this is the approach most commonly used in the source tree).

Parameter metadata sections look like the following examples:

```cpp
/**
 * Acceleration compensation based on GPS
 * velocity.
 *
 * @group Attitude Q estimator
 * @boolean
 */
PARAM_DEFINE_INT32(ATT_ACC_COMP, 1);
```
```cpp
/**
 * Acceleration compensation based on GPS
 * velocity.
 *
 * @group Attitude Q estimator
 * @boolean
 */
PARAM_DEFINE_INT32(ATT_ACC_COMP, 1);
```

The `PARAM_DEFINE_*` macro at the end specifies the type of parameter (`PARAM_DEFINE_FLOAT` or `PARAM_DEFINE_INT32`), the name of the parameter (which must match the name used in code), and the default value in firmware.

The lines in the comment block are all optional, and are primarily used to control display and editing options within a ground station. The purpose of each line is given below (for more detail see [module_schema.yaml](https://github.com/PX4/Firmware/blob/master/validation/module_schema.yaml)).

```cpp
/**
 * <title>
 *
 * <longer description, can be multi-line>
 *
 * @unit <the unit, e.g. m for meters>
 * @min <the minimum sane value. Can be overridden by the user>
 * @max <the maximum sane value. Can be overridden by the user>
 * @max <the maximum sane value. Can be overridden by the user>
 * @increment <the "ticks" in which this value will increment in the UI>
 * @reboot_required true <add this if changing the param requires a system restart.>
 * @boolean <add this for integer parameters that represent a boolean value>
 * @group <a title for parameters that form a group>
 */
```

<a id="yaml_metadata"></a>

### YAML Metadata

> **Note** At time of writing YAML parameter definitions cannot be used in *libraries*.

YAML meta data is intended as a full replacement for the **.c** definitions. It supports all the same metadata, along with new features like multi-instance definitions.

- The YAML parameter metadata schema is here: [validation/module_schema.yaml](https://github.com/PX4/PX4-Autopilot/blob/master/validation/module_schema.yaml).
- An example of YAML definitions being used can be found in the MAVLink parameter definitions: [/src/modules/mavlink/module.yaml](https://github.com/PX4/PX4-Autopilot/blob/master/src/modules/mavlink/module.yaml).

<a id="multi_instance_metadata"></a>

#### 다중 인스턴스 (서식화) 메타데이터

서식화 매개변수 정의는 [YAML 매개변수 정의](https://github.com/PX4/PX4-Autopilot/blob/master/validation/module_schema.yaml)에서 지원합니다(서식화 매개변수 코드는 지원하지 않습니다).

The YAML allows you to define instance numbers in parameter names, descriptions, etc. using `${i}`. For example, below will generate MY_PARAM_1_RATE, MY_PARAM_2_RATE etc.
```
MY_PARAM_${i}_RATE:
            description:
                short: Maximum rate for instance ${i}
```

다음 YAML 정의에서는 시작, 끝 인덱스 번호를 제공합니다.
- `num_instances` (기본값 1): 생성할 인스턴스 갯수(하나 이상)
- `instance_start` (기본값 0): 첫번재 인스턴스 번호. 0으로 지정하면, `${i}` 값은 0부터 N-1 까지 갑니다.

전체 예제를 보려면 [/src/modules/mavlink/module.yaml](https://github.com/PX4/PX4-Autopilot/blob/master/src/modules/mavlink/module.yaml) MAVLink 매개변수 정의 파일을 살펴보십시오

## 추가 정보

- [매개변수 검색/업데이트](../advanced_config/parameters.md)
- [매개변수 참고](../advanced_config/parameter_reference.md)
