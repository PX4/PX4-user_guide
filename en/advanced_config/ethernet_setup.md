# PX4 Ethernet Setup

Ethernet connectivity provides a fast, reliable, and flexible communication alternative to using USB or other serial connections.

It can be used to connect to ground stations, companion computers, and other MAVLink systems.
It is particularly recommended when connecting to systems that "natively" use Ethernet - for example IP Radios.

By default PX4 is configured to connect to a ground station (streaming GCS [MAVLINK](https://mavlink.io/en/guide/mavlink_2.html) messages on port 14550). 

## Supported Flight Controllers

PX4 supports Ethernet connectivity on [Pixhawk 5X-standard](https://github.com/pixhawk/Pixhawk-Standards/blob/master/DS-011%20Pixhawk%20Autopilot%20v5X%20Standard.pdf) flight controllers (and later) that have an Ethernet port.
It may also be supported on other boards.

Supported flight controllers include:

 - [Holybro Pixhawk 5X](../flight_controller/pixhawk5x.md)

## PX4 Ethernet Port Configuration

:::note
The Ethernet port configuration sets the properties of the _serial link_ (which is how PX4 views the Ethernet connection).
This includes the set of MAVLink messages that are streamed, the data rate, the UDP ports that a remote system can connect listen to, etc.
You will separately need to configure the PX4 network settings
This is covered separately (in the following sections).
:::

PX4 configures the Ethernet (serial) port for connecting to a GCS by default via MAVLink.

Specifically it sets the configuration parameters as shown:

Parameter | Value | Description
--- | --- | ---
[MAV_2_CONFIG](../advanced_config/parameter_reference.md#MAV_2_CONFIG) | 1000 | Configure Ethernet port
[MAV_2_BROADCAST](../advanced_config/parameter_reference.md#MAV_2_BROADCAST) | 1 | Broadcast `HEARTBEAT` messages
[MAV_2_MODE](../advanced_config/parameter_reference.md#MAV_2_MODE) | 0 | Send the "normal" set of MAVLink messages (i.e. the GCS set)
[MAV_2_RADIO_CTL](../advanced_config/parameter_reference.md#MAV_2_RADIO_CTL) | 0 | Disable software throttling of MAVLink traffic
[MAV_2_RATE](../advanced_config/parameter_reference.md#MAV_2_RATE) | 100000 | Maximum sending rate
[MAV_2_REMOTE_PRT](../advanced_config/parameter_reference.md#MAV_2_REMOTE_PRT) | 14550 | MAVLink Remote Port of 14550 (GCS)
[MAV_2_UDP_PRT](../advanced_config/parameter_reference.md#MAV_2_UDP_PRT) | 14550 | MAVLink Network Port of 14550 (GCS)

To configure the port to connect to a companion computer you would change [MAV_2_REMOTE_PRT](../advanced_config/parameter_reference.md#MAV_2_REMOTE_PRT) and [MAV_2_UDP_PRT](../advanced_config/parameter_reference.md#MAV_2_UDP_PRT) to `14540` and [MAV_2_MODE](../advanced_config/parameter_reference.md#MAV_2_MODE) to `2` (Onboard).

For more information on MAVLink serial port configuration see [MAVLink Peripherals (GCS/OSD/Companion)](../peripherals/mavlink_peripherals.md)


## Setting up the Ethernet Network

To connect systems over Ethernet you need to configure them to run on the same IP network, so that each system has a unique IP address and knows how to find the other systems.

There is no single "out of the box configuration" that we can provide that will necessarily work in your local network.
Therefore as an example of the kind of configuration you might do, below we show how to set up the systems on an IP network with addresses `192.168.0.Xxx`, where PX4 has a statically allocated address `192.168.0.4` and the computer has address `192.168.0.1`.
If you connect a companion computer or other system to the network you would need to use a similar approach to allocate its address (or you could set up a DHCP server and allocate addresses dynamically).

:::note
There is nothing "special" about the network configuration (other than perhaps the tools used to modify the network settings); it works much the same as any home or business network.
Which is to say that a knowledge of how IP networks work is highly desirable!
:::

### PX4 Ethernet Network Setup

<!-- Information about NuttX network manager: https://github.com/PX4/PX4-Autopilot/pull/16330 -->

PX4 uses the [netman](../modules/modules_system.md#netman) module to apply and update network settings.

Network settings are defined in the configuration file `/fs/microsd/net.cfg` on the SD card.
This is a text file, that defines each setting on a new line as a `name=value` pair.
A configuration file might look like this:
```
DEVICE=eth0
BOOTPROTO=fallback
IPADDR=192.168.0.4
NETMASK=255.255.255.0
ROUTER=192.168.0.254
DNS=192.168.0.254
```

Where the values are:
- `DEVICE`: Interface name. Default is `eth0`.
- `BOOTPROTO`: Protocol for getting PX4 IP address. Valid values for proto are: `dhcp`, `static`, `fallback` (use DHCP but fall back to static address after time, if that fails)
- `IPADDR`: Static IP address (used if BOOTPROTO is `static` or `fallback`)
- `NETMASK`: Network mask
- `ROUTER`: The addess of the default route.
- `DNS`: The address of the DNS server.

To set the above "example" configuration using the *QGroundControl*:

1. Connect the flight controller to the computer with the USB cable.
1. Open **QGroundcontrol > Analyze Tools > MAVLink Console**
1. Enter commands "like" the ones below into the *MAVLink Console* (to write the values to the configuration file):
   ```
   echo DEVICE=eth0 > /fs/microsd/net.cfg
   echo BOOTPROTO=fallback >> /fs/microsd/net.cfg
   echo IPADDR=192.168.0.4 >> /fs/microsd/net.cfg
   echo NETMASK=255.255.255.0 >>/fs/microsd/net.cfg
   echo ROUTER=192.168.0.254 >>/fs/microsd/net.cfg
   echo DNS=192.168.0.254 >>/fs/microsd/net.cfg
   ```
1. Once the network configuration has been set you can disconnect the USB cable.
1. Reboot the flight controller to apply the settings.


### Ubuntu Ethernet Network Setup

If you're using Ubuntu for your ground station (or companion computer) then you can use [netplan](https://netplan.io/) to configure the network.

Below we show how you write a setup to the netplan configuration file "`/etc/netplan/01-network-manager-all.yaml`", which would run on the same network as used by the PX4 setup above.
Note that there are many more [examples](https://netplan.io/examples/) and instructions in the [netplan](https://netplan.io/) documentation.

To setup the Ubuntu Computer:

1. In a terminal, create and open a `netplan` configuration file: `/etc/netplan/01-network-manager-all.yaml`
   Below we do this using the *nano* text editor.

   ```
   sudo nano /etc/netplan/01-network-manager-all.yaml 
   ```

1. Copy and paste the following configuration information into the file (note: the indentations are important!):
   ```
   network:
     version: 2
     renderer: NetworkManager
     ethernets:
         enp2s0:
             addresses:
                 - 192.168.0.1/24
             nameservers:
                 addresses: [192.168.0.1]
             routes:
                 - to: 192.168.0.1
                   via: 192.168.0.1
   ```
   
   Save and exit the editor.
1. Apply the *netplan* configuration by entering the following command into the Ubuntu terminal.
   ```
   sudo netplan apply
   ```
   
If you have already configured the Pixhawk 5X, at this point you could connect it to the computer via an Ethernet cable and it would be automatically deteced by QGroundControl.
  
### Companion Computer Ethernet Network Setup

The setup for a companion computer will depend on the companion computer operating system.
A Linux operating system may support netplan, in which case the instructions would be the same as above, but using a unique IP address.

<!-- Then link or continue on with MAVSDK setup - depending on what works when you try it -->

## MAVSDK Sanity check

Since we have to listen to port 14550 as mentioned earlier, the only thing changes in MAVSDK is the port we connect to UDP. 

###Example for MAVSDK-Python:

To give an idea about how this can be done, we make a change in on of the MAVSDK-Python examples in its own Github repo. You can extened to your own application accordingly. You can change [this line](https://github.com/mavlink/MAVSDK-Python/blob/3c2ad41273a42597499d5c4ec4ad90c6a494e691/examples/telemetry.py#L10) to the one below in your local script:
```
    await drone.connect(system_address="udp://:14550")
```
Successfully connected one gives you Telemetry information from your flight controller. 

###Example for ROS2:



