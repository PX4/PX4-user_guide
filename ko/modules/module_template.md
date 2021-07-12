# 전체 애플리케이션을 위한 모듈 템플릿

애플리케이션은 *작업*(자체 스택 및 프로세스 우선순위가 있는 모듈) 또는 *작업 대기열 작업*(작업에서 실행되는 모듈, 대기열 스레드, 작업 대기열의 다른 작업과 스택 및 스레드 우선순위 공유)으로 실행되도록 작성할 수 있습니다. 대부분은, 리소스 최소화를 위하여 작업 대기열을 사용합니다.

:::note
[구조 개요 > 런타임 환경](../concept/architecture.md#runtime-environment)은 작업 및 작업 대기열 작업에 대한 자세한 정보를 제공합니다.
:::

:::note
[첫 번째 응용 프로그램 자습서](../modules/hello_sky.md)에서 배운 내용은 전체 응용 프로그램 작성과 관련이 있습니다.
:::

## 작업 대기열 작업

PX4-Autopilot에는 *작업 대기열 작업*으로 실행되는 애플리케이션(모듈)을 작성하기 위한 템플릿이 포함되어 있습니다. [src/examples/work_item](https://github.com/PX4/PX4-Autopilot/tree/master/src/examples/work_item).

작업 대기열 작업 응용 프로그램은 작업 대기열 작업임을 지정하고 초기화중에 실행되도록 예약해야 한다는 점을 제외하고 일반(작업) 응용 프로그램과 동일합니다.

예제는 방법을 설명합니다. 요약:
1. cmake 정의 파일([CMakeLists.txt](https://github.com/PX4/PX4-Autopilot/blob/master/src/examples/work_item/CMakeLists.txt))에서 작업 대기열 라이브러리에 대한 종속성을 지정합니다.
   ```
   ...
   DEPENDS
      px4_work_queue
   ```
1. `ModuleBase` 외에도 작업은 `ScheduledWorkItem`([ScheduledWorkItem.hpp](https://github.com/PX4/PX4-Autopilot/blob/master/platforms/common/include/px4_platform_common/px4_work_queue/ScheduledWorkItem.hpp)에 포함)에서 파생되어야 합니다.
1. 생성자 초기화에서 작업을 추가할 대기열을 지정합니다. [work_item](https://github.com/PX4/PX4-Autopilot/blob/master/src/examples/work_item/WorkItemExample.cpp#L42) 예제는 아래와 같이 `wq_configurations::test1` 작업 대기열에 추가됩니다.
   ```cpp
   WorkItemExample::WorkItemExample() :
       ModuleParams(nullptr),
       ScheduledWorkItem(MODULE_NAME, px4::wq_configurations::test1)
   {
   }
   ```

:::note
사용 가능한 작업 대기열(`wq_configurations`)은 [WorkQueueManager.hpp](https://github.com/PX4/PX4-Autopilot/blob/master/platforms/common/include/px4_platform_common/px4_work_queue/WorkQueueManager.hpp#L49)에 나열됩니다.
:::

1. `ScheduledWorkItem::Run()` 메서드를 구현하여 "작업"을 수행합니다.
1. `task_spawn` 메서드를 구현하여 작업이 작업 대기열임을 지정합니다(`task_id_is_work_queue` ID 사용).
1. 예약 방법 중 하나를 사용하여 작업 대기열 작업을 예약합니다(예제에서는 `init` 방법 내에서 `ScheduleOnInterval` 사용).



## 작업

PX4/PX4-Autopilot에는 자체 스택에서 작업으로 실행되는 애플리케이션(모듈)을 작성하기 위한 템플릿이 포함되어 있습니다. [src/templates/template_module](https://github.com/PX4/PX4-Autopilot/tree/master/src/templates/template_module).

The template demonstrates the following additional features/aspects that are required or are useful for a full application:

- Accessing parameters and reacting to parameter updates.
- uORB subscriptions and waiting for topic updates.
- Controlling the task that runs in the background via `start`/`stop`/`status`. The `module start [<arguments>]` command can then be directly added to the [startup script](../concept/system_startup.md).
- Command-line argument parsing.
- Documentation: the `PRINT_MODULE_*` methods serve two purposes (the API is documented [in the source code](https://github.com/PX4/Firmware/blob/v1.8.0/src/platforms/px4_module.h#L381)):
  - They are used to print the command-line usage when entering `module help` on the console.
  - They are automatically extracted via script to generate the [Modules & Commands Reference](../modules/modules_main.md) page.

