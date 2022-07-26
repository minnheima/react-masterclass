import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { hourSelector, minuteState } from "./atom";

function App() {
  const [minutes, setMinutes] = useRecoilState(minuteState);
  const hours = useRecoilValue(hourSelector);

  const onMinutesChange = (e: React.FormEvent<HTMLInputElement>) => {
    setMinutes(+e.currentTarget.value);
    // + if you add plus(+), string value is converted to number / ex) "1"->1
  };

  return (
    <>
      <input value={minutes} onChange={onMinutesChange} type="number" placeholder="minutes" />
      <input value={hours} type="number" placeholder="hours" />
    </>
  );
}

export default App;
