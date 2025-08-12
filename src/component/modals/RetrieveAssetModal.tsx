import { Form } from "antd";

import { CustomModal } from "../common/CustomModal";
import { ArrowReloadHorizontalIcon } from "@hugeicons/core-free-icons";
import type { Asset } from "../../api/types";
import AssetTag from "../global/AssetTag";
import TextArea from "antd/es/input/TextArea";

const RetrieveAssetModal = ({ data }: { data: Asset }) => {
  const [form] = Form.useForm();

  return (
    <CustomModal
      title="Retrieve Asset"
      icon={ArrowReloadHorizontalIcon}
      //   onOk={() => form.submit()}
      okText="Confirm Retrieval"
      center
    >
      <AssetTag name={data?.name ?? ""} id={data?.assetId ?? ""} />
      <Form form={form} layout="vertical" className="!mt-2">
        <Form.Item name="note" label="Note">
          <TextArea />
        </Form.Item>
      </Form>
    </CustomModal>
  );
};

export default RetrieveAssetModal;
