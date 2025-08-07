import {
  Clock02Icon,
  UserCheck01Icon,
  Building03Icon,
  CalendarCheckIn02Icon,
  Mail01Icon,
  AiPhoneIcon,
  Shield01Icon,
  Chart01Icon,
  UserAccountIcon,
} from "@hugeicons/core-free-icons";
import { Form, Input, message, Tag } from "antd";
import { useForm } from "antd/es/form/Form";
import { twMerge } from "tailwind-merge";
import { JobType, Role } from "../../api/types";
import { CustomModal } from "../common/CustomModal";
import Icon from "../common/Icon";
import FormItemComponent from "../common/RenderFormItem";
import ProfileCard from "../ProfileCard";
import { useEffect } from "react";
import {
  useApproveProspectMutation,
  useGetInviteQuery,
} from "../../api/data/invitations.api";
import { useListDepartmentsQuery } from "../../api/data/departments.api";
import { sentenceCase } from "../../helpers";
import { usePopup } from "../../context/PopupContext";
import { useListLevelsQuery } from "../../api/data/levels.api";

type Props = {
  id: string;
};

const ApproveEmployee = ({ id }: Props) => {
  const [form] = useForm();
  const { formItem } = FormItemComponent({ form });
  const { data: depts, isLoading: loadingDept } = useListDepartmentsQuery();
  const { closeModal } = usePopup();
  const [approveProspect, { isLoading: approvingProspect }] =
    useApproveProspectMutation();

  const { data: user, isLoading } = useGetInviteQuery(id ?? "");
  const { data: levels, isLoading: gettingLevels } = useListLevelsQuery();

  const jobType =
    Form.useWatch("jobType", form) ?? form.getFieldValue("jobType");

  useEffect(() => {
    if (user) {
      form.setFieldsValue({
        jobType: user?.jobType || "",
        department: user?.departmentId || "",
      });
    }
  }, [user, form]);

  const formData = [
    {
      sectionTitle: "Employment Details",
      formItems: [
        {
          label: "Employee Id",
          name: "eId",
          type: "text",
          required: true,
          icon: UserAccountIcon,
          placeholder: "Enter employee id",
        },
        {
          label: "Role",
          name: "userRole",
          type: "select",
          required: true,
          icon: Shield01Icon,
          options: Object.values(Role).map((role) => ({
            label: sentenceCase(role ?? ""),
            value: role,
          })),
        },
        {
          label: "Department",
          name: "department",
          type: "select",
          required: true,
          icon: Building03Icon, // Represents a department/organization
          options: depts?.map((d) => ({
            label: sentenceCase(d.name),
            value: d.id,
          })),
        },
        {
          label: "Job Type",
          type: "select",
          name: "jobType",
          required: true,
          icon: CalendarCheckIn02Icon, // Represents employment period/status
          options: [
            { label: "Full-Time", value: JobType.FULLTIME },
            { label: "Contract", value: JobType.CONTRACT },
          ],
        },
        {
          label: "Level",
          type: "select",
          name: "levelId",
          required: true,
          icon: Chart01Icon, // Represents employment period/status
          options: levels?.map((d) => ({
            label: sentenceCase(d.name),
            value: d.id,
          })),
        },
      ],
    },
    {
      sectionTitle: "Additional Information",
      formItems: [
        {
          label: "Work Email",
          name: "email",
          type: "email",
          required: true,
          icon: Mail01Icon, // Represents email
        },
        {
          label: "Work Phone Number",
          name: "workPhone",
          type: "phone",
          required: true,
          icon: AiPhoneIcon, // Represents phone contact
        },
      ],
    },
  ];
  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();

      const updatedData = {
        ...values,
        workPhone: `${values.workPhone.countryCode}${values.workPhone.areaCode}${values.workPhone.phoneNumber}`,
        id: user?.user.id,
      };
      await approveProspect(updatedData).unwrap();
      message.success("Prospect approved successfully");

      closeModal();
    } catch (error) {
      console.log(error);
      message.error("Error.Try again");
    }
  };

  return (
    <CustomModal
      title="Approve Employee"
      modalSubtitle="By approving this employee, they will be officially added to the EMS system and will receive login credentials via their work email."
      icon={UserCheck01Icon}
      okText="Approve Employee"
      loading={isLoading || loadingDept || approvingProspect || gettingLevels}
      onOk={handleSubmit}
    >
      <div className="!space-y-4">
        <Tag color="green" className="w-full !p-3 !rounded-lg">
          <ProfileCard
            firstName={user?.firstName ?? ""}
            lastName={user?.lastName ?? ""}
            email={user?.email ?? ""}
          />
        </Tag>

        <Form form={form} layout="vertical">
          {formData.map((section, sIdx) => (
            <div key={sIdx} className="mb-4">
              <p className="text-gray text-sm mb-2">{section.sectionTitle}</p>

              <div className={twMerge("grid grid-cols-2 gap-x-3")}>
                {section.formItems.map((item, iIdx) => {
                  if (
                    "name" in item &&
                    item.name === "duration" &&
                    jobType !== JobType.CONTRACT
                  )
                    return null;

                  return (
                    <Form.Item
                      key={`${sIdx}-${iIdx}`}
                      label={item.label}
                      name={item.name}
                      required={item?.required ?? false}
                    >
                      {formItem(item)}
                    </Form.Item>
                  );
                })}

                {section.sectionTitle === "Employment Details" &&
                  jobType === JobType.CONTRACT && (
                    <Form.Item
                      label="Duration (in months)"
                      name="duration"
                      rules={[
                        {
                          required: true,
                          message: "Duration is required for contracts",
                        },
                      ]}
                    >
                      <Input
                        type="number"
                        prefix={
                          <Icon icon={Clock02Icon} size={14} color="#c8d1ce" />
                        }
                        placeholder="Enter duration in months"
                      />
                    </Form.Item>
                  )}
              </div>
            </div>
          ))}
        </Form>
      </div>
    </CustomModal>
  );
};

export default ApproveEmployee;
