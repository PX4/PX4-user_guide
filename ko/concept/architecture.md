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
런타임시 쉘에서 `top` 명령으로 실행되는 모듈을 검사할 수 있으며, 각 모듈은 `<module_name> 시작/중지`를 통하여 시작/중지할 수 있습니다. `top` 명령은 NuttX 셸에만 해당되지만, 다른 명령은 SITL 셸(pxh>)에서도 사용할 수 있습니다. 각 모듈에 대한 자세한 내용은 [모듈 & 명령](../modules/modules_main.md)을 참고하십시오.
:::

화살표는 모듈 간의 *가장 중요한* 연결 정보를 나타냅니다. 표시된 것보다 더 많은 연결이 있으며, 일부 데이터(예: 매개변수)는 대부분의 모듈에서 액세스합니다.

모듈은 [uORB](../middleware/uorb.md)라는 게시-구독 메시지 버스로 서로 통신합니다. 발행-구독 체계의 사용은 다음을 의미합니다.

- 시스템은 반응형입니다. 비동기식이며, 새 데이터를 사용할 수 있을 때 즉시 업데이트합니다.
- 모든 작업과 통신은 완전히 병렬화됩니다.
- 시스템 구성 요소는 스레드로부터 안전하며, 어디서나 데이터를 사용할 수 있습니다.

:::note
이 아키텍처를 사용하여, 런타임 시에도 이러한 블록을 모두 빠르고 쉽게 교체할 수 있습니다. It contains the full pipeline from sensors, RC input and autonomous flight control (Navigator), down to the motor or servo control (Actuators).


### 비행 스택

비행 스택은 자율 드론을 위한 안내, 탐색 및 제어 알고리즘의 모음입니다. 여기에는 고정익, 멀티콥터 및 VTOL 콘트롤러와 자세 및 위치 추정기가 포함됩니다.

다음 다이어그램은 비행 스택의 빌딩 블록에 대한 개요를 나타냅니다. 여기에는 센서, RC 입력 및 자율 비행 제어(내비게이터)에서 모터 또는 서보 제어(액추에이터)에 이르는 전체 파이프라인이 포함됩니다.

![PX4 High-Level Flight Stack](../../assets/diagrams/PX4_High-Level_Flight-Stack.svg) <!-- This diagram can be updated from 
[here](https://drive.google.com/a/px4.io/file/d/15J0eCL77fHbItA249epT3i2iOx4VwJGI/view?usp=sharing) 
and opened with draw.io Diagrams. You might need to request access if you
don't have a px4.io Google account.
Caution: it can happen that after exporting some of the arrows are wrong. In
that case zoom into the graph until the arrows are correct, and then export
again. -->

**추정기**는 하나 이상의 센서 입력을 받아 결합하고, 차량 상태(예: IMU 센서 데이터의 자세)를 계산합니다.

**콘트롤러**는 설정값과 측정값 또는 추정된 상태(프로세스 변수)를 입력으로 사용합니다. Its goal is to adjust the value of the process variable such that it matches the setpoint. The output is a correction to eventually reach that setpoint. For example the position controller takes position setpoints as inputs, the process variable is the currently estimated position, and the output is an attitude and thrust setpoint that move the vehicle towards the desired position.

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
