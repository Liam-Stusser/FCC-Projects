const chkButton = document.getElementById("check-btn");
const clrButton = document.getElementById("clear-btn");
const userInputField = document.getElementById("user-input");
const results = document.getElementById("results-div");

chkButton.addEventListener("click", validateNumber);
clrButton.addEventListener("click", clearInput);
userInputField.addEventListener("keydown",(event) => {
  if(event.key === "Enter"){
    validateNumber();
  }
});

function validateNumber() {
  results.classList.remove("valid", "invalid");

  const userInput = userInputField.value.trim();

  if (!userInput) {
    alert("Please provide a phone number");
    return;
  }

  const validNumber = /^1?\s?(\(\d{3}\)|\d{3})[-\s]?\d{3}[-\s]?\d{4}$/;

  if (validNumber.test(userInput)) {
    results.textContent = `Valid US number: ${userInput}`;
    results.classList.add("valid");
  } else {
    results.textContent = `Invalid US number: ${userInput}`;
    results.classList.add("invalid");
  }
}

function clearInput() {
  userInputField.value = "";
  results.textContent = "";
  results.classList.remove("valid", "invalid");
}
