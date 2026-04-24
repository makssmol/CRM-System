import "./Input.css";

export function Input({
  inputVariant = "input",
  placeholder,
  type,
  defaultValue,
  onChange,
  disabled = false,
  validationMessage,
}) {
  return (
    <>
      <input
        onChange={onChange}
        disabled={disabled}
        defaultValue={defaultValue}
        type={type}
        className={inputVariant}
        placeholder={placeholder}
        required
      />
        <p className="invalid">{validationMessage}</p>
    </>
  );
}
