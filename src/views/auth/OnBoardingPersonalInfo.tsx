import {
  AiPhoneIcon,
  ChartDownIcon,
  GlobeIcon,
  Mail01Icon,
  MapPinIcon,
  User02Icon,
  UserIcon,
} from "@hugeicons/core-free-icons";
import OnboardingLayout from "../../component/OnboardingLayout";
import { countriesWithStates } from "../../constants/countries";
import type { FormInstance } from "antd";
import type { Dispatch, SetStateAction } from "react";
import { useWatch } from "antd/es/form/Form";

export interface PersonalInfoForm {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  gender: string;
  maritalStatus: string;
  address: string;
  country: string;
  state: string;
}

export interface OnboardingProps {
  currentStep: number;
  form: FormInstance<any>;
  setCurrentStep: Dispatch<SetStateAction<number>>;
}

const OnboardingPersonalInfo = ({
  currentStep,
  setCurrentStep,
  form,
}: OnboardingProps) => {
  const country = useWatch(["personalInfo", "country"], form);
  const states = countriesWithStates.find(
    (c) => c?.name.toLowerCase() === country?.toLowerCase()
  )?.states;

  const formFields = [
    {
      sectionSubtitle: "Personal Information",
      formItems: [
        {
          label: "First Name",
          icon: User02Icon,
          disabled: false,
          value: undefined,
          required: true,
          type: "text",
          name: "firstName",
          placeholder: "Your first name",
        },
        {
          label: "Last Name",
          icon: User02Icon,
          disabled: false,
          value: undefined,
          required: true,
          type: "text",
          name: "lastName",
          placeholder: "Your last name",
        },
        {
          label: "Email",
          icon: Mail01Icon,
          disabled: false,
          value: undefined,
          required: true,
          type: "email",
          name: "email",
          placeholder: "Your email",
        },
        {
          label: "Phone Number",
          icon: AiPhoneIcon,
          disabled: false,
          value: undefined,
          required: true,
          type: "phone",
          name: "phone",
          placeholder: "Your phone number",
        },
        {
          label: "Gender",
          icon: UserIcon,
          disabled: false,
          value: undefined,
          required: true,
          type: "select",
          name: "gender",
          options: [
            { label: "Male", value: "MALE" },
            { label: "Female", value: "FEMALE" },
          ],
        },
        {
          label: "Marital Status",
          icon: UserIcon,
          disabled: false,
          value: undefined,
          required: false,
          name: "maritalStatus",
          type: "select",
          options: [
            { label: "Single", value: "SINGLE" },
            { label: "Married", value: "MARRIED" },
          ],
        },
      ],
    },
    {
      sectionSubtitle: "Contact Address",
      formItems: [
        {
          label: "Address",
          icon: MapPinIcon,
          disabled: false,
          value: undefined,
          required: false,
          name: "address",
          type: "text",
          placeholder: "Your address",
        },
        {
          label: "Country",
          icon: GlobeIcon,
          disabled: false,
          value: undefined,
          required: true,
          type: "select",
          name: "country",
          placeholder: "Your country of origin",
          options: countriesWithStates.map((c) => ({
            label: c.name,
            value: c.name.toUpperCase(),
          })),
        },
        {
          label: "State",
          icon: ChartDownIcon,
          disabled: false,
          value: undefined,
          required: true,
          name: "state",
          type: "select",
          placeholder: "Your state",
          options: states ? states?.map((s) => ({ label: s, value: s })) : [],
        },
      ],
    },
  ];

  return (
    <OnboardingLayout
      indexName="personalInfo"
      form={form}
      setStep={setCurrentStep}
      step={currentStep}
      formFields={formFields}
    ></OnboardingLayout>
  );
};
export default OnboardingPersonalInfo;
