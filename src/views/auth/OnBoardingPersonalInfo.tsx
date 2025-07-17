import type React from "react"
import { useState } from "react"
import { Form, Input, Select, } from "antd"
import { MailOutlined, PhoneOutlined, UserOutlined } from "@ant-design/icons"
import ActionButtons from "../../component/common/ActionButton"
import OnboardingSteps from "../../component/OnboardingSteps"
import OnboardingWrapper from "../../component/OnboardingWrapper"


const { Option } = Select

interface PersonalInfoForm {
    firstName: string
    lastName: string
    email: string
    phoneNumber: string
    gender: string
    maritalStatus: string
    address: string
    country: string
    state: string
}

type OnboardingPersonalInfoProps = {
    onProceed: () => void
    onBack: () => void
}

const OnboardingPersonalInfo: React.FC<OnboardingPersonalInfoProps> = ({ onProceed, onBack }) => {
    const [form] = Form.useForm<PersonalInfoForm>()
    const [_currentStep, _setCurrentStep] = useState(0)


    const onFinish = (values: PersonalInfoForm) => {
        console.log("Form values:", values)
        // Handle form submission
    }

    

    const handleProceed = () => {
        form
            .validateFields()
            .then((values) => {
                console.log("Proceeding with values:", values)
                onProceed()
            })
            .catch((errorInfo) => {
                console.log("Validation failed:", errorInfo)
            })
    }
    return (
      
            
                 <OnboardingWrapper>

                {/* Progress Steps */}
            <OnboardingSteps currentStep={0} />
                {/* Form Content */}
                <div className="!p-8 bg-white !mt-6">
                    <div className="mb-6">
                        <h2 className="text-xl font-semibold text-gray-800 !mb-4">Personal Information</h2>
                        <p className="text-gray-500 text-sm ">Personal Information</p>
                    </div>

                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={onFinish}
                        initialValues={{
                            firstName: "Modesta",
                            lastName: "Ekeh",
                            email: "modestajekeh@gmail.com",
                            phoneNumber: "8101000100",
                            gender: "Female",
                        }}
                        className="space-y-4"
                    >
                        {/* Name Fields */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-4">
                            <Form.Item
                                label="First Name"
                                name="firstName"
                                rules={[{ required: false, message: "Please enter your first name" }]}
                            >
                                <Input size="large" placeholder="Enter first name" prefix={<UserOutlined className="!text-gray-400" />} className="!h-[32px]" />
                            </Form.Item>

                            <Form.Item
                                label="Last Name"
                                name="lastName"
                                rules={[{ required: false, message: "Please enter your last name" }]}
                            >
                                <Input size="large" placeholder="Enter last name" className="!h-[32px]" prefix={<UserOutlined className="!text-gray-400" />} />
                            </Form.Item>
                        </div>

                        {/* Email and Phone */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Form.Item
                                label="Email"
                                name="email"
                                rules={[
                                    { required: false, message: "Please enter your email" },
                                    { type: "email", message: "Please enter a valid email" },
                                ]}
                            >
                                <Input size="large" placeholder="Enter email address" className="!h-[32px]" prefix={<MailOutlined className="!text-gray-400 !mt-1 " />} />
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

                        {/* Gender and Marital Status */}
                        <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
                            <Form.Item
                                label="Gender"
                                name="gender"
                                rules={[{ required: false, message: "Please select your gender" }]}
                            >
                                <Select size="large" placeholder="Select gender" className="!h-[32px]">
                                    <Option value="Male">Male</Option>
                                    <Option value="Female">Female</Option>
                                    <Option value="Other">Other</Option>
                                </Select>
                            </Form.Item>

                            <Form.Item
                                label="Marital Status"
                                name="maritalStatus"
                                rules={[{ required: false, message: "Please select your marital status" }]}
                            >
                                <Select size="large" placeholder="Select marital status" className="!h-[32px]">
                                    <Option value="Single">Single</Option>
                                    <Option value="Married">Married</Option>
                                    <Option value="Divorced">Divorced</Option>
                                    <Option value="Widowed">Widowed</Option>
                                </Select>
                            </Form.Item>
                        </div>

                        {/* Address Section */}
                        <div className="!pt-6">
                            <h3 className="text-gray-600 font-medium mb-4">Contact Address</h3>

                            <Form.Item
                                label="Address"
                                name="address"
                                rules={[{ required: false, message: "Please enter your address" }]}
                            >
                                <Input.TextArea size="large" placeholder="Enter your full address" rows={2} />
                            </Form.Item>

                            <div className="grid grid-cols-2 md:grid-cols-2 !gap-4">
                                <Form.Item
                                    label="Country"
                                    name="country"
                                    rules={[{ required: false, message: "Please select your country" }]}
                                >
                                    <Select size="large" placeholder="Select country" className="!h-[32px]">
                                        <Option value="Nigeria">Nigeria</Option>
                                        <Option value="Ghana">Ghana</Option>
                                        <Option value="Kenya">Kenya</Option>
                                        <Option value="South Africa">South Africa</Option>
                                    </Select>
                                </Form.Item>

                                <Form.Item label="State" name="state" rules={[{ required: false, message: "Please select your state" }]}>
                                    <Select size="large" placeholder="Select state" className="!h-[32px]">
                                        <Option value="Lagos">Lagos</Option>
                                        <Option value="Abuja">Abuja</Option>
                                        <Option value="Rivers">Rivers</Option>
                                        <Option value="Kano">Kano</Option>
                                    </Select>
                                </Form.Item>
                            </div>
                        </div>
                    </Form>

                    {/* Action Buttons */}

                    <ActionButtons
                        onBack={onBack}
                        onProceed={handleProceed}
                        backText="Back" // Optional - defaults to "Back"
                        proceedText="Proceed" // Optional - defaults to "Proceed"
                        containerClassName="additional-classes-if-needed"
                    // You can also pass additional Button props:

                    />
                </div>
           
     </OnboardingWrapper>
    )
}

export default OnboardingPersonalInfo
