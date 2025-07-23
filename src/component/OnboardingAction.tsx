"use client"

import { Button } from "antd"
import { ArrowRightOutlined, ArrowLeftOutlined } from "@ant-design/icons"

interface OnboardingActionsProps {
  onBack?: () => void
  onProceed: () => void
  showBack?: boolean
  proceedText?: string
  backText?: string
  isLoading?: boolean
}

const OnboardingActions = ({
  onBack,
  onProceed,
  showBack = true,
  proceedText = "Proceed",
  backText = "Back",
  isLoading = false,
}: OnboardingActionsProps) => {
  return (
    <div className="flex flex-col sm:flex-row justify-end gap-4 pt-8 mt-4">
      {showBack && (
        <Button
          size="large"
          onClick={onBack}
          icon={<ArrowLeftOutlined />}
          className="w-full sm:w-auto md:w-[144px] h-[40px] border-[#0A96CC] text-[#0A96CC] hover:bg-[#e6f7ff] hover:border-[#0984b3]"
        >
          {backText}
        </Button>
      )}

      <Button
        type="primary"
        size="large"
        onClick={onProceed}
        loading={isLoading}
        icon={<ArrowRightOutlined />}
        className="w-full sm:w-auto md:w-[144px] h-[40px] bg-[#0A96CC] hover:bg-[#0984b3] border-[#0A96CC] font-medium"
      >
        {proceedText}
      </Button>
    </div>
  )
}

export default OnboardingActions
