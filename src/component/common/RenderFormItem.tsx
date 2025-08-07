import type { IconSvgElement } from "@hugeicons/react";
import { Button, DatePicker, Input, Select, type FormInstance } from "antd";
import PhoneInput from "antd-phone-input";
import { useState, type ReactNode } from "react";
import type { JobType } from "../../api/types";
import DynamicDocumentUpload, {
  type DocumentEntry,
} from "./DynamicDocumentUpload";
import Icon from "./Icon";
import MultiUpload from "./MultiUploads";
import CustomFilePicker from "../global/CustomFilePicker";
import type { Dayjs } from "dayjs";

const { Option } = Select;

export type FormFieldProps = {
  minDate?: Dayjs;
  indexName?: string;
  label: string;
  name?: string;
  disabled?: boolean;
  value?: ReactNode;
  required?: boolean;
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

  const handleJobTypeChange = (value: JobType) => {
    form.setFieldsValue({ jobType: value });
  };

  const formItem = (item: FormFieldProps) => {
    switch (item.type) {
      case "text":
      case "email":
        return (
          <Input
            type={item.type}
            prefix={
              item.icon ? (
                <Icon icon={item.icon} size={16} color="#c8d1ce" />
              ) : undefined
            }
            placeholder={item.placeholder}
            allowClear
          />
        );
      case "number":
        return (
          <Input
            type="number"
            prefix={
              item.icon ? (
                <Icon icon={item.icon} size={16} color="#c8d1ce" />
              ) : undefined
            }
            placeholder={item.placeholder}
            allowClear
          />
        );
      case "phone":
        return <PhoneInput enableSearch />;
      case "date":
        return (
          <DatePicker className="w-full" minDate={item.minDate ?? undefined} />
        );
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
            allowClear
            prefix={
              item.icon ? (
                <Icon icon={item.icon} size={16} color="#c8d1ce" />
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
      case "file-picker":
        return <CustomFilePicker />;
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
