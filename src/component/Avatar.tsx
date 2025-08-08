import { Avatar } from "antd";
import { useAuthUser } from "../hooks/authHooks";
import type { AvatarSize } from "antd/es/avatar/AvatarContext";
import { twMerge } from "tailwind-merge";

const UserAvatar = ({
  firstName,
  lastName,
  size,
  textSize,
}: {
  firstName?: string;
  lastName?: string;
  size?: AvatarSize;
  textSize?: string;
}) => {
  const user = useAuthUser();

  const getInitial = (name: string) => name?.charAt(0).toUpperCase() ?? "";

  const initials =
    (firstName ? getInitial(firstName) : getInitial(user?.firstName || "")) +
    (lastName ? getInitial(lastName) : getInitial(user?.lastName || ""));

  return (
    <Avatar size={size ?? 35}>
      <span className={twMerge("text-sm", textSize)}>{initials || "?"}</span>
    </Avatar>
  );
};

export default UserAvatar;
