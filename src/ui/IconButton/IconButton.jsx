import "./IconButton.css";

export function IconButton({
  children,
  onClick,
  type,
  variant= "primary" | "secoundary" | "danger",
}) {
  return (
    <button className={"icon_button " + variant} type={type} onClick={onClick}>
      {children}
    </button>
  );
}
