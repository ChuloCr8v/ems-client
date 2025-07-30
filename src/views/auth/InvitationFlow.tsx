import { useState } from "react";
import InvitationBackgroundWrapper from "../../component/InvitationBackgroundWrapper";
import useGetPropspect from "../../hooks/useGetPropspect";
import OnboardingPersonalInfo from "./OnBoardingPersonalInfo";
import OnboardingKeyContacts from "./Onboarding-key-contacts";
import OnboardingDocuments from "./OnboardingDocuments";
import { InviteStatus } from "../../api/types";
import OfferAcceptance from "./OfferAcceptance";
import { useForm } from "antd/es/form/Form";

const InvitationFlow: React.FC = () => {
  const [form] = useForm();
  const [step, setStep] = useState<number>(1);

  const { isLoading, prospect } = useGetPropspect();

  const acceptedInvite = prospect?.invite.some(
    (i) => i.status === InviteStatus.ACCEPTED
  );

  const stepProps = {
    form: form,
    currentStep: step,
    setCurrentStep: setStep,
  };

  const renderItem = () => {
    if (acceptedInvite) {
      switch (step) {
        case 1:
          return <OnboardingPersonalInfo {...stepProps} />;
        case 2:
          return <OnboardingKeyContacts {...stepProps} />;
        case 3:
          return <OnboardingDocuments {...stepProps} />;
        default:
          return null;
      }
    } else {
      return <OfferAcceptance />;
    }
  };

  return (
    <InvitationBackgroundWrapper loading={isLoading}>
      {renderItem()}
    </InvitationBackgroundWrapper>
  );
};

export default InvitationFlow;
