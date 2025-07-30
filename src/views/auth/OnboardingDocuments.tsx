import type { OnboardingProps } from "./OnBoardingPersonalInfo";
import OnboardingLayout from "../../component/OnboardingLayout";

const OnboardingDocuments = ({
  currentStep,
  setCurrentStep,
  form,
}: OnboardingProps) => {
  const formFields = [
    {
      sectionTitle: "Documents",
      sectionSubtitle:
        "Upload all filled and signed documents that were attached in your mail",
      formItems: [
        {
          label: "Upload File (e.g Contract Letter, Guarantor Form, NDA etc)",
          // icon: User02Icon,
          // disabled: false,
          // value: undefined,
          required: true,
          type: "file-picker",
          name: "uploads",
        },
      ],
    },
  ];

  return (
    <OnboardingLayout
      indexName="uploads"
      formFields={formFields}
      setStep={setCurrentStep}
      step={currentStep}
      form={form}
    ></OnboardingLayout>
  );
};

export default OnboardingDocuments;
