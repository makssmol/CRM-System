import "./validationInfo.css";

export function ValidationInfo({ variant = "valid-input", children }) {
  return <p className={variant}>{children}</p>;
}
