# Neural Networks

There are several reasons you might want to use neural networks inside of PX4, this documentation together with an example module will help you to get started with this. The code is made to run directly on an embedded flight controller (FCU), but it can easily be modified to run on a more powerful companion computer as well.

The example module only handles inference as of now, so you will need to train the network in another framework and import it here. You can find a rough guide to that as well.

## Inference library

First of all we need a way to run inference on the neural network. In this example implementation TensorFlow Lite Micro ([TFLM](https://github.com/tensorflow/tflite-micro)) is used, but there are several other possibilities, like [Eigen](https://eigen.tuxfamily.org/index.php?title=Main_Page) and [Executorch](https://pytorch.org/executorch-overview). Do note however that importing new libraries into PX4 is not necessarily straight forward.

TFLM already has support for several architectures, so there is a high likelihood that you can build it for the board you want to use. The build is already tested for three configurations and can be created with the following commands:

   ```sh
   make px4_sitl_neural
   ```

   ```sh
   make px4_fmu-v6c_neural
   ```

   ```sh
   make mro_pixracerpro_neural
   ```

:::tip
If you have a board you want to test neural control on, which is supported by px4, but not part of the examples: got to boards/"your board" and add "CONFIG_MODULES_MC_NN_CONTROL=y" to your .px4board file
:::


## Neural Control
(maybe create this as a separate page)
Nerual networks can be used for a broad range of implementations, like estimation and computer vision, in the example module it is used to replace the [controllers](../flight_stack/controller_diagrams.md).

The module is called mc_nn_control and replaces the entire controller structure as well as the control allocator.

## Input
The input is

## Output

## Frame Representation
ENU, NED