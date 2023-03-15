import classes from "./Input.module.css";

const Input = ({ label, setValue, value = 2, min = 0, max = 15, step = 0.1 }) => {
  const increment = () => {
    const newValue = (parseFloat(value) + step).toFixed(1);
    setValue(newValue > max ? max : newValue);
  };

  const decrement = () => {
    const newValue = (parseFloat(value) - step).toFixed(1);
    setValue(newValue < min ? min : newValue);
  };

  const onChange = (e) => {
    const rounded = Math.round(e.target.value * 10) / 10;
    let value = parseFloat(rounded.toFixed(1));
    value = value < e.target.min ? e.target.min : value;
    value = value > e.target.max ? e.target.max : value;
    setValue(value);
  };

  return (
    <div className={classes.inputContainer}>
      <label>{label}</label>
      <button onClick={(e) => decrement()}>-</button>
      <input
        type="number"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(e)}
      />
      <button onClick={(e) => increment()}>+</button>
    </div>
  );
};

export default Input;
