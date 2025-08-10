"use client"

import { useState } from "react"
import { Form, Input, Upload, Button } from "antd"
import { CheckCircleOutlined, DeleteOutlined, InboxOutlined } from "@ant-design/icons"

import type { UploadFile } from "antd/lib/upload/interface"
import { CustomModal } from "../common/CustomModal"
import { User03FreeIcons } from "@hugeicons/core-free-icons"

const { TextArea } = Input
const { Dragger } = Upload

interface UploadPaymentReceiptFormValues {
  files: UploadFile[]
  note: string
}

const UploadPaymentReceiptModal = () => {
  const [form] = Form.useForm<UploadPaymentReceiptFormValues>()
  const [loading, setLoading] = useState(false)
  const [fileList, setFileList] = useState<UploadFile[]>([])

  const handleOk = async () => {
    try {
      const values = await form.validateFields()
      setLoading(true)
      console.log("Upload Payment Receipt form values:", values)
      console.log("Files:", fileList)
      // Handle file upload logic here
      await new Promise((resolve) => setTimeout(resolve, 1500)) // Simulate API call
      form.resetFields()
      setFileList([])
      // Modal will close automatically
    } catch (error) {
      console.error("Error uploading payment receipt:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = () => {
    form.resetFields()
    setFileList([])
    // Modal will close automatically
  }

  const handleUploadChange = ({ fileList: newFileList }: { fileList: UploadFile[] }) => {
    setFileList(newFileList)
    form.setFieldsValue({ files: newFileList })
  }

  const handleRemove = (file: UploadFile) => {
    const newFileList = fileList.filter((item) => item.uid !== file.uid)
    setFileList(newFileList)
    form.setFieldsValue({ files: newFileList })
  }

  const uploadProps = {
    name: "file",
    multiple: true,
    fileList,
    onChange: handleUploadChange,
    onRemove: handleRemove,
    beforeUpload: () => false, // Prevent automatic upload
    accept: ".pdf,.jpg,.jpeg,.png",
    maxCount: 10,
  }

  return (
    <CustomModal
      title="Upload Payment Receipt"
      modalSubtitle="If you are unable to return an assigned asset, kindly upload evidence of payment made in-lieu."
      icon={User03FreeIcons}
      width={500}
      okText="Upload Proof"
      onOk={handleOk}
      onCancel={handleCancel}
      loading={loading}
    
    >
      <div className="pt-4">
        <Form form={form} layout="vertical" className="space-y-4">
          {/* Upload Files Section */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-gray-700">Upload Files</h3>
            
            <Form.Item
              name="files"
              rules={[{ required: true, message: "Please upload at least one file" }]}
            >
              <Dragger {...uploadProps} className="upload-dragger-custom">
                <div className="flex flex-col items-center justify-center py-8">
                  <InboxOutlined className="text-4xl text-green-500 mb-4" />
                  <p className="text-base font-medium text-gray-700 mb-2">
                    Click to upload or drag & drop your files here
                  </p>
                  <p className="text-sm text-gray-500">PDF, JPG or PNG (max 10 files, 10 mb each)</p>
                </div>
              </Dragger>
            </Form.Item>

            {/* Display uploaded files */}
            {fileList.length > 0 && (
              <div className="space-y-2">
                {fileList.map((file) => (
                  <div
                    key={file.uid}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-green-100 rounded flex items-center justify-center">
                        <CheckCircleOutlined className="text-green-600 text-sm" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-800 text-sm">{file.name}</p>
                        <p className="text-xs text-gray-500">
                          {file.size ? `${Math.round(file.size / 1024)}kb` : "Unknown size"}
                        </p>
                      </div>
                    </div>
                    <Button
                      type="text"
                      icon={<DeleteOutlined className="text-red-500" />}
                      onClick={() => handleRemove(file)}
                      className="hover:bg-red-50"
                      aria-label="Delete file"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Note Section */}
          <Form.Item label="Note (Optional)" name="note">
            <TextArea
              rows={4}
              placeholder="Add any additional notes..."
              className="resize-none"
              maxLength={500}
              showCount
            />
          </Form.Item>
        </Form>
      </div>
    </CustomModal>
  )
}

export default UploadPaymentReceiptModal
