var CONFIG = {
  FIXATION_DURATION: 500, // ms (how long to show the fixation cross)
  STIMULUS_DURATION: 350, // ms (how long to show the stimulus for classification)
  TRIAL_DURATION: null, // ms, (maximum duration to wait for a response before continuing; or set to null to wait for a response indefinitely)
  FEEDBACK_DURATION: 1000, // ms (how long to show the feedback when it appears)
  RESPONSE_DISPLAY_DURATION: 500, // ms (how long to show the image corresponding to the response that the subject made)
  LEFT_KEY: 'a', // use lowercase
  RIGHT_KEY: 'l', // use lowercase
  LEFT_SHAPE: 'circles', // use plural form
  RIGHT_SHAPE: 'squares', // use plural form
  LEFT_EXAMPLE: 'img/7S_10C_yellow1.jpg',
  RIGHT_EXAMPLE: 'img/7C_10S_yellow3.jpg',
  IMAGE_SIZE: 500, // pixels
  ESTIMATED_TOTAL_DURATION: 10, // minutes
  TOTAL_BLOCKS: 3, // make sure this matches the numbers assigned in the stimulus info below
  BREAK_LENGTH: 5000, // ms length of break between blocks
  REWARD_AMOUNT: 20, // cents
  TOTAL_REWARD: 24.20, // dollars
  PLAY_REWARD_AUDIO: true,
  REWARD_SOUND: 'mp3/reward-coin-drop.mp3', // path to file (use mp3 if possible for browser compatibility), set to null if no sound
  SHOW_ACCURACY_AT_END: false // show "you responded correctly on X of N trials" at the end screen?
}

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
  'img/reward.gif',
  'img/yellow_circle.jpeg',
  'img/yellow_square.jpeg'
]

// note that practice trials will be shown in a random order
CONFIG.PRACTICE_TRIALS = [
  {block: null, trial: null, stimulus: 'img/7C_10S_yellow3.jpg', rewarded: null},
  {block: null, trial: null, stimulus: 'img/7C_10S_yellow4.jpg', rewarded: null},
  {block: null, trial: null, stimulus: 'img/7S_10C_yellow3.jpg', rewarded: null},
  {block: null, trial: null, stimulus: 'img/7S_10C_yellow4.jpg', rewarded: null}
]

CONFIG.TRIAL_INFO = [
  { "block": 1, "trial": 1, "stimulus": "img/7S_10C_yellow6.jpg", "rewarded": 0 },
  { "block": 1, "trial": 2, "stimulus": "img/7C_10S_yellow5.jpg", "rewarded": 1 },
  { "block": 1, "trial": 3, "stimulus": "img/7S_10C_yellow6.jpg", "rewarded": 0 },
  { "block": 1, "trial": 4, "stimulus": "img/7C_10S_yellow3.jpg", "rewarded": 1 },
  
  { "block": 2, "trial": 1, "stimulus": "img/7C_10S_yellow6.jpg", "rewarded": 1 },
  { "block": 2, "trial": 2, "stimulus": "img/7S_10C_yellow10.jpg", "rewarded": 0 },
  { "block": 2, "trial": 3, "stimulus": "img/7S_10C_yellow6.jpg", "rewarded": 0 },
  { "block": 2, "trial": 4, "stimulus": "img/7S_10C_yellow7.jpg", "rewarded": 0 },
  
  { "block": 3, "trial": 1, "stimulus": "img/7C_10S_yellow3.jpg", "rewarded": 1 },
  { "block": 3, "trial": 2, "stimulus": "img/7S_10C_yellow9.jpg", "rewarded": 1 },
  { "block": 3, "trial": 3, "stimulus": "img/7S_10C_yellow8.jpg", "rewarded": 0 },
  { "block": 3, "trial": 4, "stimulus": "img/7C_10S_yellow6.jpg", "rewarded": 0 },
 ]