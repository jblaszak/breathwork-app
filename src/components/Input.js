import classes from "./Input.module.css";

const Input = ({
  setValue,
  label = "",
  value = 2,
  min = 0,
  max = 15,
  step = 0.1,
  variant = "side",
}) => {
  const increment = () => {
    const newValue = (parseFloat(value) + step).toFixed(step < 1 ? 1 : 0);
    setValue(newValue > max ? max : newValue);
  };

  const decrement = () => {
    const newValue = (parseFloat(value) - step).toFixed(step < 1 ? 1 : 0);
    setValue(newValue < min ? min : newValue);
  };

  const onChange = (e) => {
    const divisor = 1 / step;
    const rounded = Math.round(e.target.value * divisor) / divisor;
    let value = parseFloat(rounded.toFixed(step < 1 ? 1 : 0));
    value = value < e.target.min ? e.target.min : value;
    value = value > e.target.max ? e.target.max : value;
    setValue(value);
  };

  return (
    <div
      className={
        variant === "side"
          ? classes.inputContainer
          : `${classes.inputContainer} ${classes.verticalInputContainer}`
      }
    >
      {label && <label>{label}</label>}
      <button
        onClick={(e) => decrement()}
        className={variant === "side" ? "" : classes.bottomButton}
      >
        -
      </button>
      <input
        className={variant === "side" ? "" : classes.verticalInput}
        type="number"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(e)}
      />
      <button onClick={(e) => increment()} className={variant === "side" ? "" : classes.topButton}>
        +
      </button>
    </div>
  );
};

export default Input;
