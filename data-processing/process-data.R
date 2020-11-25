library(readr)
library(dplyr)
library(stringr)
library(lubridate)

file <- 'example-data-01.csv'
input.folder <- 'data-input'
output.folder <- 'data-output'
long.shape <- 'squares'
short.shape <- 'circles'
bias.shape <- 'squares'

data <- read_csv(paste(input.folder,file,sep="/"))

long.key <- (data %>% 
  filter(phase=='test', correct_shape == long.shape, correct == "true") %>%
  pull(key_press))[1] %>% as.numeric() %>% intToUtf8() %>% tolower()
short.key <- (data %>% 
  filter(phase=='test', correct_shape == short.shape, correct == "true") %>%
  pull(key_press))[1] %>% as.numeric() %>% intToUtf8() %>% tolower()

# trial: current trial number (1 to 300; each of the two blocks has 100 trials) 
# condition: The actual stimulus that was presented during the trial. I believe for the processing pipeline to run, we will still need to put big/little or long/short in this column. So we could decide that squares are long and circles are short, just for the sake of processing.
# time: reaction time of subject response (in milliseconds) in current trial 
# key_press: which key subject chose on current trial (put A or L, rather than the circle vs squares)
# trial: [repeated from above] 
# correct: 1 if subject was correct on current trial; 0 if incorrect 
# did_reward: 1 if subject got positive feedback on current trial; 0 if no feedback 
# reward_due: 1 if a reward feedback was due for current trial; 0 if no feedback due (**) 
# short_due: number of reward feedbacks due for short (circles); 0 if no short (circles) feedback due (**) 
# long_due: number of reward feedbacks due for long (squares); 0 if no long (squares) feedback due 

test.data <- data %>% 
  filter(phase == 'test', task == 'respond') %>%
  mutate(trial = 1:n()) %>%
  mutate(condition = if_else(correct_shape == short.shape, 'short', 'long')) %>%
  mutate(time = round(as.numeric(rt))) %>%
  mutate(key_press = tolower(intToUtf8(as.numeric(key_press), multiple=T))) %>%
  mutate(correct = as.numeric(as.logical(correct))) %>%
  mutate(reward_due = rewarded) %>%
  select(trial, condition, time, key_press, correct, did_reward)

data.time <- data$recorded_at[1]
sf <- stamp("6/7/2019 5:16:52 PM", orders = "mdY IMS p")
date.time.string <- sf(data.time)

subject <- str_extract(file, pattern="[0-9]{1,4}")
subject.string <- paste0("Subject: ", subject)

short.key.string <- paste0("Short Key: ", short.key)
long.key.string <- paste0("Long Key: ", long.key)

bias.string <- ifelse(bias.shape == long.shape, 'long', 'short')

outputFile <- paste(output.folder, paste0("out-",str_replace(file,'.csv','.txt')), sep="/")
write_lines(c(
  "*****************************************************************************",
  date.time.string,
  subject.string,
  "Session: 1",
  "Short Key: ",
  "Long Key: ",
  "Bias: ",
  "-",
  "-",
  "-",
  "-",
  "-",
  "-",
  "-",
  "-",
  "-",
  "-"), path=outputFile)
write_delim(test.data, path=outputFile, append=TRUE)


###

# *****************************************************************************
#   6/7/2019 5:16:52 PM 
# Subject:067
# Session:1
# Short Key: v
# Long Key: m
# Bias: long
# -
#   -
#   -
#   -
#   -
#   -
#   -
#   -
#   -
#   -
