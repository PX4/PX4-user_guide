# Releases

## Release Notes

The release notes archive for each release contains a detailed list of included features, bug fixes, deprecations, and updates.

- [main](../releases/main.md) (changes since v1.15)
- [v1.15](../releases/1.15.md)
- [v1.14](../releases/1.14.md)
- [v1.13](../releases/1.13.md)
- [v1.12](../releases/1.12.md)

The full archive of releases for the PX4 autopilot project can be found on [GitHub](https://github.com/PX4/PX4-Autopilot/releases)

## Release Versioning

The PX4 project is using a versioning scheme based on the semantic versioning system ([Wikipedia article](https://en.wikipedia.org/wiki/Software_versioning)).
The current scheme is as follows:

```plain
major.minor.patch[-beta#]
```

:::info
Full semantic versioning will be adopted starting from `v2.0.0`.
The releases before that don't follow the strict Semantic versioning process.
Before `v2.0` it is assumed bumps in `minor` are considered to be `Major` releases.
:::

- Change in `major`: Breaking changes in functionality
- Change in `minor`: New non-breaking changes and features
- Change in `patch`: All other non-breaking changes including bugfixes

## Release Schedule

PX4 follows the following release schedule:

- `Major` or `minor` releases: Roughly every 6 months
- `patch` releases: When critical bug-fix / hardware support is needed
- `beta` releases: Every 1 week during beta testing phase

## Stakeholders

The whole process depends on the contribution of the maintainers.
However, for the release process specifically, a 'Release manager' (referred below as well) will be the person in charge of overseeing the overall process.

## Release Procedure

The decision on whether the upcoming release will involve a change in major version, or just a minor will be discussed during the [weekly coordination meeting](../contribute/dev_call.md).

If the general consensus agrees that the change for the upcoming release is big enough, the major version will be updated.
Otherwise, only the minor version will be updated.

### New Major Release

The process starts when the release manager creates a new branch following the `release/Major.minor` pattern, this new branch is branched from the `main` branch of the PX4-Autopilot project on GitHub.

For the initial beta release of a new major/minor change, a "branch-out deadline" gets set during the weekly call.

The procedure is:

1. Agreement on branch-out deadline by consensus during the call
2. Publication in social media & mailing list about deadline
3. Project board with the name for the new release gets created:
   1. The board must include a `patch version` field (selectable)
4. Until the branch-out date
   1. All the PR/Issues that a contributor wants to finish before the deadline gets added to the Project Board
   2. All the release blocking Issues / PRs gets added to the Project Board by each maintainer

On the branch out-date, the `release/Major.minor` branch gets branched out and a `Major.minor.0-beta1` gets released for testing.

#### Beta Testing

Before the new major/minor release, the beta version gets released for a testing phase.
During the beta testing phase following changes are **allowed**:

- Critical bug fixes
- New hardware support

And following changes are **not allowed**:

- Big new features
- Refactors (with no functional changes)

During the beta testing, the procedure is:

1. During the weekly coordination call
   1. Remaining issues for the next beta release gets discussed, and maintainers make an effort to resolve all issues before the next beta release
   2. Discussion on certain PRs that may be worth to be included in the next beta gets discussed, and gets added to Project Board appropriately
2. Test reports from users get collected as a Github Issue / Discord message / Flight Review log / Discuss forum post
   1. User-reported issues will be discussed by the maintainer team, and the maintainer in charge of the sector creates / adds an issue to keep track of it in the project tracker and assign the next beta version to its `patch version` field.

#### Maintainers Agreement before the Release

Once the release branch reaches a mature state with reliable firmware builds and no major issues are reported, the maintainer team votes to promote the branch to a stable release.

##### What should maintainers look for when Making a Decision?

- The [core functionality](../concept/core_components.md) that they maintain has been tested, and has no major issues
- All the outstanding issues/PRs with `patch version` as the last beta version are resolved

#### Point/Patch Releases

Patch releases are the ones where we apply a patch (e.g. bugfix, hardware support) to a previous point release without big feature changes.
Often, we need a quick patch release after the point release, as the number of testing increases significantly & new errors get found.

Only the following **allowed** changes will be accepted for patch releases:

- Critical bug fixes
- New hardware support

Procedure:

1. The `patch version` of the last beta release (e.g. `M.m.0-beta9`) gets renamed to include the release name (e.g. `M.m.0/M.m.0-beta9`)
2. New tag for the last release commit gets tagged (as `M.m.0`) by the 'Release manager'
3. Release notes are prepared in Github side collaboratively by maintainers
4. Public new point release announcement gets made via social media / mailing list by the 'Release manager'
