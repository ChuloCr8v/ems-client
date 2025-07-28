import { message } from "antd";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function toastApiError(error: any) {
    const errMessage = getApiError(error);
    console.error(errMessage);
    message.error(errMessage);

    // might need to clear API state and logout
    // if (error?.response?.status === 401) {
    //   localStorage.removeItem("auth");
    //   api.util.resetApiState();
    // }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getApiError(error: any): string {
    console.error(error);
    if (typeof error === "string") {
        return error;
    } else if (typeof error.data?.message !== "string") {
        return error.message;
    } else {
        return error.data.message
            .replace("Request validation of body failed, because: ", "")
            .replace(/"/g, "")
            .trim();
    }
}
