# PX4 Dev Kit (Pixhawk 6C, X500 v2)

This topic provides full instructions for building the [Holybro X500 V2 ARF Kit](http://shop.holybro.com/x500-v2-kit_p1288.html) 

## Assembly

### HOLDERS

**Screw**-  Sunk Screw M2.5*6 12pcs

- Insert the hanger rubber ring gasket in each of their respective hangers. Do not use sharp objects to press the rubbers inside.

<img src="../../assets/airframes/multicopter/x500_v2_full_kit/assembly_1.gif" width="400px" title="Assembly: 1" />

- Take the battery mounting board and screw it with the slide bar clip using the Sunk Screw M2.5*6.

<img src="../../assets/airframes/multicopter/x500_v2_full_kit/assembly_2.gif" width="400px" title="Assembly: 2" />

- Screw 4 hangers to the Platform Board using Sunk Screw M2.5*6.

<img src="../../assets/airframes/multicopter/x500_v2_full_kit/assembly_3.gif" width="400px" title="Assembly: 3" />

- Take the slide bar and insert 4 hangers to screw to the bottom plate later.

<img src="../../assets/airframes/multicopter/x500_v2_full_kit/assembly_4.gif" width="400px" title="Assembly: 4" />

- Now insert the battery holder and payload holders assembled in step 2 & 3


### POWER MODULE
**Screw**- Socket Cap Screw M2.5*6 8pcs | Locknut M3 4pcs |Nylon Standoff M3*5 4pcs |  Screw M3*14 4pcs

<img src="../../assets/airframes/multicopter/x500_v2_full_kit/assembly_5.gif" width="400px" title="Assembly: 5" />

- Take the bottom plate and insert 4 M3*14 screws and fasten the nylon standoffs on the same.

<img src="../../assets/airframes/multicopter/x500_v2_full_kit/assembly_6.gif" width="400px" title="Assembly: 6" />

- Place the Power distribution board and use the locknuts to assemble them. The power module PM02 (for Pixhawk 6C) would power this board

<img src="../../assets/airframes/multicopter/x500_v2_full_kit/assembly_7.gif" width="400px" title="Assembly: 7" />

- Use Socket Cap Screws M2.5*6 and screw the  bottom plate on the 4 hangers (that we inserted in the 2 bars on the 3rd step of HOLDER assembly)

### LANDING GEAR

<img src="../../assets/airframes/multicopter/x500_v2_full_kit/assembly_8.gif" width="400px" title="Assembly: 8" />

<img src="../../assets/airframes/multicopter/x500_v2_full_kit/assembly_9.gif" width="400px" title="Assembly: 9" />


- To assemble the landing gear, loosen the pre-assembled screws of the Landing Gear-Cross Bar and insert the Landing Gear-Vertical Pole and fasten the same.

<img src="../../assets/airframes/multicopter/x500_v2_full_kit/assembly_10.gif" width="400px" title="Assembly: 10" />

<img src="../../assets/airframes/multicopter/x500_v2_full_kit/assembly_11.gif" width="400px" title="Assembly: 11" />

- Use the Socket Cap Screw M3*8 to screw the landing gears to the bottom plate

<img src="../../assets/airframes/multicopter/x500_v2_full_kit/assembly_12.gif" width="400px" title="Assembly: 12" />

<img src="../../assets/airframes/multicopter/x500_v2_full_kit/assembly_13.gif" width="400px" title="Assembly: 13" />

*Because it’s cumbersome to insert the wires once the top plate is assembled, do the wiring beforehand. 
Although the design is well built such that you can do this later as well.
 
### POWER
- The Pixhawk 6C gets powered by a power module PM02 (in this case).
- This power module is supplied by a battery (4S 16.8V 5200 mAh)
- The motors get power through the power distribution board.

<img src="../../assets/airframes/multicopter/x500_v2_full_kit/motors_pdb_pixhwak6c.png" width="400px" title="motors_pdb_pixhwak6c" />


### ARMS
**Screw-** Socket Cap Screw M3*38 16pcs | Flange Locknut M3 16pcs
<img src="../../assets/airframes/multicopter/x500_v2_full_kit/assembly_14.gif" width="400px" title="Assembly: 14" />

- Putting the arms is quite simple as the motors come pre-assembled.  - Ensure that you have the right numbered arm with its motor on the respective side.

<img src="../../assets/airframes/multicopter/x500_v2_full_kit/assembly_15.gif" width="400px" title="Assembly: 15" />

:::tip

Use your allen keys/ any elongated item and insert it on the opposite side of the bolt that you're trying to fasten.

:::

- Take one arm and insert the rectangle extrusion inside the rectangular hollow on the bottom plate.

<img src="../../assets/airframes/multicopter/x500_v2_full_kit/assembly_16.gif" width="400px" title="Assembly: 16" />

- While inserting the top plate on top of this the 3 piece assembly (bottom plate, top plate & arms) have to screwed using Socket Cap Screw M3*38 and Flange Locknut M3. 
- Hold one side using the mini cross wrench provided in the developer kit.

<img src="../../assets/airframes/multicopter/x500_v2_full_kit/assembly_17.gif" width="400px" title="Assembly: 17" />

- Do not fasten any screws before all 3 motors are in place as this might make it difficult while you’re assembling the 3rd and 4th motor.

<img src="../../assets/airframes/multicopter/x500_v2_full_kit/assembly_18.gif" width="400px" title="Assembly: 18" />

### PROPELLERS

<img src="../../assets/airframes/multicopter/x500_v2_full_kit/assembly_19.gif" width="400px" title="Assembly: 19" />

- The bottom plate indicates the direction of the motor.
- The propellers that have a white/silver coating go on that respective motor with the similar coat.
- The unlocking and locking of the propeller is indicated on the propeller itself.
- Use the 4 propellers and insert them on the motors keeping the above 3 points in mind.

*The below parts can be placed as per user

### GPS
**Screw-** Locknut M3 4 pcs | Screw M3*10 4pcs

<img src="../../assets/airframes/multicopter/x500_v2_full_kit/assembly_20.gif" width="400px" title="Assembly: 20" />

- Assemble the GPS by following the video.
- This guide uses the GPS mount location according to the suggestion in Holybro’s guide.
- Screw the GPS mount’s bottom end on the payload holder side using Locknut M3 & Screw M3*10

<img src="../../assets/airframes/multicopter/x500_v2_full_kit/assembly_21.gif" width="400px" title="Assembly: 21" />

### PIXHAWK 6C-
- The wire from the PM02 goes to POWER1 in Pixhawk
- The telemetry goes to TELEM1
- The GPS to GPS1

<img src="../../assets/airframes/multicopter/x500_v2_full_kit/assembly_22.gif" width="400px" title="Assembly: 22" />

[OPTIONAL]
### COMPANION COMPUTER
**Screw-** Socket Cap Screw M2.5*12 4pcs | Nylon Standoff M2.5*5 4pcs Locknut M2.5 4pcs

- The X500 kit is awesome because of it’s design consideration of most common hardware used on drones.
- The companion computer such as Raspberry Pi or Jetson nano can be placed here.
- Insert 4 Socket Cap Screw M2.5*12 and put the standoffs on the same.
- Now place the companion computer and assemble it using Locknut M2.5

### CAMERA
- Cameras such as Intel Realsense depth/ tracking camera or Structure Core can be mounted using the Depth Camera Mount
- Simply insert the mount inside the 2 bars and use the screws according to the camera you’re using. 

## Acknowledgements

