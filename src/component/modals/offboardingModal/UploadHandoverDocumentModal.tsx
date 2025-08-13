// components/modals/UploadHandoverDocumentModal.tsx
import { useState } from "react";
import { Form, Input, Button } from "antd";
import type { UploadFile } from "antd/lib/upload/interface";
import { HugeiconsIcon } from "@hugeicons/react";
import CustomFilePicker from "../../global/CustomFilePicker";
import { CustomModal } from "../../common/CustomModal";
import { FileUploadFreeIcons, } from "@hugeicons/core-free-icons";
import { usePopup } from "../../../context/PopupContext";

const { TextArea } = Input;

interface UploadHandoverDocumentFormValues {
    files: UploadFile[];
    note?: string;
}



const UploadHandoverDocumentModal = () => {
    const [form] = Form.useForm<UploadHandoverDocumentFormValues>();
    const [loading, setLoading] = useState(false);
    const { closeModal } = usePopup()

    const handleOk = async () => {
        try {
            const values = await form.validateFields();
            setLoading(true);
            console.log("Upload Handover Document form values:", values);

            // Simulate API upload
            await new Promise((resolve) => setTimeout(resolve, 1500));
            form.resetFields();
        } catch (error) {
            console.error("Error uploading handover document:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        form.resetFields();
        closeModal();
    };

    return (
        <CustomModal
            title="Upload Handover Document"
            modalSubtitle="Help ensure a seamless transition by uploading your handover document."
            icon={FileUploadFreeIcons}
            width={500}
            okText="Upload Document"
            onOk={handleOk}
            onCancel={handleCancel}
            loading={loading}
        >
            <div>
                {/* Download Template Button */}
                <Button
                    type="dashed"
                    icon={<HugeiconsIcon icon={FileUploadFreeIcons} size={20} className="text-[#40B554] mt-1" />}
                    className=" mb-4 !text-[#0EA5E9] !border-[#0EA5E9] hover:!bg-[#E0F2FE] p-2 !font-semibold "

                >
                    Download Handover Template
                </Button>

                <Form form={form} layout="vertical" >
                    {/* File Picker */}
                    <div>
                        <h3 className="text-sm font-medium text-gray-700">Upload Files</h3>
                        <Form.Item
                            name="files"
                            rules={[{ required: true, message: "Please upload at least one file" }]}
                        >
                            <CustomFilePicker maxFiles={10} maxSize={10} />
                        </Form.Item>
                    </div>

                    {/* Optional Note */}
                    <Form.Item
                        label={
                            <span>
                                Note <span className="text-gray-500">(Optional)</span>
                            </span>
                        }
                        name="note">
                        <TextArea
                            rows={1}
                            placeholder="Add any additional notes..."
                            className="resize-none"
                            maxLength={100}

                        />
                    </Form.Item>
                </Form>
            </div>
        </CustomModal>
    );
};

export default UploadHandoverDocumentModal;
