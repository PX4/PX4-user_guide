---
canonicalUrl: https://docs.px4.io/main/ko/advanced/out_of_tree_modules
---

# 외부 모듈(별도)

외부 모듈에서는 PX4 펌웨어에 추가(또는 업데이트)할 상용 모듈을 관리/분류하는 편의 매커니즘을 개발자에게 제공합니다. 외부 모듈은 내부 모듈처럼 활용할 수 있으며, 내부 모듈과의 uORB 메시지 교환에 활용할 수 있습니다.

이 주제에서는 외부("별도") 모듈을 PX4 빌드에 추가하는 방법을 설명합니다.

:::tip
가능하다면 PX4 프로젝트에 바뀐 내용을 기여해주시기 바랍니다!
:::

## 사용법

외부 모듈을 만들려면:

- 외부 모듈을 모아둘 *외부 디렉터리*를 만드십시오:
  - **PX4-Autopilot** 트리 외부 어디에든 둘 수 있습니다.
  - **Firmware**와 동일한 구조를 가져야합니다(예시: **src** 디렉터리가 있어야합니다).
  - 이후 우리는 이 디렉터리를 `EXTERNAL_MODULES_LOCATION`이라고 하겠습니다.
- 기존 모듈을 (예: **examples/px4_simple_app**) 외부 디렉터리로 복사하거나 새 모듈을 바로 만드십시오.
- 모듈의 이름을 바꾸거나 (**CMakeLists.txt**의 `MODULE`도) 기존 펌웨어의 *cmake*  빌드 설정에서 제거하십시오. 이 조치 과정은 내부 모듈과 혼동하는 문제를 피합니다.
- **CMakeLists.txt** 파일을 내용물과 같이 외부 디렉터리에 추가하십시오:
  ```
  set(config_module_list_external
      modules/<new_module>
      PARENT_SCOPE
      )
  ```
- `modules/<new_module>/CMakeLists.txt` 의 `px4_add_module()`에 다음과 같이 `EXTERNAL` 줄을 추가하십시오:

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

별도의 uORB 메시지는 일반 uORB 메시지와 동일한 위치에 만듭니다. uORB 토픽 헤더는 `<build_dir>/uORB/topics/`에 만들고, 메시지 원본 파일은  `<build_dir>/msg/topics_sources/`에 만듭니다.

- 모든 새 메시지 정의를 `$EXTERNAL_MODULES_LOCATION/msg` 디렉터리에 넣으십시오. 이들 새 별도 메시지 정의 형식은 다른  [uORB 메시지 정의](../middleware/uorb.md#adding-a-new-topic)시에도 동일합니다.
- 다음 내용을 채워 넣은 `$EXTERNAL_MODULES_LOCATION/msg/CMakeLists.txt` 파일을 추가하십시오:

  ```
  set(config_msg_list_external
      <message1>.msg
      <message2>.msg
      <message3>.msg
      PARENT_SCOPE
      )
  ```
  `<message#>.msg` 부분은 uORB 메시지 생성 과정에서 처리, 활용하는 uORB 메시지 정의 파일의 이름입니다.

별도의 uORB 메시지는 일반 uORB 메시지와 동일한 위치에 생성합니다. uORB 토픽 헤더는 `<build_dir>/uORB/topics/`에 만들고, 메시지 원본 파일은  `<build_dir>/msg/topics_sources/`에 만듭니다.

[이곳](../middleware/uorb.md#adding-a-new-topic)에 설명한 바와 같이 새 uORB 메시지는 다른 uORB 메시지처럼 활용할 수 있습니다.

:::warning
별도 uORB 메시지 정의시 기존의 일반 uORB 메시지와 동일한 이름을 가질 수 없습니다.
:::


## 외부 모듈 및 uORB 메시지 빌드

차후 추가 빌드 과정에서는 `EXTERNAL_MODULES_LOCATION` 값을 지정할 필요가 없습니다.

다른 빌드 대상을 활용할 수 있지만, 아직 빌드 디렉터리가 있으면 안됩니다. 이미 있다면 *cmake* 변수 값을 빌드 폴더에 설정할 수 있습니다.

차후 추가 빌드 과정에서는 `EXTERNAL_MODULES_LOCATION` 값을 지정할 필요가 없습니다.
