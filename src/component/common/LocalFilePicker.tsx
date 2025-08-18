import { useState, useEffect } from "react";
import { Upload, message, Image } from "antd";
import type { UploadProps, UploadFile } from "antd/es/upload/interface";
import { CloseOutlined, EyeOutlined } from "@ant-design/icons";
import { twMerge } from "tailwind-merge";
import Icon from "./Icon";
import { File01Icon } from "@hugeicons/core-free-icons";
import { baseUrl } from "../../api/base";

const { Dragger } = Upload;
const MB = 1024 * 1024;

interface DropperProps {
  value?: UploadFile[]; // ✅ Accept UploadFile[]
  onChange?: (files: UploadFile[]) => void; // ✅ Return UploadFile[]
  className?: string;
  maxSizeMb?: number;
  maxCount?: number;
  accept?: string;
  listType?: UploadProps["listType"];
  mode?: "CREATE" | "EDIT";
}

export const LocalFilePicker = ({
  value = [],
  onChange,
  className,
  maxSizeMb = 10,
  maxCount = 3,
  accept = ".jpg,.jpeg,.png",
  listType = "picture",
  mode = "CREATE",
}: DropperProps) => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  // ✅ Keep in sync with parent
  useEffect(() => {
    setFileList(value);
  }, [value, fileList]);

  const beforeUpload: UploadProps["beforeUpload"] = (file) => {
    if (maxSizeMb && file.size > maxSizeMb * MB) {
      message.error(`File size cannot exceed ${maxSizeMb}MB`);
      return Upload.LIST_IGNORE;
    }
    if (!file.type.startsWith("image/")) {
      message.error("You can only upload image files!");
      return Upload.LIST_IGNORE;
    }
    return true;
  };

  const onFileSelect: UploadProps["onChange"] = ({ fileList: fl }) => {
    if (fl.length > maxCount) {
      message.error(`Only ${maxCount} files allowed`);
      return;
    }
    setFileList(fl);
    onChange?.(fl); // ✅ Pass entire fileList to parent
  };

  const onRemove = (file: UploadFile) => {
    const updatedList = fileList.filter((f) => f.uid !== file.uid);
    setFileList(updatedList);
    onChange?.(updatedList);
  };

  return (
    <div className={className}>
      <div className="grid grid-cols-2 gap-2">
        <div className={fileList.length > 0 ? "" : "col-span-2"}>
          <Dragger
            name="files"
            multiple={maxCount > 1}
            fileList={fileList}
            onChange={onFileSelect}
            beforeUpload={beforeUpload}
            maxCount={maxCount}
            accept={accept}
            height={120}
            listType={listType}
            style={{
              backgroundColor: "#ECF8EE",
              border: "1px dashed #28a745",
              borderRadius: "8px",
            }}
            showUploadList={false}
          >
            <div className="flex flex-col items-center justify-center">
              <div className="bg-green/20 rounded-full p-2 flex justify-center items-center">
                <Icon icon={File01Icon} size={16} color="green" />
              </div>
              <p className="!font-semibold text-black !mb-2 !text-xs">
                Click to upload or drag & drop your files here
              </p>
              <p className="text-xs text-gray-500">
                {accept} (max {maxCount} files, {maxSizeMb} mb each)
              </p>
            </div>
          </Dragger>
        </div>

        {fileList.length > 0 && (
          <div className={`grid gap-2 grid-cols-${fileList.length}`}>
            {fileList.map((file) => (
              <div key={file.uid} className="relative group">
                <div className="relative flex flex-col items-center justify-center gap-2 rounded-lg">
                  <div
                    className={twMerge(
                      "overflow-hidden h-[80px] w-full rounded-xl flex flex-col justify-center items-center border-2 border-gray-300"
                    )}
                  >
                    <Image
                      width="100%"
                      // ✅ Use existing URL if available (DB-loaded), else createObjectURL
                      src={
                        (mode === "CREATE" ? file.url : baseUrl + file.url) ||
                        URL.createObjectURL(file.originFileObj as File)
                      }
                      alt={file.name}
                      className="!w-full !h-[200px] object-center object-cover"
                      preview={{
                        mask: (
                          <div className="flex items-center justify-center gap-2 text-white">
                            <EyeOutlined />
                            <span>Preview</span>
                          </div>
                        ),
                      }}
                    />
                  </div>
                  <button
                    onClick={() => onRemove(file)}
                    className="w-full flex justify-center items-center gap-2 text-red-500 border border-red-500 rounded-md py-1 px-2 hover:bg-red-50 transition-colors"
                  >
                    <CloseOutlined className="text-red-500" />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
