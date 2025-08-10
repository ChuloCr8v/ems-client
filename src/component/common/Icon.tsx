import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react";
import { colors } from "../../constants/colors";

type Props = {
  icon: IconSvgElement;
  size?: number;
  color?: string;
  thickness?: number;
};

const Icon = ({
  icon,
  size = 14,
  color = colors.primary,
  thickness,
}: Props) => {
  return (
    <HugeiconsIcon
      color={color}
      icon={icon}
      size={size}
      strokeWidth={thickness ?? 1.5}
    />
  );
};

export default Icon;
