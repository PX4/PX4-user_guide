# Зовнішні модулі (Out-of-Tree)

Зовнішні модулі забезпечують зручний механізм для розробників для керування/групування власних модулів, які вони хочуть додати до (або оновити в) прошивки PX4.Зовнішні модулі можуть використовувати ті ж самі включення, що й внутрішні модулі, і можуть взаємодіяти з внутрішніми модулями через uORB.

У цій темі пояснюється, як додати зовнішній модуль ("out of tree") до збірки PX4.

:::tip
Ми закликаємо вас внести ваші зміни до PX4, де це можливо!
:::

## Використання

Щоб створити зовнішній модуль:

- Створіть папку _зовнішнього каталогу_, щоб згрупувати зовнішні модулі:
  - Його можна знайти будь-де за межами дерева **PX4-Autopilot**.
  - Він повинен мати таку ж структуру, як **PX4-Autopilot** (тобто він повинен містити каталог з назвою **src**).
  - Пізніше ми звернемося до цього каталогу за допомогою `EXTERNAL_MODULES_LOCATION`.

- Скопіюйте існуючий модуль (наприклад, **examples/px4_simple_app**) до зовнішнього каталогу або безпосередньо створіть новий модуль.

- Rename the module (including `MODULE` in **CMakeLists.txt**) or remove it from the existing PX4-Autopilot _cmake_ build config.
  Це щоб уникнути конфліктів з внутрішніми модулями.

- Додайте файл **CMakeLists.txt** у зовнішній каталозі з вмістом:

  ```cmake
  set(config_module_list_external
      modules/<new_module>
      PARENT_SCOPE
      )
  ```

- Додайте рядок `EXTERNAL` до `modules/<new_module>/CMakeLists.txt` у `px4_add_module()`, наприклад так:

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
- Додати файл `$EXTERNAL_MODULES_LOCATION/msg/CMakeLists.txt` з змістом:

  ```cmake
  set(config_msg_list_external
      <message1>.msg
      <message2>.msg
      <message3>.msg
      PARENT_SCOPE
      )
  ```

  Нове повідомлення uORB можна використовувати як будь-яке інше повідомлення uORB, як описано `тут`.

Поза деревом повідомлень uORB будуть створені в тих же місцях, що й звичайні повідомлення uORB.
The uORB topic headers are generated in `<build_dir>/uORB/topics/`, and the message source files are
generated in `<build_dir>/msg/topics_sources/`.

Нові повідомлення uORB можна використовувати як будь-які інші повідомлення uORB, як описано [тут](../middleware/uorb.md#adding-a-new-topic).

:::warning
Визначення повідомлень поза деревом uORB не можуть мати ті ж самі назви, що й будь-які звичайні повідомлення uORB.
:::

## Побудова зовнішніх модулів та повідомлень uORB

Виконайте `make px4_sitl EXTERNAL_MODULES_LOCATION=<path>`.

Будь-яку іншу ціль збірки можна використовувати, але каталог для збирання не повинен існувати.
If it already exists, you can also just set the _cmake_ variable in the build folder.

Для наступних поступових збірок `EXTERNAL_MODULES_LOCATION` не потрібно вказувати.
