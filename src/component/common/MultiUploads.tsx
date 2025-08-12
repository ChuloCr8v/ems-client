import { CloseOutlined, EyeOutlined } from "@ant-design/icons";
import {
  type InputProps,
  message,
  Upload,
  Image,
  type UploadFile,
  type UploadProps,
} from "antd";
import { useEffect, useMemo, useState } from "react";
import { useUploader } from "../../context/UploadContext";
import Dragger from "antd/es/upload/Dragger";
import Icon from "./Icon";
import { File01Icon } from "@hugeicons/core-free-icons";
import { twMerge } from "tailwind-merge";

type MultiUploadProps = {
  className?: string;
  value?: string[] | null;
  onChange?: (id: string[]) => void;
  size?: InputProps["size"];
  maxSizeMb?: number | false;
  maxCount?: number;
  required?: boolean;
  accept?: string;
  listType?: UploadProps["listType"];
};

const MB = 1024 * 1024;

type Maybe<T> = T | null | undefined;

function mapNotNull<T, R>(
  array: Maybe<Array<Maybe<T>>>,
  mapper?: (t: T) => Maybe<R>
): R[] {
  if (!array) return [];
  const filtered = array.filter((x) => x !== null && x !== undefined) as T[];
  return filtered
    .map((i) => mapper?.(i))
    .filter((x) => x !== null && x !== undefined) as R[];
}

function convertToUploadFile(upload: any): UploadFile {
  return {
    uid: upload.id,
    name: upload?.file?.name,
    status: upload.done
      ? upload.success
        ? "done"
        : "error"
      : upload.cancelled
      ? "error"
      : "uploading",
    percent: upload.progress,
    originFileObj: upload?.file,
  };
}

export default function MultiUpload({
  value,
  onChange,
  className,
  maxSizeMb = 10,
  maxCount = 3,
  accept = ".jpg,.jpeg,.png",
  listType = "picture",
}: MultiUploadProps) {
  const uploader = useUploader();
  const uploads = useMemo(
    () => mapNotNull(value, uploader?.getUpload),
    [uploader, value]
  );
  const [internalFileList, setInternalFileList] = useState<UploadFile[]>([]);

  // Sync uploads with internal file list
  useEffect(() => {
    setInternalFileList(uploads.map(convertToUploadFile));
  }, [uploads, uploads, value]);

  useEffect(() => {
    const idCount = value?.length ?? 0;
    if (uploads.length < idCount) {
      onChange?.(uploads.map((up) => up.id));
    }
    const stopped = uploads.filter((up) => up.done && !up.success);
    const failed = stopped.filter((up) => !up.cancelled);
    if (failed.length) {
      message.error("Some files failed to upload. Please try again");
    }
    if (stopped.length) {
      const notStopped = uploads.filter((up) => up.success || !up.done);
      onChange?.(notStopped.map((up) => up.id));
    }
  }, [onChange, uploads, value?.length]);

  const beforeUpload: UploadProps["beforeUpload"] = (file) => {
    if (maxSizeMb && file.size > maxSizeMb * MB) {
      message.error(`File size cannot exceed ${maxSizeMb}MB`);
      return Upload.LIST_IGNORE;
    }

    // Validate image type
    if (!file.type.startsWith("image/")) {
      message.error("You can only upload image files!");
      return Upload.LIST_IGNORE;
    }

    return true;
  };

  const onFileSelect: UploadProps["onChange"] = async ({ fileList }) => {
    if (!onChange || !fileList) return;

    const newFiles = fileList
      .filter(
        (file) =>
          file.originFileObj && !uploads.some((up) => up.id === file.uid)
      )
      .map((file) => file.originFileObj as File);

    if (newFiles.length + uploads.length > maxCount) {
      message.error(`Only ${maxCount} files allowed`);
      return;
    }

    if (
      maxSizeMb &&
      newFiles.some((file) => (file?.size || 0) >= maxSizeMb * MB)
    ) {
      message.error(`File size cannot exceed ${maxSizeMb}MB`);
      return;
    }

    const lastNumber = Math.max(...uploads.map((up) => up.order), -1);
    const added = uploader
      .addUploads(newFiles, lastNumber + 1)
      .map((up) => up.id);
    const newValue = value ? [...value, ...added] : added;
    onChange(newValue);
  };

  const onRemove = (upload: any) => {
    if (!onChange) return;

    const idToRemove = upload.id;
    onChange(value?.filter((id) => id !== idToRemove) ?? []);
    uploader.cancelUpload(idToRemove);
  };

  return (
    <div className={className}>
      <div className="grid grid-cols-2 gap-2">
        {/* Uploader */}
        <div className={uploads.length > 0 ? "" : "col-span-2"}>
          <Dragger
            name="files"
            multiple={maxCount > 1}
            fileList={internalFileList}
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

        {/* Images Grid */}
        {uploads.length > 0 && (
          <div className={`grid gap-2 grid-cols-${uploads.length} `}>
            {uploads.map((upload) => (
              <div key={upload.id} className="relative group">
                <div className="">
                  <div className="relative flex flex-col items-center justify-center gap-2 rounded-lg">
                    <div
                      className={twMerge(
                        "overflow-hidden h-[80px] w-full rounded-xl flex flex-col justify-center items-center border-2 border-gray-300",
                        !upload.done && "h-[92px]"
                      )}
                    >
                      <Image
                        width="100%"
                        src={
                          upload.file
                            ? URL.createObjectURL(upload.file) // local file preview
                            : upload.url // preloaded remote image
                        }
                        alt={upload.file?.name ?? "Uploaded image"}
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
                    {!upload.done ? (
                      <div className="h-5 rounded-xl overflow-hidden w-full bg-gray-200 z-50 flex items-start justify-start gap-2">
                        <div
                          className="h-full bg-green-100 transition-all duration-300"
                          style={{
                            width: `${Math.max(upload.progress, 10)}%`,
                          }}
                        />
                        <p className="text-center w-full text-xs font-semibold absolute">
                          {Math.max(upload.progress, 10)}%
                        </p>
                      </div>
                    ) : (
                      <button
                        onClick={() => onRemove(upload)}
                        className="w-full flex justify-center items-center gap-2 text-red-500 border border-red-500 rounded-md py-1 px-2 hover:bg-red-50 transition-colors"
                      >
                        <CloseOutlined className="text-red-500" />
                        <span>Delete</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
