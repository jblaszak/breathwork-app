import classes from "./Input.module.css";

const Input = ({ label, setValue, onChange, value = 2, min = 0, max = 15, step = 0.1 }) => {
  const increment = () => {
    const newValue = value + step;
    setValue(newValue > max ? max : newValue);
  };

  const decrement = () => {
    const newValue = value - step;
    setValue(newValue < min ? min : newValue);
  };

  return (
    <div className={classes.inputContainer}>
      <label>{label}</label>
      <button onClick={(e) => decrement()}>-</button>
      <input type="number" min={min} max={max} step={step} value={value} onChange={onChange} />
      <button onClick={(e) => increment()}>+</button>
    </div>
  );
};

export default Input;
