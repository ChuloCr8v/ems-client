"use client";

import DashboardLayout from "../../component/common/DashboardLayout";
import TableComponent from "../../component/global/TableComponent";
import { Dropdown, Button } from "antd";
import type { ColumnsType } from "antd/es/table";
import { EllipsisOutlined, LaptopOutlined } from "@ant-design/icons";
import ProfileCard from "../../component/ProfileCard";
import StatusTag from "../../component/global/StatusTag";
import {
  ArrowRight02FreeIcons,
  Edit02Icon,
  Delete02Icon,
  AiVoiceGeneratorIcon,
  MailSend01Icon,
} from "@hugeicons/core-free-icons";
import { useState } from "react";
import Icon from "../../component/common/Icon";
import { colors } from "../../constants/colors";
import { AssetStatus } from "../../api/types";
import type { Asset } from "../../api/types";
import { usePopup } from "../../context/PopupContext";
import AssetDetailsModal from "../../component/modals/AssetsDetailModal";
import AddAssetModal from "../../component/modals/AddAssetModal";

// Mock asset data for demonstration purposes
const mockAssetData: Asset[] = [
  {
    id: "1",
    name: "HP EliteBook",
    assetId: "HP-001-A12",
    assignedTo: {
      firstName: "Modesta",
      lastName: "Ekeh",
      email: "modesta.ekeh@company.com",
      employeeId: "EMP 1002",
    },
    category: "Hardware",
    dateAssigned: "Jan 24, 2025",
    status: AssetStatus.ASSIGNED,
    purchaseDate: "Dec 15, 2024",
    value: 1200,
    serialNumber: "HP123456789",
  },
  {
    id: "2",
    name: "Staff ID Card",
    assetId: "ID-001-A12",
    assignedTo: {
      firstName: "Modesta",
      lastName: "Ekeh",
      email: "modesta.ekeh@company.com",
      employeeId: "EMP 1002",
    },
    category: "Accessory",
    dateAssigned: "Jan 24, 2025",
    status: AssetStatus.AVAILABLE,
    purchaseDate: "Jan 20, 2025",
    value: 25,
  },
  {
    id: "3",
    name: "HP EliteBook",
    assetId: "HP-002-A12",
    assignedTo: {
      firstName: "Modesta",
      lastName: "Ekeh",
      email: "modesta.ekeh@company.com",
      employeeId: "EMP 1002",
    },
    category: "Hardware",
    dateAssigned: "Jan 24, 2025",
    status: AssetStatus.ASSIGNED,
    purchaseDate: "Dec 15, 2024",
    value: 1200,
    serialNumber: "HP123456790",
  },
  {
    id: "4",
    name: "Staff ID Card",
    assetId: "ID-002-A12",
    assignedTo: {
      firstName: "Modesta",
      lastName: "Ekeh",
      email: "modesta.ekeh@company.com",
      employeeId: "EMP 1002",
    },
    category: "Accessory",
    dateAssigned: "Jan 24, 2025",
    status: AssetStatus.FAULTY,
    purchaseDate: "Jan 20, 2025",
    value: 25,
  },
  {
    id: "5",
    name: "HP EliteBook",
    assetId: "HP-003-A12",
    assignedTo: {
      firstName: "Modesta",
      lastName: "Ekeh",
      email: "modesta.ekeh@company.com",
      employeeId: "EMP 1002",
    },
    category: "Logistics",
    dateAssigned: "Jan 24, 2025",
    status: AssetStatus.ASSIGNED,
    purchaseDate: "Dec 15, 2024",
    value: 1200,
    serialNumber: "HP123456791",
  },
  {
    id: "6",
    name: "Office Chair",
    assetId: "OC-001-A12",
    assignedTo: {
      firstName: "Modesta",
      lastName: "Ekeh",
      email: "modesta.ekeh@company.com",
      employeeId: "EMP 1002",
    },
    category: "Office Furniture & Equipment",
    dateAssigned: "Jan 24, 2025",
    status: AssetStatus.ASSIGNED,
    purchaseDate: "Nov 10, 2024",
    value: 350,
  },
  {
    id: "7",
    name: "Safety Helmet",
    assetId: "SH-001-A12",
    assignedTo: {
      firstName: "Modesta",
      lastName: "Ekeh",
      email: "modesta.ekeh@company.com",
      employeeId: "EMP 1002",
    },
    category: "Safety Gear & Equipment",
    dateAssigned: "Jan 24, 2025",
    status: AssetStatus.FAULTY,
    purchaseDate: "Oct 5, 2024",
    value: 75,
  },
];

const Assets = () => {
  const [_assetData, setAssetData] = useState<Asset | null>(null);
  const { openModal } = usePopup();

  const columns: ColumnsType<Asset> = [
    {
      title: "Asset Name",
      dataIndex: "name",
      key: "name",
      render: (_text, record) => {
        return (
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-[#ECF8EE] rounded-full flex items-center justify-center">
              <div className="w-4 h-4 text-[#40B554] rounded-sm">
                <LaptopOutlined />
              </div>
            </div>
            <div>
              <p className="font-medium text-custom_black text-sm">
                {record.name}
              </p>
              <p className="text-xs text-gray">{record.assetId}</p>
            </div>
          </div>
        );
      },
    },
    {
      title: "Assigned To",
      dataIndex: "assignedTo",
      key: "assignedTo",
      render: (_text, record) => {
        return record.assignedTo ? (
          <ProfileCard
            firstName={record.assignedTo.firstName}
            lastName={record.assignedTo.lastName}
            email={record.assignedTo.employeeId ?? ""}
          />
        ) : (
          <span className="text-gray-400">Unassigned</span>
        );
      },
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      render: (category) => (
        <span className="text-gray text-sm">{category}</span>
      ),
    },
    {
      title: "Date Assigned",
      dataIndex: "dateAssigned",
      key: "dateAssigned",
      render: (date) => (
        <span className="text-gray text-sm">{date || "-----"}</span>
      ),
    },
    {
      title: "Date Retrieved",
      dataIndex: "dateRetrieved",
      key: "dateRetrieved",
      render: (date) => (
        <span className="text-gray text-sm">{date || "-----"}</span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (_, record) => {
        return <StatusTag status={record.status as AssetStatus} />;
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
                key: "assign",
                label: record.assignedTo ? "Reassign Asset" : "Assign Asset",
                onClick: () => handleAssignAsset(record),
                icon: Icon({
                  size: 16,
                  color: colors.icon_gray,
                  icon: AiVoiceGeneratorIcon,
                }),
                style: { color: colors.icon_gray },
              },
              {
                key: "retrieve",
                label: "Retrieve Asset",
                onClick: () => handleRetrieveAsset(record),
                style: { color: colors.icon_gray },
                icon: Icon({
                  icon: AiVoiceGeneratorIcon,
                  size: 16,
                  color: colors.icon_gray,
                }),
                disabled: !record.assignedTo,
              },
              {
                key: "edit",
                label: "Edit Asset",
                onClick: () => handleEditAsset(record),
                style: { color: colors.icon_gray },
                icon: Icon({
                  icon: Edit02Icon,
                  size: 16,
                  color: colors.icon_gray,
                }),
              },
              {
                key: "delete",
                label: "Delete Asset",
                onClick: () => handleDeleteAsset(record),
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
            onClick={(e) => {
              e.stopPropagation();
              setAssetData(record);
            }}
          >
            <EllipsisOutlined />
          </Button>
        </Dropdown>
      ),
    },
  ];

  // Action handlers
  const handleAddAsset = () => {
    openModal(<AddAssetModal />);
  };

  const handleViewAsset = (asset: Asset) => {
    openModal(<AssetDetailsModal asset={asset} />);
  };

  const handleAssignAsset = (asset: Asset) => {
    console.log("Assign asset:", asset);
  };

  const handleRetrieveAsset = (asset: Asset) => {
    console.log("Retrieve asset:", asset);
  };

  const handleEditAsset = (asset: Asset) => {
    console.log("Edit asset:", asset);
  };

  const handleDeleteAsset = (asset: Asset) => {
    console.log("Delete asset:", asset);
  };

  const totalAssets = mockAssetData.length;
  const assignedAssets = mockAssetData.filter(
    (a) => a.status === AssetStatus.ASSIGNED
  ).length;
  const faultyAssets = mockAssetData.filter(
    (a) => a.status === AssetStatus.FAULTY
  ).length;
  const availableAssets = mockAssetData.filter(
    (a) => a.status === AssetStatus.AVAILABLE
  ).length;

  return (
    <DashboardLayout
      primaryButtonText="Add Asset"
      action={handleAddAsset}
      primaryButtonIcon={MailSend01Icon}
      pageTitle="Assets"
      pageDescription="Manage and track all company assets and equipment."
      summaryType="assets"
      summaryCounts={{
        total: totalAssets,
        secondary: availableAssets, // This maps to "Available" in the assets view
        assigned: assignedAssets,
        faulty: faultyAssets,
      }}
    >
      <div className="space-y-6 mt-4">
        <TableComponent
          columns={columns}
          dataSource={mockAssetData}
          scroll={800}
          loading={false}
          onRow={(record) => handleViewAsset(record)}
        />
      </div>
    </DashboardLayout>
  );
};

export default Assets;
