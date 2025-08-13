import { Form } from "antd"
import { useState } from "react"
import { usePopup } from "../../../context/PopupContext"
import { CustomModal } from "../../common/CustomModal"
import { Message02FreeIcons } from "@hugeicons/core-free-icons"
import TextArea from "antd/es/input/TextArea"
import CustomFilePicker from "../../global/CustomFilePicker"


interface CommentFormValues {
    comment: string
    files: any[]
}

const CommentModal = () => {
    const [form] = Form.useForm<CommentFormValues>()
    const [loading, setLoading] = useState(false)
    const { closeModal } = usePopup()

    const handleOk = async () => {
        try {
            const values = await form.validateFields()
            setLoading(true)

            await new Promise((resolve) => setTimeout(resolve, 1500)) // Simulate API call
            form.resetFields()
        } catch (error) {
            console.error("Error submitting comment:", error)
        } finally {
            setLoading(false)
        }
    }

    const handleCancel = () => {
        closeModal()
    }

    return (
        <CustomModal
            title="Comment"
            modalSubtitle="You have noticed issues with the submitted information. Use this 
     form to share feedback or request updates."
            icon={Message02FreeIcons}
            width={500}
            okText="Send Comment"
            onOk={handleOk}
            onCancel={handleCancel}
            loading={loading}
        >
            <div className="">
                <Form form={form} layout="vertical">
                    <Form.Item label='Comment' name='comment' rules={[{
                        required: true, message:
                            'Please enter your comment'
                    }]}>
                        <TextArea
                            rows={1}
                            placeholder="Enter your comment here..."
                            maxLength={100}
                        />
                        <div className="mt-4">
                            <div className="flex space-x-2">
                            <h3 className="text-sm font-medium text-gray-700">Upload Files</h3>
                            <p className="text-sm text-gray-500">(Optional)</p>
                            </div>
                           <Form.Item name='files'>
                            <CustomFilePicker maxFiles={10} maxSize={10}/>
                           </Form.Item>
                        </div>
                    </Form.Item>
                </Form>
            </div>
        </CustomModal>
    )
}

export default CommentModal