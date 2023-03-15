import React, { useEffect, useRef, useState } from "react";
import Input from "./components/Input";
import cloud from "./assets/cloud.svg";
import sitting from "./assets/sitting.svg";

import classes from "./App.module.css";

function App() {
  const defaultBreathLength = (4).toFixed(1);
  const [breath1, setBreath1] = useState(defaultBreathLength);
  const [breath2, setBreath2] = useState(defaultBreathLength);
  const [breath3, setBreath3] = useState(defaultBreathLength);
  const [breath4, setBreath4] = useState(defaultBreathLength);
  const [started, setStarted] = useState(false);
  const controlsRef = useRef();
  const rafRef = useRef(0);
  const breathRef = useRef();
  const stepCountRef = useRef(0);
  const timerDisplayRef = useRef("");
  const timerRef = useRef(Date.now() + 60 * 1000 * 10);

  const breaths = [
    { name: "INHALE", value: breath1, setValue: setBreath1 },
    { name: "HOLD", value: breath2, setValue: setBreath2 },
    { name: "EXHALE", value: breath3, setValue: setBreath3 },
    { name: "HOLD", value: breath4, setValue: setBreath4 },
  ];

  function start() {
    setStarted(true);
    stepCountRef.current = 0;
    timerRef.current = Date.now() + 60 * 1000 * 10;
  }

  function formatTime(time) {
    const minutes = Math.floor((time / 60000) % 60);
    const seconds = Math.floor((time / 1000) % 60);
    return `${minutes.toFixed(0).toString().padStart(2, "0")}:${seconds
      .toFixed(0)
      .toString()
      .padStart(2, "0")}`;
  }

  const startAnimation = () => {
    let start = Date.now();
    const animatedClass = `${classes.animation}`;

    function playAnimation() {
      const interval = Date.now() - start;
      const currentBreath = stepCountRef.current % breaths.length;
      breathRef.current.innerText = breaths[currentBreath].name;

      const timeLeft = timerRef.current - Date.now();
      if (timeLeft <= 0) setStarted(false);
      timerDisplayRef.current.innerText = formatTime(timeLeft);

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
    if (started) {
      startAnimation();
      return () => cancelAnimationFrame(rafRef.current);
    }
  }, [started]);

  function showControls() {
    controlsRef.current.style.opacity = 1;
    controlsRef.current.style.transition = "opacity 0.5s";
    controlsRef.current.style.visibility = "visible";
  }

  function hideControls() {
    controlsRef.current.style.opacity = 0;
    controlsRef.current.style.transition = "opacity 0.5s, visibility 0.5s";
    controlsRef.current.style.visibility = "hidden";
  }

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
          <div className={classes.instructions}>
            {started && (
              <>
                <span className={classes.breath} ref={breathRef}></span>
                <p className={classes.timer} ref={timerDisplayRef}></p>
                <button className={classes.subButton} onClick={() => start()}>
                  RESTART
                </button>
              </>
            )}
            {!started && (
              <button className={classes.startButton} onClick={() => start()}>
                START
              </button>
            )}
            <button className={classes.subButton} onClick={() => showControls()}>
              SETTINGS
            </button>
          </div>
        </div>
        {
          <div
            className={classes.settings}
            ref={controlsRef}
            onClick={(e) => {
              if (e.target.tagName === "DIV") hideControls();
            }}
          >
            {breaths.map((breath, i) => {
              return (
                <Input
                  key={`${breath.name + i}`}
                  label={breath.name}
                  value={breath.value}
                  setValue={breath.setValue}
                />
              );
            })}
            <button
              className={`${classes.subButton} ${classes.close}`}
              onClick={() => hideControls()}
            >
              CLOSE
            </button>
          </div>
        }
      </main>
    </>
  );
}

export default App;
