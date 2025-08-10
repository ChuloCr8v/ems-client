import {
  File01Icon,
  PencilEdit01Icon,
  Contact01Icon,
  User03Icon,
  PhoneArrowUpIcon,
  ListViewIcon,
} from "@hugeicons/core-free-icons";
import DataBox from "./global/DataBox";
import type { User } from "../api/types";
import { sentenceCase } from "../helpers";

type Props = {
  data?: User;
};

const EmployeeProfileView = ({ data }: Props) => {
  const employeeSections = [
    {
      header: {
        title: {
          icon: File01Icon,
          text: "Overview",
        },
        action: {
          icon: PencilEdit01Icon,
          text: "Update",
          action: () => {},
        },
      },
      body: [
        { label: "Employee ID", value: data?.eId },
        { label: "Role", value: data?.role },
        { label: "Department", value: data?.department.name },
        { label: "Level", value: data?.level.name },
        { label: "Job Type", value: data?.jobType },
        { label: "Duration", value: data?.duration ?? "Full Time" },
      ],
    },
    {
      header: {
        title: {
          icon: Contact01Icon,
          text: "Personal Information",
        },
        action: {
          icon: PencilEdit01Icon,
          text: "Update",
          action: () => {},
        },
      },
      body: [
        { label: "Date of Birth", value: "14th July 1990" },
        { label: "Gender", value: data?.gender },
        {
          label: "Marital Status",
          value: sentenceCase(data?.maritalStatus ?? ""),
        },
        {
          label: "Contact Address",
          value: data?.address,
        },
      ],
    },
    {
      header: {
        title: {
          icon: User03Icon,
          text: "Guarantor Details",
        },
        action: {
          icon: PencilEdit01Icon,
          text: "Update",
          action: () => {},
        },
      },
      body: [
        {
          label: "Name",
          value:
            data?.contacts.guarantor.firstName +
            " " +
            data?.contacts.guarantor.lastName,
        },
        { label: "Relationship", value: "Sister" },
        { label: "Phone Number", value: data?.contacts.guarantor.phone },
        {
          label: "Contact Address",
          value: data?.contacts.guarantor.address,
        },
      ],
    },
    {
      header: {
        title: {
          icon: PhoneArrowUpIcon,
          text: "Emergency Contact",
        },
        action: {
          icon: PencilEdit01Icon,
          text: "Update",
          action: () => {},
        },
      },
      body: [
        {
          label: "Name",
          value:
            data?.contacts.emergency.firstName +
            " " +
            data?.contacts.emergency.lastName,
        },
        { label: "Relationship", value: "Sister" },
        { label: "Phone Number", value: data?.contacts.emergency.phone },
        {
          label: "Contact Address",
          value: data?.contacts.emergency.address,
        },
      ],
    },
    {
      header: {
        title: {
          icon: ListViewIcon,
          text: "Bank Information",
        },
        action: {
          icon: PencilEdit01Icon,
          text: "Update",
          action: () => {},
        },
      },
      body: [
        { label: "Bank", value: "GT Bank" },
        { label: "Account No", value: "1234567800" },
        { label: "Account Name", value: "Modesta Ekeh" },
      ],
    },
  ];
  return (
    <div className="grid grid-cols-3 gap-3">
      {employeeSections.map((e) => (
        <DataBox
          data={e}
          containerWrapper={
            e.header.title.text.includes("Overview") && "col-span-2 flex-col"
          }
          bodyWrapper={
            e.header.title.text.includes("Overview") && "grid grid-cols-2"
          }
          contentWrapper={
            e.header.title.text.includes("Overview") && "flex-col"
          }
        />
      ))}
    </div>
  );
};

export default EmployeeProfileView;
