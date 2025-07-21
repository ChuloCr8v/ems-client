import GeneralLayout from "../layout/GeneralLayout";

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
      <div className=""></div>
    </GeneralLayout>
  );
};

export default Dashboard;
