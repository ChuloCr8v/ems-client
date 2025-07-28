import { DownOutlined } from "@ant-design/icons";
import { Dropdown, type MenuProps } from "antd";
import { GoSignOut } from "react-icons/go";
import { useAppDispatch } from "../store/store";
import { useAuthUser } from "../hooks/authHooks";
import { clearAuth } from "../store/slices/authSlice";
import UserAvatar from "./Avatar";
import { useNavigate } from "react-router-dom";

const ProfileDropdown = () => {
  const user = useAuthUser();

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const userName = user.firstName + " " + user.lastName;

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: "Sign Out",
      onClick: () => {
        console.log("clearing auth");
        dispatch(clearAuth());
        navigate("/auth");
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
          <UserAvatar />
          <div className="">
            <p className="font-semibold text-sm">{userName}</p>
            <p className="text-gray text-xs">{user.userRole}</p>
          </div>
        </div>
        <DownOutlined />
      </a>
    </Dropdown>
  );
};

export default ProfileDropdown;
