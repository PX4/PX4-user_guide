---
canonicalUrl: https://docs.px4.io/main/ko/contribute/code
---

# 소스 코드 관리

## 분기 모델

PX4 프로젝트는 3가지 Git 분기 모델을 사용합니다.

* [master](https://github.com/PX4/PX4-Autopilot/tree/master)는 기본적으로 불안정하며 빠르게 발전합니다.
* [beta](https://github.com/PX4/PX4-Autopilot/tree/beta)는 철저한 테스트를 거쳤습니다. 비행 테스터를 위한 것입니다.
* [stable](https://github.com/PX4/PX4-Autopilot/tree/stable)은 최신 릴리스를 의미합니다.

[리베이스를 통한 기록](https://www.atlassian.com/git/tutorials/rewriting-history)을 유지하며 [Github 흐름](https://guides.github.com/introduction/flow/)을 배제합니다. 그러나, 전세계의 역동적인 개발팀과 수시로 병합 작업을 진행합니다.

To contribute new functionality, [sign up for Github](https://help.github.com/articles/signing-up-for-a-new-github-account/), then [fork](https://docs.github.com/en/get-started/quickstart/fork-a-repo) the repository, [create a new branch](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-and-deleting-branches-within-your-repository), add your changes, and finally [send a pull request](https://help.github.com/articles/using-pull-requests/). 변경사항은 [지속적 통합](https://en.wikipedia.org/wiki/Continuous_integration) 테스트를 통과한 다음에 병합됩니다.

코드 기여는 [BSD 3절 라이선스](https://opensource.org/licenses/BSD-3-Clause)를 준수하여여 하며, 코드에는 사용에 제약 사항을 부과하지 않아야 합니다.

## Code Style

PX4 uses the [Google C++ style guide](https://google.github.io/styleguide/cppguide.html), with the following (minimal) modifications:

### Tabs

- Tabs are used for indentation (equivalent to 8 spaces).
- Spaces are used for alignment.

### Line Length

- Maximum line length is 120 characters.

### File Extensions

- Source files use extension `*.cpp` instead of `*.cc`.

### Function and Method Names

- `lowerCamelCase()` is used for functions and methods to *visually* distinguish them from `ClassConstructors()` and `ClassNames`.

### Class Privacy Keywords

- *zero* spaces before `public:`, `private:`, or `protected:` keywords.

### Example Code Snippet

```cpp
class MyClass {
public:

        /**
         * @brief Description of what this function does.
         *
         * @param[in] input_param Clear description of the input [units]
         * @return Whatever we are returning [units]
         */
        float doSomething(const float input_param) const {
                const float in_scope_variable = input_param + kConstantFloat;
                return in_scope_variable * private_member_variable_;
        }

        void setPrivateMember(const float private_member_variable) { private_member_variable_ = private_member_variable; }

        /**
         * @return Whatever we are "getting" [units]
         */
        float getPrivateMember() const { return private_member_variable_; }

private:

        // Clear description of the constant if not completely obvious from the name [units]
        static constexpr float kConstantFloat = ...;  

        // Clear description of the variable if not completely obvious from the name [units]
        float private_member_variable_{...};
};
```

## 소스 내 문서 작업

PX4 개발자는 소스 내에서 적절한 문서를 작성하는 것이 좋습니다.

:::note
소스 코드 문서화 표준은 시행되지 않으며, 코드는 현재 일관성 있게 문서화되어 있지 않습니다.
이보다 더 나아지길 바랍니다!
:::

현재 두 가지 소스 기반 문서 유형이 있습니다.
- `PRINT_MODULE_*` 메소드는 두 모듈 런타임과 [모듈 & 이 가이드의 명령 참조](../modules/modules_main.md) 사용 지침에 모두 사용됩니다.
  - API는 [여기 소스 코드](https://github.com/PX4/PX4-Autopilot/blob/v1.8.0/src/platforms/px4_module.h#L381)에 문서화되어 있습니다.
  - 좋은 예제로는 [응용 프로그램/모듈 템플릿](../modules/module_template.md)과 모듈 참조에서 링크된 파일이 있습니다.
- *가치가 추가되거나 중복되지 않는* 다른 소스 문서를 권장합니다.

  :::tip
개발자는 목적을 유추할 수 있도록 C++ 엔터티(클래스, 함수, 변수 등)의 이름을 지정하여 명시적 문서의 필요성을 줄일 수 있습니다.
:::

  - Do not add documentation that can trivially be inferred from C++ entity names.
  - ALWAYS specify units of variables, constants, and input/return parameters where they are defined.
  - 일반적으로 특이 사항이나 오류 처리에 대한 정보를 추가할 수 있습니다.
  - 필요시에는 [Doxgyen](http://www.doxygen.nl/) 태그를 사용합니다. `@class`, `@file`, `@param`, ` @return`, `@brief`, `@var`, `@see`, `@note`. 좋은 예는 [src/modules/events/send_event.h](https://github.com/PX4/PX4-Autopilot/blob/master/src/modules/events/send_event.h)입니다.

Please avoid "magic numbers", for example, where does this number in the conditional come from? What about the multiplier on yaw stick input?

```cpp
if (fabsf(yaw_stick_normalized_input) < 0.1f) {
        yaw_rate_setpoint = 0.0f;
}
else {
        yaw_rate_setpoint = 0.52f * yaw_stick_normalized_input;
}
```

Instead, define the numbers as named constants with appropriate context in the header:

```cpp
// Deadzone threshold for normalized yaw stick input
static constexpr float kYawStickDeadzone = 0.1f;

// [rad/s] Deadzone threshold for normalized yaw stick input
static constexpr float kMaxYawRate = math::radians(30.0f);
```

and update the source implementation.
```cpp
if (fabsf(yaw_stick_normalized_input) < kYawStickDeadzone) {
        yaw_rate_setpoint = 0.0f;
}
else {
        yaw_rate_setpoint = kMaxYawRate * yaw_stick_normalized_input;
}
```

## 커밋과 커밋 메시지

사소한 변경에 대하여도 자세한 설명한 여러 단락 커밋 메시지를 기록하십시오. 쉽게 이해할 수 있는 한 줄 요약과 자세한 세부정보도 기록하십시오.

```
컴포넌트: 변경 사항을 한 문장으로 설명하십시오. Fixes #1234

요약 시작 부분에 소프트웨어 구성 요소를 추가합니다.
모듈 이름이나 설명으로 줄을 지정합니다.
(예: "mc_att_ctrl" 또는 "멀티콥터 자세 콘트롤러").

발행번호를 <Fixes #1234>으로 붙이면, Github 커밋이 완료시 자동으로 문제를 종료합니다.
마스터 브랜치에 병합됩니다.

메시지 본문에는 여러 단락이 포함될 수 있습니다.
변경한 사항을 자세히 기술하십시오. 이 수정 사항 또는 이 커밋의 테스트 결과와 관련된 문제 및 비행 로그를 연결합니다.

변경 사항과 변경한 이유를 설명하고 코드 변경을 다른 말로 표현하지 마십시오(좋음: "GPS 수신 품질이 낮은 차량에 대한 추가 안전 점검 추가".
불량: "gps_reception_check() 함수 추가").

보고자: 이름 <email@px4.io>
```

****`git commit -s`**를 사용하여 모든 커밋을 승인합니다. ** 이렇게 하면 `signed-off-by:`가 추가됩니다. 마지막 줄에 이름과 이메일을 입력합니다.

이 커밋 가이드는 Linux 커널과 Linus Torvalds가 관리하는 [프로젝트](https://github.com/torvalds/subsurface/blob/a48494d2fbed58c751e9b7e8fbff88582f9b2d02/README#L88-L115)에 대한 모범 사례들을 참고로 작성되었습니다.
