# Рухомі засоби Gazebo

Цей розділ перераховує/показує рухомі засоби, що підтримуються PX4 симуляцією [Gazebo](../sim_gazebo_gz/index.md), та команди `make` необхідні для того щоб їх запустити (команди запускаються з термінала в директорії **PX4-Autopilot**).

Моделі включені у PX4 як підмодуль який отримується з [Репозиторію моделей Gazebo](../sim_gazebo_gz/gazebo_models.md).

Типи рухомих засобів що підтримуються: мультиротор, ВЗІП, літак.

:::warning
Дивіться [Рухомі засоби Gazebo Classic](../sim_gazebo_classic/vehicles.md) для засобів, що працюють зі старішою [Симуляцією Gazebo "Classic"](../sim_gazebo_classic/index.md). Зверніть увагу, що моделі засобів не взаємозамінні між двома версіями симулятору: засоби на цій сторінці будуть працювати тільки з (новим) [Gazebo](../sim_gazebo_gz/index.md).
:::

## Мультикоптер

### Квадрокоптер X500

```sh
make px4_sitl gz_x500
```

### Квадрокоптер X500 з візуальною одометрією

```sh
make px4_sitl gz_x500_vision
```

![x500 in Gazebo](../../assets/simulation/gazebo/vehicles/x500.png)

### X500 Quadrotor with Depth Camera

These models have a depth camera attached, modelled on the OAK-D.

_Forward-facing depth camera:_

```sh
make px4_sitl gz_x500_depth
```

![x500 with depth camera in Gazebo](../../assets/simulation/gazebo/vehicles/x500_depth.png)

### X500 Quadrotor with Monocular Camera

This models has a simple monocular camera sensor attached (there is no physical camera visualization on the model itself).

```sh
make px4_sitl gz_x500_mono_cam
```

:::note
The camera cannot yet be used to stream video or for image capture in QGroundControl. [PX4-Autopilot#22563](https://github.com/PX4/PX4-Autopilot/issues/22563) can be used to track the additional work needed to fully enable these use cases.
:::

## Plane/Fixed-wing

### Standard Plane

```sh
make px4_sitl gz_rc_cessna
```

![Plane in Gazebo](../../assets/simulation/gazebo/vehicles/rc_cessna.png)

### Advanced Plane

```sh
make px4_sitl gz_advanced_plane
```

![Advanced Plane in Gazebo](../../assets/simulation/gazebo/vehicles/advanced_plane.png)

:::note
The difference between the Advanced Plane and the "regular plane" lies in the Lift Physics that the two models use:

- You can configure the _Advanced Lift Drag_ plugin used by the model to more closely match a particular vehicle using the [Advanced Lift Drag Tool](../sim_gazebo_gz/tools_avl_automation.md).
- For more detail on the lift calculations for the Advanced Plane, see [PX4-SITL_gazebo-classic/src/liftdrag_plugin/index.md](https://github.com/PX4/PX4-SITL_gazebo-classic/blob/20ded0757b4f2cb362833538716caf1e938b162a/src/liftdrag_plugin/index.md)

:::

## VTOL

### Standard VTOL

```sh
make px4_sitl gz_standard_vtol
```

![Standard VTOL in Gazebo Classic](../../assets/simulation/gazebo/vehicles/standard_vtol.png)
