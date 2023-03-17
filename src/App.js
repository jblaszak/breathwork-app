import React, { useEffect, useRef, useState } from "react";
import Input from "./components/Input";
import TimerControls from "./components/TimerControls";
import useBreaths from "./hooks/useBreaths";

import { fadeInAudio, fadeOutAudio } from "./helpers/audio";
import { formatTime } from "./helpers/time";

import cloud from "./assets/cloud.svg";
import sitting from "./assets/sitting.svg";
import completed from "./assets/completed2.mp3";
import waves from "./assets/waves.mp3";

import classes from "./App.module.css";

function App() {
  const breaths = useBreaths();

  const controlsRef = useRef();
  const rafRef = useRef(0);
  const breathRef = useRef();
  const stepCountRef = useRef(0);
  const timerDisplayRef = useRef("");
  const defaultTime = 60 * 1000 * 10;
  const timerRef = useRef(defaultTime);
  const endTime = useRef(Date.now() + defaultTime);

  const [audioWaves] = useState(new Audio(waves));
  const [audioCompleted] = useState(new Audio(completed));

  const [started, setStarted] = useState(false);
  const [playBackground, setPlayBackground] = useState(false);
  const [playBreath, setPlayBreath] = useState("none");
  const playBreathRef = useRef(playBreath);

  function start() {
    setStarted(true);
    stepCountRef.current = 0;
    endTime.current = Date.now() + timerRef.current;

    if (playBackground) {
      audioWaves.currentTime = 0;
      audioWaves.volume = 0;
      audioWaves.loop = true;
      audioWaves.play();
      fadeInAudio(audioWaves);
    }
  }

  useEffect(() => {
    if (playBackground) {
      audioWaves.currentTime = 0;
      audioWaves.volume = 0;
      audioWaves.loop = true;
      audioWaves.play();
      fadeInAudio(audioWaves);
    } else {
      fadeOutAudio(audioWaves);
    }
  }, [playBackground, audioWaves]);

  useEffect(() => {
    playBreathRef.current = playBreath;
  }, [playBreath]);

  const startAnimation = () => {
    let start = Date.now();
    const animatedClass = `${classes.animation}`;
    document.documentElement.style.setProperty("--breath-time", `${breaths[0].value}s`);

    function playAnimation() {
      const interval = Date.now() - start;
      const currentBreath = stepCountRef.current % breaths.length;
      breathRef.current.innerText = breaths[currentBreath].name;

      const timeLeft = endTime.current - Date.now();
      if (timeLeft <= 0) {
        setStarted(false);
        fadeOutAudio(audioWaves);
        audioCompleted.play();
        cancelAnimationFrame(rafRef.current);
        return;
      }
      timerDisplayRef.current.innerText = formatTime(timeLeft);

      if (!breathRef.current.classList.contains(animatedClass)) {
        breathRef.current.classList.add(animatedClass);
        if (playBreathRef.current === "voice") {
          breaths[currentBreath].audioWord.play();
        } else if (playBreathRef.current === "breath") {
          breaths[currentBreath].audioBreath?.play();
        }
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
                step={0.1}
                setValue={breath.setValue}
              />
            );
          })}
          <TimerControls ref={timerRef} />
          <fieldset className={classes.breathOptions}>
            <legend>Breath Audio</legend>
            <div>
              <input
                type="radio"
                id="voice"
                name="breathAudio"
                value="voice"
                checked={playBreath === "voice"}
                onChange={(e) => setPlayBreath(e.target.value)}
              />
              <label htmlFor="voice">Voice</label>
            </div>
            <div>
              <input
                type="radio"
                id="breath"
                name="breathAudio"
                value="breath"
                checked={playBreath === "breath"}
                onChange={(e) => setPlayBreath(e.target.value)}
              />
              <label htmlFor="breath">Breath</label>
            </div>
            <div>
              <input
                type="radio"
                id="none"
                name="breathAudio"
                value="none"
                checked={playBreath === "none"}
                onChange={(e) => setPlayBreath(e.target.value)}
              />
              <label htmlFor="none">None</label>
            </div>
          </fieldset>
          <div>
            <input
              type="checkbox"
              name="backgroundAudio"
              id="backgroundAudio"
              value={playBackground}
              onChange={(e) => setPlayBackground(e.target.checked)}
            />
            <label htmlFor="backgroundAudio">Background Audio</label>
          </div>
          <button
            className={`${classes.subButton} ${classes.close}`}
            onClick={() => hideControls()}
          >
            CLOSE
          </button>
        </div>
      </main>
    </>
  );
}

export default App;
