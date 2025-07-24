import DashboardLayout from "../../component/common/DashboardLayout";
import CustomSegmented from "../../component/global/CustomSegment";

const Employees = () => {
  const options = ["Employees", "invitations"];

  return (
    <DashboardLayout>
      <div className="">
        <CustomSegmented options={options} />
      </div>
    </DashboardLayout>
  );
};

export default Employees;
