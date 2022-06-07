import Wrapper from "./components/Wrapper/Wrapper";
import Screen from "./components/Screen/Screen";
import ButtonBox from "./components/ButtonBox/ButtonBox";
import Button from "./components/Button/Button";
import { useState } from "react";

function App() {

  let [calc, setCalc] = useState({
    sign: "",
    num: 0,
    res: 0
  });

  const btnValues = [
      ["AC", "+/-", "%", "÷"],
      [7, 8, 9, "X"],
      [4, 5, 6, "-"],
      [1, 2, 3, "+"],
      [0, ".", "="],
    ];

  return (
    <Wrapper>
      <Screen value={calc.num ? calc.num : calc.res} />
      <ButtonBox>
        {
          btnValues.flat().map((btn,i) => {
            return (
              <Button
                key={i}
                className={btn === "=" ? "equals" : ""}
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
                    : btn === "+" || btn === "-" ||btn === "X" || btn === "/"
                    ? signClickHandler
                    : btn === "."
                    ? commaClickHandler
                    : numClickHandler
                }
              />
            )
          })
        }
      </ButtonBox> 
    </Wrapper>
  );
}

export default App;
