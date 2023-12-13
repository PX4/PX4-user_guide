# Gazebo Models Repository (PX4-gazebo-models)

The [PX4-gazebo-models](https://github.com/PX4/PX4-gazebo-models) repository is used to store all [Gazebo](../sim_gazebo_gz/README.md) models and worlds that are supported by PX4.

- Models are stored in the `/models` directory and worlds are stored in the `/worlds` directory.
- The [simulation-gazebo](https://github.com/PX4/PX4-gazebo-models/blob/main/simulation-gazebo) Python script is used for starting Gazebo in standalone mode.
  This script can communicate with a PX4 SITL instance on the same host by default.
  If the script parameters are set correctly, it can also communicate with any PX4 instance on any machine within the same network.

## Simulation Start-up

The `simulation-gazebo` script does not require any additional libraries and should work out of the box.
The default `simulation-script` can be run with:

```sh
python simulation-gazebo
```

With these default parameters, there will first be a check whether a folder called `/.simulation-gazebo` already exists.
If if does not, all models and worlds will be downloaded from [PX4 gazebo models repository](https://github.com/PX4/PX4-gazebo-models) and placed there.
Then, a _gz-server_ instance will be launched using the default grey plane world.
There are then multiple ways to connect a PX4-enabled vehicle to this instance of _gz-server_.

1. In a new terminal, run PX4 using `make px4_sitl gz_<vehicle>` and you will observe a vehicle appearing in Gazebo.
2. Use the gazebo resource spawner to look for px4 vehicles on fuel.
   Drag and drop the vehicle of your choice into Gazebo and then launch PX4 with:

   ```sh
   PX4_SYS_AUTOSTART=<airframe-number-of-choice> PX4_GZ_MODEL_NAME=<vehicle-of-choice> ./build/px4_sitl_default/bin/px4`
   ```

   This will connect PX4 to the running instance of Gazebo.

All the functionality and flexibility that exists for PX4 is applicable and directly works in the Gazebo instance.

### Arguments for simulation-gazebo

The following arguments can be passed to the `simulation-gazebo` script:

- `--world`
  A string variable that names the sdf file which runs the simulation world.
  Default argument is "default", which links to the default world.

- `--gz_partition`
  A string variable that sets the gazebo partition to run in (more information [here](https://gazebosim.org/api/transport/13/envvars.html))

- `--gz_ip`
  A string variable that sets the IP of the outgoing network interface (more information [here](https://gazebosim.org/api/transport/13/envvars.html))

- `--interactive` A boolean variable that requires the ability to run the code in interactive mode, allowing for custom paths for `--model_download_source`. If this is not set, `--model_download_source` will only download from the default Github repo.

- `--model_download_source`
  A string variable setting the path to a directory from where models are to be imported.
  At the moment this can only be a local file directory or a http address.
  The source should end with the zipped model file (for example: https://path/to/simulation/models/models.zip).

- `--model_store`
  A string variable setting the path to the model storage directory.
  This is where the zip file provided in `model_download_source` will be placed.

- `--overwrite`
  A boolean variable providing the ability to overwrite existing directories with new data.

- `--dryrun` A boolean variable that can be set when running testcases.
  It will not provide any interactivity and will not start a gz-server instance.

None of these arguments are required for `simulation-gazebo` to work.
They are needed when you want to provide custom model downloads, other worlds, or you want to run Gazebo and PX4 on separate hosts.

## Workflow

When a branch gets merged onto the main branch (this could be a model addition, deletion or a something like a parameter change), all models that have received any sort of change will automatically be updated and uploaded to the PX4 account on [Gazebo Fuel](https://app.gazebosim.org/PX4).
Furthermore, there is also a workflow that can be used to check the validity of any provided sdf file.
