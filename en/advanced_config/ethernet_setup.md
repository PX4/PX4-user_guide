## PX4 Ethernet setup:
PX4 supports Ethernet connectivity on specified boards that are capable of it on hardware. The supported hardware are listed below:

 - [Holybro Pixhawk 5X](../flight_controller/pixhawk5x.md )

1. Connect Pixhawk to the PC via USB cable 
2. Open *QGroundcontrol -> Analyze Tools -> Mavlink Console*
3. Set Network parameters of Pixhawk in **Mavlink Console**:

:::note
This is an example of IP assignment, you can set the whole system up according to the protocol you want to follow in your own specific network configuration.
:::

```
echo DEVICE=eth0 > /fs/microsd/net.cfg
echo BOOTPROTO=fallback >> /fs/microsd/net.cfg
echo IPADDR=192.168.0.4 >> /fs/microsd/net.cfg
echo NETMASK=255.255.255.0 >>/fs/microsd/net.cfg
echo ROUTER=192.168.0.254 >>/fs/microsd/net.cfg
echo DNS=192.168.0.254 >>/fs/microsd/net.cfg
```

- NETMASK : network mask
- IPADDR: Pixhawk IP Address
- ROUTER: The default route over the network
- DNS: The address of the dns server

4. Set IP on your PC following the same protocol. You can do this with applying netplan configuration file. 

```
sudo nano /etc/netplan/01-network-manager-all.yaml 
```

5. Copy and paste the foollowing into the file. Save and exit the editor. (indentations are important here)
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

:::note
You need to follow assigning the same IP protocol on any other system e.g. companion computer connected to your Pixhawk later.
:::

6. Apply the rules by typing sudo netplan apply in your PC terminal. 
7. Power up your Pixhawk 5X separately and connect it via Ethernet cable only to your desired system. QGroundcontrol has to detect and automatically connect to your Pixhawk. 

