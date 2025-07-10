---
canonicalUrl: https://docs.px4.io/main/de/flying/geofence
---

# GeoFence

A GeoFence is a virtual boundary that defines where a vehicle can travel. GeoFences can be used to prevent a vehicle flying out of range of the RC controller, or into unsafe or restricted airspace.

PX4 provides two independent mechanisms for specify a GeoFence:
- A basic "failsafe" Geofence that defines a simple cylinder.
- More complicated geometries can be defined using a GeoFence Plan (*QGroundControl*).

:::note
GeoFences apply in all modes, including both missions and manual flight.
:::

## Failsafe GeoFence

The [GeoFence Failsafe](../config/safety.md#geofence-failsafe) defines a cylinder centered on the home position, with a specified maximum radius and altitude.

The settings also include a "failsafe action" in the event that the fence is breached. This may simply be a warning notification, but more commonly a vehicle will immediately [Return](../flight_modes/return.md) to a safe location.

For more information see: [Safety > GeoFence Failsafe](../config/safety.md#geofence-failsafe).

## GeoFence Plan

PX4 supports complex GeoFence boundaries made up of multiple circular and polygonal regions, which may be defined as either inclusion (fly within) or exclusion (fly outside) areas.

The GeoFence is planned in *QGroundControl* alongside the mission and rally points.

![GeoFence Plan](../../assets/qgc/plan_geofence/geofence_overview.jpg)

GeoFence planning is fully documented in [Plan View > GeoFence](https://docs.qgroundcontrol.com/en/PlanView/PlanGeoFence.html) (QGroundControl User Guide).

In summary:
1. Open *QGroundControl > Plan View*.
1. Select the *Plan Type* radio button: **Fence**. This will display the *GeoFence Editor*. ![GeoFence Plan](../../assets/qgc/plan_geofence/geofence_editor.jpg)
1. Select the **Polygon Fence** or **Circular Fence** button to add a *basic* fence of the desired type to the map. This also adds an entry for the type of fence in the editor.
1. Use the map to configure the shape and position of the fence.
   - The fence center marker can be used to move the fence to the correct position.
   - The marker on the border of a circular fence can be used to change the radius.
   - The markers on corners (vertices) can be used to change the geometry of a polygon. Additional vertices are created by clicking halfway along the lines between existing markers.
1. Use the *GeoFence Editor* to set a fence as an inclusion or exclusion, and to select a fence to edit (**Edit** radio button) or Delete (**Del** button).
1. Add as many fences as you like.
1. Once finished, click on the **Upload** button (top right) to send the fence (along with rally points and mission) to the vehicle.
1. Set the breach action in the [GeoFence Failsafe](../config/safety.md#geofence-failsafe).

:::note PX4 implements the MAVLink [Mission Microservice](https://mavlink.io/en/services/mission.html), which includes support for GeoFences.
:::
