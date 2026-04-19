import "./Checkbox.css";
import { useState } from "react";
import { TickIcon } from "../../assets/icons/";

export function Checkbox({checked = false, onClick}) {
  const [isChecked, setIsChecked] = useState(checked)
  return (
    <label>
      <input type="checkbox" defaultChecked={isChecked} onClick={onClick} onChange={() => setIsChecked(!isChecked)}/>
      <TickIcon isChecked={isChecked}/>
    </label>
  );
}
