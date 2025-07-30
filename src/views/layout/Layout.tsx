import type { ReactNode } from "react";
import Sidenav from "./Sidenav";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="h-screen w-screen bg-background">
      <div className="flex items-start h-full w-full">
        <Sidenav />

        <div className="py-8 pr-5 h-full w-full">
          <div className="h-full w-full px-6 shadow-[4px_4px_32px_0px_#131C2014] rounded-xl bg-white overflow-auto relative">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
