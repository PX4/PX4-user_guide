# UAVCAN ESCs (Motor Controllers)

PX4 supports the [UAVCAN](https://uavcan.org/) bus for connecting peripherals, including ESCs, GPS modules, various types of sensors, etc.

UAVCAN ESCs have a number of advantages over [PWM ESCs and Servos](../peripherals/pwm_escs_and_servo.md):
- UAVCAN has been specifically designed to deliver robust and reliable connectivity over relatively large distances.
  It enables safe use of ESCs on bigger vehicles and communication redundancy.
- The bus is bi-directional, enabling health monitoring and diagnostics.
- Wiring is less complicated as you can have a single bus for connecting all your ESCs and other UAVCAN peripherals.
- Setup is easier as you configure ESC numbering by manually spinning each motor.

Any UAVCAN ESC can be used with PX4 (ESC enumeration may differ slightly).

A number of popular UAVCAN ESCs and ESC firmware are listed:
- [Sapog](#sapog) firmware; an advanced open source sensorless PMSM/BLDC motor controller firmware designed for use in propulsion systems of electric unmanned vehicles.
- [Mitochondrik](https://zubax.com/products/mitochondrik) integrated sensorless PMSM/BLDC motor controller chip (used in ESCs and integrated drives)
- A number of others are [listed here](https://forum.uavcan.org/t/uavcan-esc-options/452/3?u=pavel.kirienko)

> **Note** At time of writing PX4 supports UAVCAN v0 (not v1.0).


## Purchase

Sapog-based ESCs:
- [Zubax Orel 20](https://zubax.com/products/orel_20)

  ![Orel20 - Top](../../assets/peripherals/esc_uavcan_zubax_orel20/orel20_top.jpg)

- [Holybro Kotleta20](https://shop.holybro.com/kotleta20_p1156.html)

  ![Kotleta20 - Top](../../assets/peripherals/esc_uavcan_holybro_kotleta20/kotleta20_top.jpg)
  ![Kotleta20 - Bottom](../../assets/peripherals/esc_uavcan_holybro_kotleta20/kotleta20_bottom.jpg)

Mitochondrik based drives and ESC:
- [Zubax Sadulli Integrated Drive](https://shop.zubax.com/collections/integrated-drives/products/sadulli-integrated-drive-open-hardware-reference-design-for-mitochondrik?variant=27740841181283)

  ![Sadulli - Top](../../assets/peripherals/esc_usavcan_zubax_sadulli/sadulli_top.jpg)


## Wiring/Connections {#connecting}

Connect all of the on-board UAVCAN devices into a chain and make sure the bus is terminated at the end nodes.
The order in which the ESC are connected/chained does not matter.

For more information information about proper bus connections see [UAVCAN Device Interconnection](https://kb.zubax.com/display/MAINKB/UAVCAN+device+interconnection) (Zubax KB).


## PX4 Configuration

In order to use a UAVCAN ESC with PX4 you will need to enable the UAVCAN driver (and you may need to [set other parameters](../advanced_config/parameters.md)):
1. Power the vehicle using the battery (you must power the whole vehicle, not just the flight controller!) and connect *QGroundControl*.
1. Navigate to the **Vehicle Setup > Parameters** screen.
1. Set [UAVCAN_ENABLE](../advanced_config/parameter_reference.md#UAVCAN_ENABLE) to the value *Sensors and Motors* (3) and then reboot the flight controller.
1. If applicable, set [UAVCAN_ESC_IDLT](../advanced_config/parameter_reference.md#UAVCAN_ESC_IDLT) to 1 in order to ensure that the motors are always running at least at the idle throttle while the system is armed.
   Some systems will not benefit from this behavior, e.g. glider drones.


## ESC Setup

While UAVCAN devices are generally *plug'n'play* you will still need to enumerate (number) each of the ESC used in your system and set their direction so that they can be identified/controlled by PX4.

> **Note** The ESC index and direction must match/map to the [Airframe Reference](../airframes/airframe_reference.md) for the vehicle type.
  ESC indexes from 0-7 map to MAIN 1-8, while ESC indexes 8-15 map to AUX 1-8.

The mechanism for enumerating each type of UAVCAN ESC is different (look up the instructions in your ESC's manual).
Setup information for some UAVCAN ESCs is provided below.


### Sapog ESC setup {#sapog}

The following sections explain how to enumerate [Sapog-based](https://github.com/PX4/sapog#px4-sapog)-based ESCs with PX4.
The instructions should work for any Sapog-based ESC design.

#### ESC Enumeration using QGroundControl {#sapog_esc_qgc}

> **Tip** You can skip this section if there is only one ESC in your setup, because the ESC index is already set to zero by default.

To enumerate the ESC:
1. Power the vehicle with a battery and connect to *QGroundControl*
1. Navigate to **Vehicle Setup > Power** in QGC.
1. Start the process of ESC auto-enumeration by pressing the **Start Assignment** button, as shown on the screenshot below.

   ![QGC - UAVCAN ESC auto-enumeration](../../assets/peripherals/esc_qgc/qgc_uavcan_settings.jpg)

   You will hear a sound indicating that the flight controller has entered the ESC enumeration mode.
1. Manually turn each motor in the correct direction of its rotation, starting from the first motor and finishing with the last motor.
   Each time you turn a motor, you should hear a confirmation.
   
   > **Note** Make sure to turn each of the motors in the correct direction, because the ESC will automatically learn and remember the direction (i.e. motors that spin clockwise during normal operation must also be turned clockwise during enumeration).

1. After the last motor is enumerated, the confirmation sound should change to indicate that the enumeration procedure is complete.

The following video demonstrates the process:

{% youtube %}
https://www.youtube.com/watch?v=4nSa8tvpbgQ
{% endyoutube %}

#### Manual ESC Enumeration using Sapog

> **Tip** We recommend automated [ESC Enumeration using QGroundControl](#sapog_esc_qgc) rather than manual enumeration - it is easier and safer.

You can manually configure the ESC index and direction using the [UAVCAN GUI Tool](https://uavcan.org/GUI_Tool/Overview/).
This assigns the following Sapog configuration parameters for each enumerated ESC:
- `esc_index`
- `ctl_dir`

> **Note** See [Sapog reference manual](https://files.zubax.com/products/io.px4.sapog/Sapog_v2_Reference_Manual.pdf) for more information about the parameters.


## Further Information

- [PX4/Sapog](https://github.com/PX4/sapog#px4-sapog) (Github)
- [Sapog v2 Reference Manual](https://files.zubax.com/products/io.px4.sapog/Sapog_v2_Reference_Manual.pdf)
- [UAVCAN Device Interconnection](https://kb.zubax.com/display/MAINKB/UAVCAN+device+interconnection) (Zubax KB)
- [Using Sapog based ESC with PX4](https://kb.zubax.com/display/MAINKB/Using+Sapog-based+ESC+with+PX4) (Zubax KB)

