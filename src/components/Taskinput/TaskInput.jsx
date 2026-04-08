import "./taskInput.css";

export function TaskInput({ inputVariant, title, onUserInput, isComplete }) {
  let disabled = false;
  if (inputVariant === "tasks-input") {
    disabled = true;
  }

  if (isComplete === true) {
    inputVariant = "completed";
  }

  return (
    <input
      onChange={(event) => onUserInput && onUserInput(event.target.value)}
      disabled={disabled}
      defaultValue={title}
      type="text"
      className={inputVariant}
      placeholder="Task To Be Done..."
      required
      maxLength={64}
      minLength={2}
    />
  );
}
