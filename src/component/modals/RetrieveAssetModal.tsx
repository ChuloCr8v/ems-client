import { Form, message } from "antd";

import { CustomModal } from "../common/CustomModal";
import { ArrowReloadHorizontalIcon } from "@hugeicons/core-free-icons";
import type { Asset } from "../../api/types";
import AssetTag from "../global/AssetTag";
import TextArea from "antd/es/input/TextArea";
import { useRetrieveAssetMutation } from "../../api/data/assets.api";
import { useAuthUser } from "../../hooks/authHooks";
import { usePopup } from "../../context/PopupContext";

const RetrieveAssetModal = ({ data }: { data: Asset }) => {
  const [form] = Form.useForm();
  const user = useAuthUser();

  const { closeModal } = usePopup();

  const [retrieveAsset, { isLoading }] = useRetrieveAssetMutation();

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();

      const updatedData = {
        assetId: data.id,
        retrievedById: user?.id,
        notes: values.notes,
      };
      await retrieveAsset(updatedData).unwrap();
      message.success("Asset retrved Successfully");
      closeModal();
    } catch (error) {
      console.log(error);
      message.error("Failed");
    }
  };

  return (
    <CustomModal
      title="Retrieve Asset"
      icon={ArrowReloadHorizontalIcon}
      onOk={handleSubmit}
      okText="Confirm Retrieval"
      center
      loading={isLoading}
    >
      <AssetTag name={data?.name ?? ""} id={data?.assetId ?? ""} />
      <Form form={form} layout="vertical" className="!mt-2">
        <Form.Item name="notes" label="Note">
          <TextArea />
        </Form.Item>
      </Form>
    </CustomModal>
  );
};

export default RetrieveAssetModal;
