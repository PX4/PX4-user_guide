---
canonicalUrl: https://docs.px4.io/main/ko/dev_setup/dev_env_windows_cygwin
---

# Windows 개발 환경

다음 지침은 Windows 10에서 (Cygwin 기반) PX4 개발 환경 설정 방법을 설명합니다. 이 환경은 다음을 위한 PX4를 구축하는 데 사용합니다.
* Pixhawk와 기타 NuttX 기반 하드웨어
* [jMAVSim 시뮬레이션](../simulation/jmavsim.md)

:::tip
이 설정은 PX4 개발 팀에서 지원합니다. To build other targets you will need to use a [different OS](../dev_setup/dev_env.md#supported-targets) (or an [unsupported windows development environment](../advanced/dev_env_unsupported.md)).
:::

<a id="installation"></a>

## 설치 방법

1. [Github 릴리스](https://github.com/PX4/windows-toolchain/releases) 또는 [Amazon S3](https://s3-us-west-2.amazonaws.com/px4-tools/PX4+Windows+Cygwin+Toolchain/PX4+Windows+Cygwin+Toolchain+0.9.msi)(빠른 다운로드)에서 바로 사용할 수 있는 MSI 설치 프로그램의 최신 버전을 다운로드합니다.
1. 실행후, 설치 위치를 지정하고 설치하십시오:![jMAVSimOnWindows](../../assets/toolchain/cygwin_toolchain_installer.png)
1. 설치가 끝날 때 상자를 선택하여 *PX4 리포지토리를 복제하고, jMAVSim으로 시뮬레이션을 빌드 및 실행*합니다(이렇게 하면 시작 프로세스가 간소화됨). :::note 이 단계를 놓친 경우 [PX4-Autopilot 저장소를 수동으로 복제](#getting_started)하여야 합니다.
:::

<a id="getting_started"></a>

## 시작하기

툴체인은 일반 PX4 빌드 명령얼 실행을 위해 특별히 구성된 콘솔창(**run-console.bat** 스크립트를 실행하여 시작)을 사용합니다.

1. 도구 모음 설치 디렉터리로 이동합니다(기본값 **C:\\PX4\\**).
1. **run-console.bat**를 실행(두 번 클릭)하여 Linux와 같은 Cygwin bash 콘솔을 시작합니다(PX4를 빌드하려면 이 콘솔을 사용하여야 함).
1. 콘솔에서 PX4-Autopilot 저장소를 복제합니다.

:::note
설치 프로그램 옵션을 선택하여 *PX4 저장소를 복제하고 jMAVSim으로 시뮬레이션을 빌드 및 실행*한 경우에는 이 단계를 건너뛰십시오. 복제는 한 번만 수행하면 됩니다!
:::

   ```bash
   # PX4-Autopilot 저장소를 홈 폴더와 하위 모듈을 복제
   git clone --recursive -j8 https://github.com/PX4/PX4-Autopilot.git
   ```

   이제 콘솔/PX4-Autopilot 저장소를 사용하여 PX4를 빌드할 수 있습니다.

1. 예를 들어 jMAVSim을 실행하려면:
   ```bash
   # PX4-Autopilot 저장소로 이동
   cd PX4-Autopilot
   # jMAVSim으로 SITL 시뮬레이션을 빌드하고 실행하여 설정을 테스트합니다.
   make px4_sitl jmavsim
   ```
   그러면 콘솔에 다음이 표시됩니다.

   ![jMAVSimOnWindows](../../assets/simulation/jmavsim_windows_cygwin.png)


## 다음 단계

명령줄 도구 모음 설정후, 다음을 수행합니다.

- [QGroundControl 일일 빌드](https://docs.qgroundcontrol.com/en/releases/daily_builds.html)를 설치합니다.
- [빌드 지침](../dev_setup/building_px4.md)을 계속 진행합니다.

<a id="usage_instructions"></a>

## 문제 해결

### 파일 모니터링 도구와 툴체인 속도

바이러스 백신 및 기타 백그라운드 파일 모니터링 도구는 툴체인 설치와 PX4 빌드 시간을 매우 느리게 할 수 있습니다.

빌드하는 동안 일시적으로 중지할 수 있습니다(자신의 책임).

### 윈도우와 Git 특수 사례

#### Windows CR+LF 대 Unix LF 줄 끝

이 도구 모음을 사용하여 작업 중인 모든 저장소에 대해 Unix 스타일 LF 종료를 강제 실행하는 것이 좋습니다(그리고 변경 사항을 저장할 때 이를 보존하는 편집기(예: Eclipse 또는 VS Code) 사용). 소스 파일의 컴파일은 로컬에서 체크아웃된 CR+LF 엔딩에서도 작동하지만, Cygwin에는 Unix 줄 끝이 필요한 경우(예: 쉘 스크립트 실행)가 있습니다(그렇지 않으면 `$'\r': Command not found.`). 운 좋게도 git은 저장소 루트 디렉토리에서 두 명령을 실행할 때 이 작업을 수행할 수 있습니다.
```
git config core.autocrlf false
git config core.eol lf
```

여러 저장소에서 이 도구 체인으로 작업하는 경우 컴퓨터에 대해 다음 두 가지 구성을 전역적으로 설정할 수도 있습니다.
```
git config --global ...
```
이것은 Windows 시스템에서 다른 (관련되지 않은) git 사용에 영향을 줄 수 있으므로 권장하지 않습니다.

#### 유닉스 권한 실행 비트

Unix에서는 각 파일의 권한에 파일이 실행 여부를 OS에 알려주는 플래그가 있습니다. Cygwin의 *git*은 해당 비트를 지원하고 처리합니다(Windows NTFS 파일 시스템에서 사용하지 않더라도). 이로 인해 *git*이 권한에서 "거짓 양성" 차이를 찾는 경우가 많습니다. diff 실행결과는 다음과 같을 수 있습니다.
```
diff --git ...
old mode 100644
new mode 100755
```

문제를 방지하려면 Windows에서 권한 검사를 전역적으로 비활성화하는 것이 좋습니다.
```sh
# 머신에 대해 전역적으로 실행 비트 검사를 비활성화합니다.
git config --global core.fileMode false 
```

로컬 설정으로 인하여 이 문제가 발생한 기존 저장소의 경우 추가로:
```sh
# 전역 옵션을 적용하려면 이 저장소에 대한 로컬 옵션을 제거합니다.
git config --unset core.filemode

# 모든 하위 모듈에 대한 로컬 옵션 제거
git submodule foreach --recursive git config --unset core.filemode 
```




<!--
Instructions for building/updating this toolchain are covered in [Windows Cygwin Development Environment (Maintenance Instructions)](../advanced/windows_cygwin_toolchain_setup.md)
-->