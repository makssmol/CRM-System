import type React from "react";
import "./IconButton.css";

export const IconButton: React.FC<{
  children: React.ReactNode;
  onClick?: (() => void) | ((e: React.MouseEvent<HTMLButtonElement>) => void);
  type?: "submit" | "reset" | "button";
  variant?: "primary" | "secoundary" | "danger";
  disabled?: boolean;
}> = (props) => {
  const {
    children,
    onClick,
    type = "button",
    variant = "primary",
    disabled = true,
  } = props;

  return (
    <button
      className={!disabled ? "icon_button " + "block" : "icon_button " + variant}
      type={type}
      onClick={onClick}
      disabled={!disabled}
    >
      {children}
    </button>
  );
};
