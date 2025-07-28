import { createContext, useContext, useMemo, useState } from "react";
import { v4 as uuid } from "uuid";
import { cleanupUploads, uploadFile } from "../api/uploads.api";

export type UploaderItem = {
  id: string;
  file: File;
  order: number;
  done: boolean;
  progress: number;
  success: boolean;
  cancelled: boolean;
  controller: AbortController;
};

const newItem = (file: File, order: number): UploaderItem => ({
  id: uuid(),
  file,
  order,
  done: false,
  progress: 0,
  success: false,
  cancelled: false,
  controller: new AbortController(),
});

export function useUploaderProvider() {
  const [uploads, setUploads] = useState<UploaderItem[]>([]);

  return useMemo(() => {
    const isUploading = uploads.some((up) => !up.done);

    function modify(id: string, change: Partial<UploaderItem>) {
      setUploads((u) =>
        u.map((us) => (us.id === id ? { ...us, ...change } : us))
      );
    }

    async function startUpload(up: UploaderItem) {
      setUploads((u) => [...u, up]);
      const { file, id, order } = up;
      const signal = up.controller.signal;
      const onProgress = (progress: number) => modify(id, { progress });

      try {
        await uploadFile({ file, id, order, signal, onProgress });
        modify(id, { done: true, success: true });
        return true;
      } catch (e) {
        console.error("Upload failed:", e);
        modify(id, { done: true, success: false });
        return false;
      }
    }

    function addUploads(files: File[], order: number = uploads.length) {
      const items = files.map((file, i) => newItem(file, order + i));
      setUploads((uploads) => [...uploads, ...items]);
      items.forEach(startUpload);
      return items;
    }

    async function addUploadNow(file: File, order: number) {
      const item = newItem(file, order);
      const uploaded = await startUpload(item);
      return { id: item.id, uploaded };
    }

    function getUpload(id: string) {
      return uploads.find((up) => up.id === id);
    }

    function cancelUpload(id: string) {
      const up = getUpload(id);
      if (!up) return;

      if (up.done) {
        console.log("Releasing"), cleanupUploads(up.id);
      } else {
        up.controller.abort();
        modify(id, { cancelled: true, done: true });
      }
      setUploads((up) => up.filter((up) => up.id !== id));
    }

    function cleanup() {
      if (uploads.length == 0) return;
      console.log("Uploader cleanup initiated");

      uploads.forEach((up) => {
        try {
          up.controller.abort();
        } catch (e) {}
      });
      const ids = uploads.map((up) => up.id);
      cleanupUploads(ids);
      setUploads([]);
    }

    return {
      uploads,
      isUploading,
      getUpload,
      addUploads,
      addUploadNow,
      cancelUpload,
      cleanup,
    };
  }, [uploads]);
}

export type Uploader = ReturnType<typeof useUploaderProvider>;
export const UploaderContext = createContext<Uploader | null>(null);
export const UploaderProvider = UploaderContext.Provider;

export function useUploader() {
  const uploader = useContext(UploaderContext);
  if (!uploader)
    throw new Error("useUploader only works inside UploaderProvider");
  return uploader;
}
