import { Button } from "antd";
import { FiUploadCloud } from "react-icons/fi";
import { twMerge } from "tailwind-merge";
import SummaryCards from "./SummaryCards";
import { type ReactNode } from "react";
import GeneralLayout from "../../views/layout/GeneralLayout";
import { type IconSvgElement } from "@hugeicons/react";
import Icon from "./Icon";
import {
  MailSend02FreeIcons,
  Upload03FreeIcons,
} from "@hugeicons/core-free-icons";
import { colors } from "../../constants/colors";

const DashboardLayout = ({
  children,
  primaryButtonText,
  action,
  primaryButtonIcon,
}: {
  children: ReactNode;
  primaryButtonText: string;
  action: () => void;
  primaryButtonIcon: IconSvgElement;
}) => {
  return (
    <GeneralLayout
      breadCrumbs={{
        back: {
          url: "/dashboard",
          title: "Dashboard",
        },
        current: "Employees",
      }}
    >
      <div className="space-y-4 relative">
        <div className="space-y-4 sticky top-20 bg-white z-10">
          <div className="flex items-center pt-2 justify-between gap-4 relative">
            <div className="absolute z-10 top-0 left-0 h-[200%] w-full bg-white -mt-20"></div>

            <div className="relative z-20">
              <h2 className="font-semibold text-xl">Employees</h2>
              <p className="text-gray mt-1 text-sm">
                View, manage, and track all employees across the organization.
              </p>
            </div>

            <div className="space-x-4 relative z-20">
              <Button
                size="large"
                icon={
                  <Icon
                    icon={Upload03FreeIcons}
                    color={colors.primary}
                    size={16}
                  />
                }
                className={twMerge("!border-primary !text-primary")}
              >
                <span className="!text-sm text-primary">Generate Report</span>
              </Button>

              <Button
                size="large"
                type="primary"
                icon={<Icon icon={primaryButtonIcon} size={16} />}
                onClick={action}
              >
                <span className="!text-sm">{primaryButtonText}</span>
              </Button>
            </div>
          </div>
          <SummaryCards />
        </div>

        <div className="overflow-auto relative -z-0">{children}</div>
      </div>
    </GeneralLayout>
  );
};

export default DashboardLayout;
