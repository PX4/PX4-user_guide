# Шаблон модуля для повноцінних додатків

Програма може бути написана для запуску як *задача* (модуль з власним стеком і пріоритетом процесу) або як *задача робочої черги* (модуль, який виконується у потоці робочої черги, розділяючи стек і пріоритет потоку з іншими завданнями у робочій черзі). У більшості випадків можна використовувати завдання робочої черги, оскільки це мінімізує використання ресурсів.

:::info [Огляд архітектури > середовища виконання](../concept/architecture.md#runtime-environment) надає додаткову інформацію про завдання та завдання робочої черги.
:::

:::info Все, що ви дізнаєтесь з [Перший додаток](../modules/hello_sky.md), є актуальним для написання повноцінної програми.
:::

## Завдання робочої черги

PX4-Autopilot містить шаблон для написання нової програми (модуля), яка запускається як *задача робочої черги*: [src/examples/work_item](https://github.com/PX4/PX4-Autopilot/tree/main/src/examples/work_item).

Програма-задача робочої черги - це така сама програма, як і звичайна (задача), за винятком того, що їй потрібно вказати, що вона є задачею робочої черги, і запланувати свій запуск під час ініціалізації.

Приклад показує, як. У підсумку:
1. Вкажіть залежність від бібліотеки робочих черг у файлі визначення cmake ([CMakeLists.txt](https://github.com/PX4/PX4-Autopilot/blob/release/1.15/src/examples/work_item/CMakeLists.txt)):
   ```
   ...
   DEPENDS
      px4_work_queue
   ```
1. На додаток до `ModuleBase`, завдання також має походити від `ScheduledWorkItem` (включається з [ScheduledWorkItem.hpp](https://github.com/PX4/PX4-Autopilot/blob/release/1.15/platforms/common/include/px4_platform_common/px4_work_queue/ScheduledWorkItem.hpp))
1. Вкажіть чергу, до якої додати завдання у конструкторі ініціалізації. Приклад [work_item](https://github.com/PX4/PX4-Autopilot/blob/release/1.15/src/examples/work_item/WorkItemExample.cpp#L42) додає себе до робочої черги `wq_configurations::test1`, як показано нижче:
   ```cpp
   WorkItemExample::WorkItemExample() :
       ModuleParams(nullptr),
       ScheduledWorkItem(MODULE_NAME, px4::wq_configurations::test1)
   {
   }
   ```

   :::info Доступні робочі черги (`wq_configurations`) перелічено у [WorkQueueManager.hpp](https://github.com/PX4/PX4-Autopilot/blob/release/1.15/platforms/common/include/px4_platform_common/px4_work_queue/WorkQueueManager.hpp#L49).
:::

1. Реалізуйте метод `ScheduledWorkItem::Run()`, щоб виконати "work".
1. Реалізувати метод `task_spawn`, який вказує, що задача є робочою чергою (використовуючи id `task_id_is_work_queue`.
1. Заплануйте завдання робочої черги за допомогою одного з методів планування (у прикладі ми використовуємо `ScheduleOnInterval` з методу `init`).



## Задачі

PX4/PX4-Autopilot містить шаблон для написання нового додатку (модуля), який запускається як задача на власному стеку:[src/templates/template_module](https://github.com/PX4/PX4-Autopilot/tree/main/src/templates/template_module).

Шаблон демонструє наступні додаткові функції/аспекти, які є необхідними або корисними для повноцінної роботи програми:

- Доступ до параметрів та реагування на оновлення параметрів.
- підписки на uORB та очікування оновлень теми.
- Керування завданням, яке виконується в фоновому режимі через `start`/`stop`/`status`. Команда `module start [<arguments>]` може бути безпосередньо додана до команди [startup script](../concept/system_startup.md).
- Парсинг аргументів командного рядка.
- Документація: методи `PRINT_MODULE_*` служать для двох цілей (API задокументовано [у вихідному коді](https://github.com/PX4/PX4-Autopilot/blob/v1.8.0/src/platforms/px4_module.h#L381)):
  - Вони використовуються для виведення інформації про використання командного рядка при введенні `module help` на консолі.
  - Вони автоматично витягуються скриптом для створення сторінки [Modules & Commands Reference](../modules/modules_main.md).

