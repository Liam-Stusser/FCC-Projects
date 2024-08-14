const instructions = document.getElementById("instructions");
const submitButton = document.getElementById("check-btn");
const result = document.getElementById("result");

submitButton.addEventListener("click", ()=>{
const userInput = document.getElementById("text-input").value.trim();

if(!userInput){
  alert("Please input a value");
  return;
}

const cleanInput = userInput.toLowerCase().replace(/[^a-z0-9]/g,"");
const reverseInput = cleanInput.split('').reverse().join('');

if(cleanInput === reverseInput){
  result.textContent = `${userInput} is a palindrome`;
} else{
  result.textContent = `${userInput} is not a palindrome`;
}

});