# PX4 아키텍처 개요

PX4는 두 가지 주요 레이어로 구성됩니다. [비행 스택](#flight-stack)은 추정 및 비행제어시스템이며, [미들웨어](#middleware)는 자율 로봇을 지원할 수 있는 일반 로봇 계층으로 내외부 통신 및 하드웨어 통합을 제공합니다.

모든 PX4 [기체](../airframes/README.md)는 단일 코드베이스를 공유합니다(여기에는 보트, 로버, 잠수함 등과 같은 다른 로봇 시스템이 포함됨). 전체 시스템 디자인은 [반응형](http://www.reactivemanifesto.org)이며 다음과 같습니다.

- 모든 기능은 대체 가능한 구성 요소와 재사용 가능한 구성 요소로 나누어 집니다.
- 통신은 비동기 메시지 전달에 의해 수행됩니다.
- 시스템은 다양한 작업 부하를 처리할 수 있습니다.

<a id="architecture"></a>

## 고급 소프트웨어 아키텍처

아래 다이어그램은 PX4의 빌딩 블록에 대한 개요를 나타냅니다. 다이어그램의 상단에는 미들웨어 블록이 포함되어 있고, 하단에는 플라이트 스택의 구성 요소가 표시되어 있습니다.

![PX4 Architecture](../../assets/diagrams/PX4_Architecture.svg)


<!-- This diagram can be updated from 
[here](https://drive.google.com/file/d/0B1TDW9ajamYkaGx3R0xGb1NaeU0/view?usp=sharing) 
and opened with draw.io Diagrams. You might need to request access if you
don't have a px4.io Google account.
Caution: it can happen that after exporting some of the arrows are wrong. In
that case zoom into the graph until the arrows are correct, and then export
again. -->

소스 코드는 독립적인 모듈/프로그램으로 분할됩니다(다이어그램의 `고정 공간` 참조). 일반적으로 빌딩 블록은 하나의 모듈을 나타냅니다.

:::tip
런타임시 쉘에서 `top` 명령으로 실행되는 모듈을 검사할 수 있으며, 각 모듈은 `<module_name> 시작/중지`를 통하여 시작/중지할 수 있습니다. `top` 명령은 NuttX 셸에만 해당되지만, 다른 명령은 SITL 셸(pxh>)에서도 사용할 수 있습니다. 이러한 각 모듈에 대한 자세한 내용은 [모듈 & 명령](../modules/modules_main.md)을 참고하십시오.
:::

Modules communicate with each other through a publish-subscribe message bus named [uORB](../middleware/uorb.md). In reality, there are many more connections than shown, and some data (e.g. for parameters) is accessed by most of the modules.

The flight stack is a collection of guidance, navigation and control algorithms for autonomous drones. It includes controllers for fixed wing, multirotor and VTOL airframes as well as estimators for attitude and position.

- The system is reactive — it is asynchronous and will update instantly when new data is available
- All operations and communication are fully parallelized
- A system component can consume data from anywhere in a thread-safe fashion

The following diagram shows an overview of the building blocks of the flight stack. It contains the full pipeline from sensors, RC input and autonomous flight control (Navigator), down to the motor or servo control (Actuators).


### Flight Stack

The flight stack is a collection of guidance, navigation and control algorithms for autonomous drones. It includes controllers for fixed wing, multirotor and VTOL airframes as well as estimators for attitude and position.

The following diagram shows an overview of the building blocks of the flight stack. It contains the full pipeline from sensors, RC input and autonomous flight control (Navigator), down to the motor or servo control (Actuators).

![PX4 High-Level Flight Stack](../../assets/diagrams/PX4_High-Level_Flight-Stack.svg) <!-- This diagram can be updated from 
[here](https://drive.google.com/a/px4.io/file/d/15J0eCL77fHbItA249epT3i2iOx4VwJGI/view?usp=sharing) 
and opened with draw.io Diagrams. You might need to request access if you
don't have a px4.io Google account.
Caution: it can happen that after exporting some of the arrows are wrong. In
that case zoom into the graph until the arrows are correct, and then export
again. -->

An **estimator** takes one or more sensor inputs, combines them, and computes a vehicle state (for example the attitude from IMU sensor data).

A **controller** is a component that takes a setpoint and a measurement or estimated state (process variable) as input. Its goal is to adjust the value of the process variable such that it matches the setpoint. The output is a correction to eventually reach that setpoint. For example the position controller takes position setpoints as inputs, the process variable is the currently estimated position, and the output is an attitude and thrust setpoint that move the vehicle towards the desired position.

A **mixer** takes force commands (e.g. turn right) and translates them into individual motor commands, while ensuring that some limits are not exceeded. This translation is specific for a vehicle type and depends on various factors, such as the motor arrangements with respect to the center of gravity, or the vehicle's rotational inertia.

<a id="middleware"></a>

### Middleware

The [middleware](../middleware/README.md) consists primarily of device drivers for embedded sensors, communication with the external world (companion computer, GCS, etc.) and the uORB publish-subscribe message bus.

The message update rates can be [inspected](../middleware/uorb.md#urb-top-command) in real-time on the system by running `uorb top`.


## Update Rates

Since the modules wait for message updates, typically the drivers define how fast a module updates. Most of the IMU drivers sample the data at 1kHz, integrate it and publish with 250Hz. Other parts of the system, such as the `navigator`, don't need such a high update rate, and thus run considerably slower.

The message update rates can be [inspected](../middleware/uorb.md) in real-time on the system by running `uorb top`.

<a id="runtime-environment"></a>

## Runtime Environment

PX4 runs on various operating systems that provide a POSIX-API (such as Linux, macOS, NuttX or QuRT). It should also have some form of real-time scheduling (e.g. FIFO).

The inter-module communication (using [uORB](../middleware/uorb.md)) is based on shared memory. The whole PX4 middleware runs in a single address space, i.e. memory is shared between all modules.

[NuttX](http://nuttx.org/) is the primary RTOS for running PX4 on a flight-control board.
:::

There are 2 different ways that a module can be executed:
- **Tasks**: The module runs in its own task with its own stack and process priority (this is the more common way).
- **Work queues**: The module runs on a shared task, meaning that it does not own a stack. Multiple tasks run on the same stack with a single priority per work queue.
  - All the tasks must behave co-operatively as they cannot interrupt each other.
  - Multiple *work queue tasks* can run on a queue, and there can be multiple queues.
  - A *work queue task* is scheduled by specifying a fixed time in the future, or via uORB topic update callback.

  The advantage is that it uses less RAM, but the task is not allowed to sleep or poll on a message. The disadvantages are that *work queue tasks* are not allowed to sleep or poll on a message, or do blocking IO (such as reading from a file). Long-running tasks (doing heavy computation) should potentially also run in a separate task or at least a separate work queue.

:::note
Tasks running on a work queue do not show up in [`uorb top`](../modules/modules_communication.md#uorb) (only the work queues themselves can be seen - e.g. as `wq:lp_default`). Use [`work_queue status`](../modules/modules_system.md#work-queue) to display all active work queue items.
:::

### Background Tasks

On Linux or macOS, PX4 runs in a single process, and the modules run in their own threads (there is no distinction between tasks and threads as on NuttX).

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


### OS-Specific Information

#### NuttX

[NuttX](https://nuttx.apache.org//) is the primary RTOS for running PX4 on a flight-control board. It is open source (BSD license), light-weight, efficient and very stable.

Modules are executed as tasks: they have their own file descriptor lists, but they share a single address space. A task can still start one or more threads that share the file descriptor list.

Each task/thread has a fixed-size stack, and there is a periodic task which checks that all stacks have enough free space left (based on stack coloring).


#### Linux/macOS

On Linux or macOS, PX4 runs in a single process, and the modules run in their own threads (there is no distinction between tasks and threads as on NuttX).
