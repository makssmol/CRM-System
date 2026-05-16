import "./Input.css";

export const Input: React.FC<{
  inputVariant?: string;
  placeholder?: string;
  type?: string;
  defaultValue?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  validationMessage?: string;
}> = (props) => {
  const {
    inputVariant = "input",
    placeholder,
    type,
    defaultValue,
    onChange,
    disabled = false,
    validationMessage,
  } = props;
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
};
