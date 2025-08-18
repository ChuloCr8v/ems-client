import { Form, message } from "antd";

import { CustomModal } from "../common/CustomModal";
import { ModernTvIssueIcon } from "@hugeicons/core-free-icons";
import type { Asset } from "../../api/types";
import AssetTag from "../global/AssetTag";
import TextArea from "antd/es/input/TextArea";
import CustomFilePicker from "../global/CustomFilePicker";
import { useReportFaultMutation } from "../../api/data/assets.api";
import { useAuthUser } from "../../hooks/authHooks";
import { usePopup } from "../../context/PopupContext";

const ReportFaultModal = ({ data }: { data: Asset }) => {
  const user = useAuthUser();
  const [form] = Form.useForm();

  const { closeModal } = usePopup();

  const [reportFault, { isLoading }] = useReportFaultMutation();

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();

      const updatedValues = {
        assetId: data.id,
        reportedBy: user.id,
        notes: values.notes,
      };

      // const formData = new FormData();

      // // Append all non-file fields
      // formData.append("assetId", String(data?.id));
      // formData.append("reportedBy", String(user?.id));
      // formData.append("notes", values.notes || "");

      // // Handle images as an array of files
      // if (values.images && Array.isArray(values.images)) {
      //   for (const file of values.images) {
      //     const actualFile: File = file.originFileObj || file;

      //     // File size validation
      //     if (actualFile.size > 5 * 1024 * 1024) {
      //       message.error(`"${actualFile.name}" exceeds 5MB limit`);
      //       return;
      //     }

      //     // File type validation
      //     if (
      //       !["image/jpeg", "image/png", "image/jpg"].includes(actualFile.type)
      //     ) {
      //       message.error(
      //         `"${actualFile.name}" is not a valid image type (JPEG, PNG, JPG)`
      //       );
      //       return;
      //     }

      //     // Append each file under the same "images" key
      //     formData.append("images", actualFile);
      //   }
      // }

      // Send to API
      await reportFault(updatedValues).unwrap();

      message.success("Fault reported successfully");
      form.resetFields();
      closeModal();
    } catch (error) {
      console.error(error);
      message.error("Failed to report fault");
    }
  };

  return (
    <CustomModal
      title="Report Fault"
      modalSubtitle="Use this form to report the issue so the support or asset team can take action."
      icon={ModernTvIssueIcon}
      onOk={handleSubmit}
      okText="Report Fault"
      center
      loading={isLoading}
    >
      <AssetTag name={data?.name ?? ""} id={data?.assetId ?? ""} />
      <Form form={form} layout="vertical" className="!mt-2 space-y-3">
        <Form.Item name="notes" label="Describe the issue">
          <TextArea />
        </Form.Item>
        <Form.Item name="images" label="Upload Files (Optional)">
          <CustomFilePicker
            listType="picture"
            containerStyle={"grid grid-cols-2"}
          />
        </Form.Item>
      </Form>
    </CustomModal>
  );
};

export default ReportFaultModal;
