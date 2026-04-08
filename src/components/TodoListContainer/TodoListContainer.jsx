import "./todoListContainer.css";

export function TodoListContainer({ variant, children }) {
  return <div className={variant}>{children}</div>;
}
