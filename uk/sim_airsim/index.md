# Симуляція AirSim

:::warning
Цей симулятор [модифікується та підтримується спільнотою](../simulation/community_supported_simulators.md). Це може працювати або не працювати з поточними версіями PX4.

Див. [інструкцію з встановлення засобів розробки](../dev_setup/dev_env.md) для інформації про середовища та інструменти, підтримувані основним розробницьким колективом.
:::

[AirSim](https://microsoft.github.io/AirSim/) - це відкритий кросплатформовий симулятор для дронів, побудований на _Unreal Engine_. Він забезпечує фізично та візуально реалістичні симуляції Pixhawk/PX4, використовуючи або апаратну імітацію (HITL), або програмну імітацію (SITL).

<lite-youtube videoid="-WfTr1-OBGQ" title="AirSim Demo"/>

<!-- datestamp:video:youtube:20170216:AirSim Demo -->

## Налаштування PX4

[Налаштування PX4 для AirSim](https://microsoft.github.io/AirSim/px4_setup/) описує, як використовувати PX4 з AirSim за допомогою як [SITL](https://microsoft.github.io/AirSim/px4_sitl/), так і [HITL](https://microsoft.github.io/AirSim/px4_setup/#setting-up-px4-hardware-in-loop).

## Відео

#### AirSim з PX4 на WSL 2

<lite-youtube videoid="DiqgsWIOoW4" title="AirSim with PX4 on WSL 2"/>

<!-- datestamp:video:youtube:20210401:AirSim with PX4 on WSL 2 -->

:::note WSL
2 не є підтримуваним [середовищем розробки PX4 для Windows](../dev_setup/dev_env_windows_cygwin.md), в основному через те, що недосить просто відображати інтерфейси симуляторів, які працюють у WSL 2, у звичайному середовищі Windows. Це обмеження не стосується AirSim, оскільки його інтерфейс працює нативно у Windows.
:::

#### Microsoft AirSim: програми для досліджень і промисловості (Віртуальний саміт розробників PX4 2020)

<lite-youtube videoid="-YMiKaJYl44" title="Microsoft AirSim: Applications to Research and Industry"/>

<!-- datestamp:video:youtube:20200716:Microsoft AirSim: Applications to Research and Industry — PX4 Developer Summit Virtual 2020 -->

#### Автономні перевірки дронів за допомогою AirSim і PX4 (PX4 Developer Summit Virtual 2020)

<lite-youtube videoid="JDx0MPTlhrg" title="Autonomous Drone Inspections using AirSim and PX4"/>

<!-- datestamp:video:youtube:20200716:Autonomous Drone Inspections using AirSim and PX4 — PX4 Developer Summit Virtual 2020 -->

## Детальна інформація

- [Документація AirSim](https://microsoft.github.io/AirSim/)
- [Використання AirSim для моделювання інспекції літаків автономними дронами](https://gaas.gitbook.io/guide/case-study/using-airsim-to-simulate-aircraft-inspection-by-autonomous-drones) (випадковий аналіз з проєкту загальної автономії авіаційних систем (GAAS)).
