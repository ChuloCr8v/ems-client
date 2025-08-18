import Icon from "../common/Icon";
import { LaptopIcon } from "@hugeicons/core-free-icons";

type Props = {
  name: string;
  id: string;
};

const AssetTag = ({ name, id }: Props) => {
  return (
    <div className="w-full border-green/20 bg-green/5 border px-3 py-2 rounded-lg">
      <div className="flex items-center gap-3">
        <div className="bg-green/20 w-10 h-10 flex justify-center items-center rounded-full">
          <Icon icon={LaptopIcon} color="green" size={20} />
        </div>
        <div className="">
          <p className="font-semibold text-sm">{name}</p>
          <p className="text-gray text-xs">ID: {id}</p>
        </div>
      </div>
    </div>
  );
};

export default AssetTag;
