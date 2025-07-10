---
canonicalUrl: https://docs.px4.io/main/tr/test_and_ci/jenkins_ci
---

# Jenkins CI

<div v-if="$themeConfig.px4_version != 'master'">
  <div class="custom-block danger"><p class="custom-block-title">This page may be out of date</p> <p>The latest version <a href="https://docs.px4.io/master/en/test_and_ci/">can be found here</a>.</p>
  </div>
</div>

Jenkins continuous integration server on [ci.px4.io](http://ci.px4.io/) is used to automatically run integration tests against PX4 SITL.


## Overview

* Involved components: Jenkins, Docker, PX4 POSIX SITL
* Tests run inside [Docker Containers](../test_and_ci/docker.md)
* Jenkins executes 2 jobs: one to check each PR against master, and the other to check every push on master

## Test Execution

Jenkins uses [run_container.bash](https://github.com/PX4/PX4-Autopilot/blob/master/integrationtests/run_container.bash) to start the container, which in turn executes [run_tests.bash](https://github.com/PX4/PX4-Autopilot/blob/master/integrationtests/run_tests.bash) to compile and run the tests.

If Docker is installed the same method can be used locally:

```sh
cd <directory_where_PX4-Autopilot_is_cloned>
sudo WORKSPACE=$(pwd) ./PX4-Autopilot/integrationtests/run_container.bash
```

## Server Setup

### Installation

See setup [script/log](https://github.com/PX4/containers/tree/master/scripts/jenkins) for details on how Jenkins got installed and maintained.

### Configuration

* Jenkins security enabled
* Installed plugins
  * github
  * github pull request builder
  * embeddable build status plugin
  * s3 plugin
  * notification plugin
  * collapsing console sections
  * postbuildscript
