import React from "react";
import { Button, Checkbox, Form, Input } from "antd";
import BackgroundWrapper from "../../component/BackgroundWrapper";
import { useMsalAuth } from "../../api/msal";
import { useLoginMicrosoftMutation } from "../../api/data/auth";
import { useAuthComplete } from "../../hooks/authHooks";

const Login: React.FC = () => {
  const [loginMs, { isLoading: isMicrosoftLoggingIn }] =
    useLoginMicrosoftMutation();

  const msal = useMsalAuth();
  const authComplete = useAuthComplete();

  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const onLoginWithMicrosoft = () => {
    msal
      .login()
      .then((res) => authComplete(loginMs({ token: res.accessToken })));
  };

  return (
    <BackgroundWrapper>
      <div className="relative min-h-screen w-full overflow-hidden">
        {/* Background elements */}
        <div className="absolute top-0 !right-8 z-2 md:hidden">
          <img src="/public/login/login-image.png" alt="" />
        </div>
        <div className="bg-white/60 h-full w-full absolute top-0 left-0 z-1 backdrop-blur-2xl"></div>
        <div className="w-[350px] h-[350px] rounded-full bg-[#40B554]/30 backdrop-blur-3xl absolute left-0 top-0 md:hidden"></div>

        {/* Main content */}
        <div className="relative z-10 w-full min-h-screen flex items-center justify-center !px-0 !py-38">
          <div className="!w-full max-w-md">
            <div className="bg-white !w-full !py-5 !px-5 rounded-t-lg">
              <div className="flex flex-col items-center justify-center ">
                <img
                  src="/login/miroLogo.png"
                  alt=""
                  className="w-[69px] h-[32px] mb-4"
                />
                <h2 className="text-[24px] font-bold text-gray-900 mb-2">
                  Welcome back
                </h2>
              </div>
              <p className="text-sm text-gray-600 text-center">
                Sign in to access your dashboard and manage your employee{" "}
                <br className="hidden lg:block" />
                profile, tasks, and more.
              </p>
            </div>

            <Form
              name="login"
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              className="mt-2 space-y-6 bg-white !px-5 rounded-b-lg"
              layout="vertical"
            >
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { required: false, message: "Please input your email!" },
                ]}
              >
                <Input placeholder="Enter Email" size="large" />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[
                  { required: false, message: "Please input your password!" },
                ]}
              >
                <Input.Password placeholder="Enter Password" size="large" />
              </Form.Item>

              <div className="flex items-center justify-between">
                <Form.Item
                  name="remember"
                  valuePropName="checked"
                  className="mb-0"
                >
                  <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <a href="#" className="text-[#0A96CC] font-bold text-sm">
                  Forgot Password?
                </a>
              </div>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  block
                  size="large"
                  className="h-[40px]"
                >
                  Sign In
                </Button>
              </Form.Item>
            </Form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="px-2 bg-white text-gray-500 text-sm">or</span>
              </div>
            </div>

            <div>
              <Button
                loading={isMicrosoftLoggingIn}
                onClick={onLoginWithMicrosoft}
                icon=""
                block
                size="large"
                className="flex items-center justify-center space-x-2 !mt-4 !h-[40px] md:!w-[410px] md:ml-[14px] "
              >
                <img
                  src="/login/microsoft.png"
                  alt=""
                  className="size-[20px]"
                />{" "}
                <h1 className="font-bold">Sign in with Microsoft</h1>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </BackgroundWrapper>
  );
};

export default Login;
