# MicroDDS

The *PX4-Fast RTPS(DDS) Bridge*, which was also referred to as as the *microRTPS Bridge*, has now been replaced with MicroDDS bridge.

The new approach provides a faster and simpler method of integrating applictaions running and linked in DDS domains (including ROS nodes), making it easy to share sensor data, commands, and other vehicle information.

The following guide describes the new PX4 bridge architecture, and shows the reader how to write a simple *Micro DDS* application to subscribe * publish telemetry updates from the PX4 Autopilot.

:::note
Micro XRCE-DDS is a software solution that enables communictaion with an existing DDS network. 
:::

## Why this approach is of interest?

Initially, micro-RTPS served as the middleware and its consistent improvement evolved into what's known as the microDDS that provides the user a native interface between the flight controller and the mission computer. 
The notable difference between the two is what kind of transport protocol each supports. The newest version supports UDP/TCP/Serial/Custom transport protocol.  

The Micro-XRCE-DDS-Gen has 2 major advantages, i.e. it can be used to generate client code and build px4_msgs along with microdds_client together creating a single library.  

:::tip

:::

## Architectural overview

### microDDS Bridge

The [*microDDS*](https://micro-xrce-dds.docs.eprosima.com/en/stable/introduction.html) provides DDS publisher subcription approach wherein the client is on a low-resource consumption device and the agent is connected to with the DDS gobal data space.

#### The microdds Client
The *Client* is the PX4 Autopilot middleware daemon process that runs on the flight controller. The client can either publish or subcribe directly to data topics because the agent itself acts on behalf of the [client](https://micro-xrce-dds.docs.eprosima.com/en/stable/client.html)

#### The microdds Agent
The *Agent* runs as a daemon process that's defined by what the clients defines it to be and hence it's dynamic. It's a server that acts an an intermediary between the client and the DDS Global Data Space. 

#### microdds Communication
microDDS has APIs that allow writing time-critical applications and can be used over many transport protocols supporting TCP,UDP over Ethernet Wi-Fi & 6LoWPAN and Bluetooth. The user can also customise this making microDDS transport-agnostic.