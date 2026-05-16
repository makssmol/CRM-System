import "./Button.css";

export const Button: React.FC<{variant?: string, children: React.ReactNode, disabled?: boolean}> = (props) =>  {
  
  const {variant = 'button' , children, disabled = true} = props
  
  return (
    <button
      type="submit"
      className={!disabled ? variant + " block" : variant}
      disabled={!disabled}
    >
      {children}
    </button>
  );
}
