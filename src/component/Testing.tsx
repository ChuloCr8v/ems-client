// "use client"

// import type React from "react"
// import { useState } from "react"
// import { Form, Input, Select, Steps } from "antd"
// import { MailOutlined, PhoneOutlined, UserOutlined } from "@ant-design/icons"

// const { Option } = Select

// interface PersonalInfoForm {
//   firstName: string
//   lastName: string
//   email: string
//   phoneNumber: string
//   gender: string
//   maritalStatus: string
//   address: string
//   country: string
//   state: string
// }

// interface OnboardingPersonalInfoProps {
//   onProceed: () => void
//   onBack: () => void
// }

// const OnboardingPersonalInfo: React.FC<OnboardingPersonalInfoProps> = ({ onProceed, onBack }) => {
//   const [form] = Form.useForm<PersonalInfoForm>()
//   const [currentStep] = useState(0)

//   const steps = [
//     {
//       title: (
//         <div className="md:flex md:flex-col hidden">
//           <p>Step 1/3</p>
//           <p className="text-[14px] font-extrabold text-black">Personal Info</p>
//         </div>
//       ),
//       icon: (
//         <div className="p-4 bg-[#0A96CC] rounded-full h-[40px] w-[40px] flex items-center justify-center">
//           <img
//             src="/login/OnBoarding/personalInfo.png"
//             alt="Personal Info"
//             className="w-5 h-5 object-contain filter brightness-0 invert"
//           />
//         </div>
//       ),
//     },
//     {
//       title: (
//         <div className="md:flex md:flex-col hidden">
//           <p>Step 2/3</p>
//           <p className="text-[14px] font-extrabold text-black">Key Contacts</p>
//         </div>
//       ),
//       icon: (
//         <div className="p-4 bg-[#EEF1F0] rounded-full h-[40px] w-[40px] flex items-center justify-center">
//           <img src="/login/OnBoarding/phone.png" alt="Key Contacts" className="w-5 h-5 object-contain" />
//         </div>
//       ),
//     },
//     {
//       title: (
//         <div className="md:flex md:flex-col hidden">
//           <p>Step 3/3</p>
//           <p className="text-[14px] font-extrabold text-black">Documents</p>
//         </div>
//       ),
//       icon: (
//         <div className="p-4 bg-[#EEF1F0] rounded-full h-[40px] w-[40px] flex items-center justify-center">
//           <img src="/login/OnBoarding/document.png" alt="Documents" className="w-5 h-5 object-contain" />
//         </div>
//       ),
//     },
//   ]

//   const onFinish = (values: PersonalInfoForm) => {
//     console.log("Form values:", values)
//     onProceed()
//   }

//   const handleProceed = () => {
//     form
//       .validateFields()
//       .then((values) => {
//         console.log("Proceeding with values:", values)
//         onProceed()
//       })
//       .catch((errorInfo) => {
//         console.log("Validation failed:", errorInfo)
//       })
//   }

//   return (
//     <div className="w-full max-w-[800px] bg-white/25 rounded-2xl p-8 backdrop-blur-2xl">
//       <div className="w-full rounded-2xl">
//         {/* Header */}
//         <div className="px-8 py-6 text-center">
//           <h1 className="text-2xl font-bold text-gray-900 mb-2">Let's Get You Set Up</h1>
//           <p className="text-gray-500 text-sm mb-4">
//             Your basic info has been prefilled. Please complete your profile and upload your signed documents to
//             proceed.
//           </p>
//         </div>

//         {/* Progress Steps */}
//         <div className="px-8 bg-white rounded-full py-4">
//           <Steps current={currentStep} items={steps} className="custom-steps-mobile-row" />
//         </div>

//         {/* Form Content */}
//         <div className="p-8 bg-white mt-6">
//           <div className="mb-6">
//             <h2 className="text-xl font-semibold text-gray-800 mb-4">Personal Information</h2>
//             <p className="text-gray-500 text-sm">Personal Information</p>
//           </div>

//           <Form
//             form={form}
//             layout="vertical"
//             onFinish={onFinish}
//             initialValues={{
//               firstName: "Modesta",
//               lastName: "Ekeh",
//               email: "modestajekeh@gmail.com",
//               phoneNumber: "8101000100",
//               gender: "Female",
//             }}
//             className="space-y-4"
//           >
//             {/* Name Fields */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <Form.Item
//                 label="First Name"
//                 name="firstName"
//                 rules={[{ required: false, message: "Please enter your first name" }]}
//               >
//                 <Input
//                   size="large"
//                   placeholder="Enter first name"
//                   prefix={<UserOutlined className="text-gray-400" />}
//                   className="h-[32px]"
//                 />
//               </Form.Item>

//               <Form.Item
//                 label="Last Name"
//                 name="lastName"
//                 rules={[{ required: false, message: "Please enter your last name" }]}
//               >
//                 <Input
//                   size="large"
//                   placeholder="Enter last name"
//                   className="h-[32px]"
//                   prefix={<UserOutlined className="text-gray-400" />}
//                 />
//               </Form.Item>
//             </div>

//             {/* Email and Phone */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <Form.Item
//                 label="Email"
//                 name="email"
//                 rules={[
//                   { required: false, message: "Please enter your email" },
//                   { type: "email", message: "Please enter a valid email" },
//                 ]}
//               >
//                 <Input
//                   size="large"
//                   placeholder="Enter email address"
//                   className="h-[32px]"
//                   prefix={<MailOutlined className="text-gray-400" />}
//                 />
//               </Form.Item>

//               <Form.Item
//                 label="Phone Number"
//                 name="phoneNumber"
//                 rules={[{ required: false, message: "Please enter your phone number" }]}
//               >
//                 <div className="flex space-x-2">
//                   <Select size="small" placeholder="Country code" className="w-[90px] h-[32px]" defaultValue="Nigeria">
//                     <Option value="Nigeria">+234</Option>
//                     <Option value="Ghana">+233</Option>
//                     <Option value="Gambia">+220</Option>
//                     <Option value="Rwanda">+250</Option>
//                   </Select>
//                   <Input
//                     size="large"
//                     placeholder="Enter phone number"
//                     className="h-[32px] flex-1"
//                     prefix={<PhoneOutlined className="text-gray-400" />}
//                   />
//                 </div>
//               </Form.Item>
//             </div>

//             {/* Gender and Marital Status */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <Form.Item
//                 label="Gender"
//                 name="gender"
//                 rules={[{ required: false, message: "Please select your gender" }]}
//               >
//                 <Select size="large" placeholder="Select gender" className="h-[32px]">
//                   <Option value="Male">Male</Option>
//                   <Option value="Female">Female</Option>
//                   <Option value="Other">Other</Option>
//                 </Select>
//               </Form.Item>

//               <Form.Item
//                 label="Marital Status"
//                 name="maritalStatus"
//                 rules={[{ required: false, message: "Please select your marital status" }]}
//               >
//                 <Select size="large" placeholder="Select marital status" className="h-[32px]">
//                   <Option value="Single">Single</Option>
//                   <Option value="Married">Married</Option>
//                   <Option value="Divorced">Divorced</Option>
//                   <Option value="Widowed">Widowed</Option>
//                 </Select>
//               </Form.Item>
//             </div>

//             {/* Address Section */}
//             <div className="pt-6">
//               <h3 className="text-gray-600 font-medium mb-4">Contact Address</h3>

//               <Form.Item
//                 label="Address"
//                 name="address"
//                 rules={[{ required: false, message: "Please enter your address" }]}
//               >
//                 <Input.TextArea size="large" placeholder="Enter your full address" rows={2} />
//               </Form.Item>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <Form.Item
//                   label="Country"
//                   name="country"
//                   rules={[{ required: false, message: "Please select your country" }]}
//                 >
//                   <Select size="large" placeholder="Select country" className="h-[32px]">
//                     <Option value="Nigeria">Nigeria</Option>
//                     <Option value="Ghana">Ghana</Option>
//                     <Option value="Kenya">Kenya</Option>
//                     <Option value="South Africa">South Africa</Option>
//                   </Select>
//                 </Form.Item>

//                 <Form.Item
//                   label="State"
//                   name="state"
//                   rules={[{ required: false, message: "Please select your state" }]}
//                 >
//                   <Select size="large" placeholder="Select state" className="h-[32px]">
//                     <Option value="Lagos">Lagos</Option>
//                     <Option value="Abuja">Abuja</Option>
//                     <Option value="Rivers">Rivers</Option>
//                     <Option value="Kano">Kano</Option>
//                   </Select>
//                 </Form.Item>
//               </div>
//             </div>
//           </Form>

//           {/* Action Buttons */}
//           <ActionButtons onBack={onBack} onProceed={handleProceed} backText="Back" proceedText="Proceed" />
//         </div>
//       </div>
//     </div>
//   )
// }

// export default OnboardingPersonalInfo
