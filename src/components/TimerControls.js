import Input from "./Input";
import classes from "./TimerControls.module.css";

const TimerControls = ({ label, setValue, value = 2, min = 0, max = 15, step = 0.1 }) => {
  return (
    <>
      <div className={classes.timerContainer}>
        <label>TIMER</label>
        <Input value={1} variant={"vertical"} min={0} max={5} step={1} setValue={null} />
        <Input value={0} variant={"vertical"} min={0} max={9} step={1} setValue={null} />
        <span>:</span>
        <Input value={0} variant={"vertical"} min={0} max={5} step={1} setValue={null} />
        <Input value={0} variant={"vertical"} min={0} max={9} step={1} setValue={null} />
      </div>
    </>
  );
};

export default TimerControls;
