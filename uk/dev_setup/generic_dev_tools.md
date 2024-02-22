# Загальні інструменти розробника

Цей розділ містить корисні додаткові інструменти розробки, які не є частиною основного інструментарію для збірки PX4.

## Програмне забезпечення наземного керування

Завантажте і встановіть [денну збірку QGroundControl](https://docs.qgroundcontrol.com/master/en/qgc-user-guide/releases/daily_builds.html).

:::tip
_Денна збірка_ включає інструменти розробки яких немає в релізних збірках. Вона також може надати доступ до нових функцій PX4, які ще не підтримуються в релізних збірках.
:::

![QGroundControl](../../assets/toolchain/qgc_goto.jpg)

## IDE / Редактори коду

Команда розробників рекомендує [Visual Studio Code (VSCode)](../dev_setup/vscode.md), популярне інтегроване середовище розробки з відкритим вихідним кодом. VSCode є "офіційно підтримуваним" IDE, в першу чергу тому, що є найпростішим IDE для налаштування та використання з PX4.

Наступні IDE також працюють (але не рекомендуються, якщо ви не є експертом):

- [Eclipse для C/C++](https://www.eclipse.org/downloads/eclipse-packages/): багатофункціональне IDE побудоване на Java
- [Sublime Text](https://www.sublimetext.com): Швидкий і невеликий текстовий редактор.
- [Qt Creator IDE](../dev_setup/qtcreator.md): Популярне крос-платформне IDE з відкритим кодом.

:::note
У дереві коду є [проєкт Eclipse ](https://github.com/PX4/PX4-Autopilot/blob/main/eclipse.project) та [проєкт Sublime](https://github.com/PX4/PX4-Autopilot/blob/main/Firmware.sublime-project).
:::
