import { useState } from "react";
import { Form, Input, Select } from "antd";
import type { UploadFile } from "antd/lib/upload/interface";
import CustomFilePicker from "../../global/CustomFilePicker";
import { CustomModal } from "../../common/CustomModal";
import { FileUploadFreeIcons } from "@hugeicons/core-free-icons";
import { usePopup } from "../../../context/PopupContext";

const { TextArea } = Input;

interface UploadAssetsPaymentReceiptFormValues {
  assetName: string;
  files: UploadFile[];
  note: string;
  confirmation: boolean;
}

const UploadAssetsPaymentReceiptModal = () => {
  const [form] = Form.useForm<UploadAssetsPaymentReceiptFormValues>();
  const [loading, setLoading] = useState(false);
  const { closeModal } = usePopup()

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);
      console.log("Form values:", values);

      
      await new Promise((resolve) => setTimeout(resolve, 1500));

      form.resetFields();
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    closeModal();
  };

  return (
    <CustomModal
      title="Upload Assets Payment Receipt"
      modalSubtitle="If you are unable to return an assigned asset, kindly upload evidence of payment made in-lieu."
      icon={FileUploadFreeIcons}
      width={500}
      okText="Upload Proof"
      onOk={handleOk}
      onCancel={handleCancel}
      loading={loading}
      showConfirmation={true}
      confirmationText="I understand that this action is sensitive and may not be reversible. I confirm that I want to proceed."
      center={true}
    >
      <Form form={form} layout="vertical" className="space-y-2">
        
    
        <Form.Item
          label="Asset Name"
          name="assetName"
          rules={[{ required: true, message: "Please select an asset" }]}
        >
          <Select placeholder="Select asset">
            <Select.Option value="Asset 1">Asset 1</Select.Option>
            <Select.Option value="Asset 2">Asset 2</Select.Option>
          </Select>
        </Form.Item>

        
        <div>
          <h3 className="text-sm font-medium text-gray-700">Upload Files</h3>
          <Form.Item
            name="files"
            rules={[{ required: true, message: "Please upload at least one file" }]}
          >
            <CustomFilePicker maxFiles={10} maxSize={10} />
          </Form.Item>
        </div>

    
        <Form.Item
          label={
            <span>
              Note <span className="text-gray-500">(Optional)</span>
            </span>
          }
          name="note"
        >
          <TextArea
            rows={1}
            placeholder="Type here"
            className="resize-none"
            maxLength={100}
            
          />
        </Form.Item>
      </Form>
    </CustomModal>
  );
};

export default UploadAssetsPaymentReceiptModal;
