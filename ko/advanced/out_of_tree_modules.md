---
canonicalUrl: https://docs.px4.io/main/ko/advanced/out_of_tree_modules
---

# 외부 모듈(별도)

외부 모듈은 개발자가 PX4 펌웨어에 추가(또는 업데이트)하려는 독점 모듈을 관리/그룹화할 수 있는 편리한 메커니즘을 제공합니다. 외부 모듈은 내부 모듈과 같이 사용할 수 있으며, uORB로 내부 모듈과 상호 작용할 수 있습니다.

PX4 빌드에 외부("out of tree") 모듈을 추가하는 방법을 설명합니다.

:::tip
가능하면, 변경 사항을 PX4에 제공할 것을 권장합니다!
:::

## 사용법

외부 모듈을 만들려면:

- Create an _external directory_ folder for grouping the external modules:
  - 이것은 **PX4-Autopilot** 트리 외부 위치에 있을 수 있습니다.
  - **PX4-Autopilot**과 구조가 동일하여야 합니다(즉, **src**라는 디렉토리를 포함하여야 함).
  - 나중에 `EXTERNAL_MODULES_LOCATION`을 사용하여 이 디렉토리를 참조합니다.
- 기존 모듈(예: **examples/px4_simple_app**)을 외부 디렉토리에 복사하거나 새 모듈을 직접 만듭니다.
- Rename the module (including `MODULE` in **CMakeLists.txt**) or remove it from the existing PX4-Autopilot _cmake_ build config. 이것은 내부 모듈과의 충돌을 피하기 위한 것입니다.
- 콘텐츠가 있는 외부 디렉터리에 **CMakeLists.txt** 파일을 추가합니다.
  ```
  set(config_module_list_external
      modules/<new_module>
      PARENT_SCOPE
      )
  ```
- 내부의 `modules/<new_module>/CMakeLists.txt`에 `EXTERNAL` 줄을 추가합니다. 예를 들면, `px4_add_module()`와 같습니다.

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

## 별도 uORB 메시지 정의

uORB 메시지는 트리 외부에서 정의할 수 있습니다. 이를 위해서는 `$EXTERNAL_MODULES_LOCATION/msg` 폴더가 있어야 합니다.

- 새 메시지 정의를 `$EXTERNAL_MODULES_LOCATION/msg` 디렉토리에 배치합니다. 이러한 새로운 트리 외부 메시지 정의의 형식은 다른 모든 [uORB 메시지 정의](../middleware/uorb.md#adding-a-new-topic)와 동일합니다.
- 콘텐츠가 포함된 `$EXTERNAL_MODULES_LOCATION/msg/CMakeLists.txt` 파일을 추가합니다.

  ```
  set(config_msg_list_external
      <message1>.msg
      <message2>.msg
      <message3>.msg
      PARENT_SCOPE
      )
  ```

  여기서 `<message#>.msg`는 처리되고 uORB 메시지 생성에 사용되는 uORB 메시지 정의 파일의 이름입니다.

외부 uORB 메시지는 일반 uORB 메시지와 동일한 위치에 생성됩니다. uORB 주제 헤더는 `<build_dir>/uORB/topics/`에 생성되며, 메시지 소스 파일은 `<build_dir>/msg/topics_sources/`에서 생성됩니다.

새 uORB 메시지는 [여기](../middleware/uorb.md#adding-a-new-topic)에 설명된 대로, 다른 uORB 메시지처럼 사용할 수 있습니다.

:::warning
외부 uORB 메시지 정의는 일반 uORB 메시지와 같은 이름을 가질 수 없습니다.
:::

## 외부 모듈 및 uORB 메시지 빌드

`make px4_sitl EXTERNAL_MODULES_LOCATION=<path>`을 실행합니다.

다른 빌드 대상을 사용할 수 있지만, 빌드 디렉토리가 아직 존재하지 않아야 합니다. If it already exists, you can also just set the _cmake_ variable in the build folder.

차후 추가 빌드 과정에서는 `EXTERNAL_MODULES_LOCATION` 값을 지정할 필요가 없습니다.
