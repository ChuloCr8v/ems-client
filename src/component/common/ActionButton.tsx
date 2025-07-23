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
  backButtonColor?: string;
  backTextColor?: string;
  proceedButtonColor?: string;
  proceedTextColor?: string;
  hoverBackColor?: string;
  hoverProceedColor?: string;
  showBackIcon?: boolean;
  showProceedIcon?: boolean;
  backIcon?: React.ReactNode;
  proceedIcon?: React.ReactNode;
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
  backButtonColor = "#0A96CC",
  backTextColor = "#0A96CC",
  proceedButtonColor = "#0A96CC",
  proceedTextColor = "#ffffff",
  hoverBackColor = "gray-400",
  hoverProceedColor = "#0984b3",
  showBackIcon = true,
  showProceedIcon = true,
  backIcon = <ArrowLeftOutlined />,
  proceedIcon = <ArrowRightOutlined />,
}) => {
  return (
    <div className={`flex flex-row justify-end gap-4 pt-8 !mt-4 ${containerClassName}`}>
      {showBackButton && (
        <Button
          size="large"
          onClick={onBack}
          icon={showBackIcon ? backIcon : null}
          className={`w-full sm:w-auto md:w-[144px] h-[40px] border-[${backButtonColor}] text-[${backTextColor}] hover:border-${hoverBackColor} hover:text-${hoverBackColor}`}
          style={{
            borderColor: backButtonColor,
            color: backTextColor,
          }}
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
          icon={showProceedIcon ? proceedIcon : null}
          className={`w-full sm:w-auto md:w-[144px] h-[40px] font-medium`}
          style={{
            backgroundColor: proceedButtonColor,
            borderColor: proceedButtonColor,
            color: proceedTextColor,
            ...(hoverProceedColor && {
              ':hover': {
                backgroundColor: hoverProceedColor,
                borderColor: hoverProceedColor,
              }
            })
          }}
          {...proceedButtonProps}
        >
          {proceedText}
        </Button>
      )}
    </div>
  );
};

export default ActionButtons;