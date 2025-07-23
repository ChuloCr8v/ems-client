import React from "react";
import { Button } from "antd";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";

interface ActionButtonsProps {
  onBack?: () => void;
  onProceed?: () => void;
  backText?: string;
  proceedText?: string;
  backButtonProps?: React.ComponentProps<typeof Button>;
  proceedButtonProps?: React.ComponentProps<typeof Button>;
  containerClassName?: string;
  showBackButton?: boolean;
  showProceedButton?: boolean;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
  onBack,
  onProceed,
  backText = "Back",
  proceedText = "Proceed",
  backButtonProps = {},
  proceedButtonProps = {},
  containerClassName = "",
  showBackButton = true,
  showProceedButton = true,
}) => {
  return (
    <div className={`flex flex-row justify-end gap-4 pt-8 !mt-4 ${containerClassName}`}>
      {showBackButton && (
        <Button
          size="large"
          onClick={onBack}
          icon={<ArrowLeftOutlined />}
          className="w-full sm:w-auto md:w-[144px] h-[40px] !border-[#0A96CC] !text-[#0A96CC] hover:border-gray-400 hover:text-gray-700"
          {...backButtonProps}
        >
          {backText}
        </Button>
      )}

      {showProceedButton && (
        <Button
          type="primary"
          size="large"
          onClick={onProceed}
          icon={<ArrowRightOutlined />}
          className="w-full sm:w-auto md:w-[144px] h-[40px] bg-[#0A96CC] hover:bg-[#0984b3] border-[#0A96CC] font-medium"
          {...proceedButtonProps}
        >
          {proceedText}
        </Button>
      )}
    </div>
  );
};

export default ActionButtons;