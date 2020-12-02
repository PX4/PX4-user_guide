# 外部模块（Out-of-Tree）

External modules provide a convenient mechanism for developers to manage/group proprietary modules that they want add to (or update in) PX4 firmware. External modules can use the same includes as internal modules and can interact with internal modules via uORB. 外部模块可以使用与内部模块相同的includes，并可以通过uORB与内部模块交互。

本主题说明如何将外部（“out of tree”）模块添加到PX4编译中。

:::tip
We encourage you to contribute your changes into PX4, where possible!
:::

## 用法

To create an external module:

- 创建*外部目录*目录以对外部模块进行分组：
  - This can be located anywhere outside of the **Firmware** tree.
  - It must have the same structure as **Firmware** (i.e. it must contain a directory called **src**).
  - 稍后我们使用` EXTERNAL_MODULES_LOCATION `来引用此目录。
- 将现有模块（例如**examples/px4_simple_app**）复制到外部目录，或直接创建新模块。
- Rename the module (including `MODULE` in **CMakeLists.txt**) or remove it from the existing Firmware *cmake* build config. This is to avoid conflicts with internal modules. This is to avoid conflicts with internal modules.
- Add a file **CMakeLists.txt** in the external directory with content: set(config_module_list_external modules/
  ```
  set(config_msg_list_external
    <message1>.msg
    <message2>.msg
    <message3>.msg
    PARENT_SCOPE
    )
  ```
- Add a line `EXTERNAL` to the `modules/<new_module>/CMakeLists.txt` within `px4_add_module()`, for example like this:

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
  其中` &lt;message#&gt;.msg `是要处理并用于生成uORB消息的uORB消息定义文件的名称。

The out-of-tree uORB messages will be generated in the same locations as the normal uORB messages. The uORB topic headers are generated in `<build_dir>/uORB/topics/`, and the message source files are generated in `<build_dir>/msg/topics_sources/`.

执行` make px4_sitl EXTERNAL_MODULES_LOCATION = &lt;path&gt; `。

可以使用任何其他构建目标，但构建目标目录必须不存在。 Any other build target can be used, but the build directory must not yet exist. If it already exists, you can also just set the *cmake* variable in the build folder.


## 构建外部模块和 uORB 消息

对于后续增量构建，不需要指定` EXTERNAL_MODULES_LOCATION `。

Any other build target can be used, but the build directory must not yet exist. If it already exists, you can also just set the *cmake* variable in the build folder.

For subsequent incremental builds `EXTERNAL_MODULES_LOCATION` does not need to be specified.
