import classes from "./taskLayout.module.css";

export function TaskLayout({ children }) {
  return <main className={classes.layout}>{children}</main>;
}
