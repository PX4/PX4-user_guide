---
canonicalUrl: https://docs.px4.io/main/ko/test_and_ci/docker
---

# PX4 도커 컨테이너

도커 컨테이너는 NuttX 및 Linux 기반 하드웨어, [Gazebo 시뮬레이션](../simulation/gazebo.md) 및 [ROS](../simulation/ros_interface.md)를 포함한 전체 [PX4 개발 툴체인](../dev_setup/dev_env.md#supported-targets)을 제공됩니다.

[도커 컨테이너](#px4_containers)를 사용하여 Linux 컴퓨터에서 빌드하는 방법을 설명합니다.

:::note
Dockerfile와 README는 [Github](https://github.com/PX4/containers/blob/master/README.md)에서 찾을 수 있습니다. [Docker Hub](https://hub.docker.com/u/px4io/)에서 자동으로 빌드됩니다.
:::

## 전제 조건

:::note PX4 컨테이너는 현재 Linux만 지원됩니다(Linux가 없는 경우 [가상 머신](#virtual_machine)에서 컨테이너를 실행할 수 있음). 기본 Linux 이미지에는 X-Server가 포함되어 있지 않으므로, `boot2docker`를 사용하지 마십시오.
:::

Linux 컴퓨터에 [Docker를 설치](https://docs.docker.com/installation/)합니다. 가급적이면 Docker에서 유지 관리하는 패키지 저장소를 사용하여 최신 안정 버전을 다운로드 하십시오. *엔터프라이즈 에디션* 또는 (무료) *커뮤니티 에디션*을 사용할 수 있습니다.

*Ubuntu*에 비프로덕션 설정을 로컬로 설치하는 경우 Docker를 설치하는 가장 빠르고 쉬운 방법은 아래와 같이 [편리한 스크립트](https://docs.docker.com/install/linux/docker-ce/ubuntu/#install-using-the-convenience-script)를 사용하는 것입니다(대체 설치 방법은 같은 페이지):

```sh
curl -fsSL get.docker.com -o get-docker.sh
sudo sh get-docker.sh
```

기본 설치에서는 루트 사용자로 *Docker*를 호출하여야 합니다(예: `sudo` 사용). However, for building the PX4 firmware we suggest to [use docker as a non-root user](https://docs.docker.com/install/linux/linux-postinstall/#manage-docker-as-a-non-root-user). 그렇게하면, docker를 사용한 후 빌드 폴더를 관리자가 소유하지 않습니다.

```sh
# Create docker group (may not be required)
sudo groupadd docker
# Add your user to the docker group.
sudo usermod -aG docker $USER
# Log in/out again before using docker!
```


<a id="px4_containers"></a>

## 컨테이너 계층

The available containers are on [Github here](https://github.com/PX4/PX4-containers/blob/master/README.md#container-hierarchy).

이를 통하여 다양한 빌드 대상 및 구성을 테스트할 수 있습니다(포함된 도구는 이름에서 유추할 수 있음). 컨테이너는 상위 컨테이너의 기능을 갖도록 계층적입니다. 예를 들어, 아래에서 nuttx 빌드 도구(`px4-dev-nuttx-focal`)가 있는 도커 컨테이너에는 ROS 2가 포함되어 있지 않지만, 시뮬레이션 컨테이너에는 포함되어 있습니다.

- px4io/px4-dev-base-focal
  - px4io/px4-dev-nuttx-focal
  - px4io/px4-dev-simulation-focal
    - px4io/px4-dev-ros-noetic
    - px4io/px4-dev-ros2-foxy


가장 최신 버전은 `latest` 태그를 사용하여 액세스할 수 있습니다. `px4io/px4-dev-nuttx-bionic:latest` (사용 가능한 태그는 *hub.docker.com*의 각 컨테이너에 나열되어 있습니다.)
:::

:::tip
일반적으로 최근 컨테이너를 사용하여야 하지만 반드시 `최신 버전`일 필요는 없습니다(너무 자주 변경됨). PX4 소스 코드를 다음과 같이 **src/PX4-Autopilot**에 이미 다운로드했음을 가정합니다:

## 도커 컨테이너 활용

도커 컨테이너에서 실행되는 툴체인을 사용하여 호스트 컴퓨터에서 PX4 빌드 방법을 설명합니다. PX4 소스 코드를 **src/PX4-Autopilot**에 미리 다운로드하여야 합니다.

```sh
mkdir src
cd src
git clone https://github.com/PX4/PX4-Autopilot.git
cd PX4-Autopilot
```

### 보조 스크립트(docker_run.sh)

컨테이너를 사용하는 가장 쉬운 방법은 [docker_run.sh](https://github.com/PX4/PX4-Autopilot/blob/master/Tools/docker_run.sh) 도우미 스크립트를 사용하는 것입니다. 이 스크립트는 PX4 빌드 명령을 인수로 사용합니다(예: `make 테스트`). 적절한 컨테이너 및 합리적인 환경 설정의 최신 버전(하드 코딩됨)으로 도커를 시작합니다.

예를 들어, SITL을 빌드하려면 다음을 호출합니다(**/PX4-Autopilot** 디렉토리 내에서).

```sh
./Tools/docker_run.sh 'make px4_sitl_default'
```
또는 NuttX 도구 체인을 사용하여 bash 세션을 시작합니다.
```
./Tools/docker_run.sh 'bash'
```

:::tip
스크립트 실행시에 *Docker*에 대하여 자세하게 알 필요는 없습니다. 그러나, 특별히 견고하지는 않습니다! [아래 섹션](#manual_start)에 설명된 수동 접근 방식이 더 유연하며, 스크립트에 문제가 있는 경우에 사용합니다. `-–privileged` 옵션을 사용하면 호스트의 장치(예: 조이스틱, CPU)에 자동으로 접근합니다.

<a id="manual_start"></a>

### 도커 수동 호출

일반적인 명령어 구문은 다음과 같습니다. 이것은 X 포워딩을 지원하는 Docker 컨테이너를 실행합니다(컨테이너 내부에서 시뮬레이션 GUI를 사용할 수 있게 함). 컴퓨터의 디렉토리 `<host_src>`을 컨테이너 내부의 `<container_src>`으로 매핑하고, *QGroundControl*을 연결하는 데 필요한 UDP 포트를 전달합니다. `--privileged` 옵션을 사용하면 호스트의 장치(예: 조이스틱 및 GPU)에 자동으로 액세스할 수 있습니다. 장치를 연결/연결 해제하는 경우에는 컨테이너를 다시 시작하여야 합니다.

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
* `<host_src>`: 컨테이너에서 `<container_src>`에 매핑될 호스트 컴퓨터 디렉터리입니다. 이것은 일반적으로 **PX4-Autopilot** 디렉토리입니다.
* `<container_src>`: 컨테이너 내부에서 공유(소스) 디렉토리의 위치입니다.
* `<local_container_name>`: 생성 중인 도커 컨테이너의 이름입니다. 나중에 컨테이너를 다시 참조해야 하는 경우에 사용할 수 있습니다.
* `<container>:<tag>`: 시작할 버전 태그가 있는 컨테이너입니다(예: `px4io/px4-dev-ros:2017-10-23`).
* `<build_command>`: 새 컨테이너에서 호출할 명령어입니다. 예: `bash`는 컨테이너에서 bash 쉘을 실행합니다.

아래의 예는 호스트 컴퓨터에서 bash 셸을 열고, **~/src/PX4-Autopilot** 디렉터리를 공유하는 방법을 설명합니다.
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

모든 것이 잘 실행되면, 새로운 bash 쉘이 실행됩니다. 예를 들어 SITL을 실행하여 모든 것이 작동하는 지 확인하십시오.

```sh
cd src/PX4-Autopilot    #This is <container_src>
make px4_sitl_default gazebo
```


### 컨테이너 재진입

`docker run` 명령은 새 컨테이너를 생성합니다. 변경 사항을 유지하는 이 컨테이너로 돌아가려면 다음을 실행하십시오.

```sh
# start the container
docker start container_name
# open a new bash shell in this container
docker exec -it container_name bash
```

컨테이너에 연결된 여러 셸이 필요한 경우에는 새 셸을 열고 마지막 명령을 다시 실행합니다.

### 컨테이너 정리

때로는 컨테이너를 완전히 비워야 합니다. 이름을 사용하여 정리할 수 있습니다.
```sh
docker rm mycontainer
```
이름이 기억나지 않으면, 아래와 같이 비활성 컨테이너 ID를 나열한 다음 삭제합니다.
```sh
docker ps -a -q
45eeb98f1dd9
docker rm 45eeb98f1dd9
```

### QGroundControl

시뮬레이션 인스턴스를 실행시에는 도커 컨테이너 내부의 SITL과 호스트에서 *QGroundControl*을 통해 제어하려면 네트워크를 수동으로 설정하여야 합니다. *QGroundControl*에 자동으로 연결되지 않습니다.

*QGroundControl*에서 [설정](https://docs.qgroundcontrol.com/en/SettingsView/SettingsView.html)으로 이동하여 네트워크를 선택합니다. ::: ::: 포트는 사용된 [구성](https://github.com/PX4/PX4-Autopilot/blob/master/ROMFS/px4fmu_common/init.d-posix/rcS)에 따라 다릅니다. IP 주소는 도커 컨테이너 중 하나이며, 기본 네트워크는 172.17.0.1/16입니다. 도커 컨테이너의 IP 주소는 다음 명령으로 찾을 수 있습니다(컨테이너 이름이 `mycontainer`라고 가정).

```sh
$ docker inspect -f '{ {range .NetworkSettings.Networks}}{ {.IPAddress}}{ {end}}' mycontainer
```

:::note
위의 이중 중괄호 사이에는 공백이 없어야 합니다(gitbook에서 UI 렌더링 문제를 피하기 위해 필요함). 이렇게 하면 호스트 컴퓨터의 사용자가 컨테이너에서 만든 파일에 접근할 수 없는 권한 오류가 나타납니다.

### 문제 해결

#### 권한 에러

컨테이너는 기본 사용자(일반적으로 "루트") 계정으로 파일을 생성합니다. 이것 때문에, 호스트 컴퓨터의 사용자가 컨테이너에서 생성한 파일에 액세스할 수 없는 상황이 발생합니다.

위의 예는 `--env=LOCAL_USER_ID="$(id -u)"` 줄을 사용하여 호스트의 사용자와 동일한 UID를 가진 사용자를 컨테이너에 생성합니다. 이렇게 하면 컨테이너 내에서 생성된 모든 파일을 호스트에서 액세스할 수 있습니다.


#### 그래픽 드라이버 문제

Gazebo를 실행하면 다음과 같은 유사한 오류 메시지가 나타날 수 있습니다.

```sh
libGL error: failed to load driver: swrast
```

이 경우 호스트 시스템의 기본 그래픽 드라이버를 설치합니다. 올바른 드라이버를 다운로드하여 컨테이너 내부에 설치합니다. Nvidia 드라이버의 경우 다음 명령어를 사용합니다(그렇지 않으면 설치 프로그램이 호스트에서 로드된 모듈을 보고 진행을 거부합니다).

```sh
./NVIDIA-DRIVER.run -a -N --ui=none --no-kernel-module
```

이에 대한 자세한 내용은 [여기](http://gernotklingler.com/blog/howto-get-hardware-accelerated-opengl-support-docker/)를 참고하십시오.


<a id="virtual_machine"></a>

## 가상 머신 지원

최신 Linux 배포판에서는 정상적으로 작동하여야 합니다.

다음 설정은 테스트 되었습니다.

  * VMWare Fusion 및 Ubuntu 14.04가 포함된 OS X(Parallels에서 GUI를 지원하는 Docker 컨테이너로 인해 X-Server가 충돌함).

**메모리**

가상 머신에 최소 4GB 메모리를 사용하십시오.

**컴파일 문제**

다음과 같은 오류로 컴파일이 실패하는 경우:

```sh
The bug is not reproducible, so it is likely a hardware or OS problem.
c++: internal compiler error: Killed (program cc1plus)
```

병렬 빌드를 비활성화하십시오.

**VM 호스트에서 Docker 제어를 허용합니다.**

`/etc/defaults/docker`에 다음 줄을 추가합니다.

```sh
DOCKER_OPTS="${DOCKER_OPTS} -H unix:///var/run/docker.sock -H 0.0.0.0:2375"
```

이제 호스트 운영체제에서 도커를 제어할 수 있습니다:

```sh
export DOCKER_HOST=tcp://<ip of your VM>:2375
# run some docker command to see if it works, e.g. ps
docker ps
```

