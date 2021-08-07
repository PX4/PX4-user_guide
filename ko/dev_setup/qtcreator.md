# Qt Creator IDE

:::warning
Qt Creator는 PX4 개발에서 공식적으로 지원되고 권장되는 IDE인 [VSCode](../dev_setup/vscode.md)로 대체되었습니다.
:::

[Qt Creator](https://www.qt.io/download-open-source)는 PX4를 컴파일하고 디버그하는 데 사용할 수 있는 널리 사용되는 크로스 플랫폼 오픈 소스 IDE입니다.

## Qt Creator 기능

Qt Creator는 클릭 가능한 기호, 전체 코드베이스의 자동 완성, 펌웨어 빌드 및 플래싱을 제공합니다.

![](../../assets/toolchain/qtcreator.png)

아래 비디오는 사용 방법을 보여줍니다.

@[유투브](https://www.youtube.com/watch?v=Bkk8zttWxEI&rel=0&vq=hd720)

## IDE 설정

### 리눅스용 Qt Creator

Before starting Qt Creator, the [project file](https://gitlab.kitware.com/cmake/community/wikis/doc/cmake/Generator-Specific-Information#codeblocks-generator) needs to be created:

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

Before starting Qt Creator, the [project file](https://gitlab.kitware.com/cmake/community/wikis/doc/cmake/Generator-Specific-Information#codeblocks-generator) needs to be created:

```sh
cd ~/src/PX4-Autopilot
mkdir -p build/creator
cd build/creator
cmake ../.. -G "CodeBlocks - Unix Makefiles"
```

That's it! Start *Qt Creator*, then complete the steps in the video below to set up the project to build.

@[youtube](https://www.youtube.com/watch?v=0pa0gS30zNw&rel=0&vq=hd720)
