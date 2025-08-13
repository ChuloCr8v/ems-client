import { useState } from "react"
import { Form, Input, Select, DatePicker, Switch } from "antd"
import CustomFilePicker from "../../global/CustomFilePicker"
import type { UploadFile } from "antd/lib/upload/interface"
import { CustomModal } from "../../common/CustomModal"
import { Logout03Icon } from "@hugeicons/core-free-icons"
import EmployeeCard from "../../common/EmployeeCard"
import { usePopup } from "../../../context/PopupContext"


const { Option } = Select
const { TextArea } = Input

interface InitiateOffboardingFormValues {
  exitType: string
  lastWorkingDate: string
  exitReason: string
  noticePeriodsServed: boolean
  files: UploadFile[]
  confirmation: boolean
}

interface InitiateOffboardingModalProps {
  employee?: {
    firstName: string
    lastName: string
    employeeId: string
    profileImage?: string
  }
}

const InitiateOffboardingModal = ({
  employee = {
    firstName: "Modesta",
    lastName: "Ekeh",
    employeeId: "EMP-3958",
  },
}: InitiateOffboardingModalProps) => {
  const [form] = Form.useForm<InitiateOffboardingFormValues>()
  const [loading, setLoading] = useState(false)
  const { closeModal } = usePopup()

  const handleOk = async () => {
    try {
      const values = await form.validateFields()
      setLoading(true)
      console.log("Initiate Offboarding form values:", values)
      // Handle offboarding initiation logic here
      await new Promise((resolve) => setTimeout(resolve, 2000)) // Simulate API call
      form.resetFields()
      // Modal will close automatically
    } catch (error) {
      console.error("Error initiating offboarding:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = () => {
    form.resetFields()
    // Modal will close automatically
    closeModal()
  }

  const exitTypes = ["Resignation", "Termination", "Retirement", "Contract End"]

  return (
    <CustomModal
      title="Initiate Offboarding"
      modalSubtitle="Begin the offboarding process by providing the details below. All relevant parties will be notified."
      icon={Logout03Icon}
      width={600}
      okText="Initiate Offboarding"
      onOk={handleOk}
      onCancel={handleCancel}
      loading={loading}
      confirmationText="I understand that this action is sensitive and may not be reversible. I confirm that I want to proceed."
      showConfirmation={true}
      center={true}
    >
      <div className="">

        {/* Employee Card */}
        <EmployeeCard
          description=""
          employee={employee}
        />

        <Form form={form} layout="vertical" className="space-y-2 ">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <Form.Item
              label="Exit Type"
              name="exitType"
              rules={[{ required: true, message: "Please select exit type" }]}
            >
              <Select size="large" placeholder="Select Exit Type" className="w-full ">
                {exitTypes.map((type) => (
                  <Option key={type} value={type}>
                    {type}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              label="Last Working Date"
              name="lastWorkingDate"
              rules={[{ required: true, message: "Please select last working date" }]}
            >
              <DatePicker size="large" format="DD/MM/YY" placeholder="DD/MM/YY" className="w-full" />
            </Form.Item>
          </div>

          {/* Exit Reason */}
          <Form.Item
            label="Exit Reason"
            name="exitReason"
            rules={[{ required: true, message: "Please provide exit reason" }]}
          >
            <TextArea rows={1} placeholder="Select Exit Reason" className="resize-none" maxLength={1000} />
          </Form.Item>

          {/* Notice Period Checkbox */}
          <Form.Item
            name="noticePeriodsServed"
            valuePropName="checked"
            rules={[
              {
                validator: (_, value) =>
                  value ? Promise.resolve() : Promise.reject(new Error("Please confirm notice period")),
              },
            ]}
          >
            <div className="flex items-center">
              <Switch className="text-sm text-gray-700" />
              <span className="text-sm text-gray-700 pl-2">
                Check that the employee served the required notice period
              </span>
            </div>
          </Form.Item>

          {/* Attachments Section */}
          <div className="space-y-3 mt-4">
            <h3 className="text-sm font-medium text-gray-700">Attachments</h3>
            <p className="text-sm font-semibold">Upload Files <span className="text-gray-400 font-light">(Optional)</span></p>

            <Form.Item name="files">
              <CustomFilePicker maxFiles={10} maxSize={10} />
            </Form.Item>
          </div>
        </Form>
      </div>
    </CustomModal>
  )
}

export default InitiateOffboardingModal
