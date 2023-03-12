import React, { useEffect, useRef, useState } from "react";
import Input from "./components/Input";
import cloud from "./assets/cloud2.svg";
import sitting from "./assets/sitting3.svg";

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
  const timerDisplayRef = useRef("");
  const timerRef = useRef(Date.now() + 1000 * 60 * 10);

  const breaths = [
    { name: "INHALE", value: breath1, setValue: setBreath1 },
    { name: "HOLD", value: breath2, setValue: setBreath2 },
    { name: "EXHALE", value: breath3, setValue: setBreath3 },
    { name: "HOLD", value: breath4, setValue: setBreath4 },
  ];

  // useEffect(() => {
  //   let timer = null;
  //   function handleMouseMove(e) {
  //     clearTimeout(timer);
  //     controlsRef.current.style.opacity = 1;
  //     timer = setTimeout(() => {
  //       controlsRef.current.style.opacity = 0;
  //     }, 3000);
  //   }
  //   document.addEventListener("mousemove", handleMouseMove);
  //   return () => document.removeEventListener("mousemove", handleMouseMove);
  // }, []);

  function formatTime(time) {
    // const time = time / 1000;
    const minutes = (time / 60000) % 59;
    const seconds = (time / 1000) % 60;
    return `${minutes} : ${seconds}`;
  }

  const startAnimation = () => {
    let start = Date.now();
    const animatedClass = `${classes.animation}`;

    function playAnimation() {
      const interval = Date.now() - start;
      const currentBreath = stepCountRef.current % breaths.length;
      breathRef.current.innerText = breaths[currentBreath].name;
      timerDisplayRef.current.innerText = formatTime(timerRef.current - Date.now());
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
      <main>
        <div className={classes.breathContainer}>
          <div className={classes.cloudContainer}>
            <img src={cloud} alt="cloud" />
            <img src={cloud} alt="cloud2" />
            <img src={cloud} alt="cloud3" />
          </div>
          <img className={classes.meditating} src={sitting} alt="meditating girl" />
          <p className={classes.breath} ref={breathRef}></p>
          <p className={classes.timer} ref={timerDisplayRef}></p>
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
      </main>
    </>
  );
}

export default App;
