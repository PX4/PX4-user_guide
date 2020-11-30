# CentOS 上的开发环境

> **注意：**本指南尚未针对最近版本的 PX4 进行测试。 我们希望在不久的将来为本工具链提供经过全面测试的安装指南。

开发环境编译工作需要 Python 2.7.5 的支持，因此本文使用 CentOS 7 操作系统。 Therefore as of this writing Centos 7 should be used. （如使用更早版本的 CentOS 则需要额外安装 python v2.7.5）。 但并不建议这么做，因为这样会损坏 yum。）

## 通用依赖项

安装 openocd、libftdi-devel、libftdi-python 需要添加 EPEL 软件源：

```sh
wget https://dl.fedoraproject.org/pub/epel/7/x86_64/e/epel-release-7-5.noarch.rpm
sudo yum install epel-release-7-5.noarch.rpm
yum update
yum groupinstall “Development Tools”
yum install python-setuptools python-numpy
easy_install pyserial
easy_install pexpect
easy_install toml
easy_install pyyaml
easy_install cerberus
yum install openocd libftdi-devel libftdi-python python-argparse flex bison-devel ncurses-devel ncurses-libs autoconf texinfo libtool zlib-devel cmake vim-common
```

> **注意：** 你可能也还想安装 python-pip 和 screen。

## GCC 工具链安装
<!-- import GCC toolchain common documentation -->
{% include "_gcc_toolchain_installation.md" %}


<!-- import docs ninja build system -->
{% include "_ninja_build_system.md" %}
