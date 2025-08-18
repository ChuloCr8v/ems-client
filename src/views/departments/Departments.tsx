"use client";

import DashboardLayout from "../../component/common/DashboardLayout.tsx";
import TableComponent from "../../component/global/TableComponent.tsx";
import { Dropdown, Button, type MenuProps, Avatar, Tooltip } from "antd";
import type { ColumnsType } from "antd/es/table";
import { EllipsisOutlined } from "@ant-design/icons";
import ProfileCard from "../../component/ProfileCard.tsx";
import {
  ArrowRight02FreeIcons,
  Edit02Icon,
  MailSend01Icon,
  SettingDone01Icon,
  DepartementIcon,
  UserMultipleIcon,
} from "@hugeicons/core-free-icons";
import Icon from "../../component/common/Icon.tsx";
import { colors } from "../../constants/colors.ts";
import { AssetStatus } from "../../api/types.ts";
import type { Department } from "../../api/types.ts";
import { usePopup } from "../../context/PopupContext.tsx";
import AddAssetModal from "../../component/modals/AddAssetModal.tsx";
import AddBulkAssetModal from "../../component/modals/AddBulkAssetModal.tsx";
// import DepartmentDetailModal from "../../component/modals/DepartmentDetailModal.tsx";
import AddDepartmentModal from "../../component/modals/AddDepartmentModal.tsx";
import { useListDepartmentsQuery } from "../../api/data/departments.api.ts";
import { useListUsersQuery } from "../../api/data/users.ts";
import { fullName } from "../../helpers.ts";
import dayjs from "dayjs";
import StatusTag from "../../component/global/StatusTag.tsx";

const Departments = () => {
  const { openModal } = usePopup();

  const { data: departments, isLoading: gettingDepartments } =
    useListDepartmentsQuery();
  const { data: users, isLoading: gettingUsers } = useListUsersQuery();

  const columns: ColumnsType<Department> = [
    {
      title: "Department Name",
      dataIndex: "name",
      key: "name",
      render: (_text, record) => {
        return (
          <div className="">
            <p className="font-semibold text-custom_black text-sm">
              {record?.name}
            </p>
          </div>
        );
      },
    },
    {
      title: "Department Head",
      dataIndex: "departmentHead",
      key: "departmentHead",
      render: (departmentHead) => (
        <ProfileCard
          firstName={departmentHead?.firstName}
          lastName={departmentHead?.lastName}
          email={departmentHead?.email ?? ""}
        />
      ),
    },
    {
      title: "Employees",
      dataIndex: "employees",
      key: "employees",
      render: (_text, record) => {
        const teamMembers = users?.filter((u) => u.departmentId === record.id);
        console.log(users);

        console.log(record);

        return (
          <Avatar.Group
            max={{
              count: 2,
              style: {
                color: "#fff",
                backgroundColor: colors.elevated,
                cursor: "pointer",
              },
              popover: { trigger: "click" },
            }}
          >
            {teamMembers
              ?.map((t) => (
                <Tooltip
                  title={fullName({
                    firstName: t.firstName,
                    lastName: t.lastName,
                  })}
                  placement="top"
                >
                  <Avatar
                    style={{
                      color: "#fff",
                      backgroundColor: colors.light_gray,
                    }}
                  >
                    {t.firstName.charAt(0) + " " + t.lastName.charAt(0)}
                  </Avatar>
                </Tooltip>
              ))
              .slice(0, 3)}
          </Avatar.Group>
        );
      },
    },

    {
      title: "Created On",
      dataIndex: "createdOn",
      key: "createdOn",
      render: (_, record) => (
        <div className="">{dayjs(record.createdAt).format("DD MMM, YYYY")}</div>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (_, record) => {
        return <StatusTag status={record.status ?? ""} />;
      },
    },
    {
      title: "Action",
      key: "actions",
      align: "right",
      render: (_text, record) => (
        <Dropdown
          trigger={["click"]}
          placement="bottomRight"
          menu={{
            items: [
              {
                key: "view",
                label: "View Details",
                // onClick: (e) => {
                //   e.domEvent.stopPropagation();
                //   handleViewAsset(record);
                // },
                icon: Icon({
                  size: 16,
                  color: colors.icon_gray,
                  icon: ArrowRight02FreeIcons,
                }),
                style: { color: colors.icon_gray },
              },
              {
                key: "edit",
                label: "Edit Department",
                onClick: () => openModal(<AddAssetModal id={record.id} />),
                style: { color: colors.icon_gray },
                icon: Icon({
                  icon: Edit02Icon,
                  size: 16,
                  color: colors.icon_gray,
                }),
              },

              {
                key: "Disable Department",
                label: "Disable Department",
                // onClick: () => openModal(<ResolveFaultModal data={record} />),
                style: { color: "green" },
                icon: Icon({
                  icon: SettingDone01Icon,
                  size: 16,
                  color: "green",
                }),
              },
              // {
              //   key: "delete",
              //   label: "Delete Department",
              //   onClick: () => handleDeleteAsset(record),
              //   style: { color: "red" },
              //   icon: Icon({
              //     icon: Delete02Icon,
              //     size: 16,
              //     color: "red",
              //   }),
              // },
            ],
          }}
        >
          <Button
            type="text"
            className="p-2"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <EllipsisOutlined />
          </Button>
        </Dropdown>
      ),
    },
  ];

  // const handleViewDepartment = (department: Department) => {
  //   openModal(<DepartmentDetailModal department={department} />);
  // };

  const totalAssets = departments?.length;
  const assignedAssets = departments?.filter(
    (a) => a.status === AssetStatus.ASSIGNED
  ).length;
  const faultyAssets = departments?.filter(
    (a) => a.status === AssetStatus.FAULTY
  ).length;
  const availableAssets = departments?.filter(
    (a) => a.status === AssetStatus.ACTIVE
  ).length;

  const listItems: MenuProps["items"] = [
    {
      key: "Single",
      label: "Single",
      icon: Icon({
        icon: DepartementIcon,
        color: "",
      }),
      onClick: () => openModal(<AddDepartmentModal />),
    },
    {
      key: "Multiple",
      label: "Multiple",
      icon: Icon({
        icon: UserMultipleIcon,
        color: "",
      }),
      onClick: () => openModal(<AddBulkAssetModal />),
    },
  ];

  return (
    <DashboardLayout
      primaryButtonText="Add Department"
      primaryButtonType="DROPDOWN"
      primaryButtonListItems={listItems}
      primaryButtonIcon={MailSend01Icon}
      pageTitle="Departments"
      pageDescription="Manage and track all company assets and equipment."
      summaryType="assets"
      summaryCounts={{
        total: totalAssets ?? 0,
        secondary: availableAssets ?? 0,
        assigned: assignedAssets,
        faulty: faultyAssets,
      }}
    >
      <div className="max-w-full overflow-hidden">
        <TableComponent
          columns={columns}
          dataSource={departments ?? []}
          scroll={"max-content"}
          loading={gettingDepartments || gettingUsers}
          // onRow={(record) => handleViewAsset(record)}
        />
      </div>
    </DashboardLayout>
  );
};

export default Departments;
