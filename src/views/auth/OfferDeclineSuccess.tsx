import type React from "react";
import Icon from "../../component/common/Icon";
import { CheckmarkCircle02Icon } from "@hugeicons/core-free-icons";

const OfferDeclineSuccess: React.FC = () => {
  return (
    <div className="  text-center  mx-auto flex flex-col items-center justify-center">
      <div className="flex justify-center items-center mb-4 bg-primary/10 p-5 rounded-full">
        <Icon icon={CheckmarkCircle02Icon} size={40} />
      </div>
      <h2 className="!text-xl !font-bold text-black !mb-2">
        Employment Offer Declined!
      </h2>
      <p className="!text-gray-500 !text-base !mb-8">
        We appreciate your time and feedback. We wish you all the{" "}
        <br className="md:block hidden" />
        best in your journey!.
      </p>
    </div>
  );
};

export default OfferDeclineSuccess;
