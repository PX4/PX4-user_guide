# Jenkins CI

Jenkins continuous integration server on [ci.px4.io](http://ci.px4.io/) is used to automatically run integration tests against PX4 SITL.

Jenkins uses [run_container.bash](https://github.com/PX4/Firmware/blob/master/integrationtests/run_container.bash) to start the container which in turn executes [run_tests.bash](https://github.com/PX4/Firmware/blob/master/integrationtests/run_tests.bash) to compile and run the tests.
> **Tip** Test processes/tools change over time. Current information [can be found in the head revision/master docs](https://dev.px4.io/master/en/test_and_ci/)!
> 
> {% else %} <!-- START: details below displayed only in master -->

## Overview

  * Involved components: Jenkins, Docker, PX4 POSIX SITL
  * Tests run inside [Docker Containers](../test_and_ci/docker.md)
  * Jenkins executes 2 jobs: one to check each PR against master, and the other to check every push on master

## Test Execution

Jenkins uses [run_container.bash](https://github.com/PX4/PX4-Autopilot/blob/master/integrationtests/run_container.bash) to start the container, which in turn executes [run_tests.bash](https://github.com/PX4/PX4-Autopilot/blob/master/integrationtests/run_tests.bash) to compile and run the tests.

If Docker is installed the same method can be used locally:

```sh
cd <directory_where_firmware_is_cloned>
sudo WORKSPACE=$(pwd) ./Firmware/integrationtests/run_container.bash
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

{% endif %} <!-- END: details above displayed only in master -->
