import { useState } from "react";

import Wrapper from "./components/Wrapper/Wrapper";
import Screen from "./components/Screen/Screen";
import ButtonBox from "./components/ButtonBox/ButtonBox";
import Button from "./components/Button/Button";

const btnValues = [
  ["AC", "+/-", "%", "÷"],
  [7, 8, 9, "X"],
  [4, 5, 6, "-"],
  [1, 2, 3, "+"],
  [0, ".", "="],
];

const toLocaleString = (num) =>
  String(num);

const removeSpaces = (num) => num.toString();

function App() {

  let [calc, setCalc] = useState({
    sign: "",
    num: 0,
    res: 0
  });

  const numClickHandler = (event) => {
    event.preventDefault();
    const value = event.target.innerHTML;

    if (removeSpaces(calc.num).length < 16) {
      setCalc({
        ...calc,
        num:
          calc.num === 0 && value === "0"
            ? "0"
            : removeSpaces(calc.num) % 1 === 0
            ? toLocaleString(Number(removeSpaces(calc.num + value)))
            : toLocaleString(calc.num + value),
        res: !calc.sign ? 0 : calc.res,
      });
    }
  };

  const commaClickHandler = (event) => {
    event.preventDefault();
    const value = event.target.innerHTML;

    setCalc({
      ...calc, 
      num: calc.num.toString().includes(".") ? calc.num : calc.num + value
    })
  }

  const signClickHandler = (event) => {
    event.preventDefault();
    const value = event.target.innerHTML;

    setCalc({
      ...calc,
      sign: value,
      res: !calc.res && calc.num ? calc.num : calc.res,  
      num: 0
    })
  }

  const equalsClickHandler = () => {
    if (calc.sign && calc.num) {
      const math = (a, b, sign) => 
        sign === "+"
          ? a + b
          : sign === "-"
          ? a - b
          : sign === "X"
          ? a * b
          : a / b;

      setCalc({
        ...calc, 
        res:
          calc.num === "0" && calc.sign === "÷"
            ? "Cannot divide with zero"
            : math(Number(calc.res), Number(calc.num), calc.sign), 
        sign: "", 
        num: 0
      })
    }
  }

  const invertClickHandler = () => {
    setCalc({
      ...calc, 
      num: calc.num ? calc.num * -1 : 0,
      res: calc.res ? calc.res * -1 : 0,
      sign: ""
    })
  }

  const percentClickHandler = () => {
    let num = calc.num ? parseFloat(calc.num) : 0;
    let res = calc.res ? parseFloat(calc.res) : 0;

    setCalc({
      ...calc, 
      num: (num /= 100),
      res: (res /= 100),
      sign: ""
    })
  }

  const resetClickHandler = () => {
    setCalc({
      ...calc, 
      sign: "", 
      num: 0,
      res: 0
    })
  }

  return (
    <Wrapper>
      <Screen value={calc.num ? calc.num : calc.res} />
      <ButtonBox>
        {btnValues.flat().map((btn,i) => {
            return (
              <Button
                key={i}
                className={
                  btn === "+" || btn === "-" ||btn === "X" || btn === "÷" || btn === "="
                    ? "bright"
                    : btn === "AC" || btn === "+/-" || btn === "%"
                    ? "dull"
                    : btn === 0
                    ? "large"
                    : ""
                }
                value={btn}
                onClick={
                  btn === "AC"
                    ? resetClickHandler
                    : btn === "+/-"
                    ? invertClickHandler
                    : btn === "%"
                    ? percentClickHandler
                    : btn === "="
                    ? equalsClickHandler
                    : btn === "+" || btn === "-" ||btn === "X" || btn === "÷"
                    ? signClickHandler
                    : btn === "."
                    ? commaClickHandler
                    : numClickHandler
                }
              />
            )})}
      </ButtonBox> 
    </Wrapper>
  );
}

export default App;
