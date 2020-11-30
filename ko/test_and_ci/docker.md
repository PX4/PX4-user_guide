# PX4 도커 컨테이너

도커 컨테이너는 NuttX와 리눅스 기반 하드웨어 [가제보 모의시험](../simulation/gazebo.md), [ROS](../simulation/ros_interface.md)가 들어있는 완전한 [PX4 개발 툴체인](../dev_setup/dev_env.md#supported-targets)을 제공합니다.

이 주제에서는 로컬 리눅스 컴퓨터에서 빌드 환경에 접근할 수 있는 [가용 도커 컨테이너](#px4_containers) 활용법을 알려드리도록 하겠습니다.

> **Note** Dockerfile 과 README 는 [이 곳 Github](https://github.com/PX4/containers/blob/master/README.md)에 있습니다. 이 파일은 [도커 허브](https://hub.docker.com/u/px4io/)에 자동으로 만들어줍니다.


## 준비 요건

> **Note** PX4 컨테이너는 현재 리눅스만 지원합니다(리눅스를 설치하지 않았다면 [가상 머신에서](#virtual_machine) 컨테이너를 실행할 수 있습니다). X 서버가 들어있지 않으므로 기본 리눅스 이미지에 대해 `boot2docker`를 실행하지 마십시오

리눅스 컴퓨터에 [도커를 설치하십시오](https://docs.docker.com/installation/). 도커 사이트에서 관리하는 꾸러미 저장소에서 적당한 최신 안정 꾸러미 하나를 활용하십시오. *기업용판* 또는 (무료) *커뮤니티판*을 활용할 수 있습니다.

*우분투*에서 비 프로덕션 설정 방식으로 로컬에 설치하려면, 아래에 보여드리는 바와 같이 [간편 스크립트](https://docs.docker.com/install/linux/docker-ce/ubuntu/#install-using-the-convenience-script)를 활용하여 도커를 설치하는 방법이 가장 빠르고 간단한 방법입니다(대안 설치 방식도 동일한 페이지에 있습니다):

```sh
curl -fsSL get.docker.com -o get-docker.sh
sudo sh get-docker.sh
```

기본 설치시 *도커*를 루트 사용자로 실행해야 합니다(예: `sudo` 활용). 그러나 PX4 펌웨어를 빌드하려면 [비 루트 사용자 계정으로 도커를 실행](https://docs.docker.com/install/linux/linux-postinstall/#manage-docker-as-a-non-root-user) 하시는게 좋습니다. 이렇게 하면, 도커를 활용하면서 빌드 폴더를 루트 소유로 만들지 않습니다.

```sh
# Create docker group (may not be required)
sudo groupadd docker
# Add your user to the docker group.
sudo usermod -aG docker $USER
# Log in/out again before using docker!
```

<a id="px4_containers"></a>

## 컨테이너 계층

가용 컨테이너는 아래와 같습니다([Github](https://github.com/PX4/containers/blob/master/README.md#container-hierarchy)에 있음):

| 컨테이너                            | 설명                                   |
| ------------------------------- | ------------------------------------ |
| px4-dev-base                    | 모든 컨테이너에서 공통으로 활용하는 베이스 설치           |
| &emsp;px4-dev-nuttx             | NuttX 툴체인                            |
| &emsp;px4-dev-simulation        | NuttX 툴체인 + 모의시험 (jMAVSim, Gazebo)   |
| &emsp;&emsp;px4-dev-ros         | NuttX 툴체인, 모의시험 + ROS (incl. MAVROS) |
| &emsp;px4-dev-raspi             | 라즈베리 파이 툴체인                          |
| &emsp;px4-dev-snapdragon        | 퀄컴 스냅드래곤 비행 툴체인                      |
| &emsp;px4-dev-clang             | clang 도구                             |
| &emsp;&emsp;px4-dev-nuttx-clang | clang과 NuttX 도구                      |


`px4io/px4-dev-nuttx:latest`와 같이 `latest` 태그를 활용하면 가장 최근의 버전에 접근할 수 있습니다. (가용 태그는 *hub.docker.com*의 각 컨테이너에 들어있습니다. 예를 들면, [여기](https://hub.docker.com/r/px4io/px4-dev-nuttx/tags)에서는, *px4-dev-ros*태그를 찾아볼 수 있습니다).

> **Tip** 보통 최근의 컨테이너를 활용해야 하나, 최신이 필요한 것은 아닙니다(변경이 너무 자주 일어나기 때문).


## 도커 컨테이너 활용

다음 절차는 도커 컨테이너에서 실행하는 툴체인으로 호스트 컴퓨터에서 PX4 소스 코드를 빌드하는 방법을 보여줍니다. PX4 소스 코드를 다음과 같이 **src/Firmware**에 이미 다운로드했음을 가정합니다:

```sh
mkdir src
cd src
git clone https://github.com/PX4/PX4-Autopilot.git
cd PX4-Autopilot
```

### 보조 스크립트(docker_run.sh)

컨테이너를 활용하는 가장 쉬운 방법은 [docker_run.sh](https://github.com/PX4/PX4-Autopilot/blob/master/Tools/docker_run.sh) 보조 스크립트를 활용한 방법입니다. 이 스크립트는 PX4 빌드 명령을 인자 값으로 취합니다 (예: `make tests`). 명령을 통해 (하드 코딩한) 적절한 최근 버전의 컨테이너와 적당한 환경 설정 값으로 도커를 시작합니다.

예를 들어, SITL을 빌드하려면 다음 명령을 (**/PX4-Autopilot**  디렉터리에서) 실행하십시오:

```sh
./Tools/docker_run.sh 'make px4_sitl_default'
```
또는 NuttX 툴체인으로 배시 세션을 시작하려면:
```
./Tools/docker_run.sh 'bash'
```

> **Tip** *도커*에 대해 더 많이 알 필요도 없거니와 컨테이너가 뭘 활용하는지 생각할 필요가 없기 때문에 스크립트를 활용하시는 편이 쉽습니다. 그러나 일부분은 온전하지 않습니다! [아래 절](#manual_start)에서 다루는 내용을 통해 직접 접근하는 방식이 훨씬 유연하며, 스크립트에 어떤 문제가 있다면 오히려 아래와 같은 방식을 따라야합니다.

<a id="manual_start"></a>

### 도커 직접 호출

보통 사용하는 명령의 문법은 다음과 같습니다. 이 명령은 X 포워딩을 지원하는 도커 컨테이너를 실행합니다(컨테이너에서 모의시험 GUI 환경을 사용할 수 있습니다). 컴퓨터의 `<host_src>` 디렉터리를 컨테이너의 `<container_src>` 디렉터리로 대응하며 *QGroundControl*에 연결할 UDP 포트 데이터를 전달합니다. `-–privileged` 옵션을 사용하면 호스트의 장치(예: 조이스틱, CPU)에 자동으로 접근합니다. 장치를 연결하거나 장치의 연결을 해제하고 나면 컨테이너를 다시 시작해야합니다.

```sh
# enable access to xhost from the container
xhost +

# Run docker
docker run -it --privileged \
    --env=LOCAL_USER_ID="$(id -u)" \
    -v <host_src>:<container_src>:rw \
    -v /tmp/.X11-unix:/tmp/.X11-unix:ro \
    -e DISPLAY=:0 \
    -p 14570:14570/udp \
    --name=<local_container_name> <container>:<tag> <build_command>
```
여기서,
* `<host_src>`: 컨테이너의 `<container_src>` 디렉터리에 대응할 호스트 컴퓨터의 디렉터리입니다. 보통 **Firmware** 디렉터리입니다.
* `<container_src>`: 컨테이너에 들어있는 공유 (소스) 디렉터리의 위치입니다.
* `<local_container_name>`: 만들어 둔 도커 컨테이너의 이름입니다. 컨테이너를 나중에 다시 참조해야 할 때 활용할 수 있습니다.
* `<container>:<tag>`: 시작할 컨테이너 이름과 버전입니다. 예시: `px4io/px4-dev-ros:2017-10-23`
* `<build_command>`: 새 컨테이너에서 실행할 명령입니다. 예: `bash`는 컨테이너의 배시 셸을 여는데 사용하는 명령입니다.

아래의 보강 예제에서는 호스트 컴퓨터에서 배시 셸을 열고 **~/src/PX4-Autopilot**  디렉터리를 공유하는 방법을 보여줍니다.
```sh
# enable access to xhost from the container
xhost +

# Run docker and open bash shell
docker run -it --privileged \
--env=LOCAL_USER_ID="$(id -u)" \
-v ~/src/PX4-Autopilot:/src/PX4-Autopilot/:rw \
-v /tmp/.X11-unix:/tmp/.X11-unix:ro \
-e DISPLAY=:0 \
-p 14570:14570/udp \
--name=mycontainer px4io/px4-dev-ros:2017-10-23 bash
```

모든 과정이 잘 넘어갔다면 새 배시 셸 상태에 있어야 합니다. 모든 요소가 제대로 동작하는지 검증하십시오. SITL을 예를 들자면:

```sh
cd src/PX4-Autopilot    #This is <container_src>
make px4_sitl_default gazebo
```


### 컨테이너 재진입

`docker run` 명령은 새 컨테이너를 만들 때만 사용합니다. 이 컨테이너로 돌아가려면 (바뀐 내용은 그대로 유지) 다음 명령을 실행하십시오:

```sh
# start the container
docker start container_name
# open a new bash shell in this container
docker exec -it container_name bash
```

컨테이너에 여러 셸을 연결해야 한다면, 새 셸을 열고 마지막 명령을 다시 실행하기만 하면 됩니다.

### 컨테이너 정리

때로는 컨테이너를 함께 지워야 할 경우가 있습니다. 컨테이너 이름을 다음과 같이 붙이면 지울 수 있습니다:
```sh
docker rm mycontainer
```
이름을 기억할 수 없다면, 비활성 컨테이너 ID를 조회한 후 다음과 같이 삭제하십시오:
```sh
docker ps -a -q
45eeb98f1dd9
docker rm 45eeb98f1dd9
```

### QGroundControl

도커 컨테이너에서 SITL과 같은 모의시험 인스턴스를 실행하고 호스트에서  *QGroundControl*로 제어할 때, 통신 링크는 직접 설정해야합니다. 여기서 *QGroundControl*의 자동 연결 기능은 동작하지 않습니다.

*QGroundControl*에서 [설정](https://docs.qgroundcontrol.com/en/SettingsView/SettingsView.html)을 찾아 Comm 연결을 선택하십시오. UDP 프로토콜을 사용할 새 링크를 만드십시오. 포트 번호는 [설정](https://github.com/PX4/PX4-Autopilot/blob/master/ROMFS/px4fmu_common/init.d-posix/rcS) 에서 사용 여부에 따라 다릅니다(예: SITL 설정에서는 14570번을 사용). IP 주소는 도커 컨테이너 중 하나를 나타냅니다. 보통 기본 네트워크 설정을 활용한다면 172.17.0.1/16입니다. 도커 컨테이너의 IP 주소는 다음 명령으로 확인할 수 있습니다(컨테이너 이름은 `mycontainer`로 가정합니다):

```sh
$ docker inspect -f '{ {range .NetworkSettings.Networks}}{ {.IPAddress}}{ {end}}' mycontainer
```
> **Note** 이중 중괄호 사이에 공백문자를 두어서는 안됩니다(gitbook의 인터페이스 렌더링 문제로 일부러 빈칸을 두었습니다).


### 문제 해결

#### 권한 오류

컨테이너에서는 기본 사용자 권한으로 필요한 파일을 만듭니다. 보통 기본 사용자는 "root"입니다. 이렇게 하면 호스트 컴퓨터의 사용자가 컨테이너에서 만든 파일에 접근할 수 없는 권한 오류가 나타납니다.

위 예제에서는 호스트 사용자와 동일한 UID로 컨테이너의 사용자를 만들 때 `--env=LOCAL_USER_ID="$(id -u)"` 행을 활용합니다. 이 명령을 사용하면 호스트에서 컨테이너에 만든 모든 파일을 접근할 수 있습니다.


#### 그래픽 드라이버 문제

가제보 실행시 다음과 같은 오류 메시지가 나타날 수 있습니다:

```sh
libGL error: failed to load driver: swrast
```

이 경우 호스트 시스템에 자체 그래픽 드라이버를 설치해야 합니다. 올바른 드라이버를 다운로드하시고 컨테이너 내부에 설치하십시오. 엔비디아 드라이버의 경우 다음 명령을 사용합니다(그렇지 않으면 호스트에서 불러온 모듈을 설치 관리자가 찾아내어 과정 진행을 거절합니다):

```sh
./NVIDIA-DRIVER.run -a -N --ui=none --no-kernel-module
```

더 많은 정보는 [여기](http://gernotklingler.com/blog/howto-get-hardware-accelerated-opengl-support-docker/)에서 찾을 수 있습니다.

<a id="virtual_machine"></a>

## 가상 머신 지원

최근 리눅스 배포판이라면 동작해야 합니다.

다음 설정을 시험했습니다:

  * OS X VMWare Fusion 환경에 Ubuntu 14.04 설치(GUI 지원 도커 컨테이너 병렬 실행시 X-Server 치명 오류 발생).

**메모리**

가상 머신에 최소한 4GB 용량의 메모리를 할당하십시오.

**컴파일 문제**

다음 오류로 컴파일에 실패했을 경우:

```sh
The bug is not reproducible, so it is likely a hardware or OS problem.
c++: internal compiler error: Killed (program cc1plus)
```

병렬 빌드가 아닌 단일 빌드로 진행해보십시오.

**가상 머신 호스트에서 도커 제어 허용**

`/etc/defaults/docker` 파일을 편집하여 다음 줄을 추가하십시오:

```sh
DOCKER_OPTS="${DOCKER_OPTS} -H unix:///var/run/docker.sock -H 0.0.0.0:2375"
```

이제 호스트 운영체제에서 도커를 제어할 수 있습니다:

```sh
export DOCKER_HOST=tcp://<ip of your VM>:2375
# run some docker command to see if it works, e.g. ps
docker ps
```

