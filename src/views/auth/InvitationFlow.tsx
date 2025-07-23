import { useState } from "react";
import InvitationBackgroundWrapper from "../../component/InvitationBackgroundWrapper";
import OfferAcceptance from "./OfferAcceptance";// Make sure to import the OfferDecline component
import OnboardingPersonalInfo from "./OnBoardingPersonalInfo";
import OnboardingKeyContacts from "./Onboarding-key-contacts";
import OnboardingDocuments from "./OnboardingDocuments";
import OnboardingSuccess from "./OnboardingSuccess";
import OfferDecline from "./Offer-decline";
import OfferDeclineSuccess from "./OfferDeclineSuccess";

type FlowStep = "offer" | "offer-decline" | "offer-decline-success" | "personal-info" | "key-contacts" |
    "documents" | "success";

const InvitationFlow: React.FC = () => {
    const [step, setStep] = useState<FlowStep>("offer");

    const handleOfferAccept = () => {
        setStep("personal-info");
    };

    const handleOfferDecline = () => {
        setStep("offer-decline");
    };

    const handleDeclineConfirmed = () => {
        console.log("Offer declined and feedback submitted");
        // Here you might want to redirect or show a confirmation message
        // For now, we'll just go back to the offer screen
        setStep("offer-decline-success");
    };

    const handleDeclineCancel = () => {
        setStep("offer");
    };

    const handlePersonalInfoProceed = () => {
        setStep("key-contacts");
    };

    const handlePersonalInfoBack = () => {
        setStep("offer");
    };

    const handleKeyContactsProceed = () => {
        setStep("documents");
        console.log("Proceeding to documents step");
    };

    const handleKeyContactsBack = () => {
        setStep("personal-info");
    };

    const handleDocumentsProceed = () => {
        setStep("success");
        console.log("Onboarding completed!");
    };

    const handleDocumentsBack = () => {
        setStep("key-contacts");
    };

    return (
        <InvitationBackgroundWrapper>
            {step === "offer" && (
                <OfferAcceptance
                    onContinue={handleOfferAccept}
                    onDecline={handleOfferDecline}
                />
            )}

            {step === "offer-decline" && (
                <OfferDecline
                    onCancel={handleDeclineCancel}
                    onDecline={handleDeclineConfirmed}
                />
            )}

            {step === "offer-decline-success" && (
                <OfferDeclineSuccess />
            )}

            {/* Rest of your components remain the same */}
            {step === "personal-info" && (
                <OnboardingPersonalInfo
                    onProceed={handlePersonalInfoProceed}
                    onBack={handlePersonalInfoBack}
                />
            )}

            {step === "key-contacts" && (
                <OnboardingKeyContacts
                    onProceed={handleKeyContactsProceed}
                    onBack={handleKeyContactsBack}
                />
            )}

            {step === "documents" && (
                <OnboardingDocuments
                    onProceed={handleDocumentsProceed}
                    onBack={handleDocumentsBack}
                />
            )}

            {step === "success" && <OnboardingSuccess />}
        </InvitationBackgroundWrapper>

    );
};

export default InvitationFlow;