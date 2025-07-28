import { Breadcrumb } from "antd";
import { useEffect, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { useListDepartmentsQuery } from "../../api/data/departments.api";
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

  const { data: departments } = useListDepartmentsQuery();

  useEffect(() => {
    console.log(departments);
  }, []);

  return (
    <div className="max-h-full relative">
      <div className="flex items-center justify-between border-b border-outline py-4 bg-white sticky top-0 z-20">
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

      <div className="">{children}</div>
    </div>
  );
};

export default GeneralLayout;
