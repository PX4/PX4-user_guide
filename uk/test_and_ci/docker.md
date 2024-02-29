# Docker контейнери для PX4

Для повного [інструментарію розробника PX4](../dev_setup/dev_env.md#supported-targets)надаються Docker контейнери, включаючи апаратне забезпечення, основане на NuttX та Linux, симуляція [Gazebo Classic](../sim_gazebo_classic/README.md) та [ROS](../simulation/ros_interface.md).

Цей розділ розповідає як використовувати [Наявні docker контейнери](#px4_containers), щоб отримати доступ до середовища збірки на локальному Linux комп'ютері.

:::note
Ви можете знайти Dockerfile та README на [Github](https://github.com/PX4/containers/blob/master/README.md). Вони автоматично збираються на [Docker Hub](https://hub.docker.com/u/px4io/).
:::

## Необхідні умови

:::note
На цей момент контейнери для PX4 підтримуються лише для Linux (якщо немає Linux ви можете запустити контейнер [всередині віртуальної машини](#virtual_machine)). Не використовуйте `boot2docker` із образом за замовчуванням, тому що він не містить X-Server.
:::

[Встановіть Docker](https://docs.docker.com/installation/) для Linux, бажано використовувати один з репозиторіїв пакетів, які підтримуються Docker, щоб отримати останню стабільну версію. Ви можете використовувати або _Enterprise Edition_ або (безплатну) _Community Edition_.

Для локального встановлення для позавиробничих установок на _Ubuntu_, найшвидший і найпростіший спосіб встановити Docker - це скористатися [ зручним скриптом](https://docs.docker.com/install/linux/docker-ce/ubuntu/#install-using-the-convenience-script) як показано нижче (альтернативні методи встановлення вказані там же):

```sh
curl -fsSL get.docker.com -o get-docker.sh
sudo sh get-docker.sh
```

Встановлення за замовчуванням потребує використання root користувача для запуску _Docker_ (тобто за допомогою `sudo`). Однак для збірки прошивок PX4 пропонуємо [використовувати docker від імені непривілейованого користувача](https://docs.docker.com/install/linux/linux-postinstall/#manage-docker-as-a-non-root-user). Таким чином, директорія для збірки не буде належати користувачу root після використання docker.

```sh
# Створіть групу docker (можливо не потрібно)
sudo groupadd docker
# Додайте вашого користувача в групу docker.
sudo usermod -aG docker $USER
# Вийдіть та увійдіть перед використанням docker!
```

<a id="px4_containers"></a>

## Ієрархія контейнерів

Усі доступні контейнери можна знайти на [Github](https://github.com/PX4/PX4-containers/blob/master/README.md#container-hierarchy).

Вони дозволяють тестувати різні цілі збірки та конфігурації (включені інструменти можна зрозуміти з їх назв). Контейнери є ієрархічними, тобто такими, що мають функціональність вихідних контейнерів. Наприклад, часткова ієрархія нижче показує, що docker контейнер з  інструментами збірки nuttx (`px4-dev-nuttx-focal`) не містить ROS 2, на відміну від контейнерів симуляції:

```plain
- px4io/px4-dev-base-focal
  - px4io/px4-dev-nuttx-focal
  - px4io/px4-dev-simulation-focal
    - px4io/px4-dev-ros-noetic
      - px4io/px4-dev-ros2-foxy
  - px4io/px4-dev-ros2-rolling
- px4io/px4-dev-base-jammy
  - px4io/px4-dev-nuttx-jammy
```

Найновіша версія доступна з використанням тегу `latest`: `px4io/px4-dev-nuttx-focal:latest` (доступні теги перелічені для кожного контейнеру на _hub.docker.com_. Наприклад теги для `px4io/px4-dev-nuttx-focal` можна знайти [тут](https://hub.docker.com/r/px4io/px4-dev-nuttx-focal/tags?page=1&ordering=last_updated)).

:::tip
Зазвичай потрібно використовувати свіжий контейнер, але не обов'язково `latest` (т. як вони часто змінюються).
:::

## Використання Docker контейнера

Наступні інструкції показують, як зібрати вихідний код PX4 на основному комп'ютері за допомогою інструментарію, що працює у docker контейнері. Передбачається, що ви вже завантажили вихідний код PX4 в **src/PX4-Autopilot**, як показано:

```sh
mkdir src
cd src
git clone https://github.com/PX4/PX4-Autopilot.git
cd PX4-Autopilot
```

### Допоміжний скрипт (docker_run.sh)

Найпростіший спосіб використовувати контейнери - разом із допоміжним скриптом [docker_run.sh](https://github.com/PX4/PX4-Autopilot/blob/main/Tools/docker_run.sh). Цей скрипт приймає команду збірки PX4 як аргумент (наприклад, `make tests`). Він запускає docker із найновішою версією відповідного контейнера (вказано в коді) і слушними налаштуваннями середовища.

Наприклад, щоб зібрати SITL потрібно виконати (із директорії **/PX4-Autopilot**):

```sh
./Tools/docker_run.sh 'make px4_sitl_default'
```

Або почати сеанс bash використовуючи інструментарій NuttX:

```sh
./Tools/docker_run.sh 'bash'
```

:::tip
Цей скрипт легко використовувати тому що вам не потрібно знати багато про _Docker_ або думати який контейнер взяти. Однак він не дуже надійний! Ручний підхід, що обговорюється в [наступній частині](#manual_start) більш гнучкий і повинен використовуватися якщо є якісь проблеми зі скриптом.
:::

<a id="manual_start"></a>

### Запуск Docker вручну

Синтаксис типової команди показано нижче. Це запускає Docker контейнер з підтримкою переадресації X (що робить графічний інтерфейс симуляції доступним з середини контейнера). Каталог `<host_src>` комп'ютера відображається на каталог `<container_src>` всередині контейнера, а також переадресується UDP порт, потрібний для з'єднання з  _QGroundControl_. З параметром `-–privileged` контейнер автоматично матиме доступ до апаратного забезпечення на вашому комп'ютері  (наприклад до джойстика або GPU). Якщо ви під'єднуєте/від'єднуєте пристрій, вам слід перезапустити контейнер.

```sh
# дозвольте доступ до xhost з контейнера
xhost +

# запуск docker
docker run -it --privileged \
    --env=LOCAL_USER_ID="$(id -u)" \
    -v <host_src>:<container_src>:rw \
    -v /tmp/.X11-unix:/tmp/.X11-unix:ro \
    -e DISPLAY=:0 \
    -p 14570:14570/udp \
    --name=<local_container_name> <container>:<tag> <build_command>
```

Де:

- `<host_src>`: Директорія комп'ютера для відображення на директорію `<container_src>` у контейнері. Зазвичай потрібно щоб це була директорія **PX4-Autopilot**.
- `<container_src>`: Розташування спільної (вихідної) директорії всередині контейнера.
- `<local_container_name>`: Ім'я docker контейнера, що створюється. Це потім можна використовувати, якщо потрібно посилатись на контейнер знову.
- `<container>:<tag>`: Контейнер з тегом версії для запуску, наприклад: `px4io/px4-dev-ros:2017-10-23`.
- `<build_command>`: Команда яку потрібно виконати на новому контейнері. Наприклад, `bash` для запуску оболонки bash у контейнері.

Наведений нижче приклад показує як запустити консоль bash і розділити каталог **~/src/PX4-Autopilot** між контейнером і основним комп'ютером.

```sh
# дозвольте доступ до xhost з контейнера
xhost +

# запуск docker та оболонки bash
docker run -it --privileged \
--env=LOCAL_USER_ID="$(id -u)" \
-v ~/src/PX4-Autopilot:/src/PX4-Autopilot/:rw \
-v /tmp/.X11-unix:/tmp/.X11-unix:ro \
-e DISPLAY=:0 \
--network host \
--name=px4-ros px4io/px4-dev-ros2-foxy:2022-07-31 bash
```

:::note
Ми використовуємо режим прямого доступу до мережі основного комп'ютера (host network), щоб уникнути конфліктів контролю доступу до UDP портів при використанні QGroundControl у тій самій системі, що і docker контейнер.
:::

:::note
Якщо ви зіткнулися з помилкою "Can't open display: :0", можливо змінній `DISPLAY` потрібно встановити інше значення. На комп'ютерах з Linux (XWindow) ви можете змінити параметр `-e DISPLAY=:0` на `-e DISPLAY=$DISPLAY`. На інших системах вам можливо знадобиться послідовно змінити `0` в `-e DISPLAY=:0` допоки помилка "Can't open display: :0" не зникне.
:::

Якщо все пройшло добре, ви повинні бути в новій оболонці bash. Перевірте, чи все працює запустивши, наприклад, SITL:

```sh
cd src/PX4-Autopilot    #це <container_src>
make px4_sitl_default gazebo-classic
```

### Повторний вхід в контейнер

Команда `docker run` використовується тільки для створення нового контейнеру. Щоб повернутися у цей контейнер (що збереже ваші зміни) просто зробіть:

```sh
# запуск контейнера
docker start container_name
# запуск нової оболонки bash shell в цьому контейнері
docker exec -it container_name bash
```

Якщо вам потрібні кілька консолей, підключених до контейнера, просто відкрийте нову оболонку і виконайте останню команду знову.

### Видалення контейнера

Іноді може знадобитися взагалі видалити контейнер. Це можна зробити, використовуючи його ім'я:

```sh
docker rm mycontainer
```

Якщо ви не можете згадати назву, ви можете знайти неактивні ідентифікатори контейнерів і видалити їх, як показано нижче:

```sh
docker ps -a -q
45eeb98f1dd9
docker rm 45eeb98f1dd9
```

### QGroundControl

При виконанні екземпляра симуляції, напр. SITL всередині контейнерів і керування ним через _QGroundControl_ з основного комп'ютера, канали зв'язку потрібно встановити вручну. Функція автопідключення _QGroundControl_ тут не працює.

В _QGroundControl_, перейдіть до [Налаштувань](https://docs.qgroundcontrol.com/master/en/SettingsView/SettingsView.html) та оберіть Канали зв'язку. Створити новий канал, що використовує UDP-протокол. Номер порту залежить від використаних [налаштувань](https://github.com/PX4/PX4-Autopilot/blob/main/ROMFS/px4fmu_common/init.d-posix/rcS), наприклад порт 14570 для конфігурації SITL. The IP address is the one of your docker container, usually 172.17.0.1/16 when using the default network. The IP address of the docker container can be found with the following command (assuming the container name is `mycontainer`):

```sh
$ docker inspect -f '{ {range .NetworkSettings.Networks}}{ {.IPAddress}}{ {end}}' mycontainer
```

:::note
Spaces between double curly braces above should be not be present (they are needed to avoid a UI rendering problem in gitbook).
:::

### Troubleshooting

#### Permission Errors

The container creates files as needed with a default user - typically "root". This can lead to permission errors where the user on the host computer is not able to access files created by the container.

The example above uses the line `--env=LOCAL_USER_ID="$(id -u)"` to create a user in the container with the same UID as the user on the host. This ensures that all files created within the container will be accessible on the host.

#### Graphics Driver Issues

It's possible that running Gazebo Classic will result in a similar error message like the following:

```sh
libGL error: failed to load driver: swrast
```

In that case the native graphics driver for your host system must be installed. Download the right driver and install it inside the container. For Nvidia drivers the following command should be used (otherwise the installer will see the loaded modules from the host and refuse to proceed):

```sh
./NVIDIA-DRIVER.run -a -N --ui=none --no-kernel-module
```

More information on this can be found [here](http://gernotklingler.com/blog/howto-get-hardware-accelerated-opengl-support-docker/).

<a id="virtual_machine"></a>

## Virtual Machine Support

Any recent Linux distribution should work.

The following configuration is tested:

- OS X with VMWare Fusion and Ubuntu 14.04 (Docker container with GUI support on Parallels make the X-Server crash).

**Memory**

Use at least 4GB memory for the virtual machine.

**Compilation problems**

If compilation fails with errors like this:

```sh
The bug is not reproducible, so it is likely a hardware or OS problem.
c++: internal compiler error: Killed (program cc1plus)
```

Try disabling parallel builds.

**Allow Docker Control from the VM Host**

Edit `/etc/defaults/docker` and add this line:

```sh
DOCKER_OPTS="${DOCKER_OPTS} -H unix:///var/run/docker.sock -H 0.0.0.0:2375"
```

You can then control docker from your host OS:

```sh
export DOCKER_HOST=tcp://<ip of your VM>:2375
# run some docker command to see if it works, e.g. ps
docker ps
```
