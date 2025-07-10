---
canonicalUrl: https://docs.px4.io/main/ja/flight_controller/raspberry_pi_navio2
---

# Raspberry Pi 2/3 Navio2 Autopilot

:::warning PX4 does not manufacture this (or any) autopilot. Contact the [manufacturer](https://emlid.com/) for hardware support or compliance issues.
:::

:::warning PX4 support for this flight controller is [experimental](../flight_controller/autopilot_experimental.md).
:::

This is the developer "quickstart" for Raspberry Pi 2/3 Navio2 autopilots. It allows you to build PX4 and transfer to the RasPi, or build natively.

![Ra Pi Image](../../assets/hardware/hardware-rpi2.jpg)


## OS Image

Use the [Emlid RT Raspbian image for Navio 2](https://docs.emlid.com/navio2/configuring-raspberry-pi). The default image will have most of the setup procedures shown below already done.

:::warning
Make sure not to upgrade the system (more specifically the kernel). By upgrading, a new kernel can get installed which lacks the necessary HW support (you can check with `ls /sys/class/pwm`, the directory should not be empty).
:::

## Setting up Access

The Raspbian image has SSH setup already. Username is "pi" and password is "raspberry". You can connect to your RPi2/3 over a network (Ethernet is set to come up with DHCP by default) and then proceed to configure WiFi access. We assume that the username and password remain at their defaults for the purpose of this guide.

To setup the RPi2/3 to join your local wifi, follow [this guide](https://www.raspberrypi.org/documentation/configuration/wireless/wireless-cli.md).

Find the IP address of your Pi from your network, and then you can proceed to connect to it using SSH.

```sh
ssh pi@<IP-ADDRESS>
```

## Expand the Filesystem

After installing the OS and connecting to it, make sure to [expand the Filesystem](https://www.raspberrypi.org/documentation/configuration/raspi-config.md), so there is enough space on the SD Card.

## Disable Navio RGB Overlay

The existing Navio RGB overlay claims GPIOs used by PX4 for RGB Led. Edit `/boot/config.txt` by commenting the line enabling the `navio-rgb` overlay.
```
#dtoverlay=navio-rgb
```

## Changing Hostnames

To avoid conflicts with any other RPis on the network, we advise you to change the default hostname to something sensible. We used "px4autopilot" for our setup. Connect to the Pi via SSH and follow the below instructions.

Edit the hostname file:

```sh
sudo nano /etc/hostname
```

Change `raspberry` to whatever hostname you want (one word with limited characters apply)

Next you need to change the hosts file:

```sh
sudo nano /etc/hosts
```
Change the entry `127.0.1.1 raspberry` to `127.0.1.1 <YOURNEWHOSTNAME>`

Reboot the Pi after this step is completed to allow it to re-associate with your network.

## Setting up Avahi (Zeroconf)

To make connecting to the Pi easier, we recommend setting up Avahi (Zeroconf) which allows easy access to the Pi from any network by directly specifying its hostname.

```sh
sudo apt-get install avahi-daemon
sudo insserv avahi-daemon
```
Next, setup the Avahi configuration file

```sh
sudo nano /etc/avahi/services/multiple.service
```
Add this to the file :

```xml
<?xml version="1.0" standalone='no'?>
<!DOCTYPE service-group SYSTEM "avahi-service.dtd">
<service-group>
        <name replace-wildcards="yes">%h</name>
        <service>
                <type>_device-info._tcp</type>
                <port>0</port>
                <txt-record>model=RackMac</txt-record>
        </service>
        <service>
                <type>_ssh._tcp</type>
                <port>22</port>
        </service>
</service-group>

```
Restart the daemon

```sh
sudo /etc/init.d/avahi-daemon restart
```
And that's it. You should be able to access your Pi directly by its hostname from any computer on the network.

:::tip
You might have to add .local to the hostname to discover it.
:::

## Configuring a SSH Public-Key

In order to allow the PX4 development environment to automatically push executables to your board, you need to configure passwordless access to the RPi. We use the public-key authentication method for this.

To generate new SSH keys enter the following commands (Choose a sensible hostname such as `<YOURNANME>@<YOURDEVICE>`.  Here we have used `pi@px4autopilot`)

These commands need to be run on the HOST development computer!

```sh
ssh-keygen -t rsa -C pi@px4autopilot
```
Upon entering this command, you'll be asked where to save the key. We suggest you save it in the default location ($HOME/.ssh/id_rsa) by just hitting Enter.

Now you should see the files `id_rsa` and `id_rsa.pub` in your `.ssh` directory in your home folder:

```sh
ls ~/.ssh
authorized_keys  id_rsa  id_rsa.pub  known_hosts
```
The `id_rsa` file is your private key. Keep this on the development computer. The `id_rsa.pub` file is your public key. This is what you put on the targets you want to connect to.

To copy your public key to your Raspberry Pi, use the following command to append the public key to your authorized_keys file on the Pi, sending it over SSH:

```sh
cat ~/.ssh/id_rsa.pub | ssh pi@px4autopilot 'cat >> .ssh/authorized_keys'
```

Note that this time you will have to authenticate with your password ("raspberry" by default).

Now try `ssh pi@px4autopilot` and you should connect without a password prompt.

If you see a message "`Agent admitted failure to sign using the key.`" then add your RSA or DSA identities to the authentication agent, ssh-agent and the execute the following command:

```sh
ssh-add
```
If this did not work, delete your keys with `rm ~/.ssh/id*` and follow the instructions again.

## Testing file transfer
We use SCP to transfer files from the development computer to the target board over a network (WiFi or Ethernet).

To test your setup, try pushing a file from the development PC to the Pi over the network now. Make sure the Pi has network access, and you can SSH into it.

```sh
echo "Hello" > hello.txt
scp hello.txt pi@px4autopilot:/home/pi/
rm hello.txt
```
This should copy over a "hello.txt" file into the home folder of your RPi. Validate that the file was indeed copied, and you can proceed to the next step.


## Building the Code

Either build the source code on your development computer ("cross-compiler" build) or build it on the RaPi ("native" build) as shown below.


### Cross-compiler Build

First install the [standard developer environment on your Ubunto development computer](../dev_setup/dev_env_linux.md).

Set the IP (or hostname) of your RPi using:

```sh
export AUTOPILOT_HOST=192.168.X.X
```
or
```sh
export AUTOPILOT_HOST=pi_hostname.domain
```

:::note
The value of the environment variable should be set before the build, or `make upload` will fail to find your RPi.
:::

Build the executable file:

```sh
cd PX4-Autopilot
make emlid_navio2 # for cross-compiler build
```

The "px4" executable file is in the directory **build/emlid_navio2_default/**. Make sure you can connect to your RPi over ssh, see [instructions how to access your RPi](#setting-up-access).

Then upload it with:

```sh
cd PX4-Autopilot
make emlid_navio2 upload # for cross-compiler build
```

Then, connect over ssh and run it with (as root):

```sh
cd ~/px4
sudo ./bin/px4 -s px4.config
```

### Native Build

A native build is one that you run directly on the Pi (the other option is to run builds on a development computer which cross-compiles for the Pi, and pushes the PX4 executable binary directly to the Pi).

Run these commands on the Pi to setup the build system on the Pi.

```sh
sudo apt-get update
sudo apt-get install cmake python-empy
```

Clone the Firmware directly onto the Pi then build the native build target (`emlid_navio2_native`).

```sh
git clone https://github.com/PX4/PX4-Autopilot.git --recursive
cd PX4-Autopilot
make emlid_navio2_native
```

The "px4" executable file is in the directory **build/emlid_navio2_native/**. Run it directly with:

```sh
sudo ./build/emlid_navio2_native/px4 build/emlid_navio2_native/etc -s ./posix-configs/rpi/px4.config
```

A successful build followed by executing px4 will give you something like this:

```sh

______  __   __    ___
| ___ \ \ \ / /   /   |
| |_/ /  \ V /   / /| |
|  __/   /   \  / /_| |
| |     / /^\ \ \___  |
\_|     \/   \/     |_/

px4 starting.


pxh>
```

## Autostart

To autostart px4, add the following to the file **/etc/rc.local** (adjust it accordingly if you use native build), right before the `exit 0` line:
```sh
cd /home/pi && ./bin/px4 -d -s px4.config > px4.log
```
