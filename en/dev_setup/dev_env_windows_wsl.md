# Windows WSL-Based Development Environment

### Advantages

- At the core it's using the well supported and tested Ubuntu development environment
- Now extra dual-boot or virtual machine hosting software needed
- Visual Studio Code for Windows works seamless with WSL in remote mode (see [instructions below](dev_env_windows_wsl.md#visual-studio-code-integration))

### Disadvantages

- QGC for Windows has to be manually connected to WSL simulation (see [instructions below](dev_env_windows_wsl.md#connect-qgroundcontrol-on-windows-to-wsl-simulation))<br>
Alternatively QGC for Linux can be run within WSL
- Direct serial MCU flashing doesn't work<br>
  Flashing can be done through QGC (see [instructions below](dev_env_windows_wsl.md#flash-a-flight-control-board))

### Requirements for graphics support
The requirement for any out of the box graphics support in WSL is [WSLg](https://github.com/microsoft/wslg). It is included in WSL on all recent enough Windows versions namely all Windows 11 versions and a few recent enough insider Windows 10 builds. Check the linked project GitHub page to read the latest availability.
If these requirements are not met then you can still build PX4, flash it to boards using QGC for Windows and run the simulation in headless mode. All windowed, graphics features like e.g. gazebo rendered visualization, QGC running in WSL, git gui, will not work without [WSLg](https://github.com/microsoft/wslg).

## Installation instructions

1. Open cmd.exe as administrator.
   Can be done by pressing the start key, typing "cmd", right klicking on the "Command prompt" entry and selecting "Run as administrator".
1. Execute the command `wsl --install` to run the installation routine for WSL.
1. Reboot the system.
1. Open cmd again normally (not as administrator).
   Can be done by pressing the start key, typing "cmd" and pressing enter.
1. Execute the command `wsl` to access the WSL shell.
1. Fill out the prompt for user name and password for the Ubuntu in your WSL. Be sure to remember the credentials for later on.
1. Execute the command `cd ~` to switch to the home folder of WSL for the next steps.
   Note: This is important because if you work from a location on the Windows file system you'll run into multiple issues like very slow execution, screwed access rights, ... You can directly access files located in WSL from Windows explorer directly so there's not disadvantage to using the WSL file system.
1. Follow the [Ubuntu Instructions Page](../dev_setup/dev_env_linux_ubuntu.md#gazebo-jmavsim-and-nuttx-pixhawk-targets)
   Note: git is already preinstalled
1. Execute the command `exit` to switch out of the WSL shell.
1. Execute the command `wsl --shutdown` to restart WSL because it's required by the Ubuntu setup script.
1. Execute command `wsl` to start WSL again and access the shell.
1. Execute `cd ~/PX4-Autopilot` to switch to the PX4 repository in the WSL home folder.
1. Execute e.g. `make px4_sitl` to build the PX4 SITL target and test your environment.

### Opening a WSL shell

1. Press the start key.
1. Type "cmd" and press Enter to open a command prompt.
1. Execute the command `wsl` to access the WSL shell.

## Visual Studio Code Integration

1. Download and install Visual Studio Code on Windows from https://code.visualstudio.com/
2. Open Visual Studio Code
3. Install the extension called "Remote - WSL": https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-wsl
4. [Open a WSL shell](dev_env_windows_wsl.md#opening-a-wsl-shell)
5. Switch to the PX4 folder `cd ~/PX4-Autopilot`
6. Open this folder with WSL integration in Visual Studio Code `code .`
7. Now you have the full IDE integration with Terminal, make sure you always open the PX4 repository in the Remote WSL mode. It will be available in your recently opened locations whenever you start VS Code.

## Connect QGroundcontrol on Windows to WSL simulation
You can alternatively donwload the QGC Linux app image to your WSL and it will automatically connect to a running simulation. These steps describe how you can use QGC installed natively on Windows to the WSL simulation.

1. [Open a WSL shell](dev_env_windows_wsl.md#opening-a-wsl-shell)
2. Check what IP address it received using the command "ip address" and copy it to clipboard by selecting the IP and using the shortcut [Ctrl] + [Shift] + [C].
3. In QGC go to Q > Application Settings > Comm Links
4. Add a UDP Link called "WSL" to port 18570 of the IP address copied before.
5. Save it and connect to it.
Note: This has to be repeated when WSL restarts because it gets a dynamic IP address.

## Flash a Flight Control Board
Flashing a custom built PX4 bianry has to be done using QGroundcontrol for Windows since WSL 2 does not natively offer direct access to serial devices like pixhawk boards. Do the following steps to flash your custom binary built in WSL.

1. If you haven't allready build the binary in WSL e.g. with a [WSL shell](dev_env_windows_wsl.md#opening-a-wsl-shell) and by running:
   ```
   cd ~/PX4-Autopilot
   make px4_fmu-v5
   ```
   Note: Use the correct target for your board. "fmu-v5" can be used for a pixhawk 4 board.
1. Detach the USB cable of your pixhawk board from the computer if it was plugged.
1. Open QGC.
1. In QGC go to Q > Vehicle Setup > Firmware
1. Plug your pixhawk board via USB
1. Once connected select "PX4 Flight Stack", check "Advanced settings" and chosing "Custom firmware file ..." from the drop down below.
1. Contiue and select the firmware binary you just built before. In the open dialog look for the "Linux" location with the penguin icon in the left pane. It's usually all the way at the bottom. Chose the file in the path: Ubuntu\home\{your WSL user name}\PX4-Autopilot\build\{your build target}\{your build target}.px4
   Note: You can add the folder to the favortites to access it quickly next time.
1. Start the flashing.
