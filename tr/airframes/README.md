---
canonicalUrl: https://docs.px4.io/main/tr/airframes/README
---

# Vehicle Types & Setup

PX4 supports numerous types of vehicles, including different configurations of multicopters, planes, VTOL vehicles, ground vehicles, and so on.

This section explains how to assemble, configure, and tune PX4-based autopilot systems for each type (much of this setup is common to all types).

:::note
[Vehicle Selection](../getting_started/frame_selection.md) provides high level information about the types of vehicles and the use cases for which they are best suited. :::

## Supported Vehicles

The frame types that have a maintainer and are well tested and supported are:

- [Multicopters](../frames_multicopter/README.md) (tri-, quad-, hexa-, octa-, and even [omnicopter](../frames_multicopter/omnicopter.md) vehicles)
- [Planes (Fixed-wing)](../frames_plane/README.md)
- [VTOL](../frames_vtol/README.md): [Standard VTOL](../frames_vtol/standardvtol.md), [Tailsitter VTOL](../frames_vtol/tailsitter.md), [Tiltrotor VTOL](../frames_vtol/tiltrotor.md)


## Experimental Vehicles

The following vehicle types are considered experimental:

- [Airships](../frames_airship/README.md)
- [Autogyros](../frames_autogyro/README.md)
- [Balloons](../frames_balloon/README.md)
- [Helicopter](../frames_helicopter/README.md)
- [Rovers](../frames_rover/README.md)
- [Submarines](../frames_sub/README.md)

:::note
Experimental frames are those vehicle types that:

- Do not have a maintainer.
- Are not regularly tested by the core development team.
- May lack features required for production-ready vehicles.
- May not support some common vehicle configurations for the vehicle type.

Maintainer volunteers, [contribution](../contribute/README.md) of new features, new frame configurations, or other improvements would all be very welcome! :::

## Other Vehicles

The complete set of supported vehicle types and their configurations can be found in the [Airframes Reference](../airframes/airframe_reference.md).

