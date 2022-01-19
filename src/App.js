import React, { useEffect, useState, useMemo } from "react";
import Form from "./components/Form";

import classes from "./App.module.css";

function App() {
  const [inhaleTimer, setInhaleTimer] = useState(4);
  const [holdTimer, setHoldTimer] = useState(4);
  const [exhaleTimer, setExhaleTimer] = useState(4);
  const [hold2Timer, setHold2Timer] = useState(4);

  const breathTypes = ["Inhale", "Hold1", "Exhale", "Hold2"];
  const breathCounts = useMemo(() => {
    return [inhaleTimer, holdTimer, exhaleTimer, hold2Timer];
  }, [inhaleTimer, holdTimer, exhaleTimer, hold2Timer]);

  const [breath, setBreath] = useState(0);
  const [isLeft, setIsLeft] = useState(true);

  const timerHandler = (inhale, hold, exhale, hold2) => {
    setInhaleTimer(inhale);
    setHoldTimer(hold);
    setExhaleTimer(exhale);
    setHold2Timer(hold2);
    setBreath(0);
  };

  useEffect(() => {
    const breathTimeout = setTimeout(() => {
      setBreath(breath + 1 === breathCounts.length ? 0 : breath + 1);
    }, 1000 * breathCounts[breath]);

    return () => clearTimeout(breathTimeout);
  }, [breath, breathCounts.length, breathCounts]);

  const breathClass = `${classes.breath} ${
    isLeft ? classes.left : classes.right
  }`;

  return (
    <div>
      <div
        className={breathClass}
        style={{
          animationName: classes[breathTypes[breath]],
          animationDuration: `${breathCounts[breath]}s`,
        }}
      >
        {breathTypes[breath]}
      </div>
      <Form timerHandler={timerHandler} isLeft={isLeft} setIsLeft={setIsLeft} />
    </div>
  );
}

export default App;
