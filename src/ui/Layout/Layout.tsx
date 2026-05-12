import type React from "react";
import "./Layout.css";

export const Layout: React.FC<{children: React.ReactNode}> = (props) =>  {
  return <main className="layout">{props.children}</main>;
}
