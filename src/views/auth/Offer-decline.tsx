import type React from "react"
import { useState } from "react"
import { Radio, Input } from "antd"
import { CloseCircleOutlined } from "@ant-design/icons"
import type { RadioChangeEvent } from "antd"
import ActionButtons from "../../component/common/ActionButton"
import OnboardingWrapper from "../../component/OnboardingWrapper"

const { TextArea } = Input

interface OfferDeclineProps {
    onCancel: () => void
    onDecline: () => void
}

const OfferDecline: React.FC<OfferDeclineProps> = ({ onCancel, onDecline }) => {
    const [selectedReason, setSelectedReason] = useState<string>("other")
    const [additionalFeedback, setAdditionalFeedback] = useState<string>("")

    const handleReasonChange = (e: RadioChangeEvent) => {
        setSelectedReason(e.target.value)
    }

    const handleDeclineSubmit = () => {
        console.log("Decline reason:", selectedReason)
        console.log("Additional feedback:", additionalFeedback)
        onDecline()
    }

    const reasons = [
        { value: "accepted-other", label: "I accepted another offer" },
        { value: "wrong-fit", label: "The role wasn't the right fit" },
        { value: "compensation", label: "The compensation package didn't meet expectations" },
        { value: "personal", label: "Personal circumstances prevent me from accepting" },
        { value: "other", label: "Other (Please specify below)" },
    ]

    return (

        <OnboardingWrapper title="" subtitle="" maxWidth="max-w-[500px]">
        <div className="w-full bg-white rounded-2xl  shadow-lg !p-6 ">
            {/* Header */}
            <div className="flex items-center !space-x-3 !mb-6">
                <div className="!w-10 !h-10 bg-red-50 rounded-full flex items-center justify-center">
                    <CloseCircleOutlined className="!text-red-500 text-xl" />
                </div>
                <h1 className="!text-xl font-semibold text-gray-800">Decline Employment Offer</h1>
            </div>

            {/* Subtitle */}
            <p className="!text-gray-600  !mb-6 leading-relaxed">
                We understand and respect your decision. Before you go, we'd love to know why — your feedback helps us improve
                our recruitment process.
            </p>

            {/* Reason Selection */}
            <div className="!mb-6">
                <Radio.Group value={selectedReason} onChange={handleReasonChange} className="w-full">
                    <div className="!space-y-3">
                        {reasons.map((reason) => (
                            <div key={reason.value} className="flex items-center">
                                <Radio value={reason.value} className="!text-gray-600">
                                    {reason.label}
                                </Radio>
                            </div>
                        ))}
                    </div>
                </Radio.Group>
            </div>

            {/* Additional Feedback */}
            <div className="!mb-8">
                <TextArea
                    value={additionalFeedback}
                    onChange={(e) => setAdditionalFeedback(e.target.value)}
                    placeholder="Let us know if there's anything else you'd like to share."
                    rows={1}
                    className="resize-none"
                />
            </div>

            {/* Action Buttons */}
            <ActionButtons
                onBack={onCancel}
                onProceed={handleDeclineSubmit}
                backText="Cancel"
                proceedText="Decline Offer"
                backIcon={null}
                proceedIcon={null}
                backTextColor="#C42A2A"
                backButtonColor="#C42A2A"
                proceedButtonColor="#C42A2A"
            />
        </div>
         </OnboardingWrapper>
    )
}

export default OfferDecline
