# Holybro Pixhawk RPi CM4 Baseboard

The [Holybro Pixhawk RPi CM4 Baseboard](http://www.holybro.com/product/pixhawk-rpi-cm4-baseboard/) is a single-board solution that pre-integrates a (swappable) Pixhawk flight controller with the Raspberry Pi CM4 companion computer.
The baseboard has a compact form factor with all the connections needed for development.

![RPi CM4 with Pixhawk](../../assets/companion_computer/holybro_pixhawk_rpi_cm4_baseboard/baseboard_hero.jpg)

The flight controller module is internally connected to RPi CM4 through `TELEM2`, and can also be connected via Ethernet with the provided external cable.

This baseboard is plug-in compatible with both [Holybro Pixhawk 5X](../flight_controller/pixhawk5x.html) and [Holybro Pixhawk 6X](../flight_controller/pixhawk6x.html).

:::note
The board follows the [Pixhawk Connector Standard](https://github.com/pixhawk/Pixhawk-Standards/blob/master/DS-009%20Pixhawk%20Connector%20Standard.pdf) and [Pixhawk Autopilot Bus Standard](https://github.com/pixhawk/Pixhawk-Standards/blob/master/DS-010%20Pixhawk%20Autopilot%20Bus%20Standard.pdf).
It can therefore be used with other boards that follow these standards, but may require additional wiring.
:::



## Purchase

- [Holybro Pixhawk RPi CM4 Baseboard](http://www.holybro.com/product/pixhawk-rpi-cm4-baseboard/) (www.holybro.com)

  The baseboard can be purchased with or without an RPi CM4 and/or flight controller:

  - The Raspberry Pi CM4 (CM4008032) supplied by Holybro has the following specification:
    - RAM: 8GB 
    - eMMC: 32GB
    - Wireless: No
  - The recommended minimum specification for the RPi CM4 is:
    - RAM: 4GB (or 8GB)
    - eMMC: 16GB
    - Wireless: Yes

## Connections & Ports

The diagram below shows all the connectors and ports on the baseboard.

![Schematic diagram](../../assets/companion_computer/holybro_pixhawk_rpi_cm4_baseboard/baseboard_ports.jpg)

Refer to the [Holybro Documentation page](https://docs.holybro.com/autopilot/pixhawk-baseboards/pixhawk-rpi-cm4-baseboard/connections-and-ports) for the latest infofmation.

## Installing the RPi CM4 Companion

![Image showing separate baseboard, baseboard cover, RasPi, Flight controller, screws](../../assets/companion_computer/holybro_pixhawk_rpi_cm4_baseboard/baseboard_disassembled.jpg)

To install Raspberry Pi CM4 companion compute onto the baseboard.

1. Disconnect the `FAN` wiring.

   ![HB_Pixhawk_CM4_Fan](../../assets/companion_computer/holybro_pixhawk_rpi_cm4_baseboard/baseboard_fan.jpg)

1. Remove these 4 screws on the back side of the baseboard.

   ![Bottom of the board showing screws in corners holding the cover](../../assets/companion_computer/holybro_pixhawk_rpi_cm4_baseboard/baseboard_bottom.jpg)

1. Remove the baseboard case, install the CM4, and use the 4 screws to attach it (as shown):

   ![HB_Pixhawk_CM4_Screws](../../assets/companion_computer/holybro_pixhawk_rpi_cm4_baseboard/baseboard_screws.jpg)

1. Reattach the cover.


## Power Module Wiring

The PM03D power module is supplied with the board.

The RPi CM4 and flight controller must be powered separately:
- The flight controller is powered via the CLIK-Mate cable to `POWER1` or `POWER2` port
- The RPi CM4 is powered by the `USB C` (CM4 Slave) connection.

The image below shows the wiring in greater detail.

![Image showing writing from the PM03D power module to the baseboard](../../assets/companion_computer/holybro_pixhawk_rpi_cm4_baseboard/baseboard_wiring_guide.jpg)

## Ethernet Connection

The flight controller module is internally connected to RPi CM4 through TELEM2.
You can also set up a local Ethernet connection between them using the supplied cable.

:::note
For more general information see: [PX4 Ethernet Setup](../advanced_config/ethernet_setup.md).
:::

### Connect the Cable

To set up a local ethernet connection between CM4 and the flight computer, the two ethernet ports need to be connected using a 8 pin to 4 pin connector (provided).

![HB_Pixhawk_CM4_Ethernet_Cable](../../assets/companion_computer/holybro_pixhawk_rpi_cm4_baseboard/baseboard_ethernet_cable.png)

The pinout of the cable is:

CM4 Eth 8 Pin | FC ETH 4 Pin 
--- | ---
A | B
B | A
C | D
D | C
- | N/A
- | N/A
- | N/A
- | N/A


### IP Setup on CM4 

Since there is no DHCP server active in this configuration, the IP addresses have to be set manually:

First, connect to the CM4 via SSH by connecting to the CM4’s WiFi (or use a Wifi dongle).
Once the ethernet cables are plugged in, the `eth0` network interface seems to switch from DOWN to UP.

You can check the status using:

```
ip address show eth0
```

You can also try to enable it manually:

```
sudo ip link set dev eth0 up
```

It then seems to automatically set a link-local address, for this example it looks like this:

```
ip address show eth0

2: eth0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc mq state UP group default qlen 1000
    link/ether xx:xx:xx:xx:xx:xx brd ff:ff:ff:ff:ff:ff
    inet 169.254.21.183/16 brd 169.254.255.255 scope global noprefixroute eth0
       valid_lft forever preferred_lft forever
    inet6 fe80::yyyy:yyyy:yyyy:yyyy/64 scope link 
       valid_lft forever preferred_lft forever
```

This means the CM4’s ethernet IP is 169.254.21.183.

#### IP Setup on FC 

Now connect to the NuttX shell (using a console, or the MAVLink shell), and check the status of the link:

```
ifconfig

eth0    Link encap:Ethernet HWaddr xx:xx:xx:xx:xx:xx at DOWN
        inet addr:0.0.0.0 DRaddr:192.168.0.254 Mask:255.255.255.0
```

For this example, it is DOWN at first.

To set it to UP:

```
ifup eth0

ifup eth0...OK
```

Now check the config again:

```
ifconfig

eth0    Link encap:Ethernet HWaddr xx:xx:xx:xx:xx:xx at UP
        inet addr:0.0.0.0 DRaddr:192.168.0.254 Mask:255.255.255.0
```

However, it doesn’t have an IP yet.
Set one that is similar to the one on the RasPi CM4:

```
ifconfig eth0 169.254.21.184
```

Then check it:

```
ifconfig

eth0    Link encap:Ethernet HWaddr xx:xx:xx:xx:xx:xx at UP
        inet addr:169.254.21.184 DRaddr:169.254.21.1 Mask:255.255.255.0
```

Now the devices should be able to ping each other.

Note that this configuration is ephemeral and will be lost after a reboot, so we’ll need to find a way to configure it statically.

#### Ping Test 

First from the CM4:

```
ping 169.254.21.184

PING 169.254.21.184 (169.254.21.184) 56(84) bytes of data.
64 bytes from 169.254.21.184: icmp_seq=1 ttl=64 time=0.188 ms
64 bytes from 169.254.21.184: icmp_seq=2 ttl=64 time=0.131 ms
64 bytes from 169.254.21.184: icmp_seq=3 ttl=64 time=0.190 ms
64 bytes from 169.254.21.184: icmp_seq=4 ttl=64 time=0.112 ms
^C
--- 169.254.21.184 ping statistics ---
4 packets transmitted, 4 received, 0% packet loss, time 3077ms
rtt min/avg/max/mdev = 0.112/0.155/0.190/0.034 ms
```

Then from the flight controller in NuttShell:

```
ping 169.254.21.183

PING 169.254.21.183 56 bytes of data
56 bytes from 169.254.21.183: icmp_seq=0 time=0 ms
56 bytes from 169.254.21.183: icmp_seq=1 time=0 ms
56 bytes from 169.254.21.183: icmp_seq=2 time=0 ms
56 bytes from 169.254.21.183: icmp_seq=3 time=0 ms
56 bytes from 169.254.21.183: icmp_seq=4 time=0 ms
56 bytes from 169.254.21.183: icmp_seq=5 time=0 ms
56 bytes from 169.254.21.183: icmp_seq=6 time=0 ms
56 bytes from 169.254.21.183: icmp_seq=7 time=0 ms
56 bytes from 169.254.21.183: icmp_seq=8 time=0 ms
56 bytes from 169.254.21.183: icmp_seq=9 time=0 ms
10 packets transmitted, 10 received, 0% packet loss, time 10010 ms
```

#### MAVLink/MAVSDK Test

For this, we need to set the MAVLink instance to send traffic to the CM4's IP address:

For an initial test we can do:

```
mavlink start -o 14540 -t 169.254.21.183
```

This will send MAVLink traffic on UDP to port 14540 (the MAVSDK/MAVROS port) to that IP which means MAVSDK can just listen to any UDP arriving at that default port.

To run a MAVSDK example, install mavsdk via pip, and try out an example from [MAVSDK-Python/examples](https://github.com/mavlink/MAVSDK-Python/tree/main/examples).

For instance:

```
python3 -m pip install mavsdk

wget https://raw.githubusercontent.com/mavlink/MAVSDK-Python/main/examples/tune.py
chmod +x tune.py
./tune.py
```
