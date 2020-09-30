# Spedix S250AQ

The Spedix S250 is a asymmetric racing quadcopter perfectly suited for the [Pixracer](../flight_controller/pixracer.md) autopilot.

## Hardware

The hardware required for this build is displayed below.

![Spedix s250 components (unassembled)](../../assets/airframes/multicopter/spedix_s250aq_pixracer/spedix_s250aq_arf_components_unassembled.jpg)

## Mounting and Wiring

Connect GPS and the Wifi module as shown in the [Pixracer instructions](../flight_controller/pixracer.md).

Connect the motors in the layout and order defined in the [Airframe Reference](../airframes/airframe_reference.md#quadrotor-asymmetric), and as reproduced below.

<div>
  <img src="../../assets/airframes/types/AirframeUnknown.svg" width="29%" style="max-height: 180px;" /> 
  
  <table style="float: right; width: 70%; font-size:1.5rem;">
    <colgroup><col></colgroup> <tr>
      <th>
        Common Outputs
      </th>
    </tr>
<tr>
 <td style="vertical-align: top;"><ul><li><b>MAIN1</b>: 모터 1 (전면 우측: 반시계)</li><li><b>MAIN2</b>: 모터 2(후면 좌측: CCW)</li><li><b>MAIN3</b>: 모터3(전면 좌측: CW)</li><li><b>MAIN4</b>: 모터 4(후면 우측: CW)</li><li><b>MAIN5</b>: RC AUX1 채널의 피드스루</li><li><b>MAIN6</b>: RC AUX2 채널의 피드스루</li></ul></td>
</tr>
  </table>
</div>

## Airframe Configuration

Select the Quadrotor asymmetric Spedix S250AQ configuration as shown below. This will not only put PX4 into quadrotor mode, but also load decent default tuning gains.

![QGC - COnfigure airframe as for Spedix250aq](../../assets/airframes/multicopter/spedix_s250aq_pixracer/spedix_250aq_qgc.png)