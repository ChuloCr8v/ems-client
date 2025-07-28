import { CloseOutlined } from "@ant-design/icons";
import { Input, type InputProps, message } from "antd";
import React, { useEffect, useMemo, useRef } from "react";
import { twJoin } from "tailwind-merge";
import { useUploader } from "../../context/UploadContext";

type MultiUploadProps = {
  className?: string;
  value?: string[] | null;
  onChange?: (id: string[]) => void;
  size?: InputProps["size"];
  maxSizeMb?: number | false;
  maxCount?: number;
  required?: boolean;
  accept?: string;
  label?: string;
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

function isSameFile(a: File, b: File) {
  return (
    a.name === b.name &&
    a.size === b.size &&
    a.type === b.type &&
    a.lastModified === b.lastModified
  );
}

export default function MultiUpload({
  value,
  onChange,
  className,
  accept,
  size,
  maxSizeMb = 10,
  maxCount = 10,
  required,
  label = "file",
}: MultiUploadProps) {
  const uploader = useUploader();
  const fileRef = useRef<HTMLInputElement>(null);
  const uploads = useMemo(
    () => mapNotNull(value, uploader?.getUpload),
    [uploader, value]
  );

  useEffect(() => {
    if (value?.length === 0 && fileRef.current) {
      fileRef.current.value = "";
    }
  }, [value]);

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
      // remove items that were not uploaded
      const notStopped = uploads.filter((up) => up.success || !up.done);
      onChange?.(notStopped.map((up) => up.id));
    }
  }, [onChange, uploads, value?.length]);

  const onFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;

    if (onChange && fileList) {
      const files = Array.from(fileList);
      const alreadyAttached = (file: File) =>
        uploads.some((up) => isSameFile(up.file, file));
      const newFiles = value ? files.filter((f) => !alreadyAttached(f)) : files;

      if (newFiles.length + uploads.length > maxCount) {
        message.error(`Only ${maxCount} files allowed`);
        return;
      }
      if (newFiles.length < files.length) {
        const file = files.find(alreadyAttached);
        message.info(`${file?.name} was already attached`);
      }
      if (maxSizeMb && newFiles.some((file) => file.size >= maxSizeMb * MB)) {
        message.error(`File size cannot exceed ${maxSizeMb}MB`);
        return;
      }

      const lastNumber = Math.max(...uploads.map((up) => up.order), -1);
      const added = uploader
        .addUploads(newFiles, lastNumber + 1)
        .map((up) => up.id);
      const newValue = value ? [...value, ...added] : added;
      onChange(newValue);
    }
  };

  const onRemove = (idtoRemove: string) => {
    if (!onChange) return;

    onChange(value?.filter((id) => id !== idtoRemove) ?? []);
    uploader.cancelUpload(idtoRemove);
    if (fileRef.current) fileRef.current.value = "";
  };

  return (
    <div className={className}>
      <div className="flex flex-row gap-2">
        <Input
          size={size}
          readOnly
          value={value?.length ? `${value.length} files selected` : ""}
          placeholder={"Upload" + " " + label}
          //   placeholder={
          //     "Up to ten files" + (maxSizeMb ? ` (max ${maxSizeMb}MB each)` : "")
          //   }
        />

        <label
          role="button"
          className={twJoin(
            "flex items-center justify-center text-center text-xs px-6 rounded-md cursor-pointer bg-[#E6EAE8]"
          )}
        >
          Browse
          <input
            ref={fileRef}
            type="file"
            multiple
            required={required && !value?.length}
            onChange={onFileSelect}
            className="w-[1px] h-[1px] opacity-0 absolute"
            accept={accept}
          />
        </label>
      </div>
      <div className="flex flex-col">
        {uploads.map((up, index) => (
          <div
            key={index}
            className="relative flex items-center justify-between mt-1 overflow-hidden text-sm border border-gray-300 rounded-md bg-gray-50"
          >
            <div
              className="overflow-ellipsis whitespace-nowrap flex-grow flex-shrink basis-1 text-xs px-2 py-1.5 overflow-hidden"
              title={up.file.name}
            >
              {up.file.name}
            </div>

            <button
              type="button"
              className="flex items-center self-stretch justify-center flex-shrink-0 px-2 border-l border-gray-300 hover:text-white hover:bg-red-500"
              onClick={() => onRemove(up.id)}
            >
              <CloseOutlined />
            </button>

            {/* progress bar */}
            {!up.done && (
              <div
                className="absolute bottom-0 left-0 h-1 bg-green-500"
                style={{
                  width: `${Math.max(up.progress, 10)}%`,
                  transition: "width 0.2s ease-in-out",
                }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
