import { Tag } from "antd";
import {
  InformationCircleIcon,
  Briefcase02Icon,
  CheckmarkCircle02Icon,
  CancelCircleFreeIcons,
  Loading01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { EmployeeStatus } from "../../api/types";

type Props = {
  status: string;
};

const StatusTag = ({ status }: Props) => {
  const property = () => {
    switch (status) {
      case EmployeeStatus.PENDING:
      case EmployeeStatus.PENDING_INVITE:
      case EmployeeStatus.PENDING_REVIEW:
        return {
          icon: Loading01Icon,
          color: "orange",
        };
      case EmployeeStatus.REJECTED:
      case EmployeeStatus.INACTIVE:
        return {
          icon: CancelCircleFreeIcons,
          color: "red",
        };
      case EmployeeStatus.ACTIVE:
      case EmployeeStatus.ACCEPTED:
        return {
          icon: CheckmarkCircle02Icon,
          color: "green",
        };
      case EmployeeStatus.ON_LEAVE:
        return {
          icon: Briefcase02Icon,
          color: "blue",
        };
      default:
        return {
          icon: InformationCircleIcon,
          color: "gray",
        };
    }
  };

  const formattedStatus = () => {
    switch (status) {
      case EmployeeStatus.PENDING:
        return "Pending";
      case EmployeeStatus.PENDING_INVITE:
        return "Pending Invite";
      case EmployeeStatus.PENDING_REVIEW:
        return "Pending Review";
      case EmployeeStatus.INACTIVE:
        return "Inactive";
      case EmployeeStatus.REJECTED:
        return "Rejected";
      case EmployeeStatus.ACCEPTED:
        return "Accepted";
      case EmployeeStatus.ACTIVE:
        return "Active";
      case EmployeeStatus.ON_LEAVE:
        return "On Leave";
      default:
        return "---";
    }
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
