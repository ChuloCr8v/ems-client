import type React from "react"
import { Form, Input, Select } from "antd"
import { MailOutlined, PhoneOutlined, UserOutlined } from "@ant-design/icons"
import OnboardingWrapper from "../OnboardingWrapper"
import OnboardingSteps from "../OnboardingSteps"
import ActionButtons from "../common/ActionButton"



const { Option } = Select

interface KeyContactsForm {
    guarantorFirstName: string
    guarantorLastName: string
    guarantorEmail: string
    guarantorPhone: string
    guarantorCountryCode: string
    emergencyFirstName: string
    emergencyLastName: string
    emergencyEmail: string
    emergencyPhone: string
    emergencyCountryCode: string
}

interface EditOnboardingKeyContactsProps {
    onBack?: () => void
    onProceed?: () => void
}

const EditOnboardingKeyContacts: React.FC<EditOnboardingKeyContactsProps> = ({ onBack, onProceed }) => {
    const [form] = Form.useForm<KeyContactsForm>()

    const handleFinish = (values: KeyContactsForm) => {
        console.log("Key contacts form values:", values)
        onProceed?.()
    }

    const handleProceedClick = () => {
        form
            .validateFields()
            .then((values) => {
                handleFinish(values)

            })
            .catch((errorInfo) => {
                console.log("Validation failed:", errorInfo)
            })
    }

    return (
        <OnboardingWrapper
          title="Update Your Details"
            subtitle="We've reopened your onboarding form for edits. Please review and update the sections based on the instructions from your admin"
        >
            {/* Progress Steps */}
            <OnboardingSteps currentStep={1} />

            {/* Form Content */}
            <div className="!p-4 bg-white !mt-4">
                <div className="mb-6">
                    <h2 className="!text-[16px] font-semibold text-gray-800 !mb-4">Key Contacts</h2>
                </div>

                <Form form={form} layout="vertical" onFinish={handleFinish} className="space-y-6">
                    {/* Guarantor Details Section */}
                    <div className="space-y-4">
                        <div>
                            <h3 className="text- font-semibold text-gray-800 !mb-2">Guarantor Details</h3>
                            <p className="text-gray-500 text-sm mb-4">Guarantor Details</p>
                        </div>

                        {/* Guarantor Name Fields */}
                        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-4">
                            <Form.Item
                                label="First Name"
                                name="guarantorFirstName"
                                rules={[{ required: false, message: "Please enter guarantor's first name" }]}
                            >
                                <Input
                                    size="large"
                                    placeholder="Enter first name"
                                    prefix={<UserOutlined className="!text-gray-400" />}
                                    className="!h-[32px]"
                                />
                            </Form.Item>

                            <Form.Item
                                label="Last Name"
                                name="guarantorLastName"
                                rules={[{ required: false, message: "Please enter guarantor's last name" }]}
                            >
                                <Input
                                    size="large"
                                    placeholder="Enter last name"
                                    prefix={<UserOutlined className="!text-gray-400" />}
                                    className="!h-[32px]"
                                />
                            </Form.Item>
                        </div>

                        {/* Guarantor Email and Phone */}
                        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-4">
                            <Form.Item
                                label="Email"
                                name="guarantorEmail"
                                rules={[
                                    { required: false, message: "Please enter guarantor's email" },
                                    { type: "email", message: "Please enter a valid email" },
                                ]}
                            >
                                <Input
                                    size="large"
                                    placeholder="Enter email address"
                                    prefix={<MailOutlined className="!text-gray-400 !mt-1" />}
                                    className="h-[32px]"
                                />
                            </Form.Item>

                            <Form.Item
                                label="Phone Number"
                                name="phoneNumber"
                                rules={[{ required: false, message: "Please enter your phone number" }]}
                            >
                                <div className="flex !space-x-2">
                                    <Select size="small" placeholder="Select marital status" className="!w-[90px] !h-[32px] ">
                                        <Option value="Nigrie">234</Option>
                                        <Option value="Ghana">345</Option>
                                        <Option value="Gambia">455</Option>
                                        <Option value="Rawanda">578</Option>
                                    </Select>
                                    <Input
                                        size="large"
                                        placeholder="Enter phone number"
                                        className="!h-[32px]"
                                        prefix={<PhoneOutlined className="!text-gray-400" />} />
                                </div>
                            </Form.Item>
                        </div>
                    </div>

                    {/* Emergency Contact Section */}
                    <div className="space-y-4 !pt-6">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-800 !mb-2">Emergency Contact</h3>
                            <p className="text-gray-500 text-sm !mb-2">
                                Provide someone we can contact in case of an emergency (e.g., medical issue or workplace incident).
                            </p>
                        </div>

                        {/* Emergency Contact Name Fields */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Form.Item
                                label="First Name"
                                name="emergencyFirstName"
                                rules={[{ required: false, message: "Please enter emergency contact's first name" }]}
                            >
                                <Input
                                    size="large"
                                    placeholder="Enter first name"
                                    prefix={<UserOutlined className="!text-gray-400" />}
                                    className="h-[32px]"
                                />
                            </Form.Item>

                            <Form.Item
                                label="Last Name"
                                name="emergencyLastName"
                                rules={[{ required: false, message: "Please enter emergency contact's last name" }]}
                            >
                                <Input
                                    size="large"
                                    placeholder="Enter last name"
                                    prefix={<UserOutlined className="!text-gray-400" />}
                                    className="h-[32px]"
                                />
                            </Form.Item>
                        </div>

                        {/* Emergency Contact Email and Phone */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Form.Item
                                label="Email"
                                name="emergencyEmail"
                                rules={[
                                    { required: false, message: "Please enter emergency contact's email" },
                                    { type: "email", message: "Please enter a valid email" },
                                ]}
                            >
                                <Input
                                    size="large"
                                    placeholder="Enter email address"
                                    prefix={<MailOutlined className="!text-gray-400 !mt-1" />}
                                    className="h-[32px]"
                                />
                            </Form.Item>

                            <Form.Item
                                label="Phone Number"
                                name="phoneNumber"
                                rules={[{ required: false, message: "Please enter your phone number" }]}
                            >
                                <div className="flex !space-x-2">
                                    <Select size="small" placeholder="Select marital status" className="!w-[90px] !h-[32px] ">
                                        <Option value="Nigrie">234</Option>
                                        <Option value="Ghana">345</Option>
                                        <Option value="Gambia">455</Option>
                                        <Option value="Rawanda">578</Option>
                                    </Select>
                                    <Input
                                        size="large"
                                        placeholder="Enter phone number"
                                        className="!h-[32px]"
                                        prefix={<PhoneOutlined className="!text-gray-400" />} />
                                </div>
                            </Form.Item>
                        </div>
                    </div>
                </Form>

                {/* Action Buttons */}
                <ActionButtons
                    onBack={onBack}
                    onProceed={handleProceedClick}
                    backText="Back" // Optional - defaults to "Back"
                    proceedText="Proceed" // Optional - defaults to "Proceed"
                    containerClassName="additional-classes-if-needed"
                // You can also pass additional Button props:

                />
            </div>
        </OnboardingWrapper>
    )
}

export default EditOnboardingKeyContacts
