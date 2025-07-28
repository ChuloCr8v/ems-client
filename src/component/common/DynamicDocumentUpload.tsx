import { Button, Input, Form, Upload, message, type UploadFile } from "antd";
import {
  Delete02FreeIcons,
  PlusSignCircleIcon,
} from "@hugeicons/core-free-icons";
import Icon from "./Icon";
import { useState } from "react";

export type DocumentEntry = {
  name: string;
  fileList: UploadFile[];
  file?: File;
};

type Props = {
  documents: DocumentEntry[];
  setDocuments: React.Dispatch<React.SetStateAction<DocumentEntry[]>>;
  maxFiles?: number;
};

const DynamicDocumentUpload = ({
  documents,
  setDocuments,
  maxFiles = 5,
}: Props) => {
  const [uploadingIndex, setUploadingIndex] = useState<number | null>(null);

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
    if (documents.length >= maxFiles) {
      message.warning(`Maximum ${maxFiles} documents allowed`);
      return;
    }
    setDocuments([...documents, { name: "", fileList: [], file: undefined }]);
  };

  const removeDocument = (index: number) => {
    try {
      setUploadingIndex(index);
      const updated = [...documents];
      updated.splice(index, 1);
      setDocuments(updated);
    } catch (error) {
      console.error(error);
      message.error("Failed to remove document");
    } finally {
      setUploadingIndex(null);
    }
  };

  const handleUpload = ({ file, onSuccess, onProgress }: any) => {
    setUploadingIndex(
      documents.findIndex((doc) => doc.fileList[0]?.uid === file.uid)
    );

    // Simulate upload progress
    let percent = 0;
    const interval = setInterval(() => {
      percent += 10;
      onProgress?.({ percent }, file);

      if (percent >= 100) {
        clearInterval(interval);
        onSuccess?.("ok");
        setUploadingIndex(null);
      }
    }, 200);
  };

  return (
    <div className="flex flex-col">
      {documents.map((doc, index) => (
        <div key={index} className="flex items-start gap-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
            <Form.Item
              name={["uploads", index, "name"]}
              label="Document Name"
              rules={[{ required: true, message: "Document name is required" }]}
              className="w-full"
            >
              <Input
                placeholder="e.g. Passport, License"
                value={doc.name}
                onChange={(e) => handleChange(index, "name", e.target.value)}
              />
            </Form.Item>

            <Form.Item
              name={["uploads", index, "file"]}
              label="Document File"
              rules={[{ required: true, message: "Please upload a file" }]}
              className="w-full"
            >
              <div className="flex items-center gap-2">
                <Input
                  placeholder="No file selected"
                  readOnly
                  value={doc.fileList[0]?.name || ""}
                  className="flex-1"
                />

                <Upload
                  fileList={doc.fileList}
                  onChange={
                    ({ fileList }) =>
                      handleChange(index, "fileList", fileList.slice(-1)) // Only keep last file
                  }
                  customRequest={handleUpload}
                  beforeUpload={(file) => {
                    const isLt5M = file.size / 1024 / 1024 < 5;
                    if (!isLt5M) {
                      message.error("File must be smaller than 5MB!");
                    }
                    return isLt5M;
                  }}
                  showUploadList={false}
                  maxCount={1}
                >
                  <Button
                    // loading={uploadingIndex === index}
                    className="w-28 h-10 border border-primary text-primary hover:bg-primary/10 overflow-hidden"
                  >
                    {doc.fileList[0]?.percent ? (
                      <div
                        className="absolute bg-green-600/20 bottom-0 left-0 w-full"
                        style={{ height: `${doc.fileList[0].percent}%` }}
                      />
                    ) : undefined}
                    {doc.fileList[0]?.percent ? (
                      <span className="relative z-10">
                        {Math.round(doc.fileList[0].percent)}%
                      </span>
                    ) : (
                      "Browse"
                    )}
                  </Button>
                </Upload>
              </div>
            </Form.Item>
          </div>

          {documents.length > 1 && (
            <Button
              danger
              icon={<Icon icon={Delete02FreeIcons} />}
              onClick={() => removeDocument(index)}
              loading={uploadingIndex === index}
              className="mt-8"
            />
          )}
        </div>
      ))}

      {documents.length < maxFiles && (
        <Button
          type="dashed"
          icon={<Icon icon={PlusSignCircleIcon} />}
          onClick={addDocument}
          className="w-max border-primary text-primary hover:text-primary/80"
        >
          Add Another Document
        </Button>
      )}
    </div>
  );
};

export default DynamicDocumentUpload;
