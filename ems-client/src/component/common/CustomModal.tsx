import { Button, Checkbox, Modal } from "antd";
import { useEffect, useState, type ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import { usePopup } from "../../context/PopupContext";
import { GrAction } from "react-icons/gr";

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
  icon?: ReactNode;
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
  width = 500,
  center = false,
  disabled = false,
  modalTheme = ModalTheme.DEFAULT,
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
      loading={loading}
      okButtonProps={{ danger: isDanger, disabled }}
      open={isModalOpen}
      onCancel={closeModal}
      confirmLoading={loading}
      closable={closable}
      footer={false}
      maskClosable={closable}
      width={width}
      centered={center}
    >
      <div className="flex flex-col items-center justify-center gap-3 pt-1">
        <div
          className={twMerge(
            "text-primary text-4xl bg-green-50 h-20 w-20 rounded-full flex items-center justify-center",
            warning && "bg-red-50 text-red-600"
          )}
        >
          {icon ?? <GrAction />}
        </div>

        <div className="text-center px-4">
          <p className="font-bold capitalize text-xl">{title}</p>
          <p className="text-grey">{modalSubtitle}</p>
        </div>

        <div className="w-full">{children}</div>

        {/* Confirmation Checkbox */}
        {showConfirmation && (
          <div className="w-full px-">
            <Checkbox onChange={(e) => setIsConfirmed(e.target.checked)}>
              {confirmationText ?? "I confirm this action"}
            </Checkbox>
          </div>
        )}

        {!stepButtons && (
          <div className="space-x-4 mt-2">
            <Button className="w-[144px]" onClick={onCancel ?? closeModal}>
              Cancel
            </Button>
            <Button
              onClick={onOk}
              loading={loading}
              type="primary"
              className={twMerge(
                "w-[144px]",
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
