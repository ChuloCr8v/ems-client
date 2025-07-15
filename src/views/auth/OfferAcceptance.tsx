import React from 'react';
import { Button } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';

interface OfferAcceptanceProps {
  onContinue: () => void;
}

const OfferAcceptance: React.FC <OfferAcceptanceProps>= ({ onContinue}) => {
  return (
    
      <div className="w-full max-w-xl bg-white/25 rounded-2xl !p-8  space-y-8 backdrop-blur-2xl ">
          
        <div className="text-center">
          <h1 className="!text-2xl md:text-3xl font-bold text-gray-800">
            Welcome to Zoracom, Modesta
          </h1>
          <p className="text-gray-500 text-sm !mt-2 ">
            We’re excited to have you join our team! Below are the details <br className='hidden '/>of your offer.
          </p>
        </div>

        <div className='bg-white !rounded-xl !p-6 !mt-4'>
        <div className="!space-y-4 ">
          <h2 className="!text-lg font-semibold text-black">Your Employment Details</h2>
          <div className="bg-green-50 border !border-green-50   rounded-xl !p-4">
            <div className="grid grid-cols-2 gap-y-3  text-[14px]">
              <div className="font-medium">Role</div>
              <div className="text-right text-gray-700">Product Designer</div>
              <div className="font-medium">Job Type</div>
              <div className="text-right text-gray-700">Full-Time</div>
              <div className="font-medium">Duration</div>
              <div className="text-right text-gray-700">6 Months</div>
              <div className="font-medium">Start Date</div>
              <div className="text-right text-gray-700">July 8, 2025</div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 !pt-8">
          <Button 
          type="default" 
          className="!text-[#0A96CC] border-[#0A96CC] hover:bg-[#e6f7ff] w-full !h-[40px]">
            Decline Offer
          </Button>
          <Button
            type="primary"
            onClick={onContinue}
            className="bg-[#0A96CC] hover:bg-[#0984b3] flex items-center w-full !h-[40px]"
            icon={<ArrowRightOutlined />}
          >
            Accept Offer & Continue
          </Button>
        </div>
        </div>
        {/* Footer */}
      </div>
    
  );
};

export default OfferAcceptance;