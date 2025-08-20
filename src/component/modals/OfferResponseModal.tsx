import { CheckmarkCircle01Icon } from "@hugeicons/core-free-icons";
import { CustomModal } from "../common/CustomModal";
import { useAcceptOfferMutation } from "../../api/data/invitations.api";
import { message } from "antd";
import { usePopup } from "../../context/PopupContext";

type Props = {
  token: string;
};

const OfferResponseModal = ({ token }: Props) => {
  const [acceptOffer, { isLoading }] = useAcceptOfferMutation();
  const { closeModal } = usePopup();

  const handleSubmit = async () => {
    try {
      await acceptOffer(token as string).unwrap();
      message.success("Offer Accepted!");
      closeModal();
    } catch (error) {
      message.error("Failed, try again");
      console.log(error);
    }
  };

  return (
    <CustomModal
      title={"Accept Offer"}
      modalSubtitle={"Confirm your acceptance to proceed with onboarding."}
      okText={"Accept"}
      icon={CheckmarkCircle01Icon}
      loading={isLoading}
      onOk={handleSubmit}
      width={450}
    >
      <div className="mb-4">
        <p>
          By accepting this offer, you confirm your agreement to the terms of
          employment and will officially join our team.
        </p>
      </div>
    </CustomModal>
  );
};

export default OfferResponseModal;
