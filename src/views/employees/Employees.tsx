import { EmployeeStatus, type User } from "../../api/types";
import DashboardLayout from "../../component/common/DashboardLayout";
import CustomSegmented from "../../component/global/CustomSegment";
import TableComponent from "../../component/global/TableComponent";
import { Dropdown, Button } from "antd";
import type { ColumnsType } from "antd/es/table";
import { EllipsisOutlined } from "@ant-design/icons";
import ProfileCard from "../../component/ProfileCard";
import StatusTag from "../../component/global/StatusTag";
import {
  ArrowRight02FreeIcons,
  CheckmarkCircle01Icon,
  Delete02Icon,
  MailAccount01Icon,
  MailSend01Icon,
} from "@hugeicons/core-free-icons";
import { usePopup } from "../../context/PopupContext";
import SendInvitation from "../../component/modals/SendInvitation";
import { useState } from "react";
import Icon from "../../component/common/Icon";
import { colors } from "../../constants/colors";
import ProspectDetail from "../../component/modals/ProspectDetail";
import ApproveEmployee from "../../component/modals/ApproveEmployee";
import { useListInvitationQuery } from "../../api/data/invitations.api";
import { sentenceCase } from "../../helpers";

const Employees = () => {
  const [currentList, setCurrentList] = useState<string>("Employees");
  const [userData, setUserData] = useState<User | null>(null);

  const options = ["Employees", "Invitations"];

  const { openModal } = usePopup();

  const columns: ColumnsType<User> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
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
            <p className="text-custom_black text-sm ">{records.role}</p>
            <p className="text-xs">{sentenceCase(records.jobType)}</p>
          </div>
        );
      },
    },
    {
      title: "Level",
      dataIndex: "level",
      key: "level",
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

        console.log(inviteStatus);

        return <StatusTag status={inviteStatus ?? EmployeeStatus.PENDING} />;
      },
    },
    {
      title: "Action",
      key: "actions",
      align: "right",
      render: (_text, record) => (
        <>
          <Dropdown
            trigger={["click"]}
            placement="bottomRight"
            menu={{
              items: [
                {
                  key: "view",
                  label: "View Profile",
                  onClick: () => openModal(<ProspectDetail data={userData} />),
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
                  style: { color: colors.icon_gray },
                },
                {
                  key: "slink",
                  label: "Send Link",
                  onClick: () => console.log("Deactivate", record),
                  icon: Icon({
                    size: 16,
                    color: colors.icon_gray,
                    icon: MailAccount01Icon,
                  }),
                  style: { color: colors.icon_gray },
                },
                {
                  key: "delete",
                  label: "Delete Invitation",
                  onClick: () => console.log("Deactivate", record),
                  style: { color: colors.icon_gray },
                  icon: Icon({
                    icon: Delete02Icon,
                    size: 16,
                    color: colors.icon_gray,
                  }),
                },
              ],
            }}
          >
            <Button
              type="text"
              className="p-2"
              onClick={() => setUserData(record)}
            >
              <EllipsisOutlined />
            </Button>
          </Dropdown>
        </>
      ),
    },
  ];

  const { data: invitationResponse, isLoading } = useListInvitationQuery();

  const invitationData = invitationResponse?.prospects;

  console.log(invitationData);

  const iColumns = columns.filter(
    (c) => c.title !== "ID" && c.title !== "Level"
  );

  const currentTableItem = () => {
    switch (currentList) {
      case "Employees":
        return { data: employeeData, col: columns };
      default:
        return { data: invitationData, col: iColumns };
    }
  };

  console.log(invitationData);

  return (
    <DashboardLayout
      primaryButtonText={"Send Invitation"}
      action={() => openModal(<SendInvitation />)}
      primaryButtonIcon={MailSend01Icon}
    >
      <div className="space-y-6 mt-4">
        <CustomSegmented
          options={options}
          setOption={(value) => setCurrentList(value)}
        />
        <TableComponent
          columns={currentTableItem().col}
          dataSource={currentTableItem().data as any}
          scroll={800}
          loading={isLoading}
        />
      </div>
    </DashboardLayout>
  );
};

export default Employees;

export const employeeData = [
  {
    id: "EMP001",
    firstName: "Modesta",
    lastName: "Ejeh",
    email: "modesta.ejeh@company.com",
    Gender: "Male",
    userRole: "UI/UX Designer",
    level: "Officer",
    jobType: "Full-Time",
    status: EmployeeStatus.ACTIVE,
  },
  {
    id: "EMP002",
    firstName: "Benedect",
    lastName: "Nwosu",
    email: "benedict.nwosu@company.com",
    Gender: "Male",
    userRole: "UI/UX Designer",
    level: "Officer",
    jobType: "Contract",
    status: EmployeeStatus.ACTIVE,
  },
  {
    id: "EMP003",
    firstName: "Chinenye",
    lastName: "Okafor",
    email: "chinenye.okafor@company.com",
    Gender: "Female",
    userRole: "Frontend Developer",
    level: "Senior Officer",
    jobType: "Full-Time",
    status: EmployeeStatus.ACTIVE,
  },
  {
    id: "EMP004",
    firstName: "Ifeanyi",
    lastName: "Umeh",
    email: "ifeanyi.umeh@company.com",
    Gender: "Male",
    userRole: "Backend Developer",
    level: "Lead",
    jobType: "Contract",
    status: EmployeeStatus.ON_LEAVE,
  },
  {
    id: "EMP005",
    firstName: "Amaka",
    lastName: "Obi",
    email: "amaka.obi@company.com",
    Gender: "Female",
    userRole: "HR Manager",
    level: "Head",
    jobType: "Full-Time",
    status: EmployeeStatus.PENDING_INVITE,
  },
  {
    id: "EMP006",
    firstName: "Obinna",
    lastName: "Okeke",
    email: "obinna.okeke@company.com",
    Gender: "Male",
    userRole: "DevOps Engineer",
    level: "Senior Officer",
    jobType: "Contract",
    status: EmployeeStatus.INACTIVE,
  },
  {
    id: "EMP007",
    firstName: "Ngozi",
    lastName: "Adebayo",
    email: "ngozi.adebayo@company.com",
    Gender: "Female",
    userRole: "Product Manager",
    level: "Lead",
    jobType: "Full-Time",
    status: EmployeeStatus.PENDING,
  },
  {
    id: "EMP008",
    firstName: "Chuka",
    lastName: "Eze",
    email: "chuka.eze@company.com",
    Gender: "Male",
    userRole: "QA Analyst",
    level: "Officer",
    jobType: "Full-Time",
    status: EmployeeStatus.ACTIVE,
  },
  {
    id: "EMP009",
    firstName: "Kelechi",
    lastName: "Nnaji",
    email: "kelechi.nnaji@company.com",
    Gender: "Female",
    userRole: "Marketing Lead",
    level: "Senior Officer",
    jobType: "Contract",
    status: EmployeeStatus.ON_LEAVE,
  },
  {
    id: "EMP010",
    firstName: "Ijeoma",
    lastName: "Nwankwo",
    email: "ijeoma.nwankwo@company.com",
    Gender: "Female",
    userRole: "Customer Support",
    level: "Junior Officer",
    jobType: "Full-Time",
    status: EmployeeStatus.ACTIVE,
  },
];
