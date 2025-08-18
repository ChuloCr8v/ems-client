import { baseUrl } from "./api/base";
import QRCode from 'qrcode';



export const fullName = (user: { firstName: string; lastName: string }) => {
    return `${user.firstName} ${user.lastName}`

}


export const sentenceCase = (text: string) => {
    return text?.charAt(0)?.toUpperCase() +
        text?.slice(1)?.toLowerCase()

}

export const fileSizeFormatter = (fileSize: number = 0) => {
    const sizeInKB = fileSize / 1024;
    if (sizeInKB < 1024) {
        return `${sizeInKB.toFixed(1)} KB`;
    } else {
        return `${(sizeInKB / 1024).toFixed(1)} MB`;
    }
};

export const parseImageData = (imgData: string | object | null) => {
    try {
        const parsed =
            typeof imgData === "string" ? JSON.parse(imgData) : imgData;
        return parsed?.url ? baseUrl + parsed.url : "";
    } catch {
        return "";
    }
};

export const parseImageDataToFile = async (imageString?: string) => {
    if (!imageString) return undefined;

    try {
        const parsed =
            typeof imageString === "string" ? JSON.parse(imageString) : imageString;

        const res = await fetch(parsed.url);
        const blob = await res.blob();
        const file = new File([blob], parsed.originalName || "uploaded-file", {
            type: parsed.mimeType || "image/jpeg",
        });

        return [
            {
                uid: parsed.url,
                name: parsed.originalName || "uploaded-file",
                status: "done",
                url: parsed.url,
                originFileObj: file, // This allows re-upload
            },
        ];
    } catch (err) {
        console.error("Error parsing image data to file:", err);
        return undefined;
    }
};

export async function generateQrFile(serialNo: string): Promise<File> {
    const dataUrl = await QRCode.toDataURL(serialNo, { width: 300 });
    const res = await fetch(dataUrl);
    const blob = await res.blob();
    return new File([blob], `${serialNo}-qr.png`, { type: 'image/png' });
}