import {
  HomeIcon,
  UserBlockIconFreeIcons,
  UserCheck01FreeIcons,
  UserQuestion01FreeIcons,
  UserWarning02FreeIcons,
  User03Icon,
  UserBlock01FreeIcons,
  UserListFreeIcons,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { twMerge } from "tailwind-merge";
type SummaryCardType = "employees" | "assets";

interface SummaryCardsProps {
  type: SummaryCardType;
  counts: {
    total: number;
    secondary?: number;
    active?: number;
    inactive?: number;
    available?: number;
    assigned?: number;
    faulty?: number;
  };
}

const SummaryCards = ({ type, counts = {} as SummaryCardsProps["counts"] }: SummaryCardsProps) => {
  const employeeData = [
    {
      icon: HomeIcon,
      title: "Total",
      value: counts.total ?? 0,
    },
    {
      icon: UserQuestion01FreeIcons,
      title: "Invitations Sent",
      value: counts.secondary ?? 0,
    },
    {
      icon: UserCheck01FreeIcons,
      title: "Active",
      value: counts.active || 0,
    },
    {
      icon: UserBlockIconFreeIcons,
      title: "Inactive",
      value: counts.inactive || 0,
    },
  ];

  const assetData = [
    {
      icon: UserListFreeIcons,
      title: "Total",
      value: counts.total ?? 0,
    },
    {
      icon:UserCheck01FreeIcons ,
      title: "Available",
     value: counts.available ?? counts.secondary ?? 0,
    },
    {
      icon: UserQuestion01FreeIcons,
      title: "Assigned",
      value: counts.assigned ?? 0,
    },
    {
      icon: UserBlock01FreeIcons,
      title: "Faulty",
      value: counts.faulty ?? 0,
    },
  ];

  const data = type === "employees" ? employeeData : assetData;

  const getIconColor = (title: string) => {
    switch (title) {
      case "Total":
        return "text-primary bg-primary/20";
      case "Invitations Sent":
        return "text-yellow-600 bg-yellow-50";
      case "Active":
      case "Available":
        return "text-green bg-green/10";
      case "Assigned":
        return "text-[#EDC024] bg-[#FDF9E9]";
      case "Faulty":
        return "text-red-600 bg-red-50";
      default:
        return "bg-gray-200 text-gray";
    }
  };

  return (
    <div className="flex items-center gap-4 border border-outline rounded-lg py-3 pl-6">
      {data.map((d, idx) => (
        <div
          key={idx}
          className="flex items-center gap-4 border-r last-of-type:border-none border-outline w-full"
        >
          <div
            className={twMerge(
              `text-2xl rounded-full p-3 ${getIconColor(d.title)}`
            )}
          >
            <HugeiconsIcon icon={d.icon} size={24} strokeWidth={1.5} />
          </div>
          <div>
            <div className="text-sm text-gray-500">{d.title}</div>
            <div className="text-xl font-semibold">{d.value}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SummaryCards;