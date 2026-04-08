import "./taskForm.css";

export function TaskForm({ variant, children, onSub, taskObject, taskIndex }) {
  return (
    <form
      action="#"
      method="#"
      className={variant}
      onSubmit={(e) => {
        e.preventDefault();
        onSub && onSub(taskIndex, taskObject);
      }}
    >
      {children}
    </form>
  );
}
