import {
  AiPhone01FreeIcons,
  Briefcase03Icon,
  Building03Icon,
  Calendar02Icon,
  Clock02Icon,
  Layers01Icon,
  Mail01FreeIcons,
  User03FreeIcons,
  UserAdd01Icon,
  UserGroupIcon,
} from "@hugeicons/core-free-icons";
import { Form, message } from "antd";
import { useState } from "react";
import { twMerge } from "tailwind-merge";
import { useSendInvitationMutation } from "../../api/data/invitations.api";
import { JobType } from "../../api/types";
import { CustomModal } from "../common/CustomModal";
import DynamicDocumentUpload, {
  type DocumentEntry,
} from "../common/DynamicDocumentUpload";
import FormItemComponent from "../common/RenderFormItem";
import { useListDepartmentsQuery } from "../../api/data/departments.api";
import { usePopup } from "../../context/PopupContext";

const SendInvitation = () => {
  const [form] = Form.useForm();
  const jobType = Form.useWatch("jobType", form);
  const { formItem } = FormItemComponent({ form });
  const [documents, setDocuments] = useState<DocumentEntry[]>([
    { name: "", fileList: [], file: undefined },
  ]);
  const { closeModal } = usePopup();

  const { data: departments } = useListDepartmentsQuery();

  const [sendInvitation, { isLoading }] = useSendInvitationMutation();

  const onSubmit = async () => {
    const allFiles = documents
      .flatMap((doc) => doc.fileList.map((file) => file.originFileObj))
      .filter(Boolean);

    try {
      const rawValues = await form.validateFields();
      const values = {
        ...rawValues,
        startDate: rawValues.startDate.toISOString(),
        phone: "+" + rawValues.phone.countryCode + rawValues.phone.phoneNumber,
      };

      const formData = new FormData();

      for (const key in values) {
        formData.append(key, values[key]);
      }

      allFiles.forEach((file, _index) => {
        formData.append(`uploads`, file as Blob);
      });

      await sendInvitation(formData).unwrap();

      message.success("Invitation sent successfully");
      form.resetFields();
      setDocuments([{ name: "", fileList: [] }]);
      closeModal();
    } catch (err: any) {
      console.error(err);
      message.error("Unable to submit data");
    }
  };

  const formSections = [
    {
      sectionTitle: "Personal Information",
      formItems: [
        {
          label: "First Name",
          type: "text",
          icon: User03FreeIcons,
          placeholder: "Enter first name",
          name: "firstName",
          required: true,
        },
        {
          label: "Last Name",
          type: "text",
          icon: User03FreeIcons,
          placeholder: "Enter last name",
          name: "lastName",
          required: true,
        },
        {
          label: "Email",
          type: "email",
          icon: Mail01FreeIcons,
          placeholder: "Enter email",
          name: "email",
          required: true,
        },
        {
          label: "Phone Number",
          type: "phone",
          icon: AiPhone01FreeIcons,
          placeholder: "Enter mobile number",
          name: "phone",
          required: true,
        },
        {
          label: "Gender",
          type: "select",
          icon: UserGroupIcon,
          name: "gender",
          required: true,
          options: [
            { label: "Male", value: "MALE" },
            { label: "Female", value: "FEMALE" },
            { label: "Other", value: "OTHER" },
          ],
        },
      ],
    },
    {
      sectionTitle: "Employment Details",
      formItems: [
        {
          label: "Role",
          type: "text",
          icon: Briefcase03Icon,
          placeholder: "e.g. Software Developer",
          name: "role",
          required: true,
        },
        {
          label: "Department",
          type: "select",
          icon: Building03Icon,
          name: "departmentId",
          required: true,
          options: departments?.map((item) => ({
            label:
              item.name.charAt(0).toUpperCase() +
              item.name.slice(1).toLowerCase(),
            value: item.id,
          })),
        },
        {
          label: "Job Type",
          type: "select",
          icon: Layers01Icon,
          name: "jobType",
          required: true,
          options: [
            { label: "Full-Time", value: JobType.FULLTIME },
            { label: "Contract", value: JobType.CONTRACT },
          ],
        },
        {
          label: "Duration (in months)",
          type: "number",
          icon: Clock02Icon,
          name: "duration",
          required: true,
          placeholder: "Enter contract duration",
        },
        {
          label: "Start Date",
          type: "date",
          icon: Calendar02Icon,
          name: "startDate",
          required: true,
        },
      ],
    },
  ];

  return (
    <CustomModal
      title="Send Invitation"
      modalSubtitle="Fill out basic info to send an onboarding link via email."
      icon={UserAdd01Icon}
      okText="Send Invite"
      onOk={onSubmit}
      loading={isLoading}
    >
      <Form layout="vertical" form={form}>
        {formSections.map((section, idx) => (
          <div key={idx} className="mb-4">
            <p className="text-gray text-sm mb-2">{section.sectionTitle}</p>
            <div className={twMerge("grid grid-cols-1 md:grid-cols-2 gap-x-3")}>
              {section.formItems.map((item, index) => {
                if (item.name === "duration" && jobType !== JobType.CONTRACT) {
                  return null;
                }

                return (
                  <Form.Item
                    key={`${idx}-${index}`}
                    label={item.label}
                    name={item.name}
                    rules={[
                      {
                        required: item.required,
                        message: `${item.label} is required`,
                      },
                    ]}
                    className="w-full"
                  >
                    {formItem(item)}
                  </Form.Item>
                );
              })}
            </div>
          </div>
        ))}

        <div className="mb-4">
          <p className="text-gray text-sm mb-2">Attachments</p>
          <DynamicDocumentUpload
            documents={documents}
            setDocuments={setDocuments}
            form={form}
          />
        </div>
      </Form>
    </CustomModal>
  );
};

export default SendInvitation;
