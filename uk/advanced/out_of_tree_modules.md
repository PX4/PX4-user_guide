# Зовнішні модулі (Out-of-Tree)

Зовнішні модулі забезпечують зручний механізм для розробників для керування/групування власних модулів, які вони хочуть додати до (або оновити в) прошивки PX4. Зовнішні модулі можуть використовувати ті ж самі включення, що й внутрішні модулі, і можуть взаємодіяти з внутрішніми модулями через uORB.

У цій темі пояснюється, як додати зовнішній модуль ("out of tree") до збірки PX4.

:::tip
Ми закликаємо вас внести ваші зміни до PX4, де можливо!
:::

## Використання

Щоб створити зовнішній модуль:

- Створіть папку _зовнішнього каталогу_, щоб згрупувати зовнішні модулі:
  - Його можна знайти будь-де за межами дерева **PX4-Autopilot**.
  - Він повинен мати таку ж структуру, як **PX4-Autopilot** (тобто він повинен містити каталог з назвою **src**).
  - Пізніше ми звернемося до цього каталогу за допомогою `EXTERNAL_MODULES_LOCATION`.
- Copy an existing module (e.g. **examples/px4_simple_app**) to the external directory, or directly create a new module.
- Перейменуйте модуль (включаючи `MODULE` у **CMakeLists.txt**) або видаліть його з існуючої конфігурації збірки _cmake_ PX4-Autopilot. Це щоб уникнути конфліктів з внутрішніми модулями.
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

## Out-of-Tree uORB Message Definitions

uORB messages can also be defined out-of-tree. Для цього має існувати папка `$EXTERNAL_MODULES_LOCATION/msg`.

- Place all new message definitions within the `$EXTERNAL_MODULES_LOCATION/msg` directory. Формат цих нових визначень повідомлень поза деревом такий самий, як і для будь-якого іншого [визначення повідомлень uORB](../middleware/uorb.md#adding-a-new-topic).
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

The out-of-tree uORB messages will be generated in the same locations as the normal uORB messages. Заголовки тем uORB генеруються в `<build_dir>/uORB/topics/`, а вихідні файли повідомлень – створено в `<build_dir>/msg/topics_sources/`.

Нові повідомлення uORB можна використовувати як будь-які інші повідомлення uORB, як описано [тут](../middleware/uorb.md#adding-a-new-topic).

:::warning
The out-of-tree uORB message definitions cannot have the same name as any of the normal uORB messages.
:::

## Побудова зовнішніх модулів та повідомлень uORB

Execute `make px4_sitl EXTERNAL_MODULES_LOCATION=<path>`.

Any other build target can be used, but the build directory must not yet exist. Якщо вона вже існує, ви також можете просто встановити змінну _cmake_ у папці збірки.

Для наступних поступових збірок `EXTERNAL_MODULES_LOCATION` не потрібно вказувати.
