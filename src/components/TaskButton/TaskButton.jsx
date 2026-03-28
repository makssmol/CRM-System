import './taskButton.css'
 
export function TaskButton({
  variant = 'create',
  onClick,
  selected,
  children,
 }) {
  return (
    <button  onClick={onClick} className={selected ? variant + ' active' : variant}>{children}</button>
  );
}

