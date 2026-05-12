import "./Button.css";

export const Button: React.FC<{variant?: string, children: React.ReactNode, isValid: boolean}> = (props) =>  {
  
  const {variant = 'button' , children, isValid = true} = props
  
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
