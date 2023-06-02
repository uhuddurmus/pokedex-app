import React, { useContext } from "react";
import { LayoutAppBar } from "./LayoutAppBar";
import { ThemeContext } from "../App";

export const Layout: React.FC<any> = ({ children }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={theme ? "bg-secondary h-100 " : "h-100 "}>
      <LayoutAppBar />
      <div
        style={{ height: "calc(100% - 50px)" }}
        className={
          theme
            ? "bg-secondary h-100 d-flex justify-content-center"
            : "h-100 d-flex justify-content-center"
        }
      >
        <div className="w-75 h-100">{children}</div>
      </div>

    </div>
  );
};
