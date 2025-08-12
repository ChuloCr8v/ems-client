import type { ColumnType } from "antd/es/table";
import TableComponent from "./TableComponent";
import Icon from "../common/Icon";
import { Download01Icon, File02Icon } from "@hugeicons/core-free-icons";
import { colors } from "../../constants/colors";
import { Button, Popover } from "antd";

type logProps = {
  date: string;
  time: string;
  actionType: string;
  assignedTo: string;
  assignedBy: string;
  comment: string;
  attachment: string[];
};

const LogComponent = (_props: {}) => {
  const assetLogs = [
    {
      id: "1",
      date: "Apr 12, 2024",
      time: "12:00 am",
      actionType: "Asset assigned",
      assignedBy: "Jane Doe",
      assignedTo: "Alexander James",
      comment: "New hire, asset assigned as part of onboarding",
      attachment: [
        "Onboarding Agreement.pdf",
        "Onboarding Agreement.pdf",
        "Onboarding Agreement.pdf",
      ],
    },
    {
      id: "2",
      date: "Apr 12, 2024",
      time: "12:00 am",
      actionType: "Asset assigned",
      assignedBy: "Jane Doe",
      assignedTo: "Alexander James",
      comment: "New hire, asset assigned as part of onboarding",
      attachment: [
        "Onboarding Agreement.pdf",
        "Onboarding Agreement.pdf",
        "Onboarding Agreement.pdf",
      ],
    },
    {
      id: "3",
      date: "Apr 12, 2024",
      time: "12:00 am",
      actionType: "Asset assigned",
      assignedBy: "Jane Doe",
      assignedTo: "Alexander James",
      comment: "New hire, asset assigned as part of onboarding",
      attachment: [
        "Onboarding Agreement.pdf",
        "Onboarding Agreement.pdf",
        "Onboarding Agreement.pdf",
      ],
    },
    {
      id: "4",
      date: "Apr 12, 2024",
      time: "12:00 am",
      actionType: "Asset assigned",
      assignedBy: "Jane Doe",
      assignedTo: "Alexander James",
      comment: "New hire, asset assigned as part of onboarding",
      attachment: [
        "Onboarding Agreement.pdf",
        "Onboarding Agreement.pdf",
        "Onboarding Agreement.pdf",
      ],
    },
  ];

  const columns: ColumnType<logProps>[] = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (_, record) => {
        return (
          <div className="">
            <p className="font-semibold text-black">{record.date} </p>
            <p className="text-xs text-gray">{record.time} </p>
          </div>
        );
      },
    },
    {
      title: "Action Type",
      dataIndex: "actionType",
      key: "actionType",
      render: (_, record) => {
        return (
          <div className="">
            <p className="font-semibold text-black">{record.actionType} </p>
            <p className="text-xs text-gray">
              By <span className="text-green">{record.assignedBy}</span> to{" "}
              <span className="text-green">{record.assignedTo}</span>
            </p>
          </div>
        );
      },
    },
    {
      title: "Comments/Attachments",
      dataIndex: "comments",
      key: "comments",
      render: (_, record) => {
        return (
          <div className="space-y-1  max-w-[350px]">
            <p className="text-gray max-w-[350px] line-clamp-1">
              {record.comment}
            </p>

            <div className="flex items-center gap-2">
              {record.attachment
                .map((r) => (
                  <div className="flex justify-between items-center border border-gray/30 rounded-lg px-2 py-1 max-w-[300px] w-full">
                    <div className="flex items-center gap-2">
                       {" "}
                      <Icon
                        icon={File02Icon}
                        color={colors.primary_green}
                        size={16}
                      />
                      <p className="font-semibold text-black text-xs line-clamp-1 max-w-[200px] ">
                        {r}
                      </p>
                    </div>
                      <Icon icon={Download01Icon} color="gray" size={20} />
                  </div>
                ))
                .slice(0, 1)}
              {record.attachment.length > 1 && (
                <Popover
                  content={<div className="space-y-1  max-w-[350px]"></div>}
                  title="Title"
                >
                  <Button
                    className="font-semibold !text-green"
                    icon={
                      <Icon
                        icon={File02Icon}
                        color={colors.primary_green}
                        size={16}
                      />
                    }
                  >
                    <span className="text-black leading-0 -mt-0.5">
                      +{record.attachment.length - 1}
                    </span>
                  </Button>
                </Popover>
              )}
            </div>
          </div>
        );
      },
    },
  ];

  return (
    <TableComponent
      isRowSelection={false}
      columns={columns as any}
      scroll={750}
      dataSource={assetLogs}
    />
  );
};

export default LogComponent;
