# 参数设置

PX4 使用 _param subsystem_（`float` 和 `int32_t` 值的二维表）和文本文件（用于启动脚本）来存储其配置。

本节详细讨论 _param_ 子系统。 它涵盖如何列出、保存和加载参数，以及如何定义这些参数并使这些参数在地面站上显示。

:::tip
[系统启动](../concept/system_startup.md) 以及 [机架配置](../dev_airframes/adding_a_new_frame.md) 的启动脚本在其他页面上有详细介绍。
:::

## 命令行使用方法

PX4 [系统控制台](../debug/system_console.md)提供了[参数](../modules/modules_command.md#param)工具，可用于设置参数，读取参数值，保存参数，以及导出和还原参数。

### 获取和设置参数

`param show` 命令列出所有系统参数：

```sh
param show
```

为了更有选择性，部分参数名称可以使用通配符 "\*" ：

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

你可以保存任何已经_修改_的参数(不同于机身默认的参数)。

标准的 `param save` 命令将参数存储在当前默认文件中:

```sh
param save
```

如果提供了参数，它会将参数存储到这个新位置:

```sh
param save /fs/microsd/vtol_param_backup
```

有两个不同的命令来_加载_参数:

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

## 参数创建/定义

参数定义有两部分:

- [参数元数据](#parameter-metadata)指定固件中每个参数的默认值，以及用于在地面控制站和文档中呈现（和编辑）参数的其他元数据。
- [C/C++ 代码](#c-c-api) 能够从 PX4 模块和驱动器中获取或订阅参数值。

以下描述了编写元数据和代码的几种方法。 在可能的情况下，代码应该使用更新的[YAML 元数据](#yaml-metadata)和[C++ API](#c-api)，而不是使用旧的 C 参数/代码定义，因为这些方法更灵活和健壮。

参数元数据[被编译到固件中](#publishing-parameter-metadata-to-a-gcs)，并通过[ MAVLink 组件信息服务](https://mavlink.io/en/services/component_information.html)提供给地面站。

### 参数名称

参数名称不得超过 16 个 ASCII 字符。

按照惯例，组中的每个参数都应共享相同的 (有意义的) 字符串前缀，后跟下划线，`MC_` 和 `FW_` 用于与多旋翼或固定翼系统具体相关的参数。 此惯例不强制执行。

名称必须匹配代码和 [参数元数据](#parameter-metadata) 以正确地将参数与其元数据关联 (包括固件中的默认值)。

### C / C++ API

有单独的 C 和 C++ 的 API 可用于从 PX4 模块和驱动程序中访问参数值。

API 之间的一个重要区别是，C++ 版本具有更有效的标准化机制，可与参数值的更改（即来自 GCS 的更改）同步。

同步很重要，因为参数可能随时被更改为另一个值。 您的代码应该 _始终_ 使用参数存储中的当前值。 如果无法获取最新版本，则需要在更改参数后重新启动（使用 `@reboot_required` 元数据来重启）。

此外，C++ 版本有更好的类型安全和更小的 RAM 开销。 缺点是参数名称必须在编译时知道，而 C 语言 API 可以将动态创建的名称作为字符串。

#### C++ API

C++ API 提供宏来将参数声明为 _class attributes_。 您可以添加一些 "常见模板" 代码，以定期监听与 _任何_ 参数更新相关的 [uORB Topic](../middleware/uorb.md) 。 框架代码然后 (在不可见的情况下) 处理追踪影响 uORB 消息，并保持参数属性和 uORB 消息同步。 在代码的其余部分中，您只能使用定义的参数属性，它们将始终是最新的！

首先在您的模块或驱动程序的类头文件中包含所需的头文件:

- **px4_platform_common/module_params.h** 获取 `DEFINE_PARAMETERS` 宏：

  ```cpp
  #include <px4_platform_common/module_params.h>
  ```

- **参数_update.h** 访问 uORB `parameter_update` 消息：

  ```cpp
  #include <uORB/topics/parameter_update.h>
  ```

- **Subscription.hpp** 是 C++  版本的 uORB 订阅 API:

  ```cpp
  #include <uORB/Subscription.hpp>
  ```

从 `ModuleParams`派生类，并使用 `DEFINE_PARAMETERS` 指定参数列表及其相关的参数属性。 参数的名称必须与其参数元数据定义相同。

```cpp
class MyModule : ..., public ModuleParams
{
public:
    ...

private:

    /**
     * 如果由必要，检查参数更改并更新它们。
     */
    void parameters_update();

    DEFINE_PARAMETERS(
        (ParamInt<px4::params::SYS_AUTOSTART>) _sys_autostart,   /**< example parameter */
        (ParamFloat<px4::params::ATT_BIAS_MAX>) _att_bias_max  /**< another parameter */
    )

    // 订阅
    uORB::SubscriptionInterval _parameter_update_sub{ORB_ID(parameter_update), 1_s};

};
```

使用模板更新 CPP 文件，以检查与参数更新相关的 uORB 消息。

代码中调用 `parameters_update(); ` 定期检查是否有更新:

```cpp
void Module::parameters_update()
{
    if (_parameter_update_sub.updated()) {
        parameter_update_s param_update;
        _parameter_update_sub.copy(&param_update);

        //如果有任何参数更新, 调用 updateParams() 来检查
        // 该类属性是否需要更新 (然后执行更新)。
        updateParams();
    }
}
```

在上述方法中：

- `_parameter_update_sub.updated()` 告诉我们是否有 _任何_ 更新 `param_update` 的 uORB 消息 (但不是受影响的参数)。
- 如果更新了 "某些" 参数，我们会将更新复制到 `parameter_update_s` (`param_update`), 以清除待处理的更新。
- 然后我们调用 `ModuleParams::updateParams()`。 这个"底层"更新了我们`DEFINE_PARAMETERS`列表中列出的所有参数属性。

然后，参数属性 (`_sys_autostart` 和`_att_bias_max` 在本例中) 可用于表示参数，并随时更新参数值的变化。

:::tip
[Application/Module Template](../modules/module_template.md)使用的是新风格的 C++ API，但是不包括[parameter metadata](#parameter-metadata)。
:::

#### C API

C API 可以在模块和驱动程序中使用。

首先包括参数 API 头文件:

```C
#include <parameters/param.h>
```

然后检索参数并将其分配到一个变量 (这里 `my_param`)，如下文所示 `PARAM_NAME`。 变量 `my_param` 然后可以用于您的模块代码。

```C
int32_t my_param = 0;
param_get(param_find("PARAM_NAME"), &my_param);
```

::: info 如果在参数元数据中声明了 `PARAM_NAME`，则将设置其默认值，上述查找参数的调用应始终成功。 如果要多次读取该参数，可以缓存句柄，并在需要时在 `param_get()` 中使用

`param_find()` 是一个“昂贵”操作，返回一个可以被 `param_get()` 使用的句柄。 如果要多次读取该参数，可以缓存句柄，并在需要时在 `param_get()` 中使用

```cpp
# 获取参数句柄
param_t my_param_handle = PARAM_INVALID;
my_param_handle = param_find("PARAM_NAME");

# 查询我们需要的参数
int32_t my_param = 0;
param_get(my_param_handle, &my_param);
```

### 参数元数据

PX4 使用广泛的参数元数据系统来驱动面向用户的参数表示，并在固件中设置的每个参数的默认值。

:::tip
正确的元数据对于地面站的良好用户体验至关重要。
:::

参数元数据可以储存在源文件目录树的任意位置中，作为 **.c** 或 **.yaml** 参数定义(YAML 定义较新，较灵活)。 通常，它与关联的模块一起存储。

构建系统提取元数据（使用命令`make parameters_metadata`）来构建[parameter reference](../advanced_config/parameter_reference.md)，并且参数信息[供地面站使用](#publishing-parameter-metadata-to-a-gcs)。

:::warning
添加了一个 _新的_ 参数文件后，你应该在产生新参数（被添加的参数文件作为_cmake_配置步骤中的一部分，在清理构建和 cmake 被修改后会被添加）之前调用`make clean`。
:::

#### YAML 元数据

::: info 在写入 YAML 参数定义时，无法在 _libraries_ 中使用。
:::

YAML 元数据是为了完全替换 **.c** 文件定义。 它支持所有相同的元数据，以及多实例定义等新功能。

- YAML 参数元数据结构在此处： [validation/module_schema.yaml](https://github.com/PX4/PX4-Autopilot/blob/main/validation/module_schema.yaml)。
- 正在使用的 YAML 定义示例可以在 MAVLink 参数定义中找到： [/src/modules/mavlink/module.yaml](https://github.com/PX4/PX4-Autopilot/blob/main/src/modules/mavlink/module.yaml)。
- 通过添加到 cmake 构建系统中注册一个 YAML 文件

  ```cmake
  MODULE_CONFIG
    module.yaml
  ```

  到 `CMakeLists.txt` 该模块的 `px4_add_module` 部分。

#### 多实例（模块化）YAML 元数据

[YAML 参数定义](https://github.com/PX4/PX4-Autopilot/blob/main/validation/module_schema.yaml) 支持模块化参数定义(不支持模块化参数代码)。

YAML 允许使用 `${i}` 在参数名，描述等中定义实例数。 例如，下面将生成 MY_PARAM_1_RATE、MY_PARAM_2_RATE 等。

```yaml
MY_PARAM_${i}_RATE:
  description:
    short: Maximum rate for instance ${i}
```

以下 YAML 定义提供起始和结束索引。

- `num_instances` (默认是1): 要生成的实例数 (>=1)
- `instance_start` (默认是 0): 第一个实例编号。 如果是 0， `${i}` 扩展到 [0, N-1]`.

关于完整的示例，请参阅 MAVLink 参数定义： [/src/modules/mavlink/module.yaml](https://github.com/PX4/PX4-Autopilot/blob/main/src/modules/mavlink/module.yaml)

#### c 参数元数据

传统方法是将定义的参数元数据写在一个扩展名为**.c**的文件中（在撰写本文时，这是源代码中最常用的方法）。

参数的元数据部分看起来像下面的例子:

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

末尾的 `PARAM_DEFINE_*` 宏指定参数的类型 (`PARAM_DEFINE_FLOAT` 或 `PARAM_DEFINE_INT32`)、参数的名称 (必须与代码中使用的名称匹配) 以及固件中的默认值。

注释块中的行都是可选的，主要用于控制地面站内的显示和编辑选项。 每一行的注释建议如下(详见 [module_schema.yaml](https://github.com/PX4/PX4-Autopilot/blob/main/validation/module_schema.yaml))。

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

## 发布参数的元数据到地面站

参数元数据 JSON 文件被编译到固件（或托管在互联网上），并通过[ MAVLink 组件元数据服务](https://mavlink.io/en/services/component_information.html)提供给地面站。 这确保了元数据始终与载具上运行的代码保持最新。

此过程与[事件元数据](../concept/events_interface.md#publishing-event-metadata-to-a-gcs)的发布相同。 有关更多信息，请参阅[ PX4 元数据（翻译与发布）](../advanced/px4_metadata.md)

## 更多信息

- [查找/更新参数](../advanced_config/parameters.md)
- [参数参照表](../advanced_config/parameter_reference.md)
- [参数实现](https://github.com/PX4/PX4-Autopilot/blob/main/platforms/common/include/px4_platform_common/param.h#L129) (参数消息用 `.get()`, `.commit()`, 和其他方法)
