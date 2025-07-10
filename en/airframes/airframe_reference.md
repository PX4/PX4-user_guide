---
canonicalUrl: https://docs.px4.io/main/en/airframes/airframe_reference
---

# Airframes Reference
> **Note** **This list is [auto-generated](https://github.com/PX4/PX4-Autopilot/blob/master/Tools/px4airframes/markdownout.py) from the source code**.
> 
> **AUX** channels may not be present on some flight controllers.
> If present, PWM AUX channels are commonly labelled **AUX OUT**.
> 

This page lists all supported airframes and types including
 the motor assignment and numbering. The motors in **green** rotate clockwise,
 the ones in **blue** counterclockwise.

## Airship

### Airship

<div>
<img src="../../assets/airframes/types/Airship.svg" width="29%" style="max-height: 180px;"/>
<table style="float: right; width: 70%; font-size:1.5rem;">
 <colgroup><col></colgroup>
 <thead>
   <tr><th>Common Outputs</th></tr>
 </thead>
<tbody>
<tr>
 <td style="vertical-align: top;"><ul><li><b>MAIN1</b>: starboard thruster</li><li><b>MAIN2</b>: port thruster</li><li><b>MAIN3</b>: thrust tilt</li><li><b>MAIN4</b>: tail thruster</li></ul></td>
</tr>
</tbody></table>
</div>

<table style="width: 100%; table-layout:fixed; font-size:1.5rem;">
 <colgroup><col style="width: 30%"><col style="width: 70%"></colgroup>
 <thead>
   <tr><th>Name</th><th></th></tr>
 </thead>
<tbody>
<tr id="airship_airship_cloudship">
 <td style="vertical-align: top;">Cloudship</td>
 <td style="vertical-align: top;"><p>Maintainer: John Doe &lt;john@example.com&gt;</p><p><code>SYS_AUTOSTART</code> = 2507</p></td>

</tr>
</tbody></table>

## Autogyro

### Autogyro

<div>
<img src="../../assets/airframes/types/Autogyro.svg" width="29%" style="max-height: 180px;"/>
<table style="float: right; width: 70%; font-size:1.5rem;">
 <colgroup><col></colgroup>
 <thead>
   <tr><th>Common Outputs</th></tr>
 </thead>
<tbody>
<tr>
 <td style="vertical-align: top;"><ul><li><b>AUX1</b>: feed-through of RC AUX1 channel for prerotator (optional)</li><li><b>AUX2</b>: feed-through of RC AUX2 channel for release device (optional)</li></ul></td>
</tr>
</tbody></table>
</div>

<table style="width: 100%; table-layout:fixed; font-size:1.5rem;">
 <colgroup><col style="width: 30%"><col style="width: 70%"></colgroup>
 <thead>
   <tr><th>Name</th><th></th></tr>
 </thead>
<tbody>
<tr id="autogyro_autogyro_thunderfly_auto-g2">
 <td style="vertical-align: top;"><a href="https://github.com/ThunderFly-aerospace/Auto-G2/">ThunderFly Auto-G2</a></td>
 <td style="vertical-align: top;"><p>Maintainer: ThunderFly s.r.o., Roman Dvorak &lt;dvorakroman@thunderfly.cz&gt;</p><p><code>SYS_AUTOSTART</code> = 17002</p><p><b>Specific Outputs:</b><ul><li><b>MAIN1</b>: rotor_head_L</li><li><b>MAIN2</b>: rotor_head_R</li><li><b>MAIN3</b>: elevator</li><li><b>MAIN4</b>: rudder</li><li><b>MAIN5</b>: rudder (second, optional)</li><li><b>MAIN6</b>: throttle</li><li><b>MAIN7</b>: wheel</li></ul></p></td>

</tr>
<tr id="autogyro_autogyro_thunderfly_tf-g2">
 <td style="vertical-align: top;"><a href="https://github.com/ThunderFly-aerospace/TF-G2/">ThunderFly TF-G2</a></td>
 <td style="vertical-align: top;"><p>Maintainer: ThunderFly s.r.o., Roman Dvorak &lt;dvorakroman@thunderfly.cz&gt;</p><p><code>SYS_AUTOSTART</code> = 17003</p><p><b>Specific Outputs:</b><ul><li><b>MAIN2</b>: rotor_head_L</li><li><b>MAIN3</b>: rotor_head_R</li><li><b>MAIN4</b>: rudder</li><li><b>MAIN5</b>: throttle</li></ul></p></td>

</tr>
</tbody></table>

## Balloon

### Balloon

<div>
<img src="../../assets/airframes/types/Balloon.svg" width="29%" style="max-height: 180px;"/>
</div>

<table style="width: 100%; table-layout:fixed; font-size:1.5rem;">
 <colgroup><col style="width: 30%"><col style="width: 70%"></colgroup>
 <thead>
   <tr><th>Name</th><th></th></tr>
 </thead>
<tbody>
<tr id="balloon_balloon_thunderfly_balloon_tf-b1">
 <td style="vertical-align: top;"><a href="https://github.com/ThunderFly-aerospace/TF-B1/">ThunderFly balloon TF-B1</a></td>
 <td style="vertical-align: top;"><p>Maintainer: ThunderFly s.r.o.</p><p><code>SYS_AUTOSTART</code> = 18001</p></td>

</tr>
</tbody></table>

## Copter

### Coaxial Helicopter

<div>
<img src="../../assets/airframes/types/HelicopterCoaxial.svg" width="29%" style="max-height: 180px;"/>
<table style="float: right; width: 70%; font-size:1.5rem;">
 <colgroup><col></colgroup>
 <thead>
   <tr><th>Common Outputs</th></tr>
 </thead>
<tbody>
<tr>
 <td style="vertical-align: top;"><ul><li><b>MAIN1</b>: Left swashplate servomotor, pitch axis</li><li><b>MAIN2</b>: Right swashplate servomotor, roll axis</li><li><b>MAIN3</b>: Upper rotor (CCW)</li><li><b>MAIN4</b>: Lower rotor (CW)</li></ul></td>
</tr>
</tbody></table>
</div>

<table style="width: 100%; table-layout:fixed; font-size:1.5rem;">
 <colgroup><col style="width: 30%"><col style="width: 70%"></colgroup>
 <thead>
   <tr><th>Name</th><th></th></tr>
 </thead>
<tbody>
<tr id="copter_coaxial_helicopter_esky_(big)_lama_v4">
 <td style="vertical-align: top;">Esky (Big) Lama v4</td>
 <td style="vertical-align: top;"><p>Maintainer: Emmanuel Roussel</p><p><code>SYS_AUTOSTART</code> = 15001</p></td>

</tr>
</tbody></table>

### Dodecarotor cox

<div>
<img src="../../assets/airframes/types/DodecaRotorXCoaxial.svg" width="29%" style="max-height: 180px;"/>
<table style="float: right; width: 70%; font-size:1.5rem;">
 <colgroup><col></colgroup>
 <thead>
   <tr><th>Common Outputs</th></tr>
 </thead>
<tbody>
<tr>
 <td style="vertical-align: top;"><ul><li><b>MAIN1</b>: motor 1</li><li><b>MAIN2</b>: motor 2</li><li><b>MAIN3</b>: motor 3</li><li><b>MAIN4</b>: motor 4</li><li><b>MAIN5</b>: motor 5</li><li><b>MAIN6</b>: motor 6</li><li><b>AUX1</b>: motor 7</li><li><b>AUX2</b>: motor 8</li><li><b>AUX3</b>: motor 9</li><li><b>AUX4</b>: motor 10</li><li><b>AUX5</b>: motor 11</li><li><b>AUX6</b>: motor 12</li></ul></td>
</tr>
</tbody></table>
</div>

<table style="width: 100%; table-layout:fixed; font-size:1.5rem;">
 <colgroup><col style="width: 30%"><col style="width: 70%"></colgroup>
 <thead>
   <tr><th>Name</th><th></th></tr>
 </thead>
<tbody>
<tr id="copter_dodecarotor_cox_generic_dodecarotor_cox_geometry">
 <td style="vertical-align: top;">Generic Dodecarotor cox geometry</td>
 <td style="vertical-align: top;"><p>Maintainer: William Peale &lt;develop707@gmail.com&gt;</p><p><code>SYS_AUTOSTART</code> = 24001</p></td>

</tr>
</tbody></table>

### Helicopter

<div>
<img src="../../assets/airframes/types/Helicopter.svg" width="29%" style="max-height: 180px;"/>
<table style="float: right; width: 70%; font-size:1.5rem;">
 <colgroup><col></colgroup>
 <thead>
   <tr><th>Common Outputs</th></tr>
 </thead>
<tbody>
<tr>
 <td style="vertical-align: top;"><ul><li><b>MAIN1</b>: main motor</li><li><b>MAIN2</b>: front swashplate servo</li><li><b>MAIN3</b>: right swashplate servo</li><li><b>MAIN4</b>: left swashplate servo</li><li><b>MAIN5</b>: tail-rotor servo</li></ul></td>
</tr>
</tbody></table>
</div>

<table style="width: 100%; table-layout:fixed; font-size:1.5rem;">
 <colgroup><col style="width: 30%"><col style="width: 70%"></colgroup>
 <thead>
   <tr><th>Name</th><th></th></tr>
 </thead>
<tbody>
<tr id="copter_helicopter_blade_130x">
 <td style="vertical-align: top;">Blade 130X</td>
 <td style="vertical-align: top;"><p>Maintainer: Bart Slinger &lt;bartslinger@gmail.com&gt;</p><p><code>SYS_AUTOSTART</code> = 16001</p></td>

</tr>
</tbody></table>

### Hexarotor +

<div>
<img src="../../assets/airframes/types/HexaRotorPlus.svg" width="29%" style="max-height: 180px;"/>
<table style="float: right; width: 70%; font-size:1.5rem;">
 <colgroup><col></colgroup>
 <thead>
   <tr><th>Common Outputs</th></tr>
 </thead>
<tbody>
<tr>
 <td style="vertical-align: top;"><ul><li><b>MAIN1</b>: motor1</li><li><b>MAIN2</b>: motor2</li><li><b>MAIN3</b>: motor3</li><li><b>MAIN4</b>: motor4</li><li><b>MAIN5</b>: motor5</li><li><b>MAIN6</b>: motor6</li><li><b>AUX1</b>: feed-through of RC AUX1 channel</li><li><b>AUX2</b>: feed-through of RC AUX2 channel</li><li><b>AUX3</b>: feed-through of RC AUX3 channel</li></ul></td>
</tr>
</tbody></table>
</div>

<table style="width: 100%; table-layout:fixed; font-size:1.5rem;">
 <colgroup><col style="width: 30%"><col style="width: 70%"></colgroup>
 <thead>
   <tr><th>Name</th><th></th></tr>
 </thead>
<tbody>
<tr id="copter_hexarotor_+_generic_hexarotor_+_geometry">
 <td style="vertical-align: top;">Generic Hexarotor + geometry</td>
 <td style="vertical-align: top;"><p>Maintainer: Lorenz Meier &lt;lorenz@px4.io&gt;</p><p><code>SYS_AUTOSTART</code> = 7001</p></td>

</tr>
</tbody></table>

### Hexarotor Coaxial

<div>
<img src="../../assets/airframes/types/Y6B.svg" width="29%" style="max-height: 180px;"/>
<table style="float: right; width: 70%; font-size:1.5rem;">
 <colgroup><col></colgroup>
 <thead>
   <tr><th>Common Outputs</th></tr>
 </thead>
<tbody>
<tr>
 <td style="vertical-align: top;"><ul><li><b>MAIN1</b>: front right top, CW; angle:60; direction:CW</li><li><b>MAIN2</b>: front right bottom, CCW; angle:60; direction:CCW</li><li><b>MAIN3</b>: back top, CW; angle:180; direction:CW</li><li><b>MAIN4</b>: back bottom, CCW; angle:180; direction:CCW</li><li><b>MAIN5</b>: front left top, CW; angle:-60; direction:CW</li><li><b>MAIN6</b>: front left bottom, CCW;angle:-60; direction:CCW</li><li><b>AUX1</b>: feed-through of RC AUX1 channel</li><li><b>AUX2</b>: feed-through of RC AUX2 channel</li><li><b>AUX3</b>: feed-through of RC AUX3 channel</li></ul></td>
</tr>
</tbody></table>
</div>

<table style="width: 100%; table-layout:fixed; font-size:1.5rem;">
 <colgroup><col style="width: 30%"><col style="width: 70%"></colgroup>
 <thead>
   <tr><th>Name</th><th></th></tr>
 </thead>
<tbody>
<tr id="copter_hexarotor_coaxial_generic_hexarotor_coaxial_geometry">
 <td style="vertical-align: top;">Generic Hexarotor coaxial geometry</td>
 <td style="vertical-align: top;"><p>Maintainer: Lorenz Meier &lt;lorenz@px4.io&gt;</p><p><code>SYS_AUTOSTART</code> = 11001</p></td>

</tr>
</tbody></table>

### Hexarotor x

<div>
<img src="../../assets/airframes/types/HexaRotorX.svg" width="29%" style="max-height: 180px;"/>
<table style="float: right; width: 70%; font-size:1.5rem;">
 <colgroup><col></colgroup>
 <thead>
   <tr><th>Common Outputs</th></tr>
 </thead>
<tbody>
<tr>
 <td style="vertical-align: top;"><ul><li><b>MAIN1</b>: motor 1</li><li><b>MAIN2</b>: motor 2</li><li><b>MAIN3</b>: motor 3</li><li><b>MAIN4</b>: motor 4</li><li><b>MAIN5</b>: motor 5</li><li><b>MAIN6</b>: motor 6</li></ul></td>
</tr>
</tbody></table>
</div>

<table style="width: 100%; table-layout:fixed; font-size:1.5rem;">
 <colgroup><col style="width: 30%"><col style="width: 70%"></colgroup>
 <thead>
   <tr><th>Name</th><th></th></tr>
 </thead>
<tbody>
<tr id="copter_hexarotor_x_generic_hexarotor_x_geometry">
 <td style="vertical-align: top;">Generic Hexarotor x geometry</td>
 <td style="vertical-align: top;"><p>Maintainer: Lorenz Meier &lt;lorenz@px4.io&gt;</p><p><code>SYS_AUTOSTART</code> = 6001</p><p><b>Specific Outputs:</b><ul><li><b>AUX1</b>: feed-through of RC AUX1 channel</li><li><b>AUX2</b>: feed-through of RC AUX2 channel</li><li><b>AUX3</b>: feed-through of RC AUX3 channel</li></ul></p></td>

</tr>
<tr id="copter_hexarotor_x_uvify_draco-r">
 <td style="vertical-align: top;">UVify Draco-R</td>
 <td style="vertical-align: top;"><p>Maintainer: Hyon Lim &lt;lim@uvify.com&gt;</p><p><code>SYS_AUTOSTART</code> = 6002</p><p><b>Specific Outputs:</b><ul><li><b>AUX1</b>: feed-through of RC AUX1 channel</li><li><b>AUX2</b>: feed-through of RC AUX2 channel</li></ul></p></td>

</tr>
<tr id="copter_hexarotor_x_hex_x_with_control_allocation">
 <td style="vertical-align: top;">Hex X with control allocation</td>
 <td style="vertical-align: top;"><p>Maintainer: Silvan Fuhrer</p><p><code>SYS_AUTOSTART</code> = 6003</p></td>

</tr>
</tbody></table>

### Octo Coax Wide

<div>
<img src="../../assets/airframes/types/OctoRotorXCoaxial.svg" width="29%" style="max-height: 180px;"/>
<table style="float: right; width: 70%; font-size:1.5rem;">
 <colgroup><col></colgroup>
 <thead>
   <tr><th>Common Outputs</th></tr>
 </thead>
<tbody>
<tr>
 <td style="vertical-align: top;"><ul><li><b>MAIN1</b>: motor 1</li><li><b>MAIN2</b>: motor 2</li><li><b>MAIN3</b>: motor 3</li><li><b>MAIN4</b>: motor 4</li><li><b>MAIN5</b>: motor 5</li><li><b>MAIN6</b>: motor 6</li><li><b>MAIN7</b>: motor 7</li><li><b>MAIN8</b>: motor 8</li></ul></td>
</tr>
</tbody></table>
</div>

<table style="width: 100%; table-layout:fixed; font-size:1.5rem;">
 <colgroup><col style="width: 30%"><col style="width: 70%"></colgroup>
 <thead>
   <tr><th>Name</th><th></th></tr>
 </thead>
<tbody>
<tr id="copter_octo_coax_wide_steadidrone_mavrik">
 <td style="vertical-align: top;">Steadidrone MAVRIK</td>
 <td style="vertical-align: top;"><p>Maintainer: Simon Wilks &lt;simon@uaventure.com&gt;</p><p><code>SYS_AUTOSTART</code> = 12002</p></td>

</tr>
</tbody></table>

### Octorotor +

<div>
<img src="../../assets/airframes/types/OctoRotorPlus.svg" width="29%" style="max-height: 180px;"/>
<table style="float: right; width: 70%; font-size:1.5rem;">
 <colgroup><col></colgroup>
 <thead>
   <tr><th>Common Outputs</th></tr>
 </thead>
<tbody>
<tr>
 <td style="vertical-align: top;"><ul><li><b>MAIN1</b>: motor 1</li><li><b>MAIN2</b>: motor 2</li><li><b>MAIN3</b>: motor 3</li><li><b>MAIN4</b>: motor 4</li><li><b>MAIN5</b>: motor 5</li><li><b>MAIN6</b>: motor 6</li><li><b>MAIN7</b>: motor 7</li><li><b>MAIN8</b>: motor 8</li><li><b>AUX1</b>: feed-through of RC AUX1 channel</li><li><b>AUX2</b>: feed-through of RC AUX2 channel</li><li><b>AUX3</b>: feed-through of RC AUX3 channel</li></ul></td>
</tr>
</tbody></table>
</div>

<table style="width: 100%; table-layout:fixed; font-size:1.5rem;">
 <colgroup><col style="width: 30%"><col style="width: 70%"></colgroup>
 <thead>
   <tr><th>Name</th><th></th></tr>
 </thead>
<tbody>
<tr id="copter_octorotor_+_generic_octocopter_+_geometry">
 <td style="vertical-align: top;">Generic Octocopter + geometry</td>
 <td style="vertical-align: top;"><p>Maintainer: Lorenz Meier &lt;lorenz@px4.io&gt;</p><p><code>SYS_AUTOSTART</code> = 9001</p></td>

</tr>
</tbody></table>

### Octorotor Coaxial

<div>
<img src="../../assets/airframes/types/OctoRotorXCoaxial.svg" width="29%" style="max-height: 180px;"/>
<table style="float: right; width: 70%; font-size:1.5rem;">
 <colgroup><col></colgroup>
 <thead>
   <tr><th>Common Outputs</th></tr>
 </thead>
<tbody>
<tr>
 <td style="vertical-align: top;"><ul><li><b>MAIN1</b>: motor 1</li><li><b>MAIN2</b>: motor 2</li><li><b>MAIN3</b>: motor 3</li><li><b>MAIN4</b>: motor 4</li><li><b>MAIN5</b>: motor 5</li><li><b>MAIN6</b>: motor 6</li><li><b>MAIN7</b>: motor 7</li><li><b>MAIN8</b>: motor 8</li></ul></td>
</tr>
</tbody></table>
</div>

<table style="width: 100%; table-layout:fixed; font-size:1.5rem;">
 <colgroup><col style="width: 30%"><col style="width: 70%"></colgroup>
 <thead>
   <tr><th>Name</th><th></th></tr>
 </thead>
<tbody>
<tr id="copter_octorotor_coaxial_generic_10"_octo_coaxial_geometry">
 <td style="vertical-align: top;">Generic 10" Octo coaxial geometry</td>
 <td style="vertical-align: top;"><p>Maintainer: Lorenz Meier &lt;lorenz@px4.io&gt;</p><p><code>SYS_AUTOSTART</code> = 12001</p></td>

</tr>
</tbody></table>

### Octorotor x

<div>
<img src="../../assets/airframes/types/OctoRotorX.svg" width="29%" style="max-height: 180px;"/>
<table style="float: right; width: 70%; font-size:1.5rem;">
 <colgroup><col></colgroup>
 <thead>
   <tr><th>Common Outputs</th></tr>
 </thead>
<tbody>
<tr>
 <td style="vertical-align: top;"><ul><li><b>MAIN1</b>: motor 1</li><li><b>MAIN2</b>: motor 2</li><li><b>MAIN3</b>: motor 3</li><li><b>MAIN4</b>: motor 4</li><li><b>MAIN5</b>: motor 5</li><li><b>MAIN6</b>: motor 6</li><li><b>MAIN7</b>: motor 7</li><li><b>MAIN8</b>: motor 8</li><li><b>AUX1</b>: feed-through of RC AUX1 channel</li><li><b>AUX2</b>: feed-through of RC AUX2 channel</li><li><b>AUX3</b>: feed-through of RC AUX3 channel</li></ul></td>
</tr>
</tbody></table>
</div>

<table style="width: 100%; table-layout:fixed; font-size:1.5rem;">
 <colgroup><col style="width: 30%"><col style="width: 70%"></colgroup>
 <thead>
   <tr><th>Name</th><th></th></tr>
 </thead>
<tbody>
<tr id="copter_octorotor_x_generic_octocopter_x_geometry">
 <td style="vertical-align: top;">Generic Octocopter X geometry</td>
 <td style="vertical-align: top;"><p>Maintainer: Lorenz Meier &lt;lorenz@px4.io&gt;</p><p><code>SYS_AUTOSTART</code> = 8001</p></td>

</tr>
</tbody></table>

### Quadrotor +

<div>
<img src="../../assets/airframes/types/QuadRotorPlus.svg" width="29%" style="max-height: 180px;"/>
<table style="float: right; width: 70%; font-size:1.5rem;">
 <colgroup><col></colgroup>
 <thead>
   <tr><th>Common Outputs</th></tr>
 </thead>
<tbody>
<tr>
 <td style="vertical-align: top;"><ul><li><b>MAIN1</b>: motor 1</li><li><b>MAIN2</b>: motor 2</li><li><b>MAIN3</b>: motor 3</li><li><b>MAIN4</b>: motor 4</li><li><b>MAIN5</b>: feed-through of RC AUX1 channel</li><li><b>MAIN6</b>: feed-through of RC AUX2 channel</li><li><b>AUX1</b>: feed-through of RC AUX1 channel</li><li><b>AUX2</b>: feed-through of RC AUX2 channel</li><li><b>AUX3</b>: feed-through of RC AUX3 channel</li><li><b>AUX4</b>: feed-through of RC FLAPS channel</li></ul></td>
</tr>
</tbody></table>
</div>

<table style="width: 100%; table-layout:fixed; font-size:1.5rem;">
 <colgroup><col style="width: 30%"><col style="width: 70%"></colgroup>
 <thead>
   <tr><th>Name</th><th></th></tr>
 </thead>
<tbody>
<tr id="copter_quadrotor_+_generic_10"_quad_+_geometry">
 <td style="vertical-align: top;">Generic 10" Quad + geometry</td>
 <td style="vertical-align: top;"><p>Maintainer: Lorenz Meier &lt;lorenz@px4.io&gt;</p><p><code>SYS_AUTOSTART</code> = 5001</p></td>

</tr>
</tbody></table>

### Quadrotor H

<div>
<img src="../../assets/airframes/types/QuadRotorH.svg" width="29%" style="max-height: 180px;"/>
</div>

<table style="width: 100%; table-layout:fixed; font-size:1.5rem;">
 <colgroup><col style="width: 30%"><col style="width: 70%"></colgroup>
 <thead>
   <tr><th>Name</th><th></th></tr>
 </thead>
<tbody>
<tr id="copter_quadrotor_h_reaper_500_quad">
 <td style="vertical-align: top;">Reaper 500 Quad</td>
 <td style="vertical-align: top;"><p>Maintainer: Blankered</p><p><code>SYS_AUTOSTART</code> = 4040</p><p><b>Specific Outputs:</b><ul><li><b>MAIN1</b>: motor 1</li><li><b>MAIN2</b>: motor 2</li><li><b>MAIN3</b>: motor 3</li><li><b>MAIN4</b>: motor 4</li><li><b>MAIN5</b>: feed-through of RC AUX1 channel</li><li><b>MAIN6</b>: feed-through of RC AUX2 channel</li></ul></p></td>

</tr>
<tr id="copter_quadrotor_h_betafpv_beta75x_2s_brushless_whoop">
 <td style="vertical-align: top;">BetaFPV Beta75X 2S Brushless Whoop</td>
 <td style="vertical-align: top;"><p>Maintainer: Beat Kueng &lt;beat-kueng@gmx.net&gt;</p><p><code>SYS_AUTOSTART</code> = 4041</p><p><b>Specific Outputs:</b><ul><li><b>MAIN1</b>: motor 1</li><li><b>MAIN2</b>: motor 2</li><li><b>MAIN3</b>: motor 3</li><li><b>MAIN4</b>: motor 4</li></ul></p></td>

</tr>
</tbody></table>

### Quadrotor Wide

<div>
<img src="../../assets/airframes/types/QuadRotorWide.svg" width="29%" style="max-height: 180px;"/>
<table style="float: right; width: 70%; font-size:1.5rem;">
 <colgroup><col></colgroup>
 <thead>
   <tr><th>Common Outputs</th></tr>
 </thead>
<tbody>
<tr>
 <td style="vertical-align: top;"><ul><li><b>AUX1</b>: feed-through of RC AUX1 channel</li><li><b>AUX2</b>: feed-through of RC AUX2 channel</li><li><b>AUX3</b>: feed-through of RC AUX3 channel</li><li><b>AUX4</b>: feed-through of RC FLAPS channel</li></ul></td>
</tr>
</tbody></table>
</div>

<table style="width: 100%; table-layout:fixed; font-size:1.5rem;">
 <colgroup><col style="width: 30%"><col style="width: 70%"></colgroup>
 <thead>
   <tr><th>Name</th><th></th></tr>
 </thead>
<tbody>
<tr id="copter_quadrotor_wide_team_blacksheep_discovery">
 <td style="vertical-align: top;">Team Blacksheep Discovery</td>
 <td style="vertical-align: top;"><p>Maintainer: Lorenz Meier &lt;lorenz@px4.io&gt;</p><p><code>SYS_AUTOSTART</code> = 10015</p><p><b>Specific Outputs:</b><ul><li><b>MAIN1</b>: motor 1</li><li><b>MAIN2</b>: motor 2</li><li><b>MAIN3</b>: motor 3</li><li><b>MAIN4</b>: motor 4</li><li><b>MAIN5</b>: feed-through of RC AUX1 channel</li><li><b>MAIN6</b>: feed-through of RC AUX2 channel</li></ul></p></td>

</tr>
<tr id="copter_quadrotor_wide_3dr_iris_quadrotor">
 <td style="vertical-align: top;">3DR Iris Quadrotor</td>
 <td style="vertical-align: top;"><p>Maintainer: Lorenz Meier &lt;lorenz@px4.io&gt;</p><p><code>SYS_AUTOSTART</code> = 10016</p><p><b>Specific Outputs:</b><ul><li><b>MAIN1</b>: motor 1</li><li><b>MAIN2</b>: motor 2</li><li><b>MAIN3</b>: motor 3</li><li><b>MAIN4</b>: motor 4</li></ul></p></td>

</tr>
<tr id="copter_quadrotor_wide_steadidrone_qu4d">
 <td style="vertical-align: top;">Steadidrone QU4D</td>
 <td style="vertical-align: top;"><p>Maintainer: Lorenz Meier &lt;lorenz@px4.io&gt;</p><p><code>SYS_AUTOSTART</code> = 10017</p><p><b>Specific Outputs:</b><ul><li><b>MAIN1</b>: motor 1</li><li><b>MAIN2</b>: motor 2</li><li><b>MAIN3</b>: motor 3</li><li><b>MAIN4</b>: motor 4</li><li><b>MAIN5</b>: feed-through of RC AUX1 channel</li><li><b>MAIN6</b>: feed-through of RC AUX2 channel</li></ul></p></td>

</tr>
<tr id="copter_quadrotor_wide_team_blacksheep_discovery_endurance">
 <td style="vertical-align: top;">Team Blacksheep Discovery Endurance</td>
 <td style="vertical-align: top;"><p>Maintainer: Simon Wilks &lt;simon@uaventure.com&gt;</p><p><code>SYS_AUTOSTART</code> = 10018</p><p><b>Specific Outputs:</b><ul><li><b>MAIN1</b>: motor 1</li><li><b>MAIN2</b>: motor 2</li><li><b>MAIN3</b>: motor 3</li><li><b>MAIN4</b>: motor 4</li><li><b>MAIN5</b>: feed-through of RC AUX1 channel</li><li><b>MAIN6</b>: feed-through of RC AUX2 channel</li></ul></p></td>

</tr>
</tbody></table>

### Quadrotor asymmetric

<div>
<img src="../../assets/airframes/types/AirframeUnknown.svg" width="29%" style="max-height: 180px;"/>
<table style="float: right; width: 70%; font-size:1.5rem;">
 <colgroup><col></colgroup>
 <thead>
   <tr><th>Common Outputs</th></tr>
 </thead>
<tbody>
<tr>
 <td style="vertical-align: top;"><ul><li><b>MAIN1</b>: motor1 (front right: CCW)</li><li><b>MAIN2</b>: motor2 (back left: CCW)</li><li><b>MAIN3</b>: motor3 (front left: CW)</li><li><b>MAIN4</b>: motor4 (back right: CW)</li><li><b>MAIN5</b>: feed-through of RC AUX1 channel</li><li><b>MAIN6</b>: feed-through of RC AUX2 channel</li></ul></td>
</tr>
</tbody></table>
</div>

<table style="width: 100%; table-layout:fixed; font-size:1.5rem;">
 <colgroup><col style="width: 30%"><col style="width: 70%"></colgroup>
 <thead>
   <tr><th>Name</th><th></th></tr>
 </thead>
<tbody>
<tr id="copter_quadrotor_asymmetric_spedix_s250aq">
 <td style="vertical-align: top;"><a href="https://docs.px4.io/master/en/frames_multicopter/spedix_s250_pixracer.html">Spedix S250AQ</a></td>
 <td style="vertical-align: top;"><p>Maintainer: Lorenz Meier &lt;lorenz@px4.io&gt;</p><p><code>SYS_AUTOSTART</code> = 4051</p></td>

</tr>
</tbody></table>

### Quadrotor x

<div>
<img src="../../assets/airframes/types/QuadRotorX.svg" width="29%" style="max-height: 180px;"/>
<table style="float: right; width: 70%; font-size:1.5rem;">
 <colgroup><col></colgroup>
 <thead>
   <tr><th>Common Outputs</th></tr>
 </thead>
<tbody>
<tr>
 <td style="vertical-align: top;"><ul><li><b>AUX1</b>: feed-through of RC AUX1 channel</li><li><b>AUX2</b>: feed-through of RC AUX2 channel</li><li><b>AUX3</b>: feed-through of RC AUX3 channel</li><li><b>AUX4</b>: feed-through of RC FLAPS channel</li></ul></td>
</tr>
</tbody></table>
</div>

<table style="width: 100%; table-layout:fixed; font-size:1.5rem;">
 <colgroup><col style="width: 30%"><col style="width: 70%"></colgroup>
 <thead>
   <tr><th>Name</th><th></th></tr>
 </thead>
<tbody>
<tr id="copter_quadrotor_x_generic_quadcopter">
 <td style="vertical-align: top;">Generic Quadcopter</td>
 <td style="vertical-align: top;"><p>Maintainer: Lorenz Meier &lt;lorenz@px4.io&gt;</p><p><code>SYS_AUTOSTART</code> = 4001</p><p><b>Specific Outputs:</b><ul><li><b>MAIN1</b>: motor 1</li><li><b>MAIN2</b>: motor 2</li><li><b>MAIN3</b>: motor 3</li><li><b>MAIN4</b>: motor 4</li><li><b>MAIN5</b>: feed-through of RC AUX1 channel</li><li><b>MAIN6</b>: feed-through of RC AUX2 channel</li></ul></p></td>

</tr>
<tr id="copter_quadrotor_x_lumenier_qav-r_(raceblade)_5"_arms">
 <td style="vertical-align: top;">Lumenier QAV-R (raceblade) 5" arms</td>
 <td style="vertical-align: top;"><p>Maintainer: James Goppert &lt;james.goppert@gmail.com&gt;</p><p><code>SYS_AUTOSTART</code> = 4003</p></td>

</tr>
<tr id="copter_quadrotor_x_lumenier_qav250">
 <td style="vertical-align: top;">Lumenier QAV250</td>
 <td style="vertical-align: top;"><p>Maintainer: Lorenz Meier &lt;lorenz@px4.io&gt;</p><p><code>SYS_AUTOSTART</code> = 4009</p></td>

</tr>
<tr id="copter_quadrotor_x_dji_f330_w/_dji_escs">
 <td style="vertical-align: top;">DJI F330 w/ DJI ESCs</td>
 <td style="vertical-align: top;"><p>Maintainer: Lorenz Meier &lt;lorenz@px4.io&gt;</p><p><code>SYS_AUTOSTART</code> = 4010</p></td>

</tr>
<tr id="copter_quadrotor_x_dji_f450_w/_dji_escs">
 <td style="vertical-align: top;">DJI F450 w/ DJI ESCs</td>
 <td style="vertical-align: top;"><p>Maintainer: Lorenz Meier &lt;lorenz@px4.io&gt;</p><p><code>SYS_AUTOSTART</code> = 4011</p></td>

</tr>
<tr id="copter_quadrotor_x_s500_generic">
 <td style="vertical-align: top;">S500 Generic</td>
 <td style="vertical-align: top;"><p>Maintainer: Lorenz Meier &lt;lorenz@px4.io&gt;</p><p><code>SYS_AUTOSTART</code> = 4014</p></td>

</tr>
<tr id="copter_quadrotor_x_holybro_s500">
 <td style="vertical-align: top;">Holybro S500</td>
 <td style="vertical-align: top;"><p>Maintainer: Lorenz Meier &lt;lorenz@px4.io&gt;</p><p><code>SYS_AUTOSTART</code> = 4015</p></td>

</tr>
<tr id="copter_quadrotor_x_px4_vision_devkit_platform">
 <td style="vertical-align: top;">PX4 Vision DevKit Platform</td>
 <td style="vertical-align: top;"><p>Maintainer: John Doe &lt;john@example.com&gt;</p><p><code>SYS_AUTOSTART</code> = 4016</p><p><b>Specific Outputs:</b><ul><li><b>MAIN1</b>: motor 1</li><li><b>MAIN2</b>: motor 2</li><li><b>MAIN3</b>: motor 3</li><li><b>MAIN4</b>: motor 4</li></ul></p></td>

</tr>
<tr id="copter_quadrotor_x_nxp_hovergames">
 <td style="vertical-align: top;">NXP HoverGames</td>
 <td style="vertical-align: top;"><p>Maintainer: Iain Galloway &lt;iain.galloway@nxp.com&gt;</p><p><code>SYS_AUTOSTART</code> = 4017</p><p><b>Specific Outputs:</b><ul><li><b>MAIN1</b>: motor 1</li><li><b>MAIN2</b>: motor 2</li><li><b>MAIN3</b>: motor 3</li><li><b>MAIN4</b>: motor 4</li></ul></p></td>

</tr>
<tr id="copter_quadrotor_x_s500_with_control_allocation">
 <td style="vertical-align: top;">S500 with control allocation</td>
 <td style="vertical-align: top;"><p>Maintainer: Silvan Fuhrer</p><p><code>SYS_AUTOSTART</code> = 4018</p></td>

</tr>
<tr id="copter_quadrotor_x_3dr_solo">
 <td style="vertical-align: top;">3DR Solo</td>
 <td style="vertical-align: top;"><p>Maintainer: Andreas Antener &lt;andreas@uaventure.com&gt;</p><p><code>SYS_AUTOSTART</code> = 4030</p></td>

</tr>
<tr id="copter_quadrotor_x_3dr_diy_quad">
 <td style="vertical-align: top;">3DR DIY Quad</td>
 <td style="vertical-align: top;"><p>Maintainer: Lorenz Meier &lt;lorenz@px4.io&gt;</p><p><code>SYS_AUTOSTART</code> = 4031</p></td>

</tr>
<tr id="copter_quadrotor_x_generic_250_racer">
 <td style="vertical-align: top;">Generic 250 Racer</td>
 <td style="vertical-align: top;"><p>Maintainer: Lorenz Meier &lt;lorenz@px4.io&gt;</p><p><code>SYS_AUTOSTART</code> = 4050</p></td>

</tr>
<tr id="copter_quadrotor_x_holybro_qav250">
 <td style="vertical-align: top;"><a href="https://docs.px4.io/master/en/frames_multicopter/holybro_qav250_pixhawk4_mini.html">HolyBro QAV250</a></td>
 <td style="vertical-align: top;"><p>Maintainer: Beat Kueng &lt;beat-kueng@gmx.net&gt;</p><p><code>SYS_AUTOSTART</code> = 4052</p></td>

</tr>
<tr id="copter_quadrotor_x_holybro_kopis_2">
 <td style="vertical-align: top;">Holybro Kopis 2</td>
 <td style="vertical-align: top;"><p>Maintainer: Beat Kueng &lt;beat@px4.io&gt;</p><p><code>SYS_AUTOSTART</code> = 4053</p></td>

</tr>
<tr id="copter_quadrotor_x_dji_matrice_100">
 <td style="vertical-align: top;">DJI Matrice 100</td>
 <td style="vertical-align: top;"><p>Maintainer: James Goppert &lt;james.goppert@gmail.com&gt;</p><p><code>SYS_AUTOSTART</code> = 4060</p></td>

</tr>
<tr id="copter_quadrotor_x_uvify_ifo">
 <td style="vertical-align: top;">UVify IFO</td>
 <td style="vertical-align: top;"><p>Maintainer: Hyon Lim &lt;lim@uvify.com&gt;</p><p><code>SYS_AUTOSTART</code> = 4071</p><p><b>Specific Outputs:</b><ul><li><b>MAIN1</b>: motor 1</li><li><b>MAIN2</b>: motor 2</li><li><b>MAIN3</b>: motor 3</li><li><b>MAIN4</b>: motor 4</li></ul></p></td>

</tr>
<tr id="copter_quadrotor_x_uvify_draco">
 <td style="vertical-align: top;">UVify Draco</td>
 <td style="vertical-align: top;"><p>Maintainer: Hyon Lim &lt;lim@uvify.com&gt;</p><p><code>SYS_AUTOSTART</code> = 4072</p><p><b>Specific Outputs:</b><ul><li><b>MAIN1</b>: motor 1</li><li><b>MAIN2</b>: motor 2</li><li><b>MAIN3</b>: motor 3</li><li><b>MAIN4</b>: motor 4</li></ul></p></td>

</tr>
<tr id="copter_quadrotor_x_uvify_ifo">
 <td style="vertical-align: top;">UVify IFO</td>
 <td style="vertical-align: top;"><p>Maintainer: Hyon Lim &lt;lim@uvify.com&gt;</p><p><code>SYS_AUTOSTART</code> = 4073</p><p><b>Specific Outputs:</b><ul><li><b>MAIN1</b>: motor 1</li><li><b>MAIN2</b>: motor 2</li><li><b>MAIN3</b>: motor 3</li><li><b>MAIN4</b>: motor 4</li></ul></p></td>

</tr>
<tr id="copter_quadrotor_x_zmr250_racer">
 <td style="vertical-align: top;">ZMR250 Racer</td>
 <td style="vertical-align: top;"><p>Maintainer: Anton Matosov &lt;anton.matosov@gmail.com&gt;</p><p><code>SYS_AUTOSTART</code> = 4080</p></td>

</tr>
<tr id="copter_quadrotor_x_nanomind_110_quad">
 <td style="vertical-align: top;">NanoMind 110 Quad</td>
 <td style="vertical-align: top;"><p>Maintainer: Henry Zhang &lt;zhanghui629@gmail.com&gt;</p><p><code>SYS_AUTOSTART</code> = 4090</p></td>

</tr>
<tr id="copter_quadrotor_x_teal_one">
 <td style="vertical-align: top;">Teal One</td>
 <td style="vertical-align: top;"><p>Maintainer: Matt McFadden &lt;matt.mcfadden@tealdrones.com&gt;</p><p><code>SYS_AUTOSTART</code> = 4250</p><p><b>Specific Outputs:</b><ul><li><b>MAIN1</b>: motor 1</li><li><b>MAIN2</b>: motor 2</li><li><b>MAIN3</b>: motor 3</li><li><b>MAIN4</b>: motor 4</li></ul></p></td>

</tr>
<tr id="copter_quadrotor_x_coex_clover_4">
 <td style="vertical-align: top;">COEX Clover 4</td>
 <td style="vertical-align: top;"><p>Maintainer: Oleg Kalachev &lt;okalachev@gmail.com&gt;</p><p><code>SYS_AUTOSTART</code> = 4500</p></td>

</tr>
<tr id="copter_quadrotor_x_crazyflie_2">
 <td style="vertical-align: top;">Crazyflie 2</td>
 <td style="vertical-align: top;"><p>Maintainer: Dennis Shtatov &lt;densht@gmail.com&gt;</p><p><code>SYS_AUTOSTART</code> = 4900</p></td>

</tr>
<tr id="copter_quadrotor_x_crazyflie_2.1">
 <td style="vertical-align: top;">Crazyflie 2.1</td>
 <td style="vertical-align: top;"><p>Maintainer: Dennis Shtatov &lt;densht@gmail.com&gt;</p><p><code>SYS_AUTOSTART</code> = 4901</p></td>

</tr>
</tbody></table>

### Simulation (Copter)

<div>
<img src="../../assets/airframes/types/AirframeUnknown.svg" width="29%" style="max-height: 180px;"/>
</div>

<table style="width: 100%; table-layout:fixed; font-size:1.5rem;">
 <colgroup><col style="width: 30%"><col style="width: 70%"></colgroup>
 <thead>
   <tr><th>Name</th><th></th></tr>
 </thead>
<tbody>
<tr id="copter_simulation_(copter)_hil_quadcopter_x">
 <td style="vertical-align: top;">HIL Quadcopter X</td>
 <td style="vertical-align: top;"><p>Maintainer: Lorenz Meier &lt;lorenz@px4.io&gt;</p><p><code>SYS_AUTOSTART</code> = 1001</p></td>

</tr>
<tr id="copter_simulation_(copter)_sih_quadcopter_x">
 <td style="vertical-align: top;">SIH Quadcopter X</td>
 <td style="vertical-align: top;"><p>Maintainer: Romain Chiappinelli &lt;romain.chiap@gmail.com&gt;</p><p><code>SYS_AUTOSTART</code> = 1100</p></td>

</tr>
</tbody></table>

### Tilt-Quad

<div>
<img src="../../assets/airframes/types/AirframeUnknown.svg" width="29%" style="max-height: 180px;"/>
<table style="float: right; width: 70%; font-size:1.5rem;">
 <colgroup><col></colgroup>
 <thead>
   <tr><th>Common Outputs</th></tr>
 </thead>
<tbody>
<tr>
 <td style="vertical-align: top;"><ul><li><b>MAIN1</b>: motor 1</li><li><b>MAIN2</b>: motor 2</li><li><b>MAIN3</b>: motor 3</li><li><b>MAIN4</b>: motor 4</li><li><b>AUX1</b>: Outer servo motor for rotor 2 arm</li><li><b>AUX2</b>: Outer servo motor for rotor 4 arm</li><li><b>AUX3</b>: Inner servo motor for rotor 2 arm</li><li><b>AUX4</b>: Inner servo motor for rotor 4 arm</li></ul></td>
</tr>
</tbody></table>
</div>

<table style="width: 100%; table-layout:fixed; font-size:1.5rem;">
 <colgroup><col style="width: 30%"><col style="width: 70%"></colgroup>
 <thead>
   <tr><th>Name</th><th></th></tr>
 </thead>
<tbody>
<tr id="copter_tilt-quad_tilt-quadrotor">
 <td style="vertical-align: top;"><a href="http://www.alivaero.com/the-project.html">Tilt-Quadrotor</a></td>
 <td style="vertical-align: top;"><p>Maintainer: Ricardo Marques &lt;marques.ricardo17@gmail.com&gt;</p><p><code>SYS_AUTOSTART</code> = 4100</p></td>

</tr>
</tbody></table>

### Tricopter Y+

<div>
<img src="../../assets/airframes/types/YPlus.svg" width="29%" style="max-height: 180px;"/>
<table style="float: right; width: 70%; font-size:1.5rem;">
 <colgroup><col></colgroup>
 <thead>
   <tr><th>Common Outputs</th></tr>
 </thead>
<tbody>
<tr>
 <td style="vertical-align: top;"><ul><li><b>MAIN1</b>: motor 1</li><li><b>MAIN2</b>: motor 2</li><li><b>MAIN3</b>: motor 3</li><li><b>MAIN4</b>: yaw servo</li></ul></td>
</tr>
</tbody></table>
</div>

<table style="width: 100%; table-layout:fixed; font-size:1.5rem;">
 <colgroup><col style="width: 30%"><col style="width: 70%"></colgroup>
 <thead>
   <tr><th>Name</th><th></th></tr>
 </thead>
<tbody>
<tr id="copter_tricopter_y+_generic_tricopter_y+_geometry">
 <td style="vertical-align: top;">Generic Tricopter Y+ Geometry</td>
 <td style="vertical-align: top;"><p>Maintainer: Trent Lukaczyk &lt;aerialhedgehog@gmail.com&gt;</p><p><code>SYS_AUTOSTART</code> = 14001</p></td>

</tr>
</tbody></table>

### Tricopter Y-

<div>
<img src="../../assets/airframes/types/YMinus.svg" width="29%" style="max-height: 180px;"/>
<table style="float: right; width: 70%; font-size:1.5rem;">
 <colgroup><col></colgroup>
 <thead>
   <tr><th>Common Outputs</th></tr>
 </thead>
<tbody>
<tr>
 <td style="vertical-align: top;"><ul><li><b>MAIN1</b>: motor 1</li><li><b>MAIN2</b>: motor 2</li><li><b>MAIN3</b>: motor 3</li><li><b>MAIN4</b>: yaw servo</li></ul></td>
</tr>
</tbody></table>
</div>

<table style="width: 100%; table-layout:fixed; font-size:1.5rem;">
 <colgroup><col style="width: 30%"><col style="width: 70%"></colgroup>
 <thead>
   <tr><th>Name</th><th></th></tr>
 </thead>
<tbody>
<tr id="copter_tricopter_y-_generic_tricopter_y-_geometry">
 <td style="vertical-align: top;">Generic Tricopter Y- Geometry</td>
 <td style="vertical-align: top;"><p>Maintainer: Trent Lukaczyk &lt;aerialhedgehog@gmail.com&gt;</p><p><code>SYS_AUTOSTART</code> = 14002</p></td>

</tr>
</tbody></table>

## Plane

### Flying Wing

<div>
<img src="../../assets/airframes/types/FlyingWing.svg" width="29%" style="max-height: 180px;"/>
<table style="float: right; width: 70%; font-size:1.5rem;">
 <colgroup><col></colgroup>
 <thead>
   <tr><th>Common Outputs</th></tr>
 </thead>
<tbody>
<tr>
 <td style="vertical-align: top;"><ul><li><b>AUX1</b>: feed-through of RC AUX1 channel</li><li><b>AUX2</b>: feed-through of RC AUX2 channel</li><li><b>AUX3</b>: feed-through of RC AUX3 channel</li></ul></td>
</tr>
</tbody></table>
</div>

<table style="width: 100%; table-layout:fixed; font-size:1.5rem;">
 <colgroup><col style="width: 30%"><col style="width: 70%"></colgroup>
 <thead>
   <tr><th>Name</th><th></th></tr>
 </thead>
<tbody>
<tr id="plane_flying_wing_generic_flying_wing">
 <td style="vertical-align: top;">Generic Flying Wing</td>
 <td style="vertical-align: top;"><p><code>SYS_AUTOSTART</code> = 3000</p><p><b>Specific Outputs:</b><ul><li><b>MAIN1</b>: left aileron</li><li><b>MAIN2</b>: right aileron</li><li><b>MAIN4</b>: throttle</li></ul></p></td>

</tr>
<tr id="plane_flying_wing_io_camflyer">
 <td style="vertical-align: top;">IO Camflyer</td>
 <td style="vertical-align: top;"><p>Maintainer: Simon Wilks &lt;simon@uaventure.com&gt;</p><p><code>SYS_AUTOSTART</code> = 3030</p><p><b>Specific Outputs:</b><ul><li><b>MAIN1</b>: left aileron</li><li><b>MAIN2</b>: right aileron</li><li><b>MAIN4</b>: throttle</li></ul></p></td>

</tr>
<tr id="plane_flying_wing_phantom_fpv_flying_wing">
 <td style="vertical-align: top;"><a href="https://docs.px4.io/master/en/frames_plane/wing_wing_z84.html">Phantom FPV Flying Wing</a></td>
 <td style="vertical-align: top;"><p>Maintainer: Simon Wilks &lt;simon@uaventure.com&gt;</p><p><code>SYS_AUTOSTART</code> = 3031</p><p><b>Specific Outputs:</b><ul><li><b>MAIN1</b>: left aileron</li><li><b>MAIN2</b>: right aileron</li><li><b>MAIN4</b>: throttle</li></ul></p></td>

</tr>
<tr id="plane_flying_wing_skywalker_x5_flying_wing">
 <td style="vertical-align: top;">Skywalker X5 Flying Wing</td>
 <td style="vertical-align: top;"><p>Maintainer: Julian Oes &lt;julian@px4.io&gt;</p><p><code>SYS_AUTOSTART</code> = 3032</p><p><b>Specific Outputs:</b><ul><li><b>MAIN1</b>: left aileron</li><li><b>MAIN2</b>: right aileron</li><li><b>MAIN4</b>: throttle</li></ul></p></td>

</tr>
<tr id="plane_flying_wing_wing_wing_(aka_z-84)_flying_wing">
 <td style="vertical-align: top;"><a href="https://docs.px4.io/master/en/frames_plane/wing_wing_z84.html">Wing Wing (aka Z-84) Flying Wing</a></td>
 <td style="vertical-align: top;"><p>Maintainer: Lorenz Meier &lt;lorenz@px4.io&gt;</p><p><code>SYS_AUTOSTART</code> = 3033</p><p><b>Specific Outputs:</b><ul><li><b>MAIN1</b>: left aileron</li><li><b>MAIN2</b>: right aileron</li><li><b>MAIN4</b>: throttle</li></ul></p></td>

</tr>
<tr id="plane_flying_wing_fx-79_buffalo_flying_wing">
 <td style="vertical-align: top;">FX-79 Buffalo Flying Wing</td>
 <td style="vertical-align: top;"><p>Maintainer: Simon Wilks &lt;simon@uaventure.com&gt;</p><p><code>SYS_AUTOSTART</code> = 3034</p><p><b>Specific Outputs:</b><ul><li><b>MAIN1</b>: right aileron</li><li><b>MAIN2</b>: left aileron</li><li><b>MAIN4</b>: throttle</li></ul></p></td>

</tr>
<tr id="plane_flying_wing_viper">
 <td style="vertical-align: top;">Viper</td>
 <td style="vertical-align: top;"><p>Maintainer: Simon Wilks &lt;simon@uaventure.com&gt;</p><p><code>SYS_AUTOSTART</code> = 3035</p><p><b>Specific Outputs:</b><ul><li><b>MAIN1</b>: left aileron</li><li><b>MAIN2</b>: right aileron</li><li><b>MAIN4</b>: throttle</li></ul></p></td>

</tr>
<tr id="plane_flying_wing_sparkle_tech_pigeon">
 <td style="vertical-align: top;"><a href="http://www.sparkletech.hk/">Sparkle Tech Pigeon</a></td>
 <td style="vertical-align: top;"><p>Maintainer: Simon Wilks &lt;simon@uaventure.com&gt;</p><p><code>SYS_AUTOSTART</code> = 3036</p><p><b>Specific Outputs:</b><ul><li><b>MAIN1</b>: left aileron</li><li><b>MAIN2</b>: right aileron</li><li><b>MAIN4</b>: throttle</li></ul></p></td>

</tr>
<tr id="plane_flying_wing_modified_parrot_disco">
 <td style="vertical-align: top;">Modified Parrot Disco</td>
 <td style="vertical-align: top;"><p>Maintainer: Jan Liphardt &lt;JTLiphardt@gmail.com&gt;</p><p><code>SYS_AUTOSTART</code> = 3037</p><p><b>Specific Outputs:</b><ul><li><b>MAIN1</b>: left aileron</li><li><b>MAIN2</b>: right aileron</li><li><b>MAIN4</b>: throttle</li></ul></p></td>

</tr>
<tr id="plane_flying_wing_tbs_caipirinha">
 <td style="vertical-align: top;">TBS Caipirinha</td>
 <td style="vertical-align: top;"><p>Maintainer: Lorenz Meier &lt;lorenz@px4.io&gt;</p><p><code>SYS_AUTOSTART</code> = 3100</p><p><b>Specific Outputs:</b><ul><li><b>MAIN1</b>: left aileron</li><li><b>MAIN2</b>: right aileron</li><li><b>MAIN4</b>: throttle</li></ul></p></td>

</tr>
</tbody></table>

### Plane A-Tail

<div>
<img src="../../assets/airframes/types/PlaneATail.svg" width="29%" style="max-height: 180px;"/>
<table style="float: right; width: 70%; font-size:1.5rem;">
 <colgroup><col></colgroup>
 <thead>
   <tr><th>Common Outputs</th></tr>
 </thead>
<tbody>
<tr>
 <td style="vertical-align: top;"><ul><li><b>MAIN1</b>: aileron right</li><li><b>MAIN2</b>: aileron left</li><li><b>MAIN3</b>: v-tail right</li><li><b>MAIN4</b>: v-tail left</li><li><b>MAIN5</b>: throttle</li><li><b>MAIN6</b>: wheel</li><li><b>MAIN7</b>: flaps right</li><li><b>MAIN8</b>: flaps left</li><li><b>AUX1</b>: feed-through of RC AUX1 channel</li><li><b>AUX2</b>: feed-through of RC AUX2 channel</li><li><b>AUX3</b>: feed-through of RC AUX3 channel</li></ul></td>
</tr>
</tbody></table>
</div>

<table style="width: 100%; table-layout:fixed; font-size:1.5rem;">
 <colgroup><col style="width: 30%"><col style="width: 70%"></colgroup>
 <thead>
   <tr><th>Name</th><th></th></tr>
 </thead>
<tbody>
<tr id="plane_plane_a-tail_applied_aeronautics_albatross">
 <td style="vertical-align: top;">Applied Aeronautics Albatross</td>
 <td style="vertical-align: top;"><p>Maintainer: Andreas Antener &lt;andreas@uaventure.com&gt;</p><p><code>SYS_AUTOSTART</code> = 2106</p></td>

</tr>
</tbody></table>

### Plane V-Tail

<div>
<img src="../../assets/airframes/types/PlaneVTail.svg" width="29%" style="max-height: 180px;"/>
<table style="float: right; width: 70%; font-size:1.5rem;">
 <colgroup><col></colgroup>
 <thead>
   <tr><th>Common Outputs</th></tr>
 </thead>
<tbody>
<tr>
 <td style="vertical-align: top;"><ul><li><b>MAIN1</b>: aileron right</li><li><b>MAIN2</b>: aileron left</li><li><b>MAIN3</b>: v-tail right</li><li><b>MAIN4</b>: v-tail left</li><li><b>MAIN5</b>: throttle</li><li><b>MAIN6</b>: wheel</li><li><b>MAIN7</b>: flaps right</li><li><b>MAIN8</b>: flaps left</li><li><b>AUX1</b>: feed-through of RC AUX1 channel</li><li><b>AUX2</b>: feed-through of RC AUX2 channel</li><li><b>AUX3</b>: feed-through of RC AUX3 channel</li></ul></td>
</tr>
</tbody></table>
</div>

<table style="width: 100%; table-layout:fixed; font-size:1.5rem;">
 <colgroup><col style="width: 30%"><col style="width: 70%"></colgroup>
 <thead>
   <tr><th>Name</th><th></th></tr>
 </thead>
<tbody>
<tr id="plane_plane_v-tail_x-uav_mini_talon">
 <td style="vertical-align: top;">X-UAV Mini Talon</td>
 <td style="vertical-align: top;"><p>Maintainer: Friedrich Beckmann &lt;friedrich.beckmann@hs-augsburg.de&gt;</p><p><code>SYS_AUTOSTART</code> = 2200</p></td>

</tr>
</tbody></table>

### Simulation (Plane)

<div>
<img src="../../assets/airframes/types/AirframeUnknown.svg" width="29%" style="max-height: 180px;"/>
<table style="float: right; width: 70%; font-size:1.5rem;">
 <colgroup><col></colgroup>
 <thead>
   <tr><th>Common Outputs</th></tr>
 </thead>
<tbody>
<tr>
 <td style="vertical-align: top;"><ul><li><b>MAIN1</b>: aileron</li><li><b>MAIN2</b>: elevator</li><li><b>MAIN3</b>: rudder</li><li><b>MAIN4</b>: throttle</li><li><b>MAIN5</b>: flaps</li><li><b>MAIN6</b>: gear</li></ul></td>
</tr>
</tbody></table>
</div>

<table style="width: 100%; table-layout:fixed; font-size:1.5rem;">
 <colgroup><col style="width: 30%"><col style="width: 70%"></colgroup>
 <thead>
   <tr><th>Name</th><th></th></tr>
 </thead>
<tbody>
<tr id="plane_simulation_(plane)_hilstar_(xplane)">
 <td style="vertical-align: top;">HILStar (XPlane)</td>
 <td style="vertical-align: top;"><p>Maintainer: Lorenz Meier &lt;lorenz@px4.io&gt;</p><p><code>SYS_AUTOSTART</code> = 1000</p></td>

</tr>
</tbody></table>

### Standard Plane

<div>
<img src="../../assets/airframes/types/Plane.svg" width="29%" style="max-height: 180px;"/>
<table style="float: right; width: 70%; font-size:1.5rem;">
 <colgroup><col></colgroup>
 <thead>
   <tr><th>Common Outputs</th></tr>
 </thead>
<tbody>
<tr>
 <td style="vertical-align: top;"><ul><li><b>AUX1</b>: feed-through of RC AUX1 channel</li><li><b>AUX2</b>: feed-through of RC AUX2 channel</li><li><b>AUX3</b>: feed-through of RC AUX3 channel</li></ul></td>
</tr>
</tbody></table>
</div>

<table style="width: 100%; table-layout:fixed; font-size:1.5rem;">
 <colgroup><col style="width: 30%"><col style="width: 70%"></colgroup>
 <thead>
   <tr><th>Name</th><th></th></tr>
 </thead>
<tbody>
<tr id="plane_standard_plane_standard_plane">
 <td style="vertical-align: top;">Standard Plane</td>
 <td style="vertical-align: top;"><p>Maintainer: Lorenz Meier &lt;lorenz@px4.io&gt;</p><p><code>SYS_AUTOSTART</code> = 2100</p><p><b>Specific Outputs:</b><ul><li><b>MAIN1</b>: aileron</li><li><b>MAIN2</b>: elevator</li><li><b>MAIN3</b>: throttle</li><li><b>MAIN4</b>: rudder</li><li><b>MAIN5</b>: flaps</li><li><b>MAIN6</b>: gear</li></ul></p></td>

</tr>
<tr id="plane_standard_plane_bormatec_maja">
 <td style="vertical-align: top;">Bormatec Maja</td>
 <td style="vertical-align: top;"><p>Maintainer: Andreas Antener &lt;andreas@uaventure.com&gt;</p><p><code>SYS_AUTOSTART</code> = 2105</p><p><b>Specific Outputs:</b><ul><li><b>MAIN1</b>: aileron</li><li><b>MAIN2</b>: aileron</li><li><b>MAIN3</b>: elevator</li><li><b>MAIN4</b>: rudder</li><li><b>MAIN5</b>: throttle</li><li><b>MAIN6</b>: wheel</li><li><b>MAIN7</b>: flaps</li></ul></p></td>

</tr>
</tbody></table>

## Rover

### Rover

<div>
<img src="../../assets/airframes/types/Rover.svg" width="29%" style="max-height: 180px;"/>
</div>

<table style="width: 100%; table-layout:fixed; font-size:1.5rem;">
 <colgroup><col style="width: 30%"><col style="width: 70%"></colgroup>
 <thead>
   <tr><th>Name</th><th></th></tr>
 </thead>
<tbody>
<tr id="rover_rover_generic_ground_vehicle">
 <td style="vertical-align: top;">Generic Ground Vehicle</td>
 <td style="vertical-align: top;"><p><code>SYS_AUTOSTART</code> = 50000</p><p><b>Specific Outputs:</b><ul><li><b>MAIN2</b>: steering</li><li><b>MAIN4</b>: throttle</li></ul></p></td>

</tr>
<tr id="rover_rover_aion_robotics_r1_ugv">
 <td style="vertical-align: top;"><a href="https://www.aionrobotics.com/r1">Aion Robotics R1 UGV</a></td>
 <td style="vertical-align: top;"><p>Maintainer: Timothy Scott</p><p><code>SYS_AUTOSTART</code> = 50003</p><p><b>Specific Outputs:</b><ul><li><b>MAIN0</b>: Speed of left wheels</li><li><b>MAIN1</b>: Speed of right wheels</li></ul></p></td>

</tr>
<tr id="rover_rover_nxp_cup_car:_df_robot_gpx">
 <td style="vertical-align: top;">NXP Cup car: DF Robot GPX</td>
 <td style="vertical-align: top;"><p>Maintainer: Katrin Moritz</p><p><code>SYS_AUTOSTART</code> = 50004</p><p><b>Specific Outputs:</b><ul><li><b>MAIN2</b>: Steering servo</li><li><b>MAIN3</b>: Speed of left wheels</li><li><b>MAIN4</b>: Speed of right wheels</li></ul></p></td>

</tr>
</tbody></table>

## Underwater Robot

### Underwater Robot

<div>
<img src="../../assets/airframes/types/AirframeUnknown.svg" width="29%" style="max-height: 180px;"/>
</div>

<table style="width: 100%; table-layout:fixed; font-size:1.5rem;">
 <colgroup><col style="width: 30%"><col style="width: 70%"></colgroup>
 <thead>
   <tr><th>Name</th><th></th></tr>
 </thead>
<tbody>
<tr id="underwater_robot_underwater_robot_generic_underwater_robot">
 <td style="vertical-align: top;">Generic Underwater Robot</td>
 <td style="vertical-align: top;"><p><code>SYS_AUTOSTART</code> = 60000</p></td>

</tr>
<tr id="underwater_robot_underwater_robot_hippocampus_uuv_(unmanned_underwater_vehicle)">
 <td style="vertical-align: top;">HippoCampus UUV (Unmanned Underwater Vehicle)</td>
 <td style="vertical-align: top;"><p>Maintainer: Daniel Duecker &lt;daniel.duecker@tuhh.de&gt;</p><p><code>SYS_AUTOSTART</code> = 60001</p></td>

</tr>
</tbody></table>

### Vectored 6 DOF UUV

<div>
<img src="../../assets/airframes/types/Vectored6DofUUV.svg" width="29%" style="max-height: 180px;"/>
<table style="float: right; width: 70%; font-size:1.5rem;">
 <colgroup><col></colgroup>
 <thead>
   <tr><th>Common Outputs</th></tr>
 </thead>
<tbody>
<tr>
 <td style="vertical-align: top;"><ul><li><b>MAIN1</b>: motor 1 CCW, bow starboard horizontal, , propeller CCW</li><li><b>MAIN2</b>: motor 2 CCW, bow port horizontal, propeller CCW</li><li><b>MAIN3</b>: motor 3 CCW, stern starboard horizontal, propeller CW</li><li><b>MAIN4</b>: motor 4 CCW, stern port horizontal, propeller CW</li><li><b>MAIN5</b>: motor 5 CCW, bow starboard vertical, propeller CCW</li><li><b>MAIN6</b>: motor 6 CCW, bow port vertical, propeller CW</li><li><b>MAIN7</b>: motor 7 CCW, stern starboard vertical, propeller CW</li><li><b>MAIN8</b>: motor 8 CCW, stern port vertical, propeller CCW</li></ul></td>
</tr>
</tbody></table>
</div>

<table style="width: 100%; table-layout:fixed; font-size:1.5rem;">
 <colgroup><col style="width: 30%"><col style="width: 70%"></colgroup>
 <thead>
   <tr><th>Name</th><th></th></tr>
 </thead>
<tbody>
<tr id="underwater_robot_vectored_6_dof_uuv_bluerov2_(heavy_configuration)">
 <td style="vertical-align: top;">BlueROV2 (Heavy Configuration)</td>
 <td style="vertical-align: top;"><p>Maintainer: Thies Lennart Alff &lt;thies.lennart.alff@tuhh.de&gt;</p><p><code>SYS_AUTOSTART</code> = 60002</p></td>

</tr>
</tbody></table>

## VTOL

### Standard VTOL

<div>
<img src="../../assets/airframes/types/VTOLPlane.svg" width="29%" style="max-height: 180px;"/>
</div>

<table style="width: 100%; table-layout:fixed; font-size:1.5rem;">
 <colgroup><col style="width: 30%"><col style="width: 70%"></colgroup>
 <thead>
   <tr><th>Name</th><th></th></tr>
 </thead>
<tbody>
<tr id="vtol_standard_vtol_hil_standard_vtol_quadplane">
 <td style="vertical-align: top;">HIL Standard VTOL QuadPlane</td>
 <td style="vertical-align: top;"><p>Maintainer: Roman Bapst &lt;roman@auterion.com&gt;</p><p><code>SYS_AUTOSTART</code> = 1002</p></td>

</tr>
<tr id="vtol_standard_vtol_generic_quadplane_vtol">
 <td style="vertical-align: top;">Generic Quadplane VTOL</td>
 <td style="vertical-align: top;"><p><code>SYS_AUTOSTART</code> = 13000</p><p><b>Specific Outputs:</b><ul><li><b>MAIN1</b>: motor 1</li><li><b>MAIN2</b>: motor 2</li><li><b>MAIN3</b>: motor 3</li><li><b>MAIN4</b>: motor 4</li><li><b>AUX1</b>: Aileron 1</li><li><b>AUX2</b>: Aileron 2</li><li><b>AUX3</b>: Elevator</li><li><b>AUX4</b>: Rudder</li><li><b>AUX5</b>: Throttle</li></ul></p></td>

</tr>
<tr id="vtol_standard_vtol_fun_cub_quad_vtol">
 <td style="vertical-align: top;">Fun Cub Quad VTOL</td>
 <td style="vertical-align: top;"><p>Maintainer: Simon Wilks &lt;simon@uaventure.com&gt;</p><p><code>SYS_AUTOSTART</code> = 13005</p><p><b>Specific Outputs:</b><ul><li><b>MAIN1</b>: motor 1</li><li><b>MAIN2</b>: motor 2</li><li><b>MAIN3</b>: motor 3</li><li><b>MAIN4</b>: motor 4</li><li><b>AUX1</b>: Aileron 1</li><li><b>AUX2</b>: Aileron 2</li><li><b>AUX3</b>: Elevator</li><li><b>AUX4</b>: Rudder</li><li><b>AUX5</b>: Throttle</li></ul></p></td>

</tr>
<tr id="vtol_standard_vtol_generic_quad_delta_vtol">
 <td style="vertical-align: top;">Generic quad delta VTOL</td>
 <td style="vertical-align: top;"><p>Maintainer: Simon Wilks &lt;simon@uaventure.com&gt;</p><p><code>SYS_AUTOSTART</code> = 13006</p><p><b>Specific Outputs:</b><ul><li><b>MAIN1</b>: motor 1</li><li><b>MAIN2</b>: motor 2</li><li><b>MAIN3</b>: motor 3</li><li><b>MAIN4</b>: motor 4</li><li><b>AUX1</b>: Right elevon</li><li><b>AUX2</b>: Left elevon</li><li><b>AUX3</b>: Motor</li></ul></p></td>

</tr>
<tr id="vtol_standard_vtol_generic_aavvt_v-tail_plane_airframe_with_quad_vtol.">
 <td style="vertical-align: top;">Generic AAVVT v-tail plane airframe with Quad VTOL.</td>
 <td style="vertical-align: top;"><p>Maintainer: Sander Smeets &lt;sander@droneslab.com&gt;</p><p><code>SYS_AUTOSTART</code> = 13007</p></td>

</tr>
<tr id="vtol_standard_vtol_quadranger">
 <td style="vertical-align: top;">QuadRanger</td>
 <td style="vertical-align: top;"><p>Maintainer: Sander Smeets &lt;sander@droneslab.com&gt;</p><p><code>SYS_AUTOSTART</code> = 13008</p></td>

</tr>
<tr id="vtol_standard_vtol_sparkle_tech_ranger_vtol">
 <td style="vertical-align: top;">Sparkle Tech Ranger VTOL</td>
 <td style="vertical-align: top;"><p>Maintainer: Andreas Antener &lt;andreas@uaventure.com&gt;</p><p><code>SYS_AUTOSTART</code> = 13009</p></td>

</tr>
<tr id="vtol_standard_vtol_vertical_technologies_deltaquad">
 <td style="vertical-align: top;">Vertical Technologies DeltaQuad</td>
 <td style="vertical-align: top;"><p>Maintainer: Sander Smeets &lt;sander@droneslab.com&gt;</p><p><code>SYS_AUTOSTART</code> = 13013</p><p><b>Specific Outputs:</b><ul><li><b>MAIN1</b>: motor 1</li><li><b>MAIN2</b>: motor 2</li><li><b>MAIN3</b>: motor 3</li><li><b>MAIN4</b>: motor 4</li><li><b>MAIN5</b>: Right elevon</li><li><b>MAIN6</b>: Left elevon</li><li><b>MAIN7</b>: Pusher motor</li><li><b>MAIN8</b>: Pusher reverse channel</li></ul></p></td>

</tr>
<tr id="vtol_standard_vtol_babyshark_vtol">
 <td style="vertical-align: top;">BabyShark VTOL</td>
 <td style="vertical-align: top;"><p>Maintainer: Silvan Fuhrer &lt;silvan@auterion.com&gt;</p><p><code>SYS_AUTOSTART</code> = 13014</p><p><b>Specific Outputs:</b><ul><li><b>MAIN1</b>: Ailerons</li><li><b>MAIN2</b>: A-tail left</li><li><b>MAIN3</b>: Pusher motor</li><li><b>MAIN4</b>: A-tail right</li><li><b>MAIN5</b>: motor 1</li><li><b>MAIN6</b>: motor 2</li><li><b>MAIN7</b>: motor 3</li><li><b>MAIN8</b>: motor 4</li></ul></p></td>

</tr>
</tbody></table>

### VTOL Duo Tailsitter

<div>
<img src="../../assets/airframes/types/VTOLDuoRotorTailSitter.svg" width="29%" style="max-height: 180px;"/>
<table style="float: right; width: 70%; font-size:1.5rem;">
 <colgroup><col></colgroup>
 <thead>
   <tr><th>Common Outputs</th></tr>
 </thead>
<tbody>
<tr>
 <td style="vertical-align: top;"><ul><li><b>MAIN1</b>: motor right</li><li><b>MAIN2</b>: motor left</li><li><b>MAIN5</b>: elevon right</li><li><b>MAIN6</b>: elevon left</li></ul></td>
</tr>
</tbody></table>
</div>

<table style="width: 100%; table-layout:fixed; font-size:1.5rem;">
 <colgroup><col style="width: 30%"><col style="width: 70%"></colgroup>
 <thead>
   <tr><th>Name</th><th></th></tr>
 </thead>
<tbody>
<tr id="vtol_vtol_duo_tailsitter_caipiroshka_duo_tailsitter">
 <td style="vertical-align: top;">Caipiroshka Duo Tailsitter</td>
 <td style="vertical-align: top;"><p>Maintainer: Roman Bapst &lt;roman@px4.io&gt;</p><p><code>SYS_AUTOSTART</code> = 13001</p></td>

</tr>
<tr id="vtol_vtol_duo_tailsitter_generic_tailsitter">
 <td style="vertical-align: top;">Generic Tailsitter</td>
 <td style="vertical-align: top;"><p>Maintainer: Roman Bapst &lt;roman@px4.io&gt;</p><p><code>SYS_AUTOSTART</code> = 13200</p></td>

</tr>
</tbody></table>

### VTOL Octoplane

<div>
<img src="../../assets/airframes/types/VTOLPlaneOcto.svg" width="29%" style="max-height: 180px;"/>
<table style="float: right; width: 70%; font-size:1.5rem;">
 <colgroup><col></colgroup>
 <thead>
   <tr><th>Common Outputs</th></tr>
 </thead>
<tbody>
<tr>
 <td style="vertical-align: top;"><ul><li><b>MAIN1</b>: motor 1</li><li><b>MAIN2</b>: motor 2</li><li><b>MAIN3</b>: motor 3</li><li><b>MAIN4</b>: motor 4</li><li><b>MAIN5</b>: motor 5</li><li><b>MAIN6</b>: motor 6</li><li><b>MAIN7</b>: motor 7</li><li><b>MAIN8</b>: motor 8</li><li><b>AUX1</b>: Aileron 1</li><li><b>AUX2</b>: Aileron 2</li><li><b>AUX3</b>: Elevator</li><li><b>AUX4</b>: Rudder</li><li><b>AUX5</b>: Throttle</li></ul></td>
</tr>
</tbody></table>
</div>

<table style="width: 100%; table-layout:fixed; font-size:1.5rem;">
 <colgroup><col style="width: 30%"><col style="width: 70%"></colgroup>
 <thead>
   <tr><th>Name</th><th></th></tr>
 </thead>
<tbody>
<tr id="vtol_vtol_octoplane_generic_octoplane_vtol">
 <td style="vertical-align: top;">Generic Octoplane VTOL</td>
 <td style="vertical-align: top;"><p>Maintainer: John Doe &lt;john@example.com&gt;</p><p><code>SYS_AUTOSTART</code> = 13050</p></td>

</tr>
</tbody></table>

### VTOL Quad Tailsitter

<div>
<img src="../../assets/airframes/types/VTOLQuadRotorTailSitter.svg" width="29%" style="max-height: 180px;"/>
<table style="float: right; width: 70%; font-size:1.5rem;">
 <colgroup><col></colgroup>
 <thead>
   <tr><th>Common Outputs</th></tr>
 </thead>
<tbody>
<tr>
 <td style="vertical-align: top;"><ul><li><b>MAIN1</b>: motor 1</li><li><b>MAIN2</b>: motor 2</li><li><b>MAIN3</b>: motor 4</li><li><b>MAIN4</b>: motor 5</li><li><b>MAIN5</b>: elevon left</li><li><b>MAIN6</b>: elevon right</li><li><b>MAIN7</b>: canard surface</li><li><b>MAIN8</b>: rudder</li></ul></td>
</tr>
</tbody></table>
</div>

<table style="width: 100%; table-layout:fixed; font-size:1.5rem;">
 <colgroup><col style="width: 30%"><col style="width: 70%"></colgroup>
 <thead>
   <tr><th>Name</th><th></th></tr>
 </thead>
<tbody>
<tr id="vtol_vtol_quad_tailsitter_quadrotor_x_tailsitter">
 <td style="vertical-align: top;">Quadrotor X Tailsitter</td>
 <td style="vertical-align: top;"><p>Maintainer: Roman Bapst &lt;roman@px4.io&gt;</p><p><code>SYS_AUTOSTART</code> = 13003</p></td>

</tr>
<tr id="vtol_vtol_quad_tailsitter_quadrotor_+_tailsitter">
 <td style="vertical-align: top;">Quadrotor + Tailsitter</td>
 <td style="vertical-align: top;"><p>Maintainer: Roman Bapst &lt;roman@px4.io&gt;</p><p><code>SYS_AUTOSTART</code> = 13004</p></td>

</tr>
</tbody></table>

### VTOL Tiltrotor

<div>
<img src="../../assets/airframes/types/VTOLTiltRotor.svg" width="29%" style="max-height: 180px;"/>
</div>

<table style="width: 100%; table-layout:fixed; font-size:1.5rem;">
 <colgroup><col style="width: 30%"><col style="width: 70%"></colgroup>
 <thead>
   <tr><th>Name</th><th></th></tr>
 </thead>
<tbody>
<tr id="vtol_vtol_tiltrotor_birdseyeview_aerobotics_firefly6">
 <td style="vertical-align: top;">BirdsEyeView Aerobotics FireFly6</td>
 <td style="vertical-align: top;"><p>Maintainer: Roman Bapst &lt;roman@uaventure.com&gt;</p><p><code>SYS_AUTOSTART</code> = 13002</p><p><b>Specific Outputs:</b><ul><li><b>MAIN1</b>: Front right motor bottom</li><li><b>MAIN2</b>: Front right motor top</li><li><b>MAIN3</b>: Back motor bottom</li><li><b>MAIN4</b>: Back motor top</li><li><b>MAIN5</b>: Front left motor bottom</li><li><b>MAIN6</b>: Front left motor top</li><li><b>AUX1</b>: Tilt servo</li><li><b>AUX2</b>: Elevon 1</li><li><b>AUX3</b>: Elevon 2</li><li><b>AUX4</b>: Gear</li></ul></p></td>

</tr>
<tr id="vtol_vtol_tiltrotor_cruiseader_claire">
 <td style="vertical-align: top;">CruiseAder Claire</td>
 <td style="vertical-align: top;"><p>Maintainer: Samay Siga &lt;samay_s@icloud.com&gt;</p><p><code>SYS_AUTOSTART</code> = 13010</p></td>

</tr>
<tr id="vtol_vtol_tiltrotor_e-flite_convergence">
 <td style="vertical-align: top;">E-flite Convergence</td>
 <td style="vertical-align: top;"><p>Maintainer: Andreas Antener &lt;andreas@uaventure.com&gt;</p><p><code>SYS_AUTOSTART</code> = 13012</p><p><b>Specific Outputs:</b><ul><li><b>MAIN1</b>: Motor right</li><li><b>MAIN2</b>: Motor left</li><li><b>MAIN3</b>: Motor back</li><li><b>MAIN4</b>: empty</li><li><b>MAIN5</b>: Tilt servo right</li><li><b>MAIN6</b>: Tilt servo left</li><li><b>MAIN7</b>: Elevon right</li><li><b>MAIN8</b>: Elevon left</li></ul></p></td>

</tr>
<tr id="vtol_vtol_tiltrotor_generic_quadplane_vtol_tiltrotor">
 <td style="vertical-align: top;">Generic Quadplane VTOL Tiltrotor</td>
 <td style="vertical-align: top;"><p><code>SYS_AUTOSTART</code> = 13030</p><p><b>Specific Outputs:</b><ul><li><b>MAIN1</b>: motor 1</li><li><b>MAIN2</b>: motor 2</li><li><b>MAIN3</b>: motor 3</li><li><b>MAIN4</b>: motor 4</li><li><b>AUX1</b>: Motor tilt front left</li><li><b>AUX2</b>: Motor tilt front right</li><li><b>AUX3</b>: Motor tilt rear left</li><li><b>AUX4</b>: Motor tilt rear right</li><li><b>AUX5</b>: Aileron left</li><li><b>AUX6</b>: Aileron right</li><li><b>AUX7</b>: Elevator</li><li><b>AUX8</b>: Rudder</li></ul></p></td>

</tr>
</tbody></table>

