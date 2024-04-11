# Рухомі засоби Gazebo Classic

Цей розділ перераховує/показує рухомі засоби, що підтримуються PX4 симуляцією [Gazebo Classic](../sim_gazebo_classic/README.md) та команди `make` необхідні для того щоб їх запустити (команди запускаються з термінала в директорії **PX4-Autopilot**).

Типи рухомих засобів що підтримуються включають: мультиротори, ВЗІП, ВЗІП з хвоста, літак, ровер, підводний човен/підводний дрон.

::: info
The [Gazebo Classic](../sim_gazebo_classic/index.md) page shows how to install Gazebo Classic, how to enable video and load custom maps, and many other configuration options.
:::

## Мультикоптери

### Квадрокоптер (за замовчуванням)

```sh
make px4_sitl gazebo-classic
```

### Квадрокоптер з оптичним потоком

```sh
make px4_sitl gazebo-classic_iris_opt_flow
```

### Квадрокоптер з камерою глибини

Ці моделі мають додану камеру глибини, змодельовану за зразком Intel® RealSense™ D455.

_Камера глибини орієнтована вперед:_

```sh
make px4_sitl gazebo-classic_iris_depth_camera
```

_Камера глибини орієнтована вниз:_

```sh
make px4_sitl gazebo-classic_iris_downward_depth_camera
```

### 3DR Solo (Квадрокоптер)

```sh
make px4_sitl gazebo-classic_solo
```

![3DR Solo в Gazebo Classic](../../assets/simulation/gazebo_classic/vehicles/solo.png)

### Typhoon H480 (Гексакоптер)

```sh
make px4_sitl gazebo-classic_typhoon_h480
```

![Typhoon H480 в Gazebo Classic](../../assets/simulation/gazebo_classic/vehicles/typhoon.jpg)

::: info
This target also supports [video streaming simulation](../sim_gazebo_classic/index.md#video-streaming).
:::

<a id="fixed_wing"></a>

## Літак/Фіксоване крило

### Стандартний літак

```sh
make px4_sitl gazebo-classic_plane
```

![Літак в Gazebo Classic](../../assets/simulation/gazebo_classic/vehicles/plane.png)

#### Стандартний літак із запуском з катапульти

```sh
make px4_sitl gazebo-classic_plane_catapult
```

Ця модель симулює запуск з рук/катапульти, що може бути використано для [зльоту літака](../flight_modes_fw/takeoff.md) в режимі сталої позиції, режимі автоматичного зльоту або політних завдань.

Літак буде автоматично запущено як тільки засіб буде в стані готовності.

## ВЗІП

### Стандартний ВЗІП

```sh
make px4_sitl gazebo-classic_standard_vtol
```

![Стандартний ВЗІП в Gazebo Classic](../../assets/simulation/gazebo_classic/vehicles/standard_vtol.png)

### ВЗІП з хвоста

```sh
make px4_sitl gazebo-classic_tailsitter
```

![ВЗІП з хвоста в Gazebo Classic](../../assets/simulation/gazebo_classic/vehicles/tailsitter.png)

<a id="ugv"></a>

## Безпілотний наземний засіб (Ровер/Автомобіль)

### Наземний засіб з трапецією Аккермана

```sh
make px4_sitl gazebo-classic_rover
```

![Ровер в Gazebo Classic](../../assets/simulation/gazebo_classic/vehicles/rover.png)

### Наземний засіб з диференціалом

```sh
make px4_sitl gazebo-classic_r1_rover
```

![Ровер в Gazebo Classic](../../assets/simulation/gazebo_classic/vehicles/r1_rover.png)

## Безпілотний підводний засіб(Підводний човен)

### HippoCampus TUHH

```sh
make px4_sitl gazebo-classic_uuv_hippocampus
```

![Підводний човен](../../assets/simulation/gazebo_classic/vehicles/hippocampus.png)

## Безпілотний надводний засіб (Човен)

<a id="usv_boat"></a>

### Човен

```sh
make px4_sitl gazebo-classic_boat
```

![Човен](../../assets/simulation/gazebo_classic/vehicles/boat.png)

<a id="airship"></a>

## Дирижабль

### Cloudship

```sh
make px4_sitl gazebo-classic_cloudship
```

![Дирижабль](../../assets/simulation/gazebo_classic/vehicles/airship.png)
