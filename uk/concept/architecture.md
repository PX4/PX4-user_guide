# Огляд архітектури PX4

PX4 consists of two main layers: the [flight stack](#flight-stack) is an estimation and flight control system,
and the [middleware](#middleware) is a general robotics layer that can support any type of autonomous robot, providing internal/external communications and hardware integration.

All PX4 [airframes](../airframes/index.md) share a single codebase (this includes other robotic systems like boats, rovers, submarines etc.). The complete system design is [reactive](http://www.reactivemanifesto.org), which means that:

- Весь функціонал розділений на взаємозамінні та придатні для повторного використання компоненти
- Зв'язок зроблено через асинхронне передавання повідомлень
- Система може дати раду різним робочим навантаженням

<a id="architecture"></a>

## Високорівнева архітектура ПЗ

На діаграмі нижче показано детальний огляд будівельних блоків PX4.
Верхня частина діаграми містить блоки проміжного ПЗ, тоді як нижня частина - компоненти набору польотного ПЗ.

![PX4 Architecture](../../assets/diagrams/PX4_Architecture.svg)

<!-- This diagram can be updated from
[here](https://drive.google.com/file/d/0B1TDW9ajamYkaGx3R0xGb1NaeU0/view?usp=sharing)
and opened with draw.io Diagrams. You might need to request access if you
don't have a px4.io Google account.
Caution: it can happen that after exporting some of the arrows are wrong. In
that case zoom into the graph until the arrows are correct, and then export
again. -->

The source code is split into self-contained modules/programs (shown in `monospace` in the diagram).
Зазвичай один блок відповідає одному модулю.

:::tip
At runtime, you can inspect which modules are executed with the `top` command in shell, and each module can be started/stopped individually via `<module_name> start/stop`.
While `top` command is specific to NuttX shell, the other commands can be used in the SITL shell (pxh>) as well.
For more information about each of these modules see the [Modules & Commands Reference](../modules/modules_main.md).
:::

The arrows show the information flow for the _most important_ connections between the modules.
В реальності зв'язків набагато більше ніж показано, а деякі дані (наприклад параметри) отримуються більшістю модулів.

Modules communicate with each other through a publish-subscribe message bus named [uORB](../middleware/uorb.md).
Використання схеми публікації/підписки означає, що:

- Система реакційна — тобто є асинхронною та миттєво оновиться при наявності нових даних
- Всі операції та комунікації повністю розпаралелено
- Системний компонент може споживати дані звідки завгодно у спосіб безпечний для потоків

:::info
This architecture allows every single one of these blocks to be rapidly and easily replaced, even at runtime.
:::

### Набір польотного ПЗ

Набір польотного ПЗ є колекцією алгоритмів керування, навігації та спрямування для автономних дронів.
Він включає контролери для планерів з фіксованим крилом, мультироторів та ВЗІП, а також спостерігача орієнтації та позиції.

У наступній діаграмі показано огляд будівельних блоків набору ПЗ для польоту.
Він містить повний конвеєр від датчиків, вхідних даних РК та контролера автономного польоту (Navigator), до двигуна або управління сервоприводами (Actuators).

![PX4 High-Level Flight Stack](../../assets/diagrams/PX4_High-Level_Flight-Stack.svg)

<!-- This diagram can be updated from
[here](https://drive.google.com/a/px4.io/file/d/15J0eCL77fHbItA249epT3i2iOx4VwJGI/view?usp=sharing)
and opened with draw.io Diagrams. You might need to request access if you
don't have a px4.io Google account.
Caution: it can happen that after exporting some of the arrows are wrong. In
that case zoom into the graph until the arrows are correct, and then export
again. -->

An **estimator** takes one or more sensor inputs, combines them, and computes a vehicle state (for example the attitude from IMU sensor data).

A **controller** is a component that takes a setpoint and a measurement or estimated state (process variable) as input.
Його мета - скорегувати значення змінної процесу, таким чином, щоб вона відповідала заданому значенню.
Вихідні дані - це корекційні значення, щоб врешті-решт досягти заданих.
Наприклад, контролер позиції приймає задані значення позиції на вході, змінна процесу є значенням позиції що оцінюється, а вихід - це орієнтація та задане значення газу, що рухає засіб до потрібної позиції.

A **mixer** takes force commands (such as "turn right") and translates them into individual motor commands, while ensuring that some limits are not exceeded.
Цей переклад є специфічним для типу засобу і залежить від різних факторів такі як розташування двигунів відносно центру мас або інерція обертання засобу.

<a id="middleware"></a>

### Проміжне програмне забезпечення

The [middleware](../middleware/index.md) consists primarily of device drivers for embedded sensors, communication with the external world (companion computer, GCS, etc.) and the uORB publish-subscribe message bus.

In addition, the middleware includes a [simulation layer](../simulation/index.md) that allows PX4 flight code to run on a desktop operating system and control a computer modeled vehicle in a simulated "world".

## Темпи оновлення даних

Оскільки модулі очікують оновлень повідомлень, зазвичай драйвери визначають як швидко оновлюється стан модуля.
Більшість драйверів ІВП роблять вибірку даних на частоті 1 кГц, інтегрують їх і публікують з частотою 250 Гц.
Other parts of the system, such as the `navigator`, don't need such a high update rate, and thus run considerably slower.

The message update rates can be [inspected](../middleware/uorb.md) in real-time on the system by running `uorb top`.

<a id="runtime-environment"></a>

## Середовище виконання

PX4 запускається на різних операційних системах які надають POSIX-API (наприклад, Linux, macOS, NuttX або QuRT).
Вони також повинні мати якусь форму планування завдань в реальному часі (наприклад FIFO).

The inter-module communication (using [uORB](../middleware/uorb.md)) is based on shared memory.
Усе проміжне ПЗ PX4 виконується в єдиному адресному просторі, тобто пам'ять розділена між усіма модулями.

:::info
The system is designed such that with minimal effort it would be possible to run each module in separate address space (parts that would need to be changed include `uORB`, `parameter interface`, `dataman` and `perf`).
:::

Існує 2 різні способи запуску модуля:

- **Tasks**: The module runs in its own task with its own stack and process priority.
- **Work queue tasks**: The module runs on a shared work queue, sharing the same stack and work queue thread priority as other modules on the queue.

  - Усі завдання повинні поводитися скооперовано, оскільки вони не можуть переривати одне одного.
  - Multiple _work queue tasks_ can run on a queue, and there can be multiple queues.
  - A _work queue task_ is scheduled by specifying a fixed time in the future, or via uORB topic update callback.

  Перевага запуску модулів у робочій черзі полягає в тому, що це використовує менше ОЗП, і потенційно призводить до меншої кількості перемикань завдань.
  The disadvantages are that _work queue tasks_ are not allowed to sleep or poll on a message, or do blocking IO (such as reading from a file).
  Довгострокові завдання (що виконують важкі обчислення) повинні потенційно також запускатися в окремому завданні або принаймні в окремій робочий черзі.

:::info
Tasks running on a work queue do not show up in [`top`](../modules/modules_command.md#top) (only the work queues themselves can be seen - e.g. as `wq:lp_default`).
Use [`work_queue status`](../modules/modules_system.md#work-queue) to display all active work queue items.
:::

### Фонові завдання

`px4_task_spawn_cmd()` is used to launch new tasks (NuttX) or threads (POSIX - Linux/macOS) that run independently from the calling (parent) task:

```cpp
independent_task = px4_task_spawn_cmd(
    "commander",                    // Process name
    SCHED_DEFAULT,                  // Scheduling type (RR or FIFO)
    SCHED_PRIORITY_DEFAULT + 40,    // Scheduling priority
    3600,                           // Stack size of the new task or thread
    commander_thread_main,          // Task (or thread) main function
    (char * const *)&argv[0]        // Void pointer to pass to the new task
                                    // (here the commandline arguments).
    );
```

### Інформація для певної ОС

#### NuttX

[NuttX](https://nuttx.apache.org//) is the primary RTOS for running PX4 on a flight-control board.
Вона має відкритий вихідний код (під BSD ліцензією), легка, ефективна і дуже стабільна.

Модулі виконуються як завдання: вони мають свої списки дескрипторів файлів, але мають єдиний адресний простір.
Завдання все ще може запустити один або кілька потоків, які розділяють той самий список дескрипторів файлів.

Кожне завдання/поток має стек фіксованого розміру, є періодичне завдання, яке перевіряє, що в всіх стеках залишилося достатньо вільного місця (засновано на розфарбовуванні стеку).

#### Linux/macOS

На Linux або macOS, PX4 виконується в одному процесі, а модулі запускаються у своїх потоках (бо немає різниці між завданнями та потоками як на NuttX).
