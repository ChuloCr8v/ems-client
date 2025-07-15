import React from 'react';
import { Button } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import BackgroundWrapper from '../../component/BackgroundWrapper';

const CheckInbox: React.FC = () => {
  const navigate = useNavigate();

  const handleResend = () => {
    console.log('Resend link clicked');
  };

  return (
    <BackgroundWrapper>
      <div className="sm:top-20 top-20 lg:top-[-10%] absolute flex lg:flex lg:items-center justify-center h-full !px-4">
        <div className="w-full min-w-md space-y-6">
          {/* Back Button */}
          <Button
            icon={<ArrowLeftOutlined />}
            type="default"
            onClick={() => navigate('/auth/forgotpassword')}
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

          {/* Title & Message */}
          <div className="text-center !space-y-4 !mb-4">
            <h2 className="!text-[24px] font-bold">Check Your Inbox</h2>
            <p className="text-sm text-gray-600">
              We’ve sent a password reset link to{' '}
              <span className="font-semibold text-gray-800">user@email.com</span>. <br/> Click
              the link to create a new password.
            </p>
          </div>

          {/* Resend Button */}
          <div>
            <Button
              type="primary"
              block
              size="large"
              onClick={handleResend}
              className="bg-[#0A96CC] hover:bg-[#0984b3] top-5 !h-[40px]"
            >
              Resend Link
            </Button>
          </div>
        </div>
      </div>
    </BackgroundWrapper>
  );
};

export default CheckInbox;
