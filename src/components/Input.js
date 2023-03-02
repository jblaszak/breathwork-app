import { forwardRef } from "react";
import classes from "./Input.module.css";

const Input = forwardRef(({ label, min = 0, max = 15, step = 0.1, defaultValue = 2 }, ref) => {
  return (
    <div className={classes.inputContainer}>
      <label>{label}</label>
      <input ref={ref} type="number" min={min} max={max} step={step} defaultValue={defaultValue} />
    </div>
  );
});

export default Input;
