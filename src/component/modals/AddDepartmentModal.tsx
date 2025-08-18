import { Form, message } from "antd";
import { CustomModal } from "../common/CustomModal";
import { useForm } from "antd/es/form/Form";
import FormItemComponent from "../common/RenderFormItem";
import { PlusSignCircleFreeIcons } from "@hugeicons/core-free-icons";
import { useUpdateAssetMutation } from "../../api/data/assets.api";
import { usePopup } from "../../context/PopupContext";
import { useEffect } from "react";
import { fullName } from "../../helpers";
import { useListUsersQuery } from "../../api/data/users";
import {
  useCreateDepartmentMutation,
  useFindDepartmentQuery,
} from "../../api/data/departments.api";
import { useAuthUser } from "../../hooks/authHooks";

const AddDepartmentModal = ({ id }: { id?: string }) => {
  const { closeModal } = usePopup();
  const [createDepartment, { isLoading }] = useCreateDepartmentMutation();
  const [updateAsset, { isLoading: updatingAsset }] = useUpdateAssetMutation();

  const user = useAuthUser();

  const { data: employees, isLoading: gettingEmployees } = useListUsersQuery();

  const [form] = useForm();

  const { data: department, isLoading: isQueryLoading } =
    useFindDepartmentQuery(id ?? "", {
      skip: !id,
    });

  useEffect(() => {
    if (!department) return;
    (async () => {
      form.setFieldsValue({
        departmentName: department.name,
        departementHead: department.head,
        description: department.description,
      });
    })();
  }, [department]);

  const formFields = [
    {
      label: "Department Name",
      required: true,
      type: "text",
      name: "name",
    },
    {
      label: "Department Head",
      required: false,
      type: "select",
      name: "departmentHead",
      options: employees?.map((e) => ({
        label: fullName(e),
        value: e.id,
      })),
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

  console.log(department);

  const handleAddDepartment = async () => {
    try {
      const values = await form.validateFields();

      const upatedData = {
        ...values,
        createdBy: user?.id ?? "",
      };

      id
        ? await updateAsset({ id: id ?? "", body: upatedData }).unwrap()
        : await createDepartment(upatedData).unwrap();

      message.success(
        id
          ? "Department updated successfully"
          : "Department created successfully"
      );
      closeModal();
    } catch (error: any) {
      console.error("Error creating asset:", error);
      message.error(
        error?.data?.message || "Error creating department. Please try again."
      );
    }
  };

  const handleClose = () => {
    form.resetFields();
    closeModal();
  };

  return (
    <CustomModal
      title={id ? "Edit Department" : "Add Department"}
      modalSubtitle="Define a new department within your organization."
      icon={PlusSignCircleFreeIcons}
      okText={id ? "Update Department" : "Add Department"}
      onOk={handleAddDepartment}
      onCancel={handleClose}
      loading={isLoading || isQueryLoading || updatingAsset || gettingEmployees}
      width={500}
    >
      <Form form={form} layout="vertical" className="space-y-4">
        <div className="space-y-6 gap-x-3 lg:max-h-[450px] h-full overflow-auto">
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
            >
              {formItem(item)}
            </Form.Item>
          ))}
        </div>
      </Form>
    </CustomModal>
  );
};

export default AddDepartmentModal;
