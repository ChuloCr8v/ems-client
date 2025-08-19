import {
  Profile02Icon,
  ProfileIcon,
  UserAdd01FreeIcons,
} from "@hugeicons/core-free-icons";
import type { Department } from "../../api/types";
import { CustomModal } from "../common/CustomModal";
import DataBox from "../global/DataBox";
import { twMerge } from "tailwind-merge";
import dayjs from "dayjs";
import StatusTag from "../global/StatusTag";
import { useGetTeamQuery } from "../../api/data/departments.api";
import ProfileCard from "../ProfileCard";
import { Tag } from "antd";

interface AssetDetailsModalProps {
  department: Department;
}

const DepartmentDetailModal = ({ department }: AssetDetailsModalProps) => {
  const { data: team } = useGetTeamQuery(department?.id);

  const departmentDetails = [
    {
      label: "Created On",
      value: dayjs(department.createdAt).format("MMM D, YYYY"),
    },
    {
      label: "Status",
      value: <StatusTag status={department.status ?? ""} />,
    },
  ];

  return (
    <CustomModal
      title={department.name}
      modalSubtitle={team?.length.toString() + " members"}
      icon={UserAdd01FreeIcons}
      width={600}
      hideFooter={true}
      maxHeight={true}
    >
      <DataBox
        data={{
          header: {
            title: {
              icon: ProfileIcon,
              text: "Overview",
            },
          },
          body: departmentDetails,
        }}
        bodyWrapper="grid grid-cols-2"
        contentWrapper={twMerge("!grid")}
      />

      <DataBox
        data={{
          header: {
            title: {
              icon: Profile02Icon,
              text: "Team Members",
            },
          },
        }}
        containerWrapper="mt-4"
        contentWrapper={"!grid border-b border-b-gray-100 last:border-b-0 pb-2"}
      >
        {team?.map((t) => (
          <div className="flex justify-between items-center">
            <ProfileCard
              firstName={t.firstName}
              lastName={t.lastName}
              email={t.email}
            />

            {t.id === department.departmentHeadId && (
              <Tag className="">
                {t.id === department.departmentHeadId ? "Department Head" : ""}
              </Tag>
            )}
          </div>
        ))}
      </DataBox>
    </CustomModal>
  );
};

export default DepartmentDetailModal;
