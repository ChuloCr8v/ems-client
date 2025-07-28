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
        name: "department",
        required: true,
        options: [
          { label: "Engineering", value: "ENGINEERING" },
          { label: "HR", value: "HR" },
          { label: "Sales", value: "SALES" },
          { label: "Marketing", value: "MARKETING" },
          { label: "Finance", value: "FINANCE" },
        ],
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

const SendInvitation = () => {
  const [form] = Form.useForm();
  const jobType = Form.useWatch("jobType", form);
  const { formItem } = FormItemComponent({ form });
  const [documents, setDocuments] = useState<DocumentEntry[]>([
    { name: "", fileList: [] },
  ]);

  const [sendInvitation, { isLoading }] = useSendInvitationMutation();

  const onSubmit = async () => {
    try {
      const rawValues = await form.validateFields();
      const values = {
        ...rawValues,
        startDate: rawValues.startDate.toISOString(),
      };

      console.log(values);

      const data = new FormData();

      // Append regular form fields
      Object.entries(values).forEach(([key, value]) => {
        data.append(key, value as Blob);
      });

      // Append file data
      documents.forEach((doc, _index) => {
        const rawFile = doc.fileList?.[0]?.originFileObj;

        if (rawFile && doc.name) {
          // const extension = rawFile.name.substring(
          //   rawFile.name.lastIndexOf(".")
          // );
          // const customName = `${doc.name.replace(
          //   /\s+/g,
          //   "_"
          // )}_${Date.now()}${extension}`;
          // const newFile = new File([rawFile], customName, {
          //   type: rawFile.type,
          // });
          // // Append as separate structured keys
          // data.append(`documents[${index}][filename]`, newFile.name);
          // data.append(`documents[${index}][content]`, newFile);
          // data.append(`documents[${index}][contentType]`, newFile.type);
        }
      });

      console.log(data);

      await sendInvitation(data as any).unwrap();

      message.success("Invitation sent successfully");
      form.resetFields();
      setDocuments([{ name: "", fileList: [] }]);
    } catch (err) {
      console.error(err);
      message.error("Submission failed");
    }
  };

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
                    required={item.required}
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
          />
        </div>
      </Form>
    </CustomModal>
  );
};

export default SendInvitation;
