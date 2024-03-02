# Qt Creator IDE

:::warning
Це середовище розробки [підтримується та утримується спільнотою](../advanced/community_supported_dev_env.md). Воно може працювати або не працювати з поточними версіями PX4.

Qt Creator було замінено на [VSCode](../dev_setup/vscode.md), який офіційно підтримується (і рекомендується) в якості IDE для розробки з PX4. Дивіться [Встановлення інструментарію](../dev_setup/dev_env.md) для отримання інформації про середовища та інструменти, які підтримуються основною командою розробників.
:::

[Qt Creator](https://www.qt.io/download-open-source) - це популярний IDE для багатьох платформ з відкритим вихідним кодом, який може бути використаний для компіляції та налагодження PX4.

## Функціональні можливості Qt Creator

Qt creator offers clickable symbols, auto-completion of the complete codebase and building and flashing firmware.

![Screenshot of Qt Creator](../../assets/toolchain/qtcreator.png)

The video below shows how it is used.

@[youtube](https://www.youtube.com/watch?v=Bkk8zttWxEI&rel=0&vq=hd720)

## IDE Setup

### Qt Creator on Linux

Before starting Qt Creator, the [project file](https://gitlab.kitware.com/cmake/community/-/wikis/doc/cmake/Generator-Specific-Information#codeblocks-generator) needs to be created:

```sh
cd ~/src/PX4-Autopilot
mkdir ../Firmware-build
cd ../Firmware-build
cmake ../PX4-Autopilot -G "CodeBlocks - Unix Makefiles"
```

Then load the CMakeLists.txt in the root PX4-Autopilot folder via **File > Open File or Project** (Select the CMakeLists.txt file).

After loading, the **play** button can be configured to run the project by selecting 'custom executable' in the run target configuration and entering 'make' as executable and 'upload' as argument.

### Qt Creator on Windows

:::note
Windows has not been tested for PX4 development with Qt Creator.
:::

### Qt Creator on Mac OS

Before starting Qt Creator, the [project file](https://gitlab.kitware.com/cmake/community/-/wikis/doc/cmake/Generator-Specific-Information#codeblocks-generator) needs to be created:

```sh
cd ~/src/PX4-Autopilot
mkdir -p build/creator
cd build/creator
cmake ../.. -G "CodeBlocks - Unix Makefiles"
```

That's it! Start _Qt Creator_, then complete the steps in the video below to set up the project to build.

@[youtube](https://www.youtube.com/watch?v=0pa0gS30zNw&rel=0&vq=hd720)
