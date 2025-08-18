import { Tag } from "antd";
import {
  InformationCircleIcon,
  Briefcase02Icon,
  CheckmarkCircle02Icon,
  CancelCircleFreeIcons,
  Loading01Icon,
  CircleArrowDiagonal02FreeIcons,
  UserCheck01FreeIcons,
  CheckmarkCircle01Icon,
  CheckmarkCircle03Icon,
  LaptopIssueIcon,
  Settings01FreeIcons,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { AssetStatus, EmployeeStatus } from "../../api/types"; // adjust this path as needed
type StatusTagProps = {
  status: string;
};

const StatusTag = ({ status }: StatusTagProps) => {
  const isEmployeeStatus = Object.values(EmployeeStatus).includes(
    status as EmployeeStatus
  );

  const property = () => {
    if (isEmployeeStatus) {
      switch (status) {
        case EmployeeStatus.PENDING:
        case EmployeeStatus.PENDING_INVITE:
        case EmployeeStatus.PENDING_REVIEW:
          return { icon: Loading01Icon, color: "orange" };
        case EmployeeStatus.REJECTED:
        case EmployeeStatus.INACTIVE:
          return { icon: CancelCircleFreeIcons, color: "red" };
        case EmployeeStatus.ACTIVE:
        case AssetStatus.ACCEPTED:
          return { icon: CheckmarkCircle02Icon, color: "green" };
        case EmployeeStatus.ON_LEAVE:
          return { icon: Briefcase02Icon, color: "blue" };
        default:
          return { icon: InformationCircleIcon, color: "gray" };
      }
    } else {
      switch (status) {
        case AssetStatus.AVAILABLE:
          return { icon: CheckmarkCircle03Icon, color: "purple" };
        case AssetStatus.MAINTENANCE:
          return { icon: Settings01FreeIcons, color: "orange" };
        case AssetStatus.ACCEPTED:
          return { icon: UserCheck01FreeIcons, color: "green" };
        case AssetStatus.ASSIGNED:
          return { icon: CheckmarkCircle01Icon, color: "green" };
        case AssetStatus.FAULTY:
          return { icon: LaptopIssueIcon, color: "red" };
        case AssetStatus.MAINTENANCE:
          return { icon: Loading01Icon, color: "gray" };
        case AssetStatus.RETIRED:
          return { icon: CircleArrowDiagonal02FreeIcons, color: "red" };
        default:
          return { icon: InformationCircleIcon, color: "gray" };
      }
    }
  };

  const formattedStatus = () => {
    return status
      ?.replaceAll("_", " ")
      .toLowerCase()
      .replace(/^\w|\s\w/g, (c) => c.toUpperCase());
  };

  const { icon, color } = property();

  return (
    <Tag
      color={color}
      className="!rounded-full uppercase text-sm !py-0.5 !px-2 !flex items-center gap-1 w-fit"
    >
      <HugeiconsIcon icon={icon} size={14} strokeWidth={1.5} />
      <span className="font-[600]">{formattedStatus()}</span>
    </Tag>
  );
};

export default StatusTag;
