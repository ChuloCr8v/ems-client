"use client";

import DashboardLayout from "../../component/common/DashboardLayout";
import TableComponent from "../../component/global/TableComponent";
import { Dropdown, Button, Image, type MenuProps } from "antd";
import type { ColumnsType } from "antd/es/table";
import { EllipsisOutlined } from "@ant-design/icons";
import ProfileCard from "../../component/ProfileCard";
import StatusTag from "../../component/global/StatusTag";
import {
  ArrowRight02FreeIcons,
  Edit02Icon,
  MailSend01Icon,
  ArrowReloadHorizontalIcon,
  UserCheck01Icon,
  ModernTvIssueIcon,
  LaptopAddIcon,
  LaptopPhoneSyncIcon,
  SettingDone01Icon,
} from "@hugeicons/core-free-icons";
import Icon from "../../component/common/Icon";
import { colors } from "../../constants/colors";
import { AssetStatus } from "../../api/types";
import type { Asset } from "../../api/types";
import { usePopup } from "../../context/PopupContext";
import AssetDetailsModal from "../../component/modals/AssetsDetailModal";
import AddAssetModal from "../../component/modals/AddAssetModal";
import { useListAssetsQuery } from "../../api/data/assets.api";
import { sentenceCase } from "../../helpers";
import AssignAssetModal from "../../component/modals/AssignAssetModal";
import RetrieveAssetModal from "../../component/modals/RetrieveAssetModal.tsx";
import ReportFaultModal from "../../component/modals/ReportFaultModal.tsx";
import { baseUrl } from "../../api/base.ts";
import AddBulkAssetModal from "../../component/modals/AddBulkAssetModal.tsx";
import AssetImage from "../../component/global/AssetImage.tsx";
import ResolveFaultModal from "../../component/modals/ResolveFaultModal.tsx";
import dayjs from "dayjs";

const Assets = () => {
  const { openModal } = usePopup();

  const { data: assets, isLoading: gettingAssets } = useListAssetsQuery();

  const columns: ColumnsType<Asset> = [
    {
      title: "Asset Name",
      dataIndex: "name",
      key: "name",
      render: (_text, record) => {
        const img = record.assetImage
          ? JSON.parse(record?.assetImage)
          : undefined;

        return (
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-[#ECF8EE] overflow-hidden rounded-full flex items-center justify-center">
              {img ? (
                <Image
                  src={baseUrl + img?.url}
                  className="h-full w-full object-cover"
                />
              ) : (
                AssetImage({
                  assetType: record.category,
                })
              )}
            </div>
            <div>
              <p className="font-semibold text-custom_black text-sm">
                {record?.name}
              </p>
              <p className="text-xs text-gray">{record?.assetId}</p>
            </div>
          </div>
        );
      },
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      render: (category) => (
        <span className="text-gray text-sm">{sentenceCase(category)}</span>
      ),
    },
    {
      title: "Assigned To",
      dataIndex: "assignedTo",
      key: "assignedTo",
      render: (_text, record) => {
        return record?.assignments?.length &&
          record?.assignments[0]?.condition !== "RETURNED" &&
          record.status !== AssetStatus.AVAILABLE ? (
          <ProfileCard
            firstName={record?.assignments[0]?.user.firstName}
            lastName={record.assignments[0]?.user.lastName}
            email={record.assignments[0]?.user.email ?? ""}
          />
        ) : (
          <span className="text-gray-400">Unassigned</span>
        );
      },
    },

    {
      title: "Date Assigned",
      dataIndex: "dateAssigned",
      key: "dateAssigned",
      render: (_, record) => (
        <span className="text-gray text-sm">
          {record?.assignments[0]?.assignedAt &&
          record?.assignments[0]?.condition !== "RETURNED" &&
          record.status !== AssetStatus.AVAILABLE
            ? dayjs(record?.assignments[0]?.assignedAt).format("DD MMMM YYYY")
            : "-"}
        </span>
      ),
    },
    {
      title: "Date Retrieved",
      dataIndex: "dateRetrieved",
      key: "dateRetrieved",
      render: (date) => (
        <span className="text-gray text-sm">{date || "-"}</span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (_, record) => {
        return <StatusTag status={record.status ?? AssetStatus.AVAILABLE} />;
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
                onClick: (e) => {
                  e.domEvent.stopPropagation();
                  handleViewAsset(record);
                },
                icon: Icon({
                  size: 16,
                  color: colors.icon_gray,
                  icon: ArrowRight02FreeIcons,
                }),
                style: { color: colors.icon_gray },
              },
              {
                key: "edit",
                label: "Edit Asset",
                onClick: () => openModal(<AddAssetModal id={record.id} />),
                style: { color: colors.icon_gray },
                icon: Icon({
                  icon: Edit02Icon,
                  size: 16,
                  color: colors.icon_gray,
                }),
              },
              {
                key: "assign",
                label: record.assignedTo ? "Reassign Asset" : "Assign Asset",
                onClick: () => openModal(<AssignAssetModal data={record} />),
                icon: Icon({
                  size: 16,
                  color: colors.icon_gray,
                  icon: UserCheck01Icon,
                }),
                style: { color: colors.icon_gray },
              },
              {
                key: "retrieve",
                label: "Retrieve Asset",
                onClick: () => openModal(<RetrieveAssetModal data={record} />),
                style: { color: colors.icon_gray },
                icon: Icon({
                  icon: ArrowReloadHorizontalIcon,
                  size: 16,
                  color: colors.icon_gray,
                }),
              },
              {
                key: "report",
                label: "Report Fault",
                onClick: () => openModal(<ReportFaultModal data={record} />),
                style: { color: "orange" },
                icon: Icon({
                  icon: ModernTvIssueIcon,
                  size: 16,
                  color: "orange",
                }),
              },
              {
                key: "resolve",
                label: "Resolve Fault",
                onClick: () => openModal(<ResolveFaultModal data={record} />),
                style: { color: "green" },
                icon: Icon({
                  icon: SettingDone01Icon,
                  size: 16,
                  color: "green",
                }),
              },
              // {
              //   key: "delete",
              //   label: "Delete Asset",
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

  const handleViewAsset = (asset: Asset) => {
    openModal(<AssetDetailsModal asset={asset} />);
  };

  const totalAssets = assets?.length;
  const assignedAssets = assets?.filter(
    (a) => a.status === AssetStatus.ASSIGNED
  ).length;
  const faultyAssets = assets?.filter(
    (a) => a.status === AssetStatus.FAULTY
  ).length;
  const availableAssets = assets?.filter(
    (a) => a.status === AssetStatus.ACTIVE
  ).length;

  const listItems: MenuProps["items"] = [
    {
      key: "Single",
      label: "Single",
      icon: Icon({
        icon: LaptopAddIcon,
        color: "",
      }),
      onClick: () => openModal(<AddAssetModal />),
    },
    {
      key: "Multiple",
      label: "Multiple",
      icon: Icon({
        icon: LaptopPhoneSyncIcon,
        color: "",
      }),
      onClick: () => openModal(<AddBulkAssetModal />),
    },
  ];

  return (
    <DashboardLayout
      primaryButtonText="Add Asset"
      primaryButtonType="DROPDOWN"
      primaryButtonListItems={listItems}
      primaryButtonIcon={MailSend01Icon}
      pageTitle="Assets"
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
          dataSource={assets ?? []}
          scroll={"max-content"}
          loading={gettingAssets}
          // onRow={(record) => handleViewAsset(record)}
        />
      </div>
    </DashboardLayout>
  );
};

export default Assets;
