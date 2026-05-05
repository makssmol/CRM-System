import "./Checkbox.css";
import { useState } from "react";
import { TickIcon } from "../../assets/icons/";

export function Checkbox({ checked = false, onClick, label }) {
  const [isChecked, setIsChecked] = useState(checked);
  return (
    <label className={`label ${isChecked ? "label--active" : ""}`}>
      <input
        type="checkbox"
        defaultChecked={isChecked}
        onClick={onClick}
        onChange={() => setIsChecked(!isChecked)}
      />
      <TickIcon isChecked={isChecked} />
      {label}
    </label>
  );
}
