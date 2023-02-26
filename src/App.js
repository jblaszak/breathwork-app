import React, { useEffect, useState, useMemo, useRef } from "react";

import classes from "./App.module.css";

function App() {
  const inhaleRef = useRef();
  const holdRef = useRef();
  const exhaleRef = useRef();
  const hold2Ref = useRef();
  const controlsRef = useRef();
  const rafRef = useRef(0);
  const breathRef = useRef(0);
  const stepCountRef = useRef(0);

  const breathRefs = [inhaleRef, holdRef, exhaleRef, hold2Ref];
  const breathNames = ["INHALE", "HOLD", "EXHALE", "HOLD"];

  const setup = {
    default: 2,
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

  const startAnimation = () => {
    let start = Date.now();
    const animatedClass = `${classes.animation}`;

    function playAnimation() {
      const interval = Date.now() - start;
      const currentBreath = stepCountRef.current % breathRefs.length;
      breathRef.current.dataBreath = breathNames[currentBreath];
      breathRef.current.innerText = breathNames[currentBreath];
      if (!breathRef.current.classList.contains(animatedClass)) {
        breathRef.current.classList.add(animatedClass);
      }
      if (interval > breathRefs[currentBreath].current.value * 1000) {
        stepCountRef.current++;
        const nextBreath = stepCountRef.current % breathRefs.length;
        document.documentElement.style.setProperty(
          "--breath-time",
          `${breathRefs[nextBreath].current.value}s`
        );
        breathRef.current.dataBreath = breathNames[nextBreath];
        breathRef.current.innerText = breathNames[nextBreath];
        breathRef.current.classList.remove(animatedClass);
        start = Date.now();
      }

      rafRef.current = requestAnimationFrame(playAnimation);
    }
    requestAnimationFrame(playAnimation);
  };

  useEffect(() => {
    startAnimation();
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <>
      <div className={classes.breathContainer}>
        <div className={classes.breath} data-breath="inhale" ref={breathRef}></div>
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
      </div>
    </>
  );
}

export default App;
