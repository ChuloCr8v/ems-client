import { EmployeeStatus, type User } from "../../api/types";
import DashboardLayout from "../../component/common/DashboardLayout";
import TableComponent from "../../component/global/TableComponent";
import { Dropdown, Button } from "antd";
import type { ColumnsType } from "antd/es/table";
import { EllipsisOutlined } from "@ant-design/icons";
import ProfileCard from "../../component/ProfileCard";
import StatusTag from "../../component/global/StatusTag";
import {
  ArrowRight02FreeIcons,
  CheckmarkCircle01Icon,
  Download03FreeIcons,
  Logout03FreeIcons,
  MailSend01Icon,
} from "@hugeicons/core-free-icons";
import { usePopup } from "../../context/PopupContext";
import SendInvitation from "../../component/modals/SendInvitation";
import { useState } from "react";
import Icon from "../../component/common/Icon";
import { colors } from "../../constants/colors";
import EmployeeDetailCard from "../../component/modals/EmployeeDetailCard";
import ApproveEmployee from "../../component/modals/ApproveEmployee";
import { useListInvitationQuery } from "../../api/data/invitations.api";
import { sentenceCase } from "../../helpers";
import { useNavigate } from "react-router-dom";
import { useListUsersQuery } from "../../api/data/users";
import InitiateOffboardingModal from "../../component/modals/offboardingModal/InitiateOffboardingModal";

const Employees = () => {
  const [currentList, setCurrentList] = useState("EMPLOYEES");
  const [userData, setUserData] = useState<User | null>(null);

  const { data: invitationData, isLoading } = useListInvitationQuery();
  const { data: users, isLoading: gettingUsers } = useListUsersQuery();

  console.log(users);
  console.log(invitationData);

  const navigate = useNavigate();

  const options = ["EMPLOYEES", "PROSPECTS"];

  const { openModal } = usePopup();

  const getActionMenuItems = (record: User) => {
    if (currentList === "EMPLOYEES") {
      return [
        {
          key: "view",
          label: "View Profile",
          onClick: () => navigate(`${userData?.id}`),
          icon: Icon({
            size: 16,
            color: colors.icon_gray,
            icon: ArrowRight02FreeIcons,
          }),
          style: { color: colors.icon_gray },
        },
        {
          key: "retrieve Assets",
          label: "Retrieve Assets",
          icon: Icon({
            size: 16,
            color: colors.icon_gray,
            icon: Download03FreeIcons,
          }),
          style: { color: colors.icon_gray },
        },
        {
          key: "initiate-exit",
          label: "Initiate Exit",
          onClick: () => openModal(<InitiateOffboardingModal />),
          icon: Icon({
            size: 16,
            color: colors.icon_gray,
            icon: Logout03FreeIcons,
          }),
          style: { color: colors.icon_gray },
        },
        {
          key: "exit employee",
          label: "Exit Employee",
          // onClick: () =>
          //   openModal(
          //     <InitiateOffboardingModal />,
          //   ),
          icon: Icon({
            size: 16,
            color: colors.icon_gray,
            icon: Logout03FreeIcons,
          }),
          style: { color: colors.icon_gray },
        },
      ];
    } else {
      return [
        {
          key: "view",
          label: "View Profile",
          onClick: () => openModal(<EmployeeDetailCard data={userData} />),
          icon: Icon({
            size: 16,
            color: colors.icon_gray,
            icon: ArrowRight02FreeIcons,
          }),
          style: { color: colors.icon_gray },
        },
        {
          key: "approve",
          label: "Approve Employee",
          onClick: () => openModal(<ApproveEmployee id={record.id} />),
          icon: Icon({
            size: 16,
            color: colors.icon_gray,
            icon: CheckmarkCircle01Icon,
          }),
          style: {
            color: colors.icon_gray,
            display:
              record.invite[0].status === "PENDING" || record.level
                ? "none"
                : "flex",
          },
        },
        // {
        //   key: "slink",
        //   label: "Send Link",
        //   onClick: () => console.log("Deactivate", record),
        //   icon: Icon({
        //     size: 16,
        //     color: colors.icon_gray,
        //     icon: MailAccount01Icon,
        //   }),
        //   style: { color: colors.icon_gray },
        // },
        // {
        //   key: "delete",
        //   label: "Delete Invitation",
        //   onClick: () => console.log("Deactivate", record),
        //   style: { color: colors.icon_gray },
        //   icon: Icon({
        //     icon: Delete02Icon,
        //     size: 16,
        //     color: colors.icon_gray,
        //   }),
        // },
      ];
    }
  };

  const columns: ColumnsType<User> = [
    {
      title: "ID",
      dataIndex: "eId",
      key: "eId",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (_text, record) => {
        return (
          <ProfileCard
            firstName={record.firstName}
            lastName={record.lastName}
            email={record.email ?? ""}
          />
        );
      },
    },
    {
      title: "Gender",
      dataIndex: "Gender",
      key: "gender",
      render: (_, record) => {
        return sentenceCase(record.gender);
      },
    },
    {
      title: "Role",
      dataIndex: "userRole",
      key: "userRole",
      render: (_, records) => {
        return (
          <div className="">
            <p className="text-custom_black text-sm ">
              {sentenceCase(records.role ?? "")}
            </p>
            <p className="text-xs">{sentenceCase(records.jobType)}</p>
          </div>
        );
      },
    },
    {
      title: "Level",
      dataIndex: "level",
      key: "level",
      render: (_, record) => {
        return <p className="">{record.level?.name}</p>;
      },
    },
    {
      title: "Status",
      dataIndex: "Status",
      key: "status",
      render: (_, record) => {
        const inviteStatus = record.invite?.length
          ? [...record.invite]
              .filter((i) => i.createdAt)
              .sort(
                (a, b) =>
                  new Date(a.createdAt!).getTime() -
                  new Date(b.createdAt!).getTime()
              )[0]?.status
          : undefined;

        const statusToShow =
          currentList === "EMPLOYEES"
            ? record.status
            : record.eId
            ? record.status
            : inviteStatus;

        return <StatusTag status={statusToShow ?? "N/A"} />;
      },
    },
    {
      title: "Action",
      key: "actions",
      align: "right",
      render: (_text, record) => (
        <>
          <Dropdown
            placement="bottomRight"
            menu={{
              items: getActionMenuItems(record),
            }}
          >
            <Button
              type="text"
              className="p-2"
              onClick={(e) => {
                e.preventDefault();
                setUserData(record);
              }}
            >
              <EllipsisOutlined />
            </Button>
          </Dropdown>
        </>
      ),
    },
  ];

  const iColumns = columns.filter(
    (c) => c.title !== "ID" && c.title !== "Level"
  );

  const currentTableItem = () => {
    switch (currentList) {
      case "EMPLOYEES":
        return { data: users?.filter((u) => u.level), col: columns };
      default:
        return { data: invitationData, col: iColumns };
    }
  };

  // Calculate summary counts
  const totalEmployees = currentTableItem().data?.length;
  const invitationsSent = invitationData?.length ?? 0;
  const activeEmployees = currentTableItem().data?.filter(
    (emp) => emp.status === EmployeeStatus.ACTIVE
  ).length;
  const inactiveEmployees = currentTableItem().data?.filter(
    (emp) => emp.status === EmployeeStatus.INACTIVE
  ).length;

  return (
    <DashboardLayout
      primaryButtonText="Send Invitation"
      action={() => openModal(<SendInvitation />)}
      primaryButtonIcon={MailSend01Icon}
      pageTitle="Employees"
      pageDescription="View, manage, and track all employees across the organization."
      summaryType="employees"
      summaryCounts={{
        total: totalEmployees ?? 0,
        secondary: invitationsSent ?? 0,
        active: activeEmployees ?? 0,
        inactive: inactiveEmployees ?? 0,
      }}
      segmentOptions={options}
      setCurrentList={setCurrentList}
    >
      <TableComponent
        columns={currentTableItem().col}
        dataSource={currentTableItem().data as any}
        scroll={"max-content"}
        loading={isLoading || gettingUsers}
        // onRow={(record) =>
        //   openModal(
        //     <EmployeeDetailCard data={record} dataSource={currentList} />
        //   )
        // }
      />
    </DashboardLayout>
  );
};

export default Employees;
