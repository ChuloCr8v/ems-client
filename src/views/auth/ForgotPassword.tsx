import React from 'react';
import { Button, Form, Input } from 'antd';
import { ArrowLeftOutlined, MailOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import BackgroundWrapper from '../../component/BackgroundWrapper';

const ForgotPassword: React.FC = () => {
    const navigate = useNavigate();

    const onFinish = (values: { email: string }) => {
        console.log('Reset email submitted:', values);
    };

    return (
        <BackgroundWrapper>
            <div className="sm:top-20 top-20 lg:top-[-10%] absolute flex lg:flex lg:items-center justify-center h-full !px-4">

                <div className="w-full min-w-md space-y-6 ">
                    {/* Back Button */}
                    <Button
                        icon={<ArrowLeftOutlined />}
                        type="default"
                        onClick={() => navigate("/*")}
                        className="flex items-center !text-[#0A96CC] !border-[#0A96CC] bg-white hover:bg-[#e6f7ff]"
                    >
                        Back
                    </Button>

                    {/* Icon */}
                    <div className="flex justify-center !mt-20 !mb-4">
                        <img
                            src="/login/forgot-password.png"
                            alt="Miro Logo"
                            className=""
                        />
                    </div>

                    {/* Title + Subtitle */}
                    <div className="text-center !space-y-4 !mb-4">
                        <h2 className="!text-[24px] font-bold  ">Forgot Password?</h2>
                        <p className="!text-base text-gray-600 ">
                            Enter your registered email and we'll send you a link to reset<br/> your password.
                        </p>
                    </div>

                    {/* Form */}
                    <Form
                        name="forgotPassword"
                        onFinish={onFinish}
                        layout="vertical"
                        requiredMark={false}
                    >
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[{ required: true, message: 'Please enter your email' }]}
                        >
                            <Input size="large" placeholder="Enter Email" prefix={<MailOutlined className='!text-gray-300'/>}
/>
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" size="large" block className="bg-[#0A96CC] hover:bg-[#0984b3] top-5 !h-[40px]">
                                Send Reset Link
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </BackgroundWrapper>

    );
};

export default ForgotPassword;
