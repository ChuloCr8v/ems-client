import type React from "react"
import { useState } from "react"
import { Button, Progress, Upload } from "antd"
import { FileOutlined, DeleteOutlined } from "@ant-design/icons"
import type { UploadFile } from "antd/lib/upload/interface"
import OnboardingWrapper from "../OnboardingWrapper"
import OnboardingSteps from "../OnboardingSteps"
import ActionButtons from "../common/ActionButton"


interface EditOnboardingDocumentsProps {
    onProceed: () => void
    onBack: () => void
}

const OnboardingDocuments: React.FC<EditOnboardingDocumentsProps> = ({ onProceed, onBack }) => {
    const [fileList, setFileList] = useState<UploadFile[]>([])
    const [_uploading, setUploading] = useState(false)

    const handleUploadChange = ({ fileList: newFileList }: { fileList: UploadFile[] }) => {
        setFileList(newFileList)
    }

    const handleRemove = (file: UploadFile) => {
        const newFileList = fileList.filter((item) => item.uid !== file.uid)
        setFileList(newFileList)
    }

    const handleSubmit = () => {
        setUploading(true)
        // Simulate upload process
        setTimeout(() => {
            console.log("Documents submitted:", fileList)
            setUploading(false)
            onProceed()
        }, 1500)
    }

    return (
        <OnboardingWrapper
        title="Update Your Details"
        subtitle="We've reopened your onboarding form for edits. Please review and update the sections based on the instructions from your admin"
        >
            {/* Progress Steps */}
            <OnboardingSteps currentStep={2} />

            {/* Form Content */}
            <div className="!p-8 bg-white !mt-6">
                <div className="!mb-6">
                    <h2 className="!text-xl !font-semibold text-gray-800 !mb-4">Documents</h2>
                    <p className="text-gray-500 text-sm">
                        Upload all filled and signed documents that were attached in your mail
                    </p>
                </div>

                <div className="!space-y-6">
                    <div>
                        <h3 className="text-gray-600 font-medium !mb-2">
                            Upload File <span className="!text-gray-400">(e.g Contract Letter, Guarantor Form, NDA etc)</span>
                        </h3>
                        <Upload.Dragger
                            name="file"
                            multiple={true}
                            fileList={fileList}
                            onChange={handleUploadChange}
                            onRemove={handleRemove}
                            beforeUpload={() => false} // Prevent automatic upload
                            className="custom-upload-dragger  "
                            accept=".pdf,.jpg,.jpeg,.png"
                        >
                            <div className="flex flex-col items-center justify-center !py-1 ">
                                <div className="bg-[#C4E8CA99] rounded-full !p-5 flex justify-center items-center relative"><FileOutlined className="text-5xl absolute !mt-4  !text-green-500 !mb-4" /> </div>
                                <p className="!text-lg !font-medium text-black !mb-2">Click to upload or drag & drop your files here</p>
                                <p className="text-sm text-gray-500">PDF, JPG or PNG (max 10 files, 10 mb each)</p>
                            </div>
                        </Upload.Dragger>
                    </div>

                    {/* Mock Uploaded Files Display */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Example 1: Completed file */}
                        <div className="flex items-center justify-between  border border-gray-200 rounded-lg shadow-sm max-h-[60px]">
                            <div className="flex items-center !space-x-4 !p-4 ">
                                <div className="bg-[#C4E8CA99] rounded-full !p-5 flex justify-center items-center relative">
                                    <FileOutlined className="text-5xl absolute !mt-4  !text-green-500 !mb-4" /> </div>
                                <div>
                                    <p className="!font-bold text-gray-800 ">Contract Letter.pdf</p>
                                    <p className="text-sm text-gray-500">100kb</p>
                                </div>
                            </div>
                            <Button
                                type="text"
                                icon={<DeleteOutlined className="!text-red-500" />}
                                onClick={() => console.log("Delete file")}
                                aria-label="Delete file"
                            />
                        </div>

                        {/* Example 2: File with progress */}
                        <div className="flex flex-col !p-4 border border-gray-200 rounded-lg shadow-sm">
                            <div className="flex items-center justify-between !mb-2">
                                <div className="flex items-center !space-x-3">
                                    <div className="bg-[#C4E8CA99] rounded-full !p-5 flex justify-center items-center relative">
                                        <FileOutlined className="text-5xl absolute !mt-4  !text-green-500 !mb-4" /> </div>
                                    <div>
                                        <p className="font-bold text-gray-800">Contract Letter.pdf</p>
                                        <p className="text-sm text-gray-500">100kb</p>
                                    </div>
                                </div>

                            </div>
                            <Progress percent={70} showInfo={true} strokeColor="#40B540" />
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <ActionButtons
                    onBack={onBack}
                    onProceed={handleSubmit}
                    backText="Back"
                    proceedText="Submit"
                />
            </div>
        </OnboardingWrapper>
    )
}

export default OnboardingDocuments
