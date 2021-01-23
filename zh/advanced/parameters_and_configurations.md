# 参数设置

PX4 使用 *param subsystem *（`float` 和 `int32_t` 值的平面表）和文本文件（用于混频器和启动脚本）来存储其配置。

本节详细讨论 *param* 子系统。 This section discusses the *param* subsystem in detail. It covers how to list, save and load parameters, and how to define them.

:::tip
[System startup](../concept/system_startup.md) and the way that [airframe configurations](../dev_airframes/adding_a_new_frame.md) work are detailed on other pages.
:::


## 命令行使用方法

`param show ` 命令列出了所有系统参数:

### 获取和设置参数

为了更有选择性，可以使用带有通配符 "*" 的部分参数名称：
```sh
param show
```

可以使用 `-c` 标志显示已更改的所有参数（从其默认值）：
```sh
nsh> param show RC_MAP_A*
Symbols: x = used, + = saved, * = unsaved
x   RC_MAP_AUX1 [359,498] : 0
x   RC_MAP_AUX2 [360,499] : 0
x   RC_MAP_AUX3 [361,500] : 0
x   RC_MAP_ACRO_SW [375,514] : 0

 723 parameters total, 532 used.
```

You can save any parameters that have been *touched* since all parameters were last reset to their firmware-defined defaults (this includes any parameters that have changed been changed, even if they have been changed back to their default).
```sh
param show -c
```

Synchronization is important because a parameter can be changed to another value at any time. Your code should *always* use the current value from the parameter store. If getting the latest version is not possible, then a reboot will be required after the parameter is changed (set this requirement using the `@reboot_required` metadata).


### 导出和加载参数

标准的 `param save ` 命令将参数存储在当前默认文件中:

如果提供了参数，它将将参数存储到这个新位置:
```sh
param save
```

有两个不同的命令可用于 *load* 参数:
```sh
param save /fs/microsd/vtol_param_backup
```

`load` 有效地将参数重置为保存参数时的状态（我们说 "有效"，因为保存在文件中的任何参数都将被更新，但其他参数可能具有与参数文件）。
- `param load ` 首先将所有参数完全重置为默认值，然后用存储在文件中的任何值覆盖参数值。
- `param import ` 只是用文件中的值覆盖参数值，然后保存结果（即有效调用 `param save</0 >）。</li>
</ul>

<p spaces-before="0">The <code>load` effectively resets the parameters to the state when the parameters were saved (we say "effectively" because any parameters saved in the file will be updated, but other parameters may have different firmware-defined default values than when the parameters file was created). </p>

By contrast, `import` merges the parameters in the file with the current state of the vehicle. This can be used, for example, to just import a parameter file containing calibration data, without overwriting the rest of the system configuration.

参数名称不得超过 16个 ASCII 字符。

```sh
# 将参数重置为保存文件时,
param load /fs/microsd/vtol_param_backup
# 保存参数 (不自动完成与负载)
param save
```
```sh
# 将保存的参数与当前参数合并
param import /fs/microsd/vtol_param_backup  
```


## 参数名称

Parameter names must be no more than 16 ASCII characters.

By convention, every parameter in a group should share the same (meaningful) string prefix followed by an underscore, and `MC_` and `FW_` are used for parameters related specifically to Multicopter or Fixed wing systems. This convention is not enforced.

有单独的 C 和 C++ 的 API 可用于从 PX4 模块和驱动程序中访问参数值。


## C / C++ API

API 之间的一个重要区别是，C++ 版本具有更有效的标准化机制，可与参数值的更改（即来自 GCS 的更改）同步。

One important difference between the APIs is that the C++ version has a more efficient standardized mechanism to synchronize with changes to parameter values (i.e. from a GCS).

此外，C++ 版本在 RAM 方面也具有更好的类型安全性和更少的开销。 In addition, the C++ version has also better type-safety and less overhead in terms of RAM. The drawback is that the parameter name must be known at compile-time, while the C API can take a dynamically created name as a string. If getting the latest version is not possible, then a reboot will be required after the parameter is changed (set this requirement using the `@reboot_required` metadata).

The C++ API provides macros to declare parameters as *class attributes*. You add some "boilerplate" code to regularly listen for changes in the [uORB Topic](../middleware/uorb.md) associated with *any* parameter update. Framework code then (invisibly) handles tracking uORB messages that affect your parameter attributes and keeping them in sync. In the rest of the code you can just use the defined parameter attributes and they will always be up to date! 您可以添加一些 "样板" 代码，以定期侦听与 *any* 参数更新相关的 [uORB topic](../middleware/uorb.md) 中的更改。


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

首先包括访问 uORB parameter_update 消息的标头:

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
# Unsubscribe to parameter_update messages
orb_unsubscribe(parameter_update_sub);
```

在上面的方法中：
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
        updateParams();
    }
}
```
然后，参数属性 (`_sys_autostart` 和 `_att_bias_max` 在本例中) 可用于表示参数，并将在参数值更改时进行更新。
- `orb_check()` 告诉我们是否有 *任何* 更新 `param_update` 的 uorb 消息 (但不是受影响的参数)，并设置 `updated` bool。
- 如果更新了 "某些" 参数，我们会将更新复制到 `parameter_update_s` (`param_upd`)
- 调用 `ModuleParams::updateParams()`。 Then we call `ModuleParams::updateParams()`. This "under the hood" checks if the specific parameter attributes listed in our `DEFINE_PARAMETERS` list need updating, and then does so if needed.
- This example doesn't call `Module::parameters_update()` with `force=True`. If you had other values that needed to be set up a common pattern is to include them in the function, and call it once with `force=True` during initialisation. 如果您有其他需要设置公共模式的值，则是将它们包含在函数中，并在初始化过程中使用 `force=True` 调用它一次。

C API 可以在模块和驱动程序中使用。

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

:::note
If `PARAM_NAME` was declared in parameter metadata then its default value will be set, and the above call to find the parameter should always succeed. 通常，它与关联的模块一起存储。

`param_find()` is an "expensive" operation, which returns a handle that can be used by `param_get()`. If you're going to read the parameter multiple times, you may cache the handle and use it in `param_get()` when needed
```cpp
# Get the handle to the parameter
param_t my_param_handle = PARAM_INVALID;
my_param_handle = param_find("PARAM_NAME");

# Query the value of the parameter when needed
int32_t my_param = 0;
param_get(my_param_handle, &my_param);
```


## 参数元数据

PX4 uses an extensive parameter metadata system to drive the user-facing presentation of parameters, and to set the default value for each parameter in firmware.

:::tip
Correct metadata is critical for good user experience in a ground station.
:::

Parameter metadata can be stored anywhere in the source tree as either **.c** or **.yaml** parameter definitions (the YAML definition is newer, and more flexible). Typically it is stored alongside its associated module.

The build system extracts the metadata (using `make parameters_metadata`) to build the [parameter reference](../advanced_config/parameter_reference.md) and the parameter information used by ground stations.

:::warning
After adding a *new* parameter file you should call `make clean` before building to generate the new parameters (parameter files are added as part of the *cmake* configure step, which happens for clean builds and if a cmake file is modified).
:::


### c 参数 Metadata

The legacy approach for defining parameter metadata is in a file with extension **.c** (at time of writing this is the approach most commonly used in the source tree).

Parameter metadata sections look like the following examples:

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
 * @decimal <the minimum sane value. /**
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

### YAML Metadata

:::note
At time of writing YAML parameter definitions cannot be used in *libraries*.
:::

YAML meta data is intended as a full replacement for the **.c** definitions. It supports all the same metadata, along with new features like multi-instance definitions.

- The YAML parameter metadata schema is here: [validation/module_schema.yaml](https://github.com/PX4/PX4-Autopilot/blob/master/validation/module_schema.yaml).
- An example of YAML definitions being used can be found in the MAVLink parameter definitions: [/src/modules/mavlink/module.yaml](https://github.com/PX4/PX4-Autopilot/blob/master/src/modules/mavlink/module.yaml).


#### Multi-Instance (Templated) Meta Data

Templated parameter definitions are supported in [YAML parameter definitions](https://github.com/PX4/PX4-Autopilot/blob/master/validation/module_schema.yaml) (templated parameter code is not supported).

The YAML allows you to define instance numbers in parameter names, descriptions, etc. using `${i}`. For example, below will generate MY_PARAM_1_RATE, MY_PARAM_2_RATE etc.
```
MY_PARAM_${i}_RATE:
            description:
                short: Maximum rate for instance ${i}
```

The following YAML definitions provide the start and end indexes.
- `num_instances` (default 1): Number of instances to generate (>=1)
- `instance_start` (default 0): First instance number. If 0, `${i}` expands to [0, N-1]`.

For a full example see the MAVLink parameter definitions: [/src/modules/mavlink/module.yaml](https://github.com/PX4/PX4-Autopilot/blob/master/src/modules/mavlink/module.yaml)

## 更多信息

- [查找/修改参数](../advanced_config/parameters.md)
- [参数对照表](../advanced_config/parameter_reference.md)
