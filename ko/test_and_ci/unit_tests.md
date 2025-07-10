---
canonicalUrl: https://docs.px4.io/main/ko/test_and_ci/unit_tests
---

# 단위 테스트

개발자는 기능 추가, 버그 수정, 리팩토링 등 전 영역에 걸쳐 단위 테스트를 하는 것이 바람직합니다.

PX4에서는 단위 테스트 작성에 필요한 몇가지 수단을 제공합니다:

1. Unit tests with [Google Test](https://github.com/google/googletest/blob/main/docs/primer.md) ("GTest") - tests that have minimal, internal-only dependencies
1. GTest로의 기능 시험 - 매개변수와 uORB 메세지에 따른 시험
1. SITL 단위 테스트. 완전한 SITL 실행에 필요한 테스트입니다. 이 테스트는 실행하기에 매우 느리거나 디버깅하기 어려운 부분입니다. 따라서 가능하면 GTest를 활용하시는게 좋습니다.

## GTest 단위 테스트 작성

**Tip**: 보통, 고급 GTest 유틸리티, STL 데이터 구조에 접근해야 하거나 `매개변수` 또는 `uORB` 라이브러리로의 연결이 필요하다면, 기능 테스트를 대신 활용해야합니다.

새 단위 테스트의 작성 절차는 다음과 같습니다:

1. 단위 테스트는 설치, 실행, 결과 검사 세 부분으로 정리해야 합니다. 각 테스트에서는 매우 극히 일부의 동작을 시험하거나 설정 조건을 시험하기 때문에, 테스트에 실패했을 경우 어떤 부분에서 문제가 있는지 명백하게 드러납니다. 가능하면 이 표준을 따라주십시오.
1. [AttitudeControlTest](https://github.com/PX4/PX4-Autopilot/blob/master/src/modules/mc_att_control/AttitudeControl/AttitudeControlTest.cpp) 예제 단위 테스트를 시험할 코드가 있는 디렉터리로 복사하고 이름을 바꾸십시오.
1. 해당 디렉터리의 `CMakeLists.txt`에 새 파일을 추가하십시오. `px4_add_unit_gtest(SRC MyNewUnitTest.cpp LINKLIBS <library_to_be_tested>)`와 같아야 합니다.
1. 원하는 시험 기능을 추가하십시오. 특정 테스트를 수행하려면 헤더 파일 추가가 필요하며, 새 테스트 추가(제각각의 이름을 지님), 설정 로직 배치, 시험할 코드 실행, 결과 검증을 기대대로 수행합니다.
1. 추가 라이브러리 의존 요소가 필요하다면, 위에서와 같이 CMakeLists의 `LINKLIBS` 다음에 추가해야합니다.

`make tests`를 실행하여 시험을 진행할 수 있으며, 이 과정 후 `build/px4_sitl_test/unit-MyNewUnit` 위치에서 바이너리를 찾을 수 있습니다. 디버거에서 바로 실행할 수 있습니다.

## GTest 기능 테스트 작성

GTest 기능 시험은 매개변수, uORB 메세지, 고급 GTest 기능에 따라 테스트할 테스트 단위 또는 구성 요소가 있을 때 활용해야합니다. 게다가, 기능 테스트 과정에서 자체 STL 데이터 구조를 사용할 수 있습니다(플랫폼간 차이에 유의해야 함. 예: maxOS, Linux).

새 기능 테스트의 작성 절차는 다음과 같습니다:

1. 보통 (그리고 단위 테스트와 유사한  상황에서), 기능 테스트는 구성, 실행, 결과 검사 세부분으로 정리해야합니다. 각 테스트에서는 매우 극히 일부의 동작을 시험하거나 설정 조건을 시험하기 때문에, 테스트에 실패했을 경우 어떤 부분에서 문제가 있는지 명백하게 드러납니다. 가능하면 이 표준을 따라주십시오.
1. [ParameterTest](https://github.com/PX4/PX4-Autopilot/blob/master/src/lib/parameters/ParameterTest.cpp) 기능 단위 테스트를 시험할 코드가 있는 디렉터리로 복사하고 이름을 변경하십시오.
1. ParameterTest의 클래스 이름을 시험할 코드를 더 잘 구분할 수 있는 이름으로 변경하십시오.
1. 해당 디렉터리의 `CMakeLists.txt`에 새 파일을 추가하십시오. `px4_add_functional_gtest(SRC MyNewFunctionalTest.cpp LINKLIBS <library_to_be_tested>)`와 같아야 합니다.
1. 원하는 시험 기능을 추가하십시오. 특정 테스트를 수행하려면 헤더 파일 추가가 필요하며, 새 테스트 추가(제각각의 이름을 지님), 설정 로직 배치, 시험할 코드 실행, 결과 검증을 기대대로 수행합니다.
1. 추가 라이브러리 의존 요소가 필요하다면, 위에서와 같이 CMakeLists의 `LINKLIBS` 다음에 추가해야합니다.

`make tests`를 실행하여 시험을 진행할 수 있으며, 이 과정 후 `build/px4_sitl_test/functional-MyNewFunctional` 위치에서 바이너리를 찾을 수 있습니다. It can be run directly in a debugger, however be careful to only run one test per executable invocation using the [--gtest_filter=\<regex\>](https://github.com/google/googletest/blob/main/docs/advanced.md#running-a-subset-of-the-tests) arguments, as some parts of the uORB and parameter libraries don't clean themselves up perfectly and may result in undefined behavior if set up multiple times.

## SITL 단위 테스트 작성

특히 비행체 제어 장치의 모든 부분 - 드라이버, 시간, 등을 시험하려면 SITL 단위 테스트를 거쳐야합니다. 이 테스트는 실행이 느리며(새 모듈 별로 1초씩 추가), 디버깅도 어려워, 보통 필요할 때만 테스트를 활용합니다.

새 SITL 단위 테스트의 작성 절차는 다음과 같습니다:

1. [Unittest-class](https://github.com/PX4/PX4-Autopilot/blob/master/src/include/unit_test.h) 예제를 검사하십시오.
1. [tests](https://github.com/PX4/PX4-Autopilot/tree/master/src/systemcmds/tests)에 새 .cpp 파일을 만들고 이름을 **test_[description].cpp**와 같이 정하십시오.
1. **test_[description].cpp** 파일에 unittest-class 기반 클래스 `<unit_test.h>` 헤더 파일을 넣고 새 기능 동작에 해당하는 시험 코드 작성시 필요한 모든 파일을 넣으십시오.
1. **test_[description].cpp** 에 `UnitTest` 클래스를 상속하는 `[Description]Test`  클래스를 작성하십시오.
1. `[Description]Test` 클래스에 공용 메서드`virtual bool run_tests()`를 선언하십시오.
1. `[Description]Test` 클래스에 기능에 대해 확인하는 과정에서 필요한 모든 내부 메서드(`test1()`, `test2()`,...)를 선언하십시오.
1. **test_[description].cpp** 파일에 각각의 test[1,2,...] 메드를 실행하도록 `run_tests()` 메서드를 작성하십시오.
1. **test_[description].cpp** 파일에 다양한 시험 절차를 작성하십시오.
1. **test_[description].cpp** 파일 내부 하단에 테스트를 선언하십시오.
   ```cpp
   ut_declare_test_c(test_[description], [Description]Test)
   ```
   서식은 아래와 같습니다:
   ```cpp
   #include <unit_test.h>
   #include "[new feature].h"
   ...

   class [Description]Test : public UnitTest
   {
   public:
       virtual bool run_tests();

   private:
       bool test1();
       bool test2();
       ...
   };

   bool [Description]Test::run_tests()
   {
       ut_run_test(test1)
       ut_run_test(test2)
       ...

       return (_tests_failed == 0);
   }

   bool [Description]Test::test1()
   {
       ut_[name of one of the unit test functions](...
       ut_[name of one of the unit test functions](...
       ...

       return true;
   }

   bool [Description]Test::test2()
   {
       ut_[name of one of the unit test functions](...
       ut_[name of one of the unit test functions](...
       ...

       return true;
   }
   ...

   ut_declare_test_c(test_[description], [Description]Test)
   ```
   참고로 `ut_[name of one of the unit test functions]`는 [unit_test.h](https://github.com/PX4/PX4-Autopilot/blob/master/src/include/unit_test.h)에 지정한 단위 테스트 함수 중 하나에 해당합니다.

1. [tests_main.h](https://github.com/PX4/PX4-Autopilot/blob/master/src/systemcmds/tests/tests_main.h)에 새 테스트를 정의하십시오:

   ```cpp
   extern int test_[description](int argc, char *argv[]);
   ```
1. [tests_main.c](https://github.com/PX4/PX4-Autopilot/blob/master/src/systemcmds/tests/tests_main.c)에 새 설명 이름, 테스트 함수, 옵션을 추가하십시오:

   ```cpp
   ...
   } tests[] = {
       {...
       {"[description]", test_[description], OPTION},
       ...
   }
   ```
   `OPTION`은 `OPT_NOALLTEST`,`OPT_NOJIGTEST`, `0` 중 한가지 값이 들어갈 수 있으며, px4 셸에서 한두가지 명령을 호출했을 때 고려합니다.

   ```bash
   pxh> tests all
   ```
   또는

   ```bash
   pxh> tests jig
   ```
   `OPT_NOALLTEST` 옵션으로 테스트를 수행한다면, `tests all`을 호출할 때의 테스트를 제외합니다. `OPT_NOJIGTEST`에 대해서도 `test jig` 명령을 호출했을 때 마찬가지입니다. `0` 옵션은 개발자가 활용하고자 하는 테스트를 제외하지 않음을 의미합니다.

1. `test_[description].cpp` 테스트를 [CMakeLists.txt](https://github.com/PX4/PX4-Autopilot/blob/master/src/systemcmds/tests/CMakeLists.txt)에 추가하십시오.


## 로컬 머신에서의 테스트

GTest 단위 시험, GTest 기능 시험, SITL 단위 시험 전체를 Bash 쉘에서 실행하십시오.

```bash
make tests
```

개별 GTest 테스트 바이너리는 `build/px4_stil_test/` 디렉터리에 있으며, 대부분 IDE 디버거에서 바로 실행할 수 있습니다.

테스트 하위 집합만 따로 실행하려면 이 명령에서 ctest 명칭에 대해 정규 표현식을 적용하여 걸러내십시오:

```bash
make tests TESTFILTER=<regex filter expression>
```

예를 들어:
- `make tests TESTFILTER=unit`: GTest 단위 테스트만 실행
- `make tests TESTFILTER=sitl` 모의 시험 환경상 테스트만 실행
- `make tests TESTFILTER=Attitude` `AttitudeControl` 테스트만 실행
