---
canonicalUrl: https://docs.px4.io/main/ko/test_and_ci/jenkins_ci
---

# 젠킨스 CI

<div v-if="$themeConfig.px4_version != 'master'">
  <div class="custom-block danger"><p class="custom-block-title">이 페이지는 오래됐습니다</p> <p>최신 문서는 <a href="https://docs.px4.io/master/en/test_and_ci/">여기에서  찾을 수 있습니다</a>.</p>
  </div>
</div>

[ci.px4.io](http://ci.px4.io/)의 젠킨스 지속 통합 서버는 PX4 SITL에 대한 통합 테스트를 자동으로 수행합니다.


## 개요

* 수반 요소: 젠킨스, 도커, PX4 POSIX SITL
* [도커 컨테이너](../test_and_ci/docker.md)에서의 코드 시험 실행
* 젠킨스에서 실행하는 작업 두가지: 마스터 브랜치에 대한 PR 점검, 마스터 브랜치로의 push 점검

## 테스트 실행

젠킨스는 컨테이너를 시작할 때 [run_container.bash](https://github.com/PX4/PX4-Autopilot/blob/master/integrationtests/run_container.bash) 파일을 사용하는데, 실행 단계에서 컴파일 후 코드를 시험할 때 [run_tests.bash](https://github.com/PX4/PX4-Autopilot/blob/master/integrationtests/run_tests.bash)를 실행할 차례에 실행합니다.

도거를 설치했다면 동일한 방식을 로컬에서 진행할 수 있습니다:

```sh
cd <directory_where_PX4-Autopilot_is_cloned>
sudo WORKSPACE=$(pwd) ./PX4-Autopilot/integrationtests/run_container.bash
```

## 서버 설정

### 설치

자세한 젠킨스 설치 및 관리 방법 내용은 설치 [script/log](https://github.com/PX4/containers/tree/master/scripts/jenkins)를 참고하십시오.

### 설정

* 젠킨스 보안 활성
* 설치 플러그인
  * github
  * Github pull 요청 빌더
  * 내장형 빌드 상태 표시 플러그인
  * s3 플러그인
  * 알림 플러그인
  * 콘솔 섹션 축소 기능
  * postbuildscript
