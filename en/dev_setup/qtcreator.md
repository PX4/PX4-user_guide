---
canonicalUrl: https://docs.px4.io/main/en/dev_setup/qtcreator
---

# Qt Creator IDE

:::warning
Qt Creator has been replaced by [VSCode](../dev_setup/vscode.md) as the officially supported (and recommended) IDE for PX4 development.
:::

[Qt Creator](https://www.qt.io/download-open-source) is a popular cross-platform open-source IDE that can be used to compile and debug PX4.

## Qt Creator Functionality

Qt creator offers clickable symbols, auto-completion of the complete codebase and building and flashing firmware.

![](../../assets/toolchain/qtcreator.png)

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

That's it! Start *Qt Creator*, then complete the steps in the video below to set up the project to build.

@[youtube](https://www.youtube.com/watch?v=0pa0gS30zNw&rel=0&vq=hd720)
