# PX4 Development Guide

[![Releases](https://img.shields.io/badge/release-{{ book.px4_version }}-blue.svg)](https://github.com/PX4/PX4-Autopilot/releases) [![Discuss](https://img.shields.io/badge/discuss-px4-ff69b4.svg)](http://discuss.px4.io/) [![Slack](https://px4-slack.herokuapp.com/badge.svg)](http://slack.px4.io)

> **Info** This guide is for primarily for software developers and (new) hardware integrators. To fly, build and modify vehicles using supported hardware see the [PX4 User Guide](https://docs.px4.io/en/).

This guide explains how to:

* Get a [minimum developer setup](setup/config_initial.md), [build PX4 from source](setup/building_px4.md) and deploy on [numerous supported autopilots](https://docs.px4.io/en/flight_controller/).
* Understand the [PX4 System Architecture](concept/architecture.md) and other core concepts.
* Learn how to modify the flight stack and middleware:
  - Modify flight algorithms and add new [flight modes](concept/flight_modes.md).
  - Support new [airframes](airframes/README.md).
* Learn how to integrate PX4 with new hardware:
  - Support new sensors and actuators, including cameras, rangefinders, etc.
  - Modify PX4 to run on new autopilot hardware.
* [Simulate](simulation/README.md), [test](test_and_ci/README.md) and [debug/log](debug/README.md) PX4.
* Communicate/integrate with external robotics APIs.


## Support

The core development team and community are active on the following forums and chat channels.

> **Tip** The [Weekly Dev Call](contribute/dev_call.md) is another great opportunity to meet the PX4 dev team and discuss platform technical details, pull requests, major impacting issues etc. There is also time for Q&A.

## Contributing

**Tip** Developers who want to [contribute](contribute/README.md) to the platform are also most welcome to attend the [weekly dev call](contribute/README.md#dev_call) and our other [developer events](contribute/README.md#calendar).


## Licence

The code is free to use and modify under terms of the permissive [BSD 3-clause license](https://opensource.org/licenses/BSD-3-Clause). The documentation is licensed under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). For more information see: [Licences](contribute/licenses.md).

## Translations

There are Chinese and Korean [translations](contribute/docs.md#translation) of this guide. You can you can access these by clicking the language-switcher icon:

![Gitbook Language Selector](../assets/gitbook/gitbook_language_selector.png)

<a id="calendar"></a>

## Calendar & Events

The *Dronecode Calendar* shows important events for platform developers and users. Select the links below to display the calendar in your timezone (and to add it to your own calendar):
* [Switzerland – Zurich](https://calendar.google.com/calendar/embed?src=linuxfoundation.org_g21tvam24m7pm7jhev01bvlqh8%40group.calendar.google.com&ctz=Europe%2FZurich)
* [Pacific Time – Tijuana](https://calendar.google.com/calendar/embed?src=linuxfoundation.org_g21tvam24m7pm7jhev01bvlqh8%40group.calendar.google.com&ctz=America%2FTijuana)
* [Google+](https://calendar.google.com/calendar/embed?src=linuxfoundation.org_g21tvam24m7pm7jhev01bvlqh8%40group.calendar.google.com&ctz=Australia%2FSydney)

**Note:** calendar defaults to CET.


{% raw %}
<iframe src="https://calendar.google.com/calendar/embed?title=Dronecode%20Calendar&amp;mode=WEEK&amp;height=600&amp;wkst=1&amp;bgcolor=%23FFFFFF&amp;src=linuxfoundation.org_g21tvam24m7pm7jhev01bvlqh8%40group.calendar.google.com&amp;color=%23691426&amp;ctz=Europe%2FZurich" style="border-width:0" width="800" height="600" frameborder="0" scrolling="no" mark="crwd-mark"></iframe>
{% endraw %}


## Governance

The PX4 flight stack is hosted under the governance of the [Dronecode Project](https://www.dronecode.org/).

<a href="https://www.dronecode.org/" style="padding:20px"><img src="https://mavlink.io/assets/site/logo_dronecode.png" alt="Dronecode Logo" width="110px"/></a>
<a href="https://www.linuxfoundation.org/projects" style="padding:20px;"><img src="https://mavlink.io/assets/site/logo_linux_foundation.png" alt="Linux Foundation Logo" width="80px" /></a>
<div style="padding:10px">&nbsp;</div>
