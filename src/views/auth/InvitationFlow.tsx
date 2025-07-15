import { useState } from "react";
import InvitationBackgroundWrapper from "../../component/InvitationBackgroundWrapper";
import OfferAcceptance from "./OfferAcceptance";
import OnboardingPersonalInfo from "./OnBoardingPersonalInfo";

const InvitationFlow: React.FC = () => {
  const [step, setStep] = useState<'offer' | 'onboarding'>('offer');

  return (
    <InvitationBackgroundWrapper>
      {step === 'offer' ? (
        <OfferAcceptance onContinue={() => setStep('onboarding')} />
      ) : (
        <OnboardingPersonalInfo/>
      )}
    </InvitationBackgroundWrapper>
  );
};

export default InvitationFlow;
