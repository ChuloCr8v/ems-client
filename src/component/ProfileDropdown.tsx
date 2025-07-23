import { DownOutlined } from "@ant-design/icons";
import { Avatar, Dropdown, type MenuProps } from "antd";
import { GoSignOut } from "react-icons/go";
import { useAppDispatch } from "../store/store";
import { useAuthUserRequired } from "../hooks/authHooks";
import { clearAuth } from "../store/slices/authSlice";

const ProfileDropdown = () => {
  const user = useAuthUserRequired();

  const dispatch = useAppDispatch();

  const userName = user.firstName + " " + user.lastName;

  const initals = userName.charAt(0) + userName.split(" ")[1].charAt(0);

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: "Sign Out",
      onClick: () => {
        console.log("clearing auth");
        dispatch(clearAuth());
      },
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
            <span className="text-xl">{initals}</span>
          </Avatar>
          <div className="">
            <p className="font-semibold">{userName}</p>
            <p className="text-gray text-sm">{user.userRole}</p>
          </div>
        </div>
        <DownOutlined />
      </a>
    </Dropdown>
  );
};

export default ProfileDropdown;
