    /* add TMB script if using TMB to save data */
    if(CONFIG.SAVE_DATA_TYPE == 'tmb'){
      var head = document.getElementsByTagName('head')[0];
      var js = document.createElement("script");
      js.type = "text/javascript";
      js.src = "TestMyBrain.12.18.min.js";
      head.appendChild(js);
    }

    /* add condition info to data */
    jsPsych.data.addProperties({
      left_shape: CONFIG.LEFT_SHAPE,
      right_shape: CONFIG.RIGHT_SHAPE,
      bias_shape: CONFIG.BIAS_SHAPE
    });

    /* reward setup */
    var unrewarded_left_trials = 0;
    var unrewarded_right_trials = 0;
    
    /* instructions */

    var id_entry = {
      type: 'survey-text',
      preamble: '<p style="font-size:24px;">Welcome to the task!</p>',
      questions: [
        {prompt: CONFIG.ID_MESSAGE}
      ],
      data: {
        task: 'id'
      }
    }

    var instructions_intro_1 = {
      type: 'html-keyboard-response',
      stimulus: `<p>Welcome! Please position your index fingers on the "${CONFIG.LEFT_KEY.toUpperCase()}" and "${CONFIG.RIGHT_KEY.toUpperCase()}" keys for this experiment.
        The game will last approximately ${CONFIG.ESTIMATED_TOTAL_DURATION} minutes and is composed of ${CONFIG.TOTAL_BLOCKS} blocks 
        separated by a break.</p><p>Press the spacebar to continue.</p>`,
      choices: [32]
    }

    var instructions_intro_2 = {
      type: 'html-keyboard-response',
      stimulus: `<p>In this experiment you will be presented with either an image with more squares than circles, or an image with 
        more circles than squares. You will see them one at a time.</p>
        <p>Your task will be to decide whether more squares or more circles were presented by pushing the correct button as quickly
        and accurately as possible.</p>
        <p>The "${CONFIG.LEFT_KEY.toUpperCase()}" key will be used to identify more ${CONFIG.LEFT_SHAPE} and the "${CONFIG.RIGHT_KEY.toUpperCase()}" key will be used 
        to identify more ${CONFIG.RIGHT_SHAPE}. Examples of what the images look like are below:</p>
        <p style="height: ${CONFIG.IMAGE_SIZE/2 + 50}px;">
        <img style="width:${CONFIG.IMAGE_SIZE/2}px; float: left;" src="${CONFIG.LEFT_EXAMPLE}"></img>
        <img style="width:${CONFIG.IMAGE_SIZE/2}px; float: right;" src="${CONFIG.RIGHT_EXAMPLE}"></img>
        <span style="text-align:center; width:${CONFIG.IMAGE_SIZE/2}px; clear:both; float: left;">More ${CONFIG.LEFT_SHAPE} = ${CONFIG.LEFT_KEY.toUpperCase()}</span>
        <span style="text-align:center; width:${CONFIG.IMAGE_SIZE/2}px; float: right;">More ${CONFIG.RIGHT_SHAPE} = ${CONFIG.RIGHT_KEY.toUpperCase()}</span>
        </p>
        <p>Press the spacebar to continue.</p>`,
      choices: [32]
    }

    var instructions_intro_2a = {
      type: 'html-keyboard-response',
      stimulus: `<p style="font-size: 18px;">More ${CONFIG.LEFT_SHAPE}</p>
        <img src="${CONFIG.LEFT_SINGLE_EXAMPLE}" style="width:100px;"></img>
        <p>The [${CONFIG.LEFT_KEY.toUpperCase()}] key will be used to identify pictures with <span style="text-decoration: underline;">more ${CONFIG.LEFT_SHAPE}.</span></p>
        <img style="width:${CONFIG.IMAGE_SIZE/2}px;" src="${CONFIG.LEFT_EXAMPLE}"></img>
        <p>Press the [${CONFIG.LEFT_KEY.toUpperCase()}] key to continue.</p>`,
      choices: [CONFIG.LEFT_KEY]
    }

    var instructions_intro_2b = {
      type: 'html-keyboard-response',
      stimulus: `<p style="font-size: 18px;">More ${CONFIG.RIGHT_SHAPE}</p>
        <img src="${CONFIG.RIGHT_SINGLE_EXAMPLE}" style="width:100px;"></img>
        <p>The [${CONFIG.RIGHT_KEY.toUpperCase()}] key will be used to identify pictures with <span style="text-decoration: underline;">more ${CONFIG.RIGHT_SHAPE}.</span></p>
        <img style="width:${CONFIG.IMAGE_SIZE/2}px;" src="${CONFIG.RIGHT_EXAMPLE}"></img>
        <p>Press the [${CONFIG.RIGHT_KEY.toUpperCase()}] key to continue.</p>`,
      choices: [CONFIG.RIGHT_KEY]
    }

    var instructions_intro_3 = {
      type: 'html-keyboard-response',
      stimulus: `<p>Now, let's take a practice run. You will see a fixation cross, '+', on the screen. You should always focus your
        attention on the fixation cross as this will help you identify the image as quickly and accurately as possible. The fixation
        cross will be followed by an image with more squares or more circles. Remember, if you think there are more ${CONFIG.LEFT_SHAPE}
        press the "${CONFIG.LEFT_KEY.toUpperCase()}" key. If you think there are more ${CONFIG.RIGHT_SHAPE} press the "${CONFIG.RIGHT_KEY.toUpperCase()}" key.</p>
        <p>If you understand these directions and are ready to proceed to the practice round, please press the spacebar.</p>`,
      choices: [32]
    }

    var instructions_intro = {
      timeline: [instructions_intro_1, instructions_intro_2, instructions_intro_2a, instructions_intro_2b, instructions_intro_3]
    }

    var instructions_practice_loop = {
      type: 'html-keyboard-response',
      stimulus: `<p>Would you like to practice more? y = yes, n = no</p>`,
      choices: ['y','n']
    }

    var instructions_feedback_1 = {
      type: 'html-keyboard-response',
      stimulus: function(){
        if(CONFIG.REWARD_AMOUNT == 0 || CONFIG.REWARD_AMOUNT == null){
          return `<p>For some trials, a correct identification will be rewarded with positive feedback.</p>
          <p>Press the spacebar to see what this will look like.</p>`
        } else {
          return `<p>For some trials, a correct identification will result in a monetary reward of ${CONFIG.REWARD_AMOUNT} cents.</p>
          <p>Press the spacebar to see what this will look like.</p>`
        }
      },
      choices: [32]
    }

    if(CONFIG.PLAY_REWARD_AUDIO){
      var reward = {
        type: 'audio-keyboard-response',
        stimulus: CONFIG.REWARD_SOUND,
        prompt: function(){
          if(CONFIG.REWARD_AMOUNT == 0 || CONFIG.REWARD_AMOUNT == null){
            return `<img src="${CONFIG.REWARD_IMAGE}"></img><p class="feedback">Correct!</p>`
          } else {
            return `<img src="${CONFIG.REWARD_IMAGE}"></img><p class="feedback">Correct! You win ${CONFIG.REWARD_AMOUNT} cents!</p>`
          }
        },
        trial_duration: CONFIG.FEEDBACK_DURATION,
        choices: jsPsych.NO_KEYS
      }
    } else {
      var reward = {
        type: 'html-keyboard-response',
        stimulus: function(){
          if(CONFIG.REWARD_AMOUNT == 0 || CONFIG.REWARD_AMOUNT == null){
            return `<img src="${CONFIG.REWARD_IMAGE}"></img><p class="feedback">Correct!</p>`
          } else {
            return `<img src="${CONFIG.REWARD_IMAGE}"></img><p class="feedback">Correct! You win ${CONFIG.REWARD_AMOUNT} cents!</p>`
          }
        },
        trial_duration: CONFIG.FEEDBACK_DURATION,
        choices: jsPsych.NO_KEYS
      }
    }
    

    var instructions_feedback_2 = {
      type: 'html-keyboard-response',
      stimulus: function(){
        var html =  `<p><span style="color:red; font-weight:bold;">Not all</span> correct responses will receive a reward.</p>`
        if(CONFIG.REWARD_AMOUNT != 0 && CONFIG.REWARD_AMOUNT != null){
          html += `<p>At the end of the experiment you will be given the amount of money you have accumulated. The more correct identifications
          you make, the more money you will take home.</p>`
        }
        html += `<p>Press the spacebar to continue.</p>`;
        return html;
      },
      choices: [32]
    }

    var instructions_feedback_3 = {
      type: 'html-keyboard-response',
      stimulus: `<p>We are now ready to begin the experiment.</p>
        <p>Remember, focus your attention on the fixation cross before each trial. If you think there are more ${CONFIG.LEFT_SHAPE}
        press the "${CONFIG.LEFT_KEY.toUpperCase()}" key. If you think there are more ${CONFIG.RIGHT_SHAPE} press the "${CONFIG.RIGHT_KEY.toUpperCase()}" key.</p>
        <p>Good luck!</p>
        <p>Press the spacebar to begin.</p>`,
      choices: [32]
    }

    var instructions_feedback = {
      timeline: [instructions_feedback_1, reward, instructions_feedback_2, instructions_feedback_3]
    }


    /* task */ 

    var fixation = {
      type: 'html-keyboard-response',
      stimulus: `<p class="fixation">+</p>`,
      choices: jsPsych.NO_KEYS,
      trial_duration: CONFIG.FIXATION_DURATION,
      prompt: `<div style="position: absolute; top: 2vh; left: 2vw;">
          <img src="${CONFIG.LEFT_SINGLE_EXAMPLE}" style="width:100px;"></img>
          <p>${CONFIG.LEFT_KEY.toUpperCase()} = ${CONFIG.LEFT_SHAPE}</p>
        </div>
        <div style="position: absolute; top: 2vh; right: 2vw;">
          <img src="${CONFIG.RIGHT_SINGLE_EXAMPLE}" style="width:100px;"></img>
          <p>${CONFIG.RIGHT_KEY.toUpperCase()} = ${CONFIG.RIGHT_SHAPE}</p>
        </div>`
    }

    var target_display = {
      type: 'html-keyboard-response',
      stimulus: function(){
        return `<img src="${jsPsych.timelineVariable('stimulus',true)}" style="width:${CONFIG.IMAGE_SIZE}px;"></img>`
      },
      prompt: `
        <div style="position: absolute; top: 2vh; left: 2vw;">
          <img src="${CONFIG.LEFT_SINGLE_EXAMPLE}" style="width:100px;"></img>
          <p>${CONFIG.LEFT_KEY.toUpperCase()} = ${CONFIG.LEFT_SHAPE}</p>
        </div>
        <div style="position: absolute; top: 2vh; right: 2vw;">
          <img src="${CONFIG.RIGHT_SINGLE_EXAMPLE}" style="width:100px;"></img>
          <p>${CONFIG.RIGHT_KEY.toUpperCase()} = ${CONFIG.RIGHT_SHAPE}</p>
        </div>`,
      stimulus_duration: CONFIG.STIMULUS_DURATION,
      trial_duration_min: CONFIG.STIMULUS_DURATION,
      trial_duration: CONFIG.TRIAL_DURATION,
      choices: [CONFIG.LEFT_KEY,CONFIG.RIGHT_KEY],
      data: {
        block: jsPsych.timelineVariable('block'),
        trial: jsPsych.timelineVariable('trial'),
        rewarded: jsPsych.timelineVariable('rewarded'),
        image: jsPsych.timelineVariable('stimulus'),
        unrewarded_left_trials: function() { return unrewarded_left_trials; },
        unrewarded_right_trials: function() { return unrewarded_right_trials; },
        task: 'respond'
      },
      on_finish: function(data){
        if(data.image.includes('7C_10S')){
          data.correct_shape = "squares"
        }
        if(data.image.includes('7S_10C')){
          data.correct_shape = "circles"
        }
        if(data.key_press == null){
          data.response = null;
          data.correct = false;
        }
        if(data.key_press == jsPsych.pluginAPI.convertKeyCharacterToKeyCode(CONFIG.LEFT_KEY)){
          data.response = CONFIG.LEFT_SHAPE;
          data.correct = data.correct_shape == CONFIG.LEFT_SHAPE;
        }
        if(data.key_press == jsPsych.pluginAPI.convertKeyCharacterToKeyCode(CONFIG.RIGHT_KEY)){
          data.response = CONFIG.RIGHT_SHAPE;
          data.correct = data.correct_shape == CONFIG.RIGHT_SHAPE;
        }
        // below is to calculate whether a reward should be displayed on this trial
        if(jsPsych.timelineVariable('rewarded', true) == 1){
          if(data.correct){
            data.did_reward = true;
          } else {
            if(data.correct_shape == CONFIG.LEFT_SHAPE) {
              unrewarded_left_trials++;
            }
            if(data.correct_shape == CONFIG.RIGHT_SHAPE) {
              unrewarded_right_trials++;
            }
            data.did_reward = false; 
          }
        } else {
          if(jsPsych.data.get().filter({task: 'respond'}).last(1).values()[0].correct){
            if(data.correct_shape == CONFIG.LEFT_SHAPE && unrewarded_left_trials > 0){
              unrewarded_left_trials--;
              data.did_reward = true;
            }
            if(data.correct_shape == CONFIG.RIGHT_SHAPE && unrewarded_right_trials > 0){
              unrewarded_right_trials--;
              data.did_reward = true;
            }
          }
          data.did_reward = false;
        }
      }
    }

    var timeout_display = {
      timeline: [{
        type: 'html-keyboard-response',
        stimulus: `<p>Time out!</p>
          <p>Press the ${CONFIG.LEFT_KEY.toUpperCase()} or ${CONFIG.RIGHT_KEY.toUpperCase()} key to continue.</p>`,
        choices: [CONFIG.LEFT_KEY, CONFIG.RIGHT_KEY]
      }],
      conditional_function: function(){
        return jsPsych.data.get().filter({task: 'respond'}).last(1).values()[0].response == null;
      }
    }

    var response_display = {
      timeline: [{
        type: 'html-keyboard-response',
        stimulus: function(){
          var data = jsPsych.data.get().last(1).values()[0];
          if(data.response == "circles"){
            return `<img src="img/yellow_circle.jpeg"></img>`
          }
          if(data.response == "squares"){
            return `<img src="img/yellow_square.jpeg"></img>`
          }
        },
        choices: jsPsych.NO_KEYS,
        trial_duration: function(){
          // var last_trial_duration = jsPsych.data.get().last(1).values()[0].rt;
          // var gap = CONFIG.ISI - last_trial_duration;
          // return gap;
          return CONFIG.RESPONSE_DISPLAY_DURATION;
        }
      }],
      conditional_function: function(){
        return jsPsych.data.get().last(1).values()[0].key_press !== null;
      }
    }

    if(CONFIG.PLAY_REWARD_AUDIO){
      var practice_feedback = {
        type: 'audio-keyboard-response',
        stimulus: function(){
          var last_trial = jsPsych.data.get().filter({task: 'respond'}).last(1).values()[0]
          if(last_trial.key_press == null){
            return null;
          }
          if(last_trial.correct){
            return CONFIG.REWARD_SOUND;
          } else {
            return null;
          }
        },
        prompt: function(){
          var last_trial = jsPsych.data.get().filter({task: 'respond'}).last(1).values()[0]
          if(last_trial.key_press == null){
            return `<p class="feedback">Please respond faster.</p>`;
          }
          if(last_trial.correct){
            return `<p class="feedback">Correct</p>`
          } else {
            return `<p class="feedback">Incorrect</p>`
          }
        },
        trial_duration: CONFIG.FEEDBACK_DURATION,
        choices: jsPsych.NO_KEYS,
        data: {
          task: 'accuracy-feedback'
        }
      }
    } else {
      var practice_feedback = {
        type: 'html-keyboard-response',
        stimulus: function(){
          var last_trial = jsPsych.data.get().filter({task: 'respond'}).last(1).values()[0]
          if(last_trial.key_press == null){
            return `<p class="feedback">Please respond faster.</p>`;
          }
          if(last_trial.correct){
            return `<p class="feedback">Correct</p>`
          } else {
            return `<p class="feedback">Incorrect</p>`
          }
        },
        trial_duration: CONFIG.FEEDBACK_DURATION,
        choices: jsPsych.NO_KEYS,
        data: {
          task: 'accuracy-feedback'
        }
      }
    }

    var blank_screen = {
      type: 'html-keyboard-response',
      stimulus: '',
      trial_duration: CONFIG.FEEDBACK_DURATION,
      choices: jsPsych.NO_KEYS
    }
   
    var feedback = {
      timeline: [reward],
      data: {
        task: 'reward-feedback'
      },
      conditional_function: function(){
        return jsPsych.data.get().filter({task: 'respond'}).last(1).values()[0].did_reward;
      }
    }

    

    var blank_in_place_of_feedback = {
      timeline: [blank_screen],
      conditional_function: function(){
        // this checks if the last trial was a feedback trial, in which case
        // we don't need to show this blank screen
        return jsPsych.data.get().last(1).values()[0].task != 'reward-feedback';
      }
    }

    /* practice version */

    var practice_trials = {
      timeline: [fixation, target_display, practice_feedback, blank_in_place_of_feedback],
      timeline_variables: CONFIG.PRACTICE_TRIALS,
      data: {
        phase: 'practice'
      },
      randomize_order: true
    }

    var practice_procedure = {
      timeline: [practice_trials, instructions_practice_loop],
      loop_function: function(data){
        return data.last(1).values()[0].key_press == jsPsych.pluginAPI.convertKeyCharacterToKeyCode('y');
      }
    }

    /* real version */

    var test_procedure = {
      timeline: [],
      data: {
        phase: 'test'
      }
    }
    for(var b=1; b<=CONFIG.TOTAL_BLOCKS; b++){
      var test_block = {
        timeline: [fixation, target_display, timeout_display, feedback, blank_in_place_of_feedback],
        timeline_variables: CONFIG.TRIAL_INFO.filter(function(x){ return x.block == b}),
        data: {
          block: b
        }
      }
      test_procedure.timeline.push(test_block);
      if(b < CONFIG.TOTAL_BLOCKS){
        var rest = {
          type: 'html-keyboard-response',
          stimulus: `<p>You have completed ${b} of ${CONFIG.TOTAL_BLOCKS} blocks of trials.</p>
            <p>The next block will begin in ${CONFIG.BREAK_LENGTH/1000} seconds.</p>`,
          trial_duration: CONFIG.BREAK_LENGTH,
          choices: jsPsych.NO_KEYS
        }
        test_procedure.timeline.push(rest);
      }
    }

    /* save data */ 

    var save_data = {
      type: 'call-function',
      func: function(){
        if(CONFIG.SAVE_DATA_TYPE == 'tmb'){
          var results = jsPsych.data.get().ignore("internal_node_id").ignore("key_press").values();
          var score = 0;
          var outcomes = {};
          tmbSubmitToServer(results,score,outcomes);
        }
        if(CONFIG.SAVE_DATA_TYPE == 'local'){
          var randomID = jsPsych.randomization.randomID(6);
          jsPsych.data.get().ignore("internal_node_id").ignore("key_press").localSave('csv', `prt-data-${randomID}.csv`)
        }
        if(CONFIG.SAVE_DATA_TYPE == 'cognition'){
          return; // don't need to do anything because cognition.run automatically saves data.
        }
      }
    }

    /* end */ 

    var final_screen = {
      type: 'html-keyboard-response',
      choices: jsPsych.NO_KEYS,
      stimulus: function(){
        var correct_trial_count = jsPsych.data.get().filter({task: 'respond', phase: 'test', correct: true}).count();
        var total_trial_count = jsPsych.data.get().filter({task: 'respond', phase: 'test'}).count();
        
        var total_earned = CONFIG.TOTAL_REWARD; //jsPsych.data.get().filter({task: 'reward-feedback'}).count() * CONFIG.REWARD_AMOUNT / 100;

        var output_html = `<p>You have completed the task!</p>`

        if(CONFIG.SHOW_ACCURACY_AT_END){
          
          output_html += `<p>You responded correctly on ${correct_trial_count} of ${total_trial_count} trials.</p>`
        }
        if(CONFIG.REWARD_AMOUNT != null && CONFIG.REWARD_AMOUNT != 0){
          output_html += `<p>You earned $${total_earned.toFixed(2)}!</p>`
        }
        output_html += `<p>You are now finished with the task. Please close your browser.</p>`
        return output_html;       
      },
      on_load: function(){
        if(CONFIG.SAVE_DATA_TYPE == 'cognition'){
          // if running on cognition.run, this seems to help with saving final bit of data and marking the task as finalized.
          jsPsych.endExperiment();
        }
      }
    }


    /* initialization */
    var timeline = [];

    timeline.push(id_entry);
    timeline.push(instructions_intro);
    timeline.push(practice_procedure);
    timeline.push(instructions_feedback);
    timeline.push(test_procedure);
    timeline.push(save_data);
    timeline.push(final_screen);

    var audio = [];
    if(CONFIG.PLAY_REWARD_AUDIO){
      audio.push(CONFIG.REWARD_SOUND)
    }

    jsPsych.init({
      timeline: timeline,
      preload_images: CONFIG.IMAGE_LIST,
      preload_audio: audio,
      use_webaudio: false,
      experiment_width: 800
    })