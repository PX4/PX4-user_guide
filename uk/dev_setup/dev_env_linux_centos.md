# Середовище розробки CentOS

:::warning
Це середовище розробки [підтримується та утримується спільнотою](../advanced/community_supported_dev_env.md). Воно може працювати або не працювати з поточними версіями PX4.

Дивіться [Встановлення інструментарію](../dev_setup/dev_env.md) для отримання інформації про середовища та інструменти, які підтримуються основною командою розробників.
:::

Збірка потребує Python 2.7.5. Тому потрібно використовувати CentOS 7 на момент написання. (Для попередніх релізів CentOS можна встановити python v2.7.5 поряд із версією із дистрибутиву. Але це не рекомендується тому що можна зламати yum.)

## Загальні залежності

Репозиторії EPEL необхідні для пакетів openocd libftdi-devel libftdi-python

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
Можливо вам може знадобитися встановити `python-pip` та `screen`.
:::

## Встановлення інструментарію GCC.

<!-- GCC toolchain documentation used for all Linux platforms to build NuttX -->

Виконайте скрипт нижче для встановлення GCC 7-2017-q4:

:::warning
Ця версія GCC застаріла. На момент написання поточна версія на Ubuntu `9-2020-q2-update` (дивіться [focal nuttx docker файл](https://github.com/PX4/PX4-containers/blob/master/docker/Dockerfile_nuttx-focal#L28))
:::

```sh
pushd .
cd ~
wget https://armkeil.blob.core.windows.net/developer/Files/downloads/gnu-rm/7-2017q4/gcc-arm-none-eabi-7-2017-q4-major-linux.tar.bz2
tar -jxf gcc-arm-none-eabi-7-2017-q4-major-linux.tar.bz2
exportline="export PATH=$HOME/gcc-arm-none-eabi-7-2017-q4-major/bin:\$PATH"
if grep -Fxq "$exportline" ~/.profile; then echo nothing to do ; else echo $exportline >> ~/.profile; fi
popd
```

Тепер перезавантажте комп'ютер.

**Усунення проблем**

Перевірте версію, ввівши наступну команду:

```sh
arm-none-eabi-gcc --version
```

Результат повинен бути схожий на:

```sh
arm-none-eabi-gcc (GNU Tools for Arm Embedded Processors 7-2017-q4-major) 7.2.1 20170904 (release) [ARM/embedded-7-branch revision 255204]
Copyright (C) 2017 Free Software Foundation, Inc.
This is free software; see the source for copying conditions.  There is NO
warranty; not even for MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
```

<!-- import docs ninja build system -->

## Система збірки Ninja

[Ninja](https://ninja-build.org/) є швидшою системою збірки ніж _Make_ й генератори коду PX4 _CMake_ підтримують її.

На Ubuntu Linux ви можете встановити її автоматично зі звичайних репозиторіїв.

```sh
sudo apt-get install ninja-build -y
```

Інші системи можуть не включати Ninja в менеджер пакетів. В цьому випадку альтернатива - завантажити бінарний файл і додати його до вашого шляху:

```sh
mkdir -p $HOME/ninja
cd $HOME/ninja
wget https://github.com/martine/ninja/releases/download/v1.6.0/ninja-linux.zip
unzip ninja-linux.zip
rm ninja-linux.zip
exportline="export PATH=$HOME/ninja:\$PATH"
if grep -Fxq "$exportline" ~/.profile; then echo nothing to do ; else echo $exportline >> ~/.profile; fi
. ~/.profile
```
