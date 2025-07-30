import { colors } from "../../constants/colors";
import Icon from "../common/Icon";
import { Download01Icon, FileEmpty01Icon } from "@hugeicons/core-free-icons";

type Props = {
  data: File;
};

const DocumentCard = ({ data }: Props) => {
  return (
    <div className="flex justify-between items-center border rounded-lg border-outline p-3">
      <div className="flex items-center gap-2">
        <div className="bg-bg_elevated h-10 w-10 rounded-full flex justify-center items-center">
          {Icon({ icon: FileEmpty01Icon, size: 20, color: colors.elevated })}
        </div>
        <div className="">
          <p className="font-semibold">{data.name}</p>
          <p className="text-xs text-gray">{data.size}</p>
        </div>
      </div>
      {Icon({ icon: Download01Icon, size: 24, color: colors.light_gray })}
    </div>
  );
};

export default DocumentCard;
