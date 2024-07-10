# Середовище розробки Arch Linux

:::warning
Це середовище розробки [підтримується та утримується спільнотою](../advanced/community_supported_dev_env). Воно може працювати або не працювати з поточними версіями PX4.

Дивіться [Встановлення інструментарію](../dev_setup/dev_env.md) для отримання інформації про середовища та інструменти, які підтримуються основною командою розробників.
:::

Репозиторій PX4-Autopilot надає зручний скрипт для налаштування вашого Arch для розробки з PX4: [Tools/setup/arch.sh](https://github.com/PX4/PX4-Autopilot/blob/release/1.15/Tools/setup/arch.sh). <!-- NEED px4_version -->

The script installs (by default) all tools to build PX4 for NuttX targets and run simulation with [JMAVSim](../sim_jmavsim/index.md). You can additionally install the [Gazebo Classic](../sim_gazebo_classic/index.md) simulator by specifying the command line argument: `--gazebo`.

![Gazebo на Arch](../../assets/simulation/gazebo_classic/arch-gazebo.png)

:::note
Ці інструкції були перевірені на [Manjaro](https://manjaro.org/) (дистрибутиві на основі Arch) тому що його набагато простіше встановити ніж Arch Linux.
:::

Щоб отримати та запустити скрипти, виконайте одне із наступного:

- [Завантажте вихідний код PX4](../dev_setup/building_px4.md) та запустіть скрипти на місці:

  ```sh
  git clone https://github.com/PX4/PX4-Autopilot.git
  bash PX4-Autopilot/Tools/setup/arch.sh
  ```

- Завантажте лише необхідні скрипти та запустіть їх:

  ```sh
  wget https://raw.githubusercontent.com/PX4/PX4-Autopilot/main/Tools/setup/arch.sh
  wget https://raw.githubusercontent.com/PX4/PX4-Autopilot/main/Tools/setup/requirements.txt
  bash arch.sh
  ```

Скрипт приймає наступні параметри:

- `--gazebo`: Додайте цей параметр для встановлення Gazebo з [AUR](https://aur.archlinux.org/packages/gazebo/).

:::note
Gazebo буде скомпільовано з вихідного коду. Це займає деякий час та потребує введення паролю `sudo` багато разів (для залежностей).
:::

- `--no-nuttx`: Не встановлювати інструментарій NuttX/Pixhawk (тобто тільки якщо використовувати симуляцію).
- `--no-sim-tools`: Не встановлювати jMAVSim/Gazebo (тобто якщо цільова платформа - Pixhawk/NuttX)
