import { Form, message, type UploadFile } from "antd";
import { CustomModal } from "../common/CustomModal";
import { useForm } from "antd/es/form/Form";
import FormItemComponent from "../common/RenderFormItem";
import { twMerge } from "tailwind-merge";
import { LaptopAddIcon } from "@hugeicons/core-free-icons";
import {
  useCreateAssetMutation,
  useFindAssetQuery,
  useUpdateAssetMutation,
} from "../../api/data/assets.api";
import { usePopup } from "../../context/PopupContext";
import { useEffect } from "react";
import dayjs from "dayjs";
import { useUploader } from "../../context/UploadContext";
import { LocalFilePicker } from "../common/LocalFilePicker";
import { generateQrFile, parseImageDataToFile } from "../../helpers";

const AddAssetModal = ({ id }: { id?: string }) => {
  const { closeModal } = usePopup();
  const [createAsset, { isLoading }] = useCreateAssetMutation();
  const [updateAsset, { isLoading: updatingAsset }] = useUpdateAssetMutation();

  const [form] = useForm();
  const uploader = useUploader();

  const { data: asset, isLoading: isQueryLoading } = useFindAssetQuery(
    id ?? "",
    {
      skip: !id,
    }
  );

  useEffect(() => {
    if (!asset) return;

    (async () => {
      const assetImageFiles = await parseImageDataToFile(asset.assetImage);
      const barcodeImageFiles = await parseImageDataToFile(asset.barcodeImage);

      form.setFieldsValue({
        assetImage: assetImageFiles,
        barcodeImage: barcodeImageFiles,
        name: asset.name ?? "",
        serialNo: asset.serialNo ?? "",
        category: asset.category ?? "",
        purchaseDate: dayjs(asset.purchaseDate),
        vendor: asset.vendor,
        cost: asset.cost,
        description: asset.description,
      });
    })();
  }, [asset]);

  const formFields = [
    {
      label: "Asset image (Max 3)",
      required: true,
      type: "file",
      name: "assetImage",
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
      name: "serialNo",
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

  console.log(asset);

  const handleAddAsset = async () => {
    try {
      const values = await form.validateFields();

      // Create FormData instance
      const formData = new FormData();

      // Append asset images
      if (Array.isArray(values.assetImage)) {
        values.assetImage.forEach((file: UploadFile) => {
          if (file.originFileObj) {
            formData.append("assetImage", file.originFileObj as File);
          }
        });
      }

      // Append barcode images (optional)
      const qrFile = await generateQrFile(values.serialNo);
      formData.append("barcodeImage", qrFile);

      // return;

      // Append other fields
      Object.entries(values).forEach(([key, value]) => {
        if (["assetImage", "barcodeImage"].includes(key)) return; // already handled

        if (dayjs.isDayjs(value)) {
          formData.append(key, value.format("YYYY-MM-DD"));
        } else if (value !== undefined && value !== null) {
          formData.append(key, value as Blob);
        }
      });

      // Send using FormData
      id
        ? await updateAsset({ id: id ?? "", body: formData }).unwrap()
        : await createAsset(formData).unwrap();

      message.success(
        id ? "Asset updated successfully" : "Asset created successfully"
      );
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
      loading={isLoading || isQueryLoading || updatingAsset}
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
              key={item.name}
              className={twMerge(
                ["description", "assetImage", "barcodeImage"].includes(
                  item.name
                ) && "col-span-2"
              )}
            >
              {["barcodeImage", "assetImage"].includes(item.name) ? (
                <LocalFilePicker mode={asset ? "EDIT" : "CREATE"} />
              ) : (
                formItem(item)
              )}
            </Form.Item>
          ))}
        </div>
      </Form>
    </CustomModal>
  );
};

export default AddAssetModal;
