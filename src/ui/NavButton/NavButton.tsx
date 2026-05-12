import type React from "react";
import "./NavButton.css";

export const NavButton: React.FC<{
  variant: string;
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
}> = (props) => {
  const { variant = "tab_button", selected, onClick, children } = props;
  return (
    <li className={selected ? variant + " active" : variant} onClick={onClick}>
      {children}
    </li>
  );
};
