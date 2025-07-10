---
canonicalUrl: https://docs.px4.io/main/ko/simulation/jmavsim
---

# jMAVSim SITL

jMAVSim은 시뮬레이션된 세계에서 PX4를 실행하는 *콥터* 유형의 기체를 비행할 수 있는 간단한 멀티콥터 시뮬레이터입니다. 설정이 쉽고, 기체가 이륙, 비행, 착륙할 수 있으며, 다양한 장애 조건(예: GPS 장애)에 적절하게 반응을 테스트할 수 있습니다.

<strong>지원 기체:</strong>

* 쿼드콥터

jMAVSim에서 PX4 SITL과 연결 설정 방법을 설명합니다.

:::tip
jMAVSim은 HITL 시뮬레이션이 가능합니다.([여기에 표시된 대로](../simulation/hitl.md#jmavsim_hitl_configuration)).
:::

## 설치

jMAVSim 설정은 [표준 빌드 지침](../dev_setup/dev_env.md)(macOS, Ubuntu Linux, Windows용)에 설명되어 있습니다.

## 시뮬레이션 환경

루프 시뮬레이션 소프트웨어는 호스트 시스템에서 전체 시스템을 실행하고 자동조종장치를 시뮬레이션합니다. 로컬 네트워크에서 시뮬레이터에 연결합니다. 설정은 다음과 같습니다.

[![인어 그래프: SITL 시뮬레이터](https://mermaid.ink/img/eyJjb2RlIjoiZ3JhcGggTFI7XG4gIFNpbXVsYXRvci0tPk1BVkxpbms7XG4gIE1BVkxpbmstLT5TSVRMOyIsIm1lcm1haWQiOnsidGhlbWUiOiJkZWZhdWx0In0sInVwZGF0ZUVkaXRvciI6ZmFsc2V9)](https://mermaid-js.github.io/mermaid-live-editor/#/edit/eyJjb2RlIjoiZ3JhcGggTFI7XG4gIFNpbXVsYXRvci0tPk1BVkxpbms7XG4gIE1BVkxpbmstLT5TSVRMOyIsIm1lcm1haWQiOnsidGhlbWUiOiJkZWZhdWx0In0sInVwZGF0ZUVkaXRvciI6ZmFsc2V9)


<!-- original graph
graph LR;
  Simulator-- >MAVLink;
  MAVLink-- >SITL;
-->

## SITL 실행

[시뮬레이션 전제 조건](../dev_setup/dev_env.md)이 시스템에 설치를 확인후 실행하면 됩니다. 편리한 make 대상은 POSIX 호스트 빌드를 컴파일하고 시뮬레이션을 실행합니다.

```sh
make px4_sitl_default jmavsim
```

그러면 다음과 같은 PX4 셸이 출력됩니다.

```sh
[init] shell id: 140735313310464
[init] task name: px4

______  __   __    ___
| ___ \ \ \ / /   /   |
| |_/ /  \ V /   / /| |
|  __/   /   \  / /_| |
| |     / /^\ \ \___  |
\_|     \/   \/     |_/

Ready to fly.


pxh>
```


또한 [jMAVSim](https://github.com/PX4/jMAVSim) 시뮬레이터의 3D 보기를 보여주는 창이 나타납니다.

![jMAVSim 3D 보기](../../assets/simulation/jmavsim.jpg)


## 하늘로 띄우기

시스템이 상태 정보를 인쇄하기 시작합니다. 위치 잠금이 설정되면 비행을 시작할 수 있습니다(콘솔에 *EKF commending GPS fusion* 메시지가 표시된 직후).

이륙하려면 콘솔에 다음 명령어를 입력하십시오.

```sh
pxh> commander takeoff
```

*QGroundControl*을 사용하여 임무를 수행하거나, [조이스틱](#joystick)에 연결할 수 있습니다.

## 사용법/설정 옵션

모든 시뮬레이터에 적용되는 옵션은 최상위 [시뮬레이션](../simulation/README.md#sitl-simulation-environment)편에서 설명합니다(일부는 아래에서 중복될 수 있음).

### 센서/하드웨어 오류 시뮬레이션

[안전장치 시뮬레이션](../simulation/failsafes.md)에서는 GPS 오류와 배터리 소모와 같은 안전 비상안전장치를 트리거하는 방법을 설명합니다.

### 사용자 지정 이륙 위치 설정

기본 이륙 위치는 `PX4_HOME_LAT`, `PX4_HOME_LON` 및 `PX4_HOME_ALT` 환경변수를 사용하여 재정의할 수 있습니다.

예를 들어 위도, 경도 및 고도를 설정은 아래와 같습니다.
```
export PX4_HOME_LAT=28.452386
export PX4_HOME_LON=-13.867138
export PX4_HOME_ALT=28.5
make px4_sitl_default jmavsim
```

### 시뮬레이션 속도 변경

시뮬레이션 속도는 환경 변수 `PX4_SIM_SPEED_FACTOR`를 사용하여 실시간으로 증가 또는 감소할 수 있습니다.

```
export PX4_SIM_SPEED_FACTOR=2
make px4_sitl_default jmavsim
```

자세한 내용은 [시뮬레이션 > 실시간보다 빠른 시뮬레이션 실행](../simulation/README.md#simulation_speed)편을 참고하십시오.

<a id="joystick"></a>

### 조이스틱 사용법

조이스틱과 썸 조이스틱 지원은 *QGroundControl*에서 지원됩니다([설정 방법](../simulation/README.md#joystick-gamepad-integration) 참고).


### Wi-Fi 드론 시뮬레이션

로컬 네트워크에서 Wi-Fi로 연결된 드론을 시뮬레이션하는 특별한 대상이 있습니다.

```sh
make broadcast jmavsim
```

시뮬레이터는 실제 드론처럼 로컬 네트워크에서 주소를 브로드캐스트합니다.

### JMAVSim과 PX4를 각각 시작

JMAVSim과 PX4를 별도로 시작할 수 있습니다.

```
./Tools/jmavsim_run.sh -l
make px4_sitl none
```

이것은 더 빠른 주기로 테스트할 수 있습니다(jMAVSim은 재시작에 훨씬 더 많은 시간이 소요됨).

### 헤드리스 모드

GUI 없이 jMAVSim을 시작하려면, 다음과 같이 환경 변수 `HEADLESS=1`을 설정합니다.
```bash
HEADLESS=1 make px4_sitl jmavsim
```


## 다중 차량 시뮬레이션

JMAVSim은 다중 차량 시뮬레이션이 가능합니다. [JMAVSim이 있는 다중 차량 시뮬레이션](../simulation/multi_vehicle_jmavsim.md).

## 확장 및 사용자 정의

시뮬레이션 인터페이스를 확장하거나 사용자 정의하려면 **Tools/jMAVSim** 폴더에서 파일을 편집하십시오. 코드는 Github의 [jMAVSim 저장소](https://github.com/px4/jMAVSim)에서 제공합니다.

:::note
빌드 시스템은 시뮬레이터를 포함하여 모든 종속성을 체크아웃할 하위 모듈에 적용합니다. 디렉토리에 있는 파일의 변경 사항을 덮어쓰지는 않지만, 이러한 변경 사항이 커밋될 때 하위 모듈은 새 커밋 해시를 사용하여 펌웨어 저장소에 등록하여야 합니다. 이렇게 하려면, `git add Tools/jMAVSim` 및 변경 사항을 커밋합니다. 시뮬레이터의 GIT 해시가 업데이트됩니다.
:::

## ROS 인터페이스

시뮬레이션은 실제 차량에 탑승하는 것과 같은 방식으로 [ROS에 인터페이스](../simulation/ros_interface.md)될 수 있습니다.

## 중요 파일

* 시작 스크립트는 [시스템 시작](../concept/system_startup.md)에서 설명합니다.
* 시뮬레이션된 루트 파일 시스템("`/`" 디렉토리)은 다음의 빌드 디렉토리 내에 생성됩니다: `build/px4_sitl_default/tmp/rootfs`.

## 문제 해결

### java.long.NoClassDefFoundError

```
Exception in thread "main" java.lang.NoClassDefFoundError: javax/vecmath/Tuple3d
at java.base/java.lang.Class.forName0(Native Method)
at java.base/java.lang.Class.forName(Class.java:374)
at org.eclipse.jdt.internal.jarinjarloader.JarRsrcLoader.main(JarRsrcLoader.java:56)
Caused by: java.lang.ClassNotFoundException: javax.vecmath.Tuple3d
at java.base/java.net.URLClassLoader.findClass(URLClassLoader.java:466)
at java.base/java.lang.ClassLoader.loadClass(ClassLoader.java:566)
at java.base/java.lang.ClassLoader.loadClass(ClassLoader.java:499)
... 3 more
Exception in thread "main" java.lang.NoClassDefFoundError: javax/vecmath/Tuple3d
at java.base/java.lang.Class.forName0(Native Method)
at java.base/java.lang.Class.forName(Class.java:374)
at org.eclipse.jdt.internal.jarinjarloader.JarRsrcLoader.main(JarRsrcLoader.java:56)
Caused by: java.lang.ClassNotFoundException: javax.vecmath.Tuple3d
at java.base/java.net.URLClassLoader.findClass(URLClassLoader.java:466)
at java.base/java.lang.ClassLoader.loadClass(ClassLoader.java:566)
at java.base/java.lang.ClassLoader.loadClass(ClassLoader.java:499)
```

jMAVSim 하위 모듈이 [최신 jar 라이브러리로 업데이트](https://github.com/PX4/jMAVSim/pull/119)되고, Java 11 또는 Java 14가 제대로 실행되면 이 오류가 더 이상 발생하지 않습니다.


### An illegal reflective access operation has occurred

이 경고는 무시할 수 있습니다(경고가 나타나도, 시뮬레이션은 정상적으로 작동함).

```
WARNING: An illegal reflective access operation has occurred
WARNING: Illegal reflective access by javax.media.j3d.JoglPipeline (rsrc:j3dcore.jar) to method sun.awt.AppContext.getAppContext()
WARNING: Please consider reporting this to the maintainers of javax.media.j3d.JoglPipeline
WARNING: Use --illegal-access=warn to enable warnings of further illegal reflective access operations
WARNING: All illegal access operations will be denied in a future release
Inconsistency detected by ld.so: dl-lookup.c: 112: check_match: Assertion version->filename == NULL || ! _dl_name_match_p (version->filename, map)' failed!
```

### java.awt.AWTError: Assistive Technology not found: org.GNOME.Accessibility.AtkWrapper

```
Exception in thread "main" java.lang.reflect.InvocationTargetException
at sun.reflect.NativeMethodAccessorImpl.invoke0(Native Method)
at sun.reflect.NativeMethodAccessorImpl.invoke(NativeMethodAccessorImpl.java:62)
at sun.reflect.DelegatingMethodAccessorImpl.invoke(DelegatingMethodAccessorImpl.java:43)
at java.lang.reflect.Method.invoke(Method.java:498)
at org.eclipse.jdt.internal.jarinjarloader.JarRsrcLoader.main(JarRsrcLoader.java:58)
Caused by: java.awt.AWTError: Assistive Technology not found: org.GNOME.Accessibility.AtkWrapper
at java.awt.Toolkit.loadAssistiveTechnologies(Toolkit.java:807)
at java.awt.Toolkit.getDefaultToolkit(Toolkit.java:886)
at java.awt.Window.getToolkit(Window.java:1358)
at java.awt.Window.init(Window.java:506)
at java.awt.Window.(Window.java:537)
at java.awt.Frame.(Frame.java:420)
at java.awt.Frame.(Frame.java:385)
at javax.swing.JFrame.(JFrame.java:189)
at me.drton.jmavsim.Visualizer3D.(Visualizer3D.java:104)
at me.drton.jmavsim.Simulator.(Simulator.java:157)
at me.drton.jmavsim.Simulator.main(Simulator.java:678)
```

위의 오류가 나타나면, 다음 방법으로 해결하십시오.

**accessibility.properties** 파일을 수정합니다.
```
sudo gedit /etc/java-8-openjdk/accessibility.properties
```

아래 표시된 줄을 주석 처리하십시오.
```
#assistive_technologies=org.GNOME.Acessibility.AtkWrapper
```

자세한 내용은 [GitHub 문제](https://github.com/PX4/PX4-Autopilot/issues/9557)를 확인하십시오. 기고자가 [skubuntu.com](https://askubuntu.com/questions/695560)에서 수정 사항을 찾았습니다.

### Exception in thread "main" java.lang.UnsupportedClassVersionError:
jMAVsim을 컴파일시 다음 오류가 발생할 수 있습니다.

```
Exception in thread "main" java.lang.UnsupportedClassVersionError: me/drton/jmavsim/Simulator has been compiled by a more recent version of the Java Runtime (class file version 59.0), this version of the Java Runtime only recognizes class file versions up to 58.0
```

이 오류는 사용자 환경에 최신 버전의 Java가 필요함을 알려줍니다. 클래스 파일 버전 58은 jdk14에, 버전 59는 jdk15 등에 해당합니다.

MacOS에서 이 문제를 해결하려면, homebrew를 사용하여 OpenJDK를 설치하는 것이 좋습니다.
```sh
brew install --cask adoptopenjdk15
```
