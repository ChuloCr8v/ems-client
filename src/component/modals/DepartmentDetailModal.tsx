import { useState } from "react";
import { LaptopIcon, UserAdd01FreeIcons } from "@hugeicons/core-free-icons";
import type { Department } from "../../api/types";
import { CustomModal } from "../common/CustomModal";
import DataBox from "../global/DataBox";
import CustomSegmented from "../global/CustomSegment";
import { twMerge } from "tailwind-merge";
import LogComponent from "../global/LogComponent";

interface AssetDetailsModalProps {
  department: Department;
}

const DepartmentDetailModal = ({ department }: AssetDetailsModalProps) => {
  const [activeTab, setActiveTab] = useState("Overview");

  const departmentDetails = [
    {
      label: "ID",
      value: "asset.serialNo",
    },
  ];

  const OverviewTab = () => (
    <div className="space-y-4 w-full">
      {/* Asset Details */}
      <DataBox
        data={{
          header: {
            title: {
              icon: LaptopIcon,
              text: "Asset Details",
            },
          },
          body: departmentDetails,
        }}
        bodyWrapper="grid grid-cols-2"
        contentWrapper={twMerge("!grid")}
      />
    </div>
  );

  const LogsTab = () => <LogComponent />;

  const tabItems = ["Overview", "Logs"];

  return (
    <CustomModal
      title={department.name}
      // modalSubtitle={department}
      icon={UserAdd01FreeIcons}
      width={800}
      hideFooter={true}
      maxHeight={true}
    >
      <div className="flex flex-col justify-center items-center gap-6">
        <CustomSegmented options={tabItems} setOption={setActiveTab} />
        {activeTab === "Overview" ? <OverviewTab /> : <LogsTab />}
      </div>
    </CustomModal>
  );
};

export default DepartmentDetailModal;
