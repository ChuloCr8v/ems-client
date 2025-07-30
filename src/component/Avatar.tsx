import { Avatar } from "antd";
import { useAuthUser } from "../hooks/authHooks";
import type { AvatarSize } from "antd/es/avatar/AvatarContext";

const UserAvatar = ({
  firstName,
  lastName,
  size,
}: {
  firstName?: string;
  lastName?: string;
  size?: AvatarSize;
}) => {
  const user = useAuthUser();

  const getInitial = (name: string) => name?.charAt(0).toUpperCase() ?? "";

  const initials =
    (firstName ? getInitial(firstName) : getInitial(user?.firstName || "")) +
    (lastName ? getInitial(lastName) : getInitial(user?.lastName || ""));

  return (
    <Avatar size={size ?? 35}>
      <span className="text-sm">{initials || "?"}</span>
    </Avatar>
  );
};

export default UserAvatar;
