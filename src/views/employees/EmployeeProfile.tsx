import { useParams } from "react-router-dom";
import { useListUsersQuery } from "../../api/data/users";
import { Button, Spin } from "antd";
import Avatar from "../../component/Avatar";
import Icon from "../../component/common/Icon";
import {
  Calendar02FreeIcons,
  LaptopCheckIcon,
  Settings01FreeIcons,
} from "@hugeicons/core-free-icons";
import dayjs from "dayjs";
import StatusTag from "../../component/global/StatusTag";
import CustomSegmented from "../../component/global/CustomSegment";
import { useState } from "react";
import GeneralLayout from "../layout/GeneralLayout";
import OffboardingChecklist from "../../component/OffboardingChecklist";
import EmployeeProfileView from "../../component/EmployeeProfileView";

const EmployeeProfile = () => {
  const [currentView, setCurrentView] = useState("Profile");
  const { id } = useParams();

  const { data: users, isLoading } = useListUsersQuery();

  const user = users?.find((u) => u.id === id);
  console.log(user);

  const options = [
    "Profile",
    "Documents",
    "Assets",
    "Performance",
    "Logs",
    "Offboarding Checklist",
  ];

  const render = () => {
    switch (currentView) {
      case "Profile":
        return <EmployeeProfileView />;
      case "Offboarding Checklist":
        return <OffboardingChecklist />;
      default:
        return null;
    }
  };

  return (
    <GeneralLayout
      breadCrumbs={{
        back: {
          url: "employees",
          title: "Dashboard / Employees",
        },
        current: user?.eId.toString() ?? "--",
      }}
    >
      {isLoading ? (
        <Spin />
      ) : (
        <div className="space-y-6">
          <div className="">
            <div className="h-20 bg-gradient-to-r from-[#007991] to-[#009181] rounded-t-2xl"></div>
            <div className="flex items-center justify-between bg-white p-5 rounded-xl shadow-lg/6 mx-4 -mt-12">
              <div className="flex items-center gap-4">
                <Avatar
                  firstName={user?.firstName}
                  lastName={user?.lastName}
                  size={60}
                  textSize="!text-2xl"
                />
                <div className="">
                  <h2 className="!uppercase font-semibold text-xl">
                    {user?.firstName + " " + " " + user?.lastName}
                  </h2>
                  <div className="flex items-center gap-3 text-gray">
                    <p className="">{user?.eId}</p>
                    <div className="flex items-center gap-1 border-l border-gray/40 pl-3 pr-3 border-r ">
                      <Icon
                        size={18}
                        icon={Calendar02FreeIcons}
                        color={"gray"}
                      />
                      <p className="">
                        Joined {dayjs(user?.startDate).format("DD MMM YYYY")}
                      </p>
                    </div>
                    <StatusTag status={user?.status ?? ""} />
                  </div>
                </div>
              </div>

              <div className="space-x-3">
                <Button
                  size="large"
                  icon={<Icon size={20} icon={LaptopCheckIcon} />}
                  className="!border-primary/20 !text-primary"
                >
                  Assign Assets
                </Button>
                <Button
                  size="large"
                  icon={<Icon size={20} icon={Settings01FreeIcons} />}
                  className="!border-primary/20 !text-primary"
                >
                  More
                </Button>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <CustomSegmented options={options} setOption={setCurrentView} />
            {render()}
          </div>
        </div>
      )}
    </GeneralLayout>
  );
};

export default EmployeeProfile;
