import classes from "./Input.module.css";

const Input = ({ label, inputRef, defaultValue, value }) => {
  return (
    <div className={classes.inputContainer}>
      <label>{label}</label>
      <input
        ref={inputRef}
        type="number"
        min="0"
        max="15"
        step="0.1"
        defaultValue={defaultValue}
        value={value}
      />
    </div>
  );
};

export default Input;
