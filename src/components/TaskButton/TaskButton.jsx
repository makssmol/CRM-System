import './taskButton.css'
 
export function TaskButton({
  variant = 'create',
  onConfirm,
  selected,
  children,
  taskObject
 }) {
  // console.log(taskObject)
  return (
    <button  onClick={()=> onConfirm(taskObject)} className={selected ? variant + ' active' : variant}>{children}</button>
  );
}

