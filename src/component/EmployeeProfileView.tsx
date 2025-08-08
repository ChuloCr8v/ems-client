import {
  File01Icon,
  PencilEdit01Icon,
  Contact01Icon,
  User03Icon,
  PhoneArrowUpIcon,
  ListViewIcon,
} from "@hugeicons/core-free-icons";
import DataBox from "./global/DataBox";

type Props = {};

const EmployeeProfileView = (props: Props) => {
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
        { label: "Employee ID", value: "EMP001" },
        { label: "Role", value: "Product Designer" },
        { label: "Department", value: "Rollout & Service Delivery" },
        { label: "Level", value: "Senior Officer" },
        { label: "Job Type", value: "Contract" },
        { label: "Duration", value: "6 months" },
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
        { label: "Gender", value: "Female" },
        { label: "Marital Status", value: "Single" },
        {
          label: "Contact Address",
          value: "No 32 Bariga Road, Shomolu, Lagos State",
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
        { label: "Name", value: "Victoria Ekeh" },
        { label: "Relationship", value: "Sister" },
        { label: "Phone Number", value: "+234 905 545 4545" },
        {
          label: "Contact Address",
          value: "No 32 Bariga Road, Shomolu, Lagos State",
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
        { label: "Name", value: "Victoria Ekeh" },
        { label: "Relationship", value: "Sister" },
        { label: "Phone Number", value: "+234 905 545 4545" },
        {
          label: "Contact Address",
          value: "No 32 Bariga Road, Shomolu, Lagos State",
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
