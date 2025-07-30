import { ArrowRightOutlined } from "@ant-design/icons";
import { Button, message } from "antd";
import dayjs from "dayjs";
import { useAcceptOfferMutation } from "../../api/data/invitations.api";
import { JobType } from "../../api/types";
import { sentenceCase } from "../../helpers";
import useGetPropspect from "../../hooks/useGetPropspect";

const OfferAcceptance = () => {
  const { prospect, token } = useGetPropspect();
  const [accepOffer, { isLoading }] = useAcceptOfferMutation();

  const acceptOffer = async () => {
    try {
      await accepOffer(token as string).unwrap();
      message.success("Offer Accepted!");
    } catch (error) {
      message.error("Failed, try again");
      console.log(error);
    }
  };

  const employmentDeets = [
    {
      label: "Role",
      value: prospect?.role,
    },
    {
      label: "Job Type",
      value: prospect?.jobType,
    },
    {
      label: "Duration",
      value: prospect?.duration,
    },
    {
      label: "Start Date",
      value: dayjs(prospect?.startDate).format("MMM DD, YYYY"),
    },
  ];

  const employeeData =
    prospect?.jobType === JobType.CONTRACT
      ? employmentDeets.filter((item) => item.label !== "Duration")
      : employmentDeets;

  return (
    <div className="max-w-xl w-full border-1 border-white bg-white/25 rounded-2xl !p-8 space-y-8 backdrop-blur-2xl shadow-xl shadow-black/5">
      <div className="text-center w-full">
        <h1 className="!text-2xl md:text-3xl font-bold text-gray-800">
          Welcome to Zoracom, {prospect?.firstName}
        </h1>
        <p className="text-gray-500 !mt-2">
          We're excited to have you join our team! <br /> Below are the details
          of your offer.
        </p>
      </div>

      <div className="bg-white w-full !rounded-xl !p-6 !mt-4  shadow-xl shadow-black/5">
        <div className="!space-y-4">
          <h2 className="!text-lg font-semibold text-black">
            Your Employment Details
          </h2>
          <div className="bg-green-50 border !border-green-100 rounded-xl !p-4 space-y-4">
            {employeeData.map((d) => (
              <div key={d.label} className="flex items-center justify-between">
                <p className="font-semibold">{d.label}</p>
                <p className="text-gray">{sentenceCase(d.value ?? "")}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 !pt-8">
          <Button
            type="default"
            // onClick={onDecline}
            className="w-full !h-[40px]"
          >
            Decline Offer
          </Button>
          <Button
            loading={isLoading}
            type="primary"
            onClick={acceptOffer}
            className="bg-[#0A96CC] hover:bg-[#0984b3] flex items-center w-full !h-[40px]"
            icon={<ArrowRightOutlined />}
            iconPosition="end"
          >
            Accept Offer & Continue
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OfferAcceptance;
