import React, { useContext } from "react";
import { LayoutAppBar } from "./LayoutAppBar";
import { ThemeContext } from "../App";

export const Layout: React.FC<any> = ({ children }) => {
  const { theme } = useContext(ThemeContext);

  const year = new Date().getFullYear(); // returns the current year

  return (
    <div className={theme ? "bg-secondary h-100 " : "d-flex "} style={{minHeight:'100vh !important', display:'flex',flexDirection:'column'}}>
      <div>
        <LayoutAppBar />
      </div>
      <div className="d-flex container justify-content-center">
        <div className="h-100">{children}</div>
      </div>

    </div>
  );
};
