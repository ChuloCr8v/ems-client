import { Form } from "antd";

import { CustomModal } from "../common/CustomModal";
import { ModernTvIssueIcon } from "@hugeicons/core-free-icons";
import type { Asset } from "../../api/types";
import AssetTag from "../global/AssetTag";
import TextArea from "antd/es/input/TextArea";
import CustomFilePicker from "../global/CustomFilePicker";

const ReportFaultModal = ({ data }: { data: Asset }) => {
  const [form] = Form.useForm();

  return (
    <CustomModal
      title="Report Fault"
      icon={ModernTvIssueIcon}
      //   onOk={() => form.submit()}
      okText="Confirm Retrieval"
      center
    >
      <AssetTag name={data?.name ?? ""} id={data?.assetId ?? ""} />
      <Form form={form} layout="vertical" className="!mt-2 space-y-3">
        <Form.Item name="description" label="Describe the issue">
          <TextArea />
        </Form.Item>
        <Form.Item name="description" label="Upload Files (Optional)">
          <CustomFilePicker />
        </Form.Item>
      </Form>
    </CustomModal>
  );
};

export default ReportFaultModal;
