import type React from "react"
import OnboardingWrapper from "../../component/OnboardingWrapper"


const OnboardingSuccess: React.FC = () => {
    return (
        <OnboardingWrapper title="" subtitle="" maxWidth="max-w-[500px]">
            <div className="  text-center  mx-auto flex flex-col items-center justify-center">
                <div className="flex justify-center items-center mb-6">
                    <img src="/login/OnBoarding/successEmoji.png" alt="Submission Successful" className="w-24 h-24 object-contain" />
                </div>
                <h2 className="!text-2xl !font-bold text-black !mb-4">Submission Successfull!</h2>
                <p className="!text-gray-500 !text-base !mb-8">
                    Your onboarding form and documents have been submitted<br className="md:block hidden" /> for review. Our team will verify your information and
                    get back <br className="md:block hidden"/>to you shortly.
                </p>

                <div className="bg-gray-50 !p-6 rounded-lg text-left !space-y-4">
                    <div className="flex items-start !space-x-2">
                        <img src="/login/OnBoarding/checkmate.png" alt="" className="size-[20px] !mt-2" />
                        <p className="!text-gray-500 !text-base">You'll receive a confirmation once your information is <br/>approved.</p>
                    </div>
                    <div className="flex items-start !space-x-2">
                        <img src="/public/login/OnBoarding/checkmate.png" alt="" className="size-[20px]" />
                        <p className="!text-gray-500 !text-base">If any updates are required, we'll reach out via your email.</p>
                    </div>
                </div>
            </div>
        </OnboardingWrapper>
    )
}

export default OnboardingSuccess
