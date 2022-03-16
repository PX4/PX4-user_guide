# PX4 Ethernet Setup

Ethernet connectivity a faster, more reliable, and more flexible communication technology than serial communication approach.
This method is preferred over serial communication in case of direct connection between the Flight Controller and IP Radio telemetry, companion computers and Networks.
It utilizes UDP connection for MAVLINK communication over the port 14550 with [MAVLINK2](https://mavlink.io/en/guide/mavlink_2.html). 

## Supported Flight Controllers

PX4 supports Ethernet connectivity on [Pixhawk 5X-standard](https://github.com/pixhawk/Pixhawk-Standards/blob/master/DS-011%20Pixhawk%20Autopilot%20v5X%20Standard.pdf) flight controllers that have an Ethernet port.
It may also be supported on other boards.

Supported flight controllers include:

 - [Holybro Pixhawk 5X](../flight_controller/pixhawk5x.md)


## Connecting PX4 and a Ubuntu Linux Computer

To connect PX4 and a Ubuntu Linux computer you need to configure them to run on the same IP network.
On PX4 you update this configuration in the network configuration file on the SD card (`/fs/microsd/net.cfg`).
On Ubuntu you can do this by defining a netplan configuration file: `/etc/netplan/01-network-manager-all.yaml`

Below we set up the systems on an IP network with addresses `192.168.0.Xxx`, where PX4 has address `192.168.0.4` and the computer has address `192.168.0.1`.
If you connect a companion computer or other system to the network you will need to use a similar approach/IP address scheme.

To setup PX4:
1. Connect the flight controller to the computer with the USB cable.
1. Open **QGroundcontrol > Analyze Tools > MAVLink Console**
1. Enter commands "like" the ones below into the *MAVLink Console*.
   These commands write the flight controller network configuration parameters to the PX4 network configuration file (`/fs/microsd/net.cfg`).
   Note that the values for NETMASK etc below are _examples_: you will need to use configuration values that are appropriate for your network.

   ```
   echo DEVICE=eth0 > /fs/microsd/net.cfg
   echo BOOTPROTO=fallback >> /fs/microsd/net.cfg
   echo IPADDR=192.168.0.4 >> /fs/microsd/net.cfg
   echo NETMASK=255.255.255.0 >>/fs/microsd/net.cfg
   echo ROUTER=192.168.0.254 >>/fs/microsd/net.cfg
   echo DNS=192.168.0.254 >>/fs/microsd/net.cfg
   ```

   :::note
   Definitions for the setting values used above are:
   - NETMASK: network mask
   - IPADDR: Flight controller IP Address
   - ROUTER: The default route over the network
   - DNS: The address of the DNS server
   :::
1. Once the network configuration has been set you can disconnect the USB cable.
1. Reboot the flight controller to apply the settings.
  

To setup the Ubuntu Computer:

1. First create and open a `netplan` configuration file: `/etc/netplan/01-network-manager-all.yaml`
   Below we do this using the *nano* text editor.

   ```
   sudo nano /etc/netplan/01-network-manager-all.yaml 
   ```

1. Copy and paste the following configuration information into the file (note: the indentations are important here)
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
1. Power up the Pixhawk 5X and connect it via Ethernet cable to the computer.
   QGroundcontrol should detect and automatically connect to your Pixhawk.
  
