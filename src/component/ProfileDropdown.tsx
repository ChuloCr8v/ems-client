import { DownOutlined } from "@ant-design/icons";
import { Avatar, Dropdown, type MenuProps } from "antd";
import { GoSignOut } from "react-icons/go";

const ProfileDropdown = () => {
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: "Sign Out",
      icon: <GoSignOut />,
    },
  ];
  return (
    <Dropdown menu={{ items }}>
      <a
        onClick={(e) => e.preventDefault()}
        className="flex items-center gap-20"
      >
        <div className="flex items-center gap-2">
          <Avatar size={40}>
            <span className="text-xl">ME</span>
          </Avatar>
          <div className="">
            <p className="font-semibold">Modesta Ekeh</p>
            <p className="text-gray">Admin</p>
          </div>
        </div>
        <DownOutlined />
      </a>
    </Dropdown>
  );
};

export default ProfileDropdown;
