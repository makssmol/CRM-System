import "./Input.css";

export const Input: React.FC<{
  inputVariant?: string;
  placeholder?: string;
  type?: string;
  defaultValue?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  errorMessage?: string;
}> = (props) => {
  const {
    inputVariant = "input",
    placeholder,
    type,
    defaultValue,
    onChange,
    disabled = false,
    errorMessage,
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
      <p className="invalid">{errorMessage}</p>
    </>
  );
};
