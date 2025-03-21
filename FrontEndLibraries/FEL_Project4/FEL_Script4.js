import React from "react";
import ReactDOM from "react-dom/client";
const buttons = [
    { value: "7", id: "seven" },
    { value: "8", id: "eight" },
    { value: "9", id: "nine" },
    { value: "/", id: "divide" },
    { value: "4", id: "four" },
    { value: "5", id: "five" },
    { value: "6", id: "six" },
    { value: "x", id: "multiply" },
    { value: "1", id: "one" },
    { value: "2", id: "two" },
    { value: "3", id: "three" },
    { value: "-", id: "subtract" },
    { value: "0", id: "zero" },
    { value: ".", id: "decimal" },
    { value: "+", id: "add" },
    { value: "=", id: "equals" },
    { value: "AC", id: "clear" }
  ];
  
  class Button extends React.Component {
    render() {
      const { id, className, label, onClick } = this.props;
      return (
        <button className={className} id={id} onClick={() => onClick(label)}>
          {label}
        </button>
      );
    }
  }
  
  class Calculator extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        display: "0"
      };
      this.handleButtonClick = this.handleButtonClick.bind(this);
      this.calculate = this.calculate.bind(this);
      this.evaluateExpression = this.evaluateExpression.bind(this);
      this.cleanExpression = this.cleanExpression.bind(this);
    }
  
    handleButtonClick = (label) => {
      this.setState((prevState) => {
        let newDisplay = prevState.display;
  
        let parts = newDisplay.split(/[\+\-\x\/]/);
        const lastNum = parts[parts.length - 1];
        const lastChar = newDisplay.slice(-1);
  
        if (label === "AC") {
          return { display: "0" };
        }
  
        if (label === "=") {
          return this.calculate(newDisplay);
        }
  
        if (label === ".") {
          if (lastNum.includes(".")) {
            return prevState;
          } else if (lastNum === "") {
            newDisplay += "0.";
          } else {
            newDisplay += ".";
          }
          return { display: newDisplay };
        }
  
        if ("+x/".includes(label)) {
          if ("+x/-".includes(lastChar)) {
            newDisplay = newDisplay.slice(0, -1) + label;
          } else {
            newDisplay += label;
          }
          return { display: newDisplay };
        }
  
        if (label === "-") {
          let lastChar = newDisplay.slice(-1);
          let lastTwoChars = newDisplay.slice(-2);
  
          if (/[+\-x/]$/.test(lastChar) && /[+\-x/]$/.test(lastTwoChars[0])) {
            return { display: newDisplay };
          }
  
          if (
            newDisplay === "0" ||
            /[+\-x/]$/.test(lastChar) ||
            !isNaN(lastChar)
          ) {
            newDisplay += label;
          }
  
          return { display: newDisplay };
        }
  
        if (prevState.display === "0" && label !== ".") {
          newDisplay = label;
        } else {
          newDisplay += label;
        }
  
        return { display: newDisplay };
      });
    };
  
    calculate = (expression) => {
    try {
      expression = this.cleanExpression(expression);
      if (/[+\-*/]$/.test(expression)) {
        expression = expression.slice(0, -1);
      }
  
      if (!/^[0-9+\-*/.]+$/.test(expression)) {
        return { display: "Error" };
      }
  
      const result = Function(`"use strict"; return (${expression})`)();
      return { display: result.toString() };
    } catch (err) {
      return { display: "Error" };
    }
  }
    
    cleanExpression = (expression) => {
    expression = expression.replace(/x/g, "*");
    expression = expression.replace(/([+\*/]){2,}/g, (match) => match.slice(-1));
    expression = expression.replace(/([+\*/])-([+\*/])/g, "$2");
    if (/[+\*/]$/.test(expression)) {
      expression = expression.slice(0, -1);
    }
  
    return expression;
  };
  
    evaluateExpression = (expression) => {
      let tokens = expression.match(/(\d+(\.\d+)?)|[+\-*/]/g);
  
      if (!tokens || isNaN(tokens[tokens.length - 1])) return "Error";
  
      let processedTokens = [];
      let i = 0;
  
      while (i < tokens.length) {
        if (tokens[i] === "*" || tokens[i] === "/") {
          let left = parseFloat(processedTokens.pop());
          let right = parseFloat(tokens[i + 1]);
          let result = tokens[i] === "*" ? left * right : left / right;
          processedTokens.push(result);
          i += 2;
        } else {
          processedTokens.push(tokens[i]);
          i++;
        }
      }
      
      let finalResult = parseFloat(processedTokens[0]);
      for(let j = 1;j < processedTokens.length;j+= 2) {
        let operator = processedTokens[j];
        let nextNumber = parseFloat(processedTokens[j+1]);
        
        if(operator === "+"){
          finalResult += nextNumber;
        }
        else if (operator === "-"){
          finalResult -= nextNumber;
        }
      }
      return finalResult;
    };
  
    render() {
      return (
        <div className="calculator">
          <div id="display" className="display">
            {this.state.display}
          </div>
          {buttons.map((button, index) => (
            <Button
              key={index}
              id={button.id}
              className={button.value === "=" ? "btn-equal" : "btn"}
              label={button.value}
              onClick={this.handleButtonClick}
            />
          ))}
        </div>
      );
    }
  }
  
  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(<Calculator />);