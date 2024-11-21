# Зовнішні модулі (Out-of-Tree)

Зовнішні модулі забезпечують зручний механізм для розробників для керування/групування власних модулів, які вони хочуть додати до (або оновити в) прошивки PX4.Зовнішні модулі можуть використовувати ті ж самі включення, що й внутрішні модулі, і можуть взаємодіяти з внутрішніми модулями через uORB.

У цій темі пояснюється, як додати зовнішній модуль ("out of tree") до збірки PX4.

:::tip
We encourage you to contribute your changes into PX4, where possible!
:::

## Використання

Щоб створити зовнішній модуль:

- Create an _external directory_ folder for grouping the external modules:
  - This can be located anywhere outside of the **PX4-Autopilot** tree.
  - It must have the same structure as **PX4-Autopilot** (i.e. it must contain a directory called **src**).
  - Later we refer to this directory using `EXTERNAL_MODULES_LOCATION`.

- Copy an existing module (e.g. **examples/px4_simple_app**) to the external directory, or directly create a new module.

- Rename the module (including `MODULE` in **CMakeLists.txt**) or remove it from the existing PX4-Autopilot _cmake_ build config.
  Це щоб уникнути конфліктів з внутрішніми модулями.

- Add a file **CMakeLists.txt** in the external directory with content:

  ```cmake
  set(config_module_list_external
      modules/<new_module>
      PARENT_SCOPE
      )
  ```

- Add a line `EXTERNAL` to the `modules/<new_module>/CMakeLists.txt` within
  `px4_add_module()`, for example like this:

  ```cmake
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

## Визначення повідомлень поза деревами uORB

Повідомлення uORB також можна визначати поза деревом. For this, the `$EXTERNAL_MODULES_LOCATION/msg` folder must exist.

- Place all new message definitions within the `$EXTERNAL_MODULES_LOCATION/msg` directory.
  The format of these new out-of-tree message definitions are the same as for any other [uORB message definition](../middleware/uorb.md#adding-a-new-topic).
- Add a file `$EXTERNAL_MODULES_LOCATION/msg/CMakeLists.txt` with content:

  ```cmake
  set(config_msg_list_external
      <message1>.msg
      <message2>.msg
      <message3>.msg
      PARENT_SCOPE
      )
  ```

  where `<message#>.msg` is the name of the uORB message definition file to be processed and used for uORB message generation.

Поза деревом повідомлень uORB будуть створені в тих же місцях, що й звичайні повідомлення uORB.
The uORB topic headers are generated in `<build_dir>/uORB/topics/`, and the message source files are
generated in `<build_dir>/msg/topics_sources/`.

The new uORB messages can be used like any other uORB message as described [here](../middleware/uorb.md#adding-a-new-topic).

:::warning
The out-of-tree uORB message definitions cannot have the same name as any of the normal uORB messages.
:::

## Побудова зовнішніх модулів та повідомлень uORB

Execute `make px4_sitl EXTERNAL_MODULES_LOCATION=<path>`.

Будь-яку іншу ціль збірки можна використовувати, але каталог для збирання не повинен існувати.
If it already exists, you can also just set the _cmake_ variable in the build folder.

For subsequent incremental builds `EXTERNAL_MODULES_LOCATION` does not need to be specified.
