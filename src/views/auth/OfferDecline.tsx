import type React from "react";
import { Form, Checkbox, Input, message } from "antd";
import { CloseCircleOutlined } from "@ant-design/icons";
import ActionButtons from "../../component/common/ActionButton";
import { useDeclineOfferMutation } from "../../api/data/invitations.api";
import { useState } from "react";
import OfferDeclineSuccess from "./OfferDeclineSuccess";

const { TextArea } = Input;

interface OfferDeclineProps {
  token: string;
  onCancel: () => void;
}

const OfferDecline: React.FC<OfferDeclineProps> = ({ onCancel, token }) => {
  const [showDeclineSuccess, setShowDeclineSuccess] = useState(false);

  const [form] = Form.useForm();

  const [moreOptions, setMoreOptions] = useState(false);
  const [declineOffer, { isLoading: decliningOffer }] =
    useDeclineOfferMutation();

  const handleSubmit = async () => {
    const values = await form.validateFields();

    let reasons = values.reasons || [];

    if (moreOptions && values.comment && values.comment.trim() !== "") {
      reasons = [...reasons, values.comment.trim()];
    }

    const updatedValues = {
      token,
      reasons,
    };

    console.log(updatedValues);

    // return;
    try {
      await declineOffer(updatedValues).unwrap();
      message.success("Offer Declined!");
      setShowDeclineSuccess(true);
    } catch (error) {
      message.error("Failed, please try again");
      console.log(error);
    }
  };

  const reasons = [
    { value: "accepted-other", label: "I accepted another offer" },
    { value: "wrong-fit", label: "The role wasn't the right fit" },
    {
      value: "compensation",
      label: "The compensation package didn't meet expectations",
    },
    {
      value: "personal",
      label: "Personal circumstances prevent me from accepting",
    },
  ];

  console.log(token);

  return (
    <div className="">
      {showDeclineSuccess ? (
        <OfferDeclineSuccess />
      ) : (
        <div>
          {/* Header */}
          <div className="flex items-center !space-x-3 !mb-6">
            <div className="!w-12 !h-12 bg-red-50 rounded-full flex items-center justify-center">
              <CloseCircleOutlined className="!text-red-500 text-2xl" />
            </div>
            <h1 className="!text-xl font-semibold text-gray-800">
              Decline Employment Offer
            </h1>
          </div>

          {/* Subtitle */}
          <p className="!text-gray-600 !mb-6 leading-relaxed">
            We understand and respect your decision. Before you go, we'd love to
            know why — your feedback helps us improve our recruitment process.
          </p>

          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
            initialValues={{ reasons: [], feedback: "" }}
          >
            {/* Reason Selection */}
            <Form.Item name="reasons">
              <Checkbox.Group className="w-full">
                <div className="!space-y-3">
                  {reasons.map((reason) => (
                    <div key={reason.value} className="flex items-center">
                      <Checkbox
                        value={reason.value}
                        className="!text-gray-600 !text-base"
                      >
                        {reason.label}
                      </Checkbox>
                    </div>
                  ))}
                </div>
              </Checkbox.Group>
            </Form.Item>

            <div className="flex items-center gap-2 !my-3">
              <Checkbox
                className="!text-gray-600 !text-base"
                onChange={() => setMoreOptions(!moreOptions)}
              ></Checkbox>
              <p className="text-base text-gray-600">
                Other (Please specify below)
              </p>
            </div>

            {/* Additional Feedback */}
            {moreOptions && (
              <Form.Item
                name="comment"
                label={
                  <p className="text-base">
                    Let us know if there's anything else you'd like to share.
                  </p>
                }
              >
                <TextArea
                  placeholder="Type reason"
                  rows={2}
                  className="resize-none"
                />
              </Form.Item>
            )}

            <div className="mt-8">
              <ActionButtons
                onBack={onCancel}
                onProceed={handleSubmit}
                backText="Cancel"
                proceedText={decliningOffer ? "Declining..." : "Decline Offer"}
                backIcon={null}
                proceedIcon={null}
                backTextColor="#C42A2A"
                backButtonColor="#C42A2A"
                proceedButtonColor="#C42A2A"
                loading={decliningOffer}
              />
            </div>
          </Form>
        </div>
      )}
    </div>
  );
};

export default OfferDecline;
