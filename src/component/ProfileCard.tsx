import UserAvatar from "./Avatar";

type Props = {
  firstName: string;
  lastName: string;
  email: string;
};

const ProfileCard = ({ firstName, lastName, email }: Props) => {
  return (
    <div className="flex items-center gap-2">
      <UserAvatar size={30} lastName={lastName} firstName={firstName} />
      <div className="">
        <p className="font-semibold text-custom_black text-sm">
          {firstName} {lastName}
        </p>
        <p className="text-xs text-gray">{email}</p>
      </div>
    </div>
  );
};

export default ProfileCard;
