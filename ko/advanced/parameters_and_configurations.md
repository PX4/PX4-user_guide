# 매개변수와 구성

PX4는 설정 값을 저장하는 수단으로 *매개변수 하위 체계* (`float`형과 `int32_t`형 값의 단순 집합)와 텍스트 파일(믹서, 시작 스크립트용)을 사용합니다.

이 장에서는 *매개변수* 하위 시스템을 자세하게 다루도록 하겠습니다. 매개변수를 살펴보고, 저장하고, 불러오고, 지정하는 방법의 내용을 다룹니다.

:::tip
[System startup](../concept/system_startup.md) and the way that [airframe configurations](../dev_airframes/adding_a_new_frame.md) work are detailed on other pages.
:::


## 명령행 사용법

`param show` 명령은 전체 시스템 매개변수 값 목록을 보여줍니다:

### 매개변수 값 가져오고 설정하기

좀 더 원하는 부분을 선택할 경우, 매개변수 이름 일부 대신 와일드 카드 문자 "*"를 사용할 수 있습니다:
```sh
param show
```

`-c` 플래그를 사용하여 (기본값으로부터) 값이 바뀐 모든 매개변수를 확인할 수 있습니다:
```sh
nsh> param show RC_MAP_A*
Symbols: x = used, + = saved, * = unsaved
x   RC_MAP_AUX1 [359,498] : 0
x   RC_MAP_AUX2 [360,499] : 0
x   RC_MAP_AUX3 [361,500] : 0
x   RC_MAP_ACRO_SW [375,514] : 0

 723 parameters total, 532 used.
```

`param show-for-airframe` 명령으로 현재 에어프레임 정의 파일용 기본 설정(과 가져온 모든 기본값)을 바꾼 모든 매개변수 값을 보여줄 수 있습니다.
```sh
param show -c
```

모든 매개변수 값을 펌웨어 지정 기본값으로 초기화한 이래로 *값을 바꾼*적이 있는 임의의 매개변수를 저장할 수 있습니다(기본값으로 되돌린 적이 있다 하더라도 바뀐 매개변수 값이 들어감).


### 매개변수 값 불러오고 내보내기

`param save` 표준 명령은 현재 기본 파일에 매개변수 값을 저장합니다:

인자 값을 추가로 기재했다면, 인자 값에 해당하는 새 위치에 매개변수 값을 저장합니다:
```sh
param save
```

매개변수를 *불러오는(load)* 명령에는 두가지가 있습니다:
```sh
param save /fs/microsd/vtol_param_backup
```

`load` 명령은 "실질적"으로 매개변수 값을 저장했을 때의 상태로 초기화합니다("실질적"이란 표현을 쓴 이유는 파일에 저장한 어떤 매개변수 값이든 업데이트하겠지만, 다른 매개변수는 파일을 만들었을 때의 매개변수 값과는 다른 펌웨어 지정 기본 값을 가집니다).
- 우선 `param load` 명령은 모든 매개변수 값을 기본값으로 초기화하며, 파일에 저장한 어떤 값이든 덮어씁니다.
- `param import`는 파일에서 가져온 매개변수 값을 덮어쓰기만 하고, 결과를 저장합니다(예: `param save` 명령 호출과 동일한 결과).

The `load` effectively resets the parameters to the state when the parameters were saved (we say "effectively" because any parameters saved in the file will be updated, but other parameters may have different firmware-defined default values than when the parameters file was created).

By contrast, `import` merges the parameters in the file with the current state of the vehicle. This can be used, for example, to just import a parameter file containing calibration data, without overwriting the rest of the system configuration.

매개변수 이름은 ASCII 문자 16개를 넘어서는 안됩니다.

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

Parameter names must be no more than 16 ASCII characters.

By convention, every parameter in a group should share the same (meaningful) string prefix followed by an underscore, and `MC_` and `FW_` are used for parameters related specifically to Multicopter or Fixed wing systems. This convention is not enforced.

PX4 모듈과 드라이버에서 매개변수 값에 접근하는 용도로 C와 C++언어로 활용할 수 있는 개별 API가 있습니다.


## C / C++ API

API간 중요한 차이점이 있다면, C++ 버전은 매개변수 값을 바꿀 때 동기화하는 표준 매커니즘이 더욱 효율적입니다(예: GCS에서 업데이트).

One important difference between the APIs is that the C++ version has a more efficient standardized mechanism to synchronize with changes to parameter values (i.e. from a GCS).

게다가, C++ 버전은 자료형 관리에 있어 더욱 안전하며 RAM 사용 부하량이 적습니다. 문제점이 있다면, C API는 동적으로 문자열로 만든 이름을 취할 수 있지만, C++ API에서는 컴파일 시간에 매개변수 이름을 밝혀야합니다. If getting the latest version is not possible, then a reboot will be required after the parameter is changed (set this requirement using the `@reboot_required` metadata).

C++ API에서는 *클래스 속성*으로 매개변수를 선언하는 매크로를 제공합니다. *임의의*  매개변수 업데이트와 관련된 [uORB 토픽](../middleware/uorb.md)의 변경을 주기적으로 확인하는 "상용구" 코드를 추가합니다.


### C++ API

The C++ API provides macros to declare parameters as *class attributes*. You add some "boilerplate" code to regularly listen for changes in the [uORB Topic](../middleware/uorb.md) associated with *any* parameter update. Framework code then (invisibly) handles tracking uORB messages that affect your parameter attributes and keeping them in sync. In the rest of the code you can just use the defined parameter attributes and they will always be up to date!

First include **px4_platform_common/module_params.h** in the class header for your module or driver (to get the `DEFINE_PARAMETERS` macro):
```cpp
#include <px4_module_params.h>
```

Derive your class from `ModuleParams`, and use `DEFINE_PARAMETERS` to specify a list of parameters and their associated parameter attributes. The names of the parameters must be the same as their parameter metadata definitions.
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

우선 헤더를 포함하여 uORB parameter_update 메시지에 접근하게 합니다:

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

위 메서드에서:
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
매개변수 속성(이 경우, `_sys_autostart` 와 `_att_bias_max`)은 매개변수를 대신할 목적으로 활용할 수 있으며, 매개변수 값이 바뀔 때마다 업데이트합니다.
- `param_update` uORB 메시지에 *어떤* 업데이트 사항이 있다면 `orb_check()`에서 알려주고 (다만 어떤 매개변수가 영향을 받았는지 정보는 아님) `updated` 부울린 값을 설정합니다.
- "일부" 매개변수를 업데이트했다면 `parameter_update_s` (`param_upd`)에 최신 매개변수 값을 복사합니다
- 그 다음 `ModuleParams::updateParams()` 메서드를 호출합니다. 이 "하부" 에서는 `DEFINE_PARAMETERS`  목록에 있는 특정 매개변수 속성을 업데이트해야 하는지 확인하고, 필요할 경우 진행합니다.
- 이 예제에서는 `Module::parameters_update()` 메서드를 `force=True` 인자 값을 대입하여 호출하지 않습니다. 만약 함수에 넣은 일반 패턴을 설정해야 할 다른 값이 있다면, 초기화를 진행하는  동안 `force=True` 값을 대입하여 1회 호출합니다.

C API는 모듈과 드라이버 모두에서 활용할 수 있습니다.

:::tip
The [Application/Module Template](../modules/module_template.md) uses the new-style C++ API but does not include [parameter metadata](#parameter-metadata).
:::

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

매개변수 메타데이터는 소스트리 어디에든 **.c** 또는 **.yaml** 매개변수 정의파일로 저장할 수 있습니다(YAML 정의가 더 최신이며 다루기에 유연합니다). 보통 관련 모듈과 함께 저장합니다.

`param_find()` is an "expensive" operation, which returns a handle that can be used by `param_get()`. If you're going to read the parameter multiple times, you may cache the handle and use it in `param_get()` when needed
```cpp
# Get the handle to the parameter
param_t my_param_handle = PARAM_INVALID;
my_param_handle = param_find("PARAM_NAME");

# Query the value of the parameter when needed
int32_t my_param = 0;
param_get(my_param_handle, &my_param);
```


## 매개변수 메타데이터

기존의 매개변수 메타데이터 정의 방식의 접근은 **.c** 확장자를 가진 파일을 활용하는 방식입니다(이 글을 작성하는 시점에는 소스트리에서 가장 일반적으로 활용하는 접근법입니다).

:::tip
Correct metadata is critical for good user experience in a ground station.
:::

Parameter metadata can be stored anywhere in the source tree as either **.c** or **.yaml** parameter definitions (the YAML definition is newer, and more flexible). Typically it is stored alongside its associated module.

The build system extracts the metadata (using `make parameters_metadata`) to build the [parameter reference](../advanced_config/parameter_reference.md) and the parameter information used by ground stations.

YAML 메타데이터는 **.c**의 정의를 완전히 대체할 용도로 존재합니다. 모든 동일한 메타데이터를 지원하며, 다중 인스턴스 정의와 같은 새 기능도 있습니다.


### C 매개변수 메타데이터

서식화 매개변수 정의는 [YAML 매개변수 정의](https://github.com/PX4/PX4-Autopilot/blob/master/validation/module_schema.yaml)에서 지원합니다(서식화 매개변수 코드는 지원하지 않습니다).

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

다음 YAML 정의에서는 시작, 끝 인덱스 번호를 제공합니다.

The lines in the comment block are all optional, and are primarily used to control display and editing options within a ground station. The purpose of each line is given below (for more detail see [module_schema.yaml](https://github.com/PX4/PX4-Autopilot/blob/master/validation/module_schema.yaml)).

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

### YAML 메타데이터

:::note
At time of writing YAML parameter definitions cannot be used in *libraries*.
:::

YAML meta data is intended as a full replacement for the **.c** definitions. It supports all the same metadata, along with new features like multi-instance definitions.

- YAML 매개변수 메타데이터 스키마는 [validation/module_schema.yaml](https://github.com/PX4/PX4-Autopilot/blob/master/validation/module_schema.yaml)에 있습니다.
- 활용 중인 YAML 정의 예제는 [/src/modules/mavlink/module.yaml](https://github.com/PX4/PX4-Autopilot/blob/master/src/modules/mavlink/module.yaml) MAVLink 매개변수 정의파일에서 찾을 수 있습니다.


#### 다중 인스턴스 (서식화) 메타데이터

Templated parameter definitions are supported in [YAML parameter definitions](https://github.com/PX4/PX4-Autopilot/blob/master/validation/module_schema.yaml) (templated parameter code is not supported).

The YAML allows you to define instance numbers in parameter names, descriptions, etc. using `${i}`. For example, below will generate MY_PARAM_1_RATE, MY_PARAM_2_RATE etc.
```
MY_PARAM_${i}_RATE:
            description:
                short: Maximum rate for instance ${i}
```

The following YAML definitions provide the start and end indexes.
- `num_instances` (기본값 1): 생성할 인스턴스 갯수(하나 이상)
- `instance_start` (기본값 0): 첫번재 인스턴스 번호. 0으로 지정하면, `${i}` 값은 0부터 N-1 까지 갑니다.

For a full example see the MAVLink parameter definitions: [/src/modules/mavlink/module.yaml](https://github.com/PX4/PX4-Autopilot/blob/master/src/modules/mavlink/module.yaml)

## 추가 정보

- [매개변수 검색/업데이트](../advanced_config/parameters.md)
- [매개변수 참고](../advanced_config/parameter_reference.md)
