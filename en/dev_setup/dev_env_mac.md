# Development Environment on Mac

MacOS is a supported development platform for PX4. The following instructions set up an environment for building:
* NuttX-based hardware (Pixhawk, etc.)
* jMAVSim Smulation
* Gazebo Simulation

> **Note** To build other targets see: [Toolchain Installation > Supported Targets](../setup/dev_env.md#supported-targets).

<span></span>
> **Tip** A video tutorial can be found here: [Setting up your PX4 development environment on macOS](https://youtu.be/tMbMGiMs1cQ).

## Homebrew Installation

The installation of Homebrew is quick and easy: [installation instructions](https://brew.sh).

## Enable more open files (Handle "LD: too many open files" error)

The PX4 toolchain requires the usage of the ZSH shell. If you are using the shell, add this line to your shell profile:

Create this file or append it: `~/.zshenv` and add this line:
```sh
ulimit -S -n 2048
```

## Ensuring Python points to Homebrew

If not already existing, create the file `~/.zshrc` and add these lines:

```sh
# Point python to python 3 from Homebrew
alias python=/usr/local/bin/python3
# Point pip to python 3 pip
alias pip=/usr/local/bin/pip3
```

## Common Tools

After installing Homebrew, run these commands in your shell to install the common tools:

```sh
brew tap PX4/px4
brew install px4-dev
```
Install the required Python packages

```sh
# install required packages using pip3
python3 -m pip install --user pyserial empy toml numpy pandas jinja2 pyyaml pyros-genmsg packaging
# if this fails with a permissions error, your Python install is in a system path - use this command instead:
sudo -H python3 -m pip install --user pyserial empy toml numpy pandas jinja2 pyyaml pyros-genmsg packaging
```

## Gazebo Simulation

To install SITL simulation with Gazebo:

```sh
brew cask install xquartz
brew install px4-sim-gazebo
```

## jMAVSim Simulation

To use SITL simulation with jMAVSim you need to install a recent version of Java (e.g. Java 14).
You can either download [Java 14 from Oracle](https://www.oracle.com/java/technologies/javase-jdk14-downloads.html) or use the AdoptOpenJDK tap:

```sh
brew tap AdoptOpenJDK/openjdk
brew cask install adoptopenjdk14
```

```sh
brew install px4-sim-jmavsim
```

> **Note** jMAVSim for PX4 v1.11 and earlier required Java 8.

## Additional Tools

See [Additional Tools](../setup/generic_dev_tools.md) for information about other useful development tools that are not part of the build toolchain (for example IDEs and GCSs).

## Next Steps

Once you have finished setting up the environment, continue to the [build instructions](../setup/building_px4.md).

