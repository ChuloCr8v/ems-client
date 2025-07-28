import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react";
import { colors } from "../../constants/colors";

type Props = {
  icon: IconSvgElement;
  size?: number;
  color?: string;
};

const Icon = ({ icon, size = 14, color = colors.primary }: Props) => {
  return (
    <HugeiconsIcon color={color} icon={icon} size={size} strokeWidth={2.5} />
  );
};

export default Icon;
