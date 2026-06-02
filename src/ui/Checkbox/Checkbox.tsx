import "./Checkbox.css";
import { useState } from "react";
import { TickIcon } from "../../assets/icons";

export const Checkbox: React.FC<{ checked: boolean; onClick: () => void; label: string | boolean }> = (
  props
) => {
  const { checked = false, onClick, label } = props;

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
};
