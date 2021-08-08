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

기본 설치에서는 루트 사용자로 *Docker*를 호출하여야 합니다(예: `sudo` 사용). 그러나 PX4 펌웨어를 빌드하려면 [도커를 루트가 아닌 일반 사용자 계정을 사용](https://docs.docker.com/install/linux/linux-postinstall/#manage-docker-as-a-non-root-user)하는 것이 좋습니다. 그렇게하면, docker를 사용한 후 빌드 폴더를 관리자가 소유하지 않습니다.

```sh
# Create docker group (may not be required)
sudo groupadd docker
# Add your user to the docker group.
sudo usermod -aG docker $USER
# Log in/out again before using docker!
```

<a id="px4_containers"></a>

## 컨테이너 계층

사용 가능한 컨테이너는 [Github](https://github.com/PX4/containers/blob/master/README.md#container-hierarchy)에 있습니다.

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
* `<local_container_name>`: 생성 중인 도커 컨테이너의 이름입니다. 나중에 컨테이너를 다시 참조해야 하는 경우 사용할 수 있습니다.
* `<container>:<tag>`: The container with version tag to start - e.g.: `px4io/px4-dev-ros:2017-10-23`.
* `<build_command>`: The command to invoke on the new container. E.g. `bash` is used to open a bash shell in the container.

The concrete example below shows how to open a bash shell and share the directory **~/src/PX4-Autopilot** on the host computer.
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

도커 컨테이너에서 SITL과 같은 모의시험 인스턴스를 실행하고 호스트에서  *QGroundControl*로 제어할 때, 통신 링크는 직접 설정해야합니다. 여기서 *QGroundControl*의 자동 연결 기능은 동작하지 않습니다.

```sh
cd src/PX4-Autopilot    #This is <container_src>
make px4_sitl_default gazebo
```


### 컨테이너 재진입

The `docker run` command can only be used to create a new container. To get back into this container (which will retain your changes) simply do:

```sh
# start the container
docker start container_name
# open a new bash shell in this container
docker exec -it container_name bash
```

If you need multiple shells connected to the container, just open a new shell and execute that last command again.

### 컨테이너 정리

Sometimes you may need to clear a container altogether. You can do so using its name:
```sh
docker rm mycontainer
```
If you can't remember the name, then you can list inactive container ids and then delete them, as shown below:
```sh
docker ps -a -q
45eeb98f1dd9
docker rm 45eeb98f1dd9
```

### QGroundControl

이 경우 호스트 시스템에 자체 그래픽 드라이버를 설치해야 합니다. 올바른 드라이버를 다운로드하시고 컨테이너 내부에 설치하십시오.

:::note
이중 중괄호 사이에 공백문자를 두어서는 안됩니다(gitbook의 인터페이스 렌더링 문제로 일부러 빈칸을 두었습니다). ::: The port depends on the used [configuration](https://github.com/PX4/PX4-Autopilot/blob/master/ROMFS/px4fmu_common/init.d-posix/rcS) e.g. port 14570 for the SITL config. The IP address is the one of your docker container, usually 172.17.0.1/16 when using the default network. The IP address of the docker container can be found with the following command (assuming the container name is `mycontainer`):

```sh
$ docker inspect -f '{ {range .NetworkSettings.Networks}}{ {.IPAddress}}{ {end}}' mycontainer
```

컨테이너에서는 기본 사용자 권한으로 필요한 파일을 만듭니다. 보통 기본 사용자는 "root"입니다. 이렇게 하면 호스트 컴퓨터의 사용자가 컨테이너에서 만든 파일에 접근할 수 없는 권한 오류가 나타납니다.

### 문제 해결

#### 권한 오류

위 예제에서는 호스트 사용자와 동일한 UID로 컨테이너의 사용자를 만들 때 `--env=LOCAL_USER_ID="$(id -u)"` 행을 활용합니다. 이 명령을 사용하면 호스트에서 컨테이너에 만든 모든 파일을 접근할 수 있습니다.

The example above uses the line `--env=LOCAL_USER_ID="$(id -u)"` to create a user in the container with the same UID as the user on the host. This ensures that all files created within the container will be accessible on the host.


#### 그래픽 드라이버 문제

It's possible that running Gazebo will result in a similar error message like the following:

```sh
libGL error: failed to load driver: swrast
```

In that case the native graphics driver for your host system must be installed. Download the right driver and install it inside the container. For Nvidia drivers the following command should be used (otherwise the installer will see the loaded modules from the host and refuse to proceed):

```sh
./NVIDIA-DRIVER.run -a -N --ui=none --no-kernel-module
```

다음 오류로 컴파일에 실패했을 경우:

<a id="virtual_machine"></a>

## 가상 머신 지원

병렬 빌드가 아닌 단일 빌드로 진행해보십시오.

The following configuration is tested:

  * OS X with VMWare Fusion and Ubuntu 14.04 (Docker container with GUI support on Parallels make the X-Server crash).

**Memory**

Use at least 4GB memory for the virtual machine.

**Compilation problems**

동시 빌드가 아닌 단일 빌드로 진행해보십시오.

```sh
The bug is not reproducible, so it is likely a hardware or OS problem.
c++: internal compiler error: Killed (program cc1plus)
```

Try disabling parallel builds.

**Allow Docker Control from the VM Host**

이제 호스트 운영체제에서 도커를 제어할 수 있습니다:

```sh
DOCKER_OPTS="${DOCKER_OPTS} -H unix:///var/run/docker.sock -H 0.0.0.0:2375"
```

You can then control docker from your host OS:

```sh
export DOCKER_HOST=tcp://<ip of your VM>:2375
# run some docker command to see if it works, e.g. ps
docker ps
```

