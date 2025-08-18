import React, { useState } from "react";
import { Upload, Table, message, Alert, Tag } from "antd";
import type { UploadFile } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import * as XLSX from "xlsx";
import { CustomModal } from "../common/CustomModal";
import { LaptopPhoneSyncFreeIcons } from "@hugeicons/core-free-icons";
import { usePopup } from "../../context/PopupContext";
import { colors } from "../../constants/colors";
import { useCreateBulkAssetsMutation } from "../../api/data/assets.api";

const { Dragger } = Upload;

interface AssetRow {
  key: React.Key;
  [key: string]: any;
}

const REQUIRED_HEADERS = [
  { key: "name", example: "Dell XPS 15 Laptop" },
  { key: "serialNo", example: "DXPS152023-001" },
  { key: "category", example: "IT_EQUIPMENT" },
  { key: "purchaseDate", example: "2023-05-15" },
  { key: "vendor", example: "Dell Technologies" },
  { key: "cost", example: "1499.99" },
  { key: "description", example: "15-inch laptop with 16GB RAM and 512GB SSD" },
];

const BulkAssetUploader: React.FC = () => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [dataSource, setDataSource] = useState<AssetRow[]>([]);
  const [columns, setColumns] = useState<any[]>([]);

  const [createBulkUploads, { isLoading }] = useCreateBulkAssetsMutation();
  const { closeModal } = usePopup();

  const handleExcel = async (file: File) => {
    try {
      const data = await file.arrayBuffer();
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const json: any[] = XLSX.utils.sheet_to_json(sheet, { defval: "" });

      if (json.length === 0) {
        message.warning("Excel file is empty");
        return Upload.LIST_IGNORE;
      }

      const missing = REQUIRED_HEADERS.filter(
        (h) => !Object.keys(json[0]).includes(h.key)
      );
      if (missing.length > 0) {
        message.warning(
          `Missing required columns: ${missing
            .map((h) => `"${h.key}"`)
            .join(", ")}`
        );
      }

      // Remove assetImage column if present
      const cleanedData = json.map((row) => {
        const { assetImage, ...rest } = row;
        return rest;
      });

      setColumns(
        Object.keys(cleanedData[0]).map((key) => ({
          title: key,
          dataIndex: key,
        }))
      );

      setDataSource(
        cleanedData.map((row, i) => ({
          key: i.toString(),
          ...row,
        }))
      );

      setFileList([
        {
          uid: "-1",
          name: file.name,
          status: "done",
          originFileObj: file as any,
        },
      ]);
    } catch (err) {
      console.error(err);
      message.error("Failed to read Excel file");
      return Upload.LIST_IGNORE;
    }
    return false;
  };

  const handleRemoveFile = () => {
    setFileList([]);
    setDataSource([]);
    setColumns([]);
  };

  const handleSubmit = async () => {
    if (!fileList.length) {
      message.warning("Please select an Excel file first");
      return;
    }

    const formData = new FormData();
    formData.append("file", fileList[0].originFileObj as File);

    try {
      await createBulkUploads(formData).unwrap();
      message.success("Assets uploaded successfully");
      handleClose();
    } catch (err) {
      console.error(err);
      message.error("Error uploading file");
    }
  };

  const handleClose = () => {
    closeModal();
    handleRemoveFile();
  };

  return (
    <CustomModal
      title={"Add Multiple Assets"}
      icon={LaptopPhoneSyncFreeIcons}
      okText={"Upload Assets"}
      onOk={handleSubmit}
      onCancel={handleClose}
      loading={isLoading}
      // width={}
    >
      <div className="space-y-4">
        <Alert
          message={
            <p className="font-semibold text-sm">
              Ensure Excel file includes the following columns with{" "}
              <span className="text-red-500">matching case</span>:
            </p>
          }
          description={
            <p className="flex gap-y-1 flex-wrap">
              {REQUIRED_HEADERS.map((h) => (
                <Tag className="!text-sm" key={h.key}>
                  {h.key}
                </Tag>
              ))}
            </p>
          }
          type="info"
          showIcon
          className="!p-3"
        />

        <Dragger
          accept=".xlsx,.xls, .csv"
          beforeUpload={handleExcel}
          fileList={fileList}
          onRemove={handleRemoveFile}
          maxCount={1}
          style={{
            borderRadius: 8,
            padding: "20px 0",
            background: "#fafafa",
            marginTop: 20,
            borderColor: colors.primary,
          }}
        >
          <p className="ant-upload-drag-icon">
            <InboxOutlined style={{ color: "#1890ff" }} />
          </p>
          <p className="ant-upload-text font-semibold">
            Click or drag Excel file to this area to upload
          </p>
          <p className="ant-upload-hint text-gray-500">
            Supports .xlsx and .xls formats. Ensure required columns exist.
          </p>
        </Dragger>

        {dataSource.length > 0 && (
          <div className="overflow-x-auto">
            <Table
              bordered
              dataSource={dataSource}
              columns={columns}
              pagination={false}
              scroll={{ x: "max-content" }}
              style={{ marginTop: 16 }}
            />
          </div>
        )}
      </div>
    </CustomModal>
  );
};

export default BulkAssetUploader;
