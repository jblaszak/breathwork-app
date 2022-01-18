import { useRef } from "react";

import Input from "./Input";
import classes from "./Form.module.css";

const Form = ({ timerHandler, isLeft, setIsLeft }) => {
  const inhaleRef = useRef();
  const holdRef = useRef();
  const exhaleRef = useRef();
  const hold2Ref = useRef();

  const submitHandler = (e) => {
    e.preventDefault();
    timerHandler(
      inhaleRef.current.value,
      holdRef.current.value,
      exhaleRef.current.value,
      hold2Ref.current.value
    );
  };

  return (
    <form className={classes.formContainer} onSubmit={submitHandler}>
      <Input label="Inhale" inputRef={inhaleRef} defaultValue={4} />
      <Input label="Hold" inputRef={holdRef} defaultValue={4} />
      <Input label="Exhale" inputRef={exhaleRef} defaultValue={4} />
      <Input label="Hold 2" inputRef={hold2Ref} defaultValue={4} />
      <button className={classes.button}>Submit</button>
      <button className={classes.button} onClick={() => setIsLeft(!isLeft)}>
        {isLeft ? "Text Right Side" : "Text Left Side"}
      </button>
    </form>
  );
};

export default Form;
