# Sapog ESC Firmware

[Sapog](https://github.com/PX4/sapog#px4-sapog) firmware is an advanced open source sensorless PMSM/BLDC motor controller firmware designed for use in propulsion systems of electric unmanned vehicles.

While it can be controlled using traditional PWM input, it is designed to operate over CAN bus using [DroneCAN](README.md). This has multiple benefits:
* CAN has been specifically designed to deliver robust and reliable connectivity over relatively large distances.
  It enables safe use of ESCs on bigger vehicles and communication redundancy.
* The bus is bi-directional, enabling health monitoring, diagnostics, and RPM telemetry.
* Wiring is less complicated as you can have a single bus for connecting all your ESCs and other DroneCAN peripherals.
* Setup is easier as you configure ESC numbering by manually spinning each motor.

## Where to Buy

Multiple vendors sell ESC hardware that runs sapog firmware:
* [Zubax Orel 20](https://zubax.com/products/orel_20)
* [Holybro Kotleta20](https://shop.holybro.com/kotleta20_p1156.html)

<style>
#image_container {
  height: 100%;
  width: 100%;
  display: flex;
}
.image_column {
  width: 33%;
  text-align: center;
}

</style>

<div id="image_container">

  <div class="image_column">
  <img src="../../assets/peripherals/esc_uavcan_zubax_orel20/orel20_top.jpg" alt="Orel20 - Top"/><br><a href="https://zubax.com/products/orel_20">Zubax Orel 20</a>
  </div>

  <div class="image_column">
    <img src="../../assets/peripherals/esc_uavcan_holybro_kotleta20/kotleta20_top.jpg" alt="Holybro Kotleta20 top" /><br><a href="https://shop.holybro.com/kotleta20_p1156.html">Holybro Kotleta20</a>
  </div>

</div>

## Hardware Setup

ESCs are connected to the CAN bus using a Pixhawk standard 4 pin JST GH cable. For more information, refer to the [CAN Wiring](../can/README.md#wiring) instructions. ESC order does not matter.

## Firmware Setup

ESCs come with an existing build of Sapog installed. If you want to update:

To build the firmware:
```
git clone --recursive https://github.com/PX4/sapog
cd sapog/firmware
make RELEASE=1
```

This will create a file `*.application.bin`. in `build/`. This binary can be flashed through the autopilot over DroneCAN via the sapog bootloader. See [DroneCAN Firmware Update](README.md#firmware-update).

Refer to the [project page](https://github.com/PX4/sapog) to learn more, including how to flash without using the DroneCAN bootloader (i.e. on a not-yet-programmed device) or for development.

## Flight Controller Setup

### Enabling DroneCAN

Connect the ESCs to the Pixhawk CAN bus. Power up the entire vehicle using a battery or power supply (not just the flight controller over USB) and enable the DroneCAN driver by setting the parameter [UAVCAN_ENABLE](../advanced_config/parameter_reference.md#UAVCAN_ENABLE) to '3' to enable both dynamic node ID allocation and DroneCAN ESC output.

### PX4 Configuration
(Optional) Set [UAVCAN_ESC_IDLT](../advanced_config/parameter_reference.md#UAVCAN_ESC_IDLT) to 1 in order to ensure that the motors are always running at least at the idle throttle while the system is armed.
:::note
Some systems will not benefit from this behavior, e.g. glider drones).
:::

### Automatic ESC Enumeration using QGroundControl

This section shows how to enumerate any [Sapog-based](https://github.com/PX4/sapog#px4-sapog)-based ESCs "automatically" using *QGroundControl*.

:::tip
You can skip this section if there is only one ESC in your setup, because the ESC index is already set to zero by default.
:::

To enumerate the ESC:
1. Power the vehicle with a battery and connect to *QGroundControl*
2. Navigate to **Vehicle Setup > Power** in QGC.
3. Start the process of ESC auto-enumeration by pressing the **Start Assignment** button, as shown on the screenshot below.

   ![QGC - DroneCAN ESC auto-enumeration](../../assets/peripherals/esc_qgc/qgc_uavcan_settings.jpg)

   You will hear a sound indicating that the flight controller has entered the ESC enumeration mode.
4. Manually turn each motor in the correct direction of its rotation (as specified in the [Airframe Reference](../airframes/airframe_reference.md)), starting from the first motor and finishing with the last motor.
   Each time you turn a motor, you should hear a confirmation beep.
   
   :::note
   Make sure to turn each of the motors in the correct direction, as the ESC will automatically learn and remember the direction (i.e. motors that spin clockwise during normal operation must also be turned clockwise during enumeration).
   :::

5. After the last motor is enumerated, the confirmation sound should change to indicate that the enumeration procedure is complete.
6. Reboot PX4 and the Sapog ESCs to apply the new enumeration IDs.

The following video demonstrates the process:

@[youtube](https://www.youtube.com/watch?v=4nSa8tvpbgQ)

### Manual ESC Enumeration using Sapog

:::tip
We recommend automated [Sapog ESC Enumeration using QGroundControl](#sapog-esc-enumeration-using-qgroundcontrol) shown above rather than manual enumeration (as it is easier and safer).
:::

You can manually configure the ESC index and direction using the [UAVCAN GUI Tool](https://uavcan.org/GUI_Tool/Overview/).
This assigns the following Sapog configuration parameters for each enumerated ESC:
- `esc_index`
- `ctl_dir`

:::note
See [Sapog reference manual](https://files.zubax.com/products/io.px4.sapog/Sapog_v2_Reference_Manual.pdf) for more information about the parameters.
:::

## Troubleshooting

### Motors not spinning when armed

If PX4 arms but the motors do not start to rotate, check that parameter `UAVCAN_ENABLE=3` to use DroneCAN ESCs.
If the motors do not start spinning before thrust is increased, check `UAVCAN_ESC_IDLT=1`.

### DroneCAN devices dont get node ID/Firmware Update Fails

PX4 requires an SD card for DroneCAN dynamic node ID allocation and during firmware update (which happen during boot).
Check that there is a (working) SD card present and reboot.

## Further Information
* [PX4/Sapog](https://github.com/PX4/sapog#px4-sapog) (Github)
* [Sapog v2 Reference Manual](https://files.zubax.com/products/io.px4.sapog/Sapog_v2_Reference_Manual.pdf)
* [Using Sapog based ESC with PX4](https://kb.zubax.com/display/MAINKB/Using+Sapog-based+ESC+with+PX4) (Zubax KB)

