import {
  CallRinging04Icon,
  CheckmarkCircle03FreeIcons,
  File02Icon,
  UserListIcon,
} from "@hugeicons/core-free-icons";
import Form from "antd/es/form";
import { type FormInstance } from "antd/es/form/Form";
import { twMerge } from "tailwind-merge";
import ActionButtons from "./common/ActionButton";
import Icon from "./common/Icon";
import FormItemComponent, {
  type FormFieldProps,
} from "./common/RenderFormItem";
import {
  useEffect,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";
import { message, type UploadFile } from "antd";
import {
  useGetInviteByTokenQuery,
  useSubmitProspectDataMutation,
} from "../api/data/invitations.api";
import { useSearchParams } from "react-router-dom";

interface OnboardingWrapperProps {
  formFields: {
    indexName?: string;
    sectionTitle?: string;
    sectionSubtitle?: string;
    formItems: FormFieldProps[];
  }[];
  title?: string;
  subtitle?: string;
  maxWidth?: string;
  setStep: Dispatch<SetStateAction<number>>;
  step: number;
  form: FormInstance<any>;
  children?: ReactNode;
  indexName?: string;
}

const OnboardingLayout = ({
  formFields,
  title = "Let's Get You Set Up",
  subtitle = "Your basic info has been prefilled. Please complete your profile and upload your signed documents to proceed.",
  maxWidth = "max-w-[800px]",
  step,
  setStep,
  form,
  indexName,
  children,
}: OnboardingWrapperProps) => {
  const [submitProspectData] = useSubmitProspectDataMutation();

  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const { data: invite, isLoading: gettingProspect } = useGetInviteByTokenQuery(
    token as string
  );

  const { formItem } = FormItemComponent({ form });

  const prospect = invite?.prospect;

  useEffect(() => {
    const populateForm = async () => {
      if (invite) {
        form.setFieldValue("gender", prospect?.gender);
        form.setFieldValue("firstName", prospect?.firstName);
        form.setFieldValue("lastName", prospect?.lastName);
        form.setFieldValue("email", prospect?.email);
        form.setFieldValue("phone", prospect?.phone);
      }
    };
    populateForm();
  }, []);

  const stepItems = [
    {
      key: 1,
      icon: UserListIcon,
      title: "Personal Information",
    },
    { key: 2, icon: CallRinging04Icon, title: "Key Contacts" },
    { key: 3, icon: File02Icon, title: "Documents" },
  ];

  const nextStep = async () => {
    try {
      await form.validateFields();

      if (step === stepItems.length) {
        const allValues = form.getFieldsValue(true);
        const { emergency, guarantor } = allValues;

        const { phone: emergencyPhone, ...emergencyRest } = emergency;
        const { phone: guarantorPhone, ...guarantorRest } = guarantor;

        const formattedEmergencyPhoneNumber = {
          ...emergencyRest,
          phone: `${emergencyPhone.countryCode}${emergencyPhone.areaCode}${emergencyPhone.phoneNumber}`,
        };

        const formattedGuarantorPhoneNumber = {
          ...guarantorRest,
          phone: `${guarantorPhone.countryCode}${guarantorPhone.areaCode}${guarantorPhone.phoneNumber}`,
        };

        const updatedData = {
          ...allValues,
          id: invite?.id,
          guarantor: formattedGuarantorPhoneNumber,
          emergency: formattedEmergencyPhoneNumber,
          uploads: allValues.uploads.map((a: UploadFile) => a.originFileObj),
        };

        await submitProspectData(updatedData).unwrap();

        setStep(step + 1);
      } else {
        setStep(step + 1);
      }
    } catch (error) {
      console.error("Validation error:", error);
      message.error("Something went wrong. Please try again.");
    }
  };

  const back = () => {
    setStep(step - 1);
  };

  const hideDetails = step <= 3;

  return (
    <div
      className={`border-1 border-white w-full ${maxWidth} bg-white/40 !rounded-2xl backdrop-blur-2xl relative shadow-2xl shadow-light_gray/50 p-4`}
    >
      <div className="flex flex-col justify-center items-center gap-4">
        {/* Header */}
        {hideDetails && (
          <div className="ptext-center text-center">
            <h1 className="!text-2xl font-bold text-gray-900 !mb-2">{title}</h1>
            <p className="text-gray-500 text-sm !mb-4">{subtitle}</p>
          </div>
        )}

        {/* step items */}
        {hideDetails && (
          <div className="flex items-center justify-between md:grid grid-cols-3 bg-white rounded-full px-6 py-3 w-full">
            {stepItems.map((item) => (
              <div
                className="flex items-center justify-center gap-3 w-fit"
                key={item.key}
              >
                <div
                  className={twMerge(
                    "bg-gray-200 *:text-gray h-12 w-12 rounded-full flex items-center justify-center",
                    (step === item.key || step >= item.key) &&
                      "bg-primary/10 *:text-primary"
                  )}
                >
                  <Icon
                    icon={
                      step <= item.key ? item.icon : CheckmarkCircle03FreeIcons
                    }
                    size={28}
                  />
                </div>
                <div className="hidden md:block">
                  <p className="text-sm text-gray">Step {item.key}/3</p>
                  <p className="font-semibold text-sm">
                    {item.key === 1 ? "Personal Info" : item.title}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* //success render */}
        {!hideDetails && <div className="">{children}</div>}

        {/* form items */}
        {hideDetails && (
          <div className="bg-white rounded-xl py-7 px-6 shadow-xl shadow-light_gray/30 w-full">
            <p className="text-base font-semibold text-custom_black !mb-4">
              {step !== 3 && hideDetails ? stepItems[step - 1]?.title : null}
            </p>

            {hideDetails && (
              <Form
                // initialValues={prospect}
                form={form}
                layout="vertical"
                className="space-y-4"
              >
                <div className="space-y-4">
                  <div className="space-y-6 lg:max-h-[450px] h-full overflow-auto ">
                    {formFields.map((field, index) => (
                      <div className="space-y-2 " key={index}>
                        <div>
                          {field?.sectionTitle && (
                            <p className="text-custom_black font-semibold">
                              {field.sectionTitle}
                            </p>
                          )}
                          <p className="text-sm text-gray">
                            {field?.sectionSubtitle}
                          </p>
                        </div>

                        <div className="md:grid md:grid-cols-2 gap-x-4">
                          {field.formItems.map((item) => (
                            <Form.Item
                              label={item.label}
                              name={
                                indexName
                                  ? [indexName, item.name]
                                  : field.indexName
                                  ? [field.indexName, item.name]
                                  : item.name
                              }
                              rules={[
                                {
                                  required: item.required,
                                  message: `${item.label} is required`,
                                },
                              ]}
                              key={item.label}
                              className={twMerge(
                                ["address", "uploads"].includes(item.name!) &&
                                  "col-span-2"
                              )}
                            >
                              {formItem(item)}
                            </Form.Item>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  <ActionButtons
                    showBackButton={step !== 1}
                    loading={gettingProspect}
                    onProceed={nextStep}
                    onBack={back}
                  />
                </div>
              </Form>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default OnboardingLayout;
