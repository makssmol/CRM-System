import "./Input.css";

export function Input({
  inputVariant = "input",
  placeholder,
  type,
  defaultValue,
  onChange,
  isFocus,
  disabled = false
}) {
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
      onChange={onChange}
      disabled={disabled}
      defaultValue={defaultValue}
      type={type}
      className={inputVariant}
      placeholder={placeholder}
      required
    />
  );
}
