import type React from "react";
import "./IconButton.css";

export const IconButton: React.FC<{
  children: React.ReactNode;
  onClick?: (() => void) | ((e: React.MouseEvent<HTMLButtonElement>) => void);
  type: "submit" | "reset" | "button" | undefined;
  variant: "primary" | "secoundary" | "danger";
  isValid?: boolean;
}> = (props) => {
  const {
    children,
    onClick,
    type,
    variant,
    isValid = true,
  } = props;

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
};
