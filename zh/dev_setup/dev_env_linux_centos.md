# CentOS 上的开发环境

开发环境编译工作需要 Python 2.7.5 的支持，因此本文使用 CentOS 7 操作系统。 We hope to provide fully tested instructions with the supported toolchain in the near future. （如使用更早版本的 CentOS 则需要额外安装 python v2.7.5）。

The build requires Python 2.7.5. Therefore as of this writing Centos 7 should be used. (For earlier Centos releases a side-by-side install of python v2.7.5 may be done. But it is not recommended because it can break yum.)

## 通用依赖项

The EPEL repositories are required for openocd libftdi-devel libftdi-python

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

:::note
You may want to also install `python-pip` and `screen`.
:::

## GCC 工具链安装
<!-- import GCC toolchain common documentation -->
{% include "_ninja_build_system.md" %}


<!-- import docs ninja build system -->
{% include "_ninja_build_system.md" %}
