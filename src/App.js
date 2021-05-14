import './App.css';
import React, { useState } from "react";


const App = () => {
  const [resultInput, setResultInput] = useState("");
  let [numbers] = useState([]);
  const [errors, setErrors] = useState("");
  let [operations] = useState([]);
  const containsOperation = (str, operations) => {
    for (let i = 0; i < operations.length; i++) {
      let operation = operations[i];
      if (str.indexOf(operation) > -1) {
        return true;
      }
    }
    return false
  }
  const calculation = () => {
    operations = [];
    numbers = [];
    if (/^[0-9+*/,-.]*$/.test(resultInput)) {
      if (resultInput.includes(",")) {
        var splitedPars = resultInput.split(",");
        for (let i = 0; i < splitedPars.length; i++) {
          if (!containsOperation(splitedPars[i], ["+", "-", "*", "/"])) {
            numbers.push(parseFloat(splitedPars[i].toString()));
          } else {
            operations.push(splitedPars[i]);
          }
        }
        if (operations.length + 1 === numbers.length) {
          for (let i = 0; i < splitedPars.length; i++) {
            if (splitedPars[i] === "+") {
              numbers.push(numbers.pop() + numbers.pop());
            }
            if (splitedPars[i] === "/") {

              numbers.push(numbers.pop() / numbers.pop());
            }
            if (splitedPars[i] === "*") {
              numbers.push(numbers.pop() * numbers.pop());
            }
            if (splitedPars[i] === "-") {
              numbers.push(numbers.pop() - numbers.pop());
            }
          }
          setErrors("");
          return setResultInput(resultInput + " = " + parseFloat(numbers.pop().toFixed(2)));
        } else if (operations.length >= numbers.length) {
          return setErrors("Something went wrong! Check number of OPERATORS")
        } else {
          return setErrors("Something went wrong! Check the number of OPERANDS!")
        }
      }
    }
    if (resultInput === "") {
      return setErrors("You did not enter anything!")
    }
    return setErrors("Only numbers and arithmetic operators are valid!");
  }

  const onChangeHandle = (e) => {
    setResultInput(e.target.value);
  }

  const clear = () => {
    setResultInput("");
  }
  return (
    <div>
      <div className="calculator-app-wrapper">
        <div className="appHeader">
          <h3>Reverse Polish Notation Calculator</h3>
          <hr></hr>
        </div>
        <div className="input-div">
          <input placeholder="Enter the operand and operator: 2,3,5.5,*,-,+" type="text" value={resultInput} onChange={onChangeHandle}></input>
        </div>
        <div className="buttons">
          <button onClick={calculation}>Submit</button>
          <button onClick={clear}>Reset</button>
        </div>
        <div className="errors" style={{ color: "red", alignContent: "center" }}>
          {errors}
        </div>
      </div>
    </div >

  );
}


export default App;
