# Sky-Drones SmartAP PDB

[SmartAP PDB](https://sky-drones.com/power/smartap-pdb.html) (Power Distribution Board) is a board which allows transferring the power from the battery to ESCs / Motors and generate power supply for the flight controller and 
other peripherals with different voltage levels. Also, PDB provides the functionality for battery 
voltage / current measurements. SmartAP PDB makes high-power lines connections easier and much more reliable.

![SmartAP PDB](../../assets/hardware/power_module/sky-drones_smartap-pdb/smartap-pdb-top-side.jpg)


## Specifications

- Size: 65x65 mm, 4x M3 mounting holes
- Input voltage up to 60 Volts (14S)
- Capability to handle extremenly high currents (peak current up to 400A)
- Power input from the main battery, possibility to connect up to 2 independent batteries
- 12 pairs of pads (6 on top, 6 on bottom) for powering up to 12 motors
- Integrated voltage and current sensors with L/C filters
- Precise Hall Effect based current measurements
- Integrated DC-DC converter from 10-60 V input (up to 14S battery) to 5V / 5A output  to power peripherals
- Integrated DC-DC converter from 10-60 V input (up to 14S battery) to 12V / 5A output to power peripherals
- 5V and 12V power output terminals (standard 2.54mm/0.1" connectors)
- Integrated electromagnetic sounder (buzzer)
- Power output for the flight controller (both 5V regulated and battery voltage level output)


## Size and Weight

- Length: 65mm
- Width: 65mm
- Height: 14mm
- Weight: 16g

## Parameters

- Voltage scaler: 15.51
- Current scaler: 36.00
- Current offset: 0.41


## Where to buy

[SmartAP PDB](https://sky-drones.com/parts/smartap-pdb.html)


## Wiring / Pinout

SmartAP Power Distribution Board pinout diagram is shown below. Big pads in the rear side are intended for the main battery connection. Up to two independent batteries can be connected using the thick wires (e.g. 8-10 AWG) to be able to handle high current loads and even more using thinner wires. Both top and bottom, left and right sides have pads for ESCs power supply connection. Therefore, up to 12 ESCs can be connected.

![SmartAP PDB](../../assets/hardware/power_module/sky-drones_smartap-pdb/smartap-pdb-pinout.png)


## Voltage and current sensors

SmartAP PDB has integrated voltage and current sensors. Current sensor is located on the bottom side of the PDB.

![SmartAP PDB](../../assets/hardware/power_module/sky-drones_smartap-pdb/smartap-pdb-current-sensor.png)


## Further Information

- [Buy SmartAP PDB](https://sky-drones.com/power/smartap-pdb.html)
- [Documentation](https://docs.sky-drones.com/avionics/smartap-pdb)
