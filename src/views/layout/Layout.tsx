import { useState, type ReactNode } from "react";
import Sidenav from "./Sidenav";
import Icon from "../../component/common/Icon";
import { MenuIcon } from "@hugeicons/core-free-icons";
import { Button } from "antd";

const Layout = ({ children }: { children: ReactNode }) => {
  const [showSideNav, setShowSideNav] = useState(false);
  return (
    <div className="h-screen w-screen bg-background">
      <div className="flex justify-between items-center p-4 pt-8 relative z-50 xl:w-fit">
        <img src="miroLogo.png" alt="miro ems" className="w-[70px]" />

        <Button
          className="border-gray-200 !p-1 w-fit xl:!hidden"
          onClick={() => setShowSideNav(!showSideNav)}
        >
          <Icon icon={MenuIcon} size={26} color={"gray"} />
        </Button>
      </div>

      <div className="xl:grid grid-cols-5 items-start h-full w-full xl:-mt-20">
        <div className="flex items-center relative">
          <Sidenav showSideNav={showSideNav} setShowSideNav={setShowSideNav} />
        </div>

        <div className="xl:py-8 xl:pr-5 md:px-4 h-full w-full lg:col-span-4">
          <div className="h-full w-full px-6 shadow-[4px_4px_32px_0px_#131C2014] rounded-xl bg-white overflow-auto relative max-h-[90vh]">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
