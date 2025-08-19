import { useState } from "react";
import InvitationBackgroundWrapper from "../../component/InvitationBackgroundWrapper";
import OnboardingPersonalInfo from "./OnBoardingPersonalInfo";
import OnboardingKeyContacts from "./Onboarding-key-contacts";
import OnboardingDocuments from "./OnboardingDocuments";
import OfferAcceptance from "./OfferAcceptance";
import { useForm } from "antd/es/form/Form";
import { EmployeeStatus } from "../../api/types";
import OnboardingSuccess from "./OnboardingSuccess";
import { useGetInviteByTokenQuery } from "../../api/data/invitations.api";
import { useParams } from "react-router-dom";

const InvitationFlow: React.FC = () => {
  const [form] = useForm();
  const [step, setStep] = useState<number>(1);

  const { token } = useParams<{ token: string }>();

  const { data: invite, isLoading: gettingInvite } = useGetInviteByTokenQuery(
    token ?? ""
  );

  const acceptedInvite = invite?.status === EmployeeStatus.ACCEPTED;

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
        case 4:
          return <OnboardingSuccess step={step} />;
        default:
          return null;
      }
    } else {
      return <OfferAcceptance />;
    }
  };

  return (
    <InvitationBackgroundWrapper loading={gettingInvite}>
      <div className="flex flex-col justify-center items-center gap-6">
        {renderItem()}
        <p className="text-gray">
          Copyright ©{new Date().getFullYear()}. All Rights Reserved Zoracom
        </p>
      </div>
    </InvitationBackgroundWrapper>
  );
};

export default InvitationFlow;
