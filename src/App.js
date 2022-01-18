import React, { useEffect, useState, useCallback, useRef } from "react";
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

  const getNextBreath = useCallback(
    (currentBreath) => {
      let newBreath = currentBreath + 1;

      while (
        newBreath === breathTypes.length ||
        breathCounts[newBreath] === 0
      ) {
        if (newBreath === breathTypes.length) {
          newBreath = 0;
        } else {
          newBreath++;
        }
      }

      setBreath(newBreath);
    },
    [breathTypes.length, breathCounts]
  );

  useEffect(() => {
    const breathTimeout = setTimeout(() => {
      getNextBreath(breath);
    }, 1000 * breathCounts[breath]);

    return () => clearTimeout(breathTimeout);
  }, [breath, breathTypes.length, breathCounts, getNextBreath]);

  useEffect(() => {
    switch (breath) {
      case 1: // HOLD
        gsap.fromTo(
          breathRef.current,
          { autoAlpha: 1 },
          { autoAlpha: 0.2, duration: breathCounts[breath] }
        );
        break;
      case 2: // EXHALE
        gsap.fromTo(
          breathRef.current,
          { autoAlpha: 1, y: "10vh" },
          { autoAlpha: 0.2, y: "90vh", duration: breathCounts[breath] }
        );
        break;
      case 3: // HOLD 2
        gsap.fromTo(
          breathRef.current,
          { autoAlpha: 1 },
          { autoAlpha: 0.2, duration: breathCounts[breath] }
        );
        break;
      default:
        // INHALE
        gsap.fromTo(
          breathRef.current,
          { autoAlpha: 1, y: "90vh" },
          { autoAlpha: 0.2, y: "10vh", duration: breathCounts[breath] }
        );
    }
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
