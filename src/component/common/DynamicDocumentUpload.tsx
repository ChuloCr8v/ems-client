import { Button, Input, Form, Upload } from "antd";
import {
  Delete02FreeIcons,
  PlusSignCircleIcon,
  Upload01Icon,
} from "@hugeicons/core-free-icons";
import Icon from "./Icon";

export type DocumentEntry = {
  name: string;
  fileList: any[]; // UploadFile[]
};

type Props = {
  documents: DocumentEntry[];
  setDocuments: React.Dispatch<React.SetStateAction<DocumentEntry[]>>;
};

const DynamicDocumentUpload = ({ documents, setDocuments }: Props) => {
  const handleChange = (
    index: number,
    field: keyof DocumentEntry,
    value: any
  ) => {
    const newDocs = [...documents];
    newDocs[index][field] = value;
    setDocuments(newDocs);
  };

  const addDocument = () => {
    setDocuments([...documents, { name: "", fileList: [] }]);
  };

  const removeDocument = (index: number) => {
    const updated = [...documents];
    updated.splice(index, 1);
    setDocuments(updated);
  };

  return (
    <div className="flex flex-col gap-2">
      {documents.map((doc, index) => (
        <div key={index} className="flex items-center gap-2">
          <div className="grid grid-cols-2 gap-3 w-full">
            <Form.Item
              name={["uploads", index, "name"]}
              label="Document Name"
              rules={[{ required: true, message: "Enter document name" }]}
              className="w-full"
            >
              <Input
                placeholder="Document name"
                value={doc.name}
                onChange={(e) => handleChange(index, "name", e.target.value)}
              />
            </Form.Item>

            <Form.Item
              name={["uploads", index, "fileList"]}
              label="Upload Document"
              rules={[{ required: true, message: "Please upload a file" }]}
              className="w-full"
            >
              <Upload
                fileList={doc.fileList}
                onChange={({ fileList }) =>
                  handleChange(index, "fileList", fileList)
                }
                customRequest={({ onSuccess }) =>
                  setTimeout(() => onSuccess?.("ok"), 0)
                }
                beforeUpload={() => false}
              >
                <Button icon={<Icon icon={Upload01Icon} />} className="w-full">
                  Click to Upload
                </Button>
              </Upload>
            </Form.Item>
          </div>

          {documents.length > 1 && (
            <Button
              danger
              icon={<Icon icon={Delete02FreeIcons} />}
              onClick={() => removeDocument(index)}
              className="-mt-1.5"
            />
          )}
        </div>
      ))}

      <div className="flex justify-start items-center mt-2">
        <Button
          icon={<Icon icon={PlusSignCircleIcon} />}
          onClick={addDocument}
          className="!border-primary/40 !text-primary"
        >
          Add Document
        </Button>
      </div>
    </div>
  );
};

export default DynamicDocumentUpload;
