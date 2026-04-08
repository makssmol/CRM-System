import "./taskButton.css";

export function TaskButton({
  variant = "create",
  type = "button",
  onConfirm,
  selected,
  children,
  taskIndex,
  taskBody,
}) {
  return (
    <button
      type={type}
      onClick={() => onConfirm && onConfirm(taskIndex, taskBody)}
      className={selected ? variant + " active" : variant}
    >
      {children}
    </button>
  );
}
