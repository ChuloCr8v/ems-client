import { Breadcrumb } from "antd";
import { type ReactNode } from "react";
import { Link } from "react-router-dom";
import ProfileDropdown from "../../component/ProfileDropdown";

type Props = {
  children: ReactNode;
  breadCrumbs: {
    back: {
      url: string;
      title: string;
    };
    current: string;
  };
};

const GeneralLayout = ({ children, breadCrumbs }: Props) => {
  const { back, current } = breadCrumbs;

  return (
    <div>
      <div className="flex items-center justify-between">
        <Breadcrumb
          items={[
            {
              title: <Link to={back.url}>{back.title}</Link>,
            },
            {
              title: <p className="text-green">{current}</p>,
            },
          ]}
        />

        <ProfileDropdown />
      </div>

      <div className="border-b border-outline pb-4">{children}</div>
    </div>
  );
};

export default GeneralLayout;
