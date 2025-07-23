import { useState } from "react";
import { useNavigate } from "react-router-dom";
import EditOnboardingDocuments from "../../component/onboarding/EditOnboardingDocuments";
import EditOnboardingKeyContacts from "../../component/onboarding/EditOnboardingKeyContacts";
import EditOnboardingPersonalInfo from "../../component/onboarding/EditOnboardingPersonalInfo";
import InvitationBackgroundWrapper from "../../component/InvitationBackgroundWrapper";

type OnboardingStep = "personal-info" | "key-contacts" | "documents";

const EditOnboardingInfo = () => {
  const [currentStep, setCurrentStep] = useState<OnboardingStep>("personal-info");
  const navigate = useNavigate();

  const handlePersonalInfoProceed = () => {
    setCurrentStep("key-contacts");
  };

  const handleKeyContactsProceed = () => {
    setCurrentStep("documents");
  };

  const handleBack = () => {
    if (currentStep === "key-contacts") {
      setCurrentStep("personal-info");
    } else if (currentStep === "documents") {
      setCurrentStep("key-contacts");
    }
  };

  const handleCompleteOnboarding = () => {
    // Handle any final submission logic here
    console.log("Onboarding completed!");
    // Redirect to dashboard or confirmation page
    navigate("/admin/Dashboard");
  };

  return (
    <InvitationBackgroundWrapper>
      {currentStep === "personal-info" && (
        <EditOnboardingPersonalInfo 
          onProceed={handlePersonalInfoProceed} 
          onBack={() => navigate(-1)} // Go back to previous page
        />
      )}

      {currentStep === "key-contacts" && (
        <EditOnboardingKeyContacts
          onProceed={handleKeyContactsProceed}
          onBack={handleBack}
        />
      )}

      {currentStep === "documents" && (
        <EditOnboardingDocuments 
          onProceed={handleCompleteOnboarding}
          onBack={handleBack}
        />
      )}
    </InvitationBackgroundWrapper>
  );
};

export default EditOnboardingInfo;