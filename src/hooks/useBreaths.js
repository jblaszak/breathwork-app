import { useState } from "react";
import inhale from "../assets/inhale.mp3";
import exhale from "../assets/exhale.mp3";
import hold from "../assets/hold.mp3";
import inhaleBreath from "../assets/inhale2.mp3";
import exhaleBreath from "../assets/exhale2.mp3";

export default function useBreaths() {
  const defaultBreathLength = (4).toFixed(1);
  const [breath1, setBreath1] = useState(defaultBreathLength);
  const [breath2, setBreath2] = useState(defaultBreathLength);
  const [breath3, setBreath3] = useState(defaultBreathLength);
  const [breath4, setBreath4] = useState(defaultBreathLength);

  const [audioInhale] = useState(new Audio(inhale));
  const [audioHold] = useState(new Audio(hold));
  const [audioExhale] = useState(new Audio(exhale));
  const [audioInhaleBreath] = useState(new Audio(inhaleBreath));
  const [audioExhaleBreath] = useState(new Audio(exhaleBreath));

  const breaths = [
    {
      name: "INHALE",
      value: breath1,
      setValue: setBreath1,
      audioWord: audioInhale,
      audioBreath: audioInhaleBreath,
    },
    {
      name: "HOLD",
      value: breath2,
      setValue: setBreath2,
      audioWord: audioHold,
      audioBreath: null,
    },
    {
      name: "EXHALE",
      value: breath3,
      setValue: setBreath3,
      audioWord: audioExhale,
      audioBreath: audioExhaleBreath,
    },
    {
      name: "HOLD",
      value: breath4,
      setValue: setBreath4,
      audioWord: audioHold,
      audioBreath: null,
    },
  ];

  return breaths;
}
