---
canonicalUrl: https://docs.px4.io/main/ja/concept/system_startup
---

# System Startup

The PX4 startup is controlled by shell scripts. On NuttX they reside in the [ROMFS/px4fmu_common/init.d](https://github.com/PX4/PX4-Autopilot/tree/master/ROMFS/px4fmu_common/init.d) folder - some of these are also used on Posix (Linux/MacOS). The scripts that are only used on Posix are located in [ROMFS/px4fmu_common/init.d-posix](https://github.com/PX4/PX4-Autopilot/tree/master/ROMFS/px4fmu_common/init.d-posix).

All files starting with a number and underscore (e.g. `10000_airplane`) are predefined airframe configurations. They are exported at build-time into an `airframes.xml` file which is parsed by [QGroundControl](http://qgroundcontrol.com) for the airframe selection UI. Adding a new configuration is covered [here](../dev_airframes/adding_a_new_frame.md).

The remaining files are part of the general startup logic. The first executed file is the [init.d/rcS](https://github.com/PX4/PX4-Autopilot/blob/master/ROMFS/px4fmu_common/init.d/rcS) script (or [init.d-posix/rcS](https://github.com/PX4/PX4-Autopilot/blob/master/ROMFS/px4fmu_common/init.d-posix/rcS) on Posix), which calls all other scripts.

The following sections are split according to the operating system that PX4 runs on.


## Posix (Linux/MacOS)

On Posix, the system shell is used as script interpreter (e.g. /bin/sh, being symlinked to dash on Ubuntu). For that to work, a few things are required:
- PX4 modules need to look like individual executables to the system. This is done via symbolic links. For each module a symbolic link `px4-<module> -> px4` is created in the `bin` directory of the build folder. When executed, the binary path is checked (`argv[0]`), and if it is a module (starts with `px4-`), it sends the command to the main px4 instance (see below).

:::tip
The `px4-` prefix is used to avoid conflicts with system commands (e.g. `shutdown`), and it also allows for simple tab completion by typing `px4-<TAB>`.
:::
- The shell needs to know where to find the symbolic links. For that the `bin` directory with the symbolic links is added to the `PATH` variable right before executing the startup scripts.
- The shell starts each module as a new (client) process. Each client process needs to communicate with the main instance of px4 (the server), where the actual modules are running as threads. This is done through a [UNIX socket](http://man7.org/linux/man-pages/man7/unix.7.html). The server listens on a socket, to which clients can connect and send a command. The server then sends the output and return code back to the client.
- The startup scripts call the module directly, e.g. `commander start`, rather than using the `px4-` prefix. This works via aliases: for each module an alias in the form of `alias <module>=px4-<module>` is created in the file `bin/px4-alias.sh`.
- The `rcS` script is executed from the main px4 instance. It does not start any modules, but first updates the `PATH` variable and then simply runs a shell with the `rcS` file as argument.
- In addition to that, multiple server instances can be started for multi-vehicle simulations. A client selects the instance via `--instance`. The instance is available in the script via `$px4_instance` variable.

The modules can be executed from any terminal when PX4 is already running on a system. For example:
```
cd <PX4-Autopilot>/build/px4_sitl_default/bin
./px4-commander takeoff
./px4-listener sensor_accel
```

### Dynamic modules

Normally, all modules are compiled into a single PX4 executable. However, on Posix, there's the option of compiling a module into a separate file, which can be loaded into PX4 using the `dyn` command.
```
dyn ./test.px4mod
```

## NuttX

NuttX has an integrated shell interpreter ([NuttShell (NSH)](https://cwiki.apache.org/confluence/pages/viewpage.action?pageId=139629410)), and thus scripts can be executed directly.

### Debugging the System Boot

A failure of a driver of software component will not lead to an aborted boot. This is controlled via `set +e` in the startup script.

The boot sequence can be debugged by connecting the [system console](../debug/system_console.md) and power-cycling the board. The resulting boot log has detailed information about the boot sequence and should contain hints why the boot aborted.

#### Common boot failure causes

  * For custom applications: The system was out of RAM. Run the `free` command to see the amount of free RAM.
  * A software fault or assertion resulting in a stack trace

### Replacing the System Startup

In most cases customizing the default boot is the better approach, which is documented below. If the complete boot should be replaced, create a file `/fs/microsd/etc/rc.txt`, which is located in the `etc` folder on the microSD card. If this file is present nothing in the system will be auto-started.

### Customizing the System Startup

The best way to customize the system startup is to introduce a [new airframe configuration](../dev_airframes/adding_a_new_frame.md). If only tweaks are wanted (like starting one more application or just using a different mixer) special hooks in the startup can be used.

:::warning
The system boot files are UNIX FILES which require UNIX LINE ENDINGS. If editing on Windows use a suitable editor.
:::

There are three main hooks. Note that the root folder of the microsd card is identified by the path `/fs/microsd`.

* /fs/microsd/etc/config.txt
* /fs/microsd/etc/extras.txt
* /fs/microsd/etc/mixers/NAME_OF_MIXER

#### Customizing the Configuration (config.txt)

The `config.txt` file can be used to modify shell variables. It is loaded after the main system has been configured and *before* it is booted.

#### Starting additional applications

The `extras.txt` can be used to start additional applications after the main system boot. Typically these would be payload controllers or similar optional custom components.

:::warning
Calling an unknown command in system boot files may result in boot failure. Typically the system does not stream mavlink messages after boot failure, in this case check the error messages that are printed on the system console.
:::

The following example shows how to start custom applications:
  * Create a file on the SD card `etc/extras.txt` with this content:
    ```
    custom_app start
    ```
  * A command can be made optional by gating it with the `set +e` and `set -e` commands:
    ```
    set +e
    optional_app start      # Will not result in boot failure if optional_app is unknown or fails
    set -e

    mandatory_app start     # Will abort boot if mandatory_app is unknown or fails
    ```

#### Starting a custom mixer

By default the system loads the mixer from `/etc/mixers`. If a file with the same name exists in `/fs/microsd/etc/mixers` this file will be loaded instead. This allows to customize the mixer file without the need to recompile the Firmware.

##### Example

The following example shows how to add a custom aux mixer:
  * Create a file on the SD card, `etc/mixers/gimbal.aux.mix` with your mixer content.
  * Then to use it, create an additional file `etc/config.txt` with this content:
    ```
    set MIXER_AUX gimbal
    set PWM_AUX_OUT 1234
    set PWM_AUX_DISARMED 1500
    set PWM_AUX_MIN 1000
    set PWM_AUX_MAX 2000
    set PWM_AUX_RATE 50
    ```
