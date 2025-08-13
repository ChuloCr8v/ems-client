import { useState } from "react"
import { Form, Input } from "antd"
import type { UploadFile } from "antd/lib/upload/interface"
import CustomFilePicker from "../../global/CustomFilePicker"
import { CustomModal } from "../../common/CustomModal"
import { FileUploadFreeIcons, } from "@hugeicons/core-free-icons"
import { usePopup } from "../../../context/PopupContext"

const { TextArea } = Input

interface UploadPaymentReceiptFormValues {
  files: UploadFile[]
  note: string
}

const UploadPaymentReceiptModal = () => {
  const [form] = Form.useForm<UploadPaymentReceiptFormValues>()
  const [loading, setLoading] = useState(false)
  const { closeModal } = usePopup()

  const handleOk = async () => {
    try {
      const values = await form.validateFields()
      setLoading(true)
      console.log("Upload Payment Receipt form values:", values)
      
      await new Promise((resolve) => setTimeout(resolve, 1500)) 
      form.resetFields()
    
    } catch (error) {
      console.error("Error uploading payment receipt:", error)
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
      title="Upload Payment Receipt"
      modalSubtitle="If you are unable to return an assigned asset, kindly upload evidence of payment made in-lieu."
      icon={FileUploadFreeIcons}
      width={500}
      okText="Upload Proof"
      onOk={handleOk}
      onCancel={handleCancel}
      loading={loading}
      center={true}
    >
      <div className="">
        <Form form={form} layout="vertical" className="space-y-2">
          
          <div className="">
            <h3 className="text-sm font-medium text-gray-700">Upload Files</h3>

            <Form.Item name="files" rules={[{ required: true, message: "Please upload at least one file" }]}>
              <CustomFilePicker maxFiles={10} maxSize={10} />
            </Form.Item>
          </div>

          
          <Form.Item label="Note (Optional)" name="note">
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
  )
}

export default UploadPaymentReceiptModal
