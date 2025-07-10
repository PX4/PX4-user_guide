---
canonicalUrl: https://docs.px4.io/main/zh/advanced/out_of_tree_modules
---

# 外部模块（Out-of-Tree）

外部模块为开发人员提供了一种便捷的机制，可以管理/分组他们想要添加（或更新）PX4 固件的专有模块。 外部模块可以使用与内部模块相同的includes，并可以通过uORB与内部模块交互。

本主题说明如何将外部（“out of tree”）模块添加到 PX4 编译中。

:::tip
我们鼓励您在可能的情况下将您的更改贡献到 PX4 !
:::

## 用法

要创建外部模块：

- 创建*外部目录*目录以对外部模块进行分组：
  - 这个可以放在**PX4-Autopilot**目录树以外的任何地方。
  - 它必须具有与**PX4-Autopilot**相同的目录结构（即必须包含**src**目录）。
  - 稍后我们使用` EXTERNAL_MODULES_LOCATION `来引用此目录。
- 将现有模块（例如**examples/px4_simple_app**）复制到外部目录，或直接创建新模块。
- 重命名模块（包括在**CMakeLists.txt**中的`MODULE`），或者从 PX4-Autopilot *cmake* 编译配置中移除。 这是为了避免与内部模块发生冲突。
- 在外部目录中添加**CMakeLists.txt**文件，内容为：
  ```
  set(config_module_list_external
      modules/<new_module>
      PARENT_SCOPE
      )
  ```
- 在`px4_add_module()`中添加一行 `EXTERNAL` 到 `modules<new_module>/CMakeLists.txt` 中，例如:

  ```
  px4_add_module(
    MODULE modules__test_app
    MAIN test_app
    STACK_MAIN 2000
    SRCS
        px4_simple_app.c
    DEPENDS
        platforms__common
    EXTERNAL
    )
  ```


## Out-of-Tree uORB 消息定义

树外uORB消息将在与正常uORB消息相同的位置生成。 The out-of-tree uORB messages will be generated in the same locations as the normal uORB messages. The uORB topic headers are generated in `<build_dir>/uORB/topics/`, and the message source files are generated in `<build_dir>/msg/topics_sources/`.

- 将所有新消息定义放在 `$EXTERNAL_MODULES_LOCATION/msg` 目录中。 Place all new message definitions within the `$EXTERNAL_MODULES_LOCATION/msg` directory. The format of these new out-of-tree message definitions are the same as for any other [uORB message definition](../middleware/uorb.md#adding-a-new-topic).
- 将以下内容添加文件`$EXTERNAL_MODULES_LOCATION/msg/CMakeLists.txt`：

  ```
  set(config_msg_list_external
      <message1>.msg
      <message2>.msg
      <message3>.msg
      PARENT_SCOPE
      )
  ```
  其中`<message#>.msg `是要处理并用于生成 uORB 消息的 uORB 消息定义文件的名称。

树外 uORB 消息将在与正常 uORB 消息相同的位置生成。 uORB主题标题在 `<build_dir>/uORB/topics/`中生成， 消息源文件由 生成于 `<build_dir>/msg/topics_sources/`。

新的 uORB 消息可以像任何其他 uORB 消息一样使用，如[这里](../middleware/uorb.md#adding-a-new-topic)所述。

:::warning
树外的 uORB 消息定义不能和普通的 uORB 消息名字一样。 Any other build target can be used, but the build directory must not yet exist. If it already exists, you can also just set the *cmake* variable in the build folder.


## 构建外部模块和 uORB 消息

执行 `make px4_sitl EXTERNAL_MODULES_LOCATION=<path>`。

任何其他构建目标都可以使用，但构建目录尚不存在。 如果它已经存在，您还可以在构建文件夹中设置*cmake*变量。

对于随后的递增版本 `EXTERNAL_MODULES_LOCATION` 无需指定。
