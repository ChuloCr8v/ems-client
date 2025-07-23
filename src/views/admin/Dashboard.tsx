import { Button } from "antd";
import GeneralLayout from "../layout/GeneralLayout";
import { FiUploadCloud } from "react-icons/fi";
import { BsEnvelopeArrowUp } from "react-icons/bs";
import { twMerge } from "tailwind-merge";
import SummaryCards from "../../component/common/SummaryCards";

const Dashboard = () => {
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
      <div className="space-y-5">
        <div className="flex items-center justify-between gap-4 mt-4">
          <div className="">
            <h2 className="font-semibold text-xl">Employees</h2>
            <p className="text-gray mt-1 text-sm">
              View, manage, and track all employees across the organization.
            </p>
          </div>

          <div className="space-x-4">
            <Button
              size="large"
              icon={<FiUploadCloud color="#0a96cc" />}
              className={twMerge("!border-primary")}
            >
              <span className="!text-sm text-primary">Generate Report</span>
            </Button>

            <Button size="large" type="primary" icon={<BsEnvelopeArrowUp />}>
              <span className="!text-sm">Generate Report</span>
            </Button>
          </div>
        </div>
        <SummaryCards />
      </div>
    </GeneralLayout>
  );
};

export default Dashboard;
