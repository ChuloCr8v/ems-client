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
