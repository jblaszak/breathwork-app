import { useState, forwardRef } from "react";
import Input from "./Input";
import classes from "./TimerControls.module.css";

const TimerControls = forwardRef((props, ref) => {
  const [digit4, setDigit4] = useState(1);
  const [digit3, setDigit3] = useState(0);
  const [digit2, setDigit2] = useState(0);
  const [digit1, setDigit1] = useState(0);

  function setTimer(value, digit) {
    let minutes = Math.floor((ref.current / 60000) % 60)
      .toFixed(0)
      .toString()
      .padStart(2, "0");
    let seconds = Math.floor((ref.current / 1000) % 60)
      .toFixed(0)
      .toString()
      .padStart(2, "0");
    let time = `${minutes}${seconds}`.split("");

    switch (digit) {
      case 4:
        setDigit4(value);
        time[0] = value;
        break;
      case 3:
        setDigit3(value);
        time[1] = value;
        break;
      case 2:
        setDigit2(value);
        time[2] = value;
        break;
      case 1:
        setDigit1(value);
        time[3] = value;
        break;
      default:
        return;
    }
    ref.current =
      ((Number(time[0]) * 10 + Number(time[1])) * 60 + Number(time[2]) * 10 + Number(time[3])) *
      1000;
  }

  return (
    <>
      <div className={classes.timerContainer}>
        <label>TIMER</label>
        <Input
          value={digit4}
          variant={"vertical"}
          min={0}
          max={5}
          step={1}
          setValue={(val) => setTimer(val, 4)}
        />
        <Input
          value={digit3}
          variant={"vertical"}
          min={0}
          max={9}
          step={1}
          setValue={(val) => setTimer(val, 3)}
        />
        <span>:</span>
        <Input
          value={digit2}
          variant={"vertical"}
          min={0}
          max={5}
          step={1}
          setValue={(val) => setTimer(val, 2)}
        />
        <Input
          value={digit1}
          variant={"vertical"}
          min={0}
          max={9}
          step={1}
          setValue={(val) => setTimer(val, 1)}
        />
      </div>
    </>
  );
});

export default TimerControls;
