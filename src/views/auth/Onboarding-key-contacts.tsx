import type React from "react";
import {
  AiPhoneIcon,
  Mail01Icon,
  User02Icon,
} from "@hugeicons/core-free-icons";
import OnboardingLayout from "../../component/OnboardingLayout";
import type { OnboardingProps } from "./OnBoardingPersonalInfo";

const OnboardingKeyContacts: React.FC<OnboardingProps> = ({
  currentStep,
  setCurrentStep,
  form,
}) => {
  const formFields = [
    {
      sectionTitle: "Guarantor Details",
      formItems: [
        {
          label: "First Name",
          icon: User02Icon,
          disabled: false,
          value: undefined,
          required: true,
          type: "text",
          name: "guarantorFirstName",
        },
        {
          label: "Last Name",
          icon: User02Icon,
          disabled: false,
          value: undefined,
          required: true,
          type: "text",
          name: "guarantorLastName",
        },
        {
          label: "Email",
          icon: Mail01Icon,
          disabled: false,
          value: undefined,
          required: true,
          type: "email",
          name: "guarantorEmail",
        },
        {
          label: "Phone Number",
          icon: AiPhoneIcon,
          disabled: false,
          value: undefined,
          required: true,
          type: "phone",
          name: "guarantorPhone",
        },
      ],
    },
    {
      sectionTitle: "Emergency Contact",
      sectionSubtitle:
        "Provide someone we can contact in case of an emergency (e.g., medical issue or workplace incident).",

      formItems: [
        {
          label: "First Name",
          icon: User02Icon,
          disabled: false,
          value: undefined,
          required: true,
          type: "text",
          name: "emergencyFirstName",
        },
        {
          label: "Last Name",
          icon: User02Icon,
          disabled: false,
          value: undefined,
          required: true,
          type: "text",
          name: "emergencyLastName",
        },
        {
          label: "Email",
          icon: Mail01Icon,
          disabled: false,
          value: undefined,
          required: true,
          type: "email",
          name: "emergencyEmail",
        },
        {
          label: "Phone Number",
          icon: AiPhoneIcon,
          disabled: false,
          value: undefined,
          required: true,
          type: "phone",
          name: "emergencyPhone",
        },
      ],
    },
  ];

  return (
    <OnboardingLayout
      indexName="keyContacts"
      formFields={formFields}
      step={currentStep}
      setStep={setCurrentStep}
      form={form}
    />
  );
};

export default OnboardingKeyContacts;
