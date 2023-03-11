import React, { useEffect, useRef, useState } from "react";
import Input from "./components/Input";

import classes from "./App.module.css";

function App() {
  const defaultBreathLength = 4;
  const [breath1, setBreath1] = useState(defaultBreathLength);
  const [breath2, setBreath2] = useState(defaultBreathLength);
  const [breath3, setBreath3] = useState(defaultBreathLength);
  const [breath4, setBreath4] = useState(defaultBreathLength);
  const controlsRef = useRef();
  const rafRef = useRef(0);
  const breathRef = useRef(0);
  const stepCountRef = useRef(0);

  const breaths = [
    { name: "INHALE", value: breath1, setValue: setBreath1 },
    { name: "HOLD", value: breath2, setValue: setBreath2 },
    { name: "EXHALE", value: breath3, setValue: setBreath3 },
    { name: "HOLD", value: breath4, setValue: setBreath4 },
  ];

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
      const currentBreath = stepCountRef.current % breaths.length;
      breathRef.current.innerText = breaths[currentBreath].name;
      if (!breathRef.current.classList.contains(animatedClass)) {
        breathRef.current.classList.add(animatedClass);
      }
      if (interval > breaths[currentBreath].value * 1000) {
        stepCountRef.current++;
        const nextBreath = stepCountRef.current % breaths.length;
        document.documentElement.style.setProperty(
          "--breath-time",
          `${breaths[nextBreath].value}s`
        );
        breathRef.current.innerText = breaths[nextBreath].name;
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
        <div className={classes.breath} ref={breathRef}></div>
      </div>
      <div className={classes.controls} ref={controlsRef}>
        {breaths.map((breath, i) => {
          return (
            <Input
              key={`${breath.name + i}`}
              label={breath.name}
              value={breath.value}
              setValue={breath.setValue}
              onChange={(e) => breath.setValue(e.target.value)}
            />
          );
        })}
      </div>
    </>
  );
}

export default App;
