# PX4-gazebo-models repository

## Purpose
The [PX4 gazebo models repository](https://github.com/PX4/PX4-gazebo-models) is used to store all models and worlds that are supported by PX4. There is a `/models` repository that stores all models and a `/worlds` repository that stores all worlds. In addition to these repositories, there is a Python script for starting Gazebo called "simulation-gazebo". This script, per default, can communicate with a PX4 instance on the same host, and if the script parameters are set correctly, can communicate with any PX4 instance on any machine within the same network.

## Simulation start-up
The simulation-gazebo script does not require any additional libraries and should work out of the box. The default simulation-script can be run with:

```sh
python simulation-gazebo
```

With these default parameters, there will first be a check whether a folder called `/.simulation-gazebo` already exists. If if does not, all models and worlds will be downloaded from [PX4 gazebo models repository](https://github.com/PX4/PX4-gazebo-models) and placed there. Then, a gz-server instance will be launched using the default grey plane. There are then multiple ways to connect a PX4-enabled vehicle to this instance of gz-server.

1. In a new terminal, run PX4 using `make px4_sitl gz_***` and you will observe a vehicle appearing in Gazebo.
2. Use the gazebo resource spawner to look for px4 vehicles on fuel. Drag and drop the vehicle of your choice into Gazebo and then launch PX4 with: `PX4_SYS_AUTOSTART=<airframe-number-of-choice> PX4_GZ_MODEL_NAME=<vehicle-of-choice> ./build/px4_sitl_default/bin/px4`. This will connect PX4 to the running instance of Gazebo.

All the functionality and flexibility that exists for PX4 is applicable and directly works in the Gazebo instance.

### Arguments for simulation-gazebo

There are also several arguments that can be passed to the simulation-gazebo script in order to enhance its functionality:

`--world` A string variable that names the sdf file which runs the simulation world. Default argument is "default", which links to the default world.

`--gz_partition` A string variable that sets the gazebo partition to run in (more information [here]([https://gazebosim.org/api/transport/13/envvars.html))

`--gz_ip` A string variable that sets the IP of the outgoing network interface (more information [here]([https://gazebosim.org/api/transport/13/envvars.html))

`--interactive` A boolean variable that requires the ability to run the code in interactive mode, allowing for custom paths for `--model_download_source`. If this is not set, `--model_download_source` will only download from the default Github repo.

`--model_download_source` A string variable setting the path to a directory from where models are to be imported. At the moment this can only be a local file directory or a http address. The source should end with the zipped model file (for example: https://path/to/simulation/models/models.zip).

`--model_store` A string variable setting the path to the model storage directory. This is where the zip file provided in `model_download_source` will be placed.

`--overwrite` A boolean variable providing the ability to overwrite existing directories with new data.

`--dryrun` A boolean variable that can be set when running testcases. It will not provide any interactivity and will not start a gz-server instance.

None of these arguments are required for simulation-gazebo to work, but are required for when you want to provide custom model downloads, other worlds or want to run Gazebo and PX4 on separate hosts.

## Workflow
When a branch gets merged onto the main branch (this could be a model addition, deletion or a something like a parameter change), all models that have received any sort of change will automatically be updated and uploaded to the PX4 account on [Gazebo Fuel](https://app.gazebosim.org/PX4). Furthermore, there is also a workflow that can be used to check the validity of any provided sdf file.
