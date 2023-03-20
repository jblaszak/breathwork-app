import { useState, forwardRef } from "react";
import Input from "./Input";
import classes from "./TimerControls.module.css";

const TimerControls = forwardRef(({ setTimer }, ref) => {
  function getTimeDigits() {
    let minutes = Math.floor((ref.current / 60000) % 60)
      .toFixed(0)
      .toString()
      .padStart(2, "0");
    let seconds = Math.floor((ref.current / 1000) % 60)
      .toFixed(0)
      .toString()
      .padStart(2, "0");
    return `${minutes}${seconds}`.split("").map((entry) => Number(entry));
  }

  const digits = getTimeDigits();

  const [tensMinutes, setTensMinutes] = useState(digits[0]);
  const [minutes, setMinutes] = useState(digits[1]);
  const [tensSeconds, setTensSeconds] = useState(digits[2]);
  const [seconds, setSeconds] = useState(digits[3]);

  function updateTimer(value, digit) {
    value = Number(value);
    const time = getTimeDigits();

    switch (digit) {
      case 4:
        setTensMinutes(value);
        time[0] = value;
        break;
      case 3:
        setMinutes(value);
        time[1] = value;
        break;
      case 2:
        setTensSeconds(value);
        time[2] = value;
        break;
      case 1:
        setSeconds(value);
        time[3] = value;
        break;
      default:
        return;
    }
    const newTimerValue = ((time[0] * 10 + time[1]) * 60 + time[2] * 10 + time[3]) * 1000;
    ref.current = newTimerValue;
    setTimer(newTimerValue);
  }

  return (
    <>
      <div className={classes.timerContainer}>
        <label>TIMER</label>
        <Input
          value={tensMinutes}
          variant={"vertical"}
          ariaText="tens minutes"
          min={0}
          max={5}
          step={1}
          setValue={(val) => updateTimer(val, 4)}
        />
        <Input
          value={minutes}
          variant={"vertical"}
          ariaText="minutes"
          min={0}
          max={9}
          step={1}
          setValue={(val) => updateTimer(val, 3)}
        />
        <span>:</span>
        <Input
          value={tensSeconds}
          variant={"vertical"}
          ariaText="tens seconds"
          min={0}
          max={5}
          step={1}
          setValue={(val) => updateTimer(val, 2)}
        />
        <Input
          value={seconds}
          variant={"vertical"}
          ariaText="seconds"
          min={0}
          max={9}
          step={1}
          setValue={(val) => updateTimer(val, 1)}
        />
      </div>
    </>
  );
});

export default TimerControls;
