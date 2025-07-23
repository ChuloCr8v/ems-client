import {
  HomeIcon,
  UserBlockIconFreeIcons,
  UserCheck01FreeIcons,
  UserQuestion01FreeIcons,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { twMerge } from "tailwind-merge";

type Props = {};

const SummaryCards = (props: Props) => {
  const data = [
    {
      icon: HomeIcon,
      title: "Total",
      value: 200,
    },
    {
      icon: UserQuestion01FreeIcons,
      title: "Invitations Sent",
      value: 200,
    },
    {
      icon: UserCheck01FreeIcons,
      title: "Active",
      value: 200,
    },
    {
      icon: UserBlockIconFreeIcons,
      title: "Inctive",
      value: 200,
    },
  ];

  const getIconColor = (title: string) => {
    switch (title) {
      case "Total":
        return "text-primary bg-primary/20";
      case "Invitations Sent":
        return "text-yellow-600 bg-yellow-50";
      case "Active":
        return "text-green bg-green/10";
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
