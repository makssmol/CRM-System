import "./Button.css";

export const Button: React.FC<{
  variant?: string;
  children: React.ReactNode;
  disabled?: boolean;
  onClick?: (() => void) | ((e: React.MouseEvent<HTMLButtonElement>) => void);
}> = (props) => {
  const { variant = "button", children, disabled = true, onClick } = props;

  return (
    <button
      type="submit"
      className={!disabled ? variant + " block" : variant}
      disabled={!disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
