import "./taskForm.css";

export function TaskForm({ variant, children, onSub, taskObject, taskIndex }) {
  return (
    <form
      className={variant}
      onSubmit={(e) => {
        e.preventDefault();
        onSub?.(taskIndex, taskObject);
      }}
    >
      {children}
    </form>
  );
}
