---
canonicalUrl: https://docs.px4.io/main/zh/dev_setup/_ninja_build_system
---

## Ninja 构建系统

[Ninja](https://ninja-build.org/) is a faster build system than *Make* and the PX4 *CMake* generators support it.

在 Ubuntu Linux 上你从软件仓库中自动安装该构建系统。

```sh
sudo apt-get install ninja-build -y
```

Other systems may not include Ninja in the package manager. In this case an alternative is to download the binary and add it to your path: 这种情况下你可以下载二进制文件然后将其加入操作系统的环境变量中：

```sh
mkdir -p $HOME/ninja
cd $HOME/ninja
wget https://github.com/martine/ninja/releases/download/v1.6.0/ninja-linux.zip
unzip ninja-linux.zip
rm ninja-linux.zip
exportline="export PATH=$HOME/ninja:\$PATH"
if grep -Fxq "$exportline" ~/.profile; then echo nothing to do ; else echo $exportline >> ~/.profile; fi
. ~/.profile ~/.profile
```
