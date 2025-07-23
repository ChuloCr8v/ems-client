import { Steps } from "antd"

interface OnboardingStepsProps {
  currentStep: number
}

const OnboardingSteps = ({ currentStep }: OnboardingStepsProps) => {
  const steps = [
    {
      title: (
        <div className="flex flex-col md:flex-row md:items-center !md:space-x-3 !gap-4">
          {/* Icon for large screens */}
          <div
            className={`hidden md:flex p-4 rounded-full h-[40px] w-[40px] items-center justify-center ${
              currentStep >= 0 ? "bg-[#E7F5FA]" : "bg-[#EEF1F0]"
            }`}
          >
            {currentStep > 0 ? (
              <svg className="w-5 h-5 text-[#0A96CC]" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <img src="/login/OnBoarding/personalInfo.png" alt="Personal Info" className="w-5 h-5 object-contain" />
            )}
          </div>

          {/* Title text */}
          <div className="hidden md:flex md:flex-col">
            <p className="text-sm text-gray-500">Step 1/3</p>
            <p className="text-[14px] font-extrabold text-black">Personal Info</p>
          </div>
        </div>
      ),
      icon: (
        <div
          className={`md:hidden p-4 rounded-full h-[40px] w-[40px] flex items-center justify-center ${
            currentStep >= 0 ? "bg-[#E7F5FA]" : "bg-[#EEF1F0]"
          }`}
        >
          {currentStep > 0 ? (
            <svg className="w-5 h-5 text-[#0A96CC]" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          ) : (
            <img src="/login/OnBoarding/personalInfo.png" alt="Personal Info" className="w-5 h-5 object-contain" />
          )}
        </div>
      ),
    },



    {
      title: (
        <div className="flex flex-col md:flex-row md:items-center md:space-x-3 !gap-4">
          {/* Icon for large screens */}
          <div
            className={`hidden md:flex p-4 rounded-full h-[40px] w-[40px] items-center justify-center ${
              currentStep === 1 ? "bg-[#E7F5FA]" : currentStep > 1 ? "bg-[#E7F5FA]" : "bg-[#EEF1F0]"
            }`}
          >
            {currentStep > 1 ? (
              <svg className="w-5 h-5 text-[#0A96CC]" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
  ) : currentStep === 0 ? (
            <img
              src="/login/OnBoarding/phone.png"
              alt="Key Contacts"
              className={`w-[24px] h-[24px]`}
            />
          ) : (
            <img
              src="/login/OnBoarding/phoneBlue.png"
              alt="Key Contacts"
              className={`w-[24px] h-[24px]`}
            />
          )}
        </div>

          {/* Title text */}
          <div className="hidden md:flex md:flex-col">
            <p className="text-sm text-gray-500">Step 2/3</p>
            <p className="text-[14px] font-extrabold text-black">Key Contacts</p>
          </div>
        </div>
      ),
      icon: (
        <div
          className={`md:hidden p-4 rounded-full h-[40px] w-[40px] flex items-center justify-center ${
            currentStep === 1 ? "bg-[#E7F5FA]" : currentStep > 1 ? "bg-[#E7F5FA]" : "bg-[#EEF1F0]"
          }`}
        >
          {currentStep === 2 ? (
            <svg className="w-5 h-5 text-[#0A96CC]" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          ) : currentStep === 0 ? (
            <img
              src="/login/OnBoarding/phone.png"
              alt="Key Contacts"
              className={`w-5 h-5 object-contain`}
            />
          ) : (
            <img
              src="/login/OnBoarding/phoneBlue.png"
              alt="Key Contacts"
              className={`w-5 h-5 object-contain`}
            />
          )}
        </div>
      ),
    },



    {
      title: (
        <div className="flex flex-col md:flex-row md:items-center md:space-x-3 !gap-4">
          {/* Icon for large screens */}
          <div
            className={`hidden md:flex p-4 rounded-full h-[40px] w-[40px] items-center justify-center ${
              currentStep === 2 ? "bg-[#E7F5FA]" : currentStep > 2 ? "bg-[#E7F5FA]" : "bg-[#EEF1F0]"
            }`}
          >
            {currentStep > 2 ? (
              <svg className="w-5 h-5 text-[#0A96CC]" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <img
                src="/login/OnBoarding/document.png"
                alt="Documents"
                className={`w-5 h-5 object-contain ${currentStep === 2 ? "filter brightness-0 invert" : ""}`}
              />
            )}
          </div>

          {/* Title text */}
          <div className="hidden md:flex md:flex-col">
            <p className="text-sm text-gray-500">Step 3/3</p>
            <p className="text-[14px] font-extrabold text-black">Documents</p>
          </div>
        </div>
      ),
      icon: (
        <div
          className={`md:hidden p-4 rounded-full h-[40px] w-[40px] flex items-center justify-center ${
            currentStep === 2 ? "bg-[#E7F5FA]" : currentStep > 2 ? "bg-[#E7F5FA]" : "bg-[#EEF1F0]"
          }`}
        >
          {currentStep > 2 ? (
            <svg className="w-5 h-5 text-[#0A96CC]" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          ) : (
            <img
              src="/login/OnBoarding/document.png"
              alt="Documents"
              className={`w-5 h-5 object-contain ${currentStep === 2 ? "filter brightness-0 invert" : ""}`}
            />
          )}
        </div>
      ),
    },
  ]

  return (
    <div className="!px-4  bg-white rounded-full !py-4 !mb-4">
      <Steps
        current={currentStep}
        items={steps}
        className="custom-steps-responsive !w-5/6"
        direction="horizontal"
        
        responsive={false}
      />
    </div>
  )
}

export default OnboardingSteps
