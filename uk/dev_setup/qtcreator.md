# Qt Creator IDE

:::warning
Це середовище розробки [підтримується та утримується спільнотою](../advanced/community_supported_dev_env.md). Воно може працювати або не працювати з поточними версіями PX4.

Qt Creator було замінено на [VSCode](../dev_setup/vscode.md), який офіційно підтримується (і рекомендується) в якості IDE для розробки з PX4. Дивіться [Встановлення інструментарію](../dev_setup/dev_env.md) для отримання інформації про середовища та інструменти, які підтримуються основною командою розробників.
:::

[Qt Creator](https://www.qt.io/download-open-source) - це популярний IDE для багатьох платформ з відкритим вихідним кодом, який може бути використаний для компіляції та налагодження PX4.

## Функціональні можливості Qt Creator

Qt creator пропонує роботу із символами мови Сі за допомогою миші, автодоповнення для всієї бази коду, збірки та запису прошивки.

![Знімок екрану Qt Creator](../../assets/toolchain/qtcreator.png)

Наведене нижче відео показує, як воно використовується.

<lite-youtube videoid="Bkk8zttWxEI" title="(Qt Creator) PX4 Flight Stack Build Experience"/>

## Налаштування IDE

### Qt Creator на Linux

Перед запуском Qt Creator, потрібно створити [файл проєкту](https://gitlab.kitware.com/cmake/community/-/wikis/doc/cmake/Generator-Specific-Information#codeblocks-generator):

```sh
cd ~/src/PX4-Autopilot
mkdir ../Firmware-build
cd ../Firmware-build
cmake ../PX4-Autopilot -G "CodeBlocks - Unix Makefiles"
```

Потім завантажте файл CMakeLists.txt в кореневій директорії PX4-Autopilot через **File > Open File or Project** (Виберіть файл CMakeLists.txt).

Після завантаження, кнопку **play** можна налаштувати для запуску проєкту обравши 'користувацький виконуваний файл' у налаштуванні для цілі запуску та введені 'make' як виконуваного файлу та 'upload' як аргументу.

### Qt Creator на Windows

:::note
Windows не було протестовано для розробки PX4 з Qt Creator.
:::

### Qt Creator на macOS

Перед запуском Qt Creator, потрібно створити [файл проєкту](https://gitlab.kitware.com/cmake/community/-/wikis/doc/cmake/Generator-Specific-Information#codeblocks-generator):

```sh
cd ~/src/PX4-Autopilot
mkdir -p build/creator
cd build/creator
cmake ../.. -G "CodeBlocks - Unix Makefiles"
```

Ось і все! Start _Qt Creator_ and then set up the project to build.

<!-- note, video here was removed/made private, and in any case out of date. Just hoping people can work it out -->
