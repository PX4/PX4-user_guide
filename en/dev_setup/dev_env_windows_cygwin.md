# Windows Development Environment

The following instructions set up a PX4 development environment on Windows 10.
This environment can be used to build PX4 for:
* Pixhawk and other NuttX-based hardware
* [jMAVSim Simulation](../simulation/jmavsim.md)

This topic explains how download and use the environment, and how it can be extended and updated if needed (for example, to use a different compiler).

:::tip
This setup is supported by the PX4 dev team.

To build other targets you will need to use a [different OS](../dev_setup/dev_env.md#supported-targets) (or an [unsupported windows development environment](advanced/dev_env_unsupported.md)).
:::

<a id="installation"></a>
## Installation Instructions

1. Download the latest version of the ready-to-use MSI installer from: [Github releases](https://github.com/PX4/windows-toolchain/releases) or [Amazon S3](https://s3-us-west-2.amazonaws.com/px4-tools/PX4+Windows+Cygwin+Toolchain/PX4+Windows+Cygwin+Toolchain+0.9.msi) (fast download).
1. Run it, choose your desired installation location, let it install:
    ![jMAVSimOnWindows](../../assets/toolchain/cygwin_toolchain_installer.png)
1. Tick the box at the end of the installation to *clone the PX4 repository, build and run simulation with jMAVSim* (this simplifies the process to get you started).
   :::note
   If you missed this step you will need to [clone the PX4-Autopilot repository manually](#getting_started).
   :::


<a id="getting_started"></a>
## Getting Started

The toolchain uses a specially configured console window (started by running the **run-console.bat** script) from which you can call the normal PX4 build commands:

1. Browse to the toolchain installation directory (default **C:\PX4\**)
1. Run **run-console.bat** (double click) to start the Cygwin bash console
1. Clone the PX4 PX4-Autopilot repository from within the console:
   
   :::note
   Cloning only needs to be done once!
   Skip this step if you ticked the installer option to *clone the PX4 repository, build and run simulation with jMAVSim*.
   :::

   ```bash
   # Clone the PX4-Autopilot repository into the home folder & loads submodules in parallel
   git clone --recursive -j8 https://github.com/PX4/PX4-Autopilot.git
   ```

   You can now use the console/PX4-Autopilot repository to build PX4.

1. For example, to run JMAVSim:
   ```bash
   # Navigate to PX4-Autopilot repo
   cd PX4-Autopilot
   # Build and runs SITL simulation with jMAVSim to test the setup
   make px4_sitl jmavsim
   ```
   The console will then display:

   ![jMAVSimOnWindows](../../assets/simulation/jmavsim_windows_cygwin.png)

Continue next to [the detailed instructions on how to build PX4](../dev_setup/building_px4.md) (or see the section below for more general usage instructions).


<a id="usage_instructions"></a>
## Usage Instructions

The installation directory (default: **C:\PX4\**) contains a batch script for launching the PX4 SITL (linux like) bash console: **run-console.bat**

:::tip
The [Manual Setup](#manual_setup) section explains why you need to use the script and how it all works.
:::

The ordinary workflow consists of starting a console window by double clicking on the **run-console.bat** script to manually run terminal commands.

### File Monitoring Tools vs Toolchain Speed

Antivirus and other background file monitoring tools can significantly slow down both installation of the toolchain and PX4 build times.

You may wish to halt them temporarily during builds (at your own risk).

### Windows & Git Special Cases

#### Windows CR+LF vs Unix LF Line Endings

We recommend that you force Unix style LF endings for every repository you're working with using this toolchain (and use an editor which preserves them when saving your changes - e.g. Eclipse or VS Code).
Compilation of source files also works with CR+LF endings checked out locally, but there are cases in Cygwin (e.g. execution of shell scripts) that require Unix line endings (otherwise you get errors like `$'\r': Command not found.`).
Luckily git can do this for you when you execute the two commands in the root directory of your repo:
```
git config core.autocrlf false
git config core.eol lf
```

If you work with this toolchain on multiple repositories you can also set these two configurations globally for your machine:
```
git config --global ...
```
This is not recommended because it may affect any other (unrelated) git use on your Windows machine.

#### Unix Permissions Execution Bit

Under Unix there's a flag in the permissions of each file that tells the OS whether or not the file is allowed to be executed.
*git* under Cygwin supports and cares about that bit (even though the Windows NTFS file system does not use it).
This often results in *git* finding "false-positive" differences in permissions.
The resulting diff might look like this:
```
diff --git ...
old mode 100644
new mode 100755
```

We recommend globally disabling the permission check on Windows to avoid the problem:
```
git config --global core.fileMode false # disable execution bit check globally for the machine
```

For existing repositories that have this problem caused by a local configuration, additionally:
```
git config --unset core.filemode # remove the local option for this repository to apply the global one
git submodule foreach --recursive git config --unset core.filemode # remove the local option for all submodules
```

## Next Steps

Once you have finished setting up the command-line toolchain:

- Install the [QGroundControl Daily Build](https://docs.qgroundcontrol.com/en/releases/daily_builds.html)
  :::tip
  The *daily build* includes development tools that hidden in release builds. 
  It may also provide access to new PX4 features that are not yet supported in release builds.
  :::
- Continue to the [build instructions](../dev_setup/building_px4.md).

<!-- Note, this option removed because it is not supported on Windows Cygwin - Install [VSCode](../dev_setup/vscode.md) (if you prefer using an IDE to the command line). -->


## Additional Information

<a id="features"></a>
### Features / Issues

The following features are known to work (version 2.0):

* Building and running SITL with jMAVSim with significantly better performance than a VM (it generates a native windows binary **px4.exe**).
* Building and uploading NuttX builds (e.g.: px4_fmu-v2 and px4_fmu-v4)
* Style check with *astyle* (supports the command: `make format`)
* Command line auto completion
* Non-invasive installer! The installer does NOT affect your system and global path (it only modifies the selected installation directory e.g. **C:\PX4\** and uses a temporary local path).
* The installer supports updating to a new version keeping your personal changes inside the toolchain folder

Omissions:
* Simulation: Gazebo and ROS are not supported.
* Only NuttX and JMAVSim/SITL builds are supported.
* [Known problems](https://github.com/orgs/PX4/projects/6) (Also use to report issues).

<a id="script_setup"></a>
### Shell Script Installation

You can also install the environment using shell scripts in the Github project.

1. Make sure you have [Git for Windows](https://git-scm.com/download/win) installed.
1. Clone the repository https://github.com/PX4/windows-toolchain to the location you want to install the toolchain. Default location and naming is achieved by opening the `Git Bash` and executing:
```
cd /c/
git clone https://github.com/PX4/windows-toolchain PX4
```
1. If you want to install all components navigate to the freshly cloned folder and double click on the script `install-all-components.bat` located in the folder `toolchain`. If you only need certain components and want to safe Internet traffic and or disk space you can navigate to the different component folders like e.g. `toolchain\cygwin64` and click on the **install-XXX.bat** scripts to only fetch something specific.
1. Continue with [Getting Started](#getting_started) (or [Usage Instructions](#usage_instructions))


<a id="manual_setup"></a>
### Manual Installation (for Toolchain Developers)

This section describes how to setup the Cygwin toolchain manually yourself while pointing to the corresponding scripts from the script based installation repo.
The result should be the same as using the scripts or MSI installer.

:::note
The toolchain gets maintained and hence these instructions might not cover every detail of all the future changes.
:::

1. Create the *folders*: **C:\PX4\**, **C:\PX4\toolchain\** and **C:\PX4\home\**
1. Download the *Cygwin installer* file [setup-x86_64.exe](https://cygwin.com/setup-x86_64.exe) from the [official Cygwin website](https://cygwin.com/install.html)
1. Run the downloaded setup file
1. In the wizard choose to install into the folder: **C:\PX4\toolchain\cygwin64\**
1. Select to install the default Cygwin base and the newest available version of the following additional packages:

   * **Category:Packagename**
   * Devel:cmake (3.3.2 gives no deprecated warnings, 3.6.2 works but has the warnings)
   * Devel:gcc-g++
   * Devel:gdb
   * Devel:git
   * Devel:make
   * Devel:ninja
   * Devel:patch
   * Editors:xxd
   * Editors:nano (unless you're the vim pro)
   * Python:python2
   * Python:python2-pip
   * Python:python2-numpy
   * Python:python2-jinja2
   * Python:python2-pyyaml
   * Python:python2-cerberus
   * Archive:unzip
   * Utils:astyle
   * Shells:bash-completion
   * Web:wget

   :::note
   Do not select as many packages as possible which are not on this list, there are some which conflict and break the builds.
   :::

   :::note
   That's what [cygwin64/install-cygwin-px4.bat](https://github.com/MaEtUgR/PX4Toolchain/blob/master/toolchain/cygwin64/install-cygwin-px4.bat) does.
   :::

1. Write up or copy the **batch scripts** [`run-console.bat`](https://github.com/MaEtUgR/PX4Toolchain/blob/master/run-console.bat) and [`setup-environment.bat`](https://github.com/PX4/windows-toolchain/blob/master/toolchain/scripts/setup-environment.bat).

   The reason to start all the development tools through the prepared batch script is they preconfigure the starting program to use the local, portable Cygwin environment inside the toolchain's folder.
   This is done by always first calling the script [**setup-environment.bat**](https://github.com/PX4/windows-toolchain/blob/master/toolchain/scripts/setup-environment.bat) and the desired application like the console after that.

   The script [setup-environment.bat](https://github.com/PX4/windows-toolchain/blob/master/toolchain/scripts/setup-environment.bat) locally sets environmental variables for the workspace root directory `PX4_DIR`, all binary locations `PATH`, and the home directory of the unix environment `HOME`.

1. Add necessary **python packages** to your setup by opening the Cygwin toolchain console (double clicking **run-console.bat**) and executing
   ```
   pip2 install toml
   pip2 install pyserial
   pip2 install pyulog
   ```

   :::note
   That's what [cygwin64/install-cygwin-python-packages.bat](https://github.com/MaEtUgR/PX4Toolchain/blob/master/toolchain/cygwin64/install-cygwin-python-packages.bat) does.
   :::

1. Download the [**ARM GCC compiler**](https://developer.arm.com/open-source/gnu-toolchain/gnu-rm/downloads) as zip archive of the binaries for Windows and unpack the content to the folder `C:\PX4\toolchain\gcc-arm`.

   :::note
   This is what the toolchain does in: [gcc-arm/install-gcc-arm.bat](https://github.com/MaEtUgR/PX4Toolchain/blob/master/toolchain/gcc-arm/install-gcc-arm.bat).
   :::

1. Install the JDK:
   * Download Java 14 from [Oracle](https://www.oracle.com/java/technologies/javase-jdk14-downloads.html) or [AdoptOpenJDK](https://adoptopenjdk.net/).
   * Because sadly there is no portable archive containing the binaries directly you have to install it.
   * Find the binaries and move/copy them to **C:\PX4\toolchain\jdk**.
   * You can uninstall the Kit from your Windows system again, we only needed the binaries for the toolchain.

   :::note
   This is what the toolchain does in: [jdk/install-jdk.bat](https://github.com/MaEtUgR/PX4Toolchain/blob/master/toolchain/jdk/install-jdk.bat).
   :::

1. Download [**Apache Ant**](https://ant.apache.org/bindownload.cgi) as zip archive of the binaries for Windows and unpack the content to the folder `C:\PX4\toolchain\apache-ant`.

   :::tip
   Make sure you don't have an additional folder layer from the folder which is inside the downloaded archive.
   :::

   :::note
   This is what the toolchain does in: [apache-ant/install-apache-ant.bat](https://github.com/MaEtUgR/PX4Toolchain/blob/master/toolchain/apache-ant/install-apache-ant.bat).
   :::

1. Download, build and add *genromfs* to the path:
   * Clone the source code to the folder **C:\PX4\toolchain\genromfs\genromfs-src** with
     ```
     cd /c/toolchain/genromfs
     git clone https://github.com/chexum/genromfs.git genromfs-src
     ```

   * Compile it with:
     ```
     cd genromfs-src
     make all
    ```

    * Copy the resulting binary **genromfs.exe** one folder level out to: **C:\PX4\toolchain\genromfs**

    :::note
	This is what the toolchain does in: [genromfs/install-genromfs.bat](https://github.com/MaEtUgR/PX4Toolchain/blob/master/toolchain/genromfs/install-genromfs.bat).
	:::

1. Make sure all the binary folders of all the installed components are correctly listed in the `PATH` variable configured by [**setup-environment.bat**](https://github.com/PX4/windows-toolchain/blob/master/toolchain/scripts/setup-environment.bat).
