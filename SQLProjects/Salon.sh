#!/bin/bash

PSQL="psql -X --username=freecodecamp --dbname=salon --no-align --tuples-only -c"

MAIN_MENU() {
  if [[ $1 ]]; then
    echo -e "\n$1"
  fi

  echo -e "Please select what service you would like"
  SERVICES=$($PSQL "SELECT service_id, name FROM services")
  echo "$SERVICES" | while IFS="|" read -r service_id name
  do
    echo "$service_id) $name"
  done
  echo "4) Exit"

  read SERVICE_ID_SELECTED

  case $SERVICE_ID_SELECTED in
    1|2|3) BOOK_APPOINTMENT ;;
    4) EXIT ;;
    *) MAIN_MENU "Enter a valid selection" ;;
  esac
}

BOOK_APPOINTMENT() {
  SERVICE_NAME=$($PSQL "SELECT name FROM services WHERE service_id=$SERVICE_ID_SELECTED" | xargs)

  echo "What is your phone number?"
  read CUSTOMER_PHONE

  CUSTOMER_NAME=$($PSQL "SELECT name FROM customers WHERE phone='$CUSTOMER_PHONE'" | xargs)

  if [[ -z $CUSTOMER_NAME ]]; then
    echo "Phone number not found, please enter your name"
    read CUSTOMER_NAME
    $PSQL "INSERT INTO customers(phone,name) VALUES('$CUSTOMER_PHONE','$CUSTOMER_NAME')" >/dev/null
  fi

  CUSTOMER_ID=$($PSQL "SELECT customer_id FROM customers WHERE phone='$CUSTOMER_PHONE'" | xargs)

  echo "What time would you like your $SERVICE_NAME, $CUSTOMER_NAME?"
  read SERVICE_TIME

  # TIME_TAKEN=$($PSQL "SELECT time FROM appointments WHERE service_id=$SERVICE_ID_SELECTED AND time='$SERVICE_TIME'" | xargs)
  # if [[ ! -z $TIME_TAKEN ]]; then
  #   echo "Sorry that time is already reserved"
  #   MAIN_MENU
  # else
    $PSQL "INSERT INTO appointments(customer_id, service_id, time) VALUES($CUSTOMER_ID, $SERVICE_ID_SELECTED, '$SERVICE_TIME')" >/dev/null
    echo "I have put you down for a $SERVICE_NAME at $SERVICE_TIME, $CUSTOMER_NAME."
  # fi
}

EXIT() {
  echo -e "\nThank you for stopping by the Salon."
}

MAIN_MENU