import "./NavButton.css";

export function NavButton({
  variant = "tab_button",
  selected,
  onClick,
  children,
}) {
  return (
    <li className={selected ? variant + " active" : variant} onClick={onClick}>
      {children}
    </li>
  );
}
