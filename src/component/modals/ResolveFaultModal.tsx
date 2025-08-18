import { Form, message } from "antd";

import { CustomModal } from "../common/CustomModal";
import { ModernTvIssueIcon } from "@hugeicons/core-free-icons";
import type { Asset } from "../../api/types";
import AssetTag from "../global/AssetTag";
import TextArea from "antd/es/input/TextArea";
import { useResolveFaultMutation } from "../../api/data/assets.api";
import { useAuthUser } from "../../hooks/authHooks";
import { usePopup } from "../../context/PopupContext";

const ResolveFaultModal = ({ data }: { data: Asset }) => {
  const user = useAuthUser();
  const [form] = Form.useForm();

  const { closeModal } = usePopup();

  const [resolveFault, { isLoading }] = useResolveFaultMutation();

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();

      const updatedValues = {
        id: data.id,
        resolvedById: user.id,
        notes: values.notes,
      };

      await resolveFault(updatedValues).unwrap();

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
      title="Resolve Fault"
      modalSubtitle="Ensure that all issues has been resolved"
      icon={ModernTvIssueIcon}
      onOk={handleSubmit}
      okText="Resolve Fault"
      center
      loading={isLoading}
      showConfirmation
      confirmationText="I confirm that all faults has been resolved"
    >
      <AssetTag name={data?.name ?? ""} id={data?.assetId ?? ""} />
      <Form form={form} layout="vertical" className="!mt-2 space-y-3">
        <Form.Item name="notes" label="Notes">
          <TextArea />
        </Form.Item>
      </Form>
    </CustomModal>
  );
};

export default ResolveFaultModal;
