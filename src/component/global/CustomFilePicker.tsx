import {
  Button,
  Progress,
  Upload,
  message,
  type UploadFile,
  type UploadProps,
} from "antd";
import { File01Icon, Delete02FreeIcons } from "@hugeicons/core-free-icons";
import Icon from "../common/Icon";
import { fileSizeFormatter } from "../../helpers";
import type { UploadFileStatus } from "antd/lib/upload/interface";

const { Dragger } = Upload;

type Props = {
  value?: UploadFile[];
  onChange?: (fileList: UploadFile[]) => void;
  maxFiles?: number;
  maxSize?: number;
  formItemName?: string | string[];
};

const CustomFilePicker = ({
  value = [],
  maxFiles = 10,
  maxSize = 10,
  onChange,
}: Props) => {
  const handleChange: UploadProps["onChange"] = ({ file, fileList }) => {
    const uid = file.uid;
    let percent = 0;

    const simulateProgress = () => {
      const interval = setInterval(() => {
        percent += 10;
        const updatedList = fileList.map((f) =>
          f.uid === uid
            ? {
                ...f,
                percent,
                status:
                  percent >= 100 ? "done" : ("uploading" as UploadFileStatus),
              }
            : f
        );
        onChange?.(updatedList.slice(-maxFiles));

        if (percent >= 100) {
          clearInterval(interval);
        }
      }, 200);
    };

    simulateProgress();
  };

  const beforeUpload: UploadProps["beforeUpload"] = (file) => {
    const isSizeValid = file.size / 1024 / 1024 <= maxSize;
    if (!isSizeValid) {
      message.error(`File must be smaller than ${maxSize}MB!`);
      return Upload.LIST_IGNORE;
    }
    return false; // ❗️Prevents automatic upload
  };

  const handleRemove = (file: UploadFile) => {
    const newFileList = value.filter((f) => f.uid !== file.uid);
    onChange?.(newFileList);
    return true;
  };

  return (
    <div className="space-y-4">
      <Dragger
        name="files"
        multiple={maxFiles > 1}
        fileList={value}
        onChange={handleChange}
        onRemove={handleRemove}
        beforeUpload={beforeUpload}
        maxCount={maxFiles}
        accept=".pdf,.jpg,.jpeg,.png"
        showUploadList={false}
        height={150}
        style={{
          backgroundColor: "#ECF8EE",
          marginBlock: 12,
        }}
      >
        <div className="flex flex-col items-center justify-center">
          <div className="bg-green/20 rounded-full p-4 flex justify-center items-center relative">
            <Icon icon={File01Icon} size={24} color="green" />
          </div>
          <p className="!font-medium text-black !mb-2">
            Click to upload or drag & drop your files here
          </p>
          <p className="text-xs text-gray-500">
            PDF, JPG or PNG (max {maxFiles} files, {maxSize} mb each)
          </p>
        </div>
      </Dragger>

      {/* Custom file list in grid */}
      {value.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
          {value.map((file) => (
            <div
              key={file.uid}
              className="h-fit flex flex-col items-start justify-start gap-2  py-2 px-3 border border-outline rounded-lg bg-gray-50"
            >
              <div className="w-full flex items-center justify-between">
                <div className="flex items-center gap-2 overflow-hidden">
                  <div className="h-10 w-10 rounded-full bg-green/10 flex items-center justify-center">
                    <Icon icon={File01Icon} size={20} color="green" />
                  </div>
                  <div className="text-sm truncate max-w-[100px]">
                    <p className="font-semibold truncate">{file.name}</p>
                    {fileSizeFormatter(file.size)}
                  </div>
                </div>
                <Button
                  type="text"
                  onClick={() => handleRemove(file)}
                  className="!p-0"
                >
                  <Icon size={20} icon={Delete02FreeIcons} color={"red"} />
                </Button>
              </div>
              {file.status === "uploading" && (
                <Progress
                  percent={file.percent}
                  strokeWidth={10}
                  strokeColor={"green"}
                />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomFilePicker;
