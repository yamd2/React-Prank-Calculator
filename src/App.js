import logo from "./logo.svg";
import { useState } from "react";
import "./App.css";
import { Display } from "./components/Display";
import { BtnArea } from "./components/BtnArea";
import sound from "./assets/aa.wav";

const operators = ["%", "/", "*", "-", "+"];

const App = () => {
  const [strToDisplay, setStrToDisplay] = useState("");
  const [lastOperator, setLastOperator] = useState("");
  const [isPrank, setIsPrank] = useState(false);

  const randomNumber = () => {
    const num = Math.round(Math.random() * 10);

    return num > 5 ? 0 : num;
  };

  const handleOnButtonClick = (val) => {
    isPrank && setIsPrank(false);
    if (val === "C") {
      return setStrToDisplay(strToDisplay.slice(0, -1));
    }

    if (val === "AC") {
      return setStrToDisplay("");
    }

    if (val === "=") {
      const lastChar = strToDisplay[strToDisplay.length - 1];
      let temStr = strToDisplay;

      if (operators.includes(lastChar)) {
        temStr = strToDisplay.slice(0, -1);
      }

      const extra = randomNumber();

      if (extra) {
        setIsPrank(true);
        const audio = new Audio(sound);
        audio.play();
      }

      extra && setIsPrank(true);

      const total = eval(temStr) + extra;
      return setStrToDisplay(total.toString());
    }

    if (operators.includes(val)) {
      console.log("you clicked operators");
      if (!strToDisplay) {
        return;
      }

      let temStr = strToDisplay;
      const lastChar = strToDisplay[strToDisplay.length - 1];

      if (operators.includes(lastChar)) {
        temStr = strToDisplay.slice(0, -1);
      }

      setStrToDisplay(temStr + val);
      setLastOperator(val);
      return;
    }

    if (val === ".") {
      if (lastOperator) {
        const operatorIndex = strToDisplay.lastIndexOf(lastOperator);

        const numberAfterLastOperator = strToDisplay.slice(operatorIndex);

        if (numberAfterLastOperator.includes(".")) {
          return;
        }
      }

      if (!lastOperator && strToDisplay.includes(".")) {
        return;
      }
    }

    setStrToDisplay(strToDisplay + val);
  };

  return (
    <div>
      <div className="wrapper">
        <div className="round"></div>
        <div className="calculater">
          <Display strToDisplay={strToDisplay} isPrank={isPrank} />
          <BtnArea handleOnButtonClick={handleOnButtonClick} />
        </div>
      </div>
    </div>
  );
};

export default App;
