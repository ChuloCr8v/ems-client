import {
  Clock02Icon,
  UserCheck01Icon,
  Briefcase01Icon,
  Building03Icon,
  CalendarCheckIn02Icon,
  Mail01Icon,
  AiPhoneIcon,
  Shield01Icon,
  Chart01Icon,
} from "@hugeicons/core-free-icons";
import { Form, Input, Tag } from "antd";
import { useForm } from "antd/es/form/Form";
import { twMerge } from "tailwind-merge";
import { JobType } from "../../api/types";
import { employeeData } from "../../views/employees/Employees";
import { CustomModal } from "../common/CustomModal";
import Icon from "../common/Icon";
import FormItemComponent from "../common/RenderFormItem";
import ProfileCard from "../ProfileCard";
import { useEffect } from "react";

type Props = {
  id: string;
};

const formData = [
  {
    sectionTitle: "Employment Details",
    formItems: [
      {
        label: "Role",
        name: "userRole",
        type: "text",
        icon: Briefcase01Icon, // Represents a job role or position
      },
      {
        label: "Department",
        name: "department",
        type: "select",
        icon: Building03Icon, // Represents a department/organization
        options: [
          {
            value: "1",
            label: "Products & Services",
          },
          {
            value: "2",
            label: "Marketing",
          },
          {
            value: "3",
            label: "HR",
          },
        ],
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
        name: "level",
        required: true,
        icon: Chart01Icon, // Represents employment period/status
        options: [
          { label: "Junior Officer", value: "juniorOfficer" },
          { label: "Senior Officer", value: "seniorOfficer" },
        ],
      },
    ],
  },
  {
    sectionTitle: "Additional Information",
    formItems: [
      {
        label: "Work Email",
        name: "workEmail",
        type: "email",
        icon: Mail01Icon, // Represents email
      },
      {
        label: "Work Phone Number",
        name: "workPhone",
        type: "phone",
        icon: AiPhoneIcon, // Represents phone contact
      },
      {
        label: "Assign Role/Permissions",
        name: "role",
        type: "select",
        icon: Shield01Icon, // Represents admin/permissions
        options: [
          {
            label: "Admin",
            value: "ADMIN",
          },
          {
            label: "Super Admin",
            value: "SUPER ADMIN",
          },
        ],
      },
    ],
  },
];

const ApproveEmployee = ({ id }: Props) => {
  const [form] = useForm();
  const { formItem } = FormItemComponent({ form });

  const user = employeeData.find((item) => item.id === id);
  const jobType =
    Form.useWatch("jobType", form) ?? form.getFieldValue("jobType");

  useEffect(() => {
    if (user) {
      form.setFieldsValue({
        userRole: user.userRole,
        jobType: user.jobType,
        workEmail: user.email,
      });
    }
  }, [user, form]);

  return (
    <CustomModal
      title="Approve Employee"
      modalSubtitle="By approving this employee, they will be officially added to the EMS system and will receive login credentials via their work email."
      icon={UserCheck01Icon}
      okText="Approve Employee"
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
                      required={item.required}
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
