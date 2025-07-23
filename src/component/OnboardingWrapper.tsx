import type { ReactNode } from "react";

interface OnboardingWrapperProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  maxWidth?: string;
}

const OnboardingWrapper = ({
  children,
  title = "Let's Get You Set Up",
  subtitle = "Your basic info has been prefilled. Please complete your profile and upload your signed documents to proceed.",
  maxWidth = "max-w-[800px]",
}: OnboardingWrapperProps) => {
  return (
    <div
      className={`w-full ${maxWidth} bg-white/25 !rounded-2xl !p-8 backdrop-blur-2xl relative`}
    >
      <div className=" rounded-2xl ">
        {/* Header */}
        <div className="px-8 py-6 text-center">
          <h1 className="!text-2xl font-bold text-gray-900 !mb-2">{title}</h1>
          <p className="text-gray-500 text-sm !mb-4">{subtitle}</p>
        </div>

        {/* <div className="!bg-red-300 rounded-2xl w-full text-left">
         <div><IoWarningOutline/></div>
          <div>
            <p className="font-bold">Instruction</p>
            <p>Please fix your emergency contact phone number and re-upload a clearer copy of your ID</p>
          </div>
        </div> */}

        {children}
      </div>
    </div>
  );
};

export default OnboardingWrapper;
