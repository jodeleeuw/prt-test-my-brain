/* 

Configuration file for PRT task -- Instructions

This file has four sections.

SECTION 1 contains parameter settings, such as duration of events, keys to use, and reward amounts.
A comment describes what each parameter does. It is important that each parameter value be followed
by a comma, or else a syntax error will occur (except for the final parameter).

SECTION 2 is a list of all the images used by the experiment. The path to these files should be relative
to the location of the index.html file. This list is used to preload the images at the start of 
the experiment.

SECTION 3 is a list of practice trials. Each trial has four parameters (block, trial, stimulus, rewarded),
though only stimulus is used in the practice trials. The other values must exist, with the value of null.

SECTION 4 is a list of the test trials in the order that they will be presented. The block variable
controls when breaks appear in the task; all trials with the same block value are presented together.
The trial variable is just an index of the trial number. The stimulus variable controls which image is
displayed. The rewarded variable controls whether the stimulus will be rewarded (0 = no reward, 1 = reward)

*/

// SECTION 1 //
var CONFIG = {
  FIXATION_DURATION: 150, // ms (how long to show the fixation cross)
  STIMULUS_DURATION: 350, // ms (how long to show the stimulus for classification)
  TRIAL_DURATION: null, // ms, (maximum duration to wait for a response before continuing; or set to null to wait for a response indefinitely)
  FEEDBACK_DURATION: 800, // ms (how long to show the feedback when it appears)
  // RESPONSE_DISPLAY_DURATION: 1000, // ms (how long to show the image corresponding to the response that the subject made) (not used currently)
  LEFT_KEY: 'a', // use lowercase
  RIGHT_KEY: 'l', // use lowercase
  LEFT_SHAPE: 'circles', // use plural form
  RIGHT_SHAPE: 'squares', // use plural form
  LEFT_EXAMPLE: 'img/7S_10C_yellow1.jpg', // for instructions page, example shown on the left side for left key
  RIGHT_EXAMPLE: 'img/7C_10S_yellow3.jpg', // for instructions page, example shown on the right side for right key
  IMAGE_SIZE: 500, // pixels
  ESTIMATED_TOTAL_DURATION: 10, // minutes
  TOTAL_BLOCKS: 3, // make sure this matches the numbers assigned in the stimulus info below
  BREAK_LENGTH: 3000, // ms length of break between blocks
  REWARD_AMOUNT: null, // cents; set to null if no monetary reward
  TOTAL_REWARD: 24.20, // dollars
  PLAY_REWARD_AUDIO: false,
  REWARD_IMAGE: 'img/Dog_Cat.gif', // the image to show on a reward trial
  REWARD_SOUND: 'mp3/reward-coin-drop.mp3', // path to file (use mp3 if possible for browser compatibility), set to null if no sound
  SHOW_ACCURACY_AT_END: false, // show "you responded correctly on X of N trials" at the end screen?
  SAVE_DATA_TYPE: 'tmb' // How data should be saved. Current options are 'tmb' for TestMyBrain and 'local' for downloading a CSV file.
}

// SECTION 2 //
CONFIG.IMAGE_LIST = [
  'img/7C_10S_yellow3.jpg',
  'img/7C_10S_yellow4.jpg',
  'img/7C_10S_yellow5.jpg',
  'img/7C_10S_yellow6.jpg',
  'img/7C_10S_yellow7.jpg',
  'img/7C_10S_yellow8.jpg',
  'img/7C_10S_yellow9.jpg',
  'img/7C_10S_yellow10.jpg',
  'img/7S_10C_yellow1.jpg',
  'img/7S_10C_yellow2.jpg',
  'img/7S_10C_yellow3.jpg',
  'img/7S_10C_yellow4.jpg',
  'img/7S_10C_yellow5.jpg',
  'img/7S_10C_yellow6.jpg',
  'img/7S_10C_yellow7.jpg',
  'img/7S_10C_yellow8.jpg',
  'img/7S_10C_yellow9.jpg',
  'img/7S_10C_yellow10.jpg',
  'img/Dog_Cat.gif'
]

// SECTION 3 //
// note that practice trials will be shown in a random order
CONFIG.PRACTICE_TRIALS = [
  {block: null, trial: null, stimulus: 'img/7C_10S_yellow3.jpg', rewarded: null},
  {block: null, trial: null, stimulus: 'img/7C_10S_yellow4.jpg', rewarded: null},
  {block: null, trial: null, stimulus: 'img/7S_10C_yellow3.jpg', rewarded: null},
  {block: null, trial: null, stimulus: 'img/7S_10C_yellow4.jpg', rewarded: null}
]

// SECTION 4 //
CONFIG.TRIAL_INFO = [
  { block: 1, trial: 1, stimulus: "img/7S_10C_yellow6.jpg", rewarded: 0 },
  { block: 1, trial: 2, stimulus: "img/7C_10S_yellow5.jpg", rewarded: 1 },
  { block: 1, trial: 3, stimulus: "img/7S_10C_yellow6.jpg", rewarded: 0 },
  { block: 1, trial: 4, stimulus: "img/7C_10S_yellow3.jpg", rewarded: 1 },
  
  { block: 2, trial: 1, stimulus: "img/7C_10S_yellow6.jpg", rewarded: 1 },
  { block: 2, trial: 2, stimulus: "img/7S_10C_yellow10.jpg", rewarded: 0 },
  { block: 2, trial: 3, stimulus: "img/7S_10C_yellow6.jpg", rewarded: 0 },
  { block: 2, trial: 4, stimulus: "img/7S_10C_yellow7.jpg", rewarded: 0 },
  
  { block: 3, trial: 1, stimulus: "img/7C_10S_yellow3.jpg", rewarded: 1 },
  { block: 3, trial: 2, stimulus: "img/7S_10C_yellow9.jpg", rewarded: 1 },
  { block: 3, trial: 3, stimulus: "img/7S_10C_yellow8.jpg", rewarded: 0 },
  { block: 3, trial: 4, stimulus: "img/7C_10S_yellow6.jpg", rewarded: 0 }
 ]