
import { useState } from "react"
import InvitationBackgroundWrapper from "../../component/InvitationBackgroundWrapper"
import OfferAcceptance from "./OfferAcceptance"
import OnboardingPersonalInfo from "./OnBoardingPersonalInfo"
import OnboardingKeyContacts from "./Onboarding-key-contacts"
import OnboardingDocuments from "./OnboardingDocuments"


type FlowStep = "offer" | "personal-info" | "key-contacts" | "documents" | "completed"

const InvitationFlow: React.FC = () => {
    const [step, setStep] = useState<FlowStep>("offer")

    const handleOfferAccept = () => {
        setStep("personal-info")
    }

    const handlePersonalInfoProceed = () => {
        setStep("key-contacts")
    }

    const handlePersonalInfoBack = () => {
        setStep("offer")
    }

    const handleKeyContactsProceed = () => {
        setStep("documents")
        // TODO: Navigate to documents step
        console.log("Proceeding to documents step")
    }

    const handleKeyContactsBack = () => {
        setStep("personal-info")
    }

    const handleDocumentsProceed = () => {
        setStep("completed")
        console.log("Onboarding completed!")
    }

    const handleDocumentsBack = () => {
        setStep("key-contacts")
    }

    // const handleAcceptOffer = () => {
    //     console.log("Offer accepted")
    //     // Handle accept logic here
    // }

    // const handleDeclineOffer = () => {
    //     console.log("Offer declined")
    //     // Handle decline logic here
    // }

    return (
        <InvitationBackgroundWrapper>
            {step === "offer" && <OfferAcceptance onContinue={handleOfferAccept} />}

            {step === "personal-info" && (
                <OnboardingPersonalInfo onProceed={handlePersonalInfoProceed} onBack={handlePersonalInfoBack} />
            )}

            {step === "key-contacts" && (
                <OnboardingKeyContacts onProceed={handleKeyContactsProceed} onBack={handleKeyContactsBack} />
            )}

            {step === "documents" && <OnboardingDocuments onProceed={handleDocumentsProceed} onBack={handleDocumentsBack} />}

            {step === "completed" && (
                <div className="w-full max-w-[800px] bg-white/25 rounded-2xl p-8 backdrop-blur-2xl">
                    <div className="text-center text-gray-800">
                        <h2 className="text-2xl font-bold mb-4">Onboarding Complete!</h2>
                        <p>Thank you for completing your profile.</p>
                    </div>
                </div>
            )}
        </InvitationBackgroundWrapper>
    )
}

export default InvitationFlow
