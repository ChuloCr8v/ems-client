import { CheckmarkCircle03Icon } from "@hugeicons/core-free-icons";
import { useForm } from "antd/es/form/Form";
import type React from "react";
import OnboardingLayout from "../../component/OnboardingLayout";
import Icon from "../../component/common/Icon";

const OnboardingSuccess = ({ step }: { step: number }) => {
  //temporary build fix
  const [form] = useForm();

  const messages = [
    "You'll receive a confirmation once your information is approved.",
    "If any updates are required, we'll reach out via your email.",
  ];

  return (
    <OnboardingLayout
      title=""
      subtitle=""
      maxWidth="max-w-[520px]"
      formFields={[]}
      setStep={function (_value: React.SetStateAction<number>): void {
        throw new Error("Function not implemented.");
      }}
      step={step}
      form={form}
    >
      <div className="text-center p-3 mx-auto flex flex-col items-center justify-center">
        <div className="flex justify-center items-center mb-6">
          <img
            src="/login/OnBoarding/successEmoji.png"
            alt="Submission Successful"
            className="w-24 h-24 object-contain"
          />
        </div>
        <h2 className="!text-2xl !font-bold text-black !mb-4">
          Submission Successfull!
        </h2>
        <p className="!text-gray-500 !text-base !mb-8">
          Your onboarding form and documents have been submitted for review. Our
          team will verify your information and get back to you shortly.
        </p>

        <div className="bg-gray-50 py-2 px-3 rounded-lg text-left !space-y-4">
          {messages.map((item) => (
            <div className="flex items-center gap-4" key={item}>
              <Icon color="green" icon={CheckmarkCircle03Icon} size={24} />
              <p className="text-sm text-gray">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </OnboardingLayout>
  );
};

export default OnboardingSuccess;
