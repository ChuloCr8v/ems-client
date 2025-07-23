import {
  DashboardOutlined,
  FileOutlined,
  BarChartOutlined,
  CheckSquareOutlined,
  FileSearchOutlined,
  UserOutlined,
  AppstoreOutlined,
  DatabaseOutlined,
  GiftOutlined,
  LaptopOutlined,
  DollarOutlined,
  FileTextOutlined,
  CaretDownFilled,
} from "@ant-design/icons";
import { useState } from "react";
import { Link } from "react-router-dom";
import { twMerge } from "tailwind-merge";

type Props = {};

const menuItems = [
  {
    section: "Overview",
    sectionItems: [
      {
        label: "Dashboard",
        icon: <DashboardOutlined />,
        url: "/dashboard",
      },
    ],
  },

  {
    section: "Performance",
    sectionItems: [
      {
        label: "Tasks",
        icon: <FileOutlined />,
        url: "/performance/tasks",
      },
      {
        label: "Weekly Reports",
        icon: <BarChartOutlined />,
        url: "/performance/weekly-reports",
      },
      {
        label: "PIP",
        icon: <BarChartOutlined />,
        url: "/performance/pip",
      },
      {
        label: "Checklists",
        icon: <CheckSquareOutlined />,
        url: "/performance/checklists",
      },
      {
        label: "Approval Desk",
        icon: <FileSearchOutlined />,
        url: "/performance/approval-desk",
      },
    ],
  },

  {
    section: "Leave Management",
    sectionItems: [
      {
        label: "Leave Request",
        icon: <FileOutlined />,
        url: "/leave/request",
      },
      {
        label: "Approval Desk",
        icon: <FileSearchOutlined />,
        url: "/leave/approval-desk",
      },
    ],
  },

  {
    section: "Employee Management",
    sectionItems: [
      {
        label: "Employees",
        icon: <UserOutlined />,
        url: "/employees",
      },
      {
        label: "Departments",
        icon: <AppstoreOutlined />,
        url: "/departments",
      },
      {
        label: "Levels",
        icon: <DatabaseOutlined />,
        url: "/levels",
      },
      {
        label: "Entitlement",
        icon: <GiftOutlined />,
        url: "/entitlement",
      },
      {
        label: "Assets",
        icon: <LaptopOutlined />,
        url: "/assets",
      },
    ],
  },

  {
    section: "Payroll Management",
    sectionItems: [
      {
        label: "Pay Structure",
        icon: <DollarOutlined />,
        url: "/payroll/pay-structure",
      },
      {
        label: "Payslips",
        icon: <FileTextOutlined />,
        url: "/payroll/payslips",
      },
      {
        label: "Deductions",
        icon: <FileOutlined />,
        url: "/payroll/deductions",
      },
    ],
  },
];

const Sidenav = (_props: Props) => {
  const [openSections, setOpenSections] = useState(["Overview", "Performance"]);

  const handleExpandSection = (section: string) => {
    setOpenSections((prev) =>
      prev.includes(section)
        ? prev.filter((s) => s !== section)
        : [...prev, section]
    );
  };

  return (
    <div className="h-screen w-screen lg:max-w-[264px]">
      <div className="py-8 px-4 w-full h-full flex flex-col gap-6 overflow-y-auto">
        <img src="miroLogo.png" alt="miro ems" className="mb-4 w-[70px]" />

        <div className="space-y-4">
          {menuItems.map((menuItem, index) => (
            <div
              key={index}
              className="border-b last-of-type:border-b-0 border-outline pb-2 text-light_gray"
            >
              <div
                className="flex items-center justify-between mb-2 cursor-pointer"
                onClick={() => handleExpandSection(menuItem.section)}
              >
                <p className="text-xs font-semibold uppercase tracking-wide">
                  {menuItem.section}
                </p>

                <CaretDownFilled
                  className={twMerge(
                    "duration-200",
                    openSections.includes(menuItem.section) && "rotate-180"
                  )}
                />
              </div>

              <div
                className={twMerge(
                  "flex flex-col h-0 overflow-hidden duration-200",
                  openSections.includes(menuItem.section) && "h-fit"
                )}
              >
                {menuItem.sectionItems.map((item, itemIndex) => (
                  <Link
                    key={itemIndex}
                    to={item.url}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray transition-all border-1 border-transparent hover:border-border_primary  hover:bg-primary_light hover:text-primary duration-200"
                  >
                    <span className="text-base">{item.icon}</span>
                    <span>{item.label}</span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidenav;
