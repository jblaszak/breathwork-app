import React, { useEffect, useRef } from "react";
import Input from "./components/Input";

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
        <div className={classes.breath} ref={breathRef}></div>
      </div>
      <div className={classes.controls} ref={controlsRef}>
        {breathRefs.map((breathRef, i) => {
          return <Input key={`${breathNames[i] + i}`} ref={breathRef} label={breathNames[i]} />;
        })}
      </div>
    </>
  );
}

export default App;
