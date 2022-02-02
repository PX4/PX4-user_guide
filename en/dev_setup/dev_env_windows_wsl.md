# Windows WSL-Based Development Environment

The following instructions explain how to set up a WSL2-based PX4 development environment on Windows 11.
This environment can be used to build PX4 for:
* Pixhawk and other NuttX-based hardware
* [jMAVSim Simulation](../simulation/jmavsim.md)
* [Gazebo Simulation](../simulation/gazebo.md)

:::tip
This setup is an currently an [unsupported windows development environment](../advanced/dev_env_unsupported.md).
:::

## Overview

### Advantages

- At the core it's using the well supported and tested Ubuntu development environment
- Now extra dual-boot or virtual machine hosting software needed
- Visual Studio Code for Windows works seamless with WSL in remote mode (see [instructions below](dev_env_windows_wsl.md#visual-studio-code-integration))

### Disadvantages

- QGC for Windows has to be manually connected to WSL simulation (see [instructions below](dev_env_windows_wsl.md#connect-qgroundcontrol-on-windows-to-wsl-simulation))<br>
Alternatively QGC for Linux can be run within WSL
- Direct serial MCU flashing doesn't work<br>
  Flashing can be done through QGC (see [instructions below](dev_env_windows_wsl.md#flash-a-flight-control-board))

### Requirements for Graphics Support

The requirement for any out of the box graphics support in WSL is [WSLg](https://github.com/microsoft/wslg).
It is included in WSL on all recent enough Windows versions namely all Windows 11 versions and a few recent enough insider Windows 10 builds.
Check the linked project GitHub page to read the latest availability.
If these requirements are not met then you can still build PX4, flash it to boards using QGC for Windows and run the simulation in headless mode. All windowed, graphics features like e.g. gazebo rendered visualization, QGC running in WSL, git gui, will not work without [WSLg](https://github.com/microsoft/wslg).

## Installation Instructions

### Install WSL2

To install WSL2 with the default Ubuntu distribution on a new installation of Windows 11:

1. Open _cmd.exe_ as administrator.
   Can be done by pressing the start key, typing "cmd", right klicking on the _Command prompt_ entry and selecting **Run as administrator**.
1. Execute the command `wsl --install` to run the installation routine for WSL.
1. Reboot the system.
1. Open `cmd` again as a normal user (not as administrator).
   This can be done by pressing the **Start** key, typing "cmd" and pressing **Enter**.
1. Execute the command `wsl` to access the WSL shell.
1. WSL will prompt you for a user name and password for the Ubuntu installation.
   **Note:** _Remember the credentials for later on!_

:::note
If you have any problems with your setup, check the current microsoft WSL installation documentation.
:::

### Install PX4 Toolchain

To install the development toolchain for Gazebo simulation, JMAVSim simulation and Pixhawk/NuttX harware:

1. Execute the command `cd ~` to switch to the home folder of WSL for the next steps.
   :::warning
   This is important!
   If you work from a location outside of the WSL file system you'll run into issues such as very slow execution and access right/permission errors.
   :::

1. [Download PX4 Source Code](../dev_setup/building_px4.md):
   ```bash
   git clone https://github.com/PX4/PX4-Autopilot.git --recursive
   ```
1. Run the **ubuntu.sh** installer script and acknowledge any prompts as the script progresses:
   ```bash
   bash ./PX4-Autopilot/Tools/setup/ubuntu.sh
   ```
   
   :::note
   This installs tools to build PX4 for Pixhawk, Gazebo and JMAVSim targets.
   - You can use the `--no-nuttx` and `--no-sim-tools` options to omit the NuttX and/or simulation tools.
   - Other Linux build targets are untested (you can try these by entering the appropriate commands in [Ubuntu Development Environment](../dev_setup/dev_env_linux_ubuntu.md) into the WSL shell.
     Note that `git` is already installed in WSL.
   
1. Restart the "WSL computer" on completion.
   ```
   wsl --shutdown
   ```
   (or do `exit` and reopen the prompt).

1. Execute command `wsl` to start WSL again and access the shell.
1. Execute `cd ~/PX4-Autopilot` to switch to the PX4 repository in the WSL home folder.
1. Execute `make px4_sitl` to build the PX4 SITL target and test your environment.


### Opening a WSL shell

To open the WSL shell (once WSL has been installed):

1. Press the Windows **Start** key.
1. Type "cmd" and press Enter to open a command prompt.
1. Execute the command `wsl` to access the WSL shell.


## Visual Studio Code Integration

1. Download and install Visual Studio Code on Windows from https://code.visualstudio.com/
2. Open _Visual Studio Code_.
3. Install the extension called [Remote - WSL](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-wsl) (marketplace) 
4. [Open a WSL shell](dev_env_windows_wsl.md#opening-a-wsl-shell)
5. Switch to the PX4 folder: `cd ~/PX4-Autopilot`
6. Open this folder with WSL integration in Visual Studio Code `code .`
7. Now you have the full IDE integration with Terminal, make sure you always open the PX4 repository in the Remote WSL mode.
   It will be available in your recently opened locations whenever you start VS Code.

## QGroundControl

You can run QGroundControl in either WSL or Windows to connect to the running simulation.
If you need to [flash a flight control board](#flash-a-flight-control-board) with new firmware you can only do this from the QGroundControl for Windows.

### QGroundControl in WSL

The easiest way to set up and use QGroundControl is to download the Linux version into your WSL.
This will automatically connect to a running simulation and allow you to monitor and control your vehicle(s).

You will not be able to use it to install PX4 firmware because WSL does not allow access to serial devices.


### QGroundcontrol on Windows

Install QGroundControl on Windows if you want to be able to update hardware with firmware created within PX4.

These steps describe how you can connect to the simulation running in the WSL.

1. [Open a WSL shell](dev_env_windows_wsl.md#opening-a-wsl-shell)
2. Check what IP address it received using the command `ip address` and copy it to clipboard by selecting the IP and using the shortcut [Ctrl] + [Shift] + [C].
3. In QGC go to **Q > Application Settings > Comm Links**
4. Add a UDP Link called "WSL" to port 18570 of the IP address copied before.
5. Save it and connect to it.
Note: This has to be repeated when WSL restarts because it gets a dynamic IP address.

## Flash a Flight Control Board

Flashing a custom built PX4 binary has to be done using QGroundControl for Windows since WSL2 does not natively offer direct access to serial devices like Pixhawk boards.

Do the following steps to flash your custom binary built in WSL:

1. If you haven't already build the binary in WSL e.g. with a [WSL shell](dev_env_windows_wsl.md#opening-a-wsl-shell) and by running:
   ```
   cd ~/PX4-Autopilot
   make px4_fmu-v5
   ```
   Note: Use the correct target for your board. "fmu-v5" can be used for a Pixhawk 4 board.
1. Detach the USB cable of your Pixhawk board from the computer if it was plugged.
1. Open QGC.
1. In QGC go to **Q > Vehicle Setup > Firmware**
1. Plug your pixhawk board via USB
1. Once connected select "PX4 Flight Stack", check "Advanced settings" and choose "Custom firmware file ..." from the drop down below.
1. Continue and select the firmware binary you just built before.
   In the open dialog look for the "Linux" location with the penguin icon in the left pane.
   It's usually all the way at the bottom.
   Choose the file in the path: `Ubuntu\home\{your WSL user name}\PX4-Autopilot\build\{your build target}\{your build target}.px4`
   :::note
   You can add the folder to the favourites to access it quickly next time.
   :::
1. Start the flashing.
