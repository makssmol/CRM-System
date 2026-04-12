import "./taskButton.css";

export function TaskButton({
  variant = "create",
  type = "button",
  onConfirm,
  selected,
  children,
  taskIndex,
  taskBody,
  isValid = true,
}) {
  if(!isValid){
    variant += " block"
  }
  return (
    <button
      type={type}
      onClick={() => onConfirm?.(taskIndex, taskBody)}
      className={selected ? variant + " active" : variant}
      disabled={!isValid}
    >
      {children}
    </button>
  );
}
