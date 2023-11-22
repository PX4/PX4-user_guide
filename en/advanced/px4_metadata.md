# PX4 Metadata: Translation & Publishing (Params, Events)

PX4 uses and generates data that has associated human- and machine- readable metadata:

- [Parameters](../advanced_config/parameters.md) configure PX4 behaviour.
  - A parameter is represented by an ID string that maps to a value stored in PX4.
  - The associated metadata includes a description of the setting, its possible values, information about how the value might be presented (say for bitmasks).
- [Events](../concept/events_interface.md) provide notification of events, such as reasons for a failsafe, low battery warnings, end of calibration, and so on.
  - An event is represented by an id, and is sent with a log level, some message, and arguments.
  - The associated metadata includes a description of the event and the arguments.

The metadata and metadata translations are shared with external systems, such as QGroundControl, allowing them to display information about parameters and events as a string in the user's own language.

This topic explains how you can define metadata and help translate strings (and "just for your information", how it all works).

## Metadata Translation

Translations for PX4 metadata are done using Crowdin in the [PX4-Metadata-Translations](https://crowdin.com/project/px4-metadata-translations) project.
For more information about working with PX4 and Crowdin see [Translation](../contribute/translation.md).

## Defining Metadata

PX4 metadata is defined in PX4 source code alongside its associated data.
Often this is done in a C/C++ comment with special markup to indicate metadata fields and their values.
In some cases YAML files are used.

For more information see the topics for each data type:

- [Parameters & Configurations > Creating/Defining Parameters](../advanced/parameters_and_configurations.md#creating-defining-parameters)
- [Events Interface](../concept/events_interface.md)

## Metadata Toolchain

The process for handling metadata is the same for both event and parameter metadata.

Metadata is collected into JSON and XML files every time PX4 is built.

For most flight controllers (as most have enough FLASH available), the JSON file is xz-compressed and stored within the generated binary.
The file is then shared to ground stations using the MAVLink [Component Information Protocol](https://mavlink.io/en/services/component_information.html).
Using the component metadata protocol ensures that the recipient can always fetch up-to-date metadata for the code running on the vehicle.

Binaries for flight controller targets with constrained memory do not store the parameter metadata in the binary, but instead reference the same data stored on `px4-travis.s3.amazonaws.com`.
This applies, for example, to the [Omnibus F4 SD](../flight_controller/omnibus_f4_sd.md).
The metadata is uploaded via [github CI](https://github.com/PX4/PX4-Autopilot/blob/main/.github/workflows/metadata.yml) for all build targets (and hence will only be available once parameters have been merged into main).

:::note
You can identify memory constrained boards because they specify `CONFIG_BOARD_CONSTRAINED_FLASH=y` in their [px4board definition file](https://github.com/PX4/PX4-Autopilot/blob/main/boards/omnibus/f4sd/default.px4board).

If doing custom development on a FLASH-constrained board you can adjust the URL [here](https://github.com/PX4/PX4-Autopilot/blob/main/src/lib/component_information/CMakeLists.txt#L41) to point to another server.
:::

The metadata on `px4-travis.s3.amazonaws.com` is used if parameter metadata is not present on the vehicle.
It may also be used as a fallback to avoid a very slow download over a low-rate telemetry link.

The metadata JSON files for CI builds of `main` are also copied to the github repo: [PX4/PX4-Metadata-Translations](https://github.com/PX4/PX4-Metadata-Translations/).
This integrates with Crowdin to get translations, which are stored in the [translated](https://github.com/PX4/PX4-Metadata-Translations/tree/main/translated) folder as xz-compressed translation files for each language.
These are referenced by the vehicle component metadata, and are downloaded when needed.
For more information see [PX4-Metadata-Translations](https://github.com/PX4/PX4-Metadata-Translations/) and [Component Metadata Protocol > Translation](https://mavlink.io/en/services/component_information.html#translation).

:::note
The parameter XML file of the main branch is copied into the QGC source tree via CI and is used as a fallback in cases where no metadata is available via the component metadata protocol (this approach predates the existence of the component metadata protocol).
:::

## Further Information

- [Parameters & Configurations](../advanced/parameters_and_configurations.md)
- [Events Interface](../concept/events_interface.md)
- [Translation](../contribute/translation.md)
- [Component Metadata Protocol](https://mavlink.io/en/services/component_information.html) (mavlink.io)
- [PX4-Metadata-Translations](https://github.com/PX4/PX4-Metadata-Translations/) (Github)
