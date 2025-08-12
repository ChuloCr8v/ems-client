import { Form, Select } from "antd";

import { CustomModal } from "../common/CustomModal";
import { LaptopAddIcon } from "@hugeicons/core-free-icons";
import type { Asset } from "../../api/types";
import { useListUsersQuery } from "../../api/data/users";
import AssetTag from "../global/AssetTag";

const { Option } = Select;

const AssignAssetModal = ({ data }: { data: Asset }) => {
  const [form] = Form.useForm();

  const { data: employees, isLoading } = useListUsersQuery();

  return (
    <CustomModal
      title="Assign Asset"
      icon={LaptopAddIcon}
      onOk={() => form.submit()}
      okText="Assign Asset"
      center
      width={500}
      loading={isLoading}
    >
      <AssetTag name={data?.name ?? ""} id={data?.assetId ?? ""} />
      <Form form={form} layout="vertical" className="!mt-2">
        <Form.Item
          name="assetName"
          label="Employee"
          rules={[{ required: true }]}
        >
          <Select placeholder="Select asset name">
            {employees?.map((d) => (
              <Option value="hp">{d.firstName + " " + d.lastName} </Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </CustomModal>
  );
};

export default AssignAssetModal;
