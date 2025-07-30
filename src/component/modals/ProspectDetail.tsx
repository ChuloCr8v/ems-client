import { File02Icon, User02Icon } from "@hugeicons/core-free-icons";
import type { IconSvgElement } from "@hugeicons/react";
import { type ReactNode } from "react";
import type { User } from "../../api/types";
import { colors } from "../../constants/colors";
import { CustomModal } from "../common/CustomModal";
import Icon from "../common/Icon";
import DocumentCard from "../global/DocumentCard";

type Props = {
  data: User | null;
};

const ProspectDetail = ({ data }: Props) => {
  const overviewData = [
    {
      sectionTitle: "Personal Information",
      fields: [
        { label: "Role", value: "Product Designer" },
        { label: "Department", value: "Rollout & Service Delivery" },
        { label: "Job Type", value: "Contract" },
        { label: "Duration", value: "6 months" },
      ],
    },
    {
      sectionTitle: "Employee Information",
      fields: [
        { label: "Role", value: "Product Designer" },
        { label: "Department", value: "Rollout & Service Delivery" },
        { label: "Job Type", value: "Contract" },
        { label: "Duration", value: "6 months" },
      ],
    },
    {
      sectionTitle: "Emergency Contact",
      fields: [
        { label: "Name", value: "Jessica Nwachukwu" },
        { label: "Relationship", value: "Sister" },
        { label: "Phone Number", value: "Contract" },
        {
          label: "Contact Address",
          value: "No 32 Bariga Road, Shomolu, Lagos State",
        },
      ],
    },
  ];

  const documents = [
    { name: "Onboarding Agreement.pdf", size: "120kb", url: "#" },
    { name: "Onboarding Agreement.pdf", size: "120kb", url: "#" },
    { name: "Onboarding Agreement.pdf", size: "120kb", url: "#" },
    { name: "Onboarding Agreement.pdf", size: "120kb", url: "#" },
  ];

  const DetailBox = ({
    children,
    icon,
    title,
  }: {
    icon: IconSvgElement;
    title: string;
    children: ReactNode;
  }) => {
    return (
      <div className="rounded-lg border border-outline overflow-hidden">
        <div className="flex items-center gap-2 bg-bg_elevated px-4 py-3">
          <Icon icon={icon} color={colors.elevated} size={24} />
          <p className="font-semibold text-base">{title}</p>
        </div>
        <div className="">{children}</div>
      </div>
    );
  };

  return (
    <CustomModal
      icon={User02Icon}
      title={data?.firstName + " " + data?.lastName}
      hideFooter
      width={800}
    >
      <div className="space-y-6">
        <DetailBox icon={File02Icon} title={"Overview"}>
          <section className="p-4">
            {overviewData.map((section, index) => (
              <div
                key={index}
                className={
                  "border-b border-outline mb-4 pb-4 last-of-type:border-b-0 last-of-type:pb-0 last-of-type:mb-0"
                }
              >
                <h3 className="text-gray mb-2">{section.sectionTitle}</h3>

                <div className="grid grid-cols-2 gap-3">
                  {section.fields.map((field, idx) => (
                    <div key={idx}>
                      <p className="text-gray">{field.label}</p>
                      <p className="text-custom_black font-semibold">
                        {field.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </section>
        </DetailBox>

        <DetailBox icon={File02Icon} title={"Documents"}>
          <section className="p-4 grid grid-cols-2 gap-3">
            {documents.map((doc, idx) => (
              <DocumentCard key={idx} data={doc as unknown as File} />
            ))}
          </section>
        </DetailBox>
      </div>{" "}
    </CustomModal>
  );
};

export default ProspectDetail;
