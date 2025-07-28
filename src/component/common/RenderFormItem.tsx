import type { IconSvgElement } from "@hugeicons/react";
import {
  Button,
  DatePicker,
  Form,
  Input,
  Select,
  type FormInstance,
} from "antd";
import PhoneInput from "antd-phone-input";
import { useState } from "react";
import type { JobType } from "../../api/types";
import DynamicDocumentUpload, {
  type DocumentEntry,
} from "./DynamicDocumentUpload";
import Icon from "./Icon";
import MultiUpload from "./MultiUploads";

const { Option } = Select;

export type MenuItemProps = {
  label: string;
  name?: string;
  options?: {
    label: string;
    value: string;
  }[];
  type: string;
  icon?: IconSvgElement;
  placeholder?: string;
};

type Props = {
  form: FormInstance<any>;
};

const FormItemComponent = ({ form }: Props) => {
  const [documents, setDocuments] = useState<DocumentEntry[] | []>([]);
  const jobType = Form.useWatch("jobType", form);

  console.log(jobType);

  const handleJobTypeChange = (value: JobType) => {
    form.setFieldsValue({ jobType: value });
  };

  const formItem = (item: MenuItemProps) => {
    switch (item.type) {
      case "text":
      case "email":
        return (
          <Input
            type={item.type}
            prefix={
              item.icon ? (
                <Icon icon={item.icon} size={14} color="#c8d1ce" />
              ) : undefined
            }
            placeholder={item.placeholder}
          />
        );
      case "number":
        return (
          <Input
            type="number"
            prefix={
              item.icon ? (
                <Icon icon={item.icon} size={14} color="#c8d1ce" />
              ) : undefined
            }
            placeholder={item.placeholder}
          />
        );
      case "phone":
        return <PhoneInput enableSearch />;
      case "date":
        return <DatePicker className="w-full" />;
      case "dynamic-documents":
        return (
          <DynamicDocumentUpload
            documents={documents}
            setDocuments={setDocuments}
          />
        );
      case "select":
        return (
          <Select
            prefix={
              item.icon ? (
                <Icon icon={item.icon} size={14} color="#c8d1ce" />
              ) : undefined
            }
            placeholder={`Select ${item.label.toLowerCase()}`}
            onChange={item.name === "jobType" ? handleJobTypeChange : undefined}
          >
            {item.options?.map((opt: { label: string; value: string }) => (
              <Option key={opt.value} value={opt.value}>
                {opt.label}
              </Option>
            ))}
          </Select>
        );
      case "file":
        return <MultiUpload label={item.label} />;
      case "button":
        return (
          <Button
            type="dashed"
            icon={item.icon ? <Icon icon={item.icon} size={16} /> : undefined}
          >
            {item.label}
          </Button>
        );
      default:
        return <Input placeholder={item.placeholder} />;
    }
  };

  return { formItem };
};

export default FormItemComponent;
