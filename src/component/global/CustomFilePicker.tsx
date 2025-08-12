import {
  Button,
  Progress,
  Upload,
  message,
  type UploadFile,
  type UploadProps,
  Image,
  type GetProp,
} from "antd";
import {
  File01Icon,
  Delete02FreeIcons,
  Delete02Icon,
} from "@hugeicons/core-free-icons";
import Icon from "../common/Icon";
import { fileSizeFormatter } from "../../helpers";
import type { UploadFileStatus } from "antd/lib/upload/interface";
import { useState } from "react";
import type { UploadListType } from "antd/es/upload/interface";
import { twMerge, type ClassNameValue } from "tailwind-merge";

const { Dragger } = Upload;

type Props = {
  value?: UploadFile[];
  onChange?: (fileList: UploadFile[]) => void;
  maxFiles?: number;
  maxSize?: number;
  formItemName?: string | string[];
  customUploadsView?: boolean;
  listType?: UploadListType;
  containerStyle?: ClassNameValue;
};
type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const CustomFilePicker = ({
  value = [],
  maxFiles = 10,
  maxSize = 10,
  onChange,
  listType,
  containerStyle,
}: Props) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");

  const handleChange: UploadProps["onChange"] = async ({ file, fileList }) => {
    const uid = file.uid;
    let percent = 0;

    // Generate preview for images as soon as they’re added
    const updatedList = await Promise.all(
      fileList.map(async (f) => {
        if (!f.url && !f.preview && f.originFileObj) {
          f.preview = await getBase64(f.originFileObj as FileType);
        }
        return f;
      })
    );

    const simulateProgress = () => {
      const interval = setInterval(() => {
        percent += 10;
        const listWithProgress = updatedList.map((f) =>
          f.uid === uid
            ? {
                ...f,
                percent,
                status:
                  percent >= 100 ? "done" : ("uploading" as UploadFileStatus),
              }
            : f
        );
        onChange?.(listWithProgress.slice(-maxFiles));

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
    return false;
  };

  const handleRemove = (file: UploadFile) => {
    const newFileList = value.filter((f) => f.uid !== file.uid);
    onChange?.(newFileList);
    return true;
  };

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  return (
    <div
      className={twMerge(
        "space-y-4 flex items-center",
        containerStyle,
        !value.length && "grid grid-cols-1",
        listType !== "picture" && "grid grid-cols-1"
      )}
    >
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
        onPreview={handlePreview}
        listType={listType ?? undefined}
        style={{
          backgroundColor: "#ECF8EE",
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
      {previewImage && (
        <Image
          wrapperStyle={{ display: "none" }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage(""),
          }}
          src={previewImage}
        />
      )}

      {/* image list */}
      {listType === "picture" && value.length > 0 && (
        <div
          className={twMerge(`grid grid-cols-${value.length} ml-2 mt-3 gap-2`)}
        >
          {value.map((file) => (
            <div key={file.uid}>
              <div
                className={twMerge(
                  "-mt-2 max-h-[110px] !h-full object-cover overflow-hidden w-full border-1 rounded-xl border-gray/30 flex justify-center items-center",
                  value.length === 1 && "w-full"
                )}
              >
                <Image
                  src={file?.preview}
                  className={twMerge(
                    "!h-[200px] !w-[200px] object-center !object-cover",
                    value.length === 1 && "!w-[400px]"
                  )}
                />
              </div>

              {file.status === "uploading" ? (
                <Progress
                  percent={file.percent}
                  strokeWidth={10}
                  strokeColor={"green"}
                />
              ) : (
                <Button
                  className=" !border-red-600/20 w-full mt-2"
                  onClick={() => handleRemove(file)}
                >
                  {" "}
                  <Icon icon={Delete02Icon} size={16} color="red" />
                </Button>
              )}
            </div>
          ))}
        </div>
      )}
      {/* Custom file list in grid */}
      {listType !== "picture" && value.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
          {value.map((file) => (
            <div
              key={file.uid}
              className="h-fit flex flex-col items-start justify-start gap-2 py-2 px-3 border border-outline rounded-lg bg-gray-50"
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

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
