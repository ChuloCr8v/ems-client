import type React from "react"
import { useState } from "react"
import { Button, Form, Input, Select, Steps } from "antd"
import { ArrowRightOutlined } from "@ant-design/icons"


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

const OnboardingPersonalInfo: React.FC = () => {
    const [form] = Form.useForm<PersonalInfoForm>()
    const [currentStep, setCurrentStep] = useState(0)

    const steps = [
        {
            title: (
            <div className="flex flex-col">
                <p >Step 1/3</p>
                <p className="text-[14px] font-extrabold text-black ">Personal Info</p>
            </div>),
            icon: (<div className="!p-4 bg-[#EEF1F0] rounded-4xl h-[40px] w-[40px] !mt-4" ><img src="/public/login/OnBoarding/personalInfo.png" alt="" /></div>),
        },
        {

            title: (
            <div className="flex flex-col">
                <p>Step 2/3</p>
                <p className="text-[14px] font-extrabold text-black">Key Contacts</p>
            </div>),
            icon: (<div className="!p-4 bg-[#EEF1F0] rounded-4xl h-[40px] w-[40px] !mt-4" ><img src="/public/login/OnBoarding/phone.png" alt="" /></div>),
        },
        {
            title: (
            <div className="flex flex-col">
                <p>Step 3/3</p>
                <p className="text-[14px] font-extrabold text-black">Documents</p>
            </div>),
            icon: (
                <div className="!p-4 bg-[#EEF1F0] rounded-4xl h-[40px] w-[40px] !mt-4" ><img src="/public/login/OnBoarding/document.png" alt="" /></div>),
        },
    ]

    const onFinish = (values: PersonalInfoForm) => {
        console.log("Form values:", values)
        // Handle form submission
    }

    const handleCancel = () => {
        console.log("Form cancelled")
        // Handle cancel action
    }

    const handleProceed = () => {
        form
            .validateFields()
            .then((values) => {
                console.log("Proceeding with values:", values)
                // Move to next step or submit
                if (currentStep < steps.length - 1) {
                    setCurrentStep(currentStep + 1)
                }
            })
            .catch((errorInfo) => {
                console.log("Validation failed:", errorInfo)
            })
    }

    return (
        <div className="w-full max-w-[800px]  bg-white/25 rounded-2xl !p-8 backdrop-blur-2xl">
            <div className="w-full rounded-2xl">
                {/* Header */}
                <div className=" px-8 py-6 text-center ">
                    <h1 className="!text-2xl font-bold text-gray-900 !mb-2">Let's Get You Set Up</h1>
                    <p className="text-gray-500 text-sm !mb-4">
                        Your basic info has been prefilled. Please complete your profile and upload your signed documents to
                        proceed.
                    </p>
                </div>

                {/* Progress Steps */}
                <div className="!px-3 !py-3 bg-white rounded-4xl">
                    <Steps current={currentStep} items={steps} className="custom-steps" />
                </div>

                {/* Form Content */}
                <div className="!p-8 bg-white !mt-6">
                    <div className="mb-6">
                        <h2 className="text-xl font-semibold text-gray-800 mb-2">Personal Information</h2>
                        <p className="text-gray-500 text-sm">Personal Information</p>
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
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Form.Item
                                label="First Name"
                                name="firstName"
                                rules={[{ required: false, message: "Please enter your first name" }]}
                            >
                                <Input size="large" placeholder="Enter first name" />
                            </Form.Item>

                            <Form.Item
                                label="Last Name"
                                name="lastName"
                                rules={[{ required: false, message: "Please enter your last name" }]}
                            >
                                <Input size="large" placeholder="Enter last name" />
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
                                <Input size="large" placeholder="Enter email address" />
                            </Form.Item>

                            <Form.Item
                                label="Phone Number"
                                name="phoneNumber"
                                rules={[{ required: false, message: "Please enter your phone number" }]}
                            >
                                <Input
                                    size="large"
                                    placeholder="Enter phone number"
                                    addonBefore={
                                        <div className="flex items-center space-x-1">
                                            <span className="text-lg">🇳🇬</span>
                                            <span className="text-sm">+234</span>
                                        </div>
                                    }
                                />
                            </Form.Item>
                        </div>

                        {/* Gender and Marital Status */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Form.Item
                                label="Gender"
                                name="gender"
                                rules={[{ required: false, message: "Please select your gender" }]}
                            >
                                <Select size="large" placeholder="Select gender">
                                    <Option value="Male">Male</Option>
                                    <Option value="Female">Female</Option>
                                    <Option value="Other">Other</Option>
                                </Select>
                            </Form.Item>

                            <Form.Item
                                label="Marital Status"
                                name="maritalStatus"
                                rules={[{ required: true, message: "Please select your marital status" }]}
                            >
                                <Select size="large" placeholder="Select marital status">
                                    <Option value="Single">Single</Option>
                                    <Option value="Married">Married</Option>
                                    <Option value="Divorced">Divorced</Option>
                                    <Option value="Widowed">Widowed</Option>
                                </Select>
                            </Form.Item>
                        </div>

                        {/* Address Section */}
                        <div className="pt-4">
                            <h3 className="text-gray-600 font-medium mb-4">Contact Address</h3>

                            <Form.Item
                                label="Address"
                                name="address"
                                rules={[{ required: false, message: "Please enter your address" }]}
                            >
                                <Input.TextArea size="large" placeholder="Enter your full address" rows={2} />
                            </Form.Item>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Form.Item
                                    label="Country"
                                    name="country"
                                    rules={[{ required: false, message: "Please select your country" }]}
                                >
                                    <Select size="large" placeholder="Select country">
                                        <Option value="Nigeria">Nigeria</Option>
                                        <Option value="Ghana">Ghana</Option>
                                        <Option value="Kenya">Kenya</Option>
                                        <Option value="South Africa">South Africa</Option>
                                    </Select>
                                </Form.Item>

                                <Form.Item label="State" name="state" rules={[{ required: false, message: "Please select your state" }]}>
                                    <Select size="large" placeholder="Select state">
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
                    <div className="flex flex-col sm:flex-row justify-end gap-4 pt-8 border-t mt-8">
                        <Button
                            size="large"
                            onClick={handleCancel}
                            className="w-full sm:w-auto min-w-[120px] h-12 border-gray-300 text-gray-600 hover:border-gray-400 hover:text-gray-700"
                        >
                            Cancel
                        </Button>

                        <Button
                            type="primary"
                            size="large"
                            onClick={handleProceed}
                            icon={<ArrowRightOutlined />}
                            className="w-full sm:w-auto min-w-[160px] h-12 bg-[#0A96CC] hover:bg-[#0984b3] border-[#0A96CC] font-medium"
                        >
                            Proceed
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OnboardingPersonalInfo
