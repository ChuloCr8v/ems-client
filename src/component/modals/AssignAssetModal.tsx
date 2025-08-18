import { Form, message, Select } from "antd";

import { CustomModal } from "../common/CustomModal";
import { LaptopAddIcon } from "@hugeicons/core-free-icons";
import type { Asset } from "../../api/types";
import { useListUsersQuery } from "../../api/data/users";
import AssetTag from "../global/AssetTag";
import TextArea from "antd/es/input/TextArea";
import { useAssignAssetMutation } from "../../api/data/assets.api";
import { usePopup } from "../../context/PopupContext";

const { Option } = Select;

const AssignAssetModal = ({ data }: { data: Asset }) => {
  const [form] = Form.useForm();
  const { closeModal } = usePopup();

  const [assignAsset, { isLoading: addingAsset }] = useAssignAssetMutation();

  const { data: employees, isLoading } = useListUsersQuery();

  const id = data?.id;

  const handleAssignAsset = async () => {
    try {
      const values = await form.validateFields();
      const updatedData = { ...values, id };
      console.log(updatedData);
      await assignAsset(updatedData).unwrap();
      message.success("Asset Assigned");
      closeModal();
    } catch (error) {
      console.log(error);
      message.error("Error");
    }
  };

  return (
    <CustomModal
      title="Assign Asset"
      icon={LaptopAddIcon}
      onOk={handleAssignAsset}
      okText="Assign Asset"
      center
      width={500}
      loading={isLoading || addingAsset}
    >
      <AssetTag name={data?.name ?? ""} id={data?.assetId ?? data?.serialNo} />
      <Form form={form} layout="vertical" className="!mt-2">
        <Form.Item name="userId" label="Employee" rules={[{ required: true }]}>
          <Select placeholder="Select user">
            {employees?.map((d) => (
              <Option value={d.id}>{d.firstName + " " + d.lastName} </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="notes" label="Note">
          <TextArea placeholder="Note (Optional)" />
        </Form.Item>
      </Form>
    </CustomModal>
  );
};

export default AssignAssetModal;
