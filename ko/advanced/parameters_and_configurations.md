# 매개변수와 설정

PX4는 *param 하위 시스템*(`float` 및 `int32_t` 값의 플랫 테이블)과 텍스트 파일(믹서 및 시작 스크립트용)로 설정을 저장합니다.

이 섹션에서는 *param* 하위 시스템을 자세히 설명합니다. 매개변수를 나열, 저장 및 로드하는 방법과 매개변수를 정의하고 지상국에서 사용하는 방법을 설명합니다.

:::tip
[시스템 시작](../concept/system_startup.md)과 [기체 구성](../dev_airframes/adding_a_new_frame.md)은 다른 페이지에 자세히 설명합니다.
:::


## 명령줄 사용법

PX4 [시스템 콘솔](../debug/system_console.md)은 매개변수를 설정하고, 값을 읽고, 저장하고, 파일로 내보내고 복원하는  [param](../modules/modules_command.md#param) 도구를 제공합니다.

### 매개변수 가져오기 및 설정

`param show` 명령은 모든 시스템 매개변수를 나열합니다.
```sh
param show
```

매개변수 이름 인수에 와일드카드 "*"를 사용할 수 있습니다.
```sh
nsh> param show RC_MAP_A*
Symbols: x = used, + = saved, * = unsaved
x   RC_MAP_AUX1 [359,498] : 0
x   RC_MAP_AUX2 [360,499] : 0
x   RC_MAP_AUX3 [361,500] : 0
x   RC_MAP_ACRO_SW [375,514] : 0

 723 parameters total, 532 used.
```

`-c` 플래그를 사용하여 (기본값에서) 변경된 모든 매개변수를 표시할 수 있습니다.
```sh
param show -c
```

`param show-for-airframe`을 사용하여 현재 기체의 정의 파일에 대해서만 기본값에서 변경된 모든 매개변수를 표시할 수 있습니다.


### 매개변수 내보내기 및 로드

*변경된* 매개변수를 저장할 수 있습니다(기체 기본값과 다름).

표준 `param save` 명령은 현재 기본 파일에 매개변수를 저장합니다.
```sh
param save
```

인수가 제공되면, 이 새 위치 대신 매개변수를 저장합니다.
```sh
param save /fs/microsd/vtol_param_backup
```

매개변수를 *로드*하는 두 가지 명령어가 있습니다.
- `param load`는 모든 매개변수를 기본값으로 완전히 재설정한 다음, 매개변수를 파일에 저장된 값으로 덮어씁니다.
- `param import`는 매개변수 값을 파일의 값으로 덮어쓴 다음 결과를 저장합니다(즉, `param save`를 효과적으로 호출).

`load` 명령은 "실질적"으로 매개변수 값을 저장했을 때의 상태로 초기화합니다("실질적"이란 표현을 쓴 이유는 파일에 저장한 어떤 매개변수 값이든 업데이트하겠지만, 다른 매개변수는 파일을 만들었을 때의 매개변수 값과는 다른 펌웨어 지정 기본 값을 가집니다).

반면에, `import` 명령은 기체의 현재 상태 값과 파일의 매개변수 값을 병합합니다. 예를 들어, 시스템 설정의 나머지 부분을 덮어쓰지 않고 보정 데이터가 포함된 매개변수 파일을 가져오는 데 사용할 수 있습니다.

두 경우에 대한 예를 아래에서 설명합니다.

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

## 매개변수 생성/정의

매개변수 정의에는 두 부분이 있습니다.
- [매개변수 메타데이터](#parameter-metadata)는 지상 관제소와 문서에서 매개변수의 표시(및 편집)를 위한 다른 메타데이터와 함께 펌웨어의 매개변수에 대한 기본값들을 지정합니다.
- PX4 모듈 및 드라이버 내에서 매개변수 값을 가져오거나 구독할 수 있는 [C/C++ 코드](#c-c-api)가 있습니다.

메타데이터와 코드를 작성하기 위한 몇 가지 접근 방식을 아래에서 설명합니다. 코드는 더 유연하고 강력하기 때문에 이전의 C 매개변수/코드 정의보다 최신 [YAML 메타데이터](#yaml-metadata) 및 [C++ API](#c-api)를 사용하여야 합니다.

매개변수 메타데이터는 [펌웨어로 컴파일](#publishing-parameter-metadata-to-a-gcs)되고, [MAVLink 구성 요소 정보 서비스](https://mavlink.io/en/services/component_information.html)를 통하여 지상국에서 사용할 수 있습니다.


### 매개변수 이름

매개변수 이름은 ASCII 문자 16자 이하입니다.

관례에 따라, 그룹의 모든 매개변수는 동일한(의미 있는) 문자열 접두사 뒤에 밑줄이 와야 하며, 특히 멀티콥터 또는 고정익 관련 매개변수에는 `MC_` 및 `FW_`가 사용됩니다. 이 관례는 강제 사항은 아닙니다.

매개변수를 해당 메타데이터(펌웨어의 기본값 포함)와 올바르게 연결하려면, 이름이 코드와 [매개변수 메타데이터](#parameter-metadata)에서 일치하여야 합니다.


### C / C++ API

PX4 모듈 및 드라이버에서 매개변수 사용할 수 있는 C 및 C++ API가 있습니다.

API 간의 중요한 차이점 중 하나는 C++ 버전이 매개변수 값(예: GCS에서) 변경과 동기화하는 보다 효율적인 표준화 메커니즘이 있다는 것입니다.

매개변수는 언제든지 다른 값으로 변경될 수 있으므로, 동기화가 중요합니다. 코드는 매개변수 저장소에서 최신 값을 *항상* 사용하여야 합니다. If getting the latest version is not possible, then a reboot will be required after the parameter is changed (set this requirement using the `@reboot_required` metadata).

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
