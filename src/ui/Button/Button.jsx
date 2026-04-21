import "./Button.css";

export function Button({ variant = "button", children, isValid = true }) {
  return (
    <button
      type="submit"
      className={!isValid ? variant + " block" : variant}
      disabled={!isValid}
    >
      {children}
    </button>
  );
}
