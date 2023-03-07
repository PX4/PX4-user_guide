# Releases

## Release Notes

List of the changes that went into each release, explaining the included features, bug fixes, deprecations and updates in detail.

* [v1.13](../releases/1.13.md)
* [v1.12](../releases/1.12.md)

The full archive of releases for the PX4 autopilot project can be found on [GitHub](https://github.com/PX4/PX4-Autopilot/releases)

## Release Versioning

PX4 uses a Semantic versioning (`Major.minor.patch[-beta#]`) system ([Wikipedia article](https://en.wikipedia.org/wiki/Software_versioning)).

- Change in `Major`: Breaking changes
- Change in `minor`: New non-breaking changes
- Change in `patch`: All other non-breaking changes

## Release Schedule

PX4 follows the following release schedule:

<!-- TO BE DEFINED -->

- `Major` releases: By consensus among Maintainers & Community
- `minor` releases: Roughly every 6 months
- `patch` releases: When critical bug-fix / hardware support is needed
- `beta` releases: Every 1 week during beta testing phase

### Past Major/Minor releases

There has been roughly 14 minor release in the past, with roughly 6 months ~ 1 year between new minor version releases. And there hasn't been any new major version releases yet.

- [v1.13.0](https://github.com/PX4/PX4-Autopilot/releases/tag/v1.13.0): June 22nd, 2022
- [v1.12.0](https://github.com/PX4/PX4-Autopilot/releases/tag/v1.12.0): July 11th, 2021
- [v1.11.0](https://github.com/PX4/PX4-Autopilot/releases/tag/v1.11.0): September 7th, 2020
- [v1.10.0](https://github.com/PX4/PX4-Autopilot/releases/tag/v1.10.0): December 17th, 2019
- [v1.9.0](https://github.com/PX4/PX4-Autopilot/releases/tag/v1.9.0): May 25, 2019
- [v1.8.0](https://github.com/PX4/PX4-Autopilot/releases/tag/v1.8.0): June 19th, 2018
- [v1.7.0](https://github.com/PX4/PX4-Autopilot/releases/tag/v1.7.0): December 15th, 2017
- [v1.6.2](https://github.com/PX4/PX4-Autopilot/releases/tag/v1.6.2): June 7th, 2017
- [v1.5.1](https://github.com/PX4/PX4-Autopilot/releases/tag/v1.5.1): December 7th, 2016
- [v1.4.1](https://github.com/PX4/PX4-Autopilot/releases/tag/v1.4.1): August 6th, 2016
- [v1.3.1](https://github.com/PX4/PX4-Autopilot/releases/tag/v1.3.1): May 22nd, 2016
- [v1.2.0](https://github.com/PX4/PX4-Autopilot/releases/tag/v1.2.0): February 21st, 2016
- [v1.1.0](https://github.com/PX4/PX4-Autopilot/releases/tag/v1.1.0): December 24th, 2015
- [v1.0.0](https://github.com/PX4/PX4-Autopilot/releases/tag/v1.0.0): August 23rd, 2015

## Release Procedure

### Point release (Major/Minor change)

Point releases are the ones where the major/minor version tag changes. It comes with major new features, hardware supports as well as refactors.

#### Initial branch out deadline

For the initial beta release of a new major/minor change, a "branch out deadline" gets set during the Maintainers Call.

The procedure is:

1. Agreement on branch out deadline: By consensus during Maintainers call
2. Publication in social media & mailing list about the branch out deadline: By [Ramon](https://github.com/mrpollo)
3. Project board with the name for the new release gets created: By [Daniel](https://github.com/dagar)
   1. The board must include a `patch version` field (selectable)
4. Until the branch out date
   1. All the PR/Issues that a contributor wants to finish before the deadline gets added to the Project Board: By Maintainers & during Maintainers call
   2. All the release blocking Issues / PRs gets added to the Project Board by each Maintainer

On the branch out date, the `release/Major.minor` branch gets branched out and a `Major.minor.0-beta1` gets released for testing.

#### Beta testing

Before the new major/minor release, the beta version gets released for a testing phase. During the beta testing phase following changes are **allowed**:

- Critical bug fixes
- New hardware supports

And following changes are **not allowed**:

- Big new features
- Refactors (with no functional changes)

During the beta testing, the procedure is:

1. During the Maintainers call
   1. Remaining issues for the next beta release gets discussed, and maintains make an effort to resolve all issues before the next beta release
   2. Discussion on certain PRs that may be worth to be included in the next beta gets discussed, and gets added to Project Board appropriately
2. Test reports from users get collected as a Github Issue / Discord message / Flight Review log / Discuss forum post
   1. If it is valid issue, the maintainer in charge of the sector creates / adds an Issue to keep track of it in the Project tracker and assign the next beta version to it's `patch version` field.

#### Maintainers Agreement before the release

After numerous beta testings & before the official new major/minor release, PX4 Maintainers need to reach a consensus that the new version is release-able from each of their perspectives. This means (for each maintainer):

- The [core functionalities](core_components.md) they maintain has been tested, and has no major issues are found
- All the outstanding issues/PRs with `patch version` as the last beta version are resolved

#### Point release execution

After the consensus from the Maintainers, the point release gets made:

1. The `patch version` of the last beta release (e.g. `M.m.0-beta9`) gets renamed to include the release name (e.g. `M.m.0/M.m.0-beta9`)
2. New tag for the last beta release commit gets tagged (as `M.m.0`) by [Daniel](https://github.com/dagar)
3. Release notes are prepared in Github side collaboratively by Maintainers
4. Public new point release announcement gets made via Social media / Mailing list by [Ramon](https://github.com/mrpollo)

### Patch release

Patch releases are the ones where we apply a patch (e.g. bugfix, hardware support) to a previous point release without big feature changes. Often, we need a quick patch release after the point release, as the number of testing increases significantly & new errors get found.

Only the following **allowed** changes will be accepted for patch releases:

- Critical bug fixes
- New hardware support