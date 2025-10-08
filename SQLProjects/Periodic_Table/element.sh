#!/bin/bash
PSQL="psql --username=freecodecamp --dbname=periodic_table -t --no-align -c"

function RETURN_ELEMENT_DATA() {
  if [[ $1 =~ ^[0-9]+$ ]]
  then
    ELEMENT_SELECT=$($PSQL "SELECT atomic_number, type, atomic_mass, melting_point_celsius, boiling_point_celsius, symbol, name
                            FROM properties
                            INNER JOIN elements USING(atomic_number)
                            INNER JOIN types USING(type_id)
                            WHERE atomic_number = $1")
  else
    ELEMENT_SELECT=$($PSQL "SELECT atomic_number, type, atomic_mass, melting_point_celsius, boiling_point_celsius, symbol, name
                            FROM properties
                            INNER JOIN elements USING(atomic_number)
                            INNER JOIN types USING(type_id)
                            WHERE symbol = '$1' OR name = '$1'")
  fi

  if [[ -z $ELEMENT_SELECT ]]
  then
    echo "I could not find that element in the database."
  else
    echo "$ELEMENT_SELECT" | while IFS="|" read -r ATOMIC_NUMBER TYPE WEIGHT MELTING_POINT BOILING_POINT SYMBOL NAME
    do
      echo "The element with atomic number $ATOMIC_NUMBER is $NAME ($SYMBOL). It's a $TYPE, with a mass of $WEIGHT amu. $NAME has a melting point of $MELTING_POINT celsius and a boiling point of $BOILING_POINT celsius."
    done
  fi
}
if [[ -z $1 ]]
then
  echo "Please provide an element as an argument."
else
  RETURN_ELEMENT_DATA $1
fi