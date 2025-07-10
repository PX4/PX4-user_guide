---
canonicalUrl: https://docs.px4.io/main/ko/advanced/parameters_and_configurations
---

# 매개변수와 구성

PX4는 설정 값을 저장하는 수단으로 *매개변수 하위 체계* (`float`형과 `int32_t`형 값의 단순 집합)와 텍스트 파일(믹서, 시작 스크립트용)을 사용합니다.

이 장에서는 *매개변수* 하위 시스템을 자세하게 다루도록 하겠습니다. 매개변수를 살펴보고, 저장하고, 불러오고, 지정하는 방법의 내용을 다룹니다.

:::note
[시스템 시작](../concept/system_startup.md)과 [에어프레임 구성](../dev_airframes/adding_a_new_frame.md) 방법은 다른 페이지에서 자세하게 언급합니다.
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

`load` 명령은 "실질적"으로 매개변수 값을 저장했을 때의 상태로 초기화합니다("실질적"이란 표현을 쓴 이유는 파일에 저장한 어떤 매개변수 값이든 업데이트하겠지만, 다른 매개변수는 파일을 만들었을 때의 매개변수 값과는 다른 펌웨어 지정 기본 값을 가집니다).

반면에, `import` 명령은 기체의 현재 상태 값과 파일의 매개변수 값을 병합합니다. 이를테면 시스템 설정의 나머지 부분을 덮어쓰기 하지 않고 보정 값을 동반하여 매개변수 값 파일을  내용을 가져올 때 사용할 수 있습니다.

아래 예제에 두가지 경우를 모두 보여드립니다:

```sh
# 파일을 저장하고 나면 매개변수 값 초기화
param load /fs/microsd/vtol_param_backup
# 추가로 매개변수 값 저장 (불러온다고 해서 자동으로 끝나지는 않음)
param save
```
```sh
# 현재 매개변수 값 목록에 저장한 매개변수 값 병합
param import /fs/microsd/vtol_param_backup  
```

## 매개변수 이름

매개변수 이름은 ASCII 문자 16개를 넘어서는 안됩니다.
- `param_update` uORB 메시지에 *어떤* 업데이트 사항이 있다면 `orb_check()`에서 알려주고 (다만 어떤 매개변수가 영향을 받았는지 정보는 아님) `updated` 부울린 값을 설정합니다.
- "일부" 매개변수를 업데이트했다면 `parameter_update_s` (`param_upd`)에 최신 매개변수 값을 복사합니다

관례에 따르면, 그룹의 모든 매개변수는 밑줄 문자가 뒤따라오는 동일한(의미를 가진) 문자열을 공유하며, 다중 프로펠러 항공기 또는 고정익 항공기의 여부에 따라 `MC_`와 `FW_`를 매개변수 이름에 활용합니다. 이 관례는 강제 사항이 아닙니다.

PX4 모듈과 드라이버에서 매개변수 값에 접근하는 용도로 C와 C++언어로 활용할 수 있는 개별 API가 있습니다.


### C++ API

Parameter names must be no more than 16 ASCII characters.

By convention, every parameter in a group should share the same (meaningful) string prefix followed by an underscore, and `MC_` and `FW_` are used for parameters related specifically to Multicopter or Fixed wing systems. This convention is not enforced.

The name must match in both code and [parameter metadata](#parameter-metadata) to correctly associate the parameter with its metadata (including default value in Firmware).


### C API

There are separate C and C++ APIs that can be used to access parameter values from within PX4 modules and drivers.

One important difference between the APIs is that the C++ version has a more efficient standardized mechanism to synchronize with changes to parameter values (i.e. from a GCS).

Synchronization is important because a parameter can be changed to another value at any time. Your code should *always* use the current value from the parameter store. If getting the latest version is not possible, then a reboot will be required after the parameter is changed (set this requirement using the `@reboot_required` metadata).

`ModuleParams` 클래스를 상송하고 매개변수 목록과 관련 매개변수 속성을 정의할 때 `DEFINE_PARAMETERS`를 활용하십시오. 매개변수 이름은 매개변수 메타데이터 정의와 정확히 일치해야합니다.


#### 다중 인스턴스 (서식화) 메타데이터

The C++ API provides macros to declare parameters as *class attributes*. You add some "boilerplate" code to regularly listen for changes in the [uORB Topic](../middleware/uorb.md) associated with *any* parameter update. Framework code then (invisibly) handles tracking uORB messages that affect your parameter attributes and keeping them in sync. In the rest of the code you can just use the defined parameter attributes and they will always be up to date!

First include the required needed headers in the class header for your module or driver:
- **px4_platform_common/module_params.h** to get the `DEFINE_PARAMETERS` macro:
  ```cpp
  #include <px4_platform_common/module_params.h>
  ```
- **parameter_update.h** to access the uORB `parameter_update` message:
  ```cpp
  #include <uORB/topics/parameter_update.h>
  ```
- **Subscription.hpp** for the uORB C++ subscription API:
  ```cpp
  #include <uORB/Subscription.hpp>
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
     */
    void parameters_update();

    DEFINE_PARAMETERS(
        (ParamInt<px4::params::SYS_AUTOSTART>) _sys_autostart,   /**< example parameter */
        (ParamFloat<px4::params::ATT_BIAS_MAX>) _att_bias_max  /**< another parameter */
    )

    // Subscriptions
    uORB::SubscriptionInterval _parameter_update_sub{ORB_ID(parameter_update), 1_s};

};
```


위 메서드에서:

Call `parameters_update();` periodically in code to check if there has been an update:
```cpp 
class MyModule : ..., public ModuleParams
{
public:
    ... 
        private:

    /**
     * Check for parameter changes and update them if needed.
```
C API는 모듈과 드라이버 모두에서 활용할 수 있습니다.
- `num_instances` (기본값 1): 생성할 인스턴스 갯수(하나 이상)
- If there has been "some" parameter updated, we copy the update into a `parameter_update_s` (`param_update`), to clear the pending update.
- Then we call `ModuleParams::updateParams()`. This "under the hood" updates all parameter attributes listed in our `DEFINE_PARAMETERS` list.

The parameter attributes (`_sys_autostart` and `_att_bias_max` in this case) can then be used to represent the parameters, and will be updated whenever the parameter value changes.

:::tip
The [Application/Module Template](../modules/module_template.md) uses the new-style C++ API but does not include [parameter metadata](#parameter-metadata).
:::

#### C API

The C API can be used within both modules and drivers.

First include the parameter API:
```C
#include <uORB/topics/parameter_update.h>
```

Then retrieve the parameter and assign it to a variable (here `my_param`), as shown below for `PARAM_NAME`. The variable `my_param` can then be used in your module code.
```C
int32_t my_param = 0;
param_get(param_find("PARAM_NAME"), &my_param);
```

`param_find()`은 "실행 시간이 조금 걸리는" 동작이며, 이 함수에서 나온 핸들 값은 `param_get()` 함수에서 사용할 수 있습니다. 매개변수를 여러줄에서 가져올 경우, 필요할 때 핸들 값을 캐싱한 다음 `param_get()` 값을 사용합니다.

`param_find()` is an "expensive" operation, which returns a handle that can be used by `param_get()`. If you're going to read the parameter multiple times, you may cache the handle and use it in `param_get()` when needed
```cpp
# Get the handle to the parameter
param_t my_param_handle = PARAM_INVALID;
my_param_handle = param_find("PARAM_NAME");

# Query the value of the parameter when needed
int32_t my_param = 0;
param_get(my_param_handle, &my_param);
```


### C 매개변수 메타데이터

PX4 uses an extensive parameter metadata system to drive the user-facing presentation of parameters, and to set the default value for each parameter in firmware.

:::tip
Correct metadata is critical for good user experience in a ground station.
:::

Parameter metadata can be stored anywhere in the source tree as either **.c** or **.yaml** parameter definitions (the YAML definition is newer, and more flexible). Typically it is stored alongside its associated module.

The build system extracts the metadata (using `make parameters_metadata`) to build the [parameter reference](../advanced_config/parameter_reference.md) and the parameter information [used by ground stations](#publishing-parameter-metadata-to-a-gcs).

:::warning
After adding a *new* parameter file you should call `make clean` before building to generate the new parameters (parameter files are added as part of the *cmake* configure step, which happens for clean builds and if a cmake file is modified).
:::


#### YAML Metadata

:::note
At time of writing YAML parameter definitions cannot be used in *libraries*.
:::

YAML meta data is intended as a full replacement for the **.c** definitions. It supports all the same metadata, along with new features like multi-instance definitions.

- The YAML parameter metadata schema is here: [validation/module_schema.yaml](https://github.com/PX4/PX4-Autopilot/blob/master/validation/module_schema.yaml).
- An example of YAML definitions being used can be found in the MAVLink parameter definitions: [/src/modules/mavlink/module.yaml](https://github.com/PX4/PX4-Autopilot/blob/master/src/modules/mavlink/module.yaml).
- A YAML file is registered in the cmake build system by adding
  ```
  MODULE_CONFIG
    module.yaml
  ```
  to the `px4_add_module` section of the `CMakeLists.txt` file of that module.


#### Multi-Instance (Templated) YAML Meta Data

Templated parameter definitions are supported in [YAML parameter definitions](https://github.com/PX4/PX4-Autopilot/blob/master/validation/module_schema.yaml) (templated parameter code is not supported).

The YAML allows you to define instance numbers in parameter names, descriptions, etc. using `${i}`. For example, below will generate MY_PARAM_1_RATE, MY_PARAM_2_RATE etc.
```
#include <parameters/param.h>
```

The following YAML definitions provide the start and end indexes.
- `num_instances` (default 1): Number of instances to generate (>=1)
- `instance_start` (default 0): First instance number. If 0, `${i}` expands to [0, N-1]`.

서식화 매개변수 정의는 [YAML 매개변수 정의](https://github.com/PX4/PX4-Autopilot/blob/master/validation/module_schema.yaml)에서 지원합니다(서식화 매개변수 코드는 지원하지 않습니다).


#### c Parameter Metadata

The legacy approach for defining parameter metadata is in a file with extension **.c** (at time of writing this is the approach most commonly used in the source tree).

다음 YAML 정의에서는 시작, 끝 인덱스 번호를 제공합니다.

```cpp
/**
 * Pitch P gain
 *
 * Pitch proportional gain, i.e. desired angular speed in rad/s for error 1 rad.
 *
 * @unit 1/s
 * @min 0.0
 * @max 10
 * @decimal 2
 * @increment 0.0005
 * @reboot_required true
 * @group Multicopter Attitude Control
 */
PARAM_DEFINE_FLOAT(MC_PITCH_P, 6.5f);
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
 * @decimal <the minimum sane value. Can be overridden by the user>
 * @increment <the "ticks" in which this value will increment in the UI>
 * @reboot_required true <add this if changing the param requires a system restart.>
 * @boolean <add this for integer parameters that represent a boolean value>
 * @group <a title for parameters that form a group>
 */
```

## C / C++ API

Parameter metadata is collected into a JSON or XML file during each PX4 build.

For most flight controllers (as most have enough FLASH available), the JSON file is xz-compressed and stored within the generated binary. The file is then shared to ground stations using the [MAVLink Component Information Protocol](https://mavlink.io/en/services/component_information.html). This ensures that parameter metadata is always up-to-date with the code running on the vehicle.

Binaries for flight controller targets with constrained memory do not store the parameter metadata in the binary, but instead reference the same data stored on `px4-travis.s3.amazonaws.com`. This applies, for example, to the [Omnibus F4 SD](../flight_controller/omnibus_f4_sd.md). The metadata is uploaded via [github CI](https://github.com/PX4/PX4-Autopilot/blob/master/.github/workflows/metadata.yml) for all build targets (and hence will only be available once parameters have been merged into master).

:::note
You can identify memory constrained boards because they specify `CONSTRAINED_MEMORY` in their [cmake definition file](https://github.com/PX4/PX4-Autopilot/blob/release/1.12/boards/omnibus/f4sd/default.cmake#L11)).
:::

:::note
The metadata on `px4-travis.s3.amazonaws.com` is used if parameter metadata is not present on the vehicle. It may also be used as a fallback to avoid a very slow download over a low-rate telemetry link.
:::

Anyone doing custom development on a FLASH-constrained board can adjust the URL [here](https://github.com/PX4/PX4-Autopilot/blob/master/src/lib/component_information/CMakeLists.txt#L41) to point to another server.

The XML file of the master branch is copied into the QGC source tree via CI and is used as a fallback in cases where no metadata is available via the component information service (this approach predates the existence of the component information protocol).


## Further Information

- [Finding/Updating Parameters](../advanced_config/parameters.md)
- [Parameter Reference](../advanced_config/parameter_reference.md)
- [Param implementation](https://github.com/PX4/PX4-Autopilot/blob/master/platforms/common/include/px4_platform_common/param.h#L129) (information on `.get()`, `.commit()`, and other methods)
