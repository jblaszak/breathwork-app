import React, { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";
import Form from "./components/Form";

import classes from "./App.module.css";

function App() {
  const breathRef = useRef();
  const [inhaleTimer, setInhaleTimer] = useState(4);
  const [holdTimer, setHoldTimer] = useState(4);
  const [exhaleTimer, setExhaleTimer] = useState(4);
  const [hold2Timer, setHold2Timer] = useState(4);

  const breathTypes = ["Inhale", "Hold", "Exhale", "Hold"];
  const breathCounts = [inhaleTimer, holdTimer, exhaleTimer, hold2Timer];

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

  useEffect(() => {
    let y1 = "90vh";
    let y2 = "10vh";

    switch (breath) {
      case 1: // HOLD
        y1 = y2;
        break;
      case 2: // EXHALE
        [y1, y2] = [y2, y1];
        break;
      case 3: // HOLD 2
        y2 = y1;
        break;
      default:
        // INHALE
        break;
    }
    gsap.fromTo(
      breathRef.current,
      { autoAlpha: 1, y: y1 },
      { autoAlpha: 0.2, y: y2, duration: breathCounts[breath] }
    );
  }, [breath, breathCounts]);

  const breathClass = `${classes.breath} ${
    isLeft ? classes.left : classes.right
  }`;

  return (
    <div>
      <div className={breathClass} ref={breathRef}>
        {breathTypes[breath]}
      </div>
      <Form timerHandler={timerHandler} isLeft={isLeft} setIsLeft={setIsLeft} />
    </div>
  );
}

export default App;
