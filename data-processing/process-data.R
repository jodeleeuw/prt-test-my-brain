library(readr)
library(dplyr)
library(stringr)
library(lubridate)
library(jsonlite)

### PARAMETERS TO SET

input.folder <- 'data-input' # will process all files in this folder
output.folder <- 'data-output' # ... and create a copy in this folder with prefix out-
long.shape <- 'cats' 
short.shape <- 'dogs'

### REST RUNS AUTOMATICALLY

process.file <- function(file){
  
  data <- read_csv(paste(input.folder,file,sep="/"))
  
  subject <- (data %>% filter(task == "id") %>% pull(responses))[1] %>%
    fromJSON() %>% .$Q0
  
  long.key <- (data %>% 
    filter(phase=='test', correct_shape == long.shape, correct == "true") %>%
    pull(key_press))[1] %>% as.numeric() %>% intToUtf8() %>% tolower()
  short.key <- (data %>% 
    filter(phase=='test', correct_shape == short.shape, correct == "true") %>%
    pull(key_press))[1] %>% as.numeric() %>% intToUtf8() %>% tolower()
  
  bias.shape <- data[1,'bias_shape']
  left.shape <- data[1,'left_shape']
  right.shape <- data[1,'right_shape']
  
  test.data <- data %>% 
    filter(phase == 'test', task == 'respond') %>%
    mutate(trial = 1:n()) %>%
    mutate(trial.copy = trial) %>%
    mutate(condition = if_else(correct_shape == short.shape, 'short', 'long')) %>%
    mutate(time = round(as.numeric(rt))) %>%
    mutate(key_press = tolower(intToUtf8(as.numeric(key_press), multiple=T))) %>%
    mutate(correct = as.numeric(as.logical(correct))) %>%
    mutate(did_reward = as.numeric(as.logical(did_reward))) %>%
    mutate(reward_due = rewarded) %>%
    rowwise() %>%
    mutate(short_due = if_else(left.shape == short.shape, unrewarded_left_trials, unrewarded_right_trials)) %>%
    mutate(long_due = if_else(left.shape == long.shape, unrewarded_left_trials, unrewarded_right_trials)) %>%
    ungroup() %>%
    select(trial, condition, time, key_press, trial.copy, correct, did_reward, reward_due, short_due, long_due)
  
  data.time <- data$recorded_at[1]
  sf <- stamp("6/7/2019 5:16:52 PM", orders = "mdY IMS p", quiet = T)
  date.time.string <- sf(data.time)
  
  # this is the old way of extracting subject ID from the file name
  # subject <- str_extract(file, pattern="[0-9]{1,4}.csv") %>% str_sub(start=1,end=-5)
  subject.string <- paste0("Subject: ", subject)
  
  short.key.string <- paste0("Short Key: ", short.key)
  long.key.string <- paste0("Long Key: ", long.key)
  
  bias.string <- paste0("Bias: ", ifelse(bias.shape == long.shape, 'long', 'short'))
  
  outputFile <- paste(output.folder, paste0("out-",str_replace(file,'.csv','.txt')), sep="/")
  write_lines(c(
    "*****************************************************************************",
    date.time.string,
    subject.string,
    "Session: 1",
    short.key.string,
    long.key.string,
    bias.string,
    "-",
    "-",
    "-",
    "-",
    "-",
    "-",
    "-",
    "-",
    "-",
    "-"), file=outputFile)
  write_delim(test.data, file = outputFile, append=TRUE)
}

all.files <- dir(input.folder)
for(f in all.files){
  process.file(f)
}
