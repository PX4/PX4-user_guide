---
canonicalUrl: https://docs.px4.io/main/tr/debug/faq
---

# Frequently Asked Questions


## Build Errors

### Flash Overflow

:::tip
Use the FMUv4 architecture to obtain double the flash. The first available board from this generation is the [Pixracer](../flight_controller/pixracer.md).
:::

The amount of code that can be loaded onto a board is limited by the amount of flash memory it has. When adding additional modules or code its possible that the addition exceeds the flash memory. This will result in a "flash overflow". The upstream version will always build, but depending on what a developer adds it might overflow locally.

```sh
region `flash' overflowed by 12456 bytes
```

To remedy it, either use more recent hardware or remove modules from the build which are not essential to your use case. The configuration is stored in **/PX4-Autopilot/boards/px4** (e.g. [PX4-Autopilot/boards/px4/fmu-v5/default.cmake](https://github.com/PX4/PX4-Autopilot/blob/master/boards/px4/fmu-v5/default.cmake)). To remove a module, just comment it out:

```cmake
#tune_control
```

## USB Errors

### The upload never succeeds

On Ubuntu, uninstall the modem manager:

```sh
sudo apt-get remove modemmanager
```
