#!/bin/bash
PSQL="psql --username=freecodecamp --dbname=number_guess -t --no-align -c"

GAME_LOOP() {
  PLAYER_ID=$($PSQL "SELECT player_id FROM player_data WHERE username='$1'" | xargs)
  SECRET_NUMBER=$((RANDOM % 1000 + 1))
  NUMBER_OF_GUESSES=0

  echo "Guess the secret number between 1 and 1000:"
  while true; do
    read GUESS
    if [[ ! $GUESS =~ ^[0-9]+$ ]]; then
      echo "That is not an integer, guess again:"
    else
      ((NUMBER_OF_GUESSES++))
      if [[ $GUESS -eq $SECRET_NUMBER ]]; then
        echo "You guessed it in $NUMBER_OF_GUESSES tries. The secret number was $SECRET_NUMBER. Nice job!"
        $PSQL "INSERT INTO games_played(player_id, secret_number, guesses) VALUES($PLAYER_ID, $SECRET_NUMBER, $NUMBER_OF_GUESSES)" > /dev/null
        break
      elif [[ $GUESS -gt $SECRET_NUMBER ]]; then
        echo "It's lower than that, guess again:"
      else
        echo "It's higher than that, guess again:"
      fi
    fi
  done
}

LOGIN_SCREEN() {
  echo "Enter your username:"
  read USERNAME
  PLAYER_ID=$($PSQL "SELECT player_id FROM player_data WHERE username='$USERNAME'" | xargs)

  if [[ -z $PLAYER_ID ]]; then
    $PSQL "INSERT INTO player_data(username) VALUES('$USERNAME')" > /dev/null
    echo "Welcome, $USERNAME! It looks like this is your first time here."
    PLAYER_ID=$($PSQL "SELECT player_id FROM player_data WHERE username='$USERNAME'" | xargs)
  else
    GAMES_PLAYED=$($PSQL "SELECT COUNT(*) FROM games_played WHERE player_id=$PLAYER_ID" | xargs)
    BEST_GAME=$($PSQL "SELECT MIN(guesses) FROM games_played WHERE player_id=$PLAYER_ID" | xargs)
    echo "Welcome back, $USERNAME! You have played $GAMES_PLAYED games, and your best game took $BEST_GAME guesses."
  fi

  GAME_LOOP "$USERNAME"
}

LOGIN_SCREEN