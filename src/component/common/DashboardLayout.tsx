import { Upload03FreeIcons } from "@hugeicons/core-free-icons";
import { type IconSvgElement } from "@hugeicons/react";
import { Button } from "antd";
import { twMerge } from "tailwind-merge";
import { colors } from "../../constants/colors";
import GeneralLayout from "../../views/layout/GeneralLayout";
import Icon from "./Icon";
import SummaryCards from "./SummaryCards";
import type { ReactNode } from "react";

interface DashboardLayoutProps {
  children: ReactNode;
  primaryButtonText: string;
  action: () => void;
  primaryButtonIcon: IconSvgElement;
  pageTitle: string;
  pageDescription: string;
  summaryType: "employees" | "assets";
  showActionButtons?: boolean;
  showSummaryCard?: boolean;
  summaryCounts: {
    total: number;
    secondary: number;
    active?: number;
    inactive?: number;
    available?: number;
    assigned?: number;
    faulty?: number; // assets only
  };
  showReportButton?: boolean;
}

const DashboardLayout = ({
  children,
  primaryButtonText,
  action,
  primaryButtonIcon,
  pageTitle,
  pageDescription,
  summaryType,
  summaryCounts, // Provide default empty object
  showReportButton = true,
  showActionButtons = true,
  showSummaryCard = true,
}: DashboardLayoutProps) => {
  // Create safe counts with default values
  const safeSummaryCounts = {
    total: summaryCounts.total,
    secondary: summaryCounts.secondary,
    active: summaryCounts.active ?? 0,
    inactive: summaryCounts.inactive ?? 0,
    available: summaryCounts.available ?? 0,
    assigned: summaryCounts.assigned ?? 0,
    faulty: summaryCounts.faulty ?? 0,
  };

  return (
    <GeneralLayout
      breadCrumbs={{
        back: {
          url: "/dashboard",
          title: "Dashboard",
        },
        current: pageTitle,
      }}
    >
      <div className="space-y-4 relative ">
        <div className="space-y-4 sticky top-20 bg-white z-10 pb-4">
          {/* Header Section */}
          <div className="flex items-center pt-2 justify-between gap-4 relative">
            <div className="absolute z-10 top-0 left-0 h-[200%] w-full bg-white -mt-20"></div>

            <div className="relative z-20">
              <h2 className="font-semibold text-xl">{pageTitle}</h2>
              <p className="text-gray mt-1 text-sm">{pageDescription}</p>
            </div>

            {showActionButtons && (
              <div className="space-x-4 relative z-20">
                {showReportButton && (
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
                    <span className="!text-sm text-primary">
                      Generate Report
                    </span>
                  </Button>
                )}

                <Button
                  size="large"
                  type="primary"
                  icon={<Icon icon={primaryButtonIcon} size={16} />}
                  onClick={action}
                >
                  <span className="!text-sm">{primaryButtonText}</span>
                </Button>
              </div>
            )}
          </div>

          {/* Summary Cards */}
          {showSummaryCard && (
            <SummaryCards type={summaryType} counts={safeSummaryCounts} />
          )}
        </div>

        {/* Page Content */}
        <div className="overflow-auto relative -z-0">{children}</div>
      </div>
    </GeneralLayout>
  );
};

DashboardLayout.defaultProps = {
  showReportButton: true,
};

export default DashboardLayout;
