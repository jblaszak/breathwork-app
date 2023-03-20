import { useState } from "react";
import useLocalStorage from "./useLocalStorage";
import inhale from "../assets/inhale.mp3";
import exhale from "../assets/exhale.mp3";
import hold from "../assets/hold.mp3";
import inhaleBreath from "../assets/inhale2.MP3";
import exhaleBreath from "../assets/exhale2.MP3";

export default function useBreaths() {
  const [breath1, setBreath1] = useLocalStorage("inhale", 4.0);
  const [breath2, setBreath2] = useLocalStorage("hold", 4.0);
  const [breath3, setBreath3] = useLocalStorage("exhale", 4.0);
  const [breath4, setBreath4] = useLocalStorage("hold2", 4.0);

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
