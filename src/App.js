import React, { useEffect, useState, useMemo, useRef } from "react";

import classes from "./App.module.css";

function App() {
  const inhaleRef = useRef();
  const holdRef = useRef();
  const exhaleRef = useRef();
  const hold2Ref = useRef();
  const controlsRef = useRef();

  const [isLeft, setIsLeft] = useState(true);

  const setup = {
    default: 4,
    min: 0,
    max: 15,
    step: 0.1,
  };

  useEffect(() => {
    let timer = null;
    function handleMouseMove(e) {
      clearTimeout(timer);
      controlsRef.current.style.opacity = 1;
      timer = setTimeout(() => {
        controlsRef.current.style.opacity = 0;
      }, 3000);
    }

    document.addEventListener("mousemove", handleMouseMove);

    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // const timerHandler = (inhale, hold, exhale, hold2) => {
  //   setInhaleTimer(inhale);
  //   setHoldTimer(hold);
  //   setExhaleTimer(exhale);
  //   setHold2Timer(hold2);
  //   setBreath(0);
  // };

  // useEffect(() => {
  //   const breathTimeout = setTimeout(() => {
  //     setBreath(breath + 1 === breathCounts.length ? 0 : breath + 1);
  //   }, 1000 * breathCounts[breath]);

  //   return () => clearTimeout(breathTimeout);
  // }, [breath, breathCounts.length, breathCounts]);

  return (
    <>
      <div className={classes.breathContainer}>
        <div className={classes.breath} data-breath="inhale" data-side={isLeft ? "left" : "right"}>
          {/* {breathTypes[breath]} */}
          BREATH
        </div>
      </div>
      <div className={classes.controls} ref={controlsRef}>
        <div className={classes.inputContainer}>
          <label>Inhale</label>
          <input
            ref={inhaleRef}
            id="inhale"
            name="inhale"
            type="number"
            min={setup.min}
            max={setup.max}
            step={setup.step}
            defaultValue={setup.default}
          />
        </div>
        <div className={classes.inputContainer}>
          <label>Hold</label>
          <input
            ref={holdRef}
            id="hold"
            name="hold"
            type="number"
            min={setup.min}
            max={setup.max}
            step={setup.step}
            defaultValue={setup.default}
          />
        </div>
        <div className={classes.inputContainer}>
          <label>Exhale</label>
          <input
            ref={exhaleRef}
            id="exhale"
            name="exhale"
            type="number"
            min={setup.min}
            max={setup.max}
            step={setup.step}
            defaultValue={setup.default}
          />
        </div>
        <div className={classes.inputContainer}>
          <label>Hold</label>
          <input
            ref={hold2Ref}
            id="hold2"
            name="hold"
            type="number"
            min={setup.min}
            max={setup.max}
            step={setup.step}
            defaultValue={setup.default}
          />
        </div>
        <button className={classes.button} onClick={() => setIsLeft(!isLeft)}>
          {isLeft ? "Breath Right" : "Breath Left"}
        </button>
      </div>
    </>
  );
}

export default App;
