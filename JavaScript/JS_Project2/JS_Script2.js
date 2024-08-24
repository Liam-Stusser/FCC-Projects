const inputContainer = document.getElementById("number");
const button = document.getElementById("convert-btn");
const output = document.getElementById("output");

button.addEventListener("click", () => {   
  let userInput = parseInt(inputContainer.value); //assigns a variable for what the user inputs
  
if (!userInput) {
    output.textContent = "Please enter a valid number";
    return;
  }

  if (userInput < 1) {
    output.textContent = "Please enter a number greater than or equal to 1";
    return;
  }

  if (userInput >= 4000) {
    output.textContent = "Please enter a number less than or equal to 3999";
    return;
  }
   else { 
    let value; //Variable that will subtract from input to iterate through each Roman numeral section
    let romanNumeral = ""; //Initialize as an empty string to store the Roman numeral

    while(userInput > 0) {
      if (userInput >= 1000) { //value of 1000 or more
        value = 1000;
        romanNumeral += "M";
        userInput -= value;
      }
      else if (userInput >= 900) { //value of 900-999
        value = 900;
        romanNumeral += "CM";
        userInput -= value;
      }
      else if (userInput >= 500) { //value of 500-899
        value = 500;
        romanNumeral += "D";
        userInput -= value;
      }
      else if (userInput >= 400) { //value of 400-499
        value = 400;
        romanNumeral += "CD";
        userInput -= value;
      }
      else if (userInput >= 100) { //value of 100-399
        value = 100;
        romanNumeral += "C";
        userInput -= value;
      }
      else if (userInput >= 90) { //value of 90-99
        value = 90;
        romanNumeral += "XC";
        userInput -= value;
      }
      else if (userInput >= 50) { //value of 50-89
        value = 50;
        romanNumeral += "L";
        userInput -= value;
      }
      else if (userInput >= 40) { //value of 40-50
        value = 40;
        romanNumeral += "XL";
        userInput -= value;
      }
      else if (userInput >= 10) { //value of 10-39
        value = 10;
        romanNumeral += "X";
        userInput -= value;
      }
      else if (userInput >= 9) { //value of 9
        value = 9;
        romanNumeral += "IX";
        userInput -= value;
      }
      else if (userInput >= 5) { //value of 5-8
        value = 5;
        romanNumeral += "V";
        userInput -= value;
      }
      else if (userInput >= 4) { //value of 4
        value = 4;
        romanNumeral += "IV";
        userInput -= value;
      }
      else { //finally if it is under 4
        value = 1;
        romanNumeral += "I";
        userInput -= value;
      }
    }

    output.textContent = romanNumeral; //Output the Roman numeral string
  }
});
