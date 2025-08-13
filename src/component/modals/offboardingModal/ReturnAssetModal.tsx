"use client"

import { useState } from "react"
import { Form, Input, Select } from "antd"
import type { UploadFile } from "antd/lib/upload/interface"
import { CustomModal } from "../../common/CustomModal"
import { FileUploadIcon } from "@hugeicons/core-free-icons"
import CustomFilePicker from "../../global/CustomFilePicker"
import { usePopup } from "../../../context/PopupContext"


const { TextArea } = Input

interface ReturnAssetFormValues {
  assetName: string
  condition: string
  reason: string
  files: UploadFile[]
}

const ReturnAssetModal = () => {
  const [form] = Form.useForm<ReturnAssetFormValues>()
  const [loading, setLoading] = useState(false)
  const { closeModal } = usePopup()

 
  const handleOk = async () => {
    try {
      const values = await form.validateFields()
      setLoading(true)
      console.log("Return Asset form values:", values)
      // Handle asset return logic here
      await new Promise((resolve) => setTimeout(resolve, 2000)) // Simulate API call
      form.resetFields()
      // Modal will close automatically
    } catch (error) {
      console.error("Error returning asset:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = () => {
    form.resetFields()
    closeModal()
  }



  return (
    <CustomModal
      title="Return Asset"
      modalSubtitle="Provide details and upload supporting evidence if needed."
      icon={FileUploadIcon}
      width={500}
      okText="Upload Proof"
      onOk={handleOk}
      onCancel={handleCancel}
      loading={loading}
      showConfirmation={true}
      confirmationText="I understand that this action is sensitive and may not be reversible. I confirm that I want to proceed."
    >
      <div>
        <Form form={form} layout="vertical" className="space-y-4">
          {/* Asset Name */}
          <Form.Item
            label="Asset Name"
            name="assetName"
            rules={[{ required: true, message: "Please select an asset" }]}
          >
            <Select placeholder="Select asset">
            <Select.Option value="Asset 1">Laptop - MacBook Pro 16</Select.Option>
            <Select.Option value="Asset 2">Monitor - Dell UltraSharp 27</Select.Option>
            <Select.Option value="Asset 3">Phone - iPhone 14</Select.Option>
          </Select>
          </Form.Item>

          {/* Condition */}
          <Form.Item
            label="Condition"
            name="condition"
            rules={[{ required: true, message: "Please select the asset condition" }]}
          >
           <Select placeholder="Select Condition">
            <Select.Option value="excellent">Excellent</Select.Option>
            <Select.Option value="good">Good</Select.Option>
            <Select.Option value="fair">Fair</Select.Option>
          </Select>
          </Form.Item>

          {/* Reason */}
          <Form.Item
            label="Reason"
            name="reason"
            rules={[{ required: true, message: "Please provide a reason for return" }]}
          >
            <TextArea
              rows={1}
              placeholder="Type here"
              className="resize-none"
              maxLength={100}
              
            />
          </Form.Item>

          {/* Upload Files Section */}
          <div className=" mt-4">

            <p className="text-sm font-medium">
              Upload Files <span className="text-gray-400 font-light"> (Optional)</span>
            </p>
            <Form.Item name="files">
              <CustomFilePicker maxFiles={5} maxSize={10} formItemName={["files"]} />
            </Form.Item>
          </div>
        </Form>
      </div>
    </CustomModal>
  )
}

export default ReturnAssetModal
