import "./Container.css";

export function Container({ variant, children }) {
  return <div className={variant}>{children}</div>;
}
