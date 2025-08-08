import {
  CheckmarkCircle03Icon,
  Doc01Icon,
  LaptopIcon,
  LegalDocument01Icon,
  Upload01Icon,
} from "@hugeicons/core-free-icons";
import Icon from "./common/Icon";
import StatusTag from "./global/StatusTag";
import { Button } from "antd";

type Props = {};

const OffboardingChecklist = (props: Props) => {
  console.log(props);
  const listItems = [
    {
      icon: LaptopIcon,
      title: "Return Assigned Company Assets",
      content:
        "Kindly ensure all company-issued assets assigned to you are returned. Once done, navigate to the Assets section and mark each item as returned.",
      status: "PENDING",
      action: {
        onclick: () => {},
        text: "Complete Now",
        icon: CheckmarkCircle03Icon,
      },
    },
    {
      icon: LegalDocument01Icon,
      title: "Provide Evidence of Payment In-Lieu (If Applicable)",
      content:
        "If you’re unable to return an assigned asset or required to make a payment in-lieu of damage or loss, please upload proof of payment.",
      status: "PENDING",
      action: {
        onclick: () => {},
        text: "Upload Proof",
        icon: Upload01Icon,
      },
    },
    {
      icon: Doc01Icon,
      title: "Fill Out the Handover Form",
      content:
        "Please complete and submit your handover form to ensure a smooth transition. It should outline any pending tasks, list transferred files or documents, and specify the designated officer taking over your responsibilities.",
      status: "PENDING",
      action: {
        onclick: () => {},
        text: "Upload Document",
        icon: Upload01Icon,
      },
    },
  ];

  return (
    <div>
      <div className="space-y-6">
        {listItems.map((l) => (
          <div className="flex justify-between items-center gap-6 border-b border-light_gray/70 pb-6">
            <div className="bg-green-50 rounded-md p-5">
                <Icon icon={l.icon} size={30} color="green" />
            </div>
            <div className="text-sm space-y-2">
              <p className="font-semibold">{l.title}</p>
              <p className="text-gray">{l.content}</p>
            </div>
            <StatusTag status={l.status} />

            <Button
              icon={<Icon icon={l.action.icon} size={16} thickness={3} />}
              onClick={() => l.action.onclick}
              size="large"
              className="!text-primary !border-primary/30 !font-semibold min-w-[200px]"
            >
              {l.action.text}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OffboardingChecklist;
