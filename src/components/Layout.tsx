import { ReactNode } from "react";
import Nav from "./nav/Nav";
export const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Nav />
      {children}
    </>
  );
};
