# Probabilistic Reward Task

This repository contains a jsPsych-based implementation of the Probabilistic Reward Task (e.g., [Pizzagalli, Jahn, & O'Shea, 2005](https://cdasr.mclean.harvard.edu/wp-content/uploads/2017/08/pizzagalli_bp05.pdf)).

## Instructions

1. Create a config file by copying the `config.js` file located in the `config` folder. Instructions for modifying the config file are contained within the file.

2. Change the `index.html` file to reference your config file. The relevant line to change looks like this: `<script src="config/config.js"></script>`.

## Deployment Options

The script can be deployed (hosted) three different ways. The `SAVE_DATA_TYPE` variable in the config file should be set to match the method of deployment.

1. TestMyBrain. For TMB integration, setup the experiment config as described above and share the entire contents of this repository with a TMB admin to deploy on the site.

2. Cognition.run - https://www.cognition.run is a free service for hosting jsPsych experiments. You will need to copy the contents of `task.js` into their code editor, and then add your config file as an addition JS file through their interface. You should also add the `prt.css` file located in the `css` folder. Finally, upload all of the image and sound files that you are using for the experiment.

