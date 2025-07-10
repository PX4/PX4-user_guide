---
canonicalUrl: https://docs.px4.io/main/ko/test_and_ci/docker
---

# PX4 도커 컨테이너

도커 컨테이너는 NuttX와 리눅스 기반 하드웨어 [가제보 모의시험](../simulation/gazebo.md), [ROS](../simulation/ros_interface.md)가 들어있는 완전한 [PX4 개발 툴체인](../dev_setup/dev_env.md#supported-targets)을 제공합니다.

이 주제에서는 로컬 리눅스 컴퓨터에서 빌드 환경에 접근할 수 있는 [가용 도커 컨테이너](#px4_containers) 활용법을 알려드리도록 하겠습니다.

:::note
Dockerfile 과 README 는 [이 곳 Github](https://github.com/PX4/containers/blob/master/README.md)에 있습니다. 이 파일은 [도커 허브](https://hub.docker.com/u/px4io/)에 자동으로 만들어줍니다.
:::

## 준비 요건

:::note PX4 컨테이너는 현재 리눅스만 지원합니다(리눅스를 설치하지 않았다면 [가상 머신에서](#virtual_machine) 컨테이너를 실행할 수 있습니다). X 서버가 들어있지 않으므로 기본 리눅스 이미지에서 `boot2docker`를 실행하지 마십시오
:::

기본 설치시 *도커*를 루트 사용자로 실행해야 합니다(예: `sudo` 활용). 그러나 PX4 펌웨어를 빌드하려면 [비 루트 사용자 계정으로 도커를 실행](https://docs.docker.com/install/linux/linux-postinstall/#manage-docker-as-a-non-root-user) 하시는게 좋습니다.

가용 컨테이너는 아래와 같습니다([Github](https://github.com/PX4/containers/blob/master/README.md#container-hierarchy)에 있음):

```sh
curl -fsSL get.docker.com -o get-docker.sh
sudo sh get-docker.sh
```

`px4io/px4-dev-nuttx:latest`와 같이 `latest` 태그를 활용하면 가장 최근의 버전에 접근할 수 있습니다. (가용 태그는 *hub.docker.com*의 각 컨테이너에 들어있습니다. 예를 들면, [여기](https://hub.docker.com/r/px4io/px4-dev-nuttx/tags)에서는, *px4-dev-ros*태그를 찾아볼 수 있습니다). 이렇게 하면, 도커를 활용하면서 빌드 폴더를 루트 소유로 만들지 않습니다.

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

컨테이너를 활용하는 가장 쉬운 방법은 [docker_run.sh](https://github.com/PX4/PX4-Autopilot/blob/master/Tools/docker_run.sh) 보조 스크립트를 활용한 방법입니다. 이 스크립트는 PX4 빌드 명령을 인자 값으로 취합니다 (예: `make tests`). For example, below you can see that the docker container with nuttx build tools (`px4-dev-nuttx-focal`) does not include ROS 2, while the simulation containers do:

- px4io/px4-dev-base-focal
  - px4io/px4-dev-nuttx-focal
  - px4io/px4-dev-simulation-focal
    - px4io/px4-dev-ros-noetic
    - px4io/px4-dev-ros2-foxy


:::tip
보통 최근의 컨테이너를 활용해야 하나, 최신이 필요한 것은 아닙니다 (변경이 너무 자주 일어나기 때문).
:::

다음 절차는 도커 컨테이너에서 실행하는 툴체인으로 호스트 컴퓨터에서 PX4 소스 코드를 빌드하는 방법을 보여줍니다. PX4 소스 코드를 다음과 같이 **src/PX4-Autopilot**에 이미 다운로드했음을 가정합니다:

## 도커 컨테이너 활용

보통 사용하는 명령의 문법은 다음과 같습니다. 이 명령은 X 포워딩을 지원하는 도커 컨테이너를 실행합니다(컨테이너에서 모의시험 GUI 환경을 사용할 수 있습니다).

```sh
mkdir src
cd src
git clone https://github.com/PX4/PX4-Autopilot.git
cd PX4-Autopilot
```

### 보조 스크립트(docker_run.sh)

The easiest way to use the containers is via the [docker_run.sh](https://github.com/PX4/PX4-Autopilot/blob/master/Tools/docker_run.sh) helper script. This script takes a PX4 build command as an argument (e.g. `make tests`). It starts up docker with a recent version (hard coded) of the appropriate container and sensible environment settings.

아래의 보강 예제에서는 호스트 컴퓨터에서 배시 셸을 열고 **~/src/PX4-Autopilot**  디렉터리를 공유하는 방법을 보여줍니다.

```sh
./Tools/docker_run.sh 'make px4_sitl_default'
```
Or to start a bash session using the NuttX toolchain:
```
./Tools/docker_run.sh 'bash'
```

`docker run` 명령은 새 컨테이너를 만들 때만 사용합니다. 이 컨테이너로 돌아가려면 (바뀐 내용은 그대로 유지) 다음 명령을 실행하십시오: 컴퓨터의 `<host_src>` 디렉터리를 컨테이너의 `<container_src>` 디렉터리로 대응하며 *QGroundControl*에 연결할 UDP 포트 데이터를 전달합니다. `-–privileged` 옵션을 사용하면 호스트의 장치(예: 조이스틱, CPU)에 자동으로 접근합니다.

<a id="manual_start"></a>

### 도커 직접 호출

The syntax of a typical command is shown below. This runs a Docker container that has support for X forwarding (makes the simulation GUI available from inside the container). It maps the directory `<host_src>` from your computer to `<container_src>` inside the container and forwards the UDP port needed to connect *QGroundControl*. With the `-–privileged` option it will automatically have access to the devices on your host (e.g. a joystick and GPU). If you connect/disconnect a device you have to restart the container.

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
아래의 보강 예제에서는 호스트 컴퓨터에서 배시 셸을 열고 **~/src/PX4-Autopilot**  디렉터리를 공유하는 방법을 보여줍니다.
* `<host_src>`: The host computer directory to be mapped to `<container_src>` in the container. This should normally be the **PX4-Autopilot** directory.
* `<container_src>`: The location of the shared (source) directory when inside the container.
* `<local_container_name>`: A name for the docker container being created. This can later be used if we need to reference the container again.
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

