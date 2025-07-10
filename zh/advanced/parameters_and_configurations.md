---
canonicalUrl: https://docs.px4.io/main/zh/advanced/parameters_and_configurations
---

# 参数设置

PX4 使用 *param subsystem *（`float` 和 `int32_t` 类型的二维表）和文本文件（用于混控器和启动脚本）来存储其配置。

本节详细讨论 *param* 子系统。 它涵盖如何列出、保存和加载参数，以及如何定义这些参数。

:::tip
[系统启动](../concept/system_startup.md) 以及 [机架配置](../dev_airframes/adding_a_new_frame.md) 在其他页面上的详细工作方式。
:::


## 命令行用法

PX4 [系统控制台](../debug/system_console.md)提供了[参数](../modules/modules_command.md#param)工具，可用于设置参数，读取参数值，保存参数，以及导出和还原参数。

### 获取和设置参数

`param show` 命令列出所有系统参数：
```sh
param show
```

为了更具选择性，参数明可以使用通配符 "*"：
```sh
nsh> param show RC_MAP_A*
Symbols: x = used, + = saved, * = unsaved
x   RC_MAP_AUX1 [359,498] : 0
x   RC_MAP_AUX2 [360,499] : 0
x   RC_MAP_AUX3 [361,500] : 0
x   RC_MAP_ACRO_SW [375,514] : 0

 723 parameters total, 532 used.
```

可以使用 `-c` 标志显示已更改的所有参数（从其默认值）：
```sh
param show -c
```

您可以使用`param show-for-airframe`来显示所有修改了默认值的参数，只显示当前机架定义的文件（默认导入）。


### 导出和加载参数

您可以保存自上次将所有参数重置为其固件定义的默认值以来 *touched* 的任何参数（这包括已更改的任何参数，即使这些参数已更改为默认值）。

标准的 `param save ` 命令将参数存储在当前默认文件中:
```sh
param save
```

如果提供了参数，它会将参数存储到这个新位置:
```sh
param save /fs/microsd/vtol_param_backup
```

有两个不同的命令可用于 *load* 参数:
- `param load` 首先将所有参数完全重置为默认值，然后用存储在文件中的任何值覆盖参数值。
- `param import` 只是用文件中的值覆盖参数值，然后保存结果（即有效调用 `param save`）。

`load` 有效地将参数重置为保存参数时的状态（我们说 "有效"，因为保存在文件中的任何参数都将被更新，但其他参数可能有不同于参数文件创建时的固件定义默认值）。

相比之下，`import` 是将文件中的参数与无人机的当前状态合并。 例如，这可以用来只导入包含校准数据的参数文件，而不覆盖系统配置的其余部分。

这两种情况的示例如下所示:

```sh
# 文件保存时重置参数
param load /fs/microsd/vtol_param_backup
# 选择性的保存参数 (不自动加载)
param save
```
```sh
# 将保存的参数与当前参数合并
param import /fs/microsd/vtol_param_backup  
```

## 参数名称

参数名称不得超过 16 个 ASCII 字符。
- `orb_check()` 告诉我们是否有 *任何* 更新 `param_update` 的 uorb 消息 (但不是受影响的参数)，并设置 `updated` bool。
- 如果更新了 "某些" 参数，我们会将更新复制到 `parameter_update_s` (`param_upd`)

按照惯例，组中的每个参数都应共享相同的 (有意义的) 字符串前缀，后跟下划线，`MC_` 和 `FW_` 用于与多旋翼或固定翼系统具体相关的参数。 此惯例不强制执行。

该名称必须在代码和 [parameter metadatata](#parameter-metadata) 中匹配，才能正确地将参数与其元数据（包括固件中的默认值）相关联。


### C++ API

Parameter names must be no more than 16 ASCII characters.

By convention, every parameter in a group should share the same (meaningful) string prefix followed by an underscore, and `MC_` and `FW_` are used for parameters related specifically to Multicopter or Fixed wing systems. This convention is not enforced.

The name must match in both code and [parameter metadata](#parameter-metadata) to correctly associate the parameter with its metadata (including default value in Firmware).


### C API

There are separate C and C++ APIs that can be used to access parameter values from within PX4 modules and drivers.

One important difference between the APIs is that the C++ version has a more efficient standardized mechanism to synchronize with changes to parameter values (i.e. from a GCS).

Synchronization is important because a parameter can be changed to another value at any time. Your code should *always* use the current value from the parameter store. If getting the latest version is not possible, then a reboot will be required after the parameter is changed (set this requirement using the `@reboot_required` metadata).

从 `ModuleParams` 派生类，并使用 `DEFINE_PARAMETERS` 指定参数李彪及其关联的参数属性。 参数的名称必须与其参数元数据定义相同。


#### 多实例（模块化）元数据

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


调用 `parameters_update(parameter_update_sub);` 在代码中定期检查是否有更新(这是模板)：

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
然后，参数属性 (`_sys_autostart` 和`_att_bias_max` 在本例中) 可用于表示参数，并随时更新参数值的变化。
- `num_instances` (默认是1): 要生成的实例数 (>=1)
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

`param_find()` 是一个“昂贵”操作，返回一个可以被 `param_get()` 使用的句柄。 如果要多次读取该参数，可以缓存句柄，并在需要时在 `param_get()` 中使用

`param_find()` is an "expensive" operation, which returns a handle that can be used by `param_get()`. If you're going to read the parameter multiple times, you may cache the handle and use it in `param_get()` when needed
```cpp
# Get the handle to the parameter
param_t my_param_handle = PARAM_INVALID;
my_param_handle = param_find("PARAM_NAME");

# Query the value of the parameter when needed
int32_t my_param = 0;
param_get(my_param_handle, &my_param);
```


### c 参数元数据

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

[YAML 参数定义](https://github.com/PX4/PX4-Autopilot/blob/master/validation/module_schema.yaml) 支持模块化参数定义(不支持模块化参数代码)。


#### c Parameter Metadata

The legacy approach for defining parameter metadata is in a file with extension **.c** (at time of writing this is the approach most commonly used in the source tree).

以下 YAML 定义提供起始和结束索引。

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
