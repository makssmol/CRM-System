import "./taskCheckbox.css";

export function TaskCheckbox({
  variant = "finished",
  isComplete,
  onCheck,
  taskIndex,
  title,
}) {
  let defaultChecked = false;
  if (isComplete === true) {
    defaultChecked = true;
  }
  return (
    <input
      className={variant}
      type="checkbox"
      onClick={() => onCheck(taskIndex, title, isComplete)}
      defaultChecked={defaultChecked}
    />
  );
}
