import { Button, Checkbox, Modal } from "antd";
import { useEffect, useState, type ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import { usePopup } from "../../context/PopupContext";
import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react";
import { Activity01Icon } from "@hugeicons/core-free-icons";

export enum ModalTheme {
  WARNING = "WARNING",
  DEFAULT = "DEFAULT",
}

interface Props {
  title: string;
  children: ReactNode;
  okText?: string;
  onCancel?: () => void;
  onOk?: () => void;
  modalSubtitle?: string;
  icon?: IconSvgElement;
  loading?: boolean;
  closable?: boolean;
  isDanger?: boolean;
  width?: number;
  center?: boolean;
  disabled?: boolean;
  step?: boolean;
  showConfirmation?: boolean; // Controls checkbox visibility
  confirmationText?: string;
  modalTheme?: ModalTheme;
  hideFooter?: boolean;
  maxHeight?: boolean;
}

export const CustomModal = ({
  children,
  loading,
  icon,
  onCancel,
  modalSubtitle,
  okText,
  step,
  showConfirmation,
  confirmationText,
  onOk,
  closable,
  title,
  isDanger = false,
  width = 680,
  center = false,
  disabled = false,
  modalTheme = ModalTheme.DEFAULT,
  hideFooter = false,
  maxHeight = true,
}: Props) => {
  const [stepButtons, setStepButtons] = useState(step ?? false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const { closeModal, isModalOpen } = usePopup();

  const warning = modalTheme === ModalTheme.WARNING;

  useEffect(() => {
    setStepButtons(step ?? false);
  }, [step]);

  return (
    <Modal
      okText={okText || "Submit"}
      onOk={onOk}
      okButtonProps={{ danger: isDanger, disabled }}
      open={isModalOpen}
      onCancel={closeModal}
      confirmLoading={loading}
      closable={closable}
      footer={false}
      maskClosable={closable}
      width={width}
      centered={center}
      closeIcon={false}
    >
      <div className="flex flex-col items-center">
        <div className="modal-header flex items-center gap-4 bg-gradient-to-r from-[#5BB9DD]/20 to-[#66C476]/20 w-full  px-6 py-4">
          <div
            className={twMerge(
              "text-primary text-4xl bg-green-50 p-2 rounded-full flex items-center justify-center",
              warning && "bg-red-50 text-red-600"
            )}
          >
            <HugeiconsIcon
              icon={icon ?? Activity01Icon}
              size={24}
              strokeWidth={1.5}
              color={"green"}
            />
          </div>

          <div className="text-left">
            <p
              className={twMerge(
                "font-semibold capitalize text-sm",
                !modalSubtitle && "text-lg"
              )}
            >
              {title}
            </p>
            <p className="text-gray text-xs">{modalSubtitle}</p>
          </div>
        </div>

        <div
          className={twMerge(
            "w-full p-6 h-full overflow-y-auto overflow-x-hidden",
            !maxHeight ? "" : "max-h-[500px]"
          )}
        >
          {children}
        </div>

        {/* Confirmation Checkbox */}
        {showConfirmation && (
          <div className="w-full px-">
            <Checkbox onChange={(e) => setIsConfirmed(e.target.checked)}>
              {confirmationText ?? "I confirm this action"}
            </Checkbox>
          </div>
        )}

        {!stepButtons && !hideFooter && (
          <div className="space-x-4 mt-2 place-self-end px-6 pb-2">
            <Button
              size="large"
              className="!text-sm !px-6"
              onClick={onCancel ?? closeModal}
            >
              Cancel
            </Button>
            <Button
              onClick={onOk}
              loading={loading}
              type="primary"
              size="large"
              className={twMerge(
                "!text-sm !px-6",
                warning && "bg-red-600 text-white"
              )}
              disabled={showConfirmation ? !isConfirmed : false} // Disable based on checkbox
            >
              {okText ?? "Submit"}
            </Button>
          </div>
        )}
      </div>
    </Modal>
  );
};
