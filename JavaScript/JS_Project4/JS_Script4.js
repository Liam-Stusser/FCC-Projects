let price = 3.26;
let cid = [
  ['PENNY', 1.01],
  ['NICKEL', 2.05],
  ['DIME', 3.1],
  ['QUARTER', 4.25],
  ['ONE', 90],
  ['FIVE', 55],
  ['TEN', 20],
  ['TWENTY', 60],
  ['ONE HUNDRED', 100]
];

const changeDueTxt = document.getElementById("change-due");
const userInput = document.getElementById("cash");
const purchaseBtn = document.getElementById("purchase-btn");
const display = document.getElementById("display");

window.onload = () => {

  const total = document.createElement('h2');
  total.textContent = `Total: $${price.toFixed(2)}`;
  display.prepend(total);

  cid.forEach((value,index) => {
    const moneyType = document.createElement('h4');
    moneyType.textContent = `${value[0]}: $${value[1]}`
    moneyType.id = `cid-${index}`;
    display.appendChild(moneyType);
  })

};

const calculateChange = () => {

  const currencyToValue = [.01,.05,.10,.25,1,5,10,20,100];

  let changeArr = [
  ['PENNY', 0],
  ['NICKEL', 0],
  ['DIME', 0],
  ['QUARTER', 0],
  ['ONE', 0],
  ['FIVE', 0],
  ['TEN', 0],
  ['TWENTY', 0],
  ['ONE HUNDRED', 0]];
  let inputValue = parseFloat(userInput.value)
  let remainder = parseFloat((inputValue - price).toFixed(2));
  let totalChange = parseFloat(cid.reduce((sum, item) => sum + item[1], 0).toFixed(2));

  if (remainder > totalChange) {
    changeDueTxt.textContent = "Status: INSUFFICIENT_FUNDS";
    return;
  } 
  else if (remainder === totalChange) {
    changeDueTxt.textContent = "Status: CLOSED " + 
      cid.filter(item => item[1] > 0).map(item => `${item[0]}: $${item[1].toFixed(2)}`).join(", ");
    return;
  }
 
    for(let i = cid.length-1;i >= 0; i--){
      let coinValue = currencyToValue[i];
      let available = cid[i][1];

      while(remainder >= currencyToValue[i]&&cid[i][1] > 0)
      {
        let amountToGive = Math.min(remainder - (remainder % coinValue), available);
        changeArr[i][1] += amountToGive; 
        remainder = parseFloat((remainder - amountToGive).toFixed(2)); 
        available = parseFloat((available - amountToGive).toFixed(2)); 
      }

      cid[i][1] = parseFloat((cid[i][1] - changeArr[i][1]).toFixed(2));
    }

    if(remainder > 0){
      changeDueTxt.textContent = "Status: INSUFFICIENT_FUNDS";
    }
    else{
      let output = changeArr.filter(item => item[1] > 0).reverse().map(item => `${item[0]}: $${item[1].toFixed(2)}`).join(", ");
      changeDueTxt.textContent = `Status: Open ${output}`;
      
      cid.forEach((value,index) => {
          const moneyType = document.getElementById(`cid-${index}`);
          moneyType.textContent = `${value[0]}: $${value[1]}`; 
      });
    }

};

purchaseBtn.addEventListener("click", () => {
  if(changeDueTxt.classList.contains(`hidden`)){
  changeDueTxt.classList.toggle('hidden');
  }

  let inputValue = parseFloat(userInput.value);

  if(inputValue < price){
    alert("Customer does not have enough money to purchase the item");
  }
  else if(inputValue === price){
    changeDueTxt.innerText = "No change due - customer paid with exact cash";
  }
  else{
    calculateChange();
  }
});