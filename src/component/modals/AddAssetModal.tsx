import { Form, message } from "antd";
import { CustomModal } from "../common/CustomModal";
import { useForm } from "antd/es/form/Form";
import FormItemComponent from "../common/RenderFormItem";
import { twMerge } from "tailwind-merge";
import { LaptopAddIcon } from "@hugeicons/core-free-icons";
import {
  useCreateAssetMutation,
  useFindAssetQuery,
} from "../../api/data/assets.api";
import { usePopup } from "../../context/PopupContext";
import { useEffect } from "react";
import dayjs from "dayjs";
import { useUploader } from "../../context/UploadContext";

const AddAssetModal = ({ id }: { id?: string }) => {
  const [form] = useForm();
  const uploader = useUploader();

  const { data: asset, isLoading: isQueryLoading } = useFindAssetQuery(
    id ?? "",
    {
      skip: !id,
    }
  );

  // Fixed useEffect to prevent infinite loops
  useEffect(() => {
    if (!asset) return;

    // Initialize uploader with existing files
    const uploads = [
      ...asset.images.map((img, index) => ({
        id: img.id,
        url: img.url,
        order: index,
      })),
      ...(asset.barcode
        ? [
            {
              id: asset.barcode.id,
              url: asset.barcode.url,
              order: asset.images.length,
            },
          ]
        : []),
    ];

    uploader.addExistingUploads(uploads);

    // Set form values - fixed field name to match formFields
    form.setFieldsValue({
      assetImage: asset.images.map((a) => a.id),
      barcodeImage: asset.barcode ? [asset.barcode.id] : [], // Changed to match form field name
      name: asset.name ?? "",
      serialNumber: asset.serialNumber ?? "",
      category: asset.category ?? "",
      purchaseDate: dayjs(asset.purchaseDate),
      vendor: asset.vendor,
      cost: asset.cost,
      description: asset.description,
    });
  }, [asset]); // Removed uploader from dependencies

  const { closeModal } = usePopup();
  const [createAsset, { isLoading }] = useCreateAssetMutation();

  const formFields = [
    {
      label: "Asset image (Max 3)",
      required: true,
      type: "file",
      name: "assetImage",
    },
    {
      label: "Barcode Image (Optional)",
      required: false,
      type: "file",
      name: "barcodeImage", // This now matches the form.setFieldsValue key
    },
    {
      label: "Asset Name",
      required: true,
      type: "text",
      name: "name",
    },
    {
      label: "Serial Number",
      required: true,
      type: "text",
      name: "serialNumber",
    },
    {
      label: "Category",
      required: true,
      type: "select",
      name: "category",
      options: [
        {
          label: "Hardware",
          value: "HARDWARE",
        },
        {
          label: "Accessory",
          value: "ACCESSORY",
        },
        {
          label: "Logistics",
          value: "LOGISTICS",
        },
        {
          label: "Safety Kits",
          value: "SAFETYEKITS",
        },
      ],
    },
    {
      label: "Purchase Date",
      required: true,
      type: "date",
      name: "purchaseDate",
    },
    {
      label: "Vendor",
      required: false,
      type: "text",
      name: "vendor",
    },
    {
      label: "Cost",
      required: true,
      type: "number",
      name: "cost",
    },
    {
      label: "Description",
      required: false,
      type: "textArea",
      name: "description",
    },
  ];

  const { formItem } = FormItemComponent({
    form,
  });

  const handleAddAsset = async () => {
    try {
      const values = await form.validateFields();
      await createAsset(values).unwrap();
      message.success("Asset created successfully");
      closeModal();
    } catch (error: any) {
      console.error("Error creating asset:", error);
      message.error(
        error?.data?.message || "Error creating asset. Please try again."
      );
    }
  };

  const handleClose = () => {
    form.resetFields();
    uploader.cleanup();
    closeModal();
  };

  return (
    <CustomModal
      title={id ? "Edit Asset" : "Add Asset"}
      icon={LaptopAddIcon}
      okText={id ? "Update Asset" : "Add Asset"}
      onOk={handleAddAsset}
      onCancel={handleClose}
      loading={isLoading || isQueryLoading}
    >
      <Form form={form} layout="vertical" className="space-y-4">
        <div className="space-y-6 gap-x-3 lg:max-h-[450px] h-full overflow-auto grid grid-cols-2">
          {formFields.map((item) => (
            <Form.Item
              label={item.label}
              name={item.name}
              rules={[
                {
                  required: item.required,
                  message: `${item.label} is required`,
                },
              ]}
              key={item.name} // Changed to use name as key for better stability
              className={twMerge(
                ["description", "assetImage", "barcodeImage"].includes(
                  item.name
                ) && "col-span-2"
              )}
            >
              {formItem(item)}
            </Form.Item>
          ))}
        </div>
      </Form>
    </CustomModal>
  );
};

export default AddAssetModal;
