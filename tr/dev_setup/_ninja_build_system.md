---
canonicalUrl: https://docs.px4.io/main/tr/dev_setup/_ninja_build_system
---

## Ninja Build System

[Ninja](https://ninja-build.org/) is a faster build system than *Make* and the PX4 *CMake* generators support it.

On Ubuntu Linux you can install this automatically from normal repos.

```sh
sudo apt-get install ninja-build -y
```

Other systems may not include Ninja in the package manager. In this case an alternative is to download the binary and add it to your path:

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
