import { ArrowDown01Icon, Upload03FreeIcons } from "@hugeicons/core-free-icons";
import { type IconSvgElement } from "@hugeicons/react";
import { Button, Dropdown, type MenuProps } from "antd";
import { twMerge } from "tailwind-merge";
import { colors } from "../../constants/colors";
import GeneralLayout from "../../views/layout/GeneralLayout";
import Icon from "./Icon";
import SummaryCards from "./SummaryCards";
import type { Dispatch, ReactNode, SetStateAction } from "react";
import CustomSegmented from "../global/CustomSegment";

interface DashboardLayoutProps {
  children: ReactNode;
  primaryButtonText: string;
  action?: () => void;
  primaryButtonIcon: IconSvgElement;
  primaryButtonType?: "BUTTON" | "DROPDOWN";
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
  segmentOptions?: string[];
  setCurrentList?: Dispatch<SetStateAction<string>>;
  primaryButtonListItems?: MenuProps["items"];
}

const DashboardLayout = ({
  children,
  primaryButtonText,
  action,
  primaryButtonIcon,
  primaryButtonListItems,
  pageTitle,
  pageDescription,
  summaryType,
  summaryCounts, // Provide default empty object
  showReportButton = true,
  showActionButtons = true,
  showSummaryCard = true,
  segmentOptions,
  setCurrentList,
  primaryButtonType = "BUTTON",
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
      <div className="relative">
        <div className="space-y-4 sticky md:top-16 bg-white z-10 pb-4">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row items-start md:items-center pt-2 md:justify-between gap-4 relative">
            <div className="absolute z-10 top-0 left-0 md:h-[200%] w-full bg-white -mt-20"></div>

            <div className="relative z-20">
              <h2 className="font-semibold text-xl">{pageTitle}</h2>
              <p className="text-gray mt-1 text-sm">{pageDescription}</p>
            </div>

            {showActionButtons && (
              <div className="grid grid-cols-2 md:flex space-x-2 relative z-20 w-full md:w-fit">
                {showReportButton && (
                  <Button
                    size="large"
                    icon={
                      <Icon
                        icon={Upload03FreeIcons}
                        color={colors.primary}
                        size={16}
                        thickness={2.5}
                      />
                    }
                    className={twMerge("!border-primary !text-primary")}
                  >
                    <span className="!text-base text-primary  font-semibold">
                      Generate Report
                    </span>
                  </Button>
                )}

                {primaryButtonType === "BUTTON" ? (
                  <Button
                    size="large"
                    type="primary"
                    icon={
                      <Icon
                        icon={primaryButtonIcon}
                        size={16}
                        thickness={2.5}
                        color=""
                      />
                    }
                    onClick={action}
                  >
                    <span className="!text-base !font-semibold">
                      {primaryButtonText}
                    </span>
                  </Button>
                ) : (
                  <Dropdown menu={{ items: primaryButtonListItems }}>
                    <Button
                      size="large"
                      type="primary"
                      className="p-2"
                      icon={
                        <div>
                          <Icon icon={ArrowDown01Icon} size={24} color="" />
                        </div>
                      }
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                    >
                      {primaryButtonText}
                    </Button>
                  </Dropdown>
                )}
              </div>
            )}
          </div>

          {segmentOptions && (
            <CustomSegmented
              options={segmentOptions ?? []}
              setOption={(value) => setCurrentList?.(value)}
            />
          )}

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
