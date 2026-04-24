import "./IconButton.css";

export function IconButton({
  children,
  onClick,
  type,
  variant = "primary" | "secoundary" | "danger",
  isValid = true,
}) {
  return (
    <button
      className={!isValid ? "icon_button " + "block" : "icon_button " + variant}
      type={type}
      onClick={onClick}
      disabled={!isValid}
    >
      {children}
    </button>
  );
}
