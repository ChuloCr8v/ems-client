import Icon from "../common/Icon";
import { colors } from "../../constants/colors";
import { Button } from "antd";
import { twMerge, type ClassNameValue } from "tailwind-merge";
import type { IconSvgElement } from "@hugeicons/react";
import type { ReactNode } from "react";

type Section = {
  header: {
    title: {
      icon: IconSvgElement;
      text: string;
    };
    action?: {
      icon: IconSvgElement;
      text: string;
      action: () => void;
    };
  };
  body?: {
    label: string;
    value?: ReactNode;
  }[];
};

type Props = {
  contentWrapper?: ClassNameValue;
  bodyWrapper?: ClassNameValue;
  containerWrapper?: ClassNameValue;
  data: Section;
  children?: ReactNode;
};

const DataBox = ({
  data,
  contentWrapper,
  bodyWrapper,
  containerWrapper,
  children,
}: Props) => {
  return (
    <div
      className={twMerge(
        "border-gray/20 overflow-hidden border rounded-lg min-w-[200px] w-full ",
        containerWrapper
      )}
    >
      <div className="bg-gradient-to-r from-primary_light to-[#66C476]/20 flex justify-between items-center py-3 px-4">
        <div className="flex gap-2 items-center">
          <Icon
            color={colors.primary_green}
            size={18}
            icon={data.header.title.icon}
          />
          <p className="font-semibold text-sm">{data.header.title.text}</p>
        </div>

        {data.header.action && (
          <Button
            size="small"
            icon={<Icon size={18} icon={data.header.action.icon} />}
            className="!text-primary bg-white !border-transparent !font-semibold"
            onClick={data.header.action.action}
          >
            {data.header.action.text}
          </Button>
        )}
      </div>
      <div className={twMerge(bodyWrapper, "p-4 space-y-2")}>
        {children
          ? children
          : data?.body?.map((d) => (
              <div
                className={twMerge(
                  contentWrapper,
                  "flex justify-between",
                  d.label.toLowerCase().includes("contact") && "flex-col",
                  d.label.toLowerCase().includes("description") && "col-span-2"
                )}
              >
                <p className={twMerge("text-gray text-sm")}>{d.label}</p>
                <p className={twMerge("font-semibold text-black text-sm")}>
                  {d.value}
                </p>
              </div>
            ))}
      </div>
    </div>
  );
};

export default DataBox;
