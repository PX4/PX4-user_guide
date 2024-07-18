# Qt Creator IDE

:::warning
This development environment is [community supported and maintained](../advanced/community_supported_dev_env.md). It may or may not work with current versions of PX4.

Qt Creator has been replaced by [VSCode](../dev_setup/vscode.md) as the officially supported (and recommended) IDE for PX4 development. See [Toolchain Installation](../dev_setup/dev_env.md) for information about the environments and tools supported by the core development team.
:::

[Qt Creator](https://www.qt.io/download-open-source)는 PX4를 컴파일하고 디버그하는 데 사용할 수 있는 널리 사용되는 크로스 플랫폼 오픈 소스 IDE입니다.

## Qt Creator 기능

Qt Creator는 클릭 가능한 기호, 전체 코드베이스의 자동 완성, 펌웨어 빌드 및 플래싱을 제공합니다.

![Screenshot of Qt Creator](../../assets/toolchain/qtcreator.png)

아래 비디오는 사용 방법을 보여줍니다.

<lite-youtube videoid="Bkk8zttWxEI" title="(Qt Creator) PX4 Flight Stack Build Experience"/>

## IDE 설정

### 리눅스용 Qt Creator

Before starting Qt Creator, the [project file](https://gitlab.kitware.com/cmake/community/-/wikis/doc/cmake/Generator-Specific-Information#codeblocks-generator) needs to be created:

```sh
cd ~/src/PX4-Autopilot
mkdir ../Firmware-build
cd ../Firmware-build
cmake ../PX4-Autopilot -G "CodeBlocks - Unix Makefiles"
```

그런 다음 루트 PX4-Autopilot 폴더에 CMakeLists.txt를 로드합니다. **파일 > 파일 또는 프로젝트 열기**(CMakeLists.txt 파일 선택).

로드 후 **재생** 버튼은 실행 대상 구성에서 '사용자 정의 실행 파일'을 선택하고, 실행 파일로 'make'를, 인수로 '업로드'를 입력하여 프로젝트를 실행하도록 설정할 수 있습니다.

### Windows용 Qt Creator

:::note
Windows는 Qt Creator를 사용한 PX4 개발에 대해 테스트되지 않았습니다.
:::

### Mac OS용 Qt Creator

Before starting Qt Creator, the [project file](https://gitlab.kitware.com/cmake/community/-/wikis/doc/cmake/Generator-Specific-Information#codeblocks-generator) needs to be created:

```sh
cd ~/src/PX4-Autopilot
mkdir -p build/creator
cd build/creator
cmake ../.. -G "CodeBlocks - Unix Makefiles"
```

설정이 종료되었습니다. Start _Qt Creator_ and then set up the project to build.

<!-- note, video here was removed/made private, and in any case out of date. Just hoping people can work it out -->
