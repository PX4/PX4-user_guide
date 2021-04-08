# 소스 코드 관리

## 브랜치 정책

PX4 프로젝트는 분기를 셋으로 나누는 git Branch를 만듭니다.

* [master](https://github.com/PX4/PX4-Autopilot/tree/master)는 기본 브랜치이며, 비교적 불안정하고 빠른 개발 속도를 보여줍니다.
* [beta](https://github.com/PX4/PX4-Autopilot/tree/beta)는 철저하게 시험한 코드의 브랜치입니다. 비행체를 실험하시는 분들이 사용하도록 만들었습니다.
* [stable](https://github.com/PX4/PX4-Autopilot/tree/stable)은 최신 릴리스를 가리킵니다.

[리베이스를 통한 기록](https://www.atlassian.com/git/tutorials/rewriting-history)을 유지하며 [Github 흐름](https://guides.github.com/introduction/flow/)을 배제합니다. 그러나, 전세계의 역동적인 개발팀과 수시로 병합 작업을 진행합니다.

새 기능을 추가하려면,  [Github에 가입](https://help.github.com/articles/signing-up-for-a-new-github-account/)하고, 저장소를 [포킹](https://help.github.com/articles/fork-a-repo/)한 후, [새 브랜치를 만들어](https://help.github.com/articles/creating-and-deleting-branches-within-your-repository/), 코드를 바꾸어넣은 다음, 마지막으로 [Pull 요청을 보냅니다](https://help.github.com/articles/using-pull-requests/). [지속적인 통합 작업](https://en.wikipedia.org/wiki/Continuous_integration) 테스트를 통과하고 나면, 변경된 코드를 병합할 예정입니다.

모든 코드의 기여는 [BSD 3-clause 라이선스](https://opensource.org/licenses/BSD-3-Clause) 하에 진행하며, 모든 코드에 대해 더 이상의 사용시의 제약 사항을 강요해서는 안됩니다.

## 코드 형식 정리

PX4는 [astyle](http://astyle.sourceforge.net/) 방식으로 코드 형식을 정리합니다. 유효 버전은 다음과 같습니다:
* [astyle 2.06](https://sourceforge.net/projects/astyle/files/astyle/astyle%202.06/) (추천)
* [astyle 3.0](https://sourceforge.net/projects/astyle/files/astyle/astyle%203.0/)
* [astyle 3.01](https://sourceforge.net/projects/astyle/files/) (추천)

설치하고 나면 `./Tools/astyle/check_code_style_all.sh` 명령으로 코드 형식을 점검할 수 있습니다. 정리한 master 브랜치에서의 출력은 `Format checks passed`로 나와야 합니다. 이 결과가 나왔다면, 나중에 모든 파일의 코드 형식을 검사할 때  `make format` 명령을 활용할 수 있습니다.

## 소스 코드 내부 문서 정리

PX4 개발자는  소스코드 내부 문서 정리를 권장합니다.

:::note
소스 코드 문서 표준을 강제하지 않으며, 현재 코드는 불규칙하게 문서로 정리했습니다. 저희는 더 좋아진 모습을 원합니다.
:::

현재 두가지 방식의 소스 코드 기반 문서가 있습니다:
- `PRINT_MODULE_*` 메서드는 이 안내서에서 실행 시간의 모듈 사용 방법과 [모듈 및 명령 참고](../modules/modules_main.md) 내용 작성을 목적으로 활용합니다.
  - API는 [이곳 소스 코드에](https://github.com/PX4/PX4-Autopilot/blob/v1.8.0/src/platforms/px4_module.h#L381) 문서로 정리했습니다.
  - 바람직한 활용 예시로 [프로그램/모듈 템플릿](../apps/module_template.md)과 모듈 참조에서 연결한 파일을 들 수 있습니다.
* *값을 추가하였고, 중복이 없는 코드에 대해* 소스코드 내부 문서 작성을 권장합니다.

  :::top 개발자 여러분은 C++ 구성 요소(클래스, 함수, 변수 등)를 목적의 추측이 가능하게끔 작명해야 합니다. 작명을 잘하면 문서로 정리 작업량이 줄어듭니다.
:::

  - C++ 항목 이름으로 분명하게 추정할 수 있는 문서는 추가하지 마십시오.
  - 보통 특이 상황이나 오류 처리 등의 추가 정보를 넣고 싶을 때가 있습니다.
  - 문서에서 필요하다면 다음의 [Doxgyen](http://www.doxygen.nl/) 태그를 사용해야합니다: `@class`, `@file`, `@param`, `@return`, `@brief`, `@var`, `@see`, `@note`. 바람직한 활용 예시는  [src/modules/events/send_event.h](https://github.com/PX4/PX4-Autopilot/blob/master/src/modules/events/send_event.h) 파일에 있습니다.

## 코드 제출과 메시지

분명하지 않은 모든 바뀐 내용에 대해 상세하게, 여러 문단에 걸쳐 제출 설명 메시지를 기재하십시오. 내용을 문단 별로 구성하여 한줄 요약 뿐만 아니라 상세 설명을 통하여 이해할 수 있게 정리하여 주십시오.

```
컴포넌트: 변경 사항을 한 문장으로 설명하십시오. Fixes #1234

Prepend the software component to the start of the summary
line, either by the module name or a description of it.
(e.g. "mc_att_ctrl" or "multicopter attitude controller").

If the issue number is appended as <Fixes #1234>, Github
will automatically close the issue when the commit is
merged to the master branch.

The body of the message can contain several paragraphs.
Describe in detail what you changed. Link issues and flight
logs either related to this fix or to the testing results
of this commit.

Describe the change and why you changed it, avoid to
paraphrase the code change (Good: "Adds an additional
safety check for vehicles with low quality GPS reception".
Bad: "Add gps_reception_check() function").

Reported-by: Name <email@px4.io>
```

이 제출 안내서 내용은 리누스 토발즈가 관리하는 리눅스 커널과 기타 [관리 프로젝트](https://github.com/torvalds/subsurface/blob/a48494d2fbed58c751e9b7e8fbff88582f9b2d02/README#L88-L115)에서 나온 우수 사례를 기반으로 하였습니다.

이 제출 안내서 내용은 리누스 토발즈가 관리하는 리눅스 커널과 기타 [프로젝트](https://github.com/torvalds/subsurface/blob/a48494d2fbed58c751e9b7e8fbff88582f9b2d02/README#L88-L115)에서 나온 우수 사례를 참고로 작성하였습니다.
