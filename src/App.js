import React, { useEffect, useRef, useState } from "react";
import Input from "./components/Input";
import TimerControls from "./components/TimerControls";
import useBreaths from "./hooks/useBreaths";
import useLocalStorage from "./hooks/useLocalStorage";

import { fadeInAudio, fadeOutAudio } from "./helpers/audio";
import { formatTime } from "./helpers/time";

import cloud from "./assets/cloud.svg";
import sitting from "./assets/sitting.svg";
import completed from "./assets/completed2.mp3";
import waves from "./assets/waves.MP3";

import classes from "./App.module.css";

function App() {
  const breaths = useBreaths();

  const controlsRef = useRef();
  const rafRef = useRef(0);
  const breathRef = useRef();
  const stepCountRef = useRef(0);
  const timerDisplayRef = useRef("");
  const [timer, setTimer] = useLocalStorage("timer", 60 * 1000 * 10);
  const timerRef = useRef(timer);
  const endTime = useRef(Date.now() + timer);

  const [audioWaves] = useState(new Audio(waves));
  const [audioCompleted] = useState(new Audio(completed));

  const [started, setStarted] = useState(false);
  const [playBackground, setPlayBackground] = useLocalStorage("playBackground", false);
  const [playBreath, setPlayBreath] = useLocalStorage("playBreath", "none");
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

      if (interval > (breaths[currentBreath].value - 0.0166) * 1000) {
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
  }, [started]); // eslint-disable-line

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
          <div className={classes.cloudContainer} focusable={false} aria-hidden={true}>
            <img src={cloud} alt="" aria-hidden={true} />
            <img src={cloud} alt="" aria-hidden={true} />
            <img src={cloud} alt="" aria-hidden={true} />
          </div>
          <img
            className={classes.meditating}
            src={sitting}
            alt=""
            focusable={false}
            aria-hidden={true}
          />
          <div className={classes.instructions}>
            {started && (
              <>
                <span className={classes.breath} ref={breathRef} aria-live="off"></span>
                <p
                  className={classes.timer}
                  ref={timerDisplayRef}
                  role="timer"
                  aria-live="polite"
                ></p>
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
            <button
              className={classes.subButton}
              aria-label="Open Settings"
              onClick={() => showControls()}
            >
              SETTINGS
            </button>
          </div>
        </div>
        <div
          className={classes.settings}
          ref={controlsRef}
          focusable={false}
          onClick={(e) => {
            if (e.target.tagName === "DIV") hideControls();
          }}
        >
          {breaths.map((breath, i) => {
            return (
              <Input
                key={`${breath.name + i}`}
                label={breath.name}
                ariaText={`${breath.name} duration`}
                value={breath.value}
                step={0.1}
                setValue={breath.setValue}
              />
            );
          })}
          <TimerControls ref={timerRef} setTimer={setTimer} />
          <fieldset className={classes.audioOptions}>
            <legend>AUDIO</legend>
            <div className={classes.breathAudio}>
              <input
                type="radio"
                id="voice"
                aria-label="Play voice guide sounds"
                name="breathAudio"
                value="voice"
                checked={playBreath === "voice"}
                onChange={(e) => setPlayBreath(e.target.value)}
              />
              <label htmlFor="voice">VOICE</label>
            </div>
            <div className={classes.breathAudio}>
              <input
                type="radio"
                id="breath"
                aria-label="Play breathing sounds"
                name="breathAudio"
                value="breath"
                checked={playBreath === "breath"}
                onChange={(e) => setPlayBreath(e.target.value)}
              />
              <label htmlFor="breath">BREATH</label>
            </div>
            <div className={classes.breathAudio}>
              <input
                type="radio"
                id="none"
                aria-label="Do not play breath audio"
                name="breathAudio"
                value="none"
                checked={playBreath === "none"}
                onChange={(e) => setPlayBreath(e.target.value)}
              />
              <label htmlFor="none">NONE</label>
            </div>
            <div className={classes.backgroundAudio}>
              <input
                type="checkbox"
                aria-label="Enable background audio"
                name="backgroundAudio"
                id="backgroundAudio"
                value={playBackground}
                checked={playBackground}
                onChange={(e) => setPlayBackground(e.target.checked)}
              />
              <label htmlFor="backgroundAudio">BACKGROUND AUDIO</label>
            </div>
          </fieldset>
          <button
            className={`${classes.subButton} ${classes.close}`}
            onClick={() => hideControls()}
            aria-label="close settings"
          >
            CLOSE
          </button>
        </div>
      </main>
    </>
  );
}

export default App;
