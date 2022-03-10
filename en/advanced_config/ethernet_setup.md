## PX4 Ethernet setup:
PX4 supports Ethernet connectivity on specified boards that are capable of it on hardware. The supported hardware are listed below:

 - [Holybro Pixhawk 5X](../flight_controller/pixhawk5x.md )

1. Connect Pixhawk to the PC via USB cable 
2. Open *QGroundcontrol -> Analyze Tools -> Mavlink Console*
3. Enable networking in **Mavlink Console**:

```
ifconfig eth0 up
```

4. Assign your desired network settings by the following command (here the example is the given IP but you can define based on your own protocol):

```
ifconfig eth0 192.168.0.3
```
5. Set IP on your PC following the same protocol.

:::note
You need to follow assigning the same IP protocol on any other system e.g. companion computer connected to your Pixhawk later.
:::

6. Power up your Pixhawk 5X separately and connect it via Ethernet cable only to your desired system. QGroundcontrol has to detect and automatically connect to your Pixhawk. 
Typing dmesg in the console will have to give you something similar to the output below. 

