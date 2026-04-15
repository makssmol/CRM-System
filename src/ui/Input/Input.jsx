import "./Input.css";

export function Input({
  inputVariant,
  title,
  onUserInput,
  isComplete,
  isFocus,
}) {
  let disabled = false;
  if (inputVariant === "tasks-input") {
    disabled = true;
  }

  if (isComplete === true) {
    inputVariant = "completed";
  }

  return (
    <input
      onFocus={(e) => {
        isFocus(true);
        e.preventDefault();
      }}
      onBlur={(e) => {
        isFocus(false);
        e.preventDefault();
      }}
      onChange={(event) => onUserInput?.(event.target.value)}
      disabled={disabled}
      defaultValue={title}
      type="text"
      className={inputVariant}
      placeholder="Task To Be Done..."
      required
      minLength={2}
    />
  );
}
