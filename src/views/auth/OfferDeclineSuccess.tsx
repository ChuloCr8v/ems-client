import type React from "react";
import OnboardingWrapper from "../../component/OnboardingLayout";
import { useForm } from "antd/es/form/Form";

const OfferDeclineSuccess: React.FC = () => {
  //temporary build fix
  const [form] = useForm();

  return (
    <OnboardingWrapper
      title=""
      subtitle=""
      maxWidth="max-w-[400px]"
      formFields={[]}
      setStep={function (value: React.SetStateAction<number>): void {
        throw new Error(value + "Function not implemented.");
      }}
      step={0}
      form={form}
    >
      <div className="  text-center  mx-auto flex flex-col items-center justify-center">
        <div className="flex justify-center items-center mb-6">
          <img
            src="/login/OnBoarding/successEmoji.png"
            alt="Submission Successful"
            className="w-24 h-24 object-contain"
          />
        </div>
        <h2 className="!text-2xl !font-bold text-black !mb-4">
          Employment Offer Declined!
        </h2>
        <p className="!text-gray-500 !text-base !mb-8">
          We appreciate your time and feedback. We wish you all the{" "}
          <br className="md:block hidden" />
          best in your journey!.
        </p>
      </div>
    </OnboardingWrapper>
  );
};

export default OfferDeclineSuccess;
